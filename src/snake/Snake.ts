import { Grid } from "./Grid.js";

export enum Direction {
    LEFT, RIGHT, UP, DOWN
}

class SnakePiece {
    constructor(public x: number, public y: number) {}
}

export class Snake {

    private static readonly SNAKE_START_SIZE: number = 8;

    private static readonly ACTION_QUEUE_CAPACITY: number = 2;
    private actionQueue: Direction[] = [];

    private readonly _snakePieces: SnakePiece[] = Array();
    private readonly grid: Grid;

    private _previousDirection: Direction = Direction.RIGHT;
    private foodEaten: number = 0;

    constructor(startX: number, startY: number, grid: Grid) {
        this.grid = grid;

        for (let i = 0; i < Snake.SNAKE_START_SIZE; i++)
            this.snakePieces.push(new SnakePiece(startX - i, startY));
    }

    update() : void {
        this.move();
        this.eat();
    }

    private eat() : void {
       if (this.grid.hasFoodAt(this.head.x, this.head.y)) {
           let food = this.grid.getFoodAt(this.head.x, this.head.y);

           this.foodEaten += food.volume;
           food.playEatingSound();
           this.grid.spawnFood();
       }
    }

    private move() : void {
        this.shiftBody();
    }

    private isOpposite(directionA: Direction, directionB: Direction) : boolean {
        return (
            directionA == Direction.DOWN && directionB == Direction.UP
            || directionA == Direction.UP && directionB == Direction.DOWN
            || directionA == Direction.RIGHT && directionB == Direction.LEFT
            || directionA == Direction.LEFT && directionB == Direction.RIGHT
        );
    }

    private shiftBody() : void {
        let head = this.snakePieces[0];
        let newPiece = new SnakePiece(head.x, head.y);

        let direction: Direction;
        if (this.actionQueue.length === 0)
            direction = this._previousDirection
        else {
            let desiredDirection = this.actionQueue.shift()!;
            direction = this.isOpposite(desiredDirection, this._previousDirection)
                ? this._previousDirection
                : desiredDirection
        }

        switch (direction) {
            case Direction.LEFT:
                newPiece.x -= 1;
                break;
            case Direction.RIGHT:
                newPiece.x += 1;
                break;
            case Direction.UP:
                newPiece.y -= 1;
                break;
            case Direction.DOWN:
                newPiece.y += 1;
                break;
        }

        this.snakePieces.unshift(newPiece);
        this.wrapHeadIfOutOfBounds(newPiece);

        if (this.foodEaten == 0)
            this.snakePieces.pop();
        else
            this.foodEaten--;

        this._previousDirection = direction;
    }

    private wrapHeadIfOutOfBounds(head: SnakePiece) : void {
        if (head.x < 0) head.x = this.grid.size - 1;
        else if (head.x >= this.grid.size) head.x = 0;
        else if (head.y < 0) head.y = this.grid.size - 1;
        else if (head.y >= this.grid.size) head.y = 0;
    }

    private hasCollisionOccurred() : boolean {
        if (this.snakePieces.length > 1) {
            for (let i = 1; i < this.snakePieces.length; i++) {
                let piece = this.snakePieces[i];
                if (piece.x == this.head.x && piece.y == this.head.y) return true;
            }
        }
        return false;
    }

    hasBodyAt(gridX: number, gridY: number) : boolean {
        for (let sp of this._snakePieces) {
            if (sp.x == gridX && sp.y == gridY) return true;
        }
        return false;
    }

    private get head() : SnakePiece {
        return this._snakePieces[0];
    }

    get snakePieces() : Array<SnakePiece> {
        return this._snakePieces;
    }

    set direction(direction: Direction) {
        if (this.actionQueue.length < Snake.ACTION_QUEUE_CAPACITY)
            this.actionQueue.push(direction);
    }

    get isDead() : boolean {
        return this.hasCollisionOccurred()
    }

    private isHeadOutOfBounds() : boolean {
        let head: SnakePiece = this.head;

        return (
            head.x < 0
            || head.x >= this.grid.size
            || head.y < 0
            || head.y >= this.grid.size
        );
    }
}
