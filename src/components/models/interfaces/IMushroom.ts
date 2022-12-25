import { Color } from "../enums/Color";
import { Spots } from "../enums/Spots";

export interface IMushroom {
    id: number;
    name: string;
    spots: Spots;
    color: Color;
    latlng: [number, number];
  }