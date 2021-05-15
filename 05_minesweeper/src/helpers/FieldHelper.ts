import type { ICell, IField, IFieldHelper } from 'src/interfaces';
import random from 'lodash.random';

export class FieldHelper implements IFieldHelper {

  private getRandomCell(field: IField): ICell {
    const randomCol = random(0, field.cols-1);
    const randomRow = random(0, field.rows-1);
    const cell = field.cells?.[randomRow]?.[randomCol];
    if (!cell) {
      return this.getRandomCell(field);
    }
    return cell;
  }

  private getCellsAround(field: IField, row: number, col: number): ICell[] {
    const result: ICell[] = [];
    for (let currentRow = row - 1; currentRow <= row + 1; currentRow++) {
      for (let currentCol = col - 1; currentCol <= col + 1 ; currentCol++) {
        if (currentRow === row && currentCol === col || !field.cells?.[currentRow]?.[currentCol]) {
          continue;
        }
        result.push(field.cells[currentRow][currentCol]);
      }
    }
    return result;
  }

  private calculateMinesCount(field: IField): void {
    for (let row = 0; row < field.rows; row++) {
      for (let col = 0; col < field.cols; col++) {
        const cell = field.cells[row][col];
        if (cell.danger) {
          const cellsAround = this.getCellsAround(field, row, col);
          for (const cell of cellsAround) {
            cell.minesCount++;
          }
        }
      }
    }
  }

  private generateMines(field: IField, minesCount: number = 10) {
    for (let index = 0; index < minesCount; index++) {
      const cell = this.getRandomCell(field);
      cell.danger = true;
    }
  }

  public openCell(field: IField, row, col) {
    field.cells[row][col].state = 'opened';
    return field;
  }

  public toggleMark(field: IField, row, col) {
    const cell = field.cells[row][col];
    cell.state = cell.state === 'marked' ? 'closed' : 'marked';
    return field;
  }

  public generateField(rows: number = 10, cols: number = 10, mines: number = 10) {
    const field: IField = {
      cells:[],
      rows,
      cols,
      mines
    } 

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!field.cells[row]) {
          field.cells[row] = [];
        }
        field.cells[row].push({
          row,
          col,
          state: 'closed',
          minesCount: 0,
          danger: false
        });
      }
    }
    this.generateMines(field, mines);
    this.calculateMinesCount(field);
    return field;
  }
}