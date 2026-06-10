export class HighLifeRules {

    nextState(grid, row, col) {

        const alive = grid.getCell(row, col);
        const neighbors = grid.countNeighbors(row, col);

        if (alive) {
            return neighbors === 2 || neighbors === 3
                ? 1
                : 0;
        }

        return neighbors === 3 || neighbors === 6
            ? 1
            : 0;
    }

    getColor(state) {

        return state
            ? "#ffcc00"
            : "#000000";
    }

    getPaintState() {
        return 1;
    }
}