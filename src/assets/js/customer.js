var userToken = null;
var isActiveCall = false;

function setServiceUrl(url){
	API_SERVER=url;
}

function transferObj(obj){
	sendAs(obj);
}

function setAuthToken(value){
	userToken = value
}
function getAuthToken(){
	return userToken;
}
function getCsVoiceEnable(){
	return csVoice.enableVoice && initStage==3;
}
function csEndCall() {
	//console.log("Call is ended");
	setCallPopupMessage("Kết thúc cuộc gọi");
	endTimerCounter();
}

function csOndisconnected() {
	isInitialized = false;
}


function csCallRingingAgent() {
	//console.log("Has a new call to agent");
}

function setCallPopupMessage(message) {
	callstatus = document.getElementById("callstatusid");
	if(callstatus) callstatus.innerHTML = message;
}

function csStartCall(){
	//callstatus = document.getElementById("callstatusid");
	//callstatus.innerHTML = "Thực hiện cuộc gọi....";
	setCallPopupMessage("Thực hiện cuộc gọi....");
}

function popupNotify(message)
{
	popupId = document.getElementById("popup-cs");
	popupContentTag = document.getElementById("setContent");
	popupContentTag.innerHTML = message;
	popupId.style.display = "block";
}

function csCallRinging(phone) {
	//console.log("Has a new call to customer: ");
	//callstatus = document.getElementById("callstatusid");
	//callstatus.innerHTML = "Đang đổ chuông";
	setCallPopupMessage("Đang đổ chuông");
}

function csAcceptCall() {
	//console.log("Call is Accepted");
}

function csCustomerAccept() {
	//console.log("csCustomerAccept");
	//callstatus = document.getElementById("callstatusid");
	//callstatus.innerHTML = "Thuê bao nghe máy";
	setCallPopupMessage("Thuê bao nghe máy");

	startTimerCounter();
}

function csMuteCall() {
	//console.log("Call is muted");
}

function csUnMuteCall() {
	//console.log("Call is unmuted")
}

function csHoldCall() {
	//console.log("Call is holded");
}

function csUnHoldCall() {
	//console.log("Call is unholded");
}

function showCalloutInfo(number,msg) {
	//console.log("callout to XXXXXXX");
	if(msg){
		console.log("info: "+msg);
		setCallPopupMessage(msg);
	}
}

function showCalloutError(errorCode, sipCode,msg) {
	if(msg){
		console.log("err: "+msg);
		setCallPopupMessage(msg);
		return;
	}
	//console.log("callout error " + errorCode + " - " + sipCode);
	//callstatus = document.getElementById("callstatusid");
	if ( sipCode ===  '486'){
		setCallPopupMessage("Thuê bao tắt máy");
	}else if( sipCode === '480'){
		setCallPopupMessage("Thuê bao không nghe máy");
	}else{
		setCallPopupMessage("Kết thúc cuộc gọi");
	}
}

function csShowEnableVoice(enableVoice) {
	/*
	if (!enableVoice) {
		csEnableCall();
	} else {
		var e = document.getElementById("callButton");
		if(e) {
			// alert("Remove");
			e.disabled = false;
		}
	}
	*/
}

function csNotify(message){
	//alert(message);
	// Disable call popup
	popupCallId = document.getElementById("bv-modal-call___BV_modal_content_");
	if(popupCallId != null) popupCallId.style.display = "none";
	// Dispatch message popup
	popupId = document.getElementById("popup-cs");
	popupContentTag = document.getElementById("setContent");
	if(popupContentTag != null) popupContentTag.innerHTML = message;

	if(popupId != null){
		popupId.style.display = "block";
		popupId.style.zIndex = "99999999";
	}
}

function csShowDeviceType(type) {
	//console.log("csShowDeviceType");
}

function csShowCallStatus(status) {
	//console.log("csShowCallStatus: " + status);
}

function csInitComplete() {
	console.log("csInitComplete: " + csVoice.enableVoice);

	if (!csVoice.enableVoice) {
		//console.log("Start enable voice");
		csEnableCall();
	}else{
	}
	//// enable button OK
}

