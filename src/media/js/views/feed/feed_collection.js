define('views/feed/feed_collection',
    ['jquery', 'isotope', 'l10n', 'utils', 'z'],
    function($, Isotope, l10n, utils, z) {
    'use strict';
    var gettext = l10n.gettext;

    return function(builder, args) {
        builder.z('type', 'leaf');
        builder.z('title', gettext('Loading...'));
        builder.z('pagetitle', gettext('Collection Details'));

        var slug = args[0];
        builder.start('feed/feed_collection.html', {
            slug: slug
        });

        builder.onload('feed-collection', function(feed_collection) {
            builder.z('title', utils.translate(feed_collection.name));

            // Masonry the apps around the feed element.
            var feed_elm = document.querySelector('ul.feed');
            if (feed_elm) {
                new Isotope(feed_elm, {
                    itemSelector: '.detail-item',
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: 320,
                        gutter: -10,
                        isFitWidth: true
                    }
                });
            }
        });
    };
});
