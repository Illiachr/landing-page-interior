window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	//SECTION TIMER
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

	//!SECTION
	//SECTION MENU

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

		document.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.menu');
			if (target) {
				if (screen.width > 768) {
					handlerAnimate();
				} else { handlerToggle(); }

			}

			target = event.target;
			target = target.closest('active-menu');
			if (!target) {
				handlerToggle();
			}
		});
	};

	toggleMenu();


	//!SECTION
	//SECTION POPUP
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

	//SECTION POPUP

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
});
