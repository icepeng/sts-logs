import { RunActions, RunActionTypes } from '../../run/actions/run.action';
import { Run } from '../../run/models/run.model';
import { CardActions, CardActionTypes } from '../actions/card.actions';
import { RunCard } from '../models/run-card.model';

export interface State {
    cards: { [name: string]: boolean };
    selectedCard: string | null;
    runCard: RunCard[];
}

export const initialState: State = {
    cards: {},
    selectedCard: null,
    runCard: [],
};

export function reducer(
    state = initialState,
    action: RunActions | CardActions,
): State {
    switch (action.type) {
        case RunActionTypes.Load: {
            return {
                ...state,
                cards: {
                    ...state.cards,
                    ...convertCards(action.payload),
                },
                runCard: [...state.runCard, ...concatRunCard(action.payload)],
            };
        }
        case CardActionTypes.Select: {
            return {
                ...state,
                selectedCard: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}

export const getCards = (state: State) => state.cards;
export const getSelectedCard = (state: State) => state.selectedCard;
export const getRunCard = (state: State) => state.runCard;

function convertCards(runs: Run[]) {
    const cards = {};
    for (const run of runs) {
        for (const card of run.master_deck) {
            const { name } = parseCard(card);
            cards[name] = true;
        }
        for (const choice of run.card_choices) {
            cards[choice.picked] = true;
            for (const x of choice.not_picked) {
                cards[x] = true;
            }
        }
    }
    return cards;
}

function concatRunCard(runs: Run[]): RunCard[] {
    return runs.reduce((arr, run) => [...arr, ...convertRunCard(run)], []);
}

function convertRunCard(run: Run): RunCard[] {
    return Object.values(
        run.master_deck.reduce(
            (obj, card) => {
                const { name, upgrade } = parseCard(card);
                const info = obj[name] || {
                    count: 0,
                    maxUpgrade: 0,
                };
                return {
                    ...obj,
                    [name]: {
                        run: run.play_id,
                        card: name,
                        count: info.count + 1,
                        maxUpgrade:
                            info.maxUpgrade > upgrade
                                ? info.maxUpgrade
                                : upgrade,
                    },
                };
            },
            {} as {
                [card: string]: RunCard;
            },
        ),
    );
}

function parseCard(card: string) {
    const splitted = card.split('+');
    const name = splitted[0];
    const upgrade = splitted[1] ? +splitted[1] : 0;
    return {
        name,
        upgrade,
    };
}
