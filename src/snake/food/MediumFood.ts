import { Grid } from "../Grid.js";
import { Food } from "./Food.js";

export class MediumFood extends Food {

    private static readonly eatingSound: string = "../../../assets/sounds/chompchomp.wav";
    private static readonly color: string = "cyan";

    constructor(public gridX: number, public gridY: number, grid: Grid) {
        super(gridX, gridY, MediumFood.color, grid, MediumFood.eatingSound);
    }
}