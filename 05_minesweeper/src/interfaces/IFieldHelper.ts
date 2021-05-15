import type { IField } from ".";

export interface IFieldHelper {
  openCell(field: IField, row: number, col: number): IField,
  toggleMark(field: IField, row: number, col: number): IField,
  generateField(rows: number, cols: number, mines: number): IField
}