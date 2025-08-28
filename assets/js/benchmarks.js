// ReasonPath™ Benchmarks Functionality
// Navigation and content loading for benchmark analysis

function loadBenchmark(benchmarkType) {
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');

    const title = document.getElementById('benchmarkTitle');
    const description = document.getElementById('benchmarkDescription');
    const content = document.getElementById('benchmarkContent');

    const benchmarkData = {
        'reading-comprehension': {
            title: 'Reading Comprehension Analysis',
            description: 'Boundary testing for text understanding and interpretation accuracy across various complexity levels',
            content: `
                <div class="content-section">
                    <h3 class="section-title">Performance Overview</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Test Category</th>
                                <th>Claude</th>
                                <th>ChatGPT</th>
                                <th>Gemini</th>
                                <th>Edge Case Failure Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Simple Passages (500 words)</td>
                                <td><span class="score-badge score-excellent">94%</span></td>
                                <td><span class="score-badge score-excellent">91%</span></td>
                                <td><span class="score-badge score-good">87%</span></td>
                                <td><span class="score-badge score-good">8%</span></td>
                            </tr>
                            <tr>
                                <td>Complex Academic Text (2000+ words)</td>
                                <td><span class="score-badge score-good">78%</span></td>
                                <td><span class="score-badge score-good">82%</span></td>
                                <td><span class="score-badge score-fair">71%</span></td>
                                <td><span class="score-badge score-fair">23%</span></td>
                            </tr>
                            <tr>
                                <td>Technical Documentation</td>
                                <td><span class="score-badge score-fair">65%</span></td>
                                <td><span class="score-badge score-good">74%</span></td>
                                <td><span class="score-badge score-fair">68%</span></td>
                                <td><span class="score-badge score-fair">31%</span></td>
                            </tr>
                            <tr>
                                <td>Ambiguous Context</td>
                                <td><span class="score-badge score-fair">52%</span></td>
                                <td><span class="score-badge score-poor">48%</span></td>
                                <td><span class="score-badge score-poor">44%</span></td>
                                <td><span class="score-badge score-poor">58%</span></td>
                            </tr>
                            <tr>
                                <td>Multiple Conflicting Sources</td>
                                <td><span class="score-badge score-poor">39%</span></td>
                                <td><span class="score-badge score-poor">42%</span></td>
                                <td><span class="score-badge score-poor">35%</span></td>
                                <td><span class="score-badge score-poor">67%</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="content-section">
                    <h3 class="section-title">Key Limitations Identified</h3>
                    <div class="limitation-box">
                        <h4>Critical Boundary: Conflicting Information Processing</h4>
                        <p>All models show significant degradation when processing conflicting information from multiple sources. Accuracy drops below 50% when asked to reconcile contradictory claims.</p>
                    </div>
                </div>
            `
        },
        'semantic-reasoning': {
            title: 'Semantic Reasoning Limitations',
            description: 'Understanding meaning, context, and implicit relationships in language',
            content: `
                <div class="content-section">
                    <h3 class="section-title">Reasoning Performance</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Reasoning Type</th>
                                <th>Claude</th>
                                <th>ChatGPT</th>
                                <th>Gemini</th>
                                <th>Common Failures</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Causal Relationships</td>
                                <td><span class="score-badge score-good">83%</span></td>
                                <td><span class="score-badge score-good">79%</span></td>
                                <td><span class="score-badge score-good">76%</span></td>
                                <td>Correlation vs causation confusion</td>
                            </tr>
                            <tr>
                                <td>Implicit Context</td>
                                <td><span class="score-badge score-fair">67%</span></td>
                                <td><span class="score-badge score-good">71%</span></td>
                                <td><span class="score-badge score-fair">63%</span></td>
                                <td>Missing cultural assumptions</td>
                            </tr>
                            <tr>
                                <td>Sarcasm Detection</td>
                                <td><span class="score-badge score-poor">43%</span></td>
                                <td><span class="score-badge score-poor">39%</span></td>
                                <td><span class="score-badge score-poor">47%</span></td>
                                <td>Context-dependent failures</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="content-section">
                    <h3 class="section-title">Cultural Context Limitations</h3>
                    <div class="limitation-box">
                        <h4>Critical Finding: Cultural Blind Spots</h4>
                        <p>All models struggle with cultural context outside their training data. Performance drops significantly for non-Western cultural references and region-specific implicit knowledge.</p>
                    </div>
                </div>
            `
        },
        'arithmetic-operations': {
            title: 'Mathematical Operations Analysis',
            description: 'Precision and accuracy limits in mathematical calculations',
            content: `
                <div class="content-section">
                    <h3 class="section-title">Mathematical Accuracy</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Operation Type</th>
                                <th>Claude</th>
                                <th>ChatGPT</th>
                                <th>Gemini</th>
                                <th>Failure Threshold</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Basic Arithmetic (±×÷)</td>
                                <td><span class="score-badge score-excellent">99%</span></td>
                                <td><span class="score-badge score-excellent">97%</span></td>
                                <td><span class="score-badge score-excellent">98%</span></td>
                                <td>15+ digit numbers</td>
                            </tr>
                            <tr>
                                <td>Multi-step Calculations</td>
                                <td><span class="score-badge score-good">86%</span></td>
                                <td><span class="score-badge score-good">84%</span></td>
                                <td><span class="score-badge score-good">81%</span></td>
                                <td>7+ sequential operations</td>
                            </tr>
                            <tr>
                                <td>Large Number Factorization</td>
                                <td><span class="score-badge score-poor">23%</span></td>
                                <td><span class="score-badge score-poor">19%</span></td>
                                <td><span class="score-badge score-poor">21%</span></td>
                                <td>12+ digit composites</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="content-section">
                    <h3 class="section-title">Precision Boundaries</h3>
                    <div class="limitation-box">
                        <h4>Mathematical Precision Ceiling</h4>
                        <p>All models show systematic errors with large numbers and complex mathematical operations requiring exact computation. Not suitable for high-precision mathematical work.</p>
                    </div>
                </div>
            `
        }
    };

    const data = benchmarkData[benchmarkType];
    if (data) {
        title.textContent = data.title;
        description.textContent = data.description;
        content.innerHTML = data.content;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('ReasonPath Benchmarks loaded');
});
