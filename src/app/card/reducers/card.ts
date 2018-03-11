// import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// import { RunActions, RunActionTypes } from '../../run/actions/run.action';
// import { Card } from '../models/card.model';
// import { Run } from '../../run/models/run.model';

// export interface State {
//     ids: string[];
//     entities: { [id: string]: Card };
//     selectedId: string | null;
// }

// export const initialState: State = {
//     ids: [],
//     entities: {},
//     selectedId: null,
// };

// export function reducer(state = initialState, action: RunActions): State {
//     switch (action.type) {
//         case RunActionTypes.Load: {
//             return {
//                 ...addRuns(action.payload, state),
//                 selectedId: state.selectedId,
//             };
//         }
//         default: {
//             return state;
//         }
//     }
// }

// export const getIds = (state: State) => state.ids;
// export const getEntities = (state: State) => state.entities;
// export const getSelectedId = (state: State) => state.selectedId;

// function parseCard(card: string) {
//     const splitted = card.split('+');
//     const name = splitted[0];
//     const upgrade = splitted[1] ? +splitted[1] : 0;
//     return {
//         name,
//         upgrade,
//     };
// }

// function compressDeck(deck: string[]) {
//     return Object.values(
//         deck.reduce(
//             (obj, card) => {
//                 const { name, upgrade } = parseCard(card);
//                 const info = obj[name] || {
//                     count: 0,
//                     maxUpgrade: 0,
//                 };
//                 return {
//                     ...obj,
//                     [name]: {
//                         name,
//                         count: info.count + 1,
//                         maxUpgrade:
//                             info.maxUpgrade > upgrade
//                                 ? info.maxUpgrade
//                                 : upgrade,
//                     },
//                 };
//             },
//             {} as {
//                 [name: string]: {
//                     name: string;
//                     count: number;
//                     maxUpgrade: number;
//                 };
//             },
//         ),
//     );
// }

// function addRuns(runs: Run[], state: State) {
//     runs.reduce((entities, run) => {
//         const deckCompressed = compressDeck(run.master_deck);
//         const deckApplied = deckCompressed.reduce((obj, x) => {
//             const entity: Card = obj[x.name] || {
//                 name: x.name,
//                 run: 0,
//                 win: 0,
//                 choice: 0,
//                 pick: 0,
//                 perCount: {},
//                 perUpgrade: {},
//             };
//             return {
//                 ...obj,
//                 [x.name]: {
//                     name: x.name,
//                     run: entity.run + 1,
//                     win: run.victory ? entity.win + 1 : entity.win,
//                     choice: entity.choice,
//                     pick: entity.pick,
//                     perCount: {
//                         ...entity.perCount,
//                         [x.count]: {
//                             run: entity.perCount[x.count].run + 1,
//                             win: run.victory
//                                 ? entity.perCount[x.count].win + 1
//                                 : entity.perCount[x.count].win,
//                         },
//                     },
//                     perUpgrade: {
//                         ...entity.perUpgrade,
//                         [x.maxUpgrade]: {
//                             run: entity.perUpgrade[x.maxUpgrade].run + 1,
//                             win: run.victory
//                                 ? entity.perUpgrade[x.maxUpgrade].win + 1
//                                 : entity.perUpgrade[x.maxUpgrade].win,
//                         },
//                     },
//                 },
//             };
//         }, entities);
//         const choices = run.card_choices;
//         const choiceApplied = choices.reduce((obj, choice) => {
//             const notPickedApplied = choice.not_picked.reduce((c, x) => {
//                 const entity: Card = obj[x] || {
//                     name: x.name,
//                     run: 0,
//                     win: 0,
//                     choice: 0,
//                     pick: 0,
//                     perCount: {},
//                     perUpgrade: {},
//                 };
//                 return {
//                     ...c,
//                     [x]: {
//                         run: c[x].run
//                     }
//                 }
//             }, obj)
//             return obj;
//         }, deckApplied);
//         return deckApplied;
//     }, state.entities);
//     return state;
// }
