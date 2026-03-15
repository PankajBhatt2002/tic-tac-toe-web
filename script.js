// onload condition i.e when game start
window.onload = function(){
    restart();
};

// defining all the veriable globally
const boxes = document.querySelectorAll(".box");
const crossSide = document.getElementById("crossSide");
const dotSide = document.getElementById("dotSide");
const crossWin = document.getElementById("crossWin");
const dotWin = document.getElementById("dotWin");
const drawMessage = document.getElementById("drawMessage")
let swichingTheTurn = 1;

// Create audio objects
const moveSound = new Audio("sounds/move.mp3");
const winSound = new Audio("sounds/win.mp3");
const drawSound = new Audio("sounds/draw.mp3");

//restart function
function restart(){
    //hiding all UI element
    if(swichingTheTurn===0){
        swichingTheTurn=1;
    }else{
        swichingTheTurn=0;
    }
    if(swichingTheTurn===0){
        crossSide.style.visibility = "visible";
        dotSide.style.visibility = "hidden";
    }else{
        dotSide.style.visibility = "visible";
        crossSide.style.visibility = "hidden";
    }
    crossWin.style.display = "none";
    dotWin.style.display = "none";
    drawMessage.style.display = "none";

    //disabling all the cross and dot class i.e image of all the dot and cross element is removed
    boxes.forEach((box)=>{
        box.classList.remove("dot", "cross", "winning-box");
        box.disabled = false; //enabling all the boxes i.e we can now click on the boxes
    })
}

//checking all winning condition
function checkWin(playerClass, winElement){
    const winningCombination = [
        ["box11", "box12", "box13"],
        ["box21", "box22", "box23"],
        ["box31", "box32", "box33"],
        ["box11", "box21", "box31"],
        ["box12", "box22", "box32"],
        ["box13", "box23", "box33"],
        ["box11", "box22", "box33"],
        ["box13", "box22", "box31"]
    ];

    for (let combo of winningCombination) {
        if (combo.every(id => document.getElementById(id).classList.contains(playerClass))) {
            winElement.style.display = "block";
            combo.forEach(id => {
                document.getElementById(id).classList.add("winning-box"); // Highlight winning boxes

            });
            disableAllBoxes();
            return true;
        }
    }
    return false;
}

// Check for a draw
function checkDraw() {
    const isDraw = Array.from(boxes).every((box) =>
        box.classList.contains("dot") || box.classList.contains("cross")
    );

    if (isDraw) {
        drawMessage.style.display = "block"; // Show draw message
        disableAllBoxes();
        return true;
    }
    return false;
}

// Disable all boxes
function disableAllBoxes() {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

// Add click events to all boxes
boxes.forEach((box) => {
    box.addEventListener("click", function () {

        moveSound.play(); // Play move sound

        // Add cross or dot to the box
        if (crossSide.style.visibility === "visible") {
            box.classList.add("cross");
        } else {
            box.classList.add("dot");
        }
        box.disabled = true; // Disable the box after clicking

        // Switch turns
        if (dotSide.style.visibility === "hidden") {
            dotSide.style.visibility = "visible";
            crossSide.style.visibility = "hidden";
        } else {
            dotSide.style.visibility = "hidden";
            crossSide.style.visibility = "visible";
        }

        // Check win and draw conditions
        if (!checkWin("cross", crossWin)) {
            if (!checkWin("dot", dotWin)) {
                if (checkDraw()) {
                    drawSound.play(); // Play draw sound
                }
            } else {
                winSound.play(); // Play win sound for dot
            }
        } else {
            winSound.play(); // Play win sound for cross
        }
    });
});

// Add a reset button
document.getElementById("resetButton").addEventListener("click", restart);

