import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as RunAction from '../actions/run.action';
import { Run } from '../models/run.model';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
})
export class UploadComponent implements OnInit {
    files: FileList;

    constructor(private store: Store<any>, private router: Router) {}

    ngOnInit() {}

    changeFiles(files: FileList) {
        this.files = files;
    }

    async read(file: File): Promise<Run> {
        const reader = new FileReader();
        return new Promise(resolve => {
            reader.onloadend = resolve;
            reader.readAsText(file, 'UTF-8');
        }).then(() => <Run>JSON.parse(reader.result));
    }

    async add() {
        const length = this.files.length;
        const reader = new FileReader();
        const buffer: Promise<Run>[] = [];

        for (let i = 0; i < length; i += 1) {
            const file = this.files.item(i);
            buffer.push(this.read(file));
        }

        const runs = await Promise.all(buffer).then(res =>
            res.filter(x => !!x.score),
        );
        this.store.dispatch(new RunAction.Load(runs));
        this.router.navigate(['runs', 'stat']);
    }
}
