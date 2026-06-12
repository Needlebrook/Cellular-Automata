export class BriansBrainRules {

    nextState(grid, row, col) {

        const state =
            grid.getCell(row, col);

        let firingNeighbors = 0;

        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {

                if (dr === 0 && dc === 0)
                    continue;

                if (
                    grid.getCell(
                        row + dr,
                        col + dc
                    ) === 1
                ) {
                    firingNeighbors++;
                }
            }
        }

        if (state === 1) {
            return 2;
        }

        if (state === 2) {
            return 0;
        }

        return firingNeighbors === 2
            ? 1
            : 0;
    }

    getColor(state) {

        switch(state) {

            case 1:
                return "#ffffff";

            case 2:
                return "#3399ff";

            default:
                return "#000000";
        }
    }

    getPaintState() {
        return 1;
    }
}