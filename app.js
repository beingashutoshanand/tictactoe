let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let win = document.querySelector("#win");
let newGamebtn = document.querySelector("#new-game");

let winning = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

let turno = true;
let count = 0
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("box click", count);
    if (turno) {
      box.innerText = "o";
      box.classList.add("new-color")
      turno = false;
    }
    else {
      box.innerText = "x";
      box.classList.remove("new-color")
      turno = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if (count === 9 && isWinner == undefined) {
      // console.log("drow");
      drowGame();
    }
    // console.log(isWinner);
  });
});

const drowGame = () => {
  win.innerText = `game was drow`
  win.classList.remove("hide")
  disableBoxes();
};


const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
}
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}
const showWinner = (winner) => {
  win.innerText = `congratulation, winner is ${winner}`;
  win.classList.remove("hide")
  newGamebtn.classList.remove("hide");
  resetbtn.classList.add("hide");
  disableBoxes();
}
const resetGame = () => {
  turno = true;
  enableBoxes();
  win.classList.remove("hide")
  newGamebtn.classList.remove("hide");
  win.classList.add("hide")
  newGamebtn.classList.add("hide")
  resetbtn.classList.remove("hide");
  count = 0;
}

const checkWinner = () => {
  for (let pattern of winning) {
    // console.log(pattern[0],pattern[1],pattern[2]);
    // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

    let box1val = boxes[pattern[0]].innerText;
    let box2val = boxes[pattern[1]].innerText;
    let box3val = boxes[pattern[2]].innerText;

    if (box1val != "" && box2val != "" && box3val != "") {
      if (box1val === box2val && box2val === box3val) {
        console.log("winner", box1val);
        showWinner(box1val);
        // disableBoxes();
        return true;

      }
    }
  }
};

newGamebtn.addEventListener("click", resetGame)
resetbtn.addEventListener("click", resetGame)

