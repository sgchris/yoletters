import React from 'react';

export default class TopTabs extends React.Component {
    constructor(props) {
        super(props);

        this.onTabChange = props.onTabChange || function(){};
        
        this.state = {
            // the hebrew letter
            selectedTab: "alphabet", // "write", "alphabet"
        };
    }

    tabClick(tabName) {
        // callback
        this.onTabChange(tabName);

        this.setState({
            selectedTab: tabName
        });
    }

    render() {
        return <div>
        <ul  dir="rtl" className="nav nav-tabs pull-right">
            <li className="nav-item">
                <a className={'nav-link ' + (this.state.selectedTab == "alphabet" ? "active" : "")} 
                    onClick={e => this.tabClick("alphabet")}
                    href="#">עדכון אלף-בית</a>
            </li>
            <li className="nav-item">
                <a className={'nav-link ' + (this.state.selectedTab == "write" ? "active" : "")} 
                    onClick={e => this.tabClick("write")}
                    href="#">כתיבה</a>
            </li>
        </ul>
      </div>;
    }
}