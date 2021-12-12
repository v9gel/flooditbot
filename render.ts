import * as PImage from "pureimage"
import * as fs from 'fs'
import { getRandomColor } from "./const";

// make image
const img1 = PImage.make(100, 100, {})

// get canvas context
const ctx = img1.getContext('2d');

for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++) {
        ctx.fillStyle = getRandomColor();
        ctx.fillRect(i*10,j*10,i*10+10,j*10+10);
    }
}

PImage.encodePNGToStream(img1, fs.createWriteStream('out.png')).then(() => {
    console.log("wrote out the png file to out.png");
}).catch((e)=>{
    console.log("there was an error writing");
});