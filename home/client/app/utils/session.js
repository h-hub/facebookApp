/**
 * Created by UJAYAH1 on 8/1/2016.
 */
angular.module('home.utils').factory('Session', function ($cookies, $window) {

    function getKey() {
        return $cookies.get('key') ? $cookies.get('key') : null;
    }

    function isAuthenticated() {
        return getKey() !== null && getKey() !== 'empty';
    }

    function redirectToLogin(){
        $window.location.href = '/login?error=Session expired.';
    }

    function logout(){
        $cookies.clear('key');
    }

    return {
        getKey: getKey,
        isAuthenticated: isAuthenticated,
        redirectToLogin: redirectToLogin,
        logout: logout
    };
});
