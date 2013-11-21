"use strict";

var makePerson = function(persArr){

    var result = {}; 
    var personObj = {};
    var names;
    var ages;
    var totalAge;
    
    names = persArr.map(function(person){return person.name;});
    
    personObj.names = names.sort(function(a, b){return a.localeCompare(b)});
    
    personObj.names = names.reduce(function(names, name){return names + ", " + name;});
    
    ages = persArr.map(function(person){return person.age;});
    
    ages = ages.sort(function(a, b){return a - b;});
    
    
    totalAge = ages.reduce(function(frsnum, lastnum){return frsnum + lastnum;}, 0);
    
    
    personObj.minAge = ages[0];
    personObj.maxAge = ages[ages.length -1];
    personObj.averageAge = Math.round(totalAge / persArr.length);
    
    
    return personObj;
};
//asd
 var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];
    
 var result = makePerson(data);
   
console.log(result);