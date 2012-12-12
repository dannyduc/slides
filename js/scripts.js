var Slides = {
	
	totalSlides: '',

	slideWidth: '',

	translateAmount: '',

	currentSlide: 0,

	container: $('#slides'),

	init: function(totalSlides) {
		if (!totalSlides) throw new Error('Please pass the total number of slides');
		Slides.totalSlides = ~~totalSlides;

		Slides.loadContent();
		Slides.setSlideWidth();
		Slides.keyPress();

		if (/#slide-\d{1,3}/i.test(location.href)) {
			Slides.current = ~~location.hash.split('-')[1];
			Slides.goto();
		}
	},

	loadContent: function() {			
		var frag = document.createDocumentFragment(),
			bit;
		for (var i = 0; i < Slides.totalSlides; i++) {
			bit = $('<div id="#slide-' + i + '"></div>')
				.load('slides/' + i + '.html')[0];
			frag.appendChild(bit);				
		}
		Slides.container.append(frag);
	},

	setSlideWidth: function() {
		var each = Slides.container.children('div');
		Slides.slideWidth = each.width() + (parseInt(each.css('margin-right')));
	},

	keyPress: function() {
		$(document.body).keydown(function(e) {
			if (e.keyCode === 37 || e.keyCode === 39) {
				e.preventDefault();
				(e.keyCode === 39) ? Slides.next() : Slides.prev();
			}
		});
	},

	next: function() {
		if (Slides.currentSlide >= Slides.totalSlides - 1) return;
		Slides.translateAmount -= Slides.slideWidth;
		++Slides.currentSlide;
		Slides.updateHash();
		Slides.animate();
	},

	prev: function() {
		if (Slides.currentSlide <= 0) return;
		Slides.translateAmount += Slides.slideWidth;
		--Slides.currentSlide;
		Slides.updateHash();
		Slides.animate();
	},

	goto: function() {
		Slides.translateAmount = -Slides.slideWidth * Slides.currentSlide;
		Slides.animate();
	},

	animate: function() {
		Slides
			.container
			.children()
				.css('-webkit-transform', 'translateX(' + Slides.translateAmount + 'px)')
	},

	updateHash: function() {
		location.hash = '#slide-' + Slides.currentSlide;
	}
};

// Let's do this!
Slides.init(2);