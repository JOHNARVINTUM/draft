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
		var slides = Array.prototype.slice.call(rotator.querySelectorAll('[data-draft-featured-slide]'));
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

	var carousel = document.querySelector('[data-draft-magazine-carousel]');

	if (!carousel) {
		return;
	}

	var slides = Array.prototype.slice.call(carousel.querySelectorAll('[data-draft-magazine-slide]'));
	var dots = Array.prototype.slice.call(carousel.querySelectorAll('[data-draft-magazine-dot]'));
	var prev = carousel.querySelector('[data-draft-magazine-prev]');
	var next = carousel.querySelector('[data-draft-magazine-next]');
	var current = 0;
	var sideScale = 0.84;
	var farScale = 0.7;

	function pxVar(name, fallback) {
		var value = window.getComputedStyle(carousel).getPropertyValue(name).trim();
		var parsed = parseFloat(value);
		return Number.isFinite(parsed) ? parsed : fallback;
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

	function goTo(index) {
		if (!slides.length) {
			return;
		}

		current = ((index % slides.length) + slides.length) % slides.length;
		render();
	}

	function render() {
		var step = pxVar('--draft-magazine-step', 168);

		slides.forEach(function (slide, index) {
			var offset = shortestOffset(index, current, slides.length);
			var abs = Math.abs(offset);
			var visible = abs <= 2;
			var scale = offset === 0 ? 1 : abs === 1 ? sideScale : farScale;
			var translateX = offset * step;
			var brightness = offset === 0 ? 1 : 0.72;

			slide.style.display = visible ? 'block' : 'none';
			slide.style.transform = 'translateX(' + translateX + 'px) scale(' + scale + ')';
			slide.style.zIndex = String(30 - abs * 10);
			slide.style.opacity = visible ? '1' : '0';
			slide.style.filter = 'brightness(' + brightness + ')';
			slide.style.cursor = offset === 0 ? 'default' : 'pointer';
			slide.style.boxShadow = offset === 0
				? '0 30px 70px rgba(0,0,0,0.28), 0 8px 24px rgba(0,0,0,0.12)'
				: '0 12px 30px rgba(0,0,0,0.18)';
			slide.setAttribute('aria-hidden', offset === 0 ? 'false' : 'true');
		});

		dots.forEach(function (dot, index) {
			dot.classList.toggle('is-active', index === current);
			dot.setAttribute('aria-selected', index === current ? 'true' : 'false');
		});
	}

	slides.forEach(function (slide, index) {
		slide.addEventListener('click', function () {
			if (index !== current) {
				goTo(index);
			}
		});
	});

	dots.forEach(function (dot, index) {
		dot.addEventListener('click', function () {
			goTo(index);
		});
	});

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

	window.addEventListener('resize', render, { passive: true });
	render();
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
	var current = 0;
	var timer = null;
	var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function getStep() {
		return window.matchMedia && window.matchMedia('(max-width: 767px)').matches ? 155 : 200;
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
