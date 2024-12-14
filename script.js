// Task array to store the tasks dynamically
const tasks = [
    {
        task: "Set up the canvas and define variables",
        desc: "Create a canvas of size 400x800 pixels. Define vectors for gravity (0, 0.098), velocity (0, 0), the ball’s position, and the floor's position. Make sure the ball is initially positioned above the floor.",
        hint: "Use `createVector()` to define the gravity, velocity, ball position, and floor position."
    },
    {
        task: "Draw the ball and floor",
        desc: "Use the vectors you created for the ball and the floor to draw them onto the canvas. The ball should be drawn as a circle, and the floor should be a rectangle at the bottom of the canvas.",
        hint: "Use the `circle()` function for the ball and the `rect()` function for the floor. Use the vectors for their positions and sizes."
    },
    {
        task: "Implement gravity and ball movement",
        desc: "Add gravity to the ball's velocity. Then, update the ball’s position based on its velocity. The ball should move continuously downward due to gravity.",
        hint: "Since `draw()` runs 60 times per second, apply the gravity to the velocity every frame, and update the ball's position accordingly. Use the `add()` method for velocity and gravity vectors."
    },
    {
        task: "Detect collision between the ball and the floor",
        desc: "When the ball touches the floor, it should bounce. Implement a check to detect when the ball’s bottom edge reaches the floor and reverse its velocity when it collides.",
        hint: "Think about how the ball’s velocity changes when it hits the floor. Use an `if` statement to check if the ball has reached the floor and reverse the vertical velocity (`v.y`) to simulate bouncing."
    },
    {
        task: "Allow ball and floor movement",
        desc: "Enable interaction with the ball and floor using the mouse. Left-click should move the ball to where the mouse is, and right-click should allow you to move the floor up or down.",
        hint: "Use the `mousePressed()` function to detect mouse clicks. On left-click, set the ball's position to the mouse coordinates. On right-click, adjust the floor's position vertically."
    },
];


let currentTaskIndex = 0; // Track the current task index

// Display the current task
function displayTask() {
    const taskDiv = document.getElementById("task");
    const currentTask = tasks[currentTaskIndex];

    taskDiv.innerHTML = `
        <p><strong>Task:</strong> ${currentTask.task}</p>
        <p><strong>Description:</strong> ${currentTask.desc}</p>
        <p><strong>Hint:</strong> ${currentTask.hint}</p>
    `;
}

// Validate the student's code against the task

function checkCode() {
    const code = document.getElementById("codeInput").value;
    const currentTask = tasks[currentTaskIndex];

    // Validation logic for each task
    switch (currentTaskIndex) {
        case 0: // Task 1: Set up the canvas and define variables
            // Check if gravity, velocity, ball, and floor vectors are created'
            let flag1 = code.includes("createCanvas(400, 800)")
            let flag2 = code.includes("g") && code.includes("createVector(0, 0.098)")
            let flag3 = code.includes("v") && code.includes("createVector(0, 0)")
            let flag4 = code.includes("ball")
            let flag5 = code.includes("floor")

            let feedbackText = ""
            let points = 0

            if (!flag1) {
                feedbackText += "❌ Remember to set up the canvas correctly.\n"
            } else {
                points += 1
            }

            if (!flag2) {
                feedbackText += "❌ Remember to set up the gravity (g) correctly.\n"
            } else {
                points += 1
            }


            if (!flag3) {
                feedbackText += "❌ Remember to set up the velocity (v) correctly.\n"
            } else {
                points += 1
            }


            if (!flag4) {
                feedbackText += "❌ Remember to set up ball correctly.\n"
            } else {
                points += 1
            }


            if (!flag5) {
                feedbackText += "❌ Remember to set up floor correctly.\n"
            } else {
                points += 1
            }

            if (flag1 && flag2 && flag3 && flag4 && flag5) {
                document.getElementById("feedback").innerText = "✅ Great job! Canvas and variables are set up.";
                currentTaskIndex++;  // Move to the next task
                showNextTask();  // Update the task on the page
            } else {
                document.getElementById("feedback").innerText = feedbackText;
            }

            // Update progress bar
            let progress = (points / 5) * 100; // Calculate percentage
            document.getElementById("taskProgress").value = points; // Set the progress value

            // Update pie chart
            updatePieChart(points, 5); // Pass the current points and max points (5 tasks)

            break;
        case 1: // Task 2: Draw the ball and floor
            // Check if the circle and rect functions are used to draw the ball and floor
            if (code.includes("circle(") && code.includes("rect(")) {
                document.getElementById("feedback").innerText = "✅ Well done! The ball and floor are drawn.";
                currentTaskIndex++;  // Move to the next task
                showNextTask();  // Update the task on the page
            } else {
                document.getElementById("feedback").innerText = "❌ Try again. Make sure you're using `circle()` for the ball and `rect()` for the floor.";
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
                document.getElementById("feedback").innerText = "❌ Try again. Ensure you're using `mousePressed()` to handle the interactions.";
            }
            break;
        default:
            document.getElementById("feedback").innerText = "All tasks complete!";
            break;
    }
}

// Function to update the pie chart
function updatePieChart(points, maxPoints) {
    const canvas = document.getElementById("pieChart");
    const ctx = canvas.getContext("2d");

    // Clear the previous pie chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the percentage of completion
    const percentage = (points / maxPoints) * 100;

    // Draw the background circle (in light gray)
    ctx.beginPath();
    ctx.arc(100, 100, 90, 0, 2 * Math.PI);
    ctx.fillStyle = "#f0f0f0";  // Light gray background
    ctx.fill();

    // Draw the filled arc representing progress
    const startAngle = -0.5 * Math.PI;  // Start at the top (12 o'clock position)
    const endAngle = startAngle + (percentage / 100) * (2 * Math.PI);

    ctx.beginPath();
    ctx.arc(100, 100, 90, startAngle, endAngle);
    ctx.lineTo(100, 100);  // Create a pie shape
    ctx.fillStyle = "#4caf50";  // Green color for the progress
    ctx.fill();

    // Draw a white circle in the center to create a "donut" effect
    ctx.beginPath();
    ctx.arc(100, 100, 60, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";  // White center
    ctx.fill();

    // Draw the percentage text in the center
    ctx.fillStyle = "#333";  // Dark color for text
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${percentage.toFixed(0)}%`, 100, 100); // Show the percentage in the center
}

// Function to update the displayed task after completion
function showNextTask() {
    const nextTask = tasks[currentTaskIndex];

    if (nextTask) {
        document.getElementById("task").innerHTML = `
            <p><strong>Task:</strong> ${nextTask.task}</p>
            <p><strong>Description:</strong> ${nextTask.desc}</p>
            <p><strong>Hint:</strong> ${nextTask.hint}</p>
        `;
        checkCode();
    } else {
        document.getElementById("task").innerHTML = `<p><strong>All tasks completed! Great job!</p>`;
    }
}


// Go to the next task (used by the debug button)
function nextTask() {
    // Increment task index to show the next task
    currentTaskIndex++;

    // If there are no more tasks, alert the user
    if (currentTaskIndex >= tasks.length) {
        alert("Congratulations! You've completed all the tasks.");
        return; // Stop execution if all tasks are completed
    }

    // Display the next task
    displayTask();
}

// Initially display the first task
displayTask();
