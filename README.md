# 🧪 MetricPulse - ML Threshold Explorer

> "Visualize how classification threshold affects model metrics"

A beautiful, interactive web application for exploring how classification thresholds impact machine learning model performance metrics in real-time.

## ✨ Features

### 🎚️ Interactive Threshold Control
- **Smooth slider**: Drag to adjust classification threshold from 0.0 to 1.0
- **Real-time updates**: See metrics change instantly as you move the slider
- **Keyboard shortcuts**: Use arrow keys for precise control

### 📊 Live Metrics Display
- **Precision**: TP / (TP + FP) - How many positive predictions were correct
- **Recall**: TP / (TP + FN) - How many actual positives were caught
- **F1-Score**: Harmonic mean of precision and recall
- **Animated updates**: Smooth transitions when values change

### 📈 Interactive Chart
- **Metric trends**: See how precision, recall, and F1-score change across all thresholds
- **Click to navigate**: Click anywhere on the chart to jump to that threshold
- **Current point indicator**: Red dot shows your current threshold position
- **Responsive design**: Works on all screen sizes

### 📉 Confusion Matrix
- **Real-time updates**: Shows TP, TN, FP, FN counts at current threshold
- **Visual clarity**: Color-coded for easy interpretation
- **Live calculations**: Updates instantly with threshold changes

### 💡 Educational Features
- **Key formulas**: Displayed for learning purposes
- **Help tooltips**: Hover over elements for explanations
- **Keyboard shortcuts**: Press 'H' to see all available shortcuts

## 🚀 Quick Start

1. **Open the application**:
   ```bash
   # Simply open index.html in any modern web browser
   open index.html
   ```

2. **Start exploring**:
   - Drag the threshold slider to see metrics change
   - Click on the chart to jump to specific thresholds
   - Use the quick action buttons for common tasks

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←/→` | Adjust threshold by ±0.01 |
| `Home/End` | Set threshold to 0/1 |
| `O` | Find optimal F1 threshold |
| `R` | Reset to default (0.5) |
| `H` | Show keyboard shortcuts |

## 🎯 Quick Actions

- **🎯 Find Optimal**: Automatically finds the threshold with the highest F1-score
- **🔄 Reset**: Returns to the default threshold of 0.5
- **❓ Help**: Shows keyboard shortcuts and usage tips

## 🛠️ Technical Details

### Architecture
- **Vanilla JavaScript**: No frameworks, pure ES6+ code
- **Chart.js**: For beautiful, interactive visualizations
- **CSS Grid/Flexbox**: Modern, responsive layout
- **Modular design**: Clean separation of concerns

### File Structure
```
metric-pulse/
├── index.html          # Main HTML structure
├── style.css           # Modern, responsive styling
├── data.js             # Sample data and metric calculations
├── metrics.js          # Metrics management and UI updates
├── chart.js            # Chart.js integration and interactions
├── main.js             # Main application controller
└── README.md           # This file
```

### Data Structure
The application uses sample ML prediction data in the format:
```javascript
[predicted_probability, actual_label]
```

### Performance Optimizations
- **Debounced updates**: Smooth slider performance
- **Efficient calculations**: Optimized metric computations
- **Responsive design**: Works on all devices
- **Memory efficient**: Clean event handling

## 🎨 Design Features

- **Modern UI**: Beautiful gradient backgrounds and smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Accessible**: Keyboard navigation and screen reader friendly
- **Interactive**: Hover effects and smooth transitions
- **Professional**: Clean, scientific aesthetic

## 🔧 Customization

### Adding Your Own Data
Replace the `sampleData` array in `data.js` with your own ML predictions:

```javascript
const sampleData = [
    [0.1, 0],  // [predicted_probability, actual_label]
    [0.8, 1],
    // ... your data here
];
```

### Styling
Modify `style.css` to customize colors, fonts, and layout:
- Primary colors: `#667eea` (blue), `#764ba2` (purple)
- Metric colors: `#48bb78` (green), `#ed8936` (orange)
- Background: Gradient from blue to purple

## 🎉 Easter Eggs

Try entering the **Konami Code** (↑↑↓↓←→←→BA) for a surprise!

## 📄 License

MIT License - feel free to use, modify, and distribute!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

Found a bug? Have a feature request? Open an issue on GitHub!

---

**Built with ❤️ for the ML community**
