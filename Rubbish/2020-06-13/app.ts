import { Card } from "./Card";
import {Suit} from "./Card";
import { Deck } from "./Deck";

let d = new Deck()
d.shuffle()

let card = d.draw()
console.log(card.name)
console.log(card.image)