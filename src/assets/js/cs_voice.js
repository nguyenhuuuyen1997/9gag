var timeoutToPing = 10; //s
var lastSentTime = new Date().getTime();
var ping = {objectId: 11111111};
var timeoutTransfer;

var noRetry = 1;
var totalRetry = 0;
var retryTimeout = true;
var pingreq;
var isInitialized = false;
var initStage = 0;

var BaseRequest = {
    agentId: '',
    extension: ''
};

var token3C;
var csUser;
var notification;

var csVoice = {
    callInfo: null,
    callStatus: 'Offline',
    enableVoice: false,
    hasCall: false,
    isRinging: false,
    isAnswering: false,
    isMute: false,
    isHold: false,
    deviceType: 1,
    holding: false,
    isConnectToAgent: false,
    isCallout: false,
    disconnectAs: false,
    sip_socket: "",
    sip_address: "",
    agentserver_socket: "",
	userToken: ""
}

var agentWebPush={};

function clearAllState(){

    if(timeoutTransfer){
        clearTimeout(timeoutTransfer);
        timeoutTransfer = null;
    }
    timeoutToPing = 10; //s
    lastSentTime = new Date().getTime();
    ping = {objectId: 11111111};

    noRetry = 1;
    totalRetry = 0;
    retryTimeout = true;
    isInitialized = false;
    initStage = 0;
    BaseRequest = {
        agentId: '',
        extension: ''
    };
    csVoice = {
        callInfo: null,
        callStatus: 'Offline',
        enableVoice: false,
        hasCall: false,
        isRinging: false,
        isAnswering: false,
        isMute: false,
        isHold: false,
        deviceType: 1,
        holding: false,
        isConnectToAgent: false,
        isCallout: false,
        disconnectAs: false,
        sip_socket: "",
        sip_address: "",
        agentserver_socket: "",
        userToken: ""
    }
}

function CallInfo() {
    this.callId = "";
    this.caller = "";
    this.agentId = "";
    this.line = "";
    this.callDirection = "";
    this.callerName = "";
    this.callerId = "";
    this.tabIndex = "";
    this.startTime = "";
    this.endTime = "";
}

function checkMedia() {
    if (csVoice.deviceType == 1) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true},
                function (stream) {
                    //console.log("Accessed the Microphone");
					return true;
                },
                function (err) {
                    //console.log("Error: Cannot access the microphone");
					csNotify("Không thể truy cập microphone. Để sử dụng dịch vụ Quý khách cần cho phép sử dụng Microphone để kết nối. Trân thành cảm ơn!");
                });
        } else {
            //console.log("Error: Cannot access the microphone");
			csNotify("Không thể truy cập Media. Để sử dụng dịch vụ Quý khách cần cho phép sử dụng Microphone để kết nối. Trân thành cảm ơn!");
        }
    }
	return false;
}

function sendAs(message) {
    BaseRequest.agentId = csUser.name;
    BaseRequest.extension = csUser.agent_id;
    // BaseRequest.sessionId = sessionStorage.getItem('session');//$("#sessionId").val();
    // BaseRequest.authenToken = $localStorage.token;
    $.extend(message, BaseRequest);

    agentWebPush.send(message);
    //csLog('Client send: ' + JSON.stringify(message));
    lastSentTime = new Date().getTime();
}

function sendWaitAs(message) {
    BaseRequest.agentId = csUser.name;
    BaseRequest.extension = csUser.agent_id;
    $.extend(message, BaseRequest);

    agentWebPush.sendWait(message);
    lastSentTime = new Date().getTime();
}

function changeDevice(tempDeviceType, phoneNo) {
    csVoice.deviceType = tempDeviceType;

    var mess = {
        objectId: CHANGE_DEVICE_TYPE_REQUEST,
        deviceType: tempDeviceType,
        phoneNum: phoneNo
    }

    sendAs(mess);
}

function csInit(userToken) {
    console.log('Initializing......');
    $.ajax({
        type: "GET",
        url: API_SERVER + "v1/api/calls/check-partner",
		headers: {
			'Authorization': userToken,
		},
        cache:false,
        async: true,
        crossDomain:true,
        dataType: "text",
        success: function (response) {
            console.log('Initialized, Starting websocket.....');
            // isInitialized = true;
            response = JSON.parse(response);
            if (response.code == 200) {
				token3C = response.token3C;
                csUser = {
                    name: response.user.username,
                    agent_id: response.user.agent_id,
                    extension: response.user.agent_id,
                    phone_no: response.user.phone_no,
                    role: response.user.role
                }
                initCsVoice(response.account.sip_server_url, response.account.sip_socket, response.account.agent_server_url, userToken);
				createWs(token3C);
                disableCallPopup(false);
            } else {
                initStage = 2;
                console.log('Init failed, csUser is null - success' );
                // csInitError(response.code);
                disableCallPopup(true);
                

            }
        }, error: function (response) {
            initStage = 2;
            console.log('Init failed, csUser is null - error');

            // console.log( response );
            if(response && response.responseText){
                let bodyError = {};
                try{
                    bodyError = JSON.parse(response.responseText);
                } catch(e) {
                    return;
                }

                if(response.status == 501){
                    alert(bodyError.message);
                }else{
                    csInitError(response.code);
                }
            }else{
                csInitError("Lỗi kết nối tới máy chủ!");
            }
            disableCallPopup(true);
            
            
        }
    });
}

