export const showPopUp = () => {
	const popUp = document.querySelector('.popup'),
		popupCnt = document.querySelector('.popup-content'),
		popUpBtnAll = document.querySelectorAll('.popup-btn');

	const handlAnimate = () => {
		const moveItem = (elem, drawFn, startPos, distance) => {
				let start = null,
					currentPos = startPos;

				const step = timestamp => {
					if (!start) { start = timestamp; }
					const progress = timestamp - start;
					currentPos = drawFn(elem, currentPos, progress);

					if (currentPos <= distance) {
						requestAnimationFrame(step);
					} else {
						popupCnt.removeAttribute('style');
					}
				};

				requestAnimationFrame(step);
			},

			drawDown = (elem, currentTop, progress) => {
				elem.style.top = `${currentTop}%`;
				return currentTop += Math.floor((progress / 50));
			};
		moveItem(popupCnt, drawDown, -65, 10);

	};

	popUpBtnAll.forEach(item => item.addEventListener('click', () => {
		popUp.style.display = 'block';
		if (screen.width >= 768) { handlAnimate(); }
	}));
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
