export const SIZE: number = 8;
export const MAX_STEPS:number = Math.round(SIZE * 1.78);

export type Colors = string;

export const COLORS = [
    '#D50000',
    '#AA00FF',
    '#304FFE',
    '#00C853',
    '#FFAB00',
    '#795548',
    '#000000',
    '#FFFFFF'
];

export const EMOJIS = [
    '🟥','🟧','🟨','🟩','🟦','🟪','⬛️','⬜️','🟫',
];

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export const getRandomColor = () => {
    return COLORS[getRandomInt(COLORS.length)];
}

export const getRandomEmoji = () => {
    return EMOJIS[getRandomInt(EMOJIS.length)];
}