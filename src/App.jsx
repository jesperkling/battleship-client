import socketio from 'socket.io-client'
import './App.scss';
import { useEffect, useState } from 'react'
import GameBoard from './components/GameBoard'
import StartPage from './components/StartPage';

const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL)

const App = () => {
	const [username, setUsername] = useState('')
	const [userInput, setUserInput] = useState('')

	const [user, setUser] = useState('')
	const [opponent, setOpponent] = useState('')
	const [fullGame, setFullGame] = useState(false)

	const handleUsernameSubmit = (e) => {
		e.preventDefault()
		setUsername(userInput)
		socket.emit('player:joined', userInput)
		setUserInput('')
	}

	useEffect(() => {
		socket.on('player:profile', function (players) {
			if (players.length === 2) {
				const thisSocket = players.find((player) => player.id === socket.id)
				const otherSocket = players.find((player) => player.id !== socket.id)

				setUser(thisSocket)
				setOpponent(otherSocket)
			}
		})

		socket.on('game:full', (boolean, playersArray) => {
			setFullGame(boolean)
			setUsername(playersArray.length)
		})

	}, [opponent, user, username])

	return (
		<div>
			<h1>Battleship Game</h1>

			{username ? ( 
				<GameBoard 
					socket={socket} 
					user={user}
					username={username}
					opponentName={opponent}
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
