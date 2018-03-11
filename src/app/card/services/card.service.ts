import { Injectable } from '@angular/core';
import { Run } from '../../run/models/run.model';

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

    private compressDeck(deck: string[]) {
        return deck.reduce(
            (obj, card) => {
                const { name, upgrade } = this.parseCard(card);
                const info = obj[name] || {
                    count: 0,
                    maxUpgrade: 0,
                };
                return {
                    ...obj,
                    [name]: {
                        name,
                        count: info.count + 1,
                        maxUpgrade:
                            info.maxUpgrade > upgrade
                                ? info.maxUpgrade
                                : upgrade,
                    },
                };
            },
            {} as {
                [name: string]: {
                    name: string;
                    count: number;
                    maxUpgrade: number;
                };
            },
        );
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

    getRuns(name: string, runs: Run[]) {
        return runs.reduce((cnt, run) => {
            const deckInfo = this.compressDeck(run.master_deck);
            if (deckInfo[name]) {
                return cnt + 1;
            }
            return cnt;
        }, 0);
    }

    getWins(name: string, runs: Run[]) {
        return runs.reduce((cnt, run) => {
            const deckInfo = this.compressDeck(run.master_deck);
            if (deckInfo[name] && run.victory) {
                return cnt + 1;
            }
            return cnt;
        }, 0);
    }

    getChoices(name: string, runs: Run[]) {
        return runs.reduce((cnt, run) => {
            const choices = run.card_choices;
            return (
                cnt +
                choices.reduce((sum, choice) => {
                    if (choice.picked === name) {
                        return sum + 1;
                    }
                    if (choice.not_picked.find(x => x === name)) {
                        return sum + 1;
                    }
                    return sum;
                }, 0)
            );
        }, 0);
    }

    getPicks(name: string, runs: Run[]) {
        return runs.reduce((cnt, run) => {
            const choices = run.card_choices;
            return (
                cnt +
                choices.reduce((sum, choice) => {
                    if (choice.picked === name) {
                        return sum + 1;
                    }
                    return sum;
                }, 0)
            );
        }, 0);
    }
}