function reConfigDeviceType() {
    if (csUser.role == 6) { //extension
        changeDevice(4, "");
    } else if (csUser.role == 7) { //mobile
        changeDevice(3, "");
    } else if (csUser.role == 9) { //3c Softphone
        changeDevice(6, "");
    }
}

function csUnregister() {
    if (csVoice.deviceType == 1) {
		console.log("csUnregister");
        unregister();
    }
}

function isCsHasCall() {
    return csVoice.hasCall;
}

function initCsVoice(sip_address, sip_socket, agentserver, userToken) {
    csVoice.agentserver_socket = agentserver;
    csVoice.sip_address = sip_address;
    csVoice.sip_socket = sip_socket;
	csVoice.userToken = userToken;
}

function csCallout(number, token, user_id,hobby_id,masked_isdn,freq,id,utm,context) {
    if (csVoice.enableVoice == true) {
        if (!csVoice.isCallout) {
            //if (number == "" || !number.match(/^[0-9]{8,13}$/)) {
                //if (number != "" && number.match(/^[0-9]{1,7}$/) && number.match(/^[1-9].*/)) {
                //    if (csVoice.deviceType == 1) {
                //        // GUI.buttonDialClick("sip:" + number + '@' + sip_address);
                //        dial_call("sip:" + number + '@' + csVoice.sip_address);
                //    } else {
                //        console.log("error");
                //    }
                //} else {
                //    console.log("wrong phone number");
                //}
            //} else {
                if (!csVoice.hasCall && !csVoice.isConnectToAgent) {
                    csVoice.isCallout = true;
                    // isConnectToAgent = true;
                    // var number = msisdn(number);
                    callOutMsg = {telephoneNumber: number, objectId: OUT_CALL_REQUEST_ID, ticketId: '', callerId: "", 
                    userToken: token, user_id: user_id,hobby_id: hobby_id,masked_isdn: masked_isdn,freq: freq,id:id,utm:utm,ctx:context};
                    sendAs(callOutMsg);
                    csVoice.isRinging = true;
                    if (csVoice.deviceType == 1) {
                        csVoice.isConnectingCall = true;
                    }
                    showCalloutInfo(number);
                    csVoice.isConnectToAgent = true;
                    csVoice.isCallout = true;
                    csVoice.hasCall = true;
                    csVoice.isRinging = true;
                    csVoice.missCall = false;
                    csVoice.isAnswering = false;
                    csVoice.isMute = false;
                    csVoice.isHold = false;
                    csVoice.callInfo = new CallInfo();
                    csVoice.callInfo.callId = "";
                    csVoice.callInfo.caller = number;
                    csVoice.callInfo.callerName = number;
                    csVoice.callInfo.line = " ";
                    csVoice.callInfo.callDirection = 2;
                } else {
                    console.log("Error callout");
                    clearStateFromBrowser();
                }
            //}
        } else {
        }
    } else {
		// if( isInitialized == false ){
        if( initStage !== 3 ){
		}else{
			csEnableCall();
		}
		disableCallPopup(true);
        csNotify('Kênh thoại bị ngắt kết nối. Quý khách vui lòng thực hiện lại cuộc gọi. Trân thành cảm ơn!');
        clearStateFromBrowser();
		//console.log("Enable voice to call");
    }
}

function changeCallStatus() {
    if (csVoice.callStatus != 'Online') {
        status = 'AVAILABLE';
        csVoice.callStatus = 'Online';
    } else {
        status = 'NOT AVAILABLE';
        csVoice.callStatus = 'Offline';
    }
    var message = {status: status, objectId: 2013};
    sendAs(message);
}

