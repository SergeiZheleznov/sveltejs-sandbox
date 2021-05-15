import type { ICell } from "src/interfaces";

export interface IField {
  cols: number;
  rows: number;
  mines: number;
  cells: ICell[][];
}