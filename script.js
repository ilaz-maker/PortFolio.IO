/* ==== TABS SYSTEM ==== */
const buttons = document.querySelectorAll(".tab-btn");
const sections = document.querySelectorAll(".section");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    
    // Active button
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Show section
    const target = btn.dataset.target;
    sections.forEach(sec => sec.classList.add("hidden"));

    const activeSection = document.getElementById(target);
    activeSection.classList.remove("hidden");

    // Animation
    setTimeout(() => activeSection.classList.add("visible"), 50);
  });
});

/* ==== TYPING EFFECT ==== */
const text = "Bienvenue sur mon portfolio";
let index = 0;

function type() {
  document.querySelector(".typed").textContent = text.slice(0, index);
  index++;
  if (index <= text.length) {
    setTimeout(type, 70);
  }
}

type();
