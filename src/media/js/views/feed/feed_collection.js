define('views/feed/feed_collection',
    ['jquery', 'l10n', 'textoverflowclamp', 'utils', 'z'],
    function($, l10n, clamp, utils, z) {
    'use strict';

    var gettext = l10n.gettext;

    return function(builder, args) {
        var slug = args[0];
        builder.start('feed/feed_collection.html', {
            slug: slug
        }).done(function() {
            var collection = builder.results.feed_collection;
            if (collection) {
                builder.z('title', utils.translate(collection.name));
            }
        });

        builder.onload('feed-collection', function(data) {
            // Give him the clamps!
            clamp(document.querySelector('.collection + .desc'), 7);
        });

        builder.z('type', 'leaf');
        builder.z('title', gettext('Loading...'));
        builder.z('pagetitle', gettext('Collection Details'));
    };
});
