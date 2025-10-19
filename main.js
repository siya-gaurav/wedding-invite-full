// --- Countdown Timer Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const weddingDate = new Date("Nov 30, 2025 15:00:00").getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        if (distance < 0) {
            clearInterval(countdownInterval);
            overlay.classList.add('hidden');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = days;
        hoursEl.innerText = hours;
        minutesEl.innerText = minutes;
        secondsEl.innerText = seconds;

    }, 1000);
});


const parallaxLg = document.getElementById("home-img-lg");
const parallaxSm = document.getElementById("home-img-sm");
const parallax1 = document.getElementById("parallax1");
const parallax2 = document.getElementById("registry-img-lg"); // Corrected ID for parallax

window.addEventListener("scroll", function() {
    let offset = window.pageYOffset;

    // --- Parallax for main home images (negative direction only) ---
    if (parallaxLg.offsetParent !== null) {
        let finalPosition = -100 + (offset * -0.2);
        parallaxLg.style.backgroundPositionX = Math.min(-100, finalPosition) + "px";
    }
    if (parallaxSm.offsetParent !== null) {
        let finalPosition = offset * -0.2;
        parallaxSm.style.backgroundPositionX = Math.min(0, finalPosition) + "px";
    }

    // --- Parallax for "hands" image (parallax1) ---
    if (parallax1 && parallax1.offsetParent !== null) {
        let elementTop = parallax1.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;
        // Animate only when the element is in the viewport
        if (elementTop < windowHeight && elementTop > -parallax1.offsetHeight) {
            let scrollValue = (windowHeight - elementTop) * 0.1;
            parallax1.style.backgroundPositionY = scrollValue + "px";
        }
    }

    // --- Reveal animations ---
    reveal();
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
  
// Show/hide back to home button based on scroll position
window.addEventListener("scroll", function() { // This can also be merged, but is fine as is.
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