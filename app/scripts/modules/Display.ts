import Snake from "./Snake";

export default class Display {
  display: HTMLDivElement[][];
  snake: Snake;

  private MIN_BOARD_SIZE: number = 50;
  private MAX_BOARD_SIZE: number = 100;
  board_size: number = 0;

  colors = [
    "hsl(0, 70%, 60%)",
    "hsl(240, 70%, 60%)",
    "hsl(271, 70%, 60%)",
    "hsl(120, 50%, 50%)",
    "hsl(39, 70%, 60%)",
    "hsl(16, 70%, 60%)",
    "hsl(60, 70%, 60%)"
  ];

  constructor() {
    this.board_size = this.MIN_BOARD_SIZE;
    this.initialize_game();
    this.display_game();
  }

  initialize_game() {
    this.display_init();
  }

  display_game() {
    const display = document.getElementById("display");
    display.innerHTML = "";

    if (display) {
      this.display.forEach(row => {
        const container = document.createElement("div");
        container.className = "row";
        row.forEach(cell => {
          container.appendChild(cell);
        });
        display.appendChild(container);
      });
    }

    this.snake.display(this.display);
  }

  display_init() {
    this.display = [];

    for (let row = 0; row < this.board_size; row++) {
      this.display.push([]);
      for (let col = 0; col < this.board_size; col++) {
        const cell = document.createElement("div");
        cell.className = "cell";

        this.display[row].push(cell);
      }
    }
    this.snake = new Snake(this.display, this.board_size);
  }

  /**
   *
   * BOARD CONTROL
   *
   */

  increaseSize() {
    if (this.board_size < this.MAX_BOARD_SIZE) {
      this.board_size++;

      this.initialize_game();
      this.display_game();
    }
  }

  decreaseSize() {
    if (this.board_size > this.MIN_BOARD_SIZE) {
      this.board_size--;

      this.initialize_game();
      this.display_game();
    }
  }

  reset() {
    document.getElementById("game-over").style.opacity = "0";
    document.getElementById("game-over").style.zIndex = "-1";

    this.initialize_game();
    this.display_game();
  }
}
