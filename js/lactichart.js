const wrapLabel = (label) => {
    const maxLength = 16;
    if (label.length <= maxLength) return label;
    const words = label.split(' ');
    let lines = [];
    let currentLine = '';
    words.forEach(word => {
        if ((currentLine + word).length > maxLength) {
            lines.push(currentLine.trim());
            currentLine = '';
        }
        currentLine += word + ' ';
    });
    lines.push(currentLine.trim());
    return lines;
};

const tooltipTitleCallback = (tooltipItems) => {
    const item = tooltipItems[0];
    let label = item.chart.data.labels[item.dataIndex];
    return Array.isArray(label) ? label.join(' ') : label;
};

const chartColors = {
    red: '#FF6B6B',
    yellow: '#FFD166',
    green: '#06D6A0',
    blue: '#118AB2',
    darkBlue: '#073B4C'
};

const ctxLatch = document.getElementById('latchChart');
if (ctxLatch) {
    new Chart(ctxLatch, {
        type: 'doughnut',
        data: {
            labels: ['Boca bien abierta', 'Labios evertidos (hacia afuera)', 'Mentón toca el pecho', 'Más areola visible arriba que abajo'],
            datasets: [{
                label: 'Señales de Agarre',
                data: [25, 25, 25, 25],
                backgroundColor: [chartColors.green, chartColors.yellow, chartColors.blue, chartColors.red],
                borderColor: '#fff',
                borderWidth: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                        labels: {
                        color: '#4A5568'
                    }
                },
                tooltip: {
                    callbacks: { title: tooltipTitleCallback }
                }
            },
            cutout: '60%'
        }
    });
}

const ctxFrequency = document.getElementById('frequencyChart');
if(ctxFrequency) {
    new Chart(ctxFrequency, {
        type: 'bar',
        data: {
            labels: ['Recién Nacido (0-1m)', '2-6 Meses', '6-12 Meses'],
            datasets: [{
                label: 'Tomas en 24h',
                data: [10, 7, 5],
                backgroundColor: [chartColors.blue, chartColors.green, chartColors.yellow],
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
                indexAxis: 'y',
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: { title: tooltipTitleCallback }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                        ticks: { color: '#4A5568' }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: { color: '#4A5568', font: { size: 14 } }
                }
            }
        }
    });
}

const ctxProblems = document.getElementById('problemsChart');
if(ctxProblems) {
        const problemLabels = [
        'Dolor en pezones',
        'Preocupación por bajo suministro',
        'Congestión mamaria',
        'Mal agarre',
        'Tomas muy frecuentes'
        ];
        const wrappedProblemLabels = problemLabels.map(wrapLabel);

    new Chart(ctxProblems, {
        type: 'radar',
        data: {
            labels: wrappedProblemLabels,
            datasets: [{
                label: 'Frecuencia Percibida',
                data: [8, 9, 6, 8, 7],
                backgroundColor: 'rgba(255, 107, 107, 0.2)',
                borderColor: chartColors.red,
                pointBackgroundColor: chartColors.red,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: chartColors.red
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                        labels: { color: '#4A5568' }
                },
                tooltip: {
                    callbacks: { title: tooltipTitleCallback }
                }
            },
            scales: {
                r: {
                    angleLines: { color: '#CBD5E0' },
                    grid: { color: '#CBD5E0' },
                    pointLabels: {
                        color: '#2D3748',
                        font: { size: 12 }
                    },
                    ticks: {
                        backdropColor: 'rgba(255, 255, 255, 0.75)',
                        color: '#4A5568'
                    }
                }
            }
        }
    });
}