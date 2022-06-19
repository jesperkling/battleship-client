const StartPage = ({ onHandleUsernameSubmit, userInput, setUserInput }) => {
	return (
	<div className="start-page">
		<h2>Battleship Game</h2>

		<form onSubmit={onHandleUsernameSubmit}>
			<div>
				<input
					type='text'
					id='username'
					required
					placeholder='Username'
					value={userInput}
					onChange={(e) => setUserInput(e.target.value)}
				/>
				<button type='submit' className="btn">Start Game</button>
			</div>
		</form>
	</div>
  )
}

export default StartPage