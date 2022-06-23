import './StartPage.scss'

const StartPage = ({ onHandleUsernameSubmit, userInput, setUserInput }) => {
	return (
		<div className="start-page">
			<form onSubmit={onHandleUsernameSubmit}>
					<input
						type='text'
						id='username'
						required
						placeholder='Username'
						value={userInput}
						onChange={(e) => setUserInput(e.target.value)}
					/>
					<button type='submit' className="btn">Start Game</button>
			</form>
		</div>
  )
}

export default StartPage