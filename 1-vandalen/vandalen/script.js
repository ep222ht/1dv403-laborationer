"use strict";

var makePerson = function(persArr){

    var result = {}; 
    var personObj = {};
    var names;
    
    names = persArr.map(function(person){
        return person.name;
    });
    
    personObj.names = names.sort(function(a, b){
        return a.localeCompare(b)
    });
    
    personObj.names = names.reduce(function(names, name){
        return names + ", " + name;
    });
    
    personObj.minAge = persArr[1].age;
    personObj.maxAge = persArr[2].age;
    personObj.averageAge = Math.round((persArr[0].age+persArr[1].age + persArr[2].age) / 3);
    
    return personObj;
};

 var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];
    
    
 var result = makePerson(data);
    
console.log(result);