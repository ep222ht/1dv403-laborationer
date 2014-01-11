var PWD = {

    counter:null,            //Kollar om fönstret är öppet
    theWindow:null,
    winBody:null,
    desktop: null,
    
//-----------------------[Init funktionen som körs när objektet anropas]-----------------------//      
    
    init: function()
    {
        if(!document.getElementById) return;
        
        var icon = document.getElementsByTagName("a");
        for(var i = 0; i < icon.length; i++)
        {
            icon[i].ondblclick = PWD.newWin;
        }
    },
    
    newWin: function()
    {
        ++PWD.counter;
        
        if(PWD.counter == 1)
        {
            
            //Hämtar ut den klickade bildens SRC för att använda som ikon i det nya fönstret
            var imgNode = this.getElementsByTagName("img")[0].getAttribute("src");      
            
            
            //Skapar det nya fönstret
            PWD.theWindow = document.createElement("div");                  
            PWD.theWindow.className = "theWindow";
            PWD.theWindow.id = imgNode;
            
            
            //Skapar topdelen av fönstret
            var windowTop = document.createElement("div");
            var windowTopResize = document.createElement("div");
            windowTop.className = "windowTop";
            windowTopResize.className = "windowTopResize";
            var winTitle = document.createElement("p");
            winTitle.innerHTML = "Photo Gallery";
            winTitle.className = "winTitle";
            var winIcon = document.createElement("img");
            winIcon.src = imgNode;
            winIcon.className = "winIcon";
            var winClose = document.createElement("a");
            winClose.href = "#";
            var winCloseImg = document.createElement("img");
            winCloseImg.src = "pics/close.png";
            winClose.className = "winClose";
            
            
            
            //Ikon och Close skickas till ett Close event när dessa klickas/dubbelklickas
            winIcon.ondblclick = PWD.closeWin;
            winClose.onclick = PWD.closeWin;
            
            //Lägger till allt i topdelen och fönstret
            winClose.appendChild(winCloseImg);
            windowTop.appendChild(winIcon);
            windowTop.appendChild(winTitle);
            windowTop.appendChild(windowTopResize); 
            windowTop.appendChild(winClose);
            PWD.theWindow.appendChild(windowTop);

            
            //Skapar bodydelen av fönstret
            PWD.winBody = document.createElement("div");
            PWD.winBody.className = "winBody";
            PWD.winBody.id = "winBody";
            PWD.theWindow.appendChild(PWD.winBody);            

            
            //Skapar footerdelen av fönstret
            var windowFooter = document.createElement("div");
            var windowFooterResize = document.createElement("div");
            windowFooterResize.className = "windowFooterResize";
            windowFooter.className = "windowFooter";
            windowFooter.appendChild(windowFooterResize);           
            PWD.theWindow.appendChild(windowFooter);             
            
            
            //Lägger till det nya fönstret på desktopen
            PWD.desktop = document.getElementById("desktop");
            PWD.desktop.appendChild(PWD.theWindow);


            //Anropar Ajax anslutningen som renderar upp alla bilderna            
            var url = "Backend/getThumbs.php";
            var container = document.getElementById("winBody");
            ajaxCon.readData(container, url)
        }
    },
    
    
    closeWin: function()
    {
        //Tar bort det öppnade fönstret och gör så att det går att öppna ett nytt
        PWD.desktop.removeChild(PWD.theWindow);
        PWD.counter = 0;
    }
   
}

window.onload = PWD.init;