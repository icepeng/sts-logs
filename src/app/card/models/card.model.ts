export interface Card {
    name: string;
    run: number;
    win: number;
    choice: number;
    pick: number;
    perUpgrade: {
        [x: number]: {
            run: number;
            win: number;
        };
    };
    perCount: {
        [x: number]: {
            run: number;
            win: number;
        };
    };
}
