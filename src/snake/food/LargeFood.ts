import { Grid } from "../Grid.js";
import { Food } from "./Food.js";

export class LargeFood extends Food {

    private static readonly eatingSound: string = "../../../assets/sounds/chompchompchomp.wav";
    private static readonly color: string = "purple";

    constructor(public gridX: number, public gridY: number, grid: Grid) {
        super(gridX, gridY, LargeFood.color, grid, LargeFood.eatingSound);
    }
}