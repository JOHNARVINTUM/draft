(function () {
	'use strict';

	var toggle = document.querySelector('[data-draft-menu-toggle]');
	var menu = document.querySelector('[data-draft-mobile-menu]');
	var socialSidebar = document.querySelector('[data-draft-social-sidebar]');

	function setMenuOpen(isOpen) {
		if (!toggle || !menu) {
			return;
		}

		toggle.classList.toggle('is-open', isOpen);
		menu.classList.toggle('is-open', isOpen);
		document.body.classList.toggle('draft-menu-open', isOpen);
		toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

		if (isOpen) {
			menu.removeAttribute('hidden');
		} else {
			window.setTimeout(function () {
				if (!menu.classList.contains('is-open')) {
					menu.setAttribute('hidden', 'hidden');
				}
			}, 240);
		}
	}

	if (toggle && menu) {
		toggle.addEventListener('click', function () {
			setMenuOpen(!menu.classList.contains('is-open'));
		});

		menu.addEventListener('click', function (event) {
			if (event.target && event.target.closest('a')) {
				setMenuOpen(false);
			}
		});

		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape') {
				setMenuOpen(false);
			}
		});
	}

	function updateSocialSidebar() {
		if (!socialSidebar) {
			return;
		}

		socialSidebar.classList.toggle('is-visible', window.scrollY > 120);
	}

	if (socialSidebar) {
		updateSocialSidebar();
		window.addEventListener('scroll', updateSocialSidebar, { passive: true });
	}
}());

(function () {
	'use strict';

	var rotator = document.querySelector('[data-draft-featured-rotator]');

	if (rotator) {
		var slides = Array.prototype.slice.call(rotator.querySelectorAll('.draft-featured-rotator__slide'));
		var dots = Array.prototype.slice.call(rotator.querySelectorAll('[data-draft-featured-dot]'));
		var prev = rotator.querySelector('[data-draft-featured-prev]');
		var next = rotator.querySelector('[data-draft-featured-next]');
		var current = 0;
		var locked = false;

		function render() {
			slides.forEach(function (slide, index) {
				slide.classList.toggle('is-active', index === current);
			});

			dots.forEach(function (dot, index) {
				dot.classList.toggle('is-active', index === current);
				dot.setAttribute('aria-selected', index === current ? 'true' : 'false');
			});

			if (prev) {
				prev.disabled = current === 0;
			}

			if (next) {
				next.disabled = current === slides.length - 1;
			}
		}

		function goTo(index) {
			if (locked || index < 0 || index >= slides.length || index === current) {
				return;
			}

			locked = true;
			current = index;
			render();
			window.setTimeout(function () {
				locked = false;
			}, 260);
		}

		if (prev) {
			prev.addEventListener('click', function () {
				goTo(current - 1);
			});
		}

		if (next) {
			next.addEventListener('click', function () {
				goTo(current + 1);
			});
		}

		dots.forEach(function (dot, index) {
			dot.addEventListener('click', function () {
				goTo(index);
			});
		});

		render();
	}

	document.addEventListener('click', function (event) {
		var button = event.target && event.target.closest('[data-draft-copy-link]');

		if (!button || !navigator.clipboard) {
			return;
		}

		navigator.clipboard.writeText(button.getAttribute('data-draft-copy-link') || window.location.href);
	});
}());

(function () {
	'use strict';

	function initMagazineArchive(archive) {
		if (!archive || archive.getAttribute('data-draft-magazines-ready') === 'true') {
			return;
		}

		var slides = Array.prototype.slice.call(archive.querySelectorAll('[data-draft-magazines-slide]'));
		var dots = Array.prototype.slice.call(archive.querySelectorAll('[data-draft-magazines-dot]'));
		var cards = Array.prototype.slice.call(archive.querySelectorAll('[data-draft-magazines-card]'));
		var currentLink = archive.querySelector('[data-draft-magazines-current-link]');
		var currentTitle = archive.querySelector('[data-draft-magazines-current-title]');
		var currentSubtitle = archive.querySelector('[data-draft-magazines-current-subtitle]');
		var currentDescription = archive.querySelector('[data-draft-magazines-current-description]');
		var current = 0;
		var timer = null;
		var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!slides.length || !dots.length) {
			return;
		}

		archive.setAttribute('data-draft-magazines-ready', 'true');

		slides.forEach(function (slide, index) {
			slide.setAttribute('data-draft-magazines-index', String(index));
		});

		dots.forEach(function (dot, index) {
			dot.setAttribute('data-draft-magazines-index', String(index));
			if (!dot.hasAttribute('aria-label')) {
				dot.setAttribute('aria-label', 'Show magazine issue ' + (index + 1));
			}
		});

		function render() {
			slides.forEach(function (slide, index) {
				var isActive = index === current;
				slide.classList.toggle('is-active', isActive);
				slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
			});

			dots.forEach(function (dot, index) {
				var isActive = index === current;
				dot.classList.toggle('is-active', isActive);
				dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
				dot.setAttribute('aria-current', isActive ? 'true' : 'false');
			});

			cards.forEach(function (card, index) {
				card.classList.toggle('is-current', index === current);
			});

			if (!slides[current]) {
				return;
			}

			if (currentLink) {
				currentLink.setAttribute('href', slides[current].getAttribute('data-url') || slides[current].getAttribute('href') || '#');
			}

			if (currentTitle) {
				currentTitle.textContent = slides[current].getAttribute('data-title') || '';
			}

			if (currentSubtitle) {
				currentSubtitle.textContent = slides[current].getAttribute('data-subtitle') || '';
				currentSubtitle.hidden = currentSubtitle.textContent.trim() === '';
			}

			if (currentDescription) {
				currentDescription.textContent = slides[current].getAttribute('data-description') || '';
			}
		}

		function goTo(index) {
			if (!slides.length || !Number.isFinite(index)) {
				return;
			}

			current = ((index % slides.length) + slides.length) % slides.length;
			render();
		}

		function stopTimer() {
			if (timer) {
				window.clearInterval(timer);
				timer = null;
			}
		}

		function startTimer() {
			if (reduceMotion || slides.length < 2) {
				return;
			}

			stopTimer();
			timer = window.setInterval(function () {
				goTo(current + 1);
			}, 5000);
		}

		archive.addEventListener('click', function (event) {
			var dot = event.target && event.target.closest('[data-draft-magazines-dot]');

			if (!dot || !archive.contains(dot)) {
				return;
			}

			event.preventDefault();
			goTo(parseInt(dot.getAttribute('data-draft-magazines-index') || dot.getAttribute('data-draft-magazines-dot'), 10));
			startTimer();
		});

		archive.addEventListener('mouseenter', stopTimer);
		archive.addEventListener('mouseleave', startTimer);

		render();
		startTimer();
	}

	function bootMagazineArchives() {
		Array.prototype.forEach.call(document.querySelectorAll('[data-draft-magazines-featured]'), initMagazineArchive);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', bootMagazineArchives, { once: true });
	} else {
		bootMagazineArchives();
	}
}());

(function () {
	'use strict';

	var hero = document.querySelector('[data-draft-home-hero]');

	if (!hero) {
		return;
	}

	var slides = Array.prototype.slice.call(hero.querySelectorAll('[data-draft-home-hero-slide]'));
	var dots = Array.prototype.slice.call(hero.querySelectorAll('[data-draft-home-hero-dot]'));
	var current = 0;
	var timer = null;
	var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function render() {
		slides.forEach(function (slide, index) {
			slide.classList.toggle('is-active', index === current);
			slide.setAttribute('aria-hidden', index === current ? 'false' : 'true');
		});

		dots.forEach(function (dot, index) {
			dot.classList.toggle('is-active', index === current);
			dot.setAttribute('aria-selected', index === current ? 'true' : 'false');
		});
	}

	function goTo(index) {
		if (!slides.length) {
			return;
		}

		current = ((index % slides.length) + slides.length) % slides.length;
		render();
	}

	function stopTimer() {
		if (timer) {
			window.clearInterval(timer);
			timer = null;
		}
	}

	function startTimer() {
		if (reduceMotion || slides.length < 2) {
			return;
		}

		stopTimer();
		timer = window.setInterval(function () {
			goTo(current + 1);
		}, 5000);
	}

	dots.forEach(function (dot, index) {
		dot.addEventListener('click', function (event) {
			event.preventDefault();
			goTo(index);
			startTimer();
		});
	});

	render();
	startTimer();
}());

(function () {
	'use strict';

	var carousel = document.querySelector('[data-draft-home-magazine]');

	if (!carousel) {
		return;
	}

	var slides = Array.prototype.slice.call(carousel.querySelectorAll('[data-draft-home-magazine-slide]'));
	var dots = Array.prototype.slice.call(carousel.querySelectorAll('[data-draft-home-magazine-dot]'));
	var prev = carousel.querySelector('[data-draft-home-magazine-prev]');
	var next = carousel.querySelector('[data-draft-home-magazine-next]');
	var activeLink = carousel.querySelector('[data-draft-home-magazine-link]');
	var stage = carousel.querySelector('.draft-home-magazine__stage');
	var current = 0;
	var timer = null;
	var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function getStep() {
		var source = stage || carousel;
		var step = window.getComputedStyle(source).getPropertyValue('--draft-home-magazine-step');
		var parsed = parseFloat(step);

		if (Number.isFinite(parsed) && step.indexOf('clamp(') === -1 && step.indexOf('calc(') === -1) {
			return parsed;
		}

		var activeSlide = carousel.querySelector('.draft-home-magazine__slide.is-center') || slides[0];
		var slideWidth = activeSlide ? parseFloat(window.getComputedStyle(activeSlide).width) : 248;

		return Math.min(200, Math.max(112, slideWidth * (200 / 248)));
	}

	function shortestOffset(index, active, len) {
		var raw = index - active;

		if (raw > len / 2) {
			raw -= len;
		}

		if (raw < -len / 2) {
			raw += len;
		}

		return raw;
	}

	function render() {
		var step = getStep();

		slides.forEach(function (slide, index) {
			var offset = shortestOffset(index, current, slides.length);
			var abs = Math.abs(offset);
			var visible = abs <= 1;
			var scale = offset === 0 ? 1 : 0.78;
			var brightness = offset === 0 ? 1 : 0.65;

			slide.classList.toggle('is-center', offset === 0);
			slide.classList.toggle('is-side', visible && offset !== 0);
			slide.classList.toggle('is-hidden', !visible);
			slide.style.transform = 'translate(calc(-50% + ' + (offset * step) + 'px), -50%) scale(' + scale + ')';
			slide.style.filter = 'brightness(' + brightness + ')';
			slide.style.zIndex = String(20 - abs);
			slide.setAttribute('aria-hidden', offset === 0 ? 'false' : 'true');
		});

		dots.forEach(function (dot, index) {
			dot.classList.toggle('is-active', index === current);
			dot.setAttribute('aria-selected', index === current ? 'true' : 'false');
		});

		if (activeLink && slides[current]) {
			var currentAnchor = slides[current].querySelector('a');
			if (currentAnchor) {
				activeLink.setAttribute('href', currentAnchor.getAttribute('href'));
			}
		}
	}

	function goTo(index) {
		if (!slides.length) {
			return;
		}

		current = ((index % slides.length) + slides.length) % slides.length;
		render();
	}

	function stopTimer() {
		if (timer) {
			window.clearInterval(timer);
			timer = null;
		}
	}

	function startTimer() {
		if (reduceMotion || slides.length < 2) {
			return;
		}

		stopTimer();
		timer = window.setInterval(function () {
			goTo(current + 1);
		}, 4500);
	}

	slides.forEach(function (slide, index) {
		slide.addEventListener('click', function (event) {
			if (index === current) {
				return;
			}

			event.preventDefault();
			goTo(index);
			startTimer();
		});
	});

	dots.forEach(function (dot, index) {
		dot.addEventListener('click', function () {
			goTo(index);
			startTimer();
		});
	});

	if (prev) {
		prev.addEventListener('click', function () {
			goTo(current - 1);
			startTimer();
		});
	}

	if (next) {
		next.addEventListener('click', function () {
			goTo(current + 1);
			startTimer();
		});
	}

	window.addEventListener('resize', render, { passive: true });
	render();
	startTimer();
}());

(function () {
	'use strict';

	function initCoversCarousel(carousel) {
		var slides = Array.prototype.slice.call(carousel.querySelectorAll('[data-draft-covers-slide]'));
		var dots = Array.prototype.slice.call(carousel.querySelectorAll('[data-draft-covers-dot]'));
		var current = 0;
		var previous = null;
		var locked = false;
		var timer = null;
		var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		var duration = 650;

		if (!slides.length || !dots.length) {
			return;
		}

		slides.forEach(function (slide, index) {
			slide.setAttribute('data-draft-covers-index', String(index));
		});

		dots.forEach(function (dot, index) {
			dot.setAttribute('data-draft-covers-index', String(index));
			dot.setAttribute('aria-controls', 'draft-covers-slide-' + index);
			if (!dot.hasAttribute('aria-label')) {
				dot.setAttribute('aria-label', 'Show cover ' + (index + 1));
			}
		});

		function render(isAnimated) {
			slides.forEach(function (slide, index) {
				slide.id = slide.id || 'draft-covers-slide-' + index;
				slide.classList.toggle('is-active', index === current);
				slide.classList.toggle('is-previous', previous === index && isAnimated && !reduceMotion);
				slide.classList.toggle('is-entering', index === current && isAnimated && !reduceMotion);
				slide.setAttribute('aria-hidden', index === current ? 'false' : 'true');
			});

			dots.forEach(function (dot, index) {
				var isActive = index === current;
				dot.classList.toggle('is-active', isActive);
				dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
				dot.setAttribute('aria-current', isActive ? 'true' : 'false');
			});
		}

		function goTo(index, isUserAction) {
			if (!slides.length || locked) {
				return;
			}

			var next = ((index % slides.length) + slides.length) % slides.length;

			if (next === current) {
				if (isUserAction) {
					startTimer();
				}
				return;
			}

			previous = current;
			current = next;
			locked = true;
			render(true);

			window.setTimeout(function () {
				previous = null;
				locked = false;
				render(false);
			}, reduceMotion ? 0 : duration + 60);
		}

		function stopTimer() {
			if (timer) {
				window.clearInterval(timer);
				timer = null;
			}
		}

		function startTimer() {
			if (reduceMotion || slides.length < 2) {
				return;
			}

			stopTimer();
			timer = window.setInterval(function () {
				goTo(current + 1, false);
			}, 4500);
		}

		carousel.addEventListener('click', function (event) {
			var dot = event.target && event.target.closest('[data-draft-covers-dot]');

			if (!dot || !carousel.contains(dot)) {
				return;
			}

			event.preventDefault();
			goTo(parseInt(dot.getAttribute('data-draft-covers-index'), 10), true);
			startTimer();
		});

		carousel.addEventListener('mouseenter', stopTimer);
		carousel.addEventListener('mouseleave', startTimer);

		render(false);
		startTimer();
	}

	Array.prototype.forEach.call(document.querySelectorAll('[data-draft-covers-carousel]'), initCoversCarousel);
}());

