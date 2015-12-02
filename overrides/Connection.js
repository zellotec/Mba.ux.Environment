Ext.define('Mba.ux.Environment.overrides.Connection', {
    override: 'Ext.data.Connection',
    requires: [ 'Mba.ux.Environment.config.Url' ],

    setupUrl: function(options, url)
    {
        var form = this.getForm(options);
        if (form) {
            url = url || form.action;
        }

        if (!Mba.ux.Environment.config.Url.has(url)) {
            return this.replaceParamsUrl(options, url);
        }

        url = Mba.ux.Environment.config.Url.get(url);

        return this.replaceParamsUrl(options, url);
    },

    replaceParamsUrl: function(options, url)
    {
        var regex;
        if (options.paramsUrl) {
            for (var i in options.paramsUrl) {
                regex = new RegExp('\{' + i + '\}', 'i');
                url = url.replace(regex, options.paramsUrl[i]);
            }
        }

        if (Ext.browser.is.Ripple) {
            if (url.indexOf('http') == -1 && Ext.os.is.WindowsPhone) {
                this.localWp = true;
                url = 'x-wmapp0://www/' + url;
            }
        }

        return url;
    }
});
