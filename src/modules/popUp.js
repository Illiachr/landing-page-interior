export const showPopUp = () => {
	const popUp = document.querySelector('.popup'),
		popUpBtnAll = document.querySelectorAll('.popup-btn');

	popUpBtnAll.forEach(item => item.addEventListener('click', () => popUp.style.display = 'block'));
	popUp.addEventListener('click', event => {
		let target = event.target;

		if (target.classList.contains('popup-close')) {
			popUp.style.display = 'none';
		}

		target = target.closest('.popup-content');

		if (!target) {
			popUp.style.display = 'none';
		}
	});
};
