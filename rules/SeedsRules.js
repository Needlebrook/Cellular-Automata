export class SeedsRules {

    nextState(grid, row, col) {

        const neighbors =
            grid.countNeighbors(row, col);

        return neighbors === 2 ? 1 : 0;
    }

    getColor(state) {

        return state
            ? "#ff4444"
            : "#000000";
    }

    getPaintState() {
        return 1;
    }
}