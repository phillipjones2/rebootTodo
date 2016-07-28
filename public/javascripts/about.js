
const personalInfoContainers = document.getElementsByClassName('personal-info-container');
for (let container of personalInfoContainers) {
	container.addEventListener('click', e => {
		container.classList.add('left-25');
	});
}