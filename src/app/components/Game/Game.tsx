import * as React from 'react';
import {BODY, DIRS, FOOD, KEYS} from '../../constants/common';
import Canvas from '../Canvas';
import Controls from '../Controls';
import Settings from '../Settings';
import './styles.css';

interface IProps {
    numRows: number;
    numCols: number;
    speed: number;
}

interface IState {
    gameOver: boolean;
    paused: boolean;
    canvas: any[];
    snake: number[];
    direction: number;
    numRows: number;
    numCols: number;
    cellSize: number;
    speed: number;
}

class Game extends React.Component<IProps, IState> {
    private nextDirection: number|null = null;
    private canvasId: string = 'canvas';
    constructor(props: IProps) {
        super(props);
        const start = 21;
        const snake = [start];
        const canvas = [];
        canvas[start] = BODY;

        this.state = {
            canvas,
            cellSize: 30,
            direction: KEYS.right,
            gameOver: false,
            numCols: this.props.numCols,
            numRows: this.props.numRows,
            paused: true,
            snake,
            speed: this.props.speed,
        };
    }

    public getState = () => {
        const start = 21;
        const snake = [start];
        const canvas = [];
        canvas[start] = BODY;

        return {
            canvas,
            cellSize: 30,
            direction: KEYS.right,
            gameOver: false,
            paused: true,
            snake,
        };
    };

    public reset = async() => {
        await this.setState(this.getState());
        this.resume();
    };

    public resume = async() => {
        if (this.state.gameOver || !this.state.paused) { return; }
        await this.setState({paused: false});
        const element = document.getElementById(this.canvasId);
        if (element) { element.focus() }
        this.tick();
    };

    public tick = async() => {
        if (this.state.paused) { return; }
        let { direction } = this.state;
        const { snake, canvas, numRows, numCols } = this.state;
        const head = getNextIndex(snake[0], direction, numRows, numCols);

        if (snake.indexOf(head) !== -1) {
            this.setState({gameOver: true});
            return;
        }
        const needsFood = canvas[head] === FOOD || snake.length === 1;
        if (needsFood) {
            let ii;
            const numCells = numRows * numCols;
            do { ii = Math.floor(Math.random() * numCells); } while (canvas[ii]);
            canvas[ii] = FOOD;
        } else {
            const tail = snake.pop();
            if (tail !== undefined) { canvas[tail] = null; }
        }
        snake.unshift(head);
        canvas[head] = BODY;

        if (this.nextDirection) {
            direction = this.nextDirection;
            this.nextDirection = null;
        }

        await this.setState({
            canvas,
            direction,
            snake,
        });

        setTimeout(this.tick, this.state.speed);
    };

    public pause = () => {
        if (this.state.gameOver || this.state.paused) { return; }
        this.setState({paused: true});
    };

    public handleKey = ( event:any ) => {
        const direction = event.keyCode;
        const difference = Math.abs(this.state.direction - direction);
        if (direction === KEYS.pause) {
            if (this.state.paused) { this.resume(); }
            else { this.pause(); }
        } else if (DIRS[direction] && difference !== 0 && difference !== 2) {
            this.nextDirection = direction;
        }
    };

    public setSetting = async(value:{}) => {
        this.setState({ ...value, ...this.getState()});
    };

    public render() {
        const {gameOver, canvas, paused, cellSize, speed, numRows, numCols} = this.state;

        return (
            <div className="snake-game">
                <Canvas
                    id={this.canvasId}
                    className={(gameOver ? ' game-over' : '')}
                    tabIndex={0}
                    numRows={numRows}
                    numCols={numCols}
                    onBlur={this.pause}
                    onFocus={this.resume}
                    onKeyDown={this.handleKey}
                    canvas={canvas}
                    style={{width: numCols * cellSize, height: numRows * cellSize}} />
                <Controls
                    paused={paused}
                    gameOver={gameOver}
                    totals={this.state.snake.length -2}
                    resume={this.resume}
                    reset={this.reset} />
                <Settings numRows={numRows} numCols={numCols} speed={speed} onChange={this.setSetting} />
            </div>

        )
    }
}


function getNextIndex(head:number, direction:number, numRows:number, numCols:number) {
    let x = head % numCols;
    let y = Math.floor(head / numCols);

    switch (direction) {
        case KEYS.up:
            y = y <= 0 ? numRows - 1 : y - 1;
            break;
        case KEYS.down:
            y = y >= numRows - 1 ? 0 : y + 1;
            break;
        case KEYS.left:
            x = x <= 0 ? numCols - 1 : x - 1;
            break;
        case KEYS.right:
            x = x >= numCols - 1 ? 0 : x + 1;
            break;
        default: return 0;
    }
    return (numCols * y) + x;
}

export default Game