import React from 'react';

import AlphabetEditor from './AlphabetEditor';
import TopTabs from './TopTabs';
import WriteText from './WriteText'


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "alphabet",
            
            // the letters with their images
            letters: null,
        };
    }

    letterUpdatedTimes = 1;

    onTabChange(tabName) {
        this.setState({
            selectedTab: tabName,
        });
    }

    onLettersUpdate(newLetters) {
        console.log('main: onLettersUpdate', newLetters);
        this.letterUpdatedTimes++;
        this.setState({
            letters: newLetters,
        });
    }

    render() {
        let alphabetEditorTabStyles = {
            overflow: "hidden",
            display: this.state.selectedTab == "alphabet" ? "block" : "none",
        };

        let writeTabStyles = {
            overflow: "hidden",
            display: this.state.selectedTab == "write" ? "block" : "none",
        };

        return <div>
            <TopTabs onTabChange={tabName => this.onTabChange(tabName)} />
            <br/>
            <div style={alphabetEditorTabStyles}>
                <AlphabetEditor 
                    letters={this.state.letters} 
                    onLettersUpdate={newLetters => this.onLettersUpdate(newLetters)} />
            </div>
            <div style={writeTabStyles}>
                <WriteText key={'writeTextKey' + this.letterUpdatedTimes} letters={this.state.letters} />
            </div>
        </div>;
    }
}