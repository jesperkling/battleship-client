import './GameBoard.scss'
import { useEffect, useState } from "react"

const GameBoard = ({ socket, user, username, opponent }) => {
	const [leftGame, setLeftGame] = useState(false)

	const myBoxes = []
	const opponentsBoxes = []

	const [myDivs, setMyDivs] = useState([])
	const [opponentDivs, setOpponentDivs] = useState([])

	const [myBoats, setMyBoats] = useState([])
	const [currentPlayer, setCurrentPlayer] = useState(true)

	const generateMyShips = (squares) => {
		let boat = []
		let randomPosition = Math.floor(Math.random() * 100)
		let startPosition = 'y' + randomPosition

		boat.push(startPosition)

		for (let i = 0; i < squares - 1; i++) {
			boat.push('y' + ++randomPosition)
		}

		if (myBoats[boat]) {
			generateMyShips()
		}

		return setMyBoats((myBoats) => [...myBoats, ...boat])
	}
	
	console.log(myBoats)

	const generateMyDivs = () => {
		for (let i = 0; i < 100; i++) {
			if (myBoats.includes('y + i')) {
				myBoxes.push(
					<div className={`y${i}`} key={`${i}`}>{i + ' ⛵️'}</div>
				)
			} else {
				myBoxes.push(
					<div className={`y${i}`} key={`${i}`}>
						{i}
					</div>
				)
			}
		}
		return setMyDivs((myDivs) => [...myDivs, ...myBoxes])
	}

	const generateOpponentsDivs = () => {
		for (let i = 0; i < 100; i++) {
			opponentsBoxes.push(
				<div className={`e${i}`} key={`${i}`}>
					{i}
				</div>
			)
		}
		return setOpponentDivs((opponentDivs) => [...opponentDivs, ...opponentsBoxes])
	}

	const clickOnGrid = e => {
		if (currentPlayer) {
			console.log(`${username} is currently: ${currentPlayer}`)
			socket.emit('player:guessed', e.target.className)
			setCurrentPlayer(false)
		}

		if (!currentPlayer) {
			console.log(`${username} is currently: ${currentPlayer}`)
			socket.emit('player:guessed', e.target.className)
			setCurrentPlayer(true)
		}
	}

	const handleGuess = (id) => {
		const target = id.replace('e', 'y')
		const hit = myBoats.includes(target)

		if (hit) {
			console.log('it was a hit')

			document.querySelector(`.${target}`).style.backgroundColor = 'green'
			document.querySelector(`.${target}`).style.pointerEvents = 'none'

			socket.emit('player:guess-response', target, true)
		} else {
			console.log('it was a miss')

			document.querySelector(`.${target}`).style.backgroundColor = 'red'
			document.querySelector(`.${target}`).style.pointerEvents = 'none'

			socket.emit('player:guess-response', target, false)
		}
	}

	const handleGuessResponse = (id, boolean) => {
		const target = id.replace('y', 'e')

		if (boolean === false) {
			document.querySelector(`.${target}`).style.backgroundColor = 'red'
			document.querySelector(`.${target}`).style.pointerEvents = 'none'
		} else {
			document.querySelector(`.${target}`).style.backgroundColor = 'green'
			document.querySelector(`.${target}`).style.pointerEvents = 'none'
		}
	}

	const playerDisconnected = (boolean) => {
		setLeftGame(boolean)
	}

	useEffect(() => {
		generateMyShips(4)

		generateMyDivs()
		generateOpponentsDivs()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	
	useEffect(() => {
		socket.on('player:disconnected', playerDisconnected);

		socket.on('player:guessed', handleGuess)

		socket.on('player:guess-response', handleGuessResponse)
	}, [socket, user, username, opponent])
	
	return (
		<div>
			<h2>Battleship Gameboard</h2>
			{user && opponent ? (
				<p>
					<span>{user.username}</span> vs <span>{opponent.username}</span>
				</p>
			) : (
				<p>Waiting for opponent to connect...</p>
			)}

			{leftGame === true && <h2>{opponent.username} left game...</h2>}

			<main>
				<section>
					<h3>My board</h3>
					<div className='myBoard'>
						{myDivs}
					</div>
				</section>
				<section>
					<p>Opponent board, click here:</p>
					<div className='opponentBoard' onClick={clickOnGrid}>
						{opponentDivs}
					</div>
				</section>
			</main>
		</div>
	)
}

export default GameBoard