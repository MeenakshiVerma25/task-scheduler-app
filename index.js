let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newGamebtn = document.querySelector("#new-btn");
let count = 0;
let turnO = true; 
let music = new Audio("background.mp3");
let click = new Audio("click2.wav");
let drawSound = new Audio("Cheen Tapak Dam Dam.mp3");
let win = new Audio("win.mp3");
let drawImg = document.getElementById('winImg');
let msg = document.querySelector("#msg"); 
let msgContainer = document.querySelector("#msgContainer"); 

music.loop = true;

// Ensure music starts on first user interaction
document.addEventListener("click", () => {
    if (music.paused) {
        music.play();
    }
}, { once: true });

const hide = "hide";
const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

const enableBoxes = () => {
    boxes.forEach(box =>{
        box.disabled = false;
        box.innerText = "";
    });
}

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add(hide);
    drawImg.innerHTML = ""; 
    music.play(); // Restart background music on reset
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        click.currentTime = 0; // Reset audio to start
        click.play();
        if(turnO){ 
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        
        box.disabled = true;
        count++;
        let isWinner = checkWinner();

        if (count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    drawSound.play();
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove(hide);
    drawImg.innerHTML = '<img src="img2.webp" alt="Draw Image">'; 
    disableBoxes();
    music.pause(); // Stop background music on game end
}

const disableBoxes = () => {
    boxes.forEach(box =>{
        box.disabled = true;
    });
}

const showWinner = (winner) => {
    win.play();
    msg.innerText = `Congratulations, ${winner} is the Winner!`;
    msgContainer.classList.remove(hide);
    disableBoxes();
    music.pause(); // Stop background music on game end
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val !== "" && pos2val !== "" && pos3val !== ""){
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val);
                return true;
            }
        } 
    }
    return false;
}

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);