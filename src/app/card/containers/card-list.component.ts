import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import * as fromRun from '../../run/reducers';
import { CardService } from '../services/card.service';

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styles: [],
})
export class CardListComponent implements OnInit {
    runs$ = this.store.select(fromRun.getAllRuns);
    list$: Observable<
        {
            name: string;
            runs: number;
            wins: number;
            winRate: number;
            pickRate: number;
        }[]
    >;

    constructor(private store: Store<any>, private cardService: CardService) {}

    ngOnInit() {
        this.list$ = this.runs$.pipe(
            map(runs => {
                const cards = this.cardService.getCards(runs);
                return cards.map(card => {
                    const runCount = this.cardService.getRuns(card, runs);
                    const winCount = this.cardService.getWins(card, runs);
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
}
