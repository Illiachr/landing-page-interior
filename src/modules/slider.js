import { addElem } from './suppFunc';

export const slider = () => {

	const addDots = (sliderSelector, sliderItemSelector, dotClass, dotListClass, dotElem = 'li') => {
		const sliderNode = document.querySelectorAll(sliderItemSelector); // получаем все элементы слайдера
		addElem(dotListClass, sliderSelector, 'ul'); // создаем список
		for (let i = 0; i < sliderNode.length; i++) { // добавляем точки
			addElem(dotClass, `.${dotListClass}`, dotElem); //! ВАЖНО второй параметр должен быть селектором
		}
		const elemNode = document.querySelectorAll(`.${dotClass}`);
		elemNode[0].classList.add(`${dotClass}-active`);
		return elemNode;
	};

	const slide = document.querySelectorAll('.portfolio-item'),
		slider = document.querySelector('.portfolio-content'),
		dot = addDots('.portfolio-content', '.portfolio-item', 'dot', 'portfolio-dots');

	let currentSlide = 0,
		interval  = 0;


	const rmClass = (elem, index, strClass) => {
		elem[index].classList.remove(strClass);
	};

	const addClass = (elem, index, strClass) => {
		elem[index].classList.add(strClass);
	};

	const autoSwipe = () => {
		rmClass(slide, currentSlide, 'portfolio-item-active');
		rmClass(dot, currentSlide, 'dot-active');

		currentSlide++;

		if (currentSlide >= slide.length) { currentSlide = 0; }

		addClass(slide, currentSlide, 'portfolio-item-active');
		addClass(dot, currentSlide, 'dot-active');
	};

	const startSwipe = (time = 2000) => {
		interval = setInterval(autoSwipe, time);
	};

	const stopSwipe = () => {
		clearInterval(interval);
	};

	slider.addEventListener('click', event => {
		event.preventDefault();
		const target = event.target;

		if (!target.matches('.portfolio-btn') && !target.matches('.dot')) { return; }

		rmClass(slide, currentSlide, 'portfolio-item-active');
		rmClass(dot, currentSlide, 'dot-active');
		if (target.matches('#arrow-right')) {
			currentSlide++;
		} else if (target.matches('#arrow-left')) {
			currentSlide--;
		} else if (target.matches('.dot')) {
			dot.forEach((item, index) => {
				if (item === target) { currentSlide = index; }
			});
		}

		if (currentSlide >= slide.length) { currentSlide = 0; }
		if (currentSlide < 0) { currentSlide = slide.length - 1; }

		addClass(slide, currentSlide, 'portfolio-item-active');
		addClass(dot, currentSlide, 'dot-active');
	});

	slider.addEventListener('mouseover', event => {
		if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) { stopSwipe(); }
	});

	slider.addEventListener('mouseout', event => {
		if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) { startSwipe(); }
	});

	startSwipe(1500);
};
