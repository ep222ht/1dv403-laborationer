"use strict";

var MemoryApp = function (memoryGameName) {
    var counter = 0;
    var rows = 4;
    var cols = 4;
    var antalGuesses = 0;
    var turnedCounter = 0;
    var turnedBricks = [];
    var fields = [];
    var wrongGuesses = 0;
    var uniqueField = 0;
    var tr = null;
    var th = null;
    var tfoot = null;
    var tfoot_tr = null;
    var tfoot_td = null;
    var theLink = null;
    var rightGuesses = null;
    var turnedFields = 0;
    
    var memoryGenerator = RandomGenerator.getPictureArray(rows, cols);
    var standardPicture = "<img src='../pics/0.png' alt='Standard Bild' />";
    
    var main = document.getElementById("main");    
    var memoryGame = document.createElement("div");
    main.appendChild(memoryGame);
    memoryGame.className = "memoryGame";
    memoryGame.id = memoryGameName;

    createTable(memoryGameName, rows, cols);

    function createTable(memoryGameName, rows, cols) {
        var table = document.createElement("table");
        memoryGame.appendChild(table);
        var thead = document.createElement("thead");
        table.appendChild(thead);
        th = document.createElement("th");
        thead.appendChild(th);
        th.colSpan = cols;
        th.innerHTML = memoryGameName;

        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
        var memoryField = new Array(rows);
        for (var i = 0; i < memoryField.length; i++) {
            tr = document.createElement("tr")
            tbody.appendChild(tr);
            memoryField[i] = new Array(cols);
            for (var j = 0; j < memoryField[i].length; j++) {
                generateCols();
            }
        }
        tfoot = document.createElement("tfoot");
        table.appendChild(tfoot);
        tfoot_tr = document.createElement("tr");
        tfoot.appendChild(tfoot_tr);
        tfoot_td = document.createElement("td");
        tfoot_tr.appendChild(tfoot_td);
        tfoot_td.colSpan = cols;
    }

    function getFirstPicture() {
        return standardPicture;
    }

    function getAPicture(counter, theLink) {
        if (turnedBricks.length === 2) {
            return standardPicture; 
         }
        else {
            var randomNumber = memoryGenerator[counter];
            return "<img src='../pics/" + randomNumber + ".png' alt='Bild" + randomNumber + "' />";
        }
    }

    function generateCols() {
        var td = document.createElement("td");
        tr.appendChild(td);
        theLink = document.createElement("a");
        td.appendChild(theLink)
        theLink.id = "field" + ++uniqueField;
        theLink.href = "#";
        theLink.innerHTML = standardPicture;
        var pictureCounter = counter++;
        theLink.onclick = function () {
            theLink = this.parentNode.getElementsByTagName("a")[0];
            ++turnedFields;
            if (theLink.firstChild.alt === "Standard Bild"){
                var thePicture = getAPicture(pictureCounter, theLink);
                if (theLink.className === "correct"){
                    return false;
                }
                if (thePicture === standardPicture) {
                    return false;
                }
                else {
                    theLink.innerHTML = thePicture;
                }
                var rightOrWrong = turnedBrickControl(theLink);
                if (rightOrWrong) {
                    alert("Du har nu " + ++rightGuesses + " rätt.");
                    if (rightGuesses === 8) {
                        tfoot_td.innerHTML = "Du klarade det på " + wrongGuesses + " försök";
                    }
                }
                else {
                    return false;
                }
            }
            return false;
        }
    }

    function turnFirstPicture() {
        theLink.innerHTML = standardPicture;
    }

    function turnedBrickControl(givenLink) {
        turnedBricks.push(givenLink);
        
        if (turnedBricks.length === 2) {
            if (turnedBricks[0].innerHTML === turnedBricks[1].innerHTML && turnedBricks[0].id != turnedBricks[1].id) {
                turnedBricks[0].className = "correct";
                turnedBricks[1].className = "correct";
                turnedBricks.splice(0, 2);
                return true;
            }
            else if (turnedBricks[0].id === turnedBricks[1].id) {
                turnedBricks[0].innerHTML = standardPicture;
                turnedBricks[1].innerHTML = standardPicture;
                turnedBricks.splice(0, 2);
                return false;
            }
            else {
                window.setTimeout(function () {
                    turnedBricks[0].innerHTML = standardPicture;
                    turnedBricks[1].innerHTML = standardPicture;
                    turnedBricks.splice(0, 2);
                    if (wrongGuesses === 0) {
                        tfoot_td.innerHTML = "Du har gissat fel " + ++wrongGuesses + " gång";
                    }
                    else {
                        tfoot_td.innerHTML = "Du har gissat fel " + ++wrongGuesses + " gånger"
                    }
                    return false;
                }, 1000);
            }
        }
        else {
            return;
        }
    }
}

window.onload = function () {
    var memoryGame1 = new MemoryApp("Memory ");
}