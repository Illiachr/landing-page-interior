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
			closeMenuBtn = document.querySelector('.close-btn'),
			menu = document.querySelector('menu'),
			menuItems = document.querySelectorAll('ul>li');

		const handlerAnimate = () => {
			let progress = -100; // Анимация с помощью изменние свойства translateX от -100% до 100%
			const step = () => {
				menu.style.transform = 'translateX(' + progress + '%)';
				progress += 1.5;
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

		menuBtn.addEventListener('click', () => {
			if (screen.width > 770) {
				handlerAnimate();
			} else { handlerToggle(); }

		});
		closeMenuBtn.addEventListener('click', handlerToggle);
		menuItems.forEach(item => item.addEventListener('click', handlerToggle));

	};

	toggleMenu();


	//!SECTION
	//SECTION POPUP
	const showPopUp = () => {
		const popUp = document.querySelector('.popup'),
			popUpCloseBtn = document.querySelector('.popup-close'),
			popUpBtnAll = document.querySelectorAll('.popup-btn');

		popUpBtnAll.forEach(item => item.addEventListener('click', () => popUp.style.display = 'block'));
		popUpCloseBtn.addEventListener('click', () => popUp.style.display = 'none');
	};

	showPopUp();
//!SECTION
});
