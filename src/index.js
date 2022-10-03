import { $SUBMIT_BUTTON } from './constants/dom.js'

class BaseballGame {
	constructor() {
		$SUBMIT_BUTTON.addEventListener('click', e => {
			e.preventDefault()
		})
	}

	hasOnlyNumber(userInput) {
		const splitedUserInput = userInput.split('')
		return splitedUserInput.every(eachInput => !isNaN(+eachInput))
	}
}

new BaseballGame()
