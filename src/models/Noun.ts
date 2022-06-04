import { Words } from './Words';
import { Attribute } from './Attribute';
import { Noun as SBNoun } from 'satzbau';
import { GrammaticalCase } from './GrammaticalCase'


export class Noun implements Words {

  wnoun: SBNoun;
  enoun: string;
  isSpecific = false;
  isPlural = false;
	isNegated = false;
  case: GrammaticalCase;
	allAttributes: Attribute[];


  // TODO: colors: blue man, green neutral, red woman, black plural


  constructor(wnoun: SBNoun, enoun: string) {
    this.wnoun = wnoun;
    this.enoun = enoun;
    this.case = 'nominative';
		this.allAttributes = [];
  }

  specific(): Noun {
    this.isSpecific = true;
    return this;
  }
  unspecific(): Noun {
    this.isSpecific = false;
    return this;
  }

	plural(): Noun {
    this.isPlural = true;
    return this;
  }
	singular(): Noun {
    this.isPlural = false;
    return this;
  }
	accusative(): Noun {
    this.case = 'accusative';
    return this;
  }
	genitive(): Noun {
    this.case = 'genitive';
    return this;
  }
	dative(): Noun {
    this.case = 'dative';
    return this;
  }
	nominative(): Noun {
    this.case = 'nominative';
    return this;
  }
	negated(): Noun {
    this.isNegated = true;
		return this;
	}


	attributes(attributes: Attribute[]) {
		this.allAttributes = attributes;
	}

  renderDE(): string {
    var rNoun = this.wnoun;
    if (this.isNegated) {
      rNoun = rNoun.negated();
    } else if (this.isSpecific) {
      rNoun = rNoun.specific();
    } else {
      rNoun = rNoun.unspecific();
    }

    if (this.isPlural) {
      rNoun = rNoun.plural();
    } else {
      rNoun = rNoun.singular();
    }

    if (this.case === "nominative") {
      rNoun = rNoun.nominative();
    } else if (this.case === "accusative") {
      rNoun = rNoun.accusative();
    } else if (this.case === "dative") {
      rNoun = rNoun.dative();
    } else if (this.case === "genitive") {
      rNoun = rNoun.genitive();
    }
		if (this.allAttributes && this.allAttributes.length > 0) {
			console.log(this.allAttributes);

			rNoun = rNoun.attributes(...this.allAttributes.map((x, _) => x.deWord ));
		}
    return rNoun.write();
  }

  renderEN() : string {
		var attribute = "";
		if (this.allAttributes && this.allAttributes.length > 0) {
			attribute = this.allAttributes.map((x) => x.enWord).join(", ") + " ";
		}

		var article = this.isPlural ? "" : "a";
		if (this.isNegated) {
			article = "no";
		} else if (this.isSpecific) {
			article = "the";
		}

		return article + " "
		  + attribute
      + this.enoun
      + (this.isPlural ? "s" : "");
  }

}
