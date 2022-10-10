import React from 'react';
import LetterBox from './LetterBox';
import LetterEdit from './LetterEdit'

export default class AlphabetEditor extends React.Component {
    allLetters = 'אבגדהוזחטיכלמנסעפצקרשת';

    constructor(props) {
        super(props);

        let lettersArray = props.letters || this.getAllLetters();

        this.state = {
            // e.g. [{letter: 'א', imageUrl: 'https://...'}, ]
            letters: lettersArray,

            editLetterIndex: 0,
        };
    }

    // generate array with all letters object
    getAllLetters() {
        // check letters, create if empty
        let propsLetters = [];
        for (let i=0; i<this.allLetters.length; i++) {
            propsLetters.push({
                letter: this.allLetters.charAt(i),
                imageData: null,
                imageUrl: '',
            });
        }

        return propsLetters;
    }

    letterImageClick(letter) {
        console.log('clicked', letter);
    }

    getLetters() {
        return <div>
            {this.state.letters.map(letterObj => {
                return <LetterBox 
                    letter={letterObj.letter} 
                    imageUrl={letterObj.imageUrl} 
                    onImageClick={e => this.letterImageClick(letterObj.letter)} />
            })}
        </div>
    }

    render() {
        let lettersSection = this.getLetters();
        return <div className="alphabeteditor-wrapper">
            <div className='alphabeteditor-letters'>
                {lettersSection}
            </div>
            <div className='alphabeteditor-letteredit'>
                <LetterEdit wrapperSize="400" 
                    imageData={this.state.letters[this.state.editLetterIndex].imageData} />
            </div>
        </div>
    }

}
