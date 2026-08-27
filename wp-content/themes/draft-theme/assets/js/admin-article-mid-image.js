(function ($) {
	'use strict';

	var frame;
	var container = $('[data-draft-admin-mid-image]');

	if (!container.length || typeof wp === 'undefined' || !wp.media) {
		return;
	}

	container.on('click', '[data-draft-admin-mid-image-select]', function (event) {
		event.preventDefault();

		if (frame) {
			frame.open();
			return;
		}

		frame = wp.media({
			title: draftArticleMidImage.title,
			button: { text: draftArticleMidImage.button },
			multiple: false,
			library: { type: 'image' }
		});

		frame.on('select', function () {
			var attachment = frame.state().get('selection').first().toJSON();
			var preview = attachment.sizes && attachment.sizes.medium ? attachment.sizes.medium.url : attachment.url;

			container.find('[data-draft-admin-mid-image-input]').val(attachment.id);
			container.find('[data-draft-admin-mid-image-preview]').html('<img src="' + preview + '" alt="" style="max-width:100%;height:auto;display:block;">');
			container.find('[data-draft-admin-mid-image-remove]').removeClass('hidden');
		});

		frame.open();
	});

	container.on('click', '[data-draft-admin-mid-image-remove]', function (event) {
		event.preventDefault();
		container.find('[data-draft-admin-mid-image-input]').val('');
		container.find('[data-draft-admin-mid-image-preview]').empty();
		$(this).addClass('hidden');
	});
}(jQuery));
