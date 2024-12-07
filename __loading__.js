pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);

        var progressCircle = document.createElement('div');
        progressCircle.id = 'progress-circle';
        splash.appendChild(progressCircle);

        var percentage = document.createElement('div');
        percentage.id = 'progress-percentage';
        percentage.textContent = '0%';
        progressCircle.appendChild(percentage);
    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);
    };

    var setProgress = function (value) {
        var percentage = document.getElementById('progress-percentage');
        var circle = document.getElementById('progress-circle');
        if (percentage && circle) {
            value = Math.min(1, Math.max(0, value));
            var percent = Math.floor(value * 100);
            percentage.textContent = percent + '%';

            // Update circular progress bar
            var angle = percent * 3.6; // 360 degrees corresponds to 100%
            circle.style.background = `conic-gradient(#ff0000 ${angle}deg, #1d292c ${angle}deg)`;
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: #283538;',
            '}',
            '',
            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #283538;',
            '    display: flex;',
            '    align-items: center;',
            '    justify-content: center;',
            '}',
            '',
            '#application-splash {',
            '    text-align: center;',
            '}',
            '',
            '#progress-circle {',
            '    width: 100px;',
            '    height: 100px;',
            '    border-radius: 50%;',
            '    background: conic-gradient(#1d292c 0deg, #1d292c 360deg);',
            '    position: relative;',
            '    display: flex;',
            '    align-items: center;',
            '    justify-content: center;',
            '}',
            '',
            '#progress-percentage {',
            '    position: absolute;',
            '    color: white;',
            '    font-family: Arial, sans-serif;',
            '    font-size: 36px;',
            '}',
            '',
            '@media (max-width: 480px) {',
            '    #progress-circle {',
            '        width: 80px;',
            '        height: 80px;',
            '    }',
            '    #progress-percentage {',
            '        font-size: 16px;',
            '    }',
            '}'
        ].join('\n');

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };

    createCss();
    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
});
