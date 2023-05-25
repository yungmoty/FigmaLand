
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

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

if (!isMobile.any()) {
	ScrollSmoother.create({
		wrapper: '.wrapper',
		content: '.content',
		smooth: 1.2,
		effects: true,
	})

	gsap.fromTo('.work', { opacity: 1 } , {
		opacity: 0,
		scrollTrigger: {
			trigger: '.work',
			start: 'center',
			end: '400',
			scrub: true,
		}
	})

	gsap.fromTo('.features', { y: 100, opacity: 0 }, {
		opacity: 1, y: 0,
		scrollTrigger: {
			trigger: '.features',
			start: '-600',
			end: '-100',
			scrub: true,
		}
	})

	let featuresRows = document.querySelectorAll('.row');
	featuresRows.forEach(row => {
		gsap.fromTo(row, { x: 50, opacity: 0 }, {
			opacity: 1, x: 0,
			scrollTrigger: {
				trigger: row,
				start: '-850',
				end: '-100',
				scrub: true,
			}
		})
	})

	gsap.fromTo('.block_left', { x: -70, y: 50, opacity: 0 }, {
		opacity: 1, x: 0, y: 0,
		scrollTrigger: {
			trigger: '.block_left',
			start: '-600',
			end: '-40',
			scrub: true,
		}
	})

	gsap.fromTo('.block_right', { x: 70, y: 50, opacity: 0 }, {
		opacity: 1, x: 0, y: 0,
		scrollTrigger: {
			trigger: '.block_right',
			start: '-600',
			end: '-40',
			scrub: true,
		}
	})

	gsap.fromTo('.gallery', { y: 100, opacity: 0 }, {
		opacity: 1, y: 0,
		scrollTrigger: {
			trigger: '.gallery',
			start: '-600',
			end: '-100',
			scrub: true,
		}
	})

	gsap.fromTo('.partners', { y: 100, opacity: 0 }, {
		opacity: 1, y: 0,
		scrollTrigger: {
			trigger: '.partners',
			start: '-600',
			end: '-100',
			scrub: true,
		}
	})

	gsap.fromTo('.testimonials', { y: 100, opacity: 0 }, {
		opacity: 1, y: 0,
		scrollTrigger: {
			trigger: '.testimonials',
			start: '-600',
			end: '-100',
			scrub: true,
		}
	})

	let testimonialsColumns = document.querySelectorAll('.column');
	testimonialsColumns.forEach(column => {
		gsap.fromTo(column, { y: 100, opacity: 0 }, {
			opacity: 1, y: 0,
			scrollTrigger: {
				trigger: column,
				start: '-750',
				end: '-100',
				scrub: true,
			}
		})
	})
}

