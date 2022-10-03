import { $SUBMIT_BUTTON, $USER_INPUT } from './constants/dom.js'
import { MAX_NUMBER_LENGTH } from './constants/condition.js'
import { MAX_NUMBER_RANGE, MIN_NUMBER_RANGE } from './constants/condition.js'

class BaseballGame {
	constructor() {
		this.userInput = null
		$SUBMIT_BUTTON.addEventListener('click', e => {
			e.preventDefault()
		})
	}

	hasOnlyNumber(userInput) {
		const splitedUserInput = userInput.split('')

		if (splitedUserInput.includes(' ')) {
			return false
		}
		return splitedUserInput.every(eachInput => !isNaN(+eachInput))
	}

	hasValidLength(userInput) {
		return userInput.length === MAX_NUMBER_LENGTH
	}

	hasUniqueNumber(userInput) {
		return [...new Set(userInput.split(''))].length === MAX_NUMBER_LENGTH
	}

	hasValidRangeNumber(userInput) {
		for (let eachInput of userInput) {
			if (MIN_NUMBER_RANGE > +eachInput || +eachInput > MAX_NUMBER_RANGE) {
				return false
			}
		}
		return true
	}
}

new BaseballGame()
