export class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.cells = Array.from({ length: rows }, () =>
            Array(cols).fill(0)
        );
    }

    getCell(row, col) {
        if (
            row < 0 ||
            col < 0 ||
            row >= this.rows ||
            col >= this.cols
        ) {
            return 0;
        }

        return this.cells[row][col];
    }

    setCell(row, col, value) {
        this.cells[row][col] = value;
    }

    clone() {
        const newGrid = new Grid(this.rows, this.cols);

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                newGrid.cells[r][c] = this.cells[r][c];
            }
        }

        return newGrid;
    }

    clear() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.cells[r][c] = 0;
            }
        }
    }

    countNeighbors(row, col) {
        let count = 0;

        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {

                if (dr === 0 && dc === 0) continue;

                count += this.getCell(row + dr, col + dc);
            }
        }

        return count;
    }

    toggleCell(row, col) {

        this.cells[row][col] =
            this.cells[row][col] ? 0 : 1;
    }
}