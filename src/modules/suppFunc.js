export const addElem = (strClass, strSelectorAppend, strTag) => {
	const elem = document.createElement(strTag),
		elemAppend = document.querySelector(strSelectorAppend);
	elem.classList.add(strClass);
	elemAppend.append(elem);
	return elem;
};
