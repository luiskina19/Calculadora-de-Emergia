// Funções de conversão para emergia com dados corretos
function tonAcoToSej(ton) {
    return ton * 6.97e15; // Aço em seJ/tonelada
}

function kgCobreToSej(kg) {
    return kg * 1.04e14; // Cobre em seJ/kg
}

function tonAluminioToSej(ton) {
    return ton * 2.13e16; // Alumínio em seJ/tonelada
}

// Função para calcular a emergia
function calcularEmergia() {
    const consumoAco = parseFloat(document.getElementById('aco').value);
    const consumoCobre = parseFloat(document.getElementById('cobre').value);
    const consumoAluminio = parseFloat(document.getElementById('aluminio').value);

    const emergiaAco = tonAcoToSej(consumoAco);
    const emergiaCobre = kgCobreToSej(consumoCobre);
    const emergiaAluminio = tonAluminioToSej(consumoAluminio);

    const emergiaTotal = emergiaAco + emergiaCobre + emergiaAluminio;

    document.getElementById('resultadoAco').textContent = `Emergia do Consumo de Aço: ${emergiaAco.toExponential(2)} sej`;
    document.getElementById('resultadoCobre').textContent = `Emergia do Consumo de Cobre: ${emergiaCobre.toExponential(2)} sej`;
    document.getElementById('resultadoAluminio').textContent = `Emergia do Consumo de Alumínio: ${emergiaAluminio.toExponential(2)} sej`;
    document.getElementById('resultadoTotal').textContent = `Emergia Total Consumida: ${emergiaTotal.toExponential(2)} sej`;

    updateChart(emergiaAco, emergiaCobre, emergiaAluminio);
}

// Atualiza o gráfico
function updateChart(emergiaAco, emergiaCobre, emergiaAluminio) {
    const ctx = document.getElementById('emergiaChart').getContext('2d');

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Consumo de Aço', 'Consumo de Cobre', 'Consumo de Alumínio'],
            datasets: [{
                label: 'Distribuição da Emergia',
                data: [emergiaAco, emergiaCobre, emergiaAluminio],
                backgroundColor: ['#FF5733', '#33FF57', '#3357FF'],
                hoverBackgroundColor: ['#FF7043', '#66FF66', '#6699FF']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toExponential(2) + ' sej';
                        }
                    }
                }
            }
        }
    });
}

// Evento do botão
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('calcular').addEventListener('click', calcularEmergia);
});
