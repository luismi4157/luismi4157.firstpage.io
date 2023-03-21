"use strict";
let mainSections = ["home", "info", "contact"]
let buttons = document.querySelectorAll('nav > button');

for(let i = 0; i < mainSections.length; i++){
    buttons[i].addEventListener("click", buttonClick)
};

function buttonClick(ev){
    //removes "selected" from every button's class
    for(let i = 0; i < buttons.length; i++){
        buttons[i].classList.remove("selected");
    }
    //adds "selected" to the button that was pressed
    ev.currentTarget.classList.add('selected');
    
    //remove "show" from every section in main
    for(let section of mainSections){
        let selectedSection = document.getElementById(`${section}Section`);
        selectedSection.classList.remove("show");
        selectedSection.classList.add("hide");
    }
    
    //show selected content section
    let name = `${ev.currentTarget.name}Section`;
    let showSection = document.getElementById(name);
    showSection.classList.remove('hide');
    showSection.classList.add('show');

    let asideTable = document.getElementById("asideSection")
    if(name === "homeSection"){
       asideTable.classList.remove("show");
       asideTable.classList.remove("hide");
       asideTable.classList.add("show");
    }
    else{
        asideTable.classList.remove("show");
       asideTable.classList.remove("hide");
       asideTable.classList.add("hide");
    }
};