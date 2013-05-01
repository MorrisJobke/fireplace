define('views/category',
    ['capabilities', 'underscore', 'urls', 'utils', 'z'],
    function(capabilities, _, urls, utils, z) {
    'use strict';

    return function(builder, args, params) {
        var category = args[0];
        _.defaults(params || {}, {sort: 'popularity'});

        builder.z('type', 'root');
        builder.z('title', params.name || category);
        builder.z('show_cats', true);
        builder.z('cat', category);

        builder.start('category/main.html', {
            category: category,
            category_name: category,
            endpoint: urls.api.url('category', [category]),
            sort: params.sort
        }).done(setTrays);
    };
});
