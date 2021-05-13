import type { ICell, IField } from 'src/interfaces';

export class Field implements IField {

  private _cells: ICell[][] = [];

  constructor(private readonly _colCount: number, private readonly _rowCount: number) {
    for (let row = 0; row < _rowCount; row++) {
      for (let col = 0; col < _colCount; col++) {
        if (!this._cells[row]) {
          this._cells[row] = [];
        }
        this._cells[row].push({
          row,
          col,
          state: 'opened',
          minesCount: 0,
          danger: false
        });
      }
    }
  }

  private generateMines(minesCount: number = 10) {
    for (let index = 0; index < minesCount; index++) {
      //const randomCol = Math.
      
    }
  }

  public get colCount() {
    return this._colCount;
  }

  public get rowCount() {
    return this._rowCount;
  }

  public get cells(){
    return this._cells;
  }
}