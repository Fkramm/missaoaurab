
const perfis = [
    {
        id: "comandante",
        nome: "Comandante de Missão",
        categoria: "LIDERANÇA E GESTÃO",
        codigo: "CMD // 001",
        icone: "♜",
        descricao: "Mantém o grupo unido e focado nos objetivos, tomando decisões difíceis sob pressão.",
        habilidade: "Coordena a equipe, define estratégias e toma decisões em situações críticas da expedição.",
        tracos: "Estratégico, confiante, organizado e bom comunicador.",
        frase: "Sua mente estratégica e presença marcante fazem de você o pilar de sustentação do grupo. Quando a tempestade espacial chegar, todos olharão para você.",
        imagem: "imagens/Com.jpg",
        classeTema: "tema-comandante",
        atributos: [
            { nome: "Liderança", icone: "♜", valor: 96, cor: "#D8B76A" },
            { nome: "Estratégia", icone: "⌘", valor: 94, cor: "#7CA7E8" },
            { nome: "Comunicação", icone: "◉", valor: 89, cor: "#F8FAFC" },
            { nome: "Decisão", icone: "⚡", valor: 92, cor: "#D8B76A" },
            { nome: "Organização", icone: "▤", valor: 90, cor: "#7CA7E8" }
        ]
    },
    {
        id: "engenheiro",
        nome: "Engenheira de Sistemas e IA",
        categoria: "TECNOLOGIA E LÓGICA",
        codigo: "ENG // 002",
        icone: "⌘",
        descricao: "Mantém a nave funcionando, conserta falhas técnicas e programa as IAs da expedição.",
        habilidade: "Diagnostica falhas, repara equipamentos e desenvolve soluções tecnológicas para manter a missão ativa.",
        tracos: "Analítica, curiosa, prática e guiada por fatos e lógica.",
        frase: "Para você, não existem problemas sem solução, apenas códigos ainda não decifrados. Sem sua precisão, a missão nem sairia da órbita.",
        imagem: "imagens/Eng.jpg",
        classeTema: "tema-engenheiro",
        atributos: [
            { nome: "Lógica", icone: "⌘", valor: 96, cor: "#A855F7" },
            { nome: "Tecnologia", icone: "▦", valor: 98, cor: "#22D3EE" },
            { nome: "Criatividade", icone: "✧", valor: 86, cor: "#F8FAFC" },
            { nome: "Precisão", icone: "◎", valor: 93, cor: "#22D3EE" },
            { nome: "Resolução", icone: "⚙", valor: 91, cor: "#A855F7" }
        ]
    },
    {
        id: "reconhecimento",
        nome: "Especialista em Reconhecimento",
        categoria: "IMPROVISO E EXPLORAÇÃO",
        codigo: "REC // 003",
        icone: "⌖",
        descricao: "Mapeia terrenos desconhecidos, antecipa perigos e encontra rotas alternativas para a equipe.",
        habilidade: "Explora regiões desconhecidas, identifica ameaças e encontra caminhos seguros em situações imprevisíveis.",
        tracos: "Audacioso, flexível, criativo e intuitivo.",
        frase: "Rotinas e manuais não limitam você. Sua capacidade de improvisar e pensar fora da caixa é o que salvará a expedição.",
        imagem: "imagens/Esp.jpg",
        classeTema: "tema-reconhecimento",
        atributos: [
            { nome: "Exploração", icone: "⌖", valor: 97, cor: "#65C987" },
            { nome: "Agilidade", icone: "⚡", valor: 91, cor: "#F59E0B" },
            { nome: "Percepção", icone: "◉", valor: 94, cor: "#65C987" },
            { nome: "Improviso", icone: "✧", valor: 96, cor: "#F59E0B" },
            { nome: "Adaptação", icone: "↗", valor: 92, cor: "#9CA3AF" }
        ]
    },
    {
        id: "astrobiologo",
        nome: "Astrobióloga de Campo",
        categoria: "CIÊNCIA E EMPATIA",
        codigo: "BIO // 004",
        icone: "✿",
        descricao: "Estuda a ecologia do novo planeta e zela pela saúde biológica e pelo bem-estar da equipe.",
        habilidade: "Investiga formas de vida, analisa ecossistemas desconhecidos e ajuda a preservar a saúde biológica da tripulação.",
        tracos: "Empática, observadora, paciente e protetora.",
        frase: "Sua sensibilidade e respeito pela vida garantem que a equipe explore o novo mundo com segurança e harmonia.",
        imagem: "imagens/Bio.jpg",
        classeTema: "tema-astrobiologo",
        atributos: [
            { nome: "Empatia", icone: "♡", valor: 95, cor: "#65C987" },
            { nome: "Observação", icone: "◉", valor: 90, cor: "#22D3EE" },
            { nome: "Paciência", icone: "⌛", valor: 88, cor: "#A855F7" },
            { nome: "Proteção", icone: "⬡", valor: 92, cor: "#22D3EE" },
            { nome: "Ciência", icone: "⚛", valor: 85, cor: "#F472B6" }
        ]
    }
];

const form = document.getElementById("quiz-form");
const inputNascimento = document.getElementById("nascimento");
const container = document.getElementById("app-container");
const telaFormulario = document.getElementById("tela-formulario");
const telaResultado = document.getElementById("tela-resultado");
const listaAtributos = document.getElementById("lista-atributos");
const mensagemConfirmacao = document.getElementById("mensagem-confirmacao");

