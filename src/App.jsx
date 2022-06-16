import socketio from 'socket.io-client'
import './App.css';
import { useEffect, useState } from 'react'
import GameBoard from './components/GameBoard'

const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL)

const App = () => {
	console.log(socket)

	const [username, setUsername] = useState('')
	const [userInput, setUserInput] = useState('')
	const [opponentName, setOpponentName] = useState('')

	const handleUsernameSubmit = e => {
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
		console.log(username)
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
				<div className='start-page'>
					<form onSubmit={handleUsernameSubmit}>
						<div>
							<input
								type='text'
								id='username'
								required
								placeholder='Username'
								value={userInput}
								onChange={e => setUserInput(e.target.value)}
							/>
							<button type='submit'>Start Game</button>
						</div>
					</form>
				</div>
			)}
		</div>
	)
}

export default App;
