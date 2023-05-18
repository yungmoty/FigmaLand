
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