function csCurrentCallId(callId) {
	//console.log("csCurrentCallId: " + callId);
}

function disableCallPopup(hidden) {
	callPopup = document.getElementById("bv-modal-call___BV_modal_outer_");
	if(callPopup) {
		if(hidden){
			callPopup.classList.add("hiddenPopup");
		}else{
			callPopup.classList.remove("hiddenPopup");
		}
	}
}

function csInitError(error) {
	console.log("csInitError");
	isInitialized = false;
	//console.log("csInitError: " + error);
	alert('Có lỗi xảy ra trong quá trình thực hiện. Quý khách vui lòng refresh lại website (nhấn F5) để khởi tạo lại!');

	//callPopup = document.getElementById("bv-modal-call");
	//if(callPopup) callPopup.parentNode.remove();
	disableCallPopup(true);
}

async function  waitConnect (wp, timeout = 10000) {

  if (wp && wp.readyState) {
    return wp.readyState;
  }
  else {
    const intrasleep = 100
    const ttl = timeout / intrasleep // time to loop
    let loop = 0
    while ( initStage == 1 && loop < ttl) {
      await new Promise(resolve => setTimeout(resolve, intrasleep))
      loop++
    }
    console.log("waitConnect end" );
    return wp && wp.readyState;
  }
};

function closeUAWS(){
	if(ua && ua.transport){
		if(ua.transport.socket){
			ua.transport.socket.disconnect();
		}
		if(ua.transport.sockets){
			for (var i = ua.transport.sockets.length - 1; i >= 0; i--) {
				var s = ua.transport.sockets[i];
				if(s.socket){
					s.socket.disconnect();
				}
			}
		}
	}
}

async function clearStateFromBrowser(){
	// console.log("clearStateFromBrowser");
	// if( agentWebPush && !agentWebPush.stateReady){
	// 	console.log("Websocket closed or closing! reconnect!");
	// 	if(agentWebPush.close){
	// 		agentWebPush.close();
	// 	}
	// 	const st =  await waitClosing(agentWebPush,60000);
	// }else if(state && state.status !=="connected"){
	// 	console.log("UA "+ state.status);
	// }
	// closeUAWS();
	// clearAllState();
	// isInitialized = false;
}

async function cleanAll(){
	if(initStage!== 3){
		return;
	}
	console.log("cleanAll");
	csUnregister();
	if( agentWebPush){
		// console.log("Websocket closed or closing! reconnect!");
		if(agentWebPush.close){
			agentWebPush.close();
		}
		const st =  await waitClosing(agentWebPush,60000);
	}else if(state && state.status !=="connected"){
		// console.log("UA "+ state.status);
	}
	closeUAWS();
	clearAllState();
	isInitialized = false;
	initStage =0;
}

async function closeWebsocket(){
	if( agentWebPush && agentWebPush.stateReady ){
		console.log("Websocket closed or closing! reconnect!");
		if(agentWebPush.close){
			agentWebPush.close();
			const st =  await waitClosing(agentWebPush,60000);
		}
	}
}

var timerSocketCloseID=null;
function timerCheckSocketClose(){
	timerSocketCloseID = setTimeout(function(){


	},1000);
}

var isInInit =false;
// conghc
async function initCall(){

	if(initStage == 3){
		disableCallPopup(false);
		return initStage;
	}
	if(isInInit){
		alert("Đang khởi tạo kênh thoại!");
		return initStage;
	}

	console.log("initStage 1: " + initStage);
	// disableCallPopup(false);

	isInInit = true;
	initStage = 1;

	console.log("clearStateFromBrowser");
	if( agentWebPush && agentWebPush.stateReady){
		console.log("Websocket closed or closing! reconnect!");
		if(agentWebPush.close){
			agentWebPush.close();
			const st =  await waitClosing(agentWebPush,120000);
		}

	}else if(state && state.status !=="connected"){
		console.log("UA "+ state.status);
	}
	closeUAWS();
	clearAllState();
	isInitialized = false;

	await clearStateFromBrowser();

	// if (!isInitialized) {
		// console.log("csInit: "+userToken);
		csInit(userToken);

		if(agentWebPush){
			const st = await waitConnect(agentWebPush,120000);
		}

	// }else{
		//disableCallPopup(false);
	// }

	console.log("initStage 2: " + initStage);
	if(initStage == 0){
		disableCallPopup(true);
	}
	else if(initStage!= 2){
		disableCallPopup(false);
	}else{

	}

	console.log("initCall End! ");
	isInInit = false;
	return initStage;
}
// end conghc

