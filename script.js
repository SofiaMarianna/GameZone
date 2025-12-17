// Dados dos jogos

const jogos = [
    { id: 1, titulo: "Tomb Raider", categoria: "Ação", preco: 89.90, imagem: "img/eOtEAB7 (1).jpg", dispositivo: "PC", dataLancamento: "2013-03-05", descricao: "Uma aventura épica com Lara Croft em busca de artefatos antigos." },
    { id: 2, titulo: "Street Fighter IV", categoria: "Luta", preco: 59.90, imagem: "img/SFIVcover (1).jpg", dispositivo: "Console", dataLancamento: "2008-07-18", descricao: "Jogo de luta clássico com personagens icônicos e combos incríveis." },
    { id: 3, titulo: "The Legend of Zelda: Tears of the Kingdom", categoria: "Aventura", preco: 369.90, imagem: "img/71mDA8PIXeL._AC_UF1000,1000_QL80_ (1).jpg", dispositivo: "Portátil", dataLancamento: "2023-05-12", descricao: "A sequência esperada de Breath of the Wild com novos poderes e mecânicas." },
    { id: 4, titulo: "Sonic Mania", categoria: "Plataforma", preco: 49.90, imagem: "img/Sonic_Mania_capa (1).png", dispositivo: "Portátil", dataLancamento: "2017-08-15", descricao: "Retorno dos clássicos de Sonic com gráficos retrô e gameplay moderno." },
    { id: 5, titulo: "The Witch's House", categoria: "Horror", preco: 34.90, imagem: "img/The Witch'S House.jpg", dispositivo: "PC", dataLancamento: "2012-10-12", descricao: "Um jogo de horror indie atmosférico e perturbador." },
    { id: 6, titulo: "Celeste", categoria: "Plataforma", preco: 19.90, imagem: "img/Indie Review_ Celeste_.jpg", dispositivo: "PC", dataLancamento: "2018-01-25", descricao: "Jogo de plataforma desafiador com uma história emocional." },
    { id: 7, titulo: "Night in The Woods", categoria: "Indie", preco: 14.90, imagem: "img/83ec5613-2f8b-4d3d-b859-2992da66a9c7.jpg", dispositivo: "PC", dataLancamento: "2017-02-21", descricao: "Uma aventura narrativa única sobre voltar para casa." },
    { id: 8, titulo: "Oneshot", categoria: "Puzzle", preco: 9.90, imagem: "img/950e4b74-7bab-44a6-b253-00df49fbedf6.jpg", dispositivo: "PC", dataLancamento: "2016-12-08", descricao: "Um puzzle game conceitual que quebra a quarta parede." },
    { id: 9, titulo: "Dragon Ball Sparking Zero", categoria: "Luta", preco: 282.50, imagem: "img/Portada Oficial Dragón Ball Sparking Zero.jpg", dispositivo: "Console", dataLancamento: "2024-10-10", descricao: "Jogo de luta épico do universo Dragon Ball com gráficos impressionantes." },
    { id: 10, titulo: "Call of Duty: Black Ops III", categoria: "Tiro", preco: 99.90, imagem: "img/da4d0bfa-e9b8-492d-80bf-08aa25f54cea.jpg", dispositivo: "Console", dataLancamento: "2015-11-06", descricao: "Shooter em primeira pessoa com campanha cinética e multiplayer intenso." },
    { id: 11, titulo: "Super Mario Galaxy", categoria: "Plataforma", preco: 119.90, imagem: "img/Game_ Super Mario Galaxy.jpg", dispositivo: "Portátil", dataLancamento: "2007-11-01", descricao: "Aventura de plataforma em ambientes espaciais com gravidade única." },
    { id: 12, titulo: "Pokemon Sword", categoria: "RPG", preco: 299.90, imagem: "img/Pokemon Sword - Nintendo Switch (European Version) $51_91.jpg", dispositivo: "Portátil", dataLancamento: "2019-11-15", descricao: "RPG Pokémon com nova região e pokémons incríveis." },
    { id: 13, titulo: "Doom", categoria: "Tiro", preco: 79.90, imagem: "img/doom-cover.jpg", dispositivo: "PC", dataLancamento: "2016-05-13", descricao: "Shooter clássico que redefiniu o gênero com ação alucinante." },
    { id: 14, titulo: "Disco Elysium: The Final Cut", categoria: "RPG", preco: 44.90, imagem: "img/7b7d20d1-9772-40c4-bf23-236cdc3388b1.jpg", dispositivo: "PC", dataLancamento: "2019-10-15", descricao: "RPG narrativo único com investigação e personagens memoráveis." },
    { id: 15, titulo: "Minecraft", categoria: "Simulação", preco: 199.90, imagem: "img/Minecraft.jpg", dispositivo: "PC", dataLancamento: "2011-11-18", descricao: "Sandbox de blocos infinito para criar, explorar e sobreviver." },
    { id: 16, titulo: "Sonic the Hedgehog", categoria: "Plataforma", preco: 39.90, imagem: "img/Sonic the Hedgehog (jogo eletrônico de 2006) – Wikipédia, a enciclopédia livre.jpg", dispositivo: "Console", dataLancamento: "2006-11-14", descricao: "Jogo de ação rápido com o famoso ouriço azul." },
    { id: 17, titulo: "Final Fantasy VII: Advent Children", categoria: "RPG", preco: 79.90, imagem: "img/Final Fantasy VII_ Advent Children.jpg", dispositivo: "Console", dataLancamento: "1997-01-31", descricao: "Continuação épica do lendário Final Fantasy VII com gráficos cinematográficos." }
];

