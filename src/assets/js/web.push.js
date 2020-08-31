/*!
 * Web Push
 * Copyright 2014 Dau Ngoc Huy - huydaungoc @ gmail.com
 */
function WebPush() {
    var that = this;
    this.ttl = 90000;
    this.reconnectTTL = 1000;
    this.stateReady = false;
    this.stateClosing = false;
    this.webSocket;

    this.url;
    this.requestDisconnect;
    this.id;

    this.onConnected = function () {
            console.log("onConnected");
            that.setStateReady(true);
            initStage = 3;
        };

    this.onDisconnected = function () {
        console.log("onDisconnected");
        that.setStateReady(false);
        that.stateClosing = false;
        initStage = 2;
    };

    this.onMessageReceived = function (msg) {
    };

    this.onError = function (e) {
        console.log("onError");
        that.onDisconnected();
        that.stateClosing = false;
        initStage = 2;
    };

    this.waitConnectSync = async function (socket, timeout = 10000) {
      const isOpened = () => (socket.readyState === WebSocket.OPEN)

      if (socket.readyState !== WebSocket.CONNECTING) {
        return isOpened()
      }
      else {
        const intrasleep = 100
        const ttl = timeout / intrasleep // time to loop
        let loop = 0
        while (socket.readyState === WebSocket.CONNECTING && loop < ttl) {
          await new Promise(resolve => setTimeout(resolve, intrasleep))
          loop++
        }
        return isOpened()
      }
    };

    this.getStateReady =function(){
        return that.stateReady;
    };

    this.setStateReady=function(v){

        that.stateReady = v;
    };

    this.onClose = function(e){
        initStage = 2;
        console.log("onClose");
        that.setStateReady(false);
        that.onDisconnected();
        that.stateClosing = false;
        if(that.reconnectWebsocket){
            setTimeout(that.reconnectWebsocket, that.reconnectTTL);
        }
    };

    this.reconnectWebsocket;
}


WebPush.prototype.waitConnectSync = async function (socket, timeout = 10000) {
  const isOpened = () => (socket.readyState === WebSocket.OPEN)

  if (socket.readyState !== WebSocket.CONNECTING) {
    return isOpened()
  }
  else {
    const intrasleep = 100
    const ttl = timeout / intrasleep // time to loop
    let loop = 0
    while (socket.readyState === WebSocket.CONNECTING && loop < ttl) {
      await new Promise(resolve => setTimeout(resolve, intrasleep))
      loop++
    }
    return isOpened()
  }
};


