// Chart.js integration for metric trends visualization
class ChartManager {
    constructor() {
        this.chart = null;
        this.currentPointDataset = null;
        this.init();
    }

    init() {
        this.createChart();
        this.setupChartInteraction();
    }

    createChart() {
        const ctx = document.getElementById('trendsChart');
        if (!ctx) {
            console.error('Chart canvas not found');
            return;
        }

        if (!window.MetricPulseData) {
            console.error('MetricPulseData not available');
            return;
        }

        const trendsData = window.MetricPulseData.generateTrendsData();

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trendsData.thresholds.map(t => t.toFixed(2)),
                datasets: [
                    {
                        label: 'Precision',
                        data: trendsData.precision,
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Recall',
                        data: trendsData.recall,
                        borderColor: '#48bb78',
                        backgroundColor: 'rgba(72, 187, 120, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'F1-Score',
                        data: trendsData.f1,
                        borderColor: '#ed8936',
                        backgroundColor: 'rgba(237, 137, 54, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Accuracy',
                        data: trendsData.accuracy,
                        borderColor: '#9f7aea',
                        backgroundColor: 'rgba(159, 122, 234, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Current Point',
                        data: [],
                        borderColor: '#e53e3e',
                        backgroundColor: '#e53e3e',
                        borderWidth: 0,
                        pointRadius: 8,
                        pointHoverRadius: 10,
                        pointStyle: 'circle',
                        showLine: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Metric Trends Across Thresholds',
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        color: '#4a5568'
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#667eea',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            title: function (context) {
                                return `Threshold: ${context[0].label}`;
                            },
                            label: function (context) {
                                return `${context.dataset.label}: ${context.parsed.y.toFixed(3)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Classification Threshold',
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            color: '#4a5568'
                        },
                        ticks: {
                            color: '#4a5568',
                            maxTicksLimit: 10
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Metric Value',
                            font: {
                                size: 14,
                                weight: 'bold'
                            },
                            color: '#4a5568'
                        },
                        ticks: {
                            color: '#4a5568',
                            callback: function (value) {
                                return value.toFixed(2);
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        min: 0,
                        max: 1
                    }
                },
                animation: {
                    duration: 300
                }
            }
        });

        // Store reference to current point dataset
        this.currentPointDataset = this.chart.data.datasets[3];
    }

    setupChartInteraction() {
        if (!this.chart) return;

        // Add click handler to chart
        this.chart.canvas.addEventListener('click', (event) => {
            const points = this.chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
            if (points.length) {
                const firstPoint = points[0];
                const threshold = parseFloat(this.chart.data.labels[firstPoint.index]);

                // Update slider and metrics
                const slider = document.getElementById('thresholdSlider');
                if (slider) {
                    slider.value = threshold;
                    slider.dispatchEvent(new Event('input'));
                }
            }
        });
    }

    updateCurrentPoint(threshold, metrics) {
        if (!this.chart || !this.currentPointDataset) return;

        // Clear previous current point
        this.currentPointDataset.data = [];

        // Find the closest threshold index
        const thresholdIndex = Math.round(threshold * 100);
        if (thresholdIndex >= 0 && thresholdIndex < this.chart.data.labels.length) {
            // Add current point for each metric
            this.currentPointDataset.data.push({
                x: thresholdIndex,
                y: metrics.precision
            });
        }

        this.chart.update('none');
    }

    addThresholdMarker(threshold, label) {
        if (!this.chart) return;

        // Add a vertical line annotation
        this.chart.options.plugins.annotation = {
            annotations: {
                thresholdLine: {
                    type: 'line',
                    xMin: threshold,
                    xMax: threshold,
                    borderColor: '#e53e3e',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    label: {
                        content: label,
                        enabled: true,
                        position: 'top'
                    }
                }
            }
        };

        this.chart.update();
    }

    removeThresholdMarker() {
        if (!this.chart) return;

        if (this.chart.options.plugins.annotation) {
            delete this.chart.options.plugins.annotation;
            this.chart.update();
        }
    }

    // Method to highlight optimal threshold
    highlightOptimalThreshold() {
        if (!window.MetricPulseData) return;

        let bestF1 = 0;
        let bestThreshold = 0.5;

        // Find threshold with highest F1 score
        for (let threshold = 0; threshold <= 1; threshold += 0.01) {
            const metrics = window.MetricPulseData.calculateMetrics(threshold);
            if (metrics.f1 > bestF1) {
                bestF1 = metrics.f1;
                bestThreshold = threshold;
            }
        }

        this.addThresholdMarker(bestThreshold, `Optimal F1: ${bestF1.toFixed(3)}`);

        // Update slider to optimal threshold
        const slider = document.getElementById('thresholdSlider');
        if (slider) {
            slider.value = bestThreshold;
            slider.dispatchEvent(new Event('input'));
        }
    }

    // Method to reset chart
    resetChart() {
        this.removeThresholdMarker();
        this.updateCurrentPoint(0.5, window.MetricPulseData.calculateMetrics(0.5));
    }
}

// Initialize chart manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for Chart.js to be available
    setTimeout(() => {
        window.MetricPulseChart = new ChartManager();
    }, 100);
});

// Export for use in other modules
window.ChartManager = ChartManager; 