// ===== Avaliações para jogos Indie =====
// Estrutura de armazenamento: { [idDoJogo]: { ratings: [1,5,3], avg: 4.0 } }
const RATINGS_KEY = 'gamezone_ratings';

function loadRatings() {
  try {
    const raw = localStorage.getItem(RATINGS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}
function saveRatings(obj) {
  localStorage.setItem(RATINGS_KEY, JSON.stringify(obj));
}
function setRatingForGame(gameId, value) {
  const ratings = loadRatings();
  if (!ratings[gameId]) ratings[gameId] = { ratings: [] };
  ratings[gameId].ratings.push(value);
  // calcular média
  const arr = ratings[gameId].ratings;
  ratings[gameId].avg = arr.reduce((s, v) => s + v, 0) / arr.length;
  saveRatings(ratings);
  return ratings[gameId];
}
function getRatingForGame(gameId) {
  const ratings = loadRatings();
  return ratings[gameId] || { ratings: [], avg: 0 };
}

// Filtrar apenas jogos Indie
function obterJogosIndie() {
  return jogos.filter(j => {
    // ajuste aqui se você usar outra propriedade para marcar indie
    return String(j.categoria).toLowerCase() === 'indie' || String(j.categoria).toLowerCase() === 'indie ';
  });
}

// Renderizar cards Indie com sistema de estrelas
function renderizarIndie(containerSelector = '.imagens-flex') {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const lista = obterJogosIndie();
  container.innerHTML = '';

  lista.forEach(jogo => {
    const ratingData = getRatingForGame(jogo.id);
    const avg = ratingData.avg ? ratingData.avg.toFixed(1) : '—';

    const card = document.createElement('div');
    card.className = 'game-card indie-card';
    card.innerHTML = `
      <img src="${jogo.imagem}" alt="${escapeHtml(jogo.titulo)}" width="250" height="322">
      <button class="fav-btn" data-id="${jogo.id}" data-title="${escapeHtml(jogo.titulo)}" data-img="${jogo.imagem}">
        <i class="fa-regular fa-star"></i>
      </button>
      <div class="card-meta">
        <h3>${escapeHtml(jogo.titulo)}</h3>
        <p class="price">R$ ${jogo.preco.toFixed(2)}</p>
        <div class="rating" data-id="${jogo.id}">
          <div class="stars" aria-label="Avaliar ${escapeHtml(jogo.titulo)}">
            <span class="star" data-value="1">★</span>
            <span class="star" data-value="2">★</span>
            <span class="star" data-value="3">★</span>
            <span class="star" data-value="4">★</span>
            <span class="star" data-value="5">★</span>
          </div>
          <div class="rating-info">Média: <span class="rating-avg">${avg}</span></div>
        </div>
        <button class="btn-detalhes" data-id="${jogo.id}">Ver Detalhes</button>
      </div>
    `;
    container.appendChild(card);

    // marcar estrelas conforme média (visual inicial)
    const stars = card.querySelectorAll('.star');
    const avgNum = parseFloat(ratingData.avg || 0);
    stars.forEach(s => {
      const v = parseInt(s.dataset.value, 10);
      if (avgNum >= v) s.classList.add('filled');
      else s.classList.remove('filled');
    });
    // atualizar texto da média
    const avgEl = card.querySelector('.rating-avg');
    if (avgEl) avgEl.textContent = ratingData.avg ? ratingData.avg.toFixed(1) : '—';
  });

  // Delegação de eventos para estrelas (clicar e hover)
  container.querySelectorAll('.stars').forEach(starsEl => {
    const gameId = starsEl.closest('.rating').dataset.id;

    // hover: destacar até a estrela
    starsEl.addEventListener('mouseover', function (e) {
      const s = e.target.closest('.star');
      if (!s) return;
      const val = parseInt(s.dataset.value, 10);
      starsEl.querySelectorAll('.star').forEach(st => {
        st.classList.toggle('hover', parseInt(st.dataset.value, 10) <= val);
      });
    });
    starsEl.addEventListener('mouseout', function () {
      starsEl.querySelectorAll('.star').forEach(st => st.classList.remove('hover'));
    });

    // click: registrar nota
    starsEl.addEventListener('click', function (e) {
      const s = e.target.closest('.star');
      if (!s) return;
      const val = parseInt(s.dataset.value, 10);
      const result = setRatingForGame(gameId, val); // salva e retorna dados atualizados

      // atualizar UI: média e preenchimento
      const parentCard = starsEl.closest('.game-card');
      if (!parentCard) return;
      const avgEl = parentCard.querySelector('.rating-avg');
      if (avgEl) avgEl.textContent = result.avg ? result.avg.toFixed(1) : '—';

      parentCard.querySelectorAll('.star').forEach(st => {
        const v = parseInt(st.dataset.value, 10);
        st.classList.toggle('filled', result.avg >= v);
      });
    });
  });

  // inicializar botões detalhes e favoritos (reaproveita funções existentes)
  container.querySelectorAll('.btn-detalhes').forEach(btn => {
    btn.addEventListener('click', function () {
      const id = parseInt(this.dataset.id, 10);
      const jogo = jogos.find(j => j.id === id);
      if (jogo) abrirModal(jogo);
    });
  });
  container.querySelectorAll('.fav-btn').forEach(b => updateFavVisual(b));
}

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

    // ===== Lançamentos: carregar dinamicamente e modal =====
    function formatarData(dataString) {
        if (!dataString) return '';
        var d = new Date(dataString + 'T00:00:00');
        return d.toLocaleDateString('pt-BR');
    }

    function carregarLancamentos(){
        var container = document.getElementById('lancamentos-container');
        if (!container) return;

        // ordenar por dataLancamento (mais recentes primeiro)
        var lancs = jogos.slice().sort(function(a,b){
            var da = a.dataLancamento ? new Date(a.dataLancamento) : 0;
            var db = b.dataLancamento ? new Date(b.dataLancamento) : 0;
            return db - da;
        });

        container.innerHTML = '';
        lancs.forEach(function(jogo){
            var card = document.createElement('div');
            card.className = 'game-card lancamento-card';
            card.innerHTML = '\n                <img src="' + jogo.imagem + '" alt="' + escapeHtml(jogo.titulo) + '" width="250" height="322">\n                <button class="fav-btn" data-id="' + jogo.id + '" data-title="' + escapeHtml(jogo.titulo) + '" data-img="' + jogo.imagem + '"><i class="fa-regular fa-star"></i></button>\n                <div class="card-meta">\n                    <h3>' + escapeHtml(jogo.titulo) + '</h3>\n                    <p class="price">R$ ' + jogo.preco.toFixed(2) + '</p>\n                    <button class="btn-detalhes" data-id="' + jogo.id + '">Ver Detalhes</button>\n                </div>\n            ';
            container.appendChild(card);
        });

        // inicializar botões de detalhes
        container.querySelectorAll('.btn-detalhes').forEach(function(btn){
            btn.addEventListener('click', function(){
                var id = parseInt(this.dataset.id, 10);
                var jogo = jogos.find(function(j){ return j.id === id; });
                if (jogo) abrirModal(jogo);
            });
        });

        // atualizar visual dos favs (delegação global já trata clique)
        container.querySelectorAll('.fav-btn').forEach(function(b){ updateFavVisual(b); });
    }

    function abrirModal(jogo){
        var modal = document.getElementById('modal-detalhes');
        if (!modal) return;

        var img = document.getElementById('modal-imagem');
        var titulo = document.getElementById('modal-titulo');
        var desc = document.getElementById('modal-descricao');
        var cat = document.getElementById('modal-categoria');
        var disp = document.getElementById('modal-dispositivo');
        var data = document.getElementById('modal-data');
        var preco = document.getElementById('modal-preco');

        if (img) img.src = jogo.imagem || '';
        if (titulo) titulo.textContent = jogo.titulo || '';
        if (desc) desc.textContent = jogo.descricao || '';
        if (cat) cat.textContent = jogo.categoria || '';
        if (disp) disp.textContent = jogo.dispositivo || '';
        if (data) data.textContent = formatarData(jogo.dataLancamento) || '';
        if (preco) preco.textContent = jogo.preco ? jogo.preco.toFixed(2) : '';

        // configurar botão favorito no modal
        var btnFav = document.getElementById('modal-favorito-btn');
        if (btnFav){
            // remover listeners antigos substituindo por clone
            var novo = btnFav.cloneNode(true);
            btnFav.parentNode.replaceChild(novo, btnFav);
            btnFav = document.getElementById('modal-favorito-btn');
            // atualizar estado visual
            var esta = isFav(jogo.id);
            updateModalFavBtn(btnFav, esta);
            btnFav.addEventListener('click', function(){
                var game = { id: jogo.id, title: jogo.titulo, img: jogo.imagem };
                toggleFav(game);
                var agora = isFav(jogo.id);
                updateModalFavBtn(btnFav, agora);
                // atualizar instâncias de botões de capa
                document.querySelectorAll('.fav-btn[data-id="' + jogo.id + '"]').forEach(function(d){ updateFavVisual(d); });
                // se estiver na página favoritos, re-render
                var favContainer = document.querySelector('#favorites-list');
                if (favContainer) {
                    var showBtnLocal = document.querySelector('#show-all-btn');
                    var showAll = showBtnLocal && showBtnLocal.dataset.show === 'true';
                    renderFavorites(favContainer, showAll);
                }
            });
        }

        modal.style.display = 'flex';
    }

    function updateModalFavBtn(btn, esta){
    if (!btn) return;
    btn.innerHTML = '';
    var ic = document.createElement('i');
    ic.classList.add('fa-star');
    if (esta){ ic.classList.add('fa-solid'); } else { ic.classList.add('fa-regular'); }
    btn.appendChild(ic);
    btn.appendChild(document.createTextNode(esta ? ' Remover dos Favoritos' : ' Adicionar aos Favoritos'));
    btn.style.background = esta ? '#2670a1ff' : '#2670a1ff';
    btn.style.color = esta ? '66C0F4' : '66C0F4#';
}

    function fecharModal(){ var modal = document.getElementById('modal-detalhes'); if (modal) modal.style.display = 'none'; }

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
    if (!btn) return;
    ev.stopPropagation();
    var game = { id: btn.dataset.id, title: btn.dataset.title || '', img: btn.dataset.img || '' };
    toggleFav(game);
    document.querySelectorAll('.fav-btn[data-id="' + game.id + '"]').forEach(function (d) { updateFavVisual(d); });
    var favContainer = document.querySelector('#favorites-list');
    var showBtnLocal = document.querySelector('#show-all-btn');
    var showAll = showBtnLocal && showBtnLocal.dataset.show === 'true';
    if (favContainer) renderFavorites(favContainer, showAll);
  });

  // inicializações de favoritos / show all
  const favContainer = document.querySelector('#favorites-list');
  const showBtn = document.querySelector('#show-all-btn');
  if (favContainer) renderFavorites(favContainer, false);
  if (showBtn && favContainer) {
    showBtn.addEventListener('click', function () {
      var currently = showBtn.dataset.show === 'true';
      renderFavorites(favContainer, !currently);
    });
  }

  // Inicializar catálogo interativo na página index (se existir)
  if (catalogo) {
    renderizarCatalogo(jogos);
    inicializarFiltros();
  }

  // Inicializar página de lançamentos (se existir)
  var lancContainer = document.getElementById('lancamentos-container');
  if (lancContainer) carregarLancamentos();

  // Inicializar página Indie (se existir container específico)
  var indieContainer = document.getElementById('indie-container');
  if (indieContainer) {
    renderizarIndie('#indie-container'); // chama a função que monta os cards indie
  }

  // Modal: fechar ao clicar no X ou fora do conteúdo
  var modal = document.getElementById('modal-detalhes');
  var closeBtn = document.querySelector('.modal-close');
  if (closeBtn) closeBtn.addEventListener('click', fecharModal);
  if (modal) {
    window.addEventListener('click', function (e) { if (e.target === modal) fecharModal(); });
  }
});
