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

    // generate array with all letter objects
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

    letterImageClick(letterObj) {
        // find the letter object
        for (let i=0; i<this.state.letters.length; i++) {
            if (this.state.letters[i].letter == letterObj.letter) {
                this.setState({
                    editLetterIndex: i
                });

                break;
            }
        }
    }

    saveImage(imgData, imgUrl) {
        if (!imgData) {
            return;
        }

        try {
            let imgDataObj = JSON.parse(imgData);
            if (!imgDataObj.lines || imgDataObj.lines.length === 0) {
                return;
            }
        } catch {
            console.error('imgData is not parsable', imgData);
            return;
        }
        
        let currentIndex = this.state.editLetterIndex;
        this.setState({
            letters: this.state.letters.map((letterObj, i) => {
                return {
                    letter: letterObj.letter,
                    imageData: (i === currentIndex ? imgData : letterObj.imageData),
                    imageUrl: (i === currentIndex ? imgUrl : letterObj.imageUrl),
                };
            })
        });
    }

    getLetters() {
        return <div>
            {this.state.letters.map(letterObj => {
                return <LetterBox key={letterObj.letter + letterObj.imageUrl}
                    letter={letterObj.letter} 
                    imageUrl={letterObj.imageUrl} 
                    onImageClick={e => this.letterImageClick(letterObj)} />
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
                <LetterEdit key={this.state.editLetterIndex}
                    wrapperSize="400" 
                    letter={this.state.letters[this.state.editLetterIndex].letter}
                    imageData={this.state.letters[this.state.editLetterIndex].imageData}
                    onSave={(imgData, imgUrl) => this.saveImage(imgData, imgUrl)} />
            </div>
        </div>
    }

}
