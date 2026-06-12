export class MazectricRules {

    nextState(grid, row, col) {

        const alive =
            grid.getCell(row, col);

        const neighbors =
            grid.countNeighbors(row, col);

        if (alive) {

            return (
                neighbors >= 1 &&
                neighbors <= 4
            ) ? 1 : 0;
        }

        return neighbors === 3 ? 1 : 0;
    }

    getColor(state) {

        return state
            ? "#0fec16"
            : "#000000";
    }

    getPaintState() {
        return 1;
    }
}