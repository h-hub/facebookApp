'use strict';

(function (module) {
    module.service('GoogleAnalyticsNavigation', function () {

        this.send = function (page, action, event) {
            ga('send', 'event', 'Navigation', page + ' - ' + action, event);
        };

        this.events = {
            click: 'click'
        };

        this.pages = {
            navigation: 'Navigation'
        };

        this.actions = {
            account: 'User Account',
            signOut: 'Sign Out',
            help: 'Help Dropdown',
            footerLink: 'Footer Link',
            redirectToHome: 'Redirect To Home'
        };
    });
})(angular.module('portal-shared.navigation.utils'));
