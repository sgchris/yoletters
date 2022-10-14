import React from 'react';

export default class LetterBox extends React.Component {
    defaultImageUrl = "https://via.placeholder.com/100";
    
    constructor(props) {
        super(props);

        this.onImageClick = props.onImageClick || function(){};
        
        this.state = {
            // the hebrew letter
            letter: props.letter || "א",

            isSelected: props.isSelected || false,

            // the image
            imageUrl: props.imageUrl || this.defaultImageUrl,

            imageHeight: props.imageHeight || 100,
        };
    }

    render() {
        const letterBoxSelectedClassName = this.state.isSelected ? 'letter-box-selected' : '';
        return <div className={`letter-box ${letterBoxSelectedClassName}`}>
            <div className="letter-box-letter">{this.state.letter}</div>
            <div className="letter-box-image" onClick={e => this.onImageClick()}>
                <img alt={this.state.imageUrl} 
                    src={this.state.imageUrl} 
                    height={this.state.imageHeight} />
            </div>
        </div>;
    }
}