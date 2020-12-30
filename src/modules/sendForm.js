export const sendForm = formID => {
	const errorMsg = `Что-то пошло не так...`,
		loadMsg = `Загрузка...`,
		successMsg = `Спасибо! Мы скоро с Вами свяжемся`,
		form = document.getElementById(formID),
		statusMsg = document.createElement('h3');

	const postData = data =>
		fetch('./server.php', {
			'method': 'POST',
			'headers': {
				'Content-Type': 'application/json'
			},
			'body': JSON.stringify(data)
		}); // end postData

	statusMsg.style.cssText = `font-size: 2rem;`;

	form.addEventListener('input', e => {
		const trg = e.target;

		if (trg.matches('input[name=user_name]') || trg.matches('input[name=user_message]')) {
			trg.value = trg.value.replace(/[^аА-яёЯЁ ]/, '');
		}

		if (trg.matches('input[name=user_phone]')) {
			trg.value = trg.value.replace(/^\+{2,}[^\d]/, '');
		}

		if (trg.matches('input[name=user_email]')) {
			trg.value = trg.value.replace(/[^a-z-0-9@.]/i, '');
		}
	}); // end form listener input

	form.addEventListener('submit', e => {
		e.preventDefault();

		const formData = new FormData(form),
			body = {};

		form.appendChild(statusMsg);
		formData.forEach((val, key) => body[key] = val);
		statusMsg.textContent = loadMsg;

		postData(body)
			.then(response => {
				if (response.status !== 200) { throw new Error('status network not 200');  }
				statusMsg.textContent = successMsg;
			})
			.catch(error => {
				statusMsg.textContent = errorMsg;
				console.error(error);
			})
			.finally(form.reset());
	});
};
