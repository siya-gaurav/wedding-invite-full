const parallax = document.getElementById("home-img-lg");
const parallax1 = document.getElementById("parallax1");
const parallax2 = document.getElementById("parallax2");

window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionX = offset*(-0.3)-100 + "px";
})


window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    offset-=3100;
    parallax1.style.backgroundPositionY = offset*(0.1) + "px";
})

window.addEventListener("scroll", function()
{
    let offset = window.pageYOffset;
    offset-=4800;
    parallax2.style.backgroundPositionY = offset*(-0.1) + "px";
})

function myFunction() {
    document.getElementById("check").checked = false;
}

function scrollToStay() {
    document.getElementById("check").checked = false;
    document.getElementById("stay").scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop( direction = "up") {
    if (direction === "up") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
}


  
function reveal() {
var reveals = document.querySelectorAll(".reveal");
  
for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
}
  
window.addEventListener("scroll", reveal);

// Show/hide back to home button based on scroll position
window.addEventListener("scroll", function() {
    const backToHomeBtn = document.getElementById("backToHome");
    const scrollToDownBtn = document.getElementById("scrollToDown");
    if (window.pageYOffset > 300) {
        backToHomeBtn.classList.add("show");
        scrollToDownBtn.classList.remove("show");
    } else {
        backToHomeBtn.classList.remove("show");
        scrollToDownBtn.classList.add("show");
    }
});