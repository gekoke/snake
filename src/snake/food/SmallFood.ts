import { Grid } from "../Grid.js";
import { Food } from "./Food.js";

export class SmallFood extends Food {

    private static readonly eatingSound: string = "../../../assets/sounds/chomp.wav";
    private static readonly color: string = "green";

    constructor(public gridX: number, public gridY: number, grid: Grid) {
        super(gridX, gridY, SmallFood.color, grid, SmallFood.eatingSound);
    }
}