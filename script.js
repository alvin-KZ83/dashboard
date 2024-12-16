let tasks = []

fetch('tasks.json')
    .then(response => response.json())
    .then(data => {
        tasks = data;
        displayTask();
    })
    .catch(error => console.error('Error loading tasks:', error))

let currentTaskIndex = 0; // Track the current task index

// Display the current task
function displayTask() {
    const taskDiv = document.getElementById("task");
    const currentTask = tasks[currentTaskIndex];

    taskDiv.innerHTML = `<p><strong>Task:</strong> ${currentTask.task}</p>
        <p><strong>Description:</strong> ${currentTask.desc}</p>
        <p><strong>Hint:</strong> ${currentTask.hint}</p>`
}

// Validate the student's code against the task

function checkCode() {
    const rawcode = document.getElementById("codeInput").value;
    const code = rawcode.replace(/\s+/g, '')

    // Validation logic for each task
    switch (currentTaskIndex) {
        case 0: // Task 1: Set up the canvas and define variables
            // Check if gravity, velocity, ball, and floor vectors are created'
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

            if (points == flagCheck.length) {
                // all correct
                document.getElementById("feedback").innerText = "✅ Great job! Canvas and variables are set up.";
                currentTaskIndex++;  // Move to the next task
                showNextTask();  // Update the task on the page
            } else {
                document.getElementById("feedback").innerText = feedbackText;
            }

            // Update progress bar
            let progress = (points / flagList.length) * 100; // Calculate percentage
            document.getElementById(`taskProgress${currentTaskIndex + 1}`).max = flagList.length; // Set the flags
            document.getElementById(`taskProgress${currentTaskIndex + 1}`).value = points; // Set the progress value

            break;
        case 1: // Task 2: Draw the ball and floor
            // Check if the circle and rect functions are used to draw the ball and floor
            if (code.includes("circle(") && code.includes("rect(")) {
                document.getElementById("feedback").innerText = "✅ Well done! The ball and floor are drawn.";
                currentTaskIndex++;  // Move to the next task
                showNextTask();  // Update the task on the page
            } else {
                document.getElementById("feedback").innerText = "❌ Try again. Make sure you're using circle() for the ball and rect() for the floor.";
            }
            break;
        case 2: // Task 3: Implement gravity and ball movement
            // Check if gravity is applied to velocity and ball position is updated
            if (code.includes("v.add(g)") && code.includes("ball.add(v)")) {
                document.getElementById("feedback").innerText = "✅ Nice! Gravity is working and the ball is moving.";
                currentTaskIndex++;  // Move to the next task
                showNextTask();  // Update the task on the page
            } else {
                document.getElementById("feedback").innerText = "❌ Try again. Make sure you're applying gravity and updating the ball's position.";
            }
            break;
        case 3: // Task 4: Detect collision between the ball and the floor
            // Check if the collision and bounce logic is implemented
            if (code.includes("if (ball.y + 50 / 2 > floor.y)") && code.includes("v.mult(-1)")) {
                document.getElementById("feedback").innerText = "✅ Great! The ball is bouncing after hitting the floor.";
                currentTaskIndex++;  // Move to the next task
                showNextTask();  // Update the task on the page
            } else {
                document.getElementById("feedback").innerText = "❌ Try again. Check the condition and how you're reversing the velocity.";
            }
            break;
        case 4: // Task 5: Allow ball and floor movement
            // Check if mousePressed is used for moving the ball and floor
            if (code.includes("mousePressed()") && (code.includes("ball = createVector(mouseX, mouseY)") || code.includes("floor.y = mouseY"))) {
                document.getElementById("feedback").innerText = "✅ Awesome! Ball and floor are now interactive.";
                // Optionally, you could finish the task or loop back to the first task
            } else {
                document.getElementById("feedback").innerText = "❌ Try again. Ensure you're using mousePressed() to handle the interactions.";
            }
            break;
        default:
            document.getElementById("feedback").innerText = "All tasks complete!";
            break;
    }
}

// Function to update the displayed task after completion
function showNextTask() {
    const nextTask = tasks[currentTaskIndex];

    if (nextTask) {
        document.getElementById("task").innerHTML = `<p><strong>Task:</strong> ${nextTask.task}</p>
            <p><strong>Description:</strong> ${nextTask.desc}</p>
            <p><strong>Hint:</strong> ${nextTask.hint}</p>`
        ;
        checkCode();
    } else {
        document.getElementById("task").innerHTML = 
        `<p><strong>All tasks completed! Great job!</p>;`
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