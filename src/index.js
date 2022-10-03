import { $SUBMIT_BUTTON, $USER_INPUT, $RESULT, $RESTART_BUTTON } from './constants/dom.js'
import { MAX_NUMBER_RANGE, MIN_NUMBER_RANGE, MAX_NUMBER_LENGTH } from './constants/condition.js'
import { ERROR_MSG, GAME_WIN_MSG } from './constants/message.js'

class BaseballGame {
	constructor() {
		this.computerInput
		this.init()

		$SUBMIT_BUTTON.addEventListener('click', e => {
			e.preventDefault()
			const userInput = $USER_INPUT.value
			if (this.isValidInput(userInput)) {
				$RESULT.innerHTML = this.play(this.computerInput, userInput)
			}
			if ($RESULT.innerHTML === GAME_WIN_MSG) {
				this.showRestartButton()
			}
		})

		$RESTART_BUTTON.addEventListener('click', e => {
			this.init()
		})
	}

	init() {
		this.hideRestartButton()
		$RESULT.innerHTML = '게임을 시작하세요!'
		$USER_INPUT.value = ''
		this.computerInput = this.getComputerInput()
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
	getGameResultMsg(strikeCount, ballCount) {
		if (strikeCount === MAX_NUMBER_LENGTH) return GAME_WIN_MSG
		if (!strikeCount && !ballCount) return `낫싱`
		if (strikeCount && ballCount) return `${ballCount}볼 ${strikeCount}스트라이크`
		if (strikeCount && !ballCount) return `${strikeCount}스트라이크`
		return `${ballCount}볼`
	}
	play(computerInput, userInput) {
		let strikeCount = this.getStrikeCount(computerInput, userInput)
		let ballCount = this.getBallCount(computerInput, userInput) - strikeCount

		return this.getGameResultMsg(strikeCount, ballCount)
	}
	showRestartButton() {
		$RESTART_BUTTON.style.display = 'block'
	}
	hideRestartButton() {
		$RESTART_BUTTON.style.display = 'none'
	}
}

new BaseballGame()
