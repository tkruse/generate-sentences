import { sentence } from 'satzbau';
import { Noun } from '../nouns/Noun';
import { Sentence } from './Sentence';



export class ThisIsA implements Sentence {
  noun : Noun;
  constructor(noun: Noun) {
    this.noun = noun;
  }

  renderDE(): string {
    const sentenceDE = sentence`Das ist ${this.noun.unspecific().renderDE()}`;
    return sentenceDE.write();
  }
  renderEN() : string {
    return "This is " + this.noun.unspecific().renderEN();
  }
}
