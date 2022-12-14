import React, {useEffect} from 'react';
//https://github.com/embiem/react-canvas-draw
import CanvasDraw from "react-canvas-draw";

export default class LetterEdit extends React.Component {

    constructor(props) {
        super(props);

        this.canvasRef = React.createRef();

        this.onCanvasChange = props.onCanvasChange || function(){};
        this.onSave = props.onSave || function(imageData, dataUrl){};
        
        this.state = {
            // wrapper size (width/height.. it's a square) as a parameter
            // (to avoid dealing with sizes calculations)
            wrapperSize: props.wrapperSize || 400,

            // the existing image data if exists
            imageData: props.imageData || '',
        };
    }

    canvasTools = {
        save: () => {
            // get the margins of the letter inside the drawing leftest and the rightest points of the letter
            let margins = this.canvasTools._findMargins();
            let letterWidth = margins['rightest'] - margins['leftest'];

            // get drawing canvas dims
            let gridDims = this.canvasRef.current.canvas.grid.getBoundingClientRect();
            const gridHeight = gridDims.height;

            // create new canvas with new dims
            let newCanvas = document.createElement('canvas')
            newCanvas.width = letterWidth; // width as the letter
            newCanvas.height = gridHeight; // full height
            newCanvas.style = "border: 1px solid red;";
            let newCanvasCtx = newCanvas.getContext('2d');

            // copy the letter into the new canvas
            newCanvasCtx.drawImage(this.canvasRef.current.canvas.drawing,
                margins['leftest'], 0,
                letterWidth, gridHeight,
                0, 0,
                letterWidth, gridHeight);
            
            this.onSave(this.canvasRef.current.getSaveData(), newCanvas.toDataURL("image/png"));
        },
        undo: () => this.canvasRef.current.undo(),
        clear: () => this.canvasRef.current.clear(),

        _findMargins: () => {
            let lines = this.canvasRef.current.lines;
            if (!lines || lines.length === 0) {
                return {leftest: -1, rightest: -1};
            }

            let canvasProps = this.canvasRef.current.props
            let boundery = canvasProps.brushRadius;
            let leftest = 1.0 * canvasProps.canvasWidth;
            let rightest = 0;
            let highest = 0;
            let lowest = 1.0 * canvasProps.canvasHeight;
            lines.forEach(l => {
                l.points.forEach(p => {
                    if (p.x < leftest) leftest = p.x;
                    if (p.x > rightest) rightest = p.x;

                    if (p.y > lowest) lowest = p.y;
                    if (p.y < highest) highest = p.y;
                });
            });

            return {
                leftest: leftest - boundery, 
                rightest: rightest + boundery,
                lowest: lowest - boundery,
                highest: highest + boundery
            };
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
            <CanvasDraw ref={this.canvasRef} 
                saveData={this.state.imageData || null}
                onChange={e => this.onCanvasChange(e)} 
                canvasWidth={this.state.wrapperSize} />
        </div>
    }
}