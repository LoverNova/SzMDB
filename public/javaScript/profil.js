const header = document.createElement('div');
header.className = 'header';

const logo = document.createElement('div');
logo.className = 'logo';

const logoImg = document.createElement('img');
logoImg.src = 'logo.png';
logoImg.alt = 'Logo';

const logoText = document.createElement('span');
logoText.textContent = 'Név';

logo.appendChild(logoImg);
logo.appendChild(logoText);

const menu = document.createElement('nav');
menu.className = 'menu';

['Profil menüpontok'].forEach(item => {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = item;
    menu.appendChild(link);
});

header.appendChild(logo);
header.appendChild(menu);
document.body.appendChild(header);

// Tartalom létrehozása
const container = document.createElement('div');
container.className = 'container';

const poster = document.createElement('div');
poster.className = 'poster';
poster.textContent = 'Poszter';

const content = document.createElement('div');
content.className = 'content';

const titleContainer = document.createElement('div');
titleContainer.className = 'title';

const titleInput = document.createElement('input');
titleInput.type = 'text';
titleInput.id = 'title';
titleInput.value = 'Cím';

titleContainer.appendChild(titleInput);

const descriptionContainer = document.createElement('div');
descriptionContainer.className = 'description';

const descriptionTextarea = document.createElement('textarea');
descriptionTextarea.id = 'description';
descriptionTextarea.rows = 5;
descriptionTextarea.textContent = 'Leírás';

descriptionContainer.appendChild(descriptionTextarea);

const buttons = document.createElement('div');
buttons.className = 'buttons';

const titleButton = document.createElement('button');
titleButton.textContent = 'Cím módosítása';
titleButton.onclick = function () {
    alert('A cím: ' + titleInput.value);
};

const descriptionButton = document.createElement('button');
descriptionButton.textContent = 'Leírás módosítása';
descriptionButton.onclick = function () {
    alert('A leírás: ' + descriptionTextarea.value);
};

buttons.appendChild(titleButton);
buttons.appendChild(descriptionButton);

content.appendChild(titleContainer);
content.appendChild(descriptionContainer);
content.appendChild(buttons);

container.appendChild(poster);
container.appendChild(content);
document.body.appendChild(container);