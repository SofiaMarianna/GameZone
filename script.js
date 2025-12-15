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


/*Favoritos (localStorage) + rendering para mostrar todos na página favoritos*/
const FAV_KEY = 'gamezone_favs';

    function getFavorites(){
        const raw = localStorage.getItem(FAV_KEY);
        try { return raw ? JSON.parse(raw) : []; } catch(e){ return []; }
    }
    function saveFavorites(favs){
        localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    }
    function isFavorite(id){ return getFavorites().some(g => g.id === id); }
    function addFavorite(game){ const favs = getFavorites(); if (!favs.some(g => g.id === game.id)) { favs.push(game); saveFavorites(favs); } }
    function removeFavorite(id){ const favs = getFavorites().filter(g => g.id !== id); saveFavorites(favs); }
    function toggleFavorite(game){ if (isFavorite(game.id)) removeFavorite(game.id); else addFavorite(game); }

    function updateFavButton(btn, fav){
        if (!btn) return;
        const icon = btn.querySelector('i');
        if (icon){
            if (fav){ icon.classList.remove('fa-regular'); icon.classList.add('fa-solid'); }
            else { icon.classList.remove('fa-solid'); icon.classList.add('fa-regular'); }
        }
        // visual fallback: color the button gold when favorite
        btn.style.color = fav ? '#ffd700' : '';
    }

    function escapeHtml(str){ return String(str || '').replace(/[&<>"']/g, s=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;" }[s])); }

    function renderFavorites(container, showAll = false){
        const favs = getFavorites();
        if (!container) return;
        if (!favs.length){ container.innerHTML = '<p>Você não tem favoritos.</p>'; const showBtn = document.querySelector('#show-all-btn'); if (showBtn) showBtn.style.display = 'none'; return; }

        const toShow = showAll ? favs : favs.slice(0,4);
        container.innerHTML = toShow.map(g =>
            `<div class="game-card fav-item">
                <img src="${g.img}" alt="${escapeHtml(g.title)}" width="250" height="322">
                <button class="fav-btn" data-id="${g.id}" data-title="${escapeHtml(g.title)}" data-img="${g.img}"><i class="fa-solid fa-star"></i></button>
            </div>`
        ).join('');

        container.querySelectorAll('.fav-btn').forEach(btn => {
            updateFavButton(btn, true);
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const id = btn.dataset.id;
                removeFavorite(id);
                renderFavorites(container, showAll);
                document.querySelectorAll(`.fav-btn[data-id="${id}"]`).forEach(b => updateFavButton(b, false));
            });
        });

        const showBtn = document.querySelector('#show-all-btn');
        if (showBtn){
            if (favs.length <= 4) { showBtn.style.display = 'none'; }
            else { showBtn.style.display = ''; showBtn.textContent = showAll ? 'Mostrar apenas 4' : 'Ver todos os Jogos'; showBtn.dataset.show = showAll ? 'true' : 'false'; }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        // initialize favorite buttons across pages
        document.querySelectorAll('.fav-btn').forEach(btn => {
            const id = btn.dataset.id;
            updateFavButton(btn, isFavorite(id));
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const game = { id, title: btn.dataset.title || '', img: btn.dataset.img || '' };
                toggleFavorite(game);
                const fav = isFavorite(id);
                updateFavButton(btn, fav);
                // if on favoritos page, re-render preserving current show state
                const favContainer = document.querySelector('#favorites-list');
                const showBtn = document.querySelector('#show-all-btn');
                const showAll = showBtn && showBtn.dataset.show === 'true';
                if (favContainer) renderFavorites(favContainer, showAll);
            });
        });

        const favContainer = document.querySelector('#favorites-list');
        const showBtn = document.querySelector('#show-all-btn');
        if (favContainer) renderFavorites(favContainer, false);
        if (showBtn && favContainer){
            showBtn.addEventListener('click', (e) => {
                const currently = showBtn.dataset.show === 'true';
                const next = !currently;
                renderFavorites(favContainer, next);
            });
        }
    });