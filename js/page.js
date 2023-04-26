"use strict";
let mainSections = ["home", "info", "contact", "form"]
let buttons = document.querySelectorAll('nav > button');
let themeButton = document.getElementById("themeButton");

for(let i = 0; i < mainSections.length; i++){
    buttons[i].addEventListener("click", buttonClick)
};

themeButton.addEventListener("click", function() {changeTheme("css/theme.css")})

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
    // window.alert(ev.currentTarget.name);
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

function changeTheme(href, onoff){
    var existingNode = 0 //get existing stylesheet node if it already exists:
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].href && document.styleSheets[i].href.indexOf(href) > -1) existingNode = document.styleSheets[i].ownerNode
  }
  if (onoff == undefined) onoff = !existingNode //toggle on or off if undefined
  if (onoff) { //TURN ON:
    if (existingNode) return onoff //already exists so cancel now
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    document.getElementsByTagName('head')[0].appendChild(link);
  } else { //TURN OFF:
    if (existingNode) existingNode.parentNode.removeChild(existingNode)
  }
  return onoff
};