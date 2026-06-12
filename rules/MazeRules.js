export class MazeRules {

    nextState(grid, row, col) {

        const alive =
            grid.getCell(row, col);

        const neighbors =
            grid.countNeighbors(row, col);

        if (alive) {

            return (
                neighbors >= 1 &&
                neighbors <= 5
            ) ? 1 : 0;
        }

        return neighbors === 3 ? 1 : 0;
    }

    getColor(state) {

        return state
            ? "#8B5CF6"
            : "#000000";
    }

    getPaintState() {
        return 1;
    }
}