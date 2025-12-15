const botãoMenu = document.querySelector('.mobile-menu-icon');
const listanav = document.querySelector('.lista-nav');
const header = document.querySelector('header');

if (header) {
    header.style.position = "fixed";
    header.style.width = "100%";
}


const LIsdanav = listanav.querySelectorAll('li') || [];

// Botão do menu mobile 
if (botãoMenu) {
      botãoMenu.addEventListener('click', () => {
         listanav.classList.toggle('open');
    });
    }

function escolherpag(event){
    listanav.classList.remove('open');
}

LIsdanav.forEach(li => {
      li.addEventListener('click', escolherpag);
});