//\\burger\\//
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
	iconMenu.addEventListener('click', function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_open');
		menuBody.classList.toggle('_open');
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
				menuFooter.parentElement.classList.toggle('_open');

				if (menuFooter.parentElement.classList.contains('_open')) {
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

//\\Modal window\\//
const btnRegister = document.querySelector('.button-header');
const modalWindow = document.getElementById('registration-form');
const formRegister = document.querySelector('.registration-form__wrapper');
const formError = document.querySelector('.registration-form__error');
const registerInput = document.querySelectorAll('.form-content__input');
const formPassBtn = document.querySelector('.registration-form__pass');

function dontActive(e) {
	formPassBtn.classList.add('_dontActive');
}

registerInput.forEach(item => {
	item.addEventListener('input', () => {
		item.classList.remove('_error')
		if (registerInput[0].value !== '' && registerInput[1].value !== '') formPassBtn.classList.remove('_dontActive');
		
		if (!registerInput[0].classList.contains('_error') && !registerInput[1].classList.contains('_error')) {
			formError.classList.remove('_error');
		}
	})
})

modalWindow.addEventListener('submit', formSend);

async function formSend(e) {
	e.preventDefault()

	let error = formValidate(modalWindow)

	let formData = new FormData(modalWindow)

	if (error === 0) {

		let response = await fetch('sendmail.php', {
			method: 'POST',
			body: formData
		})
	} else {
		// alert('Fill in required fields')
		formError.classList.add('_error');
		registerInput.forEach(item => item.classList.add('_error'))
	}
}

btnRegister.addEventListener('click', (event) => {
	event.preventDefault();
	dontActive();
	popupOpen(modalWindow)	
});


formRegister.addEventListener('click', (event) => {
	let targetElement = event.target
	
	if (targetElement.classList.contains('registration-form__sign-up')) {
		formRegister.classList.add('_signUp');
		formRegister.classList.remove('_logIn');
		document.querySelector('.registration-form__input').classList.add('_required');
	}
	if (targetElement.classList.contains('registration-form__log-in')) {
		formRegister.classList.add('_logIn');
		formRegister.classList.remove('_signUp');
		document.querySelector('.registration-form__input').classList.remove('_required');
	}
	if (!targetElement.closest('.form-content__item')) {
		removeStyleInput();
	}
	if (targetElement.classList.contains('registration-form__close')) {
		popupClose(targetElement.closest('#registration-form'))
		formError.classList.remove('_error');
		registerInput.forEach(item => {
			item.value = '';
			item.classList.remove('_error')
		})
	}
});


registerInput.forEach(input => {
	input.addEventListener('click', (e) => {
		const target = e.currentTarget;
		if (target.closest('.form-content__item')) {
			removeStyleInput();
			target.style.border = `2px solid var(--color1)`;
			target.style.boxShadow = `0 0 5px gray`;
		}
	});
})

function removeStyleInput() {
 const inputs = document.querySelectorAll('.form-content__input');

 inputs.forEach(input => {
	input.style.border = `2px solid gray`;
	input.style.boxShadow = `none`;
 })
}

function formValidate(form) {
	let error = 0
	let formReq = document.querySelectorAll('._required');

	for (let index = 0; index < formReq.length; index++) {
		const input = formReq[index];

		formRemoveError(input)

		if (input.classList.contains('_email')) {
			if (emailTest(input)) {
				formAddError(input);
				error++;
			}
		} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
			formAddError(input);
			error++;
		} else {
			if (input.value === '') {
				formAddError(input);
				error++;
			}
		}
	}
	return error
}

function emailTest(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
}

function formAddError(input) {
	input.parentElement.classList.add('_error')
	input.classList.add('_error')
}
function formRemoveError(input) {
	input.parentElement.classList.remove('_error')
	input.classList.remove('_error')
}

// Animation 
const TIMEOUT = 800;
let unlock = true;
const headerPadding = document.querySelectorAll('.header');

function popupOpen(currentModalWindow) {
	if (currentModalWindow && unlock) {
		const popupActive = document.querySelector('#registration-form._open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentModalWindow.classList.add('_open');

		currentModalWindow.addEventListener('click', function (e) {
			if (!e.target.closest('.registration-form__wrapper')) {
				popupClose(e.target.closest('#registration-form'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('_open');
		formError.classList.remove('_error');
		registerInput.forEach(item => {
			item.value = '';
			item.classList.remove('_error')
		})
		if (doUnlock) {
			bodyUnlock();
		}
	}
}
// При открытие окна не дергается экран
function bodyLock() {
	const headerPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth +'px';

	if (headerPadding.length > 0) { 
		for (let i = 0; i < headerPadding.length; i++) {
			const elem = headerPadding[i];
			elem.style.paddingRight = headerPaddingValue;
		}
	}
	document.body.style.paddingRight = headerPaddingValue;
	document.body.classList.add('_lock');

	unlock = false;
	setTimeout(() => {
		unlock = true;
	}, TIMEOUT);
}

function bodyUnlock() {	
	setTimeout(function () {
		if (headerPadding.length > 0) {
			for (let i = 0; i < headerPadding.length; i++) {
				const el = headerPadding[i];
				el.style.paddingRight = '0px';
			}
		}
		document.body.style.paddingRight = '0px';
		document.body.classList.remove('_lock');
	}, TIMEOUT);
	
	unlock = false;
	setTimeout(() => {
		unlock = true;
	}, TIMEOUT);
}

//\\Modal window//\\

//\\Hide and View Pass\\//
function showPassword() {
	const showPasswordBtn = document.querySelector('.form-content__hideNview-pass');
	const passwordInput = document.getElementById('formPassword');


	showPasswordBtn.addEventListener('click', (event) => {
		showPasswordBtn.classList.toggle('_hide');
		if (passwordInput.getAttribute('type') === 'password') passwordInput.setAttribute('type', 'text');
		else passwordInput.setAttribute('type', 'password');
	});

}
showPassword()
//\\Hide and View Pass//\\


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