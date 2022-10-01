import React from 'react';

export default class LetterBox extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // the hebrew letter
            letter: props.letter || "א",

            // the size of the cipher box
            cipherBoxSize: props.cipherBoxSize || 100,

            // the cipher description
            cipher: {
                // size of the cipher box
                matrixSize: 20, 

                // the filled dots in the cipher map
                dots: [10, 11, 30, 31, 32, 33]
            }
        };
    }

    getDotSize = () => Math.floor(1.0 * this.state.cipherBoxSize / this.state.cipher.matrixSize);

    renderDots() {
        let dotSize = this.getDotSize();
        let dotsAmount = Math.pow(this.state.cipher.matrixSize, 2);
        let dots = [];
        let counter = 0;
        for (let i = 0; i < dotsAmount; i++) {
            let selectedDotClassName = this.state.cipher.dots.includes(counter++) ? "letter-box-cipher-dot-selected" : "";
            let dotStyle = {
                width: dotSize + 'px',
                height: dotSize + 'px',
            };
            dots.push(<div key={`key-${counter}`} style={dotStyle} className={`letter-box-cipher-dot ${selectedDotClassName}`}></div>)
        }

        return dots;
    }    

    render() {
        let dotsWrapperStyles = {
            width: (this.state.cipher.matrixSize * this.getDotSize()) + 'px'
        }
        return <div className="letter-box">
            <div className="letter-box-letter">{this.state.letter}</div>
            <div style={dotsWrapperStyles} className="letter-box-cipher-box-wrapper">{this.renderDots()}</div>
        </div>;
    }
}