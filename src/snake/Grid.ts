import { Snake } from "./Snake.js";
import { SnakeApp } from "../SnakeApp.js";
import { Food } from "./food/Food.js";
import { SmallFood } from "./food/SmallFood.js";
import { MediumFood } from "./food/MediumFood.js";
import { LargeFood } from "./food/LargeFood.js";

export class Grid {

    private readonly BG_COLOR: string = "#fff";
    private readonly GRID_LINE_COLOR: string = "#ddd";
    private readonly _size: number;

    private readonly _context: CanvasRenderingContext2D;
    private readonly canvas: HTMLCanvasElement;
    private readonly _cellWidth: number;

    private readonly _snakeApp: SnakeApp;
    private _snake: Snake;

    private _food: Food = new SmallFood(0, 0, this);

    constructor(size: number, canvas: HTMLCanvasElement, snakeApp: SnakeApp) {
        this._size = size;
        this.canvas = canvas;
        this._context = <CanvasRenderingContext2D> canvas.getContext("2d");
        this._cellWidth = canvas.height / size;

        this._snakeApp = snakeApp;
        this._snake = new Snake(Math.floor(size / 2), Math.floor(size / 2), this);

        this.spawnFood();
    }

    update() : void {
        this.snake.update();

        if (this.snake.isDead) this.snakeApp.setGameToBeRestarted();
    }

    draw() : void {
        this.clearCanvas();

        this._food.draw();
        this.drawGridLines();
        this.drawSnake();
        this.drawScore();
    }

    resetSnake() : Snake {
        let newSnake = new Snake(Math.floor(this.size / 2), Math.floor(this.size / 2), this);
        this._snake = newSnake;
        return newSnake;
    }

    private drawScore() : void {
        this.context.fillStyle = "black";
        this.context.font = "18px Impact";
        this.context.fillText("Score: " + this.snake.snakePieces.length, this.canvas.width - 100, 15);
    }

    hasFoodAt(gridX: number, gridY: number) : boolean {
        return (
            this._food.gridX == gridX
            && this._food.gridY == gridY
        );
    }

    getFoodAt(gridX: number, gridY: number) : Food {
       return this._food;
    }

    spawnFood() : void {
        while (true) {
            let gridX = Math.floor(Math.random() * this.size);
            let gridY = Math.floor(Math.random() * this.size);

            if (this.snake.hasBodyAt(gridX, gridY)) continue;
            else {
                let rand = Math.random();
                let food = null;

                if (rand <= 0.7) food = new SmallFood(gridX, gridY, this);
                else if (rand <= 0.9) food = new MediumFood(gridX, gridY, this);
                else food = new LargeFood(gridX, gridY, this);

                this._food = food;
                break;
            }
        }
    }

    private clearCanvas() : void {
        this.context.fillStyle = this.BG_COLOR;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private drawGridLines() : void {
        this.context.strokeStyle = this.GRID_LINE_COLOR;

        for (let i = 0; i < 20; i++) {
            // Vertical lines.
            this.context.beginPath();
            this.context.moveTo(i * this.cellWidth, 0);
            this.context.lineTo(i * this.cellWidth, this.canvas.height);
            this.context.stroke();

            // Horizontal lines.
            this.context.beginPath();
            this.context.moveTo(0, i * this.cellWidth);
            this.context.lineTo(this.canvas.width, i * this.cellWidth);
            this.context.stroke();
        }
    }

    private drawSnake() : void {
        this.context.fillStyle = "#813434";

        for (let piece of this.snake.snakePieces) {
            let gridX = piece.x * this.cellWidth;
            let gridY = piece.y * this.cellWidth;
            this.context.fillRect(gridX, gridY, this.cellWidth, this.cellWidth);
            this.context.fillStyle = "#466635 ";
        }
    }

    get size() : number {
        return this._size;
    }

    get context() : CanvasRenderingContext2D {
        return this._context;
    }

    get cellWidth() : number {
        return this._cellWidth;
    }

    get snakeApp() : SnakeApp {
        return this._snakeApp;
    }

    get snake() : Snake {
        return this._snake;
    }
}
