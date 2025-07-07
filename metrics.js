// Metrics handling and UI updates
class MetricsManager {
    constructor() {
        this.currentThreshold = 0.5;
        this.metrics = null;
        this.init();
    }

    init() {
        this.updateMetrics(this.currentThreshold);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const slider = document.getElementById('thresholdSlider');
        if (slider) {
            slider.addEventListener('input', (e) => {
                this.currentThreshold = parseFloat(e.target.value);
                this.updateThresholdDisplay();
                this.updateMetrics(this.currentThreshold);
            });
        }
    }

    updateThresholdDisplay() {
        const thresholdDisplay = document.getElementById('currentThreshold');
        if (thresholdDisplay) {
            thresholdDisplay.textContent = this.currentThreshold.toFixed(2);
        }
    }

    updateMetrics(threshold) {
        if (!window.MetricPulseData) {
            console.error('MetricPulseData not available');
            return;
        }

        this.metrics = window.MetricPulseData.calculateMetrics(threshold);
        this.updateMetricsDisplay();
        this.updateConfusionMatrix();
        this.triggerChartUpdate();
    }

    updateMetricsDisplay() {
        if (!this.metrics) return;

        // Update precision
        const precisionElement = document.getElementById('precisionValue');
        if (precisionElement) {
            this.animateValueChange(precisionElement, this.metrics.precision);
        }

        // Update recall
        const recallElement = document.getElementById('recallValue');
        if (recallElement) {
            this.animateValueChange(recallElement, this.metrics.recall);
        }

        // Update F1-score
        const f1Element = document.getElementById('f1Value');
        if (f1Element) {
            this.animateValueChange(f1Element, this.metrics.f1);
        }

        // Update accuracy
        const accuracyElement = document.getElementById('accuracyValue');
        if (accuracyElement) {
            this.animateValueChange(accuracyElement, this.metrics.accuracy);
        }
    }

    updateConfusionMatrix() {
        if (!this.metrics) return;

        // Update confusion matrix values
        const tpElement = document.getElementById('tp');
        const tnElement = document.getElementById('tn');
        const fpElement = document.getElementById('fp');
        const fnElement = document.getElementById('fn');

        if (tpElement) tpElement.textContent = this.metrics.tp;
        if (tnElement) tnElement.textContent = this.metrics.tn;
        if (fpElement) fpElement.textContent = this.metrics.fp;
        if (fnElement) fnElement.textContent = this.metrics.fn;
    }

    animateValueChange(element, newValue) {
        const oldValue = parseFloat(element.textContent);
        const difference = newValue - oldValue;
        const steps = 20;
        const stepValue = difference / steps;
        let currentStep = 0;

        element.classList.add('updated');

        const animation = setInterval(() => {
            currentStep++;
            const currentValue = oldValue + (stepValue * currentStep);
            element.textContent = currentValue.toFixed(2);

            if (currentStep >= steps) {
                element.textContent = newValue.toFixed(2);
                element.classList.remove('updated');
                clearInterval(animation);
            }
        }, 25);
    }

    triggerChartUpdate() {
        // Trigger chart update if chart manager exists
        if (window.MetricPulseChart && window.MetricPulseChart.updateCurrentPoint) {
            window.MetricPulseChart.updateCurrentPoint(this.currentThreshold, this.metrics);
        }
    }

    getCurrentMetrics() {
        return this.metrics;
    }

    getCurrentThreshold() {
        return this.currentThreshold;
    }
}

// Initialize metrics manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.MetricPulseMetrics = new MetricsManager();
});

// Export for use in other modules
window.MetricsManager = MetricsManager; 