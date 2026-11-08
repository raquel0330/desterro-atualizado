// ==========================================
// CTRL + DECIDE
// DASHBOARD INTERATIVO
// ==========================================


// ==========================================
// TOTAL DE PARTICIPANTES
// ==========================================

const totalParticipantes = 21;


// ==========================================
// PALETA DE CORES
// ==========================================

const cores = {

    marrom: "#75432F",
    terracota: "#B86A35",
    laranja: "#D9904C",
    dourado: "#E9B66B",
    oliva: "#71804C",
    bege: "#F4E4D0"

};


// ==========================================
// CONFIGURAÇÃO GERAL DOS GRÁFICOS
// ==========================================

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
// DADOS COMPLETOS ORIGINAIS
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

    },


    ia: {

        labels: [
            "Verificar fontes",
            "Observar a aparência",
            "Confiar em quem compartilhou",
            "Procurar sinais de manipulação",
            "Não consegue identificar"
        ],

        valores: [13, 5, 1, 2, 0],

        cores: [
            cores.marrom,
            cores.terracota,
            cores.laranja,
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

    },


    ia: {

        labels: [
            "Verificar fontes — 61,9%",
            "Demais respostas — 38,1%"
        ],

        valores: [13, 8],

        cores: [
            cores.oliva,
            cores.bege
        ]

    }

};


// ==========================================
// VARIÁVEIS DOS TRÊS GRÁFICOS
// ==========================================

let graficoDecisoes = null;

let graficoInfluencia = null;

let graficoIA = null;


// ==========================================
// GRÁFICO 1
// PENSAMENTO ANTES DAS DECISÕES
// ==========================================

const elementoDecisoes = document.getElementById("graficoDecisoes");

if (elementoDecisoes) {

    graficoDecisoes = new Chart(elementoDecisoes, {

        type: "doughnut",

        data: {

            labels: dadosOriginais.decisoes.labels,

            datasets: [{

                data: dadosOriginais.decisoes.valores,

                backgroundColor: dadosOriginais.decisoes.cores,

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

            labels: dadosOriginais.influencia.labels,

            datasets: [{

                label: "Participantes",

                data: dadosOriginais.influencia.valores,

                backgroundColor: dadosOriginais.influencia.cores,

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
// GRÁFICO 3
// CONFIABILIDADE DOS CONTEÚDOS DE IA
// ==========================================

const elementoIA = document.getElementById("graficoIA");

if (elementoIA) {

    graficoIA = new Chart(elementoIA, {

        type: "pie",

        data: {

            labels: dadosOriginais.ia.labels,

            datasets: [{

                data: dadosOriginais.ia.valores,

                backgroundColor: dadosOriginais.ia.cores,

                borderColor: "#FFFFFF",

                borderWidth: 3,

                hoverOffset: 10

            }]

        },

        options: {

            ...configuracaoGeral

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
// FUNÇÃO PARA MOSTRAR TODOS OS RESULTADOS
// ==========================================

function mostrarTodosResultados() {

    atualizarGrafico(
        graficoDecisoes,
        dadosOriginais.decisoes
    );

    atualizarGrafico(
        graficoInfluencia,
        dadosOriginais.influencia
    );

    atualizarGrafico(
        graficoIA,
        dadosOriginais.ia
    );

    // Restaura o limite original do gráfico de influência

    if (graficoInfluencia) {

        graficoInfluencia.options.scales.x.max = totalParticipantes;

        graficoInfluencia.update();

    }

}


// ==========================================
// FUNÇÃO PARA DESTACAR OS PRINCIPAIS RESULTADOS
// ==========================================

function destacarPrincipaisResultados() {

    // GRÁFICO 1:
    // SOMENTE "SEMPRE" E AS DEMAIS RESPOSTAS AGRUPADAS

    atualizarGrafico(
        graficoDecisoes,
        dadosPrincipais.decisoes
    );


    // GRÁFICO 2:
    // AGRUPA "INFLUENCIA MUITO" E "INFLUENCIA BASTANTE"

    atualizarGrafico(
        graficoInfluencia,
        dadosPrincipais.influencia
    );


    // Ajusta o eixo do gráfico horizontal

    if (graficoInfluencia) {

        graficoInfluencia.options.scales.x.max = totalParticipantes;

        graficoInfluencia.update();

    }


    // GRÁFICO 3:
    // SOMENTE "VERIFICAR FONTES" E AS DEMAIS RESPOSTAS AGRUPADAS

    atualizarGrafico(
        graficoIA,
        dadosPrincipais.ia
    );

}


// ==========================================
// FILTRO INTERATIVO DOS GRÁFICOS
// ==========================================

const filtro = document.getElementById("filtro");

if (filtro) {

    filtro.addEventListener("change", function() {

        const opcaoSelecionada = filtro.value;


        if (opcaoSelecionada === "todos") {

            mostrarTodosResultados();

            console.log("Exibindo todas as respostas.");

        }


        else if (opcaoSelecionada === "principais") {

            destacarPrincipaisResultados();

            console.log("Exibindo somente os principais resultados.");

        }

    });

}


// ==========================================
// MENSAGEM NO CONSOLE
// ==========================================

console.log("CTRL + DECIDE carregado com sucesso!");

console.log("Participantes:", totalParticipantes);

console.log("Os três gráficos foram inicializados.");

console.log("Filtro de gráficos interativo preparado.");