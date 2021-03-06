import React from 'react'
import './TicTac.css'

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            results: [],
            stepNumber: 0,
            stepSum: 0,
            xIsNext: true,
            bestRes: 1231

        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            stepSum: this.state.stepSum + 1
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    generateKey = (pre) => {
        return `${pre}_${new Date().getTime()}`;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        console.log(this.state.stepNumber)


        if (winner) {
        } else {
            status = this.state.xIsNext ? "?????????????????? ?????? ??????????" : "?????????????????? ?????? ????????????";
        }

        if (winner !== null) {
            status = '???????????????? ??????????';
            status = '???????????????? ????????????';
            this.state.stepNumber = 0;
        }

        if (winner === 'X') {
            this.state.results.push(`???????????????? ?????????? ???? ${this.state.stepSum} ??????????`)
            if (this.state.stepSum < this.state.bestRes)
                this.state.bestRes = this.state.stepSum
            this.state.stepSum = 0;
        }
        if (winner === 'O') {
            this.state.results.push(`???????????????? ???????????? ???? ${this.state.stepSum} ??????????`)
            if (this.state.stepSum < this.state.bestRes)
                this.state.bestRes = this.state.stepSum
            this.state.stepSum = 0;
        }


        return (
            <div className="container">
                {this.state.bestRes === 1231 ? null : `best res is ${this.state.bestRes}`}
                <div className="gameBlock">
                    <button onClick={() => {
                        this.jumpTo(0)
                        this.state.stepNumber = 0
                        console.log(winner)
                        console.log(this.state.stepNumber)
                    }}>
                        Restart the game
                    </button>
                    <br/>
                    <br/>
                    <div className="game">
                        <div className="game-board">
                            <Board
                                squares={current.squares}
                                onClick={i => this.handleClick(i)}
                            />
                        </div>
                        <div className="game-info">
                            <div>{status}</div>
                            {/*<ol>{moves}</ol>*/}
                        </div>
                    </div>
                </div>
                <div className="bestResultsBlock">
                    <br/>

                    <ul className='resultsList'>
                        {this.state.results.map((result) => (
                            <li key={Math.random()}>{result}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}


// ========================================
