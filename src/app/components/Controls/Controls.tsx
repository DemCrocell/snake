import * as React from 'react';
import './styles.css';

interface IProps {
    paused?: boolean;
    gameOver: boolean;
    totals: number;
    resume?: () => void;
    reset?: () => void;
}

class Controls extends React.Component<IProps, {}> {

    public render() {
        const {paused, gameOver, resume, reset, totals} = this.props;
        return (
            <div className="snake-controls">
                {paused ? <button onClick={resume}>Resume</button> : null}
                {gameOver ? <div className="snake-over">
                    <h2>Totals: {totals}</h2>
                    <button onClick={reset}>New Game</button>
                </div> : null}
            </div>
        )
    }
}

export default Controls