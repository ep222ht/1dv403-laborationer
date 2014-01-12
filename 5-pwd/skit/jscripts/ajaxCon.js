"use strict";
var ajaxCon = {
	
	READY_STATE_UNINITIALIZED: 0,
	READY_STATE_LOADING: 1,
	READY_STATE_LOADED: 2,
	READY_STATE_INTERACTIVE: 3,
	READY_STATE_COMPLETE: 4,
	
	request:null,
	container: null,
	httpMethod:"GET",
	showLoaderTimer:null,
	picMatrix:null,
	picArr:null,
		
	readData: function(container, url)
	{
		if(!ajaxCon.initXMLHTTPRequest()) return false;	
        
		ajaxCon.container = container;
	
		ajaxCon.request.onreadystatechange = ajaxCon.onReadyStateChangedHandler;
		
		ajaxCon.request.open(ajaxCon.httpMethod, url, true);
		
		ajaxCon.request.setRequestHeader('If-Modified-Since', 'Mon, 01 Sep 2007 00:00:00 GMT');
		
		ajaxCon.request.send(null);

		return true;
	},	
	
	dataRetrieved: function()
	{   
	
	    //Splittar upp responsen vid varje ; och lägger till i en array
        var picString = ajaxCon.request.responseText;
        ajaxCon.picArr = picString.split(";")           
        ajaxCon.picMatrix = new Array;
	    
	    
	    //Splittar upp den nya arrayen vid varje , och lägger till det i en matris
        for(var i = 0; i < ajaxCon.picArr.length - 1; ++i)
        {
            ajaxCon.picMatrix[i] = ajaxCon.picArr[i].split(",");    
        }

        //Räknar ut största bredd och höjd
        var maxWidth = 0;
        var maxHeight = 0;
        for(var i = 0; i < ajaxCon.picArr.length - 1; ++i)
        {
            if(ajaxCon.picMatrix[i][1] > maxWidth)
            {
                maxWidth = ajaxCon.picMatrix[i][1];
            }
            
            if(ajaxCon.picMatrix[i][2] > maxHeight)
            {
                maxHeight = ajaxCon.picMatrix[i][2];
            }                    
        }
        
        //Skapar Div taggar med rätt bredd och höjd, samt a taggar och img taggar och lägger till detta i det öppnade fönstret
        var div = null;
        var a = null;
        var pic = null;
        var path = null;
        var corrPath = null;        
        for(var i = 0; i < ajaxCon.picArr.length -1; ++i)
        {   
            div = document.createElement("div");
            div.className = "thumbs";
            div.style.width = maxWidth+"px";
            div.style.height = maxHeight+"px";
            
            //Skapar a taggar och gör en funktion för dess onclick vilket sätter bakgrunden till den klickade bildens förälder
            a = document.createElement("a");
            a.href = "#";
            a.onclick = function()
            {
                path = this.firstChild.src;
                corrPath = path.replace("/thumbs", "");     //Här tar vi bort /thumbs ur länkningen vilket gör att den istället pekar på den stora bilden
                PWD.desktop.style.backgroundImage = "url("+corrPath+")";
                PWD.desktop.style.backgroundRepeat = "repeat";
                                 
            }
            pic = document.createElement("img");
            pic.src = "pics/thumbs/"+ajaxCon.picMatrix[i][0];
            a.appendChild(pic);
            div.appendChild(a);
            PWD.winBody.appendChild(div);

                        
        }	            
	},
	
	
	initXMLHTTPRequest: function()
	{
		try {
			ajaxCon.request = new XMLHttpRequest();	
		} catch (error)
		{
			try {
				ajaxCon.request = new ActiveXObject("Microsoft.XMLHTTP");	
			} catch (error)
			{
				// Can not create XHR-object.
				return false;
			}
		}

		return true;
	},
	
	onReadyStateChangedHandler: function(e)
	{
		
		if(ajaxCon.request.readyState == ajaxCon.READY_STATE_LOADING)
		{
			ajaxCon.container.innerHTML	= "<img src='pics/ajax-loader.gif' />";
		}
		if(ajaxCon.request.readyState == ajaxCon.READY_STATE_COMPLETE)
		{
				if(ajaxCon.request.status == 200 || ajaxCon.request.status == 304)
				{
				    ajaxCon.container.innerHTML	= "";
					ajaxCon.dataRetrieved();				
				}
				else
				{
				    alert("Ett fel inträffade");
					ajaxCon.container.innerHTML = "Läsfel, status:"+ajaxCon.request.status+"<br />";	
				}
		}
	},
	
}