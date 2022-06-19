import './StartPage.scss'

const StartPage = ({ onHandleUsernameSubmit, userInput, setUserInput }) => {
	return (
	<div className="start-page">
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
				<div className='button-wrapper'>
					<button type='submit' className="btn">Start Game</button>
				</div>
			</div>
		</form>
	</div>
  )
}

export default StartPage