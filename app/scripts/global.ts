import Display from "./modules/Display";

const board = new Display();

document.getElementById("reset")!.addEventListener("click", () => {
  board.reset();
});

document.getElementById("size+")!.addEventListener("click", () => {
  board.increaseSize();
});

document.getElementById("size-")!.addEventListener("click", () => {
  board.decreaseSize();
});

document.getElementById("speed+")!.addEventListener("click", () => {
  board.snake.increaseSpeed();
});

document.getElementById("speed-")!.addEventListener("click", () => {
  board.snake.decreaseSpeed();
});

document.querySelectorAll(".color").forEach(container => {
  for (const value of board.colors) {
    const color = document.createElement("div");
    color.style.backgroundColor = value;
    color.addEventListener("click", () => {
      changeColor(container, value);
      color.classList.toggle("set");
    });
    container.appendChild(color);
  }
});

function changeColor(container: HTMLDivElement, value: string) {
  container.querySelectorAll("div").forEach(color => {
    color.classList.remove("set");
  });

  switch (container.className.replace("color ", "")) {
    case "snake":
      board.snake.color = value;
      board.snake.display();
      break;

    case "food":
      board.snake.food.color = value;
      board.snake.display();
      break;

    default:
      break;
  }
}

document.querySelector(".toggle-grid")!.addEventListener("click", () => {
  document
    .querySelectorAll(".cell")
    .forEach(cell => cell.classList.toggle("grid-shown"));
});
