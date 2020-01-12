import React, { Component } from 'react'; 
import Board from './Board';
import { calculateWinner } from '../components/calculateWinner';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const backgroundColor = { backgroundColor: "#FFB6C1"};
            const desc = move ?
                'Move #' + move :
                'Start over';
            if (desc !== 'Start over') {
                backgroundColor.backgroundColor = "deepskyblue";
            }
            return (
                <li key={move}>
                    <button 
                        style={backgroundColor} 
                        onClick={() => this.jumpTo(move)}
                    >
                        {desc}
                    </button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = winner + ' Wins!!';
        } else {
            status = `It's ${this.state.xIsNext ? 'X' : 'O'}'s turn!`;
        }

        return (
            <div className="container">
                <div className="game">
                    <div className="game-board">
                        <h1>TIC-TAC-TOES</h1>
                        <Board
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <div className="status">{status}</div>
                        <ul>{moves}</ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;