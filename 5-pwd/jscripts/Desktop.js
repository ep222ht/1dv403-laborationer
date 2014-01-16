"use strict";

var Desktop = {
    
    counter : 0,
    loadIcon : null,
    footer : null,
    
    
    
    //Variablerna för popup window.
    popupWindow: function(jsonImages) {
        this.counter++;
        var that = this;
        var body = document.getElementById("content");
        var popup = document.createElement("popup");
        var imageIcon = document.createElement("img");
        var header = document.createElement("header");
        var status =document.createElement("p");
        var statusText = document.createTextNode("Sätt bakgrund genom att klicka på bilderna");
        Desktop.footer = document.createElement("footer");
        var headerTxt = document.createElement("p");
        var headerText = document.createTextNode("Image Viewer");
        var cancelButton = document.createElement("img");
        var ajaxImg = document.createElement("div");
        Desktop.loadIcon = document.createElement("img");
        cancelButton.src = "pics/close.png";
        imageIcon.src = "pics/Galleryicon3.png";
        
        Desktop.time = setTimeout(function() {
        Desktop.loadIcon.src = "pics/ajax-loader.gif";
        Desktop.footer.appendChild(Desktop.loadIcon);
        },300);
        
        //Ger några variablar klassnamn för redigering.
        cancelButton.className = "cancelButton";
        popup.className = "popup";
        headerTxt.className = "headerText";
        imageIcon.className = "image";
        status.className = "status";
        
        
        //Skjuter in elementen i popup rutan.
        cancelButton.setAttribute("click");
        header.appendChild(imageIcon);
        headerTxt.appendChild(headerText);
        header.appendChild(headerTxt);
        header.appendChild(cancelButton);
        popup.appendChild(header);
        popup.appendChild(ajaxImg);
        ajaxImg.appendChild(jsonImages);
        status.appendChild(statusText);
        Desktop.footer.appendChild(status);
        popup.appendChild(Desktop.footer);
        body.appendChild(popup);
        body.insertBefore(body.firstChild);
        
        //Funktion som stänger ner popup fönstret.
        cancelButton.onclick = function() {
            popup.parentNode.removeChild(popup);
            that.counter = 0;
        };
    },

    //Knapp funktionen som kallar på ajax anropet för bilderna.
    galleryButton: function() {
            var that = this;
            var galleryIcon = document.getElementById("Galleryicon");
            galleryIcon.addEventListener("click", function() {
                    if (that.counter === 1) {
                        return;
                    }
                    else{
                    that.init();
                    }
            },false);
    },
    
    //Ajax metoden som hämtar ut länken med bilderna och skjuter in de i popup fönstret.
    init: function() {
        var jsonImages = document.createElement("div");
        
        this.popupWindow(jsonImages);
        var xhr = new XMLHttpRequest();
        var count = 0;
        
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    var jsonStr = JSON.parse(xhr.responseText);
                    var currentThumb;
                    var height = 0;
                    var width = 0;
                
                    for (var n = 0; n < jsonStr.length; n++) {
                        currentThumb = jsonStr[n];
                        if (currentThumb.thumbHeight > height) {
                            height = currentThumb.thumbHeight;
                        }
                        if (currentThumb.thumbWidth > width) {
                            width = currentThumb.thumbWidth;
                        }
                    }
                    
                    //Hämtar ut varje bild individuellt.
                    for (var i = 0; i < jsonStr.length; i++) {
                        var img = document.createElement("img");
                         currentThumb = document.createElement("div");
                        currentThumb.setAttribute("class", "boxes");
                        img.setAttribute("src", jsonStr[i].thumbURL);
                        img.setAttribute("id", "photo" + count);
                        
                        jsonImages.appendChild(currentThumb);
                        currentThumb.appendChild(img);
                        count++;
                        
                        //Ändrar bakgrundsbilden.
                        img.onclick = function(e) {
                            var image = e.target.id.replace("photo", "");
                            var background = jsonStr[image].URL;
                            var content = document.getElementById("content");
                            content.style.backgroundImage = "url(" + background + ")";
                        };
                    currentThumb.style.width = width + "px";
                    currentThumb.style.height = height + "px";
                    }
                }
                else {
                    console.log("Läsfel, status"+xhr.status);
                }
                clearTimeout(Desktop.time);
                Desktop.footer.removeChild(Desktop.loadIcon);
            }
        };
        xhr.open("get", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
        xhr.send(null);
    },
    
};
window.onload = function(){
    Desktop.galleryButton();
};