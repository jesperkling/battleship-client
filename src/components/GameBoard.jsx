import './GameBoard.scss'
import { useEffect, useState } from "react"

const GameBoard = ({ socket, user, username, opponent }) => {
	const [leftGame, setLeftGame] = useState(false)

	const [myDivs, setMyDivs] = useState([])
	const [opponentDivs, setOpponentDivs] = useState([])

	const [battleship, setBattleship] = useState([])
	const [cruiser, setCruiser] = useState([])
	const [submarine, setSubmarine] = useState([])

	const [myTurn, setMyTurn] = useState(true)

	const generateMyShips = (squares) => {
		let boat = []
		let randomPosition = Math.floor(Math.random() * 100)
		let startPosition = 'y' + randomPosition

		boat.push(startPosition)

		for (let i = 0; i < squares - 1; i++) {
			boat.push('y' + ++randomPosition)
		}

		if (squares === 4) {
			return setBattleship((myBoats) => [...myBoats, ...boat])
		}

		if (squares === 3) {
			return setCruiser((myBoats) => [...myBoats, ...boat])
		}

		if (squares === 2) {
			return setSubmarine((myBoats) => [...myBoats, ...boat])
		}
	}
	
	console.log('battleship:', battleship)
	console.log('cruiser:', cruiser)
	console.log('submarine:', submarine)

	const generateMyDivs = () => {
		const myDivBoxes = []

		for (let i = 0; i < 100; i++) {
			myDivBoxes.push(
				<div className={`y${i}`} key={`${i}`}>
					{i}
				</div>
			)
		}
		return setMyDivs((myDivs) => [...myDivs, ...myDivBoxes])
	}

	const generateOpponentsDivs = () => {
		const opponentDivBoxes = []
		for (let i = 0; i < 100; i++) {
			opponentDivBoxes.push(
				<div className={`e${i}`} key={`${i}`}>
					{i}
				</div>
			)
		}
		return setOpponentDivs((opponentDivs) => [...opponentDivs, ...opponentDivBoxes])
	}

	const clickOnGrid = e => {
		if (myTurn) {
			socket.emit('player:guessed', e.target.className)
			setMyTurn(false)
		}
	}

	const handleGuess = (id) => {
		const target = id.replace('e', 'y')
		const hitBattleship = battleship.includes(target)
		const hitCruiser = cruiser.includes(target)
		const hitSubmarine = submarine.includes(target)

		if (hitBattleship || hitCruiser || hitSubmarine) {
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
		setMyTurn(true)
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
		generateMyShips(3)
		generateMyShips(2)
		generateMyShips(2)

		generateMyDivs()
		generateOpponentsDivs()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	
	useEffect(() => {
		console.log('myturn:', myTurn)

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

			{myTurn ? <p>My turn</p> : <div>Opponents turn</div>}

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