import * as React from 'react';
import {BODY, FOOD} from '../../constants/common';
import './styles.css';

interface IProps {
    numRows: number;
    numCols: number;
    canvas: number[];
}

class CanvasCells extends React.Component<IProps, {}> {

    public render() {
        const { numRows, numCols, canvas } = this.props;
        const cells = [];
        const random = randomInteger(1,100);
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const code = canvas[numCols * row + col];
                const type = code === BODY ? 'body' : code === FOOD ? 'food' : 'null';
                cells.push(<div key={`${random}-${row}-${col}`} className={type + '-cell'} />);
            }
        }
        return cells
    }
}

function randomInteger(min:number, max:number) {
    let rand = min + Math.random() * (max - min);
    rand = Math.round(rand);
    return rand;
}

export default CanvasCells;