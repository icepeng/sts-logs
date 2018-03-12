import { Injectable } from '@angular/core';
import { Run } from '../../run/models/run.model';
import { RunCard } from '../models/run-card.model';

@Injectable()
export class CardService {
    constructor() {}

    getRuns(name: string, runCard: RunCard[]) {
        return runCard.filter(x => x.card === name).length;
    }

    getWins(
        name: string,
        runCard: RunCard[],
        runEntities: { [id: string]: Run },
    ) {
        return runCard.filter(
            x => x.card === name && runEntities[x.run].victory,
        ).length;
    }

    getChoices(name: string, runs: Run[]) {
        return runs.reduce(
            (cnt, run) =>
                cnt +
                run.card_choices.filter(
                    choice =>
                        choice.picked === name ||
                        choice.not_picked.find(x => x === name),
                ).length,
            0,
        );
    }

    getPicks(name: string, runs: Run[]) {
        return runs.reduce(
            (cnt, run) =>
                cnt +
                run.card_choices.filter(choice => choice.picked === name)
                    .length,
            0,
        );
    }

    getRunsByCount(
        card: string,
        runCard: RunCard[],
    ): { name: string; value: number }[] {
        return Object.entries(
            runCard.filter(x => x.card === card).reduce(
                (obj, x) => {
                    const item = obj[x.count] || 0;
                    return {
                        ...obj,
                        [x.count]: item + 1,
                    };
                },
                {} as { [count: number]: number },
            ),
        ).map(([name, value]) => ({ name, value }));
    }

    getWinrateByCount(
        card: string,
        runCard: RunCard[],
        runEntities: { [id: string]: Run },
    ): { name: string; value: number }[] {
        return Object.entries(
            runCard.filter(x => x.card === card).reduce(
                (obj, x) => {
                    const item = obj[x.count] || { run: 0, win: 0 };
                    return {
                        ...obj,
                        [x.count]: {
                            run: item.run + 1,
                            win: runEntities[x.run].victory
                                ? item.win + 1
                                : item.win,
                        },
                    };
                },
                {} as { [count: number]: { run: number; win: number } },
            ),
        ).map(([name, x]) => ({ name, value: x.win / x.run }));
    }

    getRunsByUpgrade(
        card: string,
        runCard: RunCard[],
    ): { name: string; value: number }[] {
        return Object.entries(
            runCard.filter(x => x.card === card).reduce(
                (obj, x) => {
                    const item = obj[x.maxUpgrade] || 0;
                    return {
                        ...obj,
                        [x.maxUpgrade]: item + 1,
                    };
                },
                {} as { [upgrade: number]: number },
            ),
        ).map(([name, value]) => ({ name, value }));
    }

    getWinrateByUpgrade(
        card: string,
        runCard: RunCard[],
        runEntities: { [id: string]: Run },
    ): { name: string; value: number }[] {
        return Object.entries(
            runCard.filter(x => x.card === card).reduce(
                (obj, x) => {
                    const item = obj[x.maxUpgrade] || { run: 0, win: 0 };
                    return {
                        ...obj,
                        [x.maxUpgrade]: {
                            run: item.run + 1,
                            win: runEntities[x.run].victory
                                ? item.win + 1
                                : item.win,
                        },
                    };
                },
                {} as { [upgrade: number]: { run: number; win: number } },
            ),
        ).map(([name, x]) => ({ name, value: x.win / x.run }));
    }
}
