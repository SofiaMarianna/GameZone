// Dados dos jogos

const jogos = [
    { id: 1, titulo: "Tomb Raider", categoria: "Ação", preco: 89.90, imagem: "img/eOtEAB7 (1).jpg", dispositivo: "PC" },
    { id: 2, titulo: "Street Fighter IV", categoria: "Luta", preco: 59.90, imagem: "img/SFIVcover (1).jpg", dispositivo: "Console" },
    { id: 3, titulo: "The Legend of Zelda: Tears of the Kingdom", categoria: "Aventura", preco: 369.90, imagem: "img/71mDA8PIXeL._AC_UF1000,1000_QL80_ (1).jpg", dispositivo: "Portátil" },
    { id: 4, titulo: "Sonic Mania", categoria: "Plataforma", preco: 49.90, imagem: "img/Sonic_Mania_capa (1).png", dispositivo: "Portátil" },
    { id: 5, titulo: "The Witch's House", categoria: "Horror", preco: 34.90, imagem: "img/The Witch'S House.jpg", dispositivo: "PC" },
    { id: 6, titulo: "Celeste", categoria: "Plataforma", preco: 19.90, imagem: "img/Indie Review_ Celeste_.jpg", dispositivo: "PC" },
    { id: 7, titulo: "Night in The Woods", categoria: "Aventura", preco: 14.90, imagem: "img/83ec5613-2f8b-4d3d-b859-2992da66a9c7.jpg", dispositivo: "PC" },
    { id: 8, titulo: "Oneshot", categoria: "Puzzle", preco: 9.90, imagem: "img/950e4b74-7bab-44a6-b253-00df49fbedf6.jpg", dispositivo: "PC" },
    { id: 9, titulo: "Dragon Ball Sparking Zero", categoria: "Luta", preco: 282.50, imagem: "img/Portada Oficial Dragón Ball Sparking Zero.jpg", dispositivo: "Console" },
    { id: 10, titulo: "Call of Duty: Black Ops III", categoria: "Tiro", preco: 99.90, imagem: "img/da4d0bfa-e9b8-492d-80bf-08aa25f54cea.jpg", dispositivo: "Console" },
    { id: 11, titulo: "Super Mario Galaxy", categoria: "Plataforma", preco: 119.90, imagem: "img/Game_ Super Mario Galaxy.jpg", dispositivo: "Portátil" },
    { id: 12, titulo: "Pokemon Sword", categoria: "RPG", preco: 299.90, imagem: "img/Pokemon Sword - Nintendo Switch (European Version) $51_91.jpg", dispositivo: "Portátil" },
    { id: 13, titulo: "Doom", categoria: "Tiro", preco: 79.90, imagem: "img/doom-cover.jpg", dispositivo: "PC" },
    { id: 14, titulo: "Disco Elysium: The Final Cut", categoria: "RPG", preco: 44.90, imagem: "img/7b7d20d1-9772-40c4-bf23-236cdc3388b1.jpg", dispositivo: "PC" },
    { id: 15, titulo: "Minecraft", categoria: "Simulação", preco: 199.90, imagem: "img/Minecraft.jpg", dispositivo: "PC" },
    { id: 16, titulo: "Sonic the Hedgehog", categoria: "Plataforma", preco: 39.90, imagem: "img/Sonic the Hedgehog (jogo eletrônico de 2006).jpg", dispositivo: "Console" },
    { id: 17, titulo: "Final Fantasy VII: Advent Children", categoria: "RPG", preco: 79.90, imagem: "img/Final Fantasy VII_ Advent Children.jpg", dispositivo: "Console" }
];

// seleciona o catálogo principal, evitando o container de favoritos (que também usa .imagens-flex)
const catalogo = document.querySelector('.imagens-flex:not(#favorites-list)');
const botoesDispositivos = document.querySelectorAll('.titulo .botao');
const botaoVerTodos = document.querySelector('.botao-jogos');
const inputBusca = document.querySelector('#busca-jogos');

