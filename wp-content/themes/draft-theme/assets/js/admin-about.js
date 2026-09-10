(function ($) {
	'use strict';

	var controls = $('[data-draft-admin-about-image]');

	if (!controls.length || typeof wp === 'undefined' || !wp.media) {
		return;
	}

	controls.on('click', '[data-draft-admin-about-image-select]', function (event) {
		event.preventDefault();

		var control = $(this).closest('[data-draft-admin-about-image]');
		var frame = wp.media({
			title: draftAboutMedia.title,
			button: { text: draftAboutMedia.button },
			multiple: false,
			library: { type: 'image' }
		});

		frame.on('select', function () {
			var attachment = frame.state().get('selection').first().toJSON();
			var preview = attachment.sizes && attachment.sizes.medium ? attachment.sizes.medium.url : attachment.url;

			control.find('[data-draft-admin-about-image-input]').val(attachment.id);
			control.find('[data-draft-admin-about-image-preview]').html('<img src="' + preview + '" alt="" style="display:block;max-width:320px;height:auto;margin-bottom:10px;">');
			control.find('[data-draft-admin-about-image-remove]').removeClass('hidden');
		});

		frame.open();
	});

	controls.on('click', '[data-draft-admin-about-image-remove]', function (event) {
		event.preventDefault();

		var control = $(this).closest('[data-draft-admin-about-image]');
		control.find('[data-draft-admin-about-image-input]').val('');
		control.find('[data-draft-admin-about-image-preview]').empty();
		$(this).addClass('hidden');
	});
}(jQuery));
