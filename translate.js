/**
 * Author: inkuzmin
 * Email: inkuzmin@ya.ru
 *
 * Licence: GNU GPL v3
 */

(function () {

    var LinguaLeoConfig = {
        domain: 'http://lingualeo.com',
        domain_ru: 'http://lingualeo.ru',


        path: {
            login: '/login',
            dictionary: '/userdict',
            training: '/training',
            goldStatus: '/gold?from=plagin_meatballs-dialog',
            wordArticle: '/userdict#/{originalText}',
            images: 'http://lingualeo.com/plugins/all/images',
            register: '/register',
            register2: '/?utm_source=ll_plagin&utm_medium=referral&utm_campaign=register',
            forgotPass: '/password/forgot',
            meatballs: '/meatballs',
            audio_player: 'http://lingualeo.com/plugins/all/flash/1.html#sound='
        },


        api: 'http://api.lingualeo.com',
        ajax: {
            isAuth: '/isauthorized',
            getTranslations: '/gettranslates',
            translate: '/translate.php',
            addWordToDict: '/addword',
            getUntrainedWordsCount: '/getUntrainedWordsCount',
            setChromeHideCookie: '/setChromeHideCookie',
            login: 'http://lingualeo.com/api/login',
            checkSiteNotifications: 'http://api.lingualeo.com/user/{user_id}/notifications/unread'
        }
    };



    document.addEventListener('touchend', function (e) {
        var word = getWord();
        translate(word);
    }, false);

    function request(url, params, callback) {
        var xhr = new XMLHttpRequest();

        var query = '?';

        for (var param in params) {
            if( params.hasOwnProperty( param ) ) {
                var value = params[param];
                query += param;
                query += '=';
                query += value;
                query += '&';
            }
        }

        query = query.substring(0, query.length - 1);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText);
            }
        };

        xhr.open('GET', url + query, true);
        xhr.send();

    }


    function translate(word) {
        request('http://api.lingualeo.com/gettranslates', {
            word: word
        }, function (response) {
            console.log(response);
        });
    }

    function getWord() {
        var selection = window.getSelection();
        try {

            var range = selection.getRangeAt(0);
            var node = selection.anchorNode;

            while (range.toString().indexOf(' ') != 0) {
                range.setStart(node, (range.startOffset - 1));
            }
            range.setStart(node, range.startOffset + 1);

            do {
                range.setEnd(node, range.endOffset + 1);

            } while (range.toString().indexOf(' ') == -1 && range.toString().trim() != '' && range.endOffset < node.length);

            var str = range.toString().trim();

            selection.removeAllRanges();
            //selection.addRange(range);

            while (str.slice(-1).match(/[^\w]/)) {
                str = str.substring(0, str.length - 1);
            }

            while (str[0].match(/[^\w]/)) {
                str = str.substring(1, str.length);
            }

            return str;
        } catch (err) {
            selection.removeAllRanges();
            return undefined;
        }
    }


})();