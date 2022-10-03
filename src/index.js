import { $SUBMIT_BUTTON, $USER_INPUT } from './constants/dom.js'
import { MAX_NUMBER_LENGTH } from './constants/condition.js'

class BaseballGame {
	constructor() {
		$SUBMIT_BUTTON.addEventListener('click', e => {
			e.preventDefault()
			console.log(this.hasOnlyNumber($USER_INPUT.value))
		})
	}

	hasOnlyNumber(userInput) {
		const splitedUserInput = userInput.split('')
		return splitedUserInput.every(eachInput => !isNaN(+eachInput))
	}

	hasValidLength(userInput) {
		return userInput.length === MAX_NUMBER_LENGTH
	}

	hasUniqueNumber(userInput) {
		return [...new Set(userInput.split(''))].length === MAX_NUMBER_LENGTH
	}
}

new BaseballGame()
