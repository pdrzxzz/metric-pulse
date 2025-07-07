// Main application controller
class MetricPulseApp {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupApp());
        } else {
            this.setupApp();
        }
    }

    setupApp() {
        if (this.isInitialized) return;

        this.addHelpTooltips();
        this.setupKeyboardShortcuts();
        this.addQuickActions();
        this.setupPerformanceOptimizations();

        this.isInitialized = true;
        console.log('🧪 MetricPulse initialized successfully!');
    }

    addHelpTooltips() {
        // Add tooltips to key elements
        const tooltipElements = [
            {
                selector: '.threshold-slider',
                text: 'Drag to adjust the classification threshold and see how it affects model performance'
            },
            {
                selector: '.metric-card',
                text: 'These metrics update in real-time as you adjust the threshold'
            },
            {
                selector: '.confusion-table',
                text: 'Shows the distribution of predictions vs actual values at the current threshold'
            },
            {
                selector: '#trendsChart',
                text: 'Click anywhere on the chart to jump to that threshold value'
            }
        ];

        tooltipElements.forEach(({ selector, text }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.classList.add('tooltip');
                const tooltip = document.createElement('span');
                tooltip.className = 'tooltiptext';
                tooltip.textContent = text;
                element.appendChild(tooltip);
            });
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only trigger shortcuts when not typing in input fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.adjustThreshold(-0.01);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.adjustThreshold(0.01);
                    break;
                case 'Home':
                    e.preventDefault();
                    this.setThreshold(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.setThreshold(1);
                    break;
                case 'o':
                case 'O':
                    e.preventDefault();
                    this.findOptimalThreshold();
                    break;
                case 'r':
                case 'R':
                    e.preventDefault();
                    this.resetToDefault();
                    break;
                case 'h':
                case 'H':
                    e.preventDefault();
                    this.showKeyboardShortcuts();
                    break;
            }
        });
    }

    adjustThreshold(delta) {
        const slider = document.getElementById('thresholdSlider');
        if (slider) {
            const newValue = Math.max(0, Math.min(1, parseFloat(slider.value) + delta));
            slider.value = newValue;
            slider.dispatchEvent(new Event('input'));
        }
    }

    setThreshold(value) {
        const slider = document.getElementById('thresholdSlider');
        if (slider) {
            slider.value = value;
            slider.dispatchEvent(new Event('input'));
        }
    }

    findOptimalThreshold() {
        if (window.MetricPulseChart) {
            window.MetricPulseChart.highlightOptimalThreshold();
        }
    }

    resetToDefault() {
        this.setThreshold(0.5);
        if (window.MetricPulseChart) {
            window.MetricPulseChart.resetChart();
        }
    }

    showKeyboardShortcuts() {
        const shortcuts = [
            '←/→: Adjust threshold by 0.01',
            'Home/End: Set threshold to 0/1',
            'O: Find optimal F1 threshold',
            'R: Reset to default (0.5)',
            'H: Show this help'
        ];

        const helpText = shortcuts.join('\n');
        alert('Keyboard Shortcuts:\n\n' + helpText);
    }

    addQuickActions() {
        // Add quick action buttons
        const actionsContainer = document.createElement('div');
        actionsContainer.className = 'quick-actions';
        actionsContainer.innerHTML = `
            <button id="optimalBtn" class="action-btn">🎯 Find Optimal</button>
            <button id="resetBtn" class="action-btn">🔄 Reset</button>
            <button id="helpBtn" class="action-btn">❓ Help</button>
        `;

        // Insert after the threshold control section
        const thresholdSection = document.querySelector('.threshold-control');
        if (thresholdSection) {
            thresholdSection.appendChild(actionsContainer);
        }

        // Add event listeners
        document.getElementById('optimalBtn')?.addEventListener('click', () => this.findOptimalThreshold());
        document.getElementById('resetBtn')?.addEventListener('click', () => this.resetToDefault());
        document.getElementById('helpBtn')?.addEventListener('click', () => this.showKeyboardShortcuts());

        // Add CSS for quick actions
        this.addQuickActionsCSS();
    }

    addQuickActionsCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .quick-actions {
                margin-top: 20px;
                display: flex;
                gap: 10px;
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .action-btn {
                padding: 10px 20px;
                border: none;
                border-radius: 25px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            
            .action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(0,0,0,0.3);
            }
            
            .action-btn:active {
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    setupPerformanceOptimizations() {
        // Debounce slider updates for better performance
        let sliderTimeout;
        const slider = document.getElementById('thresholdSlider');

        if (slider) {
            const originalInputHandler = slider.oninput;
            slider.addEventListener('input', (e) => {
                clearTimeout(sliderTimeout);
                sliderTimeout = setTimeout(() => {
                    if (originalInputHandler) originalInputHandler.call(slider, e);
                }, 50);
            });
        }

        // Optimize chart updates
        if (window.MetricPulseChart) {
            window.MetricPulseChart.chart.options.animation.duration = 200;
        }
    }

    // Method to export current metrics
    exportMetrics() {
        if (!window.MetricPulseMetrics) return;

        const metrics = window.MetricPulseMetrics.getCurrentMetrics();
        const threshold = window.MetricPulseMetrics.getCurrentThreshold();

        const data = {
            threshold,
            metrics,
            timestamp: new Date().toISOString(),
            dataset: 'MetricPulse Sample Data'
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `metricpulse-export-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Method to show loading state
    showLoading() {
        document.body.classList.add('loading');
    }

    hideLoading() {
        document.body.classList.remove('loading');
    }
}

// Initialize the main application
const app = new MetricPulseApp();

// Export for global access
window.MetricPulseApp = app;

// Add some fun Easter eggs
document.addEventListener('DOMContentLoaded', () => {
    // Konami code easter egg
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Trigger easter egg
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);

            // Add rainbow animation CSS
            if (!document.querySelector('#rainbow-css')) {
                const style = document.createElement('style');
                style.id = 'rainbow-css';
                style.textContent = `
                    @keyframes rainbow {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    });
}); 