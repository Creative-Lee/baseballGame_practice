import { $SUBMIT_BUTTON, $USER_INPUT } from './constants/dom.js'
import { MAX_NUMBER_RANGE, MIN_NUMBER_RANGE, MAX_NUMBER_LENGTH } from './constants/condition.js'
import { ERROR_MSG } from './constants/message.js'

class BaseballGame {
	constructor() {
		this.computerInput = this.getComputerInput()

		$SUBMIT_BUTTON.addEventListener('click', e => {
			e.preventDefault()
			const userInput = $USER_INPUT.value
			if (this.isValidInput(userInput)) {
				this.play(this.computerInput, userInput)
			}
		})
	}

	getComputerInput() {
		let randomNum = new Set()
		while (randomNum.size !== MAX_NUMBER_LENGTH) {
			randomNum.add(MissionUtils.Random.pickNumberInRange(MIN_NUMBER_RANGE, MAX_NUMBER_RANGE))
		}

		return [...randomNum].join('')
	}
	isValidInput(userInput) {
		if (!this.hasOnlyNumber(userInput)) {
			alert(ERROR_MSG.TYPE_ERR)
			return false
		}
		if (!this.hasValidLength(userInput)) {
			alert(ERROR_MSG.LENGTH_ERR)
			return false
		}
		if (!this.hasUniqueNumber(userInput)) {
			alert(ERROR_MSG.REPEATED_NUM_ERR)
			return false
		}
		if (!this.hasValidRangeNumber(userInput)) {
			alert(ERROR_MSG.RANGE_ERR)
			return false
		}
		return true
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
	getStrikeCount(computerInput, userInput) {
		let strikeCount = 0
		for (let i = 0; i < MAX_NUMBER_LENGTH; i++) {
			if (computerInput[i] === userInput[i]) strikeCount++
		}

		return strikeCount
	}
	getBallCount(computerInput, userInput) {
		let ballCount = 0
		for (let num of userInput) {
			if (computerInput.includes(num)) ballCount++
		}
		return ballCount
	}
	play(computerInput, userInput) {
		let strikeCount = this.getStrikeCount(computerInput, userInput)
		let ballCount = this.getBallCount(computerInput, userInput)
	}
}

new BaseballGame()
