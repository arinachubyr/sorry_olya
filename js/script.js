const headings = document.querySelectorAll(".heading");
let firstRun = true;

window.addEventListener("scroll", () => {
  const scrollValue = window.scrollY;

  headings.forEach((heading, index) => {
    heading.style.top = `${scrollValue * 0.07 * index}px`;
    if (firstRun) {
      heading.style.transform = `translateY(0px)`;
    }
  });

  firstRun = false;
});

setTimeout(function () {
  headings.forEach((heading, index) => {
    heading.style.transform = `translateY(${index * 8}px)`;
  });
}, 500);

const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2"),
};

const texts = [
  "Я",
  "дійсно",
  "дибілка",
  "але",
  "пішли",
  "пліс",
  "на пиво",
  ":)",
];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++;
    }

    doMorph();
  } else {
    doCooldown();
  }
}

animate();

const beer1 = document.getElementById("beer1");
const beer2 = document.getElementById("beer2");

function shakeBeer() {
  beer1.style.transform = "rotate(20deg)";
  beer2.style.transform = "rotate(-20deg)";
  setTimeout(() => {
    beer1.style.transform = "rotate(0deg)";
    beer2.style.transform = "rotate(0deg)";
  }, 1000);
}

setInterval(shakeBeer, 3000);
