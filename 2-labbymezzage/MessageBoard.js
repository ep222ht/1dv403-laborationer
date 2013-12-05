"use strict";
function MessageBoard(boardID){
    var messages = [];
    
    this.getMessages = function(){
        return messages;
    }
    
    this.getBoardID = function(){
        return boardID;
    }
    var that = this;
    
    //skapa ett Messageboard
	writeBoard();
    function writeBoard(){
        var board = document.getElementsByClassName("board")[boardID - 1];
		
		//rubrik
        var headline = document.createElement("h1");
        headline.innerHTML = ("Labby Mezzage " + boardID);
        board.appendChild(headline);
        
		//div-tag för meddelanden och inmatningsruta
        var main = document.createElement("div");
        main.className = "main";
        board.appendChild(main);
        
		//div-tag för meddelandena
        var showMessages = document.createElement("div");
        showMessages.className = "messages";
        main.appendChild(showMessages);
        
		//visar antal meddelanden
        var msgCount = document.createElement("p");
        msgCount.className = "msgCount";
        msgCount.innerHTML = "Antal meddelanden: ";
        main.appendChild(msgCount);
        
		//skapa textruta för inmatning
        var textfield = document.createElement("textarea");
        textfield.onkeypress = function(e){
            if (!e) {
                var e = window.event;
            }
			//radbrytning när användaren trycker på shift-enter
            if (e.shiftKey && e.keyCode == 13) {
                textfield.value += "\n";
                return false;
            }
			//skicka meddelande när användaren trycker på enter
            if (e.keyCode == 13) {
                that.submitMessage(textfield.value);
                textfield.value = "";
                return false;
            }
        }
        main.appendChild(textfield);
        
		//skicka meddelande när användaren klickar på "skicka"
        var submit = document.createElement("input");
        submit.type = "button";
        submit.value = "skicka";
        submit.onclick = function(e){
            that.submitMessage(textfield.value);
            textfield.value = "";
            return false;
        }
        main.appendChild(submit);
    }
}

MessageBoard.prototype.submitMessage = function(message){
    this.getMessages().push(new Message(message, new Date));
    this.renderMessages();
}
MessageBoard.prototype.renderMessages = function(){
    //Ta bort alla meddelanden
    document.getElementsByClassName("messages")[this.getBoardID() - 1].innerHTML = "";
    
    //Skriver ut alla meddelanden
    for (var i = 0; i < this.getMessages().length; ++i) {
        this.renderMessage(i);
    }
}
MessageBoard.prototype.renderMessage = function(messageID){
    var that = this;
    var messages = document.getElementsByClassName("messages")[this.getBoardID() - 1];
    var message = this.getMessages()[messageID].getHTMLText();
    
    //skapa tidsstämpel
    var date = this.getMessages()[messageID].getDateText();
    var hours = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    function checkTime(i){
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    hours = checkTime(hours);
    min = checkTime(min);
    sec = checkTime(sec);
    var time = (hours + ":" + min + ":" + sec);
    
    //skapa en knapp för att ta bort meddelanden
    var eraseLink = document.createElement("a");
    eraseLink.href = "#";
    var erase = document.createElement("img");
    erase.src = "delete.jpg";
    erase.alt = "erase";
    eraseLink.appendChild(erase);
    eraseLink.onclick = function(){
        that.removeMessage(messageID);
        return false;
    }
    
    //knapp för att visa när meddelandet skapades
    var timeLink = document.createElement("a");
    timeLink.href = "#";
    var timeImg = document.createElement("img");
    timeImg.src = "time.png";
    timeImg.alt = "time";
    timeLink.appendChild(timeImg);
    timeLink.onclick = function(){
        alert("Meddelandet skapades " + date);
        return false;
    }
    
    //sammanfogar tids- och radera-knappen
    var controls = document.createElement("span");
    controls.className = "controls";
    controls.innerHTML = (time);
    controls.appendChild(eraseLink);
    controls.appendChild(timeLink);
    
    //sammanfogar alla delar i meddelandet
    var text = document.createElement("p");
    text.innerHTML = (message);
    text.appendChild(controls);
    messages.appendChild(text);
    
    //Uppdaterar meddelanderäknaren
    var msgCount = document.getElementsByClassName("msgCount")[this.getBoardID() - 1];
    msgCount.innerHTML = ("Antal meddelanden: " + this.getMessages().length);
}
MessageBoard.prototype.removeMessage = function(messageID){
    var confirmErase = confirm("Vill du verkligen radera meddelandet?");
    if (confirmErase) {
        this.getMessages().splice(messageID, 1);
        this.renderMessages();
    }
}
window.onload = function(){
    new MessageBoard(1);
};