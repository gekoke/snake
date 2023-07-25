import { Grid } from "../Grid.js";

export abstract class Food {

    private static readonly colorToVolume: Record<string, number> = {
        "green": 1,
        "cyan": 3,
        "purple": 5
    }

    private readonly grid: Grid;
    private readonly context: CanvasRenderingContext2D;

    private readonly eatingSound: string;
    private readonly _volume: number;
    private readonly color: string;

    constructor(public gridX: number, public gridY: number, color: string, grid: Grid, eatingSound: string) {
        this.grid = grid;
        this.context = grid.context;
        this.color = color;
        this._volume = Food.colorToVolume[color];
        this.eatingSound = eatingSound;
    }

    draw() : void {
        this.context.fillStyle = this.color;

        let x = this.gridX * this.grid.cellWidth;
        let y = this.gridY * this.grid.cellWidth;
        this.context.fillRect(x, y, this.grid.cellWidth, this.grid.cellWidth);
    }

    get volume() : number {
       return this._volume;
    }

    playEatingSound() {
        new Audio(this.eatingSound).play();
    }
}