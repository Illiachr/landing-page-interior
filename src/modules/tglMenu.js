export const toggleMenu = () => {
	const menuBtn = document.querySelector('.menu'),
		menu = document.querySelector('menu');
		
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
			handlerToggle();
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
