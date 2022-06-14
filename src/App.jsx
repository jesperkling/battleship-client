import socketio from 'socket.io-client'
import './App.css';

const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL)

const App = () => {
	console.log(socket)
	return (
		<div>
			<h1>Battleship Game</h1>
		</div>
	)
}

export default App;
