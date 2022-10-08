import React from 'react';
//https://github.com/embiem/react-canvas-draw
import CanvasDraw from "react-canvas-draw";

export default class LetterEdit extends React.Component {

    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();

        this.onCanvasChange = props.onCanvasChange || function(){};
        this.onSave = props.onSave || function(){};
        
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
            debugger;
            // margin size from the left and the right points of the letter
            const marginSize = 10;

            // get the leftest and the rightest points of the letter
            let margins = this.canvasTools._findMargins();

            let drawingDims = this.canvasRef.current.canvas.drawing.getBoundingClientRect();
            const drawingWidth = drawingDims.width;
            const drawingHeight = drawingDims.height;
            let gridDims = this.canvasRef.current.canvas.grid.getBoundingClientRect();
            const gridWidth = gridDims.width;
            const gridHeight = gridDims.height;

            // create new canvas with new dims
            let newCanvas = document.createElement('canvas')
            newCanvas.width = gridWidth;
            newCanvas.height = gridHeight;
            let newCanvasCtx = newCanvas.getContext('2d');

            // draw the image into the context
            let letterWidth = margins['rightest'] - margins['leftest'];
            let newCanvasWidth = letterWidth + (2 * marginSize);
            console.log('this.canvasRef.current', this.canvasRef.current.canvas.drawing);
            newCanvasCtx.drawImage(this.canvasRef.current.canvas.drawing, 
                marginSize, marginSize,
                drawingWidth, drawingHeight);

            let img = new Image();
            img.setAttribute('width', newCanvasWidth);
            img.setAttribute('height', 400);
            img.src = newCanvas.toDataURL("image/png");
            document.body.appendChild(img);
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
            <CanvasDraw ref={this.canvasRef} onChange={e => this.onCanvasChange(e)} />
        </div>
    }
}