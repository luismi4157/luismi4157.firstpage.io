"use strict";

let buttons = document.querySelectorAll('nav > button');

for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", buttonClick)

    function buttonClick(ev){
            let name = ev.currentTarget;
            window.alert(name)
    }
};