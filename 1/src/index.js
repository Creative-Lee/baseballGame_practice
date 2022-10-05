import { $APP, $SUBMIT_BUTTON, $USER_INPUT, $RESULT, $RESTART_BUTTON } from './constants/dom.js'
import { MAX_NUMBER_RANGE, MIN_NUMBER_RANGE, MAX_NUMBER_LENGTH } from './constants/condition.js'
import { ERROR_MSG, GAME_WIN_MSG } from './constants/message.js'
import Computer from './computer.js'

class BaseballGame {
	constructor() {
		this.computer = new Computer()
		this.initGame()
		this.initDomEvents()
	}

	initGame() {
		this.computer.computerInput = this.computer.generateComputerInput()
		this.initView()
	}
	initDomEvents() {
		$APP.addEventListener('click', e => {
			if (!e.target) return
			if (e.target === $SUBMIT_BUTTON) {
				e.preventDefault()
				const computerInput = this.computer.computerInput
				const userInput = $USER_INPUT.value
				const gameResultMsg = this.play(computerInput, userInput)
				$RESULT.innerText = gameResultMsg
			}
			if (e.target === $RESTART_BUTTON) {
				this.initGame()
			}
		})
	}

	initView() {
		this.initUserInput()
		this.initResultText()
		this.hideRestartButton()
	}
	initUserInput() {
		$USER_INPUT.value = ''
	}
	initResultText() {
		$RESULT.innerHTML = '게임을 시작하세요!'
	}
	showRestartButton() {
		$RESTART_BUTTON.style.display = 'block'
	}
	hideRestartButton() {
		$RESTART_BUTTON.style.display = 'none'
	}

	showInputErrorAlert(type) {
		alert(ERROR_MSG[type])
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

	getStrikeBallCount(computerInput, userInput) {
		let strikeCount = 0
		let ballCount = 0
		for (let i = 0; i < MAX_NUMBER_LENGTH; i++) {
			if (computerInput[i] === userInput[i]) strikeCount++
		}
		for (let num of userInput) {
			if (computerInput.includes(num)) ballCount++
		}
		ballCount -= strikeCount
		return [strikeCount, ballCount]
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
			this.initUserInput()
			return $RESULT.innerText
		}

		const [strikeCount, ballCount] = this.getStrikeBallCount(computerInput, userInput)
		if (strikeCount === MAX_NUMBER_LENGTH) {
			this.showRestartButton()
			return GAME_WIN_MSG
		}

		return this.getGameResultMsg(strikeCount, ballCount)
	}
}

new BaseballGame()
