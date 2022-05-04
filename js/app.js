/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}

//-- Анимация цифер ------------------------------------------------------
var number = document.querySelector('.number'),
numberTop = number.getBoundingClientRect().top,
start = +number.innerHTML, end = +number.dataset.max;

window.addEventListener('scroll', function onScroll() {
if(window.pageYOffset < numberTop) {
	this.removeEventListener('scroll', onScroll);
	var interval = setInterval(function() {
		number.innerHTML = ++start;
		if(start == end) {
			clearInterval(interval);
			}
		}, 6);
	}
});


//--------------------------------------------------------------
var number02 = document.querySelector('.number02'),
numberTop02 = number02.getBoundingClientRect().top,
start02 = +number02.innerHTML, end02 = +number02.dataset.max02;

window.addEventListener('scroll', function onScroll() {
if(window.pageYOffset < numberTop02) {
	this.removeEventListener('scroll', onScroll);
	var interval02 = setInterval(function() {
		number02.innerHTML = ++start02;
		if(start02 == end02) {
			clearInterval(interval02);
			}
		}, 5);
	}
});

//--------------------------------------------------------------
var number03 = document.querySelector('.number03'),
numberTop03 = number03.getBoundingClientRect().top,
start03 = +number03.innerHTML, end03 = +number03.dataset.max03;

window.addEventListener('scroll', function onScroll() {
if(window.pageYOffset < numberTop03) {
	this.removeEventListener('scroll', onScroll);
	var interval03 = setInterval(function() {
		number03.innerHTML = ++start03;
		if(start03 == end03) {
			clearInterval(interval03);
			}
		}, 2);
	}
});


//--------------------------------------------------------------
var number04 = document.querySelector('.number04'),
numberTop04 = number04.getBoundingClientRect().top,
start04 = +number04.innerHTML, end04 = +number04.dataset.max04;

window.addEventListener('scroll', function onScroll() {
if(window.pageYOffset < numberTop04) {
	this.removeEventListener('scroll', onScroll);
	var interval04 = setInterval(function() {
		number04.innerHTML = ++start04;
		if(start04 == end04) {
			clearInterval(interval04);
			}
		}, 50);
	}
});
//-- /Анимация цифер ------------------------------------------------------



// -- Валидация формы ---------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);
		formData.append('image', formImage.files[0]);

		if (error === 0) {
			form.classList.add('_sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}

	}


	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	//Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	//Получаем инпут file в переменную
	const formImage = document.getElementById('formImage');
	//Получаем див для превью в переменную
	const formPreview = document.getElementById('formPreview');

	//Слушаем изменения в инпуте file
	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0]);
	});

	function uploadFile(file) {
		// провераяем тип файла
		if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
			alert('Разрешены только изображения.');
			formImage.value = '';
			return;
		}
		// проверим размер файла (<2 Мб)
		if (file.size > 2 * 1024 * 1024) {
			alert('Файл должен быть менее 2 МБ.');
			return;
		}

		var reader = new FileReader();
		reader.onload = function (e) {
			formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
		};
		reader.onerror = function (e) {
			alert('Ошибка');
		};
		reader.readAsDataURL(file);
	}
});
// -- /Валидация формы ---------------------------------------------


// -- Прокрутка при клике ---------------------------------------------
const menuLinksGoTo = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinksGoTo.length > 0) {
	menuLinksGoTo.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}
// -- /Прокрутка при клике ---------------------------------------------




//-- products-tabs -------------------------------------------------------------------------
const tabsBtn   = document.querySelectorAll(".tabs__nav-btn");
const tabsItems = document.querySelectorAll(".tabs__item");

tabsBtn.forEach(onTabClick);

function onTabClick(item) {
    item.addEventListener("click", function() {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute("data-tab");
        let currentTab = document.querySelector(tabId);

        if( ! currentBtn.classList.contains('active') ) {
            tabsBtn.forEach(function(item) {
                item.classList.remove('active');
            });
    
            tabsItems.forEach(function(item) {
                item.classList.remove('active');
            });
    
            currentBtn.classList.add('active');
            currentTab.classList.add('active');
        }
    });
}

document.querySelector('.tabs__nav-btn').click();
//--  products-tabs -------------------------------------------------------------------------



// -- Валидация формы ---------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	//Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
});
// -- /Валидация формы ---------------------------------------------




