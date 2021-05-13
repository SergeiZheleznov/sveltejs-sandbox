export type ICellState = 'opened' | 'closed';

export interface ICell {
  row: number;
  col: number;
  state: ICellState;
  minesCount: number;
  danger: boolean;
}
