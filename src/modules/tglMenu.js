export const toggleMenu = () => {
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
		if (menu.classList.contains('active-menu')) {
			menu.classList.remove('active-menu');
		}
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
			// eslint-disable-next-line no-unused-vars
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

	document.querySelector('html').addEventListener('click', event => {
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
