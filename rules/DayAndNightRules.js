export class DayAndNightRules {

    nextState(grid, row, col) {

        const alive = grid.getCell(row, col);

        const neighbors =
            grid.countNeighbors(row, col);

        // SURVIVAL
        if (alive) {

            return (
                neighbors === 3 ||
                neighbors === 4 ||
                neighbors === 6 ||
                neighbors === 7 ||
                neighbors === 8
            ) ? 1 : 0;
        }

        // BIRTH
        return (
            neighbors === 3 ||
            neighbors === 6 ||
            neighbors === 7 ||
            neighbors === 8
        ) ? 1 : 0;
    }

    getColor(state) {

        return state
            ? "#66ccff"
            : "#000000";
    }

    getPaintState() {
        return 1;
    }
}