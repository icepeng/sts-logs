import { Injectable } from '@angular/core';

import { Run } from '../../run/models/run.model';

@Injectable()
export class RelicService {
    constructor() {}

    getRelics(runs: Run[]) {
        const relics = {};
        for (const run of runs) {
            for (const relic of run.relics) {
                relics[relic] = true;
            }
        }
        return Object.keys(relics);
    }

    getRuns(name: string, runs: Run[]) {
        return runs.reduce((cnt, run) => {
            if (run.relics.find(relic => relic === name)) {
                return cnt + 1;
            }
            return cnt;
        }, 0);
    }

    getWins(name: string, runs: Run[]) {
        return runs.reduce((cnt, run) => {
            if (run.relics.find(relic => relic === name) && run.victory) {
                return cnt + 1;
            }
            return cnt;
        }, 0);
    }
}
