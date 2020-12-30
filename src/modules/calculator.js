export const calcValidation = () => {
	const calcBlock = document.querySelector('.calc-block');
	calcBlock.addEventListener('input', e => {
		if (e.target.matches('.calc-block input[type=text]')) {
			e.target.value = e.target.value.replace(/\D/, '');
		}
	});
}; //end calcValidation

export const runNum = (num, elem) => {
	const step = Math.round((num / 10) / 2);
	let i = 0,
		id;

	elem.textContent = 0;

	const counter = () => {
		if (i <= num) {
			elem.textContent = i;
			id = requestAnimationFrame(counter);
			i += step;
		} else {
			elem.textContent = num;
			cancelAnimationFrame(id);
		}
	};

	id = requestAnimationFrame(counter);
};


export const calc = (price = 100) => {
	const calcBlock = document.querySelector('.calc-block'),
		calcType = document.querySelector('.calc-type'),
		calcSquare = document.querySelector('.calc-square'),
		calcCount = document.querySelector('.calc-count'),
		calcDay = document.querySelector('.calc-day'),
		totalValue = document.getElementById('total');

	const countSum = () => {
		let total = 0,
			countValue = 1,
			dayValue = 1;
		const typeValue = +calcType.value,
			squareValue = +calcSquare.value;

		if (calcCount.value > 1) {
			countValue += (calcCount.value - 1) / 10;
		}

		if (calcDay.value && calcDay.value < 5) {
			dayValue *= 2;
		} else if (calcDay.value && calcDay.value < 10) {
			dayValue *= 1.5;
		}

		if (typeValue && squareValue) {
			total = Math.ceil(price * typeValue * squareValue * countValue * dayValue);
		}

		if (total > 0) {
			runNum(total, totalValue);
		} else { totalValue.textContent = total; }
	};

	calcBlock.addEventListener('change', e => {

		if (e.target.matches('select') || e.target.matches('input')) {
			countSum();
		} // end if
	}); // calcBlock click
};
