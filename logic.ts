import { Colors, getRandomColor, MAX_STEPS, SIZE, getRandomEmoji } from "./const";

export type Box = {
    top?: Box;
    bottom?: Box;
    left?: Box;
    right?: Box;
    color: Colors;
    coords: [number, number];
};

const getField = (size: number, useEmoji: boolean) => {
    const field: Box[][] = [];

    for (let i = 0; i < size; i++) {
        field[i] = [];
        for (let j = 0; j < size; j++) {
            field[i][j] = {
                coords: [i, j],
                color: useEmoji ? getRandomEmoji() : getRandomColor(),
            };
        }
    }
    
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            Object.assign(field[i][j], {
                top: i === 0 ? undefined : field[i-1][j],
                bottom: i === size - 1 ? undefined : field[i+1][j],
                left: j === 0 ? undefined : field[i][j-1],
                right: j === size - 1 ? undefined : field[i][j+1],
            });
        }
    }

    return field;
}

export class Tree {
    private root: Box;
    private activeColor: Colors;
    private field: Box[][];
    private score: number;

    constructor(options: {useEmoji: boolean, size?: number}) {
        const field = getField(options.size || SIZE, options.useEmoji);

        this.root = field[0][0];
        this.field = field;
        this.activeColor = field[0][0].color;
        this.score = 0;
    }

    getField() {
        return this.field;
    }

    getScore() {
        return this.score;
    }

    paintActive(color: Colors) {
        if (this.root.color === color) {
            return;
        }

        this.score++;

        this.paintRecursive(this.root, color);

        this.activeColor = color;
    }

    private paintRecursive(box: Box, color: Colors) {
        if (box.color !== this.activeColor) {
            return;
        }

        box.color = color;

        if (box.left) {
            this.paintRecursive(box.left, color);
        }

        if (box.top) {
            this.paintRecursive(box.top, color);
        }

        if (box.bottom) {
            this.paintRecursive(box.bottom, color);
        }

        if (box.right) {
            this.paintRecursive(box.right, color);
        }
    }
}

export const GameStep = (tree: Tree, color: Colors) => {
    if (tree.getScore() === MAX_STEPS) {
        return false;
    }

    return tree.paintActive(color);
}