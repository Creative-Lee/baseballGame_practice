const errorMessages = {
	typeError: `입력에 숫자 이외의 문자가 있습니다. 다시 입력해 주세요!`,
	lengthError: `숫자의 길이가 올바르지 않습니다. 다시 입력해 주세요`,
	repeatedNumberError: `입력에 중복된 숫자가 있습니다. 다시 입력해 주세요!`,
	rangeError: `입력 가능한 숫자 범위를 벗어났습니다. 다시 입력해 주세요!`,
}
const gameMessages = {
	strike: '스트라이크',
	ball: '볼',
	nothing: '낫싱',
	win: '⚾정답을 맞추셨습니다⚾',
}

export { errorMessages, gameMessages }
