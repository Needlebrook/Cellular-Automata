# Cellular Automata Simulator

An interactive browser-based simulator for exploring **cellular automata** and observing how simple local rules can produce complex patterns and behaviours.

The simulator provides an interactive grid where users can draw initial configurations, select different cellular automata rules, and watch them evolve generation by generation.

**This Project was built in June 2025 as a Computer Science project exploring simulation engines, cellular automata, modular JavaScript, and interactive visualization.**

Available at [this link](https://cellular-automata-green.vercel.app/)

## 📚 Inspiration

Cellular automata demonstrate how relatively simple local interactions can produce complex global behaviour.

This project was created as an interactive way to explore that idea by allowing users to directly construct patterns, select different rule systems, and observe their evolution.


## 🌟 Features

 🧩 **Interactive Grid**

  * Draw and erase cells directly using the mouse or touch input.
  * Create custom starting configurations and experiment with different patterns.

 ▶️ **Simulation Controls**

  * Play and pause the simulation.
  * Advance one generation at a time using Step.
  * Clear the grid and reset the generation counter.

 🔢 **Generation Counter**

  * Tracks the current generation as the simulation evolves.

 🔄 **Multiple Cellular Automata**

  * Conway's Game of Life
  * HighLife
  * Seeds
  * Day & Night
  * Brian's Brain
  * Maze
  * Mazectric
  * Replicator
  * Serviettes

 📖 **Rule-Specific Information**

  * Each automaton has its own collapsible information box.
  * Provides a short explanation of the automaton, its rules, behaviour, and suggested patterns to try.
  * Information boxes can be expanded, minimized, and dragged around the interface.

 💡 **Interactive Tips**

  * Contextual tips introduce users to interacting with the simulator.

 📱 **Responsive Interface**

  * Designed to work on both desktop and mobile screens.
  * Supports touch-based drawing on mobile devices.

 🎨 **Visual Pattern Exploration**

  * Observe stable structures, oscillators, moving patterns, fractal growth, waves, and other emergent behaviour.

## 🧬 Included Automata

| Automaton                 | Rule         | Description                                                                     |
| ------------------------- | ------------ | ------------------------------------------------------------------------------- |
| **Conway's Game of Life** | B3/S23       | Produces gliders, oscillators, stable structures, and other complex behaviours. |
| **HighLife**              | B36/S23      | A Life variant capable of producing self-replicating patterns.                  |
| **Seeds**                 | B2/S         | Produces rapid and explosive growth with no survival conditions.                |
| **Day & Night**           | B3678/S34678 | A symmetric automaton capable of producing large, organic-looking structures.   |
| **Brian's Brain**         | —            | A three-state automaton producing constantly moving waves and patterns.         |
| **Maze**                  | B3/S12345    | Tends to develop maze-like corridors and structures.                            |
| **Mazectric**             | B3/S1234     | A Maze variant that produces thinner, branching structures.                     |
| **Replicator**            | B1357/S1357  | Produces repeating and self-copying geometric structures.                       |
| **Serviettes**            | B234/S       | Produces intricate, fractal-like and lace-like patterns.                        |

## 📐 Understanding B/S Notation

Most of the automata in the simulator use **B/S notation** to describe their rules.

* **B** = Birth conditions
* **S** = Survival conditions

For example:

**B3/S23**

means:

* A dead cell becomes alive when it has exactly **3 neighbours**.
* A living cell survives when it has **2 or 3 neighbours**.
* Otherwise, the cell becomes or remains dead.

This notation makes it possible to describe many different cellular automata using a simple set of rules.

> Brian's Brain is an exception because it uses three states rather than the standard binary alive/dead model.

## 🖱️ How to Use

### 1. Draw a Pattern

Use the mouse to click and drag across the grid to create living cells.

On mobile devices, use your finger to draw directly on the grid.

### 2. Select an Automaton

Use the automaton selector to choose a rule.

The information panel on the right provides an explanation of the selected automaton.

### 3. Start the Simulation

Press **Play** to begin the simulation.

The grid will update one generation at a time according to the selected rules.

### 4. Experiment

Try different starting configurations and compare how the same pattern behaves under different rules.

You can also use **Step** to examine the evolution one generation at a time.

## 🏗️ Project Structure

The simulator is organized into separate components so that new cellular automata can be added without rewriting the simulation engine.

```text
cellular-automata-simulator/
│
├── index.html
├── style.css
├── main.js
├── readme.md
│
├── engine/
│   ├── grid.js
│   ├── renderer.js
│   └── simulation.js
│
└── rules/
    ├── ConwayRules.js
    ├── HighLifeRules.js
    ├── SeedsRules.js
    ├── DayAndNightRules.js
    ├── BriansBrainRules.js
    ├── MazeRules.js
    ├── MazectricRules.js
    ├── ReplicatorRules.js
    └── ServiettesRules.js
```

### Engine

The engine contains the reusable components responsible for running the simulation.

**Grid**

Manages the cells and their states.

**Renderer**

Draws the current grid state onto the canvas.

**Simulation**

Controls generations, simulation updates, starting/stopping the simulation, and interaction between the grid, renderer, and selected rule system.

### Rules

Each cellular automaton is implemented as its own rule class.

This separation makes the simulator extensible: additional automata can be added by implementing another rule system without changing the core simulation engine.

## 🏗️ Architecture

The project follows a modular architecture:

```text
             ┌───────────────┐
             │   User Input  │
             │ Mouse / Touch │
             └───────┬───────┘
                     │
                     ▼
              ┌─────────────┐
              │    Grid     │
              └──────┬──────┘
                     │
                     ▼
              ┌─────────────┐
              │    Rules    │
              └──────┬──────┘
                     │
                     ▼
              ┌─────────────┐
              │ Simulation  │
              └──────┬──────┘
                     │
                     ▼
              ┌─────────────┐
              │  Renderer   │
              └──────┬──────┘
                     │
                     ▼
                  Canvas
```

The **Grid**, **Simulation**, **Renderer**, and **Rules** are kept separate so that the underlying simulation framework can be reused with different rule systems.

## 🛠️ Technologies

* **HTML5**
* **CSS3**
* **JavaScript (ES Modules)**
* **HTML Canvas**
* **Vercel** for deployment

No frontend framework is required; the application is built using native browser technologies and modular JavaScript.

## 🏃‍♀️‍➡️ Running Locally

Clone the repository:

```bash
git clone Cellular_Automata
```

Navigate into the project:

```bash
cd cellular-automata-simulator
```

Because the project uses JavaScript modules, run it through a local development server rather than opening `index.html` directly.

For example, using VS Code with **Live Server**:

1. Open the project in VS Code.
2. Install the Live Server extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**. The application will open in your browser.

## 🌐 Deployment

The simulator is deployed using **Vercel**.

The application is entirely client-side, so deployment does not require a backend server or database.

## 🎯 Project Goals

The main goal of this project is to provide an accessible way to experiment with cellular automata while demonstrating how a reusable simulation engine can support multiple rule systems.

Rather than implementing each automaton as a separate application, the project separates the **simulation engine** from the **rules**, allowing different cellular automata to operate within the same framework.

## 🔮 Future Improvements

Possible future additions include:

* Pattern library with predefined patterns
* Save and load custom patterns
* Export and import patterns as JSON
* More cellular automata rule sets
* Custom rule creation
* Adjustable simulation speed
* Grid and cell-size controls
* Pattern sharing
* Additional visualization themes