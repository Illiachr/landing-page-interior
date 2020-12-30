export const toggleMenu = () => {
	const menuBtn = document.querySelector('.menu'),
		menu = document.querySelector('menu');

	const handlerAnimate = () => {
		let progress = -100; // Анимация с помощью изменние свойства translateX от -100% до 100%

		const step = () => {
			menu.style.transform = `translateX(${progress}%)`;
			progress += 1.5;
			if (progress < 100) {
				requestAnimationFrame(step);
			} else {
				menu.style.transform = 'translateX(100%)';
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

		if (target.closest('main a[href="#service-block"]')) {
			event.preventDefault();
			const id = target.closest('main a[href="#service-block"]').getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
		}
		if (target.closest('menu li')) {
			event.preventDefault();
			const id = target.closest('menu li a').getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
		}
	});
};