WebPush.prototype.connect = function (url, forceLongPolling) {
    var webPush = this;
    this.url = url;
    this.requestDisconnect = false;
    webPush.stateClosing=false;
    webPush.stateReady=false;
    
    //fix IE AJAX cross domain
    $.support.cors = true;

    //setup disconnect khi chuyen trang
    $(window).unload(function () {
        webPush.close();
    });
    // / && (forceLongPolling === undefined || !forceLongPolling)
    if (window.WebSocket ) {

        console.log("Connect via socket ");

        this.webSocket = new WebSocket('wss://' + url + '/websocket');
        this.webSocket.onopen = this.onConnected;
        this.webSocket.onclose = this.onClose;

        // this.webSocket.onerror = function () {
        //     webPush.onDisconnected();
        // };

        this.webSocket.onerror = this.onError;


        this.webSocket.onmessage = function (evt) {
            var msg = JSON.parse(evt.data);
            webPush.onMessageReceived(msg);
        };
        this.onMessageReceived;


    } 
    else {

        console.log("Connect via polling ");

        // cslog('use long polling');
        $.ajax({
            dataType: 'json',
            url: 'http://' + url + '/connect',
            data: {},
            cache: false, //fix loop IE
            async: true,
            crossDomain:true,
            success: function (data, textStatus, jqXHR) {
                if (data.r === 1) {
                    webPush.id = data.id;
                    webPush.onConnected();
                    webPush.poll(url);
                } else {
//					cslog('connect error: ' + data.r);
                    webPush.onDisconnected();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
//				cslog('connect error: ' + textStatus);
//				cslog(errorThrown);
                webPush.onDisconnected();
            }
        });
    }
};

WebPush.prototype.poll = function (url) {
    var webPush = this;
    $.ajax({
        dataType: 'json',
        url: 'http://' + url + '/poll/' + webPush.id,
        cache: false, //fix loop IE
        async: true,
        data: {},
        success: function (data, textStatus, jqXHR) {
            if (data.r === 1) {
                if (data.list) {
                    for (var i = 0; i < data.list.length; i++) {
                        var msg_i = data.list[i];
                        webPush.onMessageReceived(msg_i);
                    }
                }

                if (!webPush.requestDisconnect) {
//					cslog('poll success: +++++++++++');
                    setTimeout(function () {
                        webPush.poll(url);
                    }, 1);
                } else {
                    webPush.onDisconnected();
                }
            } else {
//				cslog('poll error, code: ' + data.r);
                webPush.onDisconnected();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
//			cslog('error: ' + textStatus);
            webPush.onDisconnected();
        },
        complete: function (jqXHR, textStatus) {
            if (textStatus === 'success') {
            }
        }
    });
};

WebPush.prototype.send = function (msg) {
//    cslog('send: ' + msg);
    var webPush = this;
    if (this.webSocket) {
        this.webSocket.send(JSON.stringify(msg));
    }
     else {
        $.ajax({
            dataType: 'json',
            url: 'http://' + webPush.url + '/send/' + webPush.id,
            type: 'POST',
            cache: false, //fix loop IE
            data: JSON.stringify(msg),
            success: function (data, textStatus, jqXHR) {
//                cslog('success send: ' + data);
                //webPush.onMessageReceived(data);
                //webPush.poll(url);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                cslog('error send: ' + textStatus + "--" + errorThrown);
                //webPush.onDisconnected();
            }
        });
    }
};

WebPush.prototype.sendWait = function (msg, callback) {
    var webPush = this;
    if (this.webSocket) {
        this.waitForConnection(function () {
            webPush.webSocket.send(JSON.stringify(msg));
            if (typeof callback !== 'undefined') {
                callback();
            }
        }, 1000);
    } else {
        $.ajax({
            dataType: 'json',
            url: 'http://' + webPush.url + '/send/' + webPush.id,
            type: 'POST',
            cache: false, //fix loop IE
            async: true,
            data: JSON.stringify(msg),
            success: function (data, textStatus, jqXHR) {
                // cslog('success send: ' + data);
                //webPush.onMessageReceived(data);
                //webPush.poll(url);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // cslog('error send: ' + textStatus + "--" + errorThrown);
                //webPush.onDisconnected();
            }
        });
    }
};

WebPush.prototype.waitForConnection = function (callback, interval) {
    if (this.webSocket.readyState === 1) {
        callback();
    } else {
        var that = this;
        // optional: implement backoff for interval here
        setTimeout(function () {
            that.waitForConnection(callback, interval);
        }, interval);
    }
};

 async function waitClosing(wp, timeout = 10000) {

  if (wp.stateClosing===true) {
    return wp.stateClosing;
  }
  else {
    const intrasleep = 100;
    const ttl = timeout / intrasleep ;// time to loop
    let loop = 0
    while (wp.stateClosing === true && loop < ttl) {
      await new Promise(resolve => setTimeout(resolve, intrasleep));
      loop++
    }
    console.log("waitClosing end" );
    return wp.stateClosing;
  }
};

WebPush.prototype.close = function () {
    var webPush = this;
    webPush.stateClosing = true;

    if (this.webSocket && this.webSocket.close) {
        this.webSocket.close();
    } 
//     else {
//         this.requestDisconnect = true;

//         var isProcessing = true;
//         const  waitDisconect = async function(timeout = 10000){
//             const intrasleep = 100;
//             const ttl = timeout / intrasleep ;// time to loop
//             let loop = 0
//             while (isProcessing === true && loop < ttl) {
//               await new Promise(resolve => setTimeout(resolve, intrasleep));
//               loop++
//             }
//         };  

//         // cslog('chuyen nhe------------------');
//         $.ajax({
//             dataType: 'json',
//             url: 'http://' + webPush.url + '/disconnect/' + webPush.id,
//             type: 'GET',
//             cache: false, //fix loop IE
//             async: true,
//             crossDomain:true,
//             data: {},
//             success: function (data, textStatus, jqXHR) {
// //				cslog('success disconnect: ' + data);
//                 //webPush.onMessageReceived(data);
//                 //webPush.poll(url);
//                 webPush.stateReady=false;
//                 webPush.stateClosing=false;
//                 isProcessing = true;
//             },
//             error: function (jqXHR, textStatus, errorThrown) {
// //				cslog('error disconnect: ' + textStatus);
//                 //webPush.onDisconnected();
//                 webPush.stateReady=false;
//                 webPush.stateClosing=false;
//                 isProcessing = true;
//             }
//         });
//         await waitDisconect();
//     }
   
};