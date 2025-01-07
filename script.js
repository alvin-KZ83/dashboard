let tasks = []
let currentTaskIndex = 0; // Track the current task index

let stylePoints = 0;

const styleCommands = [
    'fill',       // Sets the fill color for shapes.
    'stroke',     // Sets the stroke (outline) color for shapes.
    'strokeWeight', // Sets the stroke thickness.
    'textSize',   // Sets the font size for text.
    'textFont',   // Sets the font for text.
    'textAlign',  // Sets the alignment of text.
    'background', // Sets the background color of the canvas.
    'noFill',     // Disables filling shapes.
    'noStroke',   // Disables stroke (outline) for shapes.
    'color'       // Creates a color object for custom colors.
];

// Declare the variables for colors and speed
let primaryColor = '#303030'; // Example: orange
let secondaryColor = '#606060'; // Example: green
let tertiaryColor = '#909090'; // Example: blue
let speed = `${5 - currentTaskIndex}s`; // Example: 1 second per full rotation

// Set the CSS variables dynamically
document.documentElement.style.setProperty('--primary-color', primaryColor);
document.documentElement.style.setProperty('--secondary-color', secondaryColor);
document.documentElement.style.setProperty('--tertiary-color', tertiaryColor);
document.documentElement.style.setProperty('--animation-speed', speed);


fetch('tasks_original.json')
    .then(response => response.json())
    .then(data => {
        tasks = data;
        displayTask();
    })
    .catch(error => console.error('タスクの読み込みエラー:', error))  // Translated error message

// Linear interpolation function for RGB
function interpolateColor(startColor, endColor, factor) {
    const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * factor);
    const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * factor);
    const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * factor);
    return [r, g, b];
}

// Function to adjust the colors based on styleCount
function updateColorsBasedOnStyleCount(styleCount) {
    // Normalize styleCount to a range from 0 to 1
    const factor = Math.min(1, styleCount / 3); // Normalize between 0 and 1

    // Define start and end colors for primary, secondary, and tertiary
    const primaryStart = [30, 30, 30]; // Dark Red
    const primaryEnd = [255, 0, 0];   // Bright Red

    const secondaryStart = [60, 60, 60]; // Dark Green
    const secondaryEnd = [0, 255, 0];   // Bright Green

    const tertiaryStart = [90, 90, 90]; // Dark Blue
    const tertiaryEnd = [0, 0, 255];   // Bright Blue

    // Interpolate colors based on the normalized styleCount
    const primary = interpolateColor(primaryStart, primaryEnd, factor);
    const secondary = interpolateColor(secondaryStart, secondaryEnd, factor);
    const tertiary = interpolateColor(tertiaryStart, tertiaryEnd, factor);

    // Set the CSS variables dynamically
    primaryColor = `rgb(${primary[0]}, ${primary[1]}, ${primary[2]})`;
    secondaryColor = `rgb(${secondary[0]}, ${secondary[1]}, ${secondary[2]})`;
    tertiaryColor = `rgb(${tertiary[0]}, ${tertiary[1]}, ${tertiary[2]})`;

    // Set the CSS variables for use in your styles
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    document.documentElement.style.setProperty('--tertiary-color', tertiaryColor);
    document.documentElement.style.setProperty('--animation-speed', speed);
}


// Display the current task
function displayTask() {
    const taskDiv = document.getElementById("task");
    const currentTask = tasks[currentTaskIndex];

    taskDiv.innerHTML = `
        <h2>タスク</h2>
        <p>${currentTask.task}</p>
        <h2>説明</h2>
        <p>${currentTask.desc}</p>
        <h2>ヒント</h2>
        <p>${currentTask.hint}</p>
        `
}

function countFunctionCalls(code, funcName) {
    // Create a regular expression to match the function name followed by an opening parenthesis
    const regex = new RegExp(`${funcName}\\(`, 'g'); // 'g' for global search to find all occurrences
    const matches = code.match(regex); // Returns an array of all matches or null if no matches
    return matches ? matches.length : 0; // If matches found, return the count, otherwise 0
}

function checkCode() {
    if (currentTaskIndex == 5) {
        document.getElementById("feedback").innerText = "すべてのタスクが完了しました！";  // Translated "All tasks complete!"
        return;
    }

    const rawcode = document.getElementById("codeInput").value;
    const code = rawcode.replace(/\s+/g, '')

    let styleCount = 0
    
    styleCommands.forEach(cmd => {
        styleCount += countFunctionCalls(code, cmd); 
    });

    updateColorsBasedOnStyleCount(styleCount);

    let flagList =  tasks[currentTaskIndex].flags
    let flagCheck = flagList.map(() => true)

    for (let i = 0; i < flagCheck.length; i++) {
        const keys = flagList[i].split(' ');
        keys.forEach(element => {
            flagCheck[i] = flagCheck[i] && code.includes(element)
        });
    }

    let feedbacks = tasks[currentTaskIndex].feedbacks
    let feedbackText = ""
    let points = 0

    for (let i = 0; i < flagCheck.length; i++) {
        if (!flagCheck[i]) {
            feedbackText += feedbacks[i]
        } else {
            points += 1
        }
    }

    // Update progress bar
    let progress = (points / flagList.length) * 100; // Calculate percentage
    document.getElementById(`taskProgress${currentTaskIndex + 1}`).max = flagList.length; // Set the flags
    document.getElementById(`taskProgress${currentTaskIndex + 1}`).value = points; // Set the progress value

    if (points == flagCheck.length) {
        // all correct
        document.getElementById("feedback").innerText = "✅ 素晴らしい仕事です！キャンバスと変数が設定されました。";  // Translated feedback message
        currentTaskIndex++;  // Move to the next task
        showNextTask();  // Update the task on the page
    } else {
        document.getElementById("feedback").innerText = feedbackText;
    }
}

// Function to update the displayed task after completion
function showNextTask() {
    const nextTask = tasks[currentTaskIndex];

    if (nextTask) {
        document.getElementById("task").innerHTML = `
        <h2>タスク</h2>
        <p>${nextTask.task}</p>
        <h2>説明</h2>
        <p>${nextTask.desc}</p>
        <h2>ヒント</h2>
        <p>${nextTask.hint}</p>
        `;  // Translated "Hint"
    } else {
        document.getElementById("task").innerHTML = 
        `<p><strong>すべてのタスクが完了しました！素晴らしい仕事です！</strong></p>`;  // Translated "All tasks completed! Great job!"
    }
}

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function saveCode() {
    // Get the text from the textarea
    const codeContent = document.getElementById("codeInput").value;

    // Get the current timestamp
    const timestamp = new Date().toISOString().replace(/[:.-]/g, '_'); // Format the timestamp
    const fileName = `code_${timestamp}.txt`;

    // Create a Blob from the text
    const blob = new Blob([codeContent], { type: 'text/plain' });

    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Trigger the download
    link.click();

    // Clean up
    URL.revokeObjectURL(link.href);
}


document.getElementById("codeInput").addEventListener("input", debounce(checkCode, 300));

