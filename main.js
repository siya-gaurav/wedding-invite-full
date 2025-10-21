// --- Countdown Timer Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const weddingDate = new Date("Nov 30, 2025 20:00:00").getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        if (distance < 0) {
            clearInterval(countdownInterval);
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

    // --- Show/hide back to home button ---
    const backToHomeBtn = document.getElementById("backToHome");
    const scrollToDownBtn = document.getElementById("scrollToDown");
    if (window.pageYOffset > 300) {
        backToHomeBtn.classList.add("show");
        scrollToDownBtn.classList.remove("show");
    } else {
        backToHomeBtn.classList.remove("show");
        scrollToDownBtn.classList.add("show");
    }
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
// ---------- Fireworks (bright multi-color version for light backgrounds) ----------
(function () {
  let brd = document.getElementById("board");
  if (!brd) {
    brd = document.createElement("div");
    brd.id = "board";
    document.body.appendChild(brd);
  }

  // Make sure it's above your background but below UI
  brd.style.zIndex = 10020;
  brd.style.pointerEvents = "none";
  brd.style.position = "fixed";
  brd.style.left = "0";
  brd.style.top = "0";
  brd.style.width = "100%";
  brd.style.height = "100%";
  brd.style.mixBlendMode = "screen"; // additive look

  const particles = [];
  const seeds = [];

//   const PARTICLE_V = 0.7;
//   const PARTICLE_LIFE = 1900;
  const SEED_V = 0.6;
//   const SEED_LIFE = 500;
  const DRAG = 0.0006;
  const GRAVITY = 0.0009;
  const STEP = 12;
//   const AUTO_INTERVAL = 2000;
    const PARTICLE_V = 0.9;
  const PARTICLE_LIFE = 6000;
  const SEED_LIFE = 500;
  const AUTO_INTERVAL = 2000;

  // Deep saturated palette — clearly visible on pink background
const COLORS = [
  "#ffcc00", // deep gold
  "#ffb300", // amber
  "#ff8400", // warm orange
  "#ff2b00", // red-orange
  "#ffd500", // golden yellow
  "#ff6600"  // saffron tone
];


  const rndColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

  function newParticle(x, y, angleDeg) {
    const el = document.createElement("div");
    el.className = "fwk-particle";
    el.style.position = "absolute";
    el.style.pointerEvents = "none";
    el.style.willChange = "transform,opacity,left,top";
    const color = rndColor();
    el.style.width = "8px";
    el.style.height = "8px";
    el.style.borderRadius = "50%";
    el.style.background = color;
    el.style.boxShadow = `
        0 0 15px ${color},
        0 0 35px ${color},
        0 0 65px ${color},
        0 0 100px ${color},
        0 0 160px ${color}aa`;
    el.style.filter = "brightness(1.6) saturate(2)";

    el.style.mixBlendMode = "screen";

    el.time = PARTICLE_LIFE;
    const rad = (angleDeg * Math.PI) / 180;
    el.velocity = { x: PARTICLE_V * Math.cos(rad), y: PARTICLE_V * Math.sin(rad) };
    el.position = { x, y };
    el.style.left = x + "px";
    el.style.top = y + "px";

    brd.appendChild(el);
    particles.push(el);
  }

  function explodeStar(x, y) {
    for (let a = 0; a < 360; a += STEP) newParticle(x, y, a + Math.random() * 4 - 2);
  }

  function newSeed(x, y) {
    const el = document.createElement("div");
    el.className = "fwk-seed";
    el.style.position = "absolute";
    el.style.pointerEvents = "none";
    el.style.width = "10px";
    el.style.height = "10px";
    el.style.borderRadius = "50%";
    el.style.background = "#fff";
    el.style.boxShadow = "0 0 18px #fff, 0 0 36px #fff6";
    el.style.mixBlendMode = "screen";
    el.time = SEED_LIFE;
    el.velocity = { x: 0, y: SEED_V };
    el.position = { x, y };
    el.style.left = x + "px";
    el.style.top = y + "px";
    brd.appendChild(el);
    seeds.push(el);
  }

  // --- Animation loop ---
  let last = performance.now();
  function frame(now) {
    const dt = now - last;
    last = now;

    // move seeds
    for (let i = seeds.length - 1; i >= 0; i--) {
      const s = seeds[i];
      s.time -= dt;
      if (s.time > 0) {
        s.velocity.y -= s.velocity.y * DRAG * dt;
        s.position.y -= s.velocity.y * dt;
        s.style.top = s.position.y + "px";
      } else {
        explodeStar(s.position.x, s.position.y);
        s.remove();
        seeds.splice(i, 1);
      }
    }

    // move particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.time -= dt;
      if (p.time > 0) {
        p.velocity.x -= p.velocity.x * DRAG * dt;
        p.velocity.y -= GRAVITY * dt + p.velocity.y * DRAG * dt;
        p.position.x += p.velocity.x * dt * 6;
        p.position.y -= p.velocity.y * dt * 6;
        p.style.left = p.position.x + "px";
        p.style.top = p.position.y + "px";
        const alpha = Math.max(0, Math.min(1, p.time / PARTICLE_LIFE));
        p.style.opacity = alpha;
      } else {
        p.remove();
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // --- spawn logic ---
  window.addEventListener(
    "click",
    e => newSeed(e.clientX, e.clientY),
    { passive: true }
  );

  function autoSpawn() {
    const margin = Math.min(120, window.innerWidth * 0.1);
    const x = Math.random() * (window.innerWidth - margin * 2) + margin;
    const y = window.innerHeight * (0.65 + Math.random() * 0.1);
    newSeed(x, y);
  }
  setInterval(autoSpawn, AUTO_INTERVAL);
})();


// HERO TITLE ANIMATION TRIGGER + REVEAL REST CONTENT
(function(){
  const hero = document.querySelector('.hero-title');
  const home = document.querySelector('.home');
  if (!hero || !home) return;

  function playOnView(){
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          hero.classList.add('animation-play');

          // wait until heart pop animation finishes (~700ms delay + 900ms name slide)
          const totalDelay = 1600; // adjust if you tweak timing in CSS
          setTimeout(() => {
            home.classList.add('show-rest');
          }, totalDelay);

          io.disconnect();
        }
      });
    }, { threshold: 0.2 });
    io.observe(hero);
  }

  // start animation when hero is visible
  playOnView();

  // optional replay helper
  window.playHero = () => {
    hero.classList.remove('animation-play');
    home.classList.remove('show-rest');
    void hero.offsetWidth; // reflow
    hero.classList.add('animation-play');
    setTimeout(() => {
      home.classList.add('show-rest');
    }, 1600);
  };
})();
