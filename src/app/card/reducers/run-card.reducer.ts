import { RunActions, RunActionTypes } from '../../run/actions/run.action';
import { Run } from '../../run/models/run.model';
import { RunCard } from '../models/run-card.model';

export interface State {
    runCard: RunCard[];
}

export const initialState: State = {
    runCard: [],
};

export function reducer(state = initialState, action: RunActions): State {
    switch (action.type) {
        case RunActionTypes.Load: {
            return {
                runCard: [...state.runCard, ...concatRuns(action.payload)],
            };
        }
        default: {
            return state;
        }
    }
}

export const getRunCard = (state: State) => state.runCard;

function concatRuns(runs: Run[]): RunCard[] {
    return runs.reduce((arr, run) => [...arr, ...convertRun(run)], []);
}

function convertRun(run: Run): RunCard[] {
    return Object.values(
        run.master_deck.reduce(
            (obj, card) => {
                const { name, upgrade } = this.parseCard(card);
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
