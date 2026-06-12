export class ServiettesRules {

    nextState(grid, row, col) {

        const alive =
            grid.getCell(row, col);

        const neighbors =
            grid.countNeighbors(row, col);

        if (alive) {
            return 0;
        }

        return (
            neighbors === 2 ||
            neighbors === 3 ||
            neighbors === 4
        ) ? 1 : 0;
    }

    getColor(state) {

        return state
            ? "#E84D8A"
            : "#000000";
    }

    getPaintState() {
        return 1;
    }
}