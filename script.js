"use strict";

const CHAVE_TEMA = "temaNexus";
const ITENS_POR_PAGINA = 4;

const elementoRelogio = document.querySelector("#relogio");
const botaoTema = document.querySelector("#botao-tema");
const gradeNoticias = document.querySelector("#grade-noticias");
const botoesFiltro = document.querySelectorAll(".filter-btn");
const formulario = document.querySelector("#formulario-newsletter");
const campoEmail = document.querySelector("#campo-email");
const mensagemFormulario = document.querySelector("#mensagem-formulario");
const botaoCarregarMais = document.querySelector("#carregar-mais");

const dadosNoticias = [
    { titulo: "Atualização traz novo mapa e heróis para shooter tático", categoria: "PC", data: "29 set 2026", autor: "Marcos Lima", img: "https://picsum.photos/seed/noticia1/600/400" },
    { titulo: "Review: O aguardado RPG de fantasia decepciona no lançamento", categoria: "Console", data: "29 set 2026", autor: "Julia Reis", img: "https://picsum.photos/seed/noticia2/600/400" },
    { titulo: "Estúdio indie fatura milhões com simulador de vida no campo", categoria: "PC", data: "28 set 2026", autor: "Thiago Mendes", img: "https://picsum.photos/seed/noticia3/600/400" },
    { titulo: "Liga nacional de FPS anuncia premiação histórica de R$ 2 Milhões", categoria: "E-sports", data: "28 set 2026", autor: "Ana Costa", img: "https://picsum.photos/seed/noticia4/600/400" },
    { titulo: "Novo battle royale focado em magia domina as lojas de apps", categoria: "Mobile", data: "27 set 2026", autor: "Pedro Alves", img: "https://picsum.photos/seed/noticia5/600/400" },
    { titulo: "Inteligência Artificial começa a criar NPCs com emoções reais", categoria: "PC", data: "27 set 2026", autor: "Sofia Martins", img: "https://picsum.photos/seed/noticia6/600/400" },
    { titulo: "Controle customizável promete revolucionar a acessibilidade", categoria: "Console", data: "26 set 2026", autor: "Carlos Ruiz", img: "https://picsum.photos/seed/noticia7/600/400" },
    { titulo: "Time brasileiro sofre revés e é eliminado do circuito internacional", categoria: "E-sports", data: "25 set 2026", autor: "Marcos Lima", img: "https://picsum.photos/seed/noticia8/600/400" },
    { titulo: "Documentário revela os bastidores da criação do primeiro console", categoria: "Console", data: "24 set 2026", autor: "Julia Reis", img: "https://picsum.photos/seed/noticia9/600/400" },
    { titulo: "Campeonato universitário ganha patrocínio milionário", categoria: "E-sports", data: "24 set 2026", autor: "Ana Costa", img: "https://picsum.photos/seed/noticia10/600/400" }
];

let filtroAtual = "Todas";
let itensVisiveis = ITENS_POR_PAGINA;

function atualizarRelogio() {
    if (!elementoRelogio) return;
    const agora = new Date();
    const opcoesData = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const textoData = agora.toLocaleDateString("pt-PT", opcoesData);
    const textoHora = agora.toLocaleTimeString("pt-PT");
    const dataFormatada = textoData.charAt(0).toUpperCase() + textoData.slice(1);
    
    elementoRelogio.textContent = `${dataFormatada} - ${textoHora}`;
}

function carregarTema() {
    try {
        const temaSalvo = localStorage.getItem(CHAVE_TEMA);
        if (temaSalvo === "dark" && botaoTema) {
            document.body.setAttribute("data-theme", "dark");
            botaoTema.textContent = "☀️ Claro";
        }
    } catch {
        return;
    }
}

function salvarTema(tema) {
    try {
        localStorage.setItem(CHAVE_TEMA, tema);
    } catch {
        return;
    }
}

function alternarTema() {
    const isTemaEscuro = document.body.getAttribute("data-theme") === "dark";

    if (isTemaEscuro) {
        document.body.removeAttribute("data-theme");
        if (botaoTema) botaoTema.textContent = "🌙 Escuro";
        salvarTema("light");
    } else {
        document.body.setAttribute("data-theme", "dark");
        if (botaoTema) botaoTema.textContent = "☀️ Claro";
        salvarTema("dark");
    }
}

function criarHtmlNoticia(noticia) {
    const classeTag = `tag-${noticia.categoria.toLowerCase()}`;
    
    return `
        <article class="card">
            <img src="${noticia.img}" alt="${noticia.titulo}" class="card-img">
            <div class="card-content">
                <span class="category-tag ${classeTag}">${noticia.categoria}</span>
                <h3><a href="#">${noticia.titulo}</a></h3>
                <p class="meta">${noticia.autor} • ${noticia.data}</p>
            </div>
        </article>`;
}

function renderizarNoticias() {
    if (!gradeNoticias) return;

    const noticiasFiltradas = filtroAtual === "Todas"
        ? dadosNoticias
        : dadosNoticias.filter((noticia) => noticia.categoria === filtroAtual);

    const noticiasExibidas = noticiasFiltradas.slice(0, itensVisiveis);
    gradeNoticias.innerHTML = noticiasExibidas.map(criarHtmlNoticia).join("");

    if (botaoCarregarMais) {
        if (noticiasFiltradas.length > itensVisiveis) {
            botaoCarregarMais.classList.remove("escondido");
        } else {
            botaoCarregarMais.classList.add("escondido");
        }
    }
}

function validarInscricao(evento) {
    evento.preventDefault();
    if (!campoEmail || !mensagemFormulario) return;
    
    const email = campoEmail.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regexEmail.test(email)) {
        mensagemFormulario.style.color = "#10B981";
        mensagemFormulario.textContent = "Inscrição realizada com sucesso! Prepare-se para subir de nível.";
        formulario.reset();
    } else {
        mensagemFormulario.style.color = "#FCA5A5";
        mensagemFormulario.textContent = "Por favor, insira um e-mail válido.";
    }
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();
carregarTema();
renderizarNoticias();

if (botaoTema) {
    botaoTema.addEventListener("click", alternarTema);
}

if (botaoCarregarMais) {
    botaoCarregarMais.addEventListener("click", () => {
        itensVisiveis += ITENS_POR_PAGINA;
        renderizarNoticias();
    });
}

if (botoesFiltro) {
    botoesFiltro.forEach((botao) => {
        botao.addEventListener("click", () => {
            filtroAtual = botao.dataset.filter;
            itensVisiveis = ITENS_POR_PAGINA;

            botoesFiltro.forEach((item) => {
                const isAtivo = item === botao;
                item.classList.toggle("active", isAtivo);
            });

            renderizarNoticias();
        });
    });
}

if (formulario) {
    formulario.addEventListener("submit", validarInscricao);
}