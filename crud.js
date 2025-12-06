const projectsContainer = document.getElementById('projects');
const form = document.getElementById('project-form');

const idInput = document.getElementById('project-id');
const titleInput = document.getElementById('project-title');
const imgInput = document.getElementById('project-img');
const descInput = document.getElementById('project-desc');
const linkInput = document.getElementById('project-link');

const createBtn = document.getElementById('create-btn');
const updateBtn = document.getElementById('update-btn');
const deleteBtn = document.getElementById('delete-btn');

if (!localStorage.getItem('projects')) {
  localStorage.setItem('projects', JSON.stringify([]));
}

function getProjects() { return JSON.parse(localStorage.getItem('projects')); }
function saveProjects(projects) { localStorage.setItem('projects', JSON.stringify(projects)); renderProjects(); }

function renderProjects() {
  const projects = getProjects();
  projectsContainer.innerHTML = '';
  projects.forEach(p => {
    const card = document.createElement('project-card');
    card.setAttribute('title', p.title);
    card.setAttribute('img', p.img);
    card.setAttribute('description', p.description);
    card.setAttribute('link', p.link);
    projectsContainer.appendChild(card);
  });
}

createBtn.addEventListener('click', e => {
  e.preventDefault();
  const projects = getProjects();
  const newId = projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1;
  const newProject = {
    id: newId,
    title: titleInput.value,
    img: imgInput.value,
    description: descInput.value,
    link: linkInput.value
  };
  projects.push(newProject);
  saveProjects(projects);
  form.reset();
});

updateBtn.addEventListener('click', e => {
  e.preventDefault();
  const projects = getProjects();
  const id = parseInt(idInput.value);
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return alert("Project ID not found.");
  projects[index] = {
    id,
    title: titleInput.value,
    img: imgInput.value,
    description: descInput.value,
    link: linkInput.value
  };
  saveProjects(projects);
  form.reset();
});

deleteBtn.addEventListener('click', e => {
  e.preventDefault();
  const projects = getProjects();
  const id = parseInt(idInput.value);
  const newProjects = projects.filter(p => p.id !== id);
  saveProjects(newProjects);
  form.reset();
});

renderProjects();