function endCall() {
    if (csVoice.deviceType == 1) {
        csVoice.hasCall = false;
        csVoice.holding = false;
        isClearing = false;
        csVoice.isConnectToAgent = false;
        csVoice.isRinging = false;
        csVoice.isAnswering = false;
        csVoice.callInfo = null;
		
		// longth
		csVoice.isCallout = false;
        terminate_call();
		
	//agentWebPush.close();
    } else {
        if (csVoice.isHold) {
            return;
        }
        var objectId = TERMINATE_CALL_OUT_REQUEST_ID;
		// Longth
		if(csVoice.callInfo){
			if (csVoice.callInfo.callDirection == 1) {
				objectId = REMOVE_AGENT_REQUEST_ID;
			} else if (csVoice.callInfo.callDirection == 3) {
				objectId = TERMINATE_REQUEST_ID;
			}
		}
        
        var interuptMsg = {callId: csVoice.callInfo.callId, removeAgentId: csVoice.callInfo.agentId, objectId: objectId};
        sendAs(interuptMsg);
    }

}
function muteCall() {
    if (csVoice.isHold) {
        return;
    }
    var muteObjectID;
    if (csVoice.callInfo.callDirection == 1) {
        if (csVoice.isMute == true) {
            muteObjectID = UNMUTE_REQUEST_ID;
        } else {
            muteObjectID = MUTE_REQUEST_ID;
        }
    } else {
        alert("Comming soon.");
    }

    messageToSend = {callId: csVoice.callInfo.callId, callType: csVoice.callInfo.callDirection, objectId: muteObjectID};
    sendAs(messageToSend);
}
function holdCall() {
    var holdIdObject;
    if (csVoice.callInfo.callDirection == 1 || csVoice.callInfo.callDirection == 3) {
        if (csVoice.isHold == true) {
            holdIdObject = UN_HOLD_REQUEST_ID;
        } else {
            holdIdObject = HOLD_REQUEST_ID;
        }
    } else {
        if (!csVoice.isRinging) {
            if (csVoice.isHold == true) {
                holdIdObject = UN_HOLD_OUTCALL_REQUEST_ID;
            } else {
                holdIdObject = HOLD_OUTCALL_REQUEST_ID;
            }
        } else {
            return;
        }
    }
    holding = true;
    messageToSend = {callId: csVoice.callInfo.callId, callType: csVoice.callInfo.callDirection, objectId: holdIdObject};
    sendAs(messageToSend);
}

function onAcceptCall() {
    answer_call();
}

function csEnableCall() {
    if(initStage !== 3){
        console.log('Ws is not init, enable call failed');
		csNotify('Có lỗi xảy ra trong quá trình thực hiện. Quý khách vui lòng refresh lại website (nhấn F5) để khởi tạo lại. Trân thành cảm ơn!');
		return;
    }
    if (csVoice.enableVoice) {
        return;
    }
    var mess = {
        objectId: CONFIRM_ENABLE_VOICE_CHANNEL_REQUEST
    }
    sendAs(mess);
}

function getTransferAgent() {
    if (csVoice.callInfo != null) {
        if (csVoice.callInfo.callDirection == 1) {
            var mess = {
                username: "",
                agentStatus: "AVAILABLE",
                callStatus: "READY",
                operation: "",
                timeInStatus: "",
                objectId: AGENT_SEARCH_AGENT_REQUEST_ID
            }
            sendAs(mess);
        }
    }
}

function getCurrentCallId() {
    if (csVoice.callInfo != null) {
        return csVoice.callInfo.callId;
    }
    return "";
}

function getHotline() {
    if (csVoice.callInfo != null) {
        return csVoice.callInfo.line;
    }
    return "";
}

function getIvrSelection() {
    if (csVoice.callInfo != null) {
        return csVoice.callInfo.queueDescription;
    }
    return "";
}

function getExtension() {
    return csUser.extension;
}


