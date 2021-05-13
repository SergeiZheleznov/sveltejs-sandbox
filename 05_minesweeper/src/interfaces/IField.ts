import type { ICell } from "./ICell";

export interface IField {
  colCount: number,
  rowCount: number,
  cells: ICell[][],
}