import { CookieUtils } from "./snake/utils/CookieUtils.js";
import { Grid } from "./snake/Grid.js";
import { SoundPlayer } from "./snake/sound/SoundPlayer.js";
import { Controller } from "./snake/controller/Controller.js";

export class SnakeApp {

    private readonly HIGH_SCORE_COOKIE: string = "high-score";

    private readonly TICK_RATE: number = 10;
    private readonly TICK_TIME: number = 1000 / this.TICK_RATE;

    private readonly GRID_SIZE: number = 20;
    private readonly CANVAS: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("snake-canvas");

    private grid: Grid;
    private readonly _soundPlayer: SoundPlayer = new SoundPlayer();
    private readonly controller: Controller;

    private lastTime: number = Date.now();
    private timeElapsed: number = 0;
    private gameIsToBeRestarted: boolean = false;

    constructor() {
        this.resizeCanvas();
        this.displayHighScore();
        this.grid = new Grid(this.GRID_SIZE, this.CANVAS, this);
        this.controller = new Controller(this.grid.snake, this._soundPlayer);
        this.loop();
    }

    private getPlayerHighScore() : number {
        const highScoreString = CookieUtils.getCookie(this.HIGH_SCORE_COOKIE);
        return (highScoreString === undefined) ? 0 : parseInt(highScoreString);
    }

    private displayHighScore() : void {
        const flavorText = "Your high score is: ";
        document.getElementById(this.HIGH_SCORE_COOKIE)!.innerHTML = flavorText + this.getPlayerHighScore().toString();
    }

    private resizeCanvas() : void {
        const context = this.CANVAS.getContext("2d")!;
        context.canvas.width  = Math.min(600, window.innerWidth);
        context.canvas.height = Math.min(600, window.innerWidth);
    }

    private loop() : void {
        if (this.gameIsToBeRestarted) this.restartGame();

        while (this.timeElapsed >= this.TICK_TIME) {
            this.timeElapsed -= this.TICK_TIME;

            this.update();
            this.draw();
        }

        window.requestAnimationFrame(() => this.loop())
        this.timeElapsed += Date.now() - this.lastTime;
        this.lastTime = Date.now();
    }

    private restartGame() : void {
        this.gameIsToBeRestarted = false;

        if (this.getCurrentScore() > this.getPlayerHighScore()) CookieUtils.setCookie(this.HIGH_SCORE_COOKIE, this.getCurrentScore().toString());
        this.displayHighScore();
        this._soundPlayer.playLosingSound();
        this.controller.setSnake(this.grid.resetSnake());
    }

    private getCurrentScore() : number {
        return this.grid.snake.snakePieces.length;
    }

    private update() : void {
        this.grid.update();
    }

    private draw() : void {
        this.grid.draw();
    }

    setGameToBeRestarted() : void {
        this.gameIsToBeRestarted = true;
    }

    public get soundPlayer(): SoundPlayer {
        return this._soundPlayer;
    }
}

let snakeApp = new SnakeApp();
