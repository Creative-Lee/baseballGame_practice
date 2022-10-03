import { $SUBMIT_BUTTON } from './constants/dom.js'

class BaseballGame {
	constructor() {
		$SUBMIT_BUTTON.addEventListener('click', e => {
			e.preventDefault()
		})
	}

	// play(randomNumber, userInput) {
	// 	return '결과 값 String'
	// }
}

new BaseballGame()
