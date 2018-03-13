import { DamageTaken } from '../../run/models/run.model';

export interface Damage extends DamageTaken {
    run: string;
}

export interface Kill {
    enemy: string;
    run: string;
}
