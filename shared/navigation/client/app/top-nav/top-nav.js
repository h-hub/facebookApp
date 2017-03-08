'use strict';

(function (module) {
    module.directive('topNav', function ($templateCache, $window, $sce, $compile, $cookies, GoogleAnalyticsNavigation, Navigation, Viewbag, Routes, MessageLogger) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                provider: '='
            },
            template: $templateCache.get('top-nav/top-nav.html'),
            controller: function ($rootScope, $scope) {
                var user = {
                    firstName: null,
                    lastName: null,
                    userName: null,
                    fullName: null,
                    email: null
                };
                var topNavConfig = null;
                var userProfileInfo = null;
                var logoutUrl = null;
                var hostUrl = null;
                var userRole = null;
                var helpWindow = null;
                var ga = GoogleAnalyticsNavigation;

                var constants = {};
                constants.role = {
                    instructor: "instructor",
                    SI: "si",
                    expiredInstructor: "expiredinstructor",
                    student: "student",
                    ta: "ta",
                    expiredstudent: "expiredstudent",
                    nonMMNDUser: 'generaluser'
                };

                //to display in topnav
                $scope.displayText = null;
                $scope.userEmail = null;
                $scope.userFullName = null;
                $scope.userAccountContent = null;
                $scope.helpLinks = [];
                $scope.cshLink = null;

                function initUserProfileInfo() {
                    userProfileInfo = Navigation.getServiceVars();
                    user.firstName = userProfileInfo.topNav.firstName;
                    user.lastName = userProfileInfo.topNav.lastName;
                    user.email = userProfileInfo.topNav.email;
                    user.userName = userProfileInfo.topNav.username;
                    user.fullName = user.firstName + ' ' + user.lastName;

                    //to display in topnav
                    $scope.displayText = 'Hi, ' + user.fullName;
                    $scope.userEmail = user.email;
                    $scope.userFullName = user.fullName;
                    userRole = userProfileInfo.profile.role.toLowerCase();
                }

                function initNavigationConfig() {
                    var navConfigs = Navigation.navigationConfigs();
                    topNavConfig = navConfigs.sharedComponents.topNav;
                    //get help dropdown values
                    $scope.helpLinks = (userRole === constants.role.instructor || userRole === constants.role.SI || userRole === constants.role.expiredInstructor) ? topNavConfig.helpLinks.instructor : topNavConfig.helpLinks.student;
                    hostUrl = navConfigs.server.hostUrl;
                    logoutUrl = topNavConfig.ssoServletUrl + hostUrl + topNavConfig.logoutRoute + $cookies.get('key');
                }

                function initPopover() {
                    var content = angular.element("#account-popover").html();
                    var options = {
                        trigger: 'click',
                        container: '#account-popover-content',
                        content: $compile(content)($scope),
                        html: true
                    };
                    angular.element(".top-nav [data-toggle=popover]").popover(options);
                }

                //to maintain a single window object for different urls
                function windowOpener(url, name) {
                    var args = "width=600,height=400,scrollbars,resizable";
                    if (!helpWindow) {
                        helpWindow = $window.open(url, name, args);
                    } else {
                        if (!helpWindow.closed) {
                            helpWindow.location.href = url;
                        } else {
                            helpWindow = $window.open(url, name, args);
                        }
                    }
                    helpWindow.focus();
                }

                $scope.showAccountPopover = function ($event) {
                    $event.preventDefault();
                    initPopover();
                };

                $scope.userSignOut = function ($event) {
                    $event.preventDefault();
                    angular.element(".top-nav [data-toggle=popover]").popover('hide');
                    $window.sessionStorage.clear();

                    ga.send(ga.pages.navigation, ga.actions.signOut, ga.events.click);
                    MessageLogger.logInstrumentation({
                        class: 'topNav directive',
                        method: 'doSignOut',
                        message: 'Clicked on signOut.'
                    });

                    $window.location.replace(logoutUrl);
                };

                //this function is to prevent the page refresh when click on the link
                $scope.selectHelp = function ($event) {
                    $event.preventDefault();
                };

                $scope.redirectToHome = function () {
                    $window.location.href = "/course-home";
                    ga.send(ga.pages.navigation, ga.actions.redirectToHome, ga.events.click);
                };

                $scope.preventHelpLink = function ($event) {
                    $event.preventDefault();
                };

                //select help dropdown
                $scope.selectHelpLink = function ($event, option) {
                    $event.preventDefault();

                    var optionLinkPath = '';

                    ga.send(ga.pages.navigation, ga.actions.help + " - " + option.optionName, ga.events.click);
                    MessageLogger.logInstrumentation({
                        class: 'topNav directive',
                        method: '$scope.selectHelpLink',
                        message: '"' + option.optionName + '" option is selected from help dropdown.'
                    });

                    //role based subscription help links for instructor for course home and course manage
                    if (option.optionHint === 'whatsNew') {
                        $rootScope.$broadcast('whats-new-clicked');
                        return;
                    } else if (option.optionHint === 'help') {
                        if (userRole === constants.role.student || userRole === constants.role.ta || userRole === constants.role.expiredstudent || userRole === constants.role.nonMMNDUser) {
                            optionLinkPath = option.optionLink;
                        } else {
                            var originalPath = Viewbag.isExist('originalPath') ? Viewbag.get('originalPath') : null;
                            var routeParams = Viewbag.isExist('routeParams') ? Viewbag.get('routeParams') : null;
                            var routes = Routes.get();
                            if (originalPath) {
                                if (originalPath === routes.courseManage.createCourse) {
                                    optionLinkPath = option.optionLink.createCourse;
                                } else if (originalPath === routes.courseManage.externalSearch) {
                                    optionLinkPath = option.optionLink.externalSearch;
                                } else if (routes.courseManage.catelogSearch.indexOf(originalPath) > -1) {
                                    optionLinkPath = option.optionLink.catelogSearch;
                                } else if (originalPath === routes.courseManage.seeMyList) {
                                    optionLinkPath = option.optionLink.seeMyList;
                                } else if (originalPath === routes.courseManage.courseIdSearch) {
                                    optionLinkPath = option.optionLink.courseIdSearch;
                                } else if (originalPath === routes.courseManage.newEdition) {
                                    optionLinkPath = option.optionLink.newEdition;
                                } else if (originalPath === routes.courseManage.newVersion) {
                                    optionLinkPath = option.optionLink.newVersion;
                                } else if (routes.courseManage.enterCourseDetails.indexOf(originalPath) > -1) {
                                    optionLinkPath = option.optionLink.enterCourseDetails;
                                } else if (originalPath === routes.courseManage.youAreDone) {
                                    optionLinkPath = option.optionLink.youAreDone;
                                } else if (originalPath === routes.courseManage.externalExit) {
                                    optionLinkPath = option.optionLink.externalExit;
                                } else if (originalPath === routes.courseHome.nestedView) {
                                    if (routeParams.templateCourse === 'instructor') {
                                        optionLinkPath = option.optionLink.insturctorCourseNestedView;
                                    } else {
                                        optionLinkPath = option.optionLink.coordinatorCourseNestedView;
                                    }
                                } else {
                                    optionLinkPath = option.optionLink.default;
                                }
                            }
                        }
                    } else {
                        optionLinkPath = option.optionLink;
                    }
                    //manage the help window
                    windowOpener(optionLinkPath, option.optionName);
                };

                $scope.openAccountDialog = function ($event) {
                    $event.preventDefault();

                    ga.send(ga.pages.navigation, ga.actions.account, ga.events.click);
                    MessageLogger.logInstrumentation({
                        class: 'topNav directive',
                        method: '$scope.openAccountDialog',
                        message: 'User account link is clicked.'
                    });

                    $scope.userAccountContent = $sce.trustAsResourceUrl(topNavConfig.smsAccountProfileUrl + user.userName);
                    angular.element(".top-nav [data-toggle=popover]").popover('hide');
                    angular.element("#account-modal-dialog").modal('show');
                };

                function init() {
                    initUserProfileInfo();
                    initNavigationConfig();
                    initPopover();
                }

                init();
            }
        };
    });

})(angular.module('portal-shared.navigation-topnav'));
