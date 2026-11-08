// ==========================================
// CTRL + DECIDE
// DASHBOARD INTERATIVO
// ==========================================


// TOTAL DE PARTICIPANTES

const totalParticipantes = 21;


// PALETA DE CORES ORIGINAL

const cores = {
    marrom: "#75432F",
    terracota: "#B86A35",
    laranja: "#D9904C",
    dourado: "#E9B66B",
    oliva: "#71804C",
    bege: "#F4E4D0"
};


// CONFIGURAÇÃO GERAL DOS GRÁFICOS

const configuracaoGeral = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

        legend: {

            position: "bottom",

            labels: {

                color: "#44372F",

                padding: 18,

                font: {
                    family: "Arial",
                    size: 12
                }

            }

        },

        tooltip: {

            callbacks: {

                label: function(context) {

                    const valor = context.raw;

                    const percentual = (
                        valor / totalParticipantes * 100
                    ).toFixed(1);

                    return `${context.label}: ${valor} participantes (${percentual}%)`;

                }

            }

        }

    }

};


// ==========================================
// DADOS ORIGINAIS DA PESQUISA
// ==========================================

const dadosOriginais = {

    decisoes: {

        labels: [
            "Sempre",
            "Frequentemente",
            "Às vezes",
            "Raramente"
        ],

        valores: [8, 6, 6, 1],

        cores: [
            cores.marrom,
            cores.terracota,
            cores.laranja,
            cores.dourado
        ]

    },


    influencia: {

        labels: [
            "Influencia muito",
            "Influencia bastante",
            "Influencia pouco",
            "Depende da situação"
        ],

        valores: [9, 8, 1, 3],

        cores: [
            cores.marrom,
            cores.terracota,
            cores.dourado,
            cores.oliva
        ]

    }

};


// ==========================================
// DADOS DOS PRINCIPAIS RESULTADOS
// ==========================================

const dadosPrincipais = {

    decisoes: {

        labels: [
            "Sempre — 38,1%",
            "Demais respostas — 61,9%"
        ],

        valores: [8, 13],

        cores: [
            cores.marrom,
            cores.bege
        ]

    },


    influencia: {

        labels: [
            "Influencia muito ou bastante — 81%",
            "Demais respostas — 19%"
        ],

        valores: [17, 4],

        cores: [
            cores.terracota,
            cores.bege
        ]

    }

};


// ==========================================
// VARIÁVEIS DOS GRÁFICOS
// ==========================================

let graficoDecisoes = null;

let graficoInfluencia = null;


// ==========================================
// GRÁFICO 1
// PENSAMENTO ANTES DAS DECISÕES
// ==========================================

const elementoDecisoes = document.getElementById("graficoDecisoes");

if (elementoDecisoes) {

    graficoDecisoes = new Chart(elementoDecisoes, {

        type: "doughnut",

        data: {

            labels: [...dadosOriginais.decisoes.labels],

            datasets: [{

                data: [...dadosOriginais.decisoes.valores],

                backgroundColor: [...dadosOriginais.decisoes.cores],

                borderColor: "#FFFFFF",

                borderWidth: 3,

                hoverOffset: 10

            }]

        },

        options: {

            ...configuracaoGeral,

            cutout: "58%"

        }

    });

}


// ==========================================
// GRÁFICO 2
// INFLUÊNCIA DA TECNOLOGIA
// ==========================================

const elementoInfluencia = document.getElementById("graficoInfluencia");

if (elementoInfluencia) {

    graficoInfluencia = new Chart(elementoInfluencia, {

        type: "bar",

        data: {

            labels: [...dadosOriginais.influencia.labels],

            datasets: [{

                label: "Participantes",

                data: [...dadosOriginais.influencia.valores],

                backgroundColor: [...dadosOriginais.influencia.cores],

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

                    max: totalParticipantes,

                    ticks: {
                        stepSize: 3,
                        color: "#44372F"
                    },

                    grid: {
                        color: "#E9DCCB"
                    }

                },

                y: {

                    ticks: {
                        color: "#44372F"
                    },

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

    });

}


// ==========================================
// FUNÇÃO PARA ATUALIZAR OS GRÁFICOS
// ==========================================

function atualizarGrafico(grafico, dados) {

    if (!grafico) {
        return;
    }

    grafico.data.labels = [...dados.labels];

    grafico.data.datasets[0].data = [...dados.valores];

    grafico.data.datasets[0].backgroundColor = [...dados.cores];

    grafico.update();

}


// ==========================================
// FILTRO DO GRÁFICO 1
// PENSAMENTO ANTES DAS DECISÕES
// ==========================================

const filtroDecisoes = document.getElementById("filtro");

if (filtroDecisoes) {

    filtroDecisoes.addEventListener("change", function() {

        const opcaoSelecionada = this.value;

        if (opcaoSelecionada === "todos") {

            atualizarGrafico(
                graficoDecisoes,
                dadosOriginais.decisoes
            );

        }

        else if (opcaoSelecionada === "principais") {

            atualizarGrafico(
                graficoDecisoes,
                dadosPrincipais.decisoes
            );

        }

    });

}


// ==========================================
// FILTRO DO GRÁFICO 2
// INFLUÊNCIA DA TECNOLOGIA
// ==========================================

const filtroInfluencia = document.getElementById("filtroInfluencia");

if (filtroInfluencia) {

    filtroInfluencia.addEventListener("change", function() {

        const opcaoSelecionada = this.value;

        if (opcaoSelecionada === "todos") {

            atualizarGrafico(
                graficoInfluencia,
                dadosOriginais.influencia
            );

        }

        else if (opcaoSelecionada === "principais") {

            atualizarGrafico(
                graficoInfluencia,
                dadosPrincipais.influencia
            );

        }

    });

}


// ==========================================
// MENSAGENS DE VERIFICAÇÃO
// ==========================================

console.log("CTRL + DECIDE carregado com sucesso!");

console.log("Participantes:", totalParticipantes);

console.log(
    "Gráfico de decisões:",
    graficoDecisoes ? "OK" : "Não encontrado"
);

console.log(
    "Gráfico de influência:",
    graficoInfluencia ? "OK" : "Não encontrado"
);

console.log("Dois filtros independentes configurados!");