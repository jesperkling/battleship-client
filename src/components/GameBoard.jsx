import './GameBoard.scss'
import { useEffect, useState } from "react"

const GameBoard = ({ socket, username, opponentName }) => {
	const [leftGame, setLeftGame] = useState(false)
	const [guess, setGuess] = useState(0)
	const yourBoxes = []
	const opponentsBoxes = []
	const yourBoats = ['y0', 'y1', 'y2', 'y3']
	const opponentsBoats = ['e1', 'e2', 'e3', 'e4']

	const postBoxClick = (id, clicked) => {
		if (clicked) {
			document.querySelector(`.${id}`).style.backgroundColor = 'green'
			document.querySelector(`${id}`).style.pointerEvents = 'none'
		}

		if (!clicked) {
			document.querySelector(`.${id}`).style.backgroundColor = 'red'
			document.querySelector(`.${id}`).style.pointerEvents = 'none'
		}
	}

	const clickOnGrid = e => {
		setGuess(guess + 1)

		if (opponentsBoats.includes(e.target.className)) {
			postBoxClick(e.target.className, true)
			socket.emit('player:hit', e.target.className, username, socket.id)
			console.log(socket.id)
		}

		if (!opponentsBoats.includes(e.target.className)) {
			postBoxClick(e.target.className, false)
			socket.emit('player:miss', e.target.className, username, socket.id)
		}
	}

	for (let i = 0; i < 100; i++) {
		yourBoxes.push(<div className={`y${i}`} key={`${i}`}></div>)
	}

	for (let i = 0; i < 100; i++) {
		opponentsBoxes.push(<div className={`e${i}`} onClick={clickOnGrid} key={`${i}`}></div>)
	}

	const shotHandler = (id) => {
		if (yourBoats.includes(id)) {
			document.querySelector(`.${id}`).style.backgroundColor = 'green'
			document.querySelector(`.${id}`).style.pointerEvents = 'none'
		}

		if (!yourBoats.includes(id)) {
			document.querySelector(`.${id}`).style.backgroundColor = 'red'
			document.querySelector(`.${id}`).style.pointerEvents = 'none'
		}
	}

	useEffect(() => {
		socket.on('player:disconnected', function (boolean) {
			setLeftGame(boolean);
		});

		socket.on('player:hit', (id) => {
			console.log('Hit', id)
			shotHandler(id)
		})

		socket.on('player:miss', (id) => {
			console.log('Miss', id)
			shotHandler(id)
		})
	}, [socket])
	
	return (
		<div>
			<h2>Battleship Gameboard</h2>

			<p>{opponentName} here</p>
			<p>{username}</p>

			{leftGame === true && <h2>{opponentName} left game...</h2>}
			<main>
				<section>
					<p>Your guesses: {guess}</p>
					<div className='yourBoard'>
						{yourBoxes}
					</div>
				</section>
				<section>
					<p>Opponents board</p>
					<div className='opponentBoard'>
						{opponentsBoxes}
					</div>
				</section>
			</main>
		</div>
	)
}

export default GameBoard