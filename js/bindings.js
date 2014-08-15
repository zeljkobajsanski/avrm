ko.bindingHandlers.accordionVisible = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var tab = $(element);
        var header = tab.find('a.deploy-toggle-1');
        var content = tab.find('div.toggle-content');
        var value = ko.unwrap(valueAccessor());
        if (value) {
            header.addClass('toggle-1-active');
            content.show();
        } else {
            header.removeClass('toggle-1-active');
            content.hide();
        }
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var tab = $(element);
        var header = tab.find('a.deploy-toggle-1');
        var content = tab.find('div.toggle-content');
        var value = ko.unwrap(valueAccessor());
        if (value) {
            header.addClass('toggle-1-active');
            content.show();
        } else {
            header.removeClass('toggle-1-active');
            content.hide();
        }
    }
}