import { Grid } from "./engine/grid.js";
import { Renderer } from "./engine/renderer.js";
import { Simulation } from "./engine/simulation.js";
import { DayAndNightRules } from "./rules/DayAndNightRules.js";
import { ConwayRules } from "./rules/ConwayRules.js";
import { HighLifeRules } from "./rules/HighLifeRules.js";
import { SeedsRules } from "./rules/SeedsRules.js";
import { BriansBrainRules } from "./rules/BriansBrainRules.js";
import { MazeRules } from "./rules/MazeRules.js";
import { MazectricRules } from "./rules/MazectricRules.js";
import { ReplicatorRules } from "./rules/ReplicatorRules.js";
import { ServiettesRules } from "./rules/ServiettesRules.js";

const canvas = document.getElementById("canvas");

let isDrawing = false;
let drawMode = 1;

const CELL_SIZE = 15;

const cols = Math.ceil(window.innerWidth / CELL_SIZE);

const rows = Math.ceil(window.innerHeight / CELL_SIZE);

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

canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();

    if (simulation.running) return;

    isDrawing = true;

    const touch = e.touches[0];

    paintTouch(touch);
});

canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();

    if (!isDrawing) return;

    const touch = e.touches[0];

    paintTouch(touch);
});

canvas.addEventListener("touchend", () => {
    isDrawing = false;
});

function paintTouch(touch) {

    const rect = canvas.getBoundingClientRect();

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

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

if (window.innerWidth < 768) {

    document
        .getElementById("generalInfoBox")
        .classList.add("minimized");

    document
        .getElementById("ruleInfoBox")
        .classList.add("minimized");

    document
        .querySelectorAll(".toggle-btn")
        .forEach(btn => {
            btn.textContent = "►";
        });
}

window.addEventListener("resize", () => {
    location.reload();
});

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

            case "briansbrain":
                simulation.setRules(
                    new BriansBrainRules()
                );
                break;
            case "maze":
                simulation.setRules(
                    new MazeRules()
                );
                break;          
            case "mazectric":
                simulation.setRules(
                    new MazectricRules()
                );
                break;
            case "replicator":
                simulation.setRules(
                    new ReplicatorRules()
                );
                break;
            case "serviettes":
                simulation.setRules(
                    new ServiettesRules()
                );
                break;
        }

        updateRuleInfo(selected);

        simulation.stop();
        simulation.grid.clear();

        simulation.generation = 0;

        document.getElementById(
            "generationCounter"
        ).textContent =
            "Generation: 0";

        renderer.draw(simulation.grid);
    });

function makeDraggable(boxId) {

    const box =
        document.getElementById(boxId);

    const header =
        box.querySelector(".info-header");

    let dragging = false;

    let offsetX = 0;
    let offsetY = 0;

    header.addEventListener(
        "mousedown",
        (e) => {

            dragging = true;

            offsetX =
                e.clientX -
                box.offsetLeft;

            offsetY =
                e.clientY -
                box.offsetTop;
        }
    );

    document.addEventListener(
        "mousemove",
        (e) => {

            if (!dragging) return;

            box.style.left =
                `${e.clientX - offsetX}px`;

            box.style.top =
                `${e.clientY - offsetY}px`;

            box.style.right =
                "auto";

            box.style.bottom =
                "auto";
        }
    );

    document.addEventListener(
        "mouseup",
        () => {

            dragging = false;
        }
    );
}

makeDraggable("generalInfoBox");
makeDraggable("ruleInfoBox");
document
    .querySelectorAll(".toggle-btn")
    .forEach(btn => {

        btn.addEventListener(
            "click",
            () => {

                const box =
                    btn.closest(
                        ".info-box"
                    );

                box.classList.toggle(
                    "minimized"
                );

                btn.textContent =
                    box.classList.contains(
                        "minimized"
                    )
                        ? "►"
                        : "▼";
            }
        );
    });

window.addEventListener("load", () => {

    const intro =
        document.getElementById("intro-screen");

    setTimeout(() => {

        intro.classList.add("hidden");

        setTimeout(() => {
            intro.remove();
        }, 1000);

    }, 3200);
});

