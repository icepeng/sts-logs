import { Injectable } from '@angular/core';
import { Run } from '../../run/models/run.model';
import { RunCard } from '../models/run-card.model';

@Injectable()
export class CardService {
    constructor() {}

    private parseCard(card: string) {
        const splitted = card.split('+');
        const name = splitted[0];
        const upgrade = splitted[1] ? +splitted[1] : 0;
        return {
            name,
            upgrade,
        };
    }

    getCards(runs: Run[]) {
        const cards = {};
        for (const run of runs) {
            for (const card of run.master_deck) {
                const { name } = this.parseCard(card);
                cards[name] = true;
            }
            for (const choice of run.card_choices) {
                cards[choice.picked] = true;
                for (const x of choice.not_picked) {
                    cards[x] = true;
                }
            }
        }
        return Object.keys(cards);
    }

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
