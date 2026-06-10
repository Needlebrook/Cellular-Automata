export class Renderer {

    constructor(canvas, cellSize, rows, cols, rules) {

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.rules = rules;
        this.cellSize = cellSize;

        this.canvas.width = cols * cellSize;
        this.canvas.height = rows * cellSize;
    }

    draw(grid) {

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.ctx.strokeStyle = "#222";

        for (let r = 0; r < grid.rows; r++) {

            for (let c = 0; c < grid.cols; c++) {


                this.ctx.strokeRect(
                    c * this.cellSize,
                    r * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );

                const state = grid.getCell(r, c);

                if (state === 0) continue;

                this.ctx.fillStyle =
                    this.rules.getColor(state);

                // Draw cell
                this.ctx.fillRect(
                    c * this.cellSize,
                    r * this.cellSize,
                    this.cellSize,
                    this.cellSize
                );
            }
        }
    }
}