function createWs(token) {
    console.log("createWs");

    agentWebPush = new WebPush();
    agentWebPush.onConnected = function () {
        var refresh = {objectId: 1010003, authenToken: token, userToken: csVoice.userToken, initCallChannel: 1};
        sendAs(refresh);
        noRetry = 1;
        disconnectAs = false;
        //csLog('Socket connected, logging in..');
        agentWebPush.setStateReady(true);
        initStage = 3;
        console.log("onConnected");
    }

    agentWebPush.onDisconnected = function () {
		/*
        if (noRetry <= totalRetry && retryTimeout) {
            retryTimeout = false;
            setTimeout(function () {
                retryTimeout = true;
                noRetry++;
                reconnectAs();
                if (typeof csNotifyReconnecting === "function") {
                    csNotifyReconnecting(noRetry, totalRetry);
                }
            }, 10000);
        }
        if (noRetry > totalRetry) {
            csLog('Disconnected from server due to network issue, please refresh your browser');
			csNotify("Kết nối thoại bị ngắt. Quý khách vui lòng refresh lại website (nhấn F5) để tiếp tục sử dụng dịch vụ. Trân thành cảm ơn!");
            if (typeof csOndisconnected === "function") {
                csOndisconnected();
            }
        }
		*/
        disconnectAs = true;
        agentWebPush.setStateReady(false);
        initStage = 2;
        console.log("onDisconnected");
    }

    agentWebPush.onMessageReceived = function (responseResult) {
        // console.log("onMessageReceived");
        var objectId = responseResult.objectId;
        var status = responseResult.status;
        //csLog(JSON.stringify(responseResult));	// Log received message

        try {
            switch (responseResult.objectId) {
                case CHANGE_AGENT_STATUS_RESPOND_ID:
                    if (status !== "OK") {
                        if (csVoice.callStatus == 'Online') {
                            csVoice.callStatus = 'Offline';
                        } else {
                            csVoice.callStatus = 'Online';
                        }
                    }
                    csShowCallStatus(csVoice.callStatus);

                    break;
                case CHANGE_DEVICE_TYPE_RESPONSE:
                    console.log("CHANGE_DEVICE_TYPE_RESPONSE");
                    if (responseResult.result == 0) {
                        csVoice.deviceType = responseResult.oldDeviceType;
                    } else {
                        csVoice.deviceType = responseResult.newDeviceType;
                        if (responseResult.newDeviceType == 1) {
                            if (!ua || !ua.isRegistered()) {
                                init_ua(csUser.agent_id, csVoice.sip_address, csVoice.sip_socket);
                                checkMedia();
                            }
                        } else if (responseResult.oldDeviceType == 1) {
							console.log("CHANGE_DEVICE_TYPE_RESPONSE");
                            unregister();
                        }
                    }
                    csShowDeviceType(csVoice.deviceType);
                    break;
                case RING_AGENT_RESPOND_ID:
                    if (responseResult.extension == csUser.agent_id) {
                        if (csVoice.enableVoice == true) {
                            csVoice.callInfo = new CallInfo();
                            csVoice.callInfo.callId = responseResult.callId;
                            csVoice.callInfo.caller = responseResult.caller;
                            csVoice.callInfo.callerName = responseResult.caller;
                            csVoice.callInfo.line = responseResult.line;
                            csVoice.callInfo.queueDescription = responseResult.queueDescription;
                            csVoice.callInfo.callDirection = responseResult.callDirection;
                            csVoice.callInfo.agentId = responseResult.extension;
                            csVoice.hasCall = true;
                            csVoice.isRinging = true;
                            csVoice.missCall = false;
                            csVoice.isAnswering = false;
                            csVoice.isMute = false;
                            csVoice.isHold = false;
                            csVoice.isCallout = false;
                            if (csVoice.deviceType != 1) {
                                csCallRinging(responseResult.caller);
                            }
                            csCurrentCallId(responseResult.callId);
                        }
                    }
                    break;
                case AGENT_ANSWER_RESPOND_ID:
                    if (responseResult.extension == csUser.agent_id) {
                        if (csVoice.enableVoice == true) {
                            if (csVoice.deviceType != 1) {
                                csVoice.isRinging = false;
                                csVoice.isAnswering = true;
                                csAcceptCall();
                            }
                        }
                    }
                    break;
                case AGENT_END_CALL_RESPOND_ID:
                    if (responseResult.extension == csUser.agent_id) {
                        if (csVoice.enableVoice == true) {
                            if (csVoice.deviceType != 1) {
                                csVoice.hasCall = false;
                                csVoice.holding = false;
                                isClearing = false;
                                if (csVoice.isAnswering == false) {
                                    csVoice.missCall = true;
                                    csVoice.isRinging = false;
                                } else {
                                    csVoice.isAnswering = false;
                                }
                                csVoice.callInfo = null;
                                csEndCall();
                            }
                        }
                    }
                    break;
                case MUTE_RESPOND_ID:
                    if (csVoice.enableVoice == true) {
                        csVoice.isMute = true;
                        csMuteCall();
                    }
                    break;
                case UNMUTE_RESPOND_ID:
                    if (csVoice.enableVoice == true) {
                        csVoice.isMute = false;
                        csUnMuteCall();
                    }
                    break;
                case HOLD_RESPOND_ID:
                case HOLD_OUTCALL_RESPONSE_ID:
                    if (csVoice.enableVoice == true) {
                        if (responseResult.status == "OK") {
                            csVoice.holding = false;
                            csVoice.isHold = true;
                        } else {
                            csVoice.holding = false;
                        }
                        csHoldCall();
                    }
                    break;
                case UNHOLD_RESPOND_ID:
                case UNHOLD_OUTCALL_RESPONSE_ID:
                    if (csVoice.enableVoice == true) {
                        if (responseResult.status == "OK") {
                            csVoice.isHold = false;
                            csVoice.holding = false;
                        } else {
                            csVoice.holding = false;
                        }
                        csUnHoldCall();
                    }
                    break;
                case OUT_CALL_RESPONSE_ID:
                    console.log("OUT_CALL_RESPONSE_ID");
                    if (csVoice.enableVoice == true) {
                        var callOutStatus = responseResult.status;
                        if (callOutStatus.toUpperCase() === 'ERROR') {
							if (responseResult.errorCode.toUpperCase() === "IPCC_NOT_CONNECT_AGENT_ID") {
								console.log("Register SIP to 3C");
								if (!ua || !ua.isRegistered()) {
									init_ua(csUser.agent_id, csVoice.sip_address, csVoice.sip_socket);
									checkMedia();
								}
							}
							showCalloutError(responseResult.errorCode, responseResult.sipCode,responseResult.tele_messageStatus);
                            
							csVoice.isConnectToAgent = false;
                            csVoice.hasCall = false;
                            csVoice.isRinging = false;
                            csVoice.isAnswering = false;
                            csVoice.callInfo = null;
                            csVoice.isCallout = false;
                        } else if (callOutStatus.toUpperCase() == "STARTING") {
                            if (csVoice.callInfo == null) {
                                csVoice.callInfo = new CallInfo();
                                csVoice.isCallout = true;
                                csVoice.callInfo.callId = responseResult.callId;
                            } else {
                                csVoice.callInfo.callId = responseResult.callId;
                            }
							csStartCall();
                        } else if (callOutStatus.toUpperCase() === "RINGING") {
                            if (csVoice.deviceType != 1) {
                                csVoice.isConnectToAgent = false;
                                csVoice.hasCall = true;
                                csVoice.isRinging = true;
                                csVoice.missCall = false;
                                csVoice.isAnswering = false;
                                csVoice.isMute = false;
                                csVoice.isHold = false;
                                csVoice.callInfo.caller = responseResult.telephoneNumber;
                                csVoice.callInfo.callerName = responseResult.telephoneNumber;
                                csVoice.callInfo.line = responseResult.line == "" ? " " : responseResult.line;
                                csVoice.callInfo.callDirection = 2;
                                csVoice.callInfo.agentId = responseResult.extension;
								
								console.log(callOutStatus.toUpperCase());
								
                                showCalloutInfo(responseResult.telephoneNumber,responseResult.tele_messageStatus);
                            }
                            csCurrentCallId(responseResult.callId);
                            csCallRinging(responseResult.telephoneNumber);
                        } else if (callOutStatus.toUpperCase() === "ANSWER") {
                            if (csVoice.deviceType != 1) {
                                csVoice.isRinging = false;
                                csVoice.isAnswering = true;
                                showCalloutInfo(responseResult.telephoneNumber,responseResult.tele_messageStatus);
                            }
                            csCustomerAccept();
                        } else if (callOutStatus.toUpperCase() === "ENDCALL") {
                            if (csVoice.deviceType != 1) {
                                csVoice.hasCall = false;
                                csVoice.isConnectToAgent = false;
                                csVoice.isRinging = false;
                                csVoice.isAnswering = false;
                                csVoice.holding = false;
                                isClearing = false;
                                csVoice.isAnswering = false;
                                csVoice.isCallout = false;
                                csVoice.callInfo = null;
                                showCalloutInfo(responseResult.telephoneNumber,responseResult.tele_messageStatus);
                            }
                        } else if (callOutStatus.toUpperCase() === "TERMINATE") {
                            if (csVoice.deviceType != 1) {
                                csVoice.hasCall = false;
                                csVoice.isConnectToAgent = false;
                                csVoice.isRinging = false;
                                csVoice.isAnswering = false;
                                csVoice.holding = false;
                                csVoice.isAnswering = false;
                                csVoice.isCallout = false;
                                csVoice.callInfo = null;
                            }
                        }
                    }

                    break;
                case ERROR_CALL_RESPONSE_ID:
                    if (responseResult.status != "OK") {
                        $.jGrowl($filter('translate')(responseResult.status), {theme: 'error'});
                    }
                    if (responseResult.status == ERROR_CODE_CALL_NOT_FOUND) {
                        csVoice.hasCall = false;
                        csVoice.missCall = false;
                        csVoice.isAnswering = false;
                        csVoice.isRinging = false;
                        csVoice.isMute = false;
                        csVoice.isHold = false;
                        csVoice.isCallout = false;
                        csVoice.callInfo = null;
                    }

                    break;
                case REFRESH_ID:
                    console.log(REFRESH_ID);
                    connected = true;
                    if (responseResult.agentStatus !== "AVAILABLE") {
                        csVoice.callStatus = 'Offline';
                    } else {
                        csVoice.callStatus = 'Online';
                    }
                    csShowCallStatus(csVoice.callStatus);
					
					// longth
					//console.log("REFRESH_ID --> isVoiceChannel: " + responseResult.isVoiceChannel);
					
                    if (responseResult.isVoiceChannel == 1) {
                        csVoice.enableVoice = true;
                        if (responseResult.deviceType == 1) {
                            if (!ua || !ua.isRegistered()) {
                                init_ua(csUser.agent_id, csVoice.sip_address, csVoice.sip_socket);
                                checkMedia();
                            }
                        } else {
                            changeDevice(1, "");
                        }
                        csVoice.deviceType = responseResult.deviceType;
                    } else {
                        csVoice.enableVoice = false;
                        csVoice.deviceType = responseResult.deviceType;
                    }
                    csShowEnableVoice(csVoice.enableVoice);
                    csShowDeviceType(csVoice.deviceType);
                    
					csInitComplete();
                    //totalRetry = 20;
					totalRetry = 5;
                    clearInterval(pingreq);
                    pingreq = setInterval(function () {
                        if (true || disconnectAs == true || !csVoice.enableVoice || initStage!= 3) {
                            clearInterval(pingreq);
                        } else {
                            var now = new Date().getTime() - lastSentTime;
                            var itv = Math.round(now / 1000);
                            if (itv > timeoutToPing) {
                                sendAs(ping);
                            }
                        }
                    }, 10000);
                    //csLog('Logged in successful');
                    break;
                case LOGIN_RESPONSE_ID:
                    channelId = responseResult.channelId;

                    break;
                case ENABLE_VOICE_CHANNEL_RESPONSE:
					// longth
					//console.log("[LongTH] ENABLE_VOICE_CHANNEL_RESPONSE");
                    console.log("ENABLE_VOICE_CHANNEL_RESPONSE");
					
                    if (responseResult.result == 1) {
                        csVoice.deviceType = responseResult.deviceType;
                        if (responseResult.deviceType == 1) {
                            totalRetry = 20;
                            if (!ua || !ua.isRegistered()) {
                                init_ua(csUser.agent_id, csVoice.sip_address, csVoice.sip_socket);
                            }
                        } else {
                            totalRetry = 20;
                            changeDevice(1, "");
                        }
                        csVoice.enableVoice = true;
                        csShowEnableVoice(csVoice.enableVoice);
                    }

                    break;
                case CONFIRM_ENABLE_VOICE_CHANNEL_RESPONSE:
					// longth
					//console.log("[LongTH] CONFIRM_ENABLE_VOICE_CHANNEL_RESPONSE");
					
                    confirmEnableVoice = true;
                    break;
                case DISABLE_VOICE_CHANNEL_RESPONSE:
					// longth
					console.log("[LongTH] DISABLE_VOICE_CHANNEL_RESPONSE");
					
                    csVoice.enableVoice = false;
                    csShowEnableVoice(csVoice.enableVoice);
                    //
                    unregister();
                    closeWebsocket();
                    clearAllState();
                    break;
                case PING_ID:
                    sendAs(ping);
                    break;
                case RELOAD_AGENT_STATUS_RESPONSE_ID:
                    if (responseResult.agentStatus == "NO ANSWER") {
                        csVoice.callStatus = "No Answer";
                        csShowCallStatus(csVoice.callStatus);
                    }
                    break;
                case INTERNAL_CALL_RING_RESPONSE_ID:
                    if (csVoice.enableVoice == true) {
                        csVoice.isConnectToAgent = false;
                        csVoice.hasCall = true;
                        csVoice.isRinging = true;
                        csVoice.missCall = false;
                        csVoice.isAnswering = false;
                        csVoice.isMute = false;
                        csVoice.isHold = false;
                        csVoice.callInfo = new CallInfo();
                        csVoice.callInfo.callId = responseResult.callId;
                        csVoice.callInfo.caller = responseResult.called;
                        csVoice.callInfo.callerName = responseResult.called;
                        csVoice.callInfo.line = "";
                        csVoice.callInfo.callDirection = 3;
                        csVoice.callInfo.agentId = responseResult.called;
                    }

                    break;
                case INTERNAL_CALL_ANSWER_RESPONSE_ID:
                    if (csVoice.enableVoice == true) {
                        if (csVoice.deviceType != DEVICE_BROWSER) {
                            csVoice.isRinging = false;
                            csVoice.isAnswering = true;
                        }
                    }

                    break;
                case INTERNAL_CALL_END_RESPONSE_ID:
                    if (csVoice.enableVoice == true) {
                        if (csVoice.deviceType != DEVICE_BROWSER) {
                            csVoice.hasCall = false;
                            csVoice.isConnectToAgent = false;
                            csVoice.isRinging = false;
                            csVoice.isAnswering = false;
                            csVoice.holding = false;
                            isClearing = false;
                            csVoice.callInfo = null;
                        }
                    }
                    break;
                case TERMINATE_RESPOND_ID:
                    var callId = responseResult.callId;
                    var status = responseResult.status;
                    if (status != "OK") {
                        var errorMessage = getErrorMessage(status);
                        console.log('errorMessage');
                    } else {
                        var superAgent = responseResult.superAgent;
                        var terminatedAgent = responseResult.terminatedAgent;
                        //lay thong tin ve Agent extension
                        var currentAgentId = csUser.agent_id;
                        //neu du lieu nhan ve, ung voi man hinh cua Agent ra lenh ket thuc, thuong la Supervisor
                        //hien thi thong bao ket thuc cuoc goi thanh cong
                        if (currentAgentId != terminatedAgent) {
                            //neu du lieu nhan ve, ung voi man hinh cua Agent bi ket thuc cuoc goi,
                            // hien thi thong bao nguyen nhan vi sao cuoc goi bi ket thuc
                            $.jGrowl($filter('translate')('SUPER_TERMINATE_SUCCESSFUL', {superAgent: superAgent, call: callId}), {theme: 'notice'});
                        }
                    }

                    break;
                case AGENT_SEARCH_AGENT_RESPONSE_ID:
                    listTransferAgent = responseResult.listAgentSearch;
                    csListTransferAgent(listTransferAgent);
                    break;

                case TRANSFER_AGENT_TO_AGENT_CONFIRM_REQUEST_ID:
                    if (csVoice.enableVoice == true) {
                        csNewCallTransferRequest(responseResult);
                        csVoice.transferRequest = responseResult;
                        timeoutTransfer = setTimeout(function () {
                            responseTransferAgent(0);
                        }, 10000);
                    }
//                case SHOW_MESSAGEBOX_REQUEST_ID:
//                    csTransferAlert(responseResult.message);
//                    break;
                case TRANSFER_AGENT_TO_AGENT_CONFIRM_RESPONSE_ID:
                    if (responseResult.status == "OK") {
                        csTransferCallResponse("OK");
                    } else {
                        csTransferCallResponse("NOK");
                    }
                    break;
                case TRANFER_TO_ACD_RESPONSE:
                    if (responseResult.status == "OK") {
                        csTransferCallResponse("OK");
                    } else {
                        csTransferCallResponse("NOK");
                    }
                    break;
                case TRANSFER_AGENT_TO_AGENT_RESPOND_ID:
                    var callId = responseResult.callId;
                    var status = responseResult.status;
                    var agentReceive = {superAgent: responseResult.superAgent, ipphone: responseResult.newAgent};
                    if (responseResult.dropAgent == csUser.agent_id) {
                        if (status != "OK") {
                            var errMessage = getErrorMessage("IPCCERR0013");
                            csTransferCallError(errMessage, agentReceive);
                        } else {
                            csTransferCallSuccess(agentReceive);
                        }
                    } else if (csUser.agent_id == responseResult.newAgent) {
                        if (status != "OK") {
                            var errorMessage = getErrorMessage(status);
                            csTransferCallError(errorMessage);
                        }
                    }
                    break;
                case TERMINATE_CALL_RESPOND_ID:
                    //console.log( '===========> ket thuc.' );
					endCall();
					if((responseResult.msg != null) && (responseResult.msg != "")) csNotify(responseResult.msg);
					disableCallPopup(true);
					csVoice.hasCall = false;
					csVoice.isConnectToAgent = false;
					csVoice.holding = false;
					isClearing = false;
					if (csVoice.isAnswering == false) {
						csVoice.missCall = true;
						csVoice.isRinging = false;
					} else {
						csVoice.isAnswering = false;
					}
					csVoice.callInfo = null;
					//csEndCall();
                    break;   
                case REPORT_RESPOND_ID:
					//console.log( '===========> notice.' );
					csNotify(responseResult.msg);
					disableCallPopup(true);
					break;       
            }
        } catch (ex) {
            console.log(ex.message);
        }
    };

    agentWebPush.connect(csVoice.agentserver_socket, 0);
}
function reconnectAs() {
    csLog('Lost connect to socket server,reconnecting....(' + noRetry + '/' + totalRetry + ')');
    if (csVoice.agentserver_socket) {
        // if ($scope.permission.VOICE_VIA_BROWSER) {
        // if ($scope.deviceType == DEVICE_BROWSER) {
        //     $window.location.reload();
        // } else {
        agentWebPush.connect(csVoice.agentserver_socket, 0);
        // }
    }
}

