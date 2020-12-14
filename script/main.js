window.addEventListener('DOMContentLoaded', () => {
	'use strict';

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
});
