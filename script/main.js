window.addEventListener('DOMContentLoaded', () => {
	'use strict';
	// SECTION Libruary

	const addElem = (strClass, strSelectorAppend, strTag) => {
		const elem = document.createElement(strTag),
			elemAppend = document.querySelector(strSelectorAppend);
		elem.classList.add(strClass);
		elemAppend.append(elem);
		return elem;
	};

	// !SECTION

	// SECTION Timer

	const countTimer = (
		deadline = '1 january 2021', hoursSelector = '#timer-hours',
		minSelector = '#timer-minutes', secSelector = '#timer-seconds'
	) => {
		const timerHours = document.querySelector(hoursSelector),
			timerMinutes = document.querySelector(minSelector),
			timerSeconds = document.querySelector(secSelector);

		const getTimeRemainig = ()	=> {
			const dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeToStop = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeToStop % 60),
				minutes = Math.floor((timeToStop / 60) % 60),
				hours = Math.floor((timeToStop / 60 / 60));
			return { timeToStop, hours, minutes, seconds };
		};

		const updateTimer = () => {
			const timer = getTimeRemainig();
			timerHours.textContent = timer.hours < 10 ? `0${timer.hours}` : timer.hours;
			timerMinutes.textContent = timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes;
			timerSeconds.textContent = timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds;

			if (timer.timeToStop < 0) {
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
				clearInterval();
			} else {
				setInterval(updateTimer, 1000);
			}
		};
		updateTimer();
	};

	countTimer();

	// !SECTION

	// SECTION Menu

	const toggleMenu = () => {
		const menuBtn = document.querySelector('.menu'),
			menu = document.querySelector('menu');

		const handlerAnimate = () => {
			let progress = -100; // Анимация с помощью изменние свойства translateX от -100% до 100%
			const step = () => {
				menu.style.transform = 'translateX(' + progress + '%)';
				progress += 2.7;
				if (progress < 100) {
					requestAnimationFrame(step);
				} else {
					menu.classList.add('active-menu');
					menu.style.transform = '';
					menuBtn.style.display = 'none';
				}
			};
			if (menu.classList.contains('active-menu')) { menu.classList.remove('active-menu'); }
			requestAnimationFrame(step);
		};

		const handlerToggle = () => {
			menu.classList.toggle('active-menu');
			if (!menu.classList.contains('active-menu')) {
				menuBtn.style.display = 'block';
			} else { menuBtn.style.display = 'none'; }
		};
		let id = 0;
		const smoothScroll = (elem, duration) => {
			const target = document.querySelector(`#${elem.href.split('#')[1]}`),
				targetPosition = target.getBoundingClientRect().top,
				startPosition = window.pageYOffset,
				distance = targetPosition - startPosition,
				currentTime = Date.now();
			let startTime = null;
			const ease = (t, b, c, d) => {
				t /= d / 2;
				if (t < 1) { return c / 2 * t * t + b; }
				t--;
				return -c / 2 * (t * (t - 2) - 1) + b;
			};

			const animation = currentTime => {
				if (startTime === null) { startTime = currentTime; }
				const timeElapsed = currentTime - startTime,
					run = ease(timeElapsed, startPosition, distance, duration);
				scrollTo(0, run);

				if (timeElapsed < duration) {
					id = requestAnimationFrame(animation);
				} else { cancelAnimationFrame(id); }
			};

			if (window.pageYOffset === 0) {
				id = requestAnimationFrame(animation);
			}
		};

		document.addEventListener('click', event => {
			const target = event.target;
			if (target.classList.contains('close-btn')) {
				handlerToggle();
			}

			if (menu.classList.contains('active-menu') && !target.classList.contains('active-menu')) {
				handlerToggle();
			}

			if (target.closest('.menu')) {
				if (screen.width > 768) {
					handlerAnimate();
				} else { handlerToggle(); }
			}
			//TODO сделать плавный скролл по кнопке
			if (target.closest('main a')) {
				document.querySelector('.service').
					scrollIntoView({ block: "center", behavior: "auto" });
			}
			if (target.closest('menu li')) { smoothScroll(target.closest('menu li a'), 2000); }
		});
	};

	toggleMenu();


	// !SECTION

	// SECTION Popup
	const showPopUp = () => {
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

	showPopUp();

	//!SECTION

	//SECTION Tab navigation

	const toggleTab = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = document.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTab = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');
			if (target) {
				tab.forEach((item, index) => {
					if (item === target) {
						toggleTab(index);
					}
				});
			}
		});
	};

	toggleTab();

	//!SECTION

	//SECTION SLIDER

	const slider = () => {

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

	slider();
	//!SECTION
});