var getErrorMessage = function (errorCode) {
    if (errorCode == "IPCCERR0000") {
        return "CANNOT_FIND_THE_CALL";
    }
    if (errorCode == "IPCCERR0001") {
        return "AGENT_IS_NOT_AVAILABLE";
    }
    if (errorCode == "IPCCERR0002") {
        return "CANNOT_FIND_THE_AGENT";
    }
    if (errorCode == "IPCCERR0003") {
        return "AGENT_IS_IN_MUTE_OR_HOLD_STATUS";
    }
    if (errorCode == "IPCCERR0004") {
        return "AGENT_IS_NOT_IN_MUTE_STATUS";
    }
    if (errorCode == "IPCCERR0005") {
        return "AGENT_IS_NOT_IN_HOLD_STATUS";
    }

    if (errorCode == "IPCCERR0007") {
        return "NUMBER_OF_PARAMETERS_ARE_NOT_SATISFIED";
    }
    if (errorCode == "IPCCERR0008") {
        return "CANNOT_HOLD_THE_RINGING_CALL";
    }
    if (errorCode == "IPCCERR0009") {
        return "CANNOT_MUTE_THE_RINGING_CALL";
    }

    if (errorCode == "IPCCERR0011") {
        return "CANNOT_INTERCEPT_A_MUTING_CALL";
    }
    if (errorCode == "IPCCERR0012") {
        return "NOT_CHOOSE_TYPE_TRANSFER";
    }
    if (errorCode == "IPCCERR0013") {
        return "TRANSFER_CALL_FAILED";
    }
    if (errorCode == "IPCCERR0014") {
        return "NOT_IN_A_CALL";
    }
    if (errorCode == "IPCCERR0015") {
        return "COULD_NOT_GET_CALL_INFO";
    }

    return errorCode;
}

