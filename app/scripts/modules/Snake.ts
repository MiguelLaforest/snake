interface Part {
  X: number;
  Y: number;
  X2?: number;
  Y2?: number;
}

interface Food {
  color: string;
  X: number;
  Y: number;
}

export default class Snake {
  color = "hsl(120, 50%, 50%)";
  snake: Part[] = [ { X: 25, Y: 25 } ];
  grid: HTMLDivElement[][];
  food: Food;
  size: number = 0;

  MAX_SPEED = 20;
  MIN_SPEED = 100;
  speed: number = 50;

  direction: number /* = 38 */;

  update;

  onKeyDown = event => {
    this.changeDirection(event);
    clearInterval(this.update);
    this.update = setInterval(
      () => {
        this.move();
      },
      this.speed,
      this
    );
    if (event.keyCode === 107 || event.keyCode === 61) {
      this.increaseSpeed();
    }
    if (event.keyCode === 109 || event.keyCode === 173) {
      this.decreaseSpeed();
    }
  };

  constructor(display: HTMLDivElement[][], size) {
    document.addEventListener("keydown", this.onKeyDown);

    this.snake = [
      {
        X: Math.floor(size / 2),
        Y: Math.floor(size / 2),
        X2: undefined,
        Y2: undefined
      }
    ];

    this.grid = display;
    this.size = size;
    this.generateFood();
    this.display();
  }

  display() {
    const { color, X, Y } = this.food;

    this.grid[X][Y].style.backgroundColor = color;

    this.snake.forEach(({ X, Y }) => {
      this.grid[X][Y].style.backgroundColor = this.color;
    });
  }

  generateFood() {
    this.food = {
      color: "hsl(0, 70%, 60%)",
      X: Math.floor(Math.random() * this.size),
      Y: Math.floor(Math.random() * this.size)
    };
  }

  head(): Part {
    return this.snake[0];
  }

  tail(): Part {
    return this.snake[this.snake.length - 1];
  }

  changeDirection(event: KeyboardEvent) {
    this.direction = event.keyCode;
  }

  move() {
    const { X, Y } = this.tail();

    this.grid[X][Y].style.backgroundColor = "transparent";

    this.head().X2 = this.head().X;
    this.head().Y2 = this.head().Y;

    switch (this.direction) {
      case 37:
        this.head().Y ? this.head().Y-- : this.head().Y;
        break;
      case 38:
        this.head().X++;
        break;
      case 39:
        this.head().Y++;
        break;
      case 40:
        this.head().X--;
        break;

      default:
        break;
    }

    this.shift();

    if (this.reachedFood()) {
      this.eat();
      this.grow();
    } else if (this.bitesItself() || this.outOfBound()) {
      this.gameOver();
    }
    this.display();
  }

  reachedFood() {
    return this.head().X === this.food.X && this.head().Y === this.food.Y;
  }

  bitesItself() {
    return this.snake.some(
      part => this.head().X === part.X2 && this.head().Y === part.Y2
    );
  }

  outOfBound() {
    return (
      this.head().X < 0 ||
      this.head().X >= this.size ||
      this.head().Y < 0 ||
      this.head().Y >= this.size
    );
  }

  eat() {
    this.generateFood();
  }

  grow(): void {
    const { X2, Y2 } = this.tail();

    if (X2 && Y2)
      this.snake.push({
        X: X2,
        Y: Y2,
        X2: undefined,
        Y2: undefined
      });
  }

  shift(): void {
    for (let i = 1; i < this.snake.length; i++) {
      const { X2, Y2 } = this.snake[i - 1];
      this.snake[i].X2 = this.snake[i].X;
      this.snake[i].Y2 = this.snake[i].Y;

      if ({ X2, Y2 }) {
        this.snake[i].X = X2 ? X2 : 0;
        this.snake[i].Y = Y2 ? Y2 : 0;
      }
    }
  }

  gameOver(): void {
    const gameOver = document.getElementById("game-over");
    const score = document.getElementById("score");
    clearInterval(this.update);
    document.removeEventListener("keydown", this.onKeyDown);
    if (gameOver) {
      gameOver.style.opacity = "1";
      gameOver.style.zIndex = "1";
    }

    if (score) score.innerText = `Score: ${this.snake.length - 1}`;
  }

  increaseSpeed(): void {
    if (this.speed > this.MAX_SPEED) {
      this.speed -= 10;
      clearInterval(this.update);
      this.update = setInterval(
        () => {
          this.move();
        },
        this.speed,
        this
      );
    }
  }

  decreaseSpeed(): void {
    if (this.speed < this.MIN_SPEED) {
      this.speed += 10;
      clearInterval(this.update);
      this.update = setInterval(
        () => {
          this.move();
        },
        this.speed,
        this
      );
    }
  }
}
