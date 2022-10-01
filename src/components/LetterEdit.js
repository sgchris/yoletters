import React from 'react';

export default class LetterEdit extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            // size of the matrix
            matrixSize: 30, 

            // wrapper size (width/height.. it's a square) as a parameter
            // (to avoid dealing with sizes calculations)
            wrapperSize: props.wrapperSize || 600,

            // initially filled dots in the cipher map
            selectedBoxes: props.dots || [],
        };
    }

    // when mousedown, all the boxes under mouse move, will be marked
    markMode = false;
    unMarkMode = false;

    markBox(targetEl) {
        const boxNumber = targetEl && targetEl.attributes["letter-edit-box-number"] ? 
            targetEl.attributes["letter-edit-box-number"].value : -1;
        if (boxNumber >= 0 && !this.state.selectedBoxes.includes(boxNumber)) {
            this.state.selectedBoxes.push(boxNumber);
            targetEl.classList.add("letter-edit-box-selected")
            this.setState({
                selectedBoxes: this.state.selectedBoxes
            });
        }
    }

    unMarkBox(targetEl) {
        const boxNumber = targetEl && targetEl.attributes["letter-edit-box-number"] ? 
            targetEl.attributes["letter-edit-box-number"].value : -1;
        if (boxNumber >= 0 && this.state.selectedBoxes.includes(boxNumber)) {
            const pos = this.state.selectedBoxes.indexOf(boxNumber);
            this.state.selectedBoxes.splice(pos, 1);
            targetEl.classList.remove("letter-edit-box-selected")
            this.setState({
                selectedBoxes: this.state.selectedBoxes
            });
        }
    }

    onMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();

        // if left button
        console.log('onMouseDown. e.button', e.button);
        if (e.button === 0) {
            this.markMode = true;
            let selectedBox = e.target.attributes["letter-edit-box-number"].value;
            this.markBox(e.target);
            console.log('onmouseDown', selectedBox, e);
        } else if (e.button == 2) {
            this.unMarkMode = true;
            let selectedBox = e.target.attributes["letter-edit-box-number"].value;
            this.unMarkBox(e.target);
        }
    }
    
    onMouseMove(e) {
        if (this.markMode || this.unMarkMode) {
            console.log("onMouseMove: this.markMode, this.unMarkMode", this.markMode, this.unMarkMode);
            e.preventDefault();
            e.stopPropagation();

            let selectedBox = e.target && e.target.attributes["letter-edit-box-number"] ? 
                e.target.attributes["letter-edit-box-number"].value : -1;
            console.log('selectedBox', selectedBox, 'boxes', this.state.selectedBoxes);
            if (selectedBox >= 0) {
                if (this.markMode) {
                    this.markBox(e.target);
                } else {
                    this.unMarkBox(e.target);
                }
            }
        }
    }

    onMouseUp(e) {
        e.preventDefault();
        e.stopPropagation();

        console.log('onMouseUp. e.button', e.button);
        this.markMode = false;
        this.unMarkMode = false;
    }

    getDotSize = () => Math.floor(1.0 * this.state.wrapperSize / this.state.matrixSize);

    renderBoxes() {
        let dotSize = this.getDotSize();
        let dotsAmount = Math.pow(this.state.matrixSize, 2);
        let dots = [];
        let counter = 0;
        for (let i = 0; i < dotsAmount; i++) {
            let selectedDotClassName = this.state.selectedBoxes.includes(counter++) ? "letter-edit-box-selected" : "";
            let dotStyle = {
                width: dotSize + 'px',
                height: dotSize + 'px',
            };
            dots.push(<div 
                    key={`letter-edit-key-${counter}`} 
                    letter-edit-box-number={counter}
                    style={dotStyle} 
                    className={`letter-edit-box ${selectedDotClassName}`}></div>)
        }

        return dots;
    }

    render() {
        let styles = {
            width: this.state.wrapperSize + 'px'
        };

        return <div 
            onContextMenu={(e)=> e.preventDefault()}
            className="letter-edit" 
            style={styles} 
            onMouseDown={e => this.onMouseDown(e)}
            onMouseMove={e => this.onMouseMove(e)}
            onMouseUp={e => this.onMouseUp(e)}>
            {this.renderBoxes()}
        </div>;
    }
}