const botãoMenu = document.querySelector('.mobile-menu-icon');
const listanav = document.querySelector('.lista-nav');
const header = document.querySelector('header');

// Estado de filtro
let filtroAtivo = null;
let buscaAtiva = '';

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


/* Favoritos: locastorage e renderização */
const FAV_KEY = 'gamezone_favs';

function loadFavs() {
    try {
        var raw = localStorage.getItem(FAV_KEY);
        if (raw) {
            return JSON.parse(raw);
        }
        return [];
    } catch (e) {
        return [];
    }
}

function saveFavs(arr) {
    localStorage.setItem(FAV_KEY, JSON.stringify(arr));
}

function isFav(id) {
    var favs = loadFavs();
    return favs.some(function (g) {
        return String(g.id) === String(id);
    });
}

function addFav(game) {
    var favs = loadFavs();
    var exists = favs.some(function (g) {
        return String(g.id) === String(game.id);
    });

    if (!exists) {
        favs.push(game);
        saveFavs(favs);
    }
}

function removeFav(id) {
    var favs = loadFavs();
    var next = favs.filter(function (g) {
        return String(g.id) !== String(id);
    });
    saveFavs(next);
}

function toggleFav(game) {
    if (isFav(game.id)) {
        removeFav(game.id);
    } else {
        addFav(game);
    }
}

function updateFavVisual(btn) {
    if (!btn) {
        return;
    }

    var icon = btn.querySelector('i');
    var fav = isFav(btn.dataset.id);

    if (icon) {
        if (fav) {
            icon.classList.add('fa-solid');
            icon.classList.remove('fa-regular');
        } else {
            icon.classList.add('fa-regular');
            icon.classList.remove('fa-solid');
        }
    }

    if (fav) {
        btn.style.color = '#ffd700';
    } else {
        btn.style.color = '';
    }
}

function escapeHtml(str) {
    var s = String(str || '');
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };

    return s.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
}

// função de catálogo interativo
function filtrarJogos() {
    let jogosFilterados = jogos;

    // Filtrar por dispositivo
    if (filtroAtivo) {
        jogosFilterados = jogosFilterados.filter(jogo => jogo.dispositivo === filtroAtivo);
    }

    // Filtrar por busca (nome)
    if (buscaAtiva.trim()) {
        const busca = buscaAtiva.toLowerCase();
        jogosFilterados = jogosFilterados.filter(jogo => 
            jogo.titulo.toLowerCase().includes(busca)
        );
     }
     return jogosFilterados;
}

function renderizarCatalogo(jogosList) {
    if (!catalogo) return;

    catalogo.innerHTML = '';

    if (jogosList.length === 0) {
        catalogo.innerHTML = '<p style="color: #FFF; grid-column: 1/-1; text-align: center; padding: 20px;">Nenhum jogo encontrado.</p>';
        return;
    }

    jogosList.forEach(jogo => {
        const div = document.createElement('div');
        div.className = 'game-card';
        div.innerHTML = `
            <img src="${jogo.imagem}" alt="${escapeHtml(jogo.titulo)}" width="250" height="322">
            <button class="fav-btn" data-id="${jogo.id}" data-title="${escapeHtml(jogo.titulo)}" data-img="${jogo.imagem}">
                <i class="fa-regular fa-star"></i>
            </button>
        `;
        catalogo.appendChild(div);
    });

    // Inicializar visual dos botões (eventos são delegados globalmente)
    catalogo.querySelectorAll('.fav-btn').forEach(function (btn) {
        updateFavVisual(btn);
    });
}

    function aplicarFiltros() {
        const jogosFiltrados = filtrarJogos();
        renderizarCatalogo(jogosFiltrados);
    }

    function inicializarFiltros() {
        // Adicionar listeners aos botões de dispositivo
        botoesDispositivos.forEach(botao => {
            botao.addEventListener('click', function() {
                // Remover classe ativa de todos os botões
                botoesDispositivos.forEach(b => b.classList.remove('ativo'));

                // Se clicou no mesmo botão, desativar o filtro
                if (filtroAtivo === this.textContent.trim()) {
                    filtroAtivo = null;
                } else {
                    // Ativar novo filtro
                    filtroAtivo = this.textContent.trim();
                    this.classList.add('ativo');
                }

                aplicarFiltros();
            });
        });

        // Adicionar listener ao input de busca (se existir)
        if (inputBusca) {
            inputBusca.addEventListener('input', function() {
                buscaAtiva = this.value;
                aplicarFiltros();
            });
        }
    }

    function renderFavorites(container, showAll = false){
            var favs = loadFavs();
            if (!container) {
                return;
            }

            if (!favs || favs.length === 0) {
                container.innerHTML = '<p style="color: #FFF; grid-column: 1/-1; text-align: center; padding: 20px;">Você não tem favoritos.</p>';
                var showBtnNone = document.querySelector('#show-all-btn');
                if (showBtnNone) {
                    showBtnNone.style.display = 'none';
                }
                return;
            }

            var toShow;
            if (showAll) {
                toShow = favs;
            } else {
                toShow = favs.slice(0, 4);
            }

            container.innerHTML = toShow.map(function (g) {
                return '<div class="game-card fav-item">' +
                    '<img src="' + g.img + '" alt="' + escapeHtml(g.title) + '" width="250" height="322">' +
                    '<button class="fav-btn" data-id="' + g.id + '" data-title="' + escapeHtml(g.title) + '" data-img="' + g.img + '"><i class="fa-solid fa-star"></i></button>' +
                    '</div>';
            }).join('');

            container.querySelectorAll('.fav-btn').forEach(function (b) {
                updateFavVisual(b);
            });

            var showBtn = document.querySelector('#show-all-btn');
            if (showBtn) {
                if (favs.length <= 4) {
                    showBtn.style.display = 'none';
                } else {
                    showBtn.style.display = '';
                    if (showAll) {
                        showBtn.textContent = 'Mostrar apenas 4';
                        showBtn.dataset.show = 'true';
                    } else {
                        showBtn.textContent = 'Ver todos os Jogos';
                        showBtn.dataset.show = 'false';
                    }
                }
            }
    }

    document.addEventListener('DOMContentLoaded', () => {
        // delegação única para todos os botões de favorito na página
        document.addEventListener('click', function (ev) {
            var btn = ev.target.closest('.fav-btn');
            if (!btn) {
                return;
            }

            ev.stopPropagation();

            var game = {
                id: btn.dataset.id,
                title: btn.dataset.title || '',
                img: btn.dataset.img || ''
            };

            toggleFav(game);

            // atualizar todas as instâncias do mesmo botão (catalogo + favoritos)
            document.querySelectorAll('.fav-btn[data-id="' + game.id + '"]').forEach(function (d) {
                updateFavVisual(d);
            });

            var favContainer = document.querySelector('#favorites-list');
            var showBtnLocal = document.querySelector('#show-all-btn');
            var showAll = showBtnLocal && showBtnLocal.dataset.show === 'true';
            if (favContainer) {
                renderFavorites(favContainer, showAll);
            }
        });

        const favContainer = document.querySelector('#favorites-list');
        const showBtn = document.querySelector('#show-all-btn');
        if (favContainer) renderFavorites(favContainer, false);
        if (showBtn && favContainer){
            showBtn.addEventListener('click', function () {
                var currently = showBtn.dataset.show === 'true';
                renderFavorites(favContainer, !currently);
            });
        }

        // Inicializar catálogo interativo na página index
        if (catalogo) {
            renderizarCatalogo(jogos);
            inicializarFiltros();
        }
    });