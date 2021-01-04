export const countTimer = (
	deadline = '7 january 2021', hoursSelector = '#timer-hours',
	minSelector = '#timer-minutes', secSelector = '#timer-seconds',
	titleSelector = '.timer-action'
) => {
	const addZero = num => (num < 10 ? `0${num}` : num);

	const timerHours = document.querySelector(hoursSelector),
		timerMinutes = document.querySelector(minSelector),
		timerSeconds = document.querySelector(secSelector),
		timerTitle = document.querySelector(titleSelector);

	const getTimeRemaining = ()	=> {
		const dateStop = new Date(deadline).getTime(),
			dateNow = new Date().getTime(),
			timeToStop = (dateStop - dateNow) / 1000,
			seconds = Math.floor(timeToStop % 60),
			minutes = Math.floor((timeToStop / 60) % 60),
			hours = Math.floor((timeToStop / 60 / 60));
		return { timeToStop, hours, minutes, seconds };
	};

	const updateTimer = () => {
		const timer = getTimeRemaining();
		timerHours.textContent = addZero(timer.hours);
		timerMinutes.textContent = addZero(timer.minutes);
		timerSeconds.textContent = addZero(timer.seconds);

		if (timer.timeToStop < 0) {
			timerTitle.textContent = 'Акция завершилась';
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
