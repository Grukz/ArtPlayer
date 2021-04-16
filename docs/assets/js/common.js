(function() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        window.location.href = './mobile.html';
        return;
    }

    var $codeMirror = document.querySelector('.codeMirrorWrap');
    var $lib = document.querySelector('.libsInput');
    var $run = document.querySelector('.run');
    var $popups = document.querySelector('.popups');
    var loaddLib = [];

    consola.creat({
        target: '.console',
        size: '100%',
        zIndex: 99,
    });

    var mirror = CodeMirror($codeMirror, {
        lineNumbers: true,
        mode: 'javascript',
        matchBrackets: true,
        styleActiveLine: true,
        theme: 'dracula',
        value: '',
    });

    function initArt(art) {
        Artplayer.config.events.forEach(function(item) {
            art && art.on('video:' + item, function(event) {
                console.log('video: ' + event.type);
            });
        });
    }

    function getURLParameters(url) {
        return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(function(a, v) {
            return (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a;
        }, {});
    }

    function getExt(url) {
        if (url.includes('?')) {
            return getExt(url.split('?')[0]);
        }

        if (url.includes('#')) {
            return getExt(url.split('#')[0]);
        }

        return url
            .trim()
            .toLowerCase()
            .split('.')
            .pop();
    }

    function loadScript(url) {
        return new Promise(function(resolve, reject) {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.onload = function() {
                resolve(url);
            };
            script.onerror = function() {
                reject(new Error('Loading script failed:' + url));
            };
            document.querySelector('head').appendChild(script);
        });
    }

    function loadStyle(url) {
        return new Promise(function(resolve, reject) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.onload = function() {
                resolve(url);
            };
            link.onerror = function() {
                reject(new Error('Loading style failed:' + url));
            };
            document.querySelector('head').appendChild(link);
        });
    }

    function loadLib(libs) {
        var libPromise = [];
        var libsDecode = decodeURIComponent(libs || '');
        libsDecode
            .split(/\r?\n/)
            .filter(function(url) {
                return !loaddLib.includes(url);
            })
            .forEach(function(url) {
                var ext = getExt(url);
                if (ext === 'js') {
                    libPromise.push(loadScript(url));
                } else if (ext === 'css') {
                    libPromise.push(loadStyle(url));
                }
            });
        $lib.value = libsDecode;
        return Promise.all(libPromise);
    }

    function runExample(name) {
        fetch(`./assets/example/${name}.js`)
            .then(function(response) {
                return response.text();
            })
            .then(function(text) {
                mirror.setValue(text);
                runCode();
            })
            .catch(function(err) {
                console.error(err.message);
            });
    }

    function loadCode(code, example) {
        if (example) {
            runExample(example);
        } else if (code) {
            mirror.setValue(decodeURIComponent(code).trim());
            runCode();
        } else {
            runExample('index');
        }
    }

    function runCode() {
        Artplayer.instances.forEach(function(art) {
            art.destroy(true);
        });
        var code = mirror.getValue();
        eval(code);
        initArt(Artplayer.instances[0]);
        console.info('Player initialization completed');
    }

    function initApp() {
        var _getURLParameters = getURLParameters(window.location.href),
            code = _getURLParameters.code,
            libs = _getURLParameters.libs;
        example = _getURLParameters.example;

        loadLib(libs)
            .then(function(result) {
                loaddLib = loaddLib.concat(result);
                loadCode(code, example);
            })
            .catch(function(err) {
                console.error(err.message);
            });
    }

    window.addEventListener('error', function(err) {
        console.error(err.message);
    });

    window.addEventListener('unhandledrejection', function(err) {
        console.error(err.message);
    });

    $run.addEventListener('click', function(e) {
        var libs = encodeURIComponent($lib.value);
        var code = encodeURIComponent(mirror.getValue());
        var url = window.location.origin + window.location.pathname + '?libs=' + libs + '&code=' + code;
        history.pushState(null, null, url);
        initApp();
    });

    $popups.addEventListener('click', function (e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
    
    initApp();
})();