const ruleInfo = {

    conway: {
        title: "Conway's Game of Life (B3/S23)",
        content: `
            <p>
            Created by mathematician John Conway in 1970,
            this is the most famous cellular automaton.
            </p>

            <p>
            Cells live, die, and reproduce based on the
            number of neighbours surrounding them.
            From these simple rules emerge surprisingly
            complex behaviours.
            </p>

            <p>
            Watch for moving gliders, blinking oscillators,
            and stable structures that can survive forever.
            </p>

            <p>
            Recommended pattern: Try drawing a
            random cluster and see what survives.
            </p>
        `
    },

    highlife: {
        title: "HighLife (B36/S23)",
        content: `
            <p>
            HighLife is a close relative of Conway's Life,
            but with one additional birth rule.
            </p>

            <p>
            That small change allows the automaton to
            create structures that can copy themselves.
            </p>

            <p>
            Some patterns repeatedly reproduce,
            creating entire colonies from a single seed.
            </p>

            <p>
            Recommended pattern: Draw the
            Replicator pattern to watch self-copying
            behaviour emerge.

            <pre>
            ⬛⬛🟨🟨🟨
            ⬛🟨⬛⬛🟨
            🟨⬛⬛⬛🟨
            🟨⬛⬛🟨⬛
            🟨🟨🟨⬛⬛
            </pre>
            </p>
        `
    },

    seeds: {
        title: "Seeds (B2/S)",
        content: `
            <p>
            Every living cell dies after one generation.
            </p>

            <p>
            New cells constantly appear while old ones
            disappear, producing explosive growth.
            </p>

            <p>
            The result is chaotic, energetic, and
            unpredictable in comparison to Conway's Life.
            </p>

            <p>
            Recommended pattern: Draw a dense cluster
            and watch it burst outward.
            </p>
        `
    },

    dayandnight: {
        title: "Day & Night (B3678/S34678)",
        content: `
            <p>
            Day & Night is known for creating large,
            smooth, organic-looking structures.
            </p>

            <p>
            One of its unusual properties is symmetry:
            swapping living and dead cells often produces
            similar behaviour.
            </p>

            <p>
            It frequently develops islands, blobs,
            and slowly evolving landscapes.
            </p>

            <p>
            Recommended pattern: Draw several scattered
            clusters and watch them merge together.
            </p>
        `
    },

    briansbrain: {
        title: "Brian's Brain",
        content: `
            <p>
            Inspired by the behaviour of neurons,
            Brian's Brain uses three cell states:
            resting, firing, and recovering.
            </p>

            <p>
            Instead of stable structures, it creates
            constantly moving waves of activity.
            </p>

            <p>
            Patterns rarely settle down and often
            resemble electrical signals travelling
            across a circuit.
            </p>

            <p>
            Recommended pattern: Draw a 2×2 block
            or a short line and press Play.
            <pre>
            ⬛⬛⬛⬛
            ⬛⬜⬜⬛
            ⬛⬜⬜⬛
            ⬛⬛⬛⬛
            </pre>
            </p>
        `
    },

    maze: {
        title: "Maze (B3/S12345)",
        content: `
            <p>
            As its name suggests, this automaton
            naturally forms maze-like corridors.
            </p>

            <p>
            Starting from random shapes, the system
            grows winding passages and walls until
            it reaches a stable state.
            </p>

            <p>
            The final result often resembles a
            hand-drawn labyrinth.
            </p>

            <p>
            Recommended pattern: Draw a random blob
            and watch a maze emerge.
            </p>
        `
    },

    mazectric: {
        title: "Mazectric (B3/S1234)",
        content: `
            <p>
            Mazectric is a variation of Maze that
            produces thinner, sharper structures.
            </p>

            <p>
            Instead of thick corridors, it tends
            to create branching networks and
            lightning-like pathways.
            </p>

            <p>
            Many people compare its appearance
            to electrical circuits.
            </p>

            <p>
            Recommended pattern: Draw a large cluster
            and observe the branching patterns.
            </p>
        `
    },

    replicator: {
        title: "Replicator (B1357/S1357)",
        content: `
            <p>
            Replicator is famous for producing
            self-copying structures.
            </p>

            <p>
            Simple patterns repeatedly duplicate
            themselves, creating larger and larger
            arrangements over time.
            </p>

            <p>
            The resulting growth often resembles
            fractals and geometric artwork.
            </p>

            <p>
            Recommended pattern: Draw a diagonal line
            and watch copies spread across the grid.
            <pre>
            ⬛⬛⬛⬛🟧
            ⬛⬛⬛🟧⬛
            ⬛⬛🟧⬛⬛
            ⬛🟧⬛⬛⬛
            🟧⬛⬛⬛⬛
            </pre>
            </p>
        `
    },

    serviettes: {
        title: "Serviettes (B234/S)",
        content: `
            <p>
            Serviettes creates beautiful fractal
            patterns similar to snowflakes,
            lace, and paper cut-outs.
            </p>

            <p>
            Growth spreads outward in highly
            symmetrical ways, producing intricate
            geometric designs.
            </p>

            <p>
            Unlike Conway's Life, the focus here
            is not moving objects but the formation
            of large-scale patterns.
            </p>

            <p>
            Recommended pattern: Draw a diagonal line
            or single cluster and watch the fractal
            expand.
            <pre>
            ⬛⬛⬛⬛🟥
            ⬛⬛⬛🟥⬛  
            ⬛⬛🟥⬛⬛
            ⬛🟥⬛⬛⬛ 
            🟥⬛⬛⬛⬛  
            </pre>
            </p>
        `
    }
};

updateRuleInfo("conway");

function updateRuleInfo(rule) {

    const info =
        ruleInfo[rule];

    document.getElementById(
        "ruleTitle"
    ).textContent =
        info.title;

    document.getElementById(
        "ruleContent"
    ).innerHTML =
        info.content;
}

const tipBox =
    document.getElementById("tipBox");

const closeTipBtn =
    document.getElementById("closeTipBtn");

if (!sessionStorage.getItem("tipDismissed")) {

    setTimeout(() => {

        tipBox.style.left = "350px";
        tipBox.style.top = "500px";

        tipBox.classList.add("visible");

    }, 3000);
}

closeTipBtn.addEventListener(
    "click",
    () => {

        tipBox.classList.remove("visible");

        sessionStorage.setItem(
            "tipDismissed",
            "true"
        );
    }
);

