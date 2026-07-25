const templos = [
    {
        nomeDoTemplo: "Aba Nigeria",
        localizacao: "Aba, Nigéria",
        consagracao: "2005, 7 de agosto",
        area: 11500,
        urlDaImagem:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        nomeDoTemplo: "Manti Utah",
        localizacao: "Manti, Utah, Estados Unidos",
        consagracao: "1888, 21 de maio",
        area: 74792,
        urlDaImagem:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        nomeDoTemplo: "Payson Utah",
        localizacao: "Payson, Utah, Estados Unidos",
        consagracao: "2015, 7 de junho",
        area: 96630,
        urlDaImagem:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        nomeDoTemplo: "Yigo Guam",
        localizacao: "Yigo, Guam",
        consagracao: "2020, 2 de maio",
        area: 6861,
        urlDaImagem:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        nomeDoTemplo: "Washington D.C.",
        localizacao: "Kensington, Maryland, Estados Unidos",
        consagracao: "1974, 19 de novembro",
        area: 156558,
        urlDaImagem:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        nomeDoTemplo: "Lima Peru",
        localizacao: "Lima, Peru",
        consagracao: "1986, 10 de janeiro",
        area: 9600,
        urlDaImagem:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        nomeDoTemplo: "Cidade do México, México",
        localizacao: "Cidade do México, México",
        consagracao: "1983, 2 de dezembro",
        area: 116642,
        urlDaImagem:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },

    // Templo adicional 1
    {
        nomeDoTemplo: "São Paulo Brasil",
        localizacao: "São Paulo, Brasil",
        consagracao: "1978, 30 de outubro",
        area: 55000,
        urlDaImagem:
            "https://www.churchofjesuschrist.org/imgs/940f3e201364433a3d5d3dc14b0cacee38d41d1d/full/800%2C/0/default?lang=eng"
    },

    // Templo adicional 2
    {
        nomeDoTemplo: "Roma Itália",
        localizacao: "Roma, Itália",
        consagracao: "2019, 10 de março",
        area: 41010,
        urlDaImagem:
            "https://www.churchofjesuschrist.org/imgs/17e2c70d687fffedfe115197e57fa8f5d1d369bb/full/800%2C/0/default?lang=eng"
    },

    // Templo adicional 3
    {
        nomeDoTemplo: "Curitiba Brasil",
        localizacao: "Curitiba, Paraná, Brasil",
        consagracao: "2008, 1 de junho",
        area: 27850,
        urlDaImagem:
            "https://www.churchofjesuschrist.org/imgs/ea7e0f39c8e26d163a4dfedfcb1ce5c41d650b5b/full/800%2C/0/default?lang=eng"
    }
];

const containerDosTemplos =
    document.querySelector("#temple-cards");

const tituloDaPagina =
    document.querySelector("#page-title");

const botoesDeFiltro =
    document.querySelectorAll("[data-filter]");

const menuButton =
    document.querySelector("#menu");

const navigation =
    document.querySelector("#navigation");

/*
    Recebe um texto como:
    "2005, 7 de agosto"

    E devolve somente:
    2005
*/
function obterAnoDaConsagracao(templo) {
    return Number.parseInt(
        templo.consagracao.split(",")[0],
        10
    );
}

/*
    Cria os cartões com base na lista recebida.
*/
function criarCartoesDosTemplos(listaDeTemplos) {
    // Apaga os cartões exibidos anteriormente.
    containerDosTemplos.replaceChildren();

    const fragmento =
        document.createDocumentFragment();

    listaDeTemplos.forEach((templo) => {
        const cartao =
            document.createElement("article");

        cartao.classList.add("temple-card");

        const nome =
            document.createElement("h3");

        nome.textContent = templo.nomeDoTemplo;

        const localizacao =
            document.createElement("p");

        localizacao.innerHTML =
            `<strong>Localização:</strong> ${templo.localizacao}`;

        const consagracao =
            document.createElement("p");

        consagracao.innerHTML =
            `<strong>Dedicado:</strong> ${templo.consagracao}`;

        const area =
            document.createElement("p");

        area.innerHTML =
            `<strong>Tamanho:</strong> ` +
            `${templo.area.toLocaleString("pt-BR")} pés²`;

        const imagem =
            document.createElement("img");

        imagem.src = templo.urlDaImagem;
        imagem.alt =
            `Templo de ${templo.nomeDoTemplo}`;

        /*
            Requisito de lazy loading.
        */
        imagem.loading = "lazy";

        /*
            Ajuda o navegador a processar a imagem
            sem bloquear a página.
        */
        imagem.decoding = "async";

        imagem.width = 400;
        imagem.height = 250;

        cartao.append(
            nome,
            localizacao,
            consagracao,
            area,
            imagem
        );

        fragmento.appendChild(cartao);
    });

    containerDosTemplos.appendChild(fragmento);
}

/*
    Define qual lista deverá ser exibida.
*/
function filtrarTemplos(tipoDeFiltro) {
    switch (tipoDeFiltro) {
        case "antigos":
            return templos.filter((templo) => {
                return obterAnoDaConsagracao(templo) < 1900;
            });

        case "novos":
            return templos.filter((templo) => {
                return obterAnoDaConsagracao(templo) > 2000;
            });

        case "grandes":
            return templos.filter((templo) => {
                return templo.area > 90000;
            });

        case "pequenos":
            return templos.filter((templo) => {
                return templo.area < 10000;
            });

        case "inicio":
        default:
            return templos;
    }
}

/*
    Define o título conforme o filtro selecionado.
*/
function obterTitulo(tipoDeFiltro) {
    const titulos = {
        inicio: "Página Inicial",
        antigos: "Templos Antigos",
        novos: "Templos Novos",
        grandes: "Templos Grandes",
        pequenos: "Templos Pequenos"
    };

    return titulos[tipoDeFiltro] ?? "Página Inicial";
}

/*
    Remove a classe active dos botões
    e adiciona ao botão selecionado.
*/
function atualizarBotaoAtivo(botaoSelecionado) {
    botoesDeFiltro.forEach((botao) => {
        botao.classList.remove("active");
    });

    botaoSelecionado.classList.add("active");
}

/*
    Eventos dos botões de filtro.
*/
botoesDeFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
        const tipoDeFiltro =
            botao.dataset.filter;

        const templosFiltrados =
            filtrarTemplos(tipoDeFiltro);

        tituloDaPagina.textContent =
            obterTitulo(tipoDeFiltro);

        criarCartoesDosTemplos(
            templosFiltrados
        );

        atualizarBotaoAtivo(botao);

        /*
            Fecha o menu depois da escolha
            em dispositivos móveis.
        */
        navigation.classList.remove("open");

        menuButton.textContent = "☰";
        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );
    });
});

/*
    Menu responsivo.
*/
menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const menuEstaAberto =
        navigation.classList.contains("open");

    menuButton.textContent =
        menuEstaAberto ? "✕" : "☰";

    menuButton.setAttribute(
        "aria-expanded",
        String(menuEstaAberto)
    );
});

/*
    Ano atual do footer.
*/
const currentYear =
    document.querySelector("#currentyear");

currentYear.textContent =
    new Date().getFullYear();

/*
    Última modificação do documento.
*/
const lastModified =
    document.querySelector("#lastModified");

lastModified.textContent =
    `Última modificação: ${document.lastModified}`;

/*
    Exibe todos os templos quando
    a página é carregada.
*/
criarCartoesDosTemplos(templos);