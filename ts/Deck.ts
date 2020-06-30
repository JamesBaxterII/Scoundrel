import { Card } from "./Card";

export class Deck {
    private _cards: Card[];
    
    
    public constructor () {
        this._cards = []

        for (let suit = 0; suit < 4; suit++)
        {
            for (let rank = 2; rank <= 14; rank++)
            {
                this._cards.push(new Card(rank, suit))
            }
        }
    }

    public shuffle (): void
    {
        let rand
        let temp = null

        for(let i = 0; i < this._cards.length; i++ )
        {
            rand = Math.floor(Math.random() * this._cards.length)
            temp = this._cards[i]
            this._cards[i] = this._cards[rand]
            this._cards[rand] = temp
        }
    }

    public draw(): Card
    {
        return <Card> this._cards.shift()
    }

    public _cardsLeft(): number
    {
        return this._cards.length
    }

    public get cards(): Card[] {
        return this._cards;
    }
    public set cards(value: Card[]) {
        this._cards = value;
    }

}