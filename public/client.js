 const socket=io();

 let name;
 let message_area=document.querySelector('.message_area')
 let textarea=document.querySelector('textarea')
 do{
 	name=prompt("please enter your name");
 }while(!name)

 textarea.addEventListener('keyup',(e)=>{
 	if(e.key==='Enter'){
 		sendMessage(e.target.value)
 	}
 })

 function sendMessage(message){
 	let msg={
 		user:name,
 		message:message.trim()
 	}
 	//append
 	appendMessage(msg,'outgoing')
 	textarea.value=''
 	scrollToBottom()


    //send to server
    socket.emit('message',msg)

 }
 function appendMessage(msg,type){
 	 let mainDiv=document.createElement('div')
 	 let  className=type
 	 mainDiv.classList.add(className,'message')

 	 let markup= `<h4>${msg.user}</h4>
                  <p>${msg.message}</p>
 	 `
    mainDiv.innerHTML=markup
    message_area.appendChild(mainDiv)
  
 }

 //recieve msg
 socket.on('message',(msg)=>{
 	appendMessage(msg,'incoming')
 	scrollToBottom()
 })

 function scrollToBottom(){
 	message_area.scrollTop=message_area.scrollHeight
 }