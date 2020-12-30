export const sendForm = formID => {
	const errorMsg = `Что-то пошло не так...`,
		successMsg = `Спасибо! Мы скоро с Вами свяжемся`,
		form = document.getElementById(formID),
		statusMsg = document.createElement('h3'),
		loader = document.createElement('div');

	const postData = data =>
		fetch('./server.php', {
			'method': 'POST',
			'headers': {
				'Content-Type': 'application/json'
			},
			'body': JSON.stringify(data)
		}); // end postData

	loader.classList.add('loader');
	statusMsg.classList.add('status-msg');

	form.addEventListener('input', e => {
		const trg = e.target;

		if (trg.matches('input[name=user_name]') || trg.matches('input[name=user_message]')) {
			trg.value = trg.value.replace(/[^аА-яёЯЁ ]/, '');
		}

		if (trg.matches('input[name=user_phone]')) {
			trg.value = trg.value.replace(/[^+\d]/, '');
		}

		if (trg.matches('input[name=user_email]')) {
			trg.value = trg.value.replace(/[^a-z-0-9@.]/i, '');
		}
	}); // end form listener input

	form.addEventListener('submit', e => {
		e.preventDefault();
		const formData = new FormData(form),
			body = {};

		form.appendChild(loader);
		form.appendChild(statusMsg);
		loader.classList.add('active');
		formData.forEach((val, key) => body[key] = val);

		postData(body)
			.then(response => {
				loader.classList.remove('active');
				if (response.status !== 200) { throw new Error('status network not 200');  }
				statusMsg.classList.add('active');
				statusMsg.textContent = successMsg;
			})
			.catch(error => {
				statusMsg.classList.add('active');
				statusMsg.textContent = errorMsg;
				console.error(error);
			})
			.finally(() => {
				form.reset();
				setTimeout(() => {
					statusMsg.classList.remove('active');
				}, 2000);
			});
	});
};
