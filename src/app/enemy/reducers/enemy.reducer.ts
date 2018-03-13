import { EnemyActions, EnemyActionTypes } from '../actions/enemy.actions';
import { RunActions, RunActionTypes } from '../../run/actions/run.action';
import { Run, DamageTaken } from '../../run/models/run.model';

export interface State {
    enemies: { [name: string]: boolean };
    selectedEnemy: string | null;
    damages: (DamageTaken & { run: string })[];
    kills: { enemy: string; run: string }[];
}

export const initialState: State = {
    enemies: {},
    selectedEnemy: null,
    damages: [],
    kills: [],
};

export function reducer(
    state = initialState,
    action: RunActions | EnemyActions,
): State {
    switch (action.type) {
        case RunActionTypes.Load: {
            return {
                ...state,
                enemies: {
                    ...state.enemies,
                    ...convertEnemies(action.payload),
                },
                damages: [...state.damages, ...convertDamages(action.payload)],
                kills: [...state.kills, ...convertKills(action.payload)],
            };
        }
        case EnemyActionTypes.Select: {
            return {
                ...state,
                selectedEnemy: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}

export const getEnemies = (state: State) => state.enemies;
export const getSelectedEnemy = (state: State) => state.selectedEnemy;
export const getDamages = (state: State) => state.damages;
export const getKills = (state: State) => state.kills;

function convertEnemies(runs: Run[]) {
    const enemies = {};
    for (const run of runs) {
        for (const damage of run.damage_taken) {
            const name = damage.enemies;
            enemies[name] = true;
        }
    }
    return enemies;
}

function convertDamages(runs: Run[]) {
    return runs.reduce(
        (arr, run) => [
            ...arr,
            ...run.damage_taken.map(x => ({ ...x, run: run.play_id })),
        ],
        [],
    );
}

function convertKills(runs: Run[]) {
    return runs
        .filter(x => !!x.killed_by)
        .reduce(
            (arr, run) => [...arr, { run: run.play_id, enemy: run.killed_by }],
            [],
        );
}
