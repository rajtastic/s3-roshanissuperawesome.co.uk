var mboxCopyright = "Copyright 1996-2015. Adobe Systems Incorporated. All rights reserved.";var TNT = TNT || {};TNT.a = (function() { return { nestedMboxes: [], b: { companyName: "Test&amp;Target", isProduction: true, adminUrl: "http://admin10.testandtarget.omniture.com/admin", clientCode: "oracleexchangepartne", serverHost: "oracleexchangepartne.tt.omtrdc.net", mboxTimeout: 15000, mboxLoadedTimeout: 100, mboxFactoryDisabledTimeout: 30 * 60, bodyPollingTimeout: 16, bodyHidingEnabled: false, bodyHiddenStyle: "body{opacity:0}", sessionExpirationTimeout: 31 * 60, experienceManagerDisabledTimeout: 30 * 60, experienceManagerTimeout: 5000, visitorApiTimeout: 500, visitorApiPageDisplayTimeout: 500, overrideMboxEdgeServer: false, overrideMboxEdgeServerTimeout: 31 * 60, tntIdLifetime: 1209600, crossDomain: "enabled", trafficDuration: 10368000, trafficLevelPercentage: 100, clientSessionIdSupport: false, clientTntIdSupport: false, passPageParameters: true, usePersistentCookies: true, crossDomainEnabled: true, crossDomainXOnly: false, imsOrgId: "", globalMboxName: "blueKai-global-mbox-jd", globalMboxLocationDomId: "", globalMboxAutoCreate: true, experienceManagerPluginUrl: "//cdn.tt.omtrdc.net/cdn/target.js", siteCatalystPluginName: "tt", mboxVersion: 62, optoutEnabled: false, secureOnly: false, mboxIsSupportedFunction: function() { return true; }, parametersFunction: function() { return""; }, cookieDomainFunction: function() { return mboxCookiePageDomain(); } }, c: { d: "mboxPage", e: "mboxMCGVID", f: "mboxMCGLH", g: "mboxAAMB", h: "mboxMCAVID", i: "mboxMCSDID", j: "mboxCount", k: "mboxHost", l: "mboxFactoryId", m: "mboxPC", n: "screenHeight", o: "screenWidth", p: "browserWidth", q: "browserHeight", r: "browserTimeOffset", s: "colorDepth", t: "mboxXDomain", u: "mboxURL", v: "mboxReferrer", w: "mboxVersion", x: "mbox", y: "mboxId", z: "mboxDOMLoaded", A: "mboxTime", B: "scPluginVersion" }, C: { D: "mboxDisable", E: "mboxSession", F: "mboxEnv", G: "mboxDebug" }, H: { D: "disable", E: "session", m: "PC", I: "level", J: "check", G: "debug", K: "em-disabled", L: "mboxEdgeServer" }, M: { N: "default", O: "mbox", P: "mboxImported-", Q: 60000, R: "mboxDefault", S: "mboxMarker-", T: 250, B: 1, U: "mboxedge", V: "tt.omtrdc.net" } }}());TNT.a.W = {};(function(X) { var Y = {}.toString; function Z(_) { return _ === void(0); } function ab(_) { return _ === null; } function bb(_) { if (Z(_) || ab(_)) { return true; } return _.length === 0; } function cb(_) { return Y.call(_) === '[object Function]'; } function db(_) { return Y.call(_) === '[object Array]'; } function eb(_) { return Y.call(_) === '[object String]'; } function fb(_) { return Y.call(_) === '[object Object]'; } function gb(hb, ib) { var jb = hb.length, kb = -1; while (++kb < jb) { ib(hb[kb]); } } X.Z = Z; X.ab = ab; X.bb = bb; X.cb = cb; X.db = db; X.eb = eb; X.fb = fb; X.gb = gb;}(TNT.a.W));mboxUrlBuilder = function(lb, mb) { this.lb = lb; this.mb = mb; this.nb = []; this.ob = function(u) { return u; }; this.pb = null;};mboxUrlBuilder.prototype = { constructor: mboxUrlBuilder, addNewParameter: function (qb, _) { this.nb.push({name: qb, value: _}); return this; }, addParameterIfAbsent: function (qb, _) { if (!_) { return; } for (var rb = 0; rb < this.nb.length; rb++) { var sb = this.nb[rb]; if (sb.name === qb) { return this; } } this.checkInvalidCharacters(qb); return this.addNewParameter(qb, _); }, addParameter: function(qb, _) { this.checkInvalidCharacters(qb); for (var rb = 0; rb < this.nb.length; rb++) { var sb = this.nb[rb]; if (sb.name === qb) { sb.value = _; return this; } } return this.addNewParameter(qb, _); }, addParameters: function(nb) { if (!nb) { return this; } for (var rb = 0; rb < nb.length; rb++) { var tb = nb[rb]; var ub = tb.indexOf('='); if (ub === -1 || ub === 0) { continue; } this.addParameter(tb.substring(0, ub), tb.substring(ub + 1, tb.length)); } return this; }, setServerType: function(vb) { this.wb = vb; }, setBasePath: function(pb) { this.pb = pb; }, setUrlProcessAction: function(xb) { this.ob = xb; }, buildUrl: function() { var yb = TNT.a.b.secureOnly, zb = yb ? 'https:' : '', Ab = TNT.a.Bb(this.lb), Cb = this.pb ? this.pb : '/m2/' + this.mb + '/mbox/' + this.wb, u = zb + '//' + Ab + Cb, Db = []; for (var rb = 0; rb < this.nb.length; rb++) { var sb = this.nb[rb]; Db.push(encodeURIComponent(sb.name) + '=' + encodeURIComponent(sb.value)); } u += u.indexOf('?') != -1 ? '&' + Db.join('&') : '?' + Db.join('&'); return this.Eb(this.ob(u)); }, getParameters: function() { return this.nb; }, setParameters: function(nb) { this.nb = nb; }, clone: function() { var Fb = new mboxUrlBuilder(this.lb, this.mb); Fb.setServerType(this.wb); Fb.setBasePath(this.pb); Fb.setUrlProcessAction(this.ob); for (var rb = 0; rb < this.nb.length; rb++) { Fb.addParameter(this.nb[rb].name, this.nb[rb].value); } return Fb; }, Eb: function(Gb) { return Gb.replace(/\"/g, '&quot;').replace(/>/g, '&gt;'); }, checkInvalidCharacters: function (qb) { var Hb = new RegExp('(\'|")'); if (Hb.exec(qb)) { throw "Parameter '" + qb + "' contains invalid characters"; } }};TNT.a.Ib = function() { var Jb = [], Kb = 0, Lb = []; function Mb(Nb, Ob) { Kb += 1; Jb[Nb] = Ob; Pb(); } function Pb() { var jb = Lb.length, kb = -1, Qb; if (Kb !== Jb.length || !Lb.length) { return; } while (++kb < jb) { Qb = Lb[kb]; Qb.fn.apply(Qb.ctx, Jb); } } return { Rb: function () { var Nb = Jb.length; Jb[Jb.length] = null; return function () { Mb(Nb, [].slice.call(arguments)); }; }, Sb: function (cb, context) { Lb.push({fn: cb, ctx: context}); Pb(); } };};(function(X, W, c, b, Tb) { var Ub = new RegExp("\\|MCMID\\|"), Vb = 'vst.', Wb = Vb + 'trk', Xb = Vb + 'trks'; function Yb(Zb, _) { return encodeURIComponent(Zb) + '=' + encodeURIComponent(_); } function _b(ac) { var bc, cc = function(Zb) { return Vb + Zb; }; if (!W.cb(ac.getCustomerIDs)) { return []; } bc = ac.getCustomerIDs(); if (!W.fb(bc)) { return []; } return X.dc(bc, [], cc); } function ec(ac, fc) { var gc = ac.trackingServer, hc = ac.trackingServerSecure; if (gc) { fc.push(Yb(Wb, gc)); } if (hc) { fc.push(Yb(Xb, hc)); } } function ic(ac, fc) { fc.push.apply(fc, _b(ac)); } function jc(Ob) { var fc = []; W.gb(Ob, function(hb) { fc.push(hb[0]); }); return fc; } function kc(lc) { return !W.bb(lc.value); } function mc(Ib, ac, nc, Zb) { var oc; if (!W.cb(ac[nc])) { return; } oc = Ib.Rb(); ac[nc](function(_) { oc({key:Zb, value: _}); }, true); } function pc(Ib, ac, qc) { qc(Ib, ac, 'getMarketingCloudVisitorID', c.e); qc(Ib, ac, 'getAudienceManagerBlob', c.g); qc(Ib, ac, 'getAnalyticsVisitorID', c.h); qc(Ib, ac, 'getAudienceManagerLocationHint', c.f); } function rc(Ib, ac, sc, tc, uc) { if (tc) { window.clearTimeout(sc.id); uc({optout: tc, params: []}); vc(); return; } pc(Ib, ac, mc); Ib.Sb(function() { if (sc.done) { return; } var c = jc([].slice.call(arguments)), fc = []; window.clearTimeout(sc.id); W.gb(c, function(lc) { if (kc(lc)) { fc.push(Yb(lc.key, lc.value)); } }); ic(ac, fc); ec(ac, fc); uc({optout: tc, params: fc}); vc(); }); } function wc(xc) { var ac; if (W.bb(xc) || W.Z(window.Visitor) || !W.cb(window.Visitor.getInstance)) { return null; } ac = window.Visitor.getInstance(xc); if (W.Z(ac) || W.ab(ac) || !ac.isAllowed()) { return null; } return ac; } function yc() { return !W.ab(wc(b.imsOrgId)); } function zc() { var ac = wc(b.imsOrgId); if (W.ab(ac)) { return false; } if (W.Z(ac.cookieName)) { return false; } if (!W.cb(ac.cookieRead)) { return false; } var Ac = ac.cookieRead(ac.cookieName); if (W.bb(Ac)) { return false; } return Ub.test(Ac); } function Bc(ac, Cc) { return Cc && W.cb(ac.isOptedOut) && !W.Z(window.Visitor.OptOut); } function Dc(Cc, uc) { var xc = b.imsOrgId, Ec = b.visitorApiTimeout, Ib = Tb(), sc = {id: NaN, done: false}, ac; ac = wc(xc); if (W.ab(ac)) { uc(null); return; } Fc(); sc.id = window.setTimeout(function() { sc.done = true; uc(null); vc(); }, Ec); if (Bc(ac, Cc)) { ac.isOptedOut(function(tc) { rc(Ib, ac, sc, tc, uc); }, window.Visitor.OptOut.GLOBAL, true); } else { rc(Ib, ac, sc, false, uc); } } function Gc(ac, nc, Zb, Hc) { if (ac[nc]) { var _ = ac[nc](); if (_) { Hc.push(Yb(Zb, _)); } } } function Ic() { var ac = wc(b.imsOrgId), fc = []; Gc(ac, 'getMarketingCloudVisitorID', c.e, fc); Gc(ac, 'getAudienceManagerBlob', c.g, fc); Gc(ac, 'getAnalyticsVisitorID', c.h, fc); Gc(ac, 'getAudienceManagerLocationHint', c.f, fc); ic(ac, fc); ec(ac, fc); return fc; } function Jc(x) { var xc = b.imsOrgId, mb = b.clientCode, ac = wc(xc); if (W.ab(ac) || !W.cb(ac.getSupplementalDataID)) { return ''; } return ac.getSupplementalDataID('mbox:' + mb + ':' + x); } function Fc() { if (!b.bodyHidingEnabled) { return; } if (!b.globalMboxAutoCreate) { return } var Kc = document.getElementsByTagName('head')[0]; var Lc = document.createElement('style'); Lc.type = 'text/css'; Lc.id = 'at-id-body-style'; if (Lc.styleSheet){ Lc.styleSheet.cssText = css; } else { Lc.appendChild(document.createTextNode(b.bodyHiddenStyle)); } if (Kc) { Kc.appendChild(Lc); } } function vc() { if (!b.bodyHidingEnabled) { return; } if (!b.globalMboxAutoCreate) { return } window.setTimeout(function() { var Kc = document.getElementsByTagName('head')[0]; var Lc = document.getElementById('at-id-body-style'); if (Kc && Lc) { Kc.removeChild(Lc); } }, b.visitorApiPageDisplayTimeout); } X.yc = yc; X.zc = zc; X.Dc = Dc; X.Ic = Ic; X.Jc = Jc;}(TNT.a, TNT.a.W, TNT.a.c, TNT.a.b, TNT.a.Ib));mboxStandardFetcher = function() { };mboxStandardFetcher.prototype = { constructor: mboxStandardFetcher, getType: function() { return 'standard'; }, fetch: function(Mc) { Mc.setServerType(this.getType()); document.write('<' + 'scr' + 'ipt src="' + Mc.buildUrl() + '"><' + '\/scr' + 'ipt>'); }, cancel: function() { }};mboxAjaxFetcher = function() { };mboxAjaxFetcher.prototype = { constructor: mboxAjaxFetcher, getType: function() { return 'ajax'; }, fetch: function(Mc) { Mc.setServerType(this.getType()); var Kc = document.getElementsByTagName('head')[0], Nc = document.createElement('script'); Nc.src = Mc.buildUrl(); Kc.appendChild(Nc); }, cancel: function() {}};(function(X){ function Oc() {} Oc.prototype = { constructor: Oc, getType: function() { return 'ajax'; }, fetch: function(Mc) { Mc.setServerType(this.getType()); document.write('<' + 'scr' + 'ipt src="' + Mc.buildUrl() +'"><' + '\/scr' + 'ipt>'); }, cancel: function() { } }; X.Oc = Oc;}(TNT.a));mboxMap = function() { this.Pc = {}; this.Qc = [];};mboxMap.prototype = { constructor: mboxMap, put: function(Zb, _) { if (!this.Pc[Zb]) { this.Qc[this.Qc.length] = Zb; } this.Pc[Zb] = _; }, get: function(Zb) { return this.Pc[Zb]; }, remove: function(Zb) { var Rc = []; this.Pc[Zb] = undefined; for (var i = 0; i < this.Qc.length; i++) { if (this.Qc[i] !== Zb) { Rc.push(this.Qc[i]); } } this.Qc = Rc; }, each: function(xb) { for (var rb = 0; rb < this.Qc.length; rb++ ) { var Zb = this.Qc[rb]; var _ = this.Pc[Zb]; if (_) { var fc = xb(Zb, _); if (fc === false) { break; } } } }, isEmpty: function() { return this.Qc.length === 0; }};mboxList = function() { this.Sc = [];};mboxList.prototype = { constructor: mboxList, add: function(Tc) { if (!Tc) { return; } this.Sc.push(Tc); }, get: function(x) { var fc = new mboxList(); for (var rb = 0; rb < this.Sc.length; rb++) { var Tc = this.Sc[rb]; if (Tc.getName() === x) { fc.add(Tc); } } return fc; }, getById: function(Nb) { return this.Sc[Nb]; }, length: function() { return this.Sc.length; }, each: function(xb) { var W = TNT.a.W; if (!W.cb(xb)) { throw 'Action must be a function, was: ' + typeof(xb); } for (var rb = 0; rb < this.Sc.length; rb++) { xb(this.Sc[rb]); } }};mboxSignaler = function(Uc) { this.Uc = Uc;};mboxSignaler.prototype = { constructor: mboxSignaler, signal: function(Vc, x ) { if (!this.Uc.isEnabled()) { return; } var Wc = mboxSignaler.Xc(), Yc = this.Zc(this.Uc._c(x)); Wc.appendChild(Yc); var Ob = [].slice.call(arguments, 1), Tc = this.Uc.create(x, Ob, Yc), Mc = Tc.getUrlBuilder(); Mc.addParameter(TNT.a.c.d, mboxGenerateId()); Tc.setFetcher(new mboxAjaxFetcher()); Tc.load(); }, Zc: function(ad) { var fc = document.createElement('div'); fc.id = ad; fc.style.visibility = 'hidden'; fc.style.display = 'none'; return fc; }};mboxSignaler.Xc = function() { return document.body;};mboxLocatorDefault = function(bd) { this.bd = bd; document.write('<div id="' + this.bd + '" style="visibility:hidden;display:none">&nbsp;<\/div>');};mboxLocatorDefault.prototype = { constructor: mboxLocatorDefault, locate: function() { var cd = 1, dd = document.getElementById(this.bd); while (dd) { if (dd.nodeType === cd && dd.className && dd.className.indexOf('mboxDefault') !== -1) { return dd; } dd = dd.previousSibling; } return null; }, force: function() { var ed = document.getElementById(this.bd), fd = document.createElement('div'); fd.className = 'mboxDefault'; if (ed) { ed.parentNode.insertBefore(fd, ed); } return fd; }};mboxLocatorNode = function(dd) { this.dd = dd;};mboxLocatorNode.prototype = { constructor: mboxLocatorNode, locate: function() { return typeof(this.dd) === 'string' ? document.getElementById(this.dd) : this.dd; }, force: function() { return null; }};mboxOfferContent = function() { this.gd = function() {};};mboxOfferContent.prototype = { constructor: mboxOfferContent, show: function (Tc) { var fc = Tc.showContent(document.getElementById(Tc.getImportName())); if (fc === 1) { this.gd(); } return fc; }, setOnLoad: function(gd) { this.gd = gd; }};mboxOfferAjax = function(hd) { this.hd = hd; this.gd = function() {};};mboxOfferAjax.prototype = { constructor: mboxOfferAjax, setOnLoad: function(gd) { this.gd = gd; }, show: function(Tc) { var id = document.createElement('div'), fc; id.id = Tc.getImportName(); id.innerHTML = this.hd; fc = Tc.showContent(id); if (fc === 1) { this.gd(); } return fc; }};mboxOfferDefault = function() { this.gd = function() {};};mboxOfferDefault.prototype = { constructor: mboxOfferDefault, show: function(Tc) { var fc = Tc.hide(); if (fc === 1) { this.gd(); } return fc; }, setOnLoad: function(gd) { this.gd = gd; }};mboxCookieManager = function(qb, jd) { this.qb = qb; this.kd = TNT.a.H.J; this.ld = TNT.a.b.crossDomainXOnly; this.md = TNT.a.H.D; this.nd = TNT.a.b.usePersistentCookies; this.od = new mboxMap(); this.jd = jd === '' || jd.indexOf('.') === -1 ? '' : '; domain=' + jd; this.loadCookies();};mboxCookieManager.prototype = { constructor: mboxCookieManager, isEnabled: function() { this.setCookie(this.kd, 'true', 60); this.loadCookies(); return this.getCookie(this.kd) == 'true'; }, setCookie: function(qb, _, pd) { if (typeof qb == 'undefined' || typeof _ == 'undefined' || typeof pd == 'undefined') { return; } var qd = Math.ceil(pd + new Date().getTime() / 1000), rd = mboxCookieManager.sd(qb, encodeURIComponent(_), qd); this.od.put(qb, rd); this.saveCookies(); }, getCookie: function(qb) { var rd = this.od.get(qb); return rd ? decodeURIComponent(rd.value) : null; }, deleteCookie: function(qb) { this.od.remove(qb); this.saveCookies(); }, getCookieNames: function(td) { var ud = []; this.od.each(function(qb, rd) { if (qb.indexOf(td) === 0) { ud[ud.length] = qb; } }); return ud; }, saveCookies: function() { var vd = this, wd = [], xd = 0; this.od.each(function(qb, rd) { if(!vd.ld || qb === vd.md) { wd[wd.length] = mboxCookieManager.yd(rd); if (xd < rd.expireOn) { xd = rd.expireOn; } } }); var zd = new Date(xd * 1000); var Db = []; Db.push(this.qb, '=', wd.join('|')); if (vd.nd) { Db.push('; expires=', zd.toGMTString()); } Db.push('; path=/', this.jd); document.cookie = Db.join(""); }, loadCookies: function() { var Ad = mboxCookieManager.Bd(this.qb), Cd = mboxCookieManager.Dd(Ad), Ed = Math.ceil(new Date().getTime() / 1000); this.od = new mboxMap(); for (var rb = 0; rb < Cd.length; rb++) { var rd = mboxCookieManager.Fd(Cd[rb]); if (Ed > rd.expireOn) { continue; } this.od.put(rd.name, rd); } }};mboxCookieManager.yd = function(rd) { return rd.name + '#' + rd.value + '#' + rd.expireOn;};mboxCookieManager.Fd = function(Y) { var Db = Y.split('#'); return mboxCookieManager.sd(Db[0], Db[1], Db[2]);};mboxCookieManager.sd = function(qb, _, qd) { return {name: qb, value: _, expireOn: qd};};mboxCookieManager.Bd = function(qb) { var result = new RegExp('(^|; )' + encodeURIComponent(qb) + '=([^;]*)').exec(document.cookie); return result ? result[2] : null;};mboxCookieManager.Dd = function(Y) { if (!Y) { return []; } return Y.split('|');};mboxSession = function(Gd, Hd, Id, Jd, Kd) { var Ld = window.mboxForceSessionId; this.Id = Id; this.Jd = Jd; this.Kd = Kd; this.ad = typeof(Ld) !== 'undefined' ? Ld : mboxGetPageParameter(Hd, true); this.ad = this.ad || Kd.getCookie(Id) || Gd; this.Kd.setCookie(Id, this.ad, Jd);};mboxSession.prototype = { constructor: mboxSession, getId: function() { return this.ad; }, forceId: function(Md) { this.ad = Md; this.Kd.setCookie(this.Id, this.ad, this.Jd); }};mboxPC = function(Id, Jd, Kd) { var Nd = window.mboxForcePCId; this.Id = Id; this.Jd = Jd; this.Kd = Kd; this.ad = typeof(Nd) != 'undefined' ? Nd: Kd.getCookie(Id); if (this.ad) { Kd.setCookie(Id, this.ad, Jd); }};mboxPC.prototype = { constructor: mboxPC, getId: function() { return this.ad; }, forceId: function(Md) { if (this.ad === Md) { return false; } this.ad = Md; this.Kd.setCookie(this.Id, this.ad, this.Jd); return true; }};(function(X, W, H, b, M) { var Od = new RegExp(".*\\.(\\d+)_\\d+"); function Bb(Qd) { var Rd = Od.exec(Qd); if (Rd && Rd.length === 2) { return M.U + Rd[1] + '.' + M.V; } return ''; } function Sd(Kd, Td) { var Ab = Bb(Td); if (!W.bb(Ab)) { Kd.setCookie(H.L, Ab, b.overrideMboxEdgeServerTimeout); } } function Ud(Vd, Kd) { this.Vd= Vd; this.Kd = Kd; Sd(Kd, Vd.getId()); } Ud.prototype = { constructor: Ud, getId: function() { return this.Vd.getId(); }, forceId: function(Md) { if (!this.Vd.forceId(Md)) { return false; } Sd(this.Kd, Md); return true; } }; X.Ud = Ud;}(TNT.a, TNT.a.W, TNT.a.H, TNT.a.b, TNT.a.M));mboxGetPageParameter = function(qb, Wd) { Wd = Wd || false; var Xd; if (Wd) { Xd = new RegExp("\\?[^#]*" + qb + "=([^\&;#]*)", "i"); } else { Xd = new RegExp("\\?[^#]*" + qb + "=([^\&;#]*)"); } var fc = null; var Yd = Xd.exec(document.location); if (Yd && Yd.length >= 2) { fc = Yd[1]; } return fc;};mboxCookiePageDomain = function() { var jd = (/([^:]*)(:[0-9]{0,5})?/).exec(document.location.host)[1]; var Zd = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/; if (!Zd.exec(jd)) { var _d = (/([^\.]+\.[^\.]{3}|[^\.]+\.[^\.]+\.[^\.]{2})$/).exec(jd); if (_d) { jd = _d[0]; if (jd.indexOf("www.") === 0) { jd=jd.substr(4); } } } return jd ? jd: "";};mboxShiftArray = function(ae) { var fc = []; for (var rb = 1; rb < ae.length; rb++) { fc[fc.length] = ae[rb]; } return fc;};mboxGenerateId = function() { var s = [], hex = '0123456789abcdef'; for (var i = 0; i < 36; i++) { s[i] = hex.substr(Math.floor(Math.random() * 0x10), 1); } s[14] = '4'; s[19] = hex.substr((s[19] & 0x3) | 0x8, 1); s[8] = s[13] = s[18] = s[23] = '-'; return s.join('').replace(/-/g, '');};mboxScreenHeight = function() { return screen.height;};mboxScreenWidth = function() { return screen.width;};mboxBrowserWidth = function() { return (window.innerWidth) ? window.innerWidth : document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;};mboxBrowserHeight = function() { return (window.innerHeight) ? window.innerHeight : document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight;};mboxBrowserTimeOffset = function() { return -new Date().getTimezoneOffset();};mboxScreenColorDepth = function() { return screen.pixelDepth;};mbox = function(qb, ad, Mc, be, ce, Uc) { this.de = null; this.ee = 0; this.fe = be; this.ce = ce; this.ge = null; this.he = new mboxOfferContent(); this.fd = null; this.Mc = Mc; this.message = ''; this.ie = {}; this.je = 0; this.ke = 5; this.ad = ad; this.qb = qb; this.le(); Mc.addParameter(TNT.a.c.x, qb); Mc.addParameter(TNT.a.c.y, ad); this.me = function() {}; this.gd = function() {}; this.ne = null; this.oe = document.documentMode >= 10 && !Uc.isDomLoaded(); if (this.oe) { this.pe = TNT.a.nestedMboxes; this.pe.push(this.qb); }};mbox.prototype.getId = function() { return this.ad;};mbox.prototype.le = function() { var maxLength = TNT.a.M.T; if (this.qb.length > maxLength) { throw "Mbox Name " + this.qb + " exceeds max length of " + maxLength + " characters."; } else if (this.qb.match(/^\s+|\s+$/g)) { throw "Mbox Name " + this.qb + " has leading/trailing whitespace(s)."; }};mbox.prototype.getName = function() { return this.qb;};mbox.prototype.getParameters = function() { var nb = this.Mc.getParameters(); var fc = []; for (var rb = 0; rb < nb.length; rb++) { if (nb[rb].name.indexOf('mbox') !== 0) { fc[fc.length] = nb[rb].name + '=' + nb[rb].value; } } return fc;};mbox.prototype.setOnLoad = function(xb) { this.gd = xb; return this;};mbox.prototype.setMessage = function(qe) { this.message = qe; return this;};mbox.prototype.setOnError = function(me) { this.me = me; return this;};mbox.prototype.setFetcher = function(re) { if (this.ge) { this.ge.cancel(); } this.ge = re; return this;};mbox.prototype.getFetcher = function() { return this.ge;};function se(Mc, Tc) { var te = TNT.a, b = te.b, ue = b.mboxTimeout; if (te.yc() && te.zc()) { Mc.addParameters(te.Ic()); } Tc.ge.fetch(Mc); Tc.ve = setTimeout(function() { Tc.me('browser timeout', Tc.ge.getType()); }, ue);}function we(Tc) { var ne = Tc.getDefaultDiv(); if (ne) { Tc.xe(Tc.getDefaultDiv()); }}function ye(Mc, Tc, Cc) { var te = TNT.a; Tc.setFetcher(new mboxAjaxFetcher()); te.Dc(Cc, function(ze) { if (ze === null) { se(Mc, Tc); return; } if (Cc && ze.optout) { we(Tc); return; } Mc.addParameters(ze.params); se(Mc, Tc); });}mbox.prototype.load = function(nb) { var vd = this, Mc = vd.Mc, te = TNT.a, b = te.b, Cc = b.optoutEnabled; if (vd.ge === null) { return vd; } vd.cancelTimeout(); vd.ee = 0; if (nb && nb.length > 0) { Mc = vd.Mc.clone().addParameters(nb); } if (Cc && te.yc()) { ye(Mc, vd, Cc); return vd; } var yc = te.yc(); if (yc && !te.zc()) { ye(Mc, vd, false); return vd; } se(Mc, vd); return vd;};mbox.prototype.loaded = function() { this.cancelTimeout(); if (!this.activate() && this.je < this.ke) { var vd = this; setTimeout(function() { vd.loaded(); }, TNT.a.b.mboxLoadedTimeout); }};mbox.prototype.activate = function() { if (this.ee) { return this.ee; } if (this.oe && this.pe[this.pe.length - 1] !== this.qb) { return this.ee; } if (this.show()) { this.cancelTimeout(); this.ee = 1; } if (this.oe) { this.pe.pop(); } return this.ee;};mbox.prototype.isActivated = function() { return this.ee;};mbox.prototype.setOffer = function(he) { var Ae = he && he.show && he.setOnLoad; if (!Ae) { throw 'Invalid offer'; } var Be = TNT.a.b.globalMboxName === this.qb; Be = Be && he instanceof mboxOfferDefault; Be = Be && this.ge !== null; Be = Be && this.ge.getType() === 'ajax'; if (!Be) { this.he = he; return this; } var Ce = this.he.gd; this.he = he; this.he.setOnLoad(Ce); return this;};mbox.prototype.getOffer = function() { return this.he;};mbox.prototype.show = function() { return this.he.show(this);};mbox.prototype.showContent = function(hd) { if (!mbox.De(hd)) { return 0; } this.fd = mbox.Ee(this, this.fd); if (this.fd === null) { return 0; } if (!mbox.Fe(document.body, this.fd)) { return 0; } if (this.fd === hd) { this.xe(this.fd); this.gd(); return 1; } this.Ge(this.fd); this.Ge(hd); mbox.He(this, hd); this.xe(this.fd); this.gd(); return 1;};mbox.De = function(hd) { return hd !== undefined && hd !== null;};mbox.Fe = function(Ie, Je) { var DOCUMENT_POSITION_CONTAINED_BY = 16; var Ke = Ie.contains !== undefined; if (Ke) { return Ie !== Je && Ie.contains(Je); } else { return Boolean(Ie.compareDocumentPosition(Je) & DOCUMENT_POSITION_CONTAINED_BY); }};mbox.Ee = function(Tc, fd) { if (fd !== undefined && fd !== null && mbox.Fe(document.body, fd)) { return fd; } return Tc.getDefaultDiv();};mbox.He = function(Tc, Le) { Tc.fd.parentNode.replaceChild(Le, Tc.fd); Tc.fd = Le;};mbox.prototype.hide = function() { return this.showContent(this.getDefaultDiv());};mbox.prototype.finalize = function() { if (!this.getDefaultDiv()) { this.fe.force(); } if (!this.getDiv()) { this.fd = mbox.Ee(this, this.fd); } this.Me(); this.setFetcher(new mboxAjaxFetcher()); this.cancelTimeout(); this.gd();};mbox.prototype.cancelTimeout = function() { if (this.ve) { clearTimeout(this.ve); } if (this.ge) { this.ge.cancel(); }};mbox.prototype.getDiv = function() { return this.fd;};mbox.prototype.getDefaultDiv = function() { if (this.ne === null) { this.ne = this.fe.locate(); } return this.ne;};mbox.prototype.setEventTime = function(Ne) { this.ie[Ne] = (new Date()).getTime();};mbox.prototype.getEventTimes = function() { return this.ie;};mbox.prototype.getImportName = function() { return this.ce;};mbox.prototype.getURL = function() { return this.Mc.buildUrl();};mbox.prototype.getUrlBuilder = function() { return this.Mc;};mbox.prototype.Oe = function(fd) { return fd.style.display != 'none';};mbox.prototype.xe = function(fd) { this.Pe(fd, true);};mbox.prototype.Ge = function(fd) { this.Pe(fd, false);};mbox.prototype.Pe = function(fd, Qe) { fd.style.visibility = Qe ? "visible" : "hidden"; fd.style.display = Qe ? "block" : "none";};mbox.prototype.Me = function() { this.oe = false;};mbox.prototype.relocateDefaultDiv = function() { this.ne = this.fe.locate();};function Re(Uc) { Uc.getMboxes().each(function(Tc) { Tc.finalize(); });}mboxFactory = function(Ab, mb, Se) { var te = TNT.a; var b = te.b; var W = te.W; var H = te.H; var C = te.C; var M = te.M; var Te = b.mboxVersion; this.Ue = false; this.Se = Se; this.Sc = new mboxList(); mboxFactories.put(Se, this); this.Ve = b.mboxIsSupportedFunction() && typeof (window.attachEvent || document.addEventListener || window.addEventListener) != 'undefined'; this.We = this.Ve && mboxGetPageParameter(C.D, true) === null; var Xe = Se == M.N; var Id = M.O + (Xe ? '' : ('-' + Se)); this.Kd = new mboxCookieManager(Id, b.cookieDomainFunction()); if (!b.crossDomainXOnly) { this.We = this.We && this.Kd.isEnabled(); } this.We = this.We && W.ab(this.Kd.getCookie(H.D)) && W.ab(this.Kd.getCookie(H.K)); if (this.isAdmin()) { this.enable(); } this.Ye(); this.Ze = mboxGenerateId(); this._e = mboxScreenHeight(); this.af = mboxScreenWidth(); this.bf = mboxBrowserWidth(); this.cf = mboxBrowserHeight(); this.df = mboxScreenColorDepth(); this.ef = mboxBrowserTimeOffset(); this.ff = new mboxSession(this.Ze, C.E, H.E, b.sessionExpirationTimeout, this.Kd); var Vd = new mboxPC(H.m, b.tntIdLifetime, this.Kd); this.gf = b.overrideMboxEdgeServer ? new te.Ud(Vd, this.Kd) : Vd; this.Mc = new mboxUrlBuilder(Ab, mb); this.hf(this.Mc, Xe, Te); this.jf = new Date().getTime(); this.kf = this.jf; var vd = this; this.addOnLoad(function() { vd.kf = new Date().getTime(); }); if (this.Ve) { this.addOnLoad(function() { vd.Ue = true; Re(vd); TNT.a.nestedMboxes = []; }); if (this.We) { this.limitTraffic(b.trafficLevelPercentage, b.trafficDuration); this.lf(); this.mf = new mboxSignaler(this); } else { if (!b.isProduction) { if (this.isAdmin()) { if (!this.isEnabled()) { alert("mbox disabled, probably due to timeout\n" + "Reset your cookies to re-enable\n(this message will only appear in administrative mode)"); } else { alert("It looks like your browser will not allow " + b.companyName + " to set its administrative cookie. To allow setting the" + " cookie please lower the privacy settings of your browser.\n" + "(this message will only appear in administrative mode)"); } } } } }};mboxFactory.prototype.forcePCId = function(Md) { if (!TNT.a.b.clientTntIdSupport) { return; } if (this.gf.forceId(Md)) { this.ff.forceId(mboxGenerateId()); }};mboxFactory.prototype.forceSessionId = function(Md) { if (!TNT.a.b.clientSessionIdSupport) { return; } this.ff.forceId(Md);};mboxFactory.prototype.isEnabled = function() { return this.We;};mboxFactory.prototype.getDisableReason = function() { return this.Kd.getCookie(TNT.a.H.D);};mboxFactory.prototype.isSupported = function() { return this.Ve;};mboxFactory.prototype.disable = function(pd, nf) { if (typeof pd == 'undefined') { pd = 60 * 60; } if (typeof nf == 'undefined') { nf = 'unspecified'; } if (!this.isAdmin()) { this.We = false; this.Kd.setCookie(TNT.a.H.D, nf, pd); }};mboxFactory.prototype.enable = function() { this.We = true; this.Kd.deleteCookie(TNT.a.H.D);};mboxFactory.prototype.isAdmin = function() { return document.location.href.indexOf(TNT.a.C.F) != -1;};mboxFactory.prototype.limitTraffic = function(of, pd) { if (TNT.a.b.trafficLevelPercentage != 100) { if (of == 100) { return; } var pf = true; if (parseInt(this.Kd.getCookie(TNT.a.H.I)) != of) { pf = (Math.random() * 100) <= of; } this.Kd.setCookie(TNT.a.H.I, of, pd); if (!pf) { this.disable(60 * 60, 'limited by traffic'); } }};mboxFactory.prototype.addOnLoad = function(qf) { if (this.isDomLoaded()) { qf(); } else { var rf = false; var sf = function() { if (rf) { return; } rf = true; qf(); }; this.tf.push(sf); if (this.isDomLoaded() && !rf) { sf(); } }};mboxFactory.prototype.getEllapsedTime = function() { return this.kf - this.jf;};mboxFactory.prototype.getEllapsedTimeUntil = function(A) { return A - this.jf;};mboxFactory.prototype.getMboxes = function() { return this.Sc;};mboxFactory.prototype.get = function(x, y) { return this.Sc.get(x).getById(y || 0);};mboxFactory.prototype.update = function(x, nb) { var te = TNT.a, c = te.c; if (!this.isEnabled()) { return; } var vd = this; if (!this.isDomLoaded()) { this.addOnLoad(function() { vd.update(x, nb); }); return; } if (this.Sc.get(x).length() === 0) { throw "Mbox " + x + " is not defined"; } this.Sc.get(x).each(function(Tc) { var Mc = Tc.getUrlBuilder(); Mc.addParameter(c.d, mboxGenerateId()); vd.uf(Mc, x); Tc.load(nb); });};mboxFactory.prototype.setVisitorIdParameters = function(Mc, x) { this.uf(Mc, x);};mboxFactory.prototype.create = function(x, nb, vf) { return this.wf(x, nb, vf);};mboxFactory.prototype.xf = function(x, nb, vf) { return this.wf(x, nb, vf);};mboxFactory.prototype.wf = function(x, nb, vf) { if (!this.isSupported()) { return null; } var yf = new Date(); var A = yf.getTime() - (yf.getTimezoneOffset() * TNT.a.M.Q); var Mc = this.Mc.clone(); Mc.addParameter(TNT.a.c.j, this.Sc.length() + 1); Mc.addParameter(TNT.a.c.A, A); Mc.addParameters(nb); this.uf(Mc, x); var y, fe, Tc; if (vf) { fe = new mboxLocatorNode(vf); } else { if (this.Ue) { throw 'The page has already been loaded, can\'t write marker'; } fe = new mboxLocatorDefault(this._c(x)); } try { y = this.Sc.get(x).length(); Tc = new mbox(x, y, Mc, fe, this.zf(x), this); if (this.We) { Tc.setFetcher(this.Ue ? new mboxAjaxFetcher() : new mboxStandardFetcher()); } var vd = this; Tc.setOnError(function(qe, vb) { Tc.setMessage(qe); Tc.activate(); if (!Tc.isActivated()) { vd.disable(TNT.a.b.mboxFactoryDisabledTimeout, qe); window.location.reload(false); } }); this.Sc.add(Tc); } catch (Af) { this.disable(); throw 'Failed creating mbox "' + x + '", the error was: ' + Af; } return Tc;};mboxFactory.prototype.Bf = function(Mc) { var m = this.gf.getId(); if (m) { Mc.addParameter(TNT.a.c.m, m); }};mboxFactory.prototype.Cf = function(Mc, x) { var Df = !TNT.isAutoCreateGlobalMbox() && TNT.getGlobalMboxName() === x; if (Df) { Mc.addParameters(TNT.getTargetPageParameters()); }};mboxFactory.prototype.Ef = function(Mc, x) { var te = TNT.a, Ff = te.c.i, i = te.Jc(x); if (i) { Mc.addParameter(Ff, i); }};mboxFactory.prototype.Gf = function(Mc) { var te = TNT.a; if (te.yc() && te.zc()) { Mc.addParameters(te.Ic()); }};mboxFactory.prototype.uf = function(Mc, x) { this.Bf(Mc); this.Cf(Mc, x); this.Ef(Mc, x); this.Gf(Mc, x);};mboxFactory.prototype.getCookieManager = function() { return this.Kd;};mboxFactory.prototype.getPageId = function() { return this.Ze;};mboxFactory.prototype.getPCId = function() { return this.gf;};mboxFactory.prototype.getSessionId = function() { return this.ff;};mboxFactory.prototype.getSignaler = function() { return this.mf;};mboxFactory.prototype.getUrlBuilder = function() { return this.Mc;};mboxFactory.prototype.Hf = function(x) { return this.Se + '-' + x + '-' + this.Sc.get(x).length();};mboxFactory.prototype._c = function(x) { return TNT.a.M.S + this.Hf(x);};mboxFactory.prototype.zf = function(x) { return TNT.a.M.P + this.Hf(x);};mboxFactory.prototype.hf = function(Mc, Xe, Te) { Mc.addParameter(TNT.a.c.k, document.location.hostname); Mc.addParameter(TNT.a.c.d, this.Ze); Mc.addParameter(TNT.a.c.n, this._e); Mc.addParameter(TNT.a.c.o, this.af); Mc.addParameter(TNT.a.c.p, this.bf); Mc.addParameter(TNT.a.c.q, this.cf); Mc.addParameter(TNT.a.c.r, this.ef); Mc.addParameter(TNT.a.c.s, this.df); Mc.addParameter(TNT.a.C.E, this.ff.getId()); if (!Xe) { Mc.addParameter(TNT.a.c.l, this.Se); } if (TNT.a.b.crossDomainEnabled) { Mc.addParameter(TNT.a.c.t, TNT.a.b.crossDomain); } var c = TNT.getClientMboxExtraParameters(); if (c) { Mc.addParameters(c.split('&')); } Mc.setUrlProcessAction(function(u) { if (TNT.a.b.passPageParameters) { u += '&'; u += TNT.a.c.u; u += '=' + encodeURIComponent(document.location); var v = encodeURIComponent(document.referrer); if (u.length + v.length < 2000) { u += '&'; u += TNT.a.c.v; u += '=' + v; } } u += '&'; u += TNT.a.c.w; u += '=' + Te; return u; });};mboxFactory.prototype.lf = function() { document.write('<style>.' + TNT.a.M.R + ' { visibility:hidden; }</style>');};mboxFactory.prototype.isDomLoaded = function() { return this.Ue;};mboxFactory.prototype.Ye = function() { if (this.tf) { return; } this.tf = []; var vd = this; (function() { var If = document.addEventListener ? "DOMContentLoaded" : "onreadystatechange"; var Jf = false; var Kf = function() { if (Jf) { return; } Jf = true; for (var i = 0; i < vd.tf.length; ++i) { vd.tf[i](); } }; if (document.addEventListener) { document.addEventListener(If, function() { document.removeEventListener(If, arguments.callee, false); Kf(); }, false); window.addEventListener("load", function(){ document.removeEventListener("load", arguments.callee, false); Kf(); }, false); } else if (document.attachEvent) { if (self !== self.top) { document.attachEvent(If, function() { if (document.readyState === 'complete') { document.detachEvent(If, arguments.callee); Kf(); } }); } else { var Lf = function() { try { document.documentElement.doScroll('left'); Kf(); } catch (Mf) { setTimeout(Lf, 13); } }; Lf(); } } if (document.readyState === "complete") { Kf(); } })();};(function(X) { function Nf(Of, Id, pd, Kd) { if (Of.targetJSLoaded) { return; } Kd.setCookie(Id, true, pd); window.location.reload(); } function Pf(b, H, Kd) { var Qf = '_AT', Sf = 50, Id = H.K, pd = b.experienceManagerDisabledTimeout, de = b.experienceManagerTimeout, u = b.experienceManagerPluginUrl, Tf = function(Uf) {}, Vf = function(Uf) { setTimeout(function() { window[Qf].applyWhenReady(Uf); }, Sf); }; if (Qf in window) { return; } window[Qf] = {}; if (Kd.getCookie(Id) !== 'true') { document.write('<scr' + 'ipt src="' + u + '"><\/sc' + 'ript>'); window[Qf].applyWhenReady = Vf; setTimeout(function() { Nf(window[Qf], Id, pd, Kd); }, de); } else { window[Qf].applyWhenReady = Tf; } } X.Pf = Pf;}(TNT.a));(function(X, a, W, b, c, M){ function Wf() { return b.globalMboxName; } function Xf() { return b.globalMboxLocationDomId; } function Yf() { return b.globalMboxAutoCreate; } function Zf() { return b.parametersFunction(); } function _f() { var cd = 1, ag = document.getElementsByTagName('script'), dd = ag[ag.length - 1]; while (dd) { if (dd.nodeType === cd && dd.className === M.R) { return dd; } dd = dd.previousSibling; } return null; } function bg(Uc, x, c) { var vf, Tc; if (a.yc()) { vf = _f(); Tc = Uc.create( x, c, vf); } else { Tc = Uc.create( x, c); } if (Tc && Uc.isEnabled()) { Tc.load(); } return Tc; } function cg(Uc, vf, x, c) { return Uc.xf(x, c, vf); } function dg(Uc, x, c) { Uc.update(x, c); } function eg(Kd, qb) { return Kd.getCookie(qb); } function fg(Kd, qb, _, pd) { Kd.setCookie(qb, _, pd); } function gg(hg) { var fc = []; var ig = /([^&=]+)=([^&]*)/g; var jg = decodeURIComponent; var Rd = ig.exec(hg); while (Rd) { fc.push([jg(Rd[1]), jg(Rd[2])].join('=')); Rd = ig.exec(hg); } return fc; } function dc(kg, Qc, cc) { var fc = []; for (var Zb in kg) { if (!kg.hasOwnProperty(Zb)) { continue; } var _ = kg[Zb]; if (W.fb(_)) { Qc.push(Zb); fc = fc.concat(dc(_, Qc, cc)); Qc.pop(); } else { if (Qc.length > 0) { fc.push([cc(Qc.concat(Zb).join('.')), _].join('=')); } else { fc.push([cc(Zb), _].join('=')); } } } return fc; } function lg() { var mg = window.targetPageParams, cc = function(Zb) { return Zb }; if (!W.cb(mg)) { return []; } var fc = null; try { fc = mg(); } catch (ng) {} if (W.ab(fc)) { return []; } if (W.db(fc)) { return fc; } if (W.eb(fc) && !W.bb(fc)) { return gg(fc); } if (W.fb(fc)) { return dc(fc, [], cc); } return []; } function og(Uc) { var pg = Wf(), qg = Xf(), rg = lg(), sg, tg, ug; if (!qg) { qg = "mbox-" + pg + "-" + mboxGenerateId(); sg = document.createElement("div"); sg.className = "mboxDefault"; sg.id = qg; sg.style.visibility = "hidden"; sg.style.display = "none"; tg = setInterval(function(){ if (document.body) { clearInterval(tg); document.body.insertBefore(sg, document.body.firstChild); } }, b.bodyPollingTimeout); } ug = Uc.create(pg, rg, qg); if (ug && Uc.isEnabled()) { if (!Uc.isDomLoaded()) { if (!a.yc()) { ug.setFetcher(new a.Oc()); } else if (a.zc()) { ug.setFetcher(new a.Oc()); } else { ug.setFetcher(new mboxAjaxFetcher()); } } ug.load(); } } function vg(Uc, x, nb) { if (!Uc.isEnabled()) { return; } var yf = new Date(), wg = yf.getTimezoneOffset() * M.Q, Mc = Uc.getUrlBuilder().clone(); Mc.setBasePath('/m2/' + b.clientCode + '/viztarget'); Mc.addParameter(c.x, x); Mc.addParameter(c.y, 0); Mc.addParameter(c.j, Uc.getMboxes().length() + 1); Mc.addParameter(c.A, yf.getTime() - wg); Mc.addParameter(c.d, mboxGenerateId()); Mc.addParameter(c.z, Uc.isDomLoaded()); if (nb && nb.length > 0) { Mc.addParameters(nb); } Uc.Bf(Mc); Uc.xg(Mc, x); Uc.Ef(Mc, x); return Mc.buildUrl(); } function yg() { return new mboxMap(); } function zg(Ag, mb, Se) { return new mboxFactory(Ag, mb, Se); } a.bg = bg; a.cg = cg; a.dg = dg; a.vg = vg; a.eg = eg; a.fg = fg; a.og = og; a.yg = yg; a.zg = zg; a.dc = dc; X.getGlobalMboxName = Wf; X.getGlobalMboxLocation = Xf; X.isAutoCreateGlobalMbox = Yf; X.getClientMboxExtraParameters = Zf; X.getTargetPageParameters = lg;}(TNT, TNT.a, TNT.a.W, TNT.a.b, TNT.a.c, TNT.a.M));(function(X){ function Bg(Kd, b, Cg, Dg) { var Eg = 60 * 60, Fg = mboxGetPageParameter(Cg, true) || Kd.getCookie(Dg); if (!Fg) { return; } setTimeout(function() { if (typeof(window.mboxDebugLoaded) === 'undefined') { alert('Could not load the remote debug.\nPlease check your connection to ' + b.companyName + ' servers'); } }, Eg); var Db = []; Db.push(b.adminUrl, '/mbox/mbox_debug.jsp', '?'); Db.push('mboxServerHost', '=', b.serverHost, '&'); Db.push('clientCode', '=', b.clientCode); document.write('<' + 'scr' + 'ipt src="' + Db.join('') + '"><' + '\/scr' + 'ipt>'); } function Gg (b, Hg) { var W = X.W, Ig, Jg, _; if (W.Z(b) || W.ab(b) || !W.fb(b)) { return Hg; } for (var Zb in b) { Ig = b.hasOwnProperty(Zb) && Hg.hasOwnProperty(Zb); _ = b[Zb]; Jg = !W.Z(_) && !W.ab(_); if (Ig && Jg) { Hg[Zb] = _; } } return Hg; } function Kg(Uc, Kd) { TNT.createGlobalMbox = function() { X.og(Uc); }; window.mboxCreate = function(x ) { var c = [].slice.call(arguments, 1); return X.bg(Uc, x, c); }; window.mboxDefine = function(vf, x ) { var c = [].slice.call(arguments, 2); return X.cg(Uc, vf, x, c); }; window.mboxUpdate = function(x ) { var c = [].slice.call(arguments, 1); X.dg(Uc, x, c); }; window.mboxVizTargetUrl = function(x ) { var c = [].slice.call(arguments, 1); return X.vg(Uc, x, c); }; window.mboxSetCookie = function(qb, _, pd) { return X.fg(Kd, qb, _, pd); }; window.mboxGetCookie = function(qb) { return X.eg(Kd, qb); }; if (typeof(X.Lg) !== 'undefined') { window.mboxLoadSCPlugin = function(Mg) { return X.Lg(Uc, Mg); } } } function Ng() { if (typeof(window.mboxVersion) !== 'undefined') { return; } X.b = Gg(window.targetGlobalSettings, X.b); var b = X.b, Te = b.mboxVersion, Ag = b.serverHost, mb = b.clientCode, N = X.M.N, Cg = X.C.G, Dg = X.H.G, Og = X.H.L, Uc, Kd; window.mboxFactories = X.yg(); window.mboxFactoryDefault = Uc = X.zg(Ag, mb, N); window.mboxVersion = Te; Kd = Uc.getCookieManager(); Kg(Uc, Kd); Bg(Kd, b, Cg, Dg); X.Bb = function(Pg) { var lb; if (!b.overrideMboxEdgeServer) { return Pg; } lb = Kd.getCookie(Og); return lb === null ? Pg : lb; } } X.Ng = Ng;}(TNT.a));TNT.a.Ng();TNT.a.Pf(TNT.a.b, TNT.a.H,window.mboxFactoryDefault.getCookieManager());if (TNT.isAutoCreateGlobalMbox()) { TNT.createGlobalMbox();}

/*
################################################################
### ORACLE BLUEKAI : Universal Site Optimisation Integration ###
################################################################

Author : roshan.gonsalkorale@oracle.com, alex.wilton@oracle.com, mike.knott@oracle.com

Notes:

- This will query BlueKai for visitor profile data (campaign IDs and Category IDs) and send to a third party site optimisation platform
	- Supported Services:
		- DFP - via GPT syntax https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_setTargeting)
		- Adobe Target -  Send using the Adobe Target pixel. 
- The code aims to dispatch BlueKai profile data to the third party system by either finding it via the BlueKai API or using a local storage copy
- It aims to call the third party system as quickly as possible
- All code is asynchronous

Debugger:
	
- add 'bk_so_logger=true' as a query-string parameter in the URL and check the console logs

Implementation Instructions:

- Third party specific instructions:
	- DFP - DFP to be implemented via Google Publisher Tag (https://developers.google.com/doubleclick-gpt/)
- Update the config as per the "CONFIG" section below (please reach out to Oracle for help if required)

Code Workflow:

- If visitor profile data hasn't already been returned:
	- it will check for it in local storage and send it also call BlueKai again for the data
- If visitor profile data has been returned:
	- it will parse that
- Whenever BlueKai profile data is found:
	- it will store it for reference in localstorage (and a first party cookie if configured to)
	- it will call send the data to the third party system
	- If the data has already been send to the third party system, it won't do it again
- Use the debugging to check the workflow

 */

window.bk_so_integration = window.bk_so_integration || {};
window.bk_so_integration.functions = window.bk_so_integration.functions || {};
window.bk_so_integration.data = window.bk_so_integration.data || {};
window.bk_so_integration.config = window.bk_so_integration.config || {};

// CONFIG : EDIT THIS PART

// BlueKai Config
window.bk_so_integration.config.bluekai_jsonreturn_id = "39538"; // replace with your JSON Return Container ID
window.bk_so_integration.config.wait_in_ms = 5000; // How long to wait before asking BlueKai for the latest categories and firing data to third party (default 5000ms)
window.bk_so_integration.config.include_audience_names = true; // Set to false to not share audience names to any vendors
window.bk_so_integration.config.enable_cookie = false; // Shares BlueKai data in 1st party cookies (URL encoded)

// Vendor code : Adobe Target
window.bk_so_integration.config.enable_adobetarget = true; // set to true to enable integration
window.bk_so_integration.config.adobe_company = "oracleexchangepartne"; // set to company name (usually in COMPANYNAMEHERE.tt.omtrdc.net in mbox code)

// Vendor code : DFP
window.bk_so_integration.config.enable_dfp = false; // set to true to enable integration

// Vendor code : Optimizely X
window.bk_so_integration.config.enable_optimizely = false; // set to true to enable integration

// Vendor code : Google Optimize
window.bk_so_integration.config.enable_google_optimize = false; // set to true to enable integration

/*
 * ##########################################################################################
 * DO NOT EDIT BELOW THIS LINE
 * ##########################################################################################
 */

// FUNCTION : Local Storage Send
bk_so_integration.functions.localstorage_cookie_sender = function(data, name_of_var) {

	// Set data in first-party cookie if required
	if(window.bk_so_integration.config.enable_cookie || window.bk_so_integration.config.enable_google_optimize){

		// encode cookie value if sending audience names
		var cookie_data = (name_of_var === "bk_audience_names") ? encodeURIComponent(data).replace(/'/g,"%27").replace(/"/g,"%22") : data; 

		document.cookie = name_of_var + "=" + cookie_data + ";path=/;domain=" +
		document.domain + ";expires=Thu, 31 Dec 2099 00:00:00 GMT";

		bk_so_integration.functions.logger("COOKIES : storing '" + JSON.stringify(cookie_data) + "' as '" + name_of_var
				+ "' cookie");
	}
	
	if (typeof (Storage) !== "undefined") {

		bk_so_integration.functions.logger("LOCAL STORAGE : storing '" + JSON.stringify(data) + "' as '" + name_of_var
				+ "' in local storage");
		localStorage.setItem(name_of_var, JSON.stringify(data));

	} else {

		bk_so_integration.functions.logger("LOCAL STORAGE : SEND DATA : HTML 5 NOT SUPPORTED");
		return "no storage"; // HTML 5 NOT SUPPORTED
	}

}

// FUNCTION : Local Storage Retrieve
bk_so_integration.functions.localstorage_retriever = function(name_of_var) {

	if (typeof (Storage) !== "undefined") {

		var result = JSON.parse(localStorage.getItem(name_of_var));
		if (!result) {
			bk_so_integration.functions.logger("Local Storage : no " + name_of_var
					+ " values available in local storage. Setting to empty array.");
			return [];
		}
		bk_so_integration.functions.logger("Local Storage : Retrieved following '" + name_of_var
				+ "' from local storage : " + result);
		return result;
	}

}

// FUNCTION : Local Storage fallback
bk_so_integration.functions.localstorage_fallback = function() {

	bk_so_integration.functions.logger("Local Storage : attempting fallback");

	// category IDs
	if (typeof (Storage) !== "undefined") {

		window.bk_so_integration.data.bk_category_ids = bk_so_integration.functions
				.localstorage_retriever("bk_cat_ids");
		window.bk_so_integration.data.bk_campaign_ids = bk_so_integration.functions
				.localstorage_retriever("bk_campaign_ids");
		if (window.bk_so_integration.config.include_audience_names) {
			window.bk_so_integration.data.bk_audience_names = bk_so_integration.functions
					.localstorage_retriever("bk_audience_names");
		}

		// Send data to DFP
		bk_so_integration.functions.sendTargets();
	} else {
		bk_so_integration.functions.logger("LOCAL STORAGE : SEND DATA : HTML 5 NOT SUPPORTED");
		return "no storage"; // HTML 5 NOT SUPPORTED
	}
}

bk_so_integration.functions.logger = function(message, attribute_object) {

	if (document.location.href.indexOf('bk_so_logger=true') > -1) {

		// session cookie
		document.cookie = "bk_so_logger=" + "true" + ";path=/;domain=" + document.domain + ";expires=";
	}

	if (document.cookie.indexOf('bk_so_logger=true') > -1) {

		if (typeof attribute_object === "undefined") {
			console.log("BLUEKAI SO : " + message);
		} else {
			for (varName in attribute_object) {
				console.log("BLUEKAI SO : " + message + varName + "=" + attribute_object[varName]);
			}
		}
	}

};

bk_so_integration.functions.arrayAddUnique = function(array, entry) {
	if (array.indexOf(entry) < 0) {
		array.push(entry);
	}

}

// FUNCTION : Parse BlueKai data and send to DFP
bk_so_integration.functions.parseBkResults = function() {

	// Parse BlueKai Campaign Results
	window.bk_so_integration.data.bk_category_ids = [];
	window.bk_so_integration.data.bk_campaign_ids = [];
	window.bk_so_integration.data.bk_audience_names = [];

	if (typeof (bk_results) != "undefined") {

		if (typeof (bk_results.campaigns[0]) != "undefined") {

			bk_so_integration.functions.logger("'bk_results' object found");

			for (var i = 0; i < bk_results.campaigns.length; i++) {

				var campaignId = bk_results.campaigns[i].campaign

				bk_so_integration.functions.arrayAddUnique(window.bk_so_integration.data.bk_campaign_ids, campaignId);

				if (window.bk_so_integration.config.include_audience_names) {

					var audience_name = bk_results.campaigns[i].BkDmpAudienceName;

					if (typeof (audience_name) != "undefined") {
						audience_name = decodeURIComponent(audience_name.replace(/\+/g,  " ")); // decode URI
						bk_so_integration.functions.logger("Audience name found: " + audience_name);
						bk_so_integration.functions.arrayAddUnique(window.bk_so_integration.data.bk_audience_names,
								audience_name)
					}

				}
				for (var j = 0; j < bk_results.campaigns[i].categories.length; j++) {

					if (typeof (bk_results.campaigns[i].categories[j].categoryID) != "undefined") {

						var categoryId = bk_results.campaigns[i].categories[j].categoryID;

						bk_so_integration.functions.arrayAddUnique(window.bk_so_integration.data.bk_category_ids,
								categoryId);

					}
				}
			}

			// Send data to Local Storage
			bk_so_integration.functions
					.localstorage_cookie_sender(window.bk_so_integration.data.bk_category_ids, "bk_cat_ids");
			bk_so_integration.functions.localstorage_cookie_sender(window.bk_so_integration.data.bk_campaign_ids,
					"bk_campaign_ids");
			if (window.bk_so_integration.config.include_audience_names) {
				bk_so_integration.functions.localstorage_cookie_sender(window.bk_so_integration.data.bk_audience_names,
						"bk_audience_names");
			}

			// Send data to DFP
			bk_so_integration.functions.sendTargets();

		} else {

			bk_so_integration.functions.logger("No campaigns object");
		}
	}
}

bk_so_integration.functions.sendTargets = function() {

	bk_so_integration.functions.logger("Determine target systems to send data");

	if (window.bk_so_integration.config.enable_dfp) {		
		bk_so_integration.functions.sendDFP();
	}

	if (window.bk_so_integration.config.enable_adobetarget) {		
		bk_so_integration.functions.sendATT();
	}

}

/*
 * ##########################################################################################
 * DFP CODE
 * ##########################################################################################
 */

// Log config set up quickly



bk_so_integration.functions.sendDFP = function() {

	if (!window.bk_so_integration.data.so_sent) {

		var googletag = googletag || {};
		googletag.cmd = googletag.cmd || [];

		// Surface attributes to DFP
		googletag.cmd
				.push(function() {

					googletag.pubads().setTargeting('bk_campids', window.bk_so_integration.data.bk_campaign_ids);
					bk_so_integration.functions
							.logger("DFP SEND : EXECUTED : Declared Targeting Parameter 'bk_campids' with following array : "
									+ window.bk_so_integration.data.bk_campaign_ids + " (see syntax below)");
					bk_so_integration.functions
							.logger("DFP SEND : EXECUTED : Syntax 'googletag.pubads().setTargeting('bk_campids', window.bk_so_integration.data.bk_campaign_ids);'");
					googletag.pubads().setTargeting('bk_catids', window.bk_so_integration.data.bk_category_ids);
					bk_so_integration.functions
							.logger("DFP SEND : EXECUTED : Declared Targeting Parameter 'bk_catids' with following array : "
									+ window.bk_so_integration.data.bk_category_ids + " (see syntax below)");
					bk_so_integration.functions
							.logger("DFP SEND : EXECUTED : Syntax 'googletag.pubads().setTargeting('bk_campids', window.bk_so_integration.data.bk_category_ids);'");
				});

		window.bk_so_integration.data.so_sent = true; // flag so data not send
		// twice

		bk_so_integration.functions
				.logger("DFP SEND : QUEUED : Declared Targeting Parameter 'bk_campids' with following array : "
						+ window.bk_so_integration.data.bk_campaign_ids + " (see syntax below)");
		bk_so_integration.functions
				.logger("DFP SEND : QUEUED : Syntax 'googletag.pubads().setTargeting('bk_campids', window.bk_so_integration.data.bk_campaign_ids);'");
		bk_so_integration.functions
				.logger("DFP SEND : QUEUED : Declared Targeting Parameter 'bk_catids' with following array : "
						+ window.bk_so_integration.data.bk_category_ids + " (see syntax below)");
		bk_so_integration.functions
				.logger("DFP SEND : QUEUED : Syntax 'googletag.pubads().setTargeting('bk_campids', window.bk_so_integration.data.bk_category_ids);'");

	} else {

		bk_so_integration.functions.logger("DFP SEND : NOT SENT : data already declared");

	}
	;
}

/*
 * ##########################################################################################
 * ADOBE TEST AND TARGET CODE
 * ##########################################################################################
 */

bk_so_integration.functions.sendATT = function() {

	// Parse BlueKai Campaign Results
	window.bk_so_integration.data.insertProfileBKCamps = ("profile.bkCampaignIds=|" + window.bk_so_integration.data.bk_campaign_ids 
			.join("|") + "|");
	window.bk_so_integration.data.insertProfileBKCatIds = ("profile.bkCategoryIds=|" + window.bk_so_integration.data.bk_category_ids
			.join("|")  + "|");
	if (window.bk_so_integration.config.include_audience_names) {
		window.bk_so_integration.data.insertProfileBKAudienceNames = ("profile.bkAudienceNames=|" + window.bk_so_integration.data.bk_audience_names
				.join("|") + "|");
	}

	var img_url = "//" + window.bk_so_integration.config.adobe_company + ".tt.omtrdc.net/m2/"
			+ window.bk_so_integration.config.adobe_company + "/ubox/image?mbox=bk_data_feed&"
			+ window.bk_so_integration.data.insertProfileBKCamps + "&"
			+ window.bk_so_integration.data.insertProfileBKCatIds + "&";
	if (window.bk_so_integration.config.include_audience_names) {

		img_url = img_url + window.bk_so_integration.data.insertProfileBKAudienceNames;
	}

	img_url = img_url + "&mboxDefault\x3d//tags.bkrtx.com/1x1.gif";

	// Parse BlueKai Campaign Results
	(new Image).src = img_url;

	bk_so_integration.functions.logger("BLUEKAI ADOBE TARGET : Profile Pixel fired");
	bk_so_integration.functions.logger("BLUEKAI ADOBE TARGET : Pixel URL: " + img_url);

}

// FUNCTION : Call BlueKai
bk_so_integration.functions.callBlueKai = function(bluekai_jsonreturn_id) {
	1
	// Check if JSON return tag and bk_results already there
	if ((window.bk_results)
			&& (document.head && document.head.innerHTML.indexOf(bluekai_jsonreturn_id + '?ret=js') > -1)
			|| (document.body && document.body.innerHTML.indexOf(bluekai_jsonreturn_id + '?ret=js') > -1)) {

		bk_so_integration.functions.logger("JSON Return tag found");
		bk_so_integration.functions.logger("Parsing 'bk_results' directly");
		bk_so_integration.functions.parseBkResults(); // Parse results (don't
		// call JSON ret tag)

	} else {

		bk_so_integration.functions.logger("JSON Return tag NOT found");
		bk_so_integration.functions.localstorage_fallback(); // Grab from
		// local storage
		bk_so_integration.functions.logger("Waiting " + window.bk_so_integration.config.wait_in_ms
				+ "ms before calling JSON Return Tag");

		setTimeout(function() {

			bk_so_integration.functions.logger("Calling JSON Return tag");
			var bk_json_ret = document.createElement("script");
			bk_json_ret.type = "text/javascript";
			bk_json_ret.onload = function() {
				bk_so_integration.functions.logger("JSON Return tag loaded");
				bk_so_integration.functions.logger("Parsing 'bk_results'");
				bk_so_integration.functions.parseBkResults(); // Parse results
			};
			bk_so_integration.functions.parseBkResults(); // Parse results
			bk_json_ret.src = "//tags.bluekai.com/site/" + bluekai_jsonreturn_id
					+ "?ret=js&limit=1&phint=integration=so";

			document.head.appendChild(bk_json_ret);

		}, window.bk_so_integration.config.wait_in_ms);
	}
};

// CONFIG LOGGING : Loop through config and log
for (configs in window.bk_so_integration.config){

	bk_so_integration.functions.logger("CONFIG : " + configs + " = " + window.bk_so_integration.config[configs]);

}

// RUN CODE
bk_so_integration.functions.callBlueKai(window.bk_so_integration.config.bluekai_jsonreturn_id);