"use strict"

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
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
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touch');

	let menuArrows = document.querySelectorAll('.menu__arrow');
	if (menuArrows.length > 0) {
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			menuArrow.addEventListener("click", function (e) {
				menuArrow.parentElement.classList.toggle('_active');
			});
		}
	}

}
else {
	document.body.classList.add('_pc');
}


// -- Меню бургер ----------------------------------------------
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const menuBodyBurger = document.querySelector('.menu__link');

if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	});
}

// скрытие после клика на пункт меню
const menuLinks = document.querySelectorAll('.menu__link');
if (menuLinks.length > 0) {
   menuLinks.forEach(menuLink => {
      menuLink.addEventListener("click", onMenuLinkClick);
   });
   function onMenuLinkClick(e) {

      if (iconMenu.classList.contains('_active')) {
         document.body.classList.remove('_lock');
         iconMenu.classList.remove('_active');
         menuBody.classList.remove('_active');
         menuBodyBurger.classList.toggle('_active');
      }

   }
}
// -- /Меню бургер ----------------------------------------------


// -- search-button ----------------------------------------------
const iconSearch = document.querySelector('.header__bottom-search');
const searchForm = document.querySelector('.header__bottom-search-form');

if (iconSearch) {
	iconSearch.addEventListener("click", function (e) {
		iconSearch.classList.toggle('_active');
		searchForm.classList.toggle('_active');
	});
}
// -- /search-button ----------------------------------------------


// -- Hide header on scroll ----------------------------------------------
const element = document.querySelector('.header__top');

window.addEventListener('scroll', function () {
	if (window.scrollY > 70) {
		element.classList.add("_hide");
  } 
  else if (window.scrollY < 70) {
		element.classList.remove("_hide");
  }
});


const element2 = document.querySelector('.header__bottom');

window.addEventListener('scroll', function () {
	if (window.scrollY > 70) {
		element2.classList.add("_height");
  } 
  else if (window.scrollY < 70) {
		element2.classList.remove("_height");
  }
});
// -- /Hide header on scroll ----------------------------------------------



//-- Swiper -------------------------------------------------------------------------

	import Swiper, { Navigation, Pagination } from 'swiper';

	Swiper.use([Navigation, Pagination]);
//-- /Swiper -------------------------------------------------------------------------



//-- intro-slider -------------------------------------------------------------------------
	let introSlider = new Swiper('.intro__slider', {

		direction: 'vertical',
		loop: true,
		effect: 'fade',
		simulateTouch: false,
		speed: 500,

		navigation: {
		  nextEl: '.intro__slider-btn--next',
		  prevEl: '.intro__slider-btn--prev',
		},
		
	});
//-- /intro-slider -------------------------------------------------------------------------



//-- intro-slider-2 -------------------------------------------------------------------------
let introSlider2 = new Swiper('.intro__slider-2', {

	direction: 'horizontal',
	loop: true,
	effect: 'slide',
	simulateTouch: false,
	speed: 800,

	navigation: {
	  nextEl: '.intro__slider-btn--next',
	  prevEl: '.intro__slider-btn--prev',
	},
	
});


introSlider.controller.control = introSlider2;
introSlider2.controller.control = introSlider;
//-- /intro-slider-2 -------------------------------------------------------------------------







//-- Scroll_animation ------------------------------------------------------
// const animItems = document.querySelectorAll('._anim-items');

// if (animItems.length > 0) {
// 	window.addEventListener('scroll', animOnScroll);
// 	function animOnScroll() {
// 		for (let index = 0; index < animItems.length; index++) {
// 			const animItem = animItems[index];
// 			const animItemHeight = animItem.offsetHeight;
// 			const animItemOffset = offset(animItem).top;
// 			const animStart = 4;

// 			let animItemPoint = window.innerHeight - animItemHeight / animStart;
// 			if (animItemHeight > window.innerHeight) {
// 				animItemPoint = window.innerHeight - window.innerHeight / animStart;
// 			}

// 			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
// 				animItem.classList.add('_active');
// 			} else {
// 				if (!animItem.classList.contains('_anim-no-hide')) {
// 					animItem.classList.remove('_active');
// 				}
// 			}
// 		}
// 	}
// 	function offset(el) {
// 		const rect = el.getBoundingClientRect(),
// 			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
// 			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
// 		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
// 	}

// 	setTimeout(() => {
// 		animOnScroll();
// 	}, 300);
// }
//-- /Scroll_animation ------------------------------------------------------




