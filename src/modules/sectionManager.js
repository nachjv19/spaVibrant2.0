// src/modules/sectionManager.js
export function showSection(sectionId) {
  const sections = document.querySelectorAll('section');
  sections.forEach((section) => {
    section.classList.add('hidden');
  });

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove('hidden');
  }
}
