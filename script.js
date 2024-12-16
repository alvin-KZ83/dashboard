let tasks = []

fetch('tasks.json')
    .then(response => response.json())
    .then(data => {
        tasks = data;
        displayTask();
    })
    .catch(error => console.error('タスクの読み込みエラー:', error))  // Translated error message

let currentTaskIndex = 0; // Track the current task index

// Display the current task
function displayTask() {
    const taskDiv = document.getElementById("task");
    const currentTask = tasks[currentTaskIndex];

    taskDiv.innerHTML = `<p><strong>タスク:</strong> ${currentTask.task}
        <p><strong>説明:</strong> ${currentTask.desc}
        <p><strong>ヒント:</strong> ${currentTask.hint}</p>`  // Translated "Hint"
}

function checkCode() {
    if (currentTaskIndex == 5) {
        document.getElementById("feedback").innerText = "すべてのタスクが完了しました！";  // Translated "All tasks complete!"
        return;
    }

    const rawcode = document.getElementById("codeInput").value;
    const code = rawcode.replace(/\s+/g, '')

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
        document.getElementById("task").innerHTML = `<p><strong>タスク:</strong> ${nextTask.task}
            <p><strong>説明:</strong> ${nextTask.desc}
            <p><strong>ヒント:</strong> ${nextTask.hint}</p>`;  // Translated "Hint"
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