function hasCallRinging(phoneNumber) {
    if (csVoice.callInfo != null && csVoice.isCallout) {
        answer_call();
        csVoice.isConnectingCall = false;
    } else {
        csVoice.hasCall = true;
        csVoice.isRinging = true;
        csVoice.missCall = false;
        csVoice.isAnswering = false;
        csVoice.isMute = false;
        csVoice.isHold = false;
        csVoice.callInfo = new CallInfo();
        csVoice.callInfo.caller = phoneNumber;
        csVoice.callInfo.callerName = phoneNumber;
        csVoice.callInfo.callDirection = 1;
    }
}

function isCsCallout() {
    return (csVoice.hasCall == true && csVoice.isCallout == true);
}

function acceptedCall() {
    if (!csVoice.isCallout) {
        csVoice.isRinging = false;
        csVoice.isAnswering = true;
    } else {
        csVoice.isRinging = false;
        csVoice.isAnswering = true;
        csVoice.isConnectToAgent = false;
    }
}

function endedCall() {
    if (!csVoice.isCallout) {
        csVoice.hasCall = false;
        csVoice.holding = false;
        isClearing = false;
        if (csVoice.isAnswering == false) {
            csVoice.missCall = true;
            csVoice.isRinging = false;
        } else {
            csVoice.isAnswering = false;
        }

    } else {
        csVoice.hasCall = false;
        csVoice.isConnectToAgent = false;
        csVoice.isRinging = false;
        csVoice.isAnswering = false;
        csVoice.holding = false;
        isClearing = false;
    }
    csVoice.isCallout = false;
    csVoice.callInfo = null;
}


