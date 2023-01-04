/*! jQuery Migrate v3.3.2 | (c) OpenJS Foundation and other contributors | jquery.org/license */
"undefined" == typeof jQuery.migrateMute && (jQuery.migrateMute = !0),
    function(t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], function(e) {
            return t(e, window)
        }) : "object" == typeof module && module.exports ? module.exports = t(require("jquery"), window) : t(jQuery, window)
    }(function(s, n) {
        "use strict";

        function e(e) {
            return 0 <= function(e, t) {
                for (var r = /^(\d+)\.(\d+)\.(\d+)/, n = r.exec(e) || [], o = r.exec(t) || [], i = 1; i <= 3; i++) {
                    if (+o[i] < +n[i]) return 1;
                    if (+n[i] < +o[i]) return -1
                }
                return 0
            }(s.fn.jquery, e)
        }
        s.migrateVersion = "3.3.2", n.console && n.console.log && (s && e("3.0.0") || n.console.log("JQMIGRATE: jQuery 3.0.0+ REQUIRED"), s.migrateWarnings && n.console.log("JQMIGRATE: Migrate plugin loaded multiple times"), n.console.log("JQMIGRATE: Migrate is installed" + (s.migrateMute ? "" : " with logging active") + ", version " + s.migrateVersion));
        var r = {};

        function u(e) {
            var t = n.console;
            s.migrateDeduplicateWarnings && r[e] || (r[e] = !0, s.migrateWarnings.push(e), t && t.warn && !s.migrateMute && (t.warn("JQMIGRATE: " + e), s.migrateTrace && t.trace && t.trace()))
        }

        function t(e, t, r, n) {
            Object.defineProperty(e, t, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return u(n), r
                },
                set: function(e) {
                    u(n), r = e
                }
            })
        }

        function o(e, t, r, n) {
            e[t] = function() {
                return u(n), r.apply(this, arguments)
            }
        }
        s.migrateDeduplicateWarnings = !0, s.migrateWarnings = [], void 0 === s.migrateTrace && (s.migrateTrace = !0), s.migrateReset = function() {
            r = {}, s.migrateWarnings.length = 0
        }, "BackCompat" === n.document.compatMode && u("jQuery is not compatible with Quirks Mode");
        var i, a, c, d = {},
            l = s.fn.init,
            p = s.find,
            f = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
            y = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,
            m = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        for (i in s.fn.init = function(e) {
                var t = Array.prototype.slice.call(arguments);
                return "string" == typeof e && "#" === e && (u("jQuery( '#' ) is not a valid selector"), t[0] = []), l.apply(this, t)
            }, s.fn.init.prototype = s.fn, s.find = function(t) {
                var r = Array.prototype.slice.call(arguments);
                if ("string" == typeof t && f.test(t)) try {
                    n.document.querySelector(t)
                } catch (e) {
                    t = t.replace(y, function(e, t, r, n) {
                        return "[" + t + r + '"' + n + '"]'
                    });
                    try {
                        n.document.querySelector(t), u("Attribute selector with '#' must be quoted: " + r[0]), r[0] = t
                    } catch (e) {
                        u("Attribute selector with '#' was not fixed: " + r[0])
                    }
                }
                return p.apply(this, r)
            }, p) Object.prototype.hasOwnProperty.call(p, i) && (s.find[i] = p[i]);
        o(s.fn, "size", function() {
            return this.length
        }, "jQuery.fn.size() is deprecated and removed; use the .length property"), o(s, "parseJSON", function() {
            return JSON.parse.apply(null, arguments)
        }, "jQuery.parseJSON is deprecated; use JSON.parse"), o(s, "holdReady", s.holdReady, "jQuery.holdReady is deprecated"), o(s, "unique", s.uniqueSort, "jQuery.unique is deprecated; use jQuery.uniqueSort"), t(s.expr, "filters", s.expr.pseudos, "jQuery.expr.filters is deprecated; use jQuery.expr.pseudos"), t(s.expr, ":", s.expr.pseudos, "jQuery.expr[':'] is deprecated; use jQuery.expr.pseudos"), e("3.1.1") && o(s, "trim", function(e) {
            return null == e ? "" : (e + "").replace(m, "")
        }, "jQuery.trim is deprecated; use String.prototype.trim"), e("3.2.0") && (o(s, "nodeName", function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, "jQuery.nodeName is deprecated"), o(s, "isArray", Array.isArray, "jQuery.isArray is deprecated; use Array.isArray")), e("3.3.0") && (o(s, "isNumeric", function(e) {
            var t = typeof e;
            return ("number" == t || "string" == t) && !isNaN(e - parseFloat(e))
        }, "jQuery.isNumeric() is deprecated"), s.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
            d["[object " + t + "]"] = t.toLowerCase()
        }), o(s, "type", function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? d[Object.prototype.toString.call(e)] || "object" : typeof e
        }, "jQuery.type is deprecated"), o(s, "isFunction", function(e) {
            return "function" == typeof e
        }, "jQuery.isFunction() is deprecated"), o(s, "isWindow", function(e) {
            return null != e && e === e.window
        }, "jQuery.isWindow() is deprecated")), s.ajax && (a = s.ajax, c = /(=)\?(?=&|$)|\?\?/, s.ajax = function() {
            var e = a.apply(this, arguments);
            return e.promise && (o(e, "success", e.done, "jQXHR.success is deprecated and removed"), o(e, "error", e.fail, "jQXHR.error is deprecated and removed"), o(e, "complete", e.always, "jQXHR.complete is deprecated and removed")), e
        }, e("4.0.0") || s.ajaxPrefilter("+json", function(e) {
            !1 !== e.jsonp && (c.test(e.url) || "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && c.test(e.data)) && u("JSON-to-JSONP auto-promotion is deprecated")
        }));
        var g = s.fn.removeAttr,
            h = s.fn.toggleClass,
            v = /\S+/g;

        function j(e) {
            return e.replace(/-([a-z])/g, function(e, t) {
                return t.toUpperCase()
            })
        }
        s.fn.removeAttr = function(e) {
            var r = this;
            return s.each(e.match(v), function(e, t) {
                s.expr.match.bool.test(t) && (u("jQuery.fn.removeAttr no longer sets boolean properties: " + t), r.prop(t, !1))
            }), g.apply(this, arguments)
        };
        var Q, b = !(s.fn.toggleClass = function(t) {
                return void 0 !== t && "boolean" != typeof t ? h.apply(this, arguments) : (u("jQuery.fn.toggleClass( boolean ) is deprecated"), this.each(function() {
                    var e = this.getAttribute && this.getAttribute("class") || "";
                    e && s.data(this, "__className__", e), this.setAttribute && this.setAttribute("class", !e && !1 !== t && s.data(this, "__className__") || "")
                }))
            }),
            w = /^[a-z]/,
            x = /^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/;
        s.swap && s.each(["height", "width", "reliableMarginRight"], function(e, t) {
            var r = s.cssHooks[t] && s.cssHooks[t].get;
            r && (s.cssHooks[t].get = function() {
                var e;
                return b = !0, e = r.apply(this, arguments), b = !1, e
            })
        }), s.swap = function(e, t, r, n) {
            var o, i, a = {};
            for (i in b || u("jQuery.swap() is undocumented and deprecated"), t) a[i] = e.style[i], e.style[i] = t[i];
            for (i in o = r.apply(e, n || []), t) e.style[i] = a[i];
            return o
        }, e("3.4.0") && "undefined" != typeof Proxy && (s.cssProps = new Proxy(s.cssProps || {}, {
            set: function() {
                return u("JQMIGRATE: jQuery.cssProps is deprecated"), Reflect.set.apply(this, arguments)
            }
        })), s.cssNumber || (s.cssNumber = {}), Q = s.fn.css, s.fn.css = function(e, t) {
            var r, n, o = this;
            return e && "object" == typeof e && !Array.isArray(e) ? (s.each(e, function(e, t) {
                s.fn.css.call(o, e, t)
            }), this) : ("number" == typeof t && (r = j(e), n = r, w.test(n) && x.test(n[0].toUpperCase() + n.slice(1)) || s.cssNumber[r] || u('Number-typed values are deprecated for jQuery.fn.css( "' + e + '", value )')), Q.apply(this, arguments))
        };
        var A, k, S, M, N = s.data;
        s.data = function(e, t, r) {
            var n, o, i;
            if (t && "object" == typeof t && 2 === arguments.length) {
                for (i in n = s.hasData(e) && N.call(this, e), o = {}, t) i !== j(i) ? (u("jQuery.data() always sets/gets camelCased names: " + i), n[i] = t[i]) : o[i] = t[i];
                return N.call(this, e, o), t
            }
            return t && "string" == typeof t && t !== j(t) && (n = s.hasData(e) && N.call(this, e)) && t in n ? (u("jQuery.data() always sets/gets camelCased names: " + t), 2 < arguments.length && (n[t] = r), n[t]) : N.apply(this, arguments)
        }, s.fx && (S = s.Tween.prototype.run, M = function(e) {
            return e
        }, s.Tween.prototype.run = function() {
            1 < s.easing[this.easing].length && (u("'jQuery.easing." + this.easing.toString() + "' should use only one argument"), s.easing[this.easing] = M), S.apply(this, arguments)
        }, A = s.fx.interval || 13, k = "jQuery.fx.interval is deprecated", n.requestAnimationFrame && Object.defineProperty(s.fx, "interval", {
            configurable: !0,
            enumerable: !0,
            get: function() {
                return n.document.hidden || u(k), A
            },
            set: function(e) {
                u(k), A = e
            }
        }));
        var R = s.fn.load,
            H = s.event.add,
            C = s.event.fix;
        s.event.props = [], s.event.fixHooks = {}, t(s.event.props, "concat", s.event.props.concat, "jQuery.event.props.concat() is deprecated and removed"), s.event.fix = function(e) {
            var t, r = e.type,
                n = this.fixHooks[r],
                o = s.event.props;
            if (o.length) {
                u("jQuery.event.props are deprecated and removed: " + o.join());
                while (o.length) s.event.addProp(o.pop())
            }
            if (n && !n._migrated_ && (n._migrated_ = !0, u("jQuery.event.fixHooks are deprecated and removed: " + r), (o = n.props) && o.length))
                while (o.length) s.event.addProp(o.pop());
            return t = C.call(this, e), n && n.filter ? n.filter(t, e) : t
        }, s.event.add = function(e, t) {
            return e === n && "load" === t && "complete" === n.document.readyState && u("jQuery(window).on('load'...) called after load event occurred"), H.apply(this, arguments)
        }, s.each(["load", "unload", "error"], function(e, t) {
            s.fn[t] = function() {
                var e = Array.prototype.slice.call(arguments, 0);
                return "load" === t && "string" == typeof e[0] ? R.apply(this, e) : (u("jQuery.fn." + t + "() is deprecated"), e.splice(0, 0, t), arguments.length ? this.on.apply(this, e) : (this.triggerHandler.apply(this, e), this))
            }
        }), s.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, r) {
            s.fn[r] = function(e, t) {
                return u("jQuery.fn." + r + "() event shorthand is deprecated"), 0 < arguments.length ? this.on(r, null, e, t) : this.trigger(r)
            }
        }), s(function() {
            s(n.document).triggerHandler("ready")
        }), s.event.special.ready = {
            setup: function() {
                this === n.document && u("'ready' event is deprecated")
            }
        }, s.fn.extend({
            bind: function(e, t, r) {
                return u("jQuery.fn.bind() is deprecated"), this.on(e, null, t, r)
            },
            unbind: function(e, t) {
                return u("jQuery.fn.unbind() is deprecated"), this.off(e, null, t)
            },
            delegate: function(e, t, r, n) {
                return u("jQuery.fn.delegate() is deprecated"), this.on(t, e, r, n)
            },
            undelegate: function(e, t, r) {
                return u("jQuery.fn.undelegate() is deprecated"), 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", r)
            },
            hover: function(e, t) {
                return u("jQuery.fn.hover() is deprecated"), this.on("mouseenter", e).on("mouseleave", t || e)
            }
        });

        function T(e) {
            var t = n.document.implementation.createHTMLDocument("");
            return t.body.innerHTML = e, t.body && t.body.innerHTML
        }

        function P(e) {
            var t = e.replace(O, "<$1></$2>");
            t !== e && T(e) !== T(t) && u("HTML tags must be properly nested and closed: " + e)
        }
        var O = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
            q = s.htmlPrefilter;
        s.UNSAFE_restoreLegacyHtmlPrefilter = function() {
            s.htmlPrefilter = function(e) {
                return P(e), e.replace(O, "<$1></$2>")
            }
        }, s.htmlPrefilter = function(e) {
            return P(e), q(e)
        };
        var D, _ = s.fn.offset;
        s.fn.offset = function() {
            var e = this[0];
            return !e || e.nodeType && e.getBoundingClientRect ? _.apply(this, arguments) : (u("jQuery.fn.offset() requires a valid DOM element"), arguments.length ? this : void 0)
        }, s.ajax && (D = s.param, s.param = function(e, t) {
            var r = s.ajaxSettings && s.ajaxSettings.traditional;
            return void 0 === t && r && (u("jQuery.param() no longer uses jQuery.ajaxSettings.traditional"), t = r), D.call(this, e, t)
        });
        var E, F, J = s.fn.andSelf || s.fn.addBack;
        return s.fn.andSelf = function() {
            return u("jQuery.fn.andSelf() is deprecated and removed, use jQuery.fn.addBack()"), J.apply(this, arguments)
        }, s.Deferred && (E = s.Deferred, F = [
            ["resolve", "done", s.Callbacks("once memory"), s.Callbacks("once memory"), "resolved"],
            ["reject", "fail", s.Callbacks("once memory"), s.Callbacks("once memory"), "rejected"],
            ["notify", "progress", s.Callbacks("memory"), s.Callbacks("memory")]
        ], s.Deferred = function(e) {
            var i = E(),
                a = i.promise();
            return i.pipe = a.pipe = function() {
                var o = arguments;
                return u("deferred.pipe() is deprecated"), s.Deferred(function(n) {
                    s.each(F, function(e, t) {
                        var r = "function" == typeof o[e] && o[e];
                        i[t[1]](function() {
                            var e = r && r.apply(this, arguments);
                            e && "function" == typeof e.promise ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[t[0] + "With"](this === a ? n.promise() : this, r ? [e] : arguments)
                        })
                    }), o = null
                }).promise()
            }, e && e.call(i, i), i
        }, s.Deferred.exceptionHook = E.exceptionHook), s
    });
