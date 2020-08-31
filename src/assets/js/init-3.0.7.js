var state =
    {
        // 'connecting' / disconnected' / 'connected' / 'registered'
        status          : 'disconnected',
        session         : null
    };

// UA
var ua = null;

// var selfView = document.getElementById('my-video');
// var remoteView = document.getElementById('peer-video');

var selfView = null;
var remoteView = null;

// HTML5 <video> elements in which local and remote video will be shown
// var selfView = document.getElementById('my-video');
// var remoteView = document.getElementById('peer-video');

function init_ua(agentId, uri, ws) {
    var socket = new JsSIP.WebSocketInterface(ws);
    var configuration = {
        sockets  : [ socket ],
        uri      : "sip:" + agentId + '@' + uri,
        password : 'sip_password'
    };
    ua = new JsSIP.UA(configuration);
    if (selfView == null) {
        selfView = document.getElementById('my-video');
        remoteView = document.getElementById('peer-video');
    }

    // events handler
    ua.on('connected', function(e){/* Your code here */
        state.status = 'connected';
    });

    ua.on('disconnected', function(e){ /* Your code here */
        state.status = 'disconnected';
    });

    ua.on('registered', function(e){ /* Your code here */
        state.status = 'registered';
    });

    ua.on('unregistered', function(e) { /* Your code here */
        if (ua.isConnected())
            state.status = 'unregistered';
        else
            state.status = 'disconnected';
    });

    ua.on('registrationFailed', function(e){ /* Your code here */
        if (ua.isConnected())
            state.status = 'unregistered';
        else
            state.status = 'disconnected';
    });

    ua.on('newRTCSession', function(e){/* Your code here */
        // Avoid if busy or other incoming
        // if (state.session || state.incomingSession) {
        //     session.terminate(
        //     {
        //         status_code   : 486,
        //         reason_phrase : 'Busy Here'
        //     });
        //     return;
        // }

        var session = state.session = e.session;

        session.on('failed', function(e)
        {
            state.session = null;
            endedCall();csEndCall();
        });


        session.on('ended', function(e)
        {
            state.session = null;
            //selfView.srcObject = null;
            //remoteView.srcObject = null;
            endedCall();csEndCall();
        });

        session.on('progress', function(e) {
            var remote_identity = session.remote_identity;
            if(remote_identity) {
                var uri = remote_identity.uri;
                if(uri) {
                    var user = uri.user;
                    hasCallRinging(user);

                    if (csVoice.callInfo != null && csVoice.isCallout) {
                        csCallRingingAgent();
                    } else {
                        csCallRinging(user);
                    }
                }
            }
        });

        session.on('accepted', function(e)
        {
            state.session = session;
            var peerconnection = session.connection;
            var localStream = peerconnection.getLocalStreams()[0];
            var remoteStream = peerconnection.getRemoteStreams()[0];
            //selfView.srcObject = localStream;
            remoteView.srcObject = remoteStream;
            acceptedCall();
            if (csVoice.callInfo != null && csVoice.isCallout) {

            } else {
                csAcceptCall();

            }
        });

    });

    ua.start();
}
;

function register() {
    if(!ua || !ua.isRegistered()) {
        init_ua();
    }
}

function unregister() {
//    if (ua && ua.isRegistered()) {
//        ua.unregister();
//    }
    if (ua && typeof ua.stop == 'function') {
        ua.stop();
    }
}

function dial_call(uri) {

    if(!ua || !ua.isConnected) return;

    // Register callbacks to desired call events
    var eventHandlers = {
        'progress':   function(data){ /* Your code here */ },
        'failed':     function(data){ /* Your code here */ },
        'confirmed':  function(data){ /* Your code here */ },
        'ended':      function(data){ /* Your code here */ }
    };

    var options = {
        'eventHandlers': eventHandlers,
        // 'extraHeaders': [ 'X-Foo: foo', 'X-Bar: bar' ],
        'mediaConstraints': {'audio': true, 'video': false},
        'sessionTimersExpires': 1800,
        'pcConfig': {
            rtcpMuxPolicy: "require",
            'iceServers': [
                { 'urls': ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302'] }
            ]
        },
        rtcOfferConstraints: {
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 0
        }
    };

    ua.call(uri, options);
};

function answer_call() {
    console.log('Tryit: answer_call');
    var session = state.session;
    if (session) {

        session.answer({
            // pcConfig: peerconnection_config,
            // TMP:
            sessionTimersExpires: 1800,
            mediaConstraints: {audio: true, video: false},
            // extraHeaders: [
            //   'X-Can-Renegotiate: ' + String(localCanRenegotiateRTC())
            // ],
            pcConfig: {
                rtcpMuxPolicy: "require",
                'iceServers': [
                    { 'urls': ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302'] }
                    // { 'urls': 'turn:example.com', 'username': 'foo', 'credential': ' 1234'}
                ]
            },
            rtcOfferConstraints: {
                offerToReceiveAudio: 1,
                offerToReceiveVideo: 0
            }
        });
    }
}
;

function terminate_call() {
    var session = state.session;
    if (session) {
        session.terminate();
    }
}
;

function sendDTMF(digit) {
    var session = state.session;
    if(session) {
        session.sendDTMF(digit);
    }
}