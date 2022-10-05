import { MAX_NUMBER_RANGE, MIN_NUMBER_RANGE, MAX_NUMBER_LENGTH } from './constants/condition.js'

export default function generateComputerInput() {
	let randomNum = new Set()
	while (randomNum.size !== MAX_NUMBER_LENGTH) {
		randomNum.add(MissionUtils.Random.pickNumberInRange(MIN_NUMBER_RANGE, MAX_NUMBER_RANGE))
	}

	return [...randomNum].join('')
}