function takeCall(isdn_id,user_id,hobby_id,masked_isdn,freq,id,utm,context) {
	//console.log("csVoice.enableVoice: " + csVoice.enableVoice);
	// if ((isInitialized)&&(csVoice.enableVoice)) {
	if ((initStage==3)&&(csVoice.enableVoice)) {
		//console.log("Calling to: " + isdn_id);
		//console.log("enableVoice attribute:" + csVoice.enableVoice);
		csCallout(isdn_id, userToken,user_id,hobby_id,masked_isdn,freq,id,utm,context);
	}else {
		alert('Quá trình khởi tạo máy nhánh chưa thành công. Quý khách vui lòng refresh lại website (nhấn F5) để khởi tạo lại. Trân thành cảm ơn!');
		disableCallPopup(true);
		clearStateFromBrowser();
	}
}

function finishCall() {
	endCall();

	// longth
	//csUnregister();
}

var minutesLabel = null;
var secondsLabel = null;
var totalSeconds = 0;
var callTimer = null;
var favoriteThresh=0;
var mycontroler = null;

function getTotalCallTime(){
	secondsLabel = document.getElementById("CallSeconds");

	if(secondsLabel=== undefined ||  secondsLabel === null || secondsLabel.data === undefined){
		return 0;
	}else{
		return secondsLabel.data;
	}
}

function asyncGetTotalCallTime(){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			if(totalSeconds < 1){
				reject(false)
			}
			resolve(true)
		},2500)
	})
}

function startTimerCounter()
{
	minutesLabel = document.getElementById("CallMinutes");
	secondsLabel = document.getElementById("CallSeconds");

	mycontroler = document.getElementById("mycontroler");
	if(mycontroler !== null ){
		var data = mycontroler.getAttribute("data");
		if(data!=null){
			favoriteThresh=parseInt(data);
		}
	}

	totalSeconds = 0;
	callTimer = setInterval(setTime, 1000);

}

function endTimerCounter()
{
	favoriteThresh = 0;
	minutesLabel = null;
	secondsLabel = null;
	clearInterval(callTimer);
}

function setTime() {
	++totalSeconds;

	minutesLabel.innerText = pad(parseInt(totalSeconds / 60));
	secondsLabel.innerText = pad(totalSeconds % 60);
	secondsLabel.data =  totalSeconds;
	if(mycontroler!=null){
		if(favoriteThresh<=totalSeconds){
			mycontroler.classList.remove("adisabled");
			mycontroler = null;
		}
	}

}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
function activate(){
	var myVideo = document.getElementById("my-video");
	myVideo.autoplay = true;
	myVideo.load();

	var peerVideo = document.getElementById("peer-video");
	peerVideo.autoplay = true;
	peerVideo.load();
}

function deactivate(){
	var myVideo = document.getElementById("my-video");
	myVideo.autoplay = false;
	var peerVideo = document.getElementById("peer-video");
	peerVideo.autoplay = false;
}
module.exports = {
	cleanAll,clearStateFromBrowser,setServiceUrl,csEndCall,csNotify, csCallRingingAgent, csCallRinging, csStartCall, csAcceptCall, csCustomerAccept, csMuteCall, csUnMuteCall, csHoldCall, csUnHoldCall, showCalloutInfo, showCalloutError, csShowEnableVoice, csShowDeviceType, csShowCallStatus, csInitComplete, csCurrentCallId, csInitError, takeCall, finishCall,initCall,setAuthToken,getAuthToken,pad,setTime,endTimerCounter,startTimerCounter,getTotalCallTime,getCsVoiceEnable,transferObj,activate,deactivate,asyncGetTotalCallTime
}
