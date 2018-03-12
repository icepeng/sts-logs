import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromRunCard from './run-card.reducer';

export interface CardState {
    runCard: fromRunCard.State;
}

export interface State extends fromRoot.State {
    card: CardState;
}

export const reducers = {
    runCard: fromRunCard.reducer,
};

export const getCardState = createFeatureSelector<CardState>('card');

export const getRunCardState = createSelector(
    getCardState,
    state => state.runCard,
);

export const getAllRunCard = createSelector(
    getRunCardState,
    fromRunCard.getRunCard,
);
