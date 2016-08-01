/**
 * Created by UJAYAH1 on 8/1/2016.
 */
angular.module('home.utils').service('$cookies', function () {
    function createCookie(name, value, milliseconds) {
        var expires = "";
        if (milliseconds) {
            var date = new Date();
            date.setTime(date.getTime() + milliseconds);
            expires = "; expires=" + date.toGMTString();
        }

        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name, "", -1);
    }

    this.set = createCookie;
    this.get = readCookie;
    this.clear = eraseCookie;
});
