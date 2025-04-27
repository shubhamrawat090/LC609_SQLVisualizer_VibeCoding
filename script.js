// Not Boring Movies Visualizer JS

// Elements
const inputTable = document.getElementById('input-table');
const loadBtn = document.getElementById('load-btn');
const approachSelect = document.getElementById('approach-select');
const visualizeBtn = document.getElementById('visualize-btn');
const stepsSection = document.getElementById('steps-section');
const stepsDiv = document.getElementById('steps');
const nextStepBtn = document.getElementById('next-step-btn');
const resultTableDiv = document.getElementById('result-table');

let cinemaData = [];
let steps = [];
let currentStep = 0;

function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        const obj = {};
        headers.forEach((h, i) => {
            obj[h.trim()] = values[i].trim();
        });
        obj['id'] = parseInt(obj['id']);
        obj['rating'] = parseFloat(obj['rating']);
        return obj;
    });
}

function renderTable(data, highlightRows = []) {
    if (!data.length) return '';
    let html = '<table><thead><tr>';
    Object.keys(data[0]).forEach(h => {
        html += `<th>${h}</th>`;
    });
    html += '</tr></thead><tbody>';
    data.forEach((row, idx) => {
        html += `<tr${highlightRows.includes(idx) ? ' class="highlight"' : ''}>`;
        Object.values(row).forEach(val => {
            html += `<td>${val}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody></table>';
    return html;
}

function showStep(stepIdx) {
    stepsDiv.innerHTML = '';
    for (let i = 0; i <= stepIdx; i++) {
        const step = steps[i];
        const div = document.createElement('div');
        div.className = 'step-row';
        div.innerHTML = `<strong>Step ${i+1}:</strong> ${step.desc}<br>${step.code ? `<pre class="step-code">${step.code}</pre>` : ''}${step.table ? renderTable(step.table, step.highlightRows) : ''}`;
        stepsDiv.appendChild(div);
    }
    nextStepBtn.disabled = stepIdx >= steps.length - 1;
    if (stepIdx === steps.length - 1) {
        // Show final result
        resultTableDiv.innerHTML = renderTable(steps[steps.length-1].table);
    } else {
        resultTableDiv.innerHTML = '';
    }
}

function visualizeSQL(data) {
    // Step 1: Show original table
    const s = [];
    s.push({desc: 'Original input table.', table: data, code: `SELECT * FROM Cinema;`});
    // Step 2: Filter odd-numbered IDs
    const oddRows = data.filter(row => row.id % 2 === 1);
    const highlightOdd = data.map((row, idx) => row.id % 2 === 1 ? idx : -1).filter(i => i !== -1);
    s.push({desc: 'Filter rows with odd-numbered IDs.', table: data, highlightRows: highlightOdd, code: `SELECT * FROM Cinema WHERE id % 2 = 1;`});
    s.push({desc: 'Table after filtering odd-numbered IDs.', table: oddRows, code: `-- Result of previous query`});
    // Step 3: Remove rows where description is "boring"
    const notBoringRows = oddRows.filter(row => row.description.toLowerCase() !== 'boring');
    const highlightNotBoring = oddRows.map((row, idx) => row.description.toLowerCase() !== 'boring' ? idx : -1).filter(i => i !== -1);
    s.push({desc: 'Filter out rows where description is "boring".', table: oddRows, highlightRows: highlightNotBoring, code: `SELECT * FROM (
  SELECT * FROM Cinema WHERE id % 2 = 1
) AS OddRows WHERE description <> 'boring';`});
    s.push({desc: 'Table after removing "boring" descriptions.', table: notBoringRows, code: `-- Result of previous query`});
    // Step 4: Sort by rating descending
    const sortedRows = [...notBoringRows].sort((a, b) => b.rating - a.rating);
    s.push({desc: 'Sort by rating in descending order.', table: sortedRows, code: `SELECT * FROM (
  SELECT * FROM Cinema WHERE id % 2 = 1 AND description <> 'boring'
) AS FilteredRows ORDER BY rating DESC;`});
    return s;
}

function visualizeJS(data) {
    // Step 1: Show original table
    const s = [];
    s.push({desc: 'Original input table.', table: data, code: `// Original data loaded from input`});
    // Step 2: Use JS code to filter and sort
    const filtered = data.filter(row => row.id % 2 === 1 && row.description.toLowerCase() !== 'boring');
    s.push({desc: 'Filter rows with odd-numbered IDs and description not "boring".', table: filtered, code: `const filtered = data.filter(row => row.id % 2 === 1 && row.description.toLowerCase() !== 'boring');`});
    const sorted = [...filtered].sort((a, b) => b.rating - a.rating);
    s.push({desc: 'Sort by rating in descending order.', table: sorted, code: `const sorted = [...filtered].sort((a, b) => b.rating - a.rating);`});
    return s;
}

loadBtn.onclick = function() {
    cinemaData = parseCSV(inputTable.value);
    stepsDiv.innerHTML = '';
    resultTableDiv.innerHTML = '';
    nextStepBtn.disabled = true;
    currentStep = 0;
};

visualizeBtn.onclick = function() {
    if (!cinemaData.length) {
        cinemaData = parseCSV(inputTable.value);
    }
    const approach = approachSelect.value;
    if (approach === 'sql') {
        steps = visualizeSQL(cinemaData);
    } else {
        steps = visualizeJS(cinemaData);
    }
    currentStep = 0;
    showStep(currentStep);
    nextStepBtn.disabled = steps.length <= 1;
};

nextStepBtn.onclick = function() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
    }
};

// Initial load
cinemaData = parseCSV(inputTable.value);