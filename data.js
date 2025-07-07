// Sample ML model prediction data
// This represents predicted probabilities for a binary classification problem
// Each entry contains: [predicted_probability, actual_label]

const sampleData = [
    // Class 0 predictions (lower probabilities)
    [0.1, 0], [0.15, 0], [0.2, 0], [0.25, 0], [0.3, 0],
    [0.12, 0], [0.18, 0], [0.22, 0], [0.28, 0], [0.32, 0],
    [0.08, 0], [0.14, 0], [0.19, 0], [0.24, 0], [0.29, 0],
    [0.11, 0], [0.16, 0], [0.21, 0], [0.26, 0], [0.31, 0],
    [0.09, 0], [0.13, 0], [0.17, 0], [0.23, 0], [0.27, 0],
    [0.06, 0], [0.12, 0], [0.18, 0], [0.25, 0], [0.33, 0],
    [0.07, 0], [0.14, 0], [0.20, 0], [0.26, 0], [0.30, 0],

    // Class 1 predictions (higher probabilities)
    [0.7, 1], [0.75, 1], [0.8, 1], [0.85, 1], [0.9, 1],
    [0.72, 1], [0.78, 1], [0.82, 1], [0.87, 1], [0.92, 1],
    [0.68, 1], [0.74, 1], [0.79, 1], [0.84, 1], [0.88, 1],
    [0.71, 1], [0.76, 1], [0.81, 1], [0.86, 1], [0.91, 1],
    [0.69, 1], [0.73, 1], [0.77, 1], [0.83, 1], [0.89, 1],
    [0.70, 1], [0.75, 1], [0.80, 1], [0.85, 1], [0.90, 1],
    [0.72, 1], [0.76, 1], [0.81, 1], [0.86, 1], [0.91, 1],

    // Some misclassifications for realistic data
    [0.35, 0], [0.38, 0], [0.42, 0], [0.45, 0], [0.48, 0], // High prob but actually 0
    [0.65, 1], [0.62, 1], [0.58, 1], [0.55, 1], [0.52, 1], // Low prob but actually 1

    // Borderline cases
    [0.45, 0], [0.46, 0], [0.47, 0], [0.48, 0], [0.49, 0],
    [0.51, 1], [0.52, 1], [0.53, 1], [0.54, 1], [0.55, 1]
];

// Function to get confusion matrix for a given threshold
function getConfusionMatrix(threshold) {
    let tp = 0, tn = 0, fp = 0, fn = 0;

    sampleData.forEach(([prediction, actual]) => {
        const predicted = prediction >= threshold ? 1 : 0;

        if (actual === 1 && predicted === 1) tp++;
        else if (actual === 0 && predicted === 0) tn++;
        else if (actual === 0 && predicted === 1) fp++;
        else if (actual === 1 && predicted === 0) fn++;
    });

    return { tp, tn, fp, fn };
}

// Function to calculate metrics for a given threshold
function calculateMetrics(threshold) {
    const { tp, tn, fp, fn } = getConfusionMatrix(threshold);
    
    const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
    const f1 = precision + recall > 0 ? 2 * (precision * recall) / (precision + recall) : 0;
    const accuracy = (tp + tn) / (tp + tn + fp + fn);
    
    return {
        precision: Math.round(precision * 100) / 100,
        recall: Math.round(recall * 100) / 100,
        f1: Math.round(f1 * 100) / 100,
        accuracy: Math.round(accuracy * 100) / 100,
        tp, tn, fp, fn
    };
}

// Function to generate data for the trends chart
function generateTrendsData() {
    const thresholds = [];
    const precisionData = [];
    const recallData = [];
    const f1Data = [];
    const accuracyData = [];
    
    // Generate data points for thresholds from 0 to 1
    for (let threshold = 0; threshold <= 1; threshold += 0.01) {
        const metrics = calculateMetrics(threshold);
        
        thresholds.push(threshold);
        precisionData.push(metrics.precision);
        recallData.push(metrics.recall);
        f1Data.push(metrics.f1);
        accuracyData.push(metrics.accuracy);
    }
    
    return {
        thresholds,
        precision: precisionData,
        recall: recallData,
        f1: f1Data,
        accuracy: accuracyData
    };
}

// Export functions for use in other modules
window.MetricPulseData = {
    sampleData,
    getConfusionMatrix,
    calculateMetrics,
    generateTrendsData
}; 