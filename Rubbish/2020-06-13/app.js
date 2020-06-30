"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Deck_1 = require("./Deck");
var d = new Deck_1.Deck();
d.shuffle();
var card = d.draw();
console.log(card.name);
console.log(card.image);
