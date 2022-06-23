import './GameBoard.scss'
import '../App.scss'
import { useCallback, useEffect, useState } from "react"

const GameBoard = ({ socket, user, opponent }) => {
	const [leftGame, setLeftGame] = useState(false)

	const [myDivs, setMyDivs] = useState([])
	const [opponentDivs, setOpponentDivs] = useState([])

	const [myBoats, setMyBoats] = useState(4)
	const [opponentBoats, setOpponentBoats] = useState(4)

	const boats = []

	const [battleship, setBattleship] = useState([])
	const [cruiser, setCruiser] = useState([])
	const [submarineOne, setSubmarineOne] = useState([])
	const [submarineTwo, setSubmarineTwo] = useState([])

	const [myTurn, setMyTurn] = useState()
	const [errorAlert, setErrorAlert] = useState(false)

	const handleCloseErrorAlert = () => {
		setErrorAlert(false)
	}

	const generateMyShips = (squares, extra) => {
		let boat = []
		let randomPosition
		
		if (squares === 4) {
			let yPosition = Math.floor(Math.random() * 7) + 1
			let xPosition = Math.floor(Math.random() * 7)
			randomPosition = '' + yPosition + xPosition
		}

		if (squares === 3) {
			let yPosition = Math.floor(Math.random() * 8) + 1
			let xPosition = Math.floor(Math.random() * 8)
			randomPosition = '' + yPosition + xPosition
		}

		if (squares === 2) {
			let yPosition = Math.floor(Math.random() * 9) + 1
			let xPosition = Math.floor(Math.random() * 9)
			randomPosition = '' + yPosition + xPosition
		}

		let startPosition = 'y' + randomPosition

		boat.push(startPosition)

		for (let i = 0; i < squares - 1; i++) {
			boat.push('y' + ++randomPosition)
		}

		if (boats.some((item) => boat.includes(item))) {
			boat = []
			generateMyShips(squares, extra)
		}

		if (boat.length === 4 && extra === 'single') {
			boats.push(...boat)
			
			return setBattleship((battleship) => [...battleship, ...boat])
		}

		if (boat.length === 3 && extra === 'single') {
			boats.push(...boat)

			return setCruiser((cruiser) => [...cruiser, ...boat])
		}

		if (boat.length === 2 && extra === 'single') {
			boats.push(...boat)

			return setSubmarineOne((submarineOne) => [...submarineOne, ...boat])
		}

		if (boat.length === 2 && extra === 'double') {
			boats.push(...boat)
			
			return setSubmarineTwo((submarineTwo) => [...submarineTwo, ...boat])
		}
	}
	
	const generateMyDivs = () => {
		const myDivBoxes = []

		for (let i = 0; i < 100; i++) {
			myDivBoxes.push(
				<div className={`y${i}`} key={`${i}`}></div>
			)
		}
		return setMyDivs((myDivs) => [...myDivs, ...myDivBoxes])
	}


	const generateOpponentsDivs = () => {
		const opponentDivBoxes = []
		for (let i = 0; i < 100; i++) {
			opponentDivBoxes.push(
				<div className={`e${i}`} key={`${i}`}></div>
			)
		}
		return setOpponentDivs((opponentDivs) => [...opponentDivs, ...opponentDivBoxes])
	}

	const clickOnGrid = (e) => {
		if (opponentBoats === 0 || myBoats === 0) {
			document.querySelector(`myBoard gameboard`).style.pointerEvents = 'none'
		}

		if (myTurn) {
			try {
				socket.emit('player:guessed', e.target.className)
				document.querySelector(`.${e.target.className}`).style.pointerEvents = 'none'
				setMyTurn(false)
				setErrorAlert(false)

			} catch (error) {
				setErrorAlert(true)
			}
		}
	}

	const removePart = (array, hit) => {
		let index = array.indexOf(hit)
		array.splice(index, 1)
		return
	}

	const handleGuess = useCallback((id) => {
		const target = id.replace('e', 'y')
		const hitBattleship = battleship.includes(target)
		const hitCruiser = cruiser.includes(target)
		const hitSubmarineOne = submarineOne.includes(target)
		const hitSubmarineTwo = submarineTwo.includes(target)

		if (hitBattleship) {
			document.querySelector(`.${target}`).style.backgroundColor ='green'
			document.querySelector(`.${target}`).style.pointerEvents = 'none'

			socket.emit('player:guess-response', target, true)

			removePart(battleship, target)

			if (battleship.length === 0) {
				setMyBoats((prevState) => prevState - 1)
				
				socket.emit('player:boat-sunken', 1)
			}
		} else if (hitCruiser) {
			document.querySelector(`.${target}`).style.backgroundColor ='green'
			document.querySelector(`.${target}`).style.pointerEvents = 'none'

			socket.emit('player:guess-response', target, true)

			removePart(cruiser, target)

			if (cruiser.length === 0) {
				setMyBoats((prevState) => prevState - 1)

				socket.emit('player:boat-sunken', 1)
			}
		} else if (hitSubmarineOne) {
			document.querySelector(`.${target}`).style.backgroundColor ='green'
			document.querySelector(`.${target}`).style.pointerEvents = 'none'

			socket.emit('player:guess-response', target, true)

			removePart(submarineOne, target)

			if (submarineOne.length === 0) {
				setMyBoats((prevState) => prevState - 1)

				socket.emit('player:boat-sunken', 1)
			}
		} else if (hitSubmarineTwo) {
			document.querySelector(`.${target}`).style.backgroundColor ='green'
			document.querySelector(`.${target}`).style.pointerEvents = 'none'

			socket.emit('player:guess-response', target, true)

			removePart(submarineTwo, target)

			if (submarineTwo.length === 0) {
				setMyBoats((prevState) => prevState - 1)

				socket.emit('player:boat-sunken', 1)
			}
		} else {
			document.querySelector(`.${target}`).style.backgroundColor ='red'
			document.querySelector(`.${target}`).style.pointerEvents = 'none'

			socket.emit('player:guess-response', target, false)
		}

			setMyTurn(true)
	
	},  [battleship, cruiser, socket, submarineOne, submarineTwo])

	const handleGuessResponse = (id, boolean) => {
		const target = id.replace('y', 'e')

		if (boolean === false) {
			document.querySelector(`.${target}`).style.backgroundColor ='red'
			document.querySelector(`.${target}`).style.pointerEvents = 'none'
		} else {
			document.querySelector(`.${target}`).style.backgroundColor ='green'
			document.querySelector(`.${target}`).style.pointerEvents = 'none'
		}
	}

	const handleSunkenBoat = (id) => {
		setOpponentBoats((prevState) => prevState - id)
	}

	const playerDisconnected = (boolean) => {
		setLeftGame(boolean)
	}

	useEffect(() => {
		generateMyShips(4, 'single')
		generateMyShips(3, 'single')
		generateMyShips(2, 'single')
		generateMyShips(2, 'double')

		generateMyDivs()
		generateOpponentsDivs()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		const displayBoats = () => {
			const allBoats = battleship.concat(cruiser, submarineOne, submarineTwo)

			for (let i = 0; i < allBoats.length; i++) {
				let myBoatsLocation = allBoats[i]
				document.querySelector(`.${myBoatsLocation}`).style.backgroundColor = 'black'
			}
		}

		displayBoats()
	}, [battleship, cruiser, submarineOne, submarineTwo])
	
	useEffect(() => {
		socket.on('player:disconnected', playerDisconnected);

		socket.on('player:guessed', handleGuess)

		socket.on('player:guess-response', handleGuessResponse)

		socket.on('player:boat-sunken', handleSunkenBoat)
		
		return () => {
			socket.off('player:disconnected', playerDisconnected)

			socket.off('player:guessed', handleGuess)

			socket.off('player:guess-response', handleGuessResponse)

			socket.off('player:boat-sunken', handleSunkenBoat)
		}
	}, [handleGuess, socket])

	useEffect(() => {
		setMyTurn(user.turn)
	}, [user])
	
	return (
		<div>
			<header>
				<h2>Battleship Gameboard</h2>
				
				{!user && !opponent && (
					<dialog open className='dialog-box waiting'>
						<p>Waiting for opponent to connect...</p>
					</dialog>
				)}

				{myTurn ? (
					<div className='turn'>
						<p>My turn</p>
					</div>
				) : ( 
					<div className='turn'>
						<p>Opponents turn</p>
					</div>
				)}

				{leftGame === true && (
					<dialog open className='dialog-box'>
						<h2>{opponent.username} left game...</h2>
						<button 
							onClick={() => window.location.reload()}
							className='btn'
						>Close</button>
					</dialog>
				)}
			</header>

			<main>
				<section>
					{user && opponent && (
						<div className='player-container'>
							<h3>{user.username}</h3>
							<p>Boats left: {myBoats}</p>
						</div>
					)}

					<div className='myBoard gameboard'>
						{myDivs}
					</div>
				</section>
				
				<section>
					{user && opponent &&(
						<div className='player-container'>
							<h3>{opponent.username}</h3>
							<p>Boats left: {opponentBoats}</p>
						</div>
					)}

					<div className={myTurn ? 'opponentBoard gameboard' : 'opponentBoard gameboard inactive'} onClick={clickOnGrid}>
						{opponentDivs}
					</div>
				</section>
			</main>
			
			{myBoats === 0 && (
				<dialog open className='dialog-box game-over-box'>
					<h2>Game over you lost!</h2>
					<button
						onClick={() => window.location.reload()}
						className='btn'
					>Close</button>
				</dialog>
			)}

			{opponentBoats === 0 && (
				<dialog open className='dialog-box game-over-box'>
					<h2>You won, congrats!</h2>
					<button
						onClick={() => window.location.reload()}
						className='btn'
					>Close</button>
				</dialog>
			)}

			{errorAlert && (
				<dialog open className='dialog-box'>
					<h2>You can't click the same spot again</h2>
					<button
						onClick={handleCloseErrorAlert}
						type='button'
						className='btn'
					>Close</button>
				</dialog>

			)}

		</div>
	)
}

export default GameBoard