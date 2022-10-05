import { $SUBMIT_BUTTON, $USER_INPUT, $RESULT, $RESTART_BUTTON } from './constants/dom.js'
import { MAX_NUMBER_RANGE, MIN_NUMBER_RANGE, MAX_NUMBER_LENGTH } from './constants/condition.js'
import { ERROR_MSG, GAME_WIN_MSG } from './constants/message.js'
import Computer from './computer.js'

class BaseballGame {
	constructor() {
		this.computer = new Computer()
		this.initGame()

		$SUBMIT_BUTTON.addEventListener('click', e => {
			e.preventDefault()
			const computerInput = this.computer.computerInput
			const userInput = $USER_INPUT.value
			const gameResultMsg = this.play(computerInput, userInput)
			$RESULT.innerText = gameResultMsg
		})

		$RESTART_BUTTON.addEventListener('click', () => this.initGame())
	}

	initGame() {
		this.computer.computerInput = this.computer.generateComputerInput()
		this.hideRestartButton()
		this.initUserInput()
		this.initResultText()
	}
	initUserInput() {
		$USER_INPUT.value = ''
	}
	initResultText() {
		$RESULT.innerHTML = '게임을 시작하세요!'
	}

	isValidInput(userInput) {
		if (!this.hasOnlyNumber(userInput)) {
			return { isValid: false, type: 'TYPE_ERR' }
		}
		if (!this.hasValidLength(userInput)) {
			return { isValid: false, type: 'LENGTH_ERR' }
		}
		if (!this.hasUniqueNumber(userInput)) {
			return { isValid: false, type: 'REPEATED_NUM_ERR' }
		}
		if (!this.hasValidRangeNumber(userInput)) {
			return { isValid: false, type: 'RANGE_ERR' }
		}
		return { isValid: true }
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
	getGameResultMsg(strikeCount, ballCount) {
		if (!strikeCount && !ballCount) return `낫싱`
		if (strikeCount && ballCount) return `${ballCount}볼 ${strikeCount}스트라이크`
		if (strikeCount && !ballCount) return `${strikeCount}스트라이크`
		return `${ballCount}볼`
	}

	play(computerInput, userInput) {
		const { isValid, type } = this.isValidInput(userInput)
		if (!isValid) {
			this.showInputErrorAlert(type)
			return $RESULT.innerText
		}

		const strikeCount = this.getStrikeCount(computerInput, userInput)
		const ballCount = this.getBallCount(computerInput, userInput) - strikeCount
		if (strikeCount === MAX_NUMBER_LENGTH) {
			this.showRestartButton()
			return GAME_WIN_MSG
		}

		return this.getGameResultMsg(strikeCount, ballCount)
	}

	showInputErrorAlert(type) {
		alert(ERROR_MSG[type])
	}
	showRestartButton() {
		$RESTART_BUTTON.style.display = 'block'
	}
	hideRestartButton() {
		$RESTART_BUTTON.style.display = 'none'
	}
}

new BaseballGame()
