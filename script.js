
// =====================================
// CTRL + DECIDE
// DASHBOARD DE INVESTIGAÇÃO
// =====================================

// Total de participantes
const totalParticipantes = 21;

// Paleta de cores
const cores = {
    marrom: "#75432F",
    terracota: "#B86A35",
    laranja: "#D9904C",
    dourado: "#E9B66B",
    oliva: "#71804C",
    olivaClaro: "#A8B58A"
};

// Configuração geral dos gráficos
const configuracaoGeral = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            position: "bottom",

            labels: {
                padding: 18,
                usePointStyle: true,

                font: {
                    size: 11
                }
            }
        },

        tooltip: {
            callbacks: {
                label: function(context) {
                    const quantidade = context.raw;

                    const percentual = (
                        quantidade / totalParticipantes * 100
                    ).toFixed(1);

                    return `${context.label}: ${quantidade} participantes (${percentual}%)`;
                }
            }
        }
    }
};

// =====================================
// GRÁFICO 1
// CONSCIÊNCIA SOBRE DECISÕES DIGITAIS
// =====================================

const graficoDecisoes = new Chart(
    document.getElementById("graficoDecisoes"),
    {
        type: "doughnut",

        data: {
            labels: [
                "Sempre",
                "Frequentemente",
                "Às vezes",
                "Raramente"
            ],

            datasets: [{
                label: "Participantes",

                data: [8, 6, 6, 1],

                backgroundColor: [
                    cores.terracota,
                    cores.dourado,
                    cores.laranja,
                    cores.oliva
                ],

                borderColor: "#FFFFFF",
                borderWidth: 3,

                hoverOffset: 8
            }]
        },

        options: {
            ...configuracaoGeral,

            cutout: "55%"
        }
    }
);

// =====================================
// GRÁFICO 2
// INFLUÊNCIA DA TECNOLOGIA
// =====================================

const graficoInfluencia = new Chart(
    document.getElementById("graficoInfluencia"),
    {
        type: "bar",

        data: {
            labels: [
                "Influencia muito",
                "Influencia bastante",
                "Influencia pouco",
                "Depende da situação"
            ],

            datasets: [{
                label: "Participantes",

                data: [9, 8, 1, 3],

                backgroundColor: [
                    cores.terracota,
                    cores.dourado,
                    cores.laranja,
                    cores.oliva
                ],

                borderRadius: 8,
                borderSkipped: false
            }]
        },

        options: {
            ...configuracaoGeral,

            indexAxis: "y",

            scales: {
                x: {
                    beginAtZero: true,
                    max: 10,

                    ticks: {
                        stepSize: 2
                    },

                    grid: {
                        color: "#EFE7DC"
                    }
                },

                y: {
                    grid: {
                        display: false
                    }
                }
            },

            plugins: {
                ...configuracaoGeral.plugins,

                legend: {
                    display: false
                }
            }
        }
    }
);

// =====================================
// GRÁFICO 3
// CONTEÚDOS GERADOS POR IA
// =====================================

const graficoIA = new Chart(
    document.getElementById("graficoIA"),
    {
        type: "pie",

        data: {
            labels: [
                "Verificar fontes",
                "Observar a aparência",
                "Confiar em quem compartilhou",
                "Procurar sinais de manipulação",
                "Não consegue identificar"
            ],

            datasets: [{
                label: "Participantes",

                data: [13, 5, 1, 2, 0],

                backgroundColor: [
                    cores.terracota,
                    cores.dourado,
                    cores.laranja,
                    cores.oliva,
                    cores.olivaClaro
                ],

                borderColor: "#FFFFFF",
                borderWidth: 3,

                hoverOffset: 8
            }]
        },

        options: configuracaoGeral
    }
);

// =====================================
// FILTRO INTERATIVO
// =====================================

const filtro = document.getElementById("filtro");

const cartoes = document.querySelectorAll(".grafico-card");

filtro.addEventListener("change", function() {

    const categoriaSelecionada = filtro.value;

    cartoes.forEach(function(cartao) {

        const categoria = cartao.dataset.grafico;

        if (
            categoriaSelecionada === "todos" ||
            categoriaSelecionada === categoria
        ) {

            cartao.classList.remove("oculto");

        } else {

            cartao.classList.add("oculto");

        }

    });

});

// =====================================
// INFORMAÇÕES NO CONSOLE
// =====================================

console.log("CTRL + DECIDE iniciado!");

console.log("Participantes:", totalParticipantes);

console.log("Gráfico 1: Consciência digital");
console.log("Gráfico 2: Influência tecnológica");
console.log("Gráfico 3: Conteúdos gerados por IA");

console.log("Filtro interativo ativado.");
