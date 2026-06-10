export class Simulation {

    constructor(grid, renderer, rules) {

        this.grid = grid;
        this.renderer = renderer;
        this.rules = rules;
        this.generation = 0;

        this.running = false;
    }

    step() {

        const nextGrid = this.grid.clone();

        for (let r = 0; r < this.grid.rows; r++) {
            for (let c = 0; c < this.grid.cols; c++) {

                nextGrid.setCell(
                    r,
                    c,
                    this.rules.nextState(this.grid, r, c)
                );
            }
        }

        this.grid = nextGrid;
        this.generation++;

        document.getElementById(
            "generationCounter"
        ).textContent =
            `Generation: ${this.generation}`;

        this.renderer.draw(this.grid);
    }

    start() {

        if (this.running) return;

        this.running = true;

        const loop = () => {

            if (!this.running) return;

            this.step();

            setTimeout(() => {
                requestAnimationFrame(loop);
            }, 100);
        };

        loop();
    }

    stop() {
        this.running = false;
    }

    setRules(rules) {

        this.rules = rules;

        this.renderer.rules = rules;
    }

    setRules(rules) {

        this.rules = rules;

        this.renderer.rules = rules;
    }
}