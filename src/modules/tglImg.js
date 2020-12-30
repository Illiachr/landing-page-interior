export const commandToggle = () => {
	const commandContent = document.getElementById('command');
	let targetSrc;

	commandContent.addEventListener('mouseover', e => {
		if (e.target.matches('.command__photo')) {
			targetSrc = e.target.src;
			e.target.src = e.target.dataset.img;
		}
	});
	commandContent.addEventListener('mouseout', e => {
		if (e.target.matches('.command__photo')) {
			e.target.src = targetSrc;
		}
	});
};
