const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

/* =====================================================
   MANUAL SKILL PERCENTAGE EDITOR
   You can adjust skills directly on the webpage.
   The changes are saved automatically in your browser.
===================================================== */

const defaultSkills = [
  { name: "Photoshop", percent: 95 },
  { name: "Illustrator", percent: 90 },
  { name: "InDesign", percent: 80 },
  { name: "After Effects", percent: 75 },
  { name: "HTML", percent: 95 },
  { name: "CSS", percent: 90 },
  { name: "JavaScript", percent: 80 },
  { name: "PHP", percent: 70 }
];

const circleSkills = document.getElementById("circleSkills");
const resetSkills = document.getElementById("resetSkills");

function getSkills() {
  const saved = localStorage.getItem("darrylPortfolioSkills");
  return saved ? JSON.parse(saved) : defaultSkills;
}

function saveSkills(skills) {
  localStorage.setItem("darrylPortfolioSkills", JSON.stringify(skills));
}

function renderSkills() {
  const skills = getSkills();
  circleSkills.innerHTML = "";

  skills.forEach((skill, index) => {
    const card = document.createElement("div");
    card.className = "circle-card";

    card.innerHTML = `
      <div class="circle ${index % 2 ? "purple" : ""}" style="--percent:${skill.percent}">
        <span>${skill.percent}%</span>
      </div>
      <h3>${skill.name}</h3>
      <div class="skill-controls">
        <input type="range" min="0" max="100" value="${skill.percent}" data-index="${index}" class="skill-range">
        <input type="number" min="0" max="100" value="${skill.percent}" data-index="${index}" class="skill-number">
      </div>
    `;

    circleSkills.appendChild(card);
  });

  document.querySelectorAll(".skill-range, .skill-number").forEach(input => {
    input.addEventListener("input", updateSkill);
  });
}

function updateSkill(event) {
  const skills = getSkills();
  const index = Number(event.target.dataset.index);
  let value = Number(event.target.value);

  if (value < 0) value = 0;
  if (value > 100) value = 100;

  skills[index].percent = value;
  saveSkills(skills);
  renderSkills();
}

resetSkills.addEventListener("click", () => {
  localStorage.removeItem("darrylPortfolioSkills");
  renderSkills();
});

renderSkills();
