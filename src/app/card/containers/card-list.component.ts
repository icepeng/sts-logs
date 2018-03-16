import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, combineLatest, withLatestFrom } from 'rxjs/operators';

import * as fromRun from '../../run/reducers';
import * as fromCard from '../reducers';
import * as CardAction from '../actions/card.actions';
import { CardService } from '../services/card.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styles: [
        `
    .card-chart {
        width: 100%;
        height: 240px;
    }`,
    ],
})
export class CardListComponent implements OnInit {
    list$: Observable<
        {
            name: string;
            runs: number;
            wins: number;
            winRate: number;
            pickRate: number;
        }[]
    >;
    selected$ = new BehaviorSubject<string | null>(null);
    runCard$ = this.store.select(fromCard.getAllRunCard);
    runEntities$ = this.store.select(fromRun.getRunEntities);

    constructor(private store: Store<any>, private cardService: CardService) {}

    ngOnInit() {
        this.list$ = this.store.select(fromRun.getAllRuns).pipe(
            combineLatest(
                this.store.select(fromRun.getRunEntities),
                this.store.select(fromCard.getCardEntities),
                this.store.select(fromCard.getAllRunCard),
            ),
            map(([runs, runEntities, cardEntities, runCard]) => {
                const cards = Object.keys(cardEntities);
                return cards.map(card => {
                    const runCount = this.cardService.getRuns(card, runCard);
                    const winCount = this.cardService.getWins(
                        card,
                        runCard,
                        runEntities,
                    );
                    const choiceCount = this.cardService.getChoices(card, runs);
                    const pickCount = this.cardService.getPicks(card, runs);
                    return {
                        name: card,
                        runs: runCount,
                        wins: winCount,
                        winRate: runCount > 0 ? winCount / runCount : 0,
                        pickRate: choiceCount > 0 ? pickCount / choiceCount : 0,
                    };
                });
            }),
        );
    }

    select(item: any) {
        this.store.dispatch(new CardAction.Select(item));
    }
}
