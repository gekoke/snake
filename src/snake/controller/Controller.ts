import { Snake, Direction } from "../Snake.js";
import { SoundPlayer } from "../sound/SoundPlayer.js";

export class Controller {

    private readonly soundPlayer: SoundPlayer;
    private snake: Snake;

    private initialX: number | null = null;
    private initialY: number | null = null;

    constructor(snake: Snake, soundPlayer: SoundPlayer) {
        this.snake = snake;
        this.soundPlayer = soundPlayer;

        this.initializeSwipeHandlers();
        document.body.addEventListener("keydown", this.handleKeyDown);
    }

    setSnake(newSnake: Snake) : void {
        this.snake = newSnake;
    }

    private initializeSwipeHandlers() : void {
        const container = document.getElementById("snake-canvas")!;

        container.addEventListener("touchstart", this.startTouch);
        container.addEventListener("touchmove", this.moveTouch);
    }

    private handleKeyDown = (event: KeyboardEvent) : void => {
        this.soundPlayer.startMusic();
        let key: string = event.key;

        switch (key) {
            case "ArrowLeft":
                this.snake.direction = Direction.LEFT;
                break;
            case "ArrowRight":
                this.snake.direction = Direction.RIGHT;
                break;
            case "ArrowUp":
                this.snake.direction = Direction.UP;
                break;
            case "ArrowDown":
                this.snake.direction = Direction.DOWN;
                break;
            case "w":
                this.snake.direction = Direction.UP;
                break;
            case "a":
                this.snake.direction = Direction.LEFT;
                break;
            case "s":
                this.snake.direction = Direction.DOWN;
                break;
            case "d":
                this.snake.direction = Direction.RIGHT;
                break;
        }
    }

    private startTouch = (e: Event) : void => {
        if (!(e instanceof TouchEvent)) return;
        this.initialX = e.touches[0].clientX;
        this.initialY = e.touches[0].clientY;
    }

    private moveTouch = (e: Event) : void => {
        if (!(e instanceof TouchEvent)) return;
        if (this.initialX === null) return;
        if (this.initialY === null) return;
        this.soundPlayer.startMusic();

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;

        const diffX = this.initialX - currentX;
        const diffY = this.initialY - currentY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // sliding horizontally
            if (diffX > 0) {
                this.snake.direction = Direction.LEFT;
                return;
            } else {
                // swiped right
                this.snake.direction = Direction.RIGHT;
                return;
            }
        } else {
            // sliding vertically
            if (diffY > 0) {
                // swiped up
                this.snake.direction = Direction.UP;
                return;
            } else {
                // swiped down
                this.snake.direction = Direction.DOWN;
                return;
            }
        }
    }
}
