export type Path = 'M' | '$' | '?' | 'T' | 'E' | 'BOSS'; // M = Monster, $ = Shop, ? = Unknown, T = Treasure, E = Elite, BOSS = Boss
export type Charater = 'IRONCLAD' | 'THE_SILENT';

export interface CardChoice {
    not_picked: string[];
    picked: string;
}

export interface EventChoice {
    event_name: string;
    player_choice: string;
    floor: number;
    damage_taken: number;
}

export interface DamageTaken {
    damage: number;
    enemies: string;
    floor: number;
    turns: number;
}

export interface Run {
    play_id: string;
    build_version: string;
    character_chosen: Charater;
    gold_per_floor: number[];
    floor_reached: number;
    campfire_rested: number;
    campfire_upgraded: number;
    playtime: number;
    current_hp_per_floor: number[];
    max_hp_per_floor: number[];
    items_purged: string[];
    gold: number;
    score: number;
    is_daily: boolean;
    is_ascension_mode: boolean;
    path_taken: Path[];
    items_purchased: string[];
    purchased_purges: number;
    victory: boolean;
    master_deck: string[];
    relics: string[];
    card_choices: CardChoice[];
    player_experience: number;
    potions_floor_usage: number[];
    damage_taken: DamageTaken[];
    event_choices: EventChoice[];
    boss_relics: any[]; // not used
    potions_floor_spawned: number[];
    seed_played: string;
    killed_by?: string;
    ascension_level: number;
    is_trial: boolean;
}
