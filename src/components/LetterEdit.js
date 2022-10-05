import React from 'react';
//https://github.com/embiem/react-canvas-draw
import CanvasDraw from "react-canvas-draw";

export default class LetterEdit extends React.Component {

    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();
        
        this.state = {
            // wrapper size (width/height.. it's a square) as a parameter
            // (to avoid dealing with sizes calculations)
            wrapperSize: props.wrapperSize || 600,

            // initially filled dots in the cipher map
            selectedBoxes: props.dots || [],
        };
    }

    canvasTools = {
        save: () => {
            let margins = this.canvasTools._findMargins();
            console.log('margins', margins);
            return;
            const dataUrl = this.canvasRef.current.getDataURL();
            const saveData = this.canvasRef.current.getSaveData();
            
            console.log('this.canvasRef.current', this.canvasRef.current);
            console.log('saveData', saveData);
            console.log('DataUrl', dataUrl);
        },
        undo: () => this.canvasRef.current.undo(),
        clear: () => {
            this.canvasRef.current.clear();
        },

        _findMargins: () => {
            let lines = this.canvasRef.current.lines;
            if (!lines || lines.length === 0) {
                return {leftest: -1, rightest: -1};
            }
 
            let leftest = 1.0 * this.canvasRef.current.props.canvasWidth;
            let rightest = 0;
            lines.forEach(l => {
                l.points.forEach(p => {
                    if (p.x < leftest) {
                        leftest = p.x;
                    }
                    if (p.x > rightest) {
                        rightest = p.x;
                    }
                });
            });

            console.log('leftest', leftest, 'rightest', rightest);
            return {leftest, rightest};
        }
    }

    render() {
        let styles = {
            width: this.state.wrapperSize + 'px'
        };

        return <div>
            <ul className="nav">
                <li className="nav-item">
                    <button onClick={e => this.canvasTools.save()} className="btn btn-primary">Save</button>
                </li>
                <li className="nav-item">
                    <button onClick={e => this.canvasTools.undo()} className="btn btn-primary">Undo</button>
                </li>
                <li className="nav-item">
                    <button onClick={e => this.canvasTools.clear()} className="btn btn-danger">Clear</button>
                </li>
            </ul>
            <CanvasDraw ref={this.canvasRef} />
        </div>
    }
}