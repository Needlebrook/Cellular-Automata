import { Grid } from "./engine/grid.js";
import { Renderer } from "./engine/renderer.js";
import { Simulation } from "./engine/simulation.js";
import { DayAndNightRules } from "./rules/DayAndNightRules.js";
import { ConwayRules } from "./rules/ConwayRules.js";
import { HighLifeRules } from "./rules/HighLifeRules.js";
import { SeedsRules } from "./rules/SeedsRules.js";

const canvas = document.getElementById("canvas");

let isDrawing = false;
let drawMode = 1;

const CELL_SIZE = 15;

const rows = Math.ceil(window.innerHeight / CELL_SIZE);

const cols = Math.ceil(window.innerWidth / CELL_SIZE);

const grid = new Grid(rows, cols);

const rules = new ConwayRules();

const renderer = new Renderer(
    canvas,
    CELL_SIZE,
    rows,
    cols,
    rules
);

const simulation = new Simulation(
    grid,
    renderer,
    rules
);

renderer.draw(simulation.grid);

canvas.addEventListener("mousedown", (event) => {

    if (simulation.running) return;

    isDrawing = true;

    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);

    const current =
        simulation.grid.getCell(row, col);

    drawMode = current ? 0 : 1;

    paintCell(event);
});

canvas.addEventListener("mousemove", (event) => {

    if (!isDrawing) return;

    paintCell(event);
});

window.addEventListener("mouseup", () => {

    isDrawing = false;
});

function paintCell(event) {

    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);

    simulation.grid.setCell(
        row,
        col,
        drawMode
            ? simulation.rules.getPaintState()
            : 0
    );

    renderer.draw(simulation.grid);
}

document
    .getElementById("playBtn")
    .addEventListener("click", () => {
        simulation.start();
    });

document
    .getElementById("pauseBtn")
    .addEventListener("click", () => {
        simulation.stop();
    });

document
    .getElementById("stepBtn")
    .addEventListener("click", () => {
        simulation.step();
    });

document
    .getElementById("clearBtn")
    .addEventListener("click", () => {

        simulation.stop();

        simulation.grid.clear();

        simulation.generation = 0;

        document.getElementById(
            "generationCounter"
        ).textContent =
            "Generation: 0";

        renderer.draw(simulation.grid);
    });

document
    .getElementById("ruleSelect")
    .addEventListener("change", (event) => {

        const selected = event.target.value;

        switch (selected) {

            case "conway":
                simulation.setRules(
                    new ConwayRules()
                );
                break;

            case "highlife":
                simulation.setRules(
                    new HighLifeRules()
                );
                break;

            case "seeds":
                simulation.setRules(
                    new SeedsRules()
                );
                break;

            case "dayandnight":
                simulation.setRules(
                    new DayAndNightRules()
                );
                break;
        }
        simulation.stop();
        simulation.grid.clear();

        simulation.generation = 0;

        document.getElementById(
            "generationCounter"
        ).textContent =
            "Generation: 0";

        renderer.draw(simulation.grid);
    });

    