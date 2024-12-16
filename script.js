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


fetch('tasks.json')
    .then(response => response.json())
    .then(data => {
        tasks = data;
        displayTask();
    })
    .catch(error => console.error('タスクの読み込みエラー:', error))  // Translated error message

// Function to adjust the colors based on styleCount
function updateColorsBasedOnStyleCount(styleCount) {
    // Calculate the intensity for each color channel
    let intensity = Math.min(255, styleCount * 10); // Increase intensity, capped at 255

    // Adjust the colors
    primaryColor = `rgb(${30 + intensity}, 30, 30)`; // Red
    secondaryColor = `rgb(60, ${60 + intensity}, 60)`; // Green
    tertiaryColor = `rgb(90, 90, ${90 + intensity})`; // Blue

    // Set the CSS variables dynamically
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

document.getElementById("codeInput").addEventListener("input", debounce(checkCode, 300));