function csTransferCallAgent(ipphone) {
    var transfer = {agent: {ipPhone: ipphone}};
    transferCallAgent(1, transfer);
}

function csTransferCallAcd(queueId) {
    var transfer = {acd: {queueId: queueId}};
    transferCallAgent(2, transfer);
}
function transferCallAgent(type, transferInfo) {
    if (!csVoice.isAnswering) {
        csTransferCallError(getErrorMessage("IPCCERR0014"));
        return;
    }
    if (!csVoice.callInfo) {
        csTransferCallError(getErrorMessage("IPCCERR0015"));
        return;
    }
    if (type) {
        if (type == 1) {
            if (transferInfo.agent != "") {
                var mess = {
                    callId: csVoice.callInfo.callId,
                    newAgentId: transferInfo.agent.ipPhone,
                    dropAgentId: csVoice.callInfo.agentId,
                    objectId: TRANSFER_AGENT_TO_AGENT_CONFIRM_REQUEST_ID
                }
                sendAs(mess);
            }
        } else {
            if (transferInfo.acd != "") {
                var mess = {
                    callId: csVoice.callInfo.callId,
                    acdId: transferInfo.acd.queueId,
                    objectId: TRANSFER_TO_ACD_REQUEST_ID
                };
                sendAs(mess);
            }
        }
    } else {
        var errorMess = getErrorMessage("IPCCERR0012");
        csTransferCallError(errorMess);
    }
}

function responseTransferAgent(val) {
    clearTimeout(timeoutTransfer);
    var mess = {
        callId: csVoice.transferRequest.callId,
        dropAgentId: csVoice.transferRequest.dropAgentId,
        newAgentId: csVoice.transferRequest.newAgentId,
        status: val == 1 ? "OK" : "NOK",
        objectId: TRANSFER_AGENT_TO_AGENT_CONFIRM_RESPONSE_ID
    }
    sendAs(mess);
}
function csLog(message) {
    var debug = localStorage.getItem("csDebug");
    if (debug != 'off') {
        console.log(message);
    }
}
function notifyMe(number) {
    if (!Notification) {
        return;
    }

    if (Notification.permission !== "granted")
        Notification.requestPermission();
    else {
        notification = new Notification("New Phone", {
            icon: '../images/phone-noti.png',
            body: "SÄT" + " " + number,
            tag: 'new-phone-call-arrive',
        });

        notification.onclick = function () {
            window.focus();
            if (csVoice.deviceType == 1) {
                // GUI.buttonAnswerClick(_Session);
                answer_call();
            }
        }
    }
}
