
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	Blackberry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.Blackberry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows()
		);
	}
}

//\\burger\\//
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener('click', function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}
//\\burger//\\


//\\accordion\\//
if (isMobile.any()) {
	const accordions = document.querySelectorAll('._accordion');

	accordions.forEach(element => {
		element.addEventListener('click', (e) => {
			const target = e.currentTarget;
			let menuFooter = target.querySelector('.footer__title');
			let menuFooterList = target.querySelector('.footer__list');

			if (target.querySelector('.footer__title')) {
				menuFooter.parentElement.classList.toggle('_active');

				if (menuFooter.parentElement.classList.contains('_active')) {
					menuFooterList.style.maxHeight = menuFooterList.scrollHeight + 'px';
				} else {
					menuFooterList.style.maxHeight = null;
				}
			}
		});
	})
}
//\\accordion//\\


//\\More Products\\//
const buttonMore = document.querySelector('.button__more');

buttonMore.addEventListener('click', (e) => {
	getProducts(buttonMore);
	e.preventDefault();
});
//\\More Products//\\

// Load More Products
async function getProducts(button) {
	if (!button.classList.contains('_hold')) {
		button.classList.add('_hold');
		const file = 'json/gallery.json';
		let response = await fetch(file, {
			method: 'GET'
		});
		if (response.ok) {
			let result = await response.json();
			setTimeout(() => {
				loadProducts(result);
				button.classList.remove('_hold');
				button.remove();
			}, 1000);
			
		} else {
			alert('Error');
		}
	}
}

// JSON load
function loadProducts(data) {
	const galleryBody = document.querySelector('.gallery__body');

	galleryBody.insertAdjacentHTML('beforeend', `<div class="gallery__row-2"></div>`);

	const galleryRow = document.querySelector('.gallery__row-2');

	data.gallery.forEach(item => {
		const galleryId = item.id;
		const galleryImage = item.image;
		const galleryNums = item.nums;

		let galleryTemplate = `
			<a data-id="${galleryId}" href="" class="gallery__image _ibg">
				<img src="images/gallery/${galleryImage}" alt="Image-${galleryNums}">
			</a>			
		`
		galleryRow.insertAdjacentHTML('beforeend', galleryTemplate);
	})
}