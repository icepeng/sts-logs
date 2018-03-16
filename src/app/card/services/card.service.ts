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
}