// Impede a seleção de datas futuras.
function dataLocalISO(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

inputNascimento.max = dataLocalISO(new Date());


function calcularIdade(dataNascimento) {
    const hoje = new Date();

    let idade = hoje.getFullYear() - dataNascimento.getFullYear();

    const aindaNaoFezAniversario =
        hoje.getMonth() < dataNascimento.getMonth() ||
        (
            hoje.getMonth() === dataNascimento.getMonth() &&
            hoje.getDate() < dataNascimento.getDate()
        );

    if (aindaNaoFezAniversario) {
        idade--;
    }

    return idade;
}


// Monta as cinco barras de atributos do perfil.
function renderizarAtributos(atributos) {
    listaAtributos.replaceChildren();

    atributos.forEach((atributo, indice) => {
        const linha = document.createElement("div");
        linha.className = "atributo";

        linha.style.setProperty("--atributo-cor", atributo.cor);

        const icone = document.createElement("span");
        icone.className = "atributo-icone";
        icone.setAttribute("aria-hidden", "true");
        icone.textContent = atributo.icone;

        const info = document.createElement("div");
        info.className = "atributo-info";

        const nome = document.createElement("p");
        nome.className = "atributo-nome";
        nome.textContent = atributo.nome;

        const barra = document.createElement("div");
        barra.className = "atributo-barra";
        barra.setAttribute("role", "progressbar");
        barra.setAttribute("aria-label", atributo.nome);
        barra.setAttribute("aria-valuemin", "0");
        barra.setAttribute("aria-valuemax", "100");
        barra.setAttribute("aria-valuenow", String(atributo.valor));

        const preenchimento = document.createElement("div");
        preenchimento.className = "atributo-preenchimento";

        barra.appendChild(preenchimento);
        info.append(nome, barra);

        const porcentagem = document.createElement("span");
        porcentagem.className = "atributo-porcentagem";
        porcentagem.textContent = `${atributo.valor}%`;

        linha.append(icone, info, porcentagem);
        listaAtributos.appendChild(linha);

        // Anima a barra após ela entrar na tela.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                preenchimento.style.width = `${atributo.valor}%`;
            });
        });
    });
}

// Preenche a interface com o perfil escolhido.
function mostrarResultado(perfil, nome, idade) {
    document.getElementById("res-nome").textContent = nome;
    document.getElementById("res-idade").textContent = idade;
    document.getElementById("res-titulo").textContent = perfil.nome;
    document.getElementById("res-categoria").textContent = perfil.categoria;
    document.getElementById("res-codigo").textContent = perfil.codigo;
    document.getElementById("res-icone").textContent = perfil.icone;
    document.getElementById("res-descricao").textContent = perfil.descricao;
    document.getElementById("res-habilidade").textContent = perfil.habilidade;
    document.getElementById("res-tracos").textContent = perfil.tracos;
    document.getElementById("res-frase").textContent = perfil.frase;

    const imagem = document.getElementById("res-imagem");
    imagem.src = perfil.imagem;
    imagem.alt = perfil.nome;

    renderizarAtributos(perfil.atributos);

    // Aplica o tema ao fundo e à interface.
    document.body.className = perfil.classeTema;
    container.className = `container ${perfil.classeTema}`;

    mensagemConfirmacao.classList.add("escondido");
    mensagemConfirmacao.textContent = "";

    telaFormulario.classList.add("escondido");
    telaResultado.classList.remove("escondido");

    // Começa a tela pelo topo.
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Recebe as respostas do questionário.
form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const dataNascimentoStr = inputNascimento.value;

    if (!nome || !dataNascimentoStr) {
        alert("Preencha seu nome e sua data de nascimento.");
        return;
    }

    const [ano, mes, dia] = dataNascimentoStr.split("-").map(Number);
    const dataNascimento = new Date(ano, mes - 1, dia);

    // Confere se a data digitada realmente existe.
    if (
        dataNascimento.getFullYear() !== ano ||
        dataNascimento.getMonth() !== mes - 1 ||
        dataNascimento.getDate() !== dia ||
        dataNascimento > new Date()
    ) {
        alert("Informe uma data de nascimento válida.");
        return;
    }

    const idade = calcularIdade(dataNascimento);

    // Cada resposta soma um ponto ao perfil correspondente.
    const pontuacao = {
        comandante: 0,
        engenheiro: 0,
        reconhecimento: 0,
        astrobiologo: 0
    };

    for (let numero = 1; numero <= 4; numero++) {
        const resposta = form.querySelector(
            `input[name="p${numero}"]:checked`
        );

        if (!resposta) {
            alert("Responda todas as perguntas antes de continuar.");
            return;
        }

        pontuacao[resposta.value]++;
    }

    const maiorPontuacao = Math.max(...Object.values(pontuacao));

    // Se houver empate, sorteia entre os perfis empatados.
    const empatados = perfis.filter(
        perfil => pontuacao[perfil.id] === maiorPontuacao
    );

    const perfilEscolhido =
        empatados[Math.floor(Math.random() * empatados.length)];

    mostrarResultado(perfilEscolhido, nome, idade);
});

// Refaz o questionário.
document.getElementById("btn-refazer").addEventListener("click", function () {
    form.reset();

    document.body.className = "";
    container.className = "container";

    telaResultado.classList.add("escondido");
    telaFormulario.classList.remove("escondido");

    mensagemConfirmacao.classList.add("escondido");
    mensagemConfirmacao.textContent = "";

    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Confirma o personagem e exibe o estado de confirmação.
document.getElementById("btn-confirmar").addEventListener("click", function () {
    const nome = document.getElementById("res-nome").textContent;
    const personagem = document.getElementById("res-titulo").textContent;

    mensagemConfirmacao.textContent =
        `${nome}, sua designação como ${personagem} foi confirmada. ` +
        "Tripulante registrado no sistema AURA // 2089.";

    mensagemConfirmacao.classList.remove("escondido");
});
