import * as React from 'react';
import CanvasCells from './CanvasCells';
import './styles.css';

interface IProps {
    numRows: number,
    numCols: number,
    canvas: number[],
    className: string,
    tabIndex: number,
    onBlur: () => void,
    onFocus: () => void,
    onKeyDown: (e:any) => void,
    style: {},
}

class Canvas extends React.Component<IProps, {}> {
    public canvasRef: React.RefObject<HTMLDivElement> = React.createRef();
    public render() {
        const {
            numRows,
            numCols,
            canvas,
            className,
            tabIndex,
            onBlur,
            onFocus,
            onKeyDown,
            style,
        } = this.props;
        const classes = `snake-canvas ${className}`;
        return (
            <div
                ref={this.canvasRef}
                className={classes}
                tabIndex={tabIndex}
                onBlur={onBlur}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                style={style}>
                <CanvasCells numRows={numRows} numCols={numCols} canvas={canvas}/>
            </div>
        )
    }
}

export default Canvas