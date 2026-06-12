export class ReplicatorRules {

    nextState(grid, row, col) {

        const neighbors =
            grid.countNeighbors(row, col);

        return (
            neighbors === 1 ||
            neighbors === 3 ||
            neighbors === 5 ||
            neighbors === 7
        ) ? 1 : 0;
    }

    getColor(state) {

        return state
            ? "#F97316"
            : "#000000";
    }

    getPaintState() {
        return 1;
    }
}