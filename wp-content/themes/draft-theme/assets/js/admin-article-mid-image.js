(function ($) {
	'use strict';

	var frame;
	var container = $('[data-draft-admin-mid-image]');
	function attachmentDetails(attachment) {
		var details = attachment.width && attachment.height ? attachment.width + ' x ' + attachment.height + ' px' : '';
		var fileSize = attachment.filesizeHumanReadable || '';

		if (!fileSize && attachment.filesizeInBytes) {
			fileSize = (attachment.filesizeInBytes / 1024 / 1024).toFixed(1) + ' MB';
		}

		return details + (details && fileSize ? ' - ' : '') + fileSize;
	}

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
			container.find('[data-draft-admin-mid-image-details]').text('Selected: ' + attachmentDetails(attachment)).removeAttr('hidden');
			container.find('[data-draft-admin-mid-image-remove]').removeClass('hidden');
		});

		frame.open();
	});

	container.on('click', '[data-draft-admin-mid-image-remove]', function (event) {
		event.preventDefault();
		container.find('[data-draft-admin-mid-image-input]').val('');
		container.find('[data-draft-admin-mid-image-preview]').empty();
		container.find('[data-draft-admin-mid-image-details]').empty().attr('hidden', 'hidden');
		$(this).addClass('hidden');
	});
}(jQuery));
