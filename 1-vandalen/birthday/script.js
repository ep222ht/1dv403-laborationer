"use strict";

window.onload = function(){

	
	var birthday = function(date){
	    //deklarerar födelsedag, current time, samt differensen mellan födelse & current
	    var birthTime;
	    var tTime;
	    var diffTime;
	    
	    //om inte ett nummer skrivs in så skickas felmeddelande. 
	    if(!isNaN(date)){
	        throw new Error("Ange din födelsedag");
	    }
	    
	    //BirthTime tilldelas ett Date-object
	    birthTime = new Date(date);
	    birthTime.setFullYear(2013);
	    
	    //Hämtar in dagens datum
	    tTime = Date.now();
	    
	    //beräknar differensen mellan bith & tTime
	    diffTime = (birthTime - tTime) / 1000 / 60 / 60 / 24; 
	    
	    // Avrunda upp
	    diffTime = Math.ceil(diffTime);
	    
	    
	    if(diffTime < 0){return 365 + diffTime;}
	    
	    return diffTime;
	    
		// Din kod här.
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};