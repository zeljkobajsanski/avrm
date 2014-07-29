define(['plugins/router'], function(router) {

    return {
        router: router,
        activate: function() {
            router.map([
                { route: '', title: 'Home', moduleId: 'viewmodels/home' },
                { route: 'about', title: 'O programu', moduleId: 'viewmodels/about' }
            ]).buildNavigationModel();

            return router.activate();
        }
    };
})