angular.module('login.utils').factory('Session', function ($cookies, $window) {

    function getKey() {
        return $cookies.get('key') ? $cookies.get('key'): null;
    }

    function setKey(accessToken,expiresIn) {
        return $cookies.set('key',accessToken,expiresIn) ? $cookies.set('key',accessToken,expiresIn): null;
    }

    function isAuthenticated() {
        return getKey() !== null && getKey() !== 'empty';
    }

    function redirectToLogin(){
        $window.sessionStorage.clear();
        $window.location.href = '/login?portalerr=Session expired. Please Sign in again.';
    }

    return {
        getKey: getKey,
        setKey: setKey,
        isAuthenticated: isAuthenticated,
        redirectToLogin : redirectToLogin
    };
});
