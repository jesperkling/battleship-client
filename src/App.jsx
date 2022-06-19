import socketio from 'socket.io-client'
import './App.scss';
import { useEffect, useState } from 'react'
import GameBoard from './components/GameBoard'
import StartPage from './components/StartPage';

const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL)

const App = () => {
	const [username, setUsername] = useState('')
	const [userInput, setUserInput] = useState('')
	const [opponentName, setOpponentName] = useState('')
	const [fullGame, setFullGame] = useState(false)

	const handleUsernameSubmit = (e) => {
		e.preventDefault()
		setUsername(userInput)
		socket.emit('player:username', userInput)
		setUserInput('')
		socket.emit('user:joined', username)
	}

	useEffect(() => {
		socket.on('username', function (username) {
			setOpponentName(username)
		})

		socket.on('game:full', (boolean, playersArray) => {
			setFullGame(boolean)
			setUsername(playersArray.length)
		})

	}, [username])

	return (
		<div>
			<h1>Battleship Game</h1>

			{username ? ( 
				<GameBoard 
					socket={socket} 
					username={username}
					opponentName={opponentName}
				/>
			) : (
				<StartPage 
					onHandleUsernameSubmit={handleUsernameSubmit}
					userInput={userInput}
					setUserInput={setUserInput}
				/>
			)}

			{fullGame && username === 0 && (
				<div>
					<h2>Game Full</h2>
				</div>
			)}
		</div>
	)
}

export default App;
