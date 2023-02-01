// Gets the modal
var modal = document.getElementById("myModal");

// Gets the image
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Closes the image if x is clicked or click outside of the image.
document.addEventListener(
  "click",
  function(event){
    if(
      event.target.matches(".close") || event.target.closest(".modal"))
      {
        closeModal()
      }
    },
    false
)

function closeModal(){
  document.querySelector(".modal").style.display = "none"
}
