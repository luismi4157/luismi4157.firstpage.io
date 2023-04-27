let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
let emailRegex = /[\w]*@[\w]*.{1}(com|gov|edu|io|net){1}/;
let zipCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

const stateAbbreviations = [
    'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA',
    'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
    'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
    'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
let form = null;
let successMsg = null;

function initValidation(formID, successID){
    form = document.getElementById(formID);
    successMsg = document.getElementById(successID);

    let inputs = document.querySelectorAll("input");
    for (let input of inputs){
        input.addEventListener("change", inputChanged);
    }
    form.addEventListener("submit", submitForm);
}

function inputChanged(ev){
    let el = ev.currentTarget;
    validateForm();
    el.classList.add("was-validated");
}

function submitForm(ev){
    console.log("Form submited");
    let form = ev.currentTarget;

    ev.preventDefault();
    ev.stopPropagation();

    validateForm();

    if (!form.checkValidity()){
        let inputs = document.querySelectorAll("input");
        for (let input of inputs){
          input.classList.add("was-validated");
        }
    }
    else{
        form.classList.add("hide");
        let message = document.getElementById("success");
        message.style.display = "block";
    }
}

function validateForm() {

    checkRequired("first-name", "First Name is Required");
    checkRequired("last-name", "Last Name is Required");
    checkRequired("address", "Address is Required");
    checkRequired("city", "City is Required");
    
    if(checkRequired("state", "State is Required")){
      validateState("state", "Not a valid State, enter two digit code e.g., UT");
    }
   
    if (checkRequired("email", "Email Address is required")) {
      checkFormat("email", "email format is bad", emailRegex)
    }
    if (checkRequired("zip", "Zip Code is Required")) {
      checkFormat("zip", `malformed zip-code, please use either "#####", or "#####-#### format.`, zipCodeRegex)
    }
    if (checkRequired("phone", "Phone is required")) {
      checkFormat("phone", "phone format is bad", phoneRegex)
    }
    checkRequired("newspaper", "you must select at least one!");
  
  }

  function validateState(id, msg) {
    let el = document.getElementById(id);
    let valid = false;
    let state = el.value.toUpperCase()
    if (stateAbbreviations.includes(state)){
      valid = true;
    }
    setElementValidity(id, valid, msg);
  }
  
  function checkFormat(id, msg, regex) {
    let el = document.getElementById(id);
    let valid = regex.test(el.value)

    setElementValidity(id, valid, msg);
    return valid;
  
  }
  function checkRequired(id, message) {
    let el = document.getElementById(id);
    let valid = false;
    let type = el.type;
    switch (type) {
      case 'text':
       if(el.value){
        valid = true;
       }
        break;
  
      case 'checkbox':
        let checkboxes = document.getElementsByName("find-page");
        for (let checkbox of checkboxes){
          if(checkbox.checked){
            valid = true;
          }
        }
    break;
    }
    setElementValidity(id, valid, message);
    
  
    return valid;
  }
  
  function setElementValidity(id, valid, message) {
    let el = document.getElementById(id);
  
    if (valid) {
      el.setCustomValidity('');
      let sibling = el.nextElementSibling;
      console.log(el.nextElementSibling.firstChild);
      console.log(el.type == "text");
      if (el.nextElementSibling.firstChild){
        console.log("In");
        if (el.type == "text"){
          sibling.removeChild(sibling.firstChild);
        }
        else{
          sibling = sibling.nextElementSibling;
          console.log(sibling.tagName)
          if(sibling.firstChild){
            sibling.removeChild(sibling.firstChild);
          }
      }
      }
    } 
    else {
      console.log(`Not valid ${id}`);
      el.setCustomValidity(message);
      let sibling = el.nextElementSibling;
      if (id == "newspaper"){
        sibling = sibling.nextElementSibling;
        let textNode = document.createTextNode(message);
        if (!sibling.firstChild){
        sibling.appendChild(textNode);
        }
      }
      else{
        if(!el.nextElementSibling.firstChild){
          let textNode = document.createTextNode(message);
          sibling.appendChild(textNode);
        }
      }
    }
  }