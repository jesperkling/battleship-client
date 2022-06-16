const GameBoard = ({ socket, opponentName, username }) => {
	console.log(socket)
	return (
		<div>
			<h2>Battleship Gameboard</h2>

			<p>Gameboard for {opponentName}</p>
			<p>Gameboard for {username}</p>
		</div>
	)
}

export default GameBoard