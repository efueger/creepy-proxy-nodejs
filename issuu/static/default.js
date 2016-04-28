webpackJsonp([1], [function(e, t, n) {
    e.exports = n(205)
}, function(e, t, n) {
    function i(e) {
        var t = n(8),
            i = !0,
            a = !1,
            s = [],
            l = [],
            c = t.get(r.log);
        if (void 0 !== c)
            if (i = !1, a = c) {
                var u = t.get(r.blacklist);
                void 0 !== u && "" !== u && (l = u.split(","))
            } else {
                var d = t.get(r.whitelist);
                void 0 !== d && "" !== d && (s = d.split(","))
            }
        var p = !o.production,
            h = t.get(r.throwerror);
        return void 0 !== h && "" !== h && (p = "true" === h), _.extend({
            log: a,
            throwerror: p,
            whitelist: s,
            blacklist: l
        }, e)
    }

    function a(e) {
        o = n(6);
        var a = i(e);
        0 !== a.whitelist.length || a.log ? t.log = function(e) {
            "string" != typeof e ? t.error("logger.log called with an arguments type not a string: " + typeof e) : (a.log && -1 === _.indexOf(a.blacklist, e) || -1 !== _.indexOf(a.whitelist, e)) && "object" == typeof console && "function" == typeof window.console.log && window.console.log.apply(console, arguments)
        } : t.log = function() {}, a.throwerror ? t.error = function(e, t) {
            throw t && window.console.error(t), e
        } : window.RavenEnable && window.Raven && Raven.captureException ? t.error = function(e, n) {
            _.isString(e) ? Raven.captureMessage(e, {
                extra: n
            }) : Raven.captureException(e, {
                extra: n
            }), t.log("ERROR", e)
        } : t.error = function(e) {
            t.log("ERROR", e)
        }
    }
    var o, r = {
        whitelist: "logger.whitelist",
        blacklist: "logger.blacklist",
        log: "logger.log",
        throwerror: "logger.throwerror"
    };
    t.configure = a, t.cookieKeys = r, t.log = function() {
        return a({}), t.log.apply(null, arguments)
    }, t.error = function() {
        return a({}), t.error.apply(null, arguments)
    }
}, function(e, t, n) {
    function i(e) {
        function t(t) {
            return t || e
        }

        function n() {
            a.log("BROADCASTER", e, arguments)
        }
        var i = {};
        return e.subscribe = function(o, r, s) {
            return n("subscribe", o, r, s), _.isUndefined(o) ? (a.error("BROADCATER: subscribe to channel:undefined"), 0) : (i[o] || (i[o] = []), i[o].push({
                context: t(s),
                callback: r
            }), e)
        }, e.unsubscribe = function(a, o, r) {
            n("unsubscribe", a, o, r);
            var s = i[a],
                l = t(r);
            if (s) {
                var c;
                for (c = 0; c < s.length; c++) s[c].callback === o && s[c].context === l && (s.splice(c, 1), c--)
            }
            return e
        }, e.unsubscribeAll = function(t) {
            return _.isUndefined(t) ? i = {} : "string" == typeof t && (i[t] = void 0), e
        }, e.broadcast = function(e) {
            if (n("broadcast", arguments), _.isUndefined(e)) return a.error("BROADCATER: broadcast to channel:undefined"), 0;
            var t = i[e];
            if (!t) return 0;
            var o, r = _.clone(t),
                s = Array.prototype.slice.call(arguments, 1),
                l = r.length;
            for (o = 0; l > o; o++) r[o].callback.apply(r[o].context, s);
            return l
        }, e
    }
    var a = n(1),
        o = n(25),
        r = i({});
    t.installTo = i, t.broadcast = r.broadcast, t.subscribe = r.subscribe, t.unsubscribe = r.unsubscribe, t.unsubscribeAll = r.unsubscribeAll, t.events = o
}, , function(e, t, n) {
    function i(e) {
        return C.clearUserApiCache(t.getUsername()), C.updateUserObject(e).then(t.initWithUserObject)
    }

    function a() {
        var e = b.getCookie(T);
        return e || (e = y.getUniqueId("auid_"), b.setCookie(T, e, P)), e
    }

    function o() {
        if (window.RavenEnable && window.Raven && Raven.setUser) {
            var e = t.getUsername() || a();
            window.Raven.setUser({
                username: e
            })
        }
    }

    function r() {
        return b.getCookie("site.model.token") || void 0
    }

    function s(e) {
        b.setCookie("site.model.username", e.toLowerCase(), D)
    }

    function l() {
        var e = b.getCookie("site.model.username");
        if (e) {
            var t = e.toLowerCase();
            return e !== t && s(t), t
        }
        return void 0
    }

    function c() {
        return g || (g = C.getUserObject(l()), g.then(t.initWithUserObject, function() {
            setTimeout(function() {
                g = void 0
            }, 0)
        })), g
    }

    function u(e, n) {
        return C.setUserAttribute(e, n).then(t.initWithUserObject)
    }

    function d() {
        return v || (v = C.getUserAttributes(), v.then(t.initWithUserObject, function() {
            setTimeout(function() {
                v = void 0
            }, 0)
        })), v
    }

    function p() {
        l() && l().length > 0 ? (E.set("model" + l(), O, {
            expires: 1440 * D,
            isPrivate: !0
        }), w.log(S, "saveToDisk()", l(), O)) : w.error(S, "saveToDisk() failed with missing username", O)
    }

    function h(e) {
        b.setCookie("site.model.account", e, D)
    }

    function f() {
        var e = l(),
            t = void 0 !== e && void 0 !== r(),
            n = void 0 !== O.username && O.username.toLowerCase() !== e;
        return w.log(S, "checkLoginStatus()", "cookie username:", e, "logged in:", t, "model:", O, "modelInvalid:", n), t ? (n && (O = {}, g = void 0, v = void 0), O.username = e.toLowerCase()) : (O = {}, g = void 0, v = void 0), n && (w.log(S, "checkLoginStatus()", "model was invalid"), x.broadcast(x.events.userAuthStatusChanged, t)), R || (R = !0, o()), t
    }

    function m(e, t) {
        if (!f()) return (new $.Deferred).reject("User not logged in").promise();
        w.log(S, "getPromiseForProperty", e);
        var n = new $.Deferred,
            i = E.get("model" + l());
        if (O = _.merge(O, i), void 0 !== O[e]) n.resolve(O[e]);
        else switch (t) {
            case "usertable":
                n = c();
                break;
            case "cloudstorage":
                n = d();
                break;
            default:
                n.resolve(void 0)
        }
        return n.then(function() {
            return O[e]
        })
    }
    var g, v, b = n(9),
        w = n(1),
        y = n(65),
        k = n(20),
        x = n(2),
        C = n(64),
        A = n(10),
        E = A.create("GlobalUserObject.", A.LOCAL),
        I = A.create("GlobalUserObject.", A.COOKIE),
        S = "user",
        D = 365,
        T = "issuu.auid",
        P = 14,
        O = {},
        R = !1;
    t.initWithUserObject = function(e) {
        w.log(S, "initWithUserObject()", e), O = _.merge(O, e), O.username = O.username ? O.username.toLowerCase() : void 0, p()
    }, t.getUsername = function() {
        return f() ? O.username.toLowerCase() : ""
    }, t.getId = function() {
        return m("id", "usertable")
    }, t.getLang = function() {
        return m("languageId", "usertable")
    }, t.getEmail = function() {
        return m("email", "usertable")
    }, t.getDisplayName = function() {
        return m("displayName", "usertable")
    }, t.getAccountType = function() {
        return m("account", "usertable")
    }, t.getShowExplicit = function() {
        return m("explicit", "usertable")
    }, t.getCreated = function() {
        return m("created", "usertable")
    }, t.setShowExplicit = function(e) {
        var t = O.explicit;
        return O.explicit = e === !0, i({
            explicit: O.explicit
        }).fail(function() {
            O.explicit = t
        })
    }, t.getAttribute = function(e) {
        return m(e, "cloudstorage")
    }, t.setAttribute = function(e, t) {
        var n = new $.Deferred;
        if (f())
            if ("number" != typeof t) w.error("user.setAttribute", '"value" must be an integer.'), n.reject('Could not set attribute. "value" must be an integer.');
            else {
                var i = O[e];
                O[e] = t, n = u(e, t).fail(function() {
                    O[e] = i
                })
            }
        else n.reject("User not logged in");
        return n.promise()
    }, t.removeAttribute = function(e) {
        var t = new $.Deferred;
        if (f()) {
            var n = O[e];
            delete O[e], t = u(e, void 0).fail(function() {
                O[e] = n
            })
        } else t.reject("User not logged in");
        return t.promise()
    }, t.getFbToken = function(e) {
        return m("facebookToken")
    }, t.setFbToken = function(e) {
        var t = new $.Deferred;
        return O.facebookToken = e, p(), t.resolve(), t.promise()
    }, t.setPreventAutologin = function(e) {
        w.log(S, "setPreventAutologin()", e);
        var t = new $.Deferred;
        return e === !0 ? I.set("preventautologin", !0, {
            expires: 1080
        }) : I.remove("preventautologin"), t.resolve(), t.promise()
    }, t.getPreventAutologin = function() {
        var e = new $.Deferred,
            t = I.get("preventautologin");
        return w.log(S, "getPreventAutologin()", t, t === !0), e.resolve(t === !0), e.promise()
    }, t.isLoggedIn = function() {
        return f()
    }, t.doWhenLoggedIn = function(e, t) {
        f() ? e() : x.broadcast(x.events.userRequestLogin, {
            onLoginSuccess: e,
            authReason: t
        })
    }, t.beginLoginSession = function(e, n) {
        A.clearPrivate(), t.setPreventAutologin(!1), "object" == typeof e ? (s(e.username), h(e.account), t.initWithUserObject(e)) : s(e), n !== !1 && x.broadcast(x.events.userAuthStatusChanged, !0), w.log(S, "beginLoginSession()", O), t.getLang().then(function(e) {
            k.set(e)
        }), o()
    }, t.endLoginSession = function() {
        w.log(S, "endLoginSession()", O);
        var e = l(),
            i = C.logoutUser(e);
        return i.always(function() {
            b.clearCookie("site.model.username"), b.clearCookie("site.model.token"), b.clearCookie("site.model.account"), b.clearCookie("site.model.terms"), b.clearCookie("site.model.termsWarning"), A.clearPrivate(), O = {}, g = void 0, v = void 0, t.setPreventAutologin(!0), x.broadcast(x.events.userAuthStatusChanged, !1, e), n(8).clearReadOnly(), o()
        }), i
    }, t.resetData = function() {
        A.clearPrivate(), O = {}, g = void 0, v = void 0
    }
}, function(e, t, n) {
    function i(e, t) {
        return t + "-" + e
    }

    function a(e) {
        return _.forOwn(e, function(t, i) {
            _.isFunction(t) && (e[i] = function() {
                try {
                    return t.apply(e, arguments)
                } catch (i) {
                    return n(1).error(i), ""
                }
            })
        }), e
    }

    function o(e) {
        var t = e ? "" : r.urlBase("html");
        return a({
            pageSmallThumbUrl: function(e, t, n) {
                return r.urlBase("image") + "/" + i(e, t) + "/jpg/page_" + (n || 1) + "_thumb_small.jpg"
            },
            pageMediumThumbUrl: function(e, t, n) {
                return r.urlBase("image") + "/" + i(e, t) + "/jpg/page_" + (n || 1) + "_thumb_medium.jpg"
            },
            pageLargeThumbUrl: function(e, t, n) {
                return r.urlBase("image") + "/" + i(e, t) + "/jpg/page_" + (n || 1) + "_thumb_large.jpg"
            },
            clippingThumbUrl: function(e) {
                return t + "/call/clippingsv2/clip/" + e + "/crop"
            },
            clippingUrl: function(e, t, n) {
                return this.publicationUrl(e, t) + "/c/" + n
            },
            linkmapUrl: function(e, t) {
                return r.urlBase("document") + "/" + i(e, t) + "/linkmap.jsonp"
            },
            pageFullUrl: function(e, t, n) {
                return r.urlBase("image") + "/" + i(e, t) + "/jpg/page_" + (n || 1) + ".jpg"
            },
            flashReaderUrl: function(e) {
                return 1 === e ? r.urlBase("flashstatic") + "webembed/viewers/style1/v1/IssuuViewer.swf" : r.urlBase("flashstatic") + "webembed/viewers/style1/v2/IssuuReader.swf"
            },
            flashPreviewerUrl: function() {
                return r.urlBase("flashstatic") + "webembed/publish/style1/v2/IssuuReader.swf"
            },
            flashLauncherUrl: function() {
                return r.urlBase("flashstatic") + "webembed/viewers/style1/v2/IssuuReaderLauncher.swf"
            },
            secureFlashReaderUrl: function(e, t, n) {
                return r.secureUrlBase("flashstatic") + "webembed/viewers/style1/v2/IssuuReader.swf?mode=mini&documentId=" + t + "-" + e + ("undefined" != typeof n && n > 1 ? "&pageNumber=" + n : "")
            },
            userProfileUrl: function(e) {
                return t + "/" + e.toLowerCase()
            },
            userStacksUrl: function(e, n) {
                return void 0 === n ? t + "/" + e.toLowerCase() + "/stacks" : t + "/" + e.toLowerCase() + "/stacks/" + n
            },
            userSubscriptionsEditUrl: function(e) {
                return void 0 === e ? t + "/home/subscriptions" : t + "/home/subscriptions/" + e
            },
            userSmallPhotoUrl: function(e, t) {
                return r.urlBase("photo") + "/" + e.toLowerCase() + "/photo_thumb.jpg" + (t && l.get("profileImageCacheBreaker") ? "?" + l.get("profileImageCacheBreaker") : "")
            },
            userPhotoUrl: function(e, t) {
                return r.urlBase("photo") + "/" + e.toLowerCase() + "/photo.jpg" + (t && l.get("profileImageCacheBreaker") ? "?" + l.get("profileImageCacheBreaker") : "")
            },
            userLargePhotoUrl: function(e, t) {
                return r.urlBase("photo") + "/" + e.toLowerCase() + "/photo_large.jpg" + (t && l.get("profileImageCacheBreaker") ? "?" + l.get("profileImageCacheBreaker") : "")
            },
            publicationUrl: function(e, t, n) {
                var i = this.userProfileUrl(e) + "/docs/" + t.toLowerCase();
                return _.isNumber(n) && n > 0 && (i += "/" + n), i
            },
            publicationLinksEditUrl: function(e, n) {
                var i = t + "/home/docs/" + e + "/edit/links";
                return i += isNaN(n) ? "" : "/" + n
            },
            publicationInfoEditUrl: function(e) {
                return t + "/home/docs/" + e + "/edit/info"
            },
            publicationEmbedEditUrl: function(e) {
                return t + "/home/docs/" + e + "/edit/embed"
            },
            publicationEmbedUrl: function(e) {
                return t + "/home/docs/" + e + "/embed"
            },
            publicationStatistics: function(e) {
                return t + "/home/statistics/stats/" + e.toLowerCase()
            },
            publicationDistribute: function(e, n) {
                return t + "/home/campaigns/create?action=useDoc&docid=" + i(e, n)
            },
            publicationProcessingState: function(e, t) {
                return r.urlBase("document") + "/" + i(e, t) + "/conversion_status.jsonp"
            },
            publicationProcessingReader: function(e, t, n, i, a) {
                var o = this.publicationUrl(n, i);
                return a && (o += "?workerAddress=" + encodeURIComponent(a)), o
            },
            groupUrl: function(e) {
                return t + "/groups/" + e.toLowerCase()
            },
            groupThumbUrl: function(e) {
                return r.urlBase("photo") + "/group/" + e + "/thumb.jpg"
            },
            groupLogoUrl: function(e) {
                return r.urlBase("photo") + "/group/" + e + "/logo.jpg"
            },
            groupGraphicsUrl: function(e) {
                return r.urlBase("photo") + "/group/" + e + "/graphics.jpg"
            },
            reflowPageUrl: function(e, t, n) {
                return r.urlBase("document") + "/" + i(e, t) + "/reflow/v3/page_" + (n || 1) + ".jsonp"
            },
            reflowHeadlinesUrl: function(e, t) {
                return r.urlBase("document") + "/" + i(e, t) + "/reflow/v3/headlines.jsonp"
            },
            paymentPageUrl: function(e) {
                var t = r.secureUrlBase("html") + "/user/account/payment?returnUrl=" + encodeURIComponent(e);
                return t
            },
            issuuLoginUrl: function(e) {
                var n = new c(t + "/signin"),
                    i = new c(e);
                return i.toString() && n.addQueryParam("onLogin", i.uriParts.relative), n.toString()
            },
            curatedPageUrl: function(e) {
                return t + "/explore?t=" + e
            },
            myPublicationsUrl: function() {
                return t + "/home/publications"
            }
        })
    }
    var r = n(6),
        s = n(10),
        l = s.create("userSettings", s.SESSION),
        c = n(40),
        u = function(e) {
            return _.extend(o(!1), {
                pageSmallThumbUrl: function(t, n, a) {
                    return r.urlBase("protectedimage") + "/" + i(t, n) + "/jpg/page_" + (a || 1) + "_thumb_small.jpg?readToken=" + encodeURIComponent(e)
                },
                pageMediumThumbUrl: function(t, n, a) {
                    return r.urlBase("protectedimage") + "/" + i(t, n) + "/jpg/page_" + (a || 1) + "_thumb_medium.jpg?readToken=" + encodeURIComponent(e)
                },
                pageLargeThumbUrl: function(t, n, a) {
                    return r.urlBase("protectedimage") + "/" + i(t, n) + "/jpg/page_" + (a || 1) + "_thumb_large.jpg?readToken=" + encodeURIComponent(e)
                },
                pageFullUrl: function(t, n, a) {
                    return r.urlBase("protectedimage") + "/" + i(t, n) + "/jpg/page_" + (a || 1) + ".jpg?readToken=" + encodeURIComponent(e)
                }
            })
        };
    e.exports = o(!1), e.exports.relative = o(!0), e.exports.acorn = u
}, function(e, t) {
    var t = window.__issuuConfig;
    t.urlBase = function(e) {
        return t.hosts[e]["https:" !== location.protocol ? "urlBase" : "secureUrlBase"]
    }, t.secureUrlBase = function(e) {
        return t.hosts[e].secureUrlBase
    }, t.insecureUrlBase = function(e) {
        return t.hosts[e].urlBase
    }, t.getDomain = function() {
        return window.location.hostname
    }, t.getTissuuOrIssuuDotCom = function() {
        var e = location.hostname,
            t = e.split("."),
            n = t.length;
        return t[n - 2] + "." + t[n - 1]
    }, e.exports = t
}, function(e, t, n) {
    var i = n(1),
        a = n(58),
        o = n(59),
        r = n(4),
        s = n(9),
        l = n(8).isReadOnly,
        c = function() {
            var e = new $.Deferred;
            return e.resolve({}), e.promise()
        }(),
        u = t.getJsonp = function(e, t, n) {
            return $.jsonp(_(n || {}).defaults({
                cache: !1,
                timeout: 0
            }).assign({
                url: e,
                data: t,
                callbackParameter: "jsonCallback"
            }).value())
        },
        d = t.getJson = function(e, t, n) {
            return $.ajax(_(n || {}).defaults({
                cache: !1,
                timeout: 0
            }).assign({
                url: e,
                data: t,
                dataType: "json"
            }).value())
        },
        p = t.postJson = function(e, t, n) {
            return $.ajax(_(n || {}).defaults({
                dataType: "json"
            }).assign({
                type: "POST",
                url: e,
                data: t,
                headers: {
                    "X-Csrf-Token": s.getCookie("CSRF-TOKEN")
                }
            }).value())
        };
    t.create = function(e) {
        function t() {
            b.action = v.action, b.format = "json"
        }

        function n(e) {
            return void 0 !== e && (b = e), w
        }

        function s(e) {
            var t = v.protocol + "://",
                n = t + window.location.hostname,
                i = e.replace(n, "").replace(t, "");
            return a.createKey(b, i)
        }

        function h() {
            var e = -1 === _.indexOf(["", "80", "443"], v.port.toString()) ? ":" + v.port : "",
                t = v.path || "/";
            return t = "/" === t.charAt(0) ? t : "/" + t, v.protocol + "://" + v.hostName + e + t
        }

        function f() {
            return t(), s(h())
        }

        function m() {
            return o.remove(f()), w
        }

        function g() {
            t();
            var e = h(),
                n = s(e),
                a = o.get(n);
            if (a) return i.log("Api", "serve key from cache: ", n), a;
            if (l && v.isReadOnly !== !0) return c;
            var f, m = new $.Deferred;
            switch (v.type) {
                case "POST":
                    f = p(e, b, {
                        timeout: v.timeout || 0,
                        xhrFields: {
                            withCredentials: v.withCredentials
                        }
                    });
                    break;
                case "GET-JSONP":
                    f = u(e, b, {
                        cache: v.sessionCache,
                        callback: v.jsonpCallback,
                        timeout: v.timeout || 0
                    });
                    break;
                default:
                    f = d(e, b, {
                        cache: v.sessionCache,
                        timeout: v.timeout || 0,
                        xhrFields: {
                            withCredentials: v.withCredentials
                        }
                    })
            }
            f.then(function(t) {
                if (t && t.rsp && t.rsp.stat) {
                    if ("ok" === t.rsp.stat) return i.log("Api", "call ok, stat ok", {
                        url: e,
                        params: b
                    }, t), void m.resolve(t.rsp._content);
                    if ("fail" === t.rsp.stat) return i.log("Api", "call ok, stat fail", {
                        url: e,
                        params: b
                    }, t), o.remove(n), t.rsp._content && t.rsp._content.error && "001" === t.rsp._content.error.code && r.endLoginSession(), void m.reject(t.rsp)
                }
                i.log("Api", "call ok, stat unknown", {
                    url: e,
                    params: b
                }, t), o.remove(n), m.reject(t)
            }, function(t) {
                i.log("Api", "call failed", {
                    url: e,
                    params: b
                }, t), o.remove(n), m.reject(t)
            });
            var g = m.promise();
            return "rejected" !== m.state() && v.cache && o.add(n, g, v.sessionCache), g
        }
        var v = _.extend({
                path: "query",
                sessionCache: !1,
                cache: !0,
                isReadOnly: !1,
                jsonpCallback: void 0,
                timeout: void 0,
                protocol: "https:" === location.protocol ? "https" : "http",
                hostName: window.location.hostname,
                port: "",
                type: "GET",
                withCredentials: !0
            }, e),
            b = {};
        v.type = v.type.toUpperCase(), "https:" === location.protocol && (v.protocol = "https"), "POST" === v.type && (v.sessionCache = !1, v.cache = !1, v.isReadOnly = !1);
        var w = {
            call: g,
            parameters: n,
            getKey: f,
            deleteCache: m
        };
        return w
    }
}, function(e, t, n) {
    var i = n(9),
        a = n(10);
    e.exports = a.create(window.location.hostname, a.COOKIE);
    var o = "debug.readOnlyUser",
        r = "" + i.getCookie(o) == "true";
    if (r) {
        var s = "position:fixed; top:0; left:0; background-color: red; z-index: 9999; padding: 5px 15px;";
        $("body").append('<h3 style="' + s + '"><a href="/_debug">Read only</a></h3>')
    }
    e.exports.isReadOnly = r, e.exports.clearReadOnly = function() {
        i.clearCookie(o)
    }
}, function(e, t, n) {
    var i = n(6);
    t.domain = "." + i.getTissuuOrIssuuDotCom(), e.exports.setCookie = function(e, n, i, a, o) {
        var r = "";
        if (i) {
            var s = new Date;
            s.setTime(s.getTime() + 24 * i * 60 * 60 * 1e3), r = "; expires=" + s.toGMTString()
        }
        var l = void 0 === a ? t.domain : a,
            c = o || "/",
            u = e + "=" + encodeURIComponent(n) + r + "; path=" + c + "; domain=" + l;
        document.cookie = u
    }, t.getCookie = function(e) {
        var t, n, i, a;
        for (t = e + "=", n = document.cookie.split(";"), i = 0; i < n.length; i++) {
            try {
                a = decodeURIComponent(n[i])
            } catch (o) {
                continue
            }
            for (;
                " " === a.charAt(0);) a = a.substring(1, a.length);
            if (0 === a.indexOf(t)) return a.substring(t.length, a.length)
        }
        return null
    }, t.clearCookie = function(t) {
        e.exports.setCookie(t, "", -1)
    }
}, function(e, t, n) {
    function i() {
        n(1).error.apply(null, arguments)
    }

    function a(e) {
        var t = e;
        return t = d.wrap(t), t = u.wrap(t)
    }

    function o() {
        _.forOwn(m, function(e) {
            e._clearPrivate()
        })
    }

    function r() {
        m = {}, m[f.SESSION] = a(n(19).session), m[f.LOCAL] = a(n(19).local), h.getCookie(l) === document.location.protocol && (o(), h.clearCookie(l)), m[f.COOKIE] = a(n(41))
    }

    function s(e) {
        if (m || r(), e === f.OBJECT) {
            var t = a(n(29).create());
            return u.clearPrivateOnEvent(t)
        }
        return m[e]
    }
    var l = "issuu.clear.data",
        c = n(61),
        u = n(62),
        d = n(21),
        p = n(2),
        h = n(9),
        f = {
            SESSION: "sessionStorage",
            LOCAL: "localStorage",
            OBJECT: "object",
            COOKIE: "cookie"
        },
        t = _.clone(f);
    t.TYPES = f, t.OPTIONS = {
        expires: 0,
        isPrivate: !1
    };
    var m;
    t.create = function(e, t, n) {
        var a = s(t);
        return a ? c.wrap(a, e, n) : (i("Type of dictionnary should be set and match one of the type defined in TYPES"), {})
    }, t.clearPrivate = function() {
        o(), p.broadcast(p.events.storageClearPrivate);
        var e = "https:" === document.location.protocol ? "http:" : "https:";
        h.setCookie(l, e)
    }, e.exports = t
}, function(e, t) {
    function n() {
        return "streamElm" + ++i
    }
    var i = 0;
    t.create = function(e) {
        var t = _.merge({
            x: null,
            y: null,
            width: null,
            height: null,
            id: n(),
            flatIndex: null,
            template: null,
            debugStyle: "",
            debugTxt: ""
        }, e);
        return t.getTemplate = function() {
            if (!t.template) throw new Error("No template provided.");
            return t.template(t)
        }, t.updatePosition = function() {
            t.getDomElement(), t._domElement && t._domElement.css({
                left: t.x + "px",
                top: t.y + "px"
            })
        }, t.setPosition = function(e) {
            t.x = e.x, t.y = e.y, t.updatePosition()
        }, t.getPosition = function() {
            return {
                x: t.x,
                y: t.y
            }
        }, t.setWidth = function(e) {
            t.width = e
        }, t.setHeight = function(e) {
            t.height = e
        }, t.getWidth = function() {
            return t.width
        }, t.getHeight = function() {
            return t.height
        }, t._domElement = null, t.getDomElement = function() {
            return t._domElement || (t._domElement = $("#" + t.id), 0 === t._domElement.length ? t._domElement = null : (t.height = t._domElement.outerHeight(), t.width = t._domElement.width())), t._domElement
        }, t.remove = function() {
            t._domElement.remove()
        }, t.didInsertElement = function() {
            t.getDomElement(), t.height = t._domElement.outerHeight(), t.width = t._domElement.width(), t._outOfScreen && t._domElement.addClass("out-of-screen"), t._isReady && t._domElement.addClass("ready")
        }, t._isReady = !1, t.setReady = function(e) {
            e !== t._isReady && (t._isReady = e, t._domElement && (t._isReady ? t._domElement.addClass("ready") : t._domElement.removeClass("ready")))
        }, t._outOfScreen = !1, t.setOutOfScreen = function(e) {
            e !== t._outOfScreen && (t._outOfScreen = e, t._domElement && (e ? t._domElement.addClass("out-of-screen") : window.setTimeout(function() {
                t._domElement.removeClass("out-of-screen")
            }, 0)))
        }, t
    }
}, function(e, t, n) {
    function i(e) {
        if ("object" == typeof e) {
            var t = _.isArray(e) ? [] : {};
            return _.each(e, function(e, n) {
                t[n] = i(e)
            }), t
        }
        return "string" == typeof e ? e.replace(/&#x([a-f0-9]+);?/gi, function(e, t) {
            return String.fromCharCode(parseInt(t, 16))
        }) : e
    }
    var a = n(1),
        o = {};
    ! function() {
        void 0 !== window.issuuDataCache && (o = i(window.issuuDataCache) || {}, window.issuuDataCache = void 0), a.log("server-data", "get data from dom: ", o)
    }(), t.get = function(e) {
        return _.cloneDeep(o[e])
    }
}, function(e, t) {
    "use strict";
    e.exports = {
        START: "mobileReader.START",
        STOP: "mobileReader.STOP",
        GOTO_PAGE: "mobileReader.GOTO_PAGE",
        GOTO_NEXTPAGE: "mobileReader.GOTO_NEXTPAGE",
        GOTO_PREVIOUSPAGE: "mobileReader.GOTO_PREVIOUSPAGE",
        SHOW_UI: "mobileReader.SHOW_UI",
        HIDE_UI: "mobileReader.HIDE_UI",
        DISABLE_GESTURES: "mobileReader.DISABLE_GESTURES",
        DISABLE_ALL_POINTER: "mobileReader.DISABLE_ALL_POINTER",
        PAGE_CHANGE_ANIM_START: "mobileReader.PAGE_CHANGE_ANIM_START",
        PAGE_CHANGE_ANIM_END: "mobileReader.PAGE_CHANGE_ANIM_END",
        PAGE_DISPLAYED: "mobileReader.PAGE_DISPLAYED",
        PAGE_CHANGED: "mobileReader.PAGE_CHANGED",
        PAGE_LOAD: "mobileReader.PAGE_LOAD",
        READER_FULLY_LOADED: "mobileReader.READER_FULLY_LOADED",
        VIEWPORT_CHANGED: "mobileReader.VIEWPORT_CHANGED",
        LAYOUT_CHANGED: "mobileReader.LAYOUT_CHANGED",
        UI_STATE_CHANGED: "mobileReader.UI_STATE_CHANGED",
        ZOOM_LEVEL_CHANGED: "mobileReader.ZOOM_LEVEL_CHANGED",
        DOCUMENT_LOADED: "mobileReader.DOCUMENT_LOADED",
        ERROR: "mobileReader.ERROR",
        DESTROY: "mobileReader.DESTROY",
        WATERMARK_CLICK: "mobileReader.WATERMARK_CLICK",
        LINK_CLICK: "mobileReader.LINK_CLICK",
        create: {
            ERROR: function(e, t, n) {
                return {
                    type: e,
                    url: t || location.href,
                    fatal: !!n
                }
            }
        }
    }
}, function(e, t) {
    e.exports = _
}, function(e, t) {
    e.exports = {
        DOCCREATED: "StreamEvents.DOCCREATED",
        DOCLOADED: "StreamEvents.DOCLOADED",
        DOCERROR: "StreamEvents.DOCERROR",
        ADERROR: "StreamEvents.ADERROR",
        DOCCLICKED: "StreamEvents.DOCCLICKED",
        INFOBOXCREATED: "StreamEvents.INFOBOXCREATED",
        INFOBOXCLICKED: "StreamEvents.INFOBOXCLICKED",
        STREAMADREQUEST: "StreamEvents.STREAMADREQUEST",
        STREAMADINSERTED: "StreamEvents.STREAMADINSERTED",
        STREAMADNOTAVAILABLE: "StreamEvents.STREAMADNOTAVAILABLE"
    }
}, function(e, t, n) {
    "use strict";
    var i = n(82),
        a = {
            carousel: {
                length: 10,
                focus: 4,
                itemSpacing: 100,
                showHighResWhenZoomedOut: !0,
                pagetransitions: {
                    deadstart: {
                        duration: 300,
                        bezierCurveParameters: [.255, .03, .355, 1]
                    },
                    runningstart: {
                        duration: 200,
                        bezierCurveParameters: [0, 0, .355, 1]
                    },
                    softstart: {
                        duration: 200,
                        bezierCurveParameters: [.255, .03, .355, 1]
                    },
                    instant: {
                        duration: 0,
                        bezierCurveParameters: [0, 0, 1, 1]
                    }
                }
            },
            wall: !1,
            layout: {
                spread: {
                    spacing: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    lowres: {
                        zoomLevel: 1,
                        factorW: .5,
                        factorH: 1
                    },
                    highres: {
                        zoomLevel: 0,
                        factorW: 1.25,
                        factorH: 2.5
                    }
                },
                single: {
                    spacing: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    lowres: {
                        zoomLevel: 1,
                        factorW: 1,
                        factorH: 1
                    },
                    highres: {
                        zoomLevel: 0,
                        factorW: 2.5,
                        factorH: 2.5
                    }
                }
            },
            ui: {
                pagescrubber: {
                    fadeDelayOnPageChange: 2,
                    fadeDelayOnStart: 2,
                    fadeInDuration: .2,
                    fadeOutDuration: .4,
                    scrollDuration: 200
                },
                clippingsTutorialMinWidth: 320
            }
        };
    if (i.isIpad() || i.isIpod() || i.isIphone()) {
        switch (i.getIpadVersion()) {
            case 0:
            case 1:
                a.carousel.length = 10;
                break;
            default:
                a.carousel.length = 25, a.carousel.focus = 10
        }
        a.wall = !0
    }
    e.exports = a
}, , function(e, t, n) {
    var i = n(1);
    t.onTransitionEnd = function(e, t, n) {
        function a() {
            c || (c = !0, r && window.clearTimeout(r), l.off(s, o), t(), i.log("animationHelper", "callback executed", u))
        }

        function o(e) {
            i.log("animationHelper", "onAnimationEnd", u), this === l.get(0) && this === e.target && a()
        }
        var r, s = "webkitTransitionEnd oTransitionEnd msTransitionEnd mozTransitionEnd transitionend transitionEnd",
            l = $(e),
            c = !1,
            u = "id: " + Math.round(1e3 * Math.random());
        i.log("animationHelper", "register", u, l.get(0)), n && (r = setTimeout(function() {
            i.log("animationHelper", "maxDuration timeout fired after(ms): ", n), a()
        }, n)), Modernizr.csstransitions ? l.on(s, o) : window.setTimeout(t, 0)
    }, t.translate3d = function(e, n) {
        var i = _.extend({
            x: 0,
            y: 0,
            z: 0,
            duration: 0,
            callback: void 0,
            maxDuration: void 0
        }, n);
        "function" == typeof i.callback && t.onTransitionEnd(e, i.callback, i.maxDuration);
        var a = $(e).get(0);
        a.style[Modernizr.prefixed("transitionDuration")] = i.duration + "ms", Modernizr.csstransforms3d ? a.style[Modernizr.prefixed("transform")] = "translate3d(" + i.x + "px, " + i.y + "px, " + i.z + "px)" : a.style[Modernizr.prefixed("transform")] = "translate(" + i.x + "px, " + i.y + "px)"
    }, t.callAfterRepaint = function(e, t) {
        setTimeout(t, 50)
    }
}, function(e, t, n) {
    function i() {
        n(1).error.apply(null, arguments)
    }

    function a(e) {
        var t = {
            expiresBuiltIn: !1
        };
        return t.get = function(t) {
            var n = e.getItem(t);
            if (n) try {
                n = JSON.parse(n)
            } catch (a) {
                return void i("Error parsing data with BrowserStorage.getItem. " + a.name + ": " + a.message)
            }
            return n
        }, t.has = function(t) {
            var n = e.getItem(t);
            return null !== n && void 0 !== n
        }, t.set = function(n, a) {
            if (void 0 === a) return void t.remove(n);
            try {
                var o = JSON.stringify(a);
                e.setItem(n, o)
            } catch (r) {
                i("QUOTA_EXCEEDED_ERR" === r.name ? "Local storage quota exceeded." : "Error saving data with BrowserStorage.setItem. " + r.name + ": " + r.message)
            }
        }, t.remove = function(t) {
            return e.removeItem(t)
        }, t.clear = function() {
            return e.clear()
        }, t.getKeys = function() {
            for (var t = [], n = 0, i = e.length; i > n; n++) t.push(e.key(n));
            return t
        }, t._set = t.set, t._remove = t.remove, t._get = t.get, t._getKeys = t.getKeys, t
    }
    var o = n(29);
    t.local = function() {
        return Modernizr.localstorage ? a(window.localStorage) : o.create({})
    }(), t.session = function() {
        return Modernizr.sessionstorage ? a(window.sessionStorage) : o.create({})
    }()
}, function(e, t, n) {
    var i, a, o = n(1),
        r = n(6),
        s = n(9),
        l = n(39),
        c = n(24),
        u = n(8),
        d = "lng",
        p = "i18next",
        h = "reader.useFlashDevLang";
    t.init = function() {
        if (a) return a;
        a = new $.Deferred;
        var e = s.getCookie(p),
            l = {
                lowerCaseLng: !0,
                ns: "lang",
                useCookie: !1,
                lng: "en",
                lngWhitelist: _.map(r.i18n.config.list, "lng"),
                escapeInterpolation: !0,
                resStore: i18n._preloadedResStore || {},
                fallbackLng: !1,
                sendMissing: !0,
                missingKeyHandler: function(e, t, n, a) {
                    i || (_.isEmpty(i18n._preloadedResStore) ? (i = !0, o.error("i18n: language files not loaded")) : o.error("i18n: missing translation key", {
                        key: n,
                        language: e
                    }))
                }
            };
        i18n.init(l, function(e) {
            a.resolve()
        }), c && _.isFunction(c.locale) && c.locale(e);
        var u = n(4);
        return u.getLang().done(function(e) {
            t.set(e)
        }), a.promise()
    }, t.set = function(e) {
        e !== t.get() && l.clear(), s.setCookie(d, e)
    }, t.reset = function() {
        l.clear(), s.clearCookie(d)
    }, t.get = function() {
        return i18n.lng()
    }, t.devLanguagesAllowed = function() {
        return u.get(h) || r.i18n.flashSupportDevLng
    }
}, function(e, t) {
    function n(e) {
        return e + c
    }

    function i(e) {
        return !u.test(e)
    }

    function a() {
        return (new Date).getTime()
    }

    function o(e) {
        return !e || isNaN(e) ? !1 : e < a()
    }

    function r(e) {
        return !isNaN(e) && e > 0 ? a() + l * parseFloat(e) : void 0
    }

    function s(e) {
        return (e - a()) / l
    }
    var l = 6e4,
        c = "__maxAge__",
        u = /(.*)(__maxAge__)$/;
    t.EXPIREKEY = c, t.getExpireIn = s, t.getExpireTime = r, t.isExpired = o, t.wrap = function(e) {
        function t(t, i) {
            isNaN(i) || (0 >= i ? e._remove(n(t)) : e._set(n(t), r(i)))
        }

        function a(t) {
            e.remove.apply(d, arguments), e._remove(n(t))
        }

        function s(t) {
            return t && o(e._get(n(t))) ? void a(t) : e.get.apply(d, arguments)
        }

        function l(n, i, a) {
            var o = a || {};
            return t(n, o.expires), e.set.apply(d, arguments), i
        }

        function c() {
            var t = e.getKeys.apply(d, arguments);
            return _.compact(_.filter(t, i))
        }

        function u() {
            var t = c();
            _.forEach(t, function(t) {
                o(e._get(n(t))) && a(t)
            })
        }
        if (e.expiresBuiltIn) return e;
        var d = _.clone(e);
        return d.expiresBuiltIn = !0, d.set = l, d.get = s, d.remove = a, d.getKeys = c, d.removeExpiredKeys = u, d
    }
}, function(e, t) {
    t.isGoodDescription = function(e, t) {
        var n = 5,
            i = e.split(/\s/g);
        if (i.length < n && e.replace(/[\x00-\x7F]/g, "").length < 20) return !1;
        if (t && e.indexOf(t) > -1) return !1;
        if (e.indexOf("http:") > -1 || e.indexOf("https:") > -1 || e.indexOf("www.") > -1 || /\S+@\S+\.\S+/.test(e)) return !1;
        if (e.indexOf("&#") > -1) return !1;
        for (var a in i)
            if (i[a].length >= 3 && /([^\d\W])\1{2,}/g.test(i[a])) return !1;
        if (/\d{20,}/g.test(e)) return !1;
        var o = e.replace(/[^\x00-\x7F]/g, ""),
            r = o.replace(/[^A-Z\W]/g, "");
        return r.length / e.length > .5 ? !1 : !0
    }, t.getShortDescription = function(e, t, n) {
        var i = t || 100,
            a = n || 40,
            o = [],
            r = [];
        _.each(e.split(/([.!\?\:;])/), function(e, t) {
            t % 2 === 0 ? o.push(e) : r.push(e)
        });
        for (var s = o.length > 1 ? o[0] + r[0] : o[0], l = 1; s.length < a && _.isString(o[l]);) s += o[l] + (r[l] || ""), l++;
        if (s.length > i) {
            var c = s.indexOf(" ", i - 10); - 1 === c && (c = i - 10), s = s.substr(0, c) + "..."
        }
        return s
    }, t.getFriendlyCount = function(e) {
        return 1e3 > e ? e.toString() : 1e6 > e ? Math.round(e / 1e3) + "K" : (e / 1e6).toFixed(1) + "M"
    }, t.linebreakify = function(e) {
        return e.replace(/(\r\n|\n|\r){2,}/g, "<br /><br />").replace(/(\r\n|\n|\r)/g, "<br />")
    }, t.linkify = function(e) {
        var t = /((?:(https?):\/\/(?:(?:[a-z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-f0-9]{2})){1,64}(?:\:(?:[a-z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-f0-9]{2})){1,25})?\@)?)?((?:(?:[a-z0-9][a-z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-f0-9]{2}))*)?(?:\b|$)/gi;
        return e.replace(t, function(e, t, n, i, a, o, r) {
            var s = n ? "" : "http://",
                l = a || "";
            return '<a href="' + s + t + l + '" target="_blank" rel="nofollow">' + t + l + "</a>"
        })
    }
}, function(e, t, n) {
    function i() {
        return v
    }

    function a() {
        return $("#overlay .overlay-box")
    }

    function o() {
        return $("#overlay")
    }

    function r(e) {
        function t() {
            return i.parentElement
        }
        var n = {
                marginClickClose: !0,
                skin: "default",
                content: "",
                contentFunc: function() {
                    return ""
                },
                dimmerContent: "",
                unscrollableBackground: !1,
                onShow: function() {},
                onInAnimationFinished: function() {},
                onOutAnimationFinished: function() {},
                onRemove: function() {},
                showCloseIcon: !0,
                allowClose: function() {
                    return !0
                }
            },
            i = _.extend(n, e),
            a = {
                conf: i,
                getParentElement: t
            };
        return a
    }

    function s(e, t, n, i) {
        e.addClass("overlay-box-" + t + "-" + i).removeClass("overlay-box-" + t + "-" + n)
    }

    function l(e, t, n) {
        $("#overlay").addClass(e + "-" + n).removeClass(e + "-" + t)
    }

    function c(e) {
        $("#overlay").addClass(e + "-pre").addClass(e + "-const")
    }

    function u(e) {
        for (var t = $("#overlay").attr("class").split(/\s+/), n = 0; n < t.length; n++) - 1 !== t[n].indexOf(e) && (m.log("overlay", "remove: ", t[n]), $("#overlay").removeClass(t[n]))
    }

    function d(e) {
        27 === e.keyCode && p()
    }

    function p(e) {
        var t = new $.Deferred,
            n = v.conf;
        return n.allowClose() || e ? ($(document).off("keydown", d), m.log("overlay", "curConf.parentElement", n.parentElement), $("html, body").css({
            overflow: "",
            height: ""
        }), b > 0 && ($("body").scrollTop(b), b = 0), g.callAfterRepaint(n.parentElement, function() {
            function e() {
                m.log("overlay", "closed"), v && v.conf && v.conf.onRemove && v.conf.onRemove(), $("#overlay").remove();
                var e = v;
                v = !1, setTimeout(function() {
                    e && e.conf && e.conf.onOutAnimationFinished && e.conf.onOutAnimationFinished()
                }, 0), t.resolve()
            }
            var i;
            if (Modernizr.csstransitions && n.parentElement) {
                var a = n.parentElement.css("transition-duration") || "";
                i = 1e3 * parseFloat(a.split(",")[0] || 0) * 2
            }
            g.onTransitionEnd(n.parentElement, e, i), s(n.parentElement, n.skin, "end", "exit"), l(n.skin, "end", "exit")
        }), t) : (m.log("overlay", "allowClose prevented closing"), t.reject())
    }

    function h(e, t) {
        var i = n(94),
            a = e.conf,
            o = "number-" + Math.round(1e3 * Math.random()),
            r = a.content || a.contentFunc(),
            s = t || "pre";
        r instanceof $ ? ($("#overlay").append(i({
            content: '<div id="ReplaceMeOverlay"></div>',
            boxClass: "overlay-box-" + a.skin + "-const overlay-box-" + a.skin + "-" + s,
            showCloseIcon: a.showCloseIcon,
            trait: o
        })), $("#ReplaceMeOverlay").replaceWith(r)) : $("#overlay").append(i({
            content: r,
            boxClass: "overlay-box-" + a.skin + "-const overlay-box-" + a.skin + "-" + s,
            showCloseIcon: a.showCloseIcon,
            trait: o
        })), a.parentElement = $("." + o), a.parentElement.click(function(e) {
            e.stopPropagation()
        }), a.marginClickClose && ($("#overlay").click(function(e) {
            p()
        }), $(document).on("keydown", d)), $("#overlay .close_corner").click(function(e) {
            p()
        })
    }

    function f(e, t) {
        var a = t || "forward";
        if (-1 === _.indexOf(["forward", "backward", "none"], a)) throw new Error("bad direction param.");
        m.log("overlay", "show", e, a);
        var o = {
                none: {
                    1: "end",
                    2: "end",
                    3: "end"
                },
                forward: {
                    1: "pre",
                    2: "end",
                    3: "exit"
                },
                backward: {
                    1: "exit",
                    2: "end",
                    3: "pre"
                }
            },
            r = e.conf;
        if (i() === !1) {
            v = e;
            var d = n(93);
            $("body").append(d({
                visibility: "hidden",
                skin: r.skin + "-const " + r.skin + "-" + o[a][1],
                dimmerContent: r.dimmerContent
            })), h(e, o[a][1]), b || (b = $(window).scrollTop()), $("#overlay").css({
                visibility: "visible",
                overflowX: "hidden"
            });
            var p = function() {
                r.unscrollableBackground && ($("html").css({
                    height: "100%"
                }), $("body").css({
                    overflow: "hidden",
                    height: "100%"
                })), $("#overlay").css({
                    overflowX: ""
                }), setTimeout(function() {
                    e.conf.onInAnimationFinished()
                }, 0)
            };
            "none" !== a ? (g.onTransitionEnd(r.parentElement, p), g.callAfterRepaint(r.parentElement, function() {
                l(r.skin, o[a][1], o[a][2]), s(r.parentElement, r.skin, o[a][1], o[a][2])
            })) : p()
        } else if ("none" === a) v.conf.parentElement.remove(), v = e, h(e, o[a][1]), $("#overlay .dimmer-content").html(r.dimmerContent), setTimeout(function() {
            e.conf.onInAnimationFinished()
        }, 0);
        else {
            h(e, o[a][1]);
            var f = v.conf;
            f.onRemove && f.onRemove(), $("#overlay .dimmer-content").html(r.dimmerContent), $("#overlay").css({
                overflowX: "hidden"
            }), m.log("overlay", "conf.parentElement", r.parentElement), g.onTransitionEnd(f.parentElement, function() {
                $("#overlay").css({
                    overflowX: ""
                }), v.conf.parentElement.remove(), v = e, setTimeout(function() {
                    e.conf.onInAnimationFinished()
                }, 0)
            }), u(f.skin), c(r.skin), l(r.skin, "pre", o[a][2]), g.callAfterRepaint(r.parentElement, function() {
                s(r.parentElement, r.skin, o[a][1], o[a][2]), s(f.parentElement, f.skin, o[a][2], o[a][3])
            })
        }
        setTimeout(function() {
            e.conf.onShow(e.conf.parentElement)
        }, 0)
    }
    var m = n(1),
        g = n(18),
        v = !1,
        b = 0;
    e.exports = {
        create: r,
        show: f,
        close: p,
        showing: i,
        getElement: a,
        getOverlayElement: o
    }
}, function(e, t) {
    e.exports = window.moment
}, function(e, t) {
    e.exports = {
        userAuthStatusChanged: "userAuthStatusChanged",
        userRequestLogin: "userRequestLogin",
        streamDocumentClicked: "streamDocumentClicked",
        documentMenuActivate: "documentMenuActivate",
        documentEmbedActivate: "documentEmbedActivate",
        documentDownloadActivate: "documentDownloadActivate",
        messagehubInfo: "messagehubInfo",
        messagehubWarn: "messagehubWarn",
        messagehubError: "messagehubError",
        messagehubUIChanged: "messagehubUIChanged",
        messagehubUIGetHeight: "messagehubUIGetHeight",
        messagehubFriendlyNotification: "messagehub.friendlyNotification",
        readerDocumentFailed: "readerDocumentFailed",
        readerDocumentLoading: "readerDocumentLoading",
        readerDocumentLoaded: "readerDocumentLoaded",
        pageView: "pageView",
        pageContinuation: "pageContinuation",
        pingbackError: "pingbackError",
        trackingEvent: "tracking.event",
        monitorEvent: "monitor.event",
        documentShare: "documentShare",
        documentDownload: "documentDownload",
        documentImpression: "documentImpression",
        documentClick: "documentClick",
        documentPageChange: "documentPageChange",
        documentLoad: "documentLoad",
        onStreamResized: "documentPage.onStreamResized",
        onPageResized: "documentPage.onPageResized",
        onShowStream: "documentPage.onShowStream",
        onHideStream: "documentPage.onHideStream",
        readerZoomedgIn: "ReaderEventZoomedgIn",
        readerZoomedgOut: "ReaderEventZoomedgOut",
        readerPageZeroResized: "ReaderPageZeroResized",
        readerSidebarDocumentClicked: "ReaderSidebarDocumentClicked",
        startNewClipping: "clippings.startNewClipping",
        stopNewClipping: "clippings.stopNewClipping",
        stateChangedNewClipping: "clippings.stateChangedNewClipping",
        stateChangedClippingOverlay: "clippings.stateChangedClippingOverlay",
        showUserClippings: "clippings.showUserClippings",
        hideUserClippings: "clippings.hideUserClippings",
        getClippingCount: "clippings.getClippingCount",
        onClippingCountUpdated: "clippings.onClippingCountUpdated",
        onClippingsLoaded: "clippings.onLoaded",
        clippingShare: "clippingShare",
        clippingCommentAdded: "clippingCommentAdded",
        shouldActivateClippingsTutorialAnonymous: "shouldActivateClippingsTutorialAnonymous",
        clippingsTutorialDismissedAnonymous: "clippingsTutorialDismissedAnonymous",
        flashReaderClippingAction: "flashReaderClippingAction",
        flashReaderClippingCreateClick: "flashReaderClippingCreateClick",
        flashReaderSizeAnimationEnd: "flashReaderSizeAnimationEnd",
        disableGestures: "mobilereader.disableGestures",
        getReader: "reader.getReader",
        businessSignupFlow: "businessSignupFlow",
        uploadFlow: "uploadFlow",
        storageClearPrivate: "storage.ClearPrivate",
        publishNowButtonChangeState: "publishNowButton.stateChange",
        servicesChangedUnlisted: "serviceManager.changed.unlisted",
        serviceChangeTrack: "serviceManager.serviceChangeTrack",
        signupTrack: "signupTrack",
        errorMessageShown: "errorMessageShown",
        errorMessageHidden: "errorMessageHidden",
        paymentMethodEvent: "paymentMethodEvent",
        widgetDeleteAccountEvent: "widgetDeleteAccountEvent",
        widgetPublishNowButtonEvent: "widgetPublishNowButtonEvent",
        planStateChange: "planStateChange"
    }
}, , function(e, t, n) {
    function i() {
        window.clearTimeout(h), FB.init({
            appId: k,
            status: !1,
            cookie: !0,
            xfbml: !1,
            version: "v2.1"
        }), A.resolve()
    }

    function a(e) {
        if (e && (k = e), 0 === $("#facebook-jssdk").length) {
            window.fbAsyncInit = i;
            var t = document.createElement("script");
            t.id = "facebook-jssdk", t.async = !0, t.src = "//connect.facebook.net/en_US/sdk.js", $("head").get(0).appendChild(t), h = window.setTimeout(function() {
                window.fbAsyncInit = void 0, m.setPreventAutologin(!0), A.reject("Could not load Facebook SDK."), w.log("Facebook", "Facebook SDK timed out.")
            }, 15e3)
        }
        return A.promise()
    }

    function o() {
        var e = new $.Deferred;
        return FB.api("/me/permissions", function(t) {
            var n = t.data,
                i = _.compact(_.map(n, function(e) {
                    return "granted" === e.status ? e.permission : void 0
                }));
            _.contains(i, "email") && _.contains(i, "public_profile") ? e.resolve() : e.reject(i)
        }), e
    }

    function r(e, t, n) {
        var i = new $.Deferred;
        C = !0;
        var a = {
                protocol: "https",
                action: "issuu.user.login_facebook_token",
                type: "POST"
            },
            o = {
                accessToken: e,
                signup: t === !0
            };
        n && (o = _.merge(o, n));
        var r = g.create(a).parameters(o).call();
        return $.when(r).then(function(e) {
            C = !1, m.beginLoginSession(e.obj.username), i.resolve(e)
        }, function(e) {
            C = !1, i.reject(e._content.error)
        }), i.promise()
    }

    function s(e, t, n, i) {
        var a = new $.Deferred;
        a.then(t.resolve, t.reject), e.authResponse && e.authResponse.accessToken ? C || (i !== !1 ? (a.then(function() {
            m.setFbToken(e.authResponse.accessToken, e.authResponse.expiresIn)
        }), r(e.authResponse.accessToken, n).then(a.resolve, a.reject)) : a.resolve(e.authResponse)) : (m.setPreventAutologin(!0), a.reject({
            message: "Facebook connection status: " + e.status
        }))
    }

    function l() {
        var e = new $.Deferred;
        return m.isLoggedIn() ? e.reject("Auto-login not necessary, already logged in.") : m.getPreventAutologin().then(function(t) {
            t === !0 ? e.reject("Auto-login prevented by previous logout") : m.isLoggedIn() !== !0 ? a().then(function() {
                FB.getLoginStatus(function(t) {
                    s(t, e, !1, !0)
                })
            }, e.reject) : e.resolve()
        }, e.reject), e.promise()
    }

    function c(e) {
        return a(e)
    }

    function u(e, t) {
        if ("object" != typeof window.FB) return void w.error("Facebook SDK is not available.");
        var n = {
            method: "share",
            link: "http://www.issuu.com/",
            picture: void 0,
            name: void 0,
            caption: void 0,
            description: void 0
        };
        _.extend(n, e), n.href = n.link, FB.ui(n, t || function() {})
    }

    function d(e, t, n) {
        var i = v.publicationUrl(e.owner, e.name, e.pageNumber > 1 ? e.pageNumber : void 0);
        t && (i += "?e=" + t), u({
            picture: v.pageLargeThumbUrl(e.publicationId, e.revisionId, e.pageNumber),
            source: v.secureFlashReaderUrl(e.publicationId, e.revisionId, e.pageNumber),
            link: i,
            caption: e.title,
            description: e.description
        }, n), b.broadcast(b.events.documentShare, {
            publicationId: e.publicationId,
            revisionId: e.revisionId,
            publicationName: e.name,
            ownerUsername: e.owner,
            service: y
        })
    }

    function p(e, t) {
        var n = v.clippingUrl(e.owner, e.name, e.clippingId);
        t && (n += "?e=" + t), u({
            picture: v.clippingThumbUrl(e.clippingId),
            link: n
        }), b.broadcast(b.events.clippingShare, {
            clippingId: e.clippingId,
            clippingPage: e.clippingPage,
            service: y
        })
    }
    var h, f = n(6),
        m = n(4),
        g = n(7),
        v = n(5),
        b = n(2),
        w = n(1),
        y = "facebook",
        k = f.social.facebook.applicationId,
        x = ["public_profile", "email", "user_birthday", "user_location", "user_friends"],
        C = !1,
        A = new $.Deferred;
    e.exports.tryAutoLogin = l, e.exports.loginWithAccessToken = r, e.exports.loadSdk = c, e.exports.sharePost = u, e.exports.sharePublication = d, e.exports.shareClipping = p, e.exports.checkForRequiredPermissions = o, e.exports.onAuthChanged = s, e.exports.permissions = x
}, function(e, t, n) {
    var i = n(10),
        a = n(21),
        t = _.clone(i.TYPES);
    t.TYPES = _.clone(i.TYPES), t.OPTIONS = {
        maxSize: 50,
        isPrivate: !1,
        noDuplicate: !1,
        items: {
            expires: 0
        }
    };
    var o = a.EXPIREKEY;
    t.create = function(e, t, n) {
        function r(e) {
            k.set("value", _.last(e, y))
        }

        function s() {
            return k.get("value") || []
        }

        function l(e, t, n) {
            var i = s(),
                l = _.defaults(n || {}, b);
            w && (i = _.filter(i, function(t) {
                return !t || t.name !== e
            }));
            var c = {
                name: e,
                value: t
            };
            c[o] = a.getExpireTime(l.expires), i.push(c), r(i)
        }

        function c() {
            return _.last(s())
        }

        function u(e) {
            var t = s(),
                n = _.last(t);
            n && (n.value = e), r(t)
        }

        function d() {
            var e = s(),
                t = _.last(e);
            return r(_.initial(e)), t
        }

        function p(e) {
            return _.filter(s(), function(t) {
                return t && t.name === e && !a.isExpired(t[o])
            })
        }

        function h(e) {
            r(_.filter(s(), function(t) {
                return !t || t.name !== e
            }))
        }

        function f() {
            var e = s(),
                t = _.filter(e, function(e) {
                    return e && !a.isExpired(e[o])
                });
            return t.length !== e.length && r(t), t
        }

        function m() {
            return _.pluck(f(), "name")
        }

        function g() {
            k.clear()
        }
        var v = n || {},
            b = v.items || {},
            w = v.noDuplicate || !1,
            y = v.maxSize || 50;
        v.expires = 0;
        var k = i.create("queue." + e, t, v);
        return {
            updateLast: u,
            getLast: c,
            push: l,
            pop: d,
            get: p,
            remove: h,
            getAll: f,
            clear: g,
            getKeys: m
        }
    }, e.exports = t
}, function(e, t) {
    t.create = function(e) {
        var t = e || {},
            n = {
                expiresBuiltIn: !1
            };
        return n.get = function(e) {
            return t[e]
        }, n.set = function(e, n) {
            t[e] = n
        }, n.has = function(e) {
            return void 0 !== t[e]
        }, n.remove = function(e) {
            t[e] = void 0
        }, n.clear = function() {
            _.forOwn(t, function(e, n) {
                t[n] = void 0
            })
        }, n.getKeys = function() {
            var e = [];
            return _.forOwn(t, function(t, n) {
                void 0 !== t && e.push(n)
            }), e
        }, n._set = n.set, n._remove = n.remove, n._get = n.get, n._getKeys = n.getKeys, n
    }
}, function(e, t, n) {
    function i() {
        s.isLoggedIn() ? d.setDimension(1, "loggedIn") : d.deleteDimension(1)
    }

    function a(e, t) {
        var n = new Uri(t || window.location.href);
        _.each(n.getParams(), function(e, t) {
            _.contains(["t", "q", "e", "stream", "welcome", "type", "mode"], t) || n.deleteQueryParam(t)
        });
        var i = (new Uri).setPath(n.path()).setQuery(n.query()).toString();
        e.track(["pageview", i]), o.log("tracking", "Url " + i + " sent to GA")
    }
    var o = n(1),
        r = n(6),
        s = n(4),
        l = n(2),
        c = l.events,
        u = n(42);
    u.setReadOnly(n(8).isReadOnly);
    var d = u.create(r.tracking.gaId),
        p = u.create(r.tracking.gaIdSignup),
        h = u.create(r.tracking.gaIdFacebookApp);
    i(), l.subscribe(c.userAuthStatusChanged, function() {
        i()
    }), l.subscribe(c.pageView, function() {
        var e;
        /^\/[^\/]+\/docs\/[^\/]+\/\d+/g.test(window.location.pathname) && (e = _.filter(window.location.pathname.split("/"), function(e, t) {
            return 3 >= t
        }).join("/")), a(d, e)
    }), l.subscribe(c.pageContinuation, function(e) {
        var t = window.location.pathname;
        /^\/[^\/]+\/docs\/[^\/]+\/\d+/g.test(t) && (t = _.filter(t.split("/"), function(e, t) {
            return 3 >= t
        }).join("/"));
        var n = new Uri(t).addQueryParam("stream", e.streamIndex);
        a(d, n.toString())
    }), l.subscribe(c.businessSignupFlow, function(e) {
        a(d, "/businesssignupflow/" + e), a(p, "/businesssignupflow/" + e)
    }), l.subscribe(c.uploadFlow, function(e) {
        a(d, "/uploadflow/" + e)
    }), l.subscribe(c.signupTrack, function(e) {
        d.trackEvent("Signup", e.account, e.username)
    }), l.subscribe(c.serviceChangeTrack, function(e) {
        d.trackEvent(e.action, e.difference, s.getUsername().toLowerCase())
    }), t.track = function(e) {
        "_trackPageview" === e[0] && (e[0] = "pageview"), "_trackSocial" === e[0] && (e[0] = "social"), "_trackTiming" === e[0] && (e[0] = "timing"), d.track(e)
    }, t.trackEvent = function(e, t, n) {
        d.trackEvent(e, t, n), o.log("tracking", "GA EVENT", e, t, n)
    }, t.trackFB = function(e) {
        "_trackPageview" === e[0] && (e[0] = "pageview"), "_trackSocial" === e[0] && (e[0] = "social"), h.track(e)
    }, t.trackFBEvent = function(e, t, n) {
        h.trackEvent(e, t, n), o.log("tracking FB", "GA EVENT", e, t, n)
    }
}, function(e, t, n) {
    function i() {
        n(1).log.apply(null, arguments)
    }

    function a(e) {
        return d ? window._trackedEventsPingback.push(e) : window._tracq.push(e)
    }
    var o = n(2),
        r = n(1),
        s = n(67).Tracker,
        l = s.defaultWebConfiguration(),
        c = new s(l),
        u = o.events;
    window._tracq = window._tracq || [], c.legacyInterface();
    var d = n(8).isReadOnly;
    d && (window._trackedEventsPingback = window._trackedEventsPingback || [], i("tracking", "READ ONLY")), t.track = a, o.subscribe(u.trackingEvent, function(e) {
        a(e), i("tracking", e)
    }), o.subscribe(u.pageView, function() {
        a("webpageLoad"), i("tracking", "Event " + u.pageView + " sent to pingback")
    }), o.subscribe(u.pageContinuation, function(e) {
        a({
            event: "streamScrolling",
            data: {
                index: e.streamIndex
            }
        }), i("tracking", "Event " + u.pageContinuation + " sent to pingback")
    }), o.subscribe(u.documentShare, function(e) {
        var t = u.documentShare;
        a({
            event: t,
            data: {
                revisionId: e.revisionId,
                publicationId: e.publicationId,
                publicationName: e.publicationName,
                ownerUsername: e.ownerUsername,
                service: e.service
            }
        }), i("tracking", "Event " + t + " sent to pingback")
    }), o.subscribe(u.clippingShare, function(e) {
        a({
            event: "clippingAction",
            data: {
                action: "share",
                clippingId: e.clippingId,
                onPage: e.clippingPage,
                service: e.service,
                creator: e.clippingIsPublisherClipping ? "publisher" : "reader"
            }
        }), i("tracking", "Event clippingShare sent to pingback")
    }), o.subscribe(u.hideUserClippings, function(e) {
        a({
            event: "clippingLayer",
            data: {
                action: "deactivate"
            }
        }), i("tracking", "Event clippingLayer-deactivate sent to pingback")
    }), o.subscribe(u.showUserClippings, function(e) {
        e && e.dontTrack === !0 || (a({
            event: "clippingLayer",
            data: {
                action: "activate"
            }
        }), i("tracking", "Event clippingLayer-activate sent to pingback"))
    }), o.subscribe(u.documentDownload, function(e) {
        var t = u.documentDownload;
        a({
            event: t,
            data: {
                anonymous: e.anonymous,
                revisionId: e.revisionId,
                publicationId: e.publicationId,
                publicationName: e.publicationName,
                ownerUsername: e.ownerUsername
            }
        }), i("tracking", "Event " + t + " sent to pingback")
    }), o.subscribe(u.monitorEvent, function(e) {
        return e && e.type ? (a({
            event: "monitor",
            data: e
        }), void i("tracking", "Event monitor", e, "sent to pingback")) : void r.error("tracking - Illegal monitor event.")
    })
}, function(e, t, n) {
    function i(e) {
        return c ? window._trackedEventsQuantcast.push(e) : ("object" == typeof __qc && __qc.qpixelsent && __qc.qpixelsent.pop(), window._qevents.push(e))
    }

    function a() {
        i({
            qacct: s.tracking.quantcastId
        })
    }
    var o = n(2),
        r = n(1),
        s = n(6),
        l = n(25);
    window._qevents = window._qevents || [];
    var c = n(8).isReadOnly;
    c && (window._trackedEventsQuantcast = window._trackedEventsQuantcast || []), t.track = i, o.subscribe(l.pageView, function() {
        try {
            a(), r.log("tracking", "Event " + l.pageView + " sent to QuantCast")
        } catch (e) {
            r.log("tracking", "FAILED to send event " + l.pageContinuation + " to Quantcast")
        }
    }), o.subscribe(l.pageContinuation, function() {
        try {
            a(), r.log("tracking", "Event " + l.pageContinuation + " sent to QuantCast")
        } catch (e) {
            r.log("tracking", "FAILED to send event " + l.pageContinuation + " to Quantcast")
        }
    })
}, function(e, t, n) {
    "use strict";
    var i = n(250),
        a = n(252),
        o = n(251),
        r = n(249),
        s = n(34),
        l = n(248),
        c = n(88),
        u = n(13);
    t.event = c.event, t.direction = c.direction, t.create = function(e, n, c) {
        function d(e, n) {
            switch (e) {
                case t.event.DOWN:
                    for (var i = v.length - 1; i >= 0; i--) v[i].processing() || v[i].deactivate();
                    break;
                case t.event.UP:
                case t.event.FLING:
                    for (var a = v.length - 1; a >= 0; a--) v[a].processing() || v[a].activate()
            }
            m.gestureHandler(e, n), c(e, n)
        }

        function p() {
            f(!0)
        }

        function h() {
            f(!1)
        }

        function f(e) {
            e !== b && (b = e, b ? (_.each(v, function(e) {
                e.attachEventHandlers()
            }), m.attachEventHandlers()) : (_.each(v, function(e) {
                e.removeEventHandlers()
            }), m.removeEventHandlers()))
        }
        var m, g = e.view.$(),
            v = [],
            b = !1;
        return function() {
            v.push(r.create(g, n, d)), v.push(a.create(g, n, d)), v.push(i.create(g, n, d)), v.push(o.create(g, n, d)), m = l.create(g), e.subscribe(u.DISABLE_GESTURES, function(e) {
                e ? h() : p()
            })
        }(), {
            attachEventHandlers: p,
            removeEventHandlers: h,
            cancelEvent: s.cancelEvent
        }
    }
}, function(e, t) {
    "use strict";
    t.now = function() {
        return Date.now ? Date.now() : (new Date).getTime()
    }, t.cancelEvent = function(e) {
        e.preventDefault(), e.stopPropagation()
    }, t.printEvent = function(e) {}, t.getUniqueNamespace = function() {
        return ".gesture" + Math.random().toString().substring(2)
    }, t.msVendorPrefix = function(e) {
        if (window.navigator.pointerEnabled) return e;
        switch (e) {
            case "pointerdown":
                return "MSPointerDown";
            case "pointermove":
                return "MSPointerMove";
            case "pointerup":
                return "MSPointerUp";
            case "pointercancel":
                return "MSPointerCancel";
            default:
                return e
        }
    }
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            var o;
            return "top: " + e.escapeExpression((o = null != (o = n.y || (null != t ? t.y : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(null != t ? t : {}, {
                name: "y",
                hash: {},
                data: a
            }) : o)) + "px;"
        },
        3: function(e, t, n, i, a) {
            var o;
            return "left: " + e.escapeExpression((o = null != (o = n.x || (null != t ? t.x : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(null != t ? t : {}, {
                name: "x",
                hash: {},
                data: a
            }) : o)) + "px;"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression;
            return '<div class="publisher beige" id="' + u((r = null != (r = n.id || (null != t ? t.id : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "id",
                hash: {},
                data: a
            }) : r)) + '" style="' + (null != (o = n["if"].call(s, null != t ? t.y : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + " " + (null != (o = n["if"].call(s, null != t ? t.x : t, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + u((r = null != (r = n.debugStyle || (null != t ? t.debugStyle : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "debugStyle",
                hash: {},
                data: a
            }) : r)) + '">\n    ' + (null != (o = e.lambda(null != (o = null != t ? t.content : t) ? o.publisherMarkup : o, t)) ? o : "") + "\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression;
            return '<div class="stream-stack beige" id="' + u((r = null != (r = n.id || (null != t ? t.id : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "id",
                hash: {},
                data: a
            }) : r)) + '" style="top: ' + u((r = null != (r = n.y || (null != t ? t.y : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "y",
                hash: {},
                data: a
            }) : r)) + "px; left: " + u((r = null != (r = n.x || (null != t ? t.x : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "x",
                hash: {},
                data: a
            }) : r)) + "px;" + u((r = null != (r = n.debugStyle || (null != t ? t.debugStyle : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "debugStyle",
                hash: {},
                data: a
            }) : r)) + '">\n    ' + (null != (o = e.lambda(null != (o = null != t ? t.content : t) ? o.coverMarkup : o, t)) ? o : "") + "\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    function i(e, t) {
        return _.isArray(e) ? -1 !== e.indexOf(t) : !1
    }
    var a = n(7);
    t.hasReaderTool = function(e) {
        return i(e, "norelated")
    }, t.hasBrandpackage = function(e) {
        return i(e, "norelated") && i(e, "brandpackage")
    }, t.hasReaderToolMobile = function(e) {
        return t.hasReaderTool(e)
    }, t.hasBrandpackageMobile = function(e) {
        return t.hasBrandpackage(e)
    }, t.hasFreeDownload = function(e) {
        return i(e, "download")
    }, t.hasUnlisted = function(e) {
        return i(e, "unlisted")
    }, t.get = function(e) {
        var n = new $.Deferred;
        return a.create({
            path: "/call/licensing/application/get/1/1/publication/" + e,
            isReadOnly: !0
        }).call().then(function(e) {
            n.resolve({
                services: e,
                hasReaderTool: t.hasReaderTool(e),
                hasBrandpackage: t.hasBrandpackage(e),
                hasReaderToolMobile: t.hasReaderToolMobile(e),
                hasBrandpackageMobile: t.hasBrandpackageMobile(e),
                hasFreeDownload: t.hasFreeDownload(e),
                hasUnlisted: t.hasUnlisted(e)
            })
        }, function() {
            n.resolve(["all"])
        }), n.promise()
    }
}, function(e, t, n) {
    function i() {
        a || (a = window.googletag = window.googletag || {}, a.cmd = a.cmd || [], function() {
            var e = document.createElement("script");
            e.async = !0, e.type = "text/javascript";
            var t = "https:" === document.location.protocol;
            e.src = (t ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
            var n = document.getElementsByTagName("script")[0];
            n.parentNode.insertBefore(e, n)
        }(), a.cmd.push(function() {
            a.pubads().enableSingleRequest(), a.pubads().disableInitialLoad(), a.pubads().setTargeting("lang", o.get()), a.enableServices()
        }))
    }
    var a, o = n(20);
    t.create = function() {
        function e(e, t, n, i) {
            a.cmd.push(function() {
                var o = a.defineSlot(t, n, e);
                2 === _.size(i) && (o = o.setTargeting.apply(o, i)), o = o.setCollapseEmptyDiv(!0).addService(a.pubads()), a.display(e), a.pubads().refresh([o])
            })
        }

        function t(e, t) {
            a.cmd.push(function() {
                a.pubads().addEventListener(e, t)
            })
        }
        return i(), {
            addPlacement: e,
            addEventListener: t
        }
    }
}, function(e, t, n) {
    var i = n(1),
        a = n(28),
        o = a.create("history", a.SESSION, {
            maxSize: 20,
            items: {
                expires: 1440
            }
        }),
        r = o.getKeys(),
        s = location.href,
        l = document.referrer,
        c = !1,
        u = 1;
    if ("" !== l) {
        var d = new Uri(l),
            p = new Uri(location.href);
        p.host() === d.host() && p.protocol() === d.protocol() && (u = 2), c = r.length >= u && r[r.length - u] === s
    }
    var h = {
        seed: Math.round(1e4 * Math.random())
    };
    if (c) {
        for (var f = 0, m = u; m > f; f++) h = o.pop().value;
        i.log("History", "Use history cache with key: " + s + " / data: " + h)
    }
    o.push(s, h), t.getData = function() {
        return h
    }, t.setData = function(e) {
        h = e, o.updateLast(e)
    }, t.getKey = function(e) {
        return h[e]
    }, t.setKey = function(e, n) {
        h[e] = n, t.setData(h)
    }, t.clear = function() {
        o.clear()
    }
}, function(e, t) {
    e.exports = Uri
}, function(e, t, n) {
    function i() {
        n(1).error.apply(null, arguments)
    }

    function a(e) {
        var t = o.getCookie(e);
        return null === t ? void 0 : t
    }
    var o = n(9);
    t.expiresBuiltIn = !0, t.get = function(e) {
        var t = a(e);
        if (t) try {
            t = JSON.parse(t)
        } catch (n) {
            return void i("Error parsing data with cookie.getCookie. " + n.name + ": " + n.message)
        }
        return t
    }, t.set = function(e, t, n) {
        try {
            var a, r = JSON.stringify(t),
                s = n || {};
            return s && !isNaN(s.expires) && s.expires > 0 && (a = s.expires / 1440), o.setCookie(e, r, a, s.domain, s.path), t
        } catch (l) {
            return void i("Error saving data with cookie.setCookie. " + l.name + ": " + l.message)
        }
    }, t.remove = o.clearCookie, t.has = function(e) {
        return void 0 !== a(e)
    }, t.getKeys = function() {
        var e = document.cookie.split(";") || [],
            t = /(.*?)=(.*)/;
        return _.compact(_.map(e, function(e) {
            var n = $.trim(decodeURIComponent(e)),
                i = t.exec(n);
            return i && i.length > 1 ? i[1] : void 0
        }))
    }, t.clear = function(e) {
        if (e)
            for (var n = t.getKeys(), a = 0, r = n.length; r > a; a++) o.clearCookie(n[a]);
        else i("Cookie: you can not clear all data")
    }, t._set = t.set, t._remove = t.remove, t._get = t.get, t._getKeys = t.getKeys
}, function(e, t) {
    var n = {},
        i = !1;
    t.create = function(e) {
        function t(e) {
            var t = "t0" === c ? "send" : c + ".send",
                n = [t];
            if (n.push.apply(n, e), _.keys(l).length) {
                var a = _.isObject(_.last(n)) ? n.pop() : {};
                a = _.merge({}, l, a), n.push(a)
            }
            i ? (window._trackedEventsGA = window._trackedEventsGA || [], window._trackedEventsGA.push(n)) : window.ga.apply(s, n)
        }

        function a(e, n, i) {
            var a = {
                eventCategory: e,
                eventAction: n
            };
            i && (a.eventLabel = i), t(["event", a])
        }

        function o(e, t) {
            l["dimension" + e] = t
        }

        function r(e) {
            delete l["dimension" + e]
        }
        var s, l = {},
            c = "";
        return i ? (window._trackedEventsGA = window._trackedEventsGA || [], s = window.ga = function() {
            window._trackedEventsGA.push(_.toArray(arguments))
        }) : (s = window.ga = window.ga || function() {
            (s.q = s.q || []).push(arguments)
        }, s.l = +new Date), n[e] ? c = n[e] : (c = "t" + _.keys(n).length, n[e] = c, "t0" === c ? s("create", e, "auto") : s("create", e, "auto", {
            name: c
        })), {
            track: t,
            trackEvent: a,
            setDimension: o,
            deleteDimension: r
        }
    }, t.setReadOnly = function(e) {
        i = e
    }
}, function(e, t) {
    var n = function(e) {
        function t() {
            if (s !== !1) {
                var e = [$(window).width(), $(window).height()];
                if (o.join("x") !== e.join("x") || r !== window.orientation) {
                    if (o = e, r = window.orientation, "function" == typeof l.checkFirst && l.checkFirst() !== !1) return;
                    l.onFire && l.onFire(e)
                }
            }
        }

        function n() {
            return 0 === c ? void t() : (a && window.clearTimeout(a), void(a = window.setTimeout(t, c)))
        }

        function i() {
            $(window).off("resize", n), $(window).off("orientationchange", n), o = void 0, r = void 0, l = void 0
        }
        var a, o, r, s = !0,
            l = e,
            c = 0;
        return function() {
            o = [$(window).width(), $(window).height()], r = window.orientation, l.delay && (c = l.delay), $(window).on("resize", n), $(window).on("orientationchange", n)
        }(), {
            isActive: function() {
                return s
            },
            setActive: function(e) {
                s = e === !1 ? !1 : !0
            },
            destroy: i
        }
    };
    e.exports = n
}, function(e, t, n) {
    function i(e, t, n, i) {
        var a;
        return a = n > e ? t > n - e : i > e - n
    }

    function a(e, t) {
        return {
            id: e,
            isImpressionTracked: !1,
            canImpressionBeTracked: !1,
            data: t
        }
    }

    function o(e, t) {
        if (e && !e.isImpressionTracked && e.canImpressionBeTracked) {
            var n = e.data;
            if (i(t.y, t.height, n.y, n.height)) return !0
        }
        return !1
    }

    function r(e) {
        l.broadcast(u.trackingEvent, e)
    }
    var s = n(1),
        l = n(2),
        c = n(148),
        u = l.events;
    t.create = function() {
        var e, t = {},
            n = [],
            i = {};
        return i.track = r, i.addElement = function(e, n) {
            return t[e] ? (s.log("streamTracker", "updateElement: ", n), t[e].data = n, i.trackElementImpression(e)) : (s.log("streamTracker", "addElement: ", n), t[e] = a(e, n)), i
        }, i.getElement = function(e) {
            return t[e]
        }, i.allowImpressionTracking = function(a) {
            var r = t[a];
            r && !r.canImpressionBeTracked && (r.canImpressionBeTracked = !0, o(r, e) ? i.doImpressionTracking(r) : n.push(a))
        }, i.trackElementImpression = function(n) {
            var a = t[n];
            return a && o(a, e) && i.doImpressionTracking(a), i
        }, i.onScroll = function(a) {
            if (0 !== n.length) {
                var r = _.clone(a);
                if (r.y - e.y !== 0 || r.height - e.height !== 0) {
                    r.height = Math.max(r.y + r.height, e.y + e.height), r.y = Math.min(r.y, e.y), r.height -= r.y;
                    var s = n;
                    return n = [], _.forEach(s, function(e) {
                        var a = t[e];
                        a && (o(a, r) ? i.doImpressionTracking(a) : n.push(e))
                    }), e = a, i
                }
            }
        }, i.doImpressionTracking = function(e) {
            return e.isImpressionTracked = !0, i
        }, i.start = function(t) {
            return e = t, i
        }, i.stop = function() {
            return i
        }, i.reset = function() {
            return t = {}, n = [], i
        }, c.addSuperFn(i)
    }
}, function(e, t, n) {
    function i(e, t, n) {
        return e[t] = {
            subscribed: n
        }, n
    }

    function a(e, t) {
        return e[t] && e[t].subscribed
    }

    function o(e) {
        return "object" != typeof d[e] && u.error(new Error("Invalid subscription type")), d[e]
    }

    function r(e, t) {
        var n = new $.Deferred,
            a = o(e);
        if (!c.isLoggedIn()) return n.resolve(!1), n;
        var r = {};
        return r[a.apiParam] = t, l.create({
            action: a.apiActionStop,
            cache: !1,
            type: "POST"
        }).parameters(r).call().then(function(e) {
            n.resolve(i(a, t, !1))
        }, function() {
            n.resolve(!0)
        }), n
    }

    function s(e, t) {
        var n = new $.Deferred,
            a = o(e);
        if (!c.isLoggedIn()) return n.resolve(!1), n;
        var r = {};
        return r[a.apiParam] = t, l.create({
            action: a.apiActionStart,
            cache: !1,
            type: "POST"
        }).parameters(r).call().then(function(e) {
            n.resolve(i(a, t, !0))
        }, function() {
            n.resolve(!1)
        }), n
    }
    var l = n(7),
        c = n(4),
        u = n(1),
        d = {
            stack: {
                apiParam: "stackId",
                apiParamBatch: "stackIds",
                apiActionGet: "issuu.stack.get_subscription",
                apiActionGetBatch: "issuu.stack.get_subscriptions",
                apiActionStart: "issuu.stack.subscribe",
                apiActionStop: "issuu.stack.unsubscribe"
            },
            publisher: {
                apiParam: "subscribedUsername",
                apiActionGet: "issuu.user.get_subscription",
                apiActionStart: "issuu.user.subscribe",
                apiActionStop: "issuu.user.unsubscribe"
            }
        };
    t.setInitialSubscription = function(e, t, n) {
        (_.isUndefined(e) || _.isUndefined(t) || _.isUndefined(n)) && u.error(new Error("setInitialSubscription expects three parameters."));
        var a = o(e);
        i(a, t, n)
    }, t.getSubscription = function(e, t, n) {
        var r = new $.Deferred,
            s = o(e);
        if (!c.isLoggedIn()) return r.resolve(!1), r.promise();
        if (n !== !0 && !_.isUndefined(a(s, t))) return r.resolve(a(s, t)), r.promise();
        var u = {};
        u[s.apiParam] = t;
        var d = l.create({
            action: s.apiActionGet,
            isReadOnly: !0
        }).parameters(u);
        return n === !0 && d.deleteCache(), d.call().then(function(e) {
            r.resolve(i(s, t, void 0 !== e))
        }, function() {
            r.resolve(!1)
        }), r.promise()
    }, t.toggleSubscription = function(e, t, n) {
        var l, c = o(e);
        return "boolean" == typeof n && i(c, t, !n), l = a(c, t) === !0 ? r(e, t) : s(e, t), l.notify(!a(c, t)), l.promise()
    }, t.getSubscriptions = function(e, t) {
        if ("stack" !== e) return u.error(new Error("Invalid subscription type, must be of type stack")), null;
        var n = new $.Deferred,
            a = o(e),
            r = _.times(t.length, function() {
                return !1
            });
        if (!c.isLoggedIn()) return n.resolve(r), n.promise();
        var s = {};
        return s[a.apiParamBatch] = t.join(","), l.create({
            action: a.apiActionGetBatch,
            isReadOnly: !0
        }).parameters(s).call().then(function(o) {
            var r = _.map(o, function(n, o) {
                var r = n && n[e + "_subscription"];
                return i(a, t[o], r)
            });
            n.resolve(r)
        }, function() {
            n.resolve(r)
        }), n.promise()
    }
}, function(e, t) {
    t.create = function(e, t) {
        function n(e) {
            var t = _.filter(k, function(t) {
                    return t.testId === e
                }),
                n = t[0] && t[0].context ? t[0].context : $("somethingThatDoesNotExist");
            return n
        }

        function i() {
            x ? y.html(x) : y.html(""), y.removeClass("showAsError")
        }

        function a(e, n) {
            var i = $("[name=" + e + "]", n);
            if (i.removeClass("error"), (i.parent().is("label") || i.parent().hasClass("checkbox")) && i.parent().removeClass("error"), t) {
                var a = _.find(t, {
                    id: e
                });
                a && "other" !== e && $(a.rapportElm).removeClass("showAsError").html("").css("display", "none")
            }
        }

        function o(e, t, n) {
            C[e] ? (C[e] = _.without(C[e], t), 0 === C[e].length && (a(e, n), delete C[e])) : a(e, n)
        }

        function r() {
            _.forEach(k, function(e) {
                o(e.name, e.testId, e.context)
            }), k = [], i()
        }

        function s(n, i) {
            if (n)
                if (y.hasClass("showAsError") || (x = y.html()), y.html() !== n && e.onReportError && e.onReportError(n, i.join(",")), t) {
                    var a = _.find(t, function(e) {
                        return _.reduce(_.map(i, function(t) {
                            return _.contains(e.match, t)
                        }), function(e, t) {
                            return e && t
                        })
                    });
                    if (a) {
                        var o = $(a.rapportElm);
                        o.addClass("showAsError"), o.html(n);
                        var r = o.data("display");
                        o.css("display", r ? r : "block")
                    }
                } else y.addClass("showAsError"), y.html(n)
        }

        function l(e, t) {
            var n = $("[name=" + e + "]", t);
            n.addClass("error"), (n.parent().is("label") || n.parent().hasClass("checkbox")) && n.parent().addClass("error")
        }

        function c(e, t, n) {
            C[e] ? C[e] = [].concat(C[e]).concat(t) : C[e] = [t], l(e, n)
        }

        function u() {
            if (t) {
                var e = _.find(t, {
                    id: "other"
                });
                e && $(e.rapportElm).html("").css("display", "none")
            }
        }

        function d() {
            if (k.length > 0) {
                var e = k[k.length - 1],
                    t = e && e.result && e.result.error ? e.result.error : "Something is wrong here.",
                    n = e && e.result && e.result.fields ? e.result.fields : [];
                _.forEach(n, function(t) {
                    c(t, e.testId, e.context)
                }), s(t, n)
            } else i()
        }

        function p(e, t, n, i) {
            k.push({
                name: e,
                testId: t,
                result: n,
                context: i ? $(i) : $("body")
            }), d()
        }

        function h(e) {
            var t = [],
                n = _.map(k, function(n) {
                    return n.testId === e ? (t.push(n), !1) : n
                });
            k = _.compact(n), _.forEach(t, function(e) {
                _.forEach(e.result.fields, function(t) {
                    o(t, e.testId, e.context)
                })
            }), d()
        }

        function f(e, t) {
            o(e, t, n(t))
        }

        function m(e, t) {
            var n = _.filter(k, function(n) {
                    return n === !0 || void 0 === n ? !1 : -1 !== _.indexOf(n.result.fields, e) && n.context === t
                }),
                i = n[0] && n[0].result && n[0].result.error ? n[0].result.error : "";
            return i
        }

        function g(e, t) {
            var n = m(e, t);
            n && y.html(n)
        }

        function v(e, t, n) {
            if (e && !_.isArray(e)) throw new Error("fieldnames should be an array");
            p("postSubmit", "serverError", {
                error: t,
                fields: e
            }, n), d()
        }

        function b(e, t) {
            h("serverError"), d()
        }

        function w() {
            return {
                errors: k
            }
        }
        var y;
        y = "object" == typeof e ? $(e.reportElmStr) : $(e);
        var k = [],
            x = y.html(),
            C = {},
            A = {
                removeAllErrors: r,
                addError: p,
                removeError: h,
                showErrorsIfAny: d,
                fieldIsValid: f,
                displayErrorFor: g,
                addPostSubmitError: v,
                removePostSubmitError: b,
                getStatusReport: w,
                removeOtherErrors: u
            };
        return A
    }
}, function(e, t, n) {
    function i() {
        return {
            ok: !0,
            message: ""
        }
    }

    function a(e, t, n) {
        return {
            ok: !1,
            message: n || i18n.t(e, t)
        }
    }

    function o(e) {
        return function() {
            var t = new $.Deferred,
                n = e.apply(null, Array.prototype.slice.call(arguments));
            return t.resolve(n), t.promise()
        }
    }
    var r = n(7);
    t.required = function(e, t) {
        return $.trim(e) ? i() : a("formerrors.isrequired", {}, t)
    }, t.bothWrong = function(e, t, n) {
        return e || t ? i() : a("formerrors.bothWrong", {}, n)
    }, t.optional = function(e, n, a) {
        return 0 === e.length ? i() : t[n].apply(null, arguments)
    }, t.requiredIfOtherDontMatch = function(e, t, n, o) {
        return t === n || e ? i() : a("formerrors.isrequired", {}, o)
    }, t.requiredIfOtherNonempty = function(e, t, n) {
        return t && !e ? a("formerrors.isrequired", {}, n) : i()
    }, t.length = function(e, t, n, o) {
        return e.length < t || e.length > n ? a("formerrors.mustbebetweenminlengthandmaxlengthcharacters", {
            minlength: t,
            maxlength: n
        }, o) : i()
    }, t.minlength = function(e, t, n) {
        return $.trim(e).length < t ? a("formerrors.mustbeatleastminlengthcharacters", {
            minlength: t
        }, n) : i()
    }, t.maxlength = function(e, t, n) {
        return e.length > t ? a("formerrors.cantbemorethanmaxlengthcharacters", {
            maxlength: t
        }, n) : i()
    }, t.min = function(e, t, n) {
        return isNaN(e) || Number(e) < t ? a("formerrors.mustbegreaterthanorequaltomin", {
            min: t
        }, n) : i()
    }, t.max = function(e, t, n) {
        return isNaN(e) || Number(e) > t ? a("formerrors.mustbelessthanorequaltomax", {
            max: t
        }, n) : i()
    }, t.range = function(e, t, n, o) {
        return isNaN(e) || Number(e) < t || Number(e) > n ? a("formerrors.mustbebetweenminandmax", {
            min: t,
            max: n
        }, o) : i()
    }, t.email = function(e, t) {
        var n = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
        return n.test(e) ? i() : a("formerrors.mustbevalidemailaddress", {}, t)
    }, t.url = function(e, t) {
        var n = /^((https?|ftp):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
        return n.test(e) ? i() : a("formerrors.mustbevalidurl", {}, t)
    }, t.number = function(e, t) {
        var n = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/;
        return n.test(e) ? i() : a("formerrors.mustbeanumber", {}, t)
    }, t.digits = function(e, t) {
        var n = /^\d+$/;
        return n.test(e) ? i() : a("formerrors.mustbeonlydigits", {}, t)
    }, t.equalTo = function(e, t, n) {
        return e !== t ? a("formerrors.mustbethesamevalue", {}, n) : i()
    }, t.notEqualTo = function(e, t, n) {
        return e === t ? a("formerrors.cannotbethisvalue", {}, n) : i()
    }, t.username = function(e, t) {
        var n = /^(([a-zA-Z0-9_\-\.]{4,40}|ads)$)/g;
        return n.test(e) ? i() : a("formerrors.notavalidusername", {}, t)
    }, t.usernameOrEmail = function(e, n) {
        return t.username(e).ok || t.email(e).ok ? i() : a("formerrors.notavalidusernameoremail", {}, n)
    }, t.docname = function(e, t) {
        var n = /^[a-z0-9_.\-]{1,100}$/;
        return n.test(e) ? i() : a("formerrors.notavaliddocumentname", {}, t)
    }, t.usernameAvailablePromise = function(e, t, n) {
        var o = new $.Deferred;
        return r.create({
            action: "issuu.user.username_available",
            cache: !0
        }).parameters({
            username: e
        }).call().then(function(n) {
            e === t() && o.resolve(i())
        }, function(i) {
            var r, s = i._content && i._content.error && i._content.error.code ? parseInt(i._content.error.code, 10) : 0;
            switch (s) {
                case 100:
                    r = "formerrors.usernamealreadyexists";
                    break;
                case 201:
                    r = "formerrors.usernamenotvalid";
                    break;
                default:
                    r = "formerrors.usernamenotvalid"
            }
            e === t() && o.resolve(a(r, {}, n))
        }), o.promise()
    }, t.newusername = function(e, n, i) {
        var a = t.username(e);
        return a.ok === !0 ? t.usernameAvailablePromise(e, n, i) : (new $.Deferred).resolve(a).promise()
    }, t.emailAvailablePromise = function(e, t, n) {
        var o = new $.Deferred;
        return r.create({
            action: "issuu.user.email_available",
            cache: !0
        }).parameters({
            email: e
        }).call().then(function(n) {
            e === t() && o.resolve(i())
        }, function(i) {
            e === t() && o.resolve(a("formerrors.emailnotavailable", {}, n))
        }), o.promise()
    }, t.newemail = function(e, n, i) {
        var a = t.email(e);
        return a.ok ? t.emailAvailablePromise(e, n, i) : (new $.Deferred).resolve(a).promise()
    }, t.promisify = o, t.promised = {
        required: o(t.required),
        optional: o(t.optional),
        requiredIfOtherDontMatch: o(t.requiredIfOtherDontMatch),
        requiredIfOtherNonempty: o(t.requiredIfOtherNonempty),
        length: o(t.length),
        minlength: o(t.minlength),
        maxlength: o(t.maxlength),
        min: o(t.min),
        max: o(t.max),
        range: o(t.range),
        email: o(t.email),
        url: o(t.url),
        number: o(t.number),
        digits: o(t.digits),
        equalTo: o(t.equalTo),
        notEqualTo: o(t.notEqualTo),
        usernameAvailable: t.usernameAvailablePromise,
        emailAvailable: t.emailAvailablePromise,
        username: o(t.username),
        docname: o(t.docname),
        usernameOrEmail: o(t.usernameOrEmail),
        newusername: t.newusername,
        newemail: t.newemail,
        bothWrong: o(t.bothWrong)
    }
}, function(e, t, n) {
    t.create = function(e) {
        function t() {
            return V++, G + "-TE" + V
        }

        function i(e) {
            var t, n = W.find("[name=" + e + "]");
            if (0 === n.length) throw new Error("Can not find value for: ", e);
            return 1 === n.length ? t = "checkbox" === n.attr("type") ? n.is(":checked") ? "on" : "off" : n.val() : "radio" === n.attr("type") && (t = $("input:radio[name=" + e + "]:checked").val()), t
        }

        function a(e, t) {
            X[e] = t
        }

        function o(e) {
            return X[e]
        }

        function r(e) {
            var t = _.filter(X, function(t) {
                return t === !0 || void 0 === t ? !1 : -1 !== _.indexOf(t.fields, e) ? !0 : !1
            });
            return t
        }

        function s() {
            var e = [];
            return _.forEach(X, function(t, n) {
                void 0 === t && e.push(n)
            }), e
        }

        function l(e, t) {
            K[e] ? K[e] = [].concat(K[e]).concat(t) : K[e] = [t]
        }

        function c(e, t) {
            Q[e] = t
        }

        function u() {
            var e = [];
            return _.forEach(K, function(t) {
                _.forEach(t, function(t) {
                    e.push(t())
                })
            }), e
        }

        function d(e) {
            if (1 !== arguments.length || !_.isObject(e)) throw new Error("Plase pass definition as an object");
            if (e.extraParams && !_.isArray(e.extraParams)) throw new Error("New style of validator, plase pass definition as an object");
            Z.push(e);
            var n = e.func,
                r = e.fields,
                u = t();
            if (a(u, void 0), e.testName && (q[e.testName] = u), !_.isArray(r)) throw new Error("namesArr is not an array: ", r);
            if ("function" != typeof n) throw new Error("func is not a function: " + r[0]);
            var d = e.extraParams;
            return _.forEach(r, function(t, f, m) {
                var g = W.find("[name=" + t + "]");
                if (0 === g.length) throw new Error("No element found for name: " + t);
                var v = function(s) {
                    if (e.testName && xe[u] && xe[u] === !0) return null;
                    var l = _.map(r, i);
                    l = l.concat(d), e.errorText && (l = l.concat(e.errorText));
                    var c = n.apply(null, l);
                    return $.when(c).then(function(e) {
                        var n;
                        n = e.ok ? !0 : {
                            testId: u,
                            fields: r,
                            error: e.message
                        }, ke.state ? n === !0 && (a(u, n), Y[t] = void 0) : s && n !== !0 || (p(r), a(u, n), h(r, u), le(t, u, o(u)))
                    }, function(e) {}), c
                };
                l(t, v), e.testName && c(e.testName.toString(), v), (-1 !== ["text", "password", "email", "color", "date", "datetime", "datetime-local", "month", "number", "range", "search", "tel", "time", "url", "week"].indexOf(g.attr("type")) || g.is("textarea")) && g.keyup(function() {
                    1 === s().length && s()[0] === u ? v(!0) : (Y[t] === !0 || void 0 !== o(u)) && v()
                }), (g.is("select") || g.is(":radio") || g.is(":checkbox")) && g.change(function() {
                    var e = !0;
                    g.is("select") && _.forEach(m, function(t) {
                        Y[t] === !0 || o(u) || (e = !1)
                    }), e && v()
                }), g.focus(function(e) {
                    this.originalvalue = i(t), pe(t)
                }), g.blur(function(e) {
                    var n = i(t);
                    if (n && (Y[t] = !0), n !== this.originalvalue) {
                        var a = !0;
                        g.is("select") && _.forEach(m, function(e) {
                            Y[e] === !0 || o(u) || (a = !1)
                        }), a && v()
                    }
                    ue(t)
                })
            }), Ce
        }

        function p(e) {
            j = T(), _.forEach(e, function(e) {
                J[e] = r(e)
            })
        }

        function h(e, t) {
            z = T(), j === !1 && z === !0 ? ne() : j === !0 && z === !1 && oe(), _.forEach(e, function(e) {
                ee[e] = r(e), J[e].length > 0 && 0 === ee[e].length ? fe(e, !0, t) : 0 === J[e].length && ee[e].length > 0 && fe(e, ee[e], t)
            })
        }

        function f(e, t) {
            return function() {
                var n = Array.prototype.slice.call(arguments);
                t && t.apply(null, n), _.forEach(e, function(e) {
                    e.apply(null, n)
                })
            }
        }

        function m(e) {
            return function(t) {
                return e.push(t), Ce
            }
        }

        function g(e) {
            se.push(e)
        }

        function v(e) {
            ce.push(e)
        }

        function b(e) {
            de.push(e)
        }

        function w(e) {
            he.push(e)
        }

        function y(e) {
            me.push(e)
        }

        function k(e) {
            ve.push(e)
        }

        function x(e) {
            var n = t();
            return a(n, e.isAllValid()), e.onAllValid(function() {
                p(), a(n, !0), h()
            }), e.onAllNotValid(function(e) {
                p(), a(n, !1), h()
            }), e.onActivity(function(e, t, n) {
                le(e, t, n)
            }), e.onPause(function() {
                p(), a(n, !0), h()
            }), e.onUnPause(function() {
                p(), a(n, e.isAllValid()), h()
            }), e.onBlured(function(e) {
                ue(e)
            }), e.onFocused(function(e) {
                pe(e)
            }), e.onFieldEvent(function(e, t) {
                fe(e, t)
            }), we.push(e), Ce
        }

        function C(e, t) {
            var n = [];
            return _.forEach(we, function(i) {
                n.push(i[e].apply(null, t))
            }), n
        }

        function A(e) {
            ye.push(e)
        }

        function E(e, t) {
            var n = [];
            return _.forEach(ye, function(i) {
                n.push(i[e].apply(null, t))
            }), n
        }

        function I(e) {
            Q[e] && Q[e]()
        }

        function S() {
            ke.state = !0, C("pause", []), ge()
        }

        function D() {
            ke.state = !1, C("unPause", []), be()
        }

        function T() {
            var e = [];
            for (var t in X) X[t] === !0 || xe[t] || e.push(t);
            return 0 === e.length
        }

        function P(e, t) {
            C("getResultsForField", [e, t]);
            var n = r(e);
            n && t(n)
        }

        function O() {
            var e = C("runAllTests", []),
                t = u(),
                n = e.concat(t);
            return $.when.apply(null, n).then(function() {
                return "validator: " + G + " says all tests have run."
            })
        }

        function R() {
            var t = [];
            return _.forEach(K, function(n, i) {
                var a = _e.init({
                    field: $("[name=" + i + "]", e)
                });
                a.getValue() && _.forEach(n, function(n) {
                    var a = $("[name=" + i + "]", e).is("select");
                    t.push(n(a))
                })
            }), t
        }

        function F(e) {
            var t = C("testAllFieldsWithContent", []),
                n = R(),
                i = t.concat(n);
            return $.when.apply(null, i).then(function() {
                return "validator: " + G + " says all tests have run."
            })
        }

        function N() {
            return {
                tests: K,
                blurredFields: Y,
                isPaused: ke,
                validatorId: G,
                testStatus: X,
                subValidators: C("getStatusReport", []),
                reporters: E("getStatusReport", []),
                isAllValid: T()
            }
        }

        function L(e) {
            var t = _.find(Z, {
                testName: e
            });
            if (!t) throw new Error("You are pausing a test that does not exist: " + e);
            return p(t.fields), xe[q[e]] = !0, h(t.fields, q[e]), Ce
        }

        function M(e) {
            var t = _.find(Z, {
                testName: e
            });
            if (!t) throw new Error("You are unPausing a test that does not exist: " + e);
            return p(t.fields), delete xe[q[e]], h(t.fields, q[e]), Ce
        }

        function U() {
            ke.state = !1, Y = {}, X = {}, xe = {}, E("removeAllErrors", []), oe(), C("resetForm", [])
        }

        function B() {
            X = {}, Y = {}, C("forgetBlured", [])
        }

        function H() {
            C("cleanupListeners", [])
        }
        var j, z, W = e ? $(e) : void 0,
            G = "VA" + Math.round(Math.random() * (new Date).getTime() / 1e6),
            V = 0,
            Y = {},
            q = {},
            X = {},
            K = {},
            Q = {},
            Z = [],
            J = {},
            ee = {},
            te = [],
            ne = f(te, function() {}),
            ie = m(te),
            ae = [],
            oe = f(ae, function() {}),
            re = m(ae),
            se = [],
            le = f(se, function(e, t, n) {
                E("removePostSubmitError", [e, W]), n === !0 ? E("removeError", [t]) : E("addError", [e, t, n, W])
            }),
            ce = [],
            ue = f(ce),
            de = [],
            pe = f(de, function(e) {
                E("displayErrorFor", [e, W])
            }),
            he = [],
            fe = f(he, function(e, t, n) {
                t === !0 && E("fieldIsValid", [e, n])
            }),
            me = [],
            ge = f(me, function() {}),
            ve = [],
            be = f(ve, function() {}),
            we = [],
            ye = [],
            ke = {
                state: !1
            },
            _e = n(112),
            xe = {},
            Ce = {
                addTest: d,
                onAllValid: ie,
                onAllNotValid: re,
                onActivity: g,
                onBlured: v,
                onFocused: b,
                onFieldEvent: w,
                onPause: y,
                onUnPause: k,
                pause: S,
                unPause: D,
                pauseTest: L,
                unPauseTest: M,
                isAllValid: T,
                runAllTests: O,
                testAllFieldsWithContent: F,
                runTestWithTestName: I,
                getResultsForField: P,
                addValidator: x,
                addReporter: A,
                getStatusReport: N,
                resetForm: U,
                forgetBlured: B,
                cleanupListeners: H
            };
        return Ce
    }
}, function(e, t, n) {
    var i = n(28),
        t = _.clone(i);
    t.OPTIONS = {
        maxSize: 50,
        isPrivate: !1,
        items: {
            expires: 0
        }
    }, t.create = function(e, t, n) {
        function a(e, t, n) {
            s.push(e, t, n)
        }

        function o(e) {
            var t = s.get(e);
            return _.isArray(t) && t.length > 0 ? t[0] : void 0
        }
        var r = n || {};
        r.noDuplicate = !0;
        var s = i.create("queue." + e, t, r);
        return {
            set: a,
            get: o,
            getAll: s.getAll,
            remove: s.remove,
            clear: s.clear,
            getKeys: s.getKeys
        }
    }, e.exports = t
}, function(e, t, n) {
    var i = n(17),
        a = n(14),
        o = n(1),
        r = n(19).local,
        s = n(9),
        l = n(12),
        c = n(153),
        u = n(70);
    t.create = function(e) {
        function t() {
            var e = (new Date).getTime() - v;
            "pending" === b.state() && (o.log("ads", "streamAd", "onAdFailed", e), b.reject(), c.adFailed(e))
        }

        function d() {
            var e = (new Date).getTime() - v;
            w || (o.log("ads", "streamAd", "onAdViewable", e), w = !0, c.adViewable(e))
        }

        function p() {
            var e = (new Date).getTime() - v;
            "pending" === b.state() && (o.log("ads", "streamAd", "onAdFilled", e), b.resolve(), c.adLoaded(e))
        }

        function h() {
            var e = (new Date).getTime() - v;
            "pending" === b.state() && (o.log("ads", "streamAd", "onAdNotFilled", e), b.reject(), c.adNotLoaded(e))
        }

        function f(n) {
            o.log("ads", "streamAd", "insertAd"), u.getAdProvider().create(n, e.adType, {
                onAdFilled: p,
                onAdNotFilled: h,
                onAdFailed: t,
                onAdViewable: d
            }), c.adRequested()
        }

        function m() {
            return u.willShow(e)
        }

        function g(e) {
            return m() ? (v = (new Date).getTime(), r.set(u.LAST_SHOWN_STORAGE_KEY, (new Date).getTime()), f(e), b.promise()) : b.reject()
        }
        var v, b = new i.Deferred,
            w = !1;
        return function() {
            o.log("ads", "streamAd", "create", JSON.stringify(e, null, " ")), a.defaults(e, {
                allowed: !0,
                adType: "300x250"
            }), u.init({
                cookie: s,
                logger: o,
                serverData: l,
                storage: r,
                adProviders: {
                    dfp: n(151)
                }
            }, e)
        }(), {
            show: g,
            willShow: m
        }
    }
}, function(e, t, n) {
    function i() {
        switch (f) {
            case "ok":
                l(d);
                break;
            case "deleted":
                c(d);
                break;
            default:
                l()
        }
    }

    function a(e) {
        function t(t) {
            e && e(t)
        }

        function a() {
            $(".js-w-deletestack-btn-confirm").one("click", function(e) {
                e.preventDefault(), t(!0)
            }), $(".js-w-deletestack-btn-cancel").one("click", function(e) {
                e.preventDefault(), t(!1)
            })
        }
        var o = m.create({
            marginClickClose: !0,
            content: n(108)({
                stackname: d.get("name")
            }),
            onShow: a,
            onOutAnimationFinished: i,
            onRemove: function() {
                $(".js-w-deletestack-btn-cancel, .js-w-deletestack-btn-confirm").off("click")
            }
        });
        m.show(o)
    }

    function o(e) {
        f = e, p ? i() : m.close()
    }

    function r() {
        function e(e) {
            d = y.create(e), n.removeClass("spinner").addClass("ok"), setTimeout(function() {
                o("ok")
            }, 600)
        }

        function t(e) {
            u.find(".js-w-stackeditor-api-error").text(i18n.t("stackeditor.errors.apiFailed", {
                errormsg: e && e._content && e._content.error && e._content.error.message || "Undefined error"
            })), n.removeClass("spinner").addClass("error negative"), setTimeout(function() {
                n.removeClass("error negative").prop("disabled", !1)
            }, 1500)
        }
        var n = u.find(".js-w-stackeditor-btn-save");
        u.find("form").on("submit", function(i) {
            i.preventDefault(), i.stopPropagation(), $(".js-w-stackeditor-api-error").text(""), h.runAllTests().then(function() {
                h.isAllValid() && (n.addClass("spinner").prop("disabled", !0), d.set("name", $.trim(u.find('[name="name"]').val())), d.set("description", $.trim(u.find('[name="description"]').val())), d.set("secret", u.find('[name="secret"]').prop("checked")), d.get("id") ? w.updateStack(d).then(e, t) : w.createStack(d).then(e, t))
            })
        }), $(".js-w-stackeditor-btn-cancel").on("click", function(e) {
            e.preventDefault(), e.stopPropagation(), o("canceled")
        }), $(".js-w-stackeditor-btn-delete").on("click", function(e) {
            e.preventDefault(), e.stopPropagation(), a(function(e) {
                e ? w.deleteStack(d).then(function() {
                    o("deleted")
                }) : o("canceled")
            })
        })
    }

    function s() {
        var e = v.create(u);
        e.addTest({
            func: b.required,
            fields: ["name"]
        }).addTest({
            func: b.length,
            fields: ["name"],
            extraParams: [1, 100]
        });
        var t = v.create(u);
        t.addTest({
            func: b.maxlength,
            fields: ["description"],
            extraParams: [1e3]
        });
        var n = g.create(u.find(".js-w-stackeditor-name-error")),
            i = g.create(u.find(".js-w-stackeditor-description-error"));
        e.addReporter(n), t.addReporter(i), h = v.create(u), h.addValidator(e).addValidator(t)
    }
    var l, c, u, d, p, h, f, m = n(23),
        g = n(46),
        v = n(48),
        b = n(47).promised,
        w = n(161),
        y = n(73),
        k = n(107),
        _ = function() {};
    t.create = function(e) {
        d = e.model || y.create(), l = e.onFinished || _, c = e.onDeleted || _, p = e.partOfOverlaySeries === !0;
        var t = m.create({
            skin: e.overlaySkin || "default",
            showCloseIcon: !1,
            onInAnimationFinished: function() {
                u.find('[name="name"]').focus()
            },
            onOutAnimationFinished: i,
            content: k({
                name: d.get("name"),
                description: d.get("description"),
                secret: d.get("secret"),
                title: d.get("id") ? i18n.t("stackeditor.title_editstack") : i18n.t("stackeditor.title_createstack"),
                positive: d.get("id") ? i18n.t("stackeditor.buttons.savechanges") : i18n.t("stackeditor.buttons.createstack"),
                deletable: d.get("id")
            })
        });
        m.show(t), u = $(m.getElement()), r(), s()
    }
}, , function(e, t, n) {
    "use strict";

    function i() {
        var e = $(".notification-bar-message-hub").offset().top,
            t = $("#readerreader").offset().top,
            n = isNaN(e) ? t : e;
        $(window).scrollTop() !== n && $("html,body").animate({
            scrollTop: n
        }, 200)
    }

    function a() {
        u.resolve()
    }

    function o() {
        return Math.round($(document).width() * window.innerHeight / window.innerWidth)
    }

    function r(e, t, n) {
        e[n] = e[t], delete e[t]
    }

    function s(e, t, i) {
        var o = _.merge({
            mode: "window",
            pageNumber: 1,
            jsAPIClientDomain: window.location.hostname,
            jsAPIInitCallback: "jsAPIInitCallback",
            jsInternalCallback: "jsInternalCallback",
            language: v.get(),
            viewMode: "doublePage"
        }, e.embedData);
        r(o, "documentName", "name"), r(o, "ownerUsername", "username"), r(o, "creatorUsername", "creator"), r(o, "downloadButtonEnabled", "printButtonEnabled"), o.documentId = e.doc.revisionId + "-" + e.doc.publicationId, isNaN(t) || (o.pageNumber = t), o.theme = "default" === i ? void 0 : i;
        var s = "flypaper" === o.theme;
        o.watermarkEnabled = !s, s && (o.defaultNavBarEnabled = !1, o.actionBarEnabled = !1, o.defaultDockEnabled = !1, o.backgroundColor = "#353535", o.preloaderBackground = "#353535", o.centerCoverEnabled = e.centerCoverEnabled, o.hideScrollbarUnlessInFullscreen = !0, o.hideLeftFlipButtonUnlessInFullscreen = !0, o.onlyShowSidebarInFullscreen = e.onlyShowSidebarInFullscreen), o.licenses = _.map(e.services, function(e) {
            return _.isArray(e) ? _.first(e) : e
        }).join(), g.isLoggedIn() && (o.bl_viewuser = g.getUsername().toLowerCase()), v.devLanguagesAllowed() && (o.devlanguage = !0), b.isReadOnly && (o.trackingEnabled = !1), e.adpageId && (o.adpageId = e.adpageId), e.readerDocCount > 0 && (o.sidebarCTAEnabled = !1);
        var l = m.flashReaderUrl(2);
        if ("P" === e.doc.state) {
            var c = new Uri(window.location);
            c.getQueryParamValue("workerAddress") && (o.publishAddr = c.getQueryParamValue("workerAddress")), o.showSidebar = "no", o.username = e.doc.username, o.name = e.doc.name, l = m.flashPreviewerUrl()
        }
        "A" === e.doc.state ? o.skipPagesJsonp = !0 : o.skipPagesJsonp = !1;
        var u = "tracking." + e.doc.publicationId + ".",
            d = w.create(u, w.TYPES.LOCAL),
            p = k.parse(document.location.search);
        d.has("stream-origin") && d.has("stream-ranking") ? (o.streamOrigin = JSON.stringify(d.get("stream-origin")), o.streamRanking = encodeURIComponent(d.get("stream-ranking"))) : p.streamOrigin && p.streamRanking && (o.streamOrigin = JSON.stringify(p.streamOrigin.split(";")), o.streamRanking = p.streamRanking), p.streamRanking = void 0, p.streamOrigin = void 0, history.replaceState && history.replaceState(void 0, void 0, document.location.pathname + k.format(p)), $("#readerreader").html(n(323)({
            readerSwfUrl: l,
            flashvars: $.param(o)
        })), f.create("#flashcontent", o);
        var y = setTimeout(function() {
            a()
        }, 5e3);
        h.subscribe(h.events.readerDocumentLoaded, a), h.subscribe(h.events.readerDocumentFailed, a), h.subscribe(h.events.readerDocumentLoading, function() {
            clearTimeout(y)
        })
    }

    function l(e, t, n) {
        function i() {
            $("#readerreader").height(o()), c.broadcast("mobileReader.VIEWPORT_CHANGED")
        }
        c = y.create({
            root: "#readerreader",
            page: t,
            username: e.doc.username,
            docname: e.doc.name,
            embedId: e.embedData.embedId
        }), c.subscribe("mobileReader.DOCUMENT_LOADED", a), c.subscribe("mobileReader.READER_FULLY_LOADED", function() {
            c.subscribe("mobileReader.UI_STATE_CHANGED", d)
        }), h.subscribe(h.events.onShowStream, function() {
            c.broadcast("mobileReader.DISABLE_GESTURES", !0)
        }), h.subscribe(h.events.onHideStream, function() {
            c.broadcast("mobileReader.DISABLE_GESTURES", !1)
        }), h.subscribe(h.events.getReader, function(e) {
            "function" == typeof e && e(c)
        }), h.subscribe(C.onPageResized, i)
    }
    var c, u, d, p = n(342),
        h = n(2),
        f = n(208),
        m = n(5),
        g = n(4),
        v = n(20),
        b = n(8),
        w = n(10),
        y = n(238),
        k = n(166),
        x = n(12).get("documentData"),
        C = h.events,
        A = .92,
        E = 110,
        I = !1,
        S = "html5",
        D = "flash",
        T = "robot",
        P = D;
    x.isCrawler ? P = T : !p.hasFlash() || b.get("reader.forceHtml") ? P = S : /android/i.test(window.navigator.userAgent) && Modernizr.touch ? P = S : p.isGoodForIssuu() || (P = S, I = !0), t.updateReaderContainerSize = function(e, n) {
        var i = window.innerHeight;
        e ? $("html").addClass("no-related") : P !== T && (t.isFlashReader() && (i = Math.ceil(window.innerHeight * A), i = Math.min(i, window.innerHeight - E), n && (i = Math.max(i, $(".gutter-ad").height()))), $("#readerreader").height(i))
    }, t.loadReader = function(e, n, r, c, p) {
        return u = $.Deferred(), d = c, P === T ? ($(".reader-space").css("height", "auto"), setTimeout(a, 0)) : t.isFlashReader() ? s(e, n, r) : (p || $("#readerreader").height(o()), l(e, n, p), I && h.broadcast(h.events.messagehubWarn, i18n.t("documentpage.upgradeflash", {
            url: "/upgrade_flash"
        }))), h.subscribe(h.events.documentPageChange, i), u.promise()
    }, t.$ = function(e) {
        return e ? $(e, $("#readerreader")) : $("#readerreader")
    }, t.isFlashReader = function() {
        return P === D || P === T
    }, t.getCurrentPages = function() {
        return c ? c.model.getCurrentPages() : $("#flashcontent").length > 0 && "function" == typeof $("#flashcontent").get(0).getPageNumbers ? $("#flashcontent").get(0).getPageNumbers() : []
    }, t.setFocus = function() {
        if (t.isFlashReader()) {
            var e = $("#flashcontent").attr("tabindex");
            void 0 === e ? ($("#flashcontent").attr("tabindex", 31415926).focus(), $("#flashcontent").removeAttr("tabindex")) : $("#flashcontent").focus()
        }
    }, t.updateAnchors = function(e, n, i, a) {
        if (t.isFlashReader()) {
            var o = $("#flashcontent").get(0),
                r = o.updateFlypaperAnchors;
            r && r.call(o, e, n, i, a)
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = n(91);
    t.create = function() {
        function e() {
            m = !0
        }

        function t() {
            m = !1
        }

        function n() {
            return m
        }

        function a() {
            return g
        }

        function o() {
            d && (window.clearTimeout(d), d = void 0)
        }

        function r(e, t) {
            o(), m || (t || t > 0 ? d = window.setTimeout(function() {
                d && (i.fade(p, 1, _.isUndefined(e) ? f : e), g = !0), d = void 0
            }, 1e3 * t) : (i.fade(p, 1, _.isUndefined(e) ? f : e), g = !0))
        }

        function s(e, t) {
            o(), m || (t || t > 0 ? d = window.setTimeout(function() {
                d && (i.fade(p, 0, _.isUndefined(e) ? f : e), g = !1), d = void 0
            }, 1e3 * t) : (i.fade(p, 0, _.isUndefined(e) ? f : e), g = !1))
        }

        function l() {
            g ? s.apply(void 0, arguments) : r.apply(void 0, arguments)
        }

        function c(e, t, n) {
            if (p = $(e), 0 === p.length) throw new Error("Trying to initialise an element that does not exist.");
            h = t || .2, f = n || .4
        }

        function u() {
            return p
        }
        var d, p, h, f, m = !1,
            g = !0;
        return {
            lock: e,
            unlock: t,
            islocked: n,
            isVisible: a,
            clearFadeTimeout: o,
            show: r,
            hide: s,
            toggle: l,
            init: c,
            $: u
        }
    }
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            var o;
            return 'src="' + e.escapeExpression((o = null != (o = n.coverImage || (null != t ? t.coverImage : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(null != t ? t : {}, {
                name: "coverImage",
                hash: {},
                data: a
            }) : o)) + '"'
        },
        3: function(e, t, n, i, a) {
            return "Preview"
        },
        5: function(e, t, n, i, a) {
            return "Read now"
        },
        7: function(e, t, n, i, a) {
            return '            <div class="ribbon-wrapper"><div class="ribbon">Featured</div></div>\n'
        },
        9: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = n.helperMissing,
                l = "function",
                c = e.escapeExpression;
            return '        <p class="description">\n            <a href="' + c((o = null != (o = n.publicationUrl || (null != t ? t.publicationUrl : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "publicationUrl",
                hash: {},
                data: a
            }) : o)) + '" class="unstyled" tabindex="-1">' + c((o = null != (o = n.shortDescription || (null != t ? t.shortDescription : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "shortDescription",
                hash: {},
                data: a
            }) : o)) + "</a>\n        </p>\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression,
                d = e.lambda;
            return '<div class="publication" id="' + u((r = null != (r = n.id || (null != t ? t.id : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "id",
                hash: {},
                data: a
            }) : r)) + '" style="top: ' + u((r = null != (r = n.y || (null != t ? t.y : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "y",
                hash: {},
                data: a
            }) : r)) + "px; left: " + u((r = null != (r = n.x || (null != t ? t.x : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "x",
                hash: {},
                data: a
            }) : r)) + "px;" + u((r = null != (r = n.debugStyle || (null != t ? t.debugStyle : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "debugStyle",
                hash: {},
                data: a
            }) : r)) + '">\n    <div class="publication-content">\n    ' + (null != (r = null != (r = n.debugTxt || (null != t ? t.debugTxt : t)) ? r : l, o = typeof r === c ? r.call(s, {
                name: "debugTxt",
                hash: {},
                data: a
            }) : r) ? o : "") + '\n    <a href="' + u((r = null != (r = n.publicationUrl || (null != t ? t.publicationUrl : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "publicationUrl",
                hash: {},
                data: a
            }) : r)) + '" style="height:' + u((r = null != (r = n.imgHeight || (null != t ? t.imgHeight : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "imgHeight",
                hash: {},
                data: a
            }) : r)) + 'px;" class="cover" >\n        <img ' + (null != (o = n["if"].call(s, null != t ? t.coverImage : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + ' style="height:' + u((r = null != (r = n.imgHeight || (null != t ? t.imgHeight : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "imgHeight",
                hash: {},
                data: a
            }) : r)) + 'px;" alt="' + u(d(null != (o = null != t ? t.content : t) ? o.title : o, t)) + '" />\n        <span class="hint" style="line-height:' + u((r = null != (r = n.imgHeight || (null != t ? t.imgHeight : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "imgHeight",
                hash: {},
                data: a
            }) : r)) + 'px;" >' + (null != (o = n["if"].call(s, null != (o = null != t ? t.content : t) ? o.isPreview : o, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.program(5, a, 0),
                data: a
            })) ? o : "") + "</span>\n" + (null != (o = n["if"].call(s, null != (o = null != t ? t.content : t) ? o.isEditorsPick : o, {
                name: "if",
                hash: {},
                fn: e.program(7, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '    </a>\n    <div class="metadata">\n        <h3 class="title"><a href="' + u((r = null != (r = n.publicationUrl || (null != t ? t.publicationUrl : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "publicationUrl",
                hash: {},
                data: a
            }) : r)) + '" class="unstyled type-discreet" tabindex="-1">' + u(d(null != (o = null != t ? t.content : t) ? o.title : o, t)) + '</a></h3>\n        <p class="ownername">\n            <a href="/' + u(d(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + '">' + u(d(null != (o = null != t ? t.content : t) ? o.ownerDisplayName : o, t)) + "</a>\n        </p>\n" + (null != (o = n["if"].call(s, null != t ? t.isGoodDescription : t, {
                name: "if",
                hash: {},
                fn: e.program(9, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "    </div>\n    </div>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression;
            return '<div class="infobox beige" id="' + u((r = null != (r = n.id || (null != t ? t.id : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "id",
                hash: {},
                data: a
            }) : r)) + '" style="top: ' + u((r = null != (r = n.y || (null != t ? t.y : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "y",
                hash: {},
                data: a
            }) : r)) + "px; left: " + u((r = null != (r = n.x || (null != t ? t.x : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "x",
                hash: {},
                data: a
            }) : r)) + "px;" + u((r = null != (r = n.debugStyle || (null != t ? t.debugStyle : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "debugStyle",
                hash: {},
                data: a
            }) : r)) + ' overflow:hidden;">\n    ' + (null != (r = null != (r = n.debugTxt || (null != t ? t.debugTxt : t)) ? r : l, o = typeof r === c ? r.call(s, {
                name: "debugTxt",
                hash: {},
                data: a
            }) : r) ? o : "") + '\n    <div class="content">\n        ' + (null != (o = e.lambda(null != (o = null != t ? t.content : t) ? o.message : o, t)) ? o : "") + "\n    </div>\n</div>\n"
        },
        useData: !0
    })
}, , function(e, t, n) {
    var i = n(1);
    t.createKey = function(e, t) {
        var n = $.extend({}, e, !0);
        delete n.jsonCallback, delete n.token, i.log("Api-cache-key", "Creating key with:", n, t);
        var a, o = [];
        for (a in n)({}).hasOwnProperty.call(n, a) && o.push(a.toString().toLowerCase() + (n[a] ? n[a].toString().toLowerCase() : ""));
        o.sort(), o.unshift(t.toLowerCase());
        var r = o.join("|");
        return i.log("Api-cache-key", "createKey: ", r), r
    }
}, function(e, t, n) {
    function i() {
        n(1).log.apply(null, ["Api"].concat(_.toArray(arguments)))
    }

    function a(e, t, n) {
        m && h.set(e, t, n)
    }

    function o(e, t) {
        f && p.set(e, t)
    }

    function r(e) {
        var t = d.getExpireIn(e[d.EXPIREKEY]);
        return !isNaN(t) && t > 0 ? t : void 0
    }

    function s() {
        if (f) {
            var e = p.getKeys();
            e && _(e).forEach(function(e) {
                var t = p.get(e);
                if (t) {
                    var n = new $.Deferred;
                    n.resolve(t.value), a(t.name, n.promise(), {
                        expires: r(t)
                    })
                }
            })
        }
    }

    function l() {
        var e, t = c.get("apiCache");
        for (e in t)
            if ({}.hasOwnProperty.call(t, e)) {
                var n = new $.Deferred;
                n.resolve(t[e]), a(e, n.promise())
            }
    }
    t.sessionCache = {
        name: "apiSessionCache",
        cookie: "api-disable-session-cache"
    }, t.pageCache = {
        name: "apiPageCache",
        cookie: "api-disable-page-cache"
    };
    var c = n(12),
        u = n(49),
        d = n(21),
        p = u.create(t.sessionCache.name, u.SESSION, {
            maxSize: 20,
            items: {
                expires: 30
            }
        }),
        h = u.create(t.pageCache.name, u.OBJECT, {
            maxSize: 100,
            items: {
                expires: 30
            }
        }),
        f = !n(8).get(t.sessionCache.cookie),
        m = !n(8).get(t.pageCache.cookie);
    ! function() {
        m && (s(), l())
    }(), t.get = function(e) {
        var t = h.get(e) || {};
        return t.value
    }, t.add = function(e, t, n) {
        i("cache - add key:", e, t, n), a(e, t), n && t.done(function(t) {
            o(e, t)
        })
    }, t.remove = function(e) {
        i("cache - delete key:", e), p.remove(e), h.remove(e)
    }, t.clear = function() {
        i("clear cache"), p.clear(), h.clear()
    }
}, function(e, t, n) {
    var i = n(7),
        a = n(1),
        o = 5e3;
    t.create = function(e, t) {
        function n(n) {
            var a = new $.Deferred;
            return h = i.create(t), h.parameters(_.merge(p, {
                startIndex: n || 0
            })), h.deleteCache(m).call().then(function(t) {
                var n = [];
                _.each(t.result._content, function(t, i) {
                    n.push(t[e])
                }), a.resolve(n, t.result.more)
            }, a.reject), a
        }

        function r() {
            n(f.length).then(function(e, n) {
                e && (f = f.concat(e)), d.notify(e), n && f.length < t.maxItemCount ? r() : (m = !1, d.resolve(f))
            }, d.reject)
        }

        function s(e) {
            return p = e, g
        }

        function l() {
            return d && "pending" === d.state() ? a.log("Api", "You are in danger of losing some notify() responses. Dont rely on them. You will be fine as long as you are only interested in resolve/reject.") : (d = new $.Deferred, f = [], r()), d.promise()
        }

        function c() {
            return h.getKey()
        }

        function u(e) {
            return m = e !== !1, g
        }
        var d, p, h, f = [],
            m = !1;
        t.maxItemCount = t.maxItemCount || o;
        var g = {
            call: l,
            parameters: s,
            getKey: c,
            deleteCache: u
        };
        return g
    }
}, function(e, t) {
    t.wrap = function(e, t, n) {
        function i(e) {
            return h + e
        }

        function a(e) {
            return h ? 0 === e.indexOf(h) : !0
        }

        function o(e) {
            return h ? e.replace(h, "") : e
        }

        function r(t) {
            return e.get(i(t))
        }

        function s(t) {
            return e.has(i(t))
        }

        function l(t, n, a) {
            var o = _.defaults(a || {}, f);
            return e.set(i(t), n, o)
        }

        function c(t) {
            return e.remove(i(t))
        }

        function u() {
            var t = e.getKeys.apply(p, arguments);
            return _.map(_.compact(_.filter(t, a)), o)
        }

        function d() {
            _.forEach(u(), function(e) {
                c(e)
            })
        }
        var p = _.clone(e),
            h = t || "",
            f = n || {};
        return p.get = r, p.has = s, p.set = l, p.remove = c, p.clear = d, p.getKeys = u, p
    }
}, function(e, t, n) {
    function i(e) {
        return e + r
    }

    function a(e) {
        return !s.test(e)
    }
    var o = n(2),
        r = "__pr__",
        s = /(.*)(__pr__)$/;
    t.clearPrivateOnEvent = function(e) {
        return e.isClearingPrivateFromEvent || (e.isClearingPrivateFromEvent = !0, o.subscribe(o.events.storageClearPrivate, function() {
            e._clearPrivate()
        })), e
    }, t.wrap = function(e) {
        function t(t, n) {
            void 0 !== n && (n ? e._set(i(t), !0) : e._remove(i(t)))
        }

        function n(n, i, a) {
            var o = a || {};
            return t(n, o.isPrivate), e.set.apply(c, arguments), i
        }

        function o(t) {
            e.remove.apply(c, arguments), e._remove(i(t))
        }

        function r() {
            var t = e.getKeys.apply(c, arguments);
            return _.compact(_.filter(t, a))
        }

        function l() {
            var t = e.getKeys.apply(c, arguments);
            _.forEach(t, function(t) {
                var n = s.exec(t);
                n && n.length >= 2 && e.get(t) && o(n[1])
            })
        }
        var c = _.clone(e);
        return c.set = n, c.remove = o, c.getKeys = r, c._clearPrivate = l, c
    }
}, function(e, t) {
    e.exports = function(e) {
        function t() {
            if (void 0 !== r.distanceToBottom) {
                var e = r.distanceToBottom;
                if ("function" == typeof r.distanceToBottom && (e = r.distanceToBottom()), $(document).height() - ($(window).scrollTop() + $(window).height()) < e) return !0
            } else {
                if (void 0 === r.distanceToTop) return !0;
                var t = r.distanceToTop;
                if ("function" == typeof r.distanceToTop && (t = r.distanceToTop()), $(window).scrollTop() > t) return !0
            }
            return !1
        }

        function n(e) {
            t() ? r.onFire && r.onFire() : r.onUnfire && r.onUnfire()
        }

        function i(e) {
            o !== !1 && ("function" != typeof r.checkFirst || r.checkFirst() === !1) && n(e)
        }

        function a() {
            $(window).off("scroll", i), r = void 0
        }
        var o = !0,
            r = e;
        return function() {
            $(window).on("scroll", i)
        }(), {
            isActive: function() {
                return o
            },
            setActive: function(e) {
                o = e === !1 ? !1 : !0
            },
            destroy: a,
            isOnFire: t,
            runOnce: n
        }
    }
}, function(e, t, n) {
    function i(e) {
        return s.create({
            action: "issuu.user.get",
            isReadOnly: !0
        }).parameters({
            profileUsername: e
        })
    }

    function a(e, t) {
        return c.log(u, "setUserAttribute()", "setting user attribute on API", e, t), s.create({
            action: "issuu.user.set_attribute",
            type: "POST"
        }).parameters({
            attributeName: e,
            attributeValue: t
        }).deleteCache().call().then(function(e) {
            var t = {};
            return t[e.attribute.name] = {
                value: e.attribute.value,
                timestamp: e.attribute.modified
            }, t
        }, function(e) {
            c.log(u, "setUserAttribute() failed", e)
        })
    }

    function o() {
        l.create("attribute", {
            action: "issuu.user.list_attributes"
        }).parameters({
            pageSize: d
        }).deleteCache()
    }

    function r(e) {
        return c.log(u, "removeUserAttribute()", "removing user attribute on API", e), s.create({
            action: "issuu.user.delete_attribute"
        }).parameters({
            attributeName: e
        }).deleteCache().call().then(function(e) {
            return {}
        }, function(e) {
            c.log(u, "removeUserAttribute() failed", e)
        })
    }
    var s = n(7),
        l = n(60),
        c = n(1),
        u = "user",
        d = 30;
    t.clearUserApiCache = function(e) {
        i(e).deleteCache()
    }, t.updateUserObject = function(e) {
        return c.log(u, "updateUserObject()", "updating user via API"), s.create({
            action: "issuu.user.update",
            type: "POST",
            cache: !1
        }).parameters(e).deleteCache().call().then(function(e) {
            return e.user
        }, function(e) {
            c.log(u, "updateUserObject() failed", e)
        })
    }, t.getUserObject = function(e) {
        return c.log(u, "getUserObject()", "actually requesting user from API", e), i(e).deleteCache().call().then(function(e) {
            return e.user
        }, function(e) {
            c.log(u, "getUserObject() failed", e)
        })
    }, t.setUserAttribute = function(e, t) {
        return o(), "undefined" == typeof t ? r.apply(void 0, arguments) : a.apply(void 0, arguments)
    }, t.getUserAttribute = function(e) {
        return c.log(u, "getUserAttribute()", "actually requesting single user attribute from API", e), s.create({
            action: "issuu.user.get_attribute",
            isReadOnly: !0
        }).parameters({
            attributeName: e
        }).call().then(function(e) {
            var t = {};
            return t[e.attribute.name] = {
                value: e.attribute.value,
                timestamp: e.attribute.modified
            }, t
        }, function(e) {
            c.log(u, "getUserAttribute() failed", e)
        })
    }, t.getUserAttributes = function() {
        return c.log(u, "getUserAttributes()", "actually requesting all user attributes from API"), l.create("attribute", {
            action: "issuu.user.list_attributes",
            isReadOnly: !0
        }).parameters({
            pageSize: d
        }).call().then(function(e) {
            var t = {};
            return _.each(e, function(e, n) {
                t[e.name] = {
                    value: e.value,
                    timestamp: e.modified
                }
            }), t
        }, function(e) {
            c.log(u, "getUserAttributes() failed", e)
        })
    }, t.logoutUser = function() {
        c.log(u, "logoutUser()", "send API request to force logout user");
        var e = s.create({
            action: "issuu.user.logout",
            isReadOnly: !1
        }).call();
        return e.fail(function(e) {
            c.log(u, "logoutUser() failed", e)
        }), e
    }
}, function(e, t) {
    var n = 0;
    t.getUniqueId = function(e) {
        var t, i = (new Date).getTime().toString(32);
        for (t = 0; 5 > t; t++) i += Math.floor(65535 * Math.random()).toString(32);
        return (e || "o_") + i + (n++).toString(32)
    }
}, function(e, t) {
    e.exports = {
        autoTrackPageView: !0,
        facebookAutoLogin: !0,
        redirectOnLogout: !1,
        notifications: {
            emailChangeRejected: !0,
            emailRejected: !1,
            unlistedExceeded: !0,
            friendly: !1,
            alwaysSmallFriendly: !1,
            terms: !0,
            dunning: !0,
            suspended: !1,
            confirmEmail: !1
        }
    }
}, function(e, t) {
    e.exports = function(e) {
        function t(i) {
            if (n[i]) return n[i].exports;
            var a = n[i] = {
                exports: {},
                id: i,
                loaded: !1
            };
            return e[i].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.p = "_build/152", t(0)
    }([function(e, t, n) {
        e.exports = n(1)
    }, function(e, t, n) {
        function i(e) {
            var t = {
                post: function(e, t, n) {},
                handleError: function(e) {},
                getWidth: function() {},
                getHeight: function() {},
                getUsername: function() {},
                getLocation: function() {},
                getReferrer: function() {},
                getSource: function() {},
                getOrigin: function() {},
                getLanguage: function() {},
                setTimeout: function(e, t) {},
                clearTimeout: function(e) {},
                setInterval: function(e, t) {},
                clearInterval: function(e) {},
                nagleTimeout: 0
            };
            a.forOwn(t, function(t, n) {
                if (void 0 === e[n] || null !== e[n] && typeof e[n] != typeof t) throw new Error("Initialization error: You must specify options correctly. On key " + n + " value " + e[n] + " is not of correct type " + typeof t)
            });
            var n = {
                    getUsername: e.getUsername,
                    getLanguage: e.getLanguage,
                    getLocation: e.getLocation,
                    getReferrer: e.getReferrer,
                    getSource: e.getSource,
                    getWidth: e.getWidth,
                    getHeight: e.getHeight,
                    getBrowserSize: function() {
                        return n.getWidth() + "x" + n.getHeight()
                    }
                },
                i = function(t) {
                    var n = {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    };
                    e.post("/ping", n, t)
                },
                m = new o,
                g = new l(e.getOrigin() + "_tracking-v1.2.152");
            this._handlers = {};
            var v = function(t) {
                    a.forOwn(t.handlers(), function(n, i) {
                        this._handlers[i] = this._handlers[i] || [], this._handlers[i].push(n.bind(t)), this[i] = function(t) {
                            var n = m.validate(i, t);
                            return n ? void e.handleError(new Error(JSON.stringify(n))) : void a.forEach(this._handlers[i], function(e) {
                                e.call(null, t)
                            }, this)
                        }.bind(this)
                    }, this)
                }.bind(this),
                b = new u(e.handleError, g, i, n, e.setTimeout, e.clearTimeout, e.nagleTimeout);
            v(new s(g, i)), v(new r(g, i, e.setTimeout, e.clearTimeout)), v(new p(b)), v(new d(b)), v(new h(b)), v(new f(b, e.setTimeout, e.clearTimeout)), v(new c(g, i, n, e.setTimeout, e.clearTimeout)), this._handleError = e.handleError
        }
        var a = (n(2), n(3)),
            o = n(4).RequestValidator,
            r = n(7).MonitorHandler,
            s = n(8).IgnoreHandler,
            l = n(9).Wrapper,
            c = n(10).WebsiteSignalHandler,
            u = n(11).ReaderSignalHandler,
            d = n(12).LinkEventsHandler,
            p = n(13).SidebarHandler,
            h = n(14).ClipEventsHandler,
            f = n(15).DocumentEventsHandler;
        i.prototype.legacyInterface = function() {
            var e = function() {
                for (var e = 0; e < arguments.length; e++) {
                    var t = arguments[e];
                    if ("object" != typeof t && "string" != typeof t) return void this._handleError(new Error("Invalid argument: " + t + ", it must be a string or an object."));
                    var n = "string" == typeof t ? t : t.event,
                        i = "string" == typeof t ? null : t.data;
                    if (!this.hasOwnProperty(n)) return void this._handleError(new Error("Unknown action: " + n + ", please use this library according to the reference."));
                    this[n](i)
                }
            }.bind(this);
            null !== window._tracq && void 0 !== window._tracq && void 0 !== window._tracq.length && e.apply(null, window._tracq), window._tracq = {
                push: e
            }
        }, i.defaultWebConfiguration = function() {
            var e = n(16);
            return e
        }, t.Tracker = i
    }, function(e, t) {
        Function.prototype.bind || (Function.prototype.bind = function(e) {
            if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            var t = Array.prototype.slice.call(arguments, 1),
                n = this,
                i = function() {},
                a = function() {
                    return n.apply(this instanceof i ? this : e, t.concat(Array.prototype.slice.call(arguments)))
                };
            return this.prototype && (i.prototype = this.prototype), a.prototype = new i, a
        })
    }, function(e, t) {
        function n(e) {
            return "function" == typeof e && u.test(e)
        }

        function i(e, t, n) {
            var i = p(e);
            if (t && i)
                if (Array.prototype.forEach)
                    for (var a = -1, o = e.length, r = "object" == typeof n ? n : e; ++a < o && t.call(r, e[a], a, e) !== !1;);
                else Array.prototype.forEach.call(e, t, n);
            return e
        }

        function a(e, t, n) {
            var i = h(e);
            if (t && i) {
                var a = "object" == typeof n ? n : e;
                for (var o in e)
                    if (e.hasOwnProperty(o) && t.call(a, e[o], o, e) === !1) break
            }
            return e
        }

        function o(e, t) {
            return a(t, function(t, n) {
                e[n] = t
            }), e
        }

        function r(e) {
            if (h(e) && arguments.length > 1)
                for (var t = 1; t < arguments.length; t++) o(e, arguments[t]);
            return e
        }
        var s = Object.prototype.toString,
            l = s.call([]),
            c = String(s);
        c = c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), c = c.replace(/toString| for [^\]]+/g, ".*?");
        var u = new RegExp("^" + c + "$"),
            d = n(d = Array.isArray) && d,
            p = d || function(e) {
                return e && "object" == typeof e && "number" == typeof e.length && s.call(e) === l || !1
            },
            h = function(e) {
                return e && "object" == typeof e && !p(e)
            };
        e.exports.isObject = h, e.exports.isArray = p, e.exports.forEach = i, e.exports.forOwn = a, e.exports.extend = r
    }, function(e, t, n) {
        function i(e) {
            return function(t) {
                if (c.isArray(t)) {
                    var n = !0;
                    return c.forEach(t, function(t) {
                        return n = n && s(e, t)
                    }), n
                }
                return !1
            }
        }

        function a(e) {
            return /^\?(\w+)$/.test(e)
        }

        function o(e, t) {
            var n = /^[\?]?(\w+)$/.exec(t);
            return n && n[1] ? e[n[1]] : void 0
        }

        function r(e, t) {
            switch (e) {
                case "array":
                    return c.isArray(t);
                case "null":
                case "undefined":
                    return null === t || void 0 === t;
                case "arrayOfNumbers":
                    return p(t);
                default:
                    return typeof t === e
            }
        }

        function s(e, t, n) {
            var i;
            return a(n) && r("null", t) ? !0 : r("string", e) ? r(e, t) : "function" == typeof e ? !!e(t) : c.isArray(e) ? (i = !1, c.forEach(e, function(e, n) {
                return i = i || e === t, !i
            }), i) : c.isObject(e) && c.isObject(t) ? (i = !0, c.forOwn(e, function(e, n) {
                var a = o(t, n);
                return i = i && s(e, a, n)
            }), i) : !1
        }

        function l() {}
        var c = n(3),
            u = n(5),
            d = n(6),
            p = i("number");
        l.prototype.validate = function(e, t) {
            var n = c.extend({}, u, d);
            if (n.hasOwnProperty(e)) {
                var i = o(n, e);
                if (!s(i, t, e)) return {
                    action: e,
                    expect: i,
                    got: t
                }
            }
        }, e.exports.RequestValidator = l
    }, function(e, t) {
        e.exports = {
            webpageLoad: "null",
            streamScrolling: {
                index: "number"
            },
            documentShare: {
                revisionId: "string",
                publicationId: "string",
                publicationName: "string",
                ownerUsername: "string",
                service: "string"
            },
            documentDownload: {
                anonymous: "boolean",
                revisionId: "string",
                publicationId: "string",
                publicationName: "string",
                ownerUsername: "string"
            },
            streamDocumentLoad: {
                revisionId: "string",
                publicationId: "string",
                publicationName: "string",
                ownerUsername: "string",
                "?section": "string",
                "?adpageId": "string",
                pageNumber: "number",
                "?streamOrigin": "array",
                streamRanking: "number"
            },
            streamDocumentClick: {
                revisionId: "string",
                publicationId: "string",
                publicationName: "string",
                ownerUsername: "string",
                "?adpageId": "string",
                "?adpageToken": "string",
                "?streamOrigin": "array",
                streamRanking: "number",
                "?clickCoordinates": "string"
            },
            infoboxLoad: {
                infoboxId: "string",
                "?streamOrigin": "array",
                streamRanking: "number"
            },
            infoboxClick: {
                infoboxId: "string",
                link: "string",
                "?streamOrigin": "array",
                streamRanking: "number",
                "?clickCoordinates": "string"
            },
            curatedLoad: {
                source: "string",
                link: "string",
                ranking: "number"
            },
            curatedClick: {
                source: "string",
                link: "string",
                ranking: "number"
            },
            embedLoad: {
                revisionId: "string",
                publicationId: "string",
                publicationName: "string",
                ownerUsername: "string",
                embedId: "string"
            },
            embedClick: {
                revisionId: "string",
                publicationId: "string",
                publicationName: "string",
                ownerUsername: "string",
                embedId: "string"
            },
            streamAdRequest: {
                adProvider: "string",
                placement: "string",
                "?streamOrigin": "array",
                ranking: "number"
            },
            streamAdInserted: {
                adProvider: "string",
                placement: "string",
                "?streamOrigin": "array",
                ranking: "number",
                timespan: "number"
            },
            streamAdNotAvailable: {
                adProvider: "string",
                placement: "string",
                "?streamOrigin": "array",
                ranking: "number",
                timespan: "number"
            },
            streamAdImpression: {
                adProvider: "string",
                placement: "string",
                "?streamOrigin": "array",
                ranking: "number"
            }
        }
    }, function(e, t) {
        e.exports = {
            documentLoad: {
                revisionId: "string",
                publicationId: "string",
                publicationName: "string",
                ownerUsername: "string",
                pages: "arrayOfNumbers",
                pageNumber: "number",
                isFullscreen: "boolean",
                isEmbed: "boolean",
                "?embedId": "string",
                "?adpageId": "string",
                "?adpageToken": "string",
                "?streamOrigin": "array",
                "?streamRanking": "number"
            },
            documentUnLoad: "null",
            userInteracted: "null",
            pageChange: {
                pages: "arrayOfNumbers",
                pageNumber: "number"
            },
            zoom: "null",
            resize: {
                displaySize: "string",
                isFullscreen: "boolean"
            },
            linkClick: {
                url: "string",
                pageNumber: "number",
                linkPosition: "string"
            },
            watermarkClick: {
                url: "string"
            },
            ctaLoad: {
                type: "string",
                pageNumber: "number"
            },
            ctaClick: {
                type: "string",
                pageNumber: "number"
            },
            adpageLoad: {
                revisionId: "string",
                publicationId: "string",
                ownerUsername: "string",
                publicationName: "string",
                pageNumber: "number",
                adpageId: "string",
                absolutePosition: "number",
                relativePosition: "number"
            },
            adpageClick: {
                revisionId: "string",
                publicationId: "string",
                ownerUsername: "string",
                publicationName: "string",
                adpageId: "string",
                adpageToken: "string",
                absolutePosition: "number",
                relativePosition: "number"
            },
            relatedLoad: {
                revisionId: "string",
                publicationId: "string",
                ownerUsername: "string",
                publicationName: "string",
                pageNumber: "number",
                absolutePosition: "number",
                relativePosition: "number"
            },
            relatedClick: {
                revisionId: "string",
                publicationId: "string",
                ownerUsername: "string",
                publicationName: "string",
                absolutePosition: "number",
                relativePosition: "number"
            },
            moreContentDocumentShow: {
                revisionId: "string",
                publicationId: "string",
                ownerUsername: "string",
                publicationName: "string",
                pageNumber: "number",
                streamOrigin: "array",
                streamRanking: "number"
            },
            moreContentDocumentClick: {
                revisionId: "string",
                publicationId: "string",
                ownerUsername: "string",
                publicationName: "string",
                streamOrigin: "array",
                streamRanking: "number"
            },
            archiveLoad: {
                revisionId: "string",
                publicationId: "string",
                ownerUsername: "string",
                publicationName: "string",
                pageNumber: "number",
                absolutePosition: "number",
                relativePosition: "number"
            },
            archiveClick: {
                revisionId: "string",
                publicationId: "string",
                ownerUsername: "string",
                publicationName: "string",
                absolutePosition: "number",
                relativePosition: "number"
            },
            clippingLayer: {
                action: "string"
            },
            clippingComment: {
                onPage: "number",
                action: "string",
                clippingId: "string",
                commentId: "number",
                "?url": "string",
                creator: "string"
            },
            clippingAction: {
                clippingId: "string",
                action: "string",
                onPage: "number",
                creator: "string",
                "?url": "string",
                "?page": "number",
                "?service": "string",
                "?videoid": "string",
                "?opened_in_reader": "boolean"
            }
        }
    }, function(e, t, n) {
        function i(e, t, n, i) {
            this.wrapper = e, this.post = t, this.setTimeout = n, this.clearTimeout = i, this._postBatchedTimeoutId = void 0, this._batchedQueue = []
        }
        var a = n(3),
            o = 20,
            r = 2e3;
        i.prototype._queueLength = function() {
            return this._batchedQueue.length
        }, i.prototype._addToQueue = function(e) {
            var t = e.type;
            this._batchedQueue.push(a.extend(e, {
                version: "1.0.0",
                type: t
            }))
        }, i.prototype._startPostTimer = function() {
            void 0 === this._postBatchedTimeoutId && (this._postBatchedTimeoutId = this.setTimeout(function() {
                this._postBatchedTimeoutId = void 0, this._postAllQueued()
            }.bind(this), r))
        }, i.prototype._postAllQueued = function() {
            if (0 !== this._queueLength()) {
                void 0 !== this._postBatchedTimeoutId && (this.clearTimeout(this._postBatchedTimeoutId), this._postBatchedTimeoutId = void 0);
                var e = this.wrapper.getSignalWrapper("monitor");
                e.data = this._batchedQueue, this._batchedQueue = [], this.post(e)
            }
        }, i.prototype.monitor = function(e) {
            this._addToQueue(e), this._postAllQueued()
        }, i.prototype.monitorBatched = function(e) {
            this._addToQueue(e), this._queueLength() >= o ? this._postAllQueued() : this._startPostTimer()
        }, i.prototype.flush = function() {
            this._postAllQueued()
        }, i.prototype.handlers = function() {
            return {
                monitor: this.monitor,
                monitorBatched: this.monitorBatched,
                flush: this.flush
            }
        }, e.exports.MonitorHandler = i
    }, function(e, t) {
        function n(e, t) {
            this.wrapper = e, this.post = t
        }
        n.prototype.ignore = function(e) {
            var t = this.wrapper.getSignalWrapper("ignore");
            t.data = e, this.post(t)
        }, n.prototype.flush = function() {}, n.prototype.handlers = function() {
            return {
                ignore: this.ignore,
                flush: this.flush
            }
        }, e.exports.IgnoreHandler = n
    }, function(e, t) {
        function n(e) {
            this.origin = e
        }
        n.prototype.getSignalWrapper = function(e) {
            return {
                version: "2.2.0",
                origin: this.origin,
                type: e
            }
        }, e.exports.Wrapper = n
    }, function(e, t, n) {
        function i(e, t, n, i, a) {
            this.sectionsDocImpression = {}, this.wrapper = e, this.post = t, this.environment = n, this.setTimeout = i, this.clearTimeout = a
        }
        var a = n(3),
            o = 20,
            r = 1500;
        i.prototype.getSignalData = function(e) {
            return {
                version: "2.2.2",
                username: e ? null : this.environment.getUsername(),
                ui_language: this.environment.getLanguage(),
                location: this.environment.getLocation(),
                referrer: this.environment.getReferrer(),
                contexts: []
            }
        }, i.prototype.executePingbackIfPlatformHasChanged = function() {
            if (this.signal) {
                var e = !1,
                    t = this.getSignalData();
                a.forEach(["version", "username", "location", "referrer"], function(n) {
                    e = e || this.signal.data[n] !== t[n]
                }, this), e && this.executePingback()
            }
        }, i.prototype.isContextChanged = function() {
            var e = this.signal.data.contexts.length;
            return 0 === e ? !0 : this.signal.data.contexts[e - 1].browser_size !== this.environment.getBrowserSize() ? !0 : !1
        }, i.prototype.updateSignal = function(e) {
            if (this.executePingbackIfPlatformHasChanged(), this.signal = this.signal || this.wrapper.getSignalWrapper("website"), this.signal.data = this.signal.data || this.getSignalData(), this.isContextChanged() && this.signal.data.contexts.push({
                    browser_size: this.environment.getBrowserSize(),
                    events: []
                }), e) {
                var t = this.signal.data.contexts.length;
                this.signal.data.contexts[t - 1].events.push(e)
            }
        }, i.prototype.timeoutPingback = function() {
            this.timeoutId && (this.clearTimeout(this.timeoutId), this.timeoutId = void 0);
            for (var e = 0, t = this.signal.data.contexts.length - 1; t >= 0; t--) e += this.signal.data.contexts[t].events.length;
            e >= o ? this.executePingback() : this.timeoutId = this.setTimeout(this.executePingback.bind(this), r)
        }, i.prototype.executePingback = function() {
            this.timeoutId && (this.clearTimeout(this.timeoutId), this.timeoutId = void 0), this.signal && (this.post(this.signal), this.signal = void 0)
        }, i.prototype.generateAndExecuteAnonymousPingback = function(e) {
            var t = this.wrapper.getSignalWrapper("website");
            t.data = this.getSignalData(!0), t.data.contexts.push({
                browser_size: this.environment.getBrowserSize(),
                events: [e]
            }), this.post(t)
        }, i.prototype.webpageLoadHandler = function() {
            this.sectionsDocImpression = {};
            var e = {
                type: "webpage_load"
            };
            this.updateSignal(e), this.timeoutPingback()
        }, i.prototype.streamScrollingHandler = function(e) {
            var t = {
                type: "webpage_continuation",
                index: e.index
            };
            this.updateSignal(t), this.timeoutPingback()
        }, i.prototype.documentShareHandler = function(e) {
            var t = {
                type: "document_share",
                doc_id: e.revisionId + "-" + e.publicationId,
                doc_creator: e.ownerUsername.toLowerCase(),
                doc_name: e.publicationName.toLowerCase(),
                service: e.service
            };
            this.updateSignal(t), this.executePingback()
        }, i.prototype.documentDownloadHandler = function(e) {
            var t = {
                type: "document_download",
                doc_id: e.revisionId + "-" + e.publicationId,
                doc_creator: e.ownerUsername.toLowerCase(),
                doc_name: e.publicationName.toLowerCase()
            };
            e.anonymous && this.environment.username ? this.generateAndExecuteAnonymousPingback(t) : (this.updateSignal(t), this.timeoutPingback())
        }, i.prototype.getDocImpForSection = function(e) {
            return this.sectionsDocImpression[e] = this.sectionsDocImpression[e] || {}, this.sectionsDocImpression[e]
        }, i.prototype.streamDocumentLoadHandler = function(e) {
            if (e.section) {
                var t = this.getDocImpForSection(e.section),
                    n = e.publicationId;
                if (t[n]) return;
                t[n] = !0
            }
            var i = {
                type: "document_impression",
                doc_id: e.revisionId + "-" + e.publicationId,
                doc_creator: e.ownerUsername.toLowerCase(),
                doc_name: e.publicationName.toLowerCase(),
                ad_id: e.adpageId || null,
                page: e.pageNumber,
                stream_origin: e.streamOrigin || null,
                stream_ranking: e.streamRanking
            };
            this.updateSignal(i), this.timeoutPingback()
        }, i.prototype.streamDocumentClickHandler = function(e) {
            var t = {
                type: "document_click",
                doc_id: e.revisionId + "-" + e.publicationId,
                doc_creator: e.ownerUsername.toLowerCase(),
                doc_name: e.publicationName.toLowerCase(),
                ad_id: e.adpageId || null,
                ad_token: e.adpageToken || null,
                stream_origin: e.streamOrigin || null,
                stream_ranking: e.streamRanking,
                click_coordinates: e.clickCoordinates || null
            };
            this.updateSignal(t), this.executePingback()
        }, i.prototype.infoboxLoadHandler = function(e) {
            var t = {
                type: "infobox_impression",
                id: e.infoboxId,
                stream_origin: e.streamOrigin || null,
                stream_ranking: e.streamRanking
            };
            this.updateSignal(t), this.timeoutPingback()
        }, i.prototype.infoboxClickHandler = function(e) {
            var t = {
                type: "infobox_click",
                id: e.infoboxId,
                link: e.link,
                stream_origin: e.streamOrigin || null,
                stream_ranking: e.streamRanking,
                click_coordinates: e.clickCoordinates || null
            };
            this.updateSignal(t), this.executePingback()
        }, i.prototype.curatedLoadHandler = function(e) {
            var t = {
                type: "curated_impression",
                source: e.source,
                link: e.link,
                ranking: e.ranking
            };
            this.updateSignal(t), this.timeoutPingback()
        }, i.prototype.curatedClickHandler = function(e) {
            var t = {
                type: "curated_click",
                source: e.source,
                link: e.link,
                ranking: e.ranking
            };
            this.updateSignal(t), this.executePingback()
        }, i.prototype.embedLoadHandler = function(e) {
            var t = {
                type: "embed_impression",
                doc_id: e.revisionId + "-" + e.publicationId,
                doc_creator: e.ownerUsername.toLowerCase(),
                doc_name: e.publicationName.toLowerCase(),
                embed_id: e.embedId
            };
            this.updateSignal(t), this.executePingback()
        }, i.prototype.embedClickHandler = function(e) {
            var t = {
                type: "embed_click",
                doc_id: e.revisionId + "-" + e.publicationId,
                doc_creator: e.ownerUsername.toLowerCase(),
                doc_name: e.publicationName.toLowerCase(),
                embed_id: e.embedId
            };
            this.updateSignal(t), this.executePingback()
        }, i.prototype.streamAdRequestHandler = function(e) {
            var t = {
                type: "stream_ad_request",
                ad_provider: e.adProvider,
                placement: e.placement,
                stream_origin: e.streamOrigin,
                ranking: e.ranking
            };
            this.updateSignal(t), this.timeoutPingback()
        }, i.prototype.streamAdInsertedHandler = function(e) {
            var t = {
                type: "stream_ad_inserted",
                ad_provider: e.adProvider,
                placement: e.placement,
                stream_origin: e.streamOrigin,
                ranking: e.ranking,
                timespan: e.timespan
            };
            this.updateSignal(t), this.timeoutPingback()
        }, i.prototype.streamAdNotAvailableHandler = function(e) {
            var t = {
                type: "stream_ad_not_available",
                ad_provider: e.adProvider,
                placement: e.placement,
                stream_origin: e.streamOrigin,
                ranking: e.ranking,
                timespan: e.timespan
            };
            this.updateSignal(t), this.timeoutPingback()
        }, i.prototype.streamAdImpressionHandler = function(e) {
            var t = {
                type: "stream_ad_impression",
                ad_provider: e.adProvider,
                placement: e.placement,
                stream_origin: e.streamOrigin,
                ranking: e.ranking
            };
            this.updateSignal(t), this.timeoutPingback()
        }, i.prototype.flushHandler = function(e) {
            this.executePingback()
        }, i.prototype.handlers = function() {
            return {
                webpageLoad: this.webpageLoadHandler,
                streamScrolling: this.streamScrollingHandler,
                documentShare: this.documentShareHandler,
                documentDownload: this.documentDownloadHandler,
                streamDocumentLoad: this.streamDocumentLoadHandler,
                streamDocumentClick: this.streamDocumentClickHandler,
                infoboxLoad: this.infoboxLoadHandler,
                infoboxClick: this.infoboxClickHandler,
                curatedLoad: this.curatedLoadHandler,
                curatedClick: this.curatedClickHandler,
                embedLoad: this.embedLoadHandler,
                embedClick: this.embedClickHandler,
                streamAdRequest: this.streamAdRequestHandler,
                streamAdInserted: this.streamAdInsertedHandler,
                streamAdNotAvailable: this.streamAdNotAvailableHandler,
                streamAdImpression: this.streamAdImpressionHandler,
                flush: this.flushHandler
            }
        }, e.exports.WebsiteSignalHandler = i
    }, function(e, t, n) {
        function i(e) {
            return {
                version: "1.3.3",
                username: e.getUsername(),
                ui_language: e.getLanguage(),
                location: e.getLocation(),
                referrer: e.getReferrer(),
                source: e.getSource(),
                contexts: []
            }
        }

        function a(e, t) {
            var n = e.data.contexts.length;
            if (0 === n) return !0;
            var i = !1,
                a = ["doc_id", "doc_creator", "doc_name", "ad_id", "ad_token", "embed_id", "display_size", "stream_origin", "stream_ranking"];
            return r.forEach(a, function(a) {
                i = i || e.data.contexts[n - 1][a] !== t[a]
            }, this), i = i || e.data.contexts[n - 1].pages.toString() !== t.pages.toString()
        }

        function o(e, t, n, i, a, o, r) {
            this.handleError = e, this.wrapper = t, this.post = n, this.environment = i, this.setTimeout = a, this.clearTimeout = o, this.nagleTimeout = r
        }
        var r = n(3),
            s = 20;
        o.prototype.initializeModel = function(e) {
            this.model = {
                doc_id: e.revisionId + "-" + e.publicationId,
                doc_creator: e.ownerUsername.toLowerCase(),
                doc_name: e.publicationName.toLowerCase(),
                pages: e.pages,
                pageNumber: e.pageNumber,
                ad_id: e.adpageId || null,
                ad_token: e.adpageToken || null,
                is_embed: e.isEmbed,
                embed_id: e.embedId || null,
                display_size: e.displaySize || this.environment.getBrowserSize(),
                is_fullscreen: e.isFullscreen,
                stream_origin: e.streamOrigin || null,
                stream_ranking: e.streamRanking,
                user_interacted: !1
            }
        }, o.prototype.clearModel = function() {
            this.executePingback(), this.model = void 0
        }, o.prototype.updateModel = function(e) {
            this.model ? (this.model.pages = e.pages || this.model.pages, this.model.display_size = e.displaySize || this.model.display_size, this.model.is_fullscreen = e.isFullscreen || this.model.is_fullscreen, this.model.user_interacted = e.userInteracted || this.model.user_interacted, void 0 !== e.isFullscreen && (this.model.is_fullscreen = e.isFullscreen)) : this.handleError(new Error("reader pingback handler - update model - no model."))
        }, o.prototype.executePingbackIfPlatformHasChanged = function() {
            if (this.signal) {
                var e = !1,
                    t = i(this.environment);
                r.forEach(["version", "username", "location", "referrer", "source"], function(n) {
                    e = e || this.signal.data[n] !== t[n]
                }, this), e && this.executePingback()
            }
        }, o.prototype.viewportHasUserAttention = function() {
            return this.model ? !this.model.is_embed || this.model.is_fullscreen || this.model.user_interacted : void this.handleError(new Error("reader pingback handler - viewportHasUserAttention - no model."))
        }, o.prototype.updateSignal = function(e) {
            if (!this.model) return void this.handleError(new Error("reader pingback handler - update signal - no model."));
            if (this.executePingbackIfPlatformHasChanged(), this.signal = this.signal || this.wrapper.getSignalWrapper("reader"), this.signal.data = this.signal.data || i(this.environment), a(this.signal, this.model) && this.signal.data.contexts.push({
                    doc_id: this.model.doc_id,
                    doc_creator: this.model.doc_creator,
                    doc_name: this.model.doc_name,
                    pages: this.model.pages,
                    ad_id: this.model.ad_id,
                    ad_token: this.model.ad_token,
                    embed_id: this.model.embed_id,
                    display_size: this.model.display_size,
                    display_state: null,
                    stream_origin: this.model.stream_origin,
                    stream_ranking: this.model.stream_ranking,
                    events: []
                }), e) {
                var t = this.signal.data.contexts.length;
                t > 0 ? this.signal.data.contexts[t - 1].events.push(e) : this.handleError(new Error("reader pingback handler context length invalid."))
            }
        }, o.prototype.getCurrentPages = function() {
            return this.model ? this.model.pages : void this.handleError(new Error("reader pingback handler - get current pages - no model."))
        }, o.prototype.timeoutPingback = function() {
            if (this.signal) {
                this.timeoutId && (this.clearTimeout(this.timeoutId), this.timeoutId = void 0);
                for (var e = 0, t = this.signal.data.contexts.length - 1; t >= 0; t--) e += this.signal.data.contexts[t].events.length;
                e >= s ? this.executePingback() : this.timeoutId = this.setTimeout(this.executePingback.bind(this), this.nagleTimeout)
            }
        }, o.prototype.executePingback = function() {
            this.timeoutId && (this.clearTimeout(this.timeoutId), this.timeoutId = void 0), this.signal && (this.post(this.signal), this.signal = void 0)
        }, e.exports.ReaderSignalHandler = o
    }, function(e, t) {
        function n(e) {
            var t = {
                type: "link_click",
                page: e.pageNumber,
                url: e.url,
                link_position: e.linkPosition
            };
            this.readerSignalHandler.updateSignal(t), this.readerSignalHandler.executePingback()
        }

        function i(e) {
            var t = {
                type: "watermark_click",
                url: e.url
            };
            this.readerSignalHandler.updateSignal(t), this.readerSignalHandler.executePingback()
        }

        function a(e) {
            var t = {
                type: "ad_cta_impression",
                cta_type: e.type,
                page: e.pageNumber
            };
            this.readerSignalHandler.updateSignal(t), this.readerSignalHandler.timeoutPingback()
        }

        function o(e) {
            var t = {
                type: "ad_cta_click",
                cta_type: e.type,
                page: e.pageNumber
            };
            this.readerSignalHandler.updateSignal(t), this.readerSignalHandler.executePingback()
        }

        function r(e) {}

        function s(e) {
            this.readerSignalHandler = e
        }
        s.prototype.handlers = function() {
            return {
                linkClick: n,
                watermarkClick: i,
                ctaLoad: a,
                ctaClick: o,
                flush: r
            }
        }, e.exports.LinkEventsHandler = s
    }, function(e, t) {
        function n(e) {
            var t = {
                type: "sidebar_ad_impression",
                doc_id: e.revisionId + "-" + e.publicationId,
                doc_creator: e.ownerUsername.toLowerCase(),
                doc_name: e.publicationName.toLowerCase(),
                page: e.pageNumber,
                ad_id: e.adpageId,
                absolute_position: e.absolutePosition,
                relative_position: e.relativePosition
            };
            this.readerSignalHandler.updateSignal(t), this.readerSignalHandler.timeoutPingback()
        }

        function i(e) {
            var t = {
                type: "sidebar_ad_click",
                doc_id: e.revisionId + "-" + e.publicationId,
                doc_creator: e.ownerUsername.toLowerCase(),
                doc_name: e.publicationName.toLowerCase(),
                ad_id: e.adpageId,
                token: e.adpageToken,
                absolute_position: e.absolutePosition,
                relative_position: e.relativePosition
            };
            this.readerSignalHandler.updateSignal(t), this.readerSignalHandler.executePingback()
        }

        function a(e) {
            var t = {
                type: "sidebar_related_impression",
                doc_id: e.revisionId + "-" + e.publicationId,
                doc_creator: e.ownerUsername.toLowerCase(),
                doc_name: e.publicationName.toLowerCase(),
                page: e.pageNumber,
                absolute_position: e.absolutePosition,
                relative_position: e.relativePosition
            };
            this.readerSignalHandler.updateSignal(t), this.readerSignalHandler.timeoutPingback()
        }

        function o(e) {
            var t = {
                type: "sidebar_related_click",
                doc_id: e.revisionId + "-" + e.publicationId,
                doc_creator: e.ownerUsername.toLowerCase(),
                doc_name: e.publicationName.toLowerCase(),
                absolute_position: e.absolutePosition,
                relative_position: e.relativePosition
            };
            this.readerSignalHandler.updateSignal(t), this.readerSignalHandler.executePingback()
        }

        function r(e) {
            var t = {
                type: "more_content_document_impression",
                doc_id: e.revisionId + "-" + e.publicationId,
                doc_creator: e.ownerUsername.toLowerCase(),
                doc_name: e.publicationName.toLowerCase(),
                page: e.pageNumber,
                stream_origin: e.streamOrigin,
                stream_ranking: e.streamRanking
            };
            this.readerSignalHandler.updateSignal(t), this.readerSignalHandler.timeoutPingback()
        }

        function s(e) {
            var t = {
                type: "more_content_document_click",
                doc_id: e.revisionId + "-" + e.publicationId,
                doc_creator: e.ownerUsername.toLowerCase(),
                doc_name: e.publicationName.toLowerCase(),
                stream_origin: e.streamOrigin,
                stream_ranking: e.streamRanking
            };
            this.readerSignalHandler.updateSignal(t), this.readerSignalHandler.executePingback()
        }

        function l(e) {
            var t = {
                type: "sidebar_archive_impression",
                doc_id: e.revisionId + "-" + e.publicationId,
                doc_creator: e.ownerUsername.toLowerCase(),
                doc_name: e.publicationName.toLowerCase(),
                page: e.pageNumber,
                absolute_position: e.absolutePosition,
                relative_position: e.relativePosition
            };
            this.readerSignalHandler.updateSignal(t), this.readerSignalHandler.timeoutPingback()
        }

        function c(e) {
            var t = {
                type: "sidebar_archive_click",
                doc_id: e.revisionId + "-" + e.publicationId,
                doc_creator: e.ownerUsername.toLowerCase(),
                doc_name: e.publicationName.toLowerCase(),
                absolute_position: e.absolutePosition,
                relative_position: e.relativePosition
            };
            this.readerSignalHandler.updateSignal(t), this.readerSignalHandler.executePingback()
        }

        function u(e) {}

        function d(e) {
            this.readerSignalHandler = e
        }
        d.prototype.handlers = function() {
            return {
                adpageLoad: n,
                adpageClick: i,
                relatedLoad: a,
                relatedClick: o,
                archiveLoad: l,
                archiveClick: c,
                moreContentDocumentShow: r,
                moreContentDocumentClick: s,
                flush: u
            }
        }, e.exports.SidebarHandler = d
    }, function(e, t) {
        function n(e) {
            var t = {
                type: "clipping_layer",
                action: e.action
            };
            this.readerHandler.updateSignal(t), this.readerHandler.timeoutPingback()
        }

        function i(e) {
            var t = {
                type: "clipping_action",
                clippingId: e.clippingId,
                action: e.action,
                on_page: e.onPage,
                creator: e.creator,
                url: e.url,
                page: e.page,
                service: e.service,
                videoid: e.videoid,
                opened_in_reader: e.opened_in_reader
            };
            this.readerHandler.updateSignal(t), this.readerHandler.timeoutPingback()
        }

        function a(e) {
            var t = {
                type: "clipping_comment",
                clippingId: e.clippingId,
                commentId: e.commentId,
                action: e.action,
                on_page: e.onPage,
                creator: e.creator,
                url: e.url
            };
            this.readerHandler.updateSignal(t), this.readerHandler.timeoutPingback()
        }

        function o(e) {}

        function r(e) {
            this.readerHandler = e
        }
        r.prototype.handlers = function() {
            return {
                clippingLayer: n,
                clippingAction: i,
                clippingComment: a,
                flush: o
            }
        }, e.exports.ClipEventsHandler = r
    }, function(e, t) {
        function n(e, t, n) {
            this.readerSignalHandler = e, this.setTimeout = t, this.clearTimeout = n, this.eventsAfterDocumentRead = [], this.documentReadTimeoutId = void 0, this.documentReadTriggered = !1, this.pageReadLastPages = null, this.pageReadStartTime = null, this.pageReadLastEndTime = null, this.delays = null, this.pageReadTimeTimeoutId = void 0, this.idleTimeoutId = void 0
        }
        var i = 2e3,
            a = 6e5,
            o = [2e3, 3e3, 4e3, 6e3, 8e3, 12e3];
        n.prototype.setUpPageReadTimers = function() {
            this.delays = o.slice(0), this.pageReadStartTime = this.pageReadLastEndTime = (new Date).getTime(), this.startPageReadTimer()
        }, n.prototype.startPageReadTimer = function() {
            this.pageReadTimeTimeoutId = this.setTimeout(function() {
                this.pageReadTimeTimeoutId = void 0, this.trackPageReadTime(), this.startPageReadTimer()
            }.bind(this), this.getNextPageReadTimeout())
        }, n.prototype.startIdleTimer = function() {
            this.idleTimeoutId = this.setTimeout(function() {
                this.idleTimeoutId = void 0, void 0 !== this.pageReadTimeTimeoutId && (this.clearTimeout(this.pageReadTimeTimeoutId), this.pageReadTimeTimeoutId = void 0, this.trackPageReadTime())
            }.bind(this), a)
        }, n.prototype.resetIdleTimer = function() {
            void 0 !== this.idleTimeoutId ? (this.clearTimeout(this.idleTimeoutId), this.idleTimeoutId = void 0) : this.readerSignalHandler.viewportHasUserAttention() && (this.pageReadLastEndTime = (new Date).getTime(), this.delays ? this.startPageReadTimer() : this.setUpPageReadTimers()), this.startIdleTimer()
        }, n.prototype.clearTimers = function() {
            void 0 !== this.idleTimeoutId && (this.clearTimeout(this.idleTimeoutId), this.idleTimeoutId = void 0), void 0 !== this.pageReadTimeTimeoutId && (this.clearTimeout(this.pageReadTimeTimeoutId), this.pageReadTimeTimeoutId = void 0, this.trackPageReadTime()), void 0 !== this.documentReadTimeoutId && (this.clearTimeout(this.documentReadTimeoutId), this.documentReadTimeoutId = void 0)
        }, n.prototype.getNextPageReadTimeout = function() {
            var e = this.delays.shift();
            if (isNaN(e)) {
                var t = o.length;
                return o[t - 1] + .2 * ((new Date).getTime() - this.pageReadStartTime)
            }
            return e
        }, n.prototype.trackDocumentImpression = function(e) {
            var t = {
                type: "document_impression"
            };
            this.readerSignalHandler.updateSignal(t), this.readerSignalHandler.timeoutPingback()
        }, n.prototype.trackDocumentRead = function() {
            for (; this.eventsAfterDocumentRead.length > 0;) this.readerSignalHandler.updateSignal(this.eventsAfterDocumentRead.shift());
            var e = {
                type: "document_read"
            };
            this.readerSignalHandler.updateSignal(e), this.readerSignalHandler.executePingback(), this.documentReadTriggered = !0, this.documentReadTimeoutId = void 0
        }, n.prototype.trackPageImpression = function(e) {
            for (var t in e.pages) {
                var n = {
                    type: "page_impression",
                    page: e.pages[t]
                };
                this.readerSignalHandler.updateSignal(n)
            }
            this.readerSignalHandler.timeoutPingback()
        }, n.prototype.maybeTrackPageRead = function() {
            var e = this.readerSignalHandler.getCurrentPages(),
                t = JSON.stringify(e);
            if (this.pageReadLastPages !== t) {
                this.pageReadLastPages = t;
                for (var n in e) {
                    var i = {
                        type: "page_read",
                        page: e[n]
                    };
                    this.documentReadTriggered ? this.readerSignalHandler.updateSignal(i) : this.eventsAfterDocumentRead.push(i)
                }
                this.readerSignalHandler.timeoutPingback()
            }
        }, n.prototype.trackPageReadTime = function() {
            var e = (new Date).getTime(),
                t = this.readerSignalHandler.getCurrentPages(),
                n = Math.floor((e - this.pageReadLastEndTime) / t.length);
            if (!(0 >= n)) {
                for (var i in t) {
                    var a = {
                        type: "page_read_time",
                        time_increment: n,
                        page: t[i]
                    };
                    this.documentReadTriggered ? this.readerSignalHandler.updateSignal(a) : this.eventsAfterDocumentRead.push(a)
                }
                this.pageReadLastEndTime = e, this.readerSignalHandler.timeoutPingback()
            }
        }, n.prototype.maybeStartDocumentReadTimer = function() {
            void 0 !== this.documentReadTimeoutId || this.documentReadTriggered || (this.documentReadTimeoutId = this.setTimeout(function() {
                this.trackDocumentRead()
            }.bind(this), i))
        }, n.prototype.documentLoad = function(e) {
            this.clearTimers(), this.eventsAfterDocumentRead = [], this.readerSignalHandler.initializeModel(e), this.trackDocumentImpression(e), this.trackPageImpression(e), this.readerSignalHandler.viewportHasUserAttention() && (this.maybeStartDocumentReadTimer(), this.maybeTrackPageRead(), this.setUpPageReadTimers()), this.startIdleTimer()
        }, n.prototype.documentUnLoad = function(e) {
            this.flush(), this.readerSignalHandler.clearModel()
        }, n.prototype.userInteracted = function() {
            this.readerSignalHandler.updateModel({
                userInteracted: !0
            }), this.resetIdleTimer(), this.readerSignalHandler.viewportHasUserAttention() && (this.maybeStartDocumentReadTimer(), this.maybeTrackPageRead(), this.setUpPageReadTimers()), void 0 !== this.documentReadTimeoutId && (this.clearTimeout(this.documentReadTimeoutId), this.documentReadTimeoutId = void 0, this.trackDocumentRead())
        }, n.prototype.pageChange = function(e) {
            this.resetIdleTimer(), void 0 !== this.documentReadTimeoutId && (this.clearTimeout(this.documentReadTimeoutId), this.documentReadTimeoutId = void 0, this.trackDocumentRead()), void 0 !== this.pageReadTimeTimeoutId && (this.clearTimeout(this.pageReadTimeTimeoutId), this.pageReadTimeTimeoutId = void 0, this.trackPageReadTime()), this.readerSignalHandler.updateModel(e), this.trackPageImpression(e), this.readerSignalHandler.viewportHasUserAttention() && (this.maybeTrackPageRead(), this.setUpPageReadTimers())
        }, n.prototype.zoom = function(e) {
            this.resetIdleTimer()
        }, n.prototype.resize = function(e) {
            this.resetIdleTimer(), this.readerSignalHandler.updateModel(e), this.readerSignalHandler.viewportHasUserAttention() ? (this.maybeStartDocumentReadTimer(), void 0 === this.pageReadTimeTimeoutId && this.setUpPageReadTimers(), this.maybeTrackPageRead()) : (this.documentReadTimeoutId && (this.clearTimeout(this.documentReadTimeoutId), this.documentReadTimeoutId = void 0), this.pageReadTimeTimeoutId && (this.clearTimeout(this.pageReadTimeTimeoutId), this.pageReadTimeTimeoutId = void 0, this.trackPageReadTime()))
        }, n.prototype.flush = function(e) {
            this.clearTimers(), this.eventsAfterDocumentRead = [], this.readerSignalHandler.executePingback()
        }, n.prototype.handlers = function() {
            return {
                documentLoad: this.documentLoad,
                documentUnLoad: this.documentUnLoad,
                userInteracted: this.userInteracted,
                pageChange: this.pageChange,
                zoom: this.zoom,
                resize: this.resize,
                flush: this.flush
            }
        }, e.exports.DocumentEventsHandler = n
    }, function(e, t) {
        function n(e, t, n) {
            var i = "//" + p + e;
            n = "string" == typeof n ? n : JSON.stringify(n), window.fetch ? window.fetch(i, {
                method: "post",
                headers: t,
                credentials: "include",
                body: n
            })["catch"](function(t) {
                console.log("frontend-tracking POST to " + p + e + " failed:", t)
            }) : window.jQuery && window.jQuery.ajax && window.jQuery.ajax({
                type: "POST",
                url: i,
                data: n,
                crossDomain: !0,
                headers: t,
                xhrFields: {
                    withCredentials: !0
                }
            }).fail(function(t) {
                console.log("frontend-tracking POST to " + p + e + " failed:", t)
            })
        }

        function i(e) {
            var t = window.Raven;
            t && t.captureException ? t.captureException(e) : console.error(e)
        }

        function a() {
            var e = /site\.model\.username=([^;$]+)/,
                t = document.cookie.match(e);
            return t && t.length >= 2 ? t[1] : null
        }

        function o() {
            return window.innerWidth ? window.innerWidth : window.document.documentElement && window.document.documentElement.clientWidth ? window.document.documentElement.clientWidth : window.document.body ? window.document.body.clientWidth : 0
        }

        function r() {
            return window.innerHeight ? window.innerHeight : window.document.documentElement && window.document.documentElement.clientHeight ? window.document.documentElement.clientHeight : window.document.body ? window.document.body.clientHeight : 0;
        }

        function s() {
            return window.location.href.toString()
        }

        function l() {
            return window.document.referrer || null
        }

        function c() {
            return -1 !== (window.document.referrer || "").indexOf("issuu.com") ? "internal" : "external"
        }

        function u() {
            return "web"
        }

        function d() {
            return document.documentElement.lang || null
        }
        var p;
        p = __issuuConfig && __issuuConfig.production && "issuu" === __issuuConfig.tracking.settings ? "pingback.issuu.com" : "pingback.tissuu.com", e.exports = {
            post: n,
            handleError: i,
            getWidth: o,
            getHeight: r,
            getUsername: a,
            getLocation: s,
            getReferrer: l,
            getSource: c,
            getLanguage: d,
            getOrigin: u,
            setTimeout: function(e, t) {
                return window.setTimeout(e, t)
            },
            clearTimeout: function(e) {
                return window.clearTimeout(e)
            },
            setInterval: function(e, t) {
                return window.setInterval(e, t)
            },
            clearInterval: function(e) {
                return window.clearInterval(e)
            },
            nagleTimeout: 1500
        }
    }])
}, function(e, t, n) {
    function i() {
        var e = [];
        try {
            e = JSON.parse(localStorage.getItem(l))
        } catch (t) {
            return []
        }
        return e instanceof Array ? e : []
    }

    function a(e) {
        c.broadcast(c.events.monitorEvent, {
            type: "fe-widgets.header." + e
        })
    }

    function o() {
        var e = i();
        e.forEach(a);
        try {
            localStorage.setItem(l, JSON.stringify([]))
        } catch (t) {
            return
        }
    }

    function r(e) {
        var t = i();
        t.push(e);
        try {
            localStorage.setItem(l, JSON.stringify(t))
        } catch (n) {
            return
        }
    }

    function s(e, t) {
        a(e), window.setTimeout(t, 250)
    }
    var l = "fe-widgets/header.tracking",
        c = n(2);
    n(31), e.exports = {
        processRecordedEvents: o,
        trackInternalPageNavigation: r,
        trackExternalPageNavigation: s
    }
}, function(e, t, n) {
    var i = n(2),
        a = n(5),
        o = n(22),
        r = n(15);
    t.create = function(e) {
        function t() {
            s.imgHeight = function() {
                var e;
                return e = s.content.height && s.content.width ? Math.round(s.content.height / s.content.width * s.width) : 0
            }()
        }
        var s = n(11).create(e);
        s.content.description = s.content.description || "", s.content.title = s.content.title || "", s.publicationUrl = function() {
            return a.relative.publicationUrl(s.content.ownerUsername, s.content.publicationName)
        }(), s.coverImage = function() {
            return a.pageLargeThumbUrl(s.content.publicationId, s.content.revisionId)
        }(), s.isGoodDescription = function() {
            return o.isGoodDescription(s.content.description, s.content.title)
        }(), s.shortDescription = function() {
            return o.getShortDescription(s.content.description)
        }();
        var l = s.setWidth;
        s.setWidth = function(e) {
            l(e), t()
        };
        var c = s.didInsertElement;
        return s.didInsertElement = function() {
            c();
            var e = s.getDomElement();
            if (e) {
                i.broadcast(r.DOCCREATED, s.id, {
                    publicationId: s.content.publicationId,
                    revisionId: s.content.revisionId,
                    ownerUsername: s.content.ownerUsername,
                    publicationName: s.content.publicationName,
                    page: 1,
                    origin: s.origin,
                    ranking: s.flatIndex,
                    x: e.offset().left,
                    y: e.offset().top,
                    height: s.getHeight(),
                    width: s.getWidth()
                });
                var t = e.find("a img");
                t.one("load", function(e) {
                    i.broadcast(r.DOCLOADED, s.id), t.off("error")
                }), t.one("error", function(e) {
                    i.broadcast(r.DOCERROR, {
                        publicationId: s.content.publicationId,
                        url: s.coverImage
                    }), t.off("load")
                }), t.parent("a").on("click", function(e) {
                    i.broadcast(r.DOCCLICKED, s.id, {
                        publicationId: s.content.publicationId,
                        url: $(e.currentTarget).attr("href"),
                        clickX: e.clientX,
                        clickY: e.clientY
                    }), i.broadcast(i.events.streamDocumentClicked, {
                        title: s.content.title,
                        event: e
                    })
                })
            }
        }, t(), s
    }
}, function(e, t, n) {
    function i() {
        var e = !1,
            t = new m(window.location.href).getQueryParamValue("streamAd"),
            n = u.getCookie("streamAd");
        return v.indexOf(t) > -1 && (e = t), v.indexOf(n) > -1 && (e = n), e
    }

    function a() {
        return i() !== !1
    }

    function o() {
        var e, t = h && v.indexOf(h.defaultProvider) > -1 && h.defaultProvider;
        return t = i() || t, f && f[t] && (e = f[t]), d.log("ads", "streamAd", "Debug provider:", i(), "Final provider:", t), e
    }

    function r(e) {
        return e && h && h.providerConfigs && h.providerConfigs[e] || {}
    }

    function s() {
        return h
    }

    function l(e, t) {
        u = e.cookie, d = e.logger, p = e.serverData, f = e.adProviders, h = p.get("adsConfig") && p.get("adsConfig").stream, d.log("ads", "streamAd", "available adsConfig", h)
    }

    function c(e) {
        if (a()) return !0;
        if (!g.isAllowedExternally(e)) return d.log("ads", "streamAd", 'no show b/c external "allowed" rule'), !1;
        if (g.isBot()) return d.log("ads", "streamAd", "no show b/c bot rule"), !1;
        if (!g.hasAdsConfig(h)) return d.log("ads", "streamAd", "no show b/c adsConfig is undefined"), !1;
        if (e.isFlashReader) {
            if (!g.isInFlashAudience(h)) return d.log("ads", "streamAd", "no show b/c Flash ratio rule. Ratio:", h.audienceRatioFlash), !1
        } else if (!g.isInHtmlAudience(h)) return d.log("ads", "streamAd", "no show b/c HTML5 ratio rule. Ratio:", h.audienceRatioHtml), !1;
        return d.log("ads", "streamAd", "will show"), !0
    }
    var u, d, p, h, f, m = n(52),
        g = n(152),
        v = ["dfp"];
    e.exports = {
        init: l,
        willShow: c,
        getAdProviderConfig: r,
        getAdsConfig: s,
        getAdProvider: o
    }
}, function(e, t, n) {
    function i() {
        return a ? !1 : ($("body, .overlay-box").on("click", ".follow-actions .follow", function(e) {
            function t() {
                setTimeout(function() {
                    n.removeClass("in-progress").removeClass("status-nofollow").addClass("status-follow")
                }, 1500)
            }
            e.stopPropagation(), e.preventDefault();
            var n = $(this).closest(".follow-actions");
            if (!r.isLoggedIn()) return void s.broadcast(s.events.userRequestLogin);
            if (n.hasClass("in-progress")) return !1;
            var i = n.attr("data-type"),
                a = n.attr("data-id");
            n.addClass("in-progress"), "user" === i ? $.when(o.toggleSubscription("publisher", a, !0)).done(t) : "stack" === i && $.when(o.toggleSubscription("stack", a, !0)).done(t)
        }), $("body, .overlay-box").on("click", ".follow-actions .following", function(e) {
            function t() {
                setTimeout(function() {
                    n.removeClass("in-progress").removeClass("status-follow").addClass("status-nofollow")
                }, 1500)
            }
            e.stopPropagation(), e.preventDefault();
            var n = $(this).closest(".follow-actions");
            if (!r.isLoggedIn()) return void s.broadcast(s.events.userRequestLogin);
            if (n.hasClass("in-progress")) return !1;
            var i = n.attr("data-type"),
                a = n.attr("data-id");
            n.addClass("in-progress"), "user" === i ? $.when(o.toggleSubscription("publisher", a, !1)).done(t) : "stack" === i && $.when(o.toggleSubscription("stack", a, !1)).done(t)
        }), void(a = !0))
    }
    var a, o = n(45),
        r = n(4),
        s = n(2),
        l = n(104);
    t.create = function(e) {
        var t = l(e);
        return i(), t
    }
}, function(e, t, n) {
    function i(e) {
        var n = e || {};
        n = _.defaults(n, {
            headerText: i18n.t("signinWidget.titleNeedLogin"),
            createAccountReturnUrl: location.href,
            authReason: n.authReason
        }), t.showSignin(n)
    }

    function a(e) {
        e = e || {}, l.show(c.getOverlay(e), "forward")
    }

    function o(e) {
        e = e || {}, l.show(s.getOverlay(e), "backward")
    }

    function r() {
        l.close()
    }
    var s = n(373),
        l = n(23),
        c = n(374),
        u = (n(4), n(2));
    u.subscribe(u.events.userRequestLogin, i), t.showSignin = a, t.showForgotPassword = o, t.closeSigninOverlay = r
}, function(e, t, n) {
    var i = n(5);
    t.create = function(e) {
        function t(e) {
            return void 0 !== u[e] ? u[e] : ""
        }

        function n(e, t) {
            u[e] = t
        }

        function a() {
            u.selected = !0
        }

        function o() {
            u.selected = !1
        }

        function r() {
            u.selected = !u.selected
        }

        function s() {
            return u.selected
        }

        function l(e, t) {
            var n = _.take(u.documents, e);
            if (t)
                for (var a = e - n.length; 0 !== a--;) n.push(null);
            return n = _.map(n, function(e, t) {
                var n = {
                    num: t
                };
                return e && (n.coverUrl = i.pageLargeThumbUrl(e.publicationId, e.revisionId)), n
            })
        }

        function c() {
            return i.userStacksUrl(u.ownerUsername, u.id)
        }
        var u = {},
            d = e || {};
        return function() {
            u.selected = d.selected || !1, u.id = d.id || d.stackId, u.name = d.name || d.title || d.stackName, u.description = d.description || "", u.docCount = d.docCount || d.items || d.numPublications || 0, u.subscriberCount = d.subscriberCount || d.numSubscribers || 0, u.secret = d.secret || "private" === d.access, u.created = "object" == typeof d.created ? d.created : new Date(d.created), u.documents = d.documents || d.topDocuments || [], u.ownerUsername = d.ownerUsername || "", u.ownerDisplayName = d.ownerDisplayName || u.ownerUsername
        }(), {
            get: t,
            set: n,
            select: a,
            deselect: o,
            toggleSelection: r,
            isSelected: s,
            getPublications: l,
            getUrl: c,
            getRawData: function() {
                return u
            }
        }
    }
}, function(e, t) {
    "use strict";
    e.exports = {
        ads: {
            DFP: {
                blacklist: {
                    continents: [],
                    countries: []
                },
                interval: 1
            }
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = n(88),
        a = n(34);
    t.create = function(e) {
        function t() {
            m = []
        }

        function n(e) {
            m.unshift(p(e))
        }

        function o(t) {
            var n = m[0];
            e(i.event.DOWN, {
                event: t,
                startX: n.x,
                startY: n.y
            })
        }

        function r(t) {
            var n = m[m.length - 1],
                a = m[0],
                o = m.length > 1 ? m[1] : a;
            e(i.event.SCROLL, {
                event: t,
                startX: n.x,
                startY: n.y,
                endX: a.x,
                endY: a.y,
                distanceX: a.x - o.x,
                distanceY: a.y - o.y,
                direction: h(m)
            })
        }

        function s(t) {
            if (0 !== m.length) {
                var n = m[m.length - 1],
                    a = m[0],
                    o = f(m, function(e, t) {
                        return Math.abs(e.time - t.time) >= 50
                    });
                o || (o = a);
                var r = Math.max(1, a.time - o.time),
                    s = Math.sqrt(Math.pow(a.x - o.x, 2) + Math.pow(a.y - o.y, 2)),
                    l = s / r,
                    c = (a.x - o.x) / r,
                    u = (a.y - o.y) / r;
                l > 20 && (l = .41), l > .4 ? e(i.event.FLING, {
                    event: t,
                    startX: n.x,
                    startY: n.y,
                    endX: a.x,
                    endY: a.y,
                    distanceX: a.x - o.x,
                    distanceY: a.y - o.y,
                    velocityX: c,
                    velocityY: u,
                    direction: h(m),
                    duration: r,
                    velocity: l,
                    distance: s
                }) : e(i.event.UP, {
                    event: t,
                    startX: n.x,
                    startY: n.y,
                    endX: a.x,
                    endY: a.y,
                    direction: h(m)
                })
            }
        }

        function l() {
            g = !0
        }

        function c() {
            g = !1
        }

        function u() {
            return g
        }

        function d() {
            return m.length > 0
        }

        function p(e) {
            var t = 0,
                n = 0;
            if (e.touches) {
                var i, o = e.touches.length;
                for (i = 0; o > i; i++) t += e.touches[i].pageX, n += e.touches[i].pageY;
                t /= o, n /= o
            } else t = e.pageX, n = e.pageY;
            return {
                x: t,
                y: n,
                time: a.now()
            }
        }

        function h(e) {
            var t = e[0],
                n = f(e, function(e, t) {
                    return Math.abs(e.x - t.x) > 15 || Math.abs(e.y - t.y) > 15
                });
            return n ? Math.abs(n.y - t.y) > 2 * Math.abs(n.x - t.x) ? n.y > t.y ? i.direction.UP : i.direction.DOWN : Math.abs(n.x - t.x) > 3.5 * Math.abs(n.y - t.y) ? n.x > t.x ? i.direction.LEFT : i.direction.RIGHT : i.direction.OTHER : i.direction.UNKNOWN
        }

        function f(e, t) {
            var n = e.length;
            if (!(1 >= n)) {
                var i, a, o = e[0];
                for (i = 1; n > i && (a = e[i], !t(o, a)); i++);
                return a
            }
        }
        var m = [],
            g = !0;
        return {
            attachEventHandlers: $.noop,
            removeEventHandlers: $.noop,
            clearPositions: t,
            addNewPosition: n,
            fireDownEvent: o,
            fireScrollEvent: r,
            fireUpOrFlingEvent: s,
            activate: l,
            deactivate: c,
            isActive: u,
            processing: d
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = n(13);
    t.isZoomedOut = function(e) {
        return isNaN(e) && (e = t.calculateZoomLevel()), 1.05 >= e
    }, t.calculateZoomLevel = function() {
        var e;
        try {
            e = window.document.documentElement.clientWidth / window.innerWidth
        } catch (t) {}
        return e
    }, t.create = function(e) {
        function n() {
            var n = t.calculateZoomLevel();
            (isNaN(l) || l !== n) && (l = n, e.broadcast(i.ZOOM_LEVEL_CHANGED, n))
        }

        function a() {
            s || (s = window.requestAnimationFrame(function() {
                n(), s = void 0
            }))
        }

        function o() {
            s && (window.cancelAnimationFrame(s), s = void 0)
        }

        function r(e) {
            e = e.originalEvent || e, ("touchend" !== e.type || 0 === e.touches.length) && (o(), a())
        }
        var s, l;
        ! function() {
            var e = ["resize"];
            e.push("scroll"), Modernizr.touch && e.push("touchend"), $(window).on(e.join(" "), r)
        }()
    }
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            return '<div class="createstack beige stack">\n    <a href="javascript:void(0);">\n    <span class="stack-cover v1">\n        <span class="cover-container">\n            <span class="centerer">\n                <span class="hoverer">\n                    <img style="width:180px; height: 240px;" />\n                </span>\n            </span>\n            <span class="centerer">\n                <span class="hoverer">\n                    <img style="width:180px; height: 240px;" />\n                </span>\n            </span>\n            <span class="centerer">\n                <span class="hoverer">\n                    <img style="width:180px; height: 240px;" />\n                </span>\n            </span>\n        </span>\n        <span class="issuuicon issuuicon-plus plus"></span>\n    </span>\n    </a>\n    <div class="metadata">\n        <h3>' + e.escapeExpression(n.t.call(null != t ? t : {}, "stackswidget.createnewstack", {
                name: "t",
                hash: {},
                data: a
            })) + "</h3>\n    </div>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(7),
        a = 50;
    t.create = function(e, t, n) {
        function o() {
            var a = _.cloneDeep(t),
                o = _.merge({
                    isReadOnly: !0,
                    basePath: "call/stream/api/"
                }, n);
            return o.path = d, o.path || (o.path = o.basePath + e + "/initial", o.sessionCache = !0, o.initialPageSize && (a.pageSize = o.initialPageSize)), i.create(o).parameters(a)
        }

        function r() {
            var e = new $.Deferred;
            if (!f || h) return e.reject({
                more: f,
                busy: h
            }), e.promise();
            h = !0;
            var t = o().call();
            return t.then(function(t) {
                h = !1, f = void 0 !== t.continuation, d = t.continuation, e.resolve(t)
            }, function(t) {
                h = !1, e.reject(t)
            }), e
        }

        function s(e) {
            function t() {
                r().then(function(a) {
                    a && a.stream && (i = i.concat(a.stream)), n.notify(a.stream), f && (void 0 === e || e()) ? t(i, n) : n.resolve(i)
                }, function(e) {
                    n.reject(e)
                })
            }
            var n = new $.Deferred,
                i = [];
            return t(), n
        }

        function l(e) {
            if ("number" != typeof e || 2 > e) return r();
            var t = 0;
            return s(function() {
                return t++, t > e
            })
        }

        function c() {
            return s()
        }

        function u() {
            return p
        }
        var d, p, h = !1,
            f = !0;
        return function() {
            t.pageSize || (t.pageSize = a), t.seed || (t.seed = Math.round(1e4 * Math.random())), p = o().getKey()
        }(), {
            isThereMore: function() {
                return f
            },
            getPageSize: function() {
                return t.pageSize
            },
            getMore: l,
            getKey: u,
            getAll: c
        }
    }
}, function(e, t, n) {
    function i(e, t) {
        return b.create({
            action: "issuu.document.download"
        }).parameters({
            documentId: t + "-" + e
        }).call().then(function(e) {
            return e.redirect.url
        }, function(e) {
            return e
        })
    }

    function a(e, t) {
        var n = {
            documentId: t + "-" + e
        };
        return b.create({
            action: "issuu.document.download_external"
        }).parameters(n).call().then(function(e) {
            return e.redirect.url
        }, function(e) {
            return e
        })
    }

    function o(e, t) {
        t ? $('<iframe width="0" height="0" frameborder="0" src="' + e + '"></iframe>').appendTo("body") : window.location = e
    }

    function r(e) {
        f.broadcast(f.events.documentDownload, {
            anonymous: e,
            publicationId: d.publicationId,
            revisionId: d.revisionId,
            publicationName: d.publicationName,
            ownerUsername: d.username
        })
    }

    function s() {
        o(p), y || (y = !0, r(!0))
    }

    function l(e) {
        $.when(i(d.publicationId, d.revisionId)).then(function(t) {
            o(t, e), r(!1)
        }, function(e) {
            f.broadcast(f.events.messagehubError, h("You've already downloaded 25 awesome publications today. Try again tomorrow or let us know if you can't wait."))
        })
    }

    function c(e) {
        var t = e || {};
        if (t.isHandledExternally = !0, d.publicationDownload)
            if (p) s();
            else if (g.isLoggedIn()) l();
        else {
            f.broadcast(f.events.documentMenuActivate, "share");
            var n = !g.isLoggedIn();
            g.doWhenLoggedIn(function() {
                l(n)
            }, "download")
        } else f.broadcast(f.events.messagehubError, h("The author of this publication has not made it available for download."))
    }

    function u() {
        d.publicationDownload ? w.resolve() : w.reject()
    }
    var d, p, h = n(348).__,
        f = n(2),
        m = n(1),
        g = n(4),
        v = n(37),
        b = n(7),
        w = new $.Deferred,
        y = !1;
    t.init = function(e) {
        return d = e, "pending" !== w.state() && (m.error(new Error("downloadhelper initialized again after promise completed")), w = new $.Deferred), v.hasFreeDownload(d.services) && d.publicationDownload && d.isEmbed ? $.when(a(d.publicationId, d.revisionId)).then(function(e) {
            p = e
        }).always(function() {
            u()
        }) : u(), f.subscribe(f.events.documentDownloadActivate, c), w.promise()
    }, t.isDownloadEnabled = function() {
        return w.promise()
    }
}, function(e, t, n) {
    var i = n(12),
        a = [],
        o = {},
        r = [];
    t.isAvailable = function(e) {
            return -1 === a.indexOf(e)
        }, t.errorMessage = function(e) {
            return t.isAvailable(e) ? void 0 : o[e]
        }, t.getNotifications = function() {
            return r
        },
        function() {
            a = i.get("servicesDown"), o = i.get("servicesDownMsgs") || {}, r = i.get("servicesDownNotifications") || [], _.isArray(a) || (a = [])
        }()
}, function(e, t, n) {
    function i(e, t, n) {
        try {
            r.log("mixpanel", "_track", e, t), window.mixpanel.track(e, t), setTimeout(function() {
                n.resolve()
            }, 350)
        } catch (i) {
            n.resolve(), r.log("mixpanel", "mixpanel crashes for some reason"), r.log("mixpanel", i), r.error(i)
        }
    }

    function a(e, t, n, a) {
        var o = t || {},
            r = n || {};
        o.username = l.getUsername(), o.current_plan || r.dontTrackPlanType ? i(e, o, a) : c.getPublisherPlan(r.getFreshPlanType).then(function(t) {
            o.current_plan = t.plan, i(e, o, a)
        })
    }

    function o(e, t, n) {
        var o = new $.Deferred;
        return l.isLoggedIn() ? a(e, t, n, o) : i(e, t, o), o.promise()
    }
    var r = n(1),
        s = n(116),
        l = n(4),
        c = n(115),
        u = [],
        d = function(e, t, n) {
            var i = new $.Deferred;
            return u.push({
                eventName: e,
                payload: t,
                settings: n
            }), 1 === u.length && s.load().then(function() {
                var e = _.map(u, function(e) {
                    return o(e.eventName, e.payload, e.settings)
                });
                d = o, $.when.apply($, e).always(i.resolve)
            }, function() {
                i.resolve()
            }), i.promise()
        };
    t.track = function(e, t, n) {
        return d(e, t, n)
    }
}, function(e, t, n) {
    function i() {
        var e;
        "undefined" == typeof u && (u = d.benchmark());
        var t, n;
        for (t = 0, n = p.length; n > t; t++) {
            if (u < p[t]) {
                e = t + 1;
                break
            }
            e = t + 2
        }
        return e
    }

    function a() {
        return !!navigator.userAgent.match(/iPad/i)
    }

    function o() {
        return !!navigator.userAgent.match(/iPod/i)
    }

    function r() {
        return !!navigator.userAgent.match(/iPhone/i)
    }

    function s() {
        var e;
        return a() && void 0 !== window.devicePixelRatio ? 1 === window.devicePixelRatio ? ("undefined" == typeof u && (u = d.benchmark()), e = u < p[0] ? 1 : 2) : window.devicePixelRatio > 1 && (e = 3) : e = 0, e
    }

    function l() {
        var e = navigator.userAgent.match(/.*?OS (.+?)_.*/i);
        return e && e.length > 1 && (a() || o() || r()) ? e[1] : 0
    }

    function c() {
        var e = navigator.userAgent.match(/.*?OS (.+?) .*/i);
        return e && e.length > 1 && (a() || o() || r()) ? e[1] : 0
    }
    var u, d = n(117),
        p = [1e5];
    e.exports = {
        isIpad: a,
        isIpod: o,
        isIphone: r,
        getIosMajorVersion: l,
        getIosFullVersion: c,
        getIpadVersion: s,
        getCpuClass: i
    }
}, function(e, t, n) {
    function i(e) {
        var t = $(window);
        return {
            x: t.scrollLeft(),
            y: t.scrollTop(),
            width: t.width(),
            height: t.height()
        }
    }

    function a() {
        window.clearTimeout(o), o = window.setTimeout(t.onScroll, 200)
    }
    var o, r = {
            x: 0,
            y: 0,
            width: 10,
            height: 10
        },
        s = [],
        l = !1;
    t.register = function(e) {
        return -1 === _.indexOf(s, e) && (s.push(e), l && e.start(r)), t
    }, t.unregister = function(e) {
        return s = _.without(s, e), t
    }, t.unregisterAll = function() {
        return s = [], t
    }, t.onScroll = function() {
        var e = i();
        return _.forEach(s, function(t) {
            t.onScroll(e)
        }), t
    }, t.start = function() {
        if (!l) {
            l = !0;
            var e = i();
            _.forEach(s, function(t) {
                t.start(e)
            }), $(window).on("scroll", a)
        }
        return t
    }, t.stop = function() {
        return l && ($(window).off("scroll", a), window.clearTimeout(o), _.forEach(s, function(e) {
            e.stop()
        }), l = !1), t
    }, t.reset = function() {
        return _.forEach(s, function(e) {
            e.reset()
        }), t
    };
    var c = !1;
    t.init = function() {
        return c || (c = !0, t.register(n(146).create()), t.register(n(147).create()), t.register(n(145).create())), t
    }
}, function(e, t, n) {
    var i = n(154),
        a = n(105),
        o = {
            friendly: "bg-dark theme-dark"
        },
        r = n(2).installTo({});
    t.events = {
        NOTIFICATIONBARHEIGHTCHANGED: "messageHub.notificationBarHeightChanged"
    }, t.init = function(e) {
        var s = _.defaults(e || {}, {
                notificationBarOverHeader: !0
            }),
            l = $("<div>").addClass("notification-bar-wrapping notification-bar-message-hub").html($("<div>").addClass("notification-bar"));
        s.notificationBarOverHeader ? l.prependTo("body") : l.insertAfter("header");
        var c = n(155).create(".notification-bar-message-hub", !0);
        return i.setColorMap(o), i.init(c, a), c.subscribe("heightChanged", function(e) {
            r.broadcast(t.events.NOTIFICATIONBARHEIGHTCHANGED, e)
        }), t
    }, t.setColorMap = function(e) {
        return o = _.merge(o, e), t
    }, e.exports = _.extend(t, r)
}, function(e, t, n) {
    var i = n(5),
        a = n(4),
        o = n(71),
        r = n(51),
        s = n(109),
        l = n(73),
        c = 3;
    t.create = function(e, t) {
        function n() {
            return a.isLoggedIn() && v.get("ownerUsername").toLowerCase() === a.getUsername().toLowerCase()
        }

        function u() {
            return s({
                stack: v.getRawData(),
                pubs: v.getPublications(c).reverse(),
                stackUrl: v.getUrl(),
                profileUrl: i.userProfileUrl(v.get("ownerUsername")),
                version: Math.floor(Math.random() * c) + 1,
                followMenuMarkup: b.followOptions ? o.create(b.followOptions) : "",
                showEditButton: n(),
                options: b
            })
        }

        function d() {
            var e = v.$.find("canvas");
            if (e.length && Modernizr.canvas === !0) {
                var t = v.$.find(".stack-cover"),
                    n = e.get(0).getContext("2d"),
                    i = t.width(),
                    a = Math.round(.9 * t.height());
                e.attr("width", i), e.attr("height", a), "function" == typeof n.setLineDash && n.setLineDash([9, 5]), n.strokeStyle = "rgba(0,0,0,0.2)", n.lineWidth = 2.2, n.beginPath(), n.moveTo(16.064 * i / 100, 3.78633 * a / 100), n.lineTo(47.9032 * i / 100, 6.79408 * a / 100), n.lineTo(83.6528 * i / 100, 2.2 * a / 100), n.lineTo(83.6528 * i / 100, 5.82133 * a / 100), n.lineTo(91.7512 * i / 100, 5.63562 * a / 100), n.lineTo(91.7512 * i / 100, 8.69983 * a / 100), n.lineTo(97.5 * i / 100, 8.9784 * a / 100), n.lineTo(92.441 * i / 100, 56.9843 * a / 100), n.lineTo(97.5 * i / 100, 89.9477 * a / 100), n.lineTo(91.9812 * i / 100, 90.412 * a / 100), n.lineTo(92.4402 * i / 100, 94.1406 * a / 100), n.lineTo(88.547 * i / 100, 93.9791 * a / 100), n.lineTo(88.417 * i / 100, 97.1903 * a / 100), n.lineTo(52.8894 * i / 100, 94.5904 * a / 100), n.lineTo(15.1773 * i / 100, 98.0261 * a / 100), n.lineTo(15.1773 * i / 100, 94.4047 * a / 100), n.lineTo(9.77345 * i / 100, 94.219 * a / 100), n.lineTo(9.77345 * i / 100, 92.2691 * a / 100), n.lineTo(6.55416 * i / 100, 91.6191 * a / 100), n.lineTo(10.5782 * i / 100, 52.713 * a / 100), n.lineTo(2.3 * i / 100, 10.4641 * a / 100), n.lineTo(10.6932 * i / 100, 10.2784 * a / 100), n.lineTo(10.4633 * i / 100, 6.47132 * a / 100), n.lineTo(15.8671 * i / 100, 6.74988 * a / 100), n.closePath(), n.stroke()
            }
        }

        function p() {
            return v
        }

        function h() {
            v.$ && (v.$.off("click").find(".editstack").off("click"), v.$.remove(), v.$ = void 0)
        }

        function f() {
            b.selectionOnly === !0 && v.$.on("click", function() {
                v.toggleSelection(), v.$.toggleClass("selected", v.isSelected()), "function" == typeof b.onSelectionChanged && b.onSelectionChanged(v, v.isSelected())
            }), n() && v.$.find(".editstack").on("click", function() {
                var e = {
                    onFinished: function(e) {
                        e && (v.set("name", e.get("name")), v.set("description", e.get("description")), v.set("secret", e.get("secret")), v.$.find(".metadata h3").text(v.get("name")), v.$.find(".metadata .description").text(v.get("description")), v.$.find(".secret").toggle(v.get("secret")), "function" == typeof b.onStackUpdated && b.onStackUpdated(v))
                    },
                    model: v,
                    onDeleted: b.onStackDeleted
                };
                r.create(e)
            })
        }

        function m(e) {
            v.$ = $(e), f(), setTimeout(d, 0)
        }

        function g() {
            return v.$ || m(u()), v.$
        }
        var v, b;
        return function() {
            b = t || {}, v = l.create(e)
        }(), {
            getInitializedElement: g,
            getMarkup: u,
            didInsertElement: m,
            getModel: p,
            removeElement: h
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = n(2),
        a = n(5),
        o = n(1),
        r = n(30);
    e.exports.create = function(e, t) {
        function n() {
            p !== d.join("-") && (p = d.join("-"), _.each(d, function(e) {
                var t = s(e);
                o.log("tracking", "page view " + t + " sent to GA"), r.track(["_trackPageview", t])
            }))
        }

        function s(n) {
            var i = a.publicationUrl(e, t, n).toLowerCase();
            return new Uri(i).path()
        }

        function l() {
            u && (window.clearTimeout(u), u = void 0)
        }

        function c(e) {
            l(), d = e.pageNumbers, u = window.setTimeout(function() {
                u = void 0, n()
            }, 1e3)
        }
        var u, d = [],
            p = "";
        return function() {
            i.subscribe(i.events.documentPageChange, c)
        }(), {}
    }
}, function(e, t, n) {
    "use strict";
    var i = n(2),
        a = n(5),
        o = n(6),
        r = n(1),
        s = n(32);
    e.exports.create = function(e, t) {
        function n() {
            h !== p.join("-") && (h = p.join("-"), _.each(p, function(e) {
                var t = l(e);
                s.track({
                    qacct: o.tracking.quantcastId
                }), r.log("tracking", "page view " + t + " sent to Quantcast")
            }))
        }

        function l(n) {
            return a.publicationUrl(e, t, n).toLowerCase()
        }

        function c() {
            d && (window.clearTimeout(d), d = void 0)
        }

        function u(e) {
            c(), p = e.pageNumbers, d = window.setTimeout(function() {
                d = void 0, n()
            }, 1e3)
        }
        var d, p = [],
            h = "";
        return function() {
            i.subscribe(i.events.documentPageChange, u)
        }(), {}
    }
}, function(e, t) {
    "use strict";
    t.event = {
        DOWN: "down",
        UP: "up",
        FLING: "fling",
        SCROLL: "scroll",
        KEYBOARD: "keyboard"
    }, t.direction = {
        UNKNOWN: "unknown",
        LEFT: "left",
        RIGHT: "right",
        UP: "up",
        DOWN: "down",
        OTHER: "other"
    }
}, function(e, t, n) {
    "use strict";
    var i, a = n(16),
        o = n(8),
        r = n(1),
        s = {
            carouselView: {
                title: "carousel",
                key: "reader.carousel.containerView",
                "default": "absolute",
                options: {
                    absolute: {
                        desc: "carousel with elements positioned absolute",
                        get: function() {
                            return n(239)
                        }
                    }
                }
            },
            pageView: {
                title: "rendering unique page",
                key: "reader.carousel.pageView",
                "default": "images",
                options: {
                    images: {
                        desc: "use 2 images tags",
                        get: function() {
                            return n(244)
                        }
                    }
                }
            },
            wallView: {
                title: "wall (prevent flickering on zoom)",
                key: "reader.carousel.wallView",
                "default": a.wall ? "fix" : "none",
                options: {
                    fix: {
                        desc: "wall with a fix position shown on zoom in",
                        get: function() {
                            return n(272)
                        }
                    },
                    none: {
                        desc: "no wall used",
                        get: function() {
                            return null
                        }
                    }
                }
            }
        },
        l = function() {
            return i = i || _.mapValues(s, function(e) {
                e.key || r.error(new Error("Configuration item did not specify a key")), _.isEmpty(e.options) && r.error(new Error("Configuration item did not specify available options"));
                var t = o.get(e.key) || e["default"],
                    n = e.options[t];
                try {
                    return n.get()
                } catch (i) {
                    r.error(new Error("Configuration item did not specify a getter function"))
                }
            })
        };
    e.exports = {
        get: l,
        configOptions: s
    }
}, function(e, t, n) {
    "use strict";
    var i = n(1),
        a = n(16).carousel,
        o = n(91);
    t.create = function() {
        function e() {
            return void 0 !== g
        }

        function t() {
            return e() ? !0 : (i.error(new Error("a valid element has to be set before")), !1)
        }

        function n(e, t) {
            g.style[Modernizr.prefixed("transitionDuration")] = "0ms", Modernizr.csstransforms3d ? g.style[Modernizr.prefixed("transform")] = "translate3d(" + e + "px, " + t + "px, 0px)" : g.style[Modernizr.prefixed("transform")] = "translate(" + e + "px, " + t + "px)", v = e, b = t
        }

        function r() {
            return $(g).position()
        }

        function s(e, t, i, r) {
            if (void 0 === i || 0 === i || 0 === a.pagetransitions[i].duration) return void n(e, t);
            var s = a.pagetransitions[i].duration,
                l = a.pagetransitions[i].bezierCurveParameters;
            o.translate(w, e, t, v, b, s, l, r)
        }

        function l(e) {
            t() && (g = $(g).appendTo(e)[0])
        }

        function c() {
            t() && $(g).remove()
        }

        function u() {
            t() && (g.style.display = "block")
        }

        function d() {
            t() && (g.style.display = "none")
        }

        function p() {
            return t() ? 0 !== $(g).closest("html").length : void 0
        }

        function h(e) {
            var t = $(e);
            0 === t.length ? (i.error(new Error("invalid DOM element")), g = void 0) : g = e
        }

        function f() {
            return g
        }

        function m() {
            return $(g)
        }
        var g, v = 0,
            b = 0,
            w = {
                getElement: f,
                setElement: h,
                getIsInDom: p,
                show: u,
                hide: d,
                addToDom: l,
                removeFromDom: c,
                setPosition: n,
                getPosition: r,
                animateTo: s,
                $: m
            };
        return w
    }
}, function(e, t, n) {
    "use strict";

    function i() {
        return Date.now ? Date.now() : (new Date).getTime()
    }

    function a(e, t, n, i, a, o) {
        var r = e.getElement().style;
        r[Modernizr.prefixed("transitionDuration")] = i + "ms", r[Modernizr.prefixed("transitionTimingFunction")] = "cubic-bezier(" + a.join(",") + ")", o && e.$().one(s(), o), window.setTimeout(function() {
            Modernizr.csstransforms3d ? r[Modernizr.prefixed("transform")] = "translate3d(" + t + "px, " + n + "px, 0px)" : r[Modernizr.prefixed("transform")] = "translate(" + t + "px, " + n + "px)"
        }, 0)
    }
    var o = n(8).get("reader.useRAF"),
        r = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            msTransition: "MSTransitionEnd",
            transition: "transitionend"
        },
        s = function() {
            return r[Modernizr.prefixed("transition")]
        },
        l = function(e, t, n, r, s, l, c, u) {
            function d() {
                var a = i();
                if (a >= h) return e.setPosition(t, n), void(u && u());
                a = (a - p) / l;
                var o = Bezier.cubicBezier.apply(void 0, c.concat([a, l])),
                    f = (t - r) * o + r,
                    m = (n - s) * o + s;
                e.setPosition(f, m), window.requestAnimationFrame(d)
            }
            if (!o) return void a(e, t, n, l, c, u);
            var p = i(),
                h = p + (l || 0);
            d()
        },
        c = function(e, t, n) {
            function i() {
                r.opacity = t
            }

            function a() {
                r.opacity > 0 ? r.display = "block" : r.display = "none"
            }
            var o = $(e).get(0),
                r = o.style;
            if (t !== parseInt(r.opacity, 10)) {
                if (0 === n) return i(), void a();
                r[Modernizr.prefixed("transitionDelay")] = "0s", r[Modernizr.prefixed("transitionProperty")] = "opacity", r[Modernizr.prefixed("transitionDuration")] = n + "s", $(o).one(s(), a), r.display = "block", window.setTimeout(i, 0)
            }
        },
        u = function(e, t, n, i) {
            var a = $(e).get(0);
            i && (0 >= i ? a.style[Modernizr.prefixed("transitionDelay")] = "0s" : a.style[Modernizr.prefixed("transitionDelay")] = i + "s"), a.style[Modernizr.prefixed("transitionProperty")] = "scale", a.style[Modernizr.prefixed("transitionDuration")] = n + "s", a.style.display = "block", window.setTimeout(function() {
                a.style[Modernizr.prefixed("transform")] = "scale(" + t + ")"
            }, 0)
        };
    e.exports = {
        scale: u,
        fade: c,
        translate: l,
        getTransitionEndEventName: s
    }
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o;
            return '<script type="text/javascript">(function(f,b){if(!b.__SV){var a,e,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");\nfor(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=f.createElement("script");a.type="text/javascript";a.async=!0;a.src="//cdn.mxpnl.com/libs/mixpanel-2.2.min.js";e=f.getElementsByTagName("script")[0];e.parentNode.insertBefore(a,e)}})(document,window.mixpanel||[]);\nmixpanel.init("' + e.escapeExpression((o = null != (o = n.mixpanelToken || (null != t ? t.mixpanelToken : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(null != t ? t : {}, {
                name: "mixpanelToken",
                hash: {},
                data: a
            }) : o)) + '");\n</script>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression;
            return '<div id="overlay" class="' + u((r = null != (r = n.skin || (null != t ? t.skin : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "skin",
                hash: {},
                data: a
            }) : r)) + '" style="visibility:' + u((r = null != (r = n.visibility || (null != t ? t.visibility : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "visibility",
                hash: {},
                data: a
            }) : r)) + ';">\n    <div class="dimmer-content">\n        ' + (null != (r = null != (r = n.dimmerContent || (null != t ? t.dimmerContent : t)) ? r : l, o = typeof r === c ? r.call(s, {
                name: "dimmerContent",
                hash: {},
                data: a
            }) : r) ? o : "") + "\n    </div>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            return '                <div class="close_corner issuuicon issuuicon-chevron-x"></div>\n'
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression;
            return '<div class="centerparent ' + u((r = null != (r = n.trait || (null != t ? t.trait : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "trait",
                hash: {},
                data: a
            }) : r)) + " " + u((r = null != (r = n.boxClass || (null != t ? t.boxClass : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "boxClass",
                hash: {},
                data: a
            }) : r)) + '">\n    <div class="vcenter">\n        <div class="overlay-box">\n            ' + (null != (r = null != (r = n.content || (null != t ? t.content : t)) ? r : l, o = typeof r === c ? r.call(s, {
                name: "content",
                hash: {},
                data: a
            }) : r) ? o : "") + "\n" + (null != (o = n["if"].call(s, null != t ? t.showCloseIcon : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "        </div>\n    </div>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            return '<a href="">\n    <img alt="" class="stream2-doc-element__img" />\n</a>\n<div class="stream2-doc-element__metadata">\n    <div class="stream2-doc-element__extra-metadata">\n        <h3 class="stream2-doc-element__title"><a href="" class="unstyled type-discreet" tabindex="-1"></a></h3>\n        <p class="stream2-doc-element__ownername">\n            <a href=""></a>\n        </p>\n    </div>\n    <span class="stream2-doc-element__publication-age"></span>\n    <span class="stream2-doc-element__expand"><span>&hellip;</span></span>\n    <span class="stream2-doc-element__collapse"><span class="issuuicon issuuicon-chevron-x"></span></span>\n</div>\n\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = n.helperMissing,
                l = "function",
                c = e.escapeExpression;
            return '<div class="stream__element--o-o-ads" id="' + c((o = null != (o = n.id || (null != t ? t.id : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "id",
                hash: {},
                data: a
            }) : o)) + '" style="top: ' + c((o = null != (o = n.y || (null != t ? t.y : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "y",
                hash: {},
                data: a
            }) : o)) + "px; left: " + c((o = null != (o = n.x || (null != t ? t.x : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "x",
                hash: {},
                data: a
            }) : o)) + "px; width: " + c((o = null != (o = n.width || (null != t ? t.width : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "width",
                hash: {},
                data: a
            }) : o)) + "px; height: " + c((o = null != (o = n.height || (null != t ? t.height : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "height",
                hash: {},
                data: a
            }) : o)) + 'px;">\n    <div class="center-block o-o-ads--gpt">\n        <div id="' + c((o = null != (o = n.adId || (null != t ? t.adId : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "adId",
                hash: {},
                data: a
            }) : o)) + '" class="o-o-ads--gpt__ad"></div>\n        <p class="o-o-ads--gpt__text">Advertisement</p>\n    </div>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = n.helperMissing,
                l = "function",
                c = e.escapeExpression;
            return '<div class="stream__element--triple-lift-ad"\n     id="' + c((o = null != (o = n.id || (null != t ? t.id : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "id",
                hash: {},
                data: a
            }) : o)) + '" style="top: ' + c((o = null != (o = n.y || (null != t ? t.y : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "y",
                hash: {},
                data: a
            }) : o)) + "px; left: " + c((o = null != (o = n.x || (null != t ? t.x : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "x",
                hash: {},
                data: a
            }) : o)) + "px; width: " + c((o = null != (o = n.width || (null != t ? t.width : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "width",
                hash: {},
                data: a
            }) : o)) + "px; height: " + c((o = null != (o = n.height || (null != t ? t.height : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "height",
                hash: {},
                data: a
            }) : o)) + 'px;">\n     <div id="' + c((o = null != (o = n.adId || (null != t ? t.adId : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "adId",
                hash: {},
                data: a
            }) : o)) + '" class=""></div>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            var o;
            return 'src="' + e.escapeExpression((o = null != (o = n.coverImage || (null != t ? t.coverImage : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(null != t ? t : {}, {
                name: "coverImage",
                hash: {},
                data: a
            }) : o)) + '"'
        },
        3: function(e, t, n, i, a) {
            return "Preview"
        },
        5: function(e, t, n, i, a) {
            return "Read now"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression,
                d = e.lambda;
            return '<div class="publication" id="' + u((r = null != (r = n.id || (null != t ? t.id : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "id",
                hash: {},
                data: a
            }) : r)) + '" style="top: ' + u((r = null != (r = n.y || (null != t ? t.y : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "y",
                hash: {},
                data: a
            }) : r)) + "px; left: " + u((r = null != (r = n.x || (null != t ? t.x : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "x",
                hash: {},
                data: a
            }) : r)) + "px;" + u((r = null != (r = n.debugStyle || (null != t ? t.debugStyle : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "debugStyle",
                hash: {},
                data: a
            }) : r)) + '">\n    <div class="publication-content">\n    ' + (null != (r = null != (r = n.debugTxt || (null != t ? t.debugTxt : t)) ? r : l, o = typeof r === c ? r.call(s, {
                name: "debugTxt",
                hash: {},
                data: a
            }) : r) ? o : "") + '\n    <a href="/' + u(d(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + "/docs/" + u(d(null != (o = null != t ? t.content : t) ? o.publicationName : o, t)) + '" style="height:' + u((r = null != (r = n.imgHeight || (null != t ? t.imgHeight : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "imgHeight",
                hash: {},
                data: a
            }) : r)) + 'px" class="cover" >\n        <img ' + (null != (o = n["if"].call(s, null != t ? t.coverImage : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + ' style="height:' + u((r = null != (r = n.imgHeight || (null != t ? t.imgHeight : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "imgHeight",
                hash: {},
                data: a
            }) : r)) + 'px" />\n        <span class="hint" style="line-height:' + u((r = null != (r = n.imgHeight || (null != t ? t.imgHeight : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "imgHeight",
                hash: {},
                data: a
            }) : r)) + 'px;" >' + (null != (o = n["if"].call(s, null != (o = null != t ? t.content : t) ? o.isPreview : o, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.program(5, a, 0),
                data: a
            })) ? o : "") + '</span>\n    </a>\n    <div class="metadata">\n        <h3 class="title"><a href="/' + u(d(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + "/docs/" + u(d(null != (o = null != t ? t.content : t) ? o.publicationName : o, t)) + '" class="unstyled type-discreet">' + u(d(null != (o = null != t ? t.content : t) ? o.title : o, t)) + '</a></h3>\n        <p class="ownername">\n            <a href="/' + u(d(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + '">' + u(d(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + '</a>\n        </p>\n        <p class="description">\n            <a href="/' + u(d(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + "/docs/" + u(d(null != (o = null != t ? t.content : t) ? o.publicationName : o, t)) + '" class="unstyled">' + u((r = null != (r = n.shortDescription || (null != t ? t.shortDescription : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "shortDescription",
                hash: {},
                data: a
            }) : r)) + "</a>\n        </p>\n    </div>\n    </div>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            var o;
            return 'src="' + e.escapeExpression((o = null != (o = n.coverImage || (null != t ? t.coverImage : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(null != t ? t : {}, {
                name: "coverImage",
                hash: {},
                data: a
            }) : o)) + '"'
        },
        3: function(e, t, n, i, a) {
            return "Preview"
        },
        5: function(e, t, n, i, a) {
            return "Read now"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = e.lambda,
                l = e.escapeExpression,
                c = null != t ? t : {},
                u = n.helperMissing,
                d = "function";
            return '<div class="publication white" data-docid="' + l(s(null != (o = null != t ? t.content : t) ? o.revisionId : o, t)) + "-" + l(s(null != (o = null != t ? t.content : t) ? o.publicationId : o, t)) + '" id="' + l((r = null != (r = n.id || (null != t ? t.id : t)) ? r : u, typeof r === d ? r.call(c, {
                name: "id",
                hash: {},
                data: a
            }) : r)) + '" style="top: ' + l((r = null != (r = n.y || (null != t ? t.y : t)) ? r : u, typeof r === d ? r.call(c, {
                name: "y",
                hash: {},
                data: a
            }) : r)) + "px; left: " + l((r = null != (r = n.x || (null != t ? t.x : t)) ? r : u, typeof r === d ? r.call(c, {
                name: "x",
                hash: {},
                data: a
            }) : r)) + 'px;">\n    <div class="publication-content">\n    <a href="/' + l(s(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + "/docs/" + l(s(null != (o = null != t ? t.content : t) ? o.publicationName : o, t)) + '" style="height:' + l((r = null != (r = n.imgHeight || (null != t ? t.imgHeight : t)) ? r : u, typeof r === d ? r.call(c, {
                name: "imgHeight",
                hash: {},
                data: a
            }) : r)) + 'px" class="cover" >\n        <img ' + (null != (o = n["if"].call(c, null != t ? t.coverImage : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + ' style="height:' + l((r = null != (r = n.imgHeight || (null != t ? t.imgHeight : t)) ? r : u, typeof r === d ? r.call(c, {
                name: "imgHeight",
                hash: {},
                data: a
            }) : r)) + 'px" />\n        <span class="hint" style="line-height:' + l((r = null != (r = n.imgHeight || (null != t ? t.imgHeight : t)) ? r : u, typeof r === d ? r.call(c, {
                name: "imgHeight",
                hash: {},
                data: a
            }) : r)) + 'px;" >' + (null != (o = n["if"].call(c, null != (o = null != t ? t.content : t) ? o.isPreview : o, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.program(5, a, 0),
                data: a
            })) ? o : "") + '</span>\n    </a>\n    <a class="delete-doc issuuicons" href="javascript:void(0);">d</a>\n    <div class="metadata">\n        <h3 class="title"><a href="/' + l(s(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + "/docs/" + l(s(null != (o = null != t ? t.content : t) ? o.publicationName : o, t)) + '" class="unstyled type-discreet" tabindex="-1">' + l(s(null != (o = null != t ? t.content : t) ? o.title : o, t)) + '</a></h3>\n        <p class="ownername">\n            <a href="/' + l(s(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + '">' + l(s(null != (o = null != t ? t.content : t) ? o.ownerDisplayName : o, t)) + '</a>\n        </p>\n        <p class="description">\n            <a href="/' + l(s(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + "/docs/" + l(s(null != (o = null != t ? t.content : t) ? o.publicationName : o, t)) + '" class="unstyled" tabindex="-1">' + l((r = null != (r = n.shortDescription || (null != t ? t.shortDescription : t)) ? r : u, typeof r === d ? r.call(c, {
                name: "shortDescription",
                hash: {},
                data: a
            }) : r)) + "</a>\n        </p>\n    </div>\n    </div>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            var o;
            return 'src="' + e.escapeExpression((o = null != (o = n.coverImage || (null != t ? t.coverImage : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(null != t ? t : {}, {
                name: "coverImage",
                hash: {},
                data: a
            }) : o)) + '"'
        },
        3: function(e, t, n, i, a) {
            return "Preview"
        },
        5: function(e, t, n, i, a) {
            return "Read now"
        },
        7: function(e, t, n, i, a) {
            return '                    <div class="ribbon-wrapper"><div class="ribbon">Featured</div></div>\n'
        },
        9: function(e, t, n, i, a) {
            var o, r, s = e.lambda,
                l = e.escapeExpression;
            return '                <p class="description">\n                    <a href="/' + l(s(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + "/docs/" + l(s(null != (o = null != t ? t.content : t) ? o.publicationName : o, t)) + '" class="unstyled" tabindex="-1">' + l((r = null != (r = n.shortDescription || (null != t ? t.shortDescription : t)) ? r : n.helperMissing, "function" == typeof r ? r.call(null != t ? t : {}, {
                name: "shortDescription",
                hash: {},
                data: a
            }) : r)) + "</a>\n                </p>\n"
        },
        11: function(e, t, n, i, a) {
            var o, r = e.lambda,
                s = e.escapeExpression,
                l = null != t ? t : {};
            return '        <div class="added-to">\n            <div class="delete-link">\n                <span class="issuuicon issuuicon-remove type-discreet type-small" data-toggle="tooltip"></span>\n                <span class="menu type-discreet default-padding arrow-top" data-tooltip="tooltip">Unfollow ' + s(r(null != (o = null != (o = null != t ? t.content : t) ? o.reason : o) ? o.title : o, t)) + '</span>\n            </div>\n            <p>\n                <a href="' + s(r(null != (o = null != (o = null != t ? t.content : t) ? o.reason : o) ? o.url : o, t)) + '" class="type-discreet type-small" title="' + s(n.tr.call(l, null != (o = null != t ? t.content : t) ? o.reason : o, {
                name: "tr",
                hash: {
                    stackowner: "ownerDisplayName",
                    stacktitle: "title",
                    key: "home.subscriptions.addedto"
                },
                data: a
            })) + '">\n                    <span class="issuuicon issuuicon-stack"></span> ' + s(n.tr.call(l, null != (o = null != t ? t.content : t) ? o.reason : o, {
                name: "tr",
                hash: {
                    stackowner: "ownerDisplayName",
                    stacktitle: "title",
                    key: "home.subscriptions.addedto"
                },
                data: a
            })) + "\n                </a>\n            </p>\n        </div>\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression,
                d = e.lambda;
            return '<div class="publication theme-light" id="' + u((r = null != (r = n.id || (null != t ? t.id : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "id",
                hash: {},
                data: a
            }) : r)) + '" style="top: ' + u((r = null != (r = n.y || (null != t ? t.y : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "y",
                hash: {},
                data: a
            }) : r)) + "px; left: " + u((r = null != (r = n.x || (null != t ? t.x : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "x",
                hash: {},
                data: a
            }) : r)) + "px;" + u((r = null != (r = n.debugStyle || (null != t ? t.debugStyle : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "debugStyle",
                hash: {},
                data: a
            }) : r)) + '" data-identifier="' + u(d(null != (o = null != (o = null != t ? t.content : t) ? o.reason : o) ? o.identifier : o, t)) + '" data-title="' + u(d(null != (o = null != (o = null != t ? t.content : t) ? o.reason : o) ? o.title : o, t)) + '"  data-type="' + u(d(null != (o = null != (o = null != t ? t.content : t) ? o.reason : o) ? o.type : o, t)) + '">\n    <div class="publication-content">\n        <div>\n            ' + (null != (r = null != (r = n.debugTxt || (null != t ? t.debugTxt : t)) ? r : l, o = typeof r === c ? r.call(s, {
                name: "debugTxt",
                hash: {},
                data: a
            }) : r) ? o : "") + '\n            <a href="/' + u(d(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + "/docs/" + u(d(null != (o = null != t ? t.content : t) ? o.publicationName : o, t)) + '" style="height:' + u((r = null != (r = n.imgHeight || (null != t ? t.imgHeight : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "imgHeight",
                hash: {},
                data: a
            }) : r)) + 'px;" class="cover" >\n                <img ' + (null != (o = n["if"].call(s, null != t ? t.coverImage : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + ' style="height:' + u((r = null != (r = n.imgHeight || (null != t ? t.imgHeight : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "imgHeight",
                hash: {},
                data: a
            }) : r)) + 'px;" />\n                <span class="hint" style="line-height:' + u((r = null != (r = n.imgHeight || (null != t ? t.imgHeight : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "imgHeight",
                hash: {},
                data: a
            }) : r)) + 'px;" >' + (null != (o = n["if"].call(s, null != (o = null != t ? t.content : t) ? o.isPreview : o, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.program(5, a, 0),
                data: a
            })) ? o : "") + "</span>\n" + (null != (o = n["if"].call(s, null != (o = null != t ? t.content : t) ? o.isEditorsPick : o, {
                name: "if",
                hash: {},
                fn: e.program(7, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '                <div class="ribbon-wrapper new-ribbon"><div class="ribbon">New</div></div>\n            </a>\n            <div class="metadata">\n                <h3 class="title"><a href="/' + u(d(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + "/docs/" + u(d(null != (o = null != t ? t.content : t) ? o.publicationName : o, t)) + '" class="unstyled type-discreet" tabindex="-1"><span class="new-pub-icon"></span>' + u(d(null != (o = null != t ? t.content : t) ? o.title : o, t)) + '</a></h3>\n                <p class="ownername">\n                    <a href="/' + u(d(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + '">' + u(d(null != (o = null != t ? t.content : t) ? o.ownerDisplayName : o, t)) + "</a>\n                </p>\n" + (null != (o = n["if"].call(s, null != t ? t.isGoodDescription : t, {
                name: "if",
                hash: {},
                fn: e.program(9, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "            </div>\n        </div>\n    </div>\n" + (null != (o = n["if"].call(s, null != (o = null != (o = null != t ? t.content : t) ? o.reason : o) ? o.isStack : o, {
                name: "if",
                hash: {},
                fn: e.program(11, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '    <div class="spinner-box">\n        <div class="spin"></div>\n    </div>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression,
                d = e.lambda;
            return '<div class="image-infobox" id="' + u((r = null != (r = n.id || (null != t ? t.id : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "id",
                hash: {},
                data: a
            }) : r)) + '" style="top: ' + u((r = null != (r = n.y || (null != t ? t.y : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "y",
                hash: {},
                data: a
            }) : r)) + "px; left: " + u((r = null != (r = n.x || (null != t ? t.x : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "x",
                hash: {},
                data: a
            }) : r)) + "px; width:" + u((r = null != (r = n.width || (null != t ? t.width : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "width",
                hash: {},
                data: a
            }) : r)) + "px; height:" + u((r = null != (r = n.height || (null != t ? t.height : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "height",
                hash: {},
                data: a
            }) : r)) + "px;" + u((r = null != (r = n.debugStyle || (null != t ? t.debugStyle : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "debugStyle",
                hash: {},
                data: a
            }) : r)) + ' overflow:hidden;">\n    ' + (null != (r = null != (r = n.debugTxt || (null != t ? t.debugTxt : t)) ? r : l, o = typeof r === c ? r.call(s, {
                name: "debugTxt",
                hash: {},
                data: a
            }) : r) ? o : "") + '\n    <a href="' + u(d(null != (o = null != t ? t.content : t) ? o.link : o, t)) + '">\n        <img src="' + u((r = null != (r = n.imgBase || (null != t ? t.imgBase : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "imgBase",
                hash: {},
                data: a
            }) : r)) + u(d(null != (o = null != t ? t.content : t) ? o.image : o, t)) + '">\n    </a>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            var o;
            return 'src="' + e.escapeExpression((o = null != (o = n.coverImage || (null != t ? t.coverImage : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(null != t ? t : {}, {
                name: "coverImage",
                hash: {},
                data: a
            }) : o)) + '"'
        },
        3: function(e, t, n, i, a) {
            return "Preview"
        },
        5: function(e, t, n, i, a) {
            return "Read now"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression,
                d = e.lambda;
            return '<div class="publication" id="' + u((r = null != (r = n.id || (null != t ? t.id : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "id",
                hash: {},
                data: a
            }) : r)) + '" style="top: ' + u((r = null != (r = n.y || (null != t ? t.y : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "y",
                hash: {},
                data: a
            }) : r)) + "px; left: " + u((r = null != (r = n.x || (null != t ? t.x : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "x",
                hash: {},
                data: a
            }) : r)) + "px;" + u((r = null != (r = n.debugStyle || (null != t ? t.debugStyle : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "debugStyle",
                hash: {},
                data: a
            }) : r)) + '">\n    <div class="publication-content">\n    ' + (null != (r = null != (r = n.debugTxt || (null != t ? t.debugTxt : t)) ? r : l, o = typeof r === c ? r.call(s, {
                name: "debugTxt",
                hash: {},
                data: a
            }) : r) ? o : "") + '\n    <a href="/' + u(d(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + "/docs/" + u(d(null != (o = null != t ? t.content : t) ? o.publicationName : o, t)) + '" style="height:' + u((r = null != (r = n.imgHeight || (null != t ? t.imgHeight : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "imgHeight",
                hash: {},
                data: a
            }) : r)) + 'px" class="cover" >\n        <img ' + (null != (o = n["if"].call(s, null != t ? t.coverImage : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + ' style="height:' + u((r = null != (r = n.imgHeight || (null != t ? t.imgHeight : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "imgHeight",
                hash: {},
                data: a
            }) : r)) + 'px" />\n        <span class="hint" style="line-height:' + u((r = null != (r = n.imgHeight || (null != t ? t.imgHeight : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "imgHeight",
                hash: {},
                data: a
            }) : r)) + 'px;" >' + (null != (o = n["if"].call(s, null != (o = null != t ? t.content : t) ? o.isPreview : o, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.program(5, a, 0),
                data: a
            })) ? o : "") + '</span>\n    </a>\n    <div class="metadata">\n        <h3 class="title"><a href="/' + u(d(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + "/docs/" + u(d(null != (o = null != t ? t.content : t) ? o.publicationName : o, t)) + '" class="unstyled type-discreet">' + u(d(null != (o = null != t ? t.content : t) ? o.title : o, t)) + '</a></h3>\n        <p class="ownername">\n            <a href="/' + u(d(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + '">' + u(d(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + '</a>\n        </p>\n        <p class="description">\n            <a href="/' + u(d(null != (o = null != t ? t.content : t) ? o.ownerUsername : o, t)) + "/docs/" + u(d(null != (o = null != t ? t.content : t) ? o.publicationName : o, t)) + '" class="unstyled">' + u((r = null != (r = n.shortDescription || (null != t ? t.shortDescription : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "shortDescription",
                hash: {},
                data: a
            }) : r)) + "</a>\n        </p>\n    </div>\n    </div>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            return '<div class="stream-spinner beige theme-light">\n    <div class="spinner small loading spin large"></div>\n    <p class="none">\n        Would you believe it? We\'ve got more than 25 million publications on issuu but nothing here. <br />Why don\'t you <a href="/explore">go exploring</a>?\n    </p>\n    <p class="nomore">\n        That\'s it.\n    </p>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = n.helperMissing,
                l = "function",
                c = e.escapeExpression;
            return '<div class="follow-actions status-' + c((o = null != (o = n.initialStatus || (null != t ? t.initialStatus : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "initialStatus",
                hash: {},
                data: a
            }) : o)) + '" data-type="' + c((o = null != (o = n.type || (null != t ? t.type : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "type",
                hash: {},
                data: a
            }) : o)) + '" data-id="' + c((o = null != (o = n.id || (null != t ? t.id : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "id",
                hash: {},
                data: a
            }) : o)) + '">\n    <div class="follow"><span class="issuuicons" title="' + c(n.t.call(r, "stream.follow", {
                name: "t",
                hash: {},
                data: a
            })) + '">p</span></div>\n    <div class="following">\n        <span class="issuuicons followed">C</span> <span class="action-text followed-text">' + c(n.t.call(r, "stream.followed", {
                name: "t",
                hash: {},
                data: a
            })) + '</span>\n        <span class="issuuicons unfollow" title="' + c(n.t.call(r, "stream.unfollow", {
                name: "t",
                hash: {},
                data: a
            })) + '">d</span> <span class="action-text unfollowed-text">' + c(n.t.call(r, "stream.unfollowed", {
                name: "t",
                hash: {},
                data: a
            })) + "</span>\n    </div>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            var o, r;
            return "            <div>" + (null != (r = null != (r = n.message || (null != t ? t.message : t)) ? r : n.helperMissing, o = "function" == typeof r ? r.call(null != t ? t : {}, {
                name: "message",
                hash: {},
                data: a
            }) : r) ? o : "") + "</div>\n"
        },
        3: function(e, t, n, i, a) {
            var o, r;
            return '            <p class="message">' + (null != (r = null != (r = n.message || (null != t ? t.message : t)) ? r : n.helperMissing, o = "function" == typeof r ? r.call(null != t ? t : {}, {
                name: "message",
                hash: {},
                data: a
            }) : r) ? o : "") + "</p>\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o;
            return '<div class="message-hub-container">\n    <!--googleoff: all-->\n    <div class="container">\n' + (null != (o = n["if"].call(null != t ? t : {}, null != t ? t.isIndpendentHtml : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.program(3, a, 0),
                data: a
            })) ? o : "") + '        <span class="close-btn js-close issuuicon issuuicon-remove"></span>\n    </div>\n    <!--googleon: all-->\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            var o, r;
            return "            <div>" + (null != (r = null != (r = n.message || (null != t ? t.message : t)) ? r : n.helperMissing, o = "function" == typeof r ? r.call(null != t ? t : {}, {
                name: "message",
                hash: {},
                data: a
            }) : r) ? o : "") + "</div>\n"
        },
        3: function(e, t, n, i, a) {
            var o, r;
            return '            <p class="message">' + (null != (r = null != (r = n.message || (null != t ? t.message : t)) ? r : n.helperMissing, o = "function" == typeof r ? r.call(null != t ? t : {}, {
                name: "message",
                hash: {},
                data: a
            }) : r) ? o : "") + "</p>\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o;
            return '<div class="message-hub-container">\n    <!--googleoff: all-->\n    <div class="container">\n' + (null != (o = n["if"].call(null != t ? t : {}, null != t ? t.isIndpendentHtml : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.program(3, a, 0),
                data: a
            })) ? o : "") + '        <span class="close-btn js-close issuuicon issuuicon-remove"></span>\n    </div>\n    <!--googleon: all-->\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            return 'checked="checked"'
        },
        3: function(e, t, n, i, a) {
            return '    <div class="w-stackeditor__bottom text-center bg-light">\n        <a class="js-w-stackeditor-btn-delete text-danger" href="javascript:void(0);">\n            <span class="issuuicon issuuicon-remove"></span> ' + e.escapeExpression(n.t.call(null != t ? t : {}, "stackeditor.buttons.deletestack", {
                name: "t",
                hash: {},
                data: a
            })) + "\n        </a>\n    </div>\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression;
            return '<div class="w-stackeditor bg-white">\n    <div class="w-stackeditor__top">\n        <h1 class="w-stackeditor__title text-center">' + u((r = null != (r = n.title || (null != t ? t.title : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "title",
                hash: {},
                data: a
            }) : r)) + '</h1>\n        <form>\n            <div class="form-group">\n                <span class="js-w-stackeditor-name-error"></span>\n                <input class="form-control" type="text" name="name" value="' + u((r = null != (r = n.name || (null != t ? t.name : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "name",
                hash: {},
                data: a
            }) : r)) + '" placeholder="' + u(n.t.call(s, "stackeditor.placeholder.stacktitle", {
                name: "t",
                hash: {},
                data: a
            })) + '" maxlength="100" />\n            </div>\n            <div class="form-group">\n                <span class="js-w-stackeditor-description-error"></span>\n                <textarea class="form-control" name="description" placeholder="' + u(n.t.call(s, "stackeditor.placeholder.stackdescription", {
                name: "t",
                hash: {},
                data: a
            })) + '" rows="5" maxlength="1000">' + u((r = null != (r = n.description || (null != t ? t.description : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "description",
                hash: {},
                data: a
            }) : r)) + '</textarea>\n            </div>\n            <div class="form-group">\n                <div class="checkbox">\n                    <label>\n                        <input type="checkbox" name="secret" ' + (null != (o = n["if"].call(s, null != t ? t.secret : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + " />\n                        " + u(n.t.call(s, "stackeditor.label.private", {
                name: "t",
                hash: {},
                data: a
            })) + '\n                    </label>\n                </div>\n            </div>\n\n            <div class="w-stackeditor__actions text-center">\n                <button class="btn btn-success js-w-stackeditor-btn-save" type="submit"><span class="text">' + u((r = null != (r = n.positive || (null != t ? t.positive : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "positive",
                hash: {},
                data: a
            }) : r)) + '</span><span class="issuuicons"></span></button>\n                <button class="btn btn-default js-w-stackeditor-btn-cancel" type="button">' + u(n.t.call(s, "stackeditor.buttons.cancel", {
                name: "t",
                hash: {},
                data: a
            })) + '</button>\n            </div>\n\n            <p class="w-stackeditor__api-error js-w-stackeditor-api-error text-center"></p>\n        </form>\n    </div>\n\n' + (null != (o = n["if"].call(s, null != t ? t.deletable : t, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o = null != t ? t : {},
                r = e.escapeExpression;
            return '<div class="w-deletestack theme-red bg-red default-style text-center">\n    <h1 class="w-deletestack__title">' + r(n.t.call(o, "stackeditor.deleteStackHeadline", {
                name: "t",
                hash: {},
                data: a
            })) + '</h1>\n    <div class="w-deletestack__description">\n        ' + r(n.tr.call(o, t, {
                name: "tr",
                hash: {
                    stackname: "stackname",
                    key: "stackeditor.deleteStackParagraph"
                },
                data: a
            })) + '\n    </div>\n    <div class="w-deletestack__actions">\n        <button class="btn btn-primary js-w-deletestack-btn-confirm" tabindex="2">' + r(n.t.call(o, "stackeditor.buttons.deleteStackPositive", {
                name: "t",
                hash: {},
                data: a
            })) + '</button>\n        <button class="btn btn-default js-w-deletestack-btn-cancel" autofocus="autofocus" tabindex="1">' + r(n.t.call(o, "stackeditor.buttons.cancel", {
                name: "t",
                hash: {},
                data: a
            })) + "</button>\n    </div>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            return "selected"
        },
        3: function(e, t, n, i, a) {
            return "selectiononly"
        },
        5: function(e, t, n, i, a) {
            return 'href="' + e.escapeExpression(e.lambda(null != t ? t.stackUrl : t, t)) + '"'
        },
        7: function(e, t, n, i, a) {
            var o;
            return '                <span class="centerer">\n                    <span class="hoverer">\n                        <img ' + (null != (o = n["if"].call(null != t ? t : {}, null != t ? t.coverUrl : t, {
                name: "if",
                hash: {},
                fn: e.program(8, a, 0),
                inverse: e.program(10, a, 0),
                data: a
            })) ? o : "") + " />\n                    </span>\n                </span>\n"
        },
        8: function(e, t, n, i, a) {
            return ' src="' + e.escapeExpression(e.lambda(null != t ? t.coverUrl : t, t)) + '" '
        },
        10: function(e, t, n, i, a) {
            return ' style="width:180px; height: 240px;" '
        },
        12: function(e, t, n, i, a) {
            var o, r = null != t ? t : {};
            return '                    <canvas width="180" height="240"></canvas>\n                    <span class="nopubs" ' + (null != (o = n["if"].call(r, null != (o = null != t ? t.stack : t) ? o.secret : o, {
                name: "if",
                hash: {},
                fn: e.program(13, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + ">" + e.escapeExpression(n.t.call(r, "stack.emptystack", {
                name: "t",
                hash: {},
                data: a
            })) + "</span>\n"
        },
        13: function(e, t, n, i, a) {
            return 'style="display: none;"'
        },
        15: function(e, t, n, i, a) {
            return '                <span class="selection issuuicon issuuicon-ok"></span>\n'
        },
        17: function(e, t, n, i, a) {
            return '                <span class="hint">' + e.escapeExpression(n.t.call(null != t ? t : {}, "stack.openstack", {
                name: "t",
                hash: {},
                data: a
            })) + "</span>\n"
        },
        19: function(e, t, n, i, a) {
            return '    <div class="actionwrapper">\n        <a class="action editstack issuuicon issuuicon-cog btn btn-default" href="javascript:void(0);"></a>\n    </div>\n'
        },
        21: function(e, t, n, i, a) {
            var o, r = null != t ? t : {};
            return '            <ul class="counts type-small">\n                <li>\n                    ' + e.escapeExpression(e.lambda(null != (o = null != t ? t.stack : t) ? o.docCount : o, t)) + ' <span class="issuuicon issuuicon-file"></span>\n                </li>\n\n' + (null != (o = n["if"].call(r, null != (o = null != t ? t.stack : t) ? o.subscriberCount : o, {
                name: "if",
                hash: {},
                fn: e.program(22, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "            </ul>\n\n" + (null != (o = n.unless.call(r, null != (o = null != t ? t.options : t) ? o.hideOwner : o, {
                name: "unless",
                hash: {},
                fn: e.program(24, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "\n" + (null != (o = n.unless.call(r, null != (o = null != t ? t.options : t) ? o.hideDescription : o, {
                name: "unless",
                hash: {},
                fn: e.program(27, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "")
        },
        22: function(e, t, n, i, a) {
            var o;
            return "                <li>\n                    " + e.escapeExpression(e.lambda(null != (o = null != t ? t.stack : t) ? o.subscriberCount : o, t)) + ' <span class="issuuicon issuuicon-people"></span>\n                </li>\n'
        },
        24: function(e, t, n, i, a) {
            var o;
            return '            <a class="ownername unstyled type-discreet type-small" ' + (null != (o = n.unless.call(null != t ? t : {}, null != (o = null != t ? t.options : t) ? o.selectionOnly : o, {
                name: "unless",
                hash: {},
                fn: e.program(25, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "> " + e.escapeExpression(e.lambda(null != (o = null != t ? t.stack : t) ? o.ownerDisplayName : o, t)) + " </a>\n"
        },
        25: function(e, t, n, i, a) {
            return 'href="' + e.escapeExpression(e.lambda(null != t ? t.profileUrl : t, t)) + '"'
        },
        27: function(e, t, n, i, a) {
            var o;
            return '                <p class="description" title="' + e.escapeExpression(e.lambda(null != (o = null != t ? t.stack : t) ? o.description : o, t)) + '">\n' + (null != (o = n["if"].call(null != t ? t : {}, null != (o = null != t ? t.stack : t) ? o.description : o, {
                name: "if",
                hash: {},
                fn: e.program(28, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "                </p>\n"
        },
        28: function(e, t, n, i, a) {
            var o, r = null != t ? t : {};
            return "                        <a " + (null != (o = n.unless.call(r, null != (o = null != t ? t.options : t) ? o.selectionOnly : o, {
                name: "unless",
                hash: {},
                fn: e.program(5, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + ' class="unstyled type-discreet" tabindex="-1">' + e.escapeExpression(n.smarttruncate.call(r, null != (o = null != t ? t.stack : t) ? o.description : o, {
                name: "smarttruncate",
                hash: {},
                data: a
            })) + "</a>\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = e.lambda,
                l = e.escapeExpression;
            return '<div class="stack ' + (null != (o = n["if"].call(r, null != (o = null != t ? t.stack : t) ? o.selected : o, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + " " + (null != (o = n["if"].call(r, null != (o = null != t ? t.options : t) ? o.selectionOnly : o, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '" data-stackid="' + l(s(null != (o = null != t ? t.stack : t) ? o.id : o, t)) + '">\n    <a ' + (null != (o = n.unless.call(r, null != (o = null != t ? t.options : t) ? o.selectionOnly : o, {
                name: "unless",
                hash: {},
                fn: e.program(5, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '>\n        <span class="stack-cover v' + l(s(null != t ? t.version : t, t)) + '">\n            <span class="cover-container">\n' + (null != (o = n.each.call(r, null != t ? t.pubs : t, {
                name: "each",
                hash: {},
                fn: e.program(7, a, 0),
                inverse: e.program(12, a, 0),
                data: a
            })) ? o : "") + '            </span>\n\n            <span class="secret" ' + (null != (o = n.unless.call(r, null != (o = null != t ? t.stack : t) ? o.secret : o, {
                name: "unless",
                hash: {},
                fn: e.program(13, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '><span class="issuuicon issuuicon-eye-closed"></span></span>\n' + (null != (o = n["if"].call(r, null != (o = null != t ? t.options : t) ? o.selectionOnly : o, {
                name: "if",
                hash: {},
                fn: e.program(15, a, 0),
                inverse: e.program(17, a, 0),
                data: a
            })) ? o : "") + "        </span>\n\n    </a>\n" + (null != (o = n["if"].call(r, null != t ? t.showEditButton : t, {
                name: "if",
                hash: {},
                fn: e.program(19, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '\n    <div class="metadata">\n        <h3 title="' + l(s(null != (o = null != t ? t.stack : t) ? o.name : o, t)) + '"><a ' + (null != (o = n.unless.call(r, null != (o = null != t ? t.options : t) ? o.selectionOnly : o, {
                name: "unless",
                hash: {},
                fn: e.program(5, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + ' class="unstyled type-discreet" tabindex="-1"> ' + l(s(null != (o = null != t ? t.stack : t) ? o.name : o, t)) + " </a></h3>\n" + (null != (o = n.unless.call(r, null != (o = null != t ? t.options : t) ? o.miniVersion : o, {
                name: "unless",
                hash: {},
                fn: e.program(21, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "    </div>\n\n    " + (null != (o = s(null != t ? t.followMenuMarkup : t, t)) ? o : "") + "\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            return " profile-teaser--personal"
        },
        3: function(e, t, n, i, a) {
            var o;
            return '        <li class="profile-teaser__counts-item">\n            ' + e.escapeExpression(e.lambda(null != (o = null != t ? t.user : t) ? o.docCount : o, t)) + ' <span class="issuuicon issuuicon-file"></span>\n        </li>\n'
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = e.lambda,
                l = e.escapeExpression;
            return '<div class="profile-teaser' + (null != (o = n.unless.call(r, null != (o = null != t ? t.user : t) ? o.isBusiness : o, {
                name: "unless",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '">\n    <a class="profile-teaser__cover" href="' + l(s(null != t ? t.profileUrl : t, t)) + '">\n        <img class="profile-teaser__cover-image" src="' + l(s(null != t ? t.userPhotoUrl : t, t)) + '" alt="' + l(s(null != (o = null != t ? t.user : t) ? o.displayName : o, t)) + '">\n        <div class="profile-teaser__cover-overlay">' + l(n.t.call(r, "stream.seeprofile", {
                name: "t",
                hash: {},
                data: a
            })) + '</div>\n    </a>\n    <h3 class="profile-teaser__title">\n        <a href="' + l(s(null != t ? t.profileUrl : t, t)) + '" tabindex="-1">' + l(s(null != (o = null != t ? t.user : t) ? o.displayName : o, t)) + '</a>\n    </h3>\n    <ul class="profile-teaser__counts">\n' + (null != (o = n["if"].call(r, null != (o = null != t ? t.user : t) ? o.docCount : o, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '        <li class="profile-teaser__counts-item">\n            ' + l(s(null != (o = null != t ? t.user : t) ? o.stackCount : o, t)) + ' <span class="issuuicon issuuicon-stack"></span>\n        </li>\n        <li class="profile-teaser__counts-item">\n            ' + l(s(null != (o = null != t ? t.user : t) ? o.subscriberCount : o, t)) + ' <span class="issuuicon issuuicon-people"></span>\n        </li>\n    </ul>\n    <p class="profile-teaser__description">\n        ' + l(n.truncTxt.call(r, null != (o = null != t ? t.user : t) ? o.description : o, 100, {
                name: "truncTxt",
                hash: {},
                data: a
            })) + "\n    </p>\n\n    " + (null != (o = s(null != t ? t.followMenuMarkup : t, t)) ? o : "") + "\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    function i(e) {
        var t = (new Date).getTime(),
            n = new Date(e.endDate).getTime(),
            i = (n - t) / 1e3 / 60;
        s.set(u, t, {
            expires: i
        })
    }

    function a(e) {
        var t = e.content;
        r.broadcast(l.messagehubInfo, {
            onUserClose: function() {
                i(e)
            },
            autoDismiss: !1,
            message: t
        })
    }
    var o = n(4),
        r = n(2),
        s = n(41),
        l = n(25),
        c = n(12),
        u = "termsAccepted";
    t.init = function() {
        if (o.isLoggedIn()) {
            var e = c.get("terms");
            if (!e) return;
            o.getCreated().done(function(t) {
                var n = (new Date).getTime(),
                    i = new Date(e.startDate).getTime(),
                    o = new Date(e.endDate).getTime(),
                    r = new Date(t).getTime(),
                    l = s.get(u),
                    c = n > i && o > n,
                    d = i > r;
                !l && c && d && a(e)
            })
        }
    }
}, function(e, t) {
    function n(e) {
        var t;
        if (0 === e.length) throw new Error("Can not find value for: ", name);
        return 1 === e.length ? t = "checkbox" === e.attr("type") ? e.is(":checked") ? "on" : "off" : e.val() : "radio" === e.attr("type") && (t = $("input:radio[name=" + name + "]:checked").val()), t
    }

    function i(e, t) {
        var i = e.attr("type");
        i = i ? i.toLowerCase() : i;
        var a = n(e);
        (e.is("textarea") || e.is("input") && ("text" === i || "" === i)) && e.on("keyup", function() {
            var i = n(e);
            i !== a && (t(), a = i)
        }), (e.is(":radio") || e.is(":checkbox")) && e.on("change", function() {
            t()
        })
    }
    var a = {
        onChange: "",
        field: ""
    };
    t.init = function(e) {
        function t() {
            return n(r.field)
        }

        function o(e) {
            i(r.field, e)
        }
        var r = _.assign(a, e);
        if (!r.field) throw new Error("You must specify a field.");
        r.field = $(r.field), r.onChange = r.onChange, r.onChange && i(r.field, r.onChange);
        var s = {
            change: o,
            getValue: t
        };
        return s
    }
}, function(e, t, n) {
    function i() {
        window.clearTimeout(d), gapi.client.setApiKey(y.social.googleid), gapi.auth.init(p.resolve)
    }

    function a() {
        if (!p) {
            if (p = new $.Deferred, 0 === $("#google-jssdk").length) {
                window.googleAsyncInit = i;
                var e = document.createElement("script");
                e.id = "google-jssdk", e.async = !0, e.src = "https://apis.google.com/js/client.js?onload=googleAsyncInit", $("head").get(0).appendChild(e)
            }
            d = window.setTimeout(function() {
                window.googleAsyncInit = void 0, p.reject("Could not load Google SDK."), v.log("Google", "Google SDK timed out.")
            }, 15e3)
        }
        return p.promise()
    }

    function o(e) {
        var t = {
            url: ""
        };
        _.extend(t, e);
        var n = 550,
            i = 420,
            a = (screen.width - n) / 2,
            o = (screen.height - i) / 2,
            r = "width=" + n + ",height=" + i + ",left=" + a + ",top=" + o,
            s = "https://plus.google.com/share?url=" + encodeURIComponent(t.url);
        window.open(s, "_blank", r)
    }

    function r(e, t) {
        var n = h.publicationUrl(e.owner, e.name, e.pageNumber);
        t && (n += "?e=" + t), o({
            url: n
        }), f.broadcast(f.events.documentShare, {
            publicationId: e.publicationId,
            revisionId: e.revisionId,
            publicationName: e.name,
            ownerUsername: e.owner,
            service: b
        })
    }

    function s(e, t) {
        var n = h.clippingUrl(e.owner, e.name, e.clippingId);
        t && (n += "?e=" + t), o({
            url: n
        }), f.broadcast(f.events.clippingShare, {
            clippingId: e.clippingId,
            clippingPage: e.clippingPage,
            service: b
        })
    }

    function l(e, t, n) {
        var i = new $.Deferred;
        if (w) return i;
        w = !0;
        var a = {
                action: t === !0 ? "issuu.user.signup_external_account" : "issuu.user.login_external_account",
                type: "POST"
            },
            o = {
                accessToken: e,
                state: "google|" + (new Date).getTime()
            };
        n && (o = _.merge(o, n));
        var r = m.create(a).parameters(o).call();
        return $.when(r).then(function(e) {
            w = !1, g.beginLoginSession(e.user.username), i.resolve(e)
        }, function(e) {
            w = !1, i.reject(e._content.error)
        }), i
    }

    function c(e) {
        var t = new $.Deferred;
        return gapi.auth.authorize({
            client_id: y.social.googleid,
            scope: k,
            apppackagename: "com.issuu.android.app",
            cookie_policy: e ? void 0 : "single_host_origin",
            immediate: !e
        }, function(e) {
            e.access_token && "PROMPT" === e.status.method ? t.resolve(e) : t.reject(e)
        }), t.promise()
    }

    function u(e) {
        var t = new $.Deferred;
        return c(!0).then(function(n) {
            l(n.access_token, e === !0).then(t.resolve, t.reject)
        }, t.reject), t.promise()
    }
    var d, p, h = n(5),
        f = n(2),
        m = n(7),
        g = n(4),
        v = n(1),
        b = "google",
        w = !1,
        y = n(6),
        k = "profile email";
    t.sharePost = o, t.sharePublication = r, t.shareClipping = s, t.loadSdk = a, t.authorizeWithDialog = function() {
        return c(!0)
    }, t.authorizeWithoutDialog = function() {
        return c(!1)
    }, t.loginWithAccessToken = l, t.loginWithDialog = function() {
        return u(!1)
    }, t.signupWithDialog = function() {
        return u(!0)
    }
}, function(e, t, n) {
    function i(e) {
        var t = {
            title: "",
            description: "",
            url: "",
            photoUrl: ""
        };
        _.extend(t, e);
        var n = 550,
            i = 420,
            a = (screen.width - n) / 2,
            o = (screen.height - i) / 2,
            r = "width=" + n + ",height=" + i + ",left=" + a + ",top=" + o,
            s = "http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(t.url) + "&title=" + encodeURIComponent(t.title) + "&summary=" + (t.description && t.description !== t.title ? encodeURIComponent(t.description) : "") + "&source=Issuu";
        window.open(s, "_blank", r)
    }

    function a(e, t) {
        var n = c.publicationUrl(e.owner, e.name, e.pageNumber),
            a = c.pageFullUrl(e.publicationId, e.revisionId, e.pageNumber);
        t && (n += "?e=" + t), i({
            url: n,
            photoUrl: a,
            title: e.title,
            description: e.description
        }), u.broadcast(u.events.documentShare, {
            publicationId: e.publicationId,
            revisionId: e.revisionId,
            publicationName: e.name,
            ownerUsername: e.owner,
            service: p
        })
    }

    function o(e, t) {
        var n = c.clippingUrl(e.owner, e.name, e.clippingId),
            a = c.clippingThumbUrl(e.clippingId);
        t && (n += "?e=" + t), i({
            url: n,
            photoUrl: a
        }), u.broadcast(u.events.clippingShare, {
            clippingId: e.clippingId,
            clippingPage: e.clippingPage,
            service: p
        })
    }

    function r() {
        var e = {
                action: "issuu.user.get_external_authentication_url"
            },
            t = {
                authProvider: "linkedin",
                signup: !0
            },
            n = d.create(e).parameters(t).call();
        return n
    }

    function s() {
        return r()
    }

    function l(e) {
        var t = 550,
            n = 420,
            i = (screen.width - t) / 2,
            a = (screen.height - n) / 2,
            o = "width=" + t + ",height=" + n + ",left=" + i + ",top=" + a + ",location=no,menubar=no,status=no,toolbar=no,directories=no";
        window.open(e, "_blank", o)
    }
    var c = n(5),
        u = n(2),
        d = n(7),
        p = "linkedin";
    t.login = l, t.loadLoginUrl = s, t.sharePost = i, t.sharePublication = a, t.shareClipping = o
}, function(e, t, n) {
    var i, a = n(7),
        o = n(4),
        r = n(2),
        s = n(1);
    t.getPublisherPlan = function(e) {
        if (o.isLoggedIn()) {
            if (i && !e) return s.log("track-helper", "Using cache", i), (new $.Deferred).resolve(i).promise();
            var t = new $.Deferred;
            return a.create({
                path: "res/licensing/" + o.getUsername() + "/publisher_plan",
                timeout: 3e3
            }).parameters().call().then(function(e) {
                var n = {
                    plan: e.plan
                };
                s.log("track-helper", "Setting cache from server", i), i = n, t.resolve(n)
            }, function(e) {
                s.log("track-helper", "getPublisherPlan failed - resolving with undefined."), t.resolve({
                    plan: void 0
                })
            }), t.promise()
        }
        return s.log("track-helper", "User not logged in"), (new $.Deferred).resolve({
            plan: void 0
        }).promise()
    }, r.subscribe(r.events.planStateChange, function() {
        s.log("track-helper", "Breaking cache"), i = void 0
    })
}, function(e, t, n) {
    function i() {
        var e = n(92)({
            mixpanelToken: o.tracking.mixpanel
        });
        r.log("mixpanel", "Script inserted"), $("head").append(e)
    }
    var a, o = n(6),
        r = n(1),
        s = 2500;
    t.load = function() {
        if (!a) {
            var e = new Date;
            a = new $.Deferred, window.mixpanel || i();
            var t = setInterval(function() {
                window.mixpanel && "function" == typeof window.mixpanel.track ? (r.log("mixpanel", "Ready"), clearInterval(t), a.resolve()) : new Date - e > s && (r.log("mixpanel", "Failed loading"), clearInterval(t), a.reject())
            }, 50)
        }
        return a.promise()
    }
}, function(e, t) {
    var n = 0;
    t.benchmark = function() {
        if (0 === n)
            for (var e, t = 500, i = new Date;;) {
                if (e = new Date, e - i > t) break;
                n++
            }
        return n
    }
}, function(e, t) {
    t.getBaseUrl = function() {
        return "/home/services"
    }, t.getTiersQuery = function(e) {
        var t = [];
        return _.each(e, function(e) {
            t.push({
                name: "wantedTiers",
                value: e
            })
        }), $.param(t)
    }
}, function(e, t, n) {
    function i() {
        $(document.body).on("click", "a>button", function() {
            window.location = $(this).parent("a").attr("href")
        })
    }
    n(32), n(30), n(81), n(31), n(120);
    var a = n(121),
        o = n(66),
        r = n(2),
        s = n(20),
        l = n(111);
    t.init = function(e) {
        return o = _.merge(o, e), t
    }, t.ready = function(e) {
        $(document).ready(function() {
            n(1), o.facebookAutoLogin && n(27).tryAutoLogin(), o.autoTrackPageView && r.broadcast(r.events.pageView), o.redirectOnLogout && r.subscribe(r.events.userAuthStatusChanged, function(e) {
                e === !1 && (location.href = "/")
            }), s.init().then(function() {
                i(), a.checkServiceNotification(), a.checkTermsWarning(), a.showUserNotifications(), a.showFriendlyNotifications(), e(), l.init()
            })
        })
    }
}, function(e, t, n) {
    function i(e) {
        e.registerHelper("t", function(e, t) {
            var n = i18n.t(e, t.hash);
            return new Handlebars.SafeString(n)
        }), e.registerHelper("tr", function(e, t) {
            if (void 0 === t.hash.key) throw new Error("missing translation key");
            var n = t.hash.key,
                i = {};
            _.forEach(t.hash, function(t, n) {
                "key" !== n && (i[n] = e[t])
            }), t.fn && (i.defaultValue = t.fn(e));
            var a = i18n.t(n, i);
            return new Handlebars.SafeString(a)
        }), e.registerHelper("trs", function(e, t) {
            if (void 0 === t.hash.key) throw new Error("missing translation key");
            var n = t.hash.key,
                i = {};
            _.forEach(t.hash, function(t, n) {
                "key" !== n && (i[n] = Handlebars.Utils.escapeExpression(e[t]))
            }), t.fn && (i.defaultValue = t.fn(e));
            var a = i18n.t(n, i);
            return new Handlebars.SafeString(a)
        })
    }

    function a(e) {
        e.registerHelper("truncTxt", function(e, t) {
            var n, i = Handlebars.Utils.escapeExpression(e);
            return i ? i.length > t ? (n = i.substr(0, t), n.lastIndexOf(" ") > n.length - 5 && (n = i.substr(0, n.lastIndexOf(" "))), n += "...") : n = i : n = "", new Handlebars.SafeString(n)
        }), e.registerHelper("smarttruncate", function(e, t, n) {
            var i = t,
                a = n;
            "number" != typeof t && (i = void 0), "number" != typeof n && (a = void 0);
            var r = o.getShortDescription(e, i, a);
            return r = Handlebars.Utils.escapeExpression(r), new Handlebars.SafeString(r)
        }), e.registerHelper("breaklines", function(e) {
            var t = Handlebars.Utils.escapeExpression(e);
            return t = t.toString(), t = t.replace(/(\r\n|\n|\r){2,}/g, "<br /><br />").replace(/(\r\n|\n|\r)/g, "<br />"), new Handlebars.SafeString(t)
        })
    }
    var o = n(22);
    ! function() {
        i(Handlebars), a(Handlebars)
    }(), e.exports.addTranslateHelpers = i
}, function(e, t, n) {
    function i(e) {
        if (e.type && l.notifications[e.type]) {
            var t = {},
                n = {},
                i = u.events.messagehubWarn;
            switch (e.type) {
                case "emailChangeRejected":
                    n = {
                        url: "/home/settings?focus=email",
                        newEmail: e.content.newEmail,
                        oldEmail: e.content.oldEmail
                    }, t.message = i18n.t("user_notification.emailChangeRejected", n);
                    break;
                case "unlistedExceeded":
                    var a = f.getBaseUrl();
                    "unlisted.unlimited" !== e.content.tierSuggestion && (a += "?" + f.getTiersQuery([e.content.tierSuggestion])), n = {
                        servicesUrl: a,
                        licenseCount: e.content.licenseCount,
                        unlistedCount: e.content.unlistedCount
                    }, t.message = i18n.t("user_notification.unlistedExceeded", n);
                    break;
                case "emailRejected":
                    n = {
                        url: "/home/settings?focus=email",
                        email: e.content.rejectedEmail
                    }, t.message = i18n.t("user_notification.emailRejected", n);
                    break;
                case "dunning":
                    i = u.events.messagehubWarn, t.message = i18n.t("user_notification.dunning", {});
                    break;
                case "suspended":
                    i = u.events.messagehubError, t.message = i18n.t("user_notification.suspended", {});
                    break;
                case "confirmEmail":
                    i = u.events.messagehubInfo, t.message = i18n.t("user_notification.confirmEmail", {});
                    break;
                case "friendly":
                    t.message = e.content, e.needsAck = !0, i = u.events.messagehubFriendlyNotification;
                    break;
                default:
                    return
            }
            e.needsAck === !0 && (t.onUserClose = function() {
                d.create({
                    path: "call/notifier/inbox/acknowledge",
                    type: "POST"
                }).parameters({
                    notificationId: e.id
                }).call()
            }), u.broadcast(i, t)
        }
    }

    function a(e, t, n) {
        return _.isUndefined(e.notifications) ? void g.error("NOTIFICATIONS: rsp.notifications undefined for " + JSON.stringify(e)) : (v.set(t, 0 !== e.notifications.length, {
            expires: 5,
            isPrivate: !0
        }), void _.forEach(e.notifications, n))
    }

    function o(e, t) {
        window.setTimeout(function() {
            d.create({
                type: "POST",
                path: "call/notifier/friendly/acknowledge"
            }).parameters({
                notificationId: e.id,
                type: e.type,
                ackType: t
            }).call().then(function() {})
        }, 1e3)
    }

    function r(e, t) {
        d.create({
            path: "call/notifier/friendly/statistics",
            type: "POST"
        }).parameters({
            notificationId: t.id,
            type: t.type,
            name: e
        }).call()
    }

    function s(e) {
        var t = {
            message: e.content
        };
        _.isUndefined(e.promo) || _.isUndefined(e.type) || (t.addCssClass = "friendly-" + e.promo + "-" + e.type), t.onUserClose = function() {
            o(e, "close"), r("DISMISSES", e)
        }, t.onShow = function() {
            r("IMPRESSIONS", e)
        }, t.onExpand = function() {
            r("EXPANDS", e)
        }, t.onCTA = function() {
            o(e, "cta"), r("CTAS", e)
        }, u.broadcast(u.events.messagehubFriendlyNotification, t)
    }
    var l = n(66),
        c = n(10),
        u = n(2),
        d = n(7),
        p = n(4),
        h = n(9),
        f = n(118),
        m = n(80),
        g = n(1),
        v = c.create("userNotifications.", c.LOCAL);
    t.showFriendlyNotifications = function() {
        l.notifications.friendly && v.get("friendly") !== !1 && window.setTimeout(function() {
            var e = p.isLoggedIn() && !l.notifications.alwaysSmallFriendly ? "big" : "small";
            d.create({
                path: "call/notifier/friendly/get"
            }).parameters({
                type: e
            }).call().then(function(e) {
                a(e, "friendly", s)
            })
        }, 1e3)
    }, t.showUserNotifications = function() {
        window.setTimeout(function() {
            p.isLoggedIn() && v.get(p.getUsername()) !== !1 && d.create({
                path: "call/notifier/inbox2/get"
            }).call().then(function(e) {
                a(e, p.getUsername(), i)
            })
        }, 5e3)
    }, t.checkTermsWarning = function() {
        l.notifications.terms && p.isLoggedIn() && h.getCookie("site.model.termsWarning") && u.broadcast(u.events.messagehubWarn, i18n.t("user_notification.checkTermsWarning", {
            url: "/acceptterms"
        }))
    }, t.checkServiceNotification = function() {
        var e = _.first(m.getNotifications());
        e && u.broadcast(u.events.messagehubWarn, e)
    }
}, function(e, t, n) {
    function i(e) {
        e.preventDefault(), c.trackExternalPageNavigation(r(this).data("header-nav-track-external"), function() {
            window.location = r(e.target).attr("href")
        })
    }

    function a(e) {
        c.trackInternalPageNavigation(r(this).data("header-nav-track-internal"))
    }

    function o(e, t) {
        var n, o = {};
        e && (o = e), n = n instanceof r ? t : r("body"), n.on("click", "[data-header-nav-track-internal]", a), n.on("click", "[data-header-nav-track-external]", i), s.init({
            updateUserStatusOnLogin: o.updateUserStatusOnLogin
        }, n), l(n), u.enableGlobalDropZone(), c.processRecordedEvents()
    }
    var r = n(17),
        s = n(124),
        l = n(123),
        c = n(68),
        u = n(126);
    e.exports = {
        init: o,
        updateUserStatus: s.updateUserStatus
    }
}, function(e, t, n) {
    function i() {
        var e = d.find(p);
        return e.val()
    }

    function a(e) {
        var t = {
            prefix: i(),
            position: e,
            auto_completes: b
        };
        v.setCookie("search.suggestions_data", JSON.stringify(t), 1 / 1440)
    }

    function o(e, t) {
        b[i()] = t
    }

    function r() {
        d.find(h).addClass(f)
    }

    function s() {
        d.find(h).removeClass(f)
    }

    function l(e) {
        var t = -1;
        e.which === m && a(t)
    }

    function c() {
        return this.innerText
    }

    function u(e, t) {
        var n = d.find(".header-search__suggestion").map(c).get(),
            i = n.indexOf(t.value);
        a(i)
    }
    var d, p = ".js-header-search__input",
        h = ".js-header",
        f = "is-search-takeover",
        m = 13,
        g = n(160),
        v = n(9),
        b = {};
    e.exports = function(e) {
        var t = e.find(".js-header-search"),
            n = t.find(p);
        d = e, t.on("focus", p, r), t.on("blur", p, s), g.init({
            $form: t,
            $searchInput: n,
            typeAheadConfig: {
                classNames: {
                    cursor: "header-search__cursor",
                    wrapper: "header-search__typeahead",
                    menu: "header-search__suggestion-menu",
                    empty: "header-search__suggestion-menu--empty",
                    selectable: "header-search__suggestion--selectable",
                    suggestion: "header-search__suggestion"
                },
                hint: !1,
                highlight: !0,
                minLength: 1
            }
        }), n.bind("typeahead:autocomplete", o).bind("keydown", l).bind("typeahead:select", u)
    }
}, function(e, t, n) {
    function i() {
        var e = f.find(b);
        f.find(v).removeClass(g), e.removeClass(m), f.find(w).removeClass(m), $("body").css("margin-top", I)
    }

    function a(e) {
        e.preventDefault(), C.endLoginSession(), i(), E.processRecordedEvents()
    }

    function o() {
        var e = f.find(b),
            t = f.find(v),
            n = $("body");
        e.addClass(m), _.isScreenOnMobileBreakpoint() && n.css("margin-top", t.css("height")), t.addClass(g), f.find(w).addClass(m)
    }

    function r(e) {
        return e.preventDefault(), $(w).hasClass(m) ? i() : void o()
    }

    function s(e) {
        h = window.setTimeout(function() {
            r(e)
        }, k)
    }

    function l() {
        var e = "header-nav--loggedin",
            t = "header-nav--loggedout",
            n = ".js-header-nav",
            i = ".js-header-nav__user-profile-link";
        if (!f) throw new Error("$rootElement must be defined. Ensure the init function has been called already.");
        var a = f.find(n);
        C.isLoggedIn() ? (a.removeClass(t).addClass(e), f.find(w).css("background-image", "url(" + x.userSmallPhotoUrl(C.getUsername(), !0) + ")"), f.find(i).attr("href", "/" + C.getUsername().toLowerCase())) : (a.removeClass(e).addClass(t), f.find(w).css("background-image", "none"), f.find(i).attr("href", ""))
    }

    function c() {
        return "ontouchstart" in window
    }

    function u(e) {
        c() && (e.preventDefault(), window.location = "/explore")
    }

    function d(e) {
        window.clearTimeout(h), o(e)
    }

    function p(e, t) {
        var n = ".js-header-nav__signout";
        f = t, e.updateUserStatusOnLogin !== !1 && A.subscribe(A.events.userAuthStatusChanged, l), f.on("click", n, a), c() ? f.on("click", w, r) : (f.on("mouseover", w, d), f.on("mouseover", b, d), f.on("mouseout", w, s), f.on("mouseout", b, s)), f.on("click", y, u)
    }
    var h, f, m = "is-active",
        g = "is-user-menu-takeover",
        v = ".js-header",
        b = ".js-header-nav__user-dropdown",
        w = ".js-header-nav__user-avatar",
        y = ".js-header-nav__nav-item--logo",
        k = 300,
        _ = n(125),
        x = n(5),
        C = n(4),
        A = n(2),
        E = n(68),
        I = $(document.body).css("margin-top");
    e.exports = {
        init: p,
        updateUserStatus: l
    }
}, function(e, t) {
    function n() {
        return document.body.offsetWidth <= i
    }
    var i = 720;
    e.exports = {
        isScreenOnMobileBreakpoint: n
    }
}, function(e, t) {
    function n(e) {
        var t = e || "n",
            n = window.encodeURIComponent(location.pathname + location.search),
            i = "/publish?r=" + n + "&t=" + t;
        return i
    }

    function i(e) {
        if (!r) {
            e.stopPropagation(), e.preventDefault();
            for (var t = e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.types || [], i = 0; i < t.length; ++i)
                if ("Files" === t[i]) return r = !0, location.href = n("drag"), !1
        }
        return !1
    }

    function a() {
        location.href = n("click")
    }
    var o = $("body"),
        r = !1;
    t.enableGlobalDropZone = function() {
        o.on("dragenter", i)
    }, t.disableGlobalDropZone = function() {
        o.off("dragenter", i)
    }, t.onPublishBtnClick = a
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e.className.match(/\bstream2__element\b/) ? e : i(e.parentNode)
    }

    function a(e) {
        return "streamElm" + e
    }

    function o(e) {
        var t = $(i(e.target));
        t.toggleClass("stream2-doc-element--open")
    }
    var r = n(2),
        s = n(15),
        l = n(5),
        c = n(24),
        u = n(191).setText,
        d = 40;
    e.exports = {
        getHeight: function(e, t) {
            return e.aspect || (e.aspect = e.content.height / e.content.width), e.aspect * t + d
        },
        publicationUrl: l.relative.publicationUrl,
        imageUrl: l.pageLargeThumbUrl,
        init: function(e) {
            e.className.match(/\bstream2-doc-element\b/) || (e.className += " stream2-doc-element");
            var t = e.querySelector(".stream2-doc-element__img");
            t.addEventListener("load", this._onImageLoad), t.addEventListener("error", this._onImageError), t.parentNode.addEventListener("click", this._onClick);
            var n = e.querySelector(".stream2-doc-element__metadata");
            n.addEventListener("click", o)
        },
        update: function(e, t, n, i, o) {
            var r = a(n);
            e.setAttribute("data-element-id", r), e.setAttribute("data-publicationId", t.content.publicationId), t.imageUrl || (t.imageUrl = this.imageUrl(t.content.publicationId, t.content.revisionId)), t.publicationUrl || (t.publicationUrl = this.publicationUrl(t.content.ownerUsername, t.content.publicationName)), t.publicationAge || (t.publicationAge = c(t.content.publishDate).fromNow()), this._broadcastDocumentCreated(e, r, t, n, i, o);
            var s = e.querySelector(".stream2-doc-element__img");
            s.src !== t.imageUrl && (s.style.opacity = 0, s.alt = t.content.title || "", s.src = "", s.src = t.imageUrl, s.parentNode.href = t.publicationUrl), u(e.querySelector(".stream2-doc-element__publication-age"), t.publicationAge);
            var l = e.querySelector(".stream2-doc-element__title > a");
            l.href = t.publicationUrl, u(l, t.content.title || "");
            var d = e.querySelector(".stream2-doc-element__ownername > a");
            d.href = "/" + t.content.ownerUsername, u(d, t.content.ownerDisplayName || ""), e.className = e.className.replace(/\bstream2-doc-element--open\b/, "")
        },
        _onImageLoad: function(e) {
            e.target.style.opacity = 1;
            var t = i(e.target),
                n = t.getAttribute("data-element-id");
            r.broadcast(s.DOCLOADED, n)
        },
        _onImageError: function(e) {
            var t = i(e.target),
                n = t.getAttribute("data-publicationId");
            r.broadcast(s.DOCERROR, {
                publicationId: n,
                url: e.target.src
            })
        },
        _onClick: function(e) {
            var t = i(e.target),
                n = t.getAttribute("data-element-id"),
                a = i(e.target).getAttribute("data-publicationId");
            r.broadcast(s.DOCCLICKED, n, {
                publicationId: a,
                url: e.target.href,
                clickX: e.clientX,
                clickY: e.clientY
            });
            var o = e.target.querySelector("img").alt;
            r.broadcast(r.events.streamDocumentClicked, {
                title: o,
                event: e
            })
        },
        _broadcastDocumentCreated: function(e, t, n, i, a, o) {
            var l = $(e).offset();
            r.broadcast(s.DOCCREATED, t, {
                publicationId: n.content.publicationId,
                revisionId: n.content.revisionId,
                ownerUsername: n.content.ownerUsername,
                publicationName: n.content.publicationName,
                page: 1,
                origin: n.origin,
                ranking: i,
                x: l.left,
                y: l.top,
                height: a,
                width: o
            })
        },
        _getRoot: i
    }
}, function(e, t, n) {
    function i() {
        return "div_stream_ads_element_300x250_" + r++
    }
    var a = n(50),
        o = n(96),
        r = 0;
    t.create = function(e) {
        var t, r, s = !1,
            l = 0;
        ! function() {
            e.template = o, e.adId = i(), e.isRegistered = !1, r = a.create({
                adType: e.mayContainVideo ? "300x250-video" : "300x250",
                allowed: !0
            }), t = n(11).create(e), t.setHeight(300)
        }();
        var c = t.didInsertElement;
        t.didInsertElement = function() {
            c(), s = !0;
            var e = t.getDomElement();
            e && (t.isRegistered || (t.isRegistered = !0, r.show(t.adId)))
        }, t.isInDom = function() {
            return s
        };
        var u = t.setPosition;
        t.setPosition = function(e) {
            l && (e.x += l), u(e)
        };
        var d = t.getPosition;
        t.getPosition = function() {
            var e = d();
            return e.x -= l, e
        }, t.getMinWidth = function() {
            return 300
        }, t.getMinHeight = function() {
            return 250
        };
        var p = t.setWidth;
        return t.setWidth = function(e) {
            var n = Math.max(e, t.getMinWidth());
            l = Math.floor((e - n) / 2), p(n)
        }, t.willShow = function() {
            return r.willShow()
        }, t
    }
}, function(e, t, n) {
    var i = n(1),
        a = {
            1: {
                start: 1,
                distance: 12,
                delta: 0
            },
            2: {
                start: 1,
                distance: 5,
                delta: 10
            },
            3: {
                start: 1,
                distance: 7,
                delta: 20
            },
            4: {
                start: 2,
                distance: 12,
                delta: 20
            }
        },
        o = n(128),
        r = n(130);
    t.create = function() {
        function e(e) {
            for (var t = 0, n = h.length - 1; n > t; t++)
                if (e <= h[t]) return t + 1;
            return h.length
        }

        function t(e) {
            _.forEach(e, function(e) {
                switch (e.type) {
                    case "first":
                        e.mayContainVideo = !0, d.push(o.create(e));
                        break;
                    case "300x250":
                        d.push(o.create(e));
                        break;
                    case "native":
                        d.push(r.create(e))
                }
            })
        }

        function n(e) {
            return {
                uniqueId: Math.floor(1e4 * Math.random()),
                type: e
            }
        }

        function s() {
            t([n("300x250"), n("native")])
        }
        var l, c = {},
            u = [],
            d = [],
            p = 2,
            h = [],
            f = 0;
        return c.onLayoutChange = function(e) {
                _.forEach(u, function(e) {
                    e.setReady(!1)
                });
                var t = e.getColumnCount();
                l = _.defaults({}, a["" + t], {
                    start: 4,
                    distance: 10,
                    delta: 15,
                    deltaInc: 1,
                    deltaMax: 40
                }), f = l.delta, h = [];
                for (var n = 1; t >= n; n++) h.push(e.getColumnWidth(n));
                return d = u.concat(d), u = [], i.log("stream-ads", "on Layout update, ads in queue: " + d.length), c
            }, c.getAdForPosition = function(t) {
                if (!l || _.isEmpty(d)) return void 0;
                var n = d[0],
                    i = _.last(u),
                    a = (_.isObject(i) ? i.flatIndex : 0) || l.start - l.distance;
                if (n.willShow() && t - a >= l.distance) {
                    var o = f;
                    return f < l.deltaMax && (f += l.deltaInc), {
                        item: n,
                        columnsCount: e(n.getMinWidth()),
                        maxDelta: o
                    }
                }
                return void 0
            }, c.onAddPositioned = function(e, t) {
                return d = _.without(d, e), f = l.delta, d.length <= p && s(), e.flatIndex = t, u.push(e), e.setReady(!0), i.log("stream-ads", "ads on screen: " + u.length), c
            },
            function() {
                t([n("first")]), s()
            }(), c
    }
}, function(e, t, n) {
    function i() {
        return "div_stream_ads_element_native_" + r++
    }
    var a = n(50),
        o = n(97),
        r = 0;
    t.create = function(e) {
        var t, r, s = !1;
        ! function() {
            e.template = o, e.adId = i(), r = a.create({
                adType: "native",
                allowed: !0
            }), t = n(11).create(e), t.setHeight(440)
        }(), t.isInDom = function() {
            return s
        };
        var l = t.didInsertElement;
        t.didInsertElement = function() {
            l(), s = !0;
            var e = t.getDomElement();
            e && r.show(t.adId)
        }, t.getMinWidth = function() {
            return 220
        };
        var c = t.setWidth;
        return t.setWidth = function(e) {
            var n = Math.max(e, t.getMinWidth());
            c(n)
        }, t.willShow = function() {
            return r.willShow()
        }, t
    }
}, function(e, t, n) {
    function i(e) {
        var t = e.creative.docid.split("-");
        e.publicationId = t[1], e.publicationCreationTime = null, e.isExplicit = null, e.title = e.creative.title || "", e.ownerUsername = e.creative.username, e.revisionId = t[0], e.pageCount = null, e.publicationName = e.creative.docname, e.detectedLanguage = null, e.description = e.creative.body || ""
    }
    var a = n(2),
        o = n(5),
        r = n(22),
        s = n(1),
        l = n(10),
        c = n(15);
    t.create = function(e) {
        function t() {
            u.imgHeight = function() {
                var e;
                return e = u.content.height && u.content.width ? Math.round(u.content.height / u.content.width * u.width) : 0
            }()
        }
        i(e.content);
        var u = n(11).create(e);
        u.imgHeight = function() {
            var e;
            return e = u.content.height && u.content.width ? Math.round(u.content.height / u.content.width * u.width) : 0
        }(), u.coverImage = function() {
            return o.pageLargeThumbUrl(u.content.publicationId, u.content.revisionId, u.content.creative.page)
        }(), u.shortDescription = function() {
            return r.getShortDescription(u.content.description)
        }();
        var d = u.setWidth;
        u.setWidth = function(e) {
            d(e), t()
        };
        var p = u.didInsertElement;
        return u.didInsertElement = function() {
                p();
                var e = u.getDomElement();
                if (e) {
                    a.broadcast(c.DOCCREATED, u.id, {
                        publicationId: u.content.publicationId,
                        revisionId: u.content.revisionId,
                        ownerUsername: u.content.ownerUsername,
                        publicationName: u.content.publicationName,
                        adpageId: u.content.adId,
                        adpageToken: u.content.token,
                        page: 1,
                        origin: u.origin,
                        ranking: u.flatIndex,
                        x: e.offset().left,
                        y: e.offset().top,
                        width: u.getHeight(),
                        height: u.getWidth()
                    });
                    var t = e.find("a img");
                    t.one("load", function(e) {
                        a.broadcast(c.DOCLOADED, u.id), t.off("error")
                    }), t.one("error", function(e) {
                        a.broadcast(c.ADERROR, {
                            publicationId: u.content.publicationId,
                            url: u.coverImage,
                            adid: u.content.adId
                        }), t.off("load")
                    }), t.parent("a").on("click", function(e) {
                        s.log("promoted", "targeted ad clicked adid: ", u.content.adId);
                        var t = l.create("ad.", l.SESSION, {
                            expires: 120
                        });
                        t.set(u.content.publicationId, u.content.adId), a.broadcast(c.DOCCLICKED, u.id, {
                            publicationId: u.content.publicationId,
                            url: $(e.currentTarget).attr("href"),
                            clickX: e.clientX,
                            clickY: e.clientY
                        }), a.broadcast(a.events.streamDocumentClicked, {
                            title: u.content.title,
                            event: e
                        })
                    })
                }
            },
            function() {
                t()
            }(), u
    }
}, function(e, t, n) {
    t.create = function(e) {
        var t = n(69).create(e);
        return t.publicationUrl = t.publicationUrl + "?e=0", t
    }
}, function(e, t, n) {
    function i(e, t, n) {
        var i = n || "content";
        return function(n, a) {
            var o = _.extend({
                content: n[i] || n.content,
                origin: n.origin,
                template: t
            }, a);
            return e.create(o)
        }
    }
    t.cookieDebugStyle = {
        key: "stream.debug.style",
        style1: "style1",
        style2: "style2"
    };
    var a = n(8).get(t.cookieDebugStyle.key),
        o = n(1),
        r = n(131),
        s = n(137),
        l = n(69),
        c = n(132),
        u = n(135),
        d = n(11),
        p = n(139),
        h = n(136),
        f = n(138);
    t.onlyKnownTypesAllowed = !0, t.Elements = {}, t.Elements.ad = i(r, n(98)), t.Elements.promotion = i(s, n(102)), t.Elements.doc = i(l, n(55)), t.Elements.docExternal = i(c, n(55)), t.Elements.removabledoc = i(l, n(99)), t.Elements.infobox = i(u, n(56)), t.Elements.subscriber = i(f, n(35), "user"), t.Elements.publisher = i(f, n(35)), t.Elements.stack = i(p, n(36), "stack"), t.Elements.newstack = i(h, n(36), "stack"), t.Elements.dummy = i(d, n(56)), t.Elements.subscriptionuser = i(f, n(35), "subscription"), t.Elements.subscriptionstack = i(p, n(36), "subscription"), t.Elements.subscriptiondoc = i(l, n(100)), t.Elements.image_infobox = i(n(134), n(101)), t.Elements.like_element = t.Elements.doc, t.Elements.read_history_element = t.Elements.doc, t.get = function(e, n, i) {
        var r = "",
            s = "";
        if (a) {
            var l = e.debug_info || {},
                c = l.color || "",
                u = e.origin ? '<p style="text-align:center;" >' + e.origin.join(":") + "</p>" : "";
            a === t.cookieDebugStyle.style2 ? (c = c || "rgba(0, 0, 0, 0.61)", s = "padding: 2px; background-color: " + c + ";", r += '<div style="z-index:100; width:100%; height:100%; position: absolute; opacity:0.95; text-align:center; background-color: ' + c + ';">', r += '<h1 style="color:white; font-size: 35pt; bottom: 20px; position: absolute; width:100%">' + n + "</h1>", r += u, r += "</div>") : (s = "padding: 2px; box-sizing: border-box; border:5px solid " + c + ";", r += '<p style="font-weight:bolder ; text-align:center;" >' + n + "</p>", r += u, r += l.kind || "", l.config_info && (r += ":" + l.config_info))
        }
        var d = {
                flatIndex: n,
                debugTxt: r,
                debugStyle: s,
                options: i
            },
            p = t.Elements[e.type];
        return "function" == typeof p ? p(e, d) : (o.log("stream", "undefined stream element type", e), a || !t.onlyKnownTypesAllowed ? t.Elements.dummy(e, d) : void 0)
    }, t.dummyElm = function() {
        var e = {
            debug_info: {
                color: "blue",
                kind: "t",
                config_info: "t"
            },
            type: "dummy",
            content: {
                width: 1,
                height: 1
            }
        };
        return t.get(e, 0)
    }
}, function(e, t, n) {
    var i = n(2),
        a = n(6),
        o = n(15);
    t.create = function(e) {
        var t = n(11).create(e);
        t.imgBase = a.urlBase("content") + "/image-infobox/";
        var r = t.content.height / (t.content.width || 1);
        t.setWidth = function(e) {
            t.width = e, t.height = Math.round(r * e)
        };
        var s = t.didInsertElement;
        return t.didInsertElement = function() {
            s();
            var e = t.getDomElement();
            e && (i.broadcast(o.INFOBOXCREATED, t.id, {
                uniqueId: t.id,
                infoboxId: "" + t.content.id,
                origin: t.origin,
                ranking: t.flatIndex,
                x: e.offset().left,
                y: e.offset().top,
                width: t.getHeight(),
                height: t.getWidth()
            }), e.find("a").on("click", function(e) {
                var n = $(e.currentTarget).attr("href");
                i.broadcast(o.INFOBOXCLICKED, t.id, {
                    uniqueId: t.id,
                    infoboxId: "" + t.content.id,
                    url: n,
                    origin: t.origin,
                    ranking: t.flatIndex,
                    clickX: e.clientX,
                    clickY: e.clientY
                }), e.altKey || e.metaKey || e.ctrlKey || e.shiftKey || 1 !== e.which || (e.preventDefault(), window.setTimeout(function() {
                    window.location = n
                }, 50))
            }))
        }, t
    }
}, function(e, t, n) {
    var i = n(2),
        a = n(15);
    t.create = function(e) {
        var t = n(11).create(e),
            o = t.didInsertElement;
        return t.didInsertElement = function() {
            o();
            var e = t.getDomElement();
            e && (i.broadcast(a.INFOBOXCREATED, t.id, {
                uniqueId: t.id,
                infoboxId: t.content.id,
                origin: t.origin,
                ranking: t.flatIndex,
                x: e.offset().left,
                y: e.offset().top,
                width: t.getHeight(),
                height: t.getWidth()
            }), e.find("a").on("click", function(e) {
                var n = $(e.currentTarget).attr("href");
                i.broadcast(a.INFOBOXCLICKED, t.id, {
                    uniqueId: t.id,
                    infoboxId: t.content.id,
                    url: n,
                    origin: t.origin,
                    ranking: t.flatIndex,
                    clickX: e.clientX,
                    clickY: e.clientY
                }), e.altKey || e.metaKey || e.ctrlKey || e.shiftKey || 1 !== e.which || (e.preventDefault(), window.setTimeout(function() {
                    window.location = n
                }, 50))
            }))
        }, t
    }
}, function(e, t, n) {
    var i = n(162);
    t.create = function(e) {
        var t, a = e.options,
            o = i.create(a);
        e.content.coverMarkup = o.getMarkup(), t = n(11).create(e);
        var r = t.didInsertElement;
        return t.didInsertElement = function() {
            r(), o.didInsertElement(t.getDomElement().children())
        }, t
    }
}, function(e, t, n) {
    var i = n(2),
        a = n(5),
        o = n(22),
        r = n(1),
        s = n(10),
        l = n(15);
    t.create = function(e) {
        function t() {
            c.imgHeight = function() {
                var e;
                return e = c.content.height && c.content.width ? Math.round(c.content.height / c.content.width * c.width) : 0
            }()
        }
        var c = n(11).create(e);
        c.imgHeight = function() {
            var e;
            return e = c.content.height && c.content.width ? Math.round(c.content.height / c.content.width * c.width) : 0
        }(), c.coverImage = function() {
            return a.pageLargeThumbUrl(c.content.publicationId, c.content.revisionId, 0)
        }(), c.shortDescription = function() {
            return o.getShortDescription(c.content.description)
        }();
        var u = c.setWidth;
        c.setWidth = function(e) {
            u(e), t()
        };
        var d = c.didInsertElement;
        return c.didInsertElement = function() {
                d();
                var e = c.getDomElement();
                if (e) {
                    i.broadcast(l.DOCCREATED, c.id, {
                        publicationId: c.content.publicationId,
                        revisionId: c.content.revisionId,
                        ownerUsername: c.content.ownerUsername,
                        publicationName: c.content.publicationName,
                        adpageId: c.content.adId,
                        page: 1,
                        origin: c.origin,
                        ranking: c.flatIndex,
                        x: e.offset().left,
                        y: e.offset().top,
                        width: c.getHeight(),
                        height: c.getWidth()
                    });
                    var t = e.find("a img");
                    t.one("load", function(e) {
                        i.broadcast(l.DOCLOADED, c.id), t.off("error")
                    }), t.one("error", function(e) {
                        i.broadcast(l.ADERROR, {
                            publicationId: c.content.publicationId,
                            url: c.coverImage,
                            adid: c.content.adId
                        }), t.off("load")
                    }), t.parent("a").on("click", function(e) {
                        r.log("promoted", "promoted document clicked adid: ", c.content.adId);
                        var t = s.create("ad.", s.SESSION, {
                            expires: 120
                        });
                        t.set(c.content.publicationId, c.content.adId), i.broadcast(l.DOCCLICKED, c.id, {
                            publicationId: c.content.publicationId,
                            url: $(e.currentTarget).attr("href"),
                            clickX: e.clientX,
                            clickY: e.clientY
                        }), i.broadcast(i.events.streamDocumentClicked, {
                            title: c.content.title,
                            event: e
                        })
                    })
                }
            },
            function() {
                t()
            }(), c
    }
}, function(e, t, n) {
    var i = n(163);
    t.create = function(e) {
        var t = _.merge({
                followOptions: e.options && e.options.showFollowMenu ? {
                    type: "user",
                    id: e.content.username,
                    initialStatus: e.content.followStatus || "nofollow"
                } : void 0
            }, e.options),
            a = i.create(e.content, t);
        e.content.publisherMarkup = a.getMarkup();
        var o = n(11).create(e);
        return o
    }
}, function(e, t, n) {
    var i = n(85);
    t.create = function(e) {
        var t, a = _.merge({
                followOptions: e.options && e.options.showFollowMenu ? {
                    type: "stack",
                    id: e.content.id,
                    initialStatus: e.content.followStatus || "nofollow"
                } : void 0
            }, e.options),
            o = a.onStackUpdated || function() {};
        a.onStackUpdated = function(e) {
            t.setHeight(t.getDomElement().height()), o.apply(void 0, arguments)
        };
        var r = a.onStackDeleted || function() {};
        a.onStackDeleted = function(e) {
            t.remove(), r.apply(void 0, arguments)
        };
        var s = i.create(e.content, a);
        e.content.coverMarkup = s.getMarkup(), t = n(11).create(e);
        var l = t.didInsertElement;
        return t.didInsertElement = function() {
            l(), s.didInsertElement(t.getDomElement().children())
        }, t
    }
}, function(e, t, n) {
    var i = n(82),
        a = n(1),
        o = n(141),
        r = n(149),
        s = n(133),
        l = n(142);
    t.create = function(e, t) {
        function c(e) {
            v.push(e), g.addElement(e), y.addElement(e), e.didInsertElement()
        }

        function u(e, t) {
            var n = [],
                i = "",
                a = v.length;
            return _.forEach(_.compact(e), function(e, o) {
                var r = w.get(e, n.length + a, t);
                r && (r.setWidth(g.getColumnWidth()), i += r.getTemplate(), n.push(r))
            }), $(i).appendTo(b.domElement), window.setTimeout(function() {
                _.forEach(n, function(e) {
                    d(v.length), c(e)
                }), window.setTimeout(function() {
                    _.forEach(n, function(e) {
                        e.setReady(!0)
                    }), b.setHeight(g.getHeight())
                }, 0)
            }, 0), n
        }

        function d(e) {
            function t(t) {
                k.onAddPositioned(t.item, e), t.item.isInDom() || ($(t.item.getTemplate()).appendTo(b.domElement), _.defer(function() {
                    t.item.didInsertElement()
                }))
            }
            if (k) {
                var n = k.getAdForPosition(e);
                n && (1 === n.columnsCount ? (n.item.setWidth(g.getColumnWidth()), g.addElement(n.item), t(n)) : g.tryAddMultiColumnItem(n.item, n.columnsCount, n.maxDelta, function() {
                    t(n)
                }))
            }
        }

        function p(e, t) {
            var n = w.get(e, v.length, t);
            return n && (n.setWidth(g.getColumnWidth()), $(n.getTemplate()).appendTo(b.domElement), n.didInsertElement(), v.push(n), g.addElement(n), y.addElement(n), n.setReady(!0), b.setHeight(g.getHeight())), n
        }

        function h(e, t) {
            var n = $.Deferred(),
                i = {
                    visible: !1,
                    actionDone: !1
                };
            return t === !0 ? (e(), i.visible = !0, i.actionDone = !0, n.resolve(i)) : (b.domElement.css("visibility", "hidden"), n.notify(_.clone(i)), window.setTimeout(function() {
                e(), i.actionDone = !0, n.notify(_.clone(i)), window.setTimeout(function() {
                    b.domElement.css("visibility", ""), i.visible = !0, n.resolve(i)
                }, 1e3)
            }, 100)), n.promise()
        }

        function f() {
            var e = b.getWidth();
            if (C.columnWidth && C.columnWidth > 0) x = C.columnWidth;
            else {
                var t = w.dummyElm(),
                    n = $(t.getTemplate()).appendTo(b.domElement);
                x = n.outerWidth(), n.remove()
            }
            C.totalWidth && C.totalWidth >= x && (e = C.totalWidth), g = o.create({
                gutterWidth: C.gutterWidth,
                gutterHeight: C.gutterHeight,
                totalWidth: e,
                columnWidth: x
            }), k && k.onLayoutChange(g)
        }

        function m() {
            var e = -1,
                t = -1;
            switch (parseInt(i.getIosMajorVersion(), 10)) {
                case 4:
                case 5:
                    e = 1, t = 3
            }
            y = l.create(b.domElement, e, t), void 0 !== y.onScroll && (A = n(63)({
                onFire: function() {
                    y.onScroll(v)
                }
            }));
        }
        var g, v, b, w, y, k, x, C, A;
        e.hasClass("stream-list") || e.addClass("stream-list"),
            function() {
                C = _.merge({
                    gutterWidth: -1,
                    gutterHeight: -1,
                    totalWidth: -1,
                    columnWidth: -1
                }, t), b = r.create(e), v = [], w = s, m(), f()
            }();
        var E = {
            addElements: u,
            addElement: p,
            relayout: function(e) {
                return h(function() {
                    f(), _.forEach(v, function(e, t) {
                        d(t), g.addElement(e)
                    }), b.setHeight(g.getHeight()), y.reset(v)
                }, e)
            },
            resize: function(e) {
                return h(function() {
                    g.resize.apply(g, arguments), b.setHeight(g.getHeight()), y.reset(v)
                }, e)
            },
            getAdsManager: function() {
                return k
            },
            setAdsManager: function(e) {
                _.isObject(e) ? _.isFunction(e.getAdForPosition) && _.isFunction(e.onAddPositioned) && _.isFunction(e.onLayoutChange) ? (k = e, k.onLayoutChange(g)) : (k = void 0, a.error("AdManager for stream invalid")) : k = void 0
            },
            getAdvanceApi: function() {
                return {
                    options: C,
                    initLayout: f,
                    view: b,
                    getModel: function() {
                        return v
                    },
                    getLayout: function() {
                        return g
                    },
                    getFactory: function() {
                        return w
                    },
                    setModel: function(e) {
                        v = e
                    },
                    setLayout: function(e) {
                        g = e
                    },
                    setFactory: function(e) {
                        w = e
                    }
                }
            },
            destroy: function() {
                A && A.destroy(), b.reset()
            },
            getContentCount: function() {
                return v.length
            }
        };
        return E
    }
}, function(e, t, n) {
    var i = n(1);
    t.create = function(e) {
        function t(t) {
            var n;
            return n = !t || 2 > t ? e.columnWidth : e.columnWidth + (e.columnWidth + e.gutterWidth) * (t - 1)
        }

        function n(e) {
            ("number" != typeof e || 0 > e) && i.error(new Error("Invalid parameter in layout-manager options."))
        }

        function a(e) {
            var t, n = _.last(w[e]);
            return t = n ? n.getPosition().y + n.getHeight() : 0
        }

        function o() {
            return _.map(w, function(e, t) {
                return a(t)
            })
        }

        function r(e) {
            return _.map(o(), function(t, n, i) {
                var a = [];
                if (n >= e - 1)
                    for (var o = 1; e > o; o++) a.push(Math.abs(i[n - o] - t));
                return a
            })
        }

        function s(n, i, s, l) {
            if (w.length >= i) {
                var c = !1,
                    u = 0;
                if (1 === w.length) c = !0;
                else {
                    var d = _.map(r(i), function(e, t) {
                            return {
                                idx: t - i + 1,
                                val: _.min(e),
                                height: a(t)
                            }
                        }),
                        h = _.first(_.sortBy(d, ["val", "height"]));
                    c = !s || h.val < s, u = h.idx
                }
                if (c) {
                    for (var f = o(), m = 0, g = u; u + i > g; g++) {
                        w[g].push(n);
                        var v = f[g];
                        v > m && (m = v)
                    }
                    n.setWidth(t(i)), n.setPosition({
                        x: u * (e.columnWidth + e.gutterWidth),
                        y: p(m)
                    }), _.isFunction(l) && l(n)
                }
            }
        }

        function l(t, n) {
            for (var i = w[t], a = t * (e.columnWidth + e.gutterWidth), o = n, r = i.length; r > o; o++) {
                var s = i[o],
                    l = s.getPosition(),
                    c = 0;
                if (0 !== o) {
                    var u = i[o - 1];
                    c = u.getPosition().y + u.getHeight() + e.gutterHeight
                }(c !== l.y || a !== l.x) && s.setPosition({
                    x: a,
                    y: c
                })
            }
        }

        function c(e, t) {
            var n = "number" == typeof t ? t : 0;
            "number" == typeof e ? l(e, n) : _.each(w, function(e, t) {
                l(t, n)
            })
        }

        function u(e) {
            _.forEach(e, function(e) {
                d(e)
            })
        }

        function d(t, n, o) {
            if (void 0 === t) return i.log("stream", "layoutManager:addElement invalid arguments: ", arguments), {
                x: 0,
                y: 0
            };
            var r, s = !1,
                l = n,
                u = o;
            if (void 0 === l || 0 > l || l >= w.length) {
                var d = f();
                r = d.y, l = d.col, u = w[l].length, w[l].push(t)
            } else void 0 === u || 0 > u || u >= w[l].length ? (r = p(a(l)), u = w[l].length, w[l].push(t)) : (s = !0, r = p(w[l][u].getPosition().y), w[l].splice(u, 0, t));
            return t.setPosition({
                x: l * (e.columnWidth + e.gutterWidth),
                y: r
            }), s && c(l, u), {
                col: l,
                row: u
            }
        }

        function p(t) {
            var n = t;
            return t > 0 && (n += e.gutterHeight), n
        }

        function h() {
            return w.length
        }

        function f() {
            var t, n, i = o();
            return t = _.min(i), n = _.indexOf(i, t), i[0] - t < 100 && (n = 0, t = i[0]), {
                y: p(t),
                col: n,
                x: n * (e.columnWidth + e.gutterWidth)
            }
        }

        function m() {
            return w
        }

        function g() {
            return _.max(o())
        }

        function v() {
            var t, n = w.length;
            return t = n > 0 ? n * e.columnWidth + (n - 1) * e.gutterWidth : 0
        }

        function b() {
            var t = e.totalWidth + e.gutterWidth,
                n = e.columnWidth + e.gutterWidth,
                i = Math.floor(t / n);
            w = [];
            for (var a = 0; i > a; a++) w.push([])
        }
        var w = [];
        return function() {
            n(e.totalWidth), n(e.columnWidth);
            var t = Math.floor(e.totalWidth / e.columnWidth) - 1;
            (null === e.gutterWidth || e.gutterWidth < 0) && (t > 0 ? e.gutterWidth = Math.floor(e.totalWidth % e.columnWidth / t) : e.gutterWidth = 0), (null === e.gutterHeight || e.gutterHeight < 0) && (t > 0 || e.gutterWidth > 0 ? e.gutterHeight = e.gutterWidth : e.gutterHeight = 25), b()
        }(), {
            getColumnWidth: t,
            tryAddMultiColumnItem: s,
            getMatrix: m,
            getColumnCount: h,
            getHeight: g,
            getWidth: v,
            getNextPosition: f,
            addElement: d,
            addElements: u,
            resize: c,
            reset: b
        }
    }
}, function(e, t) {
    t.create = function(e, t, n) {
        function i(e) {
            var t = e.getPosition().y,
                n = t + e.getHeight();
            return -1 === f ? n > h : -1 === h ? f > t : f > t && n > h
        }

        function a() {
            var i = $(window).scrollTop() - $(e).offset().top,
                a = window.innerHeight;
            p = i > d, d = i, h = Math.max(0, d - t * a), h = t > 0 ? Math.max(0, d - t * a) : -1, f = n > 0 ? Math.max(0, d + n * a) : -1
        }

        function o(e) {
            e.setOutOfScreen(!i(e))
        }

        function r(e) {
            for (var t = 0, n = e.length; n > t; t++) o(e[t])
        }

        function s(e, t, n, a) {
            var o = 1,
                r = n,
                s = t - 1;
            t > n && (o = -1, r = t + 1, s = n);
            for (var l = t; r > l && l > s; l += o) {
                var c = e[l],
                    u = i(c);
                if (u === a) return l;
                c.setOutOfScreen(!u)
            }
            return -1
        }

        function l(e) {
            a(), p ? s(e, 0, e.length) : s(e, e.length - 1, -1)
        }

        function c(e) {
            d = -1, a(), s(e, 0, e.length)
        }
        var u = {},
            d = 0,
            p = !0,
            h = 0,
            f = 0;
        return function() {
            function e() {}

            function i(t) {
                return d ? e : t
            }(void 0 === t || isNaN(t)) && (t = -1), (void 0 === n || isNaN(n)) && (n = -1);
            var d = 0 > n && 0 > t;
            d || a(), u.addElement = i(o), u.addElements = i(r), u.updateElements = i(s), u.onScroll = d ? void 0 : l, u.reset = i(c)
        }(), u
    }
}, function(e, t, n) {
    var i = n(103);
    t.create = function(e) {
        function t() {
            p.find(".loading, .nomore, .none").hide()
        }

        function n() {
            f && "hidden" !== h && p.css("display", "")
        }

        function a(e) {
            "loading" !== h && (h = "loading", t(), n(), p.find(".loading").css("display", ""))
        }

        function o(e) {
            "none" !== h && (h = "none", t(), n(), p.find(".none").css("display", ""))
        }

        function r(e) {
            "nomore" !== h && (h = "nomore", t(), n(), p.find(".nomore").css("display", ""))
        }

        function s() {
            "hidden" !== h && (h = "hidden", p.hide(), t())
        }

        function l(e) {
            f = e, e ? p.css("display", "") : p.hide()
        }

        function c(e) {
            p.css({
                visibility: e ? "" : "hidden"
            })
        }

        function u() {
            p.remove()
        }
        var d, p, h, f = !0;
        return function() {
            d = $(e), h = "hidden", p = $(i()), t(), d.after(p.hide().css({
                position: "relative",
                width: "100%",
                textAlign: "center"
            }))
        }(), {
            loading: a,
            noResults: o,
            noMoreResults: r,
            hide: s,
            setVisibility: c,
            setDisplay: l,
            destroy: u
        }
    }
}, function(e, t, n) {
    function i() {}
    var a = n(39),
        o = n(2),
        r = n(78),
        s = n(83).init(),
        l = n(129);
    t.create = function(e) {
        function t() {
            B && (_.merge(V, a.getKey(M)), D.getAdvanceApi().view.setMinHeight(V.viewMinHeight))
        }

        function c() {
            B && j > V.streamApiCallCount && (V.streamApiCallCount = j, V.viewMinHeight = D.getAdvanceApi().view.getHeight(), a.setKey(M, V))
        }

        function u(t, n) {
            S.isThereMore() || 0 !== D.getContentCount() || (e.hideSpinnerMessages ? I.hide() : I.noResults(), O.setActive(!1)), t.stream.length > 0 && (j === V.streamApiCallCount - 1 && D.getAdvanceApi().view.setMinHeight(0), D.addElements(t.stream, e.elementOptions), T(t), c(), I.hide()), j > 0 && o.broadcast(o.events.pageContinuation, {
                streamIndex: j
            }), j++, window.setTimeout(function() {
                "function" == typeof n && n(t)
            }, 0), j < V.streamApiCallCount && f()
        }

        function d(t) {
            t.more === !1 ? (e.hideSpinnerMessages ? I.hide() : I.noMoreResults(), "function" == typeof e.onStreamCompleted && e.onStreamCompleted(), O.setActive(!1)) : t.busy === !0 || (O.setActive(!1), I.hide(), o.broadcast(o.events.messagehubWarn, i18n.t("stream.errorloadingstream", {
                errormessage: t && t._content && t._content.error ? t._content.error.message : "Undefined error",
                errorcode: t && t._content && t._content.error ? t._content.error.code : "0"
            }))), "function" == typeof P && P(t)
        }

        function p() {
            for (var e = 0, t = G.length; t > e; e++) G[e]();
            G = []
        }

        function h(e, t, n) {
            var i = n || {};
            W ? (p(), e.apply(i, t)) : G.push(function() {
                e.apply(i, t)
            })
        }

        function f(t) {
            var n;
            if (!Y) {
                Y = !0, 0 === D.getContentCount() ? n = setTimeout(I.loading, 500) : I.loading();
                var i = L || S.getMore();
                L = void 0, i.then(function(n) {
                    "function" == typeof e.filterApiResponse && (n = e.filterApiResponse(n)), Y = !1, h(u, [n, t])
                }, function() {
                    h(d, arguments)
                }).always(function() {
                    clearTimeout(n)
                })
            }
        }

        function m() {
            !Y && W && 0 === G.length && f()
        }

        function g() {
            return N !== D.getAdvanceApi().view.getWidth() ? D.relayout().done(function() {
                N = D.getAdvanceApi().view.getWidth(), "function" == typeof e.onStreamRelayout && e.onStreamRelayout()
            }) : $.Deferred().resolve().promise()
        }

        function v() {
            O = n(63)({
                distanceToBottom: 1500,
                onFire: m
            }), H && (R = n(43)({
                delay: 200,
                onFire: g
            }))
        }

        function b() {
            return void 0 === L && (L = S.getMore()), L
        }

        function w() {
            z || (I = n(143).create(e.streamcontainer), z = !0, v(), f(e.onStreamLoaded))
        }

        function y() {
            W = !0, p()
        }

        function k() {
            W = !1
        }

        function x() {
            U !== !0 && (U = !0, y(), I.setDisplay(!0), D.getAdvanceApi().view.setDisplay(!0))
        }

        function C() {
            U !== !1 && (U = !1, k(), I.setDisplay(!1), D.getAdvanceApi().view.setDisplay(!1))
        }

        function A(e) {
            I.setVisibility(e), D.getAdvanceApi().view.setVisibility(e)
        }

        function E() {
            R && R.destroy(), O && O.destroy(), I && I.destroy(), F()
        }
        var I, S, D, T, P, O, R, F, N, L, M, U, B = !0,
            H = !0,
            j = 0,
            z = !1,
            W = !0,
            G = [],
            V = {
                streamApiCallCount: 0,
                viewMinHeight: 0
            },
            Y = !1;
        return function() {
            s.start(), B = e.useHistoryData !== !1, H = e.observeWindowSize !== !1, T = e.onStreamUpdated || i, P = e.onStreamFailed || i, e.apiParams = e.apiParams || {}, e.apiParams.seed = e.apiParams.seed || a.getData().seed, S = r.create(e.path, e.apiParams, e.apiOptions), M = "stream" + S.getKey(), D = n(140).create($(e.streamcontainer)), F = D.destroy, t(), e.ads && D.setAdsManager(l.create()), e.autoStart !== !1 && w(), N = D.getAdvanceApi().view.getWidth(), D.preload = b, D.start = w, D.onVisible = y, D.onInvisible = k, D.addMoreDocuments = f, D.resizeStream = g, D.setVisibility = A, D.show = x, D.hide = C, D.destroy = E
        }(), D
    }
}, function(e, t, n) {
    var i = n(2),
        a = n(1),
        o = n(15);
    t.create = function() {
        function e(e, t) {
            a.log("streamTracker", "onStreamAdInserted: ", t), s.track({
                event: "streamAdInserted",
                data: {
                    adProvider: t.advertiser,
                    placement: t.placement,
                    streamOrigin: t.origin || null,
                    ranking: t.ranking,
                    timespan: new Date - r
                }
            }), s.allowImpressionTracking(e)
        }

        function t(e, t) {
            a.log("streamTracker", "onStreamAdNotAvailable: ", t), s.track({
                event: "streamAdNotAvailable",
                data: {
                    adProvider: t.advertiser,
                    placement: t.placement,
                    streamOrigin: t.origin || null,
                    ranking: t.ranking,
                    timespan: new Date - r
                }
            })
        }
        var r, s = n(44).create();
        return s.addElement = function(e, t) {
            var n = s._super.addElement.apply(s, arguments);
            return a.log("streamTracker", "onStreamAdRequest: ", t), r = new Date, s.track({
                event: "streamAdRequest",
                data: {
                    adProvider: t.advertiser,
                    placement: t.placement,
                    streamOrigin: t.origin || null,
                    ranking: t.ranking
                }
            }), n
        }, s.doImpressionTracking = function(e) {
            var t = e.data;
            return a.log("streamTracker", "onStreamAdImpression: ", t), s.track({
                event: "streamAdImpression",
                data: {
                    adProvider: t.advertiser,
                    placement: t.placement,
                    streamOrigin: t.origin || null,
                    ranking: t.ranking
                }
            }), s._super.doImpressionTracking(e)
        }, s.start = function(n) {
            var a = s._super.start.apply(s, arguments);
            return i.subscribe(o.STREAMADREQUEST, s.addElement), i.subscribe(o.STREAMADINSERTED, e), i.subscribe(o.STREAMADNOTAVAILABLE, t), a
        }, s.stop = function() {
            return i.unsubscribe(o.STREAMADREQUEST, s.addElement), i.unsubscribe(o.STREAMADINSERTED, e), i.unsubscribe(o.STREAMADNOTAVAILABLE, t), s._super.start.stop.apply(s, arguments)
        }, s
    }
}, function(e, t, n) {
    var i = n(2),
        a = n(10),
        o = n(1),
        r = n(15);
    t.create = function() {
        function e(e, t) {
            if (e && l.getElement(e)) {
                var n = l.getElement(e).data;
                o.log("streamTracker", "Document click: ", n), l.track({
                    event: "streamDocumentClick",
                    data: {
                        revisionId: n.revisionId,
                        publicationId: n.publicationId,
                        publicationName: n.publicationName,
                        ownerUsername: n.ownerUsername,
                        adpageId: n.adpageId,
                        adpageToken: n.adpageToken,
                        streamOrigin: n.origin || null,
                        streamRanking: n.ranking,
                        clickCoordinates: t.clickX + "x" + t.clickY
                    }
                });
                var i = "tracking." + n.publicationId + ".",
                    r = a.create(i, a.TYPES.LOCAL, {
                        expires: 2
                    });
                r.removeExpiredKeys(), r.set("stream-origin", n.origin), r.set("stream-ranking", n.ranking)
            }
        }

        function t(e) {
            o.log("streamTracker", "Document ImageLoading error: ", e), i.broadcast(i.events.monitorEvent, {
                type: "STREAM_IMG_NOT_FOUND",
                image_url: e.url,
                publication_id: e.publicationId
            })
        }

        function s(e) {
            o.log("streamTracker", "Ad ImageLoading error: ", e), i.broadcast(i.events.monitorEvent, {
                type: "STREAM_AD_IMG_NOT_FOUND",
                image_url: e.url,
                publication_id: e.publicationId,
                ad_id: e.adid
            })
        }
        var l = n(44).create();
        return l.doImpressionTracking = function(e) {
            var t = e.data;
            return o.log("streamTracker", "Document impression: ", t), l.track({
                event: "streamDocumentLoad",
                data: {
                    revisionId: t.revisionId,
                    publicationId: t.publicationId,
                    publicationName: t.publicationName,
                    ownerUsername: t.ownerUsername,
                    adpageId: t.adpageId,
                    pageNumber: t.page,
                    streamOrigin: t.origin || null,
                    streamRanking: t.ranking
                }
            }), l._super.doImpressionTracking(e)
        }, l.start = function(n) {
            var a = l._super.start.apply(l, arguments);
            return i.subscribe(r.DOCCREATED, l.addElement), i.subscribe(r.DOCLOADED, l.allowImpressionTracking), i.subscribe(r.DOCERROR, t), i.subscribe(r.DOCCLICKED, e), i.subscribe(r.ADERROR, s), a
        }, l.stop = function() {
            return i.unsubscribe(r.DOCCREATED, l.addElement), i.unsubscribe(r.DOCLOADED, l.allowImpressionTracking), i.unsubscribe(r.DOCERROR, t), i.unsubscribe(r.ADERROR, s), i.unsubscribe(r.DOCCLICKED, e), l._super.start.stop.apply(l, arguments)
        }, l
    }
}, function(e, t, n) {
    var i = n(2),
        a = n(1),
        o = n(15);
    t.create = function() {
        function e(e, n) {
            a.log("streamTracker", "Infobox click: ", n), t.track({
                event: "infoboxClick",
                data: {
                    infoboxId: n.infoboxId,
                    link: n.url,
                    streamOrigin: n.origin || null,
                    streamRanking: n.ranking,
                    clickCoordinates: n.clickX + "x" + n.clickY
                }
            })
        }
        var t = n(44).create();
        return t.addElement = function(e, n) {
            var i = t._super.addElement.apply(t, arguments);
            return t.allowImpressionTracking(e), i
        }, t.doImpressionTracking = function(e) {
            var n = e.data;
            return a.log("streamTracker", "Track Infobox impression : ", n), t.track({
                event: "infoboxLoad",
                data: {
                    infoboxId: n.infoboxId,
                    streamOrigin: n.origin || null,
                    streamRanking: n.ranking
                }
            }), t._super.doImpressionTracking(e)
        }, t.start = function(n) {
            var a = t._super.start.apply(t, arguments);
            return i.subscribe(o.INFOBOXCREATED, t.addElement), i.subscribe(o.INFOBOXCLICKED, e), a
        }, t.stop = function() {
            return i.unsubscribe(o.INFOBOXCREATED, t.addElement), i.unsubscribe(o.INFOBOXCLICKED, e), t._super.start.stop.apply(t, arguments)
        }, t
    }
}, function(e, t) {
    function n() {}
    t.consolidateFn = function(e) {
        var t;
        return t = "function" != typeof e ? n : e
    }, t.getter = function(e, n, i) {
        var a = t.consolidateFn(i);
        return function() {
            var t = e[n];
            return a(t), t
        }
    }, t.setter = function(e, n, i) {
        var a = t.consolidateFn(i);
        return function(t) {
            return e[n] = t, a(t), t
        }
    }, t.addSuperFn = function(e) {
        var t = {
            _super: e._super
        };
        return _.forOwn(e, function(e, n) {
            _.isFunction(e) && (t[n] = e)
        }), e._super = t, e
    }
}, function(e, t) {
    t.create = function(e) {
        var t = 0;
        return {
            domElement: e,
            getWidth: function() {
                return e.width()
            },
            setWidth: function(t) {
                e.width(t)
            },
            getHeight: function() {
                return e.height()
            },
            setMinHeight: function(n) {
                t = n, e.height() < t && e.height(t)
            },
            setDisplay: function(t) {
                t ? e.show() : e.hide()
            },
            setHeight: function(n) {
                n > t && e.height(n)
            },
            reset: function() {
                t = 0, e.css("height", "")
            },
            setVisibility: function(t) {
                e.css({
                    visibility: t ? "" : "hidden"
                })
            }
        }
    }
}, function(e, t, n) {
    function i() {
        return u.log("ads", "gutterAd", "tyntConfig.isAllowedBasedOnLocation()", r.isAllowedBasedOnLocation()), r.isAllowedBasedOnLocation()
    }

    function a() {
        var e = !1,
            t = c.getCookie("gutterAd"),
            n = new s(window.location.href).getQueryParamValue("gutterAd");
        return e = e || "tynt" === t || "tynt" === n, e = e || "test" === t || "test" === n, e = e || "dfp" === t || "dfp" === n
    }

    function o() {
        var e = !1;
        return e = e || "false" === c.getCookie("gutterAd") || "false" === new s(window.location.href).getQueryParamValue("gutterAd")
    }
    var r, s = n(52),
        l = n(14),
        c = n(9),
        u = n(1),
        d = n(12),
        p = n(19).local,
        h = n(368),
        f = n(367),
        m = n(366),
        g = n(364),
        v = d.get("adsConfig") && d.get("adsConfig").gutterAd,
        b = 1e3 * (v && v.intervalInSecs || 1),
        w = 800;
    ! function() {
        r = g.create(v && v.providerConfigs && v.providerConfigs.tynt), r.setLocation(d.get("ISO3166Country"), d.get("Continent"))
    }(), t.LAST_SHOWN_STORAGE_KEY = "ads-gutterAd-lastShown", t.getAdProvider = function() {
        var e = h;
        return v && v.dfpToTyntRatio && Math.random() < v.dfpToTyntRatio && (e = m), ("test" === c.getCookie("gutterAd") || "test" === new s(window.location.href).getQueryParamValue("gutterAd")) && (e = f), ("dfp" === c.getCookie("gutterAd") || "dfp" === new s(window.location.href).getQueryParamValue("gutterAd")) && (e = m), e === h ? u.log("ads", "gutterAd", "using internal ad provider Tynt") : e === m ? u.log("ads", "gutterAd", "using internal ad provider DFP") : e === f && u.log("ads", "gutterAd", "using internal ad provider Test"), e
    }, t.getTyntTag = function() {
        return r.getTyntTag()
    }, t.getDfpConfig = function() {
        return v && v.providerConfigs && v.providerConfigs.dfp || {}
    }, t.willShow = function(e) {
        if (u.log("ads", "gutterAd", "willShow options", e), a()) return u.log("ads", "gutterAd", "will show for debug"), !0;
        if (o()) return u.log("ads", "gutterAd", "no show for debug"), !1;
        if (e.allowed === !1) return u.log("ads", "gutterAd", 'no show, external "allowed" rule'), !1;
        var n = /(googlebot\/|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)/i;
        if (n.test(window.navigator.userAgent)) return u.log("ads", "gutterAd", "no show, bot rule"), !1;
        if (window.innerWidth < w) return u.log("ads", "gutterAd", "no show, minWidth rule. Window width, minWidth:", window.innerWidth, w), !1;
        if (!e.isFlashReader) return u.log("ads", "gutterAd", "no show, isFlashReader rule."), !1;
        if (!v || 0 === l.size(v)) return u.log("ads", "gutterAd", "no show, adsConfig is undefined"), !1;
        var r = p.get(t.LAST_SHOWN_STORAGE_KEY);
        return r && r + b > (new Date).getTime() ? (u.log("ads", "gutterAd", "no show, last shown rule. Last shown:", new Date(r), "Next show:", new Date(r + b)), !1) : Math.random() < 1 - v.audienceRatio ? (u.log("ads", "gutterAd", "no show, ratio rule. Ratio:", v.audienceRatio), !1) : t.getAdProvider() !== h || i() ? (u.log("ads", "gutterAd", "will show"), !0) : (u.log("ads", "gutterAd", "no show, shouldShowForTynt rule."), !1)
    }
}, function(e, t, n) {
    function i(e, t, n) {
        var i = o.create(),
            l = t && s.getAdProviderConfig("dfp").adTypes && s.getAdProviderConfig("dfp").adTypes[t] || {},
            c = l.network || "/30443627/Issuu_Production_Stream",
            u = l.sizes || [
                [300, 250]
            ];
        ! function() {
            r.log("ads", "streamAd", "init dfp", e, t), a.defaults(n, {
                onAdFilled: a.noop,
                onAdNotFilled: a.noop,
                onAdViewable: a.noop,
                onAdFailed: a.noop
            }), i.addPlacement(e, c, u), i.addEventListener("slotRenderEnded", function(t) {
                t.slot.getSlotId().getDomId() === e && (r.log("ads", "streamAd", "slotRendered", e, l, t), t.isEmpty ? n.onAdNotFilled() : n.onAdFilled())
            }), i.addEventListener("impressionViewable", function(t) {
                t.slot.getSlotId().getDomId() === e && (r.log("ads", "streamAd", "impressionViewable", e, l, t), n.onAdViewable())
            })
        }()
    }
    var a = n(14),
        o = n(38),
        r = n(1),
        s = n(70);
    t.create = i
}, function(e, t, n) {
    function i(e) {
        return "object" == typeof e && e.allowed === !0
    }

    function a() {
        var e = /(googlebot\/|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)/i;
        return e.test(window.navigator.userAgent)
    }

    function o(e) {
        return "object" == typeof e && c.size(e) > 0
    }

    function r(e, t) {
        return e && e.includedCountries && e.includedCountries.indexOf(t) > -1 || !1
    }

    function s(e) {
        return e && e.audienceRatioFlash && Math.random() < e.audienceRatioFlash || !1
    }

    function l(e) {
        return e && e.audienceRatioHtml && Math.random() < e.audienceRatioHtml || !1
    }
    var c = n(14);
    e.exports = {
        isAllowedExternally: i,
        isBot: a,
        hasAdsConfig: o,
        isIncludedCountry: r,
        isInFlashAudience: s,
        isInHtmlAudience: l
    }
}, function(e, t, n) {
    function i(e) {
        var t = o.get("ISO3166Country") || "unknown";
        a.broadcast(a.events.monitorEvent, e), r.log("ads", "streamAd", "pingback", e), e.type += "." + t, a.broadcast(a.events.monitorEvent, e), r.log("ads", "streamAd", "pingback", e)
    }
    var a = n(2),
        o = n(12),
        r = n(1);
    t.adRequested = function() {
        i({
            type: "ads-streamAd-requested"
        })
    }, t.adFailed = function(e) {
        i({
            type: "ads-streamAd-failed",
            timeSinceOverlay: e
        })
    }, t.adLoaded = function(e) {
        i({
            type: "ads-streamAd-filled",
            timeSinceOverlay: e
        })
    }, t.adNotLoaded = function(e) {
        i({
            type: "ads-streamAd-notfilled",
            timeSinceOverlay: e
        })
    }, t.adViewable = function(e) {
        i({
            type: "ads-streamAd-viewable",
            timeSinceOverlay: e
        })
    }
}, function(e, t, n) {
    function i() {
        g && (g = !1, $.when(d.remove(u)).then(s), _.isFunction(c.onClose) && c.onClose())
    }

    function a() {
        $(".simple", u).addClass("collapsed"), $(".full", u).addClass("expanded"), d.autoUpdateHeight()
    }

    function o() {
        _.isFunction(c.onDidInsertElement) && c.onDidInsertElement(u), _.isFunction(c.onShow) && c.onShow(u), u.find(".js-close").one("click", function() {
            i(), _.isFunction(c.onUserClose) && c.onUserClose()
        }), u.find(".js-cta").one("click", function() {
            _.isFunction(c.onCTA) && c.onCTA()
        }), u.find(".js-expand").one("click", function(e) {
            e.preventDefault(), a(), _.isFunction(c.onExpand) && c.onExpand()
        })
    }

    function r() {
        if (!g && 0 !== m.length) {
            g = !0, c = m.shift();
            var e = h[c.type] || h.success;
            e += " friendly", _.isUndefined(c.addCssClass) || (e += " " + c.addCssClass), u = $(p({
                message: c.message,
                isIndpendentHtml: !0
            })).addClass(e), o(), $.when(d.add(u)).then(o)
        }
    }

    function s(e) {
        u = void 0, c = void 0, r()
    }

    function l(e) {
        var t = e;
        _.isString(e) && (t = {
            message: e
        }), _.isObject(t) && "" !== t.message && (t.type = "friendly", m.push(t), r())
    }
    var c, u, d, p, h, f = n(2),
        m = [],
        g = !1;
    t.setColorMap = function(e) {
        h = e
    }, t.init = function(e, t) {
        d = e, p = t, f.subscribe(f.events.messagehubFriendlyNotification, function(e) {
            l(e)
        })
    }
}, function(e, t, n) {
    var i = n(1),
        a = 0;
    t.create = function(e, t) {
        function o(e) {
            var t = new $.Deferred;
            return i.log("notification bar", "update height", e, p), p.height() !== e ? (i.log("notification bar", "actually updating height", e, p.height(), p), n(18).onTransitionEnd(p, function() {
                window.setTimeout(function() {
                    i.log("notification bar", "update height transition finished", e, p.height(), p), p.removeClass("animating"), t.resolve()
                }, 0)
            }, 1e3), p.addClass("animating"), p.height(e)) : (i.log("notification bar", "update height not necessary", p), t.resolve()), d.height(e), h.broadcast("heightChanged", e), t.promise()
        }

        function r() {
            return _.reduce(p.children(), function(e, t) {
                return e + $(t).outerHeight(!0)
            }, 0)
        }

        function s() {
            o(r())
        }

        function l(e) {
            p.append(e);
            var t = r();
            return p.height(0), o(t)
        }

        function c(e) {
            var t = d.height() - e.outerHeight(!0);
            return o(t).done(function() {
                $(e).remove()
            })
        }

        function u(e) {
            d.toggleClass("ready", e !== !1)
        }
        var d, p, h = n(2).installTo({});
        return function() {
            if (d = $(e), 0 !== d.length) {
                if (!t) {
                    if (a > 0) throw new Error("You are only allowed to create one instance of notification bar.");
                    a++
                }
                p = $(d.find(".notification-bar")), o(r()).done(function() {
                    window.setTimeout(function() {
                        d.addClass("ready"), i.log("notification bar", "ready class added", p)
                    }, 0)
                })
            }
        }(), _.extend(h, {
            add: l,
            remove: c,
            setAnimatable: u,
            autoUpdateHeight: s
        })
    }
}, function(e, t, n) {
    var i = n(158),
        a = n(106),
        o = {
            success: "bg-success text-success",
            error: "bg-danger text-danger",
            warn: "bg-warning text-warning"
        },
        r = n(2).installTo({});
    t.events = {
        MESSAGEBARHEIGHTCHANGED: "messageHub.messageBarHeightChanged"
    }, t.init = function(e) {
        var s = _.defaults(e || {}, {
                messageBarContainer: "body"
            }),
            l = $("<div>").addClass("header-bar twix-message-hub").html($("<div>").addClass("header-bar-affix"));
        l.prependTo(s.messageBarContainer);
        var c = n(157).create(".twix-message-hub");
        return i.setColorMap(o), i.init(c, a), c.subscribe("heightChanged", function(e) {
            r.broadcast(t.events.MESSAGEBARHEIGHTCHANGED, e)
        }), t
    }, t.setColorMap = function(e) {
        return o = _.merge(o, e), t
    }, e.exports = _.extend(t, r)
}, function(e, t, n) {
    var i = n(1);
    t.create = function(e) {
        function t(e, t) {
            var a = new $.Deferred;
            return i.log("message-hub", "update height", e, u), u.height() !== e ? (i.log("message-hub", "actually updating height", e, u.height(), u), t === !0 ? a.resolve() : (n(18).onTransitionEnd(u, function() {
                window.setTimeout(function() {
                    i.log("message-hub", "update height transition finished", e, u.height(), u), u.removeClass("animating"), a.resolve()
                }, 0)
            }, 1e3), u.addClass("animating")), u.height(e)) : (i.log("message-hub", "update height not necessary", u), a.resolve()), c.height(e), h.broadcast("heightChanged", e), a.promise()
        }

        function a() {
            return _.reduce(u.children(), function(e, t) {
                return e + $(t).outerHeight(!0)
            }, 0)
        }

        function o() {
            t(a())
        }

        function r(e) {
            u.append(e);
            var n = a();
            return u.height(0), d += n, t(n)
        }

        function s(e) {
            var n = c.height() - e.outerHeight(!0);
            return d = n, t(n).done(function() {
                $(e).remove()
            })
        }

        function l(e) {
            c.toggleClass("ready", e !== !1)
        }
        var c, u, d = 0,
            p = ".twix-bar",
            h = n(2).installTo({});
        return function() {
            if (c = $(e), 0 !== c.length) {
                if ($(p).length > 1) throw new Error("You are only allowed to create one instance of snickers.");
                u = $(c.find(".header-bar-affix")), t(a()).done(function() {
                    window.setTimeout(function() {
                        c.addClass("ready"), i.log("snickers", "ready class added", u)
                    }, 0), n(43)({
                        onFire: function() {
                            c.removeClass("ready"), t(a(), !0), c.addClass("ready")
                        }
                    })
                }), u.affix()
            }
        }(), _.extend(h, {
            add: r,
            remove: s,
            setAnimatable: l,
            autoUpdateHeight: o
        })
    }
}, function(e, t, n) {
    function i() {
        m && (m = !1, $.when(u.remove(c)).then(r), _.isFunction(l.onClose) && l.onClose())
    }

    function a() {
        _.isFunction(l.onDidInsertElement) && l.onDidInsertElement(c), _.isFunction(l.onShow) && l.onShow(c), c.find(".js-close").one("click", function() {
            i(), _.isFunction(l.onUserClose) && l.onUserClose()
        }), c.find(".js-cta").one("click", function() {
            _.isFunction(l.onCTA) && l.onCTA()
        }), "info" === l.type && l.autoDismiss !== !1 && window.setTimeout(function() {
            i()
        }, g)
    }

    function o() {
        if (!m && 0 !== f.length) {
            m = !0, l = f.shift();
            var e = p[l.type] || p.success;
            c = $(d({
                message: l.message,
                isIndpendentHtml: !1
            })).addClass(e), a(), $.when(u.add(c)).then(a)
        }
    }

    function r(e) {
        c = void 0, l = void 0, o()
    }

    function s(e, t) {
        var n = t;
        _.isString(n) && (n = {
            message: n
        }), _.isObject(n) && "" !== n.message && (n.type = e, f.push(n), o())
    }
    var l, c, u, d, p, h = n(2),
        f = [],
        m = !1,
        g = 4e3;
    t.setColorMap = function(e) {
        p = e
    }, t.init = function(e, t) {
        u = e, d = t, h.subscribe(h.events.messagehubInfo, function(e) {
            s("info", e)
        }), h.subscribe(h.events.messagehubWarn, function(e) {
            s("warn", e)
        }), h.subscribe(h.events.messagehubError, function(e) {
            window.setTimeout(function() {
                s("error", e)
            }, 1500)
        })
    }
}, function(e, t, n) {
    var i = n(2);
    t.create = function(e) {
        function t(e, t, i) {
            var a = e;
            void 0 === a && (a = window.innerHeight), o = $('<div id="transitioner"></div>'), o.height(a), $(document.body).append(o), n(18).onTransitionEnd(o, i, 1e3), $("footer").hide(), window.setTimeout(function() {
                o.css({
                    top: $(document).scrollTop() + "px",
                    opacity: 1
                })
            }, 0)
        }

        function a(e) {
            var n = $(e.event.currentTarget).attr("href");
            e.event.altKey || e.event.metaKey || e.event.ctrlKey || e.event.shiftKey || 1 !== e.event.which || Modernizr.touch !== !1 || (e.event.preventDefault(), t(void 0, e.title, function() {
                window.setTimeout(function() {
                    window.location = n
                }, 50)
            }))
        }
        var o;
        return function() {
            i.subscribe(i.events.streamDocumentClicked, a), $(window).on("pageshow popstate", function() {
                $("#transitioner").remove()
            })
        }(), {
            open: t
        }
    }
}, function(e, t, n) {
    function i(e) {
        if (a.initialize(), !e.$form instanceof o) throw new Error("Must provide a form for submission.");
        if (!e.$searchInput instanceof o) throw new Error("Must provide an input field.");
        if ("object" != typeof e.typeAheadConfig) throw new Error("Must provide basic configuration for typeahead.");
        e.$searchInput.typeahead(e.typeAheadConfig, {
            displayKey: "value",
            limit: 20,
            source: a.ttAdapter()
        }).bind("typeahead:select", function() {
            e.$form.submit()
        })
    }
    var a, o = n(17),
        r = window.Bloodhound;
    a = new r({
        datumTokenizer: function(e) {
            return r.tokenizers.whitespace(e.value)
        },
        queryTokenizer: r.tokenizers.whitespace,
        remote: {
            url: "/call/backend-search-suggestions/ios/terms?limit=10&query=%QUERY",
            wildcard: "%QUERY",
            cache: !0,
            rateLimitWait: 100,
            maxParallelRequests: 6,
            filter: function(e) {
                return o.map(e.suggestions.terms, function(e) {
                    return {
                        value: e.term
                    }
                })
            }
        }
    }), e.exports = {
        init: i
    }
}, function(e, t, n) {
    function i() {
        r.isLoggedIn() || window.location.replace(o.issuuLoginUrl(window.location.href))
    }
    var a = n(7),
        o = n(5),
        r = n(4);
    t.createStack = function(e) {
        return i(), a.create({
            cache: !1,
            action: "issuu.stack.add",
            type: "POST"
        }).parameters({
            stackTitle: e.get("name"),
            stackDescription: e.get("description"),
            access: e.get("secret") ? "private" : "public"
        }).deleteCache().call().then(function(e) {
            return e.stack
        })
    }, t.updateStack = function(e) {
        return i(), a.create({
            cache: !1,
            action: "issuu.stack.update",
            type: "POST"
        }).parameters({
            stackId: e.get("id"),
            stackTitle: e.get("name"),
            stackDescription: e.get("description"),
            access: e.get("secret") ? "private" : "public"
        }).deleteCache().call().then(function(e) {
            return e.stack
        })
    }, t.deleteStack = function(e) {
        return i(), a.create({
            cache: !1,
            action: "issuu.stack.delete",
            type: "POST"
        }).deleteCache().parameters({
            stackId: e.get("id")
        }).call()
    }
}, function(e, t, n) {
    var i = n(77),
        a = n(51);
    t.create = function(e) {
        function t() {
            return i()
        }

        function n() {
            u.$.on("click", function() {
                a.create({
                    onFinished: c.onStackCreated
                })
            })
        }

        function o(e) {
            u.$ = $(e), n()
        }

        function r() {
            return u.$ || o(t()), u.$
        }

        function s() {
            return u
        }

        function l() {
            u.$ && (u.$.off("click"), u.$.remove(), u.$ = void 0)
        }
        var c, u = {};
        return function() {
            c = e || {}
        }(), {
            getInitializedElement: r,
            getMarkup: t,
            didInsertElement: o,
            getModel: s,
            removeElement: l
        }
    }
}, function(e, t, n) {
    var i = n(5),
        a = n(4),
        o = n(71),
        r = n(110),
        s = n(164);
    t.create = function(e, t) {
        function n() {
            return r({
                user: c.getRawData(),
                profileUrl: c.getUrl(),
                userPhotoUrl: i.userLargePhotoUrl(c.get("username"), a.isLoggedIn() && c.get("username") === a.getUsername()),
                followMenuMarkup: u.followOptions ? o.create(u.followOptions) : "",
                options: u
            })
        }

        function l() {
            return c
        }
        var c, u;
        return function() {
            u = t || {}, c = s.create(e)
        }(), {
            getMarkup: n,
            getModel: l
        }
    }
}, function(e, t, n) {
    var i = n(5);
    t.create = function(e) {
        function t(e) {
            return void 0 !== c[e] ? c[e] : ""
        }

        function n(e, t) {
            c[e] = t
        }

        function a() {
            c.selected = !0
        }

        function o() {
            c.selected = !1
        }

        function r() {
            c.selected = !c.selected
        }

        function s() {
            return c.selected
        }

        function l() {
            return i.userProfileUrl(c.username)
        }
        var c = {};
        return function() {
            c.selected = e.selected || !1, c.description = e.description || e.about || "", c.docCount = e.docCount || e.documentCount || e.numPublications || 0, c.subscriberCount = e.subscriberCount || e.numFollowers || 0, c.stackCount = e.stackCount || e.numStacks || 0, c.username = (e.username || e.ownerUsername || "").toLowerCase(), c.displayName = e.displayName || e.ownerDisplayName || c.username, c.isBusiness = e.isBusiness || "business" === e.accountType || "B" === e.account || !1, c.isPersonal = !c.isBusiness
        }(), {
            get: t,
            set: n,
            select: a,
            deselect: o,
            toggleSelection: r,
            isSelected: s,
            getUrl: l,
            getRawData: function() {
                return c
            }
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = n(1),
        a = n(2),
        o = n(10),
        r = n(12),
        s = n(206),
        l = n(53),
        c = n(207),
        u = n(211),
        d = n(43),
        p = n(74),
        h = (n(4),
            n(227)),
        f = n(282),
        m = n(365),
        g = n(356),
        v = n(274);
    l.isFlashReader() ? $("html").addClass("flashreader") : ($("html").addClass("htmlreader"), n(84).setColorMap({
        friendly: "bg-info text-info"
    })), t.create = function() {
        function e(e, t, n, a, r, s) {
            var l = k.documentData,
                c = {};
            c.owner = e, c.doc = t, c.services = n || [], c.readerDocCount = a, c.clippingData = s, c.centerCoverEnabled = !k.documentData.showPageZero, c.onlyShowSidebarInFullscreen = k.documentData.onlyShowSidebarInFullscreen, c.showRelatedStreamAds = k.documentData.showRelatedStreamAds, c.isCrawler = k.documentData.isCrawler, r && r.ownerUsername === r.creatorUsername && r.documentId && r.documentId.split("-")[1] === t.documentId.split("-")[1] ? c.embedData = r : c.embedData = {}, l.embedId ? (c.embed = !0, c.embedData.embedId = l.embedId) : c.embed = !1;
            var u = o.create("ad.", o.SESSION),
                d = u.get(l.publicationId) || l.adpageId || null;
            d && i.log("promoted", "adid retrieved: ", d), c.adpageId = d, l.adpageId = d, u.remove(l.publicationId), l.adpageId && (c.adpageId = l.adpageId), s && s.id && (l.pageNumber = s.specs[0].page), i.log("docpage", "DocInfo dataLoaded: ", c), k.metaObj = c, k.initTracker(), k.onDataLoaded(c)
        }

        function b() {}

        function w() {
            var e = $.Deferred();
            return e.resolve(), e.promise()
        }
        var y, k = {},
            _ = !1;
        k.documentData = r.get("documentData"), k.reader = l, k.content = c, k.onUiStateChange = function() {
            c.onUiStateChange.apply(void 0, arguments)
        };
        var x = m.create({
                rootElm: $(".gutter-ad").get(0),
                isFlashReader: l.isFlashReader(),
                allowed: k.documentData.showGutterAds === !0
            }),
            C = g.create({
                isFlashReader: l.isFlashReader(),
                allowed: k.documentData.showInterstitialAds === !0
            });
        return y = C.show(), x.willShow() && l.isFlashReader() && $("#main-container").addClass("ad-gutter").attr("tynt-data", "no-content"), k.onReaderLoaded = function() {
            if (n(18).onTransitionEnd("#loadingtitle", function() {
                    $("#loadingtitle").remove()
                }), $("#loadingtitle").removeClass("intro"), $("html").removeClass("intro"), y.fail(function() {
                    x.show().fail(function() {
                        k.documentData.showPageZero || f.create(l, {
                            allowed: k.documentData.showReaderAds === !0,
                            countryCode: r.get("ISO3166Country"),
                            continent: r.get("Continent")
                        }).show()
                    })
                }), c.onReaderLoaded(), k.documentData.showPageZero && !k.documentData.paidExternalDocPage) {
                var e = $('<div id="pagezero" class="pagezero-container"></div>');
                l.$().append(e), v.create(e, k.metaObj, k.documentData.showReaderAds, 1e3 * p.ads.DFP.interval).render()
            }
            if (l.isFlashReader()) a.broadcast(a.events.documentLoad, {
                pageNumbers: l.getCurrentPages()
            });
            else {
                var t = !1;
                a.subscribe(a.events.onShowStream, function() {
                    t = !0
                }), a.subscribe(a.events.onHideStream, function() {
                    t = !1
                }), d({
                    delay: 200,
                    onFire: function() {
                        _ ? t ? c.resizeStream().done(function() {
                            a.broadcast(a.events.onPageResized)
                        }) : (a.broadcast(a.events.onPageResized), c.resizeStream()) : a.broadcast(a.events.onPageResized)
                    }
                })
            }
            l.setFocus()
        }, k.readerSkin = "default", k.readerFullHeight = !1, k.initReader = function() {
            var e = k.metaObj,
                t = k.documentData.pageNumber,
                n = k.readerSkin;
            l.updateReaderContainerSize(k.readerFullHeight, x.willShow()), u.create();
            var i = l.loadReader(e, t, n, k.onUiStateChange, k.readerFullHeight);
            return i.then(k.onReaderLoaded), i
        }, k.initContent = function() {
            _ = !0, c.init(k.metaObj, !l.isFlashReader()), h.create(k.metaObj)
        }, k.initTracker = function() {
            var e = k.metaObj.doc;
            n(86).create(e.username, e.name), n(87).create(e.username, e.name)
        }, k.onDataLoaded = function(e) {
            y.always(function() {
                k.initContent(), k.initReader()
            })
        }, k.onReady = function() {
            $("#loadingtitle").addClass("intro");
            var t = k.documentData;
            i.log("docpage", "DocInfo init: ", t);
            var a = [];
            a.push(s.loadUserInfo(t.ownerUsername)), a.push(s.loadDocumentInfo(t)), a.push(s.getServices(t.publicationId)), a.push(s.loadReaderDocCount()), t.embedId ? a.push(s.getEmbedIdData(t.embedId)) : a.push(w()), t.clippingId ? a.push(s.getClippingById(t.clippingId)) : a.push(w()), $.when.apply($, a).then(e, b);
            var o = n(9);
            o.setCookie("imsc", "", -1, ".issuu.com")
        }, t._createSuper(k)
    }, t._createSuper = function(e) {
        var t;
        e._super = e._super || {};
        for (t in e) e.hasOwnProperty(t) && "function" == typeof e[t] && (e._super[t] = e[t]);
        return e
    }
}, function(e, t) {
    "use strict";
    t.parse = function(e) {
        var t = {};
        return e ? (e.slice(1, e.length).split("&").map(function(e) {
            return e.split("=")
        }).forEach(function(e) {
            return t[e[0]] = e[1]
        }), t) : t
    }, t.format = function(e) {
        var t = Object.keys(e).filter(function(t) {
            return void 0 !== e[t]
        }).map(function(t) {
            return t + "=" + e[t]
        }).join("&");
        return t ? "?" + t : ""
    }
}, function(e, t, n) {
    "use strict";
    var i = n(2),
        a = n(5),
        o = n(215),
        r = .0326;
    e.exports = Backbone.Model.extend({
        urlRoot: "/call/clippingsv2/clip",
        initialize: function(e, t) {
            this.comments = new o([], {
                clipping: this
            }), this.listenTo(this.comments, "sync", function(e, t, n) {
                this.set("commentCount", t.totalCount)
            }), this.listenTo(this, "sync", function(e, t, n) {
                this.set("pageNumber", t.specs[0].page), this.set("x", t.specs[0].x), this.set("y", t.specs[0].y), this.set("width", t.specs[0].width), this.set("height", t.specs[0].height), this.set("cropurl", this.urlRoot + "/" + this.get("id") + "/crop"), this.set("commentCount", t.comments && t.comments.totalCount || 0)
            }), this.listenTo(this, "change:id", function() {
                this.set("cropurl", this.urlRoot + "/" + this.get("id") + "/crop"), this.comments.clippingId = this.get("id")
            }), e && e.comments && this.comments.reset(e.comments._content), e && e.specs && this.trigger("sync", this, e), this.set("isInternalNavigation", this.get("action") && "gotoPage" === this.get("action").type), i.subscribe(i.events.clippingShare, _.bind(function(e) {
                e && e.clippingId === this.get("id") && this.set("shareCount", this.get("shareCount") + 1)
            }, this))
        },
        getActivityCount: function() {
            return this.get("commentCount") + this.get("shareCount")
        },
        getLinkUrl: function() {
            var e = this.get("action") || {};
            switch (e.type) {
                case "openUrl":
                    var t = e.data.url;
                    return 0 !== t.indexOf("http:") && 0 !== t.indexOf("https:") && 0 !== t.indexOf("mailto:") && (t = "http://" + t), t;
                case "gotoPage":
                    return a.publicationUrl(this.get("document").ownerUsername, this.get("document").name, e.data.pageNumber)
            }
        },
        getLinkText: function() {
            var e = this.get("action") || {};
            switch (e.type) {
                case "openUrl":
                    return e.data.url;
                case "gotoPage":
                    return i18n.t("clippings.overlay.navigationLinkText", {
                        pageNumber: e.data.pageNumber
                    })
            }
        },
        isSmallClipping: function() {
            return this.get("height") < r
        },
        isVideoClipping: function() {
            var e = this.get("action") || {};
            return e.data && e.data.videoid
        }
    })
}, function(e, t) {
    "use strict";
    e.exports = Backbone.Model.extend({
        urlRoot: "/call/clippingsv2/comment"
    })
}, function(e, t, n) {
    "use strict";
    var i = n(2);
    e.exports = Backbone.View.extend({
        linkTemplate: n(297),
        fullTemplate: n(296),
        events: {
            "click .js-commenttrigger": "triggerOverlay",
            "click .js-sharetrigger": "triggerOverlay",
            "click .js-link": "openExternalLink"
        },
        initialize: function(e) {
            this.parent = e.parent, this.root = e.root, this.positionAbsolutely = e.positionAbsolutely, this.listenTo(this.model, "change:commentCount change:shareCount", function() {
                this.$(".js-commentcount").text(this.model.get("commentCount")), this.$(".js-sharecount").text(this.model.get("shareCount")), this._updateCounterVisibility()
            })
        },
        render: function(e) {
            if (this.model.get("isInternalNavigation")) return this;
            this.pageDimensions = e;
            var t = this.model.get("absoluteY") + this.model.get("absoluteHeight");
            if (this.model.getLinkUrl() && this.model.isSmallClipping()) this.setElement(this.linkTemplate({
                absoluteX: this.model.get("absoluteX"),
                absoluteY: t,
                linkUrl: this.model.getLinkUrl()
            }));
            else {
                var n;
                this.model.getLinkUrl() && (n = this.model.isVideoClipping() ? this.model.get("action").data.explicit ? "link" : "play" : "link"), this.setElement(this.fullTemplate({
                    commentCount: this.model.get("commentCount"),
                    shareCount: this.model.get("shareCount"),
                    absoluteX: this.model.get("absoluteX"),
                    absoluteY: t,
                    positionAbsolutely: this.positionAbsolutely !== !1,
                    commentsAllowed: this.parent.parent.commentsAllowed !== !1,
                    isPublisherClipping: this.model.get("isPublisherClipping"),
                    linkUrl: this.model.getLinkUrl(),
                    icon: n
                }))
            }
            if (this.root.append(this.el), this.pageDimensions) {
                for (var i = this.$el.outerHeight(!0); t + i > this.pageDimensions.height + this.pageDimensions.y;) t--;
                this.$el.css({
                    top: t,
                    display: "none"
                })
            }
            return this._updateCounterVisibility(), this
        },
        _updateCounterVisibility: function() {
            this.$(".js-commentcount").toggle(this.model.get("commentCount") > 0), this.$(".js-sharecount").toggle(this.model.get("shareCount") > 0)
        },
        openExternalLink: function(e, t) {
            if (e.stopPropagation(), "openUrl" === this.model.get("action").type)
                if (this.model.isVideoClipping() && t !== !0) {
                    var n = this.model.get("action").data;
                    i.broadcast(i.events.trackingEvent, {
                        event: "clippingAction",
                        data: {
                            action: "videoPlayback",
                            clippingId: this.model.get("id"),
                            videoid: n.videoid,
                            creator: this.model.get("isPublisherClipping") ? "publisher" : "reader",
                            onPage: this.model.get("pageNumber"),
                            openedInReader: !n.explicit,
                            service: n.service,
                            url: n.url
                        }
                    }), n.explicit || (e.preventDefault(), this.triggerVideoOverlay(e))
                } else i.broadcast(i.events.trackingEvent, {
                    event: "clippingAction",
                    data: {
                        action: "openUrl",
                        clippingId: this.model.get("id"),
                        onPage: this.model.get("pageNumber"),
                        url: this.model.get("action").data.url,
                        creator: this.model.get("isPublisherClipping") ? "publisher" : "reader"
                    }
                });
                "gotoPage" === this.model.get("action").type && (e.preventDefault(), i.broadcast(i.events.getReader, _.bind(function(e) {
                e.broadcast("mobileReader.GOTO_PAGE", this.model.get("action").data.pageNumber - 1)
            }, this)), i.broadcast(i.events.trackingEvent, {
                event: "clippingAction",
                data: {
                    action: "gotoPage",
                    clippingId: this.model.get("id"),
                    onPage: this.model.get("pageNumber"),
                    page: this.model.get("action").data.pageNumber,
                    creator: this.model.get("isPublisherClipping") ? "publisher" : "reader"
                }
            }))
        },
        triggerVideoOverlay: function() {
            this.parent.trigger("openVideoOverlay", this.model)
        },
        triggerOverlay: function(e) {
            e.stopPropagation(), e.preventDefault(), this.trigger("openOverlay", this.model)
        },
        isVisible: function() {
            return this.$el.filter(":visible").length > 0
        },
        toggle: function() {
            this.isVisible() ? this.hide() : this.show()
        },
        hide: function() {
            this.$el.hide(), this.parent.areaView.hideLink(), this.parent.parent.trigger("metaelement:hidden", this.model)
        },
        show: function() {
            this.$el.show(), this.parent.areaView.showLink(), this.parent.parent.trigger("metaelement:shown", this.model)
        }
    })
}, function(e, t, n) {
    "use strict";
    var i = n(2),
        a = n(9),
        o = Backbone.ajax;
    Backbone.ajax = function(e) {
        return "GET" !== e.type && (e.headers = e.headers || {}, e.headers["X-Csrf-Token"] = a.getCookie("CSRF-TOKEN")), o.apply(Backbone, [e])
    };
    var r = n(219),
        s = n(216),
        l = n(220),
        c = n(226),
        u = n(167);
    t.Model = u, t.create = Backbone.View.extend({
        initialize: function(e) {
            this.metaObj = e.metaObj, this.readerRoot = $(e.root), this.isClipCreatorActive = !1, this.commentsAllowed = this.metaObj.commentsAllowed !== !1, this.clippings = new s({
                el: this.$el,
                parent: this,
                metaObj: this.metaObj,
                linksOnly: e.linksOnly,
                protectedReadToken: e.protectedReadToken
            }), this.overlayView = new l({
                parent: this,
                root: $("body")
            }), this.setReaderDimensions(e.readerDimensions), this.render(), this._setupEventListeners()
        },
        setReaderDimensions: function(e) {
            this.readerDimensions = e, this.isClipCreatorActive && r.setConstraints(this._getClipCreatorConstraints()), this.clippings.setRenderInfo(this.readerDimensions)
        },
        render: function() {
            this.readerRoot.append(this.$el.addClass("cliproot"))
        },
        remove: function() {
            this.clippings.remove(), this.overlayView.remove(), this.videoOverlayView.remove(), Backbone.View.prototype.remove.apply(this, arguments)
        },
        renderClippings: function() {
            this.$el.css("visibility", ""), this.clippings.render()
        },
        hideClippings: function() {
            this.$el.css("visibility", "hidden")
        },
        removeClippings: function() {
            this.$el.css("visibility", ""), this.clippings.remove()
        },
        startClippingCreation: function() {
            this.isClipCreatorActive || (this.removeClippings(), this.$el.addClass("fullscreen"), this.trigger("clippingCreatorChanged:open"), r.create(this.$el, {
                constraints: this._getClipCreatorConstraints(),
                onCreate: _.bind(this._createClip, this),
                onCancel: _.bind(this.stopClippingCreation, this)
            }), this.isClipCreatorActive = !0)
        },
        _getClipCreatorConstraints: function() {
            return _.map(this.readerDimensions.dimensions, function(e) {
                return {
                    minX: e.x,
                    minY: e.y,
                    maxX: e.x + e.width,
                    maxY: e.y + e.height
                }
            })
        },
        _createClip: function() {
            r.setErrorMessage("");
            var e = r.getCoordinates(),
                t = this.readerDimensions.pagenumbers[e.constraintIndex],
                n = new u({
                    specs: [{
                        width: e.dimensions.width,
                        height: e.dimensions.height,
                        x: e.dimensions.x,
                        y: e.dimensions.y,
                        page: t
                    }],
                    document: {
                        publicationId: this.metaObj.publicationId,
                        revisionId: this.metaObj.revisionId
                    }
                }),
                a = n.save();
            r.setCreateButtonPromise(a.promise()), a.then(_.bind(function(e) {
                this.clippings.collection.add(n), this.stopClippingCreation(), this.openOverlay(n), i.broadcast(i.events.trackingEvent, {
                    event: "clippingAction",
                    data: {
                        action: "created",
                        clippingId: n.get("id"),
                        onPage: n.get("pageNumber"),
                        creator: n.get("isPublisherClipping") ? "publisher" : "reader"
                    }
                })
            }, this), function() {
                r.setErrorMessage(i18n.t("clippings.creator.errorCreatingClip"))
            })
        },
        stopClippingCreation: function() {
            this.isClipCreatorActive = !1, r.destroy(), this.$el.removeClass("fullscreen"), this.trigger("clippingCreatorChanged:closed"), this.renderClippings()
        },
        openOverlay: function(e) {
            var t = this.clippings.modelsOnPage.filter(function(t) {
                return !t.isSmallClipping() && !t.get("isInternalNavigation") || e === t
            }, this);
            this.overlayView.model.set("modelsInSet", t), this.overlayView.model.set("activeClippingModel", e), this.trigger("overlayChanged:open")
        },
        openVideoOverlay: function(e) {
            this.videoOverlayView && this.videoOverlayView.remove(), this.videoOverlayView = new c({
                model: e,
                parent: this,
                root: $("body")
            }), this.videoOverlayView.render(), this.trigger("videoOverlayChanged:open")
        },
        setUserClippingsVisibility: function() {
            this.clippings.setUserClippingsVisibility.apply(this.clippings, arguments)
        },
        _setupEventListeners: function() {
            i.subscribe(i.events.getClippingCount, _.bind(function(e) {
                _.isFunction(e.callback) && e.callback(this.clippings.getClippingCountOnPages(e.pagenumbers))
            }, this)), this.listenTo(this.clippings.collection, "add remove reset", function() {
                i.broadcast(i.events.onClippingCountUpdated)
            })
        }
    })
}, function(e, t, n) {
    "use strict";
    n(2);
    e.exports = {
        initYoutubePlayer: function(e, t) {
            window.YT ? this._loadYoutubeVideo(e, t) : $.getScript("//www.youtube.com/iframe_api"), window.onYouTubeIframeAPIReady = function() {
                this._loadYoutubeVideo(e, t)
            }.bind(this)
        },
        _loadYoutubeVideo: function(e, t) {
            var n = t.attr("id");
            new YT.Player(n, {
                videoId: e,
                playerVars: {
                    showinfo: 0
                },
                events: {
                    onReady: function(e) {
                        this._makeIframeFluid($("#" + n)), e.target.playVideo()
                    }.bind(this)
                }
            })
        },
        initVimeoPlayer: function(e, t) {
            var n = $('<iframe frameborder="0">'),
                i = $.param({
                    title: 0,
                    portrait: 0,
                    byline: 0,
                    badge: 0,
                    autoplay: 1
                }),
                a = "//player.vimeo.com/video/" + e + "?" + i;
            n.attr({
                src: a,
                frameborder: 0,
                webkitallowfullscreen: "webkitallowfullscreen",
                mozallowfullscreen: "mozallowfullscreen",
                allowfullscreen: "allowfullscreen"
            }), t.replaceWith(n);
            var o = $f(n[0]);
            o.addEvent("ready", function() {
                this._makeIframeFluid(n)
            }.bind(this))
        },
        _makeIframeFluid: function(e) {
            var t = e.height() / e.width() * 100;
            e.css({
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                "z-index": 2
            }), e.parent().css({
                "padding-top": t + "%",
                opacity: 1,
                height: 0,
                "z-index": 1
            })
        }
    }
}, function(e, t, n) {
    "use strict";

    function i(e) {
        return e.preventDefault(), e.stopPropagation(), $("#skema .selected-style").hasClass("in-progress") || $("#skema .selected-style").hasClass("done") || $("#skema .create-embed-link").hasClass("in-progress") || $("#skema .create-embed-link").hasClass("done") ? !1 : (V = !1, $("#skema .update-embed-link").hide(), $("#skema .selected-style").removeClass("can-update-style"), $("#skema .create-embed-link").addClass("in-progress"), $("#skema .create-embed-link").text("Saving style"), void H.createStyle(function() {
            H.createEmbed(function(e) {
                H.addEmbed(e, function(e) {
                    $("#skema .create-embed-link").removeClass("in-progress").addClass("done"), $("#skema .create-embed-link").text("Style saved"), setTimeout(function() {
                        $("#skema .create-embed-link").hide().removeClass("done"), 1 === e.length ? $("#skema .create-embed-link").text("Create new") : $("#skema .create-embed-link").text("Save style"), l(), V = !0
                    }, 2e3)
                })
            })
        }))
    }

    function a(e) {
        return e.preventDefault(), e.stopPropagation(), !$("#skema .selected-style").hasClass("can-update-style") || $("#skema .selected-style").hasClass("in-progress") || $("#skema .selected-style").hasClass("done") || $("#skema .create-embed-link").hasClass("in-progress") || $("#skema .create-embed-link").hasClass("done") ? !1 : ($("#skema .stylesDropdown ul").hide(), V = !1, $("#skema .create-embed-link").hide(), $("#skema .update-embed-link").text("Updating"), $("#skema .selected-style").addClass("in-progress"), void H.updateStyle(function() {
            H.updateEmbed(function() {
                $("#skema .update-embed-link").text("Updated"), $("#skema .selected-style").removeClass("in-progress").addClass("done"), $("#skema .update-message").css("display", "inline-block"), setTimeout(function() {
                    $("#skema .selected-style").removeClass("done"), $("#skema .update-embed-link").text("Update").hide(), $("#skema .selected-style").removeClass("can-update-style"), l(), V = !0, $("#skema .update-message").css("display", "inline-block"), $("#skema .update-message").fadeOut(150)
                }, 2e3)
            })
        }))
    }

    function o(e) {
        e.stopPropagation(), $(this).closest(".style-dropdown").find(".selected-style-title").html($(this).html()), $("#skema .stylesDropdown li").show(), $(this).hide(), $(this).hasClass("default") ? (G = "new", $("#skema .create-embed-link").addClass("primary-button").removeClass("secondary-button"), $("#skema .selected-style").removeClass("primary-button").addClass("secondary-button")) : (G = "update", $("#skema .create-embed-link").removeClass("primary-button").addClass("secondary-button"), $("#skema .selected-style").addClass("primary-button").removeClass("secondary-button")), O = $(this).attr("data-embedId"), H.selectEmbed(O), $("#skema .create-embed-link, #skema .update-embed-link").hide(), $("#skema .selected-style").removeClass("can-update-style"), $("#skema .stylesDropdown ul").hide(), m(), b(), y(), w(), f()
    }

    function r(e) {
        e.preventDefault(), e.stopPropagation()
    }

    function s(e) {
        e.preventDefault(), H.deleteEmbed(P, function() {
            H.loadEmbeds(function(e) {
                l(), $("#skema #confirm-delete-dialogue").fadeOut(150), P = null
            })
        })
    }

    function l() {
        var e, t, c = [],
            u = H.getEmbedList() || [];
        if ($("#skema .stylesDropdown").html(""), u.length) {
            $.each(u, function(e, n) {
                var i = n.updated.substr(0, 10).split("-"),
                    a = "medium";
                n.width <= 400 && (a = "small"), n.width >= 650 && (a = "big"), t = 0 === e ? {
                    title: "Default",
                    id: n.id + "",
                    iconColor: n.style && n.style.embedBGColor ? n.style.embedBGColor : "#e6e6e6",
                    cssClass: "default",
                    iconSize: a,
                    deleteEmbed: !1
                } : {
                    title: "Style " + e,
                    updated: W[parseInt(i[1], 10) - 1] + " " + i[0],
                    id: n.id + "",
                    iconColor: n.style && n.style.embedBGColor ? n.style.embedBGColor : "#e6e6e6",
                    cssClass: "update-embed",
                    iconSize: a,
                    deleteEmbed: !0
                }, c.push(t)
            }), e = n(307), $("#skema .stylesDropdown").html(e({
                embeds: c,
                noCustomEmbeds: 1 === u.length
            })), u.length > 1 && $("#skema .style-dropdown").css("display", "inline-block"), $("#skema #confirm-delete").on("click", s), $("#skema #cancel-delete").on("click", function(e) {
                e.preventDefault(), $("#skema #confirm-delete-dialogue").fadeOut(150), P = null
            }), $("#skema .stylesDropdown .toggle-dropdown").on("click", function(e) {
                e.stopPropagation(), $("#skema .stylesDropdown ul").toggle()
            }), $("#skema .stylesDropdown li").on("click", o), $(document.body).click(function() {
                $("#skema .stylesDropdown ul").hide()
            }), $("#skema .selected-style").hover(function(e) {
                $(this).addClass("over")
            }, function(e) {
                $(this).removeClass("over")
            }), $("#skema .toggle-dropdown").hover(function(e) {
                $(this).addClass("over"), e.stopPropagation()
            }, function(e) {
                $(this).removeClass("over")
            }), $("#skema .selected-style").on("click", a), $("#skema .create-embed-link").on("click", i), $("#skema .delete-embed").on("click", r);
            var d = H.getSelectedEmbedId();
            d ? $('#skema .stylesDropdown li[data-embedid="' + d + '"]').trigger("click") : $("#skema .stylesDropdown li:first").trigger("click"), f()
        } else {
            var p = $("#skema input[name=layout]").filter("input[checked]").val(),
                h = $("#skema input[name=customX]").val();
            $("#skema input[name=customY]").val(k(h, p)), H.set(g()), setTimeout(function() {
                H.createEmbed(function(e) {
                    H.addEmbed(e, function(e) {
                        l()
                    })
                })
            }, 100)
        }
    }

    function c() {
        U.isLoggedIn() && h(), setTimeout(function() {
            H.set(g()), setTimeout(function() {
                b()
            }, 100);
            var e = H.getEmbedList() || [];
            e.length < Y && $("#skema .create-embed-link").show(), "update" === G && ($("#skema .update-embed-link").show(), $("#skema .selected-style").addClass("can-update-style"))
        }, 100)
    }

    function u() {
        v(R.doc.pageCount);
        var e = R.doc.orgDocType || "pdf";
        (1 === R.doc.pageCount || "odp" === e || "sxi" === e || "ppt" === e) && $("#skema input#l2").prop("checked", !0), 1 === R.doc.pageCount && $("#skema .multipage").hide();
        var t = $("#skema input[name=size]").filter("input[checked]").val(),
            n = $("#skema input[name=layout]").filter("input[checked]").val();
        $("#skema input[name=customX]").val(t), $("#skema input[name=customY]").val(k(t, n)), R.doc.downloadable === !1 && ($("#skema #showPrintButtonId").prop("checked", !1).attr("disabled", "disabled"), $("#skema label[for=showPrintButtonId]").addClass("textGrey")), "E" !== R.doc.pro && ($("#skema div.showBlock").show(), $("#skema .hideForEnterpriseDocs").show()), R.doc.isProcessing && $("#skema p#doc-converting").show()
    }

    function d() {
        p(), $("#skema input[name=customX]").on("focus", function() {
            $("#skema #s4").prop("checked", !0)
        }).on("change", function() {
            var e;
            if (e = R.doc.pageCount > 1 ? $("#skema input[name=layout]").filter("input[checked]").val() : "singlePage", !$(this).val() || isNaN(parseInt($(this).val(), 10))) {
                var t = $("#skema input[name=customY]").val();
                !t || isNaN(parseInt(t, 10)) ? $(this).val(525).change() : $(this).val(x(t, e))
            } else $("#skema input[name=customY]").val(k($(this).val(), e));
            setTimeout(function() {
                H.set(g()), setTimeout(function() {
                    b(), U.isLoggedIn() || y()
                }, 100)
            }, 100)
        }), $("#skema input[name=customY]").on("focus", function() {
            $("#skema #s4").prop("checked", !0)
        }).on("change", function() {
            var e = $("#skema input[name=layout]").filter("input[checked]").val();
            if (!$(this).val()) {
                var t = $("#skema input[name=customX]").val();
                $(this).val(k(t, e))
            }
            setTimeout(function() {
                H.set(g()), setTimeout(function() {
                    b(), U.isLoggedIn() || y()
                }, 100)
            }, 100)
        }), $("#skema select[name=startingPage]").on("focus", function() {
            $("#skema #backgroundColor1").ColorPickerHide()
        }), $("#skema select[name=startingPage]").on("change", function() {
            setTimeout(function() {
                w()
            }, 100)
        }), $("#skema input[name=logoUrl]").on("change", function() {
            $("#skema div.logoTester").html(""), $("#skema div.logoTester").append('<img class="logotest" src="' + $("#skema input[name=logoUrl]").val() + "\" onError=\"$('img.logotest').attr('src', '//static.issuu.com/static-assets/_legacy/assets/images/default_cover_medium.png')\" style=\"display: none;\">"), $("#skema img.logotest").load(function() {
                var e = $("#skema img.logotest").height();
                e || (e = 110);
                var t = parseInt(e, 10) + 10 + "px";
                $("#skema img.logotest").show(), $("#skema div.logoTester").animate({
                    height: t
                })
            })
        }), $(window).on("keypress.embedForm", function(e) {
            return "13" === e.which ? (e.stopPropagation(), e.preventDefault(), !1) : void 0
        }), $("#skema h3.showHideEmbedOptions").on("click", function() {
            $("#skema div.showHideEmbedOptionsContent");
            "none" === $("#skema div.showHideEmbedOptionsContent").get()[0].style.display ? ($("#skema div.showHideEmbedOptionsContent").show(), $("#skema h3.showHideEmbedOptions span.showEO").hide(), $("#skema h3.showHideEmbedOptions span.hideEO").show(), $("#skema h3.showHideEmbedOptions").addClass("open")) : ($("#skema div.showHideEmbedOptionsContent").hide(), $("#skema h3.showHideEmbedOptions span.showEO").show(), $("#skema h3.showHideEmbedOptions span.hideEO").hide(), $("#skema h3.showHideEmbedOptions").removeClass("open"))
        });
        var e = /^#[A-Fa-f0-9]{6}$/;
        $("#skema #backgroundColor1").ColorPicker({
            eventName: "click",
            onBeforeShow: function() {
                $(this).ColorPickerSetColor(this.value.substring(1))
            },
            onSubmit: function(e, t, n, i) {
                $(i).val("#" + t), $(i).ColorPickerHide(), $("#skema select[data-for=backgroundColor1]").val("custom"), c()
            },
            onChange: function(e, t, n) {
                $("#skema #backgroundColor1").css({
                    "background-color": "#" + t,
                    color: j.findTextColorToHexBackground("#" + t)
                }).val("#" + t)
            },
            onHide: function() {
                $("#skema select[data-for=backgroundColor1]").val("custom"), c()
            }
        }).on("keyup", function() {
            e.test(this.value) && ($(this).ColorPickerSetColor(this.value), $("#skema #backgroundColor1").css("backgroundColor", $("#skema #backgroundColor1").val()))
        }).on("blur", function() {
            e.test(this.value) ? ($(this).ColorPickerSetColor(this.value), $("#skema #backgroundColor1").css("backgroundColor", $("#skema #backgroundColor1").val())) : ($(this).val("#e6e6e6").ColorPickerSetColor("#e6e6e6"), $("#skema #backgroundColor1").css("backgroundColor", "#e6e6e6"))
        }), $("#skema #backgroundColor2").ColorPicker({
            eventName: "click",
            onBeforeShow: function() {
                $(this).ColorPickerSetColor(this.value.substring(1))
            },
            onSubmit: function(e, t, n, i) {
                $(i).val("#" + t), $(i).ColorPickerHide(), $("#skema select[data-for=backgroundColor2]").val("custom"), c()
            },
            onChange: function(e, t, n) {
                $("#skema #backgroundColor2").css({
                    "background-color": "#" + t,
                    color: j.findTextColorToHexBackground("#" + t)
                }).val("#" + t)
            },
            onHide: function() {
                $("#skema select[data-for=backgroundColor2]").val("custom"), c()
            }
        }).on("keyup", function() {
            e.test(this.value) && ($(this).ColorPickerSetColor(this.value), $("#skema #backgroundColor2").css("backgroundColor", $("#skema #backgroundColor2").val()))
        }).on("blur", function() {
            e.test(this.value) ? ($(this).ColorPickerSetColor(this.value), $("#skema #backgroundColor2").css("backgroundColor", $("#skema #backgroundColor2").val())) : ($(this).val("#222222").ColorPickerSetColor("#222222"), $("#skema #backgroundColor2").css("backgroundColor", "#222222"))
        }), $("#skema a.toggler").on("click", function(e) {
            e.preventDefault();
            var t = $(this).get()[0];
            t.expandedStatus && "expanded" === t.expandedStatus ? (t.expandedStatus = "collapsed", $("#skema #" + $(this).attr("data-for")).hide()) : (t.expandedStatus = "expanded", $("#skema #" + $(t).attr("data-for")).show())
        }), $("#skema select.colorDropDown").on("change", function(e) {
            e.preventDefault();
            var t, n;
            "backgroundColor1" === $(this).attr("data-for") ? (t = j.colorMap.embedColors.colors, n = j.colorMap.embedColors.defaultColor) : (t = j.colorMap.bgColors.colors, n = j.colorMap.bgColors.defaultColor), "default" !== $(this).val() && "custom" !== $(this).val() && t[$(this).val()] ? $("#skema #" + $(this).attr("data-for")).val(t[$(this).val()]).css({
                "background-color": t[$(this).val()],
                color: j.findTextColorToHexBackground(t[$(this).val()])
            }) : "default" === $(this).val() ? $("#skema #" + $(this).attr("data-for")).val(n.name).css({
                "background-color": n.colorExample,
                color: j.findTextColorToHexBackground(n.colorExample)
            }) : "custom" === $(this).val() && ("backgroundColor1" === $(this).attr("data-for") ? $("#skema #backgroundColor1").click() : $("#skema #backgroundColor2").click())
        }), $("#skema input[name=size]").on("click", function(e) {
            var t, n = $(this).attr("id");
            if (t = R.doc.pageCount > 1 ? $("#skema input[name=layout]").filter("input[checked]").val() : "singlePage", -1 !== $.inArray(n, ["s1", "s2", "s3"])) {
                var i = $(this).val();
                $("#skema input[name=customX]").val(i), $("#skema input[name=customY]").val(k(i, t))
            }
            setTimeout(function() {
                H.set(g()), setTimeout(function() {
                    b(), U.isLoggedIn() || y()
                }, 100)
            }, 100)
        });
        var t = function(e) {
            var t = $(this).attr("data-design");
            $("#skema .designHide").hide(), $(this).prop("checked") && $("." + t).show(), "d2" === t ? $("#skema #d1").removeAttr("checked") : "d1" === t && $("#skema #d2").removeAttr("checked")
        };
        $("#skema input[name=design]").click(t), $("#skema input[name=addALogo]").on("click", function() {
            $(this).prop("checked") ? $("#skema .addALogoHide").show() : $("#skema .addALogoHide").hide()
        }), $("#skema input[name=logoType]").on("click", function() {
            var e = $(this).attr("id");
            $("#skema .selectALogoHide").hide(), $("#skema ." + e).show()
        }), $("#skema a.toNormalEmbedPage").on("click", function(e) {
            e.preventDefault(), e.stopPropagation();
            n(233).expand(R)
        }), $("#skema input[name=layout]").on("click", function(e) {
            "singlePage" === $(this).val() ? $("#skema .autoflip").hide() : $("#skema .autoflip").show();
            var t = $(this).val(),
                n = $("#skema input[name=customX]").val();
            $("#skema input[name=customY]").val(k(n, t))
        }), $(".embed-ToolTipper").issuuTooltip({
            orientation: "north",
            autoClose: !0,
            closeOnOverSubmenu: !1
        }), $("#skema #use-iframe").click(function() {
            $(this).prop("checked") ? ($("#skema .iframe-code").show(), $("#skema .embed-code").hide()) : ($("#skema .iframe-code").hide(), $("#skema .embed-code").show())
        }), $("#skema .selectable").click(function() {
            $(this).find("code, span").selectText()
        })
    }

    function p() {
        $("#skema").on("change", "input[name=customX], select[name=startingPage], select[name=linkTarget], input[name=logoUrl], select.colorDropDown, input[name=embedBackgroundColor], input[name=designBackgroundColor], input[name=backgroundImage], select[name=backgroundImageStyle], input[name=logoType], input[name=showLinks]", c), $("#skema").on("click", 'input[name=size], input[name=design], input[name=addALogo], input[name=logoType], input[name=layout], input:checkbox[id!="use-iframe"]', c), $("#skema").on("focus", "input[name=backgroundImage]", c)
    }

    function h() {
        $("#skema .selectable").addClass("disabled")
    }

    function f() {
        $("#skema .selectable").removeClass("disabled")
    }

    function m() {
        var e = H.get().style,
            t = H.get().embed;
        $("#skema input[name=size][value=custom]").prop("checked", !0), $("#skema input[name=size][value=" + t.width + "]").prop("checked", !0), $("#skema input[name=customX]").val(t.width), $("#skema input[name=customY]").val(t.height), "doublePage" === e.viewMode ? $("#skema #l1").prop("checked", !0) : $("#skema #l2").prop("checked", !0), $("#skema #autoflipThepagesId").prop("checked", !!e.autoFlip);
        var n, i;
        if (e.embedBGColor) {
            for (n in j.colorMap.embedColors.colors)
                if (j.colorMap.embedColors.colors[n] === e.embedBGColor) {
                    $("#skema #embedBackgroundColorDropdown").val(n), $('#skema input[name="embedBackgroundColor"]').val(e.embedBGColor).css("background-color", e.embedBGColor), i = !0;
                    break
                }
            i || ($("#skema #embedBackgroundColorDropdown").val("Custom"), $('#skema input[name="embedBackgroundColor"]').val(e.embedBGColor).css("background-color", e.embedBGColor))
        } else $("#skema #embedBackgroundColorDropdown").val("Default"), $('#skema input[name="embedBackgroundColor"]').val(j.colorMap.embedColors.colors["default"]).css("background-color", "#e6e6e6");
        if ($('#skema select[name="startingPage"]').val(t.readerStartPage), $("#skema #showSocialOptionsId").prop("checked", -1 === $.inArray("brandpackage", N) ? !0 : e.showShareMenu), $("#skema #showLinksId").prop("checked", -1 === $.inArray("brandpackage", N) ? !0 : e.showArchiveLink), R.doc.downloadable !== !1 && $("#skema #showPrintButtonId").prop("checked", e.showPrintButton), $("#skema #showShareButtonId").prop("checked", e.showShareButton), $("#skema #showSearchButtonId").prop("checked", e.showSearchButton), $("#skema #showArchiveSidebarId").prop("checked", e.showArchive), $("#skema #showClippings").prop("checked", e.showClippings), $('#skema select[name="linkTarget"]').val(e.linkTarget), $("#skema #addALogoId").prop("checked", !!e.readerLogo), e.readerLogo) {
            $("#skema .addALogoHide").show();
            var a = M.userLargePhotoUrl(R.user.username);
            a === e.readerLogo ? ($("#skema #logo1").prop("checked", !0), $("#skema .logo1").show(), $("#skema .logo2").hide()) : ($("#skema #logo2").prop("checked", !0), $('#skema input[name="logoUrl"]').val(e.readerLogo), $("#skema .logo2").show(), $("#skema .logo1").hide())
        } else $("#skema .addALogoHide").hide();
        e.embedFSColor && e.readerTheme ? ($("#skema #d1").prop("checked", !0), $("#skema #designBackgroundColorDropdown").val(e.readerTheme), $('#skema input[name="designBackgroundColor"]').val(e.embedFSColor).css("background-color", e.embedFSColor), $("#skema .d1").show()) : ($("#skema #d1").prop("checked", !1), $("#skema .d1").hide()), e.embedBGImage ? ($("#skema #d2").prop("checked", !0), $('#skema input[name="backgroundImage"]').val(e.embedBGImage), $('#skema select[name="backgroundImageStyle"]').val(e.embedBGImagePos), $("#skema .d2").show()) : ($("#skema #d2").prop("checked", !1), $("#skema .d2").hide())
    }

    function g() {
        var e, t, n, i = $('form[name="skema"]').serializeArray(),
            a = {};
        for (n = 0; n < i.length; n++) a[i[n].name] ? (a[i[n].name] = [a[i[n].name]], a[i[n].name].push(i[n].value)) : a[i[n].name] = i[n].value;
        return e = {
            showArchive: "undefined" != typeof a.showArchiveSidebar && "true" === a.showArchiveSidebar,
            showArchiveLink: "undefined" != typeof a.showLinks && "true" === a.showLinks,
            showShareMenu: "undefined" != typeof a.showSocialOptions && "true" === a.showSocialOptions,
            embedBGColor: "#transparent" === a.embedBackgroundColor || "undefined" == typeof a.embedBackgroundColor ? "" : a.embedBackgroundColor.toLowerCase(),
            embedBGImage: a.design && ($.isArray(a.design) && $.inArray("image", a.design) > -1 || "image" === a.design) && "http://" !== a.backgroundImage ? a.backgroundImage : "",
            embedBGImagePos: a.backgroundImageStyle,
            embedFSColor: a.design && ($.isArray(a.design) && $.inArray("color", a.design) > -1 || "color" === a.design) ? a.designBackgroundColor.toLowerCase() : "",
            showPrintButton: "undefined" != typeof a.showPrintButton && "true" === a.showPrintButton,
            showShareButton: "undefined" != typeof a.showShareButton && "true" === a.showShareButton,
            showSearchButton: "undefined" != typeof a.showSearchButton && "true" === a.showSearchButton,
            autoFlip: "undefined" != typeof a.autoflip && "true" === a.autoflip,
            viewMode: a.layout,
            linkTarget: a.linkTarget,
            readerTheme: a.design && ($.isArray(a.design) && $.inArray("color", a.design) > -1 || "color" === a.design) ? a.colorChooser : "",
            readerLayout: "",
            readerLogo: a.addALogo && "true" === a.addALogo ? "profileimage" === a.logoType ? M.userLargePhotoUrl(R.user.username) : "www.mysite.com/logo.png" !== a.logoUrl ? a.logoUrl : "" : "",
            showClippings: "undefined" != typeof a.showClippings && "true" === a.showClippings
        }, t = {
            readerStartPage: parseInt(a.startingPage || 1, 10),
            width: parseInt(a.customX, 10),
            height: parseInt(a.customY, 10)
        }, {
            style: e,
            embed: t
        }
    }

    function v(e) {
        var t;
        for (t = 1; e >= t; t++) $('#skema select[name="startingPage"]').append('<option value="' + t + '">' + t + "</option>")
    }

    function b() {
        if (V) {
            var e = {},
                t = H.get(),
                n = $.extend(e, t.style);
            t.embed.width > 800 ? (n.width = C(), t.embed.height > 500 ? n.height = A() : n.height = t.embed.height, $("#skema .sizeExplanation").show()) : t.embed.height > 500 ? (n.width = t.embed.width, n.height = A(), $(".sizeExplanation").show()) : (n.width = t.embed.width, n.height = t.embed.height, $("#skema .sizeExplanation").hide()), U.isLoggedIn() || (n.showArchiveLink = !0), n.scriptAccessEnabled = !1, H.setPreview(n), $("#skema .previewBox").width(n.width), setTimeout(function() {
                var e = H.getPreviewEmbedCode();
                $("#skema div.previewBox").html(e)
            }, 100)
        }
    }

    function w() {
        var e = H.getUrl();
        e = e.match(/.{1,25}/g), $("#skema #doc-link").html("<strong>" + i18n.t("embedForm.link") + "</strong> <span>" + e.join("<wbr>") + "</span>"), E("#skema #doc-link")
    }

    function y() {
        var e, t, n = i18n.t("embedForm.embedCode");
        e = H.getEmbedCode(), $("#skema #embed-code").html("<strong>" + n + "</strong> <code>" + $("<div/>").text(e).html() + "</code>"), t = H.getIFrameEmbedCode(), $("#skema #iframe-code").html("<strong>" + n + "</strong> <code>" + $("<div/>").text(t).html() + "</code>"), E("#skema #embed-code"), E("#skema #iframe-code")
    }

    function k(e, t) {
        var n = R.doc.firstpageHeight / R.doc.firstpageWidth;
        (!t || "doublePage" === t && R.doc.pageCount > 1) && (n /= 2);
        var i = Math.round(parseFloat(n * e));
        return e > 740 && (i += z), i
    }

    function x(e, t) {
        var n = R.doc.firstpageWidth / R.doc.firstpageHeight;
        "doublePage" === t && (n = 2 * n);
        var i = Math.floor(parseFloat(n * e));
        return i
    }

    function C() {
        return 800
    }

    function A() {
        var e = k(C(), "doublePage");
        return 250 > e ? 250 : e > 500 ? 500 : e
    }

    function E(e) {
        $(e).addClass("flash"), setTimeout(function() {
            $(e).removeClass("flash")
        }, 250)
    }

    function I(e) {
        e ? ($("#skema .product-brandpackage").removeClass("disabled"), $("#skema .product-brandpackage :checkbox").prop("disabled", !1)) : ($("#skema .product-brandpackage").addClass("disabled"), $("#skema .product-brandpackage :checkbox").prop("disabled", !0))
    }

    function S() {
        $("#skema .show-pro").show()
    }

    function D() {
        if (u(), d(), U.isLoggedIn()) {
            var e = {};
            e.profileUsername = U.getUsername().toLowerCase(), H.loadLicences(function(e) {
                N = e, I($.inArray("brandpackage", e) > -1), $.inArray("brandpackage", e) > -1 && _.findIndex(e, ["statsmonths", "6"]) > -1 && S(), $.inArray("brandpackage", e) > -1 && $.inArray("norelated", e) > -1 && $("#skema .linkToOldEmbed").show()
            }), H.loadEmbeds(function(e) {
                l()
            })
        } else {
            H.resetStyle();
            var t = $("#skema input[name=customX]").val();
            $("#skema input[name=customY]").val(k(t, R.doc.pageCount > 1 ? "doublePage" : "singlePage")), H.set(g()), setTimeout(function() {
                H.createEmbed(function(e) {
                    b(), y(), w()
                })
            }, 100)
        }
    }

    function T() {
        $("#skema").off("change", "input[name=customX], select[name=startingPage], select[name=linkTarget], input[name=logoUrl], select.colorDropDown, input[name=embedBackgroundColor], input[name=designBackgroundColor], input[name=backgroundImage], select[name=backgroundImageStyle], input[name=logoType], input[name=showLinks]", c), $("#skema").off("click", 'input[name=size], input[name=design], input[name=addALogo], input[name=logoType], input[name=layout], input:checkbox[id!="use-iframe"]', c), $("#skema").off("focus", "input[name=backgroundImage]", c), $(window).off(".embedForm")
    }
    var P, O, R, F, N, L = n(23),
        M = (n(6), n(5)),
        U = n(4),
        B = (n(345), n(306)),
        H = n(235),
        j = n(232),
        z = 150,
        W = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        G = "new",
        V = !0,
        Y = 10;
    t.expand = function(e) {
        R = e, H.reset(), H.initDocAndUser(R), H.resetEmbed(), H.resetStyle(), F = L.create({
            marginClickClose: !1,
            content: B({
                anonymousUser: !U.isLoggedIn(),
                loginUrl: M.issuuLoginUrl(M.publicationUrl(R.doc.username, R.doc.name) + "#embed"),
                defaultUserImageUrl: "//static.issuu.com/static-assets/_legacy/images/default_cover_medium.png"
            }),
            onShow: D,
            onRemove: T
        }), L.show(F)
    }
}, function(e, t, n) {
    "use strict";

    function i() {
        return d({
            title: c.title,
            cover: f.pageMediumThumbUrl(c.publicationId, c.revisionId)
        })
    }

    function a() {
        return u.find("input[type=radio]:checked").val() || void 0
    }

    function o(e) {
        e.preventDefault(), e.stopPropagation(), u.find(".feedback").text("");
        var t = a();
        if (void 0 !== t) {
            if ("quarantined" === t) return s(), void window.open("/legal/dmca", "_blank");
            u.find("button.flag").addClass("spinner");
            var n = h.create({
                action: "issuu.flag.document_inappropriate",
                type: "POST"
            }).parameters({
                documentId: c.revisionId + "-" + c.publicationId,
                flag: t
            }).call();
            $.when(n).then(function() {
                s(), m.broadcast(m.events.messagehubInfo, {
                    message: i18n.t("flagdocument.feedback_success", {
                        docname: c.title,
                        flagtype: i18n.t("flagdocument." + t)
                    })
                }), u.find("button.flag").removeClass("spinner").addClass("ok")
            }, function(e) {
                u.find(".feedback").html(i18n.t("flagdocument.feedback_fail", {
                    errormessage: e && e._content && e._content.error && e._content.error.message
                })), u.find("button.flag").removeClass("spinner")
            })
        }
    }

    function r() {
        u.find(".feedback").text(""), u.find("button.flag").prop("disabled", void 0 === a())
    }

    function s(e) {
        e && (e.preventDefault(), e.stopPropagation()), u.find("button.flag").off("click", o), u.find("button.cancel").off("click", s), u.find("input[type=radio]").off("change", r), p.close()
    }

    function l() {
        u.find("button.flag").on("click", o), u.find("button.cancel").on("click", s), u.find("input[type=radio]").on("change", r)
    }
    var c, u, d = n(312),
        p = n(23),
        h = n(7),
        f = n(5),
        m = n(2);
    t.openInOverlay = function(e) {
        c = e;
        var t = p.create({
            skin: "default",
            content: i()
        });
        p.show(t), u = $(t.getParentElement()), l()
    }
}, function(e, t, n) {
    "use strict";

    function i(e) {
        e ? (o.find("button.follow-button").stateIconButton("state", "success"), o.find(".follow-button__subtitle").text(i18n.t("documentpage.followbutton.following"))) : (o.find("button.follow-button").stateIconButton("state", ""), o.find(".follow-button__subtitle").text(i18n.t("documentpage.followbutton.follow")))
    }

    function a(e) {
        e.find("button.follow-button").on("click", function(e) {
            if (e.preventDefault(), p.trackEvent("trickersAction", "follow"), l.isLoggedIn()) {
                var n = $.when(c.toggleSubscription("publisher", r));
                o.find("button.follow-button").stateIconButton("promise", n.promise()), n.done(i).done(function(e) {
                    s.broadcast(t.subscriptionStatusChangedEvent, e)
                })
            } else s.broadcast(s.events.userRequestLogin, {
                authReason: "stack"
            })
        })
    }
    var o, r, s = n(2),
        l = n(4),
        c = n(45),
        u = n(42),
        d = n(6),
        p = u.create(d.tracking.gaIdTrickers);
    t.subscriptionStatusChangedEvent = "documentPageSubscriptionStatusChangedEvent", t.create = function(e, t) {
        var n = $(e);
        return o = void 0 === o ? n : o.add(n), r = t.username, a(n), $.when(c.getSubscription("publisher", r)).done(i)
    }
}, function(e, t) {
    "use strict";
    t.getBestZoomLevelId = function(e, t, n, i) {
        for (var a, o, r, s, l, c = Math.max(e * t, 1), u = n.getZoomLevels(i), d = 0, p = u.length; p > d; d++) s = u[d], l = Math.abs(s.width * s.height / c - 1), (void 0 === a || a > l) && (a = l, o = s, r = d);
        return r
    }, t.getPageConfig = function(e, t, n) {
        return {
            page: t,
            zoomLevel: e.getZoomLevels(t)[n],
            dimensions: {
                marginLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                offsetLeft: 0,
                offsetTop: 0,
                offsetRight: 0,
                offsetBottom: 0,
                blockOffsetLeft: 0,
                blockOffsetTop: 0,
                blockOffsetRight: 0,
                blockOffsetBottom: 0,
                width: 0,
                height: 0
            }
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = n(180);
    t.create = function(e) {
        function t() {
            return !0
        }

        function n() {
            return i({
                title: e.title,
                description: e.description
            })
        }
        return {
            willRender: t,
            getView: n,
            allowCenteredAd: _.constant(!1)
        }
    }
}, , function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            return '<div class="center-block stream2-ad-element__ad-container">\n    <div id="" class="stream2-ad-element__ad"></div>\n    <p class="stream2-ad-element__text">Advertisement</p>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = e.escapeExpression;
            return '<div class="boxset">\n	<div class="dimmer-links">\n        <a class="dimmer-cancel-link" href="#" >' + s(n.t.call(r, "signinWidget.cancel", {
                name: "t",
                hash: {},
                data: a
            })) + '</a>\n        <a class="dimmer-signup-link" href="' + s((o = null != (o = n.createAccountUrl || (null != t ? t.createAccountUrl : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(r, {
                name: "createAccountUrl",
                hash: {},
                data: a
            }) : o)) + '">' + s(n.t.call(r, "signinWidget.createAccount", {
                name: "t",
                hash: {},
                data: a
            })) + '</a>\n    </div>\n\n    <br>\n    <div class="dimmer-issuuicon">\n        <div class="issuu-logo-image"></div>\n    </div>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, i, a, o) {
            var r = e.escapeExpression;
            return '<div class="pagezero-description theme-dark">\n    <h3 class="pagezero-description__title">' + r(e.lambda(null != t ? t.title : t, t)) + '</h3>\n    <p class="pagezero-description__text h3-paragraph">' + r(n(176).call(null != t ? t : {}, {
                name: "description",
                hash: {},
                data: o
            })) + "</p>\n</div>\n"
        },
        useData: !0
    })
}, , , function(e, t, n) {
    function i(e, t) {
        var n = t && t._content && t._content.error ? t._content.error : void 0;
        g.broadcast(g.events.messagehubError, i18n.t(e, {
            errormessage: n && n.message ? n.message : "Undefined error",
            errorcode: n && n.code ? n.code : "0"
        }))
    }

    function a(e) {
        return function(t, n, i) {
            y.addDocsToStacks(t, e, n, i)
        }
    }

    function o() {
        y.loadStacks().progress(function() {
            w.addStacks.apply(void 0, arguments), w.renderStacks()
        }).fail(function(e) {
            i("stackswidget.errorCouldnotloadstack", e)
        })
    }

    function r(e) {
        if (k) {
            v.show(f, "backward");
            var t = $(v.getElement());
            w.renderInto(t), setTimeout(function() {
                t.find(".js-stacklist").scrollLeft(t.find(".js-stacklist").get(0).scrollWidth)
            }, 0)
        }
        e && (e.select(), w.addStacks([e.getRawData()])), w.renderStacks()
    }

    function s() {
        b.create({
            onFinished: r,
            overlaySkin: k ? "stacks" : void 0,
            partOfOverlaySeries: k
        })
    }

    function l() {
        k && v.close(), h && h(w.getSelectedStacks())
    }

    function c() {
        var e = w.getSelectedStacks();
        e.length < 1 || m(e, l, function(e) {
            i("stackswidget.errorCouldnotadddoctostack", e)
        })
    }

    function u() {
        g.unsubscribe("CREATE STACK", s), g.unsubscribe("ADD DOCUMENTS", c), g.unsubscribe("DOCUMENTS ADDED", l), g.subscribe("CREATE STACK", s), g.subscribe("ADD DOCUMENTS", c), g.subscribe("DOCUMENTS ADDED", l)
    }

    function d() {
        return k = !0, f = v.create({
            skin: "stacks",
            showCloseIcon: !1,
            unscrollableBackground: !0
        }), v.show(f), $(v.getElement())
    }

    function p(e, t, n) {
        var i = t;
        _.isFunction(t) || (i = a(t)), h = n, m = i, w.create(), w.renderInto(e), u(), o()
    }
    var h, f, m, g = n(2),
        v = n(23),
        b = n(51),
        w = n(340),
        y = n(339),
        k = !1;
    t.openInOverlay = function(e, t) {
        var n = d();
        p(n, e, t)
    }, t.renderInto = function(e, t, n) {
        p(e, t, n)
    }
}, function(e, t, n) {
    function i(e) {
        var t = new $.Deferred;
        if (!r.isLoggedIn()) return t.resolve(!1), t;
        var n = {};
        return n[l.apiParam] = e, o.create({
            action: l.apiActionDislike,
            cache: !1,
            type: "POST"
        }).parameters(n).call().then(function(e) {
            l.liked = !1, t.resolve(l.liked, e.document.likes)
        }, function() {
            t.resolve(!0)
        }), t
    }

    function a(e) {
        var t = new $.Deferred;
        if (!r.isLoggedIn()) return t.resolve(!1), t;
        var n = {};
        return n[l.apiParam] = e, o.create({
            action: l.apiActionLike,
            cache: !1,
            type: "POST"
        }).parameters(n).call().then(function(e) {
            l.liked = !0, t.resolve(l.liked, e.document.likes)
        }, function() {
            t.resolve(!1)
        }), t
    }
    var o = n(7),
        r = n(4),
        s = n(2),
        l = {
            apiParam: "documentId",
            apiActionGet: "issuu.document.get_like",
            apiActionLike: "issuu.document.like",
            apiActionDislike: "issuu.document.dislike"
        };
    t.getLikeOfPublication = function(e, t) {
        var n = new $.Deferred;
        if (!r.isLoggedIn()) return n.resolve(!1), n.promise();
        if (t !== !0 && void 0 !== l.liked) return n.resolve(l.liked), n.promise();
        var i = {};
        i[l.apiParam] = e;
        var a = o.create({
            action: l.apiActionGet,
            isReadOnly: !0
        }).parameters(i);
        return t === !0 && a.deleteCache(), a.call().then(function(e) {
            l.liked = e.documentRating.liked === !0, n.resolve(l.liked)
        }, function() {
            n.resolve(!1)
        }), n.promise()
    }, t.toggleLike = function(e, t) {
        "boolean" == typeof t && (l.liked = !t);
        var n;
        return r.isLoggedIn() ? (n = l.liked === !0 ? i(e) : a(e), n.notify(!l.liked)) : (n = new $.Deferred, s.broadcast(s.events.userRequestLogin, {
            authReason: "like",
            onLoginSuccess: function() {
                a(e).done(function(e, t) {
                    n.resolve(e, t)
                })
            }
        })), n.promise()
    }
}, function(e, t, n) {
    function i(e) {
        var t = {
            subject: "I found this on Issuu.com",
            text: "Check this out:\n\n",
            url: ""
        };
        _.extend(t, e);
        var n = "mailto:your@friend.com?subject=" + encodeURIComponent(t.subject) + "&body=" + encodeURIComponent(t.text + t.url);
        setTimeout(function() {
            window.location = n
        }, 500)
    }

    function a(e, t) {
        var n = r.publicationUrl(e.owner, e.name, e.pageNumber);
        t && (n += "?e=" + t), i({
            subject: "I found this great publication on Issuu.com",
            text: "Check this out:\n\n",
            url: n
        }), s.broadcast(s.events.documentShare, {
            publicationId: e.publicationId,
            revisionId: e.revisionId,
            publicationName: e.name,
            ownerUsername: e.owner,
            service: l
        })
    }

    function o(e, t) {
        var n = r.clippingUrl(e.owner, e.name, e.clippingId);
        t && (n += "?e=" + t), i({
            subject: "I found this great clip in a publication on Issuu.com",
            text: (e.title || "") + " #ClippedOnIssuu \n" + n + " \n\nIssuu Clip lets you share and comment on any part of a publication that inspires you.",
            url: ""
        }), s.broadcast(s.events.clippingShare, {
            clippingId: e.clippingId,
            clippingPage: e.clippingPage,
            service: l
        })
    }
    var r = n(5),
        s = n(2),
        l = "email";
    e.exports.sharePost = i, e.exports.sharePublication = a, e.exports.shareClipping = o
}, function(e, t, n) {
    function i(e) {
        var t = {
            title: "",
            description: "",
            url: "",
            photoUrl: ""
        };
        _.extend(t, e);
        var n = 550,
            i = 420,
            a = (screen.width - n) / 2,
            o = (screen.height - i) / 2,
            r = "width=" + n + ",height=" + i + ",left=" + a + ",top=" + o,
            s = "http://www.tumblr.com/share/video?embed=" + encodeURIComponent(t.url) + "&caption=" + encodeURIComponent("<strong>" + t.title + "</strong> <br /> ") + (t.description && t.description !== t.title ? encodeURIComponent(t.description) : "") + "&source=" + encodeURIComponent(t.url);
        t.tags && (s += "&tags=" + encodeURIComponent(t.tags)), window.open(s, "_blank", r)
    }

    function a(e, t) {
        var n = r.publicationUrl(e.owner, e.name, e.pageNumber),
            a = r.pageFullUrl(e.publicationId, e.revisionId, e.pageNumber);
        t && (n += "?e=" + t), i({
            url: n,
            photoUrl: a,
            title: e.title,
            description: e.description,
            tags: "issuu"
        }), s.broadcast(s.events.documentShare, {
            publicationId: e.publicationId,
            revisionId: e.revisionId,
            publicationName: e.name,
            ownerUsername: e.owner,
            service: l
        })
    }

    function o(e, t) {
        var n = r.clippingUrl(e.owner, e.name, e.clippingId),
            a = r.clippingThumbUrl(e.clippingId);
        t && (n += "?e=" + t), i({
            url: n,
            photoUrl: a,
            title: "#ClippedOnIssuu from " + e.title,
            description: e.description,
            tags: "ClippedOnIssuu"
        }), s.broadcast(s.events.clippingShare, {
            clippingId: e.clippingId,
            clippingPage: e.clippingPage,
            service: l
        })
    }
    var r = n(5),
        s = n(2),
        l = "tumblr";
    t.sharePost = i, t.sharePublication = a, t.shareClipping = o
}, function(e, t, n) {
    function i(e) {
        var t = {
            text: "",
            url: "",
            originalReferer: "http://issuu.com"
        };
        _.extend(t, e);
        var n = 550,
            i = 420,
            a = (screen.width - n) / 2,
            o = (screen.height - i) / 2,
            r = "width=" + n + ",height=" + i + ",left=" + a + ",top=" + o,
            s = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(t.text) + "&url=" + encodeURIComponent(t.url) + "&via=Issuu&related=Issuu&original_referer=" + encodeURIComponent(t.originalReferer);
        t.tags && (s += "&hashtags=" + encodeURIComponent(t.tags)), window.open(s, "_blank", r)
    }

    function a(e, t) {
        var n = r.publicationUrl(e.owner, e.name, e.pageNumber);
        t && (n += "?e=" + t), i({
            url: n,
            text: e.title
        }), s.broadcast(s.events.documentShare, {
            publicationId: e.publicationId,
            revisionId: e.revisionId,
            publicationName: e.name,
            ownerUsername: e.owner,
            service: l
        })
    }

    function o(e, t) {
        var n = r.clippingUrl(e.owner, e.name, e.clippingId);
        t && (n += "?e=" + t), i({
            url: n,
            text: e.title,
            tags: "ClippedOnIssuu"
        }), s.broadcast(s.events.clippingShare, {
            clippingId: e.clippingId,
            clippingPage: e.clippingPage,
            service: l
        })
    }
    var r = n(5),
        s = n(2),
        l = "twitter";
    t.sharePost = i, t.sharePublication = a, t.shareClipping = o
}, function(e, t) {
    t.getTranslation = function(e) {
        function t(e, t, n) {
            var i;
            i = "function" != typeof n ? function(e) {
                return e
            } : n, a[e] = function(e) {
                return {
                    target: t,
                    value: i(e)
                }
            }
        }

        function n(e) {
            return !!e
        }

        function i(e) {
            var t = {};
            return _.each(e, function(e, n) {
                if ("function" == typeof a[n]) {
                    var i = a[n](e);
                    t[i.target] = i.value
                }
            }), t
        }
        var a = {};
        return t("id", "documentId"), t("du", "ownerUsername", function(e) {
            return e.toLowerCase()
        }), t("cu", "creatorUsername", function(e) {
            return e.toLowerCase()
        }), t("dn", "documentName"), t("pg", "pageNumber"), t("st", "titleBarEnabled", n), t("sa", "proSidebarEnabled", n), t("bc", "embedBackground"), t("bi", "backgroundImage"), t("fc", "backgroundColor"), t("ss", "shareMenuEnabled", n), t("pr", "downloadButtonEnabled", n), t("sh", "shareButtonEnabled", n), t("se", "searchButtonEnabled", n), t("sc", "clippingEnabled", n), t("sl", "showHtmlLink", n), t("af", "autoFlip", n), t("vm", "viewMode", function(e) {
            return "s" === e ? "singlePage" : "doublePage"
        }), t("lg", "logo"), t("th", "theme"), t("lo", "layout"), t("lt", "linkTarget", function(e) {
            return "n" === e ? "_blank" : "_self"
        }), a.bp = function(e) {
            switch (e) {
                case "s":
                    return {
                        target: "backgroundStretch",
                        value: !0
                    };
                case "t":
                    return {
                        target: "backgroundTile",
                        value: !0
                    };
                default:
                    return {
                        target: "backgroundTile",
                        value: !1
                    }
            }
        }, i(e || {})
    }
}, function(e, t, n) {
    var i = n(1),
        a = n(5),
        o = n(2),
        r = n(187),
        s = n(27),
        l = n(185),
        c = n(113),
        u = n(186),
        d = n(114),
        p = n(344);
    t.create = function(e, t) {
        function h(e) {
            if (e) {
                var t = [];
                switch (x.type) {
                    case "document":
                        t = ["publicationId", "revisionId", "name", "owner", "title"];
                        break;
                    case "clipping":
                        t = ["clippingId", "name", "owner", "title"];
                        break;
                    default:
                        i.error(new Error('share widget: share type was not defined, should be "document" or "clipping"'))
                }
                _.each(t, function(t) {
                    if (_.isUndefined(e[t])) {
                        var n = 'share widget: field "' + t + '" was not found in shareObject: ' + JSON.stringify(e, null, 2);
                        i.error(new Error(n))
                    }
                })
            } else i.error(new Error("share widget: shareObject was undefined"))
        }

        function f(e, t) {
            y || o.broadcast(e, t), y = !0
        }

        function m() {
            function e() {
                f(n, i)
            }
            var t, n, i, r = "function" == typeof x.getFreshShareObject ? x.getFreshShareObject() : x.shareObject,
                s = w.find(".js-link");
            switch (x.type) {
                case "document":
                    t = a.publicationUrl(r.owner, r.name, r.pageNumber), n = o.events.documentShare, i = {
                        publicationId: r.publicationId,
                        revisionId: r.revisionId,
                        publicationName: r.name,
                        ownerUsername: r.owner,
                        service: "directlink"
                    };
                    break;
                case "clipping":
                    t = a.clippingUrl(r.owner, r.name, r.clippingId), n = o.events.clippingShare, i = {
                        clippingId: r.clippingId,
                        clippingPage: r.clippingPage,
                        service: "directlink"
                    }
            }
            x.embedId && (t += "?e=" + x.embedId), s.off("focus", e).one("focus", e), s.val(t)
        }

        function g() {
            w.append(n(286)({
                includeLinkField: x.includeLinkField,
                includeMoreLessToggle: x.includeMoreLessToggle,
                includeSocialIconsColors: x.includeSocialIconsColors
            })), x.includeLinkField && m()
        }

        function v(e) {
            var t = "function" == typeof x.getFreshShareObject ? x.getFreshShareObject() : x.shareObject;
            switch (h(t), x.type) {
                case "document":
                    e.sharePublication(t, x.embedId);
                    break;
                case "clipping":
                    e.shareClipping(t, x.embedId)
            }
        }

        function b() {
            w.find(".js-shareservices a.js-service").on("click", function(e) {
                e.preventDefault(), e.stopPropagation();
                var t, n = $(e.currentTarget);
                n.hasClass("js-facebook") ? t = s : n.hasClass("js-twitter") ? t = r : n.hasClass("js-google") ? t = c : n.hasClass("js-email") ? t = l : n.hasClass("js-tumblr") ? t = u : n.hasClass("js-linkedin") ? t = d : n.hasClass("js-pinterest") && (t = p), t && v(t)
            });
            var e = w.find(".js-moreless");
            e.on("click", function(t) {
                w.find(".js-expandable").toggleClass("hidden"), k = !k, e.text(k ? i18n.t("sharer.toggleLess") : i18n.t("sharer.toggleMore"))
            });
            var t = w.find(".js-link");
            t.on("focus", function(e) {
                setTimeout(function() {
                    t.get(0).setSelectionRange(0, t.val().length)
                }, 100)
            }), t.on("input onchange blur", function(e) {
                m()
            })
        }
        var w = e,
            y = !1,
            k = !0,
            x = _.defaults(t, {
                type: "document",
                getFreshShareObject: void 0,
                shareObject: {},
                embedId: void 0,
                includeLinkField: !1,
                includeMoreLessToggle: !0,
                includeSocialIconsColors: !1
            });
        return "function" != typeof x.getFreshShareObject && h(x.shareObject),
            function() {
                "undefined" == typeof t.shareObject && "undefined" == typeof t.getFreshShareObject && i.error(new Error("widgets/sharer: You must provide a share object or a function to get a share object.")), g(), b(), w.find(".js-moreless").click()
            }(), {
                updateLinkField: m
            }
    }
}, function(e, t, n) {
    "use strict";

    function i() {
        return "div_stream_ads_element_" + o++
    }
    var a = n(50),
        o = 0;
    e.exports = {
        cols: 2,
        allowReuse: !1,
        distance: window.screen.height,
        _createAd: function(e) {
            return a.create({
                adType: e,
                allowed: !0
            })
        },
        getHeight: function(e, t) {
            var n = this._createAd(e.type);
            return n.willShow() ? 300 : 0
        },
        init: function(e, t) {
            e.className += " stream2-ad-element"
        },
        update: function(e, t, n, a, o) {
            var r = $(e),
                s = this._createAd(t.type);
            t.adId || (t.adId = i()), r.find(".stream2-ad-element__ad").attr("id", t.adId), t.isRegistered || (t.isRegistered = !0, s.willShow() && setTimeout(function() {
                s.show(t.adId)
            }, 0))
        }
    }
}, function(e, t) {
    function n() {
        return window.innerHeight
    }

    function i(e) {
        return e.getBoundingClientRect().top - document.body.getBoundingClientRect().top
    }

    function a() {
        return (window.pageYOffset || document.scrollTop) - (document.clientTop || 0) || 0
    }

    function o(e) {
        var t = (window.pageXOffset || document.scrollLeft) - (document.clientLeft || 0) || 0;
        window.scrollTo(t, e)
    }

    function r(e) {
        e.style.display = "none"
    }

    function s(e, t) {
        e.style.width = t.width + "px", e.style.height = t.height + "px", e.style.top = t.top + "px", e.style.left = t.left + "px", e.style.display = "block"
    }

    function l(e, t, n) {
        var i = document.createElement("div");
        return t.initElement(i, n), r(i), i
    }

    function c(e) {
        return {
            _container: e
        }
    }

    function u(e, t, n, i, a) {
        for (var o, c, u = 0; u < e.items.length; u++) o = e.items[u], t[o.kind] || (t[o.kind] = []), c = t[o.kind], o.top + o.height >= i && o.top < a ? o.element ? e.resized && s(o.element, o) : (c.length || c.push(l(t._container, n, o.kind)), o.element = c.pop(), n.updateElement(o.element, o.index, o.width, o.height), o.element.parentNode || t._container.appendChild(o.element), s(o.element, o)) : o.element && (!n.allowReuse || n.allowReuse(o.kind) ? (r(o.element), c.push(o.element), o.element = null) : e.resized && s(o.element, o));
        e.resized = !1
    }

    function d(e, t) {
        for (var n = e.items.length - 1; n >= 0; n--) {
            var i = e.items[n];
            i.element && (r(i.element), t[i.kind].push(i.element), i.element = null)
        }
    }
    e.exports = {
        getPositionOnPage: i,
        getViewportHeight: n,
        getScrollPosition: a,
        scrollTo: o,
        createElementPool: c,
        renderLayout: u,
        returnAllElementsToPool: d,
        setText: void 0 !== document.getElementsByTagName("body")[0].innerText ? function(e, t) {
            e.innerText = t
        } : function(e, t) {
            e.textContent = t
        },
        requestAnimationFrame: function() {
            var e;
            return e = window.requestAnimationFrame && window.cancelAnimationFrame ? function(e, t) {
                return t && window.cancelAnimationFrame(t), window.requestAnimationFrame(e)
            } : function(e, t) {
                return t && window.clearTimeout(t), window.setTimeout(e, 1e3 / 60)
            }
        }()
    }
}, function(e, t, n) {
    function i(e) {
        return "object" == typeof e && e.allowed === !0
    }

    function a() {
        var e = /(googlebot\/|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)/i;
        return e.test(window.navigator.userAgent)
    }

    function o(e) {
        return "object" == typeof e && u.size(e) > 0
    }

    function r(e, t) {
        return e ? e && e + t < (new Date).getTime() : !0
    }

    function s(e, t) {
        return e && e.includedCountries && e.includedCountries.indexOf(t) > -1 || !1
    }

    function l(e) {
        return e && e.audienceRatioFlash && Math.random() < e.audienceRatioFlash || !1
    }

    function c(e) {
        return e && e.audienceRatioHtml && Math.random() < e.audienceRatioHtml || !1
    }
    var u = n(14);
    e.exports = {
        isAllowedExternally: i,
        isBot: a,
        hasAdsConfig: o,
        isOutsideFrequencyCap: r,
        isIncludedCountry: s,
        isInFlashAudience: l,
        isInHtmlAudience: c
    }
}, function(e, t, n) {
    function i() {
        var e = new $.Deferred,
            t = l.create({
                marginClickClose: !1,
                showCloseIcon: !1,
                content: n(290)(),
                onShow: function() {
                    var n = $(t.getParentElement());
                    n.find(".js-retry").on("click", function() {
                        FB.login(function(t) {
                            e.resolve(t)
                        }, {
                            scope: o.permissions.join(","),
                            auth_type: "rerequest"
                        }), l.close()
                    }), n.find(".js-cancel").on("click", function() {
                        s.log("Facebook", "Not all necessary permissions were granted for FB login after education."), l.close(), e.resolve({})
                    })
                },
                skin: "default"
            });
        return l.show(t), e.promise()
    }

    function a(e, t) {
        var n = new $.Deferred;
        return r.isLoggedIn() !== !0 ? o.loadSdk().then(function() {
            FB.login(function(a) {
                "connected" === a.status ? o.checkForRequiredPermissions().then(function() {
                    o.onAuthChanged(a, n, e === !0, t !== !1)
                }, function(a) {
                    s.log("Facebook", "Not all necessary permissions were granted for FB login, educating. Granted permissions where " + JSON.stringify(a)), i().then(function(i) {
                        s.log("Facebook", "Asked for permissions again, FB response was " + JSON.stringify(i)), o.onAuthChanged(i, n, e === !0, t !== !1)
                    })
                }) : n.reject("User is not connected.")
            }, {
                scope: o.permissions.join(",")
            })
        }, n.reject) : n.resolve(), n.promise()
    }
    var o = n(27),
        r = n(4),
        s = n(1),
        l = n(23);
    e.exports.loginWithDialog = function() {
        return a(!1)
    }, e.exports.signupWithDialog = function() {
        return a(!0)
    }, e.exports.authorizeWithDialog = function() {
        return a(!1, !1)
    }
}, , , , , , , , , , , , function(e, t, n) {
    "use strict";
    var i = n(2),
        a = n(12).get("documentData"),
        o = n(346).isInIframe,
        r = n(119),
        s = n(122),
        l = n(84),
        c = n(156),
        u = n(209),
        d = n(210);
    a.isCrawler || (l.init({
        notificationBarOverHeader: !1
    }), c.init({}));
    var p = {
        facebookAutoLogin: !1,
        autoTrackPageView: !0,
        redirectOnLogout: !1,
        notifications: {
            friendly: a.paidExternalDocPage !== !0,
            alwaysSmallFriendly: a.paidExternalDocPage !== !0
        }
    };
    r.init(p).ready(function() {
        s.init(), o() && i.broadcast(i.events.monitorEvent, {
            type: "UNSUPPORTED_IFRAME_EMBED",
            href: document.location.href.toString()
        }), a.paidExternalDocPage ? u.create().onReady() : d.create().onReady()
    })
}, function(e, t, n) {
    "use strict";
    var i = n(7),
        a = n(4),
        o = n(6),
        r = n(188),
        s = n(170).Model;
    t.loadDocumentInfo = function(e) {
        if (!e) throw new Error("documentData not defined by server.");
        return i.create({
            action: "issuu.document.get_user_doc",
            isReadOnly: !0
        }).parameters({
            documentUsername: e.ownerUsername,
            name: e.docname,
            verifystate: !1
        }).call().then(function(e) {
            return e.document.revisionId || (e.document.revisionId = e.document.documentId.split("-")[0]), e.document.publicationId || (e.document.publicationId = e.document.documentId.split("-")[1]), e.document
        })
    }, t.loadUserInfo = function(e) {
        return i.create({
            action: "issuu.user.get_anonymous",
            isReadOnly: !0
        }).parameters({
            profileUsername: e
        }).call().then(function(e) {
            return e.user
        })
    }, t.getServices = function(e) {
        var t = $.Deferred();
        return i.create({
            path: "/call/licensing/application/get/1/1/publication/" + e
        }).call().then(t.resolve, function() {
            t.resolve(["all"])
        }), t.promise()
    }, t.getEmbedIdData = function(e) {
        var t = $.Deferred();
        return new RegExp(/^[0-9]+(\/)[0-9]+$/).test(e) ? $.jsonp({
            url: o.urlBase("embed") + "/" + e + ".jsonp",
            callback: "cb_" + e.split("/")[1]
        }).then(function(e) {
            t.resolve(r.getTranslation(e))
        }, function() {
            t.resolve({})
        }) : t.resolve({}), t.promise()
    }, t.getClippingById = function(e) {
        var t = $.Deferred(),
            n = new s({
                id: e
            });
        return n.fetch().then(function(e) {
            t.resolve(e)
        }, function() {
            t.resolve()
        }), t.promise()
    }, t.loadReaderDocCount = function() {
        var e = $.Deferred();
        if (a.isLoggedIn()) {
            var t = i.create({
                action: "issuu.documents.list",
                isReadOnly: !0
            }).parameters({
                pageSize: 0,
                countAll: !0,
                documentUsername: a.getUsername()
            }).call();
            $.when(t).then(function(t) {
                e.resolve(t.result.totalCount)
            }, function() {
                e.resolve(0)
            })
        } else e.resolve(0);
        return e.promise()
    }
}, function(e, t, n) {
    "use strict";

    function i(e) {
        p = e, e ? a() : o()
    }

    function a() {
        l && (c ? ($("#content").show(), l.onShowAnimStart(), window.setTimeout(function() {
            u.translate3d("#content", {
                y: Math.round(-1 * window.innerHeight * .3),
                duration: 350,
                callback: function() {
                    p && l.showAll()
                }
            })
        }, 0)) : ($("#content").show(), l.showAll()))
    }

    function o() {
        l && (c ? (l.onHideAnimStart(), $("html,body").animate({
            scrollTop: 0
        }, 200), window.setTimeout(function() {
            u.translate3d("#content", {
                y: 0,
                duration: 200,
                callback: function() {
                    p || ($("#content").hide(), l.hideAll())
                }
            })
        }, 0)) : ($("#content").hide(), l.hideAll()))
    }

    function r() {
        l && (c ? (l.hideAll(), i(!1), $("#content").css({
            "min-height": window.innerHeight
        })) : a(), l.start())
    }

    function s(e, t) {
        c = t, (c || e.isCrawler) && (e.initialPageSize = 16), l = d.create(".js-stream", e), l.preload()
    }
    var l, c, u = (n(1), n(18)),
        d = n(283),
        p = !1;
    e.exports = {
        init: s,
        onReaderLoaded: r,
        show: a,
        hide: o,
        resizeStream: function() {
            return l ? l.resize() : void 0
        },
        onUiStateChange: i
    }
}, function(e, t, n) {
    "use strict";

    function i(e, t) {
        t = t || {}, t.isHandledExternally = !1, u.log("FlashEvents", e, t);
        var n = p[e];
        return _.isUndefined(n) || s.broadcast(n, t), t.isHandledExternally
    }

    function a() {
        function e(e) {
            try {
                r.get(0).authStateChanged(e)
            } catch (t) {}
        }
        s.broadcast(l.readerDocumentLoaded), window.flashReaderChangeHandler = o, window.addEventListener && r.get(0).addEventListener("change", "flashReaderChangeHandler"), window.issuuFlashLoginRequest = function() {
            "" === c.getUsername() ? s.broadcast(l.userRequestLogin, {
                authReason: "flash"
            }) : e(c.getUsername())
        }, s.subscribe(l.userAuthStatusChanged, function(t) {
            e(c.getUsername())
        }), s.subscribe(l.readerSidebarDocumentClicked, function(e) {
            var t = _.last(e.documentId.split("-"));
            if (t) {
                var n = "tracking." + t + ".",
                    i = d.create(n, d.TYPES.LOCAL, {
                        expires: 2
                    });
                i.removeExpiredKeys(), i.set("stream-origin", e.origin), i.set("stream-ranking", e.ranking), e.isHandledExternally = !0
            }
        })
    }

    function o(e) {
        s.broadcast(l.documentPageChange, {
            pageNumbers: r.get(0).getPageNumbers()
        })
    }
    var r, s = n(2),
        l = s.events,
        c = n(4),
        u = n(1),
        d = n(10),
        p = {
            loadingFail: l.readerDocumentFailed,
            loadingProgress: l.readerDocumentLoading,
            activateEmbed: l.documentEmbedActivate,
            activateDownload: l.documentDownloadActivate,
            shouldActivateClippingsTutorialAnonymous: l.shouldActivateClippingsTutorialAnonymous,
            clippingsTutorialDismissedAnonymous: l.clippingsTutorialDismissedAnonymous,
            ReaderEventZoomedgIn: l.readerZoomedgIn,
            ReaderEventZoomedgOut: l.readerZoomedgOut,
            clippingsActionClicked: l.flashReaderClippingAction,
            clippingsCreatePageOpenClicked: l.flashReaderClippingCreateClick,
            sizeAnimationEnd: l.flashReaderSizeAnimationEnd,
            pageZeroResized: l.readerPageZeroResized,
            sidebarDocumentClicked: l.readerSidebarDocumentClicked
        };
    t.create = function(e, t) {
        r = $(e), "string" == typeof t.jsAPIInitCallback && (window[t.jsAPIInitCallback] = a), "string" == typeof t.jsInternalCallback && (window[t.jsInternalCallback] = i)
    }
}, function(e, t, n) {
    "use strict";
    var i = (n(1), n(5), n(37)),
        a = n(79);
    t.create = function() {
        var e = n(165).create(),
            t = !0;
        return e.onDataLoaded = function(n) {
            var o = e.metaObj.embedData.proSidebarEnabled === !0,
                r = i.hasBrandpackage(n.services);
            t = e.metaObj.embedData.proSidebarEnabled = o && r, e.readerFullHeight = !t, e._super.onDataLoaded(n), a.init({
                username: n.doc.username,
                publicationName: n.doc.name,
                publicationId: n.doc.publicationId,
                revisionId: n.doc.revisionId,
                isEmbed: n.embed ? !0 : !1,
                publicationDownload: n.doc.downloadable,
                services: n.services
            })
        }, e.initContent = function() {
            t && e._super.initContent()
        }, e
    }
}, function(e, t, n) {
    "use strict";
    var i = (n(1), n(2)),
        a = n(43);
    t.create = function() {
        function e() {
            switch (new Uri(window.location).anchor()) {
                case "download":
                    i.broadcast(i.events.documentDownloadActivate);
                    break;
                case "embed":
                    i.broadcast(i.events.documentEmbedActivate);
                    break;
                case "share":
                    i.broadcast(i.events.documentMenuActivate, "share");
                    break;
                case "stack":
                    i.broadcast(i.events.documentMenuActivate, "addto");
                    break;
                default:
                    i.broadcast(i.events.documentMenuActivate, "metadata")
            }
        }
        var t, o = n(165).create();
        if (o.readerSkin = "flypaper", o.reader.isFlashReader()) {
            var r = function() {
                var e = $(".gutter-ad").get(0).getBoundingClientRect().width,
                    t = $("#docmenu").offset().left,
                    n = $(window).width() - (t + $("#docmenu").outerWidth());
                o.reader.updateAnchors(0, Math.min(e, n), t - e, n)
            };
            a({
                delay: 50,
                onFire: r
            })
        }
        return o.onReaderLoaded = function() {
            o._super.onReaderLoaded(), e(), t && t.clippingData && t.clippingData.isPublisherClipping === !1 && i.broadcast(i.events.showUserClippings, {
                dontTrack: !0
            }), r && r(), o.reader.isFlashReader() && $("#reader-container").addClass("toolbar-shadow")
        }, o.onDataLoaded = function(e) {
            t = e, n(236).create(t.doc, function() {
                o._super.onDataLoaded(t), o.reader.isFlashReader() ? ($("header").show().css("visibility", "visible"), window.scrollTo(0, $("header").outerHeight(!0)), n(228).create("#docactions", t), n(229).create($("#docmenu"), t)) : $("#docmenu, #docactions").remove(), n(79).init({
                    username: t.doc.username,
                    publicationName: t.doc.name,
                    publicationId: t.doc.publicationId,
                    revisionId: t.doc.revisionId,
                    isEmbed: t.embed ? !0 : !1,
                    publicationDownload: t.doc.downloadable,
                    services: t.services
                }), n(280)(t.doc)
            })
        }, o
    }
}, function(e, t, n) {
    "use strict";

    function i(e) {
        e = e || {};
        var t = 1 !== r.get("tutorial.dismissed");
        e.isHandledExternally = !t
    }

    function a() {
        r.set("tutorial.dismissed", 1)
    }
    var o = n(10),
        r = o.create("SocialClippings.", o.LOCAL),
        s = n(2);
    n(4);
    t.create = function() {
        s.subscribe(s.events.shouldActivateClippingsTutorialAnonymous, i), s.subscribe(s.events.clippingsTutorialDismissedAnonymous, a)
    }
}, , , function(e, t, n) {
    "use strict";
    var i = n(167);
    e.exports = Backbone.Collection.extend({
        model: i,
        parse: function(e) {
            var t = [];
            return _.each(e, function(e, n) {
                _.each(e.clippings, function(e) {
                    (!this.linksOnly || _.isObject(e.action)) && t.push(e)
                }, this)
            }, this), t
        },
        url: function() {
            return "/call/clippingsv2/clip/findByPublication/" + this.publicationId + "/" + this.revisionId + "/1/to/500"
        },
        initialize: function(e, t) {
            this.publicationId = t.publicationId, this.revisionId = t.revisionId, this.linksOnly = t.linksOnly, this.fetch()
        }
    })
}, function(e, t, n) {
    "use strict";
    var i = n(24),
        a = n(168);
    e.exports = Backbone.Collection.extend({
        model: a,
        url: function() {
            return "/call/clippingsv2/clip/" + this.clippingId + "/comments"
        },
        parse: function(e) {
            return e._content
        },
        comparator: function(e) {
            return -1 * i(e.get("created")).unix()
        },
        initialize: function(e, t) {
            this.clipping = t.clipping, this.clippingId = this.clipping.get("id")
        }
    })
}, function(e, t, n) {
    "use strict";
    var i = n(217),
        a = n(214);
    e.exports = Backbone.View.extend({
        initialize: function(e) {
            this.metaObj = e.metaObj, this.parent = e.parent, this.linksOnly = e.linksOnly, this.collection = new a([], {
                publicationId: this.metaObj.publicationId,
                revisionId: this.metaObj.revisionId,
                linksOnly: e.linksOnly
            }), this.modelsOnPage = [], this.views = [], this.isUserClippingsActive = !1, this.commentsAllowed = this.parent.commentsAllowed, this.listenToOnce(this.collection, "sync", function() {
                this._calculateModelsOnPage(), this.renderInfo && this.render()
            }), this.listenTo(this.collection, "add remove reset", this._calculateModelsOnPage)
        },
        _calculateModelsOnPage: function() {
            this.modelsOnPage = this.collection.models.filter(function(e) {
                return this.renderInfo.pagenumbers.indexOf(e.get("pageNumber")) > -1
            }, this)
        },
        getClippingCountOnPages: function(e) {
            var t = {
                userClippingCount: 0,
                publisherClippingCount: 0
            };
            return this.collection.models.forEach(function(n) {
                e.indexOf(n.get("pageNumber")) > -1 && (n.get("isPublisherClipping") ? t.publisherClippingCount++ : t.userClippingCount++)
            }, this), t
        },
        setRenderInfo: function(e) {
            this.renderInfo = e, this._calculateModelsOnPage()
        },
        render: function() {
            this.remove();
            var e = _.clone(this.modelsOnPage);
            this.isUserClippingsActive === !1 && (e = _.filter(e, function(e) {
                return e.get("isPublisherClipping") === !0
            })), this.views = _.map(e, function(e) {
                var t = new i({
                    model: e,
                    root: this.$el,
                    parent: this
                });
                this.listenTo(t, "openOverlay", _.bind(this.parent.openOverlay, this.parent)), this.listenTo(t, "openVideoOverlay", _.bind(this.parent.openVideoOverlay, this.parent));
                var n = this.renderInfo.dimensions[this.renderInfo.pagenumbers.indexOf(e.get("pageNumber"))];
                return t.render(n, this.isUserClippingsActive), t
            }, this)
        },
        remove: function() {
            _.each(this.views, function(e) {
                this.stopListening(e), e.remove()
            }, this), this.views = []
        },
        setUserClippingsVisibility: function(e) {
            this.isUserClippingsActive = e, this.render()
        }
    })
}, function(e, t, n) {
    "use strict";
    var i = n(169),
        a = n(218);
    e.exports = Backbone.View.extend({
        initialize: function(e) {
            this.root = e.root, this.parent = e.parent, this.areaView = new a({
                model: this.model,
                parent: this,
                root: this.root
            }), this.metaView = new i({
                model: this.model,
                parent: this,
                root: this.root
            }), this.listenTo(this.metaView, "openOverlay", function() {
                this.trigger("openOverlay", this.model)
            }.bind(this)), this.listenTo(this.parent, "metaelement:shown", function(e) {
                this.clickToActivate && e.get("id") !== this.model.get("id") && this.metaView.hide()
            })
        },
        render: function(e, t) {
            return this.model.set("absoluteX", Math.round(this.model.get("x") * e.width + e.x)), this.model.set("absoluteY", Math.round(this.model.get("y") * e.height + e.y)), this.model.set("absoluteWidth", Math.round(this.model.get("width") * e.width)), this.model.set("absoluteHeight", Math.round(this.model.get("height") * e.height)), this.clickToActivate = !this.model.get("isInternalNavigation") && (!t || this.model.isSmallClipping()), this.areaView.render(), this.metaView.render(e), this.clickToActivate || this.metaView.show(), this
        },
        remove: function() {
            return this.areaView.$el.off("on"), this.areaView.remove(), this.metaView.remove(), this.stopListening(), this.$el.remove(), this
        }
    })
}, function(e, t, n) {
    "use strict";
    e.exports = Backbone.View.extend({
        template: n(295),
        events: {
            click: "onClippingClick"
        },
        initialize: function(e) {
            this.parent = e.parent, this.root = e.root
        },
        render: function() {
            var e = this.model.attributes;
            e.linkUrl = this.model.getLinkUrl(), e.isVideoLink = this.model.isVideoClipping(), e.icon = function() {
                return this.model.getLinkUrl() ? this.model.get("isInternalNavigation") ? null : this.model.isSmallClipping() ? null : void 0 : null
            }.bind(this)(), this.setElement(this.template(e)), this.root.append(this.el), this.hideLink()
        },
        onClippingClick: function(e) {
            this.parent.clickToActivate ? this.model.getLinkUrl() && this.parent.metaView.isVisible() ? this.parent.metaView.openExternalLink.apply(this.parent.metaView, [e]) : (e.stopPropagation(), e.preventDefault(), this.parent.metaView.toggle()) : this.model.getLinkUrl() && this.parent.metaView.openExternalLink.apply(this.parent.metaView, [e])
        },
        showLink: function() {
            this.$(".js-link").show()
        },
        hideLink: function() {
            this.$(".js-link").hide()
        }
    })
}, function(e, t, n) {
    "use strict";

    function i(e) {
        u(), I = window.requestAnimationFrame(e)
    }

    function a() {
        var e = A.find(".button-container"),
            t = e.outerHeight(!0),
            n = e.outerWidth(!0),
            i = 0,
            a = 0;
        e.find(".js-error-message").removeClass("place-at-top"), O.top + O.height + t <= S.maxY ? (i = O.height, e.find(".js-error-message").show(), O.top + O.height + t + e.find(".js-error-message").outerHeight(!0) >= S.maxY && e.find(".js-error-message").addClass("place-at-top"), e.find(".js-error-message").hide()) : O.top - t >= S.minY ? i = -1 * t : (i = O.height - t, e.find(".js-error-message").addClass("place-at-top")), O.left + O.width - S.minX < n && (a = O.left + O.width - S.minX - n), e.css({
            top: i,
            right: a
        })
    }

    function o() {
        A.addClass("changing")
    }

    function r() {
        a(), t.setErrorMessage(""), A.removeClass("changing")
    }

    function s() {
        E.css({
            top: O.top,
            left: O.left
        })
    }

    function l() {
        E.find(".resizablebox").css({
            width: O.width,
            height: O.height
        })
    }

    function c() {
        var e = A.find(".clipping-curtain").get(0),
            t = e.getContext("2d"),
            n = _.clone(O);
        n.left = 2 * n.left, n.top = 2 * n.top, n.height = 2 * n.height, n.width = 2 * n.width, t.fillStyle = "rgba(0, 0, 0, 0.6)", t.clearRect(0, 0, e.width, e.height), t.fillRect(0, 0, e.width, e.height), t.clearRect(n.left, n.top, n.width, n.height);
        var i = 8,
            a = 50;
        t.lineWidth = i, t.strokeStyle = "rgba(255,255,255, 1)", t.lineCap = "round", t.beginPath(), t.moveTo(n.left + i / 2, n.top + a + i / 2), t.lineTo(n.left + i / 2, n.top + i / 2), t.lineTo(n.left + a + i / 2, n.top + i / 2), t.moveTo(n.left + n.width - i / 2, n.top + a + i / 2), t.lineTo(n.left + n.width - i / 2, n.top + i / 2), t.lineTo(n.left + n.width - a - i / 2, n.top + i / 2), t.moveTo(n.left + n.width - i / 2, n.top + n.height - a - i / 2), t.lineTo(n.left + n.width - i / 2, n.top + n.height - i / 2), t.lineTo(n.left + n.width - a - i / 2, n.top + n.height - i / 2), t.moveTo(n.left + i / 2, n.top + n.height - a - i / 2), t.lineTo(n.left + i / 2, n.top + n.height - i / 2), t.lineTo(n.left + a + i / 2, n.top + n.height - i / 2), t.moveTo(n.left + i / 2 + n.width / 2 - a / 2, n.top + i / 2), t.lineTo(n.left + i / 2 + n.width / 2 + a / 2, n.top + i / 2), t.moveTo(n.left + i / 2 + n.width / 2 - a / 2, n.top + n.height - i / 2), t.lineTo(n.left + i / 2 + n.width / 2 + a / 2, n.top + n.height - i / 2), t.moveTo(n.left + i / 2, n.top + i / 2 + n.height / 2 - a / 2), t.lineTo(n.left + i / 2, n.top + i / 2 + n.height / 2 + a / 2), t.moveTo(n.left + n.width - i / 2, n.top + i / 2 + n.height / 2 - a / 2), t.lineTo(n.left + n.width - i / 2, n.top + i / 2 + n.height / 2 + a / 2), t.stroke();
        var o = 60;
        t.lineWidth = 8, t.strokeStyle = "rgba(255,255,255, 1)", t.lineCap = "round", t.beginPath();
        var r = n.left + n.width / 2,
            s = n.top + n.height / 2;
        t.moveTo(r - o / 2, s), t.lineTo(r + o / 2, s), t.moveTo(r, s - o / 2), t.lineTo(r, s + o / 2), t.stroke()
    }

    function u() {
        I && (window.cancelAnimationFrame(I), I = null)
    }

    function d(e, t) {
        switch (e) {
            case "x":
                return t.pageX || t.originalEvent.pageX || t.originalEvent.touches && t.originalEvent.touches[0] && t.originalEvent.touches[0].pageX || 0;
            case "y":
                return t.pageY || t.originalEvent.pageY || t.originalEvent.touches && t.originalEvent.touches[0] && t.originalEvent.touches[0].pageY || 0;
            default:
                return 0
        }
    }

    function p(e) {
        e.which > 1 || (e.stopPropagation(), e.preventDefault(), o(), O.state = 1, O.width = E.find(".resizablebox").width(), O.height = E.find(".resizablebox").height(), O.startPageX = d("x", e), O.startPageY = d("y", e), O.startX = E.position().left, O.startY = E.position().top, $(document).on("mousemove touchmove", C, f))
    }

    function h(e) {
        1 === O.state && (e.stopPropagation(), e.preventDefault(), r()), O.state = 0, $(document).off("mousemove", C, f)
    }

    function f(e) {
        if (1 === O.state) {
            e.stopPropagation(), e.preventDefault();
            var t = {
                x: d("x", e),
                y: d("y", e)
            };
            _.each(P.constraints, function(e, n) {
                var i = !1,
                    a = !1;
                return t.x > 1.1 * e.minX && t.x < .9 * e.maxX && (i = !0), t.y > 1.1 * e.minY && t.y < .9 * e.maxY && (a = !0), i && a ? (_.isEqual(e, S) || v(n), !1) : void 0
            }), O.relX = t.x - O.startPageX, O.relY = t.y - O.startPageY, O.left = Math.min(Math.max(O.startX + O.relX, O.minX), O.maxX - O.width), O.top = Math.min(Math.max(O.startY + O.relY, O.minY), O.maxY - O.height), O.width = Math.min(O.width, O.maxX - O.minX), O.height = Math.min(O.height, O.maxY - O.minY), i(function() {
                s(), l(), c()
            })
        }
    }

    function m(e, t) {
        var n = E.find(".resizablebox"),
            a = E.position(),
            o = Math.floor(a.left + t.position.left),
            r = Math.floor(a.top + t.position.top),
            s = Math.floor(t.size.width + o),
            l = Math.floor(t.size.height + r);
        o < S.minX && (t.position.left = S.minX - a.left, t.size.width = t.originalSize.width - (S.minX - a.left), n.css({
            left: t.position.left,
            width: t.size.width
        })), r < S.minY && (t.position.top = S.minY - a.top, t.size.height = t.originalSize.height - (S.minY - a.top), n.css({
            top: t.position.top,
            height: t.size.height
        })), s > S.maxX && (t.size.width = S.maxX - a.left, n.css({
            width: t.size.width
        })), l > S.maxY && (t.size.height = S.maxY - a.top, n.css({
            height: t.size.height
        }));
        var u = 10,
            d = (S.maxY - S.minY) * T + 1;
        d = Math.max(d, 50), t.size.width / t.size.height > u || t.size.height / t.size.width > u ? t.size.width !== t.originalSize.width ? t.size.width < t.size.height ? E.find(".resizablebox").resizable("option", "minWidth", Math.max(t.size.height / u - 1, d)) : E.find(".resizablebox").resizable("option", "maxWidth", t.size.height * u + 1) : t.size.width > t.size.height ? E.find(".resizablebox").resizable("option", "minHeight", Math.max(t.size.width / u - 1, d)) : E.find(".resizablebox").resizable("option", "maxHeight", t.size.width * u + 1) : (E.find(".resizablebox").resizable("option", "minWidth", d), E.find(".resizablebox").resizable("option", "minHeight", d), E.find(".resizablebox").resizable("option", "maxWidth", null), E.find(".resizablebox").resizable("option", "maxHeight", null)), O.left = a.left + t.position.left, O.top = a.top + t.position.top, O.width = E.find(".resizablebox").width(), O.height = E.find(".resizablebox").height(), i(c)
    }

    function g() {
        var e = (S.maxX - S.minX) / 4,
            t = (S.maxY - S.minY) / 4;
        O.left = (S.maxX - S.minX) / 2 - e / 2 + S.minX, O.top = (S.maxY - S.minY) / 2 - t / 2 + S.minY, O.width = e, O.height = t, A = $(n(298)()), E = A.find(".movablebox"), s(), l(), E.find(".resizablebox").resizable({
            handles: "all",
            start: function() {
                O.state = 0, o()
            },
            stop: function() {
                var e = E.find(".resizablebox").position(),
                    t = E.position();
                O.left = t.left + e.left, O.top = t.top + e.top, E.css({
                    left: O.left,
                    top: O.top
                }), E.find(".resizablebox").css({
                    left: 0,
                    top: 0
                }), r()
            },
            resize: m
        }), C.append(A), i(c)
    }

    function v(e) {
        e = e || 0, S = P.constraints[e], O.minX = S.minX, O.minY = S.minY, O.maxX = S.maxX, O.maxY = S.maxY
    }

    function b(e) {
        var t = {
            constraints: [{
                minX: 0,
                minY: 0,
                maxX: C.width(),
                maxY: C.height()
            }],
            onCreate: _.noop,
            onCancel: _.noop
        };
        P = _.defaults(e, t), v(0)
    }

    function w() {
        $(document).on("mousedown touchstart", ".cliproot .resizablebox", p), $(document).on("mouseup touchend", h), C.on("click", ".js-create-clipping", function(e) {
            e.preventDefault(), e.stopPropagation(), P.onCreate()
        }), C.on("click", ".js-cancel-clipping", function(e) {
            e.preventDefault(), e.stopPropagation(), P.onCancel()
        })
    }

    function y() {
        $(document).off("mousedown touchstart", ".cliproot .resizablebox", p), $(document).off("mouseup touchend", h), $(document).off("mousemove touchmove", C, f), $(C).off("click", ".js-create-clipping")
    }

    function k() {
        var e = A.find(".clipping-curtain");
        e.get(0).width = 2 * e.width(), e.get(0).height = 2 * e.height()
    }

    function x() {
        g(), k(), t.setErrorMessage("")
    }
    var C, A, E, I, S, D = n(1),
        T = .0326,
        P = {},
        O = {
            state: 0,
            top: 0,
            left: 0,
            startX: 0,
            startY: 0,
            relX: 0,
            relY: 0,
            startPageX: 0,
            startPageY: 0,
            width: 0,
            height: 0,
            minX: 0,
            minY: 0,
            maxX: 0,
            maxY: 0
        };
    t.create = function(e, t) {
        return C = $(e), b(t), x(), w(), A
    }, t.setConstraints = function(e) {
        if ((!_.isArray(e) || e.length < 1) && D.error("Social Clippings Creator:setConstraints expects well defined parameters", e), !_.isUndefined(S)) {
            var n = t.getCoordinates();
            P.constraints = e, _.isUndefined(P.constraints[n.constraintIndex]) && (n.constraintIndex = 0), k(), t.setCoordinates(n.constraintIndex, n.dimensions)
        }
    }, t.setCreateButtonPromise = function(e) {
        C.find(".js-create-clipping").stateButton("promise", e)
    }, t.getCoordinates = function() {
        var e = _.findIndex(P.constraints, function(e) {
                return _.isEqual(S, e)
            }),
            t = S.maxX - S.minX,
            n = S.maxY - S.minY,
            i = O.left - S.minX,
            a = O.top - S.minY,
            o = O.width,
            r = O.height,
            s = parseFloat((i / t).toFixed(10)),
            l = parseFloat((a / n).toFixed(10)),
            c = parseFloat((o / t).toFixed(10)),
            u = parseFloat((r / n).toFixed(10));
        return c += Math.min(1 - c - s, 0), u += Math.min(1 - u - l, 0), {
            constraintIndex: e,
            dimensions: {
                x: s,
                y: l,
                width: c,
                height: u
            }
        }
    }, t.setCoordinates = function(e, t) {
        _.isNumber(e) && _.isObject(t) || D.error("Social Clippings Creator:setCoordinates expects well defined parameters"), v(e);
        var n = S.maxX - S.minX,
            i = S.maxY - S.minY;
        O.left = t.x * n + S.minX, O.top = t.y * i + S.minY, O.width = t.width * n, O.height = t.height * i, s(), l(), c(), a()
    }, t.setErrorMessage = function(e) {
        _.isUndefined(e) || "" === e ? C.find(".js-error-message").html("").hide() : C.find(".js-error-message").html(e || "").show()
    }, t.destroy = function() {
        y(), A && (A.remove(), A = void 0)
    }
}, function(e, t, n) {
    "use strict";
    var i = n(18),
        a = n(2),
        o = n(224),
        r = n(225),
        s = n(223),
        l = n(221),
        c = n(171);
    e.exports = Backbone.View.extend({
        template: n(301),
        events: {
            "click .js-next": "showNextClipping",
            "click .js-prev": "showPreviousClipping",
            "click .js-close": "close",
            "click .morecomments a": "loadOlderComments",
            "click .publisherlink": "_externalLinkClicked",
            "click .clippingcrop": "_handleClippingClick",
            "click .activator": "_handleClippingClick"
        },
        tagName: "div",
        className: "clipping-overlay",
        initialize: function(e) {
            this.parent = e.parent, this.root = e.root, this.model = new l, this.boundKeyUp = _.bind(this._onKeyUp, this), this.listenTo(this.model, "change:activeClippingModel", this._onModelChanged), this.root.append(this.el)
        },
        _registerModelListeners: function() {
            this.oldModel = this.model.get("activeClippingModel"), this.listenTo(this.model.get("activeClippingModel"), "change:commentCount", function() {
                var e = this.model.get("activeClippingModel").get("commentCount");
                this.$(".js-comment-count").text("(" + e + ")").toggle(e > 0)
            }), this.listenTo(this.model.get("activeClippingModel"), "change:shareCount", function() {
                var e = this.model.get("activeClippingModel").get("shareCount");
                this.$(".js-share-count").text("(" + e + ")").toggle(e > 0)
            }), this.listenTo(this.model.get("activeClippingModel").comments, "add", function() {
                this.model.get("activeClippingModel").get("commentCount") <= this.model.get("activeClippingModel").comments.length && this.$(".morecomments").remove(), this.model.get("activeClippingModel").get("commentCount") + this.model.get("activeClippingModel").comments.length > 0 && this.$(".nocommentsyet").remove()
            })
        },
        _onKeyUp: function(e) {
            var t = e.srcElement;
            if (!(t && t.tagName && ["input", "textarea", "button"].indexOf(t.tagName.toLowerCase()) > -1)) switch (e.keyCode) {
                case $.ui.keyCode.LEFT:
                    e.stopPropagation(), this.showPreviousClipping(e);
                    break;
                case $.ui.keyCode.RIGHT:
                    e.stopPropagation(), this.showNextClipping(e);
                    break;
                case $.ui.keyCode.ESCAPE:
                    e.stopPropagation(), this.close()
            }
        },
        _registerGestureHandler: function() {
            this._unregisterGestureHandler(), $(window).on("keyup", this.boundKeyUp)
        },
        _unregisterGestureHandler: function() {
            $(window).off("keyup", this.boundKeyUp)
        },
        _onModelChanged: function() {
            this.oldModel && this.stopListening(this.oldModel), _.isUndefined(this.model.get("activeClippingModel")) ? this._destroy() : (this._registerModelListeners(), this._registerGestureHandler(), this.render())
        },
        _handleClippingClick: function() {
            var e = this.model.get("activeClippingModel");
            if (e.isVideoClipping()) {
                var t = e.get("action").data;
                if (a.broadcast(a.events.trackingEvent, {
                        event: "clippingAction",
                        data: {
                            action: "videoPlayback",
                            clippingId: e.get("id"),
                            videoid: t.videoid,
                            creator: e.get("isPublisherClipping") ? "publisher" : "reader",
                            onPage: e.get("pageNumber"),
                            openedInReader: !t.explicit,
                            service: t.service,
                            url: t.url
                        }
                    }), t.explicit) return void window.open(t.url, "_blank");
                switch (this.$(".activator").fadeOut(), t.service) {
                    case "youtube":
                        c.initYoutubePlayer(t.videoid, this.$("#video-player"));
                        break;
                    case "vimeo":
                        c.initVimeoPlayer(t.videoid, this.$("#video-player"))
                }
                $(document).on("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", function() {
                    document.mozFullScreenElement || document.webkitFullscreenElement || document.fullscreenElement || document.msFullscreenElement ? this.$(".bitmap-container .btn").hide() : this.$(".bitmap-container .btn").show()
                }.bind(this))
            }
        },
        render: function() {
            clearInterval(this.pollingInterval);
            var e = this.model.get("activeClippingModel");
            this.$el.addClass("fullscreen"), this.commentsView && (this.commentsView.remove(), this.commentsView = void 0), this.commentsFormView && (this.commentsFormView.remove(), this.commentsFormView = void 0), this.shareView && (this.shareView.remove(), this.shareView = void 0), this.$el.html(this.template({
                clipping: e.attributes,
                moreComments: e.get("commentCount") > e.comments.length,
                noComments: 0 === e.comments.length,
                commentCount: e.get("commentCount"),
                shareCount: e.get("shareCount"),
                clippingCount: this.model.get("modelsInSet").length,
                clippingIndex: this.model.get("modelsInSet").indexOf(e) + 1,
                needsPaging: this.model.get("modelsInSet").length > 1,
                linkUrl: e.getLinkUrl(),
                linkText: e.getLinkText(),
                commentsAllowed: this.parent.commentsAllowed !== !1,
                hasVideoLink: e.isVideoClipping() && !e.get("action").data.explicit
            })), this.parent.commentsAllowed !== !1 && (this.commentsView = new o({
                collection: e.comments,
                el: this.$(".comments-container")
            }), this.commentsFormView = new s({
                parent: this,
                el: this.$("form[name=newcomment]"),
                model: e
            })), this.shareView = new r({
                parent: this,
                el: this.$(".js-sharer-container")
            }), this.pollingInterval = setInterval(_.bind(this.loadNewerComments, this), 1e4), this.loadNewerComments(), this.cacheNextClippingThumbs(), this.$el.addClass("active"), a.broadcast(a.events.trackingEvent, {
                event: "clippingAction",
                data: {
                    action: "activate",
                    clippingId: e.get("id"),
                    onPage: e.get("pageNumber"),
                    creator: this.model.get("isPublisherClipping") ? "publisher" : "reader"
                }
            })
        },
        _destroy: function() {
            this._unregisterGestureHandler(), clearInterval(this.pollingInterval), this.oldModel = void 0, this.$el.removeClass("active"), i.onTransitionEnd(this.$(".overlay-content"), _.bind(function() {
                this.root.removeClass("fullscreen"), this.$el.removeClass("fullscreen"), this.commentsView && this.commentsView.remove(), this.shareView && this.shareView.remove(), this.$el.empty(), this.parent.trigger("overlayChanged:closed")
            }, this), 1e3)
        },
        close: function(e) {
            e && (e.preventDefault(), e.stopPropagation()), this.model.unset("activeClippingModel")
        },
        _externalLinkClicked: function(e) {
            var t = this.model.get("activeClippingModel"),
                n = _.find(this.parent.clippings.views, function(e) {
                    return e.model === t
                });
            "gotoPage" === t.get("action").type && this.close(), n.metaView.openExternalLink(e, !0)
        },
        showPreviousClipping: function(e) {
            e.preventDefault(), this.model.set("activeClippingModel", this.model.get("modelsInSet")[this.model.getPreviousModelIndex()])
        },
        showNextClipping: function(e) {
            e.preventDefault(), this.model.set("activeClippingModel", this.model.get("modelsInSet")[this.model.getNextModelIndex()])
        },
        loadOlderComments: function() {
            var e = _.last(this.commentsView.commentViews).$el,
                t = this.commentsView.loadOlderComments();
            t.then(_.bind(function() {
                this.$(".scrolled-container").animate({
                    scrollTop: this.$(".scrolled-container").scrollTop() + e.position().top
                }, 200)
            }, this))
        },
        loadNewerComments: function() {
            this.commentsView && this.commentsView.loadNewerComments()
        },
        cacheNextClippingThumbs: function() {
            var e = this.model.getActiveModelIndex(),
                t = _.map([1, 2, 3, 4, 5], function() {
                    return e = this.model.getNextModelIndex(e)
                }, this);
            t = _.without(_.uniq(t), this.model.getActiveModelIndex()), _.each(t, function(e) {
                var t = new Image;
                t.src = this.model.get("modelsInSet")[e].get("cropurl")
            }, this)
        },
        isOverlayOpen: function() {
            return !_.isUndefined(this.model.get("activeClippingModel"))
        }
    })
}, function(e, t) {
    "use strict";
    e.exports = Backbone.Model.extend({
        getActiveModelIndex: function() {
            return this.get("modelsInSet").indexOf(this.get("activeClippingModel"))
        },
        getNextModelIndex: function(e) {
            e = void 0 === e ? this.getActiveModelIndex() : e;
            var t = e + 1;
            return t > this.get("modelsInSet").length - 1 && (t = 0), t
        },
        getPreviousModelIndex: function(e) {
            e = void 0 === e ? this.getActiveModelIndex() : e;
            var t = e - 1;
            return 0 > t && (t = this.get("modelsInSet").length - 1), t
        }
    })
}, function(e, t, n) {
    "use strict";
    var i = n(5),
        a = n(22),
        o = n(24),
        r = n(4),
        s = n(2);
    e.exports = Backbone.View.extend({
        tagName: "li",
        template: n(299),
        events: {
            "click .js-delete-trigger": "showConfirmDelete",
            "click .js-delete-cancel": "_stopDelete",
            "click .js-delete-submit": "_submitDelete",
            "click .js-content a": "_commentLinkClick"
        },
        initialize: function(e) {
            this.render(), this.listenTo(this.model, "change", this.render), this.clipping = e.clipping
        },
        _getMarkupObject: function() {
            var e = {
                comment: _.clone(this.model.attributes),
                owner: {
                    displayName: this.model.get("owner").displayName,
                    profilePic: i.userSmallPhotoUrl(this.model.get("owner").username),
                    profileUrl: i.userProfileUrl(this.model.get("owner").username),
                    isPersonal: "private" === this.model.get("owner").accountType
                },
                isCommentOwner: r.isLoggedIn() && this.model.get("owner").username.toLowerCase() === r.getUsername()
            };
            return e.comment.timeAgo = o.min(o(this.model.get("created")), o().subtract(1, "second")).fromNow(), e.comment.localtime = o(this.model.get("created")).toDate().toLocaleString(), e.comment.unescapedBrokenAndLinkedText = a.linebreakify(a.linkify(_.escape(this.model.get("text")))), e.comment.isDeletedByOwner = "active" !== this.model.get("state"), e
        },
        showConfirmDelete: function() {
            this.$(".js-delete-failed").hide(), this.$(".js-delete-link").hide(), this.$(".js-delete-links").show()
        },
        _stopDelete: function() {
            this.$(".js-delete-link").show(), this.$(".js-delete-links").hide()
        },
        _submitDelete: function() {
            this.$(".js-delete-wait").show(), this.$(".js-delete-link").hide(), this.$(".js-delete-links").hide(), this.model.save({
                state: "deleted"
            }, {
                wait: !0
            }).fail(_.bind(this._deleteFailed, this)).done(_.bind(function() {
                s.broadcast(s.events.trackingEvent, {
                    event: "clippingComment",
                    data: {
                        action: "deleted",
                        commentId: this.model.get("id"),
                        clippingId: this.clipping.get("id"),
                        onPage: this.clipping.get("pageNumber"),
                        creator: this.clipping.get("isPublisherClipping") ? "publisher" : "reader"
                    }
                })
            }, this))
        },
        _deleteFailed: function() {
            this.$(".js-delete-link").show(), this.$(".js-delete-failed").show(), this.$(".js-delete-wait").hide()
        },
        _updateTimestamp: function() {
            this.$("time").text(this._getMarkupObject().comment.timeAgo)
        },
        _commentLinkClick: function(e) {
            var t = $(e.target).attr("href");
            s.broadcast(s.events.trackingEvent, {
                event: "clippingComment",
                data: {
                    action: "openUrl",
                    commentId: this.model.get("id"),
                    clippingId: this.clipping.get("id"),
                    onPage: this.clipping.get("pageNumber"),
                    creator: this.clipping.get("isPublisherClipping") ? "publisher" : "reader",
                    url: t
                }
            })
        },
        remove: function() {
            clearInterval(this.updaterInterval), Backbone.View.prototype.remove.apply(this, arguments)
        },
        render: function() {
            clearInterval(this.updaterInterval);
            var e = $(this.template(this._getMarkupObject()));
            this.$el.replaceWith(e), this.setElement(e), this.$(".js-delete-links").hide(), this.$(".js-delete-failed").hide(), this.$(".js-delete-wait").hide(), o().subtract("days", 1).isBefore(this.model.get("created")) && (this.updaterInterval = setInterval(_.bind(this._updateTimestamp, this), 3e4))
        }
    })
}, function(e, t, n) {
    "use strict";
    var i = n(5),
        a = n(46),
        o = n(48),
        r = n(168),
        s = n(2),
        l = n(47).promised,
        c = n(4);
    e.exports = Backbone.View.extend({
        template: n(300),
        events: {
            "click .js-signin": "loginToComment",
            submit: "trySubmitComment"
        },
        initialize: function(e) {
            this.parent = e.parent, this.render()
        },
        render: function() {
            c.isLoggedIn() ? $.when(c.getDisplayName(), c.getAccountType()).then(_.bind(this._drawTemplateWithInfo, this)) : this._drawTemplateWithInfo()
        },
        _drawTemplateWithInfo: function(e, t) {
            this.$el.html(this.template({
                user: {
                    isLoggedIn: c.isLoggedIn(),
                    username: c.getUsername(),
                    profilePic: i.userSmallPhotoUrl(c.getUsername()),
                    profileUrl: i.userProfileUrl(c.getUsername()),
                    isPersonal: "B" !== t,
                    displayName: e
                },
                isFirstComment: 0 === this.model.comments.length
            })), c.isLoggedIn() && this._setupValidator()
        },
        _setupValidator: function() {
            this.commentValidator && this.commentValidator.pause(), this.reporter && this.reporter.removeAllErrors(), this.commentValidator = o.create(this.$el), this.commentValidator.addTest({
                func: l.required,
                fields: ["newcommenttext"]
            }).addTest({
                func: l.minlength,
                fields: ["newcommenttext"],
                extraParams: [2]
            }).addTest({
                func: l.maxlength,
                fields: ["newcommenttext"],
                extraParams: [1e3]
            }), this.reporter = a.create(this.$(".js-comment-error")), this.commentValidator.addReporter(this.reporter)
        },
        loginToComment: function(e) {
            e.preventDefault(), e.stopPropagation(), c.doWhenLoggedIn(_.bind(this.render, this))
        },
        trySubmitComment: function(e) {
            if (e.preventDefault(), e.stopPropagation(), this.reporter.removeError("commentPostFailed"), clearTimeout(this.serverErrorTimeout), this.commentValidator.runAllTests(), this.commentValidator.isAllValid()) {
                var t = $.trim(this.$("[name=newcommenttext]").val()),
                    n = this.parent.model.get("activeClippingModel"),
                    i = new r({
                        text: t,
                        clippingId: n.get("id")
                    }),
                    a = i.save();
                this.$("button[type=submit]").stateButton("promise", a.promise()), a.then(_.bind(function() {
                    n.comments.add(i), n.set("commentCount", n.get("commentCount") + 1), this.$("[name=newcommenttext]").val("").trigger("change"), this._setupValidator(), s.broadcast(s.events.trackingEvent, {
                        event: "clippingComment",
                        data: {
                            action: "created",
                            commentId: i.get("id"),
                            clippingId: n.get("id"),
                            onPage: n.get("pageNumber"),
                            creator: n.get("isPublisherClipping") ? "publisher" : "reader"
                        }
                    })
                }, this), _.bind(function() {
                    clearTimeout(this.serverErrorTimeout), this.reporter.addError("commentPostFailed", "commentPostFailed", {
                        error: i18n.t("clippings.overlay.errorPostingComment")
                    }), this.serverErrorTimeout = setTimeout(_.bind(function() {
                        this.reporter.removeError("commentPostFailed")
                    }, this), 5e3)
                }, this))
            }
        }
    })
}, function(e, t, n) {
    "use strict";
    var i = n(24),
        a = n(222);
    e.exports = Backbone.View.extend({
        initialize: function() {
            this.render(), this.listenTo(this.collection, "add", this._modelAdded)
        },
        _modelAdded: function(e, t, n) {
            var o = new a({
                model: e,
                clipping: this.collection.clipping
            });
            i(e.get("created")).isBefore(this.collection.at(0).get("created")) ? (this.commentViews.push(o), this.$el.append(o.$el)) : (this.commentViews.unshift(o), this.$el.prepend(o.$el))
        },
        render: function() {
            this.commentViews = this.collection.map(function(e) {
                return new a({
                    model: e,
                    clipping: this.collection.clipping
                })
            }, this), this.$el.html(_.map(this.commentViews, function(e) {
                return e.$el
            }))
        },
        remove: function() {
            _.invoke(this.commentViews, "remove"), Backbone.View.prototype.remove.apply(this, arguments)
        },
        loadOlderComments: function() {
            return this.collection.fetch({
                remove: !1,
                data: {
                    before: this.collection.at(this.collection.length - 1).get("id"),
                    pageSize: 20
                }
            })
        },
        loadNewerComments: function() {
            return this.collection.fetch({
                remove: !1,
                data: {
                    since: this.collection.length > 0 ? this.collection.at(0).get("id") : 0,
                    pageSize: 5
                }
            })
        }
    })
}, function(e, t, n) {
    "use strict";
    var i = n(189);
    e.exports = Backbone.View.extend({
        initialize: function(e) {
            this.parent = e.parent, this.render()
        },
        render: function() {
            var e = this.parent.model.get("activeClippingModel");
            i.create(this.$el, {
                type: "clipping",
                includeLinkField: !0,
                shareObject: {
                    name: e.get("document").name,
                    owner: e.get("document").ownerUsername,
                    title: this.parent.parent.metaObj.title,
                    description: this.parent.parent.metaObj.description,
                    clippingId: e.get("id"),
                    clippingPage: e.get("pageNumber"),
                    clippingIsPublisherClipping: e.get("isPublisherClipping")
                }
            })
        }
    })
}, function(e, t, n) {
    "use strict";
    var i = n(18),
        a = n(2),
        o = n(169),
        r = n(171);
    e.exports = Backbone.View.extend({
        template: n(302),
        className: "clipping-overlay",
        initialize: function(e) {
            this.parent = e.parent, this.root = e.root, this.boundKeyUp = _.bind(this._onKeyUp, this), this.root.append(this.el)
        },
        _onKeyUp: function(e) {
            var t = e.srcElement;
            if (!(t && t.tagName && ["input", "textarea", "button"].indexOf(t.tagName.toLowerCase()) > -1)) switch (e.keyCode) {
                case $.ui.keyCode.ESCAPE:
                    e.stopPropagation(), this.close()
            }
        },
        _registerGestureHandler: function() {
            this._unregisterGestureHandler(), $(window).on("keyup", this.boundKeyUp)
        },
        _unregisterGestureHandler: function() {
            $(window).off("keyup", this.boundKeyUp)
        },
        showFullOvelay: function() {
            this.close(), this.parent.openOverlay.call(this.parent, this.model)
        },
        render: function() {
            this.$el.addClass("fullscreen"), this.$el.html(this.template({
                commentCount: this.model.get("commentCount"),
                shareCount: this.model.get("shareCount"),
                isPublisherClipping: this.model.get("isPublisherClipping"),
                cropurl: this.model.get("cropurl")
            }));
            var e = new o({
                model: this.model,
                parent: this,
                root: this.root,
                positionAbsolutely: !1
            }).render();
            switch (this.listenTo(e, "openOverlay", function() {
                this.showFullOvelay()
            }.bind(this)), this.$("#meta-bar").replaceWith(e.$el), this.$el.addClass("active"), this.model.get("action").data.service) {
                case "youtube":
                    r.initYoutubePlayer(this.model.get("action").data.videoid, this.$("#video-player"));
                    break;
                case "vimeo":
                    r.initVimeoPlayer(this.model.get("action").data.videoid, this.$("#video-player"))
            }
            a.broadcast(a.events.trackingEvent, {
                event: "clippingAction",
                data: {
                    action: "activate",
                    clippingId: this.model.get("id"),
                    onPage: this.model.get("pageNumber"),
                    creator: this.model.get("isPublisherClipping") ? "publisher" : "reader"
                }
            })
        },
        events: {
            "click .js-close": "close",
            click: "overlayClicked"
        },
        overlayClicked: function(e) {
            e.target === this.el && this.close()
        },
        close: function() {
            this._unregisterGestureHandler(), this.$el.removeClass("active"), i.onTransitionEnd(this.$(".overlay-content"), _.bind(function() {
                this.root.removeClass("fullscreen"), this.$el.removeClass("fullscreen"), this.$el.empty(), this.parent.trigger("videoOverlayChanged:closed")
            }, this), 1e3)
        }
    })
}, function(e, t, n) {
    "use strict";

    function i(e) {
        var t = $(n(303)(e)),
            i = n(370);
        r.isFlashReader() ? $("#docmenu .metadata").before(t) : $(".stream-header").prepend(t), i.init()
    }
    var a = n(4),
        o = (n(7), n(37)),
        r = n(53);
    t.create = function(e) {
        return e.readerDocCount <= 0 ? void i({
            eventName: "you can publish too",
            label: i18n.t("documentpage.cta.youcanpublishtoo"),
            link: "/publishers?entryPoint=ycpt"
        }) : e.doc.username !== a.getUsername().toLowerCase() || o.hasReaderTool(e.services) ? void 0 : void i({
            eventName: "get issuu plus",
            label: i18n.t("documentpage.cta.getissuuplus"),
            link: "/home/services?addServices=reader&r=docPage1"
        })
    }
}, function(e, t, n) {
    "use strict";

    function i() {
        u.subscribe(u.events.documentMenuActivate, t.switchTo), u.subscribe(u.events.documentPageChange, s), u.subscribe(u.events.userAuthStatusChanged, a), l.find(".report").on("click", function(e) {
            e.preventDefault(), p.doWhenLoggedIn(function() {
                m.openInOverlay(c.doc)
            }, "flag")
        })
    }

    function a() {
        p.isLoggedIn() && f.renderInto(l.children(".addto"), [{
            revisionId: c.doc.revisionId,
            publicationId: c.doc.publicationId,
            title: c.doc.title
        }], o)
    }

    function o(e) {
        u.broadcast(u.events.documentMenuActivate, ""), e.length > 0 && a()
    }

    function r() {
        l.append('<div class="addto"></div>'), a(), l.children(".addto").hide()
    }

    function s(e) {
        "object" == typeof e && 1 === e.pageNumbers[0] ? u.broadcast(u.events.documentMenuActivate, "metadata") : u.broadcast(u.events.documentMenuActivate, "")
    }
    var l, c, u = n(2),
        d = n(18),
        p = n(4),
        h = n(37),
        f = n(183),
        m = (n(72), n(173)),
        g = n(230),
        v = "metadata";
    t.create = function(e, t) {
        l = $(e), c = t, r(), g.create(l, c), i()
    }, t.switchTo = function(e) {
        if (("share" !== e || c.embedData.shareButtonEnabled !== !1 || !h.hasBrandpackage(c.services)) && v !== e) {
            if (l.height(l.height()), v)
                if (e) l.children("." + v).hide();
                else {
                    var t = v;
                    d.onTransitionEnd(l, function() {
                        l.children("." + t).hide()
                    })
                }
            if (v = e) {
                l.children("." + v).show();
                var n = l.children("." + v).outerHeight(!0);
                if (l.height(n), "share" === v || "addto" === v) {
                    var i = l.offset().top - window.innerHeight + n,
                        a = 60;
                    i > l.offset().top - a && (i = l.offset().top - a), i > $(window).scrollTop() && $("html,body").animate({
                        scrollTop: i
                    }, 200)
                }
            } else l.height(0)
        }
    }
}, function(e, t, n) {
    "use strict";

    function i(e, t) {
        var n = l.doc.likes || 0;
        "number" == typeof t && (n = t), e ? s.find(".like a").addClass("liked").html(i18n.t("documentpage.likes", {
            count: n
        })) : s.find(".like a").removeClass("liked").html(i18n.t("documentpage.likes", {
            count: n
        }))
    }

    function a() {
        d.hasBrandpackage(l.services) && l.embedData.shareButtonEnabled === !1 && s.find(".share a").remove()
    }

    function o() {
        s.find(".metadata a").on("click", function(e) {
            e.preventDefault(), c.broadcast(c.events.documentMenuActivate, "metadata")
        }), s.find(".addto a").on("click", function(e) {
            e.preventDefault(), g.trackEvent("trickersAction", "addTo"), u.doWhenLoggedIn(function() {
                c.broadcast(c.events.documentMenuActivate, "addto")
            }, "stack")
        }), s.find(".share a").on("click", function(e) {
            e.preventDefault(), g.trackEvent("trickersAction", "share"), c.broadcast(c.events.documentMenuActivate, "share")
        }), s.find(".like a").on("click", function(e) {
            e.preventDefault(), g.trackEvent("trickersAction", "like"), p.toggleLike(l.doc.documentId).progress(i).done(i), c.broadcast(c.events.documentMenuActivate, "share")
        })
    }

    function r() {
        m.create([{
            el: s.find(".share > a"),
            conditions: {
                pageflip: 3
            },
            onStart: function() {
                s.find(".share").issuuTooltip({
                    orientation: "north",
                    elementClickEnabled: !0
                })
            }
        }, {
            el: s.find(".subscription .follow-button__icon"),
            conditions: {
                pageflip: 10,
                wait: 1e4
            },
            onStart: function() {
                s.find(".subscription").issuuTooltip({
                    orientation: "north",
                    elementClickEnabled: !0
                })
            }
        }, {
            el: s.find(".addto a"),
            conditions: {
                pageflip: 10,
                wait: 1e4
            },
            onStart: function() {
                s.find(".addto").issuuTooltip({
                    orientation: "north",
                    elementClickEnabled: !0
                })
            }
        }, {
            el: s.find(".like .issuuicon"),
            conditions: {
                pageflip: 10,
                wait: 1e4
            },
            onStart: function() {
                s.find(".like").issuuTooltip({
                    orientation: "north",
                    elementClickEnabled: !0
                })
            }
        }], {
            defaultDuration: 15e3
        }).start()
    }
    var s, l, c = n(2),
        u = n(4),
        d = (n(45), n(37)),
        p = (n(72), n(53), n(184)),
        h = n(42),
        f = n(6),
        m = n(281),
        g = h.create(f.tracking.gaIdTrickers),
        v = n(174);
    t.updateMenu = function(e) {
        s.find(".active").removeClass("active"), e && s.find("." + e).addClass("active")
    }, t.create = function(e, n, d) {
        s = $(e), l = n, a(), o(), c.subscribe(c.events.documentMenuActivate, t.updateMenu), c.subscribe(c.events.userAuthStatusChanged, a), $.when(v.create(e, n.doc), p.getLikeOfPublication(l.doc.documentId)).done(function(e, t) {
            i(t)
        }).always(d), u.isLoggedIn() || r()
    }
}, function(e, t, n) {
    "use strict";

    function i() {
        var e = b.getCurrentPages(),
            t = c.find("input[type=radio][name=page]:checked").val();
        return void 0 === e || 1 === e.length && 1 === e[0] || 0 === e.length || "first" === t ? 1 : e[0]
    }

    function a(e) {
        if (e = e || {}, e.isHandledExternally = !0, !g.hasBrandpackage(u.services) || u.embedData.shareButtonEnabled !== !1) {
            var t = {
                doc: {
                    documentId: u.doc.documentId,
                    resource: u.doc.username + "/docs/" + u.doc.name,
                    pageCount: u.doc.pageCount,
                    firstpageWidth: u.doc.coverWidth,
                    firstpageHeight: u.doc.coverHeight,
                    username: u.doc.username,
                    name: u.doc.name,
                    pro: u.doc.pro ? u.doc.pro : "F",
                    title: u.doc.title,
                    orgDocType: u.doc.orgDocType,
                    downloadable: u.doc.downloadable ? !0 : !1,
                    isProcessing: "P" === u.doc.state ? !0 : !1,
                    publicationId: u.doc.documentId.split("-")[1]
                },
                user: {
                    username: h.getUsername()
                }
            };
            k.expand(t)
        }
    }

    function o() {
        m.subscribe(m.events.documentMenuActivate, function(e) {
            "share" === e && (f.loadSdk(), s())
        }), m.subscribe(m.events.documentEmbedActivate, a), c.find(".share a").on("click", function(e) {
            e.preventDefault();
            var t = $(e.currentTarget);
            t.hasClass("embed") && m.broadcast(m.events.documentEmbedActivate), t.hasClass("download") && m.broadcast(m.events.documentDownloadActivate)
        }), c.find('.share input[type="radio"]').on("click", s)
    }

    function r() {
        return {
            publicationId: u.doc.documentId.split("-")[1],
            revisionId: u.doc.documentId.split("-")[0],
            name: u.doc.name,
            owner: u.doc.username,
            title: u.doc.title,
            description: u.doc.description,
            pageNumber: i()
        }
    }

    function s() {
        var e, t = c.find('.share input[type="radio"]:checked');
        e = "current" === t.val() ? p.publicationUrl(u.doc.username, u.doc.name, i()) : p.publicationUrl(u.doc.username, u.doc.name), u.embedData.embedId && (e += "?e=" + u.embedData.embedId), d.updateLinkField()
    }

    function l(e) {
        c.append(y({
            downloadable: e
        })), d = v.create(c.find(".share .sharerholder"), {
            type: "document",
            embedId: u.embedData.embedId,
            getFreshShareObject: r,
            includeLinkField: !0,
            includeSocialIconsColors: !1
        }), c.find(".share").hide(), s()
    }
    var c, u, d, p = n(5),
        h = n(4),
        f = n(27),
        m = n(2),
        g = n(37),
        v = n(189),
        b = n(53),
        w = n(79),
        y = n(304),
        k = n(172);
    t.create = function(e, t) {
        c = e, u = t, w.isDownloadEnabled().done(function() {
            l(!0)
        }).fail(function() {
            l(!1)
        }).always(function() {
            o()
        })
    }
}, function(e, t, n) {
    "use strict";
    var i = n(7),
        a = n(4),
        o = n(343);
    t.createEmbedStyle = function(e, t) {
        var n, a = $.extend({}, e);
        for (n in a) "undefined" == typeof a[n] && (a[n] = "");
        a.title = "Style", a.embedStyleId = "";
        var o = i.create({
            action: "issuu.embed_style.create",
            cache: !1,
            type: "POST"
        }).parameters(a).call();
        $.when(o).then(function(e) {
            t && t(e)
        })
    }, t.updateEmbedStyle = function(e, t) {
        var n, a = $.extend({}, e);
        for (n in a) "undefined" == typeof a[n] && (a[n] = "");
        var o = i.create({
            action: "issuu.embed_style.update",
            cache: !1,
            type: "POST"
        }).parameters(a).call();
        $.when(o).then(function(e) {
            t && t(e)
        })
    }, t.listEmbedStyles = function(e, t) {
        var n = i.create({
            action: "issuu.embed_styles.list",
            cache: !1,
            isReadOnly: !0
        }).parameters({
            embedStyleIds: e ? e.join(",") : "",
            resultOrder: "asc",
            startIndex: 0,
            pageSize: 10,
            embedStyleSortBy: "created",
            countAll: !1
        }).call();
        $.when(n).then(function(e) {
            t && t(e)
        })
    }, t.createEmbed = function(e, t) {
        var n = $.extend({}, e);
        delete n.id, a.isLoggedIn() || (delete n.width, delete n.height, delete n.readerStartPage);
        var o = i.create({
            action: a.isLoggedIn() ? "issuu.embed.create" : "issuu.embed.create_anonymous",
            cache: !1,
            type: "POST"
        }).parameters(n).call();
        $.when(o).then(function(e) {
            t && t(e)
        })
    }, t.updateEmbed = function(e, t) {
        var n = $.extend({}, e);
        n.embedId = n.id, delete n.id, delete n.style;
        var a = i.create({
            action: "issuu.embed.update",
            cache: !1,
            type: "POST"
        }).parameters(n).call();
        $.when(a).then(function(e) {
            t && t(e)
        })
    }, t.deleteEmbed = function(e, t) {
        var n = i.create({
            action: "issuu.embed.delete",
            cache: !1,
            type: "POST"
        }).parameters({
            embedId: e
        }).call();
        $.when(n).then(function(e) {
            t && t(e)
        })
    }, t.listEmbeds = function(e, t) {
        var n = i.create({
            action: "issuu.embeds.list",
            cache: !1,
            isReadOnly: !0
        }).parameters({
            documentId: e.documentId,
            resultOrder: "asc",
            startIndex: 0,
            pageSize: 10,
            embedSortBy: "created",
            countAll: !1,
            responseParams: "*"
        }).call();
        $.when(n).then(function(e) {
            t && t(e)
        })
    }, t.getRemainingDownloads = function(e, t) {
        var n = i.create({
            path: "call/licensing/downloads/remaining/1/1/publisher/" + e,
            cache: !1,
            isReadOnly: !0
        }).parameters({}).call();
        $.when(n).then(function(e) {
            t && t(e)
        })
    }, t.getLicences = function(e, t) {
        var n = i.create({
            path: "call/licensing/application/get/1/1/publication/" + e,
            cache: !1,
            isReadOnly: !0
        }).parameters({}).call();
        $.when(n).then(function(e) {
            t && t(e)
        })
    }, t.getUser = function(e, t) {
        var n = i.create({
            action: "issuu.user.get_anonymous",
            cache: !1
        }).parameters({
            profileUsername: e
        }).call();
        $.when(n).then(function(e) {
            t && t(e)
        })
    }, t.allowClipsCustomization = function() {
        return o.hasClipCustomizationFeature()
    }
}, function(e, t) {
    "use strict";

    function n(e, t, n) {
        var i, a, o = Math.min(e, t, n),
            r = Math.max(e, t, n),
            s = r - o,
            l = r;
        return l = Math.floor(r / 255 * 100), 0 === r ? [0, 0, 0] : (a = Math.floor(s / r * 100), i = e === r ? (t - n) / s : t === r ? 2 + (n - e) / s : 4 + (e - t) / s, i = Math.floor(60 * i), 0 > i && (i += 360), [i, a, l])
    }

    function i(e) {
        var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return t ? {
            r: parseInt(t[1], 16),
            g: parseInt(t[2], 16),
            b: parseInt(t[3], 16)
        } : null
    }
    t.findTextColorToHexBackground = function(e) {
        var t = i(e),
            a = n(t.r, t.g, t.b);
        return a[2] > 50 ? "#000000" : "#ffffff"
    }, t.colorMap = {
        embedColors: {
            colors: {
                "default": "#transparent",
                orange: "#e87728",
                red: "#c93f36",
                green: "#7fc225",
                blue: "#4393cd",
                mint: "#27c0bf",
                grey: "#505050"
            },
            defaultColor: {
                name: "#transparent",
                colorExample: "#e6e6e6"
            }
        },
        bgColors: {
            colors: {
                "default": "#222222",
                mint: "#4a9ea4",
                green: "#4a8019",
                rosy: "#fcdae3",
                bluedusty: "#517ca1",
                bluedark: "#122a3b",
                brown: "#392a25",
                greylight: "#e9e9e9",
                grey: "#313131",
                greydark: "#1b1b1b",
                black: "#000000"
            },
            defaultColor: {
                name: "#222222",
                colorExample: "#222222"
            }
        }
    }
}, function(e, t, n) {
    "use strict";

    function i() {
        function e() {
            $('.embed1 input[name="service"]').click(function(e) {
                f(), g(e)
            });
            $(".embed1 input[name=customX]").focus(function() {
                $(".embed1 #s4").attr("checked", "checked")
            }), $(".embed1 input[name=customY]").focus(function() {
                $(".embed1 #s4").attr("checked", "checked")
            }), $('.embed1 input[name="backgroundColor"]').focus(function() {
                $(".embed1 #t0").attr("checked", "checked")
            }), $('.embed1 select[name="themeSelector"]').focus(function() {
                $(".embed1 #tselect").attr("checked", "checked")
            }), $('.embed1 input[name="customThemeUrl"]').focus(function() {
                $(".embed1 #tcustom").attr("checked", "checked")
            }), $('.embed1 form[name="skema"] :radio').click(function(e) {
                g(e)
            }), $('.embed1 form[name="skema"] :checkbox').click(function(e) {
                g(e)
            }), $('.embed1 form[name="skema"] :text').bind("change", function(e) {
                g(e)
            }), $('.embed1 form[name="skema"] select').change(function(e) {
                g(e)
            }), $('.embed1 form[name="skema"] textarea').change(function(e) {
                g(e)
            }), $(".embed1 input[name=embedCode]").click(function() {
                $(this).get(0).select()
            }), $(".embed1 input[name=url]").click(function() {
                $(this).get(0).select()
            }), $(".embed1 input[name=logoUrl]").change(function() {
                $(".embed1 div.logoTester").html(""), $(".embed1 div.logoTester").append('<img class="logotest" src="' + $(".embed1 input[name=logoUrl]").val() + "\" onError=\"$('.embed1 img.logotest').attr('src','')\" style=\"display: none;\">"), $(".embed1 img.logotest").load(function() {
                    var e = $(".embed1 img.logotest").height();
                    e || (e = 110);
                    var t = parseInt(e, 10) + 10 + "px";
                    $(".embed1 img.logotest").show(), $(".embed1 div.logoTester").animate({
                        height: t
                    })
                })
            }), $(window).bind("keypress", function(e) {
                return "13" === e.which ? (e.stopPropagation(), e.preventDefault(), !1) : void 0
            }), $(".embed1 .switchToV3").click(function(e) {
                e.preventDefault();
                n(172).expand(r)
            })
        }
        var t = function(e) {
                $(e).css({
                    backgroundColor: "#D0DCEF"
                }), setTimeout(function() {
                    $(e).css({
                        backgroundColor: "#FFF"
                    })
                }, 250)
            },
            i = [];
        o = setInterval(function() {
            i.length > 0 && ($(".embed1 div.previewBox").html(i.pop()), i = [])
        }, 5e3);
        var a = 150,
            l = function(e, t) {
                var n = r.doc.firstpageHeight / r.doc.firstpageWidth;
                "magazine" === t && (n /= 2);
                var i = Math.round(parseFloat(n * e));
                return e > 740 && (i += a), i
            },
            p = function(e, t) {
                var n = r.doc.firstpageWidth / r.doc.firstpageHeight;
                "magazine" === t && (n = 2 * n);
                var i = Math.round(parseFloat(n * e));
                return i
            },
            f = function() {
                $(".embed1 div.guides").html(""), $(".embed1 div.guides").animate({
                    height: "0px"
                }, 250), $(".embed1 strong.embedButtonText").html(" Embed guide ")
            },
            m = function() {
                var e, t = $('.embed1 form[name="skema"]').serializeArray(),
                    n = {};
                for (e = 0; e < t.length; e++) n[t[e].name] = t[e].value;
                return n.service = $('.embed1 input[name="service"]:checked').val(), n.unit = $('.embed1 input[name="unit"]:checked').val(), n.id = r.doc.documentId, n.username = r.doc.username, n.name = r.doc.name, delete n.embedCode, "custom" === n.size ? (n.w = n.customX, n.h = n.customY) : (n.size.unit = "px", n.w = n.size, n.h = l(n.size, n.layout)), n
            },
            g = function(e) {
                var t = b();
                w(t)
            },
            v = function(e, t) {
                var n, i = !1;
                for (n = 0; n < t.length; n++) e === t[n] && (i = !0);
                return i
            },
            b = function() {
                var e = m();
                "facebook" === e.service && (e.layout = "magazine", $(".embed1 #l1").attr("checked", "checked")), v(e.service, ["wordpress", "joomla"]) ? $(".embed1 span.mustDownloadPlug").show() : $(".embed1 span.mustDownloadPlug").hide(), v(e.service, ["joomla"]) ? $(".embed1 span.joomlaPlug").show() : $(".embed1 span.joomlaPlug").hide(), v(e.service, ["wordpress"]) ? $(".embed1 span.wpPlug").show() : $(".embed1 span.wpPlug").hide(), v(e.service, ["facebook"]) ? $(".embed1 div.layoutBlock").hide() : $(".embed1 div.layoutBlock").show(), v(e.service, ["facebook", "google"]) ? $(".embed1 div.sizeBlock").hide() : $(".embed1 div.sizeBlock").show(), "reading" === e.layout ? $(".embed1 div.colorOrThemeBlock").hide() : $(".embed1 div.colorOrThemeBlock").show(), v(e.layout, ["reading"]) && "facebook" !== e.service ? $(".embed1 div.fitToBlock").show() : $(".embed1 div.fitToBlock").hide(), "reading" !== e.layout && "facebook" !== e.service ? $(".embed1 div.autoflipBlock").show() : $(".embed1 div.autoflipBlock").hide(), v(e.service, ["facebook"]) ? $(".embed1 div.startingpageBlock").hide() : $(".embed1 div.startingpageBlock").show(), v(e.service, ["facebook"]) || "reading" === e.layout.toLowerCase() ? $(".embed1 div.audioBlock").hide() : $(".embed1 div.audioBlock").show();
                var t = r.doc.pro && "P" === r.doc.pro ? !0 : !1;
                t && r.doc.username.toLowerCase() === r.user.username.toLowerCase() && "facebook" !== e.service && "reading" !== e.layout ? $(".embed1 div.logoBlock").show() : $(".embed1 div.logoBlock").hide(), v(e.service, ["facebook"]) ? $(".embed1 div.facebookBlock").show() : $(".embed1 div.facebookBlock").hide(), v(e.service, ["facebook"]) ? $(".embed1 div.mainButtons").hide() : $(".embed1 div.mainButtons").show(), v(e.service, ["google"]) ? $(".embed1 strong.codeHandle").text("Config code") : $(".embed1 strong.codeHandle").text("Embed code"), v(e.service, ["joomla", "myspace"]) ? ($(".embed1 .unit-perc").hide(), $('.embed1 input[name="unit"][value="px"]').prop("checked", !0)) : $('.embed1 option[value="%"]').length < 1 && $(".embed1 .unit-perc").show(), v(e.service, ["facebook"]) ? $(".embed1 div.previewBlock").hide() : $(".embed1 div.previewBlock").show(), "custom" === e.size && (e.customX || e.customY ? "" !== e.customX && "" === e.customY ? $('.embed1 input[name="customY"]').val(l(e.customX, e.layout)) : "" === e.customX && "" !== e.customY && $('.embed1 input[name="customX"]').val(p(e.customY, e.layout)) : ($('.embed1 input[name="customX"]').val("600"), $('.embed1 input[name="customY"]').val(l(600, e.layout))));
                var n = m();
                if ($(".embed1 #t0").attr("checked") || delete n.backgroundColor, "www.mysite.com/logo.png" === n.logoUrl && delete n.logoUrl, $(".embed1 #tcustom").attr("checked") ? n.theme = n.customThemeUrl : n.theme = u.urlBase("skin") + "/" + n.themeSelector, delete n.customThemeUrl, delete n.urlType, delete n.themeSelector, delete n.size, delete n.customX, delete n.customY, delete n.url, n.title = r.doc.title, r.doc.tags && r.doc.tags.length > 0) {
                    var i;
                    for (i = 0; i < r.doc.tags.length; i++)
                        if (r.doc.tags[i].length < 15) {
                            n.textBelowTag = r.doc.tags[i];
                            break
                        }
                }
                return n
            },
            w = function(e) {
                var n = {
                    url: $('.embed1 input[name="url"]').val(),
                    embedCode: $('.embed1 input[name="embedCode"]').val()
                };
                h.set(e);
                var a = h.getEmbedCode();
                "facebook" === $('.embed1 input[name="service"]:checked').val() ? $(".embed1 a.facebookButton").attr("href", a) : $('.embed1 input[name="embedCode"]').val(a), "pro" === $('.embed1 input[name="urlType"]:checked').val() ? $('.embed1 input[name="url"]').val(h.getUrl()) : $('.embed1 input[name="url"]').val("http://" + u.getDomain() + "/" + e.username + "/docs/" + e.name), $('.embed1 input[name="embedCode"]').val() !== n.url && t('input[name="embedCode"]'), $('.embed1 input[name="url"]').val() !== n.url && t('input[name="url"]'), e.service = "html", e.w > 508 ? (e.w = 508, $(".embed1 .notActualSize").show()) : $(".embed1 .notActualSize").hide(), e.h = l(e.w, e.layout), h.set(e);
                var o = h.getPreviewEmbedCode();
                i.push(o)
            },
            y = function(e) {
                var t;
                for (t = 1; e >= t; t++) $('.embed1 select[name="startingPage"]').append('<option value="' + t + '">' + t + "</option>")
            };
        $('.embed1 input[name="url"]').val("www.issuu.com/" + r.doc.resource), y(r.doc.pageCount);
        var k = r.doc.orgDocType ? r.doc.orgDocType : "pdf";
        if ((1 === r.doc.pageCount || "odp" === k || "sxi" === k || "ppt" === k) && $(".embed1 input#l2").attr("checked", "checked"), g(), r.doc.username.toLowerCase() === r.user.username.toLowerCase() ? ("undefined" != typeof r.doc.sound ? ($(".embed1 span.ownerChangeSoundLink").show(), $(".embed1 span.soundUrl").html(r.doc.sound).show(), $(".embed1 a.ownerTestLink").click(function(e) {
                window.location.href = r.doc.sound, e.stopPropagation(), e.preventDefault()
            }).show()) : ($(".embed1 span.ownerNoSoundText").show(), $(".embed1 span.soundUrl").hide()), r.doc.pro && "P" === r.doc.pro && ($(".embed1 div.showSmallMenu").removeClass("hidden"), $(".embed1 div.showArchive").removeClass("hidden"))) : "undefined" != typeof r.doc.sound ? $(".embed1 span.soundText").show() : $(".embed1 span.noSoundText").show(), d.isLoggedIn()) {
            var _ = {};
            _.profileUsername = d.getUsername().toLowerCase();
            var x = c.create({
                action: "issuu.user.get_anonymous",
                isReadOnly: !0
            }).parameters(_).call();
            $.when(x).then(function(e) {
                s = e.user, "P" === e.user.pro && $(".embed1 div.textBelow").show()
            })
        }
        e()
    }

    function a() {
        $(window).unbind("keypress"), clearInterval(o)
    }
    var o, r, s, l = n(23),
        c = n(7),
        u = n(6),
        d = n(4),
        p = n(305),
        h = n(234);
    t.expand = function(e) {
        r = e;
        var t = l.create({
            marginClickClose: !1,
            content: p({
                username: d.getUsername()
            }),
            onShow: i,
            onRemove: a
        });
        l.show(t)
    }
}, function(e, t, n) {
    "use strict";
    var i = n(6),
        a = n(5),
        o = {
            service: "",
            showHtmlLink: "",
            layout: "",
            size: {
                w: 0,
                h: 0,
                unit: ""
            },
            colorOrTheme: {
                backgroundColor: "000000",
                theme: ""
            },
            fitTo: "",
            showFlipBtn: "",
            proShowMenu: "",
            proShowSidebar: "",
            flip: {
                autoFlip: "",
                autoFlipTime: 6e3
            },
            startingPage: 1,
            logo: {
                url: "",
                top: 0,
                left: 0
            },
            document: {
                id: "",
                name: "",
                username: "",
                title: "",
                tag: ""
            }
        },
        r = function() {
            var e = ["mode=embed"];
            return "presentation" === o.layout && e.push("viewMode=" + o.layout), o.colorOrTheme.theme && e.push("layout=" + encodeURIComponent(o.colorOrTheme.theme)), o.colorOrTheme.backgroundColor && e.push("backgroundColor=" + o.colorOrTheme.backgroundColor), "true" === o.showFlipBtn && e.push("showFlipBtn=" + o.showFlipBtn), "true" === o.proShowMenu && e.push("proShowMenu=" + o.proShowMenu), "true" === o.proShowSidebar && e.push("proShowSidebar=" + o.proShowSidebar), "true" === o.flip.autoFlip && (e.push("autoFlip=" + o.flip.autoFlip), o.flip.autoFlipTime && e.push("autoFlipTime=" + o.flip.autoFlipTime)), o.startingPage > 1 && e.push("pageNumber=" + o.startingPage), o.logo.url && (e.push("logo=" + encodeURIComponent(o.logo.url)), o.logo.left && e.push("logoOffsetX=" + o.logo.left), o.logo.top && e.push("logoOffsetY=" + o.logo.top)), o.document.id && e.push("documentId=" + o.document.id), o.document.name && e.push("docName=" + o.document.name), o.document.username && e.push("username=" + o.document.username), o.document.title && e.push("loadingInfoText=" + encodeURIComponent(o.document.title)), e.push("et=" + (new Date).getTime()), e.push("er=" + Math.floor(100 * Math.random())), e.join("&")
        },
        s = function() {
            var e = [];
            return o.document.id && e.push("documentId=" + o.document.id), o.colorOrTheme.theme && e.push("layout=" + encodeURIComponent(o.colorOrTheme.theme)), o.colorOrTheme.backgroundColor && e.push("backgroundColor=" + o.colorOrTheme.backgroundColor), e.join("&")
        },
        l = function(e) {
            var t = [];
            return "presentation" === o.layout && t.push("viewmode=" + o.layout), o.colorOrTheme.theme && t.push("layout=" + encodeURIComponent(o.colorOrTheme.theme)), o.colorOrTheme.backgroundColor && t.push("backgroundcolor=" + o.colorOrTheme.backgroundColor), "true" === o.showFlipBtn && t.push("showflipbtn=" + o.showFlipBtn), "true" === o.proShowMenu && t.push("proshowmenu=" + o.proShowMenu), "true" === o.proShowSidebar && t.push("proshowsidebar=" + o.proShowSidebar), "true" === o.flip.autoFlip && (t.push("autoflip=" + o.flip.autoFlip), o.flip.autoFlipTime && t.push("autofliptime=" + o.flip.autoFlipTime)), o.startingPage > 1 && t.push("pagenumber=" + o.startingPage), o.logo.url && (t.push("logo=" + encodeURIComponent(o.logo.url)), o.logo.left && t.push("logooffsetx=" + o.logo.left), o.logo.top && t.push("logooffsety=" + o.logo.top)), o.document.id && t.push("documentid=" + o.document.id), o.document.name && t.push("docname=" + o.document.name), o.document.username && t.push("username=" + o.document.username), o.document.title && t.push("loadinginfotext=" + encodeURIComponent(o.document.title)), "true" === e && (t.push("showhtmllink=true"), o.document.tag && t.push("tag=" + encodeURIComponent(o.document.tag))), t.push("width=" + o.size.w), t.push("height=" + o.size.h), t.push("unit=" + o.size.unit), t.join(" ")
        },
        c = function() {
            var e = [];
            return "magazine" === o.layout ? e.push("singlePage: false") : "presentation" === o.layout && e.push("singlePage: true"), o.colorOrTheme.theme && e.push('layout: "' + encodeURIComponent(o.colorOrTheme.theme) + '"'), o.colorOrTheme.backgroundColor && e.push('backgroundColor: "' + o.colorOrTheme.backgroundColor + '"'), "true" === o.flip.autoFlip && e.push("autoFlip: true"), o.startingPage > 1 && e.push("startOnPage: " + o.startingPage), o.document.id && e.push('documentId: "' + o.document.id + '"'), o.document.name && e.push('docName: "' + o.document.name + '"'), o.document.username && e.push('userName: "' + o.document.username + '"'), o.document.title && e.push('loadingInfoText: "' + encodeURIComponent(o.document.title) + '"'), e.join()
        },
        u = function() {
            var e = "http://" + i.getDomain() + "/" + o.document.username + "/docs/" + o.document.name;
            o.startingPage > 1 && (e += "/" + o.startingPage);
            var t = ["mode=a_p"];
            return "width" === o.fitTo ? t.push("wmode=0") : "height" === o.fitTo && t.push("wmode=1"), e + "?" + t.join("&")
        },
        d = function() {
            var e = "http://" + i.getDomain() + "/" + o.document.username + "/docs/" + o.document.name,
                t = ["mode=embed"];
            return "presentation" === o.layout && t.push("viewMode=" + o.layout), o.colorOrTheme.theme && t.push("layout=" + encodeURIComponent(o.colorOrTheme.theme)), o.colorOrTheme.backgroundColor && t.push("backgroundColor=" + o.colorOrTheme.backgroundColor), "true" === o.showFlipBtn && t.push("showFlipBtn=" + o.showFlipBtn), "true" === o.proShowMenu && t.push("proShowMenu=" + o.proShowMenu), "true" === o.proShowSidebar && t.push("proShowSidebar=" + o.proShowSidebar), "true" === o.flip.autoFlip && (t.push("autoFlip=" + o.flip.autoFlip), o.flip.autoFlipTime && t.push("autoFlipTime=" + o.flip.autoFlipTime)), o.startingPage > 1 && t.push("pageNumber=" + o.startingPage), o.logo.url && (t.push("logo=" + encodeURIComponent(o.logo.url)), o.logo.left && t.push("logoOffsetX=" + o.logo.left), o.logo.top && t.push("logoOffsetY=" + o.logo.top)), e + "?" + t.join("&")
        },
        p = function() {
            return a.flashReaderUrl(1)
        },
        h = function() {
            var e = '<a href="' + d() + '" target="_blank">Open publication</a> - Free <a href="http://' + i.getDomain() + '" target="_blank">publishing</a>' + (o.document.tag ? ' - <a href="http://' + i.getDomain() + "/search?q=" + encodeURIComponent(o.document.tag) + '" target="_blank">More ' + o.document.tag + "</a>" : "");
            return e
        },
        f = function(e) {
            return e.replace(/&/g, "&amp;")
        },
        m = function(e) {
            var t = ("true" === e ? '<p style="visibility:visible;">' : "") + '<object type="application/x-shockwave-flash" data="' + p() + '" width="' + o.size.w + '" height="' + o.size.h + '" style="width:' + o.size.w + "px;height:" + o.size.h + 'px"><param name="movie" value="' + p() + '" /><param name="quality" value="high" /><param name="scale" value="noscale" /><param name="salign" value="l /><param name="allowfullscreen" value="true /><param name="allowscriptaccess" value="always"/><param name="menu" value="false" /><param name="flashvars" value="' + r() + '" /></object>' + ("true" === e ? "<p>" + h() + "</p></p>" : "");
            return f(t)
        },
        g = function(e) {
            var t = ("true" === e ? "<div>" : "") + '<embed src="' + p() + '" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" menu="false" quality="high" scale="noscale" salign="l" flashvars="' + r() + '" width="' + o.size.w + '" height="' + o.size.h + '" name="flashticker" align="middle"/>' + ("true" === e ? '<div style="width:' + o.size.w + 'px;text-align:left;">' + h() + "</div></div>" : "");
            return f(t)
        },
        v = function(e) {
            var t = ("true" === e ? "<div>" : "") + '<embed src="' + p() + '" type="application/x-shockwave-flash" allowscriptaccess="always" flashvars="' + r() + '" style="width:' + o.size.w + o.size.unit + ";height:" + o.size.h + o.size.unit + '"></embed>' + ("true" === e ? '<div style="width:' + o.size.w + o.size.unit + ';text-align:left;">' + h() + "</div></div>" : "");
            return f(t)
        },
        b = function(e) {
            var t = ("true" === e ? "<div>" : "") + '<embed src="' + p() + '" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" menu="false" quality="high" scale="noscale" salign="l" flashvars="' + r() + '" style="width:' + o.size.w + o.size.unit + ";height:" + o.size.h + o.size.unit + '" name="flashticker" align="middle"></embed>' + ("true" === e ? '<div style="width:' + o.size.w + o.size.unit + ';text-align:left;">' + h() + "</div></div>" : "");
            return f(t)
        },
        w = function(e) {
            return y(e)
        },
        y = function(e) {
            var t = ("true" === e ? "<div>" : "") + '<embed src="' + p() + '" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" menu="false" quality="high" scale="noscale" salign="l" flashvars="' + r() + '" style="width:' + o.size.w + o.size.unit + ";height:" + o.size.h + o.size.unit + '" name="flashticker" align="middle"/>' + ("true" === e ? '<div style="width:' + o.size.w + o.size.unit + ';text-align:left;">' + h() + "</div></div>" : "");
            return f(t)
        },
        k = function(e) {
            var t = "[issuu " + l(e) + "]";
            return f(t)
        },
        _ = function(e) {
            return k(e)
        },
        x = function(e) {
            var t = "{" + c() + "}";
            return f(t)
        },
        C = function() {
            return "http://" + i.urlBase("api") + "/facebook/issuuviewer/add?" + s()
        },
        A = function(e) {
            var t = r(),
                n = ("true" === e ? "<div>" : "") + '<object style="width:' + o.size.w + o.size.unit + ";height:" + o.size.h + o.size.unit + '"><param name="movie" value="' + p() + "?" + t + '" /><param name="allowfullscreen" value="true"/><param name="menu" value="false"/><param name="allowscriptaccess" value="always"/><embed src="' + p() + '" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" menu="false" style="width:' + o.size.w + o.size.unit + ";height:" + o.size.h + o.size.unit + '" flashvars="' + t + '" /></object>' + ("true" === e ? '<div style="width:' + o.size.w + o.size.unit + ';text-align:left;">' + h() + "</div></div>" : "");
            return f(n)
        },
        E = function() {
            return '<iframe src="' + u() + '" width="' + o.size.w + o.size.unit + '" height="' + o.size.h + o.size.unit + '"></iframe>'
        },
        I = {
            getEmbedCode: function() {
                if ("magazine" !== o.layout && "presentation" !== o.layout) return E();
                switch (o.service) {
                    case "html":
                        return A(o.showHtmlLink);
                    case "blogger":
                        return b(o.showHtmlLink);
                    case "orkut":
                        return v(o.showHtmlLink);
                    case "myspace":
                        return m(o.showHtmlLink);
                    case "facebook":
                        return C(o.showHtmlLink);
                    case "wordpress":
                        return k(o.showHtmlLink);
                    case "friendster":
                        return g(o.showHtmlLink);
                    case "typepad":
                        return y(o.showHtmlLink);
                    case "livejournal":
                        return w(o.showHtmlLink);
                    case "joomla":
                        return _(o.showHtmlLink);
                    case "google":
                        return x(o.showHtmlLink);
                    default:
                        return A(o.showHtmlLink)
                }
            },
            getPreviewEmbedCode: function() {
                if ("magazine" !== o.layout && "presentation" !== o.layout) return E();
                switch (o.service) {
                    case "html":
                        return A("false");
                    case "blogger":
                        return b("false");
                    case "orkut":
                        return v("false");
                    case "myspace":
                        return m("false");
                    case "facebook":
                        return C("false");
                    case "wordpress":
                        return k("false");
                    case "friendster":
                        return g("false");
                    case "typepad":
                        return y("false");
                    case "livejournal":
                        return w("false");
                    case "joomla":
                        return _("false");
                    case "google":
                        return x("false");
                    default:
                        return A("false")
                }
            },
            getUrl: function() {
                return "magazine" !== o.layout && "presentation" !== o.layout ? u() : d()
            },
            set: function(e) {
                o.service = e.service, o.showHtmlLink = e.textBelow, o.layout = e.layout, o.size.w = e.w, o.size.h = e.h, o.size.unit = e.unit, o.colorOrTheme.backgroundColor = e.backgroundColor, o.colorOrTheme.theme = e.theme, o.fitTo = e.fitTo, o.showFlipBtn = e.showFlipBtn, o.proShowMenu = e.proShowMenu, o.proShowSidebar = e.proShowSidebar, o.flip.autoFlip = e.autoFlip, o.flip.autoFlipTime = e.autoFlipTime, o.startingPage = e.startingPage, o.logo.url = e.logoUrl, o.logo.top = e.logoTop, o.logo.left = e.logoLeft, o.document.id = e.id, o.document.username = e.username, o.document.name = e.name, o.document.title = e.title, o.document.tag = e.textBelowTag
            }
        };
    e.exports = I
}, function(e, t, n) {
    "use strict";
    var i, a, o, r, s, l, c, u, d, p, h, f, m, g = n(4),
        v = n(6),
        b = n(231),
        w = n(5),
        y = [],
        k = !1,
        x = function(e) {
            f ? e(f) : b.getLicences(K().publicationId, function(t) {
                f = t || [], e(f)
            })
        },
        C = function(e) {
            m ? e(m) : h ? b.getRemainingDownloads(h.id, function(t) {
                m = t || null, e(m)
            }) : A(function() {
                b.getRemainingDownloads(h.id, function(t) {
                    m = t || null, e(m)
                })
            })
        },
        A = function(e) {
            h ? e(h) : b.getUser(g.getUsername(), function(t) {
                h = t.user, e(h)
            })
        },
        E = function() {
            f = null
        },
        I = function(e, t) {
            r = {}, b.listEmbedStyles(e, function(e) {
                var n = e.result._content;
                y = [], $.each(n, function(e, t) {
                    var n = {
                        embedStyleId: t.style.id,
                        title: t.style.title,
                        showArchive: t.style.showArchive || !1,
                        showArchiveLink: t.style.showArchiveLink || !1,
                        showShareMenu: t.style.showShareMenu || !1,
                        embedBGColor: t.style.bgColor || "",
                        embedBGImage: t.style.bgImage || "",
                        embedBGImagePos: t.style.bgImagePos,
                        embedFSColor: t.style.fsColor || "",
                        showPrintButton: t.style.printButton || !1,
                        showShareButton: t.style.shareButton || !1,
                        showSearchButton: t.style.searchButton || !1,
                        autoFlip: t.style.autoFlip || !1,
                        viewMode: t.style.viewMode,
                        linkTarget: t.style.linkTarget,
                        readerTheme: "default" !== t.style.theme ? t.style.theme : "",
                        readerLayout: t.style.layout || "",
                        readerLogo: t.style.logo || "",
                        updated: t.style.updated,
                        created: t.style.created,
                        showClippings: "undefined" != typeof t.style.showClippings ? t.style.showClippings : !0
                    };
                    y[e] = n, r[n.embedStyleId] = y[e]
                }), t && t(y)
            })
        },
        S = function(e) {
            var t = [];
            l = {}, b.listEmbeds(K(), function(n) {
                var i = n.result._content;
                s = [], $.each(i, function(e, n) {
                    var i = {
                        id: n.embed.id,
                        userId: n.embed.userId,
                        updated: n.embed.updated || n.embed.created,
                        created: n.embed.created,
                        readerStartPage: n.embed.page,
                        width: n.embed.width,
                        height: n.embed.height,
                        embedStyleId: n.embed.embedStyleId || "",
                        documentId: d.documentId,
                        style: null
                    };
                    s[e] = i, l[i.id] = s[e], i.embedStyleId && t.push(i.embedStyleId)
                }), t.length ? I(t, function() {
                    $.each(s, function(e, t) {
                        t.style = r[t.embedStyleId] || null
                    }), e && e(s)
                }) : e && e(s)
            })
        },
        D = function(e, t) {
            var n = c;
            l = l || {}, s = s || [];
            var i = {
                id: e.id,
                userId: e.userId,
                updated: e.updated,
                created: e.created,
                readerStartPage: e.page,
                width: e.width,
                height: e.height,
                embedStyleId: e.embedStyleId || "",
                documentId: d.documentId,
                style: null
            };
            s.push(i), l[i.id] = s[s.length - 1], n && !r[n] ? I([n], function() {
                $.each(s, function(e, t) {
                    t.style = r[t.embedStyleId] || null
                }), t && t(s)
            }) : t && (n && (s[s.length - 1].style = y[r[n]]), t(s))
        },
        T = function(e) {
            i = $.extend({}, r[e]), o.embedStyleId = e
        },
        P = function(e) {
            o = $.extend({}, l[e]), u = e, l[e].style ? i = $.extend({}, l[e].style) : R()
        },
        O = function() {
            return i
        },
        R = function() {
            i = {
                embedStyleId: "",
                title: "",
                showArchive: !1,
                showArchiveLink: !0,
                showShareMenu: !0,
                embedBGColor: "",
                embedBGImage: "",
                embedBGImagePos: "topleft",
                embedFSColor: "",
                showPrintButton: !1,
                showShareButton: !0,
                showSearchButton: !0,
                autoFlip: !1,
                viewMode: 1 === d.pageCount ? "singlePage" : "doublePage",
                linkTarget: "new",
                readerTheme: "default",
                readerLayout: "",
                readerLogo: "",
                showClippings: !0
            }
        },
        F = function() {
            return y
        },
        N = function() {
            return o
        },
        L = function() {
            return s
        },
        M = function() {
            o = {
                id: "",
                documentId: d.documentId,
                embedStyleId: i && i.embedStyleId ? i.embedStyleId : "",
                readerStartPage: 1,
                userId: 0,
                width: 525,
                height: 375
            }
        },
        U = function() {
            E(), d = null, p = null, u = null
        },
        B = function() {
            var e = v.urlBase("e").replace(/https?:\/\//, "").replace(/\/*$/, ""),
                t = n(308)({
                    userId: o.userId,
                    embedId: o.id,
                    width: o.width,
                    height: o.height,
                    domain: e
                });
            return t
        },
        H = function() {
            var e = v.urlBase("e").replace(/https?:\/\//, "").replace(/\/*$/, ""),
                t = n(309)({
                    width: o.width,
                    height: o.height,
                    domain: e,
                    userId: o.userId,
                    embedId: o.id
                });
            return t
        },
        j = function() {
            var e = z(),
                t = n(310)({
                    showArchiveLink: a.showArchiveLink || !_.contains(f, "brandpackage"),
                    width: a.width,
                    height: a.height,
                    flashvars: e,
                    viewerUrl: V(),
                    linksHtml: Y(),
                    allowscriptaccess: "always"
                });
            return t
        },
        z = function(e) {
            var t = ["mode=mini"];
            return "doublePage" === i.viewMode || "undefined" == typeof i.viewMode || t.push("viewMode=" + i.viewMode), i.autoFlip === !1 || "undefined" == typeof i.autoFlip || t.push("autoFlip=" + i.autoFlip), i.embedBGColor && t.push("embedBackground=" + encodeURIComponent(i.embedBGColor)), 1 === o.readerStartPage || t.push("pageNumber=" + o.readerStartPage), i.showShareMenu === !0 || -1 === $.inArray("brandpackage", f) ? t.push("shareMenuEnabled=true") : t.push("shareMenuEnabled=false"), i.showArchive === !1 || "undefined" == typeof i.showArchive || t.push("proSidebarEnabled=true"), i.showPrintButton === !0 ? t.push("printButtonEnabled=true") : t.push("printButtonEnabled=false"), i.showShareButton === !0 ? t.push("shareButtonEnabled=true") : t.push("shareButtonEnabled=false"), i.showSearchButton === !0 || t.push("searchButtonEnabled=false"), i.showClippings === !0 ? t.push("clippingEnabled=true") : t.push("clippingEnabled=false"), "new" === i.linkTarget || t.push("linkTarget=_blank"), i.embedFSColor && t.push("backgroundColor=" + encodeURIComponent(i.embedFSColor)), "default" === i.readerTheme || t.push("theme=" + i.readerTheme), i.embedBGImage && t.push("backgroundImage=" + encodeURIComponent(i.embedBGImage)),
                i.embedBGImagePos === !1 || "undefined" == typeof i.embedBGImagePos || "stretch" !== i.embedBGImagePos || t.push("backgroundStretch=true"), i.readerLayout && t.push("layout=" + encodeURIComponent(i.readerLayout)), i.readerLogo && t.push("logo=" + encodeURIComponent(i.readerLogo)), "undefined" == typeof d.documentId || t.push("documentId=" + d.documentId), k && t.push("callToActionEnabled=true"), i.showClippings || t.push("showClippings=false"), /^\/home\/docs\/\S+\/edit\/embed$/.test(location.pathname) && (t.push("jsInternalCallback=jsEmbedPreviewCallback"), t.push("jsAPIClientDomain=" + location.host)), t.join("&")
        },
        W = function() {
            return "http://" + v.getDomain() + "/" + d.username + "/docs/" + d.name
        },
        G = function() {
            var e = "http://" + v.getDomain() + "/" + d.username + "/docs/" + d.name;
            o.readerStartPage > 1 && (e += "/" + o.readerStartPage);
            var t = [];
            return t.push("e=" + o.userId + "/" + o.id), e + "?" + t.join("&")
        },
        V = function() {
            return d.isProcessing ? w.flashPreviewerUrl() : w.flashReaderUrl(2)
        },
        Y = function() {
            var e = '<a href="' + W() + '" target="_blank">Open publication</a> - Free <a href="http://' + v.getDomain() + '" target="_blank">publishing</a>';
            return e
        },
        q = function(e) {
            a = e
        },
        X = function(e) {
            d = e.doc || {}, p = e.user || {}, k = e.callToActionEnabled ? !0 : !1
        },
        K = function() {
            return d
        },
        Q = function() {
            return p
        };
    e.exports = {
        getEmbedCode: B,
        getIFrameEmbedCode: H,
        getPreviewEmbedCode: j,
        getUrl: G,
        set: function(e) {
            var t;
            for (t in e.style) i[t] = e.style[t];
            for (t in e.embed) o[t] = e.embed[t]
        },
        get: function() {
            return {
                style: i,
                embed: o
            }
        },
        resetStyle: R,
        resetEmbed: M,
        resetLicences: E,
        reset: U,
        loadStyles: I,
        loadEmbeds: S,
        addEmbed: D,
        getStyleList: F,
        getEmbedList: L,
        selectStyle: T,
        selectEmbed: P,
        setPreview: q,
        initDocAndUser: X,
        getDoc: K,
        getUser: Q,
        createEmbed: function(e) {
            b.createEmbed(N(), function(t) {
                u = t.embed.id, g.isLoggedIn() || (o.id = t.embed.id, o.userId = t.embed.userId || 0), e && e(t.embed)
            })
        },
        updateEmbed: function(e) {
            var t = N();
            $.extend(l[t.id], t), l[t.id].style = O(), b.updateEmbed(t, function(t) {
                u = t.embed.id, e && e(t)
            })
        },
        deleteEmbed: function(e, t) {
            b.deleteEmbed(e, function(n) {
                e === u && (u = null), t && t(n)
            })
        },
        createStyle: function(e) {
            b.createEmbedStyle(O(), function(t) {
                var n = t.style;
                c = n.id, o.embedStyleId = c, r = r || {}, y = y || [];
                var i = {
                    embedStyleId: n.id,
                    title: n.title,
                    showArchive: n.showArchive || !1,
                    showArchiveLink: n.showArchiveLink || !1,
                    showShareMenu: n.showShareMenu || !1,
                    embedBGColor: n.bgColor || "",
                    embedBGImage: n.bgImage || "",
                    embedBGImagePos: n.bgImagePos,
                    embedFSColor: n.fsColor || "",
                    showPrintButton: n.printButton || !1,
                    showShareButton: n.shareButton || !1,
                    showSearchButton: n.searchButton || !1,
                    autoFlip: n.autoFlip || !1,
                    viewMode: n.viewMode,
                    linkTarget: n.linkTarget,
                    readerTheme: "default" !== n.theme ? i.style.theme : "",
                    readerLayout: n.layout || "",
                    readerLogo: n.logo || "",
                    updated: n.updated,
                    created: n.created,
                    showClippings: n.showClippings
                };
                y.push(i), r[i.embedStyleId] = y.length - 1, e && e(t)
            })
        },
        updateStyle: function(e) {
            var t = O();
            $.extend(r[t.embedStyleId], t), b.updateEmbedStyle(t, function(t) {
                c = t.style.id, e && e(t)
            })
        },
        getSelectedStyleId: function() {
            return c
        },
        getSelectedEmbedId: function() {
            return u
        },
        loadLicences: x,
        loadUserinfo: A,
        remainingDownloads: C,
        allowClipsCustomization: function() {
            return b.allowClipsCustomization()
        }
    }
}, function(e, t, n) {
    "use strict";

    function i(e) {
        "function" == typeof e && e()
    }

    function a(e, t) {
        $("#explicitwarning").html(n(311)({
            okBtnEnabled: r.isLoggedIn(),
            loginBtnEnabled: !r.isLoggedIn()
        })), $("#explicitwarning").css("display", "block"), $("#explicitwarning .explicit-accept").bind("click", function(e) {
            e.preventDefault(), $("#explicitwarning").css("display", "none"), i(t)
        }), $("#explicitwarning .explicit-login").bind("click", function(e) {
            e.preventDefault(), s.showSignin({
                onLoginSuccess: function() {
                    location.href = location.href
                },
                createAccountReturnUrl: location.href
            })
        }), $("#explicitwarning .explicit-signup").bind("click", function(e) {
            e.preventDefault(), location.href = "/signup"
        })
    }

    function o(e, t) {
        n(7).create({
            action: "issuu.user.get",
            isReadOnly: !0
        }).parameters({
            profileUsername: r.getUsername()
        }).call().then(function(n) {
            n.user.explicit ? i(t) : a(e, t)
        }, function() {
            a(e, t)
        })
    }
    var r = n(4),
        s = (n(6), n(72));
    t.create = function(e, t) {
        return "1" !== e.contentFlag ? void i(t) : void(r.isLoggedIn() ? r.getUsername().toLowerCase() === e.username.toLowerCase() ? i(t) : o(e, t) : a(e, t))
    }
}, function(e, t, n) {
    "use strict";
    var i = n(271),
        a = n(253),
        o = n(13),
        r = n(258),
        s = n(2),
        l = n(264),
        c = n(76),
        u = n(10),
        d = n(261),
        p = n(260),
        h = n(262),
        f = n(166);
    t.create = function(e) {
        function t() {
            var e = r.create(n.connector);
            return $.when(e.init(), n.viewPort.promise(), n.features.init(n.connector)).then(function() {
                return e
            }, function() {
                n.broadcast(o.ERROR, o.create.ERROR("apiError", void 0, !0))
            })
        }
        var n = s.installTo({
            options: e,
            viewPort: null,
            model: null,
            view: null,
            connector: e.connector,
            features: e.features
        });
        return function() {
            n.viewPort = i.create(n), l.create(n, e.root), c.create(n), p.create(n), h.create(n), t().done(function(e) {
                var t = "tracking." + e.getData().publicationId + ".",
                    i = u.create(t, u.TYPES.LOCAL),
                    r = f.parse(document.location.search),
                    s = null,
                    l = null;
                i.has("stream-origin") && i.has("stream-ranking") ? (s = i.get("stream-origin"), l = i.get("stream-ranking")) : r.streamOrigin && r.streamRanking && (s = r.streamOrigin.split(";"), l = parseInt(r.streamRanking, 10)), r.streamRanking = void 0, r.streamOrigin = void 0, history.replaceState && history.replaceState(void 0, void 0, document.location.pathname + f.format(r)), d.create(n), a.create(n, e).start();
                var c = _.map(n.model.getCurrentPages(), function(e) {
                    return e + 1
                });
                n.broadcast(o.DOCUMENT_LOADED, {
                    revisionId: e.getData().revisionId,
                    publicationId: e.getData().publicationId,
                    publicationName: e.getData().docname,
                    ownerUsername: e.getData().publisher,
                    pages: c,
                    pageNumber: c[0],
                    isFullscreen: !1,
                    isEmbed: !1,
                    streamOrigin: s,
                    streamRanking: l
                })
            })
        }(), n
    }
}, function(e, t, n) {
    "use strict";
    var i = n(237),
        a = n(247);
    t.create = function(e) {
        return e.connector = a.create(_.pick(e, "username", "docname", "embedId")), e.embedId ? e.features = n(246).create() : e.features = n(245).create(), i.create(e)
    }
}, function(e, t, n) {
    "use strict";
    var i = n(1),
        a = n(90),
        o = n(13),
        r = n(16).carousel;
    t.create = function(e, t) {
        function s(e) {
            y = e
        }

        function l() {
            for (var e = _.getElement(), t = 0, n = k.length; n > t; t++) k[t].addToDom(e)
        }

        function c(e) {
            w(e), l()
        }

        function u(e) {
            return {
                x: e * (y.getWidth() + r.itemSpacing),
                y: 0
            }
        }

        function d() {
            var e = b.getModel().getDisplays();
            e.length !== k.length && i.error(new Error("The number of displays and their config don t match"));
            for (var t, n, a, o = 0, r = e.length; r > o; o++) t = k[o], n = e[o], t.isNewContent(n) && (t.setContent(n), a = u(n.block), t.setPosition(a.x, a.y));
            var s = b.getModel().getOnScreenDisplays();
            h(s.afterCache), h(s.beforeCache), p(s.focus), p(s.after), p(s.before)
        }

        function p(e) {
            for (var t = 0, n = e.length; n > t; t++) k[e[t]].show()
        }

        function h(e) {
            for (var t = 0, n = e.length; n > t; t++) k[e[t]].hide()
        }

        function f(e, t, n) {
            var i = u(t).x;
            i !== x.x && (x.x = i, m(e, void 0, n))
        }

        function m(e, t, n) {
            t && (x.y += t.y || 0, x.x -= t.x || 0), void 0 !== e && b.broadcast(o.PAGE_CHANGE_ANIM_START), _.animateTo(-1 * x.x, x.y, e, function() {
                b.broadcast(o.PAGE_CHANGE_ANIM_END), n && n()
            })
        }

        function g() {
            for (var e = 0, t = k.length; t > e; e++) k[e].render()
        }

        function v() {
            return k
        }
        var b, w, y, k = [],
            _ = a.create(),
            x = {
                x: 0,
                y: 0
            };
        return function() {
            (isNaN(t) || 1 > t) && i.error(new Error("The carousel needs at least one page.")), b = e, _.setElement('<div class="issuu-carousel"></div>'), k = [];
            for (var a = n(89).get().pageView, o = 0, r = t; r > o; o++) k.push(a.create(b));
            w = _.addToDom, _.addToDom = c, _.onViewportChange = s, _.updateDisplays = d, _.updatePositions = m, _.animateToPage = f, _.render = g, _.getDisplays = v
        }(), _
    }
}, function(e, t, n) {
    "use strict";

    function i(e) {
        function t(t, n) {
            var i = n.getContent();
            i && l.addTask({
                stack: t,
                url: i.lowResImg.zoomLevel.url,
                onLoad: function(e) {
                    n.onLowResLoad(e)
                },
                onError: function(t) {
                    e.broadcast(o.ERROR, o.create.ERROR("image-load", t.url, !1))
                }
            })
        }

        function n(e, t) {
            var n = t.getContent();
            n && l.addTask({
                stack: e,
                url: n.hiResImg.zoomLevel.url,
                onLoad: function(e) {
                    t.onHighResLoad(e)
                }
            })
        }

        function i() {
            l.stop(), l.reset()
        }

        function r() {
            l.start()
        }

        function s(e, o) {
            i(), _.each(e.focus, function(e, i) {
                t(a.stack.FOCUS_LOW_RES, o[e]), n(a.stack.FOCUS_HIGH_RES, o[e])
            }), _.each(e.after.concat(e.before), function(e, i) {
                t(a.stack.SURROUNDING_LOW_RES, o[e]), n(a.stack.SURROUNDING_HIGH_RES, o[e])
            }), _.each(e.afterCache.concat(e.beforeCache), function(e, i) {
                t(a.stack.FURTHER_SURROUNDING_LOW_RES, o[e]), n(a.stack.FURTHER_SURROUNDING_HIGH_RES, o[e])
            }), r()
        }
        var l;
        return function() {
            l = a.create()
        }(), {
            onFocusChange: s,
            stopLoading: i
        }
    }
    var a = n(241),
        o = n(13);
    e.exports.create = i
}, function(e, t) {
    "use strict";
    var n = {
        FOCUS_LOW_RES: "FOCUS_LOW_RES",
        FOCUS_HIGH_RES: "FOCUS_HIGH_RES",
        SURROUNDING_LOW_RES: "SURROUNDING_LOW_RES",
        SURROUNDING_HIGH_RES: "SURROUNDING_HIGH_RES",
        FURTHER_SURROUNDING_LOW_RES: "FURTHER_SURROUNDING_LOW_RES",
        FURTHER_SURROUNDING_HIGH_RES: "FURTHER_SURROUNDING_HIGH_RES"
    };
    t.stack = n, t.create = function() {
        function e() {
            var e = d.length;
            return Math.min(Math.max(0, Math.floor((e - 2) / 10)) + 2, m)
        }

        function t(e) {
            var t, n = d.length;
            for (t = 0; n > t; t++)
                if (d[t].stack === e) return t;
            return -1
        }

        function i() {
            if (h && 0 !== d.length && !(p.length >= e())) {
                var i = t(n.FOCUS_LOW_RES);
                if (-1 === i && (i = t(n.FOCUS_HIGH_RES)), -1 === i && (i = t(n.SURROUNDING_LOW_RES)), -1 === i && (i = t(n.FURTHER_SURROUNDING_LOW_RES)), -1 === i && (i = t(n.SURROUNDING_HIGH_RES)), -1 !== i) {
                    var o = d.splice(i, 1)[0];
                    p.push(o);
                    var s = new Image;
                    s.onload = function() {
                        var e = p.indexOf(o); - 1 !== e && (p.splice(e, 1), o.onLoad && o.onLoad(this), a())
                    }, s.onerror = function() {
                        var e = p.indexOf(o); - 1 !== e && (p.splice(e, 1), isNaN(o.retryCount) ? o.retryCount = 1 : o.retryCount++, o.retryCount >= f ? (o.onError && o.onError(o), a()) : r(o, 4))
                    }, window.setTimeout(function() {
                        s.src = o.url
                    }, 0), a()
                }
            }
        }

        function a() {
            u || (u = window.requestAnimationFrame(function() {
                u = void 0, i()
            }))
        }

        function o() {
            u && (window.cancelAnimationFrame(u), u = void 0)
        }

        function r(e, t) {
            isNaN(t) ? d.push(e) : d.splice(t, 0, e), a()
        }

        function s() {
            h = !0, a()
        }

        function l() {
            h = !1, o()
        }

        function c() {
            h = !1, d = [], p = []
        }
        var u, d = [],
            p = [],
            h = !1,
            f = 3,
            m = 1e3;
        return {
            addTask: r,
            start: s,
            stop: l,
            reset: c
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = (n(16).carousel, n(33)),
        a = n(243),
        o = n(240),
        r = n(13);
    t.create = function(e) {
        function t() {
            d(), C.animateToPage(void 0, x.getFocusBlock()), A.onFocusChange(x.getOnScreenDisplays(), C.getDisplays())
        }

        function s() {
            A.stopLoading(), x.onViewportChange(), C.onViewportChange(D.viewPort), t()
        }

        function l() {
            return C
        }

        function c() {
            return x
        }

        function u(e) {
            C.updateDisplays(), C.animateToPage(e, x.getFocusBlock(), function() {
                C.render(), A.onFocusChange(x.getOnScreenDisplays(), C.getDisplays())
            })
        }

        function d() {
            x.setFocus(D.model.getCurrentPages()[0]), C.updateDisplays(), C.render()
        }

        function p(e) {
            x.setFocus(D.model.getCurrentPages()[0]), u(e || "softstart")
        }

        function h(e) {
            T = !0;
            var t = D.model.getPageBlock(D.model.getCurrentPages()[0]);
            C.animateToPage(e || "softstart", t, f)
        }

        function f() {
            T && (x.setFocus(D.model.getCurrentPages()[0]), C.updateDisplays(), E || (E = window.requestAnimationFrame(function() {
                E = null, C.render(), A.onFocusChange(x.getOnScreenDisplays(), C.getDisplays())
            })), T = !1)
        }

        function m() {
            E && (window.cancelAnimationFrame(E), E = null)
        }

        function g(e) {
            C.show();
            var t = D.model.getNextPage();
            t >= 0 && D.model.setCurrentPage(t), h(e)
        }

        function v(e) {
            C.show();
            var t = D.model.getPreviousPage();
            t >= 0 && D.model.setCurrentPage(t), h(e)
        }

        function b(e) {
            D.model.isPageValid(e) && (C.show(), D.model.setCurrentPage(e), x.setFocus(D.model.getCurrentPages()[0]), A.onFocusChange(x.getOnScreenDisplays(), C.getDisplays()), C.updateDisplays(), window.setTimeout(p, 200))
        }

        function w() {
            I && (window.cancelAnimationFrame(I), I = void 0)
        }

        function y() {
            I || (I = window.requestAnimationFrame(function() {
                C.updatePositions("instant", {
                    y: 0,
                    x: S
                }), I = void 0
            }))
        }

        function k(e, t) {
            var n = !1;
            switch (e) {
                case i.event.DOWN:
                    A.stopLoading(), f(), m();
                    break;
                case i.event.UP:
                    w(), Math.abs(t.startX - t.endX) >= D.viewPort.getWidth() / 2 ? t.startX - t.endX > 0 ? x.getFocusBlock() < x.getBlockCount() ? g("softstart") : u("softstart") : x.getFocusBlock() > 0 ? v("softstart") : u("softstart") : u("softstart");
                    break;
                case i.event.FLING:
                    w(), window.requestAnimationFrame(function() {
                        t.direction !== i.direction.UP && t.direction !== i.direction.DOWN ? t.distanceX < 0 ? g("runningstart") : v("runningstart") : u("softstart")
                    }), n = !0;
                    break;
                case i.event.SCROLL:
                    var a = t.distanceX;
                    t.startX - t.endX > 0 ? x.getFocusBlock() >= x.getBlockCount() && (a /= 2) : x.getFocusBlock() <= 0 && (a /= 2), S = a, y(), n = !0
            }
            return n
        }

        function _() {
            A.stopLoading()
        }
        var x, C, A, E, I, S, D = e,
            T = !1;
        return function() {
            var e = {
                getView: l,
                getModel: c,
                broadcast: D.broadcast
            };
            x = a.create(e, D.model);
            var t = n(89).get().carouselView;
            C = t.create(e, x.getDisplayCount()), C.onViewportChange(D.viewPort), A = o.create(e), D.subscribe(r.GOTO_PAGE, b), D.subscribe(r.GOTO_NEXTPAGE, g), D.subscribe(r.GOTO_PREVIOUSPAGE, v), D.subscribe(r.DESTROY, _)
        }(), {
            getView: l,
            render: d,
            handleGesture: k,
            onViewportChange: s,
            start: t
        }
    }
}, function(e, t, n) {
    "use strict";

    function i(e, t) {
        function n(e) {
            return e % g
        }

        function i(e) {
            return {
                page: e,
                block: t.getPageBlock(e),
                hiResImg: t.getHighResImage(e),
                lowResImg: t.getLowResImage(e)
            }
        }

        function o(e, t, n) {
            var a = i(t);
            w[e] = a, a.block < n - 1 ? y.beforeCache.push(e) : a.block === n - 1 ? y.before.push(e) : a.block === n ? y.focus.push(e) : a.block === n + 1 ? y.after.push(e) : y.afterCache.push(e)
        }

        function r() {
            var e = Math.max(v - a.focus, 0),
                t = Math.min(e + g, b),
                i = t - g,
                r = n(i),
                s = i,
                l = c();
            y.beforeCache = [], y.before = [], y.focus = [], y.after = [], y.afterCache = [];
            for (var u = r, d = g; d > u; u++) o(u, s, l), s++;
            for (var p = 0, h = r; h > p; p++) o(p, s, l), s++
        }

        function s(e) {
            v !== e && (v = e, r())
        }

        function l() {
            r()
        }

        function c() {
            return t.getPageBlock(v)
        }

        function u(e) {
            return w[e]
        }

        function d() {
            return y
        }

        function p() {
            return w
        }

        function h() {
            return g
        }

        function f() {
            return t.getPageBlock(b - 1)
        }

        function m() {
            for (var e = [], n = 0, i = t.getPageCount(); i > n; n++) e.push(t.getHighResImage(n).dimensions);
            return e
        }
        var g, v, b, w = [],
            y = {
                beforeCache: [],
                before: [],
                focus: [],
                after: [],
                afterCache: []
            };
        return function() {
            var e = t.getCurrentPages()[0];
            g = Math.min(a.length, t.getPageCount()), b = t.getPageCount(), s(e || 0)
        }(), {
            getAllDimensions: m,
            onViewportChange: l,
            setFocus: s,
            getDisplayForPage: n,
            getPageForDisplay: u,
            getDisplays: p,
            getDisplayCount: h,
            getBlockCount: f,
            getFocusBlock: c,
            getOnScreenDisplays: d
        }
    }
    var a = n(16).carousel;
    e.exports.create = i
}, function(e, t, n) {
    "use strict";
    var i = n(90),
        a = n(16).carousel,
        o = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAkAAAEAIf8LSUNDUkdCRzEwMTL/AAAHqGFwcGwCIAAAbW50clJHQiBYWVogB9kAAgAZAAsAGgALYWNzcEFQUEwAAAAAYXBwbAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1hcHBsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALZGVzYwAAAQgAAABvZHNjbQAAAXgAAAVsY3BydAAABuQAAAA4d3RwdAAABxwAAAAUclhZWgAABzAAAAAUZ1hZWgAAB0QAAAAUYlhZWgAAB1gAAAAUclRSQwAAB2wAAAAOY2hhZAAAB3wAAAAsYlRSQwAAB2wAAAAOZ1RS/0MAAAdsAAAADmRlc2MAAAAAAAAAFEdlbmVyaWMgUkdCIFByb2ZpbGUAAAAAAAAAAAAAABRHZW5lcmljIFJHQiBQcm9maWxlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABtbHVjAAAAAAAAAB4AAAAMc2tTSwAAACgAAAF4aHJIUgAAACgAAAGgY2FFUwAAACQAAAHIcHRCUgAAACYAAAHsdWtVQQAAACoAAAISZnJGVQAAACgAAAI8emhUVwAAABYAAAJkaXRJVAAAACgAAAJ6bmJOTwAAACYAAAKia29LUgAAABYAAP8CyGNzQ1oAAAAiAAAC3mhlSUwAAAAeAAADAGRlREUAAAAsAAADHmh1SFUAAAAoAAADSnN2U0UAAAAmAAAConpoQ04AAAAWAAADcmphSlAAAAAaAAADiHJvUk8AAAAkAAADomVsR1IAAAAiAAADxnB0UE8AAAAmAAAD6G5sTkwAAAAoAAAEDmVzRVMAAAAmAAAD6HRoVEgAAAAkAAAENnRyVFIAAAAiAAAEWmZpRkkAAAAoAAAEfHBsUEwAAAAsAAAEpHJ1UlUAAAAiAAAE0GFyRUcAAAAmAAAE8mVuVVMAAAAmAAAFGGRhREsAAAAuAAAFPgBWAWEAZQBvAGIAZQD/YwBuAP0AIABSAEcAQgAgAHAAcgBvAGYAaQBsAEcAZQBuAGUAcgBpAQ0AawBpACAAUgBHAEIAIABwAHIAbwBmAGkAbABQAGUAcgBmAGkAbAAgAFIARwBCACAAZwBlAG4A6AByAGkAYwBQAGUAcgBmAGkAbAAgAFIARwBCACAARwBlAG4A6QByAGkAYwBvBBcEMAQzBDAEOwRMBD0EOAQ5ACAEPwRABD4ERAQwBDkEOwAgAFIARwBCAFAAcgBvAGYAaQBsACAAZwDpAG4A6QByAGkAcQB1AGUAIABSAFYAQpAadSgAIABSAEcAQgAggnJfaWPPj/AAUAByAG8AZgBp/wBsAG8AIABSAEcAQgAgAGcAZQBuAGUAcgBpAGMAbwBHAGUAbgBlAHIAaQBzAGsAIABSAEcAQgAtAHAAcgBvAGYAaQBsx3y8GAAgAFIARwBCACDVBLhc0wzHfABPAGIAZQBjAG4A/QAgAFIARwBCACAAcAByAG8AZgBpAGwF5AXoBdUF5AXZBdwAIABSAEcAQgAgBdsF3AXcBdkAQQBsAGwAZwBlAG0AZQBpAG4AZQBzACAAUgBHAEIALQBQAHIAbwBmAGkAbADBAGwAdABhAGwA4QBuAG8AcwAgAFIARwBCACAAcAByAG8AZgBpAGxmbpAaACAAUgBHAEIAIGPPj//wZYdO9k4AgiwAIABSAEcAQgAgMNcw7TDVMKEwpDDrAFAAcgBvAGYAaQBsACAAUgBHAEIAIABnAGUAbgBlAHIAaQBjA5MDtQO9A7kDugPMACADwAPBA78DxgOvA7sAIABSAEcAQgBQAGUAcgBmAGkAbAAgAFIARwBCACAAZwBlAG4A6QByAGkAYwBvAEEAbABnAGUAbQBlAGUAbgAgAFIARwBCAC0AcAByAG8AZgBpAGUAbA5CDhsOIw5EDh8OJQ5MACAAUgBHAEIAIA4XDjEOSA4nDkQOGwBHAGUAbgBlAGwAIABSAEcAQgAgAFAAcgBvAGYAaQBsAGkAWQBsAGX/AGkAbgBlAG4AIABSAEcAQgAtAHAAcgBvAGYAaQBpAGwAaQBVAG4AaQB3AGUAcgBzAGEAbABuAHkAIABwAHIAbwBmAGkAbAAgAFIARwBCBB4EMQRJBDgEOQAgBD8EQAQ+BEQEOAQ7BEwAIABSAEcAQgZFBkQGQQAgBioGOQYxBkoGQQAgAFIARwBCACAGJwZEBjkGJwZFAEcAZQBuAGUAcgBpAGMAIABSAEcAQgAgAFAAcgBvAGYAaQBsAGUARwBlAG4AZQByAGUAbAAgAFIARwBCAC0AYgBlAHMAawByAGkAdgBlAGwAcwBldGV4dAAAAABDb3B5cmlnaHQgMjAwrzcgQXBwbGUgSW5jLiwgYWxsIHJpZ2h0cyByZXNlcnZlZC4AWFlaIAAAAAAAAPNSAAEAAAABFs9YWVogAAAAAAAAdE0AAD3uAAAD0FhZWiAAAAAAAABadQAArHMAABc0WFlaIAAAAAAAACgaAAAVnwAAuDZjdXJ2AAAAAAAAAAEBzQAAc2YzMgAAAAAAAQxCAAAF3v//8yYAAAeSAAD9kf//+6L///2jAAAD3AAAwGwALAAAAAABAAEAAAICRAEAOw==",
        r = n(13);
    t.template = '<div class="issuu-carousel-item"></div>', t.create = function(e) {
        function n(e) {
            return void 0 === g || g.page !== e.page || g.hiResImg !== e.hiResImg || g.lowResImg !== e.lowResImg
        }

        function s() {
            return g
        }

        function l(e) {
            var t = '<img class="' + e + '" src="' + o + '">';
            return t
        }

        function c() {
            var e = "";
            return e += l("low"), e += l("high")
        }

        function u(e) {
            g = e, _ = !1, x = !1, w && w.attr("src", o), b && b.attr("src", o), v.updateDimensions(), y = !1
        }

        function d() {
            if (!y && g) {
                if (!k) {
                    var e = v.$();
                    e.html(c()), k = !0, w = e.find(".low"), b = e.find(".high")
                }
                b[0].style.display = "none", w[0].style.display = "block", y = !0
            }
        }

        function p() {
            var e = g.lowResImg.dimensions;
            v.$().css({
                marginLeft: e.marginLeft + e.offsetLeft,
                marginTop: e.marginTop + e.offsetTop,
                marginRight: e.marginRight + e.offsetRight,
                marginBottom: e.marginBottom + e.offsetBottom,
                width: e.width,
                height: e.height,
                display: "block"
            })
        }

        function h(t) {
            t === g.hiResImg.zoomLevel.url && e.broadcast(r.PAGE_LOAD, [g.page])
        }

        function f(e) {
            x || e.src !== g.lowResImg.zoomLevel.url || (w.attr("src", g.lowResImg.zoomLevel.url), h(g.lowResImg.zoomLevel.url), x = !0)
        }

        function m(e) {
            _ || e.src !== g.hiResImg.zoomLevel.url || x && g.lowResImg.zoomLevel.url === g.hiResImg.zoomLevel.url || (b.attr("src", g.hiResImg.zoomLevel.url), h(g.hiResImg.zoomLevel.url), _ = !0, a.showHighResWhenZoomedOut && (b[0].style.display = "block", window.setTimeout(function() {
                w[0].style.display = "none"
            }, 0)))
        }
        var g, v, b, w, y = !1,
            k = !1,
            _ = !1,
            x = !1;
        return function() {
            v = i.create(), v.setElement(t.template);
            var e = v.setElement;
            v.setElement = function() {
                e.apply(v, arguments), k = void 0
            }, v.setContent = u, v.getContent = s, v.isNewContent = n, v.updateDimensions = p, v.onLowResLoad = f, v.onHighResLoad = m, v.render = d
        }(), v
    }
}, function(e, t) {
    "use strict";
    t.create = function() {
        var e = {};
        return e.init = function(e) {
            return $.Deferred().resolve({}).promise()
        }, e.showIssuuFunctionality = !0, e.showShare = !0, e.showClippingsUI = !0, e
    }
}, function(e, t, n) {
    "use strict";
    var i = n(188);
    t.create = function() {
        var e = {};
        return e.init = function(t) {
            function n(t, n) {
                n = i.getTranslation(n[0]), e.showIssuuFunctionality = !t.hasReaderToolMobile, e.showShare = !t.hasBrandpackageMobile || n.shareButtonEnabled, e.showClippingsUI = !t.hasBrandpackage || n.clippingEnabled, a.resolve({})
            }
            var a = $.Deferred();
            return t.init.done(function() {
                $.when(t.getLicenseData, t.getEmbedData).done(n).fail(function() {
                    n([], {})
                })
            }), a.promise()
        }, e.showIssuuFunctionality = !1, e.showShare = !1, e.showClippingsUI = !1, e
    }
}, function(e, t, n) {
    "use strict";
    var i = n(7),
        a = n(6),
        o = n(37),
        r = n(5);
    t.create = function(e) {
        var t, n, s = {},
            l = e.username,
            c = e.docname,
            u = e.embedId;
        s.getDocumentAnonymous = i.create({
            action: "issuu.document.get_anonymous"
        }).parameters({
            documentUsername: l,
            name: c
        }).call(), s.getDocumentData = i.create({
            action: "issuu.document.get_user_doc"
        }).parameters({
            documentUsername: l,
            name: c
        }).call(), s.getUserData = i.create({
            action: "issuu.user.get_anonymous"
        }).parameters({
            profileUsername: l
        }).call(), s.getEmbedData = function() {
            if (u) {
                var e = a.urlBase("embed") + "/" + u + ".jsonp";
                return i.getJsonp(e, {}, {
                    callback: "cb_" + u.split("/")[1],
                    timeout: 500
                })
            }
            return $.Deferred().resolve({}).promise()
        }();
        var d = $.Deferred();
        return s.init = d.promise(), s.getDocumentAnonymous.done(function(e) {
            var i = e.document.documentId.split("-");
            t = i[1], n = i[0], s.getLicenseData = o.get(t), s.userProfileUrl = _.partial(r.userProfileUrl, l), s.userSmallPhotoUrl = _.partial(r.userSmallPhotoUrl, l), s.publicationUrl = _.partial(r.publicationUrl, l, c), s.pageFullUrl = _.partial(r.pageFullUrl, t, n), s.pageLargeThumbUrl = _.partial(r.pageLargeThumbUrl, t, n), s.pageMediumThumbUrl = _.partial(r.pageMediumThumbUrl, t, n), s.pageSmallThumbUrl = _.partial(r.pageSmallThumbUrl, t, n), d.resolve(s)
        }).fail(d.reject), s
    }
}, function(e, t, n) {
    "use strict";
    var i = n(33),
        a = n(34);
    t.create = function(e) {
        function t(e) {
            l >= 3 && (a.cancelEvent(e), l = 0)
        }

        function n(e, t) {
            switch (e) {
                case i.event.DOWN:
                    l = 0;
                    break;
                case i.event.SCROLL:
                    l = Math.max(l, Math.abs(t.startX - t.endX)), l = Math.max(l, Math.abs(t.startY - t.endY))
            }
        }

        function o() {
            e.on("click" + s, t)
        }

        function r() {
            e.off(s)
        }
        e = $(e);
        var s = a.getUniqueNamespace(),
            l = 0;
        return {
            attachEventHandlers: o,
            removeEventHandlers: r,
            gestureHandler: n
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = n(75),
        a = n(34),
        o = n(88);
    t.create = function(e, t, n) {
        function r(e) {
            return c.isActive() ? (a.printEvent(e), void n(o.event.KEYBOARD, {
                event: e,
                keyCode: e.which
            })) : !0
        }

        function s() {
            $(window).on("keyup", r)
        }

        function l() {
            $(window).off("keyup", r)
        }
        var c = (a.getUniqueNamespace(), i.create(n));
        return c.attachEventHandlers = s, c.removeEventHandlers = l, c
    }
}, function(e, t, n) {
    "use strict";
    var i = n(75),
        a = n(34);
    t.create = function(e, t, n) {
        function o(t) {
            h.isActive() && (a.printEvent(t), e.on("mousemove" + d + p, r), e.on("mouseup" + d + p, s), e.on("mouseleave" + d + p, l), h.clearPositions(), h.addNewPosition(t), h.fireDownEvent(t))
        }

        function r(e) {
            h.isActive() && (a.printEvent(e), h.addNewPosition(e), h.fireScrollEvent(e))
        }

        function s(t) {
            h.isActive() && (a.printEvent(t), e.off(p), h.addNewPosition(t), h.fireUpOrFlingEvent(t), h.clearPositions())
        }

        function l(e) {
            s(e)
        }

        function c() {
            t.on("mousedown" + d, o)
        }

        function u() {
            e.off(d), t.off(d)
        }
        e = $(e), t = $(t);
        var d = a.getUniqueNamespace(),
            p = a.getUniqueNamespace(),
            h = i.create(n);
        return h.attachEventHandlers = c, h.removeEventHandlers = u, h
    }
}, function(e, t, n) {
    "use strict";
    var i = n(75),
        a = n(34);
    t.create = function(e, t, n) {
        function o(t) {
            if (h.isActive()) {
                if (t = t.originalEvent || t, a.printEvent(t), !t.isPrimary) return void(h.processing() && l(t));
                e.on(a.msVendorPrefix("pointermove") + d + p, r), e.on(a.msVendorPrefix("pointerup") + d + p, s), e.on(a.msVendorPrefix("pointercancel") + d + p, l), h.clearPositions(), h.addNewPosition(t), h.fireDownEvent(t)
            }
        }

        function r(e) {
            h.isActive() && (e = e.originalEvent || e, a.printEvent(e), h.addNewPosition(e), h.fireScrollEvent(e))
        }

        function s(t) {
            h.isActive() && (t = t.originalEvent || t, a.printEvent(t), e.off(p), h.addNewPosition(t), h.fireUpOrFlingEvent(t), h.clearPositions())
        }

        function l(e) {
            s(e)
        }

        function c() {
            t.on(a.msVendorPrefix("pointerdown") + d, o)
        }

        function u() {
            e.off(d), t.off(d)
        }
        e = $(e), t = $(t);
        var d = a.getUniqueNamespace(),
            p = a.getUniqueNamespace(),
            h = i.create(n);
        return (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && (h.attachEventHandlers = c, h.removeEventHandlers = u), h
    }
}, function(e, t, n) {
    "use strict";
    var i = n(34),
        a = n(75);
    t.create = function(e, t, n) {
        function o(t) {
            if (h.isActive()) {
                if (t = t.originalEvent || t, i.printEvent(t), 1 !== t.touches.length) return void(h.processing() && l(t));
                e.on("touchmove" + d + p, r), e.on("touchend" + d + p, s), e.on("touchcancel" + d + p, l), h.clearPositions(), h.addNewPosition(t), h.fireDownEvent(t)
            }
        }

        function r(e) {
            h.isActive() && (e = e.originalEvent || e, i.printEvent(e), h.addNewPosition(e), h.fireScrollEvent(e))
        }

        function s(t) {
            h.isActive() && (t = t.originalEvent || t, i.printEvent(t), e.off(p), h.fireUpOrFlingEvent(t), h.clearPositions())
        }

        function l(e) {
            s(e)
        }

        function c() {
            t.on("touchstart" + d, o)
        }

        function u() {
            e.off(d), t.off(d)
        }
        e = $(e), t = $(t);
        var d = i.getUniqueNamespace(),
            p = i.getUniqueNamespace(),
            h = a.create(n);
        return Modernizr.touch && (h.attachEventHandlers = c, h.removeEventHandlers = u), h
    }
}, function(e, t, n) {
    "use strict";

    function i(e, t) {
        function i() {
            var t = n(89).get().wallView;
            t && (f = t.create(e, e.view.getElement())), m.getView().addToDom(e.view.getElement()), g.addToDom(e.view.getElement()), v = l.create(e, e.view.getElement(), p), v.attachEventHandlers(), m.start(), f && f.update(), b = $(e.view.getElement()).css("-ms-touch-action")
        }

        function d() {
            e.model.onViewPortChange(), m.onViewportChange(), window.setTimeout(function() {
                e.broadcast(a.LAYOUT_CHANGED)
            }, 0)
        }

        function p(e, t) {
            var n = !1;
            w && (n = g.handleGesture(e, t), n || y || g.willHandleEvents() || (n = m.handleGesture(e, t))), n && v.cancelEvent(t.event)
        }

        function h(e) {
            void 0 === e && (e = u.calculateZoomLevel()), e = isNaN(e) ? 1 : e, w = u.isZoomedOut(e)
        }
        var f, m, g, v, b, w = !0,
            y = !1;
        e.model = o.create(e, t), e.view = r.create(e.viewPort.getDomElement(), e),
            function() {
                m = s.create(e), g = c.create(e), e.subscribe(a.DISABLE_GESTURES, function(e) {
                    h()
                }), e.subscribe(a.UI_STATE_CHANGED, function(e) {
                    y = e
                }), e.subscribe(a.VIEWPORT_CHANGED, d), e.subscribe(a.ZOOM_LEVEL_CHANGED, function(t) {
                    h(t), w ? (f && m.getView().show(), $(e.view.getElement()).css("-ms-touch-action", b)) : (f && m.getView().hide(), $(e.view.getElement()).css("-ms-touch-action", b + " pan-x"))
                })
            }();
        var k = {
            start: i
        };
        return k
    }
    var a = n(13),
        o = n(257),
        r = n(270),
        s = n(242),
        l = n(33),
        c = n(265),
        u = n(76);
    n(16);
    e.exports.create = i
}, function(e, t, n) {
    "use strict";
    var i = n(256),
        a = n(255);
    t.create = function() {
        function e(e, t, o) {
            return n = t > e ? i : a
        }

        function t() {
            return n
        }
        var n;
        return {
            update: e,
            get: t
        }
    }
}, function(e, t, n) {
    "use strict";

    function i(e, t) {
        var n = [e];
        return e > 0 && (e % 2 === 0 ? n.unshift(e - 1) : e < t.getPageCount() - 1 && n.push(e + 1)), n
    }

    function a(e, t, n) {
        var i, a = d.spacing,
            o = t - (a.top + a.bottom),
            r = e - (a.left + a.right),
            s = 0,
            l = o;
        _.each(n, function(e) {
            i = o / e.zoomLevel.height, e.dimensions.height = o, e.dimensions.width = Math.round(e.zoomLevel.width * i), s += e.dimensions.width
        }), s > r && (i = r / s, l = Math.round(o * i), s = 0, _.each(n, function(e) {
            e.dimensions.height = l, e.dimensions.width = Math.round(e.dimensions.width * i), s += e.dimensions.width
        }));
        for (var c = a.top + Math.round((o - l) / 2), u = t - l - c, h = a.left + Math.round((r - s) / 2), f = e - s - h, m = n.length, g = 0, v = 0; m > v; v++) {
            var b = n[v];
            b.dimensions.marginTop = c, b.dimensions.marginBottom = u, b.dimensions.marginLeft = 0 === v ? h : 0, b.dimensions.marginRight = v === m - 1 ? f : 0, b.dimensions.offsetLeft = g, g += b.dimensions.marginLeft + b.dimensions.width
        }
        return _.last(n).dimensions.blockOffsetRight = p, n
    }

    function o(e, t, n, a, o) {
        for (var r = i(a, n), s = [], l = 0, c = r.length; c > l; l++) {
            var d = o.zoomLevel;
            (isNaN(d) || 0 > d) && (d = u.getBestZoomLevelId(e, t, n, r[l]), -100 === o.zoomLevel && (o.zoomLevel = d)), s.push(u.getPageConfig(n, r[l], d))
        }
        return s
    }

    function r(e, t, n) {
        var i = d.spacing,
            r = d.lowres,
            s = t.getWidth() - (i.left + i.right),
            l = t.getHeight() - (i.top + i.bottom),
            c = o(s * r.factorW, l * r.factorH, n, e, d.lowres);
        return a(s, l, c)
    }

    function s(e, t, n) {
        var i = d.spacing,
            r = d.highres,
            s = t.getWidth() - (i.left + i.right),
            l = t.getHeight() - (i.top + i.bottom),
            c = o(s * r.factorW, l * r.factorH, n, e, d.highres);
        return a(s, l, c)
    }

    function l(e) {
        return Math.floor(.5 * (e + 1))
    }

    function c(e, t) {
        if (0 === e) return [0];
        var n = 2 * e;
        return n < t.getPageCount() - 1 ? [n - 1, n] : [n - 1]
    }
    var u = n(175),
        d = n(16).layout.spread,
        p = n(16).carousel.itemSpacing;
    t.getListPages = i, t.getHighResPages = s, t.getLowResPages = r, t.getPageBlock = l, t.getBlockPages = c
}, function(e, t, n) {
    "use strict";

    function i(e, t) {
        return [e]
    }

    function a(e, t, n) {
        var i = n.dimensions,
            a = u.spacing,
            o = e - (a.left + a.right),
            r = t - (a.top + a.bottom),
            s = Math.min(o / n.zoomLevel.width, r / n.zoomLevel.height);
        return i.width = Math.round(n.zoomLevel.width * s), i.height = Math.round(n.zoomLevel.height * s), i.marginLeft = Math.round(.5 * (o - i.width)) + a.left, i.marginTop = Math.round(.5 * (r - i.height)) + a.top, i.marginRight = e - i.width - i.marginLeft, i.marginBottom = t - i.height - i.marginTop, i.blockOffsetRight = d, n
    }

    function o(e, t, n) {
        var i = u.spacing,
            o = u.lowres,
            r = t.getWidth() - (i.left + i.right),
            s = t.getHeight() - (i.top + i.bottom),
            l = u.lowres.zoomLevel;
        (isNaN(l) || 0 > l) && (l = c.getBestZoomLevelId(r * o.factorW, s * o.factorH, n, e), -100 === u.lowres.zoomLevel && (u.lowres.zoomLevel = l));
        var d = c.getPageConfig(n, e, l);
        return a(r, s, d), [d]
    }

    function r(e, t, n) {
        var i = u.spacing,
            o = u.highres,
            r = t.getWidth() - (i.left + i.right),
            s = t.getHeight() - (i.top + i.bottom),
            l = u.highres.zoomLevel;
        (isNaN(l) || 0 > l) && (l = c.getBestZoomLevelId(r * o.factorW, s * o.factorH, n, e), -100 === u.highres.zoomLevel && (u.highres.zoomLevel = l));
        var d = c.getPageConfig(n, e, l);
        return a(r, s, d), [d]
    }

    function s(e) {
        return e
    }

    function l(e, t) {
        return [e]
    }
    var c = n(175),
        u = n(16).layout.single,
        d = n(16).carousel.itemSpacing;
    t.getListPages = i, t.getHighResPages = r, t.getLowResPages = o, t.getPageBlock = s, t.getBlockPages = l
}, function(e, t, n) {
    "use strict";
    var i = n(259),
        a = n(1),
        o = n(13),
        r = n(254);
    t.create = function(e, t) {
        function n() {
            return _.getData()
        }

        function s() {
            C.update(), A.update(C.getWidth(), C.getHeight(), _), S = A.get().getListPages(S[0], _), E = {}, I = {}
        }

        function l(e) {
            return A.get().getListPages(e, _)
        }

        function c(t) {
            return (isNaN(t) || 0 > t || t > _.getPageCount()) && (a.error(new Error("The pageNumber " + t + " is not valid.")), t = 0), S = A.get().getListPages(t, _), k.set("page", S[0]), e.broadcast(o.PAGE_CHANGED, S), S
        }

        function u() {
            var e = S[0];
            return e ? e - 1 : -1
        }

        function d() {
            var e = S[S.length - 1];
            return void 0 !== e && e < _.getPageCount() - 1 ? e + 1 : -1
        }

        function p(e) {
            return e >= 0 && e < _.getPageCount()
        }

        function h() {
            return S
        }

        function f(e, t, n) {
            if (!t.hasOwnProperty(e))
                for (var i = n(e, C, _), a = 0, o = i.length; o > a; a++) {
                    var r = i[a];
                    t[r.page] = r
                }
            return t[e]
        }

        function m(e) {
            return f(e, E, A.get().getLowResPages)
        }

        function g() {
            return _.getPageCount()
        }

        function v(e) {
            return f(e, I, A.get().getHighResPages)
        }

        function b(e) {
            return A.get().getPageBlock(e)
        }

        function w(e) {
            return b(g() - 1)
        }

        function y(e) {
            return A.get().getBlockPages(e, _)
        }
        var k, _, x, C, A, E = {},
            I = {},
            S = [];
        return function() {
            _ = t, x = e, C = e.viewPort, k = i.create(_.getData().publicationId), A = r.create(), s();
            var n = e.options.page;
            (isNaN(n) || 1 > n) && (n = parseInt(k.get("page"), 10) + 1), c(--n)
        }(), {
            getDoc: n,
            setCurrentPage: c,
            getCurrentPages: h,
            getPageNumbers: l,
            getLowResImage: m,
            getHighResImage: v,
            getNextPage: d,
            getPreviousPage: u,
            getPageBlock: b,
            getBlockCount: w,
            getBlockPages: y,
            onViewPortChange: s,
            getPageCount: g,
            isPageValid: p
        }
    }
}, function(e, t) {
    "use strict";
    t.create = function(e) {
        function t() {
            return s
        }

        function n() {
            return s.pages ? s.pages.length : 0
        }

        function i(e) {
            return s.pages ? s.pages[e] : null
        }

        function a(e) {
            var t = i(e);
            return t ? t.zoomLevels : []
        }

        function o(t, n, i) {
            var a = t.document.documentId.split("-");
            s.revisionId = a[0], s.publicationId = a[1], s.title = t.document.title, s.docname = t.document.name, s.publisher = t.document.username, s.description = t.document.description, s.timestamp = t.document.created, s.displayName = n.user.displayName, s.accountType = n.user.account, s.uploadTimestamp = s.timestamp, s.commentsAllowed = i.document.commentsAllowed, s.publishDate = i.document.publicationCreationTime, s.likes = i.document.likes, s.pages = [], t.document.pages.forEach(function(t, n) {
                s.pages.push({
                    zoomLevels: [{
                        url: e.pageFullUrl(n + 1),
                        width: t.page.full.width,
                        height: t.page.full.height,
                        size: t.page.full.size
                    }, {
                        url: e.pageLargeThumbUrl(n + 1),
                        width: t.page.largeThumb.width,
                        height: t.page.largeThumb.height,
                        size: t.page.largeThumb.size
                    }, {
                        url: e.pageMediumThumbUrl(n + 1),
                        width: t.page.mediumThumb.width,
                        height: t.page.mediumThumb.height,
                        size: t.page.mediumThumb.size
                    }, {
                        url: e.pageSmallThumbUrl(n + 1),
                        width: t.page.smallThumb.width,
                        height: t.page.smallThumb.height,
                        size: t.page.smallThumb.size
                    }]
                })
            })
        }

        function r() {
            var t = $.Deferred();
            return $.when(e.getDocumentAnonymous, e.getUserData, e.getDocumentData).done(o).always(function() {
                s && s.publicationId ? t.resolve(s) : t.reject()
            }), t
        }
        var s = {};
        return {
            init: r,
            getData: t,
            getPage: i,
            getPageCount: n,
            getZoomLevels: a
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = n(49),
        a = n(2),
        o = n(4);
    t.create = function(e) {
        function t(t, n) {
            l[t] !== n && (l[t] = n, u = l.page, c.set(e, l))
        }

        function n(e) {
            return l[e]
        }

        function r() {
            var t = o.getUsername() || "x";
            c = i.create("mobilereader." + t, i.LOCAL, {
                maxSize: 100
            }), l = (c.get(e) || {}).value || {}, l.page && 0 === u || (l.page = u)
        }

        function s() {
            a.unsubscribe(a.events.userAuthStatusChanged, r)
        }
        var l, c, u = 0;
        return function() {
            r(), a.subscribe(a.events.userAuthStatusChanged, r)
        }(), {
            set: t,
            get: n,
            destroy: s
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = n(13),
        a = n(1),
        o = (n(6), n(30));
    e.exports.create = function(e) {
        function t() {
            var t = e.model.getCurrentPages().join("-");
            d !== t && (d = t, _.each(e.model.getCurrentPages(), function(e) {
                var t = n(e + 1);
                a.log("tracking", "page view " + t + " sent to GA"), o.track(["_trackPageview", t])
            }))
        }

        function n(t) {
            var n = e.connector.publicationUrl(t).toLowerCase();
            return new Uri(n).path()
        }

        function r() {
            u && (window.clearTimeout(u), u = void 0)
        }

        function s() {
            r(), u = window.setTimeout(function() {
                u = void 0, t()
            }, 1e3)
        }

        function l() {
            t()
        }

        function c() {
            r()
        }
        var u, d = "";
        return function() {
            e.subscribe(i.DOCUMENT_LOADED, l), e.subscribe(i.PAGE_CHANGE_ANIM_END, s), e.subscribe(i.DESTROY, c)
        }(), {}
    }
}, function(e, t, n) {
    "use strict";
    var i = n(13),
        a = n(1),
        o = n(2),
        r = o.events;
    t.create = function(e) {
        function t(e) {
            o.broadcast(r.trackingEvent, e)
        }

        function n(e) {
            f = !0, t({
                event: "documentLoad",
                data: e
            })
        }

        function s(e) {
            f && t({
                event: "pageChange",
                data: {
                    pages: e,
                    pageNumber: e[0]
                }
            })
        }

        function l() {
            a.log("tracking", i.LAYOUT_CHANGED, "disabled")
        }

        function c() {
            t({
                event: "zoom"
            })
        }

        function u(e) {
            a.log("tracking", e, "disabled")
        }

        function d(e) {
            a.log("tracking", e, "disabled")
        }

        function p() {
            e.unsubscribe(i.DOCUMENT_LOADED, n), e.unsubscribe(i.PAGE_CHANGED, s), e.unsubscribe(i.LAYOUT_CHANGED, l), e.unsubscribe(i.ZOOM_LEVEL_CHANGED, c), e.unsubscribe(i.WATERMARK_CLICK, u), e.unsubscribe(i.LINK_CLICK, d), e.unsubscribe(i.DESTROY, p), t({
                event: "flush"
            })
        }

        function h() {
            e.subscribe(i.DOCUMENT_LOADED, n), e.subscribe(i.PAGE_CHANGED, s), e.subscribe(i.LAYOUT_CHANGED, l), e.subscribe(i.ZOOM_LEVEL_CHANGED, c), e.subscribe(i.WATERMARK_CLICK, u), e.subscribe(i.LINK_CLICK, d), e.subscribe(i.DESTROY, p)
        }
        var f = !1;
        return function() {
            h()
        }(), {}
    }
}, function(e, t, n) {
    "use strict";
    var i = n(13),
        a = n(1),
        o = n(6),
        r = n(32);
    e.exports.create = function(e) {
        function t() {
            var t = e.model.getCurrentPages().join("-");
            p !== t && (p = t, _.each(e.model.getCurrentPages(), function(e) {
                var t = n(e + 1);
                r.track({
                    qacct: o.tracking.quantcastId
                }), a.log("tracking", "page view " + t + " sent to Quantcast")
            }))
        }

        function n(t) {
            return e.connector.publicationUrl(t).toLowerCase()
        }

        function s() {
            d && (window.clearTimeout(d), d = void 0)
        }

        function l() {
            s(), d = window.setTimeout(function() {
                d = void 0, t()
            }, 1e3)
        }

        function c() {
            t()
        }

        function u() {
            s()
        }
        var d, p = "";
        return function() {
            e.subscribe(i.DOCUMENT_LOADED, c), e.subscribe(i.PAGE_CHANGE_ANIM_END, l), e.subscribe(i.DESTROY, u)
        }(), {}
    }
}, function(e, t, n) {
    "use strict";
    var i = n(13),
        a = n(33),
        o = n(16).ui.pagescrubber,
        r = n(54),
        s = n(2),
        l = n(4),
        c = n(16).ui.clippingsTutorialMinWidth;
    e.exports.create = function(e, t) {
        function u() {
            s.subscribe(s.events.showUserClippings, C), s.subscribe(s.events.hideUserClippings, A), s.subscribe(s.events.startNewClipping, E), s.subscribe(s.events.stopNewClipping, I), s.subscribe(s.events.stateChangedNewClipping, function(e) {
                e ? E() : I(), O && (f(), s.broadcast(s.events.trackingEvent, {
                    event: "monitor",
                    data: {
                        type: "clipping_tutorial.dismiss.buttonToggle"
                    }
                }))
            }), s.subscribe(s.events.stateChangedClippingOverlay, function(e) {
                e ? S.hide() : S.show(), O && (f(), s.broadcast(s.events.trackingEvent, {
                    event: "monitor",
                    data: {
                        type: "clipping_tutorial.dismiss.buttonToggle"
                    }
                }))
            }), s.subscribe(s.events.onClippingsLoaded, x), s.subscribe(s.events.onClippingCountUpdated, g), e.subscribe(i.PAGE_CHANGED, x), e.subscribe(i.VIEWPORT_CHANGED, k), T.find(".js-clippings-toggle").on("click", function(e) {
                S.isVisible() && (e.stopPropagation(), L && s.broadcast(s.events.stopNewClipping), y())
            }), T.find(".js-creator-toggle").on("click", function(e) {
                S.isVisible() && (e.stopPropagation(), L ? s.broadcast(s.events.stopNewClipping) : s.broadcast(s.events.startNewClipping))
            })
        }

        function d() {
            var e = $.Deferred();
            return l.isLoggedIn() ? l.getAttribute("clippings.userclippings.active").then(function(t) {
                t && 1 === t.value ? e.resolve() : e.reject()
            }, e.reject) : e.reject(), e
        }

        function p() {
            var t = $.Deferred();
            if (e.viewPort.getWidth() <= c) return t.reject(), t;
            if (l.isLoggedIn()) l.getAttribute("clippings.tutorial.dismissed").then(function(e) {
                e && 1 !== e.value ? t.resolve() : t.reject()
            }, t.reject);
            else {
                var n = {
                    isHandledExternally: !1
                };
                s.broadcast(s.events.shouldActivateClippingsTutorialAnonymous, n), n.isHandledExternally ? t.reject() : t.resolve()
            }
            return t
        }

        function h(t) {
            O.appendTo(t), e.broadcast(i.DISABLE_ALL_POINTER, !0), O.find(".js-dismiss").on("click", function(e) {
                e.stopPropagation(), f(), s.broadcast(s.events.trackingEvent, {
                    event: "monitor",
                    data: {
                        type: "clipping_tutorial.dismiss.buttonOk"
                    }
                })
            }), O.find(".js-learnmore").on("click", function(e) {
                e.stopPropagation(), s.broadcast(s.events.trackingEvent, {
                    event: "monitor",
                    data: {
                        type: "clipping_tutorial.click.learnMore"
                    }
                })
            }), setTimeout(function() {
                O.addClass("active")
            }, 0), s.broadcast(s.events.trackingEvent, {
                event: "monitor",
                data: {
                    type: "clipping_tutorial.show.auto"
                }
            })
        }

        function f() {
            l.isLoggedIn() ? l.setAttribute("clippings.tutorial.dismissed", 1) : s.broadcast(s.events.clippingsTutorialDismissedAnonymous), n(18).onTransitionEnd(O.find(".js-bubble"), function() {
                O.remove(), O = void 0
            }), O.removeClass("active"), e.broadcast(i.DISABLE_ALL_POINTER, !1)
        }

        function m(e) {
            T = $(n(315)()), T.toggleClass("active", N === !0), D = T.find(".counter"), P = T.find(".rotator"), O = $(n(316)()), T.appendTo(e), $(e).addClass("clipping-indicator-exists"), S.init(T, o.fadeInDuration, o.fadeOutDuration)
        }

        function g() {
            v(e.model.getCurrentPages())
        }

        function v(e) {
            var t = _.map(e, function(e) {
                return e + 1
            });
            s.broadcast(s.events.getClippingCount, {
                pagenumbers: t,
                callback: function(e) {
                    0 === e.userClippingCount ? D.addClass("no-clippings") : D.text(e.userClippingCount).removeClass("no-clippings")
                }
            })
        }

        function b(e, t) {
            var n = !1;
            switch (e) {
                case a.event.DOWN:
                    t.event.currentTarget === T.get(0) && (M = !0, n = !1);
                    break;
                case a.event.SCROLL:
                    M && (n = !0, M && (Math.abs(t.endX - t.startX) > 15 || Math.abs(t.endY - t.startY) > 15) && S.hide());
                    break;
                case a.event.FLING:
                    M && (M = !1, n = !0, S.hide());
                    break;
                case a.event.UP:
                    M && (M = !1, n = !1)
            }
            n && S.isVisible() && R.cancelEvent(t.event)
        }

        function w() {
            F()
        }

        function y() {
            O && (f(), s.broadcast(s.events.trackingEvent, {
                event: "monitor",
                data: {
                    type: "clipping_tutorial.dismiss.buttonToggle"
                }
            })), N ? s.broadcast(s.events.hideUserClippings) : s.broadcast(s.events.showUserClippings)
        }

        function k() {
            g()
        }

        function x() {
            g()
        }

        function C() {
            N = !0, T.addClass("active"), l.isLoggedIn() && l.setAttribute("clippings.userclippings.active", 1)
        }

        function A() {
            N = !1, T.removeClass("active"), l.isLoggedIn() && l.setAttribute("clippings.userclippings.active", 0)
        }

        function E() {
            L = !0, T.find(".js-creator-toggle").addClass("active")
        }

        function I() {
            L = !1, T.find(".js-creator-toggle").removeClass("active")
        }
        var S, D, T, P, O, R, F, N = !1,
            L = !1,
            M = !1;
        return e.features.showClippingsUI ? (function() {
            S = r.create(), m(t), F = S.show, S.show = w, w(), x(), R = a.create(e, T, b), R.attachEventHandlers(), u(), p().then(function() {
                h(t)
            }, function() {
                O.remove(), O = void 0
            }), d().then(function() {
                s.broadcast(s.events.showUserClippings, {
                    dontTrack: !0
                })
            })
        }(), S) : {
            show: _.noop,
            hide: _.noop
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = n(13);
    t.create = function(e, t) {
        function a() {
            var e = n(314)({
                    warning: "Whoops! There was a nasty error. Why not try again a bit later?",
                    links: [{
                        href: "javascript:window.history.back();",
                        text: "Go back"
                    }, {
                        href: "javascript:window.location.reload();",
                        text: "Try again"
                    }, {
                        href: "/explore",
                        text: "Go to ISSUU"
                    }]
                }),
                i = $(t);
            i.append(e);
            var a = i.find(".error-overlay-content");
            a.css({
                marginTop: window.innerHeight / 2 - a.height() / 2 + "px"
            })
        }

        function o(t) {
            t && t.fatal && (e.unsubscribe(i.ERROR, o), a())
        }
        return function() {
            e.subscribe(i.ERROR, o)
        }(), {}
    }
}, function(e, t, n) {
    "use strict";
    var i = n(33),
        a = n(13),
        o = n(266),
        r = n(267),
        s = n(268),
        l = n(263),
        c = n(269),
        u = n(76),
        d = (n(1), n(2));
    t.create = function(e) {
        function t(e) {
            var t = !1;
            return e && e.tagName && (t = ["input", "textarea"].indexOf(e.tagName.toLowerCase()) > -1), t
        }

        function n(n, o) {
            var r = !1;
            if (n === i.event.KEYBOARD && !t(o.event.srcElement)) switch (r = !0, o.keyCode) {
                case $.ui.keyCode.LEFT:
                    e.broadcast(a.GOTO_PREVIOUSPAGE, "deadstart");
                    break;
                case $.ui.keyCode.RIGHT:
                    e.broadcast(a.GOTO_NEXTPAGE, "deadstart");
                    break;
                default:
                    r = !1
            }
            return r
        }

        function p() {
            return x.willHandleEvents()
        }

        function h(t) {
            if (C && E !== !0 && !x.willHandleEvents()) {
                var n = t.pageX - e.view.$().offset().left,
                    i = e.view.$().width();
                .1 > n / i && A !== !0 ? e.broadcast(a.GOTO_PREVIOUSPAGE, "deadstart") : n / i > .9 && A !== !0 ? e.broadcast(a.GOTO_NEXTPAGE, "deadstart") : y.isVisible() && w.isVisible() ? e.broadcast(a.HIDE_UI) : e.broadcast(a.SHOW_UI)
            }
        }

        function f(t) {
            w = r.create(e, t), k = o.create(e, t), y = s.create(e, t), x = c.create(e, t), _ = l.create(e, t), $(t).parent().on("click", t, h)
        }

        function m() {
            y.hide(), w.hide(), _.hide(), y.lock(), w.lock(), C = !1
        }

        function g() {
            C = !0, y.unlock(), w.unlock(), _.show()
        }

        function v() {
            w.show(.6), y.show(.6), _.show(.6)
        }

        function b() {
            w.hide(), y.hide()
        }
        var w, y, k, _, x, C = !0,
            A = !1,
            E = !1;
        return function() {
            e.subscribe(a.ZOOM_LEVEL_CHANGED, function(e) {
                A || (e = isNaN(e) ? 1 : e, u.isZoomedOut(e) ? g() : C && m())
            }), e.subscribe(a.PAGE_CHANGE_ANIM_END, function() {
                var t = e.model.getBlockCount(),
                    n = e.model.getPageBlock(e.model.getCurrentPages()[0]);
                n === t && v()
            }), d.subscribe(d.events.startNewClipping, b), d.subscribe(d.events.stateChangedClippingOverlay, function(e) {
                e && b()
            }), e.subscribe(a.SHOW_UI, v), e.subscribe(a.HIDE_UI, b), e.subscribe(a.DISABLE_GESTURES, function(e) {
                A = e
            }), e.subscribe(a.DISABLE_ALL_POINTER, function(t) {
                e.broadcast(a.DISABLE_GESTURES, t), E = t
            })
        }(), {
            addToDom: f,
            handleGesture: n,
            willHandleEvents: p
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = n(54),
        a = n(13),
        o = n(6);
    t.create = function(e, t) {
        function n(t) {
            $("a, .issuulogo", t).click(function(t) {
                t.preventDefault(), t.stopPropagation(), e.broadcast(a.WATERMARK_CLICK, {
                    redirectToUrl: o.urlBase("html") + "explore"
                })
            })
        }

        function r(e, t) {
            var i = $('<a href="' + o.urlBase("html") + '"><span class="issuulogo"></span></a>').appendTo(t);
            s.init(i), n(i)
        }
        var s;
        return function() {
            s = i.create(), r(e, t)
        }(), s
    }
}, function(e, t, n) {
    "use strict";

    function i(e, t) {
        function i() {
            return t.features.showIssuuFunctionality || t.features.showShare
        }

        function a() {
            var a = d.description && d.description !== d.title ? d.description : "",
                o = {
                    showLikeAndFlag: t.features.showIssuuFunctionality,
                    showShareButton: t.features.showShare,
                    frontpageImage: encodeURIComponent(t.model.getHighResImage(0).zoomLevel.url),
                    documentTitle: encodeURIComponent(d.title),
                    documentDescription: encodeURIComponent(a)
                };
            if (i()) {
                var r = n(317)(o);
                $(e).find(".shareoptions").html(r)
            }
            s()
        }

        function o(t, n) {
            if (t === !0) {
                var i = d.likes || 0;
                "number" == typeof n && (i = n), $(e).find(".rightbuttons .share-submenu .like > a").html(i18n.t("documentpage.likesindropdown", {
                    count: i
                }))
            } else $(e).find(".rightbuttons .share-submenu .like > a").html(i18n.t("documentpage.like"))
        }

        function s() {
            $(e).find(".rightbuttons .share-submenu .like > a").on("click", function(e) {
                e.preventDefault(), e.stopPropagation(), w.toggleLike(k).done(o)
            }), $(e).find(".rightbuttons .share-submenu .report").on("click", function(e) {
                e.preventDefault(), e.stopPropagation(), r.doWhenLoggedIn(function() {
                    u.openInOverlay(d)
                })
            }), $(e).find(".rightbuttons .share-submenu .download").on("click", function(e) {
                e.preventDefault(), e.stopPropagation(), p.broadcast(p.events.documentDownloadActivate)
            }), m.loadSdk(), l(".rightbuttons .share-submenu .facebook", m), l(".rightbuttons .share-submenu .twitter", h), l(".rightbuttons .share-submenu .googleplus", f), l(".rightbuttons .share-submenu .linkedin", g), l(".rightbuttons .share-submenu .tumblr", v), l(".rightbuttons .share-submenu .email", b)
        }

        function l(n, i) {
            $(e).find(n).on("click", function(e) {
                e.preventDefault(), e.stopPropagation();
                var n = t.options.embedId || "";
                i.sharePublication(x, n)
            })
        }

        function c() {
            r.isLoggedIn() && $.when(w.getLikeOfPublication(k)).always(function(e) {
                o(e)
            }), i() && $(".shareoptions").submenu({
                autoClose: !0
            })
        }
        var d = t.model.getDoc(),
            k = d.revisionId + "-" + d.publicationId,
            x = {
                publicationId: d.publicationId,
                revisionId: d.revisionId,
                name: d.docname,
                owner: d.publisher,
                title: d.title,
                description: d.description
            };
        return function() {
            a(), c(), y.isDownloadEnabled().done(function() {
                $(e).find(".hidden.download").removeClass("hidden")
            }).fail(function() {
                t.features.showIssuuFunctionality || t.features.showShare || e.find(".shareoptions").hide()
            })
        }(), {
            close: _.noop
        }
    }
    var a = n(54),
        o = n(13),
        r = n(4),
        s = (n(7), n(183)),
        l = n(22),
        c = n(45),
        u = n(173),
        d = n(24),
        p = n(2),
        h = n(187),
        f = n(113),
        m = n(27),
        g = n(114),
        v = n(186),
        b = n(185),
        w = n(184),
        y = n(79);
    e.exports.create = function(e, t) {
        function u(e) {
            e ? v.$().find(".subscription").text(i18n.t("userprofile.unfollow")) : v.$().find(".subscription").text(i18n.t("userprofile.follow"))
        }

        function h(e) {
            var i = r.isLoggedIn() && y.publisher.toLowerCase() === r.getUsername(),
                a = n(318)({
                    documenttitle: y.title,
                    documentdescription: l.linebreakify(_.escape($.trim(y.description))),
                    documentdate: d(y.publishDate || y.uploadTimestamp).fromNow(),
                    showLogo: e.features.showIssuuFunctionality,
                    showStackButton: e.features.showIssuuFunctionality,
                    showFollowButton: e.features.showIssuuFunctionality,
                    showInfo: e.features.showIssuuFunctionality,
                    ownerlink: e.connector.userProfileUrl(),
                    owner: y.displayName,
                    isBusinessAccount: "B" === y.accountType,
                    ownerpic: e.connector.userSmallPhotoUrl(i)
                }),
                o = $(a).appendTo(t);
            v.init(o, .2, .4), b.init(o.find(".metaoverlay"), .2, .4), b.hide(0), f()
        }

        function f() {
            v.$().find("a.infobutton").on("click", function(e) {
                e.preventDefault(), e.stopPropagation(), b.toggle()
            }), v.$().find(".rightbuttons .subscription").on("click", function(e) {
                e.preventDefault(), e.stopPropagation(), r.isLoggedIn() ? $.when(c.toggleSubscription("publisher", y.publisher)).progress(u).done(u) : p.broadcast(p.events.userRequestLogin)
            }), v.$().find(".rightbuttons .addto").on("click", function(e) {
                e.preventDefault(), e.stopPropagation(), r.doWhenLoggedIn(function() {
                    s.openInOverlay([y])
                })
            })
        }

        function m() {
            v.islocked() || v.isVisible() !== !1 || e.broadcast(o.UI_STATE_CHANGED, !0), w.show.apply(v, arguments)
        }

        function g() {
            v.islocked() || v.isVisible() !== !0 || e.broadcast(o.UI_STATE_CHANGED, !1), w.hide.apply(v, arguments)
        }
        var v, b, w = {},
            y = e.model.getDoc();
        return function() {
            v = a.create(), b = a.create(), w.show = v.show, w.hide = v.hide, v.show = m, v.hide = g, h(e), $.when(c.getSubscription("publisher", y.publisher)).done(u);
            var t = i(v.$(), e);
            e.subscribe(o.HIDE_UI, function() {
                t.close(), b.hide()
            }), e.subscribe(o.PAGE_CHANGE_ANIM_START, function() {
                v.isVisible() && v.hide(), t.close()
            })
        }(), v
    }
}, function(e, t, n) {
    "use strict";
    var i = n(13),
        a = n(33),
        o = n(16).ui.pagescrubber,
        r = n(54);
    e.exports.create = function(e, t) {
        function n() {
            e.subscribe(i.PAGE_CHANGED, k), e.subscribe(i.VIEWPORT_CHANGED, y)
        }

        function s() {
            return (isNaN(P) || 0 >= P) && (P = C.outerWidth()), P
        }

        function l() {
            return (isNaN(O) || 0 >= O) && (O = C.offset().left), O
        }

        function c() {
            if (isNaN(E) || isNaN(I)) {
                var t = x.text(),
                    n = x.css("visibility");
                x.css("visibility", "hidden"), E = x.text(d(e.model.getPageNumbers(0))).outerWidth(), I = x.text(d(e.model.getPageNumbers(e.model.getPageCount() - 1))).outerWidth(), x.css("visibility", n), x.text(t)
            }
        }

        function u(e) {
            var t = '<div class="footer"><div class="pagescrubber"><div class="pageNumber"></div></div></div>',
                n = $(t).appendTo(e);
            C = n.find(".pagescrubber"), x = C.find(".pageNumber"), _.init(n, o.fadeInDuration, o.fadeOutDuration)
        }

        function d(t) {
            for (var n = [], i = 0, a = t.length; a > i; i++) n.push(parseInt(t[i], 10) + 1);
            return n.join("-") + " of " + e.model.getPageCount()
        }

        function p(t) {
            var n, i = e.model.getBlockCount();
            if (0 === i) n = 0;
            else {
                var a = s() - E / 2 - I / 2;
                t -= E / 2, n = Math.max(0, Math.min(i, Math.round(t / (a / i))))
            }
            return e.model.getBlockPages(n)[0]
        }

        function h(t) {
            var n = e.model.getBlockCount();
            if (0 === n) return s() / 2;
            var i = e.model.getPageBlock(t[0]),
                a = s() - E / 2 - I / 2;
            return a / n * i + E / 2
        }

        function f(e, t, n) {
            _.isVisible() && (c(), e.length > 0 && e.join("-") !== R.join("-") && (R = e, x.text(d(R))), isNaN(n) && (n = 0), void 0 === t && (n = o.scrollDuration, t = h(R)), n = Math.max(n, 0), t -= x.outerWidth() / 2, t = Math.max(0, Math.min(t, s() - I)), t = Math.round(t), x.get(0).style[Modernizr.prefixed("transitionDuration")] = n + "ms", Modernizr.csstransforms3d ? x.get(0).style[Modernizr.prefixed("transform")] = "translate3d(" + t + "px, 0px, 0px)" : x.get(0).style[Modernizr.prefixed("transform")] = "translate(" + t + "px, 0px)")
        }

        function m() {
            S || (S = window.requestAnimationFrame(function() {
                var t = T - l(),
                    n = p(t),
                    i = e.model.getPageNumbers(n);
                f(i, t), S = void 0
            }))
        }

        function g() {
            S && (window.cancelAnimationFrame(S), S = void 0)
        }

        function v() {
            D || (D = window.requestAnimationFrame(function() {
                _.show(), f(e.model.getCurrentPages()), _.hide(o.fadeOutDuration, o.fadeDelayOnPageChange), D = void 0
            }))
        }

        function b() {
            D && (window.cancelAnimationFrame(D), D = void 0)
        }

        function w(t, n) {
            var r = !1;
            switch (t) {
                case a.event.DOWN:
                    n.event.target === x.get(0) && (_.clearFadeTimeout(), F = !0, r = !0);
                    break;
                case a.event.SCROLL:
                    F && (T = n.endX, m(), r = !0);
                    break;
                case a.event.FLING:
                case a.event.UP:
                    F && (F = !1, g(), e.broadcast(i.GOTO_PAGE, R[0]), r = !0)
            }
            r ? A.cancelEvent(n.event) : _.hide(o.fadeOutDuration, o.fadeDelayOnPageChange)
        }

        function y() {
            g(), b(), P = O = NaN, E = I = NaN, k()
        }

        function k() {
            v()
        }
        var _, x, C, A, E, I, S, D, T, P, O, R = [],
            F = !1;
        return function() {
            _ = r.create(), u(t), k(), A = a.create(e, C, w), A.attachEventHandlers(), n()
        }(), _
    }
}, function(e, t, n) {
    "use strict";
    var i = n(13),
        a = (n(33), n(16).ui.pagescrubber),
        o = n(54),
        r = n(2),
        s = n(170),
        l = n(4);
    e.exports.create = function(e, t) {
        function n() {
            e.subscribe(i.PAGE_CHANGE_ANIM_START, h), e.subscribe(i.PAGE_CHANGE_ANIM_END, f), e.subscribe(i.VIEWPORT_CHANGED, p), r.subscribe(r.events.startNewClipping, function() {
                l.doWhenLoggedIn(function() {
                    m.startClippingCreation()
                })
            }), r.subscribe(r.events.stopNewClipping, function() {
                m.stopClippingCreation()
            }), r.subscribe(r.events.showUserClippings, function() {
                m.setUserClippingsVisibility(!0)
            }), r.subscribe(r.events.hideUserClippings, function() {
                m.setUserClippingsVisibility(!1)
            }), m.listenTo(m, "overlayChanged:open", function() {
                e.broadcast(i.DISABLE_GESTURES, !0), v = !0, r.broadcast(r.events.stateChangedClippingOverlay, !0)
            }), m.listenTo(m, "overlayChanged:closed", function() {
                e.broadcast(i.DISABLE_GESTURES, !1), v = !1, r.broadcast(r.events.stateChangedClippingOverlay, !1)
            }), m.listenTo(m, "videoOverlayChanged:open", function() {
                e.broadcast(i.DISABLE_GESTURES, !0), v = !0, r.broadcast(r.events.stateChangedClippingOverlay, !0)
            }), m.listenTo(m, "videoOverlayChanged:closed", function() {
                e.broadcast(i.DISABLE_GESTURES, !1), v = !1, r.broadcast(r.events.stateChangedClippingOverlay, !1)
            }), m.listenTo(m, "clippingCreatorChanged:open", function() {
                e.broadcast(i.DISABLE_ALL_POINTER, !0), r.broadcast(r.events.stateChangedNewClipping, !0), b = !0
            }), m.listenTo(m, "clippingCreatorChanged:closed", function() {
                e.broadcast(i.DISABLE_ALL_POINTER, !1), r.broadcast(r.events.stateChangedNewClipping, !1), b = !1
            }), m.listenTo(m.clippings, "metaelement:shown metaelement:hidden", function() {
                e.broadcast(i.HIDE_UI)
            })
        }

        function c(t) {
            var n = !e.features.showClippingsUI,
                i = e.model.getDoc();
            m = new s.create({
                metaObj: {
                    publicationId: i.publicationId,
                    revisionId: i.revisionId,
                    title: i.title,
                    description: i.description,
                    commentsAllowed: i.commentsAllowed
                },
                root: t,
                readerDimensions: d(),
                linksOnly: n,
                protectedReadToken: e.options.readToken
            }), g.init(m.$el, a.fadeInDuration, a.fadeOutDuration)
        }

        function u() {
            return g.isVisible() && (v || b)
        }

        function d() {
            var t = {};
            t.pagenumbers = [], t.dimensions = _.map(e.model.getCurrentPages(), function(n) {
                t.pagenumbers.push(n + 1);
                var i = e.model.getHighResImage(n).dimensions;
                return {
                    x: i.marginLeft + i.offsetLeft,
                    y: i.marginTop + i.offsetTop,
                    width: i.width,
                    height: i.height
                }
            });
            var n = e.viewPort;
            return t.viewport = {
                width: n.getWidth(),
                height: n.getHeight()
            }, t
        }

        function p() {
            m.setReaderDimensions(d()), b || m.renderClippings()
        }

        function h() {
            m.hideClippings()
        }

        function f() {
            m.removeClippings(), m.setReaderDimensions(d()), b || m.renderClippings()
        }
        var m, g, v = !1,
            b = !1;
        return function() {
            g = o.create(), c(t), g.show(), e.subscribe(i.READER_FULLY_LOADED, n), g.willHandleEvents = u
        }(), g
    }
}, function(e, t, n) {
    "use strict";
    var i = n(90),
        a = n(13),
        o = n(91);
    t.create = function(e, t) {
        function n() {
            t.subscribe(a.PAGE_LOAD, r), s.$().css({
                opacity: 0
            })
        }

        function r() {
            t.unsubscribe(a.PAGE_LOAD, r), s.$().one(o.getTransitionEndEventName(), function() {
                t.broadcast(a.SHOW_UI), t.broadcast(a.READER_FULLY_LOADED)
            }).css("opacity", "")
        }
        var s;
        return function() {
            s = i.create(), s.setElement('<div class="issuu-reader"></div>'), s.addToDom(e), n()
        }(), s
    }
}, function(e, t, n) {
    "use strict";
    var i = n(1);
    t.create = function(e) {
        function t() {
            var e = $(s),
                t = e.width(),
                n = e.height();
            null === t || null === n || t === l && n === c || (l = t, c = n)
        }

        function n() {
            t(), a() && o() ? u.resolve() : window.setTimeout(n, 10)
        }

        function a() {
            return l
        }

        function o() {
            return c
        }

        function r() {
            return s
        }
        var s, l, c, u;
        return function() {
            var t = e.options.root,
                a = $(t);
            return 0 === a.length ? (i.error(new Error('This element "' + t + '" is not in the DOM')), null) : (s = "string" == typeof t ? a[0] : t, u = $.Deferred(), void window.setTimeout(n, 0))
        }(), {
            getWidth: a,
            getHeight: o,
            getDomElement: r,
            update: t,
            promise: u.promise
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = n(13),
        a = (n(16).wall, n(76));
    t.create = function(e, t) {
        function n(e) {
            g = $('<div class="issuu-wall"></div>').appendTo(e)
        }

        function o() {
            e.subscribe(i.PAGE_CHANGE_ANIM_END, h), e.subscribe(i.PAGE_CHANGE_ANIM_START, r), e.subscribe(i.VIEWPORT_CHANGED, s)
        }

        function r() {
            window.clearTimeout(v), m()
        }

        function s() {
            a.isZoomedOut() ? h() : (window.clearTimeout(v), p())
        }

        function l(e) {
            e.dimensions;
            return '<img src="' + e.zoomLevel.url + '" />'
        }

        function c(e) {
            e.lowRes.elm = $(e.lowRes.markup).appendTo(g), e.highRes.elm = $(e.highRes.markup).appendTo(g), e.highRes.elm.one("load", function() {
                e.lowRes.elm[0].style.display = "none"
            }), y.push(e)
        }

        function u(e) {
            y = [];
            for (var t = 0, n = e.length; n > t; t++) c(e[t])
        }

        function d(e, t) {
            e.css({
                marginLeft: t.marginLeft + t.offsetLeft,
                marginTop: t.marginTop + t.offsetTop,
                marginRight: t.marginRight + t.offsetRight,
                marginBottom: t.marginBottom + t.offsetBottom,
                width: t.width,
                height: t.height
            })
        }

        function p() {
            var t = e.model.getCurrentPages(),
                n = "",
                i = [];
            _.each(t, function(t, a) {
                var o, r = {
                    highRes: {
                        markup: "",
                        dimensions: null,
                        elm: null
                    },
                    lowRes: {
                        markup: "",
                        dimensions: null,
                        elm: null
                    }
                };
                o = e.model.getLowResImage(t), n += r.lowRes.markup = l(o), r.lowRes.dimensions = o.dimensions, o = e.model.getHighResImage(t), n += r.highRes.markup = l(o), r.highRes.dimensions = o.dimensions, i.push(r)
            }), w !== n && (w = n, g.empty(), y = [], u(i));
            for (var a = 0, o = y.length; o > a; a++) d(y[a].lowRes.elm, i[a].lowRes.dimensions), d(y[a].highRes.elm, i[a].highRes.dimensions);
            f()
        }

        function h() {
            window.clearTimeout(v), m(), v = window.setTimeout(function() {
                p()
            }, 500)
        }

        function f() {
            b || (b = !0, g[0].style.display = "block")
        }

        function m() {
            b && (b = !1, g[0].style.display = "none")
        }
        var g, v, b = !0,
            w = "",
            y = [];
        ! function() {
            n(t), o(), h()
        }();
        var k = {
            show: f,
            hide: m,
            update: h
        };
        return k
    }
}, function(e, t, n) {
    "use strict";
    var i = n(38).create(),
        a = n(19).session,
        o = n(319),
        r = n(2),
        s = r.events,
        l = "pagezero-ad-lastShown";
    t.create = function(e, t) {
        function n() {
            if (a.has(l)) {
                var e = a.get(l);
                if (e && _.isNumber(e) && new Date - e < t.interval) return !1
            }
            return !0
        }

        function c() {
            v.find(".pagezero-ad__close").click(function(e) {
                e.preventDefault(), g(v)
            })
        }

        function u() {
            v.find(".pagezero-ad__close").off("click")
        }

        function d(e, t) {
            var n = Number(new Date);
            a.set(l, n), r.broadcast(s.monitorEvent, {
                type: "READER_AD_SHOWN",
                location: document.location.toString(),
                time: n - t,
                gpt_network: e.slot.getName(),
                gpt_creative_id: e.creativeId,
                gpt_line_item_id: e.lineItemId
            })
        }

        function p(e, t) {
            var n = Number(new Date);
            r.broadcast(s.monitorEvent, {
                type: "READER_AD_EMPTY",
                location: document.location.toString(),
                time: n - t,
                gpt_network: e.slot.getName(),
                gpt_creative_id: e.creativeId,
                gpt_line_item_id: e.lineItemId
            })
        }

        function h() {
            return t.allowed && n()
        }

        function f() {
            return v || (v = $(o({
                slotname: t.slotname,
                width: t.width,
                height: t.height
            })).css("visibility", "hidden")), v
        }

        function m() {
            if (!w) {
                w = !0, r.broadcast(s.monitorEvent, {
                    type: "READER_AD_INJECTED",
                    location: document.location.toString()
                });
                var e = Number(new Date);
                i.addPlacement(t.slotname, t.network, [t.width, t.height], t.targeting), i.addEventListener("slotRenderEnded", function(n) {
                    n.slot.getSlotId().getDomId() === t.slotname && (n.isEmpty ? (p(n, e), b()) : (v.css("visibility", "visible"), c(), d(n, e)))
                })
            }
        }

        function g() {
            u(v), b()
        }
        t = _.defaults(t || {}, {
            width: 300,
            height: 250,
            network: "",
            slotname: "pagezero_ad_gpt_slot",
            allowed: !0,
            interval: 36e5,
            targeting: [],
            noAdCallback: _.noop
        });
        var v, b = t.noAdCallback,
            w = !1;
        $(e);
        return {
            willRender: h,
            getView: f,
            onShow: m,
            hide: g,
            setNoAdCallback: function(e) {
                b = e
            }
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = n(6),
        a = n(2),
        o = a.events,
        r = n(276),
        s = n(279),
        l = n(275),
        c = n(273);
    t.create = function(e, t, u, d, p) {
        p = _.defaults(p || {}, {
            pageControllers: [n(277).create(t.doc, t.owner.displayName), n(278).create(t.doc.title), n(176).create(t.doc)],
            adController: c.create(e, {
                network: i.adsPlacements.readerAds,
                allowed: u,
                interval: d
            })
        });
        var h = s.create(e),
            f = l.create(0, 0, 0, 0),
            m = r.create(h, f, p);
        return a.subscribe(o.readerPageZeroResized, m.pageZeroResizedEventHandler), {
            render: function() {
                return m.start()
            }
        }
    }
}, function(e, t) {
    "use strict";
    e.exports.create = function(e, t, n, i, a) {
        function o(e, t, n, i) {
            s.left = e, s.top = t, s.width = n, s.height = i;
            var o = Math.min(a.maxPageWidth, s.width);
            l.top = 0, l.left = s.width - o, l.width = o, l.height = s.height, l.visible = u && n > l.width, c.top = a.ad.top, c.left = a.ad.left, c.width = a.ad.width, c.height = a.ad.height, l.visible && n < l.width + a.ad.width + a.ad.left ? (c.visible = d, p ? c.inline = !0 : c.visible && (l.visible = !1)) : (c.inline = !1, c.visible = !0), d || c.inline || (c.left = -(c.width + a.ad.left)), (n < c.width || i < c.height) && (c.visible = !1), r(s, l, c)
        }
        a = _.defaults(a || {}, {
            ad: {
                top: 0,
                left: 10,
                width: 300,
                height: 300
            },
            maxPageWidth: 440,
            minPageWidth: 440,
            onUpdate: _.noop
        });
        var r = a.onUpdate,
            s = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: 0,
                height: 0
            },
            l = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: 0,
                height: 0,
                visible: !0
            },
            c = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: 0,
                height: 0,
                visible: !0,
                inline: !1
            },
            u = !0,
            d = !0,
            p = !0;
        return o(e, t, n, i), {
            updateSize: function(e, t, n, i) {
                o(e, t, n, i)
            },
            hideAdContainer: function() {
                d = !1, o(s.left, s.top, s.width, s.height)
            },
            showAdContainer: function() {
                d = !0, o(s.left, s.top, s.width, s.height)
            },
            hidePageContainer: function() {
                u = !1, o(s.left, s.top, s.width, s.height)
            },
            showPageContainer: function() {
                u = !0, o(s.left, s.top, s.width, s.height)
            },
            setAllowInlineAd: function(e) {
                p = e
            },
            onUpdate: function(e) {
                r = e
            }
        }
    }
}, function(e, t) {
    "use strict";

    function n(e, t) {
        return $.when.apply(null, _.map(e, t)).then(function() {
            return _.toArray(arguments)
        })
    }

    function i(e) {
        return n(e, function(e) {
            return e.willRender()
        }).then(function(t) {
            var n = _(t).map(function(t, n) {
                return t ? e[n] : !1
            }).filter().first();
            if (!n) throw "no pages will render";
            return n
        })
    }
    e.exports.create = function(e, t, n) {
        function a() {
            s = !0, t.hideAdContainer()
        }
        var o = n.pageControllers,
            r = n.adController;
        t.onUpdate(e.render), t.hidePageContainer(), t.hideAdContainer();
        var s = !r;
        return r.setNoAdCallback(a), {
            start: function() {
                return $.when(i(o)).then(function(n) {
                    e.setPageContent(n.getView()).then(function(e) {
                        n.onShow && n.onShow(e)
                    }), t.showPageContainer();
                    var i = !_.has(n, "allowCenteredAd") || n.allowCenteredAd();
                    t.setAllowInlineAd(i), r && r.willRender() ? e.setAdContent(r.getView()).then(r.onShow) : a()
                })
            },
            pageZeroResizedEventHandler: function(e) {
                0 === e.left && 0 === e.right ? (t.hidePageContainer(), t.hideAdContainer()) : (t.showPageContainer(), s || t.showAdContainer(), t.updateSize(e.left, e.top, e.width, e.height))
            }
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = n(7),
        a = n(5),
        o = n(2),
        r = n(320),
        s = n(174);
    t.create = function(e, t) {
        function l() {
            var t = $.Deferred();
            return i.create({
                path: "/call/notifier/follow_publisher_cta/get?publication_id=" + e.publicationId
            }).call().then(function(e) {
                d = _.map(e.latest_documents || [], function(e) {
                    return {
                        link: a.publicationUrl(e.username, e.name),
                        thumbUrl: a.pageMediumThumbUrl(e.publication_id, e.revision_id)
                    }
                }), t.resolve(e.show)
            }, function() {
                t.resolve(!1)
            }), t.promise()
        }

        function c() {
            return r({
                normalFollowButtonHTML: n(313)({
                    displayName: t
                }),
                latestDocuments: d,
                titleAndDescriptionHTML: n(180)({
                    title: e.title,
                    description: e.description
                })
            })
        }

        function u(t) {
            _.isEmpty(d) && t.find(".pagezero-follow-publisher__latest-documents").css("display", "none"), s.create(t, e), t.find(".pagezero-description").css("display", "none"), o.subscribe(s.subscriptionStatusChangedEvent, function(e) {
                e && (o.unsubscribeAll(s.subscriptionStatusChangedEvent), t.find(".pagezero-description").css("display", "block").siblings().css("display", "none"))
            })
        }
        var d = [];
        return {
            willRender: l,
            getView: c,
            onShow: u
        }
    }
}, function(e, t, n) {
    "use strict";

    function i(e) {
        e.preventDefault(), l.loginWithDialog().fail(function(e) {
            c.log("page-zero", "facebook signin error", e && e.message), e && "005" === e.code ? location.href = "/signup?authorized=fb&socialOrigin=messagebar" : a.broadcast(o.messagehubWarn, i18n.t("signinWidget.youWereNotSignedInWithFacebook"))
        })
    }
    var a = n(2),
        o = a.events,
        r = n(321),
        s = n(4),
        l = n(193),
        c = n(1);
    t.create = function(e) {
        function t() {
            var e = $.Deferred();
            return s.isLoggedIn() ? e.resolve(!1) : e.resolve(!0), e.promise()
        }

        function n() {
            return r({
                issuu: '<span class="issuu-logo-white-image">issuu</span>',
                documentName: '<span class="pagezero-signin__document-name h1">' + e + "</span>"
            })
        }

        function o(e) {
            e.find("button").click(i), e.find(".pagezero-signin__signupLink").click(function(e) {
                e.preventDefault(), e.stopPropagation(), a.broadcast(a.events.userRequestLogin)
            }), a.subscribe(a.events.userAuthStatusChanged, function(t) {
                t && e.remove()
            })
        }
        return {
            willRender: t,
            getView: n,
            onShow: o
        }
    }
}, function(e, t) {
    "use strict";
    e.exports.create = function(e) {
        function t(e, t, r) {
            e && (n.css({
                top: e.top,
                left: e.left,
                width: Math.min(t.width, e.width),
                height: e.height
            }), i.css({
                top: t.top,
                left: t.left,
                width: t.width,
                maxWidth: t.width,
                height: t.height,
                display: t.visible ? "table-cell" : "none"
            }), a.css({
                top: r.top,
                left: r.left,
                width: r.width,
                height: r.height
            }), r.inline ? (a.css({
                position: "static",
                marginLeft: "auto",
                marginRight: "auto",
                display: r.visible ? "block" : "none"
            }), a.parent(".pagezero-wrapper").length || a.insertBefore(o)) : (a.css({
                position: "absolute",
                display: "block",
                marginLeft: 0,
                marginRight: 0
            }), a.parent(".pagezero-wrapper").length && a.appendTo(n)), o.removeClass("pagezero--constrained"), o.css("display", "block"), e.height && i.outerHeight() > e.height && (o.addClass("pagezero--constrained"), i.outerHeight() > e.height && o.css("display", "none")))
        }
        var n = $(e),
            i = $('<div class="pagezero-wrapper"></div>'),
            a = $('<div class="pagezero-ad"></div>'),
            o = $("<div></div>");
        i.appendTo(n), a.appendTo(n), o.appendTo(i);
        var r = !1;
        return {
            render: function(e, n, i) {
                r && cancelAnimationFrame(r), r = requestAnimationFrame(function() {
                    t(e, n, i)
                })
            },
            setPageContent: function(e) {
                return $.when(e).then(function(e) {
                    var t = $(e);
                    return o.replaceWith(t), o = t
                })
            },
            setAdContent: function(e) {
                return $.when(e).then(function(e) {
                    var t = $(e);
                    return a.replaceWith(t), a = t, t
                })
            }
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = (n(1), n(371)),
        a = ".print-on-demand";
    e.exports = function(e) {
        1 === $(a).length && i.setup().then(function() {
            var t = i.getPrintStatus(e);
            if (t.isPrintable) $(".issuu-peecho").removeClass("spinner").bind("click", function() {
                t.gotoPeecho(), $(".issuu-peecho").html('<span class="text">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="issuuicons"></span>'), $(".issuu-peecho").addClass("spinner")
            }), $(".issuu-peecho").tipsy({
                gravity: "s",
                html: !0,
                opacity: 1,
                offset: 1,
                title: function() {
                    var e = t.priceString;
                    return i18n.t("documentpage.pod.orderPrint") + " " + e
                }
            }), $(".issuu-peecho").focus(function() {
                $(".issuu-peecho").tipsy("show")
            }), $(".issuu-peecho").blur(function() {
                $(".issuu-peecho").tipsy("hide")
            });
            else {
                $(".issuu-peecho").addClass("dimmed").on("click", function() {
                    return !1
                }), $(".issuu-peecho").tipsy({
                    gravity: "s",
                    html: !0,
                    opacity: 1,
                    offset: 1,
                    trigger: "manual",
                    title: function() {
                        var e = '<a style="text-decoration:underline; color:#384a54;" href="' + t.getUrlForHelpPage() + '">' + i18n.t("documentpage.pod.notEligibleForPrint") + "</a>";
                        return e
                    }
                });
                var n = !0;
                $(".issuu-peecho").focus(function() {
                    $(".issuu-peecho").tipsy("show")
                }), $(".issuu-peecho").blur(function() {
                    $(".issuu-peecho").tipsy("hide")
                }), $(".issuu-peecho").hover(function() {
                    var e = this;
                    $(this).tipsy("show"), $(".tipsy-inner").mouseenter(function() {
                        n = !1
                    }), $(".tipsy-inner").mouseleave(function() {
                        $(e).tipsy("hide"), n = !0
                    })
                }, function() {
                    var e = this;
                    setTimeout(function() {
                        n && $(e).tipsy("hide")
                    }, 200)
                })
            }
        })
    }
}, function(e, t, n) {
    "use strict";
    var i = n(2),
        a = i.events,
        o = n(1);
    t.create = function(e, t) {
        function n() {
            d ? d < e.length ? (u = e[d], d += 1) : u = null : (u = e[0], d = 1), o.log("PULSE", "next!", u), u && u.conditions.wait && (clearTimeout(p), p = _.delay(r, u.conditions.wait))
        }

        function r() {
            var e = $(u.el);
            e.width() <= (u.maxWidthForPulse || t.maxWidthForPulse) ? (o.log("PULSE", "starting pulse", $(u.el)), e.append('<span class="pulse"></span>'), clearTimeout(p), p = _.delay(s, u.duration || t.defaultDuration), u.onStart && u.onStart()) : (o.log("PULSE", "skipping pulse - element is not wide enough", e, e.width(), u.maxWidthForPulse || t.maxWidthForPulse), n())
        }

        function s() {
            u.waitForAnimationEnd || t.waitForAnimationEnd ? (o.log("PULSE", "pulse end [begin animation]", $(u.el)), $(u.el).find(".pulse").addClass("pulse-fadeout"), $(u.el).one("animationend webkitAnimationEnd oAnimationEnd", function() {
                $(u.el).find(".pulse").remove(), o.log("PULSE", "pulse end [complete]", $(u.el)), n()
            })) : (o.log("PULSE", "pulse end", $(u.el)), $(u.el).find(".pulse").remove(), n())
        }

        function l() {
            h += 1, u && u.conditions.pageflip && u.conditions.pageflip === h && r()
        }

        function c() {
            o.log("PULSE", "starting pulsing icons"), n(), i.subscribe(a.documentPageChange, l)
        }
        e && e.length || o.error("Attempting to initialize pulsing icons sequence without any icons to pulse!"), t = _.defaults(t || {}, {
            defaultDuration: 1e4,
            waitForAnimationEnd: !0,
            maxWidthForPulse: 60
        });
        var u, d, p, h = 0;
        return {
            start: c
        }
    }
}, function(e, t, n) {
    "use strict";
    var i = n(2),
        a = i.events,
        o = n(19).session,
        r = n(38).create(),
        s = n(322),
        l = n(6),
        c = n(1),
        u = n(74),
        d = "reader-ad",
        p = "reader-ad--hide",
        h = "reader-ad-lastShown",
        f = {
            width: 300,
            height: 250
        },
        m = 20,
        g = [a.readerPageZeroResized, a.documentMenuActivate];
    t.create = function(e, t) {
        t = _.defaults(t || {}, {
            network: l.adsPlacements.readerAds,
            slotname: "reader_ad_gpt_slot",
            allowed: !0
        }), e.isFlashReader() || (t.allowed = !1), (_.contains(u.ads.DFP.blacklist.continents, t.continent) || _.contains(u.ads.DFP.blacklist.countries, t.countryCode)) && (t.allowed = !1);
        var n = $.Deferred(),
            v = function x(t) {
                i.unsubscribe(a.readerPageZeroResized, x), t.right > f.width + m && e.$().height() > f.height + m ? n.resolve() : n.reject()
            };
        i.subscribe(a.readerPageZeroResized, v);
        var b, w = !1,
            y = $.Deferred(),
            k = {
                show: function() {
                    return k.willShow() ? (n.done(function() {
                        c.log("READER_ADS", "READER AD SHOWING"), w || (w = !0,
                            b = $(s(t)), e.$().append(b), i.broadcast(a.monitorEvent, {
                                type: "READER_AD_INJECTED",
                                location: document.location.toString()
                            }), k.startTime = Number(new Date), r.addPlacement(t.slotname, t.network, [f.width, f.height], []), r.addEventListener("slotRenderEnded", function(e) {
                                return e.slot.getSlotId().getDomId() === t.slotname ? e.isEmpty ? (k.onAdFailedToRender(e), y.reject()) : (b.removeClass(p).addClass(d), k.attach(), k.onAdRendered(e), y.resolve()) : void 0
                            }))
                    }).fail(function() {
                        return c.log("READER_ADS", "READER AD NOT SHOWING: NOT ENOUGH ROOM"), y.reject()
                    }), y) : (c.log("READER_ADS", "READER AD NOT SHOWING", {
                        data: t,
                        shouldRender: k.shouldRenderNow(),
                        lastShown: o.get(h)
                    }), y.reject())
                },
                hide: function() {
                    b.removeClass(d).addClass(p), k.dettach()
                },
                attach: function() {
                    _.each(g, function(e) {
                        i.subscribe(e, k.hide)
                    }), b.find(".js-reader-ad__close").click(function(e) {
                        e.preventDefault(), k.hide()
                    })
                },
                dettach: function() {
                    _.each(g, function(e) {
                        i.unsubscribe(e, k.hide)
                    })
                },
                shouldRenderNow: function() {
                    if (o.has(h)) {
                        var e = o.get(h);
                        if (e && _.isNumber(e) && new Date - e < 1e3 * u.ads.DFP.interval) return !1
                    }
                    return !0
                },
                onAdRendered: function(e) {
                    var t = Number(new Date);
                    o.set(h, t), i.broadcast(a.monitorEvent, {
                        type: "READER_AD_SHOWN",
                        location: document.location.toString(),
                        time: t - k.startTime,
                        gpt_network: e.slot.getName(),
                        gpt_creative_id: e.creativeId,
                        gpt_line_item_id: e.lineItemId
                    })
                },
                onAdFailedToRender: function(e) {
                    var t = Number(new Date);
                    i.broadcast(a.monitorEvent, {
                        type: "READER_AD_EMPTY",
                        location: document.location.toString(),
                        time: t - k.startTime,
                        gpt_network: e.slot.getName(),
                        gpt_creative_id: e.creativeId,
                        gpt_line_item_id: e.lineItemId
                    })
                },
                willShow: function() {
                    return t.allowed && k.shouldRenderNow()
                }
            };
        return k
    }
}, function(e, t, n) {
    "use strict";
    var i = n(2),
        a = i.events,
        o = n(353),
        r = n(159),
        s = n(53);
    t.create = function(e, t) {
        function n() {
            i.broadcast(a.onStreamResized)
        }

        function l(i, a) {
            var r = _.defaults(a || {}, {
                autoStart: !1,
                useHistoryData: !1,
                observeWindowSize: s.isFlashReader(),
                path: i,
                apiParams: {
                    publicationId: t.doc.publicationId,
                    revisionId: t.doc.revisionId,
                    ownerUsername: t.doc.username
                },
                apiOptions: {
                    initialPageSize: t.initialPageSize
                },
                onStreamRelayout: n,
                streamcontainer: e
            });
            m = o.create(r)
        }

        function c() {
            if (m && m.getAdvanceApi) {
                var e = m.getAdvanceApi(),
                    t = e.getModel(),
                    n = Math.min(t.length, e.getLayout().getColumnCount());
                if (n > g) {
                    g = n;
                    for (var i = 0, a = n; a > i; i++) t[i].getDomElement().addClass("show-on-anim")
                }
                e.view.domElement.addClass("shorten-for-anim")
            }
        }

        function u() {
            m && m.getAdvanceApi && m.getAdvanceApi().view.domElement.removeClass("shorten-for-anim")
        }

        function d() {
            m && i.broadcast(a.onShowStream)
        }

        function p() {
            m && (m.onVisible(), u())
        }

        function h() {
            m && (c(), m.onInvisible())
        }

        function f() {
            m && (i.broadcast(a.onHideStream), m.onInvisible())
        }
        var m;
        ! function() {
            e = $(e), r.create(e), e.length && (t.embedData.proSidebarEnabled === !0 ? l("sidebarmorefromauthor/1/0", {
                filterApiResponse: function(e) {
                    return _.each(e.stream, function(e) {
                        "doc" === e.type && (e.type = "docExternal")
                    }), e
                }
            }) : "P" === t.doc.state ? l("publicationupload/1/0") : l("related/3/2", {
                ads: t.showRelatedStreamAds
            }))
        }();
        var g = 0;
        return {
            preload: function() {
                return m ? m.preload.apply(m, arguments) : void 0
            },
            start: function() {
                return m ? m.start.apply(m, arguments) : void 0
            },
            resize: function() {
                return m.resizeStream()
            },
            showAll: p,
            onShowAnimStart: d,
            hideAll: f,
            onHideAnimStart: h
        }
    }
}, function(e, t) {
    /*!
     * escape-html
     * Copyright(c) 2012-2013 TJ Holowaychuk
     * Copyright(c) 2015 Andreas Lubbe
     * Copyright(c) 2015 Tiancheng "Timothy" Gu
     * MIT Licensed
     */
    "use strict";

    function n(e) {
        var t = "" + e,
            n = i.exec(t);
        if (!n) return t;
        var a, o = "",
            r = 0,
            s = 0;
        for (r = n.index; r < t.length; r++) {
            switch (t.charCodeAt(r)) {
                case 34:
                    a = "&quot;";
                    break;
                case 38:
                    a = "&amp;";
                    break;
                case 39:
                    a = "&#39;";
                    break;
                case 60:
                    a = "&lt;";
                    break;
                case 62:
                    a = "&gt;";
                    break;
                default:
                    continue
            }
            s !== r && (o += t.substring(s, r)), s = r + 1, o += a
        }
        return s !== r ? o + t.substring(s, r) : o
    }
    var i = /["'&<>]/;
    e.exports = n
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            var o, r;
            return '            <li class="stacklist__item">\n                ' + (null != (r = null != (r = n.createStackMarkup || (null != t ? t.createStackMarkup : t)) ? r : n.helperMissing, o = "function" == typeof r ? r.call(null != t ? t : {}, {
                name: "createStackMarkup",
                hash: {},
                data: a
            }) : r) ? o : "") + "\n            </li>\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression;
            return '<div class="addtostacks">\n    <h2 class="addtostacks__title">' + u((r = null != (r = n.title || (null != t ? t.title : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "title",
                hash: {},
                data: a
            }) : r)) + '</h2>\n    <ul class="addtostacks__stacklist stacklist js-stacklist">\n' + (null != (o = n["if"].call(s, null != t ? t.createStackMarkup : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '    </ul>\n\n    <div>\n        <button class="btn btn-success js-addtostack" disabled="disabled">' + u((r = null != (r = n.doneButtonText || (null != t ? t.doneButtonText : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "doneButtonText",
                hash: {},
                data: a
            }) : r)) + '</button>\n        <button class="btn btn-default js-addtostack-cancel">' + u((r = null != (r = n.cancelButtonText || (null != t ? t.cancelButtonText : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "cancelButtonText",
                hash: {},
                data: a
            }) : r)) + '</button>\n    </div>\n\n    <a href="javascript:void(0);" class="btn btn-default addtostacks-arrow addtostacks-arrow--prev js-addtostacks-prev">\n        <span class="issuuicon issuuicon-chevron-left-thin"></span>\n    </a>\n    <a href="javascript:void(0);" class="btn btn-default addtostacks-arrow addtostacks-arrow--next js-addtostacks-next">\n        <span class="issuuicon issuuicon-chevron-right-thin"></span>\n    </a>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            return "social-icon--pinterest"
        },
        3: function(e, t, n, i, a) {
            return "social-icon--facebook"
        },
        5: function(e, t, n, i, a) {
            return "social-icon--twitter"
        },
        7: function(e, t, n, i, a) {
            return "social-icon--tumblr"
        },
        9: function(e, t, n, i, a) {
            return "social-icon--google"
        },
        11: function(e, t, n, i, a) {
            return "social-icon--linkedin"
        },
        13: function(e, t, n, i, a) {
            return "social-icon--email"
        },
        15: function(e, t, n, i, a) {
            return '    <li class="social-icons__item">\n        <a href="javascript:void(0);" class="\n            social-icon social-icon--moreless js-moreless">' + e.escapeExpression(n.t.call(null != t ? t : {}, "sharer.toggleLess", {
                name: "t",
                hash: {},
                data: a
            })) + "</a>\n    </li>\n"
        },
        17: function(e, t, n, i, a) {
            return '<div class="form-group sharelink">\n    <h3>' + e.escapeExpression(n.t.call(null != t ? t : {}, "sharer.headerDirectLink", {
                name: "t",
                hash: {},
                data: a
            })) + '</h3>\n    <input type="text" class="form-control js-link readonly" value="" />\n</div>\n'
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {};
            return '<ul class="social-icons js-shareservices">\n    <li class="social-icons__item">\n        <a class="\n            social-icon ' + (null != (o = n["if"].call(r, null != t ? t.includeSocialIconsColors : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + ' js-service js-pinterest btn" href="javascript:void(0);">\n            <span class="issuuicon issuuicon-pinterest"></span>\n        </a>\n    </li>\n    <li class="social-icons__item">\n        <a class="\n            social-icon ' + (null != (o = n["if"].call(r, null != t ? t.includeSocialIconsColors : t, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + ' js-service js-facebook btn" href="javascript:void(0);">\n            <span class="issuuicon issuuicon-facebook"></span>\n        </a>\n    </li>\n    <li class="social-icons__item">\n        <a class="\n            social-icon ' + (null != (o = n["if"].call(r, null != t ? t.includeSocialIconsColors : t, {
                name: "if",
                hash: {},
                fn: e.program(5, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + ' js-service js-twitter btn" href="javascript:void(0);">\n            <span class="issuuicon issuuicon-twitter"></span>\n        </a>\n    </li>\n    <li class="social-icons__item js-expandable">\n        <a class="\n            social-icon ' + (null != (o = n["if"].call(r, null != t ? t.includeSocialIconsColors : t, {
                name: "if",
                hash: {},
                fn: e.program(7, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + ' js-service js-tumblr btn" href="javascript:void(0);">\n            <span class="issuuicon issuuicon-tumblr"></span>\n        </a>\n    </li>\n    <li class="social-icons__item js-expandable">\n        <a class="\n            social-icon ' + (null != (o = n["if"].call(r, null != t ? t.includeSocialIconsColors : t, {
                name: "if",
                hash: {},
                fn: e.program(9, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + ' js-service js-google btn" href="javascript:void(0);">\n            <span class="issuuicon issuuicon-google-plus"></span>\n        </a>\n    </li>\n    <li class="social-icons__item js-expandable">\n        <a class="\n            social-icon ' + (null != (o = n["if"].call(r, null != t ? t.includeSocialIconsColors : t, {
                name: "if",
                hash: {},
                fn: e.program(11, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + ' js-service js-linkedin btn" href="javascript:void(0);">\n            <span class="issuuicon issuuicon-linkedin"></span>\n        </a>\n    </li>\n    <li class="social-icons__item">\n        <a class="\n            social-icon ' + (null != (o = n["if"].call(r, null != t ? t.includeSocialIconsColors : t, {
                name: "if",
                hash: {},
                fn: e.program(13, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + ' js-service email js-email btn" href="javascript:void(0);">\n            <span class="issuuicon issuuicon-envelope"></span>\n        </a>\n    </li>\n' + (null != (o = n["if"].call(r, null != t ? t.includeMoreLessToggle : t, {
                name: "if",
                hash: {},
                fn: e.program(15, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "</ul>\n\n" + (null != (o = n["if"].call(r, null != t ? t.includeLinkField : t, {
                name: "if",
                hash: {},
                fn: e.program(17, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "")
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            return '<style>\n    @-webkit-keyframes rotate {\n        from {\n            -webkit-transform: rotate(0deg);\n                    transform: rotate(0deg);\n        }\n        to {\n            -webkit-transform: rotate(360deg);\n                    transform: rotate(360deg);\n        }\n    }\n\n\n    @keyframes rotate {\n        from {\n            -webkit-transform: rotate(0deg);\n                    transform: rotate(0deg);\n        }\n        to {\n            -webkit-transform: rotate(360deg);\n                    transform: rotate(360deg);\n        }\n    }\n\n    .interstitial {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        z-index: 1000;\n        background: rgb(53, 53, 53);\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        -webkit-align-items: center;\n            -ms-flex-align: center;\n                align-items: center;\n\n        /* fixes bug in Chrome 48, https://code.google.com/p/chromium/issues/detail?id=546034#c6 */\n        min-width: 0; min-height: 0\n    }\n\n    .interstitial__ad-disclosure {\n        text-transform: uppercase;\n        text-align: right;\n        margin: 0 0 3px auto;\n        font-size: 12px;\n    }\n\n    .interstitial__close {\n        -webkit-align-self: flex-end;\n            -ms-flex-item-align: end;\n                align-self: flex-end;\n        padding: 20px;\n        -webkit-flex-shrink: 0;\n            -ms-flex-negative: 0;\n                flex-shrink: 0;\n        opacity: 0;\n        transition: opacity 1000ms 1500ms ease-in-out;\n\n        /* fixes bug in Chrome 48, https://code.google.com/p/chromium/issues/detail?id=546034#c6 */\n        min-width: 0; min-height: 0\n    }\n\n    .interstitial__close--visible {\n        opacity: 1;\n    }\n\n    .interstitial__adcontainer {\n        overflow: hidden;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        -webkit-flex-basis: 0;\n            -ms-flex-preferred-size: 0;\n                flex-basis: 0;\n        -webkit-flex-grow: 5;\n            -ms-flex-positive: 5;\n                flex-grow: 5;\n        -webkit-align-items: center;\n            -ms-flex-align: center;\n                align-items: center;\n        -webkit-justify-content: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n\n        /* fixes bug in Chrome 48, https://code.google.com/p/chromium/issues/detail?id=546034#c6 */\n        min-width: 0; min-height: 0\n    }\n\n        .interstitial__ad--hidden {\n            z-index: -1;\n            position: absolute;\n            visibility: hidden;\n            opacity: 0;\n            top: -5000;\n            left: -5000;\n        }\n\n        .interstitial__ad {\n            margin: 0 auto;\n\n            /* fixes bug in Chrome 48, https://code.google.com/p/chromium/issues/detail?id=546034#c6 */\n            min-width: 0; min-height: 0\n        }\n\n        .interstitial__spinner {\n            -webkit-flex-grow: 1;\n                -ms-flex-positive: 1;\n                    flex-grow: 1;\n            display: -webkit-flex;\n            display: -ms-flexbox;\n            display: flex;\n            -webkit-align-items: center;\n                -ms-flex-align: center;\n                    align-items: center;\n            -webkit-animation: rotate 0.7s infinite linear;\n            -moz-animation: rotate 0.7s infinite linear;\n            -o-animation: rotate 0.7s infinite linear;\n\n            /* fixes bug in Chrome 48, https://code.google.com/p/chromium/issues/detail?id=546034#c6 */\n            min-width: 0; min-height: 0\n        }\n\n    .interstitial__brand {\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-flex-grow: 1;\n            -ms-flex-positive: 1;\n                flex-grow: 1;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        -webkit-align-items: center;\n            -ms-flex-align: center;\n                align-items: center;\n\n        /* fixes bug in Chrome 48, https://code.google.com/p/chromium/issues/detail?id=546034#c6 */\n        min-width: 0; min-height: 0;\n        width: 100%;\n        background: #3C3C3C;\n    }\n\n        .interstitial__next {\n            display: -webkit-flex;\n            display: -ms-flexbox;\n            display: flex;\n            -webkit-flex-grow: 1;\n                -ms-flex-positive: 1;\n                    flex-grow: 1;\n            -webkit-flex-direction: column;\n                -ms-flex-direction: column;\n                    flex-direction: column;\n            -webkit-align-items: center;\n                -ms-flex-align: center;\n                    align-items: center;\n            -webkit-align-content: center;\n                -ms-flex-line-pack: center;\n                    align-content: center;\n            -webkit-justify-content: center;\n                -ms-flex-pack: center;\n                    justify-content: center;\n\n            /* fixes bug in Chrome 48, https://code.google.com/p/chromium/issues/detail?id=546034#c6 */\n            min-width: 0; min-height: 0\n            color: #969696;\n        }\n\n        .interstitial__logo {\n            display: -webkit-flex;\n            display: -ms-flexbox;\n            display: flex;\n            -webkit-flex-grow: 1;\n                -ms-flex-positive: 1;\n                    flex-grow: 1;\n            -webkit-flex-direction: row;\n                -ms-flex-direction: row;\n                    flex-direction: row;\n            -webkit-align-items: center;\n                -ms-flex-align: center;\n                    align-items: center;\n            -webkit-justify-content: flex-start;\n                -ms-flex-pack: start;\n                    justify-content: flex-start;\n\n            /* fixes bug in Chrome 48, https://code.google.com/p/chromium/issues/detail?id=546034#c6 */\n            min-width: 0; min-height: 0\n        }\n\n        .interstitial__logo-graphic {\n            margin-left: 1em;\n        }\n\n        .interstitial__close-button {\n            border-radius: 20px;\n            padding-left: 30px;\n            padding-right: 30px;\n            letter-spacing: 1px;\n        }\n\n        .interstitial__document-summary {\n            font-weight: bold;\n            color: #969696;\n            z-index: 1;\n        }\n\n        .interstitial__paragraph--hidden {\n            display: none;\n        }\n</style>\n\n\n<div class="interstitial">\n    <a href="javascript:void(0);" class="js-close js-corner-close interstitial__close"><span class="issuuicon issuuicon-remove"></span></a>\n\n    <div class="interstitial__adcontainer">\n        <p class="interstitial__ad-disclosure interstitial__paragraph--hidden">Advertisement</p>\n        <div class="interstitial__ad interstitial__ad--hidden js-ad" id="yt-player"></div>\n        <p class="interstitial__document-summary interstitial__paragraph--hidden">\n            Got to get away? Take issuu partner 1903 Magazine for a joyride.\n        </p>\n        <svg class="interstitial__spinner js-spinner" width="50px" height="50px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n            <defs></defs>\n            <g class="spinner__icon" stroke="none" stroke-width="1" fill="#666" fill-rule="evenodd">\n                <g>\n                    <g transform="translate(7.000000, 7.000000)">\n                        <g>\n                            <path d="M6.77787915,6.84548427 C5.79003176,7.83333166 4.18814246,7.83322341 3.2001563,6.84523725 C2.21223953,5.85732047 2.21223953,4.25567819 3.2001563,3.26776142 C4.18822365,2.27969408 5.7896189,2.27974819 6.77763213,3.26776142 C7.76571475,4.25584404 7.76587711,5.8574863 6.77787915,6.84548427 L8.24993998,8.31754509 C10.0510015,6.51648357 10.0507055,3.59671316 8.24969296,1.79570059 C6.44870526,-0.00528710987 3.52918184,-0.00538576575 1.72809548,1.79570059 C-0.0728180424,3.59661411 -0.0728180424,6.51638456 1.72809548,8.31729807 C3.52903385,10.1182364 6.4490513,10.1184338 8.24993998,8.31754509 L6.77787915,6.84548427 L6.77787915,6.84548427 Z"></path>\n                        </g>\n                    </g>\n                    <path d="M12,23 C18.0751322,23 23,18.0751322 23,12 C23,5.92486775 18.0751322,1 12,1 C5.92486775,1 1,5.92486775 1,12 C1,18.0751322 5.92486775,23 12,23 Z M12,20.0250244 C16.4320986,20.0250244 20.0250244,16.4320986 20.0250244,12 C20.0250244,7.5679014 16.4320986,3.97497559 12,3.97497559 C7.5679014,3.97497559 3.97497559,7.5679014 3.97497559,12 C3.97497559,16.4320986 7.5679014,20.0250244 12,20.0250244 Z" fill-opacity="0.5"></path>\n                    <path d="M3.97746854,12.2020107 C3.88040309,13.3666506 2.94475898,13.6536116 2.48144531,13.6567993 C1.99243164,13.6601639 0.999999997,13.1174211 1,12 C1.00000002,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,13.1278573 22.0378909,13.5112302 21.5430908,13.5112305 C21.0482908,13.5112307 20.0457764,13.2033275 20.0457764,12 C20.0457764,11.9485283 20.0382948,11.8986091 20.0236545,11.8502139 C19.9437915,7.48723335 16.3820616,3.97497559 12,3.97497559 C7.5679014,3.97497559 3.97497559,7.5679014 3.97497559,12 C3.97497559,12.067535 3.97580982,12.1348751 3.97746854,12.2020107 Z"></path>\n                </g>\n            </g>\n        </svg>\n    </div>\n    <div class="interstitial__brand">\n        <div class="interstitial__next">\n            <p class="interstitial__next-help">\n                Thanks, but take me to the publication I\'ve selected.\n            </p>\n            <button class="interstitial__close-button btn btn-primary js-close js-btn-next" disabled>Publication loading</button>\n        </div>\n        <div class="interstitial__logo">\n            Powered by\n            <svg class="interstitial__logo-graphic" width="56px" height="14px" viewBox="0 0 56 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n                    <g transform="translate(-726.000000, -932.000000)">\n                        <g transform="translate(726.000000, 932.000000)">\n                            <g>\n                                <g transform="translate(17.000000, 0.000000)" fill="#E4E4E4">\n                                    <path d="M1.18803132,0.461209677 C1.75267275,0.461209677 2.22289738,0.943235887 2.22289738,1.52137097 C2.22289738,2.09950605 1.75267275,2.58110887 1.18803132,2.58110887 C0.624009688,2.58110887 0.153578461,2.09950605 0.153578461,1.52137097 C0.153578461,0.943235887 0.624009688,0.461209677 1.18803132,0.461209677 L1.18803132,0.461209677 Z M1.18803132,12.5656351 C0.661197927,12.5656351 0.30419083,12.160877 0.30419083,11.6597984 L0.30419083,4.79775202 C0.30419083,4.29709677 0.680411851,3.89212702 1.18803132,3.89212702 C1.69627059,3.89212702 2.07228501,4.29709677 2.07228501,4.79775202 L2.07228501,11.6597984 C2.07228501,12.160877 1.71486471,12.5656351 1.18803132,12.5656351 L1.18803132,12.5656351 Z"></path>\n                                    <path d="M7.56498795,12.6429032 C6.37971612,12.6429032 5.32646254,12.2574093 4.5742271,11.6597984 C4.31101701,11.4478931 4.19779948,11.1587198 4.19779948,10.9080746 C4.19779948,10.522369 4.49902422,10.2715121 4.87524524,10.2715121 C5.17585017,10.2715121 5.36427059,10.3877319 5.57107852,10.5420565 C6.07890458,10.9273387 6.79353858,11.2931452 7.69679959,11.2931452 C8.71265833,11.2931452 9.25808584,10.9080746 9.25808584,10.3104637 C9.25808584,9.65548387 8.73125245,9.40462702 7.41437558,9.03797379 C5.10085389,8.40268145 4.25440825,7.59231855 4.25440825,6.20509073 C4.25440825,4.75943548 5.5522778,3.81485887 7.58399527,3.81485887 C8.35503143,3.81485887 9.2200712,4.00771169 9.91631767,4.35446573 C10.4241437,4.60511089 10.781564,4.91333669 10.781564,5.29904234 C10.781564,5.64579637 10.5935568,5.97392137 10.1045315,5.97392137 C9.85991551,5.97392137 9.61529954,5.858125 9.33328872,5.70337702 C8.80624873,5.41462702 8.22321978,5.26114919 7.54639383,5.26114919 C6.60573797,5.26114919 5.96610026,5.51137097 5.96610026,6.18561492 C5.96610026,6.84144153 6.53053509,7.05292339 7.8848068,7.45789315 C9.91631767,8.05529234 10.9697779,8.61416331 10.9697779,10.1754032 C10.9697779,11.602006 9.80351335,12.6429032 7.56498795,12.6429032"></path>\n                                    <path d="M16.0804749,12.6429032 C14.8952031,12.6429032 13.8415363,12.2574093 13.0893009,11.6597984 C12.8258842,11.4478931 12.7130799,11.1587198 12.7130799,10.9080746 C12.7130799,10.522369 13.014098,10.2715121 13.390319,10.2715121 C13.6913372,10.2715121 13.8791378,10.3877319 14.0863589,10.5420565 C14.5939784,10.9273387 15.3086124,11.2931452 16.2114602,11.2931452 C17.2275255,11.2931452 17.772953,10.9080746 17.772953,10.3104637 C17.772953,9.65548387 17.2465328,9.40462702 15.9298626,9.03797379 C13.6159277,8.40268145 12.7696886,7.59231855 12.7696886,6.20509073 C12.7696886,4.75943548 14.0677648,3.81485887 16.0990691,3.81485887 C16.8703118,3.81485887 17.7357648,4.00771169 18.4318047,4.35446573 C18.9392175,4.60511089 19.297051,4.91333669 19.297051,5.29904234 C19.297051,5.64579637 19.1088372,5.97392137 18.6193987,5.97392137 C18.3749893,5.97392137 18.1303733,5.858125 17.8485691,5.70337702 C17.3219423,5.41462702 16.7385002,5.26114919 16.0614676,5.26114919 C15.1208118,5.26114919 14.4813806,5.51137097 14.4813806,6.18561492 C14.4813806,6.84144153 15.0454023,7.05292339 16.4000872,7.45789315 C18.4318047,8.05529234 19.4850582,8.61416331 19.4850582,10.1754032 C19.4850582,11.602006 18.3185871,12.6429032 16.0804749,12.6429032"></path>\n                                    <path d="M21.1926182,8.61416331 L21.1926182,4.79775202 C21.1926182,4.29709677 21.5878466,3.89212702 22.0768719,3.89212702 C22.5658973,3.89212702 22.9611256,4.29709677 22.9611256,4.79775202 L22.9611256,8.82606855 C22.9611256,10.0409778 23.8823609,10.9849194 25.1246547,10.9849194 C26.3659155,10.9849194 27.3063648,10.0409778 27.3063648,8.82606855 L27.3063648,4.79775202 C27.3063648,4.29709677 27.7015931,3.89212702 28.1902052,3.89212702 C28.679024,3.89212702 29.0740457,4.29709677 29.0740457,4.79775202 L29.0740457,8.61416331 C29.0740457,10.8697581 27.4001618,12.6429032 25.1246547,12.6429032 C22.8481147,12.6429032 21.1926182,10.8697581 21.1926182,8.61416331"></path>\n                                    <path d="M31.0324197,8.61416331 L31.0324197,4.79775202 C31.0324197,4.29709677 31.4272349,3.89212702 31.9164668,3.89212702 C32.405079,3.89212702 32.8003073,4.29709677 32.8003073,4.79775202 L32.8003073,8.82606855 C32.8003073,10.0409778 33.7225756,10.9849194 34.9636298,10.9849194 C36.2048906,10.9849194 37.1455465,10.0409778 37.1455465,8.82606855 L37.1455465,4.79775202 C37.1455465,4.29709677 37.5407748,3.89212702 38.0298002,3.89212702 C38.5192387,3.89212702 38.9136406,4.29709677 38.9136406,4.79775202 L38.9136406,8.61416331 C38.9136406,10.8697581 37.2401699,12.6429032 34.9636298,12.6429032 C32.6872964,12.6429032 31.0324197,10.8697581 31.0324197,8.61416331"></path>\n                                </g>\n                                <g fill="#F66C59">\n                                    <path d="M6.83590808,3.64127016 C5.02752664,3.6236996 3.54764132,5.11190524 3.53049341,6.96464718 C3.5133455,8.81760081 4.96575284,10.3339617 6.77413428,10.3515323 C8.58251571,10.3688911 10.0626076,8.88089718 10.0795489,7.02815524 C10.0966969,5.17520161 8.64428951,3.65862903 6.83590808,3.64127016 L6.83590808,3.64127016 Z M6.78942278,8.69524194 C5.87376569,8.68635081 5.13826495,7.91853831 5.14694221,6.9803125 C5.15561947,6.04208669 5.90496249,5.28845766 6.82061958,5.29734879 C7.73627667,5.30623992 8.4717774,6.07405242 8.46310015,7.01248992 C8.45442289,7.95050403 7.70507987,8.70413306 6.78942278,8.69524194 L6.78942278,8.69524194 Z"></path>\n                                    <path d="M6.75843258,0.424375 C6.74830911,0.424375 6.73818565,0.424798387 6.72785558,0.424798387 L6.72785558,0.424163306 L0.856245804,0.424163306 C0.562045511,0.424163306 0.321148361,0.67078629 0.321148361,0.972449597 L0.321148361,7.02053427 C0.321148361,10.6633569 3.2032369,13.6164819 6.75843258,13.6164819 C10.3138349,13.6164819 13.1957168,10.6633569 13.1957168,7.02053427 C13.1957168,3.3775 10.3138349,0.424375 6.75843258,0.424375 L6.75843258,0.424375 Z M2.33592452,6.92929435 C2.35927047,4.40019153 4.37921167,2.36920363 6.84747775,2.39291331 C9.31574383,2.41683468 11.2980836,4.48677419 11.274531,7.01566532 C11.2513917,9.54455645 9.23124389,11.5755444 6.76318441,11.551623 C4.29491833,11.5277016 2.31257857,9.45797379 2.33592452,6.92929435 L2.33592452,6.92929435 Z"></path>\n                                </g>\n                            </g>\n                        </g>\n                    </g>\n                </g>\n            </svg>\n        </div>\n    </div>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o;
            return '<style type="text/css">\n\n    .interstitial-display {\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n    }\n\n    .interstitial-display__label {\n        text-align: right;\n        text-transform: uppercase;\n        margin-top: 10px;\n    }\n\n    @media only screen and (min-width:720px) {\n        .interstitial-display {\n            padding: 100px 200px;\n            background-color: #444444;\n        }\n    }\n\n</style>\n\n\n<div class="js-interstitial-display interstitial-display">\n    <div class="interstitial-display__ad" id="' + e.escapeExpression((o = null != (o = n.adContainerId || (null != t ? t.adContainerId : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(null != t ? t : {}, {
                name: "adContainerId",
                hash: {},
                data: a
            }) : o)) + '"></div>\n    <p class="interstitial-display__label">Advertisement</p>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = n.helperMissing,
                l = "function",
                c = e.escapeExpression;
            return '<link href="//static.isu.pub/fe/videoplayer/videojs.css" rel="stylesheet">\n\n<video\n    class="video-js vjs-default-skin vjs-big-play-centered"\n    controls preload="auto"\n    width="' + c((o = null != (o = n.width || (null != t ? t.width : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "width",
                hash: {},
                data: a
            }) : o)) + '"\n    height="' + c((o = null != (o = n.height || (null != t ? t.height : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "height",
                hash: {},
                data: a
            }) : o)) + '"\n    data-setup=""\n>\n</video>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o = null != t ? t : {},
                r = e.escapeExpression;
            return '<section class="white default-style bg-white theme-light">\n    <h1>' + r(n.t.call(o, "socialpermissions.headline", {
                name: "t",
                hash: {},
                data: a
            })) + '</h1>\n\n    <p style="margin-bottom: 25px;">\n        ' + r(n.t.call(o, "socialpermissions.bodyText", {
                name: "t",
                hash: {},
                data: a
            })) + '\n    </p>\n\n    <p>\n        <button class="success btn btn-success js-retry">' + r(n.t.call(o, "socialpermissions.buttonRetry", {
                name: "t",
                hash: {},
                data: a
            })) + '</button>\n        <button class="secondary btn btn-default js-cancel">' + r(n.t.call(o, "socialpermissions.buttonCancel", {
                name: "t",
                hash: {},
                data: a
            })) + "</button>\n    </p>\n</section>\n\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = n.helperMissing,
                l = "function",
                c = e.escapeExpression;
            return '<a style="display:none;" title="Peecho" href="http://www.peecho.com" class="peecho-print-button" data-filetype="pdf" data-width="' + c((o = null != (o = n.coverWidth || (null != t ? t.coverWidth : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "coverWidth",
                hash: {},
                data: a
            }) : o)) + '" data-height="' + c((o = null != (o = n.coverHeight || (null != t ? t.coverHeight : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "coverHeight",
                hash: {},
                data: a
            }) : o)) + '" data-pages="' + c((o = null != (o = n.pageCount || (null != t ? t.pageCount : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "pageCount",
                hash: {},
                data: a
            }) : o)) + '" data-src="' + c((o = null != (o = n.downloadUrl || (null != t ? t.downloadUrl : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "downloadUrl",
                hash: {},
                data: a
            }) : o)) + '" data-title="' + c((o = null != (o = n.title || (null != t ? t.title : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "title",
                hash: {},
                data: a
            }) : o)) + '" data-country="' + c((o = null != (o = n.ISO3166Country || (null != t ? t.ISO3166Country : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "ISO3166Country",
                hash: {},
                data: a
            }) : o)) + '" data-text="Issuu_printable" data-thumbnail="' + c((o = null != (o = n.thumbUrl || (null != t ? t.thumbUrl : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "thumbUrl",
                hash: {},
                data: a
            }) : o)) + '">\n    Peecho\n</a>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o = null != t ? t : {},
                r = e.escapeExpression;
            return '<div class="forgot-password-screen2 signinup-default">\n\n    <h1>' + r(n.t.call(o, "forgotPasswordWidget.emailWasSent", {
                name: "t",
                hash: {},
                data: a
            })) + '</h1>\n\n    <a href="/" class="ok-button btn btn-success" tabindex="3">\n        <span class="text">' + r(n.t.call(o, "forgotPasswordWidget.ok", {
                name: "t",
                hash: {},
                data: a
            })) + '</span>\n        <span class="issuuicons"></span>\n    </a>\n    <br />\n\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = e.escapeExpression;
            return '<div class="forgot-password-screen signinup-default theme-default">\n    <h1 id="show-errors-here">' + s(n.t.call(r, "forgotPasswordWidget.title", {
                name: "t",
                hash: {},
                data: a
            })) + '</h1>\n    <p class="tip">' + s(n.t.call(r, "forgotPasswordWidget.tip", {
                name: "t",
                hash: {},
                data: a
            })) + '</p>\n    <form id="forgot-password-form" >\n\n        <p class="form-group center-block form-content-constrainer" id="username-input">\n            <input id="username" name="username" type="text" value=""\n                       maxlength="" tabindex="" autocomplete="off"\n                   class="form-control"\n                       placeholder="' + s(n.t.call(r, "signinWidget.usernameOrEmail", {
                name: "t",
                hash: {},
                data: a
            })) + '">\n        </p>\n        <br>\n        <div id="recaptcha_widget" class="password_reset">\n            <div class="g-recaptcha" data-sitekey="' + s((o = null != (o = n.recaptchaSiteKey || (null != t ? t.recaptchaSiteKey : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(r, {
                name: "recaptchaSiteKey",
                hash: {},
                data: a
            }) : o)) + '" data-callback="GOOGLE_RECAPTCHA_CALLBACK"></div>\n        </div>\n        <br>\n        <br>\n\n        <button id="send-email-button" class="btn btn-success" tabindex="3" >\n            <span class="text">' + s(n.t.call(r, "forgotPasswordWidget.sendEmail", {
                name: "t",
                hash: {},
                data: a
            })) + '</span>\n            <span class="issuuicons"></span>\n        </button>\n        <br><br><br>\n\n        <a href="" id="i-remember" class="type-discreet" tabindex="5">' + s(n.t.call(r, "forgotPasswordWidget.remember", {
                name: "t",
                hash: {},
                data: a
            })) + "</a>\n    </form>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = e.escapeExpression;
            return '<div class="login-screen signinup-default theme-default">\n    <h1>\n            ' + s((o = null != (o = n.headerText || (null != t ? t.headerText : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(r, {
                name: "headerText",
                hash: {},
                data: a
            }) : o)) + '\n    </h1>\n    <div class="center-block form-content-constrainer">\n        <p class="divider">\n            ' + s(n.t.call(r, "signinWidget.connectNow", {
                name: "t",
                hash: {},
                data: a
            })) + '\n        </p>\n        <p>\n            <button id="fb-login" class="btn btn-default social facebook" type="button">\n                <span class="issuuicon issuuicon-facebook"></span>\n            </button>\n            <button id="google-login" class="btn btn-default social google" type="button">\n                <span class="issuuicon issuuicon-google-plus"></span>\n            </button>\n            <button id="linkedin-login" class="btn btn-default social linkedin" type="button">\n                <span class="issuuicon issuuicon-linkedin"></span>\n            </button>\n        </p>\n        <p class="divider">' + s(n.t.call(r, "signinWidget.or", {
                name: "t",
                hash: {},
                data: a
            })) + '</p>\n        <form id="login-form">\n            <div id="other-errors-here" class="alert bg-warning text-warning" style="display:none;" data-display="block"></div>\n            <p id="usernameErrors"></p>\n            <p class="form-group">\n                <input id="login-username" class="form-control" name="username" type="text" placeholder="' + s(n.t.call(r, "signinWidget.usernameOrEmail", {
                name: "t",
                hash: {},
                data: a
            })) + '" title="' + s(n.t.call(r, "signinWidget.usernameOrEmailTitle", {
                name: "t",
                hash: {},
                data: a
            })) + '" pattern=".{4,}" autocapitalize="off" autocomplete="username" required />\n            </p>\n            <p id="passwordErrors"></p>\n            <p class="form-group">\n                <input id="login-password" class="form-control" name="password" type="password" placeholder="' + s(n.t.call(r, "signinWidget.password", {
                name: "t",
                hash: {},
                data: a
            })) + '" title="' + s(n.t.call(r, "signinWidget.passwordTitle", {
                name: "t",
                hash: {},
                data: a
            })) + '" pattern=".{4,}" autocomplete="current-password" required />\n            </p>\n            <p>\n                <button id="login-button" class="btn btn-success" type="submit" data-button="state" data-timer="false">' + s(n.t.call(r, "signinWidget.letMeIn", {
                name: "t",
                hash: {},
                data: a
            })) + '</button>\n            </p>\n            <br><br>\n            <p>\n                <a href="" id="cant-remember" class="type-discreet" >' + s(n.t.call(r, "signinWidget.cantRemember2", {
                name: "t",
                hash: {},
                data: a
            })) + "</a>\n            </p>\n        </form>\n    </div>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            var o;
            return '        href="' + e.escapeExpression((o = null != (o = n.linkUrl || (null != t ? t.linkUrl : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(null != t ? t : {}, {
                name: "linkUrl",
                hash: {},
                data: a
            }) : o)) + '"\n'
        },
        3: function(e, t, n, i, a) {
            return " publisher-owned"
        },
        5: function(e, t, n, i, a) {
            return " internal-navigation"
        },
        7: function(e, t, n, i, a) {
            return 'title="' + e.escapeExpression(n.t.call(null != t ? t : {}, "clippings.playVideo", {
                name: "t",
                hash: {},
                data: a
            })) + '"'
        },
        9: function(e, t, n, i, a) {
            var o;
            return '    <span class="activator js-link">\n        <span class="issuuicon issuuicon-' + e.escapeExpression((o = null != (o = n.icon || (null != t ? t.icon : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(null != t ? t : {}, {
                name: "icon",
                hash: {},
                data: a
            }) : o)) + '"></span>\n    </span>\n'
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression;
            return "<a\n" + (null != (o = n["if"].call(s, null != t ? t.linkUrl : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '    class="clipping-area' + (null != (o = n["if"].call(s, null != t ? t.isPublisherClipping : t, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + (null != (o = n["if"].call(s, null != t ? t.isInternalNavigation : t, {
                name: "if",
                hash: {},
                fn: e.program(5, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '"\n    style="width: ' + u((r = null != (r = n.absoluteWidth || (null != t ? t.absoluteWidth : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "absoluteWidth",
                hash: {},
                data: a
            }) : r)) + "px; height: " + u((r = null != (r = n.absoluteHeight || (null != t ? t.absoluteHeight : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "absoluteHeight",
                hash: {},
                data: a
            }) : r)) + "px; top: " + u((r = null != (r = n.absoluteY || (null != t ? t.absoluteY : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "absoluteY",
                hash: {},
                data: a
            }) : r)) + "px; left: " + u((r = null != (r = n.absoluteX || (null != t ? t.absoluteX : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "absoluteX",
                hash: {},
                data: a
            }) : r)) + 'px;"\n    target="_blank"\n    rel="nofollow"\n    ' + (null != (o = n["if"].call(s, null != t ? t.isVideo : t, {
                name: "if",
                hash: {},
                fn: e.program(7, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "\n>\n\n" + (null != (o = n["if"].call(s, null != t ? t.icon : t, {
                name: "if",
                hash: {},
                fn: e.program(9, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "\n</a>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            return " publisher-owned"
        },
        3: function(e, t, n, i, a) {
            return " reader-owned"
        },
        5: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = n.helperMissing,
                l = "function",
                c = e.escapeExpression;
            return 'style="top: ' + c((o = null != (o = n.absoluteY || (null != t ? t.absoluteY : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "absoluteY",
                hash: {},
                data: a
            }) : o)) + "px; left: " + c((o = null != (o = n.absoluteX || (null != t ? t.absoluteX : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "absoluteX",
                hash: {},
                data: a
            }) : o)) + 'px;"'
        },
        7: function(e, t, n, i, a) {
            var o;
            return '            <span class="counter js-commentcount">' + e.escapeExpression((o = null != (o = n.commentCount || (null != t ? t.commentCount : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(null != t ? t : {}, {
                name: "commentCount",
                hash: {},
                data: a
            }) : o)) + "</span>\n"
        },
        9: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = n.helperMissing,
                l = "function",
                c = e.escapeExpression;
            return '    <a href="' + c((o = null != (o = n.linkUrl || (null != t ? t.linkUrl : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "linkUrl",
                hash: {},
                data: a
            }) : o)) + '" target="_blank" rel="nofollow" class="activator js-sharetrigger">\n        <span class="activator js-link">\n            <span class="issuuicon issuuicon-' + c((o = null != (o = n.icon || (null != t ? t.icon : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "icon",
                hash: {},
                data: a
            }) : o)) + '"></span>\n        </span>\n    </a>\n'
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {};
            return '<div class="clipping-buttoncontainer\n    ' + (null != (o = n["if"].call(s, null != t ? t.isPublisherClipping : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.program(3, a, 0),
                data: a
            })) ? o : "") + '"\n    ' + (null != (o = n["if"].call(s, null != t ? t.positionAbsolutely : t, {
                name: "if",
                hash: {},
                fn: e.program(5, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '\n>\n\n    <a href="javascript:void(0);" class="activator--teardrop js-commenttrigger">\n        <span class="issuuicon issuuicon-comment"></span>\n' + (null != (o = n["if"].call(s, null != t ? t.commentsAllowed : t, {
                name: "if",
                hash: {},
                fn: e.program(7, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '    </a>\n    <a href="javascript:void(0);" class="activator js-sharetrigger">\n        <span class="issuuicon issuuicon-share"></span>\n        <span class="counter js-sharecount">' + e.escapeExpression((r = null != (r = n.shareCount || (null != t ? t.shareCount : t)) ? r : n.helperMissing, "function" == typeof r ? r.call(s, {
                name: "shareCount",
                hash: {},
                data: a
            }) : r)) + "</span>\n    </a>\n\n" + (null != (o = n["if"].call(s, null != t ? t.icon : t, {
                name: "if",
                hash: {},
                fn: e.program(9, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = n.helperMissing,
                l = "function",
                c = e.escapeExpression;
            return '<div class="clipping-buttoncontainer publisher-owned" style="top: ' + c((o = null != (o = n.absoluteY || (null != t ? t.absoluteY : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "absoluteY",
                hash: {},
                data: a
            }) : o)) + "px; left: " + c((o = null != (o = n.absoluteX || (null != t ? t.absoluteX : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "absoluteX",
                hash: {},
                data: a
            }) : o)) + 'px;">\n    <a href="' + c((o = null != (o = n.linkUrl || (null != t ? t.linkUrl : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "linkUrl",
                hash: {},
                data: a
            }) : o)) + '" class="activator--teardrop js-link" target="_blank" rel="nofollow">\n        <span class="issuuicon issuuicon-link"></span>\n    </a>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o = null != t ? t : {},
                r = e.escapeExpression;
            return '<div class="clipping-creator">\n    <canvas class="clipping-curtain"></canvas>\n    <div class="movablebox">\n        <div class="resizablebox"></div>\n        <div class="button-container">\n            <button type="button" class="btn btn-default js-cancel-clipping cancel-clipping">' + r(n.t.call(o, "clippings.creator.buttonCancel", {
                name: "t",
                hash: {},
                data: a
            })) + '</button>\n            <button type="button" data-button="state" class="btn btn-success js-create-clipping">' + r(n.t.call(o, "clippings.creator.buttonCreateClipping", {
                name: "t",
                hash: {},
                data: a
            })) + '</button>\n            <p class="js-error-message error-message balloon theme-red bg-red"></p>\n        </div>\n    </div>\n</div>\n\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = e.escapeExpression,
                l = e.lambda;
            return '        <div class="horizontal-shrink"><div class="profilepic"></div></div>\n        <div class="horizontal-expand">\n            <h4 class="h3">' + s(n.t.call(r, "clippings.comment.anonymousOwner", {
                name: "t",
                hash: {},
                data: a
            })) + '</h4>\n            <span class="metainfo type-discreet js-metainfo">\n                <time datetime="' + s(l(null != (o = null != t ? t.comment : t) ? o.created : o, t)) + '" title="' + s(l(null != (o = null != t ? t.comment : t) ? o.localtime : o, t)) + '">' + s(l(null != (o = null != t ? t.comment : t) ? o.timeAgo : o, t)) + '</time>\n            </span>\n            <p class="content type-discreet">\n                ' + s(n.t.call(r, "clippings.comment.explanationDeletedByOwner", {
                name: "t",
                hash: {},
                data: a
            })) + "\n            </p>\n        </div>\n"
        },
        3: function(e, t, n, i, a) {
            var o, r = e.lambda,
                s = e.escapeExpression,
                l = null != t ? t : {};
            return '        <a href="' + s(r(null != (o = null != t ? t.owner : t) ? o.profileUrl : o, t)) + '" class="horizontal-shrink"><img src="' + s(r(null != (o = null != t ? t.owner : t) ? o.profilePic : o, t)) + '" alt="' + s(r(null != (o = null != t ? t.owner : t) ? o.displayName : o, t)) + '" class="profilepic ' + (null != (o = n["if"].call(l, null != (o = null != t ? t.owner : t) ? o.isPersonal : o, {
                name: "if",
                hash: {},
                fn: e.program(4, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + ' h3" /></a>\n        <div class="no-overflow horizontal-expand">\n            <h4 class="h3"><a href="' + s(r(null != (o = null != t ? t.owner : t) ? o.profileUrl : o, t)) + '">' + s(r(null != (o = null != t ? t.owner : t) ? o.displayName : o, t)) + '</a></h4>\n            <span class="metainfo type-discreet js-metainfo">\n                <time datetime="' + s(r(null != (o = null != t ? t.comment : t) ? o.created : o, t)) + '" title="' + s(r(null != (o = null != t ? t.comment : t) ? o.localtime : o, t)) + '">' + s(r(null != (o = null != t ? t.comment : t) ? o.timeAgo : o, t)) + "</time>\n" + (null != (o = n["if"].call(l, null != t ? t.isCommentOwner : t, {
                name: "if",
                hash: {},
                fn: e.program(6, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '            </span>\n\n            <p class="content js-content">\n                ' + (null != (o = r(null != (o = null != t ? t.comment : t) ? o.unescapedBrokenAndLinkedText : o, t)) ? o : "") + "\n            </p>\n        </div>\n"
        },
        4: function(e, t, n, i, a) {
            return " personal"
        },
        6: function(e, t, n, i, a) {
            var o = null != t ? t : {},
                r = e.escapeExpression;
            return '                    &bull;\n                    <a class="js-delete-trigger js-delete-link" href="javascript:void(0);">' + r(n.t.call(o, "clippings.comment.deleteLink", {
                name: "t",
                hash: {},
                data: a
            })) + '</a>\n                    <span class="js-delete-links">\n\n                        <a class="js-delete-submit" href="javascript:void(0);">' + r(n.t.call(o, "clippings.comment.deleteConfirm", {
                name: "t",
                hash: {},
                data: a
            })) + '</a>\n                        &bull;\n                        <a class="js-delete-cancel" href="javascript:void(0);">' + r(n.t.call(o, "clippings.comment.deleteCancel", {
                name: "t",
                hash: {},
                data: a
            })) + '</a>\n                    </span>\n                    <span class="spin js-delete-wait"></span>\n                    <span class="js-delete-failed">\n                        ' + r(n.t.call(o, "clippings.comment.deleteErrorMessage", {
                name: "t",
                hash: {},
                data: a
            })) + "\n                    </span>\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o;
            return '<li class="table-container">\n' + (null != (o = n["if"].call(null != t ? t : {}, null != (o = null != t ? t.comment : t) ? o.isDeletedByOwner : o, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.program(3, a, 0),
                data: a
            })) ? o : "") + "</li>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            var o, r = e.lambda,
                s = e.escapeExpression,
                l = null != t ? t : {};
            return '    <div class="table-container">\n        <a href="' + s(r(null != (o = null != t ? t.user : t) ? o.profileUrl : o, t)) + '" class="horizontal-shrink"><img src="' + s(r(null != (o = null != t ? t.user : t) ? o.profilePic : o, t)) + '" alt="' + s(r(null != (o = null != t ? t.user : t) ? o.displayName : o, t)) + '" class="profilepic ' + (null != (o = n["if"].call(l, null != (o = null != t ? t.user : t) ? o.isPersonal : o, {
                name: "if",
                hash: {},
                fn: e.program(2, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '" /></a>\n        <div class=" horizontal-expand">\n            <textarea rows="1" placeholder="' + (null != (o = n["if"].call(l, null != t ? t.isFirstComment : t, {
                name: "if",
                hash: {},
                fn: e.program(4, a, 0),
                inverse: e.program(6, a, 0),
                data: a
            })) ? o : "") + '" name="newcommenttext" data-resize="textfield" class="form-control form-group" maxlength="1000"></textarea>\n            <button type="submit" class="btn btn-success" data-button="state">' + s(n.t.call(l, "clippings.overlay.buttonSubmitComment", {
                name: "t",
                hash: {},
                data: a
            })) + '</button>\n            <span class="js-comment-error"></span>\n        </div>\n    </div>\n'
        },
        2: function(e, t, n, i, a) {
            return " personal"
        },
        4: function(e, t, n, i, a) {
            return e.escapeExpression(n.t.call(null != t ? t : {}, "clippings.overlay.placeholderNoComments", {
                name: "t",
                hash: {},
                data: a
            }))
        },
        6: function(e, t, n, i, a) {
            return e.escapeExpression(n.t.call(null != t ? t : {}, "clippings.overlay.placeholderExistingComments", {
                name: "t",
                hash: {},
                data: a
            }))
        },
        8: function(e, t, n, i, a) {
            var o;
            return "    <p>\n" + (null != (o = n["if"].call(null != t ? t : {}, null != t ? t.isFirstComment : t, {
                name: "if",
                hash: {},
                fn: e.program(9, a, 0),
                inverse: e.program(11, a, 0),
                data: a
            })) ? o : "") + "    </p>\n"
        },
        9: function(e, t, n, i, a) {
            var o = null != t ? t : {},
                r = e.escapeExpression;
            return '            <a href="/signin" class="js-signin">' + r(n.t.call(o, "clippings.overlay.ctaLoginPart1", {
                name: "t",
                hash: {},
                data: a
            })) + "</a> " + r(n.t.call(o, "clippings.overlay.ctaLoginPart2NoComments", {
                name: "t",
                hash: {},
                data: a
            })) + "\n"
        },
        11: function(e, t, n, i, a) {
            var o = null != t ? t : {},
                r = e.escapeExpression;
            return '            <a href="/signin" class="js-signin">' + r(n.t.call(o, "clippings.overlay.ctaLoginPart1", {
                name: "t",
                hash: {},
                data: a
            })) + "</a> " + r(n.t.call(o, "clippings.overlay.ctaLoginPart2ExistingComments", {
                name: "t",
                hash: {},
                data: a
            })) + "\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o;
            return null != (o = n["if"].call(null != t ? t : {}, null != (o = null != t ? t.user : t) ? o.isLoggedIn : o, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.program(8, a, 0),
                data: a
            })) ? o : ""
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            return '                    <span class="activator js-link">\n                        <span class="issuuicon issuuicon-play"></span>\n                    </span>\n                    <div class="video-player-container">\n                        <div id="video-player"></div>\n                    </div>\n'
        },
        3: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = n.helperMissing,
                l = "function",
                c = e.escapeExpression;
            return '            <a href="' + c((o = null != (o = n.linkUrl || (null != t ? t.linkUrl : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "linkUrl",
                hash: {},
                data: a
            }) : o)) + '" target="_blank" class="js-publisherlink publisherlink">' + c((o = null != (o = n.linkText || (null != t ? t.linkText : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "linkText",
                hash: {},
                data: a
            }) : o)) + "</a>\n"
        },
        5: function(e, t, n, i, a) {
            return '            <span class="publisherlink">&nbsp;</span>\n'
        },
        7: function(e, t, n, i, a) {
            return '        <a href="javascript:void(0);" class="btn btn-default prev js-prev">\n            <span class="issuuicon issuuicon-chevron-left-thin"></span>\n        </a>\n        <a href="javascript:void(0);" class="btn btn-default next js-next">\n            <span class="issuuicon issuuicon-chevron-right-thin"></span>\n        </a>\n'
        },
        9: function(e, t, n, i, a) {
            var o;
            return "(" + e.escapeExpression((o = null != (o = n.shareCount || (null != t ? t.shareCount : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(null != t ? t : {}, {
                name: "shareCount",
                hash: {},
                data: a
            }) : o)) + ")"
        },
        11: function(e, t, n, i, a) {
            var o, r = null != t ? t : {};
            return "                <h3>" + e.escapeExpression(n.t.call(r, "clippings.overlay.headerComments", {
                name: "t",
                hash: {},
                data: a
            })) + ' <span class="js-comment-count">' + (null != (o = n["if"].call(r, null != t ? t.commentCount : t, {
                name: "if",
                hash: {},
                fn: e.program(12, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '</span></h3>\n                <form class="clearfix" name="newcomment"></form>\n'
        },
        12: function(e, t, n, i, a) {
            var o;
            return "(" + e.escapeExpression((o = null != (o = n.commentCount || (null != t ? t.commentCount : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(null != t ? t : {}, {
                name: "commentCount",
                hash: {},
                data: a
            }) : o)) + ")"
        },
        14: function(e, t, n, i, a) {
            return "                <p>" + e.escapeExpression(n.t.call(null != t ? t : {}, "clippings.overlay.commentsDisabled", {
                name: "t",
                hash: {},
                data: a
            })) + "</p>\n"
        },
        16: function(e, t, n, i, a) {
            var o, r = null != t ? t : {};
            return '            <div class="variable-height">\n' + (null != (o = n["if"].call(r, null != t ? t.noComments : t, {
                name: "if",
                hash: {},
                fn: e.program(17, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '                <div class="scrolled-container">\n                    <div>\n                        <ul class="comments-container"></ul>\n' + (null != (o = n["if"].call(r, null != t ? t.moreComments : t, {
                name: "if",
                hash: {},
                fn: e.program(19, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "                    </div>\n                </div>\n            </div>\n"
        },
        17: function(e, t, n, i, a) {
            return '                <p class="nocommentsyet">\n<!--                    Be the first to comment!-->\n                </p>\n'
        },
        19: function(e, t, n, i, a) {
            return '                        <p class="morecomments">\n                            <a href="javascript:void(0);">' + e.escapeExpression(n.t.call(null != t ? t : {}, "clippings.overlay.loadMoreComments", {
                name: "t",
                hash: {},
                data: a
            })) + "</a>\n                        </p>\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = e.escapeExpression;
            return '<div class="overlay-content">\n    <div class="bitmap-container half-screen theme-dark bg-dark clearfix">\n        <div class="center-container">\n            <h3>' + s(n.tr.call(r, t, {
                name: "tr",
                hash: {
                    clippingCount: "clippingCount",
                    clippingIndex: "clippingIndex",
                    key: "clippings.overlay.title"
                },
                data: a
            })) + '</h3>\n            <div class="variable-container clipping-container">\n' + (null != (o = n["if"].call(r, null != t ? t.hasVideoLink : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '                <img class="clippingcrop" src="' + s(e.lambda(null != (o = null != t ? t.clipping : t) ? o.cropurl : o, t)) + '" alt="Clipping" />\n            </div>\n' + (null != (o = n["if"].call(r, null != t ? t.linkUrl : t, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.program(5, a, 0),
                data: a
            })) ? o : "") + '        </div>\n        <a href="javascript:void(0);" class="close js-close type-discreet"><span class="issuuicon issuuicon-remove"></span></a>\n' + (null != (o = n["if"].call(r, null != t ? t.needsPaging : t, {
                name: "if",
                hash: {},
                fn: e.program(7, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '    </div>\n\n    <div class="bg-light meta-container half-screen">\n        <a href="javascript:void(0);" class="close js-close"><span class="issuuicon issuuicon-remove"></span></a>\n\n        <div class="meta-content">\n            <div class="fixed-height">\n                <h3>' + s(n.t.call(r, "clippings.overlay.headerShares", {
                name: "t",
                hash: {},
                data: a
            })) + ' <span class="js-share-count">' + (null != (o = n["if"].call(r, null != t ? t.shareCount : t, {
                name: "if",
                hash: {},
                fn: e.program(9, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '</span></h3>\n                <div class="js-sharer-container"></div>\n\n' + (null != (o = n["if"].call(r, null != t ? t.commentsAllowed : t, {
                name: "if",
                hash: {},
                fn: e.program(11, a, 0),
                inverse: e.program(14, a, 0),
                data: a
            })) ? o : "") + "            </div>\n\n" + (null != (o = n["if"].call(r, null != t ? t.commentsAllowed : t, {
                name: "if",
                hash: {},
                fn: e.program(16, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "        </div>\n\n    </div>\n\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o;
            return '<div class="video-overlay-content">\n    <div class="meta-container clearfix video-clipping">\n        <div class="center-container" style="background-image: url(' + e.escapeExpression((o = null != (o = n.cropurl || (null != t ? t.cropurl : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(null != t ? t : {}, {
                name: "cropurl",
                hash: {},
                data: a
            }) : o)) + ')">\n            <div class="video-player-container">\n                <div id="video-player"></div>\n            </div>\n        </div>\n        <div id="meta-bar"></div>\n\n        <a href="javascript:void(0);" class="close js-close type-discreet"><span class="issuuicon issuuicon-remove"></span></a>\n    </div>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = n.helperMissing,
                l = "function",
                c = e.escapeExpression;
            return '<li class="cta-button has-menu hidden-xs hidden-sm hidden-md">\n   <div>\n        <a href="' + c((o = null != (o = n.link || (null != t ? t.link : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "link",
                hash: {},
                data: a
            }) : o)) + '" class="btn btn-primary" data-trackable-call-to-action="' + c((o = null != (o = n.eventName || (null != t ? t.eventName : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "eventName",
                hash: {},
                data: a
            }) : o)) + '">\n            ' + c((o = null != (o = n.label || (null != t ? t.label : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "label",
                hash: {},
                data: a
            }) : o)) + "\n        </a>\n   </div>\n</li>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            return '        <li>\n            <a class="download" href="javascript:void(0);">' + e.escapeExpression(n.t.call(null != t ? t : {}, "documentpage.download", {
                name: "t",
                hash: {},
                data: a
            })) + "</a>\n        </li>\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = e.escapeExpression;
            return '<div class="share">\n    <ul class="toplinks">\n        <li>\n            <input value="first" id="radio-firstpage" name="page" type="radio" checked="checked">\n            <label for="radio-firstpage">' + s(n.t.call(r, "documentpage.firstpage", {
                name: "t",
                hash: {},
                data: a
            })) + '</label>\n        </li>\n        <li>\n            <input value="current" id="radio-currentpage" name="page" type="radio">\n            <label for="radio-currentpage">' + s(n.t.call(r, "documentpage.currentpage", {
                name: "t",
                hash: {},
                data: a
            })) + '</label>\n        </li>\n        <li>\n            <a class="embed" href="javascript:void(0);">' + s(n.t.call(r, "documentpage.embed", {
                name: "t",
                hash: {},
                data: a
            })) + "</a>\n        </li>\n" + (null != (o = n["if"].call(r, null != t ? t.downloadable : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '    </ul>\n    <div class="sharerholder"></div>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            return '<div class="embed1 clearfix">\n    <h3>Customize and embed</h3>\n    <p id="mobile-support-msg">\n        This embed widget is being outphased and doesn\'t support mobile devices! <a href="#" class="switchToV3">Please use the new one</a>\n    </p>\n\n    <form name="skema" action="" method="get">\n        <div class="contentBlock embedBlock">\n            <p>\n                <strong>Embed code:</strong>\n                <label><input type="radio" name="service" value="html" checked> HTML</label>\n                <label><input type="radio" name="service" value="blogger"> Blogger</label>\n                <label><input type="radio" name="service" value="orkut"> Orkut</label>\n                <label><input type="radio" name="service" value="facebook"> Facebook</label>\n                <label><input type="radio" name="service" value="wordpress"> WordPress</label>\n                <label><input type="radio" name="service" value="typepad"> Typepad</label>\n                <label><input type="radio" name="service" value="livejournal"> LiveJournal</label><br>\n\n                <input class="resultFields inputF" type="text" name="embedCode">\n            </p>\n\n            <p>\n                <strong>Link:</strong>\n                <label><input id="urlType_community" type="radio" name="urlType" value="community" checked> Issuu</label>\n                <label><input id="urlType_pro" type="radio" name="urlType" value="pro"> Link with below styling</label><br>\n\n                <input class="resultFields urloutput inputF" type="text" name="url">\n            </p>\n        </div>\n\n        <div class="userbuttons contentBlock">\n            <span class="button-ms">\n                <span class="mustDownloadPlug">You need </span>\n                <span class="wpPlug" ><a href="http://wordpress.org/extend/plugins/wp-issuu/"  target="_blank">this plugin</a> to embed on WordPress.</span>\n            </span>\n        </div>\n\n        <div class="facebookBlock contentBlock">\n            <p>\n                <a class="button togglePreview facebookButton" href="#">Add to Facebook</a>\n                Click to add this publication to your Facebook profile.\n            </p>\n        </div>\n\n        <h4>Customize:</h4>\n\n        <div class="layoutBlock contentBlock">\n            <h5>Misc:</h5>\n            <div class="clearfix showSmallMenu hidden">\n                <label><input class="float-left" id="showSmallMenuId" type="checkbox" name="proShowMenu" value="true" > Show Share menu. Only shown on small embeds (less than 741 px wide).</label>\n            </div>\n\n            <div class="clearfix showArchive hidden">\n                <label><input class="float-left" id="showArchiveId" type="checkbox" name="proShowSidebar" value="true" > Show Archive sidebar in Standalone. Will also show in Share menu if enabled.</label>\n            </div>\n            <div class="clearfix textBelow hidden">\n                <label><input class="float-left" id="textBelowId" type="checkbox" name="textBelow" value="true" checked> Include a link to open the publication below the embedding.</label>\n            </div>\n            <div class="clearfix">\n                <label><input class="float-left" id="showFlipBtn" type="checkbox" name="showFlipBtn" value="true" checked> Always show flip buttons</label>\n            </div>\n        </div>\n\n        <div class="layoutBlock contentBlock">\n            <h5>Layout:</h5>\n            <p>\n                <label><input  type="radio" class="radio0" name="layout" id="l1" value="magazine" checked> Two-up</label><br>\n                <label for="l2"><input type="radio" class="radio0" name="layout" id="l2" value="presentation"> Single page</label>\n            </p>\n        </div>\n\n        <div class="sizeBlock contentBlock">\n            <h5>Width:</h5>\n            <p>\n                <label><input type="radio" class="radio0" name="size" id="s1" value="300"> 300px <span class="note">(height will be auto-detected)</span></label><br>\n                <label><input type="radio" class="radio0" name="size" id="s2" value="420" checked> 420px <span class="note">(height will be auto-detected)</span></label><br>\n                <label><input type="radio" class="radio0" name="size" id="s3" value="600" > 600px <span class="note">(height will be auto-detected)</span></label><br>\n                <label><input type="radio" class="radio0" name="size" id="s4" value="custom"> Custom</label>\n                <input class="inputF" type="text" size="4" maxlength="4" name="customX"> x <input class="inputF" type="text" size="4" maxlength="4" name="customY">\n                <label class="unit-px"><input type="radio" name="unit" value="px" class="hide" checked> px</label>\n                <!--<label class="unit-perc"><input type="radio" name="unit" value="%"> %</label>-->\n            </p>\n        </div>\n\n        <div class="colorOrThemeBlock contentBlock">\n            <h5>Color or theme:</h5>\n            <p>\n                <label><input type="radio" name="theme" id="t0" value="v/color/layout.xml"> Background color</label> <input class="inputF colorval" type="text" size="6" maxlength="6" name="backgroundColor" value="FFFFFF"><br>\n\n                <label><input type="radio" name="theme" id="tselect" value="select" checked> Theme</label>\n                <select name="themeSelector" id="themeSelector">\n                    <option value="v/light/layout.xml">Light</option>\n                    <option value="v/dark/layout.xml">Dark</option>\n                    <option value="v/lighticons/layout.xml">Light (icons only)</option>\n                    <option value="v/darkicons/layout.xml">Dark (icons only)</option>\n                    <option value="v/wood2/layout.xml">Wood</option>\n                    <option value="v/softdark/layout.xml">Soft Dark</option>\n                    <option value="v/softlight/layout.xml">Soft Light</option>\n                    <option value="v/aquarium/layout.xml">Aquarium</option>\n                    <option value="v/cartoon/layout.xml">Cartoon</option>\n                    <option value="v/nightmare/layout.xml">Nightmare</option>\n                    <option value="v/grey/layout.xml">Grey (obsolete)</option>\n                    <option value="v/wood/layout.xml">Wood (obsolete)</option>\n                    <option value="v/white/layout.xml">White (obsolete)</option>\n                    <option value="v/grass/layout.xml">Grass (obsolete)</option>\n                </select><br>\n\n                <label><input type="radio" class="radio0" name="theme" id="tcustom" value="custom"> Theme custom URL</label> <input type="text" size="40" name="customThemeUrl" id="customThemeUrl" placeholder="www.mydomain.com/layout.xml" class="inputF">\n            </p>\n        </div>\n\n        <div class="fitToBlock singlePage contentBlock">\n            <h5>Fit to:</h5>\n            <p>\n                <label><input type="radio" class="radio0" name="fitTo" id="f1" value="width" checked> Width</label><br>\n                <label><input type="radio" class="radio0" name="fitTo" id="f2" value="height"> Height</label>\n            </p>\n        </div>\n\n        <div class="autoflipBlock contentBlock">\n            <h5>Autoflip:</h5>\n            <p>\n                <label><input type="radio" class="radio0" name="autoFlip" id="af1" value="true"> On</label><br>\n                <label><input type="radio" class="radio0" name="autoFlip" id="af2" value="false" checked> Off</label>\n                <input type="hidden" name="autoFlipTime" value="6000">\n            </p>\n        </div>\n\n        <div class="startingpageBlock contentBlock">\n            <h5>Starting page:</h5>\n            <p>\n                <select name="startingPage"></select>\n            </p>\n        </div>\n\n        <div class="audioBlock contentBlock">\n            <h5>Audio:</h5>\n            <p>\n                <span class="textGrey ownerNoSoundText">You can add audio to this publication in <a href="/home/publications">My Publications</a>.</span>\n                <span class="textGrey ownerChangeSoundLink">You have added audio to this publication. You can always modify this in <a href="/home/publications">My Library</a>.</span>\n                <span class="textGrey noSoundText">There is no audio in this publication.</span>\n                <span class="textGrey soundText">There is audio in this publication.</span>\n            </p>\n            <p>\n                <span class="soundUrl">www.mysite.com/audio.mp3</span>\n            </p>\n        </div>\n\n        <div class="logoBlock contentBlock">\n            <h5>Logo Graphics:</h5>\n            <div class="logoTester"></div>\n            <p>\n                <input class="inputF" name="logoUrl" type="text" size="30" value="www.mysite.com/logo.png"><br>\n                Offset px. <label>top: <input class="inputF" type="text" size="3" name="logoTop"></label> <label>left: <input class="inputF" type="text" size="3" name="logoLeft"></label>\n            </p>\n        </div>\n\n        <div class="previewBlock contentBlock">\n            <h5>Preview:</h5>\n            <span class="notActualSize">Your embedding is too big for this preview. The real embedding will have the correct specified size.</span>\n            <div class="eRow previewBox"></div>\n        </div>\n    </form>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = e.escapeExpression;
            return '                                <div class="white"><a href="' + s((o = null != (o = n.loginUrl || (null != t ? t.loginUrl : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(r, {
                name: "loginUrl",
                hash: {},
                data: a
            }) : o)) + '">' + s(n.t.call(r, "embedForm.formv3.signInStylingOpts", {
                name: "t",
                hash: {},
                data: a
            })) + "</a></div>\n"
        },
        3: function(e, t, n, i, a) {
            var o = null != t ? t : {},
                r = e.escapeExpression;
            return '                                <!-- Starting page -->\n                                <div class="eBlock clearfix startingpageBlock multipage">\n                                    <div class="ecSmallA">\n                                        <strong>' + r(n.t.call(o, "embedForm.formv3.page", {
                name: "t",
                hash: {},
                data: a
            })) + '</strong>\n                                    </div>\n                                    <div class="ecLarger">\n                                        <div class="eRow ">\n                                            ' + r(n.t.call(o, "embedForm.formv3.startOnPage", {
                name: "t",
                hash: {},
                data: a
            })) + '&nbsp;&nbsp;<select name="startingPage"></select>\n                                        </div><!-- /eRow -->\n                                    </div><!-- /ecLarger -->\n                                </div><!-- /Starting page -->\n\n                                <!-- Layout -->\n                                <div class="eBlock clearfix">\n                                    <div class="ecSmallA">\n                                        <strong>' + r(n.t.call(o, "embedForm.formv4.layout", {
                name: "t",
                hash: {},
                data: a
            })) + '</strong>\n                                    </div>\n                                    <div class="ecLarger">\n                                        <div class="fleft" style="width: 20px; text-align: center;">\n                                            <div style="width: 20px; height: 18px; background-color: #78756E; float: left;"></div><br>\n                                            <input type="radio" name="layout" id="l2" value="singlePage">\n                                        </div>\n\n                                        <div class="fleft multipage" style="width: 33px; text-align: center;">\n                                            <div style="width: 16px; height: 18px; background-color: #78756E; float: left; margin-right: 1px;"></div>\n                                            <div style="width: 16px; height: 18px; background-color: #78756E; float: left;"></div><br>\n                                            <input type="radio" name="layout" id="l1" value="doublePage" checked>\n                                        </div>\n                                        <span class="multipage">\n                                            <input class="float-left autoflip" id="autoflipThepagesId" type="checkbox" name="autoflip" value="true">\n                                            <label class="float-left autoflip" for="autoflipThepagesId">' + r(n.t.call(o, "embedForm.formv4.autoflip", {
                name: "t",
                hash: {},
                data: a
            })) + '</label>\n                                        </span>\n                                    </div><!-- /larger -->\n                                </div><!-- /Layout -->\n\n\n                                <!-- Color -->\n                                <div class="eBlock clearfix colorBlock">\n                                    <div class="ecSmallA" style="padding: 4px 0 0;">\n                                        <strong>' + r(n.t.call(o, "embedForm.formv4.color", {
                name: "t",
                hash: {},
                data: a
            })) + '</strong>\n                                    </div>\n                                    <div class="ecLarger" style="line-height: 24px;">\n                                        <select class="colorDropDown" data-for="backgroundColor1" style="vertical-align: middle;" id="embedBackgroundColorDropdown">\n                                            <option value="default">' + r(n.t.call(o, "embedForm.formv3.colors.default", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="orange">' + r(n.t.call(o, "embedForm.formv3.colors.orange", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="red">' + r(n.t.call(o, "embedForm.formv3.colors.red", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="green">' + r(n.t.call(o, "embedForm.formv3.colors.green", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="blue">' + r(n.t.call(o, "embedForm.formv3.colors.blue", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="mint">' + r(n.t.call(o, "embedForm.formv3.colors.mint", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="grey">' + r(n.t.call(o, "embedForm.formv3.colors.grey", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="custom">' + r(n.t.call(o, "embedForm.formv3.colors.custom", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                        </select>\n\n                                        <input type="text" name="embedBackgroundColor" id="backgroundColor1" value="#transparent" size="7" maxlength="7" class="inputF colorval" data-hex="true" style="vertical-align: middle; width: 90px;">\n                                    </div>\n                                </div><!-- /Color -->\n\n                                <!-- Show options -->\n                                <div class="eBlock clearfix showBlock product-brandpackage disabled" style="display: none;">\n                                    <div class="ecSmallA">\n                                        <strong>' + r(n.t.call(o, "embedForm.formv3.showOptions", {
                name: "t",
                hash: {},
                data: a
            })) + '</strong>\n                                    </div>\n                                    <div class="ecLarger">\n                                        <div class="eRow">\n                                            <div class="clearfix">\n                                                <input class="float-left" id="showSocialOptionsId" type="checkbox" name="showSocialOptions" value="true" checked disabled>\n                                                <label class="float-left" for="showSocialOptionsId">\n                                                    ' + r(n.t.call(o, "embedForm.formv4.socialOptions", {
                name: "t",
                hash: {},
                data: a
            })) + '\n                                                    Social options menu\n                                                    <div class="has-menu embed-ToolTipper">\n                                                        <a data-toggle="tooltip">(?)</a>\n                                                        <div class="menu default-padding arrow-bottom" data-tooltip="tooltip" style="width:250px;">\n                                                            <p>\n                                                                <strong class="textBlue">' + r(n.t.call(o, "embedForm.formv4.socialOptions", {
                name: "t",
                hash: {},
                data: a
            })) + "</strong><br>" + r(n.t.call(o, "embedForm.formv3.socialOptionsDescription", {
                name: "t",
                hash: {},
                data: a
            })) + '\n                                                            </p>\n                                                        </div>\n                                                    </div>\n                                                </label>\n\n                                                <br>\n                                            </div>\n                                        </div>\n\n                                        <div class="eRow proUsersOwnDocument" style="display: none;">\n                                            <div class="clearfix">\n                                                <input class="float-left" id="showLinksId" type="checkbox" name="showLinks" value="true" checked>\n                                                <label class="float-left" for="showLinksId">\n                                                    ' + r(n.t.call(o, "embedForm.formv3.linkBellowEmbed", {
                name: "t",
                hash: {},
                data: a
            })) + "\n                                                </label><br>\n                                            </div>\n                                        </div>\n\n                                    </div><!-- /larger -->\n                                </div><!-- /Show options -->\n\n\n\n"
        },
        5: function(e, t, n, i, a) {
            return "\n"
        },
        7: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = e.escapeExpression;
            return '                            <div class="column right-column clearfix">\n                                <!-- proUsersOwnDocument -->\n                                <div class="proUsersOwnDocument" style="display: none;">\n                                    <div class="eBlock clearfix">\n                                        <div class="ecSmallA">\n                                            <strong>' + s(n.t.call(r, "embedForm.formv3.showOptions", {
                name: "t",
                hash: {},
                data: a
            })) + '</strong>\n                                        </div>\n                                        <div class="ecLarger">\n                                            <div class="eRow">\n                                                <div class="clearfix">\n                                                    <input class="float-left" id="showPrintButtonId" type="checkbox" name="showPrintButton" value="true" checked>\n                                                    <label class="float-left" for="showPrintButtonId">' + s(n.t.call(r, "embedForm.formv3.downloadBtn", {
                name: "t",
                hash: {},
                data: a
            })) + '</label><br>\n                                                </div>\n                                            </div>\n\n                                            <div class="eRow hideForEnterpriseDocs">\n                                                <div class="clearfix">\n                                                    <input class="float-left" id="showShareButtonId" type="checkbox" name="showShareButton" value="true" checked>\n                                                    <label class="float-left" for="showShareButtonId">' + s(n.t.call(r, "embedForm.formv3.shareBtn", {
                name: "t",
                hash: {},
                data: a
            })) + '</label><br>\n                                                </div>\n                                            </div>\n\n                                            <div class="eRow">\n                                                <div class="clearfix">\n                                                    <input class="float-left" id="showSearchButtonId" type="checkbox" name="showSearchButton" value="true" checked>\n                                                    <label class="float-left" for="showSearchButtonId">' + s(n.t.call(r, "embedForm.formv3.searchBtn", {
                name: "t",
                hash: {},
                data: a
            })) + '</label><br>\n                                                </div>\n                                            </div>\n\n                                            <div class="eRow">\n                                                <div class="clearfix">\n                                                    <input class="float-left" id="showArchiveSidebarId" type="checkbox" name="showArchiveSidebar" value="true">\n                                                    <label class="float-left" for="showArchiveSidebarId">\n                                                        ' + s(n.t.call(r, "embedForm.formv3.publisherPublications", {
                name: "t",
                hash: {},
                data: a
            })) + '\n                                                        <div class="has-menu embed-ToolTipper">\n                                                            <a data-toggle="tooltip">(?)</a>\n                                                            <div class="menu default-padding arrow-bottom" data-tooltip="tooltip" style="width:250px;">\n                                                                <p>\n                                                                    <strong class="textBlue">' + s(n.t.call(r, "embedForm.formv3.publisherPublications", {
                name: "t",
                hash: {},
                data: a
            })) + "</strong>\n                                                                    <br>" + s(n.t.call(r, "embedForm.formv3.publisherPublicationsDescription", {
                name: "t",
                hash: {},
                data: a
            })) + '\n                                                                </p>\n                                                            </div>\n                                                        </div>\n                                                    </label><br>\n                                                </div>\n                                            </div>\n                                            <div class="eRow" >\n                                                <div class="clearfix">\n                                                    <input class="float-left" id="showClippings" type="checkbox" name="showClippings" value="true" checked disabled>\n                                                    <label class="float-left" for="showClippings">\n                                                        ' + s(n.t.call(r, "embedForm.formv4.clippings", {
                name: "t",
                hash: {},
                data: a
            })) + '\n                                                        <div class="has-menu embed-ToolTipper show-pro" style="display: none;">\n                                                            <a data-toggle="tooltip">(?)</a>\n                                                            <div class="menu default-padding arrow-bottom" data-tooltip="tooltip" style="width:250px;">\n                                                                <p>\n                                                                    ' + s(n.t.call(r, "embedForm.formv3.availableInPremium", {
                name: "t",
                hash: {},
                data: a
            })) + '\n                                                                </p>\n                                                            </div>\n                                                        </div>\n                                                    </label><br>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div><!-- /Pro buttons -->\n\n                                    <!-- Links -->\n                                    <div class="eBlock clearfix">\n                                        <div class="ecSmallA" style="padding: 2px 0 0;">\n                                            <strong>' + s(n.t.call(r, "embedForm.formv3.links", {
                name: "t",
                hash: {},
                data: a
            })) + '</strong>\n                                        </div>\n                                        <div class="ecLarger">\n                                            <div class="eRow">\n                                                <div class="clearfix" style="line-height: 24px;">\n                                                    <span style="vertical-align: middle;">' + s(n.t.call(r, "embedForm.formv3.linksOpenOption", {
                name: "t",
                hash: {},
                data: a
            })) + '</span>\n                                                    <select name="linkTarget" style="display: inline; vertical-align: middle;">\n                                                        <option value="new">' + s(n.t.call(r, "embedForm.formv3.linkOpenNewWindow", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                                        <option value="current">' + s(n.t.call(r, "embedForm.formv3.linkOpenSameWindow", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                                    </select>\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div><!-- /Links -->\n\n                                    <!-- Logo -->\n                                    <div class="eBlock clearfix logoBlock">\n                                        <div class="ecSmallA">\n                                            <strong>' + s(n.t.call(r, "embedForm.formv3.logo", {
                name: "t",
                hash: {},
                data: a
            })) + '</strong>\n                                        </div>\n                                        <div class="ecLarger">\n\n                                            <div class="eRow">\n                                                <input class="float-left" id="addALogoId" type="checkbox" name="addALogo" value="true">\n                                                <label class="float-left" for="addALogoId">\n                                                    ' + s(n.t.call(r, "embedForm.formv3.logoToLeftCorner", {
                name: "t",
                hash: {},
                data: a
            })) + '\n                                                    <div class="has-menu embed-ToolTipper">\n                                                        <a data-toggle="tooltip">(?)</a>\n                                                        <div class="menu default-padding arrow-bottom" data-tooltip="tooltip" style="width:250px;">\n                                                            <p>\n                                                                <strong class="textBlue">' + s(n.t.call(r, "embedForm.formv3.logoToLeftCorner", {
                name: "t",
                hash: {},
                data: a
            })) + "</strong><br>" + s(n.t.call(r, "embedForm.formv3.logoDescription", {
                name: "t",
                hash: {},
                data: a
            })) + '\n                                                            </p>\n                                                        </div>\n                                                    </div>\n\n                                                </label>\n                                            </div>\n\n                                            <div class="addALogoHide" style="display: none;">\n                                                <div class="eRow" style="margin-left: 25px;">\n                                                    <input type="radio" class="radio0" name="logoType" id="logo1" value="profileimage">\n                                                    <label for="logo1">' + s(n.t.call(r, "embedForm.formv3.profileImage", {
                name: "t",
                hash: {},
                data: a
            })) + '</label>\n                                                </div>\n\n                                                <div class="eRow selectALogoHide logo1" style="margin-left: 50px; display: none;">\n                                                    <img src="" width="160" height="160" alt="Profile image" class="profilePicture" src=""><br>' + (null != (o = n.t.call(r, "embedForm.formv3.profileImageChange", {
                name: "t",
                hash: {
                    linkPost: "</a>",
                    linkPre: '<a href="/user/settings" target="_blank">'
                },
                data: a
            })) ? o : "") + '\n                                                </div>\n\n                                                <div class="eRow" style="margin-left: 25px;">\n                                                    <input type="radio" class="radio0" name="logoType" id="logo2" value="logourl" checked>\n                                                    <label for="logo2">' + s(n.t.call(r, "embedForm.formv3.profileImageChangeUrl", {
                name: "t",
                hash: {},
                data: a
            })) + '</label>\n                                                </div>\n\n                                                <div class="eRow logoTester  selectALogoHide logo2" style="margin-left: 50px;"></div>\n                                                <div class="eRow selectALogoHide logo2" style="margin-left: 45px;">\n                                                    <input class="inputF" name="logoUrl" type="text" size="30" value="www.mysite.com/logo.png">\n                                                </div>\n                                            </div>\n                                        </div>\n                                    </div><!-- /Logo -->\n\n                                    <!-- Design -->\n                                    <div class="eBlock clearfix">\n                                        <div class="ecSmallA">\n                                            <strong>Design</strong>\n                                        </div>\n                                        <div class="ecLarger">\n                                            <div class="eRow">\n                                                <input type="checkbox" name="design" id="d1" data-design="d1" value="color" checked>\n                                                <label for="d1" class="">' + s(n.t.call(r, "embedForm.formv3.bgColor", {
                name: "t",
                hash: {},
                data: a
            })) + '</label>\n\n                                                <span class="designHide d1">\n                                                    <select class="colorDropDown " name="colorChooser" data-for="backgroundColor2" id="designBackgroundColorDropdown" style="vertical-align: middle;">\n                                            <option value="default">' + s(n.t.call(r, "embedForm.formv3.colors.default", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="mint">' + s(n.t.call(r, "embedForm.formv3.colors.mint", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="green">' + s(n.t.call(r, "embedForm.formv3.colors.green", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="rosy">' + s(n.t.call(r, "embedForm.formv3.colors.rosy", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="bluedusty">' + s(n.t.call(r, "embedForm.formv3.colors.blueDusty", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="bluedark">' + s(n.t.call(r, "embedForm.formv3.colors.blueDark", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="brown">' + s(n.t.call(r, "embedForm.formv3.colors.brown", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="greylight">' + s(n.t.call(r, "embedForm.formv3.colors.greyLight", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="grey">' + s(n.t.call(r, "embedForm.formv3.colors.grey", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="greydark">' + s(n.t.call(r, "embedForm.formv3.colors.greyDark", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="black">' + s(n.t.call(r, "embedForm.formv3.colors.black", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                            <option value="custom">' + s(n.t.call(r, "embedForm.formv3.colors.custom", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                                    </select>\n\n                                                    <input type="text" name="designBackgroundColor" id="backgroundColor2" size="7" maxlength="7" class="inputF colorval" value="#222222" data-hex="true" style="background-color: rgb(34, 34, 34); color: rgb(255, 255, 255); vertical-align: middle;">\n                                                </span>\n                                            </div>\n                                            <div class="eRow">\n                                                <input type="checkbox" class="" name="design" id="d2" data-design="d2" value="image">\n                                                <label for="d2">' + s(n.t.call(r, "embedForm.formv3.bgImage", {
                name: "t",
                hash: {},
                data: a
            })) + '</label>\n\n                                                <span class="designHide d2" style="display: none; margin-left: 23px;">\n                                                    <br>\n                                                    <input class="inputF" name="backgroundImage" value="http://" size="35" maxlength="256" style="width: 174px;">\n                                                    <select name="backgroundImageStyle">\n                                                        <option value="stretch">' + s(n.t.call(r, "embedForm.formv4.readerBgImageStretch", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                                        <option value="topleft">' + s(n.t.call(r, "embedForm.formv4.readerBgImageTopLeft", {
                name: "t",
                hash: {},
                data: a
            })) + '</option>\n                                                    </select>\n                                                </span>\n\n                                                <div class="has-menu embed-ToolTipper">\n                                                    <a data-toggle="tooltip">(?)</a>\n                                                    <div class="menu default-padding arrow-bottom" data-tooltip="tooltip" style="width:250px;">\n                                                        <p>\n                                                            <strong class="textBlue">' + s(n.t.call(r, "embedForm.formv3.bgImage", {
                name: "t",
                hash: {},
                data: a
            })) + "</strong><br>" + s(n.t.call(r, "embedForm.formv3.bgImageDescription", {
                name: "t",
                hash: {},
                data: a
            })) + "\n                                                        </p>\n                                                    </div>\n                                                </div>\n\n                                            </div>\n                                        </div>\n                                    </div><!-- /Design -->\n                                </div> <!-- /proUsersOwnDocument -->\n                            </div><!-- /column -->\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = e.escapeExpression;
            return '<form name="skema" action="" method="get" id="skema">\n    <div class="embed2 clearfix">\n        <!-- headline -->\n        <div>\n            <div class="linkToOldEmbed white">\n                <span class="textGrey">' + (null != (o = n.t.call(r, "embedForm.formv3.oldEmbedLink", {
                name: "t",
                hash: {
                    linkPost: "</a>",
                    linkPre: '<a href="" class="toNormalEmbedPage">'
                },
                data: a
            })) ? o : "") + "</span>\n            </div>\n            <h2>" + s(n.t.call(r, "embedForm.formv3.titleAddToSite", {
                name: "t",
                hash: {},
                data: a
            })) + '</h2>\n        </div><!-- /headline -->\n\n        <!-- Mainbox -->\n        <div>\n            <!-- preview -->\n            <div class="eDouble clearfix previewBlock" style="position: relative;">\n                <div class="previewBox" style="position: relative; z-index: 10;">\n                    <!-- here the preview will be inserted -->\n                </div>\n                <p class="sizeExplanation" style="display: none;">\n                    ' + s(n.t.call(r, "embedForm.formv4.sizeEmbedInfo", {
                name: "t",
                hash: {},
                data: a
            })) + '\n                </p>\n            </div><!-- /preview -->\n\n            <div class="eBlock clearfix embedOptions white" style="clear: both;">\n                <div class="eDouble clearfix">\n                    <h3 class="showHideEmbedOptions"><strong>' + s(n.t.call(r, "embedForm.formv3.styleOptions", {
                name: "t",
                hash: {},
                data: a
            })) + '</strong></h3>\n                </div>\n\n                <div class="showHideEmbedOptionsContent" style="display: none; clear: both;">\n                    <div class="styling-options clearfix">\n                        <div class="column clearfix">\n                            <!-- Size -->\n                            <div class="eBlock clearfix">\n                                <div class="ecSmallA" style="padding: 5px 0 0;">\n                                    <strong>' + s(n.t.call(r, "embedForm.formv4.size", {
                name: "t",
                hash: {},
                data: a
            })) + '</strong>\n                                </div>\n                                <div class="ecLarger">\n                                    <div class="eRow ">\n                                        <div class="fleft" style="width: 18px; text-align: center;">\n                                            <div style="width: 17px; height: 12px; background-color: #78756E; margin-top: 9px;"></div>\n                                            <input type="radio" name="size" id="s1" value="400">\n                                        </div>\n\n                                        <div class="fleft" style="width: 25px; text-align: center;">\n                                            <div style="width: 25px; height: 17px; background-color: #78756E; margin-top: 4px;"></div>\n                                            <input type="radio" name="size" id="s2" value="525" checked>\n                                        </div>\n\n                                        <div class="fleft" style="width: 32px; text-align: center;">\n                                            <div style="width: 32px; height: 21px; background-color: #78756E;"></div>\n                                            <input type="radio" name="size" id="s3" value="650">\n                                        </div>\n\n                                        <div class="fleft" style="width: 150px;">\n                                            <div style="line-height: 19px;">\n                                                <input class="inputF" type="text" size="4" maxlength="4" name="customX" style="vertical-align: middle;">\n                                                <span style="vertical-align: middle;"> x </span>\n                                                <input class="inputF customY" type="text" size="4" maxlength="4" name="customY" style="vertical-align: middle;" readonly>\n                                                <span style="vertical-align: middle;">px</span>\n                                            </div>\n                                            <div class="floatleft">\n                                                <input type="radio" name="size" id="s4" value="custom">\n                                            </div>\n                                        </div>\n                                    </div><!-- /eRow -->\n                                </div><!-- /ecLarger -->\n                            </div><!-- /Size -->\n\n' + (null != (o = n["if"].call(r, null != t ? t.anonymousUser : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.program(3, a, 0),
                data: a
            })) ? o : "") + "                        </div><!-- /column -->\n\n" + (null != (o = n["if"].call(r, null != t ? t.anonymousUser : t, {
                name: "if",
                hash: {},
                fn: e.program(5, a, 0),
                inverse: e.program(7, a, 0),
                data: a
            })) ? o : "") + '                    </div>\n                </div><!-- /showHideEmbedOptionsContent -->\n            </div><!-- /embedOptions -->\n\n            <div class="mainButtons-wrapper">\n                <div class="clearfix mainButtons bg-white beige">\n                    <p id="doc-converting">' + (null != (o = n.t.call(r, "embedForm.formv4.processingPublicationInfo", {
                name: "t",
                hash: {},
                data: a
            })) ? o : "") + '</p>\n                    <div class="clearfix buttons">\n                        <div class="use-iframe-container">\n                            <input type="checkbox" name="use-iframe" id="use-iframe" value="1">\n                            <label for="use-iframe">' + s(n.t.call(r, "embedForm.formv4.embedCodeAlternative", {
                name: "t",
                hash: {},
                data: a
            })) + '</label>\n\n                            <div class="has-menu embed-ToolTipper">\n                                <a data-toggle="tooltip">(?)</a>\n                                <div class="menu default-padding arrow-bottom" data-tooltip="tooltip" style="width:250px;">\n                                    <p>' + (null != (o = n.t.call(r, "embedForm.formv3.embedCodeAlternativeDescription", {
                name: "t",
                hash: {
                    linkPost: "</a>",
                    linkPre: '<a href="http://help.issuu.com/entries/23965637-How-to-embed-Issuu-on-my-website" target="_blank" >'
                },
                data: a
            })) ? o : "") + '</p>\n                                </div>\n                            </div>\n\n                        </div>\n                        <div class="clearfix stylesDropdown"></div>\n                        <div class="update-message">\n                            ' + s(n.t.call(r, "embedForm.formv4.embedUpdatingInfo", {
                name: "t",
                hash: {},
                data: a
            })) + '\n                        </div>\n                    </div>\n\n\n                    <div class="eDouble tabs-content" id="code-tabs">\n                        <div class="embed-code">\n                            <div id="embed-code" class="selectable"></div>\n                        </div>\n                        <div class="iframe-code">\n                            <div id="iframe-code" class="selectable"></div>\n                        </div>\n                    </div>\n\n                    <div class="link-label">\n                        ' + s(n.t.call(r, "embedForm.formv4.embedUrlInfo2", {
                name: "t",
                hash: {},
                data: a
            })) + '\n                        <div class="has-menu embed-ToolTipper">\n                                <a data-toggle="tooltip">(?)</a>\n                                <div class="menu default-padding arrow-bottom" data-tooltip="tooltip" style="width:250px;">\n                                    <p>\n                                       ' + s(n.t.call(r, "embedForm.formv4.embedUrlInfo", {
                name: "t",
                hash: {},
                data: a
            })) + '\n                                    </p>\n                                </div>\n                            </div>\n                    </div>\n\n                    <div class="eDouble doc-link">\n                        <div id="doc-link" class="selectable"></div>\n                    </div>\n                </div><!-- /mainButtons -->\n            </div><!-- /mainButtons-wrapper -->\n\n        </div><!-- /Mainbox -->\n    </div><!-- /embed2 -->\n</form>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            var o, r = e.lambda,
                s = e.escapeExpression,
                l = null != t ? t : {};
            return '            <li class="' + s(r(null != t ? t.cssClass : t, t)) + '" data-embedId="' + s(r(null != t ? t.id : t, t)) + '">\n                ' + (null != (o = n["if"].call(l, null != t ? t.deleteEmbed : t, {
                name: "if",
                hash: {},
                fn: e.program(2, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '\n                <span class="style-icon-container"><span class="style-icon ' + s(r(null != t ? t.iconSize : t, t)) + '" style="background: ' + s(r(null != t ? t.iconColor : t, t)) + '"></span></span>\n                <span class="embed-title">\n                    <strong>' + s(r(null != t ? t.title : t, t)) + "</strong>\n                    " + (null != (o = n["if"].call(l, null != t ? t.updated : t, {
                name: "if",
                hash: {},
                fn: e.program(4, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "\n                </span>\n            </li>\n"
        },
        2: function(e, t, n, i, a) {
            return '<span class="delete-embed"></span>'
        },
        4: function(e, t, n, i, a) {
            return "<span>(" + e.escapeExpression(e.lambda(null != t ? t.updated : t, t)) + ")</span>"
        },
        6: function(e, t, n, i, a) {
            return '    <a href="#" class="create-embed-link button">' + e.escapeExpression(n.t.call(null != t ? t : {}, "embedForm.listDropDown.save", {
                name: "t",
                hash: {},
                data: a
            })) + "</a>\n"
        },
        8: function(e, t, n, i, a) {
            return '    <a href="#" class="create-embed-link button">' + e.escapeExpression(n.t.call(null != t ? t : {}, "embedForm.listDropDown.create", {
                name: "t",
                hash: {},
                data: a
            })) + "</a>\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {};
            return '<div class="style-dropdown">\n    <div class="selected-style">\n        <span class="toggle-dropdown"><span class="arrow-down"></span></span>\n        <span class="update-embed-link">' + e.escapeExpression(n.t.call(r, "embedForm.listDropDown.update", {
                name: "t",
                hash: {},
                data: a
            })) + '</span>\n        <span class="selected-style-title"></span>\n    </div>\n    <ul>\n' + (null != (o = n.each.call(r, null != t ? t.embeds : t, {
                name: "each",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "    </li>\n</div>\n\n" + (null != (o = n["if"].call(r, null != t ? t.noCustomEmbeds : t, {
                name: "if",
                hash: {},
                fn: e.program(6, a, 0),
                inverse: e.program(8, a, 0),
                data: a
            })) ? o : "")
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = n.helperMissing,
                l = "function",
                c = e.escapeExpression;
            return '<div data-configid="' + c((o = null != (o = n.userId || (null != t ? t.userId : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "userId",
                hash: {},
                data: a
            }) : o)) + "/" + c((o = null != (o = n.embedId || (null != t ? t.embedId : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "embedId",
                hash: {},
                data: a
            }) : o)) + '" style="width:' + c((o = null != (o = n.width || (null != t ? t.width : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "width",
                hash: {},
                data: a
            }) : o)) + "px; height:" + c((o = null != (o = n.height || (null != t ? t.height : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "height",
                hash: {},
                data: a
            }) : o)) + 'px;" class="issuuembed"></div><script type="text/javascript" src="//' + c((o = null != (o = n.domain || (null != t ? t.domain : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "domain",
                hash: {},
                data: a
            }) : o)) + '/embed.js" async="true"></script>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = n.helperMissing,
                l = "function",
                c = e.escapeExpression;
            return '<iframe width="' + c((o = null != (o = n.width || (null != t ? t.width : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "width",
                hash: {},
                data: a
            }) : o)) + '" height="' + c((o = null != (o = n.height || (null != t ? t.height : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "height",
                hash: {},
                data: a
            }) : o)) + '" src="//' + c((o = null != (o = n.domain || (null != t ? t.domain : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "domain",
                hash: {},
                data: a
            }) : o)) + "/embed.html#" + c((o = null != (o = n.userId || (null != t ? t.userId : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "userId",
                hash: {},
                data: a
            }) : o)) + "/" + c((o = null != (o = n.embedId || (null != t ? t.embedId : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "embedId",
                hash: {},
                data: a
            }) : o)) + '" frameborder="0" allowfullscreen></iframe>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            return "<div>\n"
        },
        3: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function";
            return '  	<div style="width:' + e.escapeExpression((r = null != (r = n.width || (null != t ? t.width : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "width",
                hash: {},
                data: a
            }) : r)) + 'px;" class="embed-links">\n  		' + (null != (r = null != (r = n.linksHtml || (null != t ? t.linksHtml : t)) ? r : l, o = typeof r === c ? r.call(s, {
                name: "linksHtml",
                hash: {},
                data: a
            }) : r) ? o : "") + "\n  	</div>\n </div>\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression;
            return (null != (o = n["if"].call(s, null != t ? t.showArchiveLink : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '<object style="width:' + u((r = null != (r = n.width || (null != t ? t.width : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "width",
                hash: {},
                data: a
            }) : r)) + "px;height:" + u((r = null != (r = n.height || (null != t ? t.height : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "height",
                hash: {},
                data: a
            }) : r)) + 'px" >\n	<param name="movie" value="' + u((r = null != (r = n.viewerUrl || (null != t ? t.viewerUrl : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "viewerUrl",
                hash: {},
                data: a
            }) : r)) + "?" + u((r = null != (r = n.flashvars || (null != t ? t.flashvars : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "flashvars",
                hash: {},
                data: a
            }) : r)) + '" />\n	<param name="allowfullscreen" value="true"/>\n	<param name="allowscriptaccess" value="' + u((r = null != (r = n.allowscriptaccess || (null != t ? t.allowscriptaccess : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "allowscriptaccess",
                hash: {},
                data: a
            }) : r)) + '"/>\n	<param name="menu" value="false"/>\n	<param name="wmode" value="transparent"/>\n	<embed src="' + u((r = null != (r = n.viewerUrl || (null != t ? t.viewerUrl : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "viewerUrl",
                hash: {},
                data: a
            }) : r)) + '" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="' + u((r = null != (r = n.allowscriptaccess || (null != t ? t.allowscriptaccess : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "allowscriptaccess",
                hash: {},
                data: a
            }) : r)) + '" menu="false" wmode="transparent" style="width:' + u((r = null != (r = n.width || (null != t ? t.width : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "width",
                hash: {},
                data: a
            }) : r)) + "px; height:" + u((r = null != (r = n.height || (null != t ? t.height : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "height",
                hash: {},
                data: a
            }) : r)) + 'px" flashvars="' + u((r = null != (r = n.flashvars || (null != t ? t.flashvars : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "flashvars",
                hash: {},
                data: a
            }) : r)) + '" />\n</object>\n' + (null != (o = n["if"].call(s, null != t ? t.showArchiveLink : t, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "")
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            return "    <br /><p>" + e.escapeExpression(n.t.call(null != t ? t : {}, "documentpage.explicitsignup", {
                name: "t",
                hash: {},
                data: a
            })) + "</p>\n"
        },
        3: function(e, t, n, i, a) {
            return '    <button class="btn btn-primary primary explicit-accept">' + e.escapeExpression(n.t.call(null != t ? t : {}, "documentpage.explicitok", {
                name: "t",
                hash: {},
                data: a
            })) + "</button>\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = e.escapeExpression;
            return '<div class="explicit-warning-inner widthconstrainer">\n    <h2>' + s(n.t.call(r, "documentpage.explicittitle", {
                name: "t",
                hash: {},
                data: a
            })) + "</h2>\n    <p>" + s(n.t.call(r, "documentpage.explicitmessage", {
                name: "t",
                hash: {},
                data: a
            })) + "</p>\n" + (null != (o = n["if"].call(r, null != t ? t.loginBtnEnabled : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + (null != (o = n["if"].call(r, null != t ? t.okBtnEnabled : t, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o = null != t ? t : {},
                r = e.escapeExpression;
            return '<div class="flagdocument bg-white container default-style">\n    <h1>' + r(n.t.call(o, "flagdocument.inappropriate", {
                name: "t",
                hash: {},
                data: a
            })) + '</h1>\n    <p class="introduction">\n        ' + r(n.t.call(o, "flagdocument.introduction", {
                name: "t",
                hash: {},
                data: a
            })) + '\n    </p>\n    <form>\n        <label><input type="radio" name="flag" value="sexual" /> ' + r(n.t.call(o, "flagdocument.sexual", {
                name: "t",
                hash: {},
                data: a
            })) + '</label>\n        <label><input type="radio" name="flag" value="violent" /> ' + r(n.t.call(o, "flagdocument.violent", {
                name: "t",
                hash: {},
                data: a
            })) + '</label>\n        <label><input type="radio" name="flag" value="hateful" /> ' + r(n.t.call(o, "flagdocument.hateful", {
                name: "t",
                hash: {},
                data: a
            })) + '</label>\n        <label><input type="radio" name="flag" value="spam" /> ' + r(n.t.call(o, "flagdocument.spam", {
                name: "t",
                hash: {},
                data: a
            })) + '</label>\n        <label><input type="radio" name="flag" value="quarantined" /> ' + r(n.t.call(o, "flagdocument.quarantined", {
                name: "t",
                hash: {},
                data: a
            })) + '</label>\n        <button class="flag btn btn-danger" disabled="disabled"><span class="text">' + r(n.t.call(o, "flagdocument.buttonflag", {
                name: "t",
                hash: {},
                data: a
            })) + '</span><span class="issuuicons"></span></button>\n        <button class="cancel btn btn-default">' + r(n.t.call(o, "flagdocument.buttonclose", {
                name: "t",
                hash: {},
                data: a
            })) + '</button>\n        <p class="feedback"></p>\n    </form>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = e.escapeExpression;
            return '<div id="normalFollowButton">\n    <button class="btn follow-button" data-button="state-icon" data-toggle="tooltip">\n        <span class="issuuicon issuuicon-follow follow-button__icon"></span>\n        <span class="issuuicon issuuicon-unfollow follow-button__unfollow-icon hidden"></span>\n        <span>\n            <span class="follow-button__title h4">' + s((o = null != (o = n.displayName || (null != t ? t.displayName : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(r, {
                name: "displayName",
                hash: {},
                data: a
            }) : o)) + '</span>\n            <span class="follow-button__subtitle small">' + s(n.t.call(r, "documentpage.followbutton.follow", {
                name: "t",
                hash: {},
                data: a
            })) + '</span>\n            <span class="follow-button__subtitle--unfollow small hidden">' + s(n.t.call(r, "documentpage.followbutton.unfollow", {
                name: "t",
                hash: {},
                data: a
            })) + '</span>\n        </span>\n    </button>\n    <div class="menu default-padding arrow-bottom docmenu__tooltip" data-tooltip="tooltip">\n        <p>' + s(n.t.call(r, "documentpage.tooltips.follow", {
                name: "t",
                hash: {},
                data: a
            })) + "</p>\n    </div>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            var o;
            return '        <div class="error-overlay-links">\n            <p>\n' + (null != (o = n.each.call(null != t ? t : {}, null != t ? t.links : t, {
                name: "each",
                hash: {},
                fn: e.program(2, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "            </p>\n        </div>\n"
        },
        2: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = n.helperMissing,
                l = "function",
                c = e.escapeExpression;
            return '                <a href="' + c((o = null != (o = n.href || (null != t ? t.href : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "href",
                hash: {},
                data: a
            }) : o)) + '" data-routable="false">' + c((o = null != (o = n.text || (null != t ? t.text : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "text",
                hash: {},
                data: a
            }) : o)) + "</a>\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {};
            return '<div class="issuu-error-overlay">\n    <div class="error-overlay-content">\n        <div class="error-overlay-title">\n            <p>\n                <strong>' + e.escapeExpression((r = null != (r = n.warning || (null != t ? t.warning : t)) ? r : n.helperMissing, "function" == typeof r ? r.call(s, {
                name: "warning",
                hash: {},
                data: a
            }) : r)) + "</strong>\n            </p>\n        </div>\n" + (null != (o = n["if"].call(s, null != t ? t.links : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "    </div>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            return '<div class="clipping-indicator">\n    <a href="javascript:void(0);" class="clippings-toggle js-clippings-toggle rotator">\n        <span class="issuuicon issuuicon-chevron-x"></span>\n        <div class="counter no-clippings"></div>\n    </a>\n\n    <a href="javascript:void(0);" class="creator-toggle js-creator-toggle">\n        <span class="issuuicon issuuicon-crop"></span>\n    </a>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o = null != t ? t : {},
                r = e.escapeExpression;
            return '<div class="clippings-tutorial">\n    <div class="balloon arrow-right tutorial-bubble js-bubble">\n        <h3>' + r(n.t.call(o, "mobilereader.clip.tutorial.title", {
                name: "t",
                hash: {},
                data: a
            })) + "</h3>\n        " + r(n.t.call(o, "mobilereader.clip.tutorial.description", {
                name: "t",
                hash: {},
                data: a
            })) + '\n        <p>\n            <a href="/clip" target="_blank" class="btn btn-default js-learnmore">' + r(n.t.call(o, "mobilereader.clip.tutorial.learnmore", {
                name: "t",
                hash: {},
                data: a
            })) + '</a>\n            <button type="button" class="btn btn-success js-dismiss">' + r(n.t.call(o, "mobilereader.clip.tutorial.ok", {
                name: "t",
                hash: {},
                data: a
            })) + "</button>\n        </p>\n    </div>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            return '    <li class="like">\n        <a>' + e.escapeExpression(n.t.call(null != t ? t : {}, "documentpage.like", {
                name: "t",
                hash: {},
                data: a
            })) + "</a>\n    </li>\n"
        },
        3: function(e, t, n, i, a) {
            return '    <li class="divider">\n    </li>\n    <li>\n        <a href="#" class="facebook" target="_blank"><span class="issuuicon issuuicon-facebook"></span> Facebook</a>\n    </li>\n    <li>\n        <a href="#" class="twitter" target="_blank"><span class="issuuicon issuuicon-twitter"></span> Twitter</a>\n    </li>\n    <li>\n        <a href="#" class="googleplus" target="_blank"><span class="issuuicon issuuicon-google-plus"></span> Google+</a>\n    </li>\n    <li>\n        <a href="#" class="linkedin" target="_blank"><span class="issuuicon issuuicon-linkedin"></span> LinkedIn</a>\n    </li>\n    <li>\n        <a href="#" class="tumblr" target="_blank"><span class="issuuicon issuuicon-tumblr"></span> Tumblr</a>\n    </li>\n    <li>\n        <a href="#" class="email"><span class="issuuicon issuuicon-envelope"></span> Email</a>\n    </li>\n'
        },
        5: function(e, t, n, i, a) {
            return '    <li class="divider"></li>\n    <li class="secondary">\n        <a class="report"><span class="issuuicon issuuicon-flag"></span> ' + e.escapeExpression(n.t.call(null != t ? t : {}, "documentpage.report", {
                name: "t",
                hash: {},
                data: a
            })) + "</a>\n    </li>\n"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {};
            return '<a href="#" class="type-discreet share functionality" data-toggle="submenu">\n    <i class="issuuicon issuuicon-share"></i>\n</a>\n<ul data-list="submenu" class="share-submenu menu arrow-top">\n' + (null != (o = n["if"].call(r, null != t ? t.showLikeAndFlag : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + (null != (o = n["if"].call(r, null != t ? t.showShareButton : t, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '    <li class="download divider hidden"></li>\n    <li class="download hidden">\n        <a class="download"><span class="issuuicon issuuicon-download"></span> ' + e.escapeExpression(n.t.call(r, "documentpage.download", {
                name: "t",
                hash: {},
                data: a
            })) + "</a>\n    </li>\n" + (null != (o = n["if"].call(r, null != t ? t.showLikeAndFlag : t, {
                name: "if",
                hash: {},
                fn: e.program(5, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "</ul>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            return '            <a href="#" class="type-discreet addto functionality">\n                <i class="issuuicon issuuicon-add-to-stack"></i>\n            </a>\n'
        },
        3: function(e, t, n, i, a) {
            return '            <button class="subscription btn btn-success">' + e.escapeExpression(n.t.call(null != t ? t : {}, "userprofile.follow", {
                name: "t",
                hash: {},
                data: a
            })) + "</button>\n"
        },
        5: function(e, t, n, i, a) {
            return '            <a class="issuu-logo issuu-logo--small" href="/" id="logo" title="Issuu Logo">\n                <i class="issuu-logo__mark issuuicon issuuicon-logo-small"></i>\n                <i class="issuu-logo__type issuuicon issuuicon-logo"></i>\n            </a>\n'
        },
        7: function(e, t, n, i, a) {
            return '            <a href="#" class="infobutton type-discreet">\n                <i class="issuuicon issuuicon-info-circle"></i>\n            </a>\n'
        },
        9: function(e, t, n, i, a) {
            return "personal"
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function",
                u = e.escapeExpression;
            return '<div class="menuwrapper">\n    <div class="menubar theme-dark">\n        <div class="rightbuttons">\n' + (null != (o = n["if"].call(s, null != t ? t.showStackButton : t, {
                name: "if",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '            <div class="shareoptions has-menu">\n            </div>\n' + (null != (o = n["if"].call(s, null != t ? t.showFollowButton : t, {
                name: "if",
                hash: {},
                fn: e.program(3, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '        </div>\n        <div class="leftbuttons">\n' + (null != (o = n["if"].call(s, null != t ? t.showLogo : t, {
                name: "if",
                hash: {},
                fn: e.program(5, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '            <h2 class="menubar-title">\n                ' + u((r = null != (r = n.documenttitle || (null != t ? t.documenttitle : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "documenttitle",
                hash: {},
                data: a
            }) : r)) + "\n            </h2>\n" + (null != (o = n["if"].call(s, null != t ? t.showInfo : t, {
                name: "if",
                hash: {},
                fn: e.program(7, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '        </div>\n    </div>\n    <div class="metaoverlay bg-white theme-light">\n        <h2>' + u((r = null != (r = n.documenttitle || (null != t ? t.documenttitle : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "documenttitle",
                hash: {},
                data: a
            }) : r)) + '</h2>\n        <p class="description">\n            ' + (null != (r = null != (r = n.documentdescription || (null != t ? t.documentdescription : t)) ? r : l, o = typeof r === c ? r.call(s, {
                name: "documentdescription",
                hash: {},
                data: a
            }) : r) ? o : "") + '\n        </p>\n        <p class="owner">\n            <a href="' + u((r = null != (r = n.ownerlink || (null != t ? t.ownerlink : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "ownerlink",
                hash: {},
                data: a
            }) : r)) + '"><img src="' + u((r = null != (r = n.ownerpic || (null != t ? t.ownerpic : t)) ? r : l, typeof r === c ? r.call(s, {
                name: "ownerpic",
                hash: {},
                data: a
            }) : r)) + '" class="' + (null != (o = n.unless.call(s, null != t ? t.isBusinessAccount : t, {
                name: "unless",
                hash: {},
                fn: e.program(9, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + '" /></a> ' + u(n.t.call(s, "mobilereader.menubar.authoranddate", {
                name: "t",
                hash: {
                    documentdate: null != t ? t.documentdate : t,
                    owner: null != t ? t.owner : t,
                    ownerlink: null != t ? t.ownerlink : t
                },
                data: a
            })) + "\n        </p>\n    </div>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = e.escapeExpression,
                l = n.helperMissing,
                c = "function";
            return '<div class="pagezero-ad theme-dark">\n    <div class="pagezero-ad__ad-container" >\n        <a href="#" class="pagezero-ad__close type-discreet type-small">' + s(n.t.call(r, "documentpage.adsClose", {
                name: "t",
                hash: {},
                data: a
            })) + ' X</a>\n        <div id="' + s((o = null != (o = n.slotname || (null != t ? t.slotname : t)) ? o : l, typeof o === c ? o.call(r, {
                name: "slotname",
                hash: {},
                data: a
            }) : o)) + '" style="width:' + s((o = null != (o = n.width || (null != t ? t.width : t)) ? o : l, typeof o === c ? o.call(r, {
                name: "width",
                hash: {},
                data: a
            }) : o)) + "px;height:" + s((o = null != (o = n.height || (null != t ? t.height : t)) ? o : l, typeof o === c ? o.call(r, {
                name: "height",
                hash: {},
                data: a
            }) : o)) + 'px;" class="pagezero-ad__ad"></div>\n    </div>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        1: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = n.helperMissing,
                l = "function",
                c = e.escapeExpression;
            return '        <a href="' + c((o = null != (o = n.link || (null != t ? t.link : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "link",
                hash: {},
                data: a
            }) : o)) + '">\n            <img src="' + c((o = null != (o = n.thumbUrl || (null != t ? t.thumbUrl : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "thumbUrl",
                hash: {},
                data: a
            }) : o)) + '">\n        </a>\n'
        },
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r, s = null != t ? t : {},
                l = n.helperMissing,
                c = "function";
            return '<div class="pagezero-follow-publisher theme-dark">\n    <p class="pagezero-follow-publisher__text">' + e.escapeExpression(n.tr.call(s, t, {
                name: "tr",
                hash: {
                    key: "pagezero.follow-publisher.text"
                },
                data: a
            })) + "</p>\n    " + (null != (r = null != (r = n.normalFollowButtonHTML || (null != t ? t.normalFollowButtonHTML : t)) ? r : l, o = typeof r === c ? r.call(s, {
                name: "normalFollowButtonHTML",
                hash: {},
                data: a
            }) : r) ? o : "") + '\n    <div class="pagezero-follow-publisher__latest-documents">\n' + (null != (o = n.each.call(s, null != t ? t.latestDocuments : t, {
                name: "each",
                hash: {},
                fn: e.program(1, a, 0),
                inverse: e.noop,
                data: a
            })) ? o : "") + "    </div>\n    " + (null != (r = null != (r = n.titleAndDescriptionHTML || (null != t ? t.titleAndDescriptionHTML : t)) ? r : l, o = typeof r === c ? r.call(s, {
                name: "titleAndDescriptionHTML",
                hash: {},
                data: a
            }) : r) ? o : "") + "\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o = null != t ? t : {},
                r = e.escapeExpression;
            return '<div class="pagezero-signin theme-dark">\n    <p class="h3-paragraph pagezero-signin__text">' + r(n.tr.call(o, t, {
                name: "tr",
                hash: {
                    issuu: "issuu",
                    key: "pagezero.sign-in.text"
                },
                data: a
            })) + '</p>\n    <button type="button" class="btn btn-default pagezero-signin__button">' + r(n.t.call(o, "pagezero.sign-in.button", {
                name: "t",
                hash: {},
                data: a
            })) + '</button>\n    <a class="pagezero-signin__signupLink type-discreet" href="/signup">' + r(n.t.call(o, "pagezero.sign-in.link", {
                name: "t",
                hash: {},
                data: a
            })) + "</a>\n</div>\n"
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = e.escapeExpression;
            return '<div class="reader-ad--hide js-reader-ad theme-dark">\n    <div class="reader-ad__ad-container" >\n        <a href="#" class="reader-ad--hide__close-btn js-reader-ad__close type-discreet type-small">' + s(n.t.call(r, "documentpage.adsClose", {
                name: "t",
                hash: {},
                data: a
            })) + ' X</a>\n        <div id="' + s((o = null != (o = n.slotname || (null != t ? t.slotname : t)) ? o : n.helperMissing, "function" == typeof o ? o.call(r, {
                name: "slotname",
                hash: {},
                data: a
            }) : o)) + '" class="reader-ad__ad"></div>\n    </div>\n</div>\n'
        },
        useData: !0
    })
}, function(e, t, n) {
    var i = n(3);
    e.exports = (i["default"] || i).template({
        compiler: [7, ">= 4.0.0"],
        main: function(e, t, n, i, a) {
            var o, r = null != t ? t : {},
                s = n.helperMissing,
                l = "function",
                c = e.escapeExpression;
            return '<object type="application/x-shockwave-flash" id="flashcontent" name="flashcontent" data="' + c((o = null != (o = n.readerSwfUrl || (null != t ? t.readerSwfUrl : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "readerSwfUrl",
                hash: {},
                data: a
            }) : o)) + '" width="100%" height="100%" style="visibility: visible;">\n    <param name="movie" value="' + c((o = null != (o = n.readerSwfUrl || (null != t ? t.readerSwfUrl : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "readerSwfUrl",
                hash: {},
                data: a
            }) : o)) + '" />\n    <param name="allowfullscreen" value="true">\n    <param name="menu" value="false">\n    <param name="salign" value="tl">\n    <param name="scale" value="noscale">\n    <param name="wmode" value="transparent">\n    <param name="allowscriptaccess" value="always">\n    <param name="flashvars" value="' + c((o = null != (o = n.flashvars || (null != t ? t.flashvars : t)) ? o : s, typeof o === l ? o.call(r, {
                name: "flashvars",
                hash: {},
                data: a
            }) : o)) + '">\n</object>\n'
        },
        useData: !0
    })
}, , , , , , , , , , , , , , , , function(e, t, n) {
    function i(e, t) {
        var n = i18n.t("stackswidget.addedtostacksingularsingular", {
            docname: t[0].title,
            stackname: e[0].getModel().get("name")
        });
        e.length > 1 && t.length > 1 ? n = i18n.t("stackswidget.addedtostackpluralplural", {
            doccount: t.length,
            stackcount: e.length
        }) : t.length > 1 ? n = i18n.t("stackswidget.addedtostackpluralsingular", {
            doccount: t.length,
            stackname: e[0].getModel().get("name")
        }) : e.length > 1 && (n = i18n.t("stackswidget.addedtostacksingularplural", {
            docname: t[0].title,
            stackcount: e.length
        })), s.broadcast(s.events.messagehubInfo, {
            message: n
        })
    }

    function a(e) {
        var t = new $.Deferred;
        return o.create({
            cache: !1,
            action: "issuu.stacks.list",
            isReadOnly: !0
        }).parameters({
            pageSize: 50,
            startIndex: e || 0,
            stackUsername: r.getUsername(),
            sortBy: "title",
            resultOrder: "asc"
        }).call().then(function(e) {
            var n = [];
            $.each(e.result._content, function(e, t) {
                n.push(t.stack)
            }), t.resolve(n, e.result.more)
        }, t.reject), t
    }
    var o = n(7),
        r = n(4),
        s = n(2);
    t.loadStacks = function() {
        function e() {
            a(n.length).then(function(i, a) {
                i && (n = n.concat(i)), t.notify(i), a ? e() : t.resolve(n)
            }, t.reject)
        }
        var t = new $.Deferred,
            n = [];
        return e(), t
    }, t.addStack = function(e, t, n) {
        var i = o.create({
            cache: !1,
            action: "issuu.stack.add",
            type: "POST"
        }).parameters({
            stackTitle: e,
            stackDescription: "",
            access: "public"
        }).call();
        $.when(i).then(function(e) {
            t(e.stack)
        }, n)
    }, t.addDocsToStacks = function(e, t, n, a) {
        var r = [],
            s = _.map(e, function(e) {
                return e.getModel().get("id")
            });
        $.each(t, function(e, t) {
            $.each(s, function(e, n) {
                r.push(o.create({
                    action: "issuu.stack.add_document",
                    type: "POST"
                }).parameters({
                    stackId: n,
                    documentId: t.revisionId + "-" + t.publicationId
                }).call())
            })
        }), $.when.apply($, r).then(function() {
            i(e, t), n.apply(void 0, arguments)
        }, a)
    }
}, function(e, t, n) {
    function i() {
        t.getSelectedStacks().length > 0 ? p.find(".js-addtostack").prop("disabled", !1).text(i18n.t("stackswidget.button_someselected", {
            count: t.getSelectedStacks().length
        })) : p.find(".js-addtostack").prop("disabled", !0).text(i18n.t("stackswidget.button_noneselected"))
    }

    function a(e) {
        var t = e.getInitializedElement();
        return $('<li class="stacklist__item">').append(t)
    }

    function o() {
        p.find(".addtostacks").width() > p.find(".js-stacklist").width() && p.find(".js-stacklist").css({
            overflowX: "auto"
        })
    }

    function r(e) {
        a(e).insertBefore(p.find(".createstack").closest("li")), o()
    }

    function s(e) {
        p.find(".js-stacklist").animate({
            scrollLeft: e
        }, 250)
    }

    function l() {
        var e = p.find(".js-stacklist"),
            t = Math.min(e.scrollLeft() + .9 * e.width(), e.get(0).scrollWidth - e.width());
        s(t)
    }

    function c() {
        var e = p.find(".js-stacklist"),
            t = Math.max(0, e.scrollLeft() - .9 * e.width());
        s(t)
    }

    function u() {
        p.find(".createstack a").on("click", function(e) {
            e.preventDefault(), e.stopPropagation(), h.broadcast("CREATE STACK")
        }), p.find(".js-addtostack").on("click", function(e) {
            e.preventDefault(), e.stopPropagation(), h.broadcast("ADD DOCUMENTS"), $(e.srcElement).addClass("spinner")
        }), p.find(".js-addtostack-cancel").on("click", function(e) {
            e.preventDefault(), e.stopPropagation(), h.broadcast("DOCUMENTS ADDED")
        }), p.find(".js-addtostacks-next").on("click", function(e) {
            e.preventDefault(), e.stopPropagation(), l()
        }), p.find(".js-addtostacks-prev").on("click", function(e) {
            e.preventDefault(), e.stopPropagation(), c()
        })
    }

    function d() {
        o(), u()
    }
    var p, h = n(2),
        f = n(85),
        m = n(285),
        g = [],
        v = {
            selectionOnly: !0,
            onSelectionChanged: i,
            hideOwner: !0
        };
    t.addStacks = function(e) {
        $.each(e, function(e, t) {
            var n = f.create(t, v);
            g.push(n)
        }), i()
    }, t.renderStacks = function() {
        $.each(g, function(e, t) {
            var n = t.getInitializedElement().parent("li");
            t.removeElement(), n.remove(), r(t)
        })
    }, t.getSelectedStacks = function() {
        return _.filter(g, function(e) {
            return e.getModel().isSelected()
        })
    }, t.getModel = function() {
        return _.map(g, function(e) {
            return e.getModel().getRawData()
        })
    }, t.renderInto = function(e) {
        p = $(e), p.find("li.stack").off("click"), p.find("button").off("click"), p.html(m({
            title: i18n.t("stackswidget.stacks"),
            doneButtonText: i18n.t("stackswidget.button_noneselected"),
            cancelButtonText: i18n.t("stackswidget.button_cancel"),
            createStackMarkup: n(77)()
        })), d()
    }, t.create = function() {
        g = []
    }
}, function(e, t, n) {
    var i = n(9);
    t.create = function(e) {
        function t(e) {
            return u = e || u, p
        }

        function n() {
            var e = d.path || "/";
            return e = "/" === e.charAt(0) ? e : "/" + e
        }

        function a(e, t) {
            var a = _.extend(u, d.params);
            return d.type = e, d.dataType = "json", d.data = _.isEmpty(a) ? "" : JSON.stringify(a), d.timeout = d.timeout || 0, d.processData = !1, d.headers = {
                "Content-Type": "application/json"
            }, d.xhrFields = {
                withCredentials: !0
            }, t && _.assign(d, t), "GET" !== e && (d.headers["X-Csrf-Token"] = i.getCookie("CSRF-TOKEN")), $.ajax(n(), d)
        }

        function o() {
            return a("POST")
        }

        function r() {
            return a("GET")
        }

        function s() {
            return a("PUT")
        }

        function l() {
            return a("DELETE")
        }

        function c() {
            var e = {
                beforeSend: function(e) {
                    e.setRequestHeader("X-HTTP-Method-Override", "PATCH")
                }
            };
            return a("POST", e)
        }
        var u = {},
            d = _.extend({
                format: "json",
                cache: !1,
                timeout: void 0
            }, e),
            p = {
                parameters: t,
                create: o,
                read: r,
                update: s,
                "delete": l,
                patch: c
            };
        return p
    }
}, function(e, t) {
    function n(e) {
        function t(e) {
            var t = e.match(/[\d]+/g);
            return t.length = 3, t.join(".")
        }
        var n = !1,
            i = "";
        if (e.plugins && e.plugins.length) {
            var a = e.plugins["Shockwave Flash"];
            if (a && (n = !0, a.description && (i = t(a.description))), e.plugins["Shockwave Flash 2.0"] && (n = !0, i = "2.0.0.11"), e.mimeTypes && e.mimeTypes.length) {
                var o = e.mimeTypes["application/x-shockwave-flash"];
                o && !o.enabledPlugin && (n = !1, i = "")
            }
        } else if (e.mimeTypes && e.mimeTypes.length) {
            var r = e.mimeTypes["application/x-shockwave-flash"];
            r && r.enabledPlugin && (n = !0, i = t(r.enabledPlugin.description))
        } else {
            var s;
            try {
                if (s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) {
                    var l = s.GetVariable("$version");
                    l && (n = !0, i = t(l.split(" ")[1]))
                }
            } catch (c) {}
            if (!i) try {
                s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), n = !0, i = t(new s.GetVariable("$version"))
            } catch (u) {
                try {
                    s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), n = !0, i = "6.0.21"
                } catch (d) {
                    try {
                        s = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), n = !0, i = t(new s.GetVariable("$version"))
                    } catch (p) {}
                }
            }
        }
        return {
            hasFlash: function() {
                return n
            },
            getVersion: function() {
                return i
            },
            isVersionSuperiorTo: function(e) {
                var t = i.split(".");
                return t && t.length > 0 && parseInt(t[0], 10) >= e
            }
        }
    }

    function i() {
        return a || t._init(navigator), a
    }
    var a;
    t._init = function(e) {
        a = n(e), window.FLASHDETECT = a
    }, t.hasFlash = function() {
        return i().hasFlash()
    }, t.getVersion = function() {
        return i().getVersion()
    }, t.isGoodForIssuu = function() {
        return i().isVersionSuperiorTo(10)
    }
}, function(e, t, n) {
    function i() {
        return u ? u : u = c.getId().then(function(e) {
            return e
        })
    }

    function a() {
        return d ? d : d = i().then(function(e) {
            return s.create({
                path: "call/licensing/application/get/1/1/publisher/" + e,
                isReadOnly: !0,
                cache: !1
            }).parameters().call()
        })
    }

    function o(e) {
        var t = new $.Deferred;
        return a().then(function(n) {
            t.resolve(_.contains(n, e))
        }, function(n) {
            var i = "unknown";
            n && n.status ? i = "http_" + n.status : n && n._content && n._content.error && n._content.error.code && (i = "api_" + n._content.error.code), l.error("Licensing failed for " + e + " - " + i, i), t.reject()
        }), t
    }

    function r() {
        var e = i().then(function(e) {
            return s.create({
                path: "call/licensing/downloads/remaining/1/1/publisher/" + e,
                cache: !1,
                isReadOnly: !0
            }).parameters({}).call()
        });
        return e
    }
    var s = n(7),
        l = n(1),
        c = n(4),
        u = null,
        d = null;
    t.getUploadLimit = function() {
        var e = new $.Deferred;
        return a().then(function(t) {
            var n = _.find(t, function(e) {
                return _.isArray(e) && "uploadlimitmb" === e[0]
            });
            n ? e.resolve(n[1]) : e.reject()
        }, function() {
            l.error("Licensing failed for upload limit call"), e.reject()
        }), e
    }, t.getStatisticsMonths = function() {
        var e = new $.Deferred;
        return a().then(function(t) {
            var n = _.find(t, function(e) {
                return _.isArray(e) && "statsmonths" === e[0]
            });
            n ? e.resolve(n[1]) : e.reject()
        }, function() {
            l.error("Licensing failed for statistics months call"), e.reject()
        }), e
    }, t.getAllowDownloadProperties = function() {
        var e = new $.Deferred;
        return $.when(a(), r()).then(function(t, n) {
            var i = _.contains(t, "download"),
                a = n;
            i && 1 === n && (a = void 0), e.resolve({
                hasDownloadLicense: i,
                numLegacyDownloadsRemaining: a
            })
        }), e.promise()
    }, t.getAvailableUnlistedDocs = function() {
        var e = 25,
            t = new $.Deferred;
        return s.create({
            action: "issuu.user.unlisted_documents"
        }).parameters().deleteCache().call().then(function(e) {
            var n;
            n = "unlimited" === e.allowed ? "unlimited" : Math.max(e.allowed - e.unlisted, 0), t.resolve(n)
        }, function(n) {
            l.error(new Error("Licensing widget: getAvailableUnlistedDocs failed")), t.resolve(e)
        }), t.promise()
    }, t.hasClipCustomizationFeature = function() {
        return o("clip_customization")
    }, t.hasAnonymousDownloadFromEmbedFeature = function() {
        return o("anonymous_download_from_embed")
    }, t.hasSchedulePublishDateFeature = function() {
        return o("schedule_publish_date")
    }, t.hasFullApiAccessFeature = function() {
        return o("full_api_access")
    }, t.hasFacebookAppFeature = function() {
        return o("facebook_app")
    }, t.hasBrandpackageFeature = function() {
        return o("brandpackage")
    }, t.hasFeature = o, t.clearCache = function() {
        d = null
    }
}, function(e, t, n) {
    function i(e) {
        var t = {
            title: "",
            description: "",
            url: "",
            photoUrl: ""
        };
        _.extend(t, e);
        var n = 722,
            i = 300,
            a = (screen.width - n) / 2,
            o = (screen.height - i) / 2,
            r = "width=" + n + ",height=" + i + ",left=" + a + ",top=" + o,
            s = "http://www.pinterest.com/pin/create/button/?media=" + encodeURIComponent(t.photoUrl) + "&description=" + encodeURIComponent(t.title) + (t.description && t.description !== t.title ? encodeURIComponent("\n\n" + t.description) : "") + "&url=" + encodeURIComponent(t.url);
        window.open(s, "_blank", r)
    }

    function a(e, t) {
        var n = r.publicationUrl(e.owner, e.name, e.pageNumber),
            a = r.pageFullUrl(e.publicationId, e.revisionId, e.pageNumber);
        t && (n += "?e=" + t), i({
            url: n,
            photoUrl: a,
            title: e.title,
            description: e.description
        }), s.broadcast(s.events.documentShare, {
            publicationId: e.publicationId,
            revisionId: e.revisionId,
            publicationName: e.name,
            ownerUsername: e.owner,
            service: l
        })
    }

    function o(e, t) {
        var n = r.clippingUrl(e.owner, e.name, e.clippingId),
            a = r.clippingThumbUrl(e.clippingId);
        t && (n += "?e=" + t), i({
            url: n,
            photoUrl: a,
            title: "#ClippedOnIssuu from " + (e.title || "an Issuu publication")
        }), s.broadcast(s.events.clippingShare, {
            clippingId: e.clippingId,
            clippingPage: e.clippingPage,
            service: l
        })
    }
    var r = n(5),
        s = n(2),
        l = "pinterest";
    t.sharePost = i, t.sharePublication = a, t.shareClipping = o
}, function(e, t, n) {
    function i(e) {
        function t() {
            return "ACTIVE" === a
        }

        function n() {
            return /DUNNING/.test(a)
        }

        function i() {
            return "SUSPENDED" === a
        }
        var a = e && e.status ? e.status : "";
        return {
            isAbleToPay: t,
            isInDunning: n,
            isSuspended: i
        }
    }

    function a(e) {
        function t() {
            return l
        }

        function n() {
            return "string" == typeof l.status && l.status.match(/DUNNING/)
        }

        function i() {
            return s.log("billingInfo", "hasPaymentMethod data", l), l.paymentMethod && "Other/None" !== l.paymentMethod
        }

        function a(e) {
            return l && l.status && (l.status === e || l.status.replace("_", " ") === e)
        }

        function o() {
            return i() && !n() && !a("SUSPENDED") && !a("TERMINATED") && !a("ARCHIVED")
        }

        function r() {
            return l && l.status ? l.status.replace("_", " ") : !1
        }
        var l = e && e.billingInfo ? e.billingInfo : {};
        s.log("billingInfo", "getBillingWrapper", l);
        var c = {
            getStatus: r,
            isStatus: a,
            isAbleToPay: o,
            hasPaymentMethod: i,
            isInDunning: n,
            getAll: t
        };
        return c
    }

    function o() {
        return r.create({
            path: "/res/payment/frontend/billing_info"
        }).read().then(function(e) {
            var t = e && e.rsp && e.rsp._content || {};
            return a(t)
        }, function(e) {
            return s.log("billingInfo", "We have some problems getting your data, please try this page a little later."), e
        })
    }
    var r = n(341),
        s = n(1),
        l = null;
    t.getStatus = function() {
        return r.create({
            path: "/res/payment/frontend/account_status"
        }).read().then(function(e) {
            var t = e && e.rsp && e.rsp._content || {};
            return i(t)
        })
    }, t.get = function(e) {
        return (!l || e) && (l = o()), l
    }
}, function(e, t) {
    t.isInIframe = function() {
        try {
            return window.self !== window.top
        } catch (e) {
            return !0
        }
    }
}, , function(e, t, n) {
    var i = n(284),
        a = function(e, t, n) {
            var a = t || {},
                o = n || {
                    dangerouslySkipEscaping: !1
                },
                r = e.replace(/(%\(.*?\)s)/g, function(e) {
                    var t = e.match(/%\((.*)\)s/)[1];
                    return a[t]
                });
            return o.dangerouslySkipEscaping ? r : i(r)
        },
        o = function(e, t, n, i) {
            return 1 === n.count ? a(e, n, i) : a(t, n, i)
        };
    e.exports = {
        __: a,
        __n: o
    }
}, function(e, t, n) {
    e.exports = {
        create: function(e, t, i) {
            function a(e) {
                var t, n;
                return c && s.length ? (n = Math.floor((e - l) / c), t = (e - l) % c === 0 ? s[n] : l > e ? r[e] : r[e - n - 1]) : t = r[e], t
            }
            var o = i || {},
                r = [],
                s = [],
                l = o.adsStart || 0,
                c = o.adsDistance || 0,
                u = [],
                d = {
                    doc: n(95),
                    docExternal: n(95),
                    "300x250": n(178),
                    "300x250-video": n(178),
                    ad: n(95)
                },
                p = {
                    doc: n(127),
                    docExternal: n(350),
                    "300x250": n(190),
                    "300x250-video": n(190),
                    ad: n(351)
                },
                h = {
                    type: "300x250-video"
                },
                f = {
                    type: "300x250"
                };
            return function() {
                t && s.push(h)
            }(), {
                getItemCount: function() {
                    return c ? r.length + Math.min(Math.ceil((r.length - l) / c), s.length) : r.length
                },
                getItemHeight: function(e, t) {
                    var n = p[a(e).type];
                    return n && n.getHeight ? n.getHeight(a(e), t) : void 0
                },
                getItemKind: function(e) {
                    return a(e).type
                },
                allowReuse: function(e) {
                    var t = p[e];
                    return t && "boolean" == typeof t.allowReuse ? t.allowReuse : !0
                },
                getItemColWidth: function(e) {
                    var t = p[a(e).type];
                    return t && t.cols ? t.cols : 1
                },
                getMinDistanceForKind: function(e) {
                    var t = p[e];
                    return t && t.distance ? t.distance : 0
                },
                initElement: function(e, t) {
                    var n = d[t];
                    e.className = "stream2__element", n && (e.innerHTML = n({}));
                    var i = p[t];
                    i && i.init(e)
                },
                updateElement: function(e, t, n, i) {
                    var o = p[a(t).type];
                    o && o.update(e, a(t), t, n, i)
                },
                loadMore: function(n) {
                    if (u.length) return void u.push(n);
                    if (u.push(n), !e.isThereMore()) return u.forEach(function(e) {
                        e()
                    }), void(u = []);
                    if (t && c && r.length + e.getPageSize() + s.length > s.length * c + l) {
                        for (var i = [], a = 0; 20 > a; a++) i.push(JSON.parse(JSON.stringify(f)));
                        s = s.concat(i)
                    }
                    e.getMore().then(function(e) {
                        var t = e;
                        o.filter && (t = o.filter(t)), t.stream = t.stream.filter(function(e) {
                            return !!p[e.type]
                        }), r.push.apply(r, t.stream), u.forEach(function(e) {
                            e()
                        }), u = [], o.onUpdate && o.onUpdate(t)
                    }, function(e) {
                        u.forEach(function(t) {
                            t(e)
                        }), u = []
                    })
                },
                setAdsStartAndDistance: function(e, t) {
                    l = e, c = t
                }
            }
        }
    }
}, function(e, t, n) {
    var i = n(127),
        a = i.publicationUrl;
    e.exports = _.defaults({
        publicationUrl: function() {
            return a.apply(i, arguments) + "?e=0"
        }
    }, i)
}, function(e, t, n) {
    function i(e) {
        var t = e.creative.docid.split("-");
        return e.publicationId = t[1], e.publicationCreationTime = null, e.isExplicit = null, e.title = e.creative.title || "", e.ownerUsername = e.creative.username, e.revisionId = t[0], e.pageCount = null, e.publicationName = e.creative.docname, e.detectedLanguage = null, e.description = e.creative.body || "", e
    }
    var a = n(127),
        o = n(2),
        r = n(15),
        s = n(1),
        l = n(10),
        c = a._getRoot;
    e.exports = {
        getHeight: a.getHeight,
        publicationUrl: a.publicationUrl,
        imageUrl: a.imageUrl,
        init: function(e) {
            a.init.call(this, e), e.className += " stream2-doc-element--targeted"
        },
        update: function(e, t, n, o, r) {
            e.setAttribute("data-element-ad-id", t.content.adId), t.coverted || (t.converted = !0, t.content = i(t.content), t.imageUrl = this.imageUrl(t.content.publicationId, t.content.revisionId, t.content.creative.page)), a.update.call(this, e, t, n, o, r)
        },
        _onImageLoad: a._onImageLoad,
        _onImageError: function(e) {
            var t = c(e.target),
                n = t.getAttribute("data-publicationId"),
                i = t.getAttribute("data-element-ad-id");
            o.broadcast(r.ADERROR, {
                publicationId: n,
                url: e.target.src,
                adid: i
            })
        },
        _onClick: function(e) {
            var t = c(e.target),
                n = c(e.target).getAttribute("data-publicationId"),
                i = t.getAttribute("data-element-ad-id");
            s.log("promoted", "targeted ad clicked adid: ", i);
            var o = l.create("ad.", l.SESSION, {
                expires: 120
            });
            o.set(n, i), a._onClick(e)
        },
        _broadcastDocumentCreated: function(e, t, n, i, a, s) {
            var l = $(e).offset();
            o.broadcast(r.DOCCREATED, t, {
                publicationId: n.content.publicationId,
                revisionId: n.content.revisionId,
                ownerUsername: n.content.ownerUsername,
                publicationName: n.content.publicationName,
                page: 1,
                origin: n.origin,
                ranking: i,
                x: l.left,
                y: l.top,
                height: a,
                width: s,
                adpageId: n.content.adId,
                adpageToken: n.content.token
            })
        }
    }
}, function(e, t, n) {
    function i(e) {
        return "string" == typeof e ? document.querySelector(e) : e.jquery ? e[0] : e
    }

    function a(e) {
        l.start();
        var t = e || {},
            n = {
                columnMaxWidth: 250,
                columnThresholds: [0, 480, 768],
                multiColMaxDelta: 10,
                cellPadding: 15,
                spaceBefore: Math.max(500, window.innerHeight),
                spaceAfter: Math.max(500, window.innerHeight),
                spinner: '<div class="spin large stream2__spinner"></div>',
                noMoreResults: t.hideSpinnerMessages ? !1 : '<div class="stream2__no-more-results">' + i18n.t("stream.endofstream") + "</div>",
                spinnerHeight: 100,
                observeWindowSize: t.observeWindowSize
            },
            a = o.create(t.path, t.apiParams, t.apiOptions),
            d = r.create(a, !!t.ads, {
                filter: t.filterApiResponse,
                onUpdate: t.onStreamUpdated
            });
        n.onLayoutChange = function(e, n) {
            t.ads && (d.setAdsStartAndDistance(u[n].start, u[n].distance), h && h.render()), t.onStreamRelayout && t.onStreamRelayout()
        };
        var p = i(t.streamcontainer);
        p.className.match("\\b" + c + "\\b") || (p.className += " " + c);
        var h = s(p, d, n);
        return t.autoStart && h.forceLoadMore(), {
            addMoreDocuments: function() {
                h.forceLoadMore()
            },
            preload: function() {
                var e = $.Deferred();
                return d.loadMore(function(t) {
                    return t ? e.reject() : e.resolve()
                }), e
            },
            start: function() {
                h.forceResize(), h.forceLoadMore()
            },
            resizeStream: function() {
                h.forceResize();
                var e = new $.Deferred;
                return setTimeout(function() {
                    e.resolve()
                }, 30), e
            },
            onInvisible: function() {
                h.dettach()
            },
            onVisible: function() {
                h.attach(), h.forceRender()
            }
        }
    }
    var o = n(78),
        r = n(349),
        s = n(355),
        l = n(83).init(),
        c = "stream2",
        u = {
            1: {
                start: 1,
                distance: 18,
                delta: 0
            },
            2: {
                start: 2,
                distance: 6,
                delta: 40
            },
            3: {
                start: 1,
                distance: 10,
                delta: 10
            },
            4: {
                start: 2,
                distance: 15,
                delta: 5
            }
        };
    e.exports = {
        create: a
    }
}, function(e, t, n) {
    var i = Math.min(window.screen.width, window.screen.height);
    i > 414 ? e.exports = n(144) : e.exports = n(352)
}, function(e, t) {
    function n(e, t) {
        var n = 0;
        for (n; n < e.length && !(t < e[n]); n++);
        return n + 1
    }

    function i(e, t) {
        var n = t.left - e.left,
            i = t.top - e.top;
        return Math.sqrt(n * n + i * i)
    }

    function a(e) {
        for (var t, n, i = 0, a = e[i]; i < e.length; i++, a = e[i])(0 === i || t > a) && (n = i, t = a);
        return e[0] - t < 100 ? 0 : n
    }

    function o(e, t, n, o) {
        var r = t.getItemColWidth ? t.getItemColWidth(n.index) : 1;
        r >= e.cols.length && (r = e.cols.length);
        var s, l, c;
        if (r > 1)
            for (var u, d, p, h = 0; h <= e.cols.length - r; h += 1) {
                u = e.cols.slice(h, h + r), d = Math.max.apply(null, u), p = 0;
                for (var f = 0; f < u.length; f++) p += d - u[f];
                (!l || c > p || 50 > p - c && l > d) && (l = d, c = p, s = h)
            } else s = e.dirty || void 0 === n.col || null === n.col ? a(e.cols) : n.col, l = e.cols[s];
        l = 0 === l ? 0 : l + e.cellPadding;
        var m = s * e.colWidth + s * e.cellPadding,
            g = r * e.colWidth + (r - 1) * e.cellPadding,
            v = {
                top: l,
                left: m,
                width: g,
                col: s,
                space: r
            };
        if (o) {
            var b = i(v, o);
            if (t.getMinDistanceForKind && b < t.getMinDistanceForKind(n.kind)) return null
        }
        if (c) {
            var w = e.currentMaxDelta[n.kind] || e.multiColMaxDelta;
            if (c > w) return w < e.absoluteMaxDelta && (e.currentMaxDelta[n.kind] = w + 1), null;
            e.currentMaxDelta[n.kind] = e.multiColMaxDelta
        }
        return v
    }

    function r(e, t, n, i, a) {
        n.col = i.col, n.width = i.width, n.top = i.top, n.left = i.left, n.height = t.getItemHeight(n.index, i.width);
        var o = n.top + n.height;
        o > e.height && (e.height = o);
        for (var r = 0; r < i.space; r++) e.cols[n.col + r] = o
    }

    function s(e, t, n) {
        var i, a, s, l, c = t.getItemCount();
        for (s = n || 0; c > s; s++)
            for (i = e.items[s] || {}, i.index = s, i.kind = t.getItemKind ? t.getItemKind(s) : "item", a = o(e, t, i, e.lastPlaced[i.kind]), a ? (r(e, t, i, a), e.lastPlaced[i.kind] = a) : e.unplaced.push(i), e.items[s] = i, l = 0; l < e.unplaced.length; l++) i = e.unplaced[l], a = o(e, t, i, e.lastPlaced[i.kind]), a && (r(e, t, i, a), e.lastPlaced[i.kind] = a, e.unplaced.splice(l--, 1));
        for (l = 0; l < e.unplaced.length; l++) i = e.unplaced[l], i.left = -9999, i.top = -9999, i.height = 0, i.width = 0;
        return e.dirty = !1, e
    }

    function l(e, t, n) {
        return e.items.filter(function(e) {
            return e.top + e.height >= t && e.top < n
        })
    }

    function c(e, t, n) {
        for (var i, a, o, r, s, l = 0, c = e.items[l]; l < e.items.length; l += 1, c = e.items[l]) o = t - (c.left + c.width / 2), r = n - (c.top + c.height / 2), s = Math.sqrt(o * o + r * r), (void 0 === a || a > s) && (a = s, i = l);
        return e.items[i]
    }

    function u(e, t) {
        var i = n(e.thresholds, t);
        i !== e.cols.length && (e.dirty = !0, e.cols.splice(i, e.thresholds.length));
        for (var a = 0; i > a; a++) e.cols[a] = 0;
        return e.colWidth = (t - (i - 1) * e.cellPadding) / i, e.maxColumnWidth && (e.colWidth = Math.min(e.colWidth, e.maxColumnWidth)), e.height = 0, e.lastPlaced = {}, e.unplaced = [], e.currentMaxDelta = {}, e.resized = !0, e
    }

    function d(e, t, n) {
        var i = {
            thresholds: t,
            maxColumnWidth: n && n.maxColumnWidth,
            cellPadding: n && n.cellPadding || 10,
            colWidth: 0,
            cols: [],
            items: [],
            height: 0,
            dirty: !0,
            resized: !1,
            lastPlaced: {},
            unplaced: [],
            multiColMaxDelta: n && n.multiColMaxDelta || 20,
            absoluteMaxDelta: n && n.absoluteMaxDelta || 40,
            currentMaxDelta: {}
        };
        return i = u(i, e)
    }
    e.exports = {
        createLayout: d,
        resizeLayout: u,
        updateLayout: s,
        getVisibleItems: l,
        getItemAtPoint: c
    }
}, function(e, t, n) {
    var i = n(354),
        a = n(191);
    e.exports = function(e, t, n) {
        function o() {
            if (L) {
                L = !1, O = a.getPositionOnPage(C), P = a.getViewportHeight();
                var e, n;
                R !== C.clientWidth && (R = C.clientWidth, e = d(), n = $.cols.length, $ = i.resizeLayout($, R, P), n !== $.cols.length && y && y(R, $.cols.length), i.updateLayout($, t, 0), u()), e && m && p(e.index)
            }
            var o = E - v,
                s = I + b;
            a.renderLayout($, T, t, o, s), t.loadMore && I > $.height && F && !N && r()
        }

        function r() {
            N = !0, _ && _.parentNode && _.parentNode.removeChild(_), k && C.appendChild(k), t.loadMore(s)
        }

        function s() {
            N = !1, k && k.parentNode && k.parentNode.removeChild(k), t.getItemCount() > $.items.length ? (F = !0, i.updateLayout($, t, $.items.length), _ && _.parentNode && _.removeChild(_)) : (F = !1, _ && C.appendChild(_)), u(), S = a.requestAnimationFrame(o, S)
        }

        function l() {
            A = a.getScrollPosition();
            var e = A - O;
            E = Math.max(e, 0), I = e + P, S = a.requestAnimationFrame(o, S)
        }

        function c() {
            L = !0, S = a.requestAnimationFrame(o, S)
        }

        function u() {
            var e = $.height;
            k && x && (e += x), C.style.height = e + "px", D = $.height
        }

        function d() {
            return A + P > O && O + D > A ? i.getItemAtPoint($, R / 2, E + (I - E) / 2) : null
        }

        function p(e) {
            var t = $.items[e];
            t && (t.top < E || t.top + t.height > I) && (a.scrollTo(t.top + t.height / 2 - O), l())
        }

        function h() {
            window.addEventListener("scroll", l), m && window.addEventListener("resize", c)
        }

        function f() {
            window.removeEventListener("scroll", l), window.removeEventListener("resize", c)
        }
        if (!(t && t.initElement && t.updateElement && t.getItemHeight)) throw Error("Error: Grid needs a valid data provider!");
        var m, g = n || {},
            v = g.spaceBefore || 500,
            b = g.spaceAfter || 500,
            w = g.columnThresholds || [0, 360, 768],
            y = g.onLayoutChange;
        m = void 0 === g.observeWindowSize || null === g.observeWindowSize ? !0 : g.observeWindowSize;
        var k, _, x = g.spinnerHeight;
        g.spinner && (k = document.createElement("div"), k.style.position = "absolute", k.style.width = "100%", k.style.textAlign = "center", k.style.height = x + "px", k.style.bottom = "0px", k.innerHTML = g.spinner), g.noMoreResults && (_ = document.createElement("div"), _.style.position = "absolute", _.style.width = "100%", _.style.textAlign = "center", _.style.height = x + "px", _.style.bottom = "0px", _.innerHTML = g.noMoreResults);
        var C = e;
        "string" == typeof C && (C = document.querySelector(e));
        var A, E, I, S, D = C.clientHeight,
            T = a.createElementPool(C),
            P = a.getViewportHeight(),
            O = a.getPositionOnPage(C),
            R = C.clientWidth,
            F = !0,
            N = !1,
            L = !0,
            $ = i.createLayout(C.clientWidth, w, {
                maxColumnWidth: g.columnMaxWidth,
                cellPadding: g.cellPadding,
                multiColMaxDelta: g.multiColMaxDelta
            });
        return y && y(R, $.cols.length), i.updateLayout($, t, 0), h(), u(), l(), o(), {
            scrollToIndex: p,
            getVisibleItems: function() {
                return i.getVisibleItems($, E, I)
            },
            render: function() {
                L = !0, R = -1, l(), a.returnAllElementsToPool($, T), S = a.requestAnimationFrame(o, S)
            },
            forceRender: function() {
                L = !0, R = -1, l(), a.returnAllElementsToPool($, T), o()
            },
            update: function() {
                F = !0, i.updateLayout($, t, $.items.length), u(), l()
            },
            forceLoadMore: function() {
                F = !0, N || r()
            },
            forceResize: function() {
                this.render()
            },
            attach: h,
            dettach: f
        }
    }
}, function(e, t, n) {
    var i = n(17),
        a = n(14),
        o = n(9),
        r = n(1),
        s = n(19).local,
        l = n(12),
        c = n(357),
        u = n(363),
        d = n(362),
        p = n(192);
    t.create = function(e) {
        function t() {
            P.resolve()
        }

        function h() {
            window.clearInterval(S), window.clearTimeout(D), T.enableClosability()
        }

        function f() {
            var e = (new Date).getTime() - E,
                t = Math.ceil((d.getForcedWaitTimeInMs() - e) / 1e3);
            T.updateCountdown(t), e > d.getForcedWaitTimeInMs() && h()
        }

        function m() {
            T.hide(), t()
        }

        function g() {
            var e = (new Date).getTime() - I;
            r.log("ads", "interstitial", "onAdFailed", e), m(), u.adFailed(e)
        }

        function v() {
            var e = (new Date).getTime() - I;
            r.log("ads", "interstitial", "onAdCompleted", e), m(), O && u.adEnded(e)
        }

        function b() {
            var e = (new Date).getTime() - I;
            r.log("ads", "interstitial", "onManuallyClosed", e), m(), u.overlayClosed(e)
        }

        function w() {
            window.clearInterval(S), E = (new Date).getTime(), S = window.setInterval(f, 100)
        }

        function y() {
            if (!O) {
                var e = (new Date).getTime() - I;
                r.log("ads", "interstitial", "onAdStarted", e), O = !0, E || w(), T.showAdContainer(), t(), u.adLoaded(e)
            }
        }

        function k() {
            r.log("ads", "interstitial", "insertAd");
            var e = d.getAdProvider();
            e ? (e.create("yt-player", {
                onAdCompleted: v,
                onAdStarted: y,
                onAdFailed: g
            }, d), u.adRequested()) : g()
        }

        function _() {
            return d.willShow(e)
        }

        function x() {
            w(), t()
        }

        function C(e) {
            return _() ? (I = (new Date).getTime(), s.set(d.LAST_SHOWN_STORAGE_KEY, (new Date).getTime()), T.insertInto(e), D = window.setTimeout(x, d.getPanicAutoCloseDelayInMs()), k(), P.promise()) : P.reject()
        }

        function A() {
            var t = s.get(d.LAST_SHOWN_STORAGE_KEY),
                n = l.get("ISO3166Country"),
                i = d.getShowAdIntervalInMs(),
                a = d.getAdsConfig();
            u.trackInitPingback({
                willShow: _(),
                isAllowedExternally: p.isAllowedExternally(e),
                isBot: p.isBot(),
                hasAdsConfig: p.hasAdsConfig(a),
                isOutsideFrequencyCap: p.isOutsideFrequencyCap(t, i),
                isIncludedCountry: p.isIncludedCountry(a, n),
                isInFlashAudience: p.isInFlashAudience(a),
                isInHtmlAudience: p.isInHtmlAudience(a),
                isFlashReader: e.isFlashReader,
                browserWidth: window.innerWidth,
                browserHeight: window.innerHeight
            })
        }
        var E, I, S, D, T, P = new i.Deferred,
            O = !1;
        return function() {
            a.defaults(e, {
                allowed: !0,
                isFlashReader: !0
            }), d.init({
                cookie: o,
                logger: r,
                serverData: l,
                storage: s,
                adProviders: {
                    youtube: n(361),
                    issuu: n(359),
                    videojs: n(360),
                    displayDfp: n(358)
                }
            }, e), T = c.create({
                onCloseManually: b
            }), A()
        }(), {
            show: C,
            hide: m,
            insertOverlay: T.insertInto,
            willShow: _
        }
    }
}, function(e, t, n) {
    var i = n(17),
        a = n(14),
        o = n(1);
    t.create = function(e) {
        function t() {
            o.log("ads", "interstitial", "overlay", "hiding overlay"), d && d.remove()
        }

        function r() {
            d.on("click", ".js-close", e.onCloseManually)
        }

        function s(t) {
            if (o.log("ads", "interstitial", "overlay", "inserting overlay"), !d) {
                var a = i(t || e.rootElm);
                d = i(n(287)()), i(a).append(d), r(), p = d.find(".js-btn-next")
            }
        }

        function l() {
            o.log("ads", "interstitial", "overlay", "showing ad container"), d.find(".js-spinner").hide(), d.find(".js-ad").removeClass("interstitial__ad--hidden"), d.find(".interstitial__paragraph--hidden").removeClass("interstitial__paragraph--hidden")
        }

        function c() {
            o.log("ads", "interstitial", "overlay", "enabling closability"), p.removeProp("disabled"), p.text("Publication ready"), d.find(".js-corner-close").addClass("interstitial__close--visible")
        }

        function u(e) {
            p.text("Publication loading (" + e + ")")
        }
        var d, p;
        return function() {
            a.defaults(e, {
                rootElm: i("body"),
                onCloseManually: a.noop
            })
        }(), {
            insertInto: s,
            hide: t,
            showAdContainer: l,
            enableClosability: c,
            updateCountdown: u
        }
    }
}, function(e, t, n) {
    function i(e, t, i) {
        function l() {
            if (c) {
                if (new Date - c > 1e3 * s) return void t.onAdFailed()
            } else c = new Date;
            ("object" != typeof window.googletag || "function" != typeof window.googletag.display) && window.setTimeout(function() {
                l()
            }, 50)
        }
        var c;
        ! function() {
            a.defaults(t, {
                onAdStarted: a.noop,
                onAdCompleted: a.noop,
                onAdFailed: a.noop
            });
            var s = r.create(),
                c = i.getAdProviderConfig("displayDfp").network || "/30443627/Issuu_Interstitial_Display_Unit",
                u = i.getAdProviderConfig("displayDfp").sizes || [
                    [300, 250],
                    [300, 600],
                    [970, 90]
                ],
                d = "display-" + a.random(0, 1e5),
                p = n(288)({
                    adContainerId: d
                });
            o("#" + e).append(p), s.addPlacement(d, c, u), s.addEventListener("slotRenderEnded", function(e) {
                e.slot.getAdUnitPath() === c && (e.isEmpty ? t.onAdCompleted() : (t.onAdStarted(), setTimeout(t.onAdCompleted, 1e3 * (i.getAdProviderConfig("displayDfp").completionDelayInSecs || 5))))
            }), l()
        }()
    }
    var a = n(14),
        o = n(17),
        r = n(38),
        s = 4;
    t.create = i
}, function(e, t, n) {
    function i(e, t) {
        function n() {
            t.onAdStarted()
        }! function() {
            var i = window.document.getElementById(e).parentNode.parentNode,
                s = window.document.getElementsByTagName("script")[0],
                l = window.document.createElement("script"),
                c = window.document.createElement("div");
            a.defaults(t, {
                onAdStarted: a.noop,
                onAdCompleted: a.noop,
                onAdFailed: a.noop
            }), window.onIssuuReadersLoaded = n, c.setAttribute("data-configid", "18165322/33583968"), c.className = "issuuembed", c.style.width = Math.min(i.clientWidth, o) + "px", c.style.height = Math.min(i.clientHeight, r) + "px", window.document.getElementById(e).appendChild(c), l.src = "//e.issuu.com/embed.js", l.addEventListener("load", a.noop), l.addEventListener("error", t.onAdFailed), s.parentNode.insertBefore(l, s)
        }()
    }
    var a = n(14),
        o = 700,
        r = 700;
    t.create = i
}, function(e, t, n) {
    function i(e) {
        var t = new r.Deferred,
            n = window.document.createElement("script");
        return n.src = e, n.addEventListener("load", t.resolve), n.addEventListener("error", t.reject), window.document.body.appendChild(n), t.promise()
    }

    function a(e, t, a) {
        function l(e) {
            videojs(e, {
                flash: {
                    swf: "//static.isu.pub/fe/videoplayer/videojs.swf"
                }
            }).ready(function() {
                function n(e) {
                    window.setTimeout(function() {
                        i.dispose(), t.onAdCompleted()
                    }, 0)
                }
                var i = this;
                return i.one("adstart", t.onAdStarted), i.one("ended", n), i.one("adend", n), i.one("contentresumed", n), i.one("contentended", n), i.one("error", t.onAdFailed), i.one("adserror", t.onAdFailed), i.one("adtimeout", t.onAdFailed), i.one("adsready", function(e) {
                    i.play()
                }), window.google && window.google.ima ? (i.ima({
                    debug: !0,
                    contribAdsSettings: {
                        debug: !0
                    },
                    id: e,
                    adTagUrl: a.getAdProviderConfig("videojs").network || ""
                }), i.ima.initializeAdDisplayContainer(), void i.ima.requestAds()) : void t.onAdFailed()
            })
        }

        function c(e) {
            if (u) {
                if (new Date - u > 1e3 * s) return void t.onAdFailed()
            } else u = new Date;
            o.isFunction(window.videojs) && o.isObject(window.google) && o.isObject(window.google.ima) ? (e || o.noop)() : window.setTimeout(function() {
                c(e)
            }, 50)
        }
        var u;
        ! function() {
            o.defaults(t, {
                onAdStarted: o.noop,
                onAdCompleted: o.noop,
                onAdFailed: o.noop
            });
            var s = n(289)({
                width: a.getAdProviderConfig("videojs").videoWidth || 640,
                height: a.getAdProviderConfig("videojs").videoHeight || 480
            });
            r("#" + e).append(s);
            var u = i("//static.isu.pub/fe/videoplayer/videojs.js"),
                d = i("//imasdk.googleapis.com/js/sdkloader/ima3.js");
            r.when(u, d).then(function() {
                c(function() {
                    l(r("#" + e).find("video").get(0))
                })
            }, t.onAdFailed)
        }()
    }
    var o = n(14),
        r = n(17),
        s = 5;
    t.create = a
}, function(e, t) {
    function n(e, t) {
        function n(e) {
            e.target.playVideo(), e.target.setVolume(5)
        }

        function i(e) {
            e.data === window.YT.PlayerState.PLAYING ? t.onAdStarted() : e.data === window.YT.PlayerState.ENDED && t.onAdCompleted()
        }

        function a() {
            new window.YT.Player(e, {
                height: "390",
                width: "640",
                videoId: "EmgVBev6mOM",
                events: {
                    onReady: n,
                    onStateChange: i
                },
                playerVars: {
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0
                }
            })
        }! function() {
            var e = document.getElementsByTagName("script")[0],
                n = document.createElement("script");
            n.src = "https://www.youtube.com/iframe_api", e.parentNode.insertBefore(n, e), window.onYouTubeIframeAPIReady = a, _.defaults(t, {
                onAdStarted: _.noop,
                onAdCompleted: _.noop,
                onAdFailed: _.noop
            })
        }()
    }
    t.create = n
}, function(e, t, n) {
    function i() {
        return 1e3 * (v && v.intervalInSecs || 21600)
    }

    function a() {
        return 1e3 * (v && v.panicAutoCloseDelayInSecs || 3)
    }

    function o() {
        return 1e3 * (v && v.countdownInSecs || 5)
    }

    function r() {
        var e = !1,
            t = new w(window.location.href).getQueryParamValue("interstitial"),
            n = h.getCookie("interstitial");
        return _.indexOf(t) > -1 && (e = t), _.indexOf(n) > -1 && (e = n), e
    }

    function s() {
        return r() !== !1
    }

    function l() {
        var e, t = v && _.indexOf(v.defaultProvider) > -1 && v.defaultProvider;
        return t = r() || t, b && b[t] && (e = b[t]), f.log("ads", "interstitial", "Debug provider:", r(), "Final provider:", t), e
    }

    function c(e) {
        return e && v && v.providerConfigs && v.providerConfigs[e] || {}
    }

    function u() {
        return v
    }

    function d(e, t) {
        h = e.cookie, f = e.logger, m = e.serverData, g = e.storage, b = e.adProviders, v = m.get("adsConfig") && m.get("adsConfig").interstitial, f.log("ads", "interstitial", "available adsConfig", v)
    }

    function p(e) {
        var t = g.get(k),
            n = i(),
            a = m.get("ISO3166Country");
        if (s()) return !0;
        if (!y.isAllowedExternally(e)) return f.log("ads", "interstitial", 'no show b/c external "allowed" rule'), !1;
        if (y.isBot()) return f.log("ads", "interstitial", "no show b/c bot rule"), !1;
        if (!y.hasAdsConfig(v)) return f.log("ads", "interstitial", "no show b/c adsConfig is undefined"), !1;
        if (!y.isOutsideFrequencyCap(t, n)) return f.log("ads", "interstitial", "no show b/c last shown rule. Last shown:", new Date(t).toString(), "Next show:", new Date(t + n).toString()), !1;
        if (!y.isIncludedCountry(v, a)) return f.log("ads", "interstitial", "no show b/c country rule. Detected country:", a), !1;
        if (e.isFlashReader) {
            if (!y.isInFlashAudience(v)) return f.log("ads", "interstitial", "no show b/c Flash ratio rule. Ratio:", v.audienceRatioFlash), !1
        } else if (!y.isInHtmlAudience(v)) return f.log("ads", "interstitial", "no show b/c HTML5 ratio rule. Ratio:", v.audienceRatioHtml), !1;
        return f.log("ads", "interstitial", "will show"), !0
    }
    var h, f, m, g, v, b, w = n(52),
        y = n(192),
        k = "ads-interstitial-lastShown",
        _ = ["youtube", "videojs", "issuu", "displayDfp"];
    e.exports = {
        LAST_SHOWN_STORAGE_KEY: k,
        getPanicAutoCloseDelayInMs: a,
        getShowAdIntervalInMs: i,
        getForcedWaitTimeInMs: o,
        init: d,
        willShow: p,
        getAdProviderConfig: c,
        getAdsConfig: u,
        getAdProvider: l
    }
}, function(e, t, n) {
    function i(e) {
        o.broadcast(o.events.monitorEvent, e), s.log("ads", "interstitial", "pingback", e);
        var t = r.get("ISO3166Country") || "unknown";
        e.type += "." + t, o.broadcast(o.events.monitorEvent, e), s.log("ads", "interstitial", "pingback", e)
    }
    var a = n(14),
        o = n(2),
        r = n(12),
        s = n(1);
    t.adRequested = function() {
        i({
            type: "ads-interstitial-requested"
        })
    }, t.adFailed = function(e) {
        i({
            type: "ads-interstitial-failed",
            timeSinceOverlay: e
        })
    }, t.adLoaded = function(e) {
        i({
            type: "ads-interstitial-filled",
            timeSinceOverlay: e
        })
    }, t.adEnded = function(e) {
        i({
            type: "ads-interstitial-ended",
            timeSinceOverlay: e
        })
    }, t.overlayClosed = function(e) {
        i({
            type: "ads-interstitial-closed",
            timeSinceOverlay: e
        })
    }, t.trackInitPingback = function(e) {
        var t = a.merge({
            type: "ads-interstitial-init"
        }, e);
        i(t)
    }
}, function(e, t, n) {
    var i = n(14),
        a = {
            tyntTags: []
        };
    t.create = function(e) {
        function t() {
            return "" !== l
        }

        function n() {
            return l
        }

        function o() {
            return s
        }

        function r(e, t) {
            var n = i.find(s.tyntTags, function(n) {
                var a = i.contains(n.includeCountries, e),
                    o = i.contains(n.includeContinents, t);
                return a || o
            });
            l = n ? n.tyntTag : ""
        }
        var s = e || a,
            l = "";
        return {
            getConfig: o,
            getTyntTag: n,
            isAllowedBasedOnLocation: t,
            setLocation: r
        }
    }
}, function(e, t, n) {
    var i = n(17),
        a = n(14),
        o = n(1),
        r = n(19).local,
        s = n(369),
        l = n(150);
    t.create = function(e) {
        function t() {
            var e = (new Date).getTime() - h;
            o.log("ads", "gutterAd", "onAdFailed", e), s.adFailed(e)
        }

        function n() {
            var e = (new Date).getTime() - h;
            o.log("ads", "gutterAd", "onAdViewable", e), s.adViewable(e)
        }

        function c() {
            if (!m) {
                var e = (new Date).getTime() - h;
                o.log("ads", "gutterAd", "onAdFilled", e), m = !0, f.resolve(), s.adLoaded(e)
            }
        }

        function u() {
            o.log("ads", "gutterAd", "insertAd"), l.getAdProvider().create(e.rootElm, {
                onAdFilled: c,
                onAdFailed: t,
                onAdViewable: n
            }), s.adRequested()
        }

        function d() {
            return l.willShow(e)
        }

        function p() {
            return d() ? (h = (new Date).getTime(), r.set(l.LAST_SHOWN_STORAGE_KEY, (new Date).getTime()), u(), f.promise()) : f.reject()
        }
        var h, f = new i.Deferred,
            m = !1;
        return function() {
            a.defaults(e, {
                allowed: !0,
                isFlashReader: !0
            })
        }(), {
            show: p,
            willShow: d
        }
    }
}, function(e, t, n) {
    function i(e, t) {
        var n = r.create(),
            i = l.getDfpConfig().network || "/30443627/DocPage_Issuu";
        ! function() {
            a.defaults(t, {
                onAdFilled: a.noop,
                onAdViewable: a.noop,
                onAdFailed: a.noop
            });
            var r = o(e).attr("id") || "div-gpt-ad-1453765383198-0";
            o(e).attr("id", r), n.addPlacement(r, i, [160, 600]), n.addEventListener("slotRenderEnded", function(e) {
                e.slot.getAdUnitPath() === i && (s.log("ads", "gutterAd", "slotRendered", e), e.isEmpty || t.onAdFilled())
            }), n.addEventListener("impressionViewable", function(e) {
                e.slot.getAdUnitPath() === i && (s.log("ads", "gutterAd", "impressionViewable", e), t.onAdViewable())
            })
        }()
    }
    var a = n(14),
        o = n(17),
        r = n(38),
        s = n(1),
        l = n(150);
    t.create = i
}, function(e, t, n) {
    function i(e, t) {
        ! function() {
            a.defaults(t, {
                onAdFilled: a.noop,
                onAdCompleted: a.noop,
                onAdFailed: a.noop
            });
            var n = window.document.createElement("iframe");
            n.frameborder = 0, n.border = 0, n.marginheight = 0, n.marginwidth = 0, n.topmargin = 0, n.leftmargin = 0, n.width = 160, n.height = 600, n.scrolling = "no", n.allowtransparency = !0, n.seamless = !0, n.src = "https://ad.atdmt.com/i/a.html;p=11002201224659;cache=" + Math.random(), n.style.border = 0, n.onload = t.onAdFilled, n.onerror = t.onAdFailed, e.appendChild(n)
        }()
    }
    var a = n(14);
    t.create = i
}, function(e, t, n) {
    function i(e, t) {
        ! function() {
            a.defaults(t, {
                onAdFilled: a.noop,
                onAdFailed: a.noop
            }), window.Tynt = window.Tynt || [], window.Tynt.cmd = window.Tynt.cmd || [], window.Tynt.push(o.getTyntTag()), window.Tynt.cmd.push(function() {
                window.Tynt.ads.display("", "", "inview")
            });
            var e = window.document.createElement("script");
            e.src = "//cdn.tynt.com/rciv.js", e.async = !0, e.type = "text/javascript", e.addEventListener("error", t.onAdFailed), e.addEventListener("load", t.onAdFilled), window.document.getElementsByTagName("head")[0].appendChild(e)
        }()
    }
    var a = n(14),
        o = n(150);
    t.create = i
}, function(e, t, n) {
    function i(e) {
        a.broadcast(a.events.monitorEvent, e), r.log("ads", "gutterAd", "pingback", e);
        var t = o.get("ISO3166Country") || "unknown";
        e.type += "." + t, a.broadcast(a.events.monitorEvent, e), r.log("ads", "gutterAd", "pingback", e)
    }
    var a = n(2),
        o = n(12),
        r = n(1);
    t.adRequested = function() {
        i({
            type: "ads-gutterAd-requested"
        })
    }, t.adFailed = function(e) {
        i({
            type: "ads-gutterAd-failed",
            timeSinceOverlay: e
        })
    }, t.adLoaded = function(e) {
        i({
            type: "ads-gutterAd-filled",
            timeSinceOverlay: e
        })
    }, t.adViewable = function(e) {
        i({
            type: "ads-gutterAd-viewable",
            timeSinceOverlay: e
        })
    }
}, function(e, t, n) {
    function i() {
        var e = o("[data-trackable-call-to-action]");
        e.each(function(e, t) {
            var n = o(t),
                i = n.data("trackable-call-to-action");
            a.broadcast(a.events.monitorEvent, {
                type: "funnel-call-to-action-impression",
                cta: i
            }), n.on("click", function(e) {
                e.preventDefault(), r.track("Fl CTA, Button Clicked", {
                    cta_type: i
                }).always(function() {
                    window.location = e.target.href
                })
            })
        })
    }
    var a = n(2),
        o = n(17),
        r = n(81);
    n(31), e.exports = {
        init: i
    }
}, function(e, t, n) {
    function i(e) {
        var t = document.createElement("textarea");
        t.innerHTML = e;
        var n = t.value;
        return n
    }

    function a(e, t) {
        h.log("peecho", "injectHiddenPeechoButton: ISO3166Country=", p);
        var i = n(291),
            a = {
                coverHeight: 25.4 * e.coverHeight / 72,
                coverWidth: 25.4 * e.coverWidth / 72,
                title: e.title,
                pageCount: e.pageCount,
                documentId: e.documentId,
                downloadUrl: t,
                thumbUrl: m.pageLargeThumbUrl(e.documentId.split("-")[1], e.documentId.split("-")[0], 1),
                ISO3166Country: p ? p : "US"
            },
            o = c(i(a)).appendTo("body");
        return window.peecho.attach(), o
    }

    function o(e, t) {
        h.log("peecho", "getDownloadUrl");
        var n = e.split("-")[1];
        c.get("/res/print-on-demand/" + n + "/download", function(e) {
            t(e.url)
        })
    }

    function r(e, t) {
        h.log("peecho", "tracking click");
        var n = {
            type: g,
            document_id: e.documentId,
            peecho_price: u.parseInt(100 * t)
        };
        d.broadcast(d.events.monitorEvent, n)
    }

    function s() {
        return "http://help.issuu.com/entries/30569976"
    }

    function l() {
        location.href = s()
    }
    var c = n(17),
        u = n(14),
        d = n(2),
        p = n(12).get("ISO3166Country"),
        h = n(1),
        f = n(80),
        m = n(5),
        g = "PEECHO_PRINT_ON_DEMAND_CLICKED",
        v = "13297424530800.js",
        b = new c.Deferred;
    t.setup = function() {
        if (h.log("peecho", "init"), f.isAvailable("peecho")) {
            if (!window.peecho) {
                var e = document.createElement("script");
                e.type = "text/javascript", e.async = !0, e.src = "//d3aln0nj58oevo.cloudfront.net/button/script/" + v;
                var t = document.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(e, t);
                var n = setInterval(function() {
                    window.peecho && (clearInterval(n), b.resolve(!0))
                }, 20)
            }
        } else b.reject("not available");
        return b.promise()
    }, t.isSetup = function() {
        return "peecho" in window
    }, t.getPrintStatus = function(e) {
        function t() {
            o(e.documentId, function(t) {
                var n = a(e, t);
                r(e, p), setTimeout(function() {
                    window.peecho.send(n.get(0))
                }, 300)
            })
        }
        h.log("peecho", "getPrintStatus"), u.isString(e.documentId) && u.isString(e.name) && u.isNumber(e.coverWidth) && u.isNumber(e.coverHeight) && u.isString(e.title) && u.isNumber(e.pageCount) || h.error(new Error("Missing field in Peecho document object " + e));
        var n = a(e),
            c = n.hasClass("peecho-btn-okay"),
            d = "No print available",
            p = 0,
            f = "";
        if (c) {
            d = n.attr("data-message").split(" ")[1];
            try {
                p = parseFloat(d.replace(/ |.*&nbsp;/g, "")), f = i(d.replace(/ |&nbsp;.*/g, ""))
            } catch (m) {
                c = !1
            }
        }
        return n.remove(), {
            isPrintable: c,
            priceString: d,
            price: p,
            priceCurrency: f,
            gotoPeecho: t,
            gotoHelpPage: l,
            getUrlForHelpPage: s
        }
    }
}, function(e, t) {
    t.create = function(e) {
        function t(e) {
            var t = {
                    id: p++,
                    name: "",
                    markup: '<div style="width:200px; height:200px;">hello there</div><p><a href="" class="next">next</a></p>',
                    onSetup: function(e, t) {
                        $(".next").click(function() {
                            t.next()
                        })
                    },
                    onRemove: function(e, t) {}
                },
                n = _.assign(t, e);
            d.push(n)
        }

        function n(e, t, n, i, a) {
            var o;
            if (e === h) o = $("<div></div>"), o.addClass("screen").addClass("screen-main"), o.html(d[e].markup), u.context.append(o), l = o, h = e, d[e].onSetup(o, f, a);
            else {
                var r = "screen-" + t,
                    s = "screen-" + n,
                    c = "screen-" + i;
                o = $("<div></div>"), o.addClass("screen"), o.addClass(r), o.html(d[e].markup), u.context.append(o);
                var p = u.context.find("." + r);
                l.removeClass(s).addClass(c), setTimeout(function() {
                    p.removeClass(r).addClass(s)
                }, 0), setTimeout(function() {
                    d[e].onSetup(o, f, a), l.remove(), l = o, h = e
                }, 250)
            }
        }

        function i() {
            h + 1 <= d.length - 1 && n(h + 1, "pre", "main", "exit")
        }

        function a() {
            h - 1 >= 0 && n(h - 1, "exit", "main", "pre")
        }

        function o(e) {
            var t = _.findIndex(d, function(t) {
                return t.name === e
            });
            if (-1 === t) throw new Error("No name like that");
            return t
        }

        function r(e) {
            var t = _.assign({
                direction: "forward",
                extraParams: {}
            }, e);
            if (!t.id && !t.name) throw new Error("You must supply id or name");
            t.id || (t.id = o(t.name)), "forward" === t.direction ? n(t.id, "pre", "main", "exit", t.extraParams) : n(t.id, "exit", "main", "pre", t.extraParams)
        }

        function s() {
            u.context.addClass("screenies"), n(h)
        }
        var l, c = {
                context: $("body"),
                transitionStyle: "default",
                currentIndex: 0,
                preState: "pre",
                mainState: "main",
                exitState: "exit"
            },
            u = _.assign(c, e),
            d = [],
            p = 0,
            h = u.currentIndex,
            f = {
                render: s,
                addScreen: t,
                next: i,
                back: a,
                gotoScreen: r
            };
        return f
    }
}, function(e, t, n) {
    function i() {}

    function a(e) {
        var t = $(e),
            n = {},
            i = t.serializeArray();
        return $.each(i, function(e, t) {
            n[t.name] = t.value
        }), n
    }

    function o(e) {
        var t = n(372).create({
                context: $(".insertScreeniesHere", e.container),
                currentIndex: 0
            }),
            o = n(293),
            r = n(292);
        t.addScreen({
            id: "one",
            markup: o({
                recaptchaSiteKey: m.recaptchaSitekey
            }),
            onSetup: function(t, n) {
                function i() {
                    t.find(v).removeClass("bg-danger")
                }

                function o() {
                    var e = u.create(t.find(".forgot-password-screen"));
                    return e.addTest({
                        func: p.usernameOrEmail,
                        fields: ["username"]
                    }).addTest({
                        func: p.minlength,
                        fields: ["g-recaptcha-response"],
                        extraParams: [1]
                    }).addTest({
                        func: p.required,
                        fields: ["g-recaptcha-response"]
                    }), m = d.create(t.find("#show-errors-here")), e.addReporter(m), e.onAllValid(function() {
                        b.removeAttr("disabled")
                    }).onAllNotValid(function() {
                        b.attr("disabled", "disabled")
                    }), e
                }

                function r(e) {
                    return _.any(e.getStatusReport().testStatus, function(e) {
                        return e.fields && e.fields.indexOf("g-recaptcha-response") >= 0
                    })
                }

                function l() {
                    var e = o();
                    if (e.runAllTests(), !e.isAllValid()) return void(r(e) && t.find(v).addClass("bg-danger"));
                    t.find(v).removeClass("bg-danger"), b.attr("disabled", "disabled").addClass("spinner");
                    var i, l = a(t.find(" #forgot-password-form")),
                        u = {
                            captchaResponse: document.getElementById("g-recaptcha-response").value
                        };
                    l.username.toString().search(/@/) > 0 ? (i = "issuu.user.request_password_reset_email", u.email = l.username) : (i = "issuu.user.request_password_reset", u.username = l.username);
                    var d = c.create({
                        action: i,
                        type: "POST",
                        cache: !1
                    }).parameters(u).call();
                    $.when(d).then(function(e) {
                        b.removeClass("spinner").addClass("ok").removeAttr("disabled"), n.next()
                    }, function(e) {
                        s.log("Login", "error", e), grecaptcha.reset(), b.removeClass("spinner").removeAttr("disabled");
                        var t = e._content.error,
                            n = {
                                E005: "No such user"
                            },
                            i = "Oops, please change something and try again " + t.code;
                        "006" === t.code ? m.addPostSubmitError(["recaptcha_response_field"], "Words not entered correctly") : ("undefined" != typeof n["E" + t.code] && (i = n["E" + t.code]), m.addPostSubmitError(["username"], i))
                    })
                }

                function f() {
                    $.getScript("https://www.google.com/recaptcha/api.js?hl=" + g.get())
                }
                window.GOOGLE_RECAPTCHA_CALLBACK = i;
                var m, b = $("#send-email-button", t);
                f(), $("#username", t).focus(), $("#i-remember", t).click(function(t) {
                    t.preventDefault(), h.showSignin({
                        createAccountReturnUrl: e.createAccountReturnUrl,
                        createAccountUrl: e.createAccountUrl
                    })
                }), b.click(function(e) {
                    e.preventDefault(), l()
                }), $("form#forgot-password-form", t).submit(function(e) {
                    e.preventDefault(), l()
                }), $(".dimmer-cancel-link").click(function(e) {
                    e.preventDefault(), h.closeSigninOverlay()
                }), $("#username", t).focus(function() {
                    b.removeClass("ok")
                })
            },
            onRemove: function() {}
        }), t.addScreen({
            id: "two",
            markup: r({}),
            onSetup: i,
            onRemove: i
        }), t.render()
    }
    var r, s = n(1),
        l = n(23),
        c = n(7),
        u = n(48),
        d = n(46),
        p = n(47).promised,
        h = n(72),
        f = n(40),
        m = n(6),
        g = n(20),
        v = "#recaptcha_widget";
    t.getOverlay = function(e) {
        var t, i = _.assign({
            showCreateAccountLink: "true"
        }, e);
        return i.createAccountUrl ? t = new f(i.createAccountUrl) : (t = new f("/signup"), i.createAccountReturnUrl && t.addQueryParam("returnUrl", i.createAccountReturnUrl)), t = new f(t.path() + t.query() + t.anchor()), t.getQueryParamValue("returnUrl") && t.replaceQueryParam("returnUrl", new f(t.getQueryParamValue("returnUrl")).uriParts.relative), r = l.create({
            marginClickClose: !1,
            content: '<div class="insertScreeniesHere" style="width:450px;height:500px;"></div>',
            dimmerContent: n(179)({
                createAccountUrl: t
            }),
            onShow: function() {
                o({
                    container: r.getParentElement(),
                    showCreateAccountLink: i.showCreateAccountLink,
                    createAccountUrl: i.createAccountUrl
                })
            },
            skin: "signin"
        })
    }
}, function(e, t, n) {
    function i(e, t) {
        var n = [i18n.t("signinWidget.serverResponse.thatwasnotright3", {
            linkStart: '<a href="' + t + '">',
            linkEnd: "</a>"
        }), i18n.t("signinWidget.serverResponse.hmmstillwrong"), i18n.t("signinWidget.serverResponse.thisisjustembarrassing")];
        u.runAllTests().then(function() {
            if (u.isAllValid()) {
                $("#login-button", e).stateButton("state", "progress");
                var t = h.create({
                    action: "issuu.user.login",
                    type: "POST",
                    cache: !1,
                    protocol: "https"
                }).parameters({
                    username: $("input[name=username]", e).val(),
                    password: $("input[name=password]", e).val(),
                    permission: "f",
                    loginExpiration: "standard"
                }).call();
                $.when(t).then(function(t) {
                    $("#login-button", e).stateButton("state", "success"), k.beginLoginSession(t.user)
                }, function(t) {
                    $("#login-button", e).stateButton("state", ""), $("input[name=password]", e).focus().select();
                    var i = n.shift() || i18n.t("signinWidget.serverResponse.youknowwecanhelp");
                    d.addPostSubmitError(["other"], i), u.forgetBlured();
                    $("input[name=username]", e).val();
                    $("a.error-msg-help", e).click(function(e) {
                        e.preventDefault(), x.showForgotPassword()
                    })
                })
            }
        })
    }

    function a(e) {
        u = n(48).create(e.selector + " .login-screen"), d = n(46).create(e.selector + " #show-errors-here", [{
            id: "username",
            match: ["username"],
            rapportElm: "#usernameErrors"
        }, {
            id: "password",
            match: ["password"],
            rapportElm: "#passwordErrors"
        }, {
            id: "other",
            match: ["other"],
            rapportElm: "#other-errors-here"
        }]), u.addTest({
            func: w.usernameOrEmail,
            fields: ["username"]
        }).addTest({
            func: w.length,
            fields: ["password"],
            extraParams: [4, 30]
        }), u.addReporter(d)
    }

    function o(e) {
        f.loadSdk().then(function() {
            $("#fb-login", e).on("click", function(e) {
                m.loginWithDialog().fail(function(e) {
                    b.log(e && e.message), e && "005" === e.code ? location.href = "/signup?authorized=fb" : y.broadcast(y.events.messagehubWarn, i18n.t("signinWidget.youWereNotSignedInWithFacebook"))
                })
            })
        })
    }

    function r(e) {
        g.loadSdk().then(function() {
            $("#google-login", e).on("click", function(e) {
                g.loginWithDialog().fail(function(e) {
                    b.log(e && e.message), e && "005" === e.code ? location.href = "/signup?authorized=google&accessToken=" + JSON.stringify(gapi.auth.getToken()) : y.broadcast(y.events.messagehubWarn, i18n.t("signinWidget.youWereNotSignedInWithGooglePlus"))
                })
            })
        })
    }

    function s(e) {
        $.when(v.loadLoginUrl()).then(function(t) {
            $("#linkedin-login", e).on("click", function(e) {
                e.preventDefault(), v.login(t.redirect.url)
            })
        }, function(e) {})
    }

    function l(e) {
        var t = new A("/signup"),
            n = new A(new A(location.href).getQueryParamValue("onLogin")).uriParts.relative;
        return n ? t.addQueryParam("returnUrl", n) : e.createAccountUrl ? t = new A(e.createAccountUrl).uriParts.relative : e.createAccountReturnUrl && (t.addQueryParam("returnUrl", new A(e.createAccountReturnUrl).uriParts.relative), e.authReason && t.addQueryParam("authReason", e.authReason)), t
    }

    function c(e) {
        var t = e.container,
            n = function() {
                setTimeout(function() {
                    y.unsubscribe(y.events.userAuthStatusChanged, n)
                }, 0), e.onLoginSuccess()
            };
        y.subscribe(y.events.userAuthStatusChanged, n), a(t), o(t), r(t), s(t), $("#cant-remember", t).click(function(t) {
            t.preventDefault(), x.showForgotPassword({
                createAccountReturnUrl: e.createAccountReturnUrl,
                createAccountUrl: e.createAccountUrl
            })
        }), $("form#login-form", t).submit(function(n) {
            n.preventDefault(), d.removeOtherErrors(), i(t, e.dimmerCreateAccountUrl)
        }), e.showCreateAccountLink || $(".dimmer-signup-link").remove(), $(".dimmer-cancel-link").click(function(e) {
            e.preventDefault(), x.closeSigninOverlay()
        })
    }
    var u, d, p = n(294),
        h = n(7),
        f = n(27),
        m = n(193),
        g = n(113),
        v = n(114),
        b = n(1),
        w = n(47).promised,
        y = n(2),
        k = n(4),
        x = n(72),
        C = n(23),
        A = n(40);
    t.getOverlay = function(e) {
        function t() {
            k.isLoggedIn() && (a || i.preventCloseOnLogin) && o()
        }
        void 0 === e && (e = {});
        var i = _.extend({
                headerText: i18n.t("signinWidget.title"),
                onLoginSuccess: function() {
                    -1 !== ["/", "/signin"].indexOf(window.location.pathname) && (window.location = "/")
                },
                showCreateAccountLink: "true",
                preventCloseOnLogin: !1,
                onDimmerCreateAccountClick: function() {},
                appear: "forward"
            }, e),
            a = !1,
            o = _.once(i.onLoginSuccess),
            r = l(i),
            s = C.create({
                marginClickClose: !1,
                skin: "signin",
                content: p({
                    headerText: i.headerText,
                    showSignInLink: i.showDimmerCreateAccountLink
                }),
                dimmerContent: n(179)({
                    createAccountUrl: r.toString()
                }),
                unscrollableBackground: !0,
                onInAnimationFinished: function() {
                    Modernizr.input.placeholder ? setTimeout(function() {
                        $("input[name=username]", s.getParentElement()).focus(), u.forgetBlured()
                    }, 0) : $("input", s.getParentElement()).placeholder()
                },
                onOutAnimationFinished: function() {
                    a = !0, t()
                },
                onShow: function(e) {
                    a = !1, c({
                        container: s.getParentElement(),
                        onLoginSuccess: function() {
                            i.preventCloseOnLogin || x.closeSigninOverlay(), t()
                        },
                        showCreateAccountLink: i.showCreateAccountLink,
                        onDimmerCreateAccountClick: i.onDimmerCreateAccountClick,
                        appear: i.appear,
                        createAccountReturnUrl: i.createAccountReturnUrl,
                        createAccountUrl: i.createAccountUrl,
                        authReason: i.authReason,
                        dimmerCreateAccountUrl: r.toString()
                    })
                }
            });
        return s
    }
}]);
//# sourceMappingURL=http://sentry.issuu.com:81/issuu-documentpage/_/_/_/../../../sourcemap/448/scripts/default.js.map