jQuery(function($) {
    $("header .genesis-nav-menu").addClass("responsive-menu").before('<div id="responsive-menu-icon"></div>');
    $("#responsive-menu-icon").click(function() {
        $("header .genesis-nav-menu").slideToggle()
    });
    $(window).resize(function() {
        if (window.innerWidth > 768) {
            $("header .genesis-nav-menu").removeAttr("style")
        }
    })
});
var clicky_obj = clicky_obj || (function() {
    var instance = null;

    function _ins() {
        var _self = this,
            site_ids = [],
            pageviews_fired = [],
            monitors = 0,
            setup = 0,
            ossassets = 0,
            ossdata = 0;
        this.domain = '//in.getclicky.com';
        this.sitekeys = [];
        this.site_id_exists = function(site_id) {
            for (var s in site_ids)
                if (site_ids[s] == site_id) return !0;
            return !1
        };
        this.sitekey = function(site_id, key_only) {
            if (_self.sitekeys && _self.sitekeys[site_id]) return (key_only ? '' : '&sitekey=') + _self.sitekeys[site_id];
            return ''
        };
        this.init = function(site_id) {
            if (_self.site_id_exists(site_id)) return;
            site_ids.push(site_id);
            if (clicky_custom.getHighEntropyValues && navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
                navigator.userAgentData.getHighEntropyValues(["model", "platformVersion"]).then(function(ua) {
                    _self.he_model = ua.model;
                    _self.he_platform = parseInt(ua.platformVersion)
                })
            }
            if (!setup) {
                setup = 1;
                setTimeout(_self.setup, 200)
            }
        };
        this.setup = function() {
            if (location.hash.match(/^#_heatmap/)) _self.heatmap();
            if (!_self.get_cookie('_first_pageview')) {
                _self.set_referrer()
            }
            _self.start_monitors();
            if (!clicky_custom.pageview_disable) _self.pageview(1)
        };
        this.custom_data = function() {
            var data = {},
                keys = ['username', 'name', 'email'],
                l = keys.length;
            for (var i = 0; i < l; i++) {
                var key = keys[i],
                    temp = '';
                temp = _self.get_cookie('_custom_data_' + key);
                if (temp) data[key] = temp;
                if (clicky_custom.visitor) {
                    temp = clicky_custom.visitor[key];
                    if (temp) {
                        data[key] = temp
                    }
                }
                if (location.search.match(/utm_custom/)) {
                    temp = location.search.split('utm_custom[' + key + ']');
                    if (temp[1]) {
                        temp = temp[1].split('&')[0].split('=')[1];
                        if (temp) {
                            data[key] = temp
                        }
                    }
                }
            }
            var url = '';
            if (clicky_custom.visitor) {
                for (var i in clicky_custom.visitor) {
                    if (clicky_custom.visitor.hasOwnProperty && clicky_custom.visitor.hasOwnProperty(i))
                        if (!data[i]) data[i] = clicky_custom.visitor[i]
                }
            }
            if (data) {
                for (var i in data) {
                    if (data.hasOwnProperty && data.hasOwnProperty(i)) url += "&custom[" + _self.enc(i) + "]=" + _self.enc(data[i])
                }
            }
            return url
        };
        this.set_referrer = function() {
            var r = clicky_custom.track_iframe || !top.document.referrer ? document.referrer : top.document.referrer;
            r = r && r.match(/^https?:/) ? (RegExp("^https?://[^/]*" + location.host.replace(/^www\./i, "") + "/", "i").test(r) ? '' : r) : '';
            if (!r) r = _self.get_cookie('_referrer_og');
            _self.ref = r;
            if (!_self.get_href().match(/utm_campaign/)) {
                _self.utm = _self.get_cookie('_utm_og')
            }
        };
        this.pageview = function(only_once) {
            var href = _self.get_href();
            if (_self.facebook_is_lame(href)) return;
            _self.beacon('pageview', '&href=' + _self.enc(href) + '&title=' + _self.enc(clicky_custom.title || window.clicky_page_title || (clicky_custom.track_iframe || !top.document.title ? document.title : top.document.title)) + (_self.ref ? '&ref=' + _self.enc(_self.ref) : '') + (_self.utm ? '&utm=' + _self.enc(_self.utm) : ''), (only_once ? 1 : 0));
            for (var p = 0; p < site_ids.length; p++) {
                if (!_self.is_pageview_fired(site_ids[p])) {
                    pageviews_fired.push(site_ids[p])
                }
            }
        };
        this.get_href = function(enc) {
            var href = clicky_custom.href || (clicky_custom.track_iframe ? location.pathname + location.search : top.location.pathname + top.location.search);
            if (location.hash.match(/utm_campaign/i)) {
                href = href + (location.search ? '&' : '?') + location.hash.substr(1)
            }
            return enc ? _self.enc(href) : href
        };
        this.log = function(href, title, type) {
            if (!href || _self.facebook_is_lame(href)) return;
            if (type == 'pageview') href = href.replace(/^https?:\/\/([^\/]+)/i, '');
            _self.beacon({
                'type': (type || 'click'),
                'href': href,
                'title': (title || '')
            })
        };
        this.facebook_is_lame = function(href) {
            return href && href.match && href.match(/fb_xd_fragment|fb_xd_bust|fbc_channel/i)
        };
        this.heatmap_xy = function(e) {
            var x, y;
            if (e.pageX) {
                x = e.pageX;
                y = e.pageY
            } else if (e.clientX) {
                x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
            } else return;
            var w = _self.doc_wh(),
                href = _self.get_href();
            if (!clicky_custom.heatmap_disable) _self.beacon('heatmap', '&heatmap[]=' + _self.enc(href) + '|' + x + '|' + y + '|' + w.w)
        };
        this.doc_wh = function() {
            var db = document.body,
                de = document.documentElement;
            return {
                w: window.innerWidth || de.clientWidth || 1024,
                h: Math.max(db.scrollHeight, db.offsetHeight, de.clientHeight, de.scrollHeight, de.offsetHeight)
            }
        };
        this.heatmap = function(date, sub, subitem) {
            if (window._heatmap_destroy) _heatmap_destroy();
            if (window.heatmapFactory) _self.heatmap_data(date, sub, subitem);
            else {
                _self.inject('//static.getclicky.com/inc/javascript/heatmap.js');
                setTimeout('_cgen.heatmap("' + (date || '') + '","' + (sub || '') + '","' + (subitem || '') + '")', 1000)
            }
        };
        this.heatmap_data = function(date, sub, subitem) {
            wh = _self.doc_wh();
            _self.inject('//clicky.com/ajax/onsitestats/heatmap?' + 'site_id=' + site_ids[0] + _self.sitekey(site_ids[0]) + '&href=' + _self.get_href(1) + '&domain=' + location.hostname + '&w=' + wh.w + '&h=' + wh.h + (location.hash.match(/^#_heatmap/) ? location.hash.replace(/^#_heatmap/, '') : '') + (date ? '&date=' + date : '') + (sub ? '&sub=' + sub : '') + (subitem ? '&subitem=' + subitem : '') + '&x=' + Math.random())
        };
        this.heatmap_override = function(e) {
            if (document.querySelectorAll) {
                var nodes = document.querySelectorAll(e);
                for (var n = 0; n < nodes.length; n++) {
                    _self.add_event(nodes[n], 'click', _self.heatmap_xy)
                }
            }
        };
        this.onsitestats = function(refresh, reset) {
            if (ossassets) {
                if (window.jQuery && window._OSS) {
                    if (_self.jqnc) {
                        jQuery.noConflict();
                        _self.jqnc = 0
                    }
                    if (!ossdata || refresh) {
                        ossdata = 1;
                        _self.inject('//clicky.com/ajax/onsitestats/?site_id=' + site_ids[0] + _self.sitekey(site_ids[0]) + '&href=' + _self.get_href(1) + '&domain=' + location.hostname + (refresh ? '&refresh=1' : '') + (reset ? '&reset=1' : '') + '&x=' + Math.random())
                    }
                } else setTimeout(_self.onsitestats, 200)
            } else {
                ossassets = 1;
                _self.inject('//static.getclicky.com/inc/onsitestats.css', 'css');
                _self.inject('//static.getclicky.com/inc/javascript/onsitestats.js');
                if (!window.jQuery) {
                    _self.inject('//static.getclicky.com/inc/javascript/jquery.js');
                    _self.jqnc = 1
                }
                setTimeout(_self.onsitestats, 1000)
            }
        };
        this.start_monitors = function() {
            if (!monitors) {
                monitors = 1;
                _self.hm_monitor();
                if (clicky_custom.html_media_track && (document.getElementsByTagName('audio').length || document.getElementsByTagName('video').length)) {
                    _self.html_media_monitor()
                }
                if (!clicky_custom.history_disable) {
                    try {
                        _self.pushState = history.pushState;
                        history.pushState = function() {
                            _self.pushState.apply(history, arguments);
                            setTimeout(_self.pageview, 250)
                        };
                        _self.add_event(window, 'popstate', function(e) {
                            if (e.state) setTimeout(_self.pageview, 250)
                        })
                    } catch (e) {}
                }
            }
        };
        this.hm_monitor = function() {
            if (document.body) {
                _self.add_event(document.body, 'click', _self.heatmap_xy);
                if (clicky_custom.heatmap_objects) {
                    if (typeof clicky_custom.heatmap_objects == 'object') {
                        for (var hmo in clicky_custom.heatmap_objects) _self.heatmap_override(clicky_custom.heatmap_objects[hmo]);
                    } else {
                        _self.heatmap_override(clicky_custom.heatmap_objects)
                    }
                }
            } else setTimeout(_self.hm_monitor, 1000)
        };
        this.html_media_monitor = function() {
            if (!window._htmlvid) _self.inject('//static.getclicky.com/inc/javascript/video/html.js')
        };
        this.video = function(action, time, url, title) {
            if (!url || !action) return !1;
            _self.beacon('video', '&video[action]=' + action + '&video[time]=' + (time || 0) + '&href=' + _self.enc(url) + (title ? '&title=' + _self.enc(title) : ''))
        };
        this.goal = function(id, revenue) {
            if (!id) return;
            var goal = (typeof id == 'number' || id.match(/^[0-9]+$/)) ? '[id]=' + id : '[name]=' + _self.enc(id);
            _self.beacon({
                type: 'goal',
                q: '&goal' + goal + (revenue ? '&goal[revenue]=' + revenue : '')
            })
        };
        this.beacon = function(type, q, called_by_pageview) {
            if (typeof type == 'object') {
                var o = type;
                if (o.type) type = o.type;
                else return !1;
                if (o.q) {
                    q = o.q
                } else {
                    var temp = '';
                    for (var i in o) {
                        if (i != 'type' && o.hasOwnProperty && o.hasOwnProperty(i)) temp += '&' + i + '=' + _self.enc(o[i])
                    }
                    q = temp;
                    delete temp
                }
            } else {
                type = type || 'pageview';
                q = q || ''
            }
            var custom = '',
                goal = '',
                split = '',
                jsuid = _self.get_cookie('_jsuid');
            if (type != 'heatmap' && type != 'ping') {
                custom = _self.custom_data();
                if (clicky_custom.goal) {
                    if (typeof clicky_custom.goal == 'object') {
                        for (var i in clicky_custom.goal) {
                            if (clicky_custom.goal.hasOwnProperty && clicky_custom.goal.hasOwnProperty(i)) goal += '&goal[' + _self.enc(i) + ']=' + _self.enc(clicky_custom.goal[i])
                        }
                    } else {
                        goal = '&goal=' + _self.enc(clicky_custom.goal)
                    }
                    clicky_custom.goal = ''
                }
                if (clicky_custom.split) {
                    for (var i in clicky_custom.split) {
                        if (clicky_custom.split.hasOwnProperty && clicky_custom.split.hasOwnProperty(i)) {
                            if (i == 'goal' && typeof clicky_custom.split.goal == 'object') {
                                for (var j = 0, l = clicky_custom.split.goal.length; j < l; j++) {
                                    split += '&split[goal][]=' + clicky_custom.split.goal[j]
                                }
                            } else split += '&split[' + _self.enc(i) + ']=' + _self.enc(clicky_custom.split[i])
                        }
                    }
                    clicky_custom.split = ''
                }
            }
            for (var site_id_index = 0; site_id_index < site_ids.length; site_id_index++) {
                var site_id = site_ids[site_id_index],
                    hm = _self.get_cookie('_heatmaps_g2g_' + site_id) || window['_heatmaps_g2g_' + site_id] || '';
                if (_self.get_cookie('_no_tracky_' + site_id)) continue;
                if (type != 'pageview' && (window['unpoco_' + site_id])) continue;
                if (type == 'heatmap' && hm != 'yes') continue;
                if (called_by_pageview && type == 'pageview' && _self.is_pageview_fired(site_id)) continue;
                _self.inject(_self.domain + '/in.php?site_id=' + site_id + '&type=' + type + q + custom + goal + split + '&res=' + screen.width + "x" + screen.height + '&lang=' + (navigator.language || navigator.browserLanguage || 'en') + '&tz=' + _self.enc(window.Intl && Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone || '') + '&tc=' + (navigator.maxTouchPoints || '') + (_self.he_platform ? '&hep=' + _self.he_platform : '') + (_self.he_model ? '&hem=' + _self.he_model : '') + '&ck=' + (navigator.cookieEnabled && !clicky_custom.cookies_disable ? 1 : 0) + (jsuid ? '&jsuid=' + jsuid : '') + (hm ? '&hm=' + hm : '') + (clicky_custom.visitor_consent ? '&consent=1' : '') + '&mime=js&x=' + Math.random(), (type == 'pageview' ? 'js' : 'beacon'))
            }
            _self.ref = '';
            _self.utm = ''
        };
        this.inject = function(src, type) {
            type = type || 'js';
            if (type == 'beacon') {
                if (window.navigator.sendBeacon && navigator.sendBeacon(src)) return;
                type = 'js'
            }
            if (type == 'js') {
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = !0;
                s.src = src
            } else if (type == 'css') {
                var s = document.createElement('link');
                s.type = 'text/css';
                s.rel = 'stylesheet';
                s.href = src
            }(document.body || document.getElementsByTagName('head')[0]).appendChild(s)
        };
        this.is_pageview_fired = function(site_id) {
            for (var p = 0; p < pageviews_fired.length; p++)
                if (pageviews_fired[p] == site_id) return !0;
            return !1
        };
        this.ping_start = function() {
            if (clicky_custom.ping_disable || _self.pinging || (clicky_custom.timeout && (clicky_custom.timeout < 5 || clicky_custom.timeout > 240))) return;
            _self.pinging = 1;
            _self.ps_stop = clicky_custom.timeout ? ((clicky_custom.timeout * 60) - 120) + 5 : 485;
            setTimeout(_self.ping, 30000);
            setTimeout(_self.ping, 60000);
            setTimeout(_self.ping_set, 120000)
        };
        this.ping_set = function() {
            var pingy = setInterval(_self.ping, 120000);
            setTimeout(function() {
                clearInterval(pingy)
            }, _self.ps_stop * 1000);
            _self.ping()
        };
        this.ping = function() {
            _self.beacon('ping')
        };
        this.get_cookie = function(name) {
            if (clicky_custom.sticky_data_disable && name.match(/^_(custom|utm|referrer)/)) return '';
            var ca = document.cookie.split(';');
            for (var i = 0, l = ca.length; i < l; i++) {
                if (ca[i].match(new RegExp("\\b" + name + "="))) return decodeURIComponent(ca[i].split(name + '=')[1])
            }
            return ''
        };
        this.set_cookie = function(name, value, expires, force) {
            if ((clicky_custom.cookies_disable && !force) || (clicky_custom.sticky_data_disable && name.match(/^_(custom|utm|referrer)/))) return !1;
            var maxage = expires == 'session' ? '' : ";max-age=" + (expires || 86400 * 365);
            var temp = name + "=" + _self.enc(value) + maxage + ";path=/;";
            if (clicky_custom.cookie_domain) {
                temp += 'domain=' + clicky_custom.cookie_domain + ';'
            } else if (location.hostname.match(/\./)) temp += 'domain=.' + location.hostname.replace(/^www\./i, '') + ';';
            document.cookie = temp
        };
        this.enc = function(e) {
            return window.encodeURIComponent ? encodeURIComponent(e) : escape(e)
        };
        this.add_event = function(o, type, func) {
            if (o.addEventListener) {
                o.addEventListener(type, func, !1)
            } else if (o.attachEvent) {
                o.attachEvent("on" + type, func)
            }
        };
        this.advanced = function() {
            var is_link = new RegExp("^(https?|ftp|telnet|mailto|tel):", "i");
            var is_link_internal = new RegExp("^https?:\/\/(.*)" + location.host.replace(/^www\./i, ""), "i");
            var is_download = new RegExp("\\.(7z|aac|apk|avi|cab|csv|dmg|doc(x|m|b)?|epub|exe|flv|gif|gz|jpe?g|js|m4a|mp(3|4|e?g)|mobi|mov|msi|ods|pdf|phps|png|ppt(x|m|b)?|rar|rtf|sea|sit|svgz?|tar|torrent|txt|vcf|web(m|p)|wma|wmv|xls(x|m|b)?|xml|zip)$", "i");
            var a = document.getElementsByTagName("a");
            for (var i = 0; i < a.length; i++) {
                if (typeof(a[i].className) != 'string') continue;
                if (a[i].className.match(/clicky_log/i)) {
                    if (a[i].className.match(/clicky_log_download/i)) {
                        _self.add_event(a[i], "mousedown", _self.download)
                    } else if (a[i].className.match(/clicky_log_outbound/i)) {
                        _self.add_event(a[i], "mousedown", _self.outbound)
                    } else {
                        _self.add_event(a[i], "mousedown", _self.click)
                    }
                } else {
                    if (clicky_custom.outbound_disable || clicky_custom.advanced_disable || window.clicky_advanced_disable) continue;
                    if (is_link.test(a[i].href) && !a[i].className.match(/clicky_ignore/i)) {
                        if (is_download.test(a[i].href)) {
                            _self.add_event(a[i], "mousedown", _self.download)
                        } else if (!is_link_internal.test(a[i].href)) {
                            _self.add_event(a[i], "mousedown", _self.outbound)
                        } else if (clicky_custom.outbound_pattern) {
                            var p = clicky_custom.outbound_pattern;
                            if (typeof p == 'object') {
                                for (var j = 0; j < p.length; j++) {
                                    if (_self.outbound_pattern_match(a[i].href, p[j])) {
                                        _self.add_event(a[i], "mousedown", _self.outbound);
                                        break
                                    }
                                }
                            } else if (typeof p == 'string') {
                                if (_self.outbound_pattern_match(a[i].href, p)) _self.add_event(a[i], "mousedown", _self.outbound)
                            }
                        }
                    }
                }
            }
        };
        this.adv_log = function(e, type) {
            var obj = _self.get_target(e);
            _self.log(_self.adv_href(obj), _self.adv_text(obj), type)
        };
        this.get_target = function(e) {
            if (!e) var e = window.event;
            var t = e.target ? e.target : e.srcElement;
            if (t.nodeType && t.nodeType == 3) t = t.parentNode;
            return t
        };
        this.adv_href = function(e) {
            do {
                if (e.href && !e.src) return e.href;
                e = _self.get_parent(e)
            } while (e);
            return ""
        };
        this.adv_text = function(e) {
            do {
                var txt = e.text ? e.text : e.innerText;
                if (txt) return txt;
                if (e.title) return e.title;
                if (e.name) return e.name;
                if (e.alt) return e.alt;
                if (e.src) return e.src;
                e = _self.get_parent(e)
            } while (e);
            return ""
        };
        this.get_parent = function(e) {
            return e.parentElement || e.parentNode
        };
        this.outbound_pattern_match = function(href, pattern) {
            return RegExp(pattern.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")).test(href)
        };
        this.download = function(e) {
            _self.adv_log(e, "download")
        };
        this.outbound = function(e) {
            _self.adv_log(e, "outbound")
        };
        this.click = function(e) {
            _self.adv_log(e, "click")
        }
    };
    return new function() {
        this.getInstance = function() {
            if (instance == null) {
                instance = new _ins();
                instance.constructor = null
            }
            return instance
        }
    }
})();
var clicky = clicky_obj.getInstance();
if (!window.clicky_custom) var clicky_custom = {};
if (self != top) {
    try {
        var test = top.document.title
    } catch (e) {
        clicky_custom.track_iframe = 1
    }
}
if (window.clicky_goal) clicky_custom.goal = clicky_goal;
if (window.clicky_custom_session) clicky_custom.session = clicky_custom_session;
if (clicky_custom.session) clicky_custom.visitor = clicky_custom.session;
if (clicky_custom.no_cookies) clicky_custom.cookies_disable = 1;
var clicky_site_ids = clicky_site_ids || [];
if (window.async_site_id) clicky_site_ids.push(async_site_id);
if (window.clicky_site_id) clicky_site_ids.push(clicky_site_id);
while (clicky_site_ids.length) clicky.init(clicky_site_ids.shift());
var _cgen = clicky,
    _cgen_custom = clicky_custom;
_cgen.init(100969188);
! function() {
    "use strict";

    function i(i, n) {
        for (var t = 0; t < n.length; t++) {
            var e = n[t];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(i, e.key, e)
        }
    }
    var n = function() {
        function n(i) {
            var t = this;
            ! function(i, n) {
                if (!(i instanceof n)) throw new TypeError("Cannot call a class as a function")
            }(this, n), this.el = i, this.summary = i.querySelector("summary"), this.content = i.querySelector(".sc_fs_faq__content"), this.animation = null, this.isClosing = !1, this.isExpanding = !1, this.summary.addEventListener("click", (function(i) {
                return t.onClick(i)
            }))
        }
        var t, e, s;
        return t = n, (e = [{
            key: "onClick",
            value: function(i) {
                i.preventDefault(), this.el.style.overflow = "hidden", this.isClosing || !this.el.open ? this.open() : (this.isExpanding || this.el.open) && this.shrink()
            }
        }, {
            key: "shrink",
            value: function() {
                var i = this;
                this.isClosing = !0;
                var n = "".concat(this.el.offsetHeight, "px"),
                    t = "".concat(this.summary.offsetHeight, "px");
                this.animation && this.animation.cancel(), this.animation = this.el.animate({
                    height: [n, t]
                }, {
                    duration: 400,
                    easing: "ease-out"
                }), this.animation.onfinish = function() {
                    return i.onAnimationFinish(!1)
                }, this.animation.oncancel = function() {
                    return i.isClosing = !1
                }
            }
        }, {
            key: "open",
            value: function() {
                var i = this;
                this.el.style.height = "".concat(this.el.offsetHeight, "px"), this.el.open = !0, window.requestAnimationFrame((function() {
                    return i.expand()
                }))
            }
        }, {
            key: "expand",
            value: function() {
                var i = this;
                this.isExpanding = !0;
                var n = "".concat(this.el.offsetHeight, "px"),
                    t = "".concat(this.summary.offsetHeight + this.content.offsetHeight, "px");
                this.animation && this.animation.cancel(), this.animation = this.el.animate({
                    height: [n, t]
                }, {
                    duration: 400,
                    easing: "ease-out"
                }), this.animation.onfinish = function() {
                    return i.onAnimationFinish(!0)
                }, this.animation.oncancel = function() {
                    return i.isExpanding = !1
                }
            }
        }, {
            key: "onAnimationFinish",
            value: function(i) {
                this.el.open = i, this.animation = null, this.isClosing = !1, this.isExpanding = !1, this.el.style.height = this.el.style.overflow = ""
            }
        }]) && i(t.prototype, e), s && i(t, s), Object.defineProperty(t, "prototype", {
            writable: !1
        }), n
    }();
    document.querySelectorAll(".sc_fs_card__animate").forEach((function(i) {
        new n(i)
    }))
}();
var tocplus = {
    "smooth_scroll": "1",
    "visibility_show": "Zeigen",
    "visibility_hide": "Ausblenden",
    "visibility_hide_by_default": "1",
    "width": "Auto"
};
! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof module && module.exports ? require("jquery") : jQuery)
}(function(t) {
    function e(t) {
        return t.replace(/(:|\.|\/)/g, "\\$1")
    }
    var o = "1.6.0",
        i = {},
        l = {
            exclude: [],
            excludeWithin: [],
            offset: 0,
            direction: "top",
            delegateSelector: null,
            scrollElement: null,
            scrollTarget: null,
            beforeScroll: function() {},
            afterScroll: function() {},
            easing: "swing",
            speed: 400,
            autoCoefficient: 2,
            preventDefault: !0
        },
        s = function(e) {
            var o = [],
                i = !1,
                l = e.dir && "left" === e.dir ? "scrollLeft" : "scrollTop";
            return this.each(function() {
                var e = t(this);
                return this !== document && this !== window ? !document.scrollingElement || this !== document.documentElement && this !== document.body ? void(e[l]() > 0 ? o.push(this) : (e[l](1), i = e[l]() > 0, i && o.push(this), e[l](0))) : (o.push(document.scrollingElement), !1) : void 0
            }), o.length || this.each(function() {
                "BODY" === this.nodeName && (o = [this])
            }), "first" === e.el && o.length > 1 && (o = [o[0]]), o
        };
    t.fn.extend({
        scrollable: function(t) {
            var e = s.call(this, {
                dir: t
            });
            return this.pushStack(e)
        },
        firstScrollable: function(t) {
            var e = s.call(this, {
                el: "first",
                dir: t
            });
            return this.pushStack(e)
        },
        smoothScroll: function(o, i) {
            if (o = o || {}, "options" === o) return i ? this.each(function() {
                var e = t(this),
                    o = t.extend(e.data("ssOpts") || {}, i);
                t(this).data("ssOpts", o)
            }) : this.first().data("ssOpts");
            var l = t.extend({}, t.fn.smoothScroll.defaults, o),
                s = function(o) {
                    var i = this,
                        s = t(this),
                        n = t.extend({}, l, s.data("ssOpts") || {}),
                        c = l.exclude,
                        a = n.excludeWithin,
                        r = 0,
                        h = 0,
                        u = !0,
                        d = {},
                        p = t.smoothScroll.filterPath(location.pathname),
                        f = t.smoothScroll.filterPath(i.pathname),
                        m = location.hostname === i.hostname || !i.hostname,
                        g = n.scrollTarget || f === p,
                        v = e(i.hash);
                    if (n.scrollTarget || m && g && v) {
                        for (; u && r < c.length;) s.is(e(c[r++])) && (u = !1);
                        for (; u && h < a.length;) s.closest(a[h++]).length && (u = !1)
                    } else u = !1;
                    u && (n.preventDefault && o.preventDefault(), t.extend(d, n, {
                        scrollTarget: n.scrollTarget || v,
                        link: i
                    }), t.smoothScroll(d))
                };
            return null !== o.delegateSelector ? this.undelegate(o.delegateSelector, "click.smoothscroll").delegate(o.delegateSelector, "click.smoothscroll", s) : this.unbind("click.smoothscroll").bind("click.smoothscroll", s), this
        }
    }), t.smoothScroll = function(e, o) {
        if ("options" === e && "object" == typeof o) return t.extend(i, o);
        var l, s, n, c, a, r = 0,
            h = "offset",
            u = "scrollTop",
            d = {},
            p = {};
        "number" == typeof e ? (l = t.extend({
            link: null
        }, t.fn.smoothScroll.defaults, i), n = e) : (l = t.extend({
            link: null
        }, t.fn.smoothScroll.defaults, e || {}, i), l.scrollElement && (h = "position", "static" === l.scrollElement.css("position") && l.scrollElement.css("position", "relative"))), u = "left" === l.direction ? "scrollLeft" : u, l.scrollElement ? (s = l.scrollElement, /^(?:HTML|BODY)$/.test(s[0].nodeName) || (r = s[u]())) : s = t("html, body").firstScrollable(l.direction), l.beforeScroll.call(s, l), n = "number" == typeof e ? e : o || t(l.scrollTarget)[h]() && t(l.scrollTarget)[h]()[l.direction] || 0, d[u] = n + r + l.offset, c = l.speed, "auto" === c && (a = Math.abs(d[u] - s[u]()), c = a / l.autoCoefficient), p = {
            duration: c,
            easing: l.easing,
            complete: function() {
                l.afterScroll.call(l.link, l)
            }
        }, l.step && (p.step = l.step), s.length ? s.stop().animate(d, p) : l.afterScroll.call(l.link, l)
    }, t.smoothScroll.version = o, t.smoothScroll.filterPath = function(t) {
        return t = t || "", t.replace(/^\//, "").replace(/(?:index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "")
    }, t.fn.smoothScroll.defaults = l
}), jQuery.cookie = function(t, e, o) {
    if (arguments.length > 1 && "[object Object]" !== String(e)) {
        if (o = jQuery.extend({}, o), (null === e || void 0 === e) && (o.expires = -1), "number" == typeof o.expires) {
            var i = o.expires,
                l = o.expires = new Date;
            l.setDate(l.getDate() + i)
        }
        return e = String(e), document.cookie = [encodeURIComponent(t), "=", o.raw ? e : encodeURIComponent(e), o.expires ? "; expires=" + o.expires.toUTCString() : "", o.path ? "; path=" + o.path : "", o.domain ? "; domain=" + o.domain : "", o.secure ? "; secure" : ""].join("")
    }
    o = e || {};
    var s, n = o.raw ? function(t) {
        return t
    } : decodeURIComponent;
    return (s = new RegExp("(?:^|; )" + encodeURIComponent(t) + "=([^;]*)").exec(document.cookie)) ? n(s[1]) : null
}, jQuery(document).ready(function(t) {
    if ("undefined" != typeof tocplus) {
        if (t.fn.shrinkTOCWidth = function() {
                t(this).css({
                    width: "auto",
                    display: "table"
                }), /MSIE 7\./.test(navigator.userAgent) && t(this).css("width", "")
            }, 1 == tocplus.smooth_scroll) {
            var e = hostname = pathname = qs = hash = null;
            t("body a").click(function() {
                if (hostname = t(this).prop("hostname"), pathname = t(this).prop("pathname"), qs = t(this).prop("search"), hash = t(this).prop("hash"), pathname.length > 0 && "/" != pathname.charAt(0) && (pathname = "/" + pathname), window.location.hostname == hostname && window.location.pathname == pathname && window.location.search == qs && "" !== hash) {
                    var o = hash.replace(/([ !"$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g, "\\$1");
                    t(o).length > 0 ? e = hash : (anchor = hash, anchor = anchor.replace("#", ""), e = 'a[name="' + anchor + '"]', 0 == t(e).length && (e = "")), offset = "undefined" != typeof tocplus.smooth_scroll_offset ? -1 * tocplus.smooth_scroll_offset : t("#wpadminbar").length > 0 && t("#wpadminbar").is(":visible") ? -30 : 0, e && t.smoothScroll({
                        scrollTarget: e,
                        offset: offset
                    })
                }
            })
        }
        if ("undefined" != typeof tocplus.visibility_show) {
            var o = "undefined" != typeof tocplus.visibility_hide_by_default ? !0 : !1;
            if (t.cookie) var i = t.cookie("tocplus_hidetoc") ? tocplus.visibility_show : tocplus.visibility_hide;
            else var i = tocplus.visibility_hide;
            o && (i = i == tocplus.visibility_hide ? tocplus.visibility_show : tocplus.visibility_hide), t("#toc_container p.toc_title").append(' <span class="toc_toggle">[<a href="#">' + i + "</a>]</span>"), i == tocplus.visibility_show && (t("ul.toc_list").hide(), t("#toc_container").addClass("contracted").shrinkTOCWidth()), t("span.toc_toggle a").click(function(e) {
                switch (e.preventDefault(), t(this).html()) {
                    case t("<div/>").html(tocplus.visibility_hide).text():
                        t(this).html(tocplus.visibility_show), t.cookie && (o ? t.cookie("tocplus_hidetoc", null, {
                            path: "/"
                        }) : t.cookie("tocplus_hidetoc", "1", {
                            expires: 30,
                            path: "/"
                        })), t("ul.toc_list").hide("fast"), t("#toc_container").addClass("contracted").shrinkTOCWidth();
                        break;
                    case t("<div/>").html(tocplus.visibility_show).text():
                    default:
                        t(this).html(tocplus.visibility_hide), t.cookie && (o ? t.cookie("tocplus_hidetoc", "1", {
                            expires: 30,
                            path: "/"
                        }) : t.cookie("tocplus_hidetoc", null, {
                            path: "/"
                        })), t("#toc_container").css("width", tocplus.width).removeClass("contracted"), t("ul.toc_list").show("fast")
                }
            })
        }
    }
});
! function() {
    var e = "displayCookieConsent",
        t = "cookieChoiceInfo",
        n = "cookieChoiceDismiss",
        o = "cookieChoiceDismissIcon";

    function i() {
        var e = window._wfCookieConsentSettings;
        void 0 !== e && void 0 !== e.wf_linkhref && (e.styles = "position:fixed; width:100%; background-color:#EEEEEE; background-color:rgba(238, 238, 238, 0.9); margin:0; left:0; " + e.wf_position + ":0; padding:4px; z-index:1000; text-align:center;", s(h(e.wf_cookietext), h(e.wf_dismisstext), h(e.wf_linktext), e.wf_linkhref, e.styles, !1))
    }

    function a(e, n, i, a, d) {
        var p, s = d,
            u = document.createElement("div"),
            h = document.createElement("div");
        return h.style.cssText = "padding-right: 50px;", u.id = t, u.style.cssText = s, h.appendChild(c(e)), i && a && h.appendChild(l(i, a)), h.appendChild(r(n)), u.appendChild(h), u.appendChild(((p = document.createElement("a")).id = o, p.href = "#", p.style.cssText = "width: 50px; height: 100%; background-size: 20px; display: inline-block; position: absolute; right: 0px; top: 0px; background-position: 34% 50%; background-color: #CCCCCC; background-color: rgba(204, 204, 204, 0.6); background-repeat: no-repeat; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABixJREFUeNrUW2tsVFUQnlZBaRFQUVFbY/0BKD76UBRUfASj1R9GJBoCiVYIMfgg4a9NjBWQHzSS4CMo8QEagqhBajRifCuaIIgVioooKolIRBCotvKo87lz29nZu2Xv7j1n707yZZN795w5M2fuOTNz5pSRHzpf0MC4hHEeYwRjMON4RhdjD+NXxreMDYzNjHbGXpcDK3PUbwXjUsYNjKsYNYyzRdhcaR/jJ0YH4x3GOsZ2SjiNZsyVQffEDChkDWMyozJpFgDTns2YlGVwvzC+Y3zP2MrYwTgopn+EcSLjBMbpjFGiyJHyOyikvy2MpxnLGAeKOePVMpB/Qmbsa0YLYwLjtDz6LmeMYUxjvCprhOXxDePOYgk/k7HLDAiz+iLjWsbAmPnViJVtCVHEK/LeC2E2V5gBdDOWMC70wB87x3T5lPQYdvmwhoaQGfhEzNw3DZNPbL8ay1FZhMtdMLzJfIeY9WYHpp7PpKw3k7JcFtbY6FZGp2LwM+PGBG2/QxjPGCWsjksJEPRv1fEm2aKSSM1GCdg9BhTSYb0x+88YZybcGZslvkUw5icLWe07zMwnXfiA5hhLeDAfD3Gl+eZHUmnRAjV+eJxXRGk8XTU+xJhIpUfYCt8ynungXBqeYzy8ZipdqhbrDWRpyaWR3k7WRQxhk0h3KHkOSICVlerEwcGf/2WMj8hsgMMcg3aFo65na4yTlJVeVn9cmkcSpI3xhGOvb5OE3VHoIuXLdEtWKoNGSTTXI38eE4EBPK43lfJaHQhfLymzYGFujNh+mRrfkrA/zMvVTLIoYLHZe1sdCQ/sjLqtSR9d0n639WkqJWPTI15UvtFdqwMlWOGRTarNs693VT8z9IsJEkriRbukpygBSqiXdFocwoOaVF9v6xePqhePxDBrcSghbuFBZ4n5o78/KJWppuMY76uEQlzJjUKU4EL4sM+gMVj9A28JTIfHuHjlowSXwoMestZ+u2wreLDWwfYVRQmuhQddZ5Im9Jh6sNiRA5OLEuo8CG/9HaTS0hyY+xx6cf0pwZfwoKGMbcLnRzJJj1sc+/FWCfMZl3kUPqAvhBeyXfSnYn6Nh+jMKuGgZ+FBHwo/nGj1LoDA5Z5C1PkSbWpF4LzhYk/824Tn4XLxAwI64mkAqwLtK1ovXqgPOqSyRmkp7ys9MK8TUw87Al/oSQFrVc4jLdCY6EF4veChGuS5IijhU5Uh+j/tFTCf4pBpmJMTfPMLPSphoCRVwOc3MjPwsEfh7WrvSwlV1Jf0xcJL9yumK4okvE8l1FPfydEHeHA1pepv8GAjFXiWFoNv3+pYCVNV38iA08mUOjQInJLRRRTeZWYpoOfDskIvqYfTiiy8SyUgd7mZ+hKrvWO6SzF6LQHCu1LCOOX5YgHsrUA7l/GXvEBsUF2A8HElMF0oYZHqZ1E2/ziv42SmsQ6E708JUas/hqrMF3aBjFOvSYoBQuTKiJ13OI7qrBLujtj+XtUW4XDGmWeFESIqAygQx047HYa0gRLeYJwaoR1k25qLbFpLaDAk4gAbJcHhkpryGNcDJv7IesBaaayghUqfqim93qHpWA0mm2xNbYkrYDml1zsc09MtE18gaLSBop/JJ4VmUHqpz7hcG9ZIqBg0frYEhceFDV1GOy9qB/gUjlJp1grhSs42NfaPKM+S3rlm751VAsKPkM9Wl/jlXUpfbgIleFBzEj7zX6rx4hMoOM+JWoHVxhIWUPKqx8Yas0ey9+a4OkfUtMoooa2AoClumqmCuWDmYz/lwiLylFECwt4pRRQcE/CCGdMOyXI5I0SKnYbp654dJvglsynzztJ75OnuEC5DbqTMMz6kmxoc8j2FUifY9tpOl+zzg3ya3xCJFfZR5gUqnLzcQ6m64zgW4fGSwNhOmadJH8uEFI0ukO8w7O7g75SqyYETdT2lEq7D+ukLfnqVeHFTxaLaKfwYrUNc3YKy2HHW9dbKanybOCNh1Cku9h4xW3w2OJ87STI8+D2jn/YkyYylsivtT6IzUiUzgzq83VT4nWG447gh+rg4NbEWY7uu7MY2hcuUKGtFgTLq9IZLCq1CtlaM4bCsHTis3CuK+4HxOeMrMfduFwP8T4ABAECF2S1VopbxAAAAAElFTkSuQmCC);", p)), u
    }

    function d(e, t) {
        "textContent" in document.body ? e.textContent = t : e.innerText = t
    }

    function c(e) {
        var t = document.createElement("span");
        return d(t, e), t
    }

    function r(e) {
        var t = document.createElement("a");
        return d(t, e), t.id = n, t.href = "#", t.style.marginLeft = "24px", t
    }

    function l(e, t) {
        var n = document.createElement("a");
        return d(n, e), n.href = t, n.target = "_blank", n.rel = "noopener", n.style.marginLeft = "8px", n
    }

    function p() {
        var t;
        return (t = new Date).setFullYear(t.getFullYear() + 1), document.cookie = e + "=y;path=/; expires=" + t.toGMTString(), u(), !1
    }

    function s(i, d, s, h, m, f) {
        if (!document.cookie.match(new RegExp(e + "=([^;]+)"))) {
            u();
            var g = f ? function(e, n, o, i) {
                    var a = document.createElement("div");
                    a.id = t;
                    var d = document.createElement("div");
                    d.style.cssText = "position:fixed;width:100%;height:100%;z-index:999;top:0;left:0;opacity:0.5;filter:alpha(opacity=50);background-color:#ccc;";
                    var p = document.createElement("div");
                    p.style.cssText = "position:relative;left:-50%;margin-top:-25%;background-color:#fff;padding:20px;box-shadow:4px 4px 25px #888;";
                    var s = document.createElement("div");
                    s.style.cssText = "z-index:1000;position:fixed;left:50%;top:50%";
                    var u = r(n);
                    return u.style.display = "block", u.style.textAlign = "right", u.style.marginTop = "8px", p.appendChild(c(e)), o && i && p.appendChild(l(o, i)), p.appendChild(u), s.appendChild(p), a.appendChild(d), a.appendChild(s), a
                }(i, d, s, h) : a(i, d, s, h, m),
                C = document.createDocumentFragment();
            C.appendChild(g), document.body.appendChild(C.cloneNode(!0)), document.getElementById(n).onclick = p, document.getElementById(o).onclick = p
        }
    }

    function u() {
        var e = document.getElementById(t);
        null != e && e.parentNode.removeChild(e)
    }

    function h(e) {
        var t = document.createElement("textarea");
        return t.innerHTML = e, 0 === t.childNodes.length ? "" : t.childNodes[0].nodeValue
    }
    document.addEventListener ? document.addEventListener("DOMContentLoaded", i) : document.attachEvent("onreadystatechange", function(e) {
        "complete" === document.readyState && i()
    })
}();
var affcoups_post = {
    "ajax_url": "https:\/\/www.gesundheitsseiten24.de\/wp-admin\/admin-ajax.php"
}; /*! For license information please see main.js.LICENSE.txt */
! function() {
    var t = {
            152: function(t) {
                var e;
                e = function() {
                    return function() {
                        var t = {
                                134: function(t, e, n) {
                                    "use strict";
                                    n.d(e, {
                                        default: function() {
                                            return b
                                        }
                                    });
                                    var r = n(279),
                                        o = n.n(r),
                                        i = n(370),
                                        c = n.n(i),
                                        a = n(817),
                                        u = n.n(a);

                                    function l(t) {
                                        return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                                            return typeof t
                                        } : function(t) {
                                            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                                        })(t)
                                    }

                                    function s(t, e) {
                                        for (var n = 0; n < e.length; n++) {
                                            var r = e[n];
                                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                        }
                                    }
                                    var f = function() {
                                        function t(e) {
                                            ! function(t, e) {
                                                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                                            }(this, t), this.resolveOptions(e), this.initSelection()
                                        }
                                        var e, n, r;
                                        return e = t, (n = [{
                                            key: "resolveOptions",
                                            value: function() {
                                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                                this.action = t.action, this.container = t.container, this.emitter = t.emitter, this.target = t.target, this.text = t.text, this.trigger = t.trigger, this.selectedText = ""
                                            }
                                        }, {
                                            key: "initSelection",
                                            value: function() {
                                                this.text ? this.selectFake() : this.target && this.selectTarget()
                                            }
                                        }, {
                                            key: "createFakeElement",
                                            value: function() {
                                                var t = "rtl" === document.documentElement.getAttribute("dir");
                                                this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[t ? "right" : "left"] = "-9999px";
                                                var e = window.pageYOffset || document.documentElement.scrollTop;
                                                return this.fakeElem.style.top = "".concat(e, "px"), this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.fakeElem
                                            }
                                        }, {
                                            key: "selectFake",
                                            value: function() {
                                                var t = this,
                                                    e = this.createFakeElement();
                                                this.fakeHandlerCallback = function() {
                                                    return t.removeFake()
                                                }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.container.appendChild(e), this.selectedText = u()(e), this.copyText(), this.removeFake()
                                            }
                                        }, {
                                            key: "removeFake",
                                            value: function() {
                                                this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null)
                                            }
                                        }, {
                                            key: "selectTarget",
                                            value: function() {
                                                this.selectedText = u()(this.target), this.copyText()
                                            }
                                        }, {
                                            key: "copyText",
                                            value: function() {
                                                var t;
                                                try {
                                                    t = document.execCommand(this.action)
                                                } catch (e) {
                                                    t = !1
                                                }
                                                this.handleResult(t)
                                            }
                                        }, {
                                            key: "handleResult",
                                            value: function(t) {
                                                this.emitter.emit(t ? "success" : "error", {
                                                    action: this.action,
                                                    text: this.selectedText,
                                                    trigger: this.trigger,
                                                    clearSelection: this.clearSelection.bind(this)
                                                })
                                            }
                                        }, {
                                            key: "clearSelection",
                                            value: function() {
                                                this.trigger && this.trigger.focus(), document.activeElement.blur(), window.getSelection().removeAllRanges()
                                            }
                                        }, {
                                            key: "destroy",
                                            value: function() {
                                                this.removeFake()
                                            }
                                        }, {
                                            key: "action",
                                            set: function() {
                                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
                                                if (this._action = t, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                                            },
                                            get: function() {
                                                return this._action
                                            }
                                        }, {
                                            key: "target",
                                            set: function(t) {
                                                if (void 0 !== t) {
                                                    if (!t || "object" !== l(t) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                                    if ("copy" === this.action && t.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                                    if ("cut" === this.action && (t.hasAttribute("readonly") || t.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                                    this._target = t
                                                }
                                            },
                                            get: function() {
                                                return this._target
                                            }
                                        }]) && s(e.prototype, n), r && s(e, r), t
                                    }();

                                    function h(t) {
                                        return (h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                                            return typeof t
                                        } : function(t) {
                                            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                                        })(t)
                                    }

                                    function d(t, e) {
                                        for (var n = 0; n < e.length; n++) {
                                            var r = e[n];
                                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                                        }
                                    }

                                    function p(t, e) {
                                        return (p = Object.setPrototypeOf || function(t, e) {
                                            return t.__proto__ = e, t
                                        })(t, e)
                                    }

                                    function y(t) {
                                        var e = function() {
                                            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                                            if (Reflect.construct.sham) return !1;
                                            if ("function" == typeof Proxy) return !0;
                                            try {
                                                return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0
                                            } catch (t) {
                                                return !1
                                            }
                                        }();
                                        return function() {
                                            var n, r = m(t);
                                            if (e) {
                                                var o = m(this).constructor;
                                                n = Reflect.construct(r, arguments, o)
                                            } else n = r.apply(this, arguments);
                                            return v(this, n)
                                        }
                                    }

                                    function v(t, e) {
                                        return !e || "object" !== h(e) && "function" != typeof e ? function(t) {
                                            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                            return t
                                        }(t) : e
                                    }

                                    function m(t) {
                                        return (m = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
                                            return t.__proto__ || Object.getPrototypeOf(t)
                                        })(t)
                                    }

                                    function g(t, e) {
                                        var n = "data-clipboard-".concat(t);
                                        if (e.hasAttribute(n)) return e.getAttribute(n)
                                    }
                                    var b = function(t) {
                                        ! function(t, e) {
                                            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                                            t.prototype = Object.create(e && e.prototype, {
                                                constructor: {
                                                    value: t,
                                                    writable: !0,
                                                    configurable: !0
                                                }
                                            }), e && p(t, e)
                                        }(i, t);
                                        var e, n, r, o = y(i);

                                        function i(t, e) {
                                            var n;
                                            return function(t, e) {
                                                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                                            }(this, i), (n = o.call(this)).resolveOptions(e), n.listenClick(t), n
                                        }
                                        return e = i, r = [{
                                            key: "isSupported",
                                            value: function() {
                                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
                                                    e = "string" == typeof t ? [t] : t,
                                                    n = !!document.queryCommandSupported;
                                                return e.forEach((function(t) {
                                                    n = n && !!document.queryCommandSupported(t)
                                                })), n
                                            }
                                        }], (n = [{
                                            key: "resolveOptions",
                                            value: function() {
                                                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                                this.action = "function" == typeof t.action ? t.action : this.defaultAction, this.target = "function" == typeof t.target ? t.target : this.defaultTarget, this.text = "function" == typeof t.text ? t.text : this.defaultText, this.container = "object" === h(t.container) ? t.container : document.body
                                            }
                                        }, {
                                            key: "listenClick",
                                            value: function(t) {
                                                var e = this;
                                                this.listener = c()(t, "click", (function(t) {
                                                    return e.onClick(t)
                                                }))
                                            }
                                        }, {
                                            key: "onClick",
                                            value: function(t) {
                                                var e = t.delegateTarget || t.currentTarget;
                                                this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new f({
                                                    action: this.action(e),
                                                    target: this.target(e),
                                                    text: this.text(e),
                                                    container: this.container,
                                                    trigger: e,
                                                    emitter: this
                                                })
                                            }
                                        }, {
                                            key: "defaultAction",
                                            value: function(t) {
                                                return g("action", t)
                                            }
                                        }, {
                                            key: "defaultTarget",
                                            value: function(t) {
                                                var e = g("target", t);
                                                if (e) return document.querySelector(e)
                                            }
                                        }, {
                                            key: "defaultText",
                                            value: function(t) {
                                                return g("text", t)
                                            }
                                        }, {
                                            key: "destroy",
                                            value: function() {
                                                this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                                            }
                                        }]) && d(e.prototype, n), r && d(e, r), i
                                    }(o())
                                },
                                828: function(t) {
                                    if ("undefined" != typeof Element && !Element.prototype.matches) {
                                        var e = Element.prototype;
                                        e.matches = e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector
                                    }
                                    t.exports = function(t, e) {
                                        for (; t && 9 !== t.nodeType;) {
                                            if ("function" == typeof t.matches && t.matches(e)) return t;
                                            t = t.parentNode
                                        }
                                    }
                                },
                                438: function(t, e, n) {
                                    var r = n(828);

                                    function o(t, e, n, r, o) {
                                        var c = i.apply(this, arguments);
                                        return t.addEventListener(n, c, o), {
                                            destroy: function() {
                                                t.removeEventListener(n, c, o)
                                            }
                                        }
                                    }

                                    function i(t, e, n, o) {
                                        return function(n) {
                                            n.delegateTarget = r(n.target, e), n.delegateTarget && o.call(t, n)
                                        }
                                    }
                                    t.exports = function(t, e, n, r, i) {
                                        return "function" == typeof t.addEventListener ? o.apply(null, arguments) : "function" == typeof n ? o.bind(null, document).apply(null, arguments) : ("string" == typeof t && (t = document.querySelectorAll(t)), Array.prototype.map.call(t, (function(t) {
                                            return o(t, e, n, r, i)
                                        })))
                                    }
                                },
                                879: function(t, e) {
                                    e.node = function(t) {
                                        return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType
                                    }, e.nodeList = function(t) {
                                        var n = Object.prototype.toString.call(t);
                                        return void 0 !== t && ("[object NodeList]" === n || "[object HTMLCollection]" === n) && "length" in t && (0 === t.length || e.node(t[0]))
                                    }, e.string = function(t) {
                                        return "string" == typeof t || t instanceof String
                                    }, e.fn = function(t) {
                                        return "[object Function]" === Object.prototype.toString.call(t)
                                    }
                                },
                                370: function(t, e, n) {
                                    var r = n(879),
                                        o = n(438);
                                    t.exports = function(t, e, n) {
                                        if (!t && !e && !n) throw new Error("Missing required arguments");
                                        if (!r.string(e)) throw new TypeError("Second argument must be a String");
                                        if (!r.fn(n)) throw new TypeError("Third argument must be a Function");
                                        if (r.node(t)) return function(t, e, n) {
                                            return t.addEventListener(e, n), {
                                                destroy: function() {
                                                    t.removeEventListener(e, n)
                                                }
                                            }
                                        }(t, e, n);
                                        if (r.nodeList(t)) return function(t, e, n) {
                                            return Array.prototype.forEach.call(t, (function(t) {
                                                t.addEventListener(e, n)
                                            })), {
                                                destroy: function() {
                                                    Array.prototype.forEach.call(t, (function(t) {
                                                        t.removeEventListener(e, n)
                                                    }))
                                                }
                                            }
                                        }(t, e, n);
                                        if (r.string(t)) return function(t, e, n) {
                                            return o(document.body, t, e, n)
                                        }(t, e, n);
                                        throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
                                    }
                                },
                                817: function(t) {
                                    t.exports = function(t) {
                                        var e;
                                        if ("SELECT" === t.nodeName) t.focus(), e = t.value;
                                        else if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) {
                                            var n = t.hasAttribute("readonly");
                                            n || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), n || t.removeAttribute("readonly"), e = t.value
                                        } else {
                                            t.hasAttribute("contenteditable") && t.focus();
                                            var r = window.getSelection(),
                                                o = document.createRange();
                                            o.selectNodeContents(t), r.removeAllRanges(), r.addRange(o), e = r.toString()
                                        }
                                        return e
                                    }
                                },
                                279: function(t) {
                                    function e() {}
                                    e.prototype = {
                                        on: function(t, e, n) {
                                            var r = this.e || (this.e = {});
                                            return (r[t] || (r[t] = [])).push({
                                                fn: e,
                                                ctx: n
                                            }), this
                                        },
                                        once: function(t, e, n) {
                                            var r = this;

                                            function o() {
                                                r.off(t, o), e.apply(n, arguments)
                                            }
                                            return o._ = e, this.on(t, o, n)
                                        },
                                        emit: function(t) {
                                            for (var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), r = 0, o = n.length; r < o; r++) n[r].fn.apply(n[r].ctx, e);
                                            return this
                                        },
                                        off: function(t, e) {
                                            var n = this.e || (this.e = {}),
                                                r = n[t],
                                                o = [];
                                            if (r && e)
                                                for (var i = 0, c = r.length; i < c; i++) r[i].fn !== e && r[i].fn._ !== e && o.push(r[i]);
                                            return o.length ? n[t] = o : delete n[t], this
                                        }
                                    }, t.exports = e, t.exports.TinyEmitter = e
                                }
                            },
                            e = {};

                        function n(r) {
                            if (e[r]) return e[r].exports;
                            var o = e[r] = {
                                exports: {}
                            };
                            return t[r](o, o.exports, n), o.exports
                        }
                        return n.n = function(t) {
                            var e = t && t.__esModule ? function() {
                                return t.default
                            } : function() {
                                return t
                            };
                            return n.d(e, {
                                a: e
                            }), e
                        }, n.d = function(t, e) {
                            for (var r in e) n.o(e, r) && !n.o(t, r) && Object.defineProperty(t, r, {
                                enumerable: !0,
                                get: e[r]
                            })
                        }, n.o = function(t, e) {
                            return Object.prototype.hasOwnProperty.call(t, e)
                        }, n(134)
                    }().default
                }, t.exports = e()
            }
        },
        e = {};

    function n(r) {
        var o = e[r];
        if (void 0 !== o) return o.exports;
        var i = e[r] = {
            exports: {}
        };
        return t[r].call(i.exports, i, i.exports, n), i.exports
    }
    n.n = function(t) {
            var e = t && t.__esModule ? function() {
                return t.default
            } : function() {
                return t
            };
            return n.d(e, {
                a: e
            }), e
        }, n.d = function(t, e) {
            for (var r in e) n.o(e, r) && !n.o(t, r) && Object.defineProperty(t, r, {
                enumerable: !0,
                get: e[r]
            })
        }, n.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        },
        function() {
            "use strict";
            var t = n(152),
                e = n.n(t);
            jQuery(document).ready((function(t) {
                new(e())(".affcoups-clipboard");
                t(document).on("click", ".affcoups-clipboard", (function(e) {
                    t(this).data("affcoups-coupon-id");
                    var n = t(this).find(".affcoups-clipboard__text"),
                        r = n.html(),
                        o = t(this).data("affcoups-clipboard-confirmation-text");
                    n.html(o), setTimeout((function() {
                        n.html(r)
                    }), 2500)
                })), t(document).on("click", "[data-affcoups-toggle-desc]", (function(e) {
                    e.preventDefault(), t(this).parents(".affcoups-coupon__description").toggleClass("affcoups-coupon__description--full")
                }))
            }))
        }()
}(); /*! This file is auto-generated */
! function(c, d) {
    "use strict";
    var e = !1,
        n = !1;
    if (d.querySelector)
        if (c.addEventListener) e = !0;
    if (c.wp = c.wp || {}, !c.wp.receiveEmbedMessage)
        if (c.wp.receiveEmbedMessage = function(e) {
                var t = e.data;
                if (t)
                    if (t.secret || t.message || t.value)
                        if (!/[^a-zA-Z0-9]/.test(t.secret)) {
                            for (var r, a, i, s = d.querySelectorAll('iframe[data-secret="' + t.secret + '"]'), n = d.querySelectorAll('blockquote[data-secret="' + t.secret + '"]'), o = 0; o < n.length; o++) n[o].style.display = "none";
                            for (o = 0; o < s.length; o++)
                                if (r = s[o], e.source === r.contentWindow) {
                                    if (r.removeAttribute("style"), "height" === t.message) {
                                        if (1e3 < (i = parseInt(t.value, 10))) i = 1e3;
                                        else if (~~i < 200) i = 200;
                                        r.height = i
                                    }
                                    if ("link" === t.message)
                                        if (a = d.createElement("a"), i = d.createElement("a"), a.href = r.getAttribute("src"), i.href = t.value, i.host === a.host)
                                            if (d.activeElement === r) c.top.location.href = t.value
                                }
                        }
            }, e) c.addEventListener("message", c.wp.receiveEmbedMessage, !1), d.addEventListener("DOMContentLoaded", t, !1), c.addEventListener("load", t, !1);

    function t() {
        if (!n) {
            n = !0;
            for (var e, t, r = -1 !== navigator.appVersion.indexOf("MSIE 10"), a = !!navigator.userAgent.match(/Trident.*rv:11\./), i = d.querySelectorAll("iframe.wp-embedded-content"), s = 0; s < i.length; s++) {
                if (!(e = i[s]).getAttribute("data-secret")) t = Math.random().toString(36).substr(2, 10), e.src += "#?secret=" + t, e.setAttribute("data-secret", t);
                if (r || a)(t = e.cloneNode(!0)).removeAttribute("security"), e.parentNode.replaceChild(t, e)
            }
        }
    }
}(window, document);
"use strict";
jQuery(function(n) {
        n(".sue-content-slider").each(function() {
            var e = n(this),
                o = e.data(),
                t = Number.isInteger(o.autoplay) && 0 < o.autoplay;
            e.children(":not(.sue-content-slide)").remove(), e.owlCarousel({
                items: 1,
                responsive: {},
                loop: !0,
                margin: 10,
                autoHeight: "yes" === o.autoheight,
                autoplay: t,
                autoplayTimeout: t ? o.autoplay : 0,
                autoplayHoverPause: t,
                nav: o.arrows,
                navText: ["", ""],
                dots: o.pages,
                animateIn: o.animatein,
                animateOut: o.animateout
            }), jQuery(window).on("load", function() {
                e.trigger("refresh.owl.carousel")
            })
        }), n(".sue-content-slider").on("click", ".sue-content-slide", function(e) {
            var o = n(this).parents(".sue-content-slider");
            window.setTimeout(function() {
                o.trigger("refresh.owl.carousel")
            }, 300)
        }), n(".sue-content-slider").on("click", function(e) {
            n(this).trigger("stop.owl.autoplay")
        })
    }), jQuery(function(i) {
        i(document).on("mouseleave.sue", function(e) {
            var o = i(".sue-exit-popup:first"),
                t = o.data(),
                n = o.children(".sue-exit-popup-screen");
            return 0 !== o.length && (!(50 < e.pageY) && (("yes" !== t.once || null === ShortcodesUltimateExtraScripts.readCookie(t.cookie)) && ("yes" === t.once ? ShortcodesUltimateExtraScripts.createCookie(t.cookie, !0, 1e3) : ShortcodesUltimateExtraScripts.eraseCookie(t.cookie), n.find("p:empty").remove(), void i.magnificPopup.open({
                closeOnBgClick: "close-bg" === t.onclick,
                closeBtnInside: !0,
                showCloseBtn: "yes" === t.close,
                enableEscapeKey: "yes" === t.esc,
                callbacks: {
                    beforeOpen: function() {
                        i("body").addClass(t.style)
                    },
                    open: function() {
                        i(document).off("mouseleave.sue"), n.css("max-width", t.width + "px"), i(".mfp-bg").css("opacity", t.opacity), i("body").on("mousedown.sue", function(e) {
                            if ("url" === t.onclick) {
                                var o = e.target.nodeName.toLowerCase();
                                if ("button" === o || "a" === o) return;
                                window.location.href = t.url
                            } else "close" === t.onclick && i.magnificPopup.close()
                        })
                    },
                    close: function() {
                        i(".mfp-bg").attr("style", ""), i("body").removeClass(t.style), i("body").unbind("mousedown.sue")
                    }
                },
                items: {
                    src: n.remove()
                },
                type: "inline"
            }, 0))))
        })
    }), jQuery(function(o) {
        o("body:not(.su-extra-loaded)").on("click", ".sue-panel-clickable", function(e) {
            "self" === o(this).data("target") ? document.location.href = o(this).data("url") : window.open(o(this).data("url"))
        })
    }), jQuery(function(t) {
        t(".sue-pricing-table").each(function() {
            var e = t(this).find(".sue-plan-options"),
                o = 0;
            e.each(function() {
                var e = t(this).outerHeight();
                o < e && (o = e)
            }), e.css("min-height", o + "px")
        })
    }), jQuery(function(n) {
        n(".sue-progress-bar.sue-progress-bar-animation").one("inview", function() {
            var e = n(this),
                o = e.children("span"),
                t = e.data("percent");
            o.css("width", t + "%")
        })
    }), jQuery(function(s) {
        s(".sue-progress-pie").one("inview", function() {
            var e = s(this),
                o = e.data(),
                t = e.children("canvas").get(0).getContext("2d"),
                n = [{
                    value: o.percent,
                    color: o.fill_color
                }, {
                    value: 100 - o.percent,
                    color: o.pie_color
                }],
                i = {
                    segmentShowStroke: !1,
                    animationEasing: "easeOutQuart",
                    percentageInnerCutout: 100 - o.pie_width
                };
            new Chart(t).Doughnut(n, i)
        })
    }), jQuery(function(n) {
        n(".sue-splash").each(function() {
            var e = n(this),
                t = e.data(),
                o = e.children(".sue-splash-screen");
            if ("yes" === t.once && null !== ShortcodesUltimateExtraScripts.readCookie(t.cookie)) return !1;
            "yes" === t.once ? ShortcodesUltimateExtraScripts.createCookie(t.cookie, !0, 1e3) : ShortcodesUltimateExtraScripts.eraseCookie(t.cookie), o.find("p:empty").remove(), window.setTimeout(function() {
                n.magnificPopup.open({
                    closeOnBgClick: "close-bg" === t.onclick,
                    closeBtnInside: !0,
                    showCloseBtn: "yes" === t.close,
                    enableEscapeKey: "yes" === t.esc,
                    callbacks: {
                        beforeOpen: function() {
                            n("body").addClass(t.style)
                        },
                        open: function() {
                            o.css("max-width", t.width + "px"), n(".mfp-bg").css("opacity", t.opacity), n("body").on("mousedown.sue", function(e) {
                                if ("url" === t.onclick) {
                                    var o = e.target.nodeName.toLowerCase();
                                    if ("button" === o || "a" === o) return;
                                    window.location.href = t.url
                                } else "close" === t.onclick && n.magnificPopup.close()
                            })
                        },
                        close: function() {
                            n(".mfp-bg").attr("style", ""), n("body").removeClass(t.style), n("body").unbind("mousedown.sue")
                        }
                    },
                    items: {
                        src: o.remove()
                    },
                    type: "inline"
                }, 0)
            }, 1e3 * parseInt(t.delay) + 10)
        })
    }), window.ShortcodesUltimateExtraScripts = {},
    function() {
        var o = {
            createCookie: function(e, o, t) {
                var n;
                if (t) {
                    var i = new Date;
                    i.setTime(i.getTime() + 24 * t * 60 * 60 * 1e3), n = "; expires=" + i.toGMTString()
                } else n = "";
                document.cookie = escape(e) + "=" + escape(o) + n + "; path=/"
            },
            readCookie: function(e) {
                for (var o = escape(e) + "=", t = document.cookie.split(";"), n = 0; n < t.length; n++) {
                    for (var i = t[n];
                        " " === i.charAt(0);) i = i.substring(1, i.length);
                    if (0 === i.indexOf(o)) return unescape(i.substring(o.length, i.length))
                }
                return null
            },
            eraseCookie: function(e) {
                o.createCookie(e, "", -1)
            }
        };
        window.ShortcodesUltimateExtraScripts = o
    }(), jQuery(function(e) {
        e("body").addClass("su-extra-loaded")
    });
window._wfCookieConsentSettings = {
    "wf_cookietext": "Cookies erleichtern die Bereitstellung unserer Dienste. Mit der Nutzung unserer Dienste erkl\u00e4ren Sie sich damit einverstanden, dass wir Cookies verwenden.",
    "wf_dismisstext": "OK",
    "wf_linktext": " ",
    "wf_linkhref": "https:\/\/www.gesundheitsseiten24.de\/figur-abnehmen.html",
    "wf_position": "bottom",
    "language": "de"
}