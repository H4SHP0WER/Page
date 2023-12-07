/*!
 * jQuery Form Plugin
 * version: 4.3.0
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
!(function (r) {
  "function" == typeof define && define.amd
    ? define(["jquery"], r)
    : "object" == typeof module && module.exports
    ? (module.exports = function (e, t) {
        return (
          void 0 === t &&
            (t =
              "undefined" != typeof window
                ? require("jquery")
                : require("jquery")(e)),
          r(t),
          t
        );
      })
    : r(jQuery);
})(function (q) {
  "use strict";
  var m = /\r?\n/g,
    S = {};
  (S.fileapi = void 0 !== q('<input type="file">').get(0).files),
    (S.formdata = void 0 !== window.FormData);
  var _ = !!q.fn.prop;
  function o(e) {
    var t = e.data;
    e.isDefaultPrevented() ||
      (e.preventDefault(), q(e.target).closest("form").ajaxSubmit(t));
  }
  function i(e) {
    var t = e.target,
      r = q(t);
    if (!r.is("[type=submit],[type=image]")) {
      var a = r.closest("[type=submit]");
      if (0 === a.length) return;
      t = a[0];
    }
    var n,
      o = t.form;
    "image" === (o.clk = t).type &&
      (void 0 !== e.offsetX
        ? ((o.clk_x = e.offsetX), (o.clk_y = e.offsetY))
        : "function" == typeof q.fn.offset
        ? ((n = r.offset()),
          (o.clk_x = e.pageX - n.left),
          (o.clk_y = e.pageY - n.top))
        : ((o.clk_x = e.pageX - t.offsetLeft),
          (o.clk_y = e.pageY - t.offsetTop))),
      setTimeout(function () {
        o.clk = o.clk_x = o.clk_y = null;
      }, 100);
  }
  function N() {
    var e;
    q.fn.ajaxSubmit.debug &&
      ((e = "[jquery.form] " + Array.prototype.join.call(arguments, "")),
      window.console && window.console.log
        ? window.console.log(e)
        : window.opera && window.opera.postError && window.opera.postError(e));
  }
  (q.fn.attr2 = function () {
    if (!_) return this.attr.apply(this, arguments);
    var e = this.prop.apply(this, arguments);
    return (e && e.jquery) || "string" == typeof e
      ? e
      : this.attr.apply(this, arguments);
  }),
    (q.fn.ajaxSubmit = function (M, e, t, r) {
      if (!this.length)
        return (
          N("ajaxSubmit: skipping submit process - no element selected"), this
        );
      var O,
        a,
        n,
        o,
        X = this;
      "function" == typeof M
        ? (M = { success: M })
        : "string" == typeof M || (!1 === M && 0 < arguments.length)
        ? ((M = { url: M, data: e, dataType: t }),
          "function" == typeof r && (M.success = r))
        : void 0 === M && (M = {}),
        (O = M.method || M.type || this.attr2("method")),
        (n =
          (n =
            (n =
              "string" == typeof (a = M.url || this.attr2("action"))
                ? q.trim(a)
                : "") ||
            window.location.href ||
            "") && (n.match(/^([^#]+)/) || [])[1]),
        (o =
          /(MSIE|Trident)/.test(navigator.userAgent || "") &&
          /^https/i.test(window.location.href || "")
            ? "javascript:false"
            : "about:blank"),
        (M = q.extend(
          !0,
          {
            url: n,
            success: q.ajaxSettings.success,
            type: O || q.ajaxSettings.type,
            iframeSrc: o,
          },
          M
        ));
      var i = {};
      if ((this.trigger("form-pre-serialize", [this, M, i]), i.veto))
        return (
          N("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this
        );
      if (M.beforeSerialize && !1 === M.beforeSerialize(this, M))
        return (
          N("ajaxSubmit: submit aborted via beforeSerialize callback"), this
        );
      var s = M.traditional;
      void 0 === s && (s = q.ajaxSettings.traditional);
      var u,
        c,
        C = [],
        l = this.formToArray(M.semantic, C, M.filtering);
      if (
        (M.data &&
          ((c = q.isFunction(M.data) ? M.data(l) : M.data),
          (M.extraData = c),
          (u = q.param(c, s))),
        M.beforeSubmit && !1 === M.beforeSubmit(l, this, M))
      )
        return N("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
      if ((this.trigger("form-submit-validate", [l, this, M, i]), i.veto))
        return (
          N("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this
        );
      var f = q.param(l, s);
      u && (f = f ? f + "&" + u : u),
        "GET" === M.type.toUpperCase()
          ? ((M.url += (0 <= M.url.indexOf("?") ? "&" : "?") + f),
            (M.data = null))
          : (M.data = f);
      var d,
        m,
        p,
        h = [];
      M.resetForm &&
        h.push(function () {
          X.resetForm();
        }),
        M.clearForm &&
          h.push(function () {
            X.clearForm(M.includeHidden);
          }),
        !M.dataType && M.target
          ? ((d = M.success || function () {}),
            h.push(function (e, t, r) {
              var a = arguments,
                n = M.replaceTarget ? "replaceWith" : "html";
              q(M.target)
                [n](e)
                .each(function () {
                  d.apply(this, a);
                });
            }))
          : M.success &&
            (q.isArray(M.success) ? q.merge(h, M.success) : h.push(M.success)),
        (M.success = function (e, t, r) {
          for (var a = M.context || this, n = 0, o = h.length; n < o; n++)
            h[n].apply(a, [e, t, r || X, X]);
        }),
        M.error &&
          ((m = M.error),
          (M.error = function (e, t, r) {
            var a = M.context || this;
            m.apply(a, [e, t, r, X]);
          })),
        M.complete &&
          ((p = M.complete),
          (M.complete = function (e, t) {
            var r = M.context || this;
            p.apply(r, [e, t, X]);
          }));
      var v =
          0 <
          q("input[type=file]:enabled", this).filter(function () {
            return "" !== q(this).val();
          }).length,
        g = "multipart/form-data",
        x = X.attr("enctype") === g || X.attr("encoding") === g,
        y = S.fileapi && S.formdata;
      N("fileAPI :" + y);
      var b,
        T = (v || x) && !y;
      !1 !== M.iframe && (M.iframe || T)
        ? M.closeKeepAlive
          ? q.get(M.closeKeepAlive, function () {
              b = w(l);
            })
          : (b = w(l))
        : (b =
            (v || x) && y
              ? (function (e) {
                  for (var r = new FormData(), t = 0; t < e.length; t++)
                    r.append(e[t].name, e[t].value);
                  if (M.extraData) {
                    var a = (function (e) {
                      var t,
                        r,
                        a = q.param(e, M.traditional).split("&"),
                        n = a.length,
                        o = [];
                      for (t = 0; t < n; t++)
                        (a[t] = a[t].replace(/\+/g, " ")),
                          (r = a[t].split("=")),
                          o.push([
                            decodeURIComponent(r[0]),
                            decodeURIComponent(r[1]),
                          ]);
                      return o;
                    })(M.extraData);
                    for (t = 0; t < a.length; t++)
                      a[t] && r.append(a[t][0], a[t][1]);
                  }
                  M.data = null;
                  var n = q.extend(!0, {}, q.ajaxSettings, M, {
                    contentType: !1,
                    processData: !1,
                    cache: !1,
                    type: O || "POST",
                  });
                  M.uploadProgress &&
                    (n.xhr = function () {
                      var e = q.ajaxSettings.xhr();
                      return (
                        e.upload &&
                          e.upload.addEventListener(
                            "progress",
                            function (e) {
                              var t = 0,
                                r = e.loaded || e.position,
                                a = e.total;
                              e.lengthComputable &&
                                (t = Math.ceil((r / a) * 100)),
                                M.uploadProgress(e, r, a, t);
                            },
                            !1
                          ),
                        e
                      );
                    });
                  n.data = null;
                  var o = n.beforeSend;
                  return (
                    (n.beforeSend = function (e, t) {
                      M.formData ? (t.data = M.formData) : (t.data = r),
                        o && o.call(this, e, t);
                    }),
                    q.ajax(n)
                  );
                })(l)
              : q.ajax(M)),
        X.removeData("jqxhr").data("jqxhr", b);
      for (var j = 0; j < C.length; j++) C[j] = null;
      return this.trigger("form-submit-notify", [this, M]), this;
      function w(e) {
        var t,
          r,
          l,
          f,
          o,
          d,
          m,
          p,
          a,
          n,
          h,
          v,
          i = X[0],
          g = q.Deferred();
        if (
          ((g.abort = function (e) {
            p.abort(e);
          }),
          e)
        )
          for (r = 0; r < C.length; r++)
            (t = q(C[r])),
              _ ? t.prop("disabled", !1) : t.removeAttr("disabled");
        ((l = q.extend(!0, {}, q.ajaxSettings, M)).context = l.context || l),
          (o = "jqFormIO" + new Date().getTime());
        var s = i.ownerDocument,
          u = X.closest("body");
        if (
          (l.iframeTarget
            ? (n = (d = q(l.iframeTarget, s)).attr2("name"))
              ? (o = n)
              : d.attr2("name", o)
            : (d = q(
                '<iframe name="' + o + '" src="' + l.iframeSrc + '" />',
                s
              )).css({ position: "absolute", top: "-1000px", left: "-1000px" }),
          (m = d[0]),
          (p = {
            aborted: 0,
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: "n/a",
            getAllResponseHeaders: function () {},
            getResponseHeader: function () {},
            setRequestHeader: function () {},
            abort: function (e) {
              var t = "timeout" === e ? "timeout" : "aborted";
              N("aborting upload... " + t), (this.aborted = 1);
              try {
                m.contentWindow.document.execCommand &&
                  m.contentWindow.document.execCommand("Stop");
              } catch (e) {}
              d.attr("src", l.iframeSrc),
                (p.error = t),
                l.error && l.error.call(l.context, p, t, e),
                f && q.event.trigger("ajaxError", [p, l, t]),
                l.complete && l.complete.call(l.context, p, t);
            },
          }),
          (f = l.global) && 0 == q.active++ && q.event.trigger("ajaxStart"),
          f && q.event.trigger("ajaxSend", [p, l]),
          l.beforeSend && !1 === l.beforeSend.call(l.context, p, l))
        )
          return l.global && q.active--, g.reject(), g;
        if (p.aborted) return g.reject(), g;
        (a = i.clk) &&
          (n = a.name) &&
          !a.disabled &&
          ((l.extraData = l.extraData || {}),
          (l.extraData[n] = a.value),
          "image" === a.type &&
            ((l.extraData[n + ".x"] = i.clk_x),
            (l.extraData[n + ".y"] = i.clk_y)));
        var x = 1,
          y = 2;
        function b(t) {
          var r = null;
          try {
            t.contentWindow && (r = t.contentWindow.document);
          } catch (e) {
            N("cannot get iframe.contentWindow document: " + e);
          }
          if (r) return r;
          try {
            r = t.contentDocument ? t.contentDocument : t.document;
          } catch (e) {
            N("cannot get iframe.contentDocument: " + e), (r = t.document);
          }
          return r;
        }
        var c = q("meta[name=csrf-token]").attr("content"),
          T = q("meta[name=csrf-param]").attr("content");
        function j() {
          var e = X.attr2("target"),
            t = X.attr2("action"),
            r =
              X.attr("enctype") || X.attr("encoding") || "multipart/form-data";
          i.setAttribute("target", o),
            (O && !/post/i.test(O)) || i.setAttribute("method", "POST"),
            t !== l.url && i.setAttribute("action", l.url),
            l.skipEncodingOverride ||
              (O && !/post/i.test(O)) ||
              X.attr({
                encoding: "multipart/form-data",
                enctype: "multipart/form-data",
              }),
            l.timeout &&
              (v = setTimeout(function () {
                (h = !0), A(x);
              }, l.timeout));
          var a = [];
          try {
            if (l.extraData)
              for (var n in l.extraData)
                l.extraData.hasOwnProperty(n) &&
                  (q.isPlainObject(l.extraData[n]) &&
                  l.extraData[n].hasOwnProperty("name") &&
                  l.extraData[n].hasOwnProperty("value")
                    ? a.push(
                        q(
                          '<input type="hidden" name="' +
                            l.extraData[n].name +
                            '">',
                          s
                        )
                          .val(l.extraData[n].value)
                          .appendTo(i)[0]
                      )
                    : a.push(
                        q('<input type="hidden" name="' + n + '">', s)
                          .val(l.extraData[n])
                          .appendTo(i)[0]
                      ));
            l.iframeTarget || d.appendTo(u),
              m.attachEvent
                ? m.attachEvent("onload", A)
                : m.addEventListener("load", A, !1),
              setTimeout(function e() {
                try {
                  var t = b(m).readyState;
                  N("state = " + t),
                    t &&
                      "uninitialized" === t.toLowerCase() &&
                      setTimeout(e, 50);
                } catch (e) {
                  N("Server abort: ", e, " (", e.name, ")"),
                    A(y),
                    v && clearTimeout(v),
                    (v = void 0);
                }
              }, 15);
            try {
              i.submit();
            } catch (e) {
              document.createElement("form").submit.apply(i);
            }
          } finally {
            i.setAttribute("action", t),
              i.setAttribute("enctype", r),
              e ? i.setAttribute("target", e) : X.removeAttr("target"),
              q(a).remove();
          }
        }
        T && c && ((l.extraData = l.extraData || {}), (l.extraData[T] = c)),
          l.forceSync ? j() : setTimeout(j, 10);
        var w,
          S,
          k,
          D = 50;
        function A(e) {
          if (!p.aborted && !k) {
            if (
              ((S = b(m)) || (N("cannot access response document"), (e = y)),
              e === x && p)
            )
              return p.abort("timeout"), void g.reject(p, "timeout");
            if (e === y && p)
              return (
                p.abort("server abort"),
                void g.reject(p, "error", "server abort")
              );
            if ((S && S.location.href !== l.iframeSrc) || h) {
              m.detachEvent
                ? m.detachEvent("onload", A)
                : m.removeEventListener("load", A, !1);
              var t,
                r = "success";
              try {
                if (h) throw "timeout";
                var a = "xml" === l.dataType || S.XMLDocument || q.isXMLDoc(S);
                if (
                  (N("isXml=" + a),
                  !a &&
                    window.opera &&
                    (null === S.body || !S.body.innerHTML) &&
                    --D)
                )
                  return (
                    N("requeing onLoad callback, DOM not available"),
                    void setTimeout(A, 250)
                  );
                var n = S.body ? S.body : S.documentElement;
                (p.responseText = n ? n.innerHTML : null),
                  (p.responseXML = S.XMLDocument ? S.XMLDocument : S),
                  a && (l.dataType = "xml"),
                  (p.getResponseHeader = function (e) {
                    return { "content-type": l.dataType }[e.toLowerCase()];
                  }),
                  n &&
                    ((p.status = Number(n.getAttribute("status")) || p.status),
                    (p.statusText =
                      n.getAttribute("statusText") || p.statusText));
                var o,
                  i,
                  s,
                  u = (l.dataType || "").toLowerCase(),
                  c = /(json|script|text)/.test(u);
                c || l.textarea
                  ? (o = S.getElementsByTagName("textarea")[0])
                    ? ((p.responseText = o.value),
                      (p.status = Number(o.getAttribute("status")) || p.status),
                      (p.statusText =
                        o.getAttribute("statusText") || p.statusText))
                    : c &&
                      ((i = S.getElementsByTagName("pre")[0]),
                      (s = S.getElementsByTagName("body")[0]),
                      i
                        ? (p.responseText = i.textContent
                            ? i.textContent
                            : i.innerText)
                        : s &&
                          (p.responseText = s.textContent
                            ? s.textContent
                            : s.innerText))
                  : "xml" === u &&
                    !p.responseXML &&
                    p.responseText &&
                    (p.responseXML = F(p.responseText));
                try {
                  w = E(p, u, l);
                } catch (e) {
                  (r = "parsererror"), (p.error = t = e || r);
                }
              } catch (e) {
                N("error caught: ", e), (r = "error"), (p.error = t = e || r);
              }
              p.aborted && (N("upload aborted"), (r = null)),
                p.status &&
                  (r =
                    (200 <= p.status && p.status < 300) || 304 === p.status
                      ? "success"
                      : "error"),
                "success" === r
                  ? (l.success && l.success.call(l.context, w, "success", p),
                    g.resolve(p.responseText, "success", p),
                    f && q.event.trigger("ajaxSuccess", [p, l]))
                  : r &&
                    (void 0 === t && (t = p.statusText),
                    l.error && l.error.call(l.context, p, r, t),
                    g.reject(p, "error", t),
                    f && q.event.trigger("ajaxError", [p, l, t])),
                f && q.event.trigger("ajaxComplete", [p, l]),
                f && !--q.active && q.event.trigger("ajaxStop"),
                l.complete && l.complete.call(l.context, p, r),
                (k = !0),
                l.timeout && clearTimeout(v),
                setTimeout(function () {
                  l.iframeTarget ? d.attr("src", l.iframeSrc) : d.remove(),
                    (p.responseXML = null);
                }, 100);
            }
          }
        }
        var F =
            q.parseXML ||
            function (e, t) {
              return (
                window.ActiveXObject
                  ? (((t = new ActiveXObject("Microsoft.XMLDOM")).async =
                      "false"),
                    t.loadXML(e))
                  : (t = new DOMParser().parseFromString(e, "text/xml")),
                t &&
                t.documentElement &&
                "parsererror" !== t.documentElement.nodeName
                  ? t
                  : null
              );
            },
          L =
            q.parseJSON ||
            function (e) {
              return window.eval("(" + e + ")");
            },
          E = function (e, t, r) {
            var a = e.getResponseHeader("content-type") || "",
              n = ("xml" === t || !t) && 0 <= a.indexOf("xml"),
              o = n ? e.responseXML : e.responseText;
            return (
              n &&
                "parsererror" === o.documentElement.nodeName &&
                q.error &&
                q.error("parsererror"),
              r && r.dataFilter && (o = r.dataFilter(o, t)),
              "string" == typeof o &&
                (("json" === t || !t) && 0 <= a.indexOf("json")
                  ? (o = L(o))
                  : ("script" === t || !t) &&
                    0 <= a.indexOf("javascript") &&
                    q.globalEval(o)),
              o
            );
          };
        return g;
      }
    }),
    (q.fn.ajaxForm = function (e, t, r, a) {
      if (
        (("string" == typeof e || (!1 === e && 0 < arguments.length)) &&
          ((e = { url: e, data: t, dataType: r }),
          "function" == typeof a && (e.success = a)),
        ((e = e || {}).delegation = e.delegation && q.isFunction(q.fn.on)),
        e.delegation || 0 !== this.length)
      )
        return e.delegation
          ? (q(document)
              .off("submit.form-plugin", this.selector, o)
              .off("click.form-plugin", this.selector, i)
              .on("submit.form-plugin", this.selector, e, o)
              .on("click.form-plugin", this.selector, e, i),
            this)
          : (e.beforeFormUnbind && e.beforeFormUnbind(this, e),
            this.ajaxFormUnbind()
              .on("submit.form-plugin", e, o)
              .on("click.form-plugin", e, i));
      var n = { s: this.selector, c: this.context };
      return (
        !q.isReady && n.s
          ? (N("DOM not ready, queuing ajaxForm"),
            q(function () {
              q(n.s, n.c).ajaxForm(e);
            }))
          : N(
              "terminating; zero elements found by selector" +
                (q.isReady ? "" : " (DOM not ready)")
            ),
        this
      );
    }),
    (q.fn.ajaxFormUnbind = function () {
      return this.off("submit.form-plugin click.form-plugin");
    }),
    (q.fn.formToArray = function (e, t, r) {
      var a = [];
      if (0 === this.length) return a;
      var n,
        o,
        i,
        s,
        u,
        c,
        l,
        f,
        d,
        m,
        p = this[0],
        h = this.attr("id"),
        v =
          (v =
            e || void 0 === p.elements
              ? p.getElementsByTagName("*")
              : p.elements) && q.makeArray(v);
      if (
        (h &&
          (e || /(Edge|Trident)\//.test(navigator.userAgent)) &&
          (n = q(':input[form="' + h + '"]').get()).length &&
          (v = (v || []).concat(n)),
        !v || !v.length)
      )
        return a;
      for (
        q.isFunction(r) && (v = q.map(v, r)), o = 0, c = v.length;
        o < c;
        o++
      )
        if ((m = (u = v[o]).name) && !u.disabled)
          if (e && p.clk && "image" === u.type)
            p.clk === u &&
              (a.push({ name: m, value: q(u).val(), type: u.type }),
              a.push(
                { name: m + ".x", value: p.clk_x },
                { name: m + ".y", value: p.clk_y }
              ));
          else if ((s = q.fieldValue(u, !0)) && s.constructor === Array)
            for (t && t.push(u), i = 0, l = s.length; i < l; i++)
              a.push({ name: m, value: s[i] });
          else if (S.fileapi && "file" === u.type) {
            t && t.push(u);
            var g = u.files;
            if (g.length)
              for (i = 0; i < g.length; i++)
                a.push({ name: m, value: g[i], type: u.type });
            else a.push({ name: m, value: "", type: u.type });
          } else
            null != s &&
              (t && t.push(u),
              a.push({
                name: m,
                value: s,
                type: u.type,
                required: u.required,
              }));
      return (
        e ||
          !p.clk ||
          ((m = (d = (f = q(p.clk))[0]).name) &&
            !d.disabled &&
            "image" === d.type &&
            (a.push({ name: m, value: f.val() }),
            a.push(
              { name: m + ".x", value: p.clk_x },
              { name: m + ".y", value: p.clk_y }
            ))),
        a
      );
    }),
    (q.fn.formSerialize = function (e) {
      return q.param(this.formToArray(e));
    }),
    (q.fn.fieldSerialize = function (n) {
      var o = [];
      return (
        this.each(function () {
          var e = this.name;
          if (e) {
            var t = q.fieldValue(this, n);
            if (t && t.constructor === Array)
              for (var r = 0, a = t.length; r < a; r++)
                o.push({ name: e, value: t[r] });
            else null != t && o.push({ name: this.name, value: t });
          }
        }),
        q.param(o)
      );
    }),
    (q.fn.fieldValue = function (e) {
      for (var t = [], r = 0, a = this.length; r < a; r++) {
        var n = this[r],
          o = q.fieldValue(n, e);
        null == o ||
          (o.constructor === Array && !o.length) ||
          (o.constructor === Array ? q.merge(t, o) : t.push(o));
      }
      return t;
    }),
    (q.fieldValue = function (e, t) {
      var r = e.name,
        a = e.type,
        n = e.tagName.toLowerCase();
      if (
        (void 0 === t && (t = !0),
        t &&
          (!r ||
            e.disabled ||
            "reset" === a ||
            "button" === a ||
            (("checkbox" === a || "radio" === a) && !e.checked) ||
            (("submit" === a || "image" === a) && e.form && e.form.clk !== e) ||
            ("select" === n && -1 === e.selectedIndex)))
      )
        return null;
      if ("select" !== n) return q(e).val().replace(m, "\r\n");
      var o = e.selectedIndex;
      if (o < 0) return null;
      for (
        var i = [],
          s = e.options,
          u = "select-one" === a,
          c = u ? o + 1 : s.length,
          l = u ? o : 0;
        l < c;
        l++
      ) {
        var f = s[l];
        if (f.selected && !f.disabled) {
          var d =
            (d = f.value) ||
            (f.attributes && f.attributes.value && !f.attributes.value.specified
              ? f.text
              : f.value);
          if (u) return d;
          i.push(d);
        }
      }
      return i;
    }),
    (q.fn.clearForm = function (e) {
      return this.each(function () {
        q("input,select,textarea", this).clearFields(e);
      });
    }),
    (q.fn.clearFields = q.fn.clearInputs =
      function (r) {
        var a =
          /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function () {
          var e = this.type,
            t = this.tagName.toLowerCase();
          a.test(e) || "textarea" === t
            ? (this.value = "")
            : "checkbox" === e || "radio" === e
            ? (this.checked = !1)
            : "select" === t
            ? (this.selectedIndex = -1)
            : "file" === e
            ? /MSIE/.test(navigator.userAgent)
              ? q(this).replaceWith(q(this).clone(!0))
              : q(this).val("")
            : r &&
              ((!0 === r && /hidden/.test(e)) ||
                ("string" == typeof r && q(this).is(r))) &&
              (this.value = "");
        });
      }),
    (q.fn.resetForm = function () {
      return this.each(function () {
        var t = q(this),
          e = this.tagName.toLowerCase();
        switch (e) {
          case "input":
            this.checked = this.defaultChecked;
          case "textarea":
            return (this.value = this.defaultValue), !0;
          case "option":
          case "optgroup":
            var r = t.parents("select");
            return (
              r.length && r[0].multiple
                ? "option" === e
                  ? (this.selected = this.defaultSelected)
                  : t.find("option").resetForm()
                : r.resetForm(),
              !0
            );
          case "select":
            return (
              t.find("option").each(function (e) {
                if (
                  ((this.selected = this.defaultSelected),
                  this.defaultSelected && !t[0].multiple)
                )
                  return (t[0].selectedIndex = e), !1;
              }),
              !0
            );
          case "label":
            var a = q(t.attr("for")),
              n = t.find("input,select,textarea");
            return a[0] && n.unshift(a[0]), n.resetForm(), !0;
          case "form":
            return (
              ("function" != typeof this.reset &&
                ("object" != typeof this.reset || this.reset.nodeType)) ||
                this.reset(),
              !0
            );
          default:
            return t.find("form,input,label,select,textarea").resetForm(), !0;
        }
      });
    }),
    (q.fn.enable = function (e) {
      return (
        void 0 === e && (e = !0),
        this.each(function () {
          this.disabled = !e;
        })
      );
    }),
    (q.fn.selected = function (r) {
      return (
        void 0 === r && (r = !0),
        this.each(function () {
          var e,
            t = this.type;
          "checkbox" === t || "radio" === t
            ? (this.checked = r)
            : "option" === this.tagName.toLowerCase() &&
              ((e = q(this).parent("select")),
              r &&
                e[0] &&
                "select-one" === e[0].type &&
                e.find("option").selected(!1),
              (this.selected = r));
        })
      );
    }),
    (q.fn.ajaxSubmit.debug = !1);
});

/**
 * Copyright (c) 2007-2015 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.2
 */
(function (f) {
  "use strict";
  "function" === typeof define && define.amd
    ? define(["jquery"], f)
    : "undefined" !== typeof module && module.exports
    ? (module.exports = f(require("jquery")))
    : f(jQuery);
})(function ($) {
  "use strict";
  function n(a) {
    return (
      !a.nodeName ||
      -1 !==
        $.inArray(a.nodeName.toLowerCase(), [
          "iframe",
          "#document",
          "html",
          "body",
        ])
    );
  }
  function h(a) {
    return $.isFunction(a) || $.isPlainObject(a) ? a : { top: a, left: a };
  }
  var p = ($.scrollTo = function (a, d, b) {
    return $(window).scrollTo(a, d, b);
  });
  p.defaults = { axis: "xy", duration: 0, limit: !0 };
  $.fn.scrollTo = function (a, d, b) {
    "object" === typeof d && ((b = d), (d = 0));
    "function" === typeof b && (b = { onAfter: b });
    "max" === a && (a = 9e9);
    b = $.extend({}, p.defaults, b);
    d = d || b.duration;
    var u = b.queue && 1 < b.axis.length;
    u && (d /= 2);
    b.offset = h(b.offset);
    b.over = h(b.over);
    return this.each(function () {
      function k(a) {
        var k = $.extend({}, b, {
          queue: !0,
          duration: d,
          complete:
            a &&
            function () {
              a.call(q, e, b);
            },
        });
        r.animate(f, k);
      }
      if (null !== a) {
        var l = n(this),
          q = l ? this.contentWindow || window : this,
          r = $(q),
          e = a,
          f = {},
          t;
        switch (typeof e) {
          case "number":
          case "string":
            if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)) {
              e = h(e);
              break;
            }
            e = l ? $(e) : $(e, q);
          case "object":
            if (e.length === 0) return;
            if (e.is || e.style) t = (e = $(e)).offset();
        }
        var v = ($.isFunction(b.offset) && b.offset(q, e)) || b.offset;
        $.each(b.axis.split(""), function (a, c) {
          var d = "x" === c ? "Left" : "Top",
            m = d.toLowerCase(),
            g = "scroll" + d,
            h = r[g](),
            n = p.max(q, c);
          t
            ? ((f[g] = t[m] + (l ? 0 : h - r.offset()[m])),
              b.margin &&
                ((f[g] -= parseInt(e.css("margin" + d), 10) || 0),
                (f[g] -= parseInt(e.css("border" + d + "Width"), 10) || 0)),
              (f[g] += v[m] || 0),
              b.over[m] &&
                (f[g] += e["x" === c ? "width" : "height"]() * b.over[m]))
            : ((d = e[m]),
              (f[g] =
                d.slice && "%" === d.slice(-1)
                  ? (parseFloat(d) / 100) * n
                  : d));
          b.limit &&
            /^\d+$/.test(f[g]) &&
            (f[g] = 0 >= f[g] ? 0 : Math.min(f[g], n));
          !a &&
            1 < b.axis.length &&
            (h === f[g] ? (f = {}) : u && (k(b.onAfterFirst), (f = {})));
        });
        k(b.onAfter);
      }
    });
  };
  p.max = function (a, d) {
    var b = "x" === d ? "Width" : "Height",
      h = "scroll" + b;
    if (!n(a)) return a[h] - $(a)[b.toLowerCase()]();
    var b = "client" + b,
      k = a.ownerDocument || a.document,
      l = k.documentElement,
      k = k.body;
    return Math.max(l[h], k[h]) - Math.min(l[b], k[b]);
  };
  $.Tween.propHooks.scrollLeft = $.Tween.propHooks.scrollTop = {
    get: function (a) {
      return $(a.elem)[a.prop]();
    },
    set: function (a) {
      var d = this.get(a);
      if (a.options.interrupt && a._last && a._last !== d)
        return $(a.elem).stop();
      var b = Math.round(a.now);
      d !== b && ($(a.elem)[a.prop](b), (a._last = this.get(a)));
    },
  };
  return p;
});
/* qtip2 v3.0.4 | Plugins: tips modal viewport svg imagemap ie6 | Styles: core basic css3 | qtip2.com | Licensed MIT | Sun Feb 06 2022 15:22:19 */

!(function (a, b, c) {
  !(function (a) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], a)
      : jQuery && !jQuery.fn.qtip && a(jQuery);
  })(function (d) {
    "use strict";
    function e(a, b, c, e) {
      (this.id = c),
        (this.target = a),
        (this.tooltip = F),
        (this.elements = { target: a }),
        (this._id = S + "-" + c),
        (this.timers = { img: {} }),
        (this.options = b),
        (this.plugins = {}),
        (this.cache = {
          event: {},
          target: d(),
          disabled: E,
          attr: e,
          onTooltip: E,
          lastClass: "",
        }),
        (this.rendered =
          this.destroyed =
          this.disabled =
          this.waiting =
          this.hiddenDuringWait =
          this.positioning =
          this.triggering =
            E);
    }
    function f(a) {
      return a === F || "object" != typeof a;
    }
    function g(a) {
      return !(
        "function" == typeof a ||
        (a && a.attr) ||
        a.length ||
        ("object" == typeof a && null !== a && (a.jquery || a.then))
      );
    }
    function h(a) {
      var b, c, e, h;
      return f(a)
        ? E
        : (f(a.metadata) && (a.metadata = { type: a.metadata }),
          "content" in a &&
            ((b = a.content),
            f(b) || b.jquery || b.done
              ? ((c = g(b) ? E : b), (b = a.content = { text: c }))
              : (c = b.text),
            "ajax" in b &&
              ((e = b.ajax),
              (h = e && e.once !== E),
              delete b.ajax,
              (b.text = function (a, b) {
                var f =
                    c || d(this).attr(b.options.content.attr) || "Loading...",
                  g = d
                    .ajax(d.extend({}, e, { context: b }))
                    .then(e.success, F, e.error)
                    .then(
                      function (a) {
                        return a && h && b.set("content.text", a), a;
                      },
                      function (a, c, d) {
                        b.destroyed ||
                          0 === a.status ||
                          b.set("content.text", c + ": " + d);
                      }
                    );
                return h ? f : (b.set("content.text", f), g);
              })),
            "title" in b &&
              (d.isPlainObject(b.title) &&
                ((b.button = b.title.button), (b.title = b.title.text)),
              g(b.title || E) && (b.title = E))),
          "position" in a &&
            f(a.position) &&
            (a.position = { my: a.position, at: a.position }),
          "show" in a &&
            f(a.show) &&
            (a.show = a.show.jquery
              ? { target: a.show }
              : a.show === D
              ? { ready: D }
              : { event: a.show }),
          "hide" in a &&
            f(a.hide) &&
            (a.hide = a.hide.jquery ? { target: a.hide } : { event: a.hide }),
          "style" in a && f(a.style) && (a.style = { classes: a.style }),
          d.each(R, function () {
            this.sanitize && this.sanitize(a);
          }),
          a);
    }
    function i(a, b) {
      for (var c, d = 0, e = a, f = b.split("."); (e = e[f[d++]]); )
        d < f.length && (c = e);
      return [c || a, f.pop()];
    }
    function j(a, b) {
      var c, d, e;
      for (c in this.checks)
        if (this.checks.hasOwnProperty(c))
          for (d in this.checks[c])
            this.checks[c].hasOwnProperty(d) &&
              (e = new RegExp(d, "i").exec(a)) &&
              (b.push(e),
              ("builtin" === c || this.plugins[c]) &&
                this.checks[c][d].apply(this.plugins[c] || this, b));
    }
    function k(a) {
      return V.concat("").join(a ? "-" + a + " " : " ");
    }
    function l(a, b) {
      return b > 0 ? setTimeout(a.bind(this), b) : void a.call(this);
    }
    function m(a) {
      this.tooltip.hasClass(aa) ||
        (clearTimeout(this.timers.show),
        clearTimeout(this.timers.hide),
        (this.timers.show = l.call(
          this,
          function () {
            this.toggle(D, a);
          },
          this.options.show.delay
        )));
    }
    function n(a) {
      if (!this.tooltip.hasClass(aa) && !this.destroyed) {
        var b = d(a.relatedTarget),
          c = b.closest(W)[0] === this.tooltip[0],
          e = b[0] === this.options.show.target[0];
        if (
          (clearTimeout(this.timers.show),
          clearTimeout(this.timers.hide),
          (this !== b[0] && "mouse" === this.options.position.target && c) ||
            (this.options.hide.fixed &&
              /mouse(out|leave|move)/.test(a.type) &&
              (c || e)))
        )
          try {
            a.preventDefault(), a.stopImmediatePropagation();
          } catch (f) {}
        else
          this.timers.hide = l.call(
            this,
            function () {
              this.toggle(E, a);
            },
            this.options.hide.delay,
            this
          );
      }
    }
    function o(a) {
      !this.tooltip.hasClass(aa) &&
        this.options.hide.inactive &&
        (clearTimeout(this.timers.inactive),
        (this.timers.inactive = l.call(
          this,
          function () {
            this.hide(a);
          },
          this.options.hide.inactive
        )));
    }
    function p(a) {
      this.rendered && this.tooltip[0].offsetWidth > 0 && this.reposition(a);
    }
    function q(a, c, e) {
      d(b.body).on(
        (c.split ? c : c.join("." + S + " ")) + "." + S,
        a,
        function () {
          var a = y.api[d.attr(this, U)];
          a && !a.disabled && e.apply(a, arguments);
        }
      );
    }
    function r(a, c, f) {
      var g,
        i,
        j,
        k,
        l,
        m = d(b.body),
        n = a[0] === b ? m : a,
        o = a.metadata ? a.metadata(f.metadata) : F,
        p = "html5" === f.metadata.type && o ? o[f.metadata.name] : F,
        q = a.data(f.metadata.name || "qtipopts");
      try {
        q = "string" == typeof q ? d.parseJSON(q) : q;
      } catch (r) {}
      if (
        ((k = d.extend(
          D,
          {},
          y.defaults,
          f,
          "object" == typeof q ? h(q) : F,
          h(p || o)
        )),
        (i = k.position),
        (k.id = c),
        "boolean" == typeof k.content.text)
      ) {
        if (((j = a.attr(k.content.attr)), k.content.attr === E || !j))
          return E;
        k.content.text = j;
      }
      if (
        (i.container.length || (i.container = m),
        i.target === E && (i.target = n),
        k.show.target === E && (k.show.target = n),
        k.show.solo === D && (k.show.solo = i.container.closest("body")),
        k.hide.target === E && (k.hide.target = n),
        k.position.viewport === D && (k.position.viewport = i.container),
        (i.container = i.container.eq(0)),
        (i.at = new A(i.at, D)),
        (i.my = new A(i.my)),
        a.data(S))
      )
        if (k.overwrite) a.qtip("destroy", !0);
        else if (k.overwrite === E) return E;
      return (
        a.attr(T, c),
        k.suppress &&
          (l = a.attr("title")) &&
          a.removeAttr("title").attr(ca, l).attr("title", ""),
        (g = new e(a, k, c, !!j)),
        a.data(S, g),
        g
      );
    }
    function s(a) {
      return a.charAt(0).toUpperCase() + a.slice(1);
    }
    function t(a, b) {
      var d,
        e,
        f = b.charAt(0).toUpperCase() + b.slice(1),
        g = (b + " " + va.join(f + " ") + f).split(" "),
        h = 0;
      if (ua[b]) return a.css(ua[b]);
      for (; (d = g[h++]); ) if ((e = a.css(d)) !== c) return (ua[b] = d), e;
    }
    function u(a, b) {
      return Math.ceil(parseFloat(t(a, b)));
    }
    function v(a, b) {
      (this._ns = "tip"),
        (this.options = b),
        (this.offset = b.offset),
        (this.size = [b.width, b.height]),
        (this.qtip = a),
        this.init(a);
    }
    function w(a, b) {
      (this.options = b), (this._ns = "-modal"), (this.qtip = a), this.init(a);
    }
    function x(a) {
      (this._ns = "ie6"), (this.qtip = a), this.init(a);
    }
    var y,
      z,
      A,
      B,
      C,
      D = !0,
      E = !1,
      F = null,
      G = "x",
      H = "y",
      I = "width",
      J = "height",
      K = "top",
      L = "left",
      M = "bottom",
      N = "right",
      O = "center",
      P = "flipinvert",
      Q = "shift",
      R = {},
      S = "qtip",
      T = "data-hasqtip",
      U = "data-qtip-id",
      V = ["ui-widget", "ui-tooltip"],
      W = "." + S,
      X =
        "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(
          " "
        ),
      Y = S + "-fixed",
      Z = S + "-default",
      $ = S + "-focus",
      _ = S + "-hover",
      aa = S + "-disabled",
      ba = "_replacedByqTip",
      ca = "oldtitle",
      da = {
        ie: (function () {
          var a, c;
          for (
            a = 4, c = b.createElement("div");
            (c.innerHTML = "<!--[if gt IE " + a + "]><i></i><![endif]-->") &&
            c.getElementsByTagName("i")[0];
            a += 1
          );
          return a > 4 ? a : NaN;
        })(),
        iOS:
          parseFloat(
            (
              "" +
              (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(
                navigator.userAgent
              ) || [0, ""])[1]
            )
              .replace("undefined", "3_2")
              .replace("_", ".")
              .replace("_", "")
          ) || E,
      };
    (z = e.prototype),
      (z._when = function (a) {
        return d.when.apply(d, a);
      }),
      (z.render = function (a) {
        if (this.rendered || this.destroyed) return this;
        var b = this,
          c = this.options,
          e = this.cache,
          f = this.elements,
          g = c.content.text,
          h = c.content.title,
          i = c.content.button,
          j = c.position,
          k = [];
        return (
          d.attr(this.target[0], "aria-describedby", this._id),
          (e.posClass = this._createPosClass(
            (this.position = { my: j.my, at: j.at }).my
          )),
          (this.tooltip = f.tooltip =
            d("<div/>", {
              id: this._id,
              class: [S, Z, c.style.classes, e.posClass].join(" "),
              width: c.style.width || "",
              height: c.style.height || "",
              tracking: "mouse" === j.target && j.adjust.mouse,
              role: "alert",
              "aria-live": "polite",
              "aria-atomic": E,
              "aria-describedby": this._id + "-content",
              "aria-hidden": D,
            })
              .toggleClass(aa, this.disabled)
              .attr(U, this.id)
              .data(S, this)
              .appendTo(j.container)
              .append(
                (f.content = d("<div />", {
                  class: S + "-content",
                  id: this._id + "-content",
                  "aria-atomic": D,
                }))
              )),
          (this.rendered = -1),
          (this.positioning = D),
          h &&
            (this._createTitle(),
            "function" != typeof h && k.push(this._updateTitle(h, E))),
          i && this._createButton(),
          "function" != typeof g && k.push(this._updateContent(g, E)),
          (this.rendered = D),
          this._setWidget(),
          d.each(R, function (a) {
            var c;
            "render" === this.initialize && (c = this(b)) && (b.plugins[a] = c);
          }),
          this._unassignEvents(),
          this._assignEvents(),
          this._when(k).then(function () {
            b._trigger("render"),
              (b.positioning = E),
              b.hiddenDuringWait ||
                (!c.show.ready && !a) ||
                b.toggle(D, e.event, E),
              (b.hiddenDuringWait = E);
          }),
          (y.api[this.id] = this),
          this
        );
      }),
      (z.destroy = function (a) {
        function b() {
          if (!this.destroyed) {
            this.destroyed = D;
            var a,
              b = this.target,
              c = b.attr(ca);
            this.rendered &&
              this.tooltip.stop(1, 0).find("*").remove().end().remove(),
              d.each(this.plugins, function () {
                this.destroy && this.destroy();
              });
            for (a in this.timers)
              this.timers.hasOwnProperty(a) && clearTimeout(this.timers[a]);
            b
              .removeData(S)
              .removeAttr(U)
              .removeAttr(T)
              .removeAttr("aria-describedby"),
              this.options.suppress && c && b.attr("title", c).removeAttr(ca),
              this._unassignEvents(),
              (this.options =
                this.elements =
                this.cache =
                this.timers =
                this.plugins =
                this.mouse =
                  F),
              delete y.api[this.id];
          }
        }
        return this.destroyed
          ? this.target
          : ((a === D && "hide" !== this.triggering) || !this.rendered
              ? b.call(this)
              : (this.tooltip.one("tooltiphidden", b.bind(this)),
                !this.triggering && this.hide()),
            this.target);
      }),
      (B = z.checks =
        {
          builtin: {
            "^id$": function (a, b, c, e) {
              var f = c === D ? y.nextid : c,
                g = S + "-" + f;
              f !== E && f.length > 0 && !d("#" + g).length
                ? ((this._id = g),
                  this.rendered &&
                    ((this.tooltip[0].id = this._id),
                    (this.elements.content[0].id = this._id + "-content"),
                    (this.elements.title[0].id = this._id + "-title")))
                : (a[b] = e);
            },
            "^prerender": function (a, b, c) {
              c && !this.rendered && this.render(this.options.show.ready);
            },
            "^content.text$": function (a, b, c) {
              this._updateContent(c);
            },
            "^content.attr$": function (a, b, c, d) {
              this.options.content.text === this.target.attr(d) &&
                this._updateContent(this.target.attr(c));
            },
            "^content.title$": function (a, b, c) {
              return c
                ? (c && !this.elements.title && this._createTitle(),
                  void this._updateTitle(c))
                : this._removeTitle();
            },
            "^content.button$": function (a, b, c) {
              this._updateButton(c);
            },
            "^content.title.(text|button)$": function (a, b, c) {
              this.set("content." + b, c);
            },
            "^position.(my|at)$": function (a, b, c) {
              "string" == typeof c &&
                (this.position[b] = a[b] = new A(c, "at" === b));
            },
            "^position.container$": function (a, b, c) {
              this.rendered && this.tooltip.appendTo(c);
            },
            "^show.ready$": function (a, b, c) {
              c && ((!this.rendered && this.render(D)) || this.toggle(D));
            },
            "^style.classes$": function (a, b, c, d) {
              this.rendered && this.tooltip.removeClass(d).addClass(c);
            },
            "^style.(width|height)": function (a, b, c) {
              this.rendered && this.tooltip.css(b, c);
            },
            "^style.widget|content.title": function () {
              this.rendered && this._setWidget();
            },
            "^style.def": function (a, b, c) {
              this.rendered && this.tooltip.toggleClass(Z, !!c);
            },
            "^events.(render|show|move|hide|focus|blur)$": function (a, b, c) {
              this.rendered &&
                this.tooltip[("function" == typeof c ? "" : "un") + "bind"](
                  "tooltip" + b,
                  c
                );
            },
            "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":
              function () {
                if (this.rendered) {
                  var a = this.options.position;
                  this.tooltip.attr(
                    "tracking",
                    "mouse" === a.target && a.adjust.mouse
                  ),
                    this._unassignEvents(),
                    this._assignEvents();
                }
              },
          },
        }),
      (z.get = function (a) {
        if (this.destroyed) return this;
        var b = i(this.options, a.toLowerCase()),
          c = b[0][b[1]];
        return c.precedance ? c.string() : c;
      });
    var ea =
        /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
      fa = /^prerender|show\.ready/i;
    (z.set = function (a, b) {
      if (this.destroyed) return this;
      var c,
        e = this.rendered,
        f = E,
        g = this.options;
      return (
        "string" == typeof a
          ? ((c = a), (a = {}), (a[c] = b))
          : (a = d.extend({}, a)),
        d.each(a, function (b, c) {
          if (e && fa.test(b)) return void delete a[b];
          var h,
            j = i(g, b.toLowerCase());
          (h = j[0][j[1]]),
            (j[0][j[1]] = c && c.nodeType ? d(c) : c),
            (f = ea.test(b) || f),
            (a[b] = [j[0], j[1], c, h]);
        }),
        h(g),
        (this.positioning = D),
        d.each(a, j.bind(this)),
        (this.positioning = E),
        this.rendered &&
          this.tooltip[0].offsetWidth > 0 &&
          f &&
          this.reposition("mouse" === g.position.target ? F : this.cache.event),
        this
      );
    }),
      (z._update = function (a, b) {
        var c = this,
          d = this.cache;
        return this.rendered && a
          ? ("function" == typeof a &&
              (a = a.call(this.elements.target, d.event, this) || ""),
            "function" == typeof a.then
              ? ((d.waiting = D),
                a.then(
                  function (a) {
                    return (d.waiting = E), c._update(a, b);
                  },
                  F,
                  function (a) {
                    return c._update(a, b);
                  }
                ))
              : a === E || (!a && "" !== a)
              ? E
              : (a.jquery && a.length > 0
                  ? b
                      .empty()
                      .append(
                        a.css({ display: "block", visibility: "visible" })
                      )
                  : b.html(a),
                this._waitForContent(b).then(function (a) {
                  c.rendered &&
                    c.tooltip[0].offsetWidth > 0 &&
                    c.reposition(d.event, !a.length);
                })))
          : E;
      }),
      (z._waitForContent = function (a) {
        var b = this.cache;
        return (
          (b.waiting = D),
          (d.fn.imagesLoaded ? a.imagesLoaded() : new d.Deferred().resolve([]))
            .done(function () {
              b.waiting = E;
            })
            .promise()
        );
      }),
      (z._updateContent = function (a, b) {
        this._update(a, this.elements.content, b);
      }),
      (z._updateTitle = function (a, b) {
        this._update(a, this.elements.title, b) === E && this._removeTitle(E);
      }),
      (z._createTitle = function () {
        var a = this.elements,
          b = this._id + "-title";
        a.titlebar && this._removeTitle(),
          (a.titlebar = d("<div />", {
            class:
              S + "-titlebar " + (this.options.style.widget ? k("header") : ""),
          })
            .append(
              (a.title = d("<div />", {
                id: b,
                class: S + "-title",
                "aria-atomic": D,
              }))
            )
            .insertBefore(a.content)
            .on(
              "mousedown keydown mouseup keyup mouseout",
              ".qtip-close",
              function (a) {
                d(this).toggleClass(
                  "ui-state-active ui-state-focus",
                  "down" === a.type.slice(-4)
                );
              }
            )
            .on("mouseover mouseout", ".qtip-close", function (a) {
              d(this).toggleClass("ui-state-hover", "mouseover" === a.type);
            })),
          this.options.content.button && this._createButton();
      }),
      (z._removeTitle = function (a) {
        var b = this.elements;
        b.title &&
          (b.titlebar.remove(),
          (b.titlebar = b.title = b.button = F),
          a !== E && this.reposition());
      }),
      (z._createPosClass = function (a) {
        return S + "-pos-" + (a || this.options.position.my).abbrev();
      }),
      (z.reposition = function (c, e) {
        if (!this.rendered || this.positioning || this.destroyed) return this;
        this.positioning = D;
        var f,
          g,
          h,
          i,
          j = this.cache,
          k = this.tooltip,
          l = this.options.position,
          m = l.target,
          n = l.my,
          o = l.at,
          p = l.viewport,
          q = l.container,
          r = l.adjust,
          s = r.method.split(" "),
          t = k.outerWidth(E),
          u = k.outerHeight(E),
          v = 0,
          w = 0,
          x = k.css("position"),
          y = { left: 0, top: 0 },
          z = k[0].offsetWidth > 0,
          A = c && "scroll" === c.type,
          B = d(a),
          C = q[0].ownerDocument,
          F = this.mouse;
        if (Array.isArray(m) && 2 === m.length)
          (o = { x: L, y: K }), (y = { left: m[0], top: m[1] });
        else if ("mouse" === m)
          (o = { x: L, y: K }),
            (!r.mouse || this.options.hide.distance) &&
            j.origin &&
            j.origin.pageX
              ? (c = j.origin)
              : !c || (c && ("resize" === c.type || "scroll" === c.type))
              ? (c = j.event)
              : F && F.pageX && (c = F),
            "static" !== x && (y = q.offset()),
            C.body.offsetWidth !==
              (a.innerWidth || C.documentElement.clientWidth) &&
              (g = d(b.body).offset()),
            (y = {
              left: c.pageX - y.left + ((g && g.left) || 0),
              top: c.pageY - y.top + ((g && g.top) || 0),
            }),
            r.mouse &&
              A &&
              F &&
              ((y.left -= (F.scrollX || 0) - B.scrollLeft()),
              (y.top -= (F.scrollY || 0) - B.scrollTop()));
        else {
          if (
            ("event" === m
              ? c && c.target && "scroll" !== c.type && "resize" !== c.type
                ? (j.target = d(c.target))
                : c.target || (j.target = this.elements.target)
              : "event" !== m &&
                (j.target = d(m.jquery ? m : this.elements.target)),
            (m = j.target),
            (m = d(m).eq(0)),
            0 === m.length)
          )
            return this;
          m[0] === b || m[0] === a
            ? ((v = da.iOS ? a.innerWidth : m.width()),
              (w = da.iOS ? a.innerHeight : m.height()),
              m[0] === a &&
                (y = {
                  top: (p || m).scrollTop(),
                  left: (p || m).scrollLeft(),
                }))
            : R.imagemap && m.is("area")
            ? (f = R.imagemap(this, m, o, R.viewport ? s : E))
            : R.svg && m && m[0].ownerSVGElement
            ? (f = R.svg(this, m, o, R.viewport ? s : E))
            : ((v = m.outerWidth(E)), (w = m.outerHeight(E)), (y = m.offset())),
            f &&
              ((v = f.width), (w = f.height), (g = f.offset), (y = f.position)),
            (y = this.reposition.offset(m, y, q)),
            ((da.iOS > 3.1 && da.iOS < 4.1) ||
              (da.iOS >= 4.3 && da.iOS < 4.33) ||
              (!da.iOS && "fixed" === x)) &&
              ((y.left -= B.scrollLeft()), (y.top -= B.scrollTop())),
            (!f || (f && f.adjustable !== E)) &&
              ((y.left += o.x === N ? v : o.x === O ? v / 2 : 0),
              (y.top += o.y === M ? w : o.y === O ? w / 2 : 0));
        }
        return (
          (y.left += r.x + (n.x === N ? -t : n.x === O ? -t / 2 : 0)),
          (y.top += r.y + (n.y === M ? -u : n.y === O ? -u / 2 : 0)),
          R.viewport
            ? ((h = y.adjusted = R.viewport(this, y, l, v, w, t, u)),
              g && h.left && (y.left += g.left),
              g && h.top && (y.top += g.top),
              h.my && (this.position.my = h.my))
            : (y.adjusted = { left: 0, top: 0 }),
          j.posClass !== (i = this._createPosClass(this.position.my)) &&
            ((j.posClass = i), k.removeClass(j.posClass).addClass(i)),
          this._trigger("move", [y, p.elem || p], c)
            ? (delete y.adjusted,
              e === E ||
              !z ||
              isNaN(y.left) ||
              isNaN(y.top) ||
              "mouse" === m ||
              "function" != typeof l.effect
                ? k.css(y)
                : "function" == typeof l.effect &&
                  (l.effect.call(k, this, d.extend({}, y)),
                  k.queue(function (a) {
                    d(this).css({ opacity: "", height: "" }),
                      da.ie && this.style.removeAttribute("filter"),
                      a();
                  })),
              (this.positioning = E),
              this)
            : this
        );
      }),
      (z.reposition.offset = function (a, c, e) {
        function f(a, b) {
          (c.left += b * a.scrollLeft()), (c.top += b * a.scrollTop());
        }
        if (!e[0]) return c;
        var g,
          h,
          i,
          j,
          k = d(a[0].ownerDocument),
          l = !!da.ie && "CSS1Compat" !== b.compatMode,
          m = e[0];
        do
          "static" !== (h = d.css(m, "position")) &&
            ("fixed" === h
              ? ((i = m.getBoundingClientRect()), f(k, -1))
              : ((i = d(m).position()),
                (i.left += parseFloat(d.css(m, "borderLeftWidth")) || 0),
                (i.top += parseFloat(d.css(m, "borderTopWidth")) || 0)),
            (c.left -= i.left + (parseFloat(d.css(m, "marginLeft")) || 0)),
            (c.top -= i.top + (parseFloat(d.css(m, "marginTop")) || 0)),
            g ||
              "hidden" === (j = d.css(m, "overflow")) ||
              "visible" === j ||
              (g = d(m)));
        while ((m = m.offsetParent));
        return g && (g[0] !== k[0] || l) && f(g, 1), c;
      });
    var ga = (A = z.reposition.Corner =
      function (a, b) {
        (a = ("" + a)
          .replace(/([A-Z])/, " $1")
          .replace(/middle/gi, O)
          .toLowerCase()),
          (this.x = (a.match(/left|right/i) ||
            a.match(/center/) || ["inherit"])[0].toLowerCase()),
          (this.y = (a.match(/top|bottom|center/i) || [
            "inherit",
          ])[0].toLowerCase()),
          (this.forceY = !!b);
        var c = a.charAt(0);
        this.precedance = "t" === c || "b" === c ? H : G;
      }).prototype;
    (ga.invert = function (a, b) {
      this[a] = this[a] === L ? N : this[a] === N ? L : b || this[a];
    }),
      (ga.string = function (a) {
        var b = this.x,
          c = this.y,
          d =
            b !== c
              ? "center" === b ||
                ("center" !== c && (this.precedance === H || this.forceY))
                ? [c, b]
                : [b, c]
              : [b];
        return a !== !1 ? d.join(" ") : d;
      }),
      (ga.abbrev = function () {
        var a = this.string(!1);
        return a[0].charAt(0) + ((a[1] && a[1].charAt(0)) || "");
      }),
      (ga.clone = function () {
        return new A(this.string(), this.forceY);
      }),
      (z.toggle = function (a, c) {
        var e = this.cache,
          f = this.options,
          g = this.tooltip;
        if (c) {
          if (
            /over|enter/.test(c.type) &&
            e.event &&
            /out|leave/.test(e.event.type) &&
            f.show.target.add(c.target).length === f.show.target.length &&
            g.has(c.relatedTarget).length
          )
            return this;
          e.event = d.event.fix(c);
        }
        if ((this.waiting && !a && (this.hiddenDuringWait = D), !this.rendered))
          return a ? this.render(1) : this;
        if (this.destroyed || this.disabled) return this;
        var h,
          i,
          j,
          k = a ? "show" : "hide",
          l = this.options[k],
          m = this.options.position,
          n = this.options.content,
          o = this.tooltip.css("width"),
          p = this.tooltip.is(":visible"),
          q = a || 1 === l.target.length,
          r = !c || l.target.length < 2 || e.target[0] === c.target;
        return (
          (typeof a).search("boolean|number") && (a = !p),
          (h = !g.is(":animated") && p === a && r),
          (i = h ? F : !!this._trigger(k, [90])),
          this.destroyed
            ? this
            : (i !== E && a && this.focus(c),
              !i || h
                ? this
                : (d.attr(g[0], "aria-hidden", !a),
                  a
                    ? (this.mouse && (e.origin = d.event.fix(this.mouse)),
                      "function" == typeof n.text &&
                        this._updateContent(n.text, E),
                      "function" == typeof n.title &&
                        this._updateTitle(n.title, E),
                      !C &&
                        "mouse" === m.target &&
                        m.adjust.mouse &&
                        (d(b).on("mousemove." + S, this._storeMouse), (C = D)),
                      o || g.css("width", g.outerWidth(E)),
                      this.reposition(c, arguments[2]),
                      o || g.css("width", ""),
                      l.solo &&
                        ("string" == typeof l.solo ? d(l.solo) : d(W, l.solo))
                          .not(g)
                          .not(l.target)
                          .qtip("hide", new d.Event("tooltipsolo")))
                    : (clearTimeout(this.timers.show),
                      delete e.origin,
                      C &&
                        !d(W + '[tracking="true"]:visible', l.solo).not(g)
                          .length &&
                        (d(b).off("mousemove." + S), (C = E)),
                      this.blur(c)),
                  (j = function () {
                    a
                      ? (da.ie && g[0].style.removeAttribute("filter"),
                        g.css("overflow", ""),
                        "string" == typeof l.autofocus &&
                          d(this.options.show.autofocus, g).focus(),
                        this.options.show.target.trigger(
                          "qtip-" + this.id + "-inactive"
                        ))
                      : g.css({
                          display: "",
                          visibility: "",
                          opacity: "",
                          left: "",
                          top: "",
                        }),
                      this._trigger(a ? "visible" : "hidden");
                  }.bind(this)),
                  l.effect === E || q === E
                    ? (g[k](), j())
                    : "function" == typeof l.effect
                    ? (g.stop(1, 1),
                      l.effect.call(g, this),
                      g.queue("fx", function (a) {
                        j(), a();
                      }))
                    : g.fadeTo(90, a ? 1 : 0, j),
                  a && l.target.trigger("qtip-" + this.id + "-inactive"),
                  this))
        );
      }),
      (z.show = function (a) {
        return this.toggle(D, a);
      }),
      (z.hide = function (a) {
        return this.toggle(E, a);
      }),
      (z.focus = function (a) {
        if (!this.rendered || this.destroyed) return this;
        var b = d(W),
          c = this.tooltip,
          e = parseInt(c[0].style.zIndex, 10),
          f = y.zindex + b.length;
        return (
          c.hasClass($) ||
            (this._trigger("focus", [f], a) &&
              (e !== f &&
                (b.each(function () {
                  this.style.zIndex > e &&
                    (this.style.zIndex = this.style.zIndex - 1);
                }),
                b.filter("." + $).qtip("blur", a)),
              (c.addClass($)[0].style.zIndex = f))),
          this
        );
      }),
      (z.blur = function (a) {
        return !this.rendered || this.destroyed
          ? this
          : (this.tooltip.removeClass($),
            this._trigger("blur", [this.tooltip.css("zIndex")], a),
            this);
      }),
      (z.disable = function (a) {
        return this.destroyed
          ? this
          : ("toggle" === a
              ? (a = !(this.rendered
                  ? this.tooltip.hasClass(aa)
                  : this.disabled))
              : "boolean" != typeof a && (a = D),
            this.rendered &&
              this.tooltip.toggleClass(aa, a).attr("aria-disabled", a),
            (this.disabled = !!a),
            this);
      }),
      (z.enable = function () {
        return this.disable(E);
      }),
      (z._createButton = function () {
        var a = this,
          b = this.elements,
          c = b.tooltip,
          e = this.options.content.button,
          f = "string" == typeof e,
          g = f ? e : "Close tooltip";
        b.button && b.button.remove(),
          e.jquery
            ? (b.button = e)
            : (b.button = d("<a />", {
                class:
                  "qtip-close " +
                  (this.options.style.widget ? "" : S + "-icon"),
                title: g,
                "aria-label": g,
              }).prepend(
                d("<span />", {
                  class: "ui-icon ui-icon-close",
                  html: "&times;",
                })
              )),
          b.button
            .appendTo(b.titlebar || c)
            .attr("role", "button")
            .on("click", function (b) {
              return c.hasClass(aa) || a.hide(b), E;
            });
      }),
      (z._updateButton = function (a) {
        if (!this.rendered) return E;
        var b = this.elements.button;
        a ? this._createButton() : b.remove();
      }),
      (z._setWidget = function () {
        var a = this.options.style.widget,
          b = this.elements,
          c = b.tooltip,
          d = c.hasClass(aa);
        c.removeClass(aa),
          (aa = a ? "ui-state-disabled" : "qtip-disabled"),
          c.toggleClass(aa, d),
          c
            .toggleClass("ui-helper-reset " + k(), a)
            .toggleClass(Z, this.options.style.def && !a),
          b.content && b.content.toggleClass(k("content"), a),
          b.titlebar && b.titlebar.toggleClass(k("header"), a),
          b.button && b.button.toggleClass(S + "-icon", !a);
      }),
      (z._storeMouse = function (a) {
        return ((this.mouse = d.event.fix(a)).type = "mousemove"), this;
      }),
      (z._bind = function (a, b, c, e, f) {
        if (a && c && b.length) {
          var g = "." + this._id + (e ? "-" + e : "");
          return (
            d(a).on((b.split ? b : b.join(g + " ")) + g, c.bind(f || this)),
            this
          );
        }
      }),
      (z._unbind = function (a, b) {
        return a && d(a).off("." + this._id + (b ? "-" + b : "")), this;
      }),
      (z._trigger = function (a, b, c) {
        var e = new d.Event("tooltip" + a);
        return (
          (e.originalEvent = (c && d.extend({}, c)) || this.cache.event || F),
          (this.triggering = a),
          this.tooltip.trigger(e, [this].concat(b || [])),
          (this.triggering = E),
          !e.isDefaultPrevented()
        );
      }),
      (z._bindEvents = function (a, b, c, e, f, g) {
        var h = c.filter(e).add(e.filter(c)),
          i = [];
        h.length &&
          (d.each(b, function (b, c) {
            var e = d.inArray(c, a);
            e > -1 && i.push(a.splice(e, 1)[0]);
          }),
          i.length &&
            (this._bind(h, i, function (a) {
              var b = !!this.rendered && this.tooltip[0].offsetWidth > 0;
              (b ? g : f).call(this, a);
            }),
            (c = c.not(h)),
            (e = e.not(h)))),
          this._bind(c, a, f),
          this._bind(e, b, g);
      }),
      (z._assignInitialEvents = function (a) {
        function b(a) {
          return this.disabled || this.destroyed
            ? E
            : ((this.cache.event = a && d.event.fix(a)),
              (this.cache.target = a && d(a.target)),
              clearTimeout(this.timers.show),
              void (this.timers.show = l.call(
                this,
                function () {
                  this.render("object" == typeof a || c.show.ready);
                },
                c.prerender ? 0 : c.show.delay
              )));
        }
        var c = this.options,
          e = c.show.target,
          f = c.hide.target,
          g = c.show.event ? ("" + c.show.event).trim().split(" ") : [],
          h = c.hide.event ? ("" + c.hide.event).trim().split(" ") : [];
        this._bind(
          this.elements.target,
          ["remove", "removeqtip"],
          function () {
            this.destroy(!0);
          },
          "destroy"
        ),
          /mouse(over|enter)/i.test(c.show.event) &&
            !/mouse(out|leave)/i.test(c.hide.event) &&
            h.push("mouseleave"),
          this._bind(e, "mousemove", function (a) {
            this._storeMouse(a), (this.cache.onTarget = D);
          }),
          this._bindEvents(g, h, e, f, b, function () {
            return this.timers ? void clearTimeout(this.timers.show) : E;
          }),
          (c.show.ready || c.prerender) && b.call(this, a);
      }),
      (z._assignEvents = function () {
        var c = this,
          e = this.options,
          f = e.position,
          g = this.tooltip,
          h = e.show.target,
          i = e.hide.target,
          j = f.container,
          k = f.viewport,
          l = d(b),
          q = d(a),
          r = e.show.event ? ("" + e.show.event).trim().split(" ") : [],
          s = e.hide.event ? ("" + e.hide.event).trim().split(" ") : [];
        d.each(e.events, function (a, b) {
          c._bind(
            g,
            "toggle" === a ? ["tooltipshow", "tooltiphide"] : ["tooltip" + a],
            b,
            null,
            g
          );
        }),
          /mouse(out|leave)/i.test(e.hide.event) &&
            "window" === e.hide.leave &&
            this._bind(l, ["mouseout", "blur"], function (a) {
              /select|option/.test(a.target.nodeName) ||
                a.relatedTarget ||
                this.hide(a);
            }),
          e.hide.fixed
            ? (i = i.add(g.addClass(Y)))
            : /mouse(over|enter)/i.test(e.show.event) &&
              this._bind(i, "mouseleave", function () {
                clearTimeout(this.timers.show);
              }),
          ("" + e.hide.event).indexOf("unfocus") > -1 &&
            this._bind(
              j.closest("html"),
              ["mousedown", "touchstart"],
              function (a) {
                var b = d(a.target),
                  c =
                    this.rendered &&
                    !this.tooltip.hasClass(aa) &&
                    this.tooltip[0].offsetWidth > 0,
                  e = b.parents(W).filter(this.tooltip[0]).length > 0;
                b[0] === this.target[0] ||
                  b[0] === this.tooltip[0] ||
                  e ||
                  this.target.has(b[0]).length ||
                  !c ||
                  this.hide(a);
              }
            ),
          "number" == typeof e.hide.inactive &&
            (this._bind(h, "qtip-" + this.id + "-inactive", o, "inactive"),
            this._bind(i.add(g), y.inactiveEvents, o)),
          this._bindEvents(r, s, h, i, m, n),
          this._bind(h.add(g), "mousemove", function (a) {
            if ("number" == typeof e.hide.distance) {
              var b = this.cache.origin || {},
                c = this.options.hide.distance,
                d = Math.abs;
              (d(a.pageX - b.pageX) >= c || d(a.pageY - b.pageY) >= c) &&
                this.hide(a);
            }
            this._storeMouse(a);
          }),
          "mouse" === f.target &&
            f.adjust.mouse &&
            (e.hide.event &&
              this._bind(h, ["mouseenter", "mouseleave"], function (a) {
                return this.cache
                  ? void (this.cache.onTarget = "mouseenter" === a.type)
                  : E;
              }),
            this._bind(l, "mousemove", function (a) {
              this.rendered &&
                this.cache.onTarget &&
                !this.tooltip.hasClass(aa) &&
                this.tooltip[0].offsetWidth > 0 &&
                this.reposition(a);
            })),
          (f.adjust.resize || k.length) &&
            this._bind(d.event.special.resize ? k : q, "resize", p),
          f.adjust.scroll && this._bind(q.add(f.container), "scroll", p);
      }),
      (z._unassignEvents = function () {
        var c = this.options,
          e = c.show.target,
          f = c.hide.target,
          g = d.grep(
            [
              this.elements.target[0],
              this.rendered && this.tooltip[0],
              c.position.container[0],
              c.position.viewport[0],
              c.position.container.closest("html")[0],
              a,
              b,
            ],
            function (a) {
              return "object" == typeof a;
            }
          );
        e && e.toArray && (g = g.concat(e.toArray())),
          f && f.toArray && (g = g.concat(f.toArray())),
          this._unbind(g)._unbind(g, "destroy")._unbind(g, "inactive");
      }),
      d(function () {
        q(W, ["mouseenter", "mouseleave"], function (a) {
          var b = "mouseenter" === a.type,
            c = d(a.currentTarget),
            e = d(a.relatedTarget || a.target),
            f = this.options;
          b
            ? (this.focus(a),
              c.hasClass(Y) &&
                !c.hasClass(aa) &&
                clearTimeout(this.timers.hide))
            : "mouse" === f.position.target &&
              f.position.adjust.mouse &&
              f.hide.event &&
              f.show.target &&
              !e.closest(f.show.target[0]).length &&
              this.hide(a),
            c.toggleClass(_, b);
        }),
          q("[" + U + "]", X, o);
      }),
      (y = d.fn.qtip =
        function (a, b, e) {
          var f = ("" + a).toLowerCase(),
            g = F,
            i = d.makeArray(arguments).slice(1),
            j = i[i.length - 1],
            k = this[0] ? d.data(this[0], S) : F;
          return (!arguments.length && k) || "api" === f
            ? k
            : "string" == typeof a
            ? (this.each(function () {
                var a = d.data(this, S);
                if (!a) return D;
                if (
                  (j && j.timeStamp && (a.cache.event = j),
                  !b || ("option" !== f && "options" !== f))
                )
                  a[f] && a[f].apply(a, i);
                else {
                  if (e === c && !d.isPlainObject(b)) return (g = a.get(b)), E;
                  a.set(b, e);
                }
              }),
              g !== F ? g : this)
            : "object" != typeof a && arguments.length
            ? void 0
            : ((k = h(d.extend(D, {}, a))),
              this.each(function (a) {
                var b, c;
                return (
                  (c = Array.isArray(k.id) ? k.id[a] : k.id),
                  (c =
                    !c || c === E || c.length < 1 || y.api[c] ? y.nextid++ : c),
                  (b = r(d(this), c, k)),
                  b === E
                    ? D
                    : ((y.api[c] = b),
                      d.each(R, function () {
                        "initialize" === this.initialize && this(b);
                      }),
                      void b._assignInitialEvents(j))
                );
              }));
        }),
      (d.qtip = e),
      (y.api = {}),
      d.each(
        {
          attr: function (a, b) {
            if (this.length) {
              var c = this[0],
                e = "title",
                f = d.data(c, "qtip");
              if (
                a === e &&
                f &&
                f.options &&
                "object" == typeof f &&
                "object" == typeof f.options &&
                f.options.suppress
              )
                return arguments.length < 2
                  ? d.attr(c, ca)
                  : (f &&
                      f.options.content.attr === e &&
                      f.cache.attr &&
                      f.set("content.text", b),
                    this.attr(ca, b));
            }
            return d.fn["attr" + ba].apply(this, arguments);
          },
          clone: function (a) {
            var b = d.fn["clone" + ba].apply(this, arguments);
            return (
              a ||
                b
                  .filter("[" + ca + "]")
                  .attr("title", function () {
                    return d.attr(this, ca);
                  })
                  .removeAttr(ca),
              b
            );
          },
        },
        function (a, b) {
          if (!b || d.fn[a + ba]) return D;
          var c = (d.fn[a + ba] = d.fn[a]);
          d.fn[a] = function () {
            return b.apply(this, arguments) || c.apply(this, arguments);
          };
        }
      ),
      d.ui ||
        ((d["cleanData" + ba] = d.cleanData),
        (d.cleanData = function (a) {
          for (var b, c = 0; (b = d(a[c])).length; c++)
            if (b.attr(T))
              try {
                b.triggerHandler("removeqtip");
              } catch (e) {}
          d["cleanData" + ba].apply(this, arguments);
        })),
      (y.version = "3.0.4"),
      (y.nextid = 0),
      (y.inactiveEvents = X),
      (y.zindex = 15e3),
      (y.defaults = {
        prerender: E,
        id: E,
        overwrite: D,
        suppress: D,
        content: { text: D, attr: "title", title: E, button: E },
        position: {
          my: "top left",
          at: "bottom right",
          target: E,
          container: E,
          viewport: E,
          adjust: {
            x: 0,
            y: 0,
            mouse: D,
            scroll: D,
            resize: D,
            method: "flipinvert flipinvert",
          },
          effect: function (a, b) {
            d(this).animate(b, { duration: 200, queue: E });
          },
        },
        show: {
          target: E,
          event: "mouseenter",
          effect: D,
          delay: 90,
          solo: E,
          ready: E,
          autofocus: E,
        },
        hide: {
          target: E,
          event: "mouseleave",
          effect: D,
          delay: 0,
          fixed: E,
          inactive: E,
          leave: "window",
          distance: E,
        },
        style: { classes: "", widget: E, width: E, height: E, def: D },
        events: {
          render: F,
          move: F,
          show: F,
          hide: F,
          toggle: F,
          visible: F,
          hidden: F,
          focus: F,
          blur: F,
        },
      });
    var ha,
      ia,
      ja,
      ka,
      la,
      ma = "margin",
      na = "border",
      oa = "color",
      pa = "background-color",
      qa = "transparent",
      ra = " !important",
      sa = !!b.createElement("canvas").getContext,
      ta = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i,
      ua = {},
      va = ["Webkit", "O", "Moz", "ms"];
    sa
      ? ((ka = a.devicePixelRatio || 1),
        (la = (function () {
          var a = b.createElement("canvas").getContext("2d");
          return (
            a.backingStorePixelRatio ||
            a.webkitBackingStorePixelRatio ||
            a.mozBackingStorePixelRatio ||
            a.msBackingStorePixelRatio ||
            a.oBackingStorePixelRatio ||
            1
          );
        })()),
        (ja = ka / la))
      : (ia = function (a, b, c) {
          return (
            "<qtipvml:" +
            a +
            ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' +
            (b || "") +
            ' style="behavior: url(#default#VML); ' +
            (c || "") +
            '" />'
          );
        }),
      d.extend(v.prototype, {
        init: function (a) {
          var b, c;
          (c =
            this.element =
            a.elements.tip =
              d("<div />", { class: S + "-tip" }).prependTo(a.tooltip)),
            sa
              ? ((b = d("<canvas />")
                  .appendTo(this.element)[0]
                  .getContext("2d")),
                (b.lineJoin = "miter"),
                (b.miterLimit = 1e5),
                b.save())
              : ((b = ia("shape", 'coordorigin="0,0"', "position:absolute;")),
                this.element.html(b + b),
                a._bind(
                  d("*", c).add(c),
                  ["click", "mousedown"],
                  function (a) {
                    a.stopPropagation();
                  },
                  this._ns
                )),
            a._bind(a.tooltip, "tooltipmove", this.reposition, this._ns, this),
            this.create();
        },
        _swapDimensions: function () {
          (this.size[0] = this.options.height),
            (this.size[1] = this.options.width);
        },
        _resetDimensions: function () {
          (this.size[0] = this.options.width),
            (this.size[1] = this.options.height);
        },
        _useTitle: function (a) {
          var b = this.qtip.elements.titlebar;
          return (
            b &&
            (a.y === K ||
              (a.y === O &&
                this.element.position().top +
                  this.size[1] / 2 +
                  this.options.offset <
                  b.outerHeight(D)))
          );
        },
        _parseCorner: function (a) {
          var b = this.qtip.options.position.my;
          return (
            a === E || b === E
              ? (a = E)
              : a === D
              ? (a = new A(b.string()))
              : a.string || ((a = new A(a)), (a.fixed = D)),
            a
          );
        },
        _parseWidth: function (a, b, c) {
          var d = this.qtip.elements,
            e = na + s(b) + "Width";
          return (
            (c
              ? u(c, e)
              : u(d.content, e) ||
                u((this._useTitle(a) && d.titlebar) || d.content, e) ||
                u(d.tooltip, e)) || 0
          );
        },
        _parseRadius: function (a) {
          var b = this.qtip.elements,
            c = na + s(a.y) + s(a.x) + "Radius";
          return da.ie < 9
            ? 0
            : u((this._useTitle(a) && b.titlebar) || b.content, c) ||
                u(b.tooltip, c) ||
                0;
        },
        _invalidColour: function (a, b, c) {
          var d = a.css(b);
          return !d || (c && d === a.css(c)) || ta.test(d) ? E : d;
        },
        _parseColours: function (a) {
          var b = this.qtip.elements,
            c = this.element.css("cssText", ""),
            e = na + s(a[a.precedance]) + s(oa),
            f = (this._useTitle(a) && b.titlebar) || b.content,
            g = this._invalidColour,
            h = [];
          return (
            (h[0] =
              g(c, pa) ||
              g(f, pa) ||
              g(b.content, pa) ||
              g(b.tooltip, pa) ||
              c.css(pa)),
            (h[1] =
              g(c, e, oa) ||
              g(f, e, oa) ||
              g(b.content, e, oa) ||
              g(b.tooltip, e, oa) ||
              b.tooltip.css(e)),
            d("*", c)
              .add(c)
              .css("cssText", pa + ":" + qa + ra + ";" + na + ":0" + ra + ";"),
            h
          );
        },
        _calculateSize: function (a) {
          var b,
            c,
            d,
            e = a.precedance === H,
            f = this.options.width,
            g = this.options.height,
            h = "c" === a.abbrev(),
            i = (e ? f : g) * (h ? 0.5 : 1),
            j = Math.pow,
            k = Math.round,
            l = Math.sqrt(j(i, 2) + j(g, 2)),
            m = [(this.border / i) * l, (this.border / g) * l];
          return (
            (m[2] = Math.sqrt(j(m[0], 2) - j(this.border, 2))),
            (m[3] = Math.sqrt(j(m[1], 2) - j(this.border, 2))),
            (b = l + m[2] + m[3] + (h ? 0 : m[0])),
            (c = b / l),
            (d = [k(c * f), k(c * g)]),
            e ? d : d.reverse()
          );
        },
        _calculateTip: function (a, b, c) {
          (c = c || 1), (b = b || this.size);
          var d = b[0] * c,
            e = b[1] * c,
            f = Math.ceil(d / 2),
            g = Math.ceil(e / 2),
            h = {
              br: [0, 0, d, e, d, 0],
              bl: [0, 0, d, 0, 0, e],
              tr: [0, e, d, 0, d, e],
              tl: [0, 0, 0, e, d, e],
              tc: [0, e, f, 0, d, e],
              bc: [0, 0, d, 0, f, e],
              rc: [0, 0, d, g, 0, e],
              lc: [d, 0, d, e, 0, g],
            };
          return (
            (h.lt = h.br),
            (h.rt = h.bl),
            (h.lb = h.tr),
            (h.rb = h.tl),
            h[a.abbrev()]
          );
        },
        _drawCoords: function (a, b) {
          a.beginPath(),
            a.moveTo(b[0], b[1]),
            a.lineTo(b[2], b[3]),
            a.lineTo(b[4], b[5]),
            a.closePath();
        },
        create: function () {
          var a = (this.corner =
            (sa || da.ie) && this._parseCorner(this.options.corner));
          return (
            (this.enabled = !!this.corner && "c" !== this.corner.abbrev()),
            this.enabled &&
              ((this.qtip.cache.corner = a.clone()), this.update()),
            this.element.toggle(this.enabled),
            this.corner
          );
        },
        update: function (b, c) {
          if (!this.enabled) return this;
          var e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m = this.qtip.elements,
            n = this.element,
            o = n.children(),
            p = this.options,
            q = this.size,
            r = p.mimic,
            s = Math.round;
          b || (b = this.qtip.cache.corner || this.corner),
            r === E
              ? (r = b)
              : ((r = new A(r)),
                (r.precedance = b.precedance),
                "inherit" === r.x
                  ? (r.x = b.x)
                  : "inherit" === r.y
                  ? (r.y = b.y)
                  : r.x === r.y && (r[b.precedance] = b[b.precedance])),
            (f = r.precedance),
            b.precedance === G
              ? this._swapDimensions()
              : this._resetDimensions(),
            (e = this.color = this._parseColours(b)),
            e[1] !== qa
              ? ((l = this.border = this._parseWidth(b, b[b.precedance])),
                p.border && l < 1 && !ta.test(e[1]) && (e[0] = e[1]),
                (this.border = l = p.border !== D ? p.border : l))
              : (this.border = l = 0),
            (k = this.size = this._calculateSize(b)),
            n.css({ width: k[0], height: k[1], lineHeight: k[1] + "px" }),
            (j =
              b.precedance === H
                ? [
                    s(
                      r.x === L
                        ? l
                        : r.x === N
                        ? k[0] - q[0] - l
                        : (k[0] - q[0]) / 2
                    ),
                    s(r.y === K ? k[1] - q[1] : 0),
                  ]
                : [
                    s(r.x === L ? k[0] - q[0] : 0),
                    s(
                      r.y === K
                        ? l
                        : r.y === M
                        ? k[1] - q[1] - l
                        : (k[1] - q[1]) / 2
                    ),
                  ]),
            sa
              ? ((g = o[0].getContext("2d")),
                g.restore(),
                g.save(),
                g.clearRect(0, 0, 6e3, 6e3),
                (h = this._calculateTip(r, q, ja)),
                (i = this._calculateTip(r, this.size, ja)),
                o.attr(I, k[0] * ja).attr(J, k[1] * ja),
                o.css(I, k[0]).css(J, k[1]),
                this._drawCoords(g, i),
                (g.fillStyle = e[1]),
                g.fill(),
                g.translate(j[0] * ja, j[1] * ja),
                this._drawCoords(g, h),
                (g.fillStyle = e[0]),
                g.fill())
              : ((h = this._calculateTip(r)),
                (h =
                  "m" +
                  h[0] +
                  "," +
                  h[1] +
                  " l" +
                  h[2] +
                  "," +
                  h[3] +
                  " " +
                  h[4] +
                  "," +
                  h[5] +
                  " xe"),
                (j[2] =
                  l && /^(r|b)/i.test(b.string()) ? (8 === da.ie ? 2 : 1) : 0),
                o
                  .css({
                    coordsize: k[0] + l + " " + k[1] + l,
                    antialias: "" + (r.string().indexOf(O) > -1),
                    left: j[0] - j[2] * Number(f === G),
                    top: j[1] - j[2] * Number(f === H),
                    width: k[0] + l,
                    height: k[1] + l,
                  })
                  .each(function (a) {
                    var b = d(this);
                    b[b.prop ? "prop" : "attr"]({
                      coordsize: k[0] + l + " " + k[1] + l,
                      path: h,
                      fillcolor: e[0],
                      filled: !!a,
                      stroked: !a,
                    }).toggle(!(!l && !a)),
                      !a &&
                        b.html(
                          ia(
                            "stroke",
                            'weight="' +
                              2 * l +
                              'px" color="' +
                              e[1] +
                              '" miterlimit="1000" joinstyle="miter"'
                          )
                        );
                  })),
            a.opera &&
              setTimeout(function () {
                m.tip.css({ display: "inline-block", visibility: "visible" });
              }, 1),
            c !== E && this.calculate(b, k);
        },
        calculate: function (a, b) {
          if (!this.enabled) return E;
          var c,
            e,
            f = this,
            g = this.qtip.elements,
            h = this.element,
            i = this.options.offset,
            j = {};
          return (
            (a = a || this.corner),
            (c = a.precedance),
            (b = b || this._calculateSize(a)),
            (e = [a.x, a.y]),
            c === G && e.reverse(),
            d.each(e, function (d, e) {
              var h, k, l;
              e === O
                ? ((h = c === H ? L : K),
                  (j[h] = "50%"),
                  (j[ma + "-" + h] = -Math.round(b[c === H ? 0 : 1] / 2) + i))
                : ((h = f._parseWidth(a, e, g.tooltip)),
                  (k = f._parseWidth(a, e, g.content)),
                  (l = f._parseRadius(a)),
                  (j[e] = Math.max(-f.border, d ? k : i + (l > h ? l : -h))));
            }),
            (j[a[c]] -= b[c === G ? 0 : 1]),
            h
              .css({ margin: "", top: "", bottom: "", left: "", right: "" })
              .css(j),
            j
          );
        },
        reposition: function (a, b, d) {
          function e(a, b, c, d, e) {
            a === Q && j.precedance === b && k[d] && j[c] !== O
              ? (j.precedance = j.precedance === G ? H : G)
              : a !== Q &&
                k[d] &&
                (j[b] = j[b] === O ? (k[d] > 0 ? d : e) : j[b] === d ? e : d);
          }
          function f(a, b, e) {
            j[a] === O
              ? (p[ma + "-" + b] = o[a] = g[ma + "-" + b] - k[b])
              : ((h = g[e] !== c ? [k[b], -g[b]] : [-k[b], g[b]]),
                (o[a] = Math.max(h[0], h[1])) > h[0] &&
                  ((d[b] -= k[b]), (o[b] = E)),
                (p[g[e] !== c ? e : b] = o[a]));
          }
          if (this.enabled) {
            var g,
              h,
              i = b.cache,
              j = this.corner.clone(),
              k = d.adjusted,
              l = b.options.position.adjust.method.split(" "),
              m = l[0],
              n = l[1] || l[0],
              o = { left: E, top: E, x: 0, y: 0 },
              p = {};
            this.corner.fixed !== D &&
              (e(m, G, H, L, N),
              e(n, H, G, K, M),
              (j.string() === i.corner.string() &&
                i.cornerTop === k.top &&
                i.cornerLeft === k.left) ||
                this.update(j, E)),
              (g = this.calculate(j)),
              g.right !== c && (g.left = -g.right),
              g.bottom !== c && (g.top = -g.bottom),
              (g.user = this.offset),
              (o.left = m === Q && !!k.left),
              o.left && f(G, L, N),
              (o.top = n === Q && !!k.top),
              o.top && f(H, K, M),
              this.element
                .css(p)
                .toggle(
                  !((o.x && o.y) || (j.x === O && o.y) || (j.y === O && o.x))
                ),
              (d.left -= g.left.charAt
                ? g.user
                : m !== Q || o.top || (!o.left && !o.top)
                ? g.left + this.border
                : 0),
              (d.top -= g.top.charAt
                ? g.user
                : n !== Q || o.left || (!o.left && !o.top)
                ? g.top + this.border
                : 0),
              (i.cornerLeft = k.left),
              (i.cornerTop = k.top),
              (i.corner = j.clone());
          }
        },
        destroy: function () {
          this.qtip._unbind(this.qtip.tooltip, this._ns),
            this.qtip.elements.tip &&
              this.qtip.elements.tip.find("*").remove().end().remove();
        },
      }),
      (ha = R.tip =
        function (a) {
          return new v(a, a.options.style.tip);
        }),
      (ha.initialize = "render"),
      (ha.sanitize = function (a) {
        if (a.style && "tip" in a.style) {
          var b = a.style.tip;
          "object" != typeof b && (b = a.style.tip = { corner: b }),
            /string|boolean/i.test(typeof b.corner) || (b.corner = D);
        }
      }),
      (B.tip = {
        "^position.my|style.tip.(corner|mimic|border)$": function () {
          this.create(), this.qtip.reposition();
        },
        "^style.tip.(height|width)$": function (a) {
          (this.size = [a.width, a.height]),
            this.update(),
            this.qtip.reposition();
        },
        "^content.title|style.(classes|widget)$": function () {
          this.update();
        },
      }),
      d.extend(D, y.defaults, {
        style: {
          tip: {
            corner: D,
            mimic: E,
            width: 6,
            height: 6,
            border: D,
            offset: 0,
          },
        },
      });
    var wa,
      xa,
      ya = "qtip-modal",
      za = "." + ya;
    (xa = function () {
      function a(a) {
        if (d.expr[":"].focusable) return d.expr[":"].focusable;
        var b,
          c,
          e,
          f = !isNaN(d.attr(a, "tabindex")),
          g = a.nodeName && a.nodeName.toLowerCase();
        return "area" === g
          ? ((b = a.parentNode),
            (c = b.name),
            !(!a.href || !c || "map" !== b.nodeName.toLowerCase()) &&
              ((e = d("img[usemap=#" + c + "]")[0]), !!e && e.is(":visible")))
          : /input|select|textarea|button|object/.test(g)
          ? !a.disabled
          : "a" === g
          ? a.href || f
          : f;
      }
      function c(a) {
        j.length < 1 && a.length
          ? a.not("body").trigger("blur")
          : j.first().trigger("focus");
      }
      function e(a) {
        if (h.is(":visible")) {
          var b,
            e = d(a.target),
            g = f.tooltip,
            i = e.closest(W);
          (b =
            i.length < 1
              ? E
              : parseInt(i[0].style.zIndex, 10) >
                parseInt(g[0].style.zIndex, 10)),
            b || e.closest(W)[0] === g[0] || c(e);
        }
      }
      var f,
        g,
        h,
        i = this,
        j = {};
      d.extend(i, {
        init: function () {
          return (
            (h = i.elem =
              d("<div />", { id: "qtip-overlay", html: "<div></div>" })
                .on("mousedown", function () {
                  return E;
                })
                .hide()),
            d(b.body).on("focusin" + za, e),
            d(b).on("keydown" + za, function (a) {
              f && f.options.show.modal.escape && 27 === a.which && f.hide(a);
            }),
            h.on("click" + za, function (a) {
              f && f.options.show.modal.blur && f.hide(a);
            }),
            i
          );
        },
        update: function (b) {
          (f = b),
            (j =
              b.options.show.modal.stealfocus !== E
                ? b.tooltip.find("*").filter(function () {
                    return a(this);
                  })
                : []);
        },
        toggle: function (a, e, j) {
          var k = a.tooltip,
            l = a.options.show.modal,
            m = l.effect,
            n = e ? "show" : "hide",
            o = h.is(":visible"),
            p = d(za).filter(":visible:not(:animated)").not(k);
          return (
            i.update(a),
            e && l.stealfocus !== E && c(d(":focus")),
            h.toggleClass("blurs", l.blur),
            e && h.appendTo(b.body),
            (h.is(":animated") && o === e && g !== E) || (!e && p.length)
              ? i
              : (h.stop(D, E),
                "function" == typeof m
                  ? m.call(h, e)
                  : m === E
                  ? h[n]()
                  : h.fadeTo(parseInt(j, 10) || 90, e ? 1 : 0, function () {
                      e || h.hide();
                    }),
                e ||
                  h.queue(function (a) {
                    h.css({ left: "", top: "" }),
                      d(za).length || h.detach(),
                      a();
                  }),
                (g = e),
                f.destroyed && (f = F),
                i)
          );
        },
      }),
        i.init();
    }),
      (xa = new xa()),
      d.extend(w.prototype, {
        init: function (a) {
          var b = a.tooltip;
          return this.options.on
            ? ((a.elements.overlay = xa.elem),
              b.addClass(ya).css("z-index", y.modal_zindex + d(za).length),
              a._bind(
                b,
                ["tooltipshow", "tooltiphide"],
                function (a, c, e) {
                  var f = a.originalEvent;
                  if (a.target === b[0])
                    if (
                      f &&
                      "tooltiphide" === a.type &&
                      /mouse(leave|enter)/.test(f.type) &&
                      d(f.relatedTarget).closest(xa.elem[0]).length
                    )
                      try {
                        a.preventDefault();
                      } catch (g) {}
                    else
                      (!f || (f && "tooltipsolo" !== f.type)) &&
                        this.toggle(a, "tooltipshow" === a.type, e);
                },
                this._ns,
                this
              ),
              a._bind(
                b,
                "tooltipfocus",
                function (a, c) {
                  if (!a.isDefaultPrevented() && a.target === b[0]) {
                    var e = d(za),
                      f = y.modal_zindex + e.length,
                      g = parseInt(b[0].style.zIndex, 10);
                    (xa.elem[0].style.zIndex = f - 1),
                      e.each(function () {
                        this.style.zIndex > g && (this.style.zIndex -= 1);
                      }),
                      e.filter("." + $).qtip("blur", a.originalEvent),
                      (b.addClass($)[0].style.zIndex = f),
                      xa.update(c);
                    try {
                      a.preventDefault();
                    } catch (h) {}
                  }
                },
                this._ns,
                this
              ),
              void a._bind(
                b,
                "tooltiphide",
                function (a) {
                  a.target === b[0] &&
                    d(za).filter(":visible").not(b).last().qtip("focus", a);
                },
                this._ns,
                this
              ))
            : this;
        },
        toggle: function (a, b, c) {
          return a && a.isDefaultPrevented()
            ? this
            : void xa.toggle(this.qtip, !!b, c);
        },
        destroy: function () {
          this.qtip.tooltip.removeClass(ya),
            this.qtip._unbind(this.qtip.tooltip, this._ns),
            xa.toggle(this.qtip, E),
            delete this.qtip.elements.overlay;
        },
      }),
      (wa = R.modal =
        function (a) {
          return new w(a, a.options.show.modal);
        }),
      (wa.sanitize = function (a) {
        a.show &&
          ("object" != typeof a.show.modal
            ? (a.show.modal = { on: !!a.show.modal })
            : "undefined" == typeof a.show.modal.on && (a.show.modal.on = D));
      }),
      (y.modal_zindex = y.zindex - 200),
      (wa.initialize = "render"),
      (B.modal = {
        "^show.modal.(on|blur)$": function () {
          this.destroy(),
            this.init(),
            this.qtip.elems.overlay.toggle(
              this.qtip.tooltip[0].offsetWidth > 0
            );
        },
      }),
      d.extend(D, y.defaults, {
        show: {
          modal: { on: E, effect: D, blur: D, stealfocus: D, escape: D },
        },
      }),
      (R.viewport = function (c, d, e, f, g, h, i) {
        function j(a, b, c, e, f, g, h, i, j) {
          var k = d[f],
            s = u[a],
            t = v[a],
            w = c === Q,
            x = s === f ? j : s === g ? -j : -j / 2,
            y = t === f ? i : t === g ? -i : -i / 2,
            z = q[f] + r[f] - (n ? 0 : m[f]),
            A = z - k,
            B = k + j - (h === I ? o : p) - z,
            C =
              x -
              (u.precedance === a || s === u[b] ? y : 0) -
              (t === O ? i / 2 : 0);
          return (
            w
              ? ((C = (s === f ? 1 : -1) * x),
                (d[f] += A > 0 ? A : B > 0 ? -B : 0),
                (d[f] = Math.max(
                  -m[f] + r[f],
                  k - C,
                  Math.min(
                    Math.max(-m[f] + r[f] + (h === I ? o : p), k + C),
                    d[f],
                    "center" === s ? k - x : 1e9
                  )
                )))
              : ((e *= c === P ? 2 : 0),
                A > 0 && (s !== f || B > 0)
                  ? ((d[f] -= C + e), l.invert(a, f))
                  : B > 0 &&
                    (s !== g || A > 0) &&
                    ((d[f] -= (s === O ? -C : C) + e), l.invert(a, g)),
                d[f] < q[f] && -d[f] > B && ((d[f] = k), (l = u.clone()))),
            d[f] - k
          );
        }
        var k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s = e.target,
          t = c.elements.tooltip,
          u = e.my,
          v = e.at,
          w = e.adjust,
          x = w.method.split(" "),
          y = x[0],
          z = x[1] || x[0],
          A = e.viewport,
          B = e.container,
          C = { left: 0, top: 0 };
        return A.jquery && s[0] !== a && s[0] !== b.body && "none" !== w.method
          ? ((m = B.offset() || C),
            (n = "static" === B.css("position")),
            (k = "fixed" === t.css("position")),
            (o = A[0] === a ? A.width() : A.outerWidth(E)),
            (p = A[0] === a ? A.height() : A.outerHeight(E)),
            (q = { left: k ? 0 : A.scrollLeft(), top: k ? 0 : A.scrollTop() }),
            (r = A[0] !== a ? A.offset() : C),
            ("shift" === y && "shift" === z) || (l = u.clone()),
            (C = {
              left: "none" !== y ? j(G, H, y, w.x, L, N, I, f, h) : 0,
              top: "none" !== z ? j(H, G, z, w.y, K, M, J, g, i) : 0,
              my: l,
            }))
          : C;
      }),
      (R.polys = {
        polygon: function (a, b) {
          var c,
            d,
            e,
            f = {
              width: 0,
              height: 0,
              position: { top: 1e10, right: 0, bottom: 0, left: 1e10 },
              adjustable: E,
            },
            g = 0,
            h = [],
            i = 1,
            j = 1,
            k = 0,
            l = 0;
          for (g = a.length; g--; )
            (c = [parseInt(a[--g], 10), parseInt(a[g + 1], 10)]),
              c[0] > f.position.right && (f.position.right = c[0]),
              c[0] < f.position.left && (f.position.left = c[0]),
              c[1] > f.position.bottom && (f.position.bottom = c[1]),
              c[1] < f.position.top && (f.position.top = c[1]),
              h.push(c);
          if (
            ((d = f.width = Math.abs(f.position.right - f.position.left)),
            (e = f.height = Math.abs(f.position.bottom - f.position.top)),
            "c" === b.abbrev())
          )
            f.position = {
              left: f.position.left + f.width / 2,
              top: f.position.top + f.height / 2,
            };
          else {
            for (; d > 0 && e > 0 && i > 0 && j > 0; )
              for (
                d = Math.floor(d / 2),
                  e = Math.floor(e / 2),
                  b.x === L
                    ? (i = d)
                    : b.x === N
                    ? (i = f.width - d)
                    : (i += Math.floor(d / 2)),
                  b.y === K
                    ? (j = e)
                    : b.y === M
                    ? (j = f.height - e)
                    : (j += Math.floor(e / 2)),
                  g = h.length;
                g-- && !(h.length < 2);

              )
                (k = h[g][0] - f.position.left),
                  (l = h[g][1] - f.position.top),
                  ((b.x === L && k >= i) ||
                    (b.x === N && k <= i) ||
                    (b.x === O && (k < i || k > f.width - i)) ||
                    (b.y === K && l >= j) ||
                    (b.y === M && l <= j) ||
                    (b.y === O && (l < j || l > f.height - j))) &&
                    h.splice(g, 1);
            f.position = { left: h[0][0], top: h[0][1] };
          }
          return f;
        },
        rect: function (a, b, c, d) {
          return {
            width: Math.abs(c - a),
            height: Math.abs(d - b),
            position: { left: Math.min(a, c), top: Math.min(b, d) },
          };
        },
        _angles: {
          tc: 1.5,
          tr: 7 / 4,
          tl: 5 / 4,
          bc: 0.5,
          br: 0.25,
          bl: 0.75,
          rc: 2,
          lc: 1,
          c: 0,
        },
        ellipse: function (a, b, c, d, e) {
          var f = R.polys._angles[e.abbrev()],
            g = 0 === f ? 0 : c * Math.cos(f * Math.PI),
            h = d * Math.sin(f * Math.PI);
          return {
            width: 2 * c - Math.abs(g),
            height: 2 * d - Math.abs(h),
            position: { left: a + g, top: b + h },
            adjustable: E,
          };
        },
        circle: function (a, b, c, d) {
          return R.polys.ellipse(a, b, c, c, d);
        },
      }),
      (R.svg = function (a, c, e) {
        for (
          var f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o = c[0],
            p = d(o.ownerSVGElement),
            q = o.ownerDocument,
            r = (parseInt(c.css("stroke-width"), 10) || 0) / 2;
          !o.getBBox;

        )
          o = o.parentNode;
        if (!o.getBBox || !o.parentNode) return E;
        switch (o.nodeName) {
          case "ellipse":
          case "circle":
            m = R.polys.ellipse(
              o.cx.baseVal.value,
              o.cy.baseVal.value,
              (o.rx || o.r).baseVal.value + r,
              (o.ry || o.r).baseVal.value + r,
              e
            );
            break;
          case "line":
          case "polygon":
          case "polyline":
            for (
              l = o.points || [
                { x: o.x1.baseVal.value, y: o.y1.baseVal.value },
                { x: o.x2.baseVal.value, y: o.y2.baseVal.value },
              ],
                m = [],
                k = -1,
                i = l.numberOfItems || l.length;
              ++k < i;

            )
              (j = l.getItem ? l.getItem(k) : l[k]),
                m.push.apply(m, [j.x, j.y]);
            m = R.polys.polygon(m, e);
            break;
          default:
            (m = o.getBBox()),
              (m = {
                width: m.width,
                height: m.height,
                position: { left: m.x, top: m.y },
              });
        }
        return (
          (n = m.position),
          (p = p[0]),
          p.createSVGPoint &&
            ((g = o.getScreenCTM()),
            (l = p.createSVGPoint()),
            (l.x = n.left),
            (l.y = n.top),
            (h = l.matrixTransform(g)),
            (n.left = h.x),
            (n.top = h.y)),
          q !== b &&
            "mouse" !== a.position.target &&
            ((f = d((q.defaultView || q.parentWindow).frameElement).offset()),
            f && ((n.left += f.left), (n.top += f.top))),
          (q = d(q)),
          (n.left += q.scrollLeft()),
          (n.top += q.scrollTop()),
          m
        );
      }),
      (R.imagemap = function (a, b, c) {
        b.jquery || (b = d(b));
        var e,
          f,
          g,
          h,
          i,
          j = (b.attr("shape") || "rect")
            .toLowerCase()
            .replace("poly", "polygon"),
          k = d('img[usemap="#' + b.parent("map").attr("name") + '"]'),
          l = (b.attr("coords") || "").trim(),
          m = l.replace(/,$/, "").split(",");
        if (!k.length) return E;
        if ("polygon" === j) h = R.polys.polygon(m, c);
        else {
          if (!R.polys[j]) return E;
          for (g = -1, i = m.length, f = []; ++g < i; )
            f.push(parseInt(m[g], 10));
          h = R.polys[j].apply(this, f.concat(c));
        }
        return (
          (e = k.offset()),
          (e.left += Math.ceil((k.outerWidth(E) - k.width()) / 2)),
          (e.top += Math.ceil((k.outerHeight(E) - k.height()) / 2)),
          (h.position.left += e.left),
          (h.position.top += e.top),
          h
        );
      });
    var Aa,
      Ba =
        '<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>';
    d.extend(x.prototype, {
      _scroll: function () {
        var b = this.qtip.elements.overlay;
        b && (b[0].style.top = d(a).scrollTop() + "px");
      },
      init: function (c) {
        var e = c.tooltip;
        d("select, object").length < 1 &&
          ((this.bgiframe = c.elements.bgiframe = d(Ba).appendTo(e)),
          c._bind(e, "tooltipmove", this.adjustBGIFrame, this._ns, this)),
          (this.redrawContainer = d("<div/>", {
            id: S + "-rcontainer",
          }).appendTo(b.body)),
          c.elements.overlay &&
            c.elements.overlay.addClass("qtipmodal-ie6fix") &&
            (c._bind(a, ["scroll", "resize"], this._scroll, this._ns, this),
            c._bind(e, ["tooltipshow"], this._scroll, this._ns, this)),
          this.redraw();
      },
      adjustBGIFrame: function () {
        var a,
          b,
          c = this.qtip.tooltip,
          d = { height: c.outerHeight(E), width: c.outerWidth(E) },
          e = this.qtip.plugins.tip,
          f = this.qtip.elements.tip;
        (b = parseInt(c.css("borderLeftWidth"), 10) || 0),
          (b = { left: -b, top: -b }),
          e &&
            f &&
            ((a = "x" === e.corner.precedance ? [I, L] : [J, K]),
            (b[a[1]] -= f[a[0]]())),
          this.bgiframe.css(b).css(d);
      },
      redraw: function () {
        if (this.qtip.rendered < 1 || this.drawing) return this;
        var a,
          b,
          c,
          d,
          e = this.qtip.tooltip,
          f = this.qtip.options.style,
          g = this.qtip.options.position.container;
        return (
          (this.qtip.drawing = 1),
          f.height && e.css(J, f.height),
          f.width
            ? e.css(I, f.width)
            : (e.css(I, "").appendTo(this.redrawContainer),
              (b = e.width()),
              b % 2 < 1 && (b += 1),
              (c = e.css("maxWidth") || ""),
              (d = e.css("minWidth") || ""),
              (a = (c + d).indexOf("%") > -1 ? g.width() / 100 : 0),
              (c = (c.indexOf("%") > -1 ? a : 1 * parseInt(c, 10)) || b),
              (d = (d.indexOf("%") > -1 ? a : 1 * parseInt(d, 10)) || 0),
              (b = c + d ? Math.min(Math.max(b, d), c) : b),
              e.css(I, Math.round(b)).appendTo(g)),
          (this.drawing = 0),
          this
        );
      },
      destroy: function () {
        this.bgiframe && this.bgiframe.remove(),
          this.qtip._unbind([a, this.qtip.tooltip], this._ns);
      },
    }),
      (Aa = R.ie6 =
        function (a) {
          return 6 === da.ie ? new x(a) : E;
        }),
      (Aa.initialize = "render"),
      (B.ie6 = {
        "^content|style$": function () {
          this.redraw();
        },
      });
  });
})(window, document);

// ==================================================
// fancyBox v3.5.7
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2019 fancyApps
//
// ==================================================
!(function (t, e, n, o) {
  "use strict";
  function i(t, e) {
    var o,
      i,
      a,
      s = [],
      r = 0;
    (t && t.isDefaultPrevented()) ||
      (t.preventDefault(),
      (e = e || {}),
      t && t.data && (e = h(t.data.options, e)),
      (o = e.$target || n(t.currentTarget).trigger("blur")),
      ((a = n.fancybox.getInstance()) && a.$trigger && a.$trigger.is(o)) ||
        (e.selector
          ? (s = n(e.selector))
          : ((i = o.attr("data-fancybox") || ""),
            i
              ? ((s = t.data ? t.data.items : []),
                (s = s.length
                  ? s.filter('[data-fancybox="' + i + '"]')
                  : n('[data-fancybox="' + i + '"]')))
              : (s = [o])),
        (r = n(s).index(o)),
        r < 0 && (r = 0),
        (a = n.fancybox.open(s, e, r)),
        (a.$trigger = o)));
  }
  if (((t.console = t.console || { info: function (t) {} }), n)) {
    if (n.fn.fancybox) return void console.info("fancyBox already initialized");
    var a = {
        closeExisting: !1,
        loop: !1,
        gutter: 50,
        keyboard: !0,
        preventCaptionOverlap: !0,
        arrows: !0,
        infobar: !0,
        smallBtn: "auto",
        toolbar: "auto",
        buttons: ["zoom", "slideShow", "thumbs", "close"],
        idleTime: 3,
        protect: !1,
        modal: !1,
        image: { preload: !1 },
        ajax: { settings: { data: { fancybox: !0 } } },
        iframe: {
          tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
          preload: !0,
          css: {},
          attr: { scrolling: "auto" },
        },
        video: {
          tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
          format: "",
          autoStart: !0,
        },
        defaultType: "image",
        animationEffect: "zoom",
        animationDuration: 366,
        zoomOpacity: "auto",
        transitionEffect: "fade",
        transitionDuration: 366,
        slideClass: "",
        baseClass: "",
        baseTpl:
          '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
        spinnerTpl: '<div class="fancybox-loading"></div>',
        errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
        btnTpl: {
          download:
            '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
          zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
          close:
            '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
          arrowLeft:
            '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
          arrowRight:
            '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
          smallBtn:
            '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>',
        },
        parentEl: "body",
        hideScrollbar: !0,
        autoFocus: !0,
        backFocus: !0,
        trapFocus: !0,
        fullScreen: { autoStart: !1 },
        touch: { vertical: !0, momentum: !0 },
        hash: null,
        media: {},
        slideShow: { autoStart: !1, speed: 3e3 },
        thumbs: {
          autoStart: !1,
          hideOnClose: !0,
          parentEl: ".fancybox-container",
          axis: "y",
        },
        wheel: "auto",
        onInit: n.noop,
        beforeLoad: n.noop,
        afterLoad: n.noop,
        beforeShow: n.noop,
        afterShow: n.noop,
        beforeClose: n.noop,
        afterClose: n.noop,
        onActivate: n.noop,
        onDeactivate: n.noop,
        clickContent: function (t, e) {
          return "image" === t.type && "zoom";
        },
        clickSlide: "close",
        clickOutside: "close",
        dblclickContent: !1,
        dblclickSlide: !1,
        dblclickOutside: !1,
        mobile: {
          preventCaptionOverlap: !1,
          idleTime: !1,
          clickContent: function (t, e) {
            return "image" === t.type && "toggleControls";
          },
          clickSlide: function (t, e) {
            return "image" === t.type ? "toggleControls" : "close";
          },
          dblclickContent: function (t, e) {
            return "image" === t.type && "zoom";
          },
          dblclickSlide: function (t, e) {
            return "image" === t.type && "zoom";
          },
        },
        lang: "en",
        i18n: {
          en: {
            CLOSE: "Close",
            NEXT: "Next",
            PREV: "Previous",
            ERROR:
              "The requested content cannot be loaded. <br/> Please try again later.",
            PLAY_START: "Start slideshow",
            PLAY_STOP: "Pause slideshow",
            FULL_SCREEN: "Full screen",
            THUMBS: "Thumbnails",
            DOWNLOAD: "Download",
            SHARE: "Share",
            ZOOM: "Zoom",
          },
          de: {
            CLOSE: "Schlie&szlig;en",
            NEXT: "Weiter",
            PREV: "Zur&uuml;ck",
            ERROR:
              "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
            PLAY_START: "Diaschau starten",
            PLAY_STOP: "Diaschau beenden",
            FULL_SCREEN: "Vollbild",
            THUMBS: "Vorschaubilder",
            DOWNLOAD: "Herunterladen",
            SHARE: "Teilen",
            ZOOM: "Vergr&ouml;&szlig;ern",
          },
        },
      },
      s = n(t),
      r = n(e),
      c = 0,
      l = function (t) {
        return t && t.hasOwnProperty && t instanceof n;
      },
      d = (function () {
        return (
          t.requestAnimationFrame ||
          t.webkitRequestAnimationFrame ||
          t.mozRequestAnimationFrame ||
          t.oRequestAnimationFrame ||
          function (e) {
            return t.setTimeout(e, 1e3 / 60);
          }
        );
      })(),
      u = (function () {
        return (
          t.cancelAnimationFrame ||
          t.webkitCancelAnimationFrame ||
          t.mozCancelAnimationFrame ||
          t.oCancelAnimationFrame ||
          function (e) {
            t.clearTimeout(e);
          }
        );
      })(),
      f = (function () {
        var t,
          n = e.createElement("fakeelement"),
          o = {
            transition: "transitionend",
            OTransition: "oTransitionEnd",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd",
          };
        for (t in o) if (void 0 !== n.style[t]) return o[t];
        return "transitionend";
      })(),
      p = function (t) {
        return t && t.length && t[0].offsetHeight;
      },
      h = function (t, e) {
        var o = n.extend(!0, {}, t, e);
        return (
          n.each(e, function (t, e) {
            n.isArray(e) && (o[t] = e);
          }),
          o
        );
      },
      g = function (t) {
        var o, i;
        return (
          !(!t || t.ownerDocument !== e) &&
          (n(".fancybox-container").css("pointer-events", "none"),
          (o = {
            x: t.getBoundingClientRect().left + t.offsetWidth / 2,
            y: t.getBoundingClientRect().top + t.offsetHeight / 2,
          }),
          (i = e.elementFromPoint(o.x, o.y) === t),
          n(".fancybox-container").css("pointer-events", ""),
          i)
        );
      },
      b = function (t, e, o) {
        var i = this;
        (i.opts = h({ index: o }, n.fancybox.defaults)),
          n.isPlainObject(e) && (i.opts = h(i.opts, e)),
          n.fancybox.isMobile && (i.opts = h(i.opts, i.opts.mobile)),
          (i.id = i.opts.id || ++c),
          (i.currIndex = parseInt(i.opts.index, 10) || 0),
          (i.prevIndex = null),
          (i.prevPos = null),
          (i.currPos = 0),
          (i.firstRun = !0),
          (i.group = []),
          (i.slides = {}),
          i.addContent(t),
          i.group.length && i.init();
      };
    n.extend(b.prototype, {
      init: function () {
        var o,
          i,
          a = this,
          s = a.group[a.currIndex],
          r = s.opts;
        r.closeExisting && n.fancybox.close(!0),
          n("body").addClass("fancybox-active"),
          !n.fancybox.getInstance() &&
            !1 !== r.hideScrollbar &&
            !n.fancybox.isMobile &&
            e.body.scrollHeight > t.innerHeight &&
            (n("head").append(
              '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' +
                (t.innerWidth - e.documentElement.clientWidth) +
                "px;}</style>"
            ),
            n("body").addClass("compensate-for-scrollbar")),
          (i = ""),
          n.each(r.buttons, function (t, e) {
            i += r.btnTpl[e] || "";
          }),
          (o = n(
            a.translate(
              a,
              r.baseTpl
                .replace("{{buttons}}", i)
                .replace("{{arrows}}", r.btnTpl.arrowLeft + r.btnTpl.arrowRight)
            )
          )
            .attr("id", "fancybox-container-" + a.id)
            .addClass(r.baseClass)
            .data("FancyBox", a)
            .appendTo(r.parentEl)),
          (a.$refs = { container: o }),
          [
            "bg",
            "inner",
            "infobar",
            "toolbar",
            "stage",
            "caption",
            "navigation",
          ].forEach(function (t) {
            a.$refs[t] = o.find(".fancybox-" + t);
          }),
          a.trigger("onInit"),
          a.activate(),
          a.jumpTo(a.currIndex);
      },
      translate: function (t, e) {
        var n = t.opts.i18n[t.opts.lang] || t.opts.i18n.en;
        return e.replace(/\{\{(\w+)\}\}/g, function (t, e) {
          return void 0 === n[e] ? t : n[e];
        });
      },
      addContent: function (t) {
        var e,
          o = this,
          i = n.makeArray(t);
        n.each(i, function (t, e) {
          var i,
            a,
            s,
            r,
            c,
            l = {},
            d = {};
          n.isPlainObject(e)
            ? ((l = e), (d = e.opts || e))
            : "object" === n.type(e) && n(e).length
            ? ((i = n(e)),
              (d = i.data() || {}),
              (d = n.extend(!0, {}, d, d.options)),
              (d.$orig = i),
              (l.src = o.opts.src || d.src || i.attr("href")),
              l.type || l.src || ((l.type = "inline"), (l.src = e)))
            : (l = { type: "html", src: e + "" }),
            (l.opts = n.extend(!0, {}, o.opts, d)),
            n.isArray(d.buttons) && (l.opts.buttons = d.buttons),
            n.fancybox.isMobile &&
              l.opts.mobile &&
              (l.opts = h(l.opts, l.opts.mobile)),
            (a = l.type || l.opts.type),
            (r = l.src || ""),
            !a &&
              r &&
              ((s = r.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))
                ? ((a = "video"),
                  l.opts.video.format ||
                    (l.opts.video.format =
                      "video/" + ("ogv" === s[1] ? "ogg" : s[1])))
                : r.match(
                    /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
                  )
                ? (a = "image")
                : r.match(/\.(pdf)((\?|#).*)?$/i)
                ? ((a = "iframe"),
                  (l = n.extend(!0, l, {
                    contentType: "pdf",
                    opts: { iframe: { preload: !1 } },
                  })))
                : "#" === r.charAt(0) && (a = "inline")),
            a ? (l.type = a) : o.trigger("objectNeedsType", l),
            l.contentType ||
              (l.contentType =
                n.inArray(l.type, ["html", "inline", "ajax"]) > -1
                  ? "html"
                  : l.type),
            (l.index = o.group.length),
            "auto" == l.opts.smallBtn &&
              (l.opts.smallBtn =
                n.inArray(l.type, ["html", "inline", "ajax"]) > -1),
            "auto" === l.opts.toolbar && (l.opts.toolbar = !l.opts.smallBtn),
            (l.$thumb = l.opts.$thumb || null),
            l.opts.$trigger &&
              l.index === o.opts.index &&
              ((l.$thumb = l.opts.$trigger.find("img:first")),
              l.$thumb.length && (l.opts.$orig = l.opts.$trigger)),
            (l.$thumb && l.$thumb.length) ||
              !l.opts.$orig ||
              (l.$thumb = l.opts.$orig.find("img:first")),
            l.$thumb && !l.$thumb.length && (l.$thumb = null),
            (l.thumb = l.opts.thumb || (l.$thumb ? l.$thumb[0].src : null)),
            "function" === n.type(l.opts.caption) &&
              (l.opts.caption = l.opts.caption.apply(e, [o, l])),
            "function" === n.type(o.opts.caption) &&
              (l.opts.caption = o.opts.caption.apply(e, [o, l])),
            l.opts.caption instanceof n ||
              (l.opts.caption =
                void 0 === l.opts.caption ? "" : l.opts.caption + ""),
            "ajax" === l.type &&
              ((c = r.split(/\s+/, 2)),
              c.length > 1 &&
                ((l.src = c.shift()), (l.opts.filter = c.shift()))),
            l.opts.modal &&
              (l.opts = n.extend(!0, l.opts, {
                trapFocus: !0,
                infobar: 0,
                toolbar: 0,
                smallBtn: 0,
                keyboard: 0,
                slideShow: 0,
                fullScreen: 0,
                thumbs: 0,
                touch: 0,
                clickContent: !1,
                clickSlide: !1,
                clickOutside: !1,
                dblclickContent: !1,
                dblclickSlide: !1,
                dblclickOutside: !1,
              })),
            o.group.push(l);
        }),
          Object.keys(o.slides).length &&
            (o.updateControls(),
            (e = o.Thumbs) && e.isActive && (e.create(), e.focus()));
      },
      addEvents: function () {
        var e = this;
        e.removeEvents(),
          e.$refs.container
            .on("click.fb-close", "[data-fancybox-close]", function (t) {
              t.stopPropagation(), t.preventDefault(), e.close(t);
            })
            .on(
              "touchstart.fb-prev click.fb-prev",
              "[data-fancybox-prev]",
              function (t) {
                t.stopPropagation(), t.preventDefault(), e.previous();
              }
            )
            .on(
              "touchstart.fb-next click.fb-next",
              "[data-fancybox-next]",
              function (t) {
                t.stopPropagation(), t.preventDefault(), e.next();
              }
            )
            .on("click.fb", "[data-fancybox-zoom]", function (t) {
              e[e.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
            }),
          s.on("orientationchange.fb resize.fb", function (t) {
            t && t.originalEvent && "resize" === t.originalEvent.type
              ? (e.requestId && u(e.requestId),
                (e.requestId = d(function () {
                  e.update(t);
                })))
              : (e.current &&
                  "iframe" === e.current.type &&
                  e.$refs.stage.hide(),
                setTimeout(
                  function () {
                    e.$refs.stage.show(), e.update(t);
                  },
                  n.fancybox.isMobile ? 600 : 250
                ));
          }),
          r.on("keydown.fb", function (t) {
            var o = n.fancybox ? n.fancybox.getInstance() : null,
              i = o.current,
              a = t.keyCode || t.which;
            if (9 == a) return void (i.opts.trapFocus && e.focus(t));
            if (
              !(
                !i.opts.keyboard ||
                t.ctrlKey ||
                t.altKey ||
                t.shiftKey ||
                n(t.target).is("input,textarea,video,audio,select")
              )
            )
              return 8 === a || 27 === a
                ? (t.preventDefault(), void e.close(t))
                : 37 === a || 38 === a
                ? (t.preventDefault(), void e.previous())
                : 39 === a || 40 === a
                ? (t.preventDefault(), void e.next())
                : void e.trigger("afterKeydown", t, a);
          }),
          e.group[e.currIndex].opts.idleTime &&
            ((e.idleSecondsCounter = 0),
            r.on(
              "mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",
              function (t) {
                (e.idleSecondsCounter = 0),
                  e.isIdle && e.showControls(),
                  (e.isIdle = !1);
              }
            ),
            (e.idleInterval = t.setInterval(function () {
              ++e.idleSecondsCounter >= e.group[e.currIndex].opts.idleTime &&
                !e.isDragging &&
                ((e.isIdle = !0), (e.idleSecondsCounter = 0), e.hideControls());
            }, 1e3)));
      },
      removeEvents: function () {
        var e = this;
        s.off("orientationchange.fb resize.fb"),
          r.off("keydown.fb .fb-idle"),
          this.$refs.container.off(".fb-close .fb-prev .fb-next"),
          e.idleInterval &&
            (t.clearInterval(e.idleInterval), (e.idleInterval = null));
      },
      previous: function (t) {
        return this.jumpTo(this.currPos - 1, t);
      },
      next: function (t) {
        return this.jumpTo(this.currPos + 1, t);
      },
      jumpTo: function (t, e) {
        var o,
          i,
          a,
          s,
          r,
          c,
          l,
          d,
          u,
          f = this,
          h = f.group.length;
        if (!(f.isDragging || f.isClosing || (f.isAnimating && f.firstRun))) {
          if (
            ((t = parseInt(t, 10)),
            !(a = f.current ? f.current.opts.loop : f.opts.loop) &&
              (t < 0 || t >= h))
          )
            return !1;
          if (
            ((o = f.firstRun = !Object.keys(f.slides).length),
            (r = f.current),
            (f.prevIndex = f.currIndex),
            (f.prevPos = f.currPos),
            (s = f.createSlide(t)),
            h > 1 &&
              ((a || s.index < h - 1) && f.createSlide(t + 1),
              (a || s.index > 0) && f.createSlide(t - 1)),
            (f.current = s),
            (f.currIndex = s.index),
            (f.currPos = s.pos),
            f.trigger("beforeShow", o),
            f.updateControls(),
            (s.forcedDuration = void 0),
            n.isNumeric(e)
              ? (s.forcedDuration = e)
              : (e = s.opts[o ? "animationDuration" : "transitionDuration"]),
            (e = parseInt(e, 10)),
            (i = f.isMoved(s)),
            s.$slide.addClass("fancybox-slide--current"),
            o)
          )
            return (
              s.opts.animationEffect &&
                e &&
                f.$refs.container.css("transition-duration", e + "ms"),
              f.$refs.container.addClass("fancybox-is-open").trigger("focus"),
              f.loadSlide(s),
              void f.preload("image")
            );
          (c = n.fancybox.getTranslate(r.$slide)),
            (l = n.fancybox.getTranslate(f.$refs.stage)),
            n.each(f.slides, function (t, e) {
              n.fancybox.stop(e.$slide, !0);
            }),
            r.pos !== s.pos && (r.isComplete = !1),
            r.$slide.removeClass(
              "fancybox-slide--complete fancybox-slide--current"
            ),
            i
              ? ((u = c.left - (r.pos * c.width + r.pos * r.opts.gutter)),
                n.each(f.slides, function (t, o) {
                  o.$slide
                    .removeClass("fancybox-animated")
                    .removeClass(function (t, e) {
                      return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(
                        " "
                      );
                    });
                  var i = o.pos * c.width + o.pos * o.opts.gutter;
                  n.fancybox.setTranslate(o.$slide, {
                    top: 0,
                    left: i - l.left + u,
                  }),
                    o.pos !== s.pos &&
                      o.$slide.addClass(
                        "fancybox-slide--" +
                          (o.pos > s.pos ? "next" : "previous")
                      ),
                    p(o.$slide),
                    n.fancybox.animate(
                      o.$slide,
                      {
                        top: 0,
                        left:
                          (o.pos - s.pos) * c.width +
                          (o.pos - s.pos) * o.opts.gutter,
                      },
                      e,
                      function () {
                        o.$slide
                          .css({ transform: "", opacity: "" })
                          .removeClass(
                            "fancybox-slide--next fancybox-slide--previous"
                          ),
                          o.pos === f.currPos && f.complete();
                      }
                    );
                }))
              : e &&
                s.opts.transitionEffect &&
                ((d =
                  "fancybox-animated fancybox-fx-" + s.opts.transitionEffect),
                r.$slide.addClass(
                  "fancybox-slide--" + (r.pos > s.pos ? "next" : "previous")
                ),
                n.fancybox.animate(
                  r.$slide,
                  d,
                  e,
                  function () {
                    r.$slide
                      .removeClass(d)
                      .removeClass(
                        "fancybox-slide--next fancybox-slide--previous"
                      );
                  },
                  !1
                )),
            s.isLoaded ? f.revealContent(s) : f.loadSlide(s),
            f.preload("image");
        }
      },
      createSlide: function (t) {
        var e,
          o,
          i = this;
        return (
          (o = t % i.group.length),
          (o = o < 0 ? i.group.length + o : o),
          !i.slides[t] &&
            i.group[o] &&
            ((e = n('<div class="fancybox-slide"></div>').appendTo(
              i.$refs.stage
            )),
            (i.slides[t] = n.extend(!0, {}, i.group[o], {
              pos: t,
              $slide: e,
              isLoaded: !1,
            })),
            i.updateSlide(i.slides[t])),
          i.slides[t]
        );
      },
      scaleToActual: function (t, e, o) {
        var i,
          a,
          s,
          r,
          c,
          l = this,
          d = l.current,
          u = d.$content,
          f = n.fancybox.getTranslate(d.$slide).width,
          p = n.fancybox.getTranslate(d.$slide).height,
          h = d.width,
          g = d.height;
        l.isAnimating ||
          l.isMoved() ||
          !u ||
          "image" != d.type ||
          !d.isLoaded ||
          d.hasError ||
          ((l.isAnimating = !0),
          n.fancybox.stop(u),
          (t = void 0 === t ? 0.5 * f : t),
          (e = void 0 === e ? 0.5 * p : e),
          (i = n.fancybox.getTranslate(u)),
          (i.top -= n.fancybox.getTranslate(d.$slide).top),
          (i.left -= n.fancybox.getTranslate(d.$slide).left),
          (r = h / i.width),
          (c = g / i.height),
          (a = 0.5 * f - 0.5 * h),
          (s = 0.5 * p - 0.5 * g),
          h > f &&
            ((a = i.left * r - (t * r - t)),
            a > 0 && (a = 0),
            a < f - h && (a = f - h)),
          g > p &&
            ((s = i.top * c - (e * c - e)),
            s > 0 && (s = 0),
            s < p - g && (s = p - g)),
          l.updateCursor(h, g),
          n.fancybox.animate(
            u,
            { top: s, left: a, scaleX: r, scaleY: c },
            o || 366,
            function () {
              l.isAnimating = !1;
            }
          ),
          l.SlideShow && l.SlideShow.isActive && l.SlideShow.stop());
      },
      scaleToFit: function (t) {
        var e,
          o = this,
          i = o.current,
          a = i.$content;
        o.isAnimating ||
          o.isMoved() ||
          !a ||
          "image" != i.type ||
          !i.isLoaded ||
          i.hasError ||
          ((o.isAnimating = !0),
          n.fancybox.stop(a),
          (e = o.getFitPos(i)),
          o.updateCursor(e.width, e.height),
          n.fancybox.animate(
            a,
            {
              top: e.top,
              left: e.left,
              scaleX: e.width / a.width(),
              scaleY: e.height / a.height(),
            },
            t || 366,
            function () {
              o.isAnimating = !1;
            }
          ));
      },
      getFitPos: function (t) {
        var e,
          o,
          i,
          a,
          s = this,
          r = t.$content,
          c = t.$slide,
          l = t.width || t.opts.width,
          d = t.height || t.opts.height,
          u = {};
        return (
          !!(t.isLoaded && r && r.length) &&
          ((e = n.fancybox.getTranslate(s.$refs.stage).width),
          (o = n.fancybox.getTranslate(s.$refs.stage).height),
          (e -=
            parseFloat(c.css("paddingLeft")) +
            parseFloat(c.css("paddingRight")) +
            parseFloat(r.css("marginLeft")) +
            parseFloat(r.css("marginRight"))),
          (o -=
            parseFloat(c.css("paddingTop")) +
            parseFloat(c.css("paddingBottom")) +
            parseFloat(r.css("marginTop")) +
            parseFloat(r.css("marginBottom"))),
          (l && d) || ((l = e), (d = o)),
          (i = Math.min(1, e / l, o / d)),
          (l *= i),
          (d *= i),
          l > e - 0.5 && (l = e),
          d > o - 0.5 && (d = o),
          "image" === t.type
            ? ((u.top =
                Math.floor(0.5 * (o - d)) + parseFloat(c.css("paddingTop"))),
              (u.left =
                Math.floor(0.5 * (e - l)) + parseFloat(c.css("paddingLeft"))))
            : "video" === t.contentType &&
              ((a =
                t.opts.width && t.opts.height ? l / d : t.opts.ratio || 16 / 9),
              d > l / a ? (d = l / a) : l > d * a && (l = d * a)),
          (u.width = l),
          (u.height = d),
          u)
        );
      },
      update: function (t) {
        var e = this;
        n.each(e.slides, function (n, o) {
          e.updateSlide(o, t);
        });
      },
      updateSlide: function (t, e) {
        var o = this,
          i = t && t.$content,
          a = t.width || t.opts.width,
          s = t.height || t.opts.height,
          r = t.$slide;
        o.adjustCaption(t),
          i &&
            (a || s || "video" === t.contentType) &&
            !t.hasError &&
            (n.fancybox.stop(i),
            n.fancybox.setTranslate(i, o.getFitPos(t)),
            t.pos === o.currPos && ((o.isAnimating = !1), o.updateCursor())),
          o.adjustLayout(t),
          r.length &&
            (r.trigger("refresh"),
            t.pos === o.currPos &&
              o.$refs.toolbar
                .add(o.$refs.navigation.find(".fancybox-button--arrow_right"))
                .toggleClass(
                  "compensate-for-scrollbar",
                  r.get(0).scrollHeight > r.get(0).clientHeight
                )),
          o.trigger("onUpdate", t, e);
      },
      centerSlide: function (t) {
        var e = this,
          o = e.current,
          i = o.$slide;
        !e.isClosing &&
          o &&
          (i.siblings().css({ transform: "", opacity: "" }),
          i
            .parent()
            .children()
            .removeClass("fancybox-slide--previous fancybox-slide--next"),
          n.fancybox.animate(
            i,
            { top: 0, left: 0, opacity: 1 },
            void 0 === t ? 0 : t,
            function () {
              i.css({ transform: "", opacity: "" }),
                o.isComplete || e.complete();
            },
            !1
          ));
      },
      isMoved: function (t) {
        var e,
          o,
          i = t || this.current;
        return (
          !!i &&
          ((o = n.fancybox.getTranslate(this.$refs.stage)),
          (e = n.fancybox.getTranslate(i.$slide)),
          !i.$slide.hasClass("fancybox-animated") &&
            (Math.abs(e.top - o.top) > 0.5 || Math.abs(e.left - o.left) > 0.5))
        );
      },
      updateCursor: function (t, e) {
        var o,
          i,
          a = this,
          s = a.current,
          r = a.$refs.container;
        s &&
          !a.isClosing &&
          a.Guestures &&
          (r.removeClass(
            "fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"
          ),
          (o = a.canPan(t, e)),
          (i = !!o || a.isZoomable()),
          r.toggleClass("fancybox-is-zoomable", i),
          n("[data-fancybox-zoom]").prop("disabled", !i),
          o
            ? r.addClass("fancybox-can-pan")
            : i &&
              ("zoom" === s.opts.clickContent ||
                (n.isFunction(s.opts.clickContent) &&
                  "zoom" == s.opts.clickContent(s)))
            ? r.addClass("fancybox-can-zoomIn")
            : s.opts.touch &&
              (s.opts.touch.vertical || a.group.length > 1) &&
              "video" !== s.contentType &&
              r.addClass("fancybox-can-swipe"));
      },
      isZoomable: function () {
        var t,
          e = this,
          n = e.current;
        if (n && !e.isClosing && "image" === n.type && !n.hasError) {
          if (!n.isLoaded) return !0;
          if (
            (t = e.getFitPos(n)) &&
            (n.width > t.width || n.height > t.height)
          )
            return !0;
        }
        return !1;
      },
      isScaledDown: function (t, e) {
        var o = this,
          i = !1,
          a = o.current,
          s = a.$content;
        return (
          void 0 !== t && void 0 !== e
            ? (i = t < a.width && e < a.height)
            : s &&
              ((i = n.fancybox.getTranslate(s)),
              (i = i.width < a.width && i.height < a.height)),
          i
        );
      },
      canPan: function (t, e) {
        var o = this,
          i = o.current,
          a = null,
          s = !1;
        return (
          "image" === i.type &&
            (i.isComplete || (t && e)) &&
            !i.hasError &&
            ((s = o.getFitPos(i)),
            void 0 !== t && void 0 !== e
              ? (a = { width: t, height: e })
              : i.isComplete && (a = n.fancybox.getTranslate(i.$content)),
            a &&
              s &&
              (s =
                Math.abs(a.width - s.width) > 1.5 ||
                Math.abs(a.height - s.height) > 1.5)),
          s
        );
      },
      loadSlide: function (t) {
        var e,
          o,
          i,
          a = this;
        if (!t.isLoading && !t.isLoaded) {
          if (((t.isLoading = !0), !1 === a.trigger("beforeLoad", t)))
            return (t.isLoading = !1), !1;
          switch (
            ((e = t.type),
            (o = t.$slide),
            o.off("refresh").trigger("onReset").addClass(t.opts.slideClass),
            e)
          ) {
            case "image":
              a.setImage(t);
              break;
            case "iframe":
              a.setIframe(t);
              break;
            case "html":
              a.setContent(t, t.src || t.content);
              break;
            case "video":
              a.setContent(
                t,
                t.opts.video.tpl
                  .replace(/\{\{src\}\}/gi, t.src)
                  .replace(
                    "{{format}}",
                    t.opts.videoFormat || t.opts.video.format || ""
                  )
                  .replace("{{poster}}", t.thumb || "")
              );
              break;
            case "inline":
              n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t);
              break;
            case "ajax":
              a.showLoading(t),
                (i = n.ajax(
                  n.extend({}, t.opts.ajax.settings, {
                    url: t.src,
                    success: function (e, n) {
                      "success" === n && a.setContent(t, e);
                    },
                    error: function (e, n) {
                      e && "abort" !== n && a.setError(t);
                    },
                  })
                )),
                o.one("onReset", function () {
                  i.abort();
                });
              break;
            default:
              a.setError(t);
          }
          return !0;
        }
      },
      setImage: function (t) {
        var o,
          i = this;
        setTimeout(function () {
          var e = t.$image;
          i.isClosing ||
            !t.isLoading ||
            (e && e.length && e[0].complete) ||
            t.hasError ||
            i.showLoading(t);
        }, 50),
          i.checkSrcset(t),
          (t.$content = n('<div class="fancybox-content"></div>')
            .addClass("fancybox-is-hidden")
            .appendTo(t.$slide.addClass("fancybox-slide--image"))),
          !1 !== t.opts.preload &&
            t.opts.width &&
            t.opts.height &&
            t.thumb &&
            ((t.width = t.opts.width),
            (t.height = t.opts.height),
            (o = e.createElement("img")),
            (o.onerror = function () {
              n(this).remove(), (t.$ghost = null);
            }),
            (o.onload = function () {
              i.afterLoad(t);
            }),
            (t.$ghost = n(o)
              .addClass("fancybox-image")
              .appendTo(t.$content)
              .attr("src", t.thumb))),
          i.setBigImage(t);
      },
      checkSrcset: function (e) {
        var n,
          o,
          i,
          a,
          s = e.opts.srcset || e.opts.image.srcset;
        if (s) {
          (i = t.devicePixelRatio || 1),
            (a = t.innerWidth * i),
            (o = s.split(",").map(function (t) {
              var e = {};
              return (
                t
                  .trim()
                  .split(/\s+/)
                  .forEach(function (t, n) {
                    var o = parseInt(t.substring(0, t.length - 1), 10);
                    if (0 === n) return (e.url = t);
                    o && ((e.value = o), (e.postfix = t[t.length - 1]));
                  }),
                e
              );
            })),
            o.sort(function (t, e) {
              return t.value - e.value;
            });
          for (var r = 0; r < o.length; r++) {
            var c = o[r];
            if (
              ("w" === c.postfix && c.value >= a) ||
              ("x" === c.postfix && c.value >= i)
            ) {
              n = c;
              break;
            }
          }
          !n && o.length && (n = o[o.length - 1]),
            n &&
              ((e.src = n.url),
              e.width &&
                e.height &&
                "w" == n.postfix &&
                ((e.height = (e.width / e.height) * n.value),
                (e.width = n.value)),
              (e.opts.srcset = s));
        }
      },
      setBigImage: function (t) {
        var o = this,
          i = e.createElement("img"),
          a = n(i);
        (t.$image = a
          .one("error", function () {
            o.setError(t);
          })
          .one("load", function () {
            var e;
            t.$ghost ||
              (o.resolveImageSlideSize(
                t,
                this.naturalWidth,
                this.naturalHeight
              ),
              o.afterLoad(t)),
              o.isClosing ||
                (t.opts.srcset &&
                  ((e = t.opts.sizes),
                  (e && "auto" !== e) ||
                    (e =
                      (t.width / t.height > 1 && s.width() / s.height() > 1
                        ? "100"
                        : Math.round((t.width / t.height) * 100)) + "vw"),
                  a.attr("sizes", e).attr("srcset", t.opts.srcset)),
                t.$ghost &&
                  setTimeout(function () {
                    t.$ghost && !o.isClosing && t.$ghost.hide();
                  }, Math.min(300, Math.max(1e3, t.height / 1600))),
                o.hideLoading(t));
          })
          .addClass("fancybox-image")
          .attr("src", t.src)
          .appendTo(t.$content)),
          (i.complete || "complete" == i.readyState) &&
          a.naturalWidth &&
          a.naturalHeight
            ? a.trigger("load")
            : i.error && a.trigger("error");
      },
      resolveImageSlideSize: function (t, e, n) {
        var o = parseInt(t.opts.width, 10),
          i = parseInt(t.opts.height, 10);
        (t.width = e),
          (t.height = n),
          o > 0 && ((t.width = o), (t.height = Math.floor((o * n) / e))),
          i > 0 && ((t.width = Math.floor((i * e) / n)), (t.height = i));
      },
      setIframe: function (t) {
        var e,
          o = this,
          i = t.opts.iframe,
          a = t.$slide;
        (t.$content = n(
          '<div class="fancybox-content' +
            (i.preload ? " fancybox-is-hidden" : "") +
            '"></div>'
        )
          .css(i.css)
          .appendTo(a)),
          a.addClass("fancybox-slide--" + t.contentType),
          (t.$iframe = e =
            n(i.tpl.replace(/\{rnd\}/g, new Date().getTime()))
              .attr(i.attr)
              .appendTo(t.$content)),
          i.preload
            ? (o.showLoading(t),
              e.on("load.fb error.fb", function (e) {
                (this.isReady = 1), t.$slide.trigger("refresh"), o.afterLoad(t);
              }),
              a.on("refresh.fb", function () {
                var n,
                  o,
                  s = t.$content,
                  r = i.css.width,
                  c = i.css.height;
                if (1 === e[0].isReady) {
                  try {
                    (n = e.contents()), (o = n.find("body"));
                  } catch (t) {}
                  o &&
                    o.length &&
                    o.children().length &&
                    (a.css("overflow", "visible"),
                    s.css({
                      width: "100%",
                      "max-width": "100%",
                      height: "9999px",
                    }),
                    void 0 === r &&
                      (r = Math.ceil(
                        Math.max(o[0].clientWidth, o.outerWidth(!0))
                      )),
                    s.css("width", r || "").css("max-width", ""),
                    void 0 === c &&
                      (c = Math.ceil(
                        Math.max(o[0].clientHeight, o.outerHeight(!0))
                      )),
                    s.css("height", c || ""),
                    a.css("overflow", "auto")),
                    s.removeClass("fancybox-is-hidden");
                }
              }))
            : o.afterLoad(t),
          e.attr("src", t.src),
          a.one("onReset", function () {
            try {
              n(this)
                .find("iframe")
                .hide()
                .unbind()
                .attr("src", "//about:blank");
            } catch (t) {}
            n(this).off("refresh.fb").empty(),
              (t.isLoaded = !1),
              (t.isRevealed = !1);
          });
      },
      setContent: function (t, e) {
        var o = this;
        o.isClosing ||
          (o.hideLoading(t),
          t.$content && n.fancybox.stop(t.$content),
          t.$slide.empty(),
          l(e) && e.parent().length
            ? ((e.hasClass("fancybox-content") ||
                e.parent().hasClass("fancybox-content")) &&
                e.parents(".fancybox-slide").trigger("onReset"),
              (t.$placeholder = n("<div>").hide().insertAfter(e)),
              e.css("display", "inline-block"))
            : t.hasError ||
              ("string" === n.type(e) &&
                (e = n("<div>").append(n.trim(e)).contents()),
              t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))),
          t.$slide.one("onReset", function () {
            n(this).find("video,audio").trigger("pause"),
              t.$placeholder &&
                (t.$placeholder
                  .after(e.removeClass("fancybox-content").hide())
                  .remove(),
                (t.$placeholder = null)),
              t.$smallBtn && (t.$smallBtn.remove(), (t.$smallBtn = null)),
              t.hasError ||
                (n(this).empty(), (t.isLoaded = !1), (t.isRevealed = !1));
          }),
          n(e).appendTo(t.$slide),
          n(e).is("video,audio") &&
            (n(e).addClass("fancybox-video"),
            n(e).wrap("<div></div>"),
            (t.contentType = "video"),
            (t.opts.width = t.opts.width || n(e).attr("width")),
            (t.opts.height = t.opts.height || n(e).attr("height"))),
          (t.$content = t.$slide
            .children()
            .filter("div,form,main,video,audio,article,.fancybox-content")
            .first()),
          t.$content.siblings().hide(),
          t.$content.length ||
            (t.$content = t.$slide.wrapInner("<div></div>").children().first()),
          t.$content.addClass("fancybox-content"),
          t.$slide.addClass("fancybox-slide--" + t.contentType),
          o.afterLoad(t));
      },
      setError: function (t) {
        (t.hasError = !0),
          t.$slide
            .trigger("onReset")
            .removeClass("fancybox-slide--" + t.contentType)
            .addClass("fancybox-slide--error"),
          (t.contentType = "html"),
          this.setContent(t, this.translate(t, t.opts.errorTpl)),
          t.pos === this.currPos && (this.isAnimating = !1);
      },
      showLoading: function (t) {
        var e = this;
        (t = t || e.current) &&
          !t.$spinner &&
          (t.$spinner = n(e.translate(e, e.opts.spinnerTpl))
            .appendTo(t.$slide)
            .hide()
            .fadeIn("fast"));
      },
      hideLoading: function (t) {
        var e = this;
        (t = t || e.current) &&
          t.$spinner &&
          (t.$spinner.stop().remove(), delete t.$spinner);
      },
      afterLoad: function (t) {
        var e = this;
        e.isClosing ||
          ((t.isLoading = !1),
          (t.isLoaded = !0),
          e.trigger("afterLoad", t),
          e.hideLoading(t),
          !t.opts.smallBtn ||
            (t.$smallBtn && t.$smallBtn.length) ||
            (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(
              t.$content
            )),
          t.opts.protect &&
            t.$content &&
            !t.hasError &&
            (t.$content.on("contextmenu.fb", function (t) {
              return 2 == t.button && t.preventDefault(), !0;
            }),
            "image" === t.type &&
              n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)),
          e.adjustCaption(t),
          e.adjustLayout(t),
          t.pos === e.currPos && e.updateCursor(),
          e.revealContent(t));
      },
      adjustCaption: function (t) {
        var e,
          n = this,
          o = t || n.current,
          i = o.opts.caption,
          a = o.opts.preventCaptionOverlap,
          s = n.$refs.caption,
          r = !1;
        s.toggleClass("fancybox-caption--separate", a),
          a &&
            i &&
            i.length &&
            (o.pos !== n.currPos
              ? ((e = s.clone().appendTo(s.parent())),
                e.children().eq(0).empty().html(i),
                (r = e.outerHeight(!0)),
                e.empty().remove())
              : n.$caption && (r = n.$caption.outerHeight(!0)),
            o.$slide.css("padding-bottom", r || ""));
      },
      adjustLayout: function (t) {
        var e,
          n,
          o,
          i,
          a = this,
          s = t || a.current;
        s.isLoaded &&
          !0 !== s.opts.disableLayoutFix &&
          (s.$content.css("margin-bottom", ""),
          s.$content.outerHeight() > s.$slide.height() + 0.5 &&
            ((o = s.$slide[0].style["padding-bottom"]),
            (i = s.$slide.css("padding-bottom")),
            parseFloat(i) > 0 &&
              ((e = s.$slide[0].scrollHeight),
              s.$slide.css("padding-bottom", 0),
              Math.abs(e - s.$slide[0].scrollHeight) < 1 && (n = i),
              s.$slide.css("padding-bottom", o))),
          s.$content.css("margin-bottom", n));
      },
      revealContent: function (t) {
        var e,
          o,
          i,
          a,
          s = this,
          r = t.$slide,
          c = !1,
          l = !1,
          d = s.isMoved(t),
          u = t.isRevealed;
        return (
          (t.isRevealed = !0),
          (e = t.opts[s.firstRun ? "animationEffect" : "transitionEffect"]),
          (i = t.opts[s.firstRun ? "animationDuration" : "transitionDuration"]),
          (i = parseInt(
            void 0 === t.forcedDuration ? i : t.forcedDuration,
            10
          )),
          (!d && t.pos === s.currPos && i) || (e = !1),
          "zoom" === e &&
            (t.pos === s.currPos &&
            i &&
            "image" === t.type &&
            !t.hasError &&
            (l = s.getThumbPos(t))
              ? (c = s.getFitPos(t))
              : (e = "fade")),
          "zoom" === e
            ? ((s.isAnimating = !0),
              (c.scaleX = c.width / l.width),
              (c.scaleY = c.height / l.height),
              (a = t.opts.zoomOpacity),
              "auto" == a &&
                (a = Math.abs(t.width / t.height - l.width / l.height) > 0.1),
              a && ((l.opacity = 0.1), (c.opacity = 1)),
              n.fancybox.setTranslate(
                t.$content.removeClass("fancybox-is-hidden"),
                l
              ),
              p(t.$content),
              void n.fancybox.animate(t.$content, c, i, function () {
                (s.isAnimating = !1), s.complete();
              }))
            : (s.updateSlide(t),
              e
                ? (n.fancybox.stop(r),
                  (o =
                    "fancybox-slide--" +
                    (t.pos >= s.prevPos ? "next" : "previous") +
                    " fancybox-animated fancybox-fx-" +
                    e),
                  r.addClass(o).removeClass("fancybox-slide--current"),
                  t.$content.removeClass("fancybox-is-hidden"),
                  p(r),
                  "image" !== t.type && t.$content.hide().show(0),
                  void n.fancybox.animate(
                    r,
                    "fancybox-slide--current",
                    i,
                    function () {
                      r.removeClass(o).css({ transform: "", opacity: "" }),
                        t.pos === s.currPos && s.complete();
                    },
                    !0
                  ))
                : (t.$content.removeClass("fancybox-is-hidden"),
                  u ||
                    !d ||
                    "image" !== t.type ||
                    t.hasError ||
                    t.$content.hide().fadeIn("fast"),
                  void (t.pos === s.currPos && s.complete())))
        );
      },
      getThumbPos: function (t) {
        var e,
          o,
          i,
          a,
          s,
          r = !1,
          c = t.$thumb;
        return (
          !(!c || !g(c[0])) &&
          ((e = n.fancybox.getTranslate(c)),
          (o = parseFloat(c.css("border-top-width") || 0)),
          (i = parseFloat(c.css("border-right-width") || 0)),
          (a = parseFloat(c.css("border-bottom-width") || 0)),
          (s = parseFloat(c.css("border-left-width") || 0)),
          (r = {
            top: e.top + o,
            left: e.left + s,
            width: e.width - i - s,
            height: e.height - o - a,
            scaleX: 1,
            scaleY: 1,
          }),
          e.width > 0 && e.height > 0 && r)
        );
      },
      complete: function () {
        var t,
          e = this,
          o = e.current,
          i = {};
        !e.isMoved() &&
          o.isLoaded &&
          (o.isComplete ||
            ((o.isComplete = !0),
            o.$slide.siblings().trigger("onReset"),
            e.preload("inline"),
            p(o.$slide),
            o.$slide.addClass("fancybox-slide--complete"),
            n.each(e.slides, function (t, o) {
              o.pos >= e.currPos - 1 && o.pos <= e.currPos + 1
                ? (i[o.pos] = o)
                : o && (n.fancybox.stop(o.$slide), o.$slide.off().remove());
            }),
            (e.slides = i)),
          (e.isAnimating = !1),
          e.updateCursor(),
          e.trigger("afterShow"),
          o.opts.video.autoStart &&
            o.$slide
              .find("video,audio")
              .filter(":visible:first")
              .trigger("play")
              .one("ended", function () {
                Document.exitFullscreen
                  ? Document.exitFullscreen()
                  : this.webkitExitFullscreen && this.webkitExitFullscreen(),
                  e.next();
              }),
          o.opts.autoFocus &&
            "html" === o.contentType &&
            ((t = o.$content.find("input[autofocus]:enabled:visible:first")),
            t.length ? t.trigger("focus") : e.focus(null, !0)),
          o.$slide.scrollTop(0).scrollLeft(0));
      },
      preload: function (t) {
        var e,
          n,
          o = this;
        o.group.length < 2 ||
          ((n = o.slides[o.currPos + 1]),
          (e = o.slides[o.currPos - 1]),
          e && e.type === t && o.loadSlide(e),
          n && n.type === t && o.loadSlide(n));
      },
      focus: function (t, o) {
        var i,
          a,
          s = this,
          r = [
            "a[href]",
            "area[href]",
            'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
            "select:not([disabled]):not([aria-hidden])",
            "textarea:not([disabled]):not([aria-hidden])",
            "button:not([disabled]):not([aria-hidden])",
            "iframe",
            "object",
            "embed",
            "video",
            "audio",
            "[contenteditable]",
            '[tabindex]:not([tabindex^="-"])',
          ].join(",");
        s.isClosing ||
          ((i =
            !t && s.current && s.current.isComplete
              ? s.current.$slide.find(
                  "*:visible" + (o ? ":not(.fancybox-close-small)" : "")
                )
              : s.$refs.container.find("*:visible")),
          (i = i.filter(r).filter(function () {
            return (
              "hidden" !== n(this).css("visibility") &&
              !n(this).hasClass("disabled")
            );
          })),
          i.length
            ? ((a = i.index(e.activeElement)),
              t && t.shiftKey
                ? (a < 0 || 0 == a) &&
                  (t.preventDefault(), i.eq(i.length - 1).trigger("focus"))
                : (a < 0 || a == i.length - 1) &&
                  (t && t.preventDefault(), i.eq(0).trigger("focus")))
            : s.$refs.container.trigger("focus"));
      },
      activate: function () {
        var t = this;
        n(".fancybox-container").each(function () {
          var e = n(this).data("FancyBox");
          e &&
            e.id !== t.id &&
            !e.isClosing &&
            (e.trigger("onDeactivate"), e.removeEvents(), (e.isVisible = !1));
        }),
          (t.isVisible = !0),
          (t.current || t.isIdle) && (t.update(), t.updateControls()),
          t.trigger("onActivate"),
          t.addEvents();
      },
      close: function (t, e) {
        var o,
          i,
          a,
          s,
          r,
          c,
          l,
          u = this,
          f = u.current,
          h = function () {
            u.cleanUp(t);
          };
        return (
          !u.isClosing &&
          ((u.isClosing = !0),
          !1 === u.trigger("beforeClose", t)
            ? ((u.isClosing = !1),
              d(function () {
                u.update();
              }),
              !1)
            : (u.removeEvents(),
              (a = f.$content),
              (o = f.opts.animationEffect),
              (i = n.isNumeric(e) ? e : o ? f.opts.animationDuration : 0),
              f.$slide.removeClass(
                "fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"
              ),
              !0 !== t ? n.fancybox.stop(f.$slide) : (o = !1),
              f.$slide.siblings().trigger("onReset").remove(),
              i &&
                u.$refs.container
                  .removeClass("fancybox-is-open")
                  .addClass("fancybox-is-closing")
                  .css("transition-duration", i + "ms"),
              u.hideLoading(f),
              u.hideControls(!0),
              u.updateCursor(),
              "zoom" !== o ||
                (a &&
                  i &&
                  "image" === f.type &&
                  !u.isMoved() &&
                  !f.hasError &&
                  (l = u.getThumbPos(f))) ||
                (o = "fade"),
              "zoom" === o
                ? (n.fancybox.stop(a),
                  (s = n.fancybox.getTranslate(a)),
                  (c = {
                    top: s.top,
                    left: s.left,
                    scaleX: s.width / l.width,
                    scaleY: s.height / l.height,
                    width: l.width,
                    height: l.height,
                  }),
                  (r = f.opts.zoomOpacity),
                  "auto" == r &&
                    (r =
                      Math.abs(f.width / f.height - l.width / l.height) > 0.1),
                  r && (l.opacity = 0),
                  n.fancybox.setTranslate(a, c),
                  p(a),
                  n.fancybox.animate(a, l, i, h),
                  !0)
                : (o && i
                    ? n.fancybox.animate(
                        f.$slide
                          .addClass("fancybox-slide--previous")
                          .removeClass("fancybox-slide--current"),
                        "fancybox-animated fancybox-fx-" + o,
                        i,
                        h
                      )
                    : !0 === t
                    ? setTimeout(h, i)
                    : h(),
                  !0)))
        );
      },
      cleanUp: function (e) {
        var o,
          i,
          a,
          s = this,
          r = s.current.opts.$orig;
        s.current.$slide.trigger("onReset"),
          s.$refs.container.empty().remove(),
          s.trigger("afterClose", e),
          s.current.opts.backFocus &&
            ((r && r.length && r.is(":visible")) || (r = s.$trigger),
            r &&
              r.length &&
              ((i = t.scrollX),
              (a = t.scrollY),
              r.trigger("focus"),
              n("html, body").scrollTop(a).scrollLeft(i))),
          (s.current = null),
          (o = n.fancybox.getInstance()),
          o
            ? o.activate()
            : (n("body").removeClass(
                "fancybox-active compensate-for-scrollbar"
              ),
              n("#fancybox-style-noscroll").remove());
      },
      trigger: function (t, e) {
        var o,
          i = Array.prototype.slice.call(arguments, 1),
          a = this,
          s = e && e.opts ? e : a.current;
        if (
          (s ? i.unshift(s) : (s = a),
          i.unshift(a),
          n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)),
          !1 === o)
        )
          return o;
        "afterClose" !== t && a.$refs
          ? a.$refs.container.trigger(t + ".fb", i)
          : r.trigger(t + ".fb", i);
      },
      updateControls: function () {
        var t = this,
          o = t.current,
          i = o.index,
          a = t.$refs.container,
          s = t.$refs.caption,
          r = o.opts.caption;
        o.$slide.trigger("refresh"),
          r && r.length
            ? ((t.$caption = s), s.children().eq(0).html(r))
            : (t.$caption = null),
          t.hasHiddenControls || t.isIdle || t.showControls(),
          a.find("[data-fancybox-count]").html(t.group.length),
          a.find("[data-fancybox-index]").html(i + 1),
          a
            .find("[data-fancybox-prev]")
            .prop("disabled", !o.opts.loop && i <= 0),
          a
            .find("[data-fancybox-next]")
            .prop("disabled", !o.opts.loop && i >= t.group.length - 1),
          "image" === o.type
            ? a
                .find("[data-fancybox-zoom]")
                .show()
                .end()
                .find("[data-fancybox-download]")
                .attr("href", o.opts.image.src || o.src)
                .show()
            : o.opts.toolbar &&
              a.find("[data-fancybox-download],[data-fancybox-zoom]").hide(),
          n(e.activeElement).is(":hidden,[disabled]") &&
            t.$refs.container.trigger("focus");
      },
      hideControls: function (t) {
        var e = this,
          n = ["infobar", "toolbar", "nav"];
        (!t && e.current.opts.preventCaptionOverlap) || n.push("caption"),
          this.$refs.container.removeClass(
            n
              .map(function (t) {
                return "fancybox-show-" + t;
              })
              .join(" ")
          ),
          (this.hasHiddenControls = !0);
      },
      showControls: function () {
        var t = this,
          e = t.current ? t.current.opts : t.opts,
          n = t.$refs.container;
        (t.hasHiddenControls = !1),
          (t.idleSecondsCounter = 0),
          n
            .toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons))
            .toggleClass(
              "fancybox-show-infobar",
              !!(e.infobar && t.group.length > 1)
            )
            .toggleClass("fancybox-show-caption", !!t.$caption)
            .toggleClass(
              "fancybox-show-nav",
              !!(e.arrows && t.group.length > 1)
            )
            .toggleClass("fancybox-is-modal", !!e.modal);
      },
      toggleControls: function () {
        this.hasHiddenControls ? this.showControls() : this.hideControls();
      },
    }),
      (n.fancybox = {
        version: "3.5.7",
        defaults: a,
        getInstance: function (t) {
          var e = n(
              '.fancybox-container:not(".fancybox-is-closing"):last'
            ).data("FancyBox"),
            o = Array.prototype.slice.call(arguments, 1);
          return (
            e instanceof b &&
            ("string" === n.type(t)
              ? e[t].apply(e, o)
              : "function" === n.type(t) && t.apply(e, o),
            e)
          );
        },
        open: function (t, e, n) {
          return new b(t, e, n);
        },
        close: function (t) {
          var e = this.getInstance();
          e && (e.close(), !0 === t && this.close(t));
        },
        destroy: function () {
          this.close(!0), r.add("body").off("click.fb-start", "**");
        },
        isMobile:
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          ),
        use3d: (function () {
          var n = e.createElement("div");
          return (
            t.getComputedStyle &&
            t.getComputedStyle(n) &&
            t.getComputedStyle(n).getPropertyValue("transform") &&
            !(e.documentMode && e.documentMode < 11)
          );
        })(),
        getTranslate: function (t) {
          var e;
          return (
            !(!t || !t.length) &&
            ((e = t[0].getBoundingClientRect()),
            {
              top: e.top || 0,
              left: e.left || 0,
              width: e.width,
              height: e.height,
              opacity: parseFloat(t.css("opacity")),
            })
          );
        },
        setTranslate: function (t, e) {
          var n = "",
            o = {};
          if (t && e)
            return (
              (void 0 === e.left && void 0 === e.top) ||
                ((n =
                  (void 0 === e.left ? t.position().left : e.left) +
                  "px, " +
                  (void 0 === e.top ? t.position().top : e.top) +
                  "px"),
                (n = this.use3d
                  ? "translate3d(" + n + ", 0px)"
                  : "translate(" + n + ")")),
              void 0 !== e.scaleX && void 0 !== e.scaleY
                ? (n += " scale(" + e.scaleX + ", " + e.scaleY + ")")
                : void 0 !== e.scaleX && (n += " scaleX(" + e.scaleX + ")"),
              n.length && (o.transform = n),
              void 0 !== e.opacity && (o.opacity = e.opacity),
              void 0 !== e.width && (o.width = e.width),
              void 0 !== e.height && (o.height = e.height),
              t.css(o)
            );
        },
        animate: function (t, e, o, i, a) {
          var s,
            r = this;
          n.isFunction(o) && ((i = o), (o = null)),
            r.stop(t),
            (s = r.getTranslate(t)),
            t.on(f, function (c) {
              (!c ||
                !c.originalEvent ||
                (t.is(c.originalEvent.target) &&
                  "z-index" != c.originalEvent.propertyName)) &&
                (r.stop(t),
                n.isNumeric(o) && t.css("transition-duration", ""),
                n.isPlainObject(e)
                  ? void 0 !== e.scaleX &&
                    void 0 !== e.scaleY &&
                    r.setTranslate(t, {
                      top: e.top,
                      left: e.left,
                      width: s.width * e.scaleX,
                      height: s.height * e.scaleY,
                      scaleX: 1,
                      scaleY: 1,
                    })
                  : !0 !== a && t.removeClass(e),
                n.isFunction(i) && i(c));
            }),
            n.isNumeric(o) && t.css("transition-duration", o + "ms"),
            n.isPlainObject(e)
              ? (void 0 !== e.scaleX &&
                  void 0 !== e.scaleY &&
                  (delete e.width,
                  delete e.height,
                  t.parent().hasClass("fancybox-slide--image") &&
                    t.parent().addClass("fancybox-is-scaling")),
                n.fancybox.setTranslate(t, e))
              : t.addClass(e),
            t.data(
              "timer",
              setTimeout(function () {
                t.trigger(f);
              }, o + 33)
            );
        },
        stop: function (t, e) {
          t &&
            t.length &&
            (clearTimeout(t.data("timer")),
            e && t.trigger(f),
            t.off(f).css("transition-duration", ""),
            t.parent().removeClass("fancybox-is-scaling"));
        },
      }),
      (n.fn.fancybox = function (t) {
        var e;
        return (
          (t = t || {}),
          (e = t.selector || !1),
          e
            ? n("body")
                .off("click.fb-start", e)
                .on("click.fb-start", e, { options: t }, i)
            : this.off("click.fb-start").on(
                "click.fb-start",
                { items: this, options: t },
                i
              ),
          this
        );
      }),
      r.on("click.fb-start", "[data-fancybox]", i),
      r.on("click.fb-start", "[data-fancybox-trigger]", function (t) {
        n('[data-fancybox="' + n(this).attr("data-fancybox-trigger") + '"]')
          .eq(n(this).attr("data-fancybox-index") || 0)
          .trigger("click.fb-start", { $trigger: n(this) });
      }),
      (function () {
        var t = null;
        r.on("mousedown mouseup focus blur", ".fancybox-button", function (e) {
          switch (e.type) {
            case "mousedown":
              t = n(this);
              break;
            case "mouseup":
              t = null;
              break;
            case "focusin":
              n(".fancybox-button").removeClass("fancybox-focus"),
                n(this).is(t) ||
                  n(this).is("[disabled]") ||
                  n(this).addClass("fancybox-focus");
              break;
            case "focusout":
              n(".fancybox-button").removeClass("fancybox-focus");
          }
        });
      })();
  }
})(window, document, jQuery),
  (function (t) {
    "use strict";
    var e = {
        youtube: {
          matcher:
            /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
          params: {
            autoplay: 1,
            autohide: 1,
            fs: 1,
            rel: 0,
            hd: 1,
            wmode: "transparent",
            enablejsapi: 1,
            html5: 1,
          },
          paramPlace: 8,
          type: "iframe",
          url: "https://www.youtube-nocookie.com/embed/$4",
          thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg",
        },
        vimeo: {
          matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
          params: {
            autoplay: 1,
            hd: 1,
            show_title: 1,
            show_byline: 1,
            show_portrait: 0,
            fullscreen: 1,
          },
          paramPlace: 3,
          type: "iframe",
          url: "//player.vimeo.com/video/$2",
        },
        instagram: {
          matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
          type: "image",
          url: "//$1/p/$2/media/?size=l",
        },
        gmap_place: {
          matcher:
            /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
          type: "iframe",
          url: function (t) {
            return (
              "//maps.google." +
              t[2] +
              "/?ll=" +
              (t[9]
                ? t[9] +
                  "&z=" +
                  Math.floor(t[10]) +
                  (t[12] ? t[12].replace(/^\//, "&") : "")
                : t[12] + ""
              ).replace(/\?/, "&") +
              "&output=" +
              (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
            );
          },
        },
        gmap_search: {
          matcher:
            /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
          type: "iframe",
          url: function (t) {
            return (
              "//maps.google." +
              t[2] +
              "/maps?q=" +
              t[5].replace("query=", "q=").replace("api=1", "") +
              "&output=embed"
            );
          },
        },
      },
      n = function (e, n, o) {
        if (e)
          return (
            (o = o || ""),
            "object" === t.type(o) && (o = t.param(o, !0)),
            t.each(n, function (t, n) {
              e = e.replace("$" + t, n || "");
            }),
            o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o),
            e
          );
      };
    t(document).on("objectNeedsType.fb", function (o, i, a) {
      var s,
        r,
        c,
        l,
        d,
        u,
        f,
        p = a.src || "",
        h = !1;
      (s = t.extend(!0, {}, e, a.opts.media)),
        t.each(s, function (e, o) {
          if ((c = p.match(o.matcher))) {
            if (
              ((h = o.type), (f = e), (u = {}), o.paramPlace && c[o.paramPlace])
            ) {
              (d = c[o.paramPlace]),
                "?" == d[0] && (d = d.substring(1)),
                (d = d.split("&"));
              for (var i = 0; i < d.length; ++i) {
                var s = d[i].split("=", 2);
                2 == s.length &&
                  (u[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")));
              }
            }
            return (
              (l = t.extend(!0, {}, o.params, a.opts[e], u)),
              (p =
                "function" === t.type(o.url)
                  ? o.url.call(this, c, l, a)
                  : n(o.url, c, l)),
              (r =
                "function" === t.type(o.thumb)
                  ? o.thumb.call(this, c, l, a)
                  : n(o.thumb, c)),
              "youtube" === e
                ? (p = p.replace(/&t=((\d+)m)?(\d+)s/, function (t, e, n, o) {
                    return (
                      "&start=" +
                      ((n ? 60 * parseInt(n, 10) : 0) + parseInt(o, 10))
                    );
                  }))
                : "vimeo" === e && (p = p.replace("&%23", "#")),
              !1
            );
          }
        }),
        h
          ? (a.opts.thumb ||
              (a.opts.$thumb && a.opts.$thumb.length) ||
              (a.opts.thumb = r),
            "iframe" === h &&
              (a.opts = t.extend(!0, a.opts, {
                iframe: { preload: !1, attr: { scrolling: "no" } },
              })),
            t.extend(a, {
              type: h,
              src: p,
              origSrc: a.src,
              contentSource: f,
              contentType:
                "image" === h
                  ? "image"
                  : "gmap_place" == f || "gmap_search" == f
                  ? "map"
                  : "video",
            }))
          : p && (a.type = a.opts.defaultType);
    });
    var o = {
      youtube: {
        src: "https://www.youtube.com/iframe_api",
        class: "YT",
        loading: !1,
        loaded: !1,
      },
      vimeo: {
        src: "https://player.vimeo.com/api/player.js",
        class: "Vimeo",
        loading: !1,
        loaded: !1,
      },
      load: function (t) {
        var e,
          n = this;
        if (this[t].loaded)
          return void setTimeout(function () {
            n.done(t);
          });
        this[t].loading ||
          ((this[t].loading = !0),
          (e = document.createElement("script")),
          (e.type = "text/javascript"),
          (e.src = this[t].src),
          "youtube" === t
            ? (window.onYouTubeIframeAPIReady = function () {
                (n[t].loaded = !0), n.done(t);
              })
            : (e.onload = function () {
                (n[t].loaded = !0), n.done(t);
              }),
          document.body.appendChild(e));
      },
      done: function (e) {
        var n, o, i;
        "youtube" === e && delete window.onYouTubeIframeAPIReady,
          (n = t.fancybox.getInstance()) &&
            ((o = n.current.$content.find("iframe")),
            "youtube" === e && void 0 !== YT && YT
              ? (i = new YT.Player(o.attr("id"), {
                  events: {
                    onStateChange: function (t) {
                      0 == t.data && n.next();
                    },
                  },
                }))
              : "vimeo" === e &&
                void 0 !== Vimeo &&
                Vimeo &&
                ((i = new Vimeo.Player(o)),
                i.on("ended", function () {
                  n.next();
                })));
      },
    };
    t(document).on({
      "afterShow.fb": function (t, e, n) {
        e.group.length > 1 &&
          ("youtube" === n.contentSource || "vimeo" === n.contentSource) &&
          o.load(n.contentSource);
      },
    });
  })(jQuery),
  (function (t, e, n) {
    "use strict";
    var o = (function () {
        return (
          t.requestAnimationFrame ||
          t.webkitRequestAnimationFrame ||
          t.mozRequestAnimationFrame ||
          t.oRequestAnimationFrame ||
          function (e) {
            return t.setTimeout(e, 1e3 / 60);
          }
        );
      })(),
      i = (function () {
        return (
          t.cancelAnimationFrame ||
          t.webkitCancelAnimationFrame ||
          t.mozCancelAnimationFrame ||
          t.oCancelAnimationFrame ||
          function (e) {
            t.clearTimeout(e);
          }
        );
      })(),
      a = function (e) {
        var n = [];
        (e = e.originalEvent || e || t.e),
          (e =
            e.touches && e.touches.length
              ? e.touches
              : e.changedTouches && e.changedTouches.length
              ? e.changedTouches
              : [e]);
        for (var o in e)
          e[o].pageX
            ? n.push({ x: e[o].pageX, y: e[o].pageY })
            : e[o].clientX && n.push({ x: e[o].clientX, y: e[o].clientY });
        return n;
      },
      s = function (t, e, n) {
        return e && t
          ? "x" === n
            ? t.x - e.x
            : "y" === n
            ? t.y - e.y
            : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
          : 0;
      },
      r = function (t) {
        if (
          t.is(
            'a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe'
          ) ||
          n.isFunction(t.get(0).onclick) ||
          t.data("selectable")
        )
          return !0;
        for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
          if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0;
        return !1;
      },
      c = function (e) {
        var n = t.getComputedStyle(e)["overflow-y"],
          o = t.getComputedStyle(e)["overflow-x"],
          i =
            ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight,
          a = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
        return i || a;
      },
      l = function (t) {
        for (var e = !1; ; ) {
          if ((e = c(t.get(0)))) break;
          if (
            ((t = t.parent()),
            !t.length || t.hasClass("fancybox-stage") || t.is("body"))
          )
            break;
        }
        return e;
      },
      d = function (t) {
        var e = this;
        (e.instance = t),
          (e.$bg = t.$refs.bg),
          (e.$stage = t.$refs.stage),
          (e.$container = t.$refs.container),
          e.destroy(),
          e.$container.on(
            "touchstart.fb.touch mousedown.fb.touch",
            n.proxy(e, "ontouchstart")
          );
      };
    (d.prototype.destroy = function () {
      var t = this;
      t.$container.off(".fb.touch"),
        n(e).off(".fb.touch"),
        t.requestId && (i(t.requestId), (t.requestId = null)),
        t.tapped && (clearTimeout(t.tapped), (t.tapped = null));
    }),
      (d.prototype.ontouchstart = function (o) {
        var i = this,
          c = n(o.target),
          d = i.instance,
          u = d.current,
          f = u.$slide,
          p = u.$content,
          h = "touchstart" == o.type;
        if (
          (h && i.$container.off("mousedown.fb.touch"),
          (!o.originalEvent || 2 != o.originalEvent.button) &&
            f.length &&
            c.length &&
            !r(c) &&
            !r(c.parent()) &&
            (c.is("img") ||
              !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left)))
        ) {
          if (!u || d.isAnimating || u.$slide.hasClass("fancybox-animated"))
            return o.stopPropagation(), void o.preventDefault();
          (i.realPoints = i.startPoints = a(o)),
            i.startPoints.length &&
              (u.touch && o.stopPropagation(),
              (i.startEvent = o),
              (i.canTap = !0),
              (i.$target = c),
              (i.$content = p),
              (i.opts = u.opts.touch),
              (i.isPanning = !1),
              (i.isSwiping = !1),
              (i.isZooming = !1),
              (i.isScrolling = !1),
              (i.canPan = d.canPan()),
              (i.startTime = new Date().getTime()),
              (i.distanceX = i.distanceY = i.distance = 0),
              (i.canvasWidth = Math.round(f[0].clientWidth)),
              (i.canvasHeight = Math.round(f[0].clientHeight)),
              (i.contentLastPos = null),
              (i.contentStartPos = n.fancybox.getTranslate(i.$content) || {
                top: 0,
                left: 0,
              }),
              (i.sliderStartPos = n.fancybox.getTranslate(f)),
              (i.stagePos = n.fancybox.getTranslate(d.$refs.stage)),
              (i.sliderStartPos.top -= i.stagePos.top),
              (i.sliderStartPos.left -= i.stagePos.left),
              (i.contentStartPos.top -= i.stagePos.top),
              (i.contentStartPos.left -= i.stagePos.left),
              n(e)
                .off(".fb.touch")
                .on(
                  h
                    ? "touchend.fb.touch touchcancel.fb.touch"
                    : "mouseup.fb.touch mouseleave.fb.touch",
                  n.proxy(i, "ontouchend")
                )
                .on(
                  h ? "touchmove.fb.touch" : "mousemove.fb.touch",
                  n.proxy(i, "ontouchmove")
                ),
              n.fancybox.isMobile &&
                e.addEventListener("scroll", i.onscroll, !0),
              (((i.opts || i.canPan) &&
                (c.is(i.$stage) || i.$stage.find(c).length)) ||
                (c.is(".fancybox-image") && o.preventDefault(),
                n.fancybox.isMobile &&
                  c.parents(".fancybox-caption").length)) &&
                ((i.isScrollable = l(c) || l(c.parent())),
                (n.fancybox.isMobile && i.isScrollable) || o.preventDefault(),
                (1 === i.startPoints.length || u.hasError) &&
                  (i.canPan
                    ? (n.fancybox.stop(i.$content), (i.isPanning = !0))
                    : (i.isSwiping = !0),
                  i.$container.addClass("fancybox-is-grabbing")),
                2 === i.startPoints.length &&
                  "image" === u.type &&
                  (u.isLoaded || u.$ghost) &&
                  ((i.canTap = !1),
                  (i.isSwiping = !1),
                  (i.isPanning = !1),
                  (i.isZooming = !0),
                  n.fancybox.stop(i.$content),
                  (i.centerPointStartX =
                    0.5 * (i.startPoints[0].x + i.startPoints[1].x) -
                    n(t).scrollLeft()),
                  (i.centerPointStartY =
                    0.5 * (i.startPoints[0].y + i.startPoints[1].y) -
                    n(t).scrollTop()),
                  (i.percentageOfImageAtPinchPointX =
                    (i.centerPointStartX - i.contentStartPos.left) /
                    i.contentStartPos.width),
                  (i.percentageOfImageAtPinchPointY =
                    (i.centerPointStartY - i.contentStartPos.top) /
                    i.contentStartPos.height),
                  (i.startDistanceBetweenFingers = s(
                    i.startPoints[0],
                    i.startPoints[1]
                  )))));
        }
      }),
      (d.prototype.onscroll = function (t) {
        var n = this;
        (n.isScrolling = !0), e.removeEventListener("scroll", n.onscroll, !0);
      }),
      (d.prototype.ontouchmove = function (t) {
        var e = this;
        return void 0 !== t.originalEvent.buttons &&
          0 === t.originalEvent.buttons
          ? void e.ontouchend(t)
          : e.isScrolling
          ? void (e.canTap = !1)
          : ((e.newPoints = a(t)),
            void (
              (e.opts || e.canPan) &&
              e.newPoints.length &&
              e.newPoints.length &&
              ((e.isSwiping && !0 === e.isSwiping) || t.preventDefault(),
              (e.distanceX = s(e.newPoints[0], e.startPoints[0], "x")),
              (e.distanceY = s(e.newPoints[0], e.startPoints[0], "y")),
              (e.distance = s(e.newPoints[0], e.startPoints[0])),
              e.distance > 0 &&
                (e.isSwiping
                  ? e.onSwipe(t)
                  : e.isPanning
                  ? e.onPan()
                  : e.isZooming && e.onZoom()))
            ));
      }),
      (d.prototype.onSwipe = function (e) {
        var a,
          s = this,
          r = s.instance,
          c = s.isSwiping,
          l = s.sliderStartPos.left || 0;
        if (!0 !== c)
          "x" == c &&
            (s.distanceX > 0 &&
            (s.instance.group.length < 2 ||
              (0 === s.instance.current.index && !s.instance.current.opts.loop))
              ? (l += Math.pow(s.distanceX, 0.8))
              : s.distanceX < 0 &&
                (s.instance.group.length < 2 ||
                  (s.instance.current.index === s.instance.group.length - 1 &&
                    !s.instance.current.opts.loop))
              ? (l -= Math.pow(-s.distanceX, 0.8))
              : (l += s.distanceX)),
            (s.sliderLastPos = {
              top: "x" == c ? 0 : s.sliderStartPos.top + s.distanceY,
              left: l,
            }),
            s.requestId && (i(s.requestId), (s.requestId = null)),
            (s.requestId = o(function () {
              s.sliderLastPos &&
                (n.each(s.instance.slides, function (t, e) {
                  var o = e.pos - s.instance.currPos;
                  n.fancybox.setTranslate(e.$slide, {
                    top: s.sliderLastPos.top,
                    left:
                      s.sliderLastPos.left +
                      o * s.canvasWidth +
                      o * e.opts.gutter,
                  });
                }),
                s.$container.addClass("fancybox-is-sliding"));
            }));
        else if (Math.abs(s.distance) > 10) {
          if (
            ((s.canTap = !1),
            r.group.length < 2 && s.opts.vertical
              ? (s.isSwiping = "y")
              : r.isDragging ||
                !1 === s.opts.vertical ||
                ("auto" === s.opts.vertical && n(t).width() > 800)
              ? (s.isSwiping = "x")
              : ((a = Math.abs(
                  (180 * Math.atan2(s.distanceY, s.distanceX)) / Math.PI
                )),
                (s.isSwiping = a > 45 && a < 135 ? "y" : "x")),
            "y" === s.isSwiping && n.fancybox.isMobile && s.isScrollable)
          )
            return void (s.isScrolling = !0);
          (r.isDragging = s.isSwiping),
            (s.startPoints = s.newPoints),
            n.each(r.slides, function (t, e) {
              var o, i;
              n.fancybox.stop(e.$slide),
                (o = n.fancybox.getTranslate(e.$slide)),
                (i = n.fancybox.getTranslate(r.$refs.stage)),
                e.$slide
                  .css({
                    transform: "",
                    opacity: "",
                    "transition-duration": "",
                  })
                  .removeClass("fancybox-animated")
                  .removeClass(function (t, e) {
                    return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ");
                  }),
                e.pos === r.current.pos &&
                  ((s.sliderStartPos.top = o.top - i.top),
                  (s.sliderStartPos.left = o.left - i.left)),
                n.fancybox.setTranslate(e.$slide, {
                  top: o.top - i.top,
                  left: o.left - i.left,
                });
            }),
            r.SlideShow && r.SlideShow.isActive && r.SlideShow.stop();
        }
      }),
      (d.prototype.onPan = function () {
        var t = this;
        if (s(t.newPoints[0], t.realPoints[0]) < (n.fancybox.isMobile ? 10 : 5))
          return void (t.startPoints = t.newPoints);
        (t.canTap = !1),
          (t.contentLastPos = t.limitMovement()),
          t.requestId && i(t.requestId),
          (t.requestId = o(function () {
            n.fancybox.setTranslate(t.$content, t.contentLastPos);
          }));
      }),
      (d.prototype.limitMovement = function () {
        var t,
          e,
          n,
          o,
          i,
          a,
          s = this,
          r = s.canvasWidth,
          c = s.canvasHeight,
          l = s.distanceX,
          d = s.distanceY,
          u = s.contentStartPos,
          f = u.left,
          p = u.top,
          h = u.width,
          g = u.height;
        return (
          (i = h > r ? f + l : f),
          (a = p + d),
          (t = Math.max(0, 0.5 * r - 0.5 * h)),
          (e = Math.max(0, 0.5 * c - 0.5 * g)),
          (n = Math.min(r - h, 0.5 * r - 0.5 * h)),
          (o = Math.min(c - g, 0.5 * c - 0.5 * g)),
          l > 0 && i > t && (i = t - 1 + Math.pow(-t + f + l, 0.8) || 0),
          l < 0 && i < n && (i = n + 1 - Math.pow(n - f - l, 0.8) || 0),
          d > 0 && a > e && (a = e - 1 + Math.pow(-e + p + d, 0.8) || 0),
          d < 0 && a < o && (a = o + 1 - Math.pow(o - p - d, 0.8) || 0),
          { top: a, left: i }
        );
      }),
      (d.prototype.limitPosition = function (t, e, n, o) {
        var i = this,
          a = i.canvasWidth,
          s = i.canvasHeight;
        return (
          n > a
            ? ((t = t > 0 ? 0 : t), (t = t < a - n ? a - n : t))
            : (t = Math.max(0, a / 2 - n / 2)),
          o > s
            ? ((e = e > 0 ? 0 : e), (e = e < s - o ? s - o : e))
            : (e = Math.max(0, s / 2 - o / 2)),
          { top: e, left: t }
        );
      }),
      (d.prototype.onZoom = function () {
        var e = this,
          a = e.contentStartPos,
          r = a.width,
          c = a.height,
          l = a.left,
          d = a.top,
          u = s(e.newPoints[0], e.newPoints[1]),
          f = u / e.startDistanceBetweenFingers,
          p = Math.floor(r * f),
          h = Math.floor(c * f),
          g = (r - p) * e.percentageOfImageAtPinchPointX,
          b = (c - h) * e.percentageOfImageAtPinchPointY,
          m = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
          v = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(),
          y = m - e.centerPointStartX,
          x = v - e.centerPointStartY,
          w = l + (g + y),
          $ = d + (b + x),
          S = { top: $, left: w, scaleX: f, scaleY: f };
        (e.canTap = !1),
          (e.newWidth = p),
          (e.newHeight = h),
          (e.contentLastPos = S),
          e.requestId && i(e.requestId),
          (e.requestId = o(function () {
            n.fancybox.setTranslate(e.$content, e.contentLastPos);
          }));
      }),
      (d.prototype.ontouchend = function (t) {
        var o = this,
          s = o.isSwiping,
          r = o.isPanning,
          c = o.isZooming,
          l = o.isScrolling;
        if (
          ((o.endPoints = a(t)),
          (o.dMs = Math.max(new Date().getTime() - o.startTime, 1)),
          o.$container.removeClass("fancybox-is-grabbing"),
          n(e).off(".fb.touch"),
          e.removeEventListener("scroll", o.onscroll, !0),
          o.requestId && (i(o.requestId), (o.requestId = null)),
          (o.isSwiping = !1),
          (o.isPanning = !1),
          (o.isZooming = !1),
          (o.isScrolling = !1),
          (o.instance.isDragging = !1),
          o.canTap)
        )
          return o.onTap(t);
        (o.speed = 100),
          (o.velocityX = (o.distanceX / o.dMs) * 0.5),
          (o.velocityY = (o.distanceY / o.dMs) * 0.5),
          r ? o.endPanning() : c ? o.endZooming() : o.endSwiping(s, l);
      }),
      (d.prototype.endSwiping = function (t, e) {
        var o = this,
          i = !1,
          a = o.instance.group.length,
          s = Math.abs(o.distanceX),
          r = "x" == t && a > 1 && ((o.dMs > 130 && s > 10) || s > 50);
        (o.sliderLastPos = null),
          "y" == t && !e && Math.abs(o.distanceY) > 50
            ? (n.fancybox.animate(
                o.instance.current.$slide,
                {
                  top: o.sliderStartPos.top + o.distanceY + 150 * o.velocityY,
                  opacity: 0,
                },
                200
              ),
              (i = o.instance.close(!0, 250)))
            : r && o.distanceX > 0
            ? (i = o.instance.previous(300))
            : r && o.distanceX < 0 && (i = o.instance.next(300)),
          !1 !== i || ("x" != t && "y" != t) || o.instance.centerSlide(200),
          o.$container.removeClass("fancybox-is-sliding");
      }),
      (d.prototype.endPanning = function () {
        var t,
          e,
          o,
          i = this;
        i.contentLastPos &&
          (!1 === i.opts.momentum || i.dMs > 350
            ? ((t = i.contentLastPos.left), (e = i.contentLastPos.top))
            : ((t = i.contentLastPos.left + 500 * i.velocityX),
              (e = i.contentLastPos.top + 500 * i.velocityY)),
          (o = i.limitPosition(
            t,
            e,
            i.contentStartPos.width,
            i.contentStartPos.height
          )),
          (o.width = i.contentStartPos.width),
          (o.height = i.contentStartPos.height),
          n.fancybox.animate(i.$content, o, 366));
      }),
      (d.prototype.endZooming = function () {
        var t,
          e,
          o,
          i,
          a = this,
          s = a.instance.current,
          r = a.newWidth,
          c = a.newHeight;
        a.contentLastPos &&
          ((t = a.contentLastPos.left),
          (e = a.contentLastPos.top),
          (i = { top: e, left: t, width: r, height: c, scaleX: 1, scaleY: 1 }),
          n.fancybox.setTranslate(a.$content, i),
          r < a.canvasWidth && c < a.canvasHeight
            ? a.instance.scaleToFit(150)
            : r > s.width || c > s.height
            ? a.instance.scaleToActual(
                a.centerPointStartX,
                a.centerPointStartY,
                150
              )
            : ((o = a.limitPosition(t, e, r, c)),
              n.fancybox.animate(a.$content, o, 150)));
      }),
      (d.prototype.onTap = function (e) {
        var o,
          i = this,
          s = n(e.target),
          r = i.instance,
          c = r.current,
          l = (e && a(e)) || i.startPoints,
          d = l[0] ? l[0].x - n(t).scrollLeft() - i.stagePos.left : 0,
          u = l[0] ? l[0].y - n(t).scrollTop() - i.stagePos.top : 0,
          f = function (t) {
            var o = c.opts[t];
            if ((n.isFunction(o) && (o = o.apply(r, [c, e])), o))
              switch (o) {
                case "close":
                  r.close(i.startEvent);
                  break;
                case "toggleControls":
                  r.toggleControls();
                  break;
                case "next":
                  r.next();
                  break;
                case "nextOrClose":
                  r.group.length > 1 ? r.next() : r.close(i.startEvent);
                  break;
                case "zoom":
                  "image" == c.type &&
                    (c.isLoaded || c.$ghost) &&
                    (r.canPan()
                      ? r.scaleToFit()
                      : r.isScaledDown()
                      ? r.scaleToActual(d, u)
                      : r.group.length < 2 && r.close(i.startEvent));
              }
          };
        if (
          (!e.originalEvent || 2 != e.originalEvent.button) &&
          (s.is("img") || !(d > s[0].clientWidth + s.offset().left))
        ) {
          if (
            s.is(
              ".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"
            )
          )
            o = "Outside";
          else if (s.is(".fancybox-slide")) o = "Slide";
          else {
            if (
              !r.current.$content ||
              !r.current.$content.find(s).addBack().filter(s).length
            )
              return;
            o = "Content";
          }
          if (i.tapped) {
            if (
              (clearTimeout(i.tapped),
              (i.tapped = null),
              Math.abs(d - i.tapX) > 50 || Math.abs(u - i.tapY) > 50)
            )
              return this;
            f("dblclick" + o);
          } else
            (i.tapX = d),
              (i.tapY = u),
              c.opts["dblclick" + o] &&
              c.opts["dblclick" + o] !== c.opts["click" + o]
                ? (i.tapped = setTimeout(function () {
                    (i.tapped = null), r.isAnimating || f("click" + o);
                  }, 500))
                : f("click" + o);
          return this;
        }
      }),
      n(e)
        .on("onActivate.fb", function (t, e) {
          e && !e.Guestures && (e.Guestures = new d(e));
        })
        .on("beforeClose.fb", function (t, e) {
          e && e.Guestures && e.Guestures.destroy();
        });
  })(window, document, jQuery),
  (function (t, e) {
    "use strict";
    e.extend(!0, e.fancybox.defaults, {
      btnTpl: {
        slideShow:
          '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>',
      },
      slideShow: { autoStart: !1, speed: 3e3, progress: !0 },
    });
    var n = function (t) {
      (this.instance = t), this.init();
    };
    e.extend(n.prototype, {
      timer: null,
      isActive: !1,
      $button: null,
      init: function () {
        var t = this,
          n = t.instance,
          o = n.group[n.currIndex].opts.slideShow;
        (t.$button = n.$refs.toolbar
          .find("[data-fancybox-play]")
          .on("click", function () {
            t.toggle();
          })),
          n.group.length < 2 || !o
            ? t.$button.hide()
            : o.progress &&
              (t.$progress = e(
                '<div class="fancybox-progress"></div>'
              ).appendTo(n.$refs.inner));
      },
      set: function (t) {
        var n = this,
          o = n.instance,
          i = o.current;
        i && (!0 === t || i.opts.loop || o.currIndex < o.group.length - 1)
          ? n.isActive &&
            "video" !== i.contentType &&
            (n.$progress &&
              e.fancybox.animate(
                n.$progress.show(),
                { scaleX: 1 },
                i.opts.slideShow.speed
              ),
            (n.timer = setTimeout(function () {
              o.current.opts.loop || o.current.index != o.group.length - 1
                ? o.next()
                : o.jumpTo(0);
            }, i.opts.slideShow.speed)))
          : (n.stop(), (o.idleSecondsCounter = 0), o.showControls());
      },
      clear: function () {
        var t = this;
        clearTimeout(t.timer),
          (t.timer = null),
          t.$progress && t.$progress.removeAttr("style").hide();
      },
      start: function () {
        var t = this,
          e = t.instance.current;
        e &&
          (t.$button
            .attr(
              "title",
              (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_STOP
            )
            .removeClass("fancybox-button--play")
            .addClass("fancybox-button--pause"),
          (t.isActive = !0),
          e.isComplete && t.set(!0),
          t.instance.trigger("onSlideShowChange", !0));
      },
      stop: function () {
        var t = this,
          e = t.instance.current;
        t.clear(),
          t.$button
            .attr(
              "title",
              (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_START
            )
            .removeClass("fancybox-button--pause")
            .addClass("fancybox-button--play"),
          (t.isActive = !1),
          t.instance.trigger("onSlideShowChange", !1),
          t.$progress && t.$progress.removeAttr("style").hide();
      },
      toggle: function () {
        var t = this;
        t.isActive ? t.stop() : t.start();
      },
    }),
      e(t).on({
        "onInit.fb": function (t, e) {
          e && !e.SlideShow && (e.SlideShow = new n(e));
        },
        "beforeShow.fb": function (t, e, n, o) {
          var i = e && e.SlideShow;
          o
            ? i && n.opts.slideShow.autoStart && i.start()
            : i && i.isActive && i.clear();
        },
        "afterShow.fb": function (t, e, n) {
          var o = e && e.SlideShow;
          o && o.isActive && o.set();
        },
        "afterKeydown.fb": function (n, o, i, a, s) {
          var r = o && o.SlideShow;
          !r ||
            !i.opts.slideShow ||
            (80 !== s && 32 !== s) ||
            e(t.activeElement).is("button,a,input") ||
            (a.preventDefault(), r.toggle());
        },
        "beforeClose.fb onDeactivate.fb": function (t, e) {
          var n = e && e.SlideShow;
          n && n.stop();
        },
      }),
      e(t).on("visibilitychange", function () {
        var n = e.fancybox.getInstance(),
          o = n && n.SlideShow;
        o && o.isActive && (t.hidden ? o.clear() : o.set());
      });
  })(document, jQuery),
  (function (t, e) {
    "use strict";
    var n = (function () {
      for (
        var e = [
            [
              "requestFullscreen",
              "exitFullscreen",
              "fullscreenElement",
              "fullscreenEnabled",
              "fullscreenchange",
              "fullscreenerror",
            ],
            [
              "webkitRequestFullscreen",
              "webkitExitFullscreen",
              "webkitFullscreenElement",
              "webkitFullscreenEnabled",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "webkitRequestFullScreen",
              "webkitCancelFullScreen",
              "webkitCurrentFullScreenElement",
              "webkitCancelFullScreen",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "mozRequestFullScreen",
              "mozCancelFullScreen",
              "mozFullScreenElement",
              "mozFullScreenEnabled",
              "mozfullscreenchange",
              "mozfullscreenerror",
            ],
            [
              "msRequestFullscreen",
              "msExitFullscreen",
              "msFullscreenElement",
              "msFullscreenEnabled",
              "MSFullscreenChange",
              "MSFullscreenError",
            ],
          ],
          n = {},
          o = 0;
        o < e.length;
        o++
      ) {
        var i = e[o];
        if (i && i[1] in t) {
          for (var a = 0; a < i.length; a++) n[e[0][a]] = i[a];
          return n;
        }
      }
      return !1;
    })();
    if (n) {
      var o = {
        request: function (e) {
          (e = e || t.documentElement),
            e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT);
        },
        exit: function () {
          t[n.exitFullscreen]();
        },
        toggle: function (e) {
          (e = e || t.documentElement),
            this.isFullscreen() ? this.exit() : this.request(e);
        },
        isFullscreen: function () {
          return Boolean(t[n.fullscreenElement]);
        },
        enabled: function () {
          return Boolean(t[n.fullscreenEnabled]);
        },
      };
      e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
          fullScreen:
            '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>',
        },
        fullScreen: { autoStart: !1 },
      }),
        e(t).on(n.fullscreenchange, function () {
          var t = o.isFullscreen(),
            n = e.fancybox.getInstance();
          n &&
            (n.current &&
              "image" === n.current.type &&
              n.isAnimating &&
              ((n.isAnimating = !1),
              n.update(!0, !0, 0),
              n.isComplete || n.complete()),
            n.trigger("onFullscreenChange", t),
            n.$refs.container.toggleClass("fancybox-is-fullscreen", t),
            n.$refs.toolbar
              .find("[data-fancybox-fullscreen]")
              .toggleClass("fancybox-button--fsenter", !t)
              .toggleClass("fancybox-button--fsexit", t));
        });
    }
    e(t).on({
      "onInit.fb": function (t, e) {
        var i;
        if (!n)
          return void e.$refs.toolbar
            .find("[data-fancybox-fullscreen]")
            .remove();
        e && e.group[e.currIndex].opts.fullScreen
          ? ((i = e.$refs.container),
            i.on(
              "click.fb-fullscreen",
              "[data-fancybox-fullscreen]",
              function (t) {
                t.stopPropagation(), t.preventDefault(), o.toggle();
              }
            ),
            e.opts.fullScreen &&
              !0 === e.opts.fullScreen.autoStart &&
              o.request(),
            (e.FullScreen = o))
          : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide();
      },
      "afterKeydown.fb": function (t, e, n, o, i) {
        e &&
          e.FullScreen &&
          70 === i &&
          (o.preventDefault(), e.FullScreen.toggle());
      },
      "beforeClose.fb": function (t, e) {
        e &&
          e.FullScreen &&
          e.$refs.container.hasClass("fancybox-is-fullscreen") &&
          o.exit();
      },
    });
  })(document, jQuery),
  (function (t, e) {
    "use strict";
    var n = "fancybox-thumbs";
    e.fancybox.defaults = e.extend(
      !0,
      {
        btnTpl: {
          thumbs:
            '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>',
        },
        thumbs: {
          autoStart: !1,
          hideOnClose: !0,
          parentEl: ".fancybox-container",
          axis: "y",
        },
      },
      e.fancybox.defaults
    );
    var o = function (t) {
      this.init(t);
    };
    e.extend(o.prototype, {
      $button: null,
      $grid: null,
      $list: null,
      isVisible: !1,
      isActive: !1,
      init: function (t) {
        var e = this,
          n = t.group,
          o = 0;
        (e.instance = t),
          (e.opts = n[t.currIndex].opts.thumbs),
          (t.Thumbs = e),
          (e.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]"));
        for (
          var i = 0, a = n.length;
          i < a && (n[i].thumb && o++, !(o > 1));
          i++
        );
        o > 1 && e.opts
          ? (e.$button.removeAttr("style").on("click", function () {
              e.toggle();
            }),
            (e.isActive = !0))
          : e.$button.hide();
      },
      create: function () {
        var t,
          o = this,
          i = o.instance,
          a = o.opts.parentEl,
          s = [];
        o.$grid ||
          ((o.$grid = e(
            '<div class="' + n + " " + n + "-" + o.opts.axis + '"></div>'
          ).appendTo(i.$refs.container.find(a).addBack().filter(a))),
          o.$grid.on("click", "a", function () {
            i.jumpTo(e(this).attr("data-index"));
          })),
          o.$list ||
            (o.$list = e('<div class="' + n + '__list">').appendTo(o.$grid)),
          e.each(i.group, function (e, n) {
            (t = n.thumb),
              t || "image" !== n.type || (t = n.src),
              s.push(
                '<a href="javascript:;" tabindex="0" data-index="' +
                  e +
                  '"' +
                  (t && t.length
                    ? ' style="background-image:url(' + t + ')"'
                    : 'class="fancybox-thumbs-missing"') +
                  "></a>"
              );
          }),
          (o.$list[0].innerHTML = s.join("")),
          "x" === o.opts.axis &&
            o.$list.width(
              parseInt(o.$grid.css("padding-right"), 10) +
                i.group.length * o.$list.children().eq(0).outerWidth(!0)
            );
      },
      focus: function (t) {
        var e,
          n,
          o = this,
          i = o.$list,
          a = o.$grid;
        o.instance.current &&
          ((e = i
            .children()
            .removeClass("fancybox-thumbs-active")
            .filter('[data-index="' + o.instance.current.index + '"]')
            .addClass("fancybox-thumbs-active")),
          (n = e.position()),
          "y" === o.opts.axis &&
          (n.top < 0 || n.top > i.height() - e.outerHeight())
            ? i.stop().animate({ scrollTop: i.scrollTop() + n.top }, t)
            : "x" === o.opts.axis &&
              (n.left < a.scrollLeft() ||
                n.left > a.scrollLeft() + (a.width() - e.outerWidth())) &&
              i.parent().stop().animate({ scrollLeft: n.left }, t));
      },
      update: function () {
        var t = this;
        t.instance.$refs.container.toggleClass(
          "fancybox-show-thumbs",
          this.isVisible
        ),
          t.isVisible
            ? (t.$grid || t.create(),
              t.instance.trigger("onThumbsShow"),
              t.focus(0))
            : t.$grid && t.instance.trigger("onThumbsHide"),
          t.instance.update();
      },
      hide: function () {
        (this.isVisible = !1), this.update();
      },
      show: function () {
        (this.isVisible = !0), this.update();
      },
      toggle: function () {
        (this.isVisible = !this.isVisible), this.update();
      },
    }),
      e(t).on({
        "onInit.fb": function (t, e) {
          var n;
          e &&
            !e.Thumbs &&
            ((n = new o(e)), n.isActive && !0 === n.opts.autoStart && n.show());
        },
        "beforeShow.fb": function (t, e, n, o) {
          var i = e && e.Thumbs;
          i && i.isVisible && i.focus(o ? 0 : 250);
        },
        "afterKeydown.fb": function (t, e, n, o, i) {
          var a = e && e.Thumbs;
          a && a.isActive && 71 === i && (o.preventDefault(), a.toggle());
        },
        "beforeClose.fb": function (t, e) {
          var n = e && e.Thumbs;
          n && n.isVisible && !1 !== n.opts.hideOnClose && n.$grid.hide();
        },
      });
  })(document, jQuery),
  (function (t, e) {
    "use strict";
    function n(t) {
      var e = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;",
      };
      return String(t).replace(/[&<>"'`=\/]/g, function (t) {
        return e[t];
      });
    }
    e.extend(!0, e.fancybox.defaults, {
      btnTpl: {
        share:
          '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>',
      },
      share: {
        url: function (t, e) {
          return (
            (!t.currentHash &&
              "inline" !== e.type &&
              "html" !== e.type &&
              (e.origSrc || e.src)) ||
            window.location
          );
        },
        tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>',
      },
    }),
      e(t).on("click", "[data-fancybox-share]", function () {
        var t,
          o,
          i = e.fancybox.getInstance(),
          a = i.current || null;
        a &&
          ("function" === e.type(a.opts.share.url) &&
            (t = a.opts.share.url.apply(a, [i, a])),
          (o = a.opts.share.tpl
            .replace(
              /\{\{media\}\}/g,
              "image" === a.type ? encodeURIComponent(a.src) : ""
            )
            .replace(/\{\{url\}\}/g, encodeURIComponent(t))
            .replace(/\{\{url_raw\}\}/g, n(t))
            .replace(
              /\{\{descr\}\}/g,
              i.$caption ? encodeURIComponent(i.$caption.text()) : ""
            )),
          e.fancybox.open({
            src: i.translate(i, o),
            type: "html",
            opts: {
              touch: !1,
              animationEffect: !1,
              afterLoad: function (t, e) {
                i.$refs.container.one("beforeClose.fb", function () {
                  t.close(null, 0);
                }),
                  e.$content.find(".fancybox-share__button").click(function () {
                    return (
                      window.open(this.href, "Share", "width=550, height=450"),
                      !1
                    );
                  });
              },
              mobile: { autoFocus: !1 },
            },
          }));
      });
  })(document, jQuery),
  (function (t, e, n) {
    "use strict";
    function o() {
      var e = t.location.hash.substr(1),
        n = e.split("-"),
        o =
          n.length > 1 && /^\+?\d+$/.test(n[n.length - 1])
            ? parseInt(n.pop(-1), 10) || 1
            : 1,
        i = n.join("-");
      return { hash: e, index: o < 1 ? 1 : o, gallery: i };
    }
    function i(t) {
      "" !== t.gallery &&
        n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']")
          .eq(t.index - 1)
          .focus()
          .trigger("click.fb-start");
    }
    function a(t) {
      var e, n;
      return (
        !!t &&
        ((e = t.current ? t.current.opts : t.opts),
        "" !==
          (n =
            e.hash ||
            (e.$orig
              ? e.$orig.data("fancybox") || e.$orig.data("fancybox-trigger")
              : "")) && n)
      );
    }
    n.escapeSelector ||
      (n.escapeSelector = function (t) {
        return (t + "").replace(
          /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
          function (t, e) {
            return e
              ? "\0" === t
                ? "�"
                : t.slice(0, -1) +
                  "\\" +
                  t.charCodeAt(t.length - 1).toString(16) +
                  " "
              : "\\" + t;
          }
        );
      }),
      n(function () {
        !1 !== n.fancybox.defaults.hash &&
          (n(e).on({
            "onInit.fb": function (t, e) {
              var n, i;
              !1 !== e.group[e.currIndex].opts.hash &&
                ((n = o()),
                (i = a(e)) &&
                  n.gallery &&
                  i == n.gallery &&
                  (e.currIndex = n.index - 1));
            },
            "beforeShow.fb": function (n, o, i, s) {
              var r;
              i &&
                !1 !== i.opts.hash &&
                (r = a(o)) &&
                ((o.currentHash =
                  r + (o.group.length > 1 ? "-" + (i.index + 1) : "")),
                t.location.hash !== "#" + o.currentHash &&
                  (s && !o.origHash && (o.origHash = t.location.hash),
                  o.hashTimer && clearTimeout(o.hashTimer),
                  (o.hashTimer = setTimeout(function () {
                    "replaceState" in t.history
                      ? (t.history[s ? "pushState" : "replaceState"](
                          {},
                          e.title,
                          t.location.pathname +
                            t.location.search +
                            "#" +
                            o.currentHash
                        ),
                        s && (o.hasCreatedHistory = !0))
                      : (t.location.hash = o.currentHash),
                      (o.hashTimer = null);
                  }, 300))));
            },
            "beforeClose.fb": function (n, o, i) {
              i &&
                !1 !== i.opts.hash &&
                (clearTimeout(o.hashTimer),
                o.currentHash && o.hasCreatedHistory
                  ? t.history.back()
                  : o.currentHash &&
                    ("replaceState" in t.history
                      ? t.history.replaceState(
                          {},
                          e.title,
                          t.location.pathname +
                            t.location.search +
                            (o.origHash || "")
                        )
                      : (t.location.hash = o.origHash)),
                (o.currentHash = null));
            },
          }),
          n(t).on("hashchange.fb", function () {
            var t = o(),
              e = null;
            n.each(n(".fancybox-container").get().reverse(), function (t, o) {
              var i = n(o).data("FancyBox");
              if (i && i.currentHash) return (e = i), !1;
            }),
              e
                ? e.currentHash === t.gallery + "-" + t.index ||
                  (1 === t.index && e.currentHash == t.gallery) ||
                  ((e.currentHash = null), e.close())
                : "" !== t.gallery && i(t);
          }),
          setTimeout(function () {
            n.fancybox.getInstance() || i(o());
          }, 50));
      });
  })(window, document, jQuery),
  (function (t, e) {
    "use strict";
    var n = new Date().getTime();
    e(t).on({
      "onInit.fb": function (t, e, o) {
        e.$refs.stage.on(
          "mousewheel DOMMouseScroll wheel MozMousePixelScroll",
          function (t) {
            var o = e.current,
              i = new Date().getTime();
            e.group.length < 2 ||
              !1 === o.opts.wheel ||
              ("auto" === o.opts.wheel && "image" !== o.type) ||
              (t.preventDefault(),
              t.stopPropagation(),
              o.$slide.hasClass("fancybox-animated") ||
                ((t = t.originalEvent || t),
                i - n < 250 ||
                  ((n = i),
                  e[
                    (-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0
                      ? "next"
                      : "previous"
                  ]())));
          }
        );
      },
    });
  })(document, jQuery);
/*
 * jquery.infieldlabel
 * A simple jQuery plugin for adding labels that sit over a form field and fade away when the fields are populated.
 *
 * Copyright (c) 2009 - 2013 Doug Neiner <doug@dougneiner.com> (http://code.dougneiner.com)
 * Source: https://github.com/dcneiner/In-Field-Labels-jQuery-Plugin
 * Dual licensed MIT or GPL
 *   MIT (http://www.opensource.org/licenses/mit-license)
 *   GPL (http://www.opensource.org/licenses/gpl-license)
 *
 * @version 0.1.5
 */
(function (e) {
  (e.InFieldLabels = function (n, i, t) {
    var a = this;
    (a.$label = e(n)),
      (a.label = n),
      (a.$field = e(i)),
      (a.field = i),
      a.$label.data("InFieldLabels", a),
      (a.showing = !0),
      (a.init = function () {
        var n;
        (a.options = e.extend({}, e.InFieldLabels.defaultOptions, t)),
          a.options.className && a.$label.addClass(a.options.className),
          setTimeout(function () {
            "" !== a.$field.val()
              ? (a.$label.hide(), (a.showing = !1))
              : (a.$label.show(), (a.showing = !0));
          }, 200),
          a.$field
            .focus(function () {
              a.fadeOnFocus();
            })
            .blur(function () {
              a.checkForEmpty(!0);
            })
            .bind("keydown.infieldlabel", function (e) {
              a.hideOnChange(e);
            })
            .bind("paste", function () {
              a.setOpacity(0);
            })
            .change(function () {
              a.checkForEmpty();
            })
            .bind("onPropertyChange", function () {
              a.checkForEmpty();
            })
            .bind("keyup.infieldlabel", function () {
              a.checkForEmpty();
            }),
          a.options.pollDuration > 0 &&
            (n = setInterval(function () {
              "" !== a.$field.val() &&
                (a.$label.hide(), (a.showing = !1), clearInterval(n));
            }, a.options.pollDuration));
      }),
      (a.fadeOnFocus = function () {
        a.showing && a.setOpacity(a.options.fadeOpacity);
      }),
      (a.setOpacity = function (e) {
        a.$label
          .stop()
          .animate({ opacity: e }, a.options.fadeDuration, function () {
            0 === e && a.$label.hide();
          }),
          (a.showing = e > 0);
      }),
      (a.checkForEmpty = function (e) {
        "" === a.$field.val()
          ? (a.prepForShow(), a.setOpacity(e ? 1 : a.options.fadeOpacity))
          : a.setOpacity(0);
      }),
      (a.prepForShow = function () {
        a.showing ||
          (a.$label.css({ opacity: 0 }).show(),
          a.$field.bind("keydown.infieldlabel", function (e) {
            a.hideOnChange(e);
          }));
      }),
      (a.hideOnChange = function (e) {
        16 !== e.keyCode &&
          9 !== e.keyCode &&
          (a.showing && (a.$label.hide(), (a.showing = !1)),
          a.$field.unbind("keydown.infieldlabel"));
      }),
      a.init();
  }),
    (e.InFieldLabels.defaultOptions = {
      fadeOpacity: 0.5,
      fadeDuration: 300,
      pollDuration: 0,
      enabledInputTypes: [
        "text",
        "search",
        "tel",
        "url",
        "email",
        "password",
        "number",
        "textarea",
      ],
      className: !1,
    }),
    (e.fn.inFieldLabels = function (n) {
      var i =
        (n && n.enabledInputTypes) ||
        e.InFieldLabels.defaultOptions.enabledInputTypes;
      return this.each(function () {
        var t,
          a,
          o = e(this).attr("for");
        o &&
          ((t = document.getElementById(o)),
          t &&
            ((a = e.inArray(t.type, i)),
            (-1 !== a || "TEXTAREA" === t.nodeName) &&
              new e.InFieldLabels(this, t, n)));
      });
    });
})(jQuery);
!(function (h) {
  "use strict";
  var e;
  function g(e, t) {
    if (
      ((this.$form = h(e)),
      (this.submitted = !1),
      (this.nextUploadId = 1),
      (this.removedUploadUids = []),
      (this.captchaRefreshQueue = []),
      (this.uploadQueue = []),
      (this.uploadElements = []),
      (this.logicCache = {}),
      !this.$form.length)
    )
      throw new Error("Form not found.");
    if (this.$form.data("quform")) throw new Error("Quform already attached.");
    this.$form.data("quform", this),
      (this.options = h.extend({}, g.defaults, t)),
      (h.isFunction(h.scrollTo) && h.isFunction(h.fn.scrollTo)) ||
        (this.options.scrolling = !1),
      (this.$wrapper = this.$form.closest(".quform")),
      (this.$elements = h(".quform-elements", this.$form)),
      (this.$loading = h(".quform-loading", this.$form)),
      (this.currentPageId = this.options.currentPageId),
      (this.submitStartTime = 0),
      (this.submitEndTime = 0),
      (this.successTimeout = null),
      (this.errorShowFunction = this.$wrapper.hasClass("quform-errors-absolute")
        ? "fadeIn"
        : "quformShowSlide"),
      this.init();
  }
  (g.defaults = {
    errorsIcon: "",
    scrolling: !0,
    scrollSpeed: 800,
    scrollDelay: 0,
    scrollOffset: -50,
    hasPages: !1,
    pages: [],
    logic: {
      logic: [],
      dependents: [],
      elementIds: [],
      dependentElementIds: [],
      animate: !0,
    },
  }),
    (g.prototype.init = function () {
      var s = this;
      this.setupInsideLabels(),
        this.setupEnhancedSelects(),
        this.setupEnhancedUploaders(),
        this.setupDatepickers(),
        this.setupTimepickers(),
        this.applyAllLogic(!0),
        this.setupTooltips(),
        this.setupCaptchaImages(),
        this.$wrapper.hasClass("quform-prevent-fouc") &&
          this.$wrapper.removeClass("quform-prevent-fouc"),
        this.options.ajax &&
          (s.$form.on("submit", function (e) {
            if ((e.preventDefault(), window.grecaptcha)) {
              var t = s.$form.find(".quform-recaptcha");
              if (t.length) {
                var o = t.data("config");
                if ("v3" === o._version)
                  return void window.grecaptcha
                    .execute(t.data("recaptcha-id"), { action: "quform" })
                    .then(function (e) {
                      t.find(".g-recaptcha-response").val(e), s.submit();
                    });
                if ("invisible" === o.size)
                  return void window.grecaptcha.execute(t.data("recaptcha-id"));
              }
            }
            if (window.hcaptcha) {
              var i = s.$form.find(".quform-hcaptcha");
              if (i.length)
                if ("invisible" === i.data("config").size)
                  return void window.hcaptcha.execute(i.data("hcaptcha-id"));
            }
            s.submit();
          }),
          h(".quform-back", s.$form).on("click", function (e) {
            e.preventDefault(), s.submit("back");
          }),
          s.$form.addClass("quform-ajax-initialized")),
        h(".quform-field-select.quform-submit-on-choice", s.$form).on(
          "change",
          function () {
            s.$form.submit();
          }
        ),
        h(".quform-field-radio.quform-submit-on-choice", s.$form).on(
          "click",
          function () {
            s.$form.submit();
          }
        ),
        h(".quform-button-submit > button", s.$form).each(function () {
          var e,
            t,
            o = h(this),
            i = o.closest(".quform-button-submit"),
            r = i.data("animation"),
            n = 1e3,
            a = s.options.scrollDelay;
          r &&
            ((e = "quform-button-animation-" + r),
            "two" === r && (n = 3200),
            o.on("click", function () {
              (s.options.scrollDelay = n),
                i.removeClass(e),
                "number" == typeof t && (clearTimeout(t), (t = null)),
                setTimeout(function () {
                  i.addClass(e),
                    (t = setTimeout(function () {
                      i.removeClass(e), (s.options.scrollDelay = a);
                    }, n));
                }, 4);
            }));
        });
    }),
    (g.prototype.setupInsideLabels = function () {
      var r = this;
      h.InFieldLabels
        ? h(
            ".quform-labels-inside > .quform-spacer > .quform-label",
            r.$form
          ).each(function () {
            var e = h(this),
              t = e.parent().find(".quform-input"),
              o = t.find(".quform-field"),
              i = {
                top:
                  parseInt(o.css("padding-top"), 10) +
                  parseInt(o.css("border-top-width"), 10),
              };
            r.options.isRtl
              ? (i.right =
                  parseInt(o.css("padding-right"), 10) +
                  parseInt(o.css("border-right-width"), 10))
              : (i.left =
                  parseInt(o.css("padding-left"), 10) +
                  parseInt(o.css("border-left-width"), 10)),
              e.addClass("quform-label-inside").css(i).appendTo(t),
              new h.InFieldLabels(e[0], o[0]);
          })
        : h(
            ".quform-labels-inside > .quform-spacer > .quform-label",
            r.$form
          ).show();
    }),
    (g.prototype.setupEnhancedSelects = function () {
      var r;
      "function" == typeof h.fn.select2 &&
        (h(".quform-field-select-enhanced", (r = this).$form).each(function () {
          var e = h(this),
            t = e.data("options"),
            o = {
              theme: "quform",
              language: {
                noResults: function () {
                  return t.noResultsFound;
                },
              },
            };
          t.search || (o.minimumResultsForSearch = Infinity),
            t.rtl && (o.dir = "rtl"),
            e.select2(o);
          var i = "quform-" + r.options.id + "-select2";
          g.isNonEmptyString(r.options.theme) &&
            (i += " quform-theme-" + r.options.theme),
            e.on("select2:opening", function () {
              e.data("select2").$dropdown.addClass(i);
            });
        }),
        h(".quform-field-multiselect-enhanced", r.$form).each(function () {
          var e = h(this),
            t = e.data("options"),
            o = {
              theme: "quform",
              language: {
                noResults: function () {
                  return t.noResultsFound;
                },
              },
            };
          g.isNonEmptyString(t.placeholder) && (o.placeholder = t.placeholder),
            t.rtl && (o.dir = "rtl"),
            e.select2(o);
          var i = "quform-" + r.options.id + "-select2";
          g.isNonEmptyString(r.options.theme) &&
            (i += " quform-theme-" + r.options.theme),
            e.on("select2:opening", function () {
              e.data("select2").$dropdown.addClass(i);
            });
        }));
    }),
    (g.prototype.setupEnhancedUploaders = function () {
      var a;
      h.isFunction(h.fn.fileupload) &&
        h.support.xhrFileUpload &&
        h.support.xhrFormDataFileUpload &&
        h(".quform-field-file-enhanced", (a = this).$form).each(function () {
          var e,
            t = h(this),
            o = t.closest(".quform-input-file"),
            i = t.data("config"),
            r = h('<div class="quform-upload-files quform-cf">')
              .insertAfter(o)
              .hide();
          (i.queued = 0),
            a.uploadElements.push(i),
            (e =
              "dropzone" === i.buttonType
                ? a.createUploadButton("quform-upload-dropzone", i)
                : a.createUploadButton("quform-upload-button", i)),
            o.append(e.append(t));
          var n = t
            .closest(".quform-element")
            .addClass("quform-enhanced-upload");
          t.fileupload({
            dataType: "json",
            paramName: i.name + "[]",
            dropZone: e,
            change: function () {
              n.find(".quform-error").empty().remove();
            },
            add: function (e, t) {
              a.uploadAdd(t, i, r);
            },
            start: function () {
              h(".quform-upload-progress-wrap", a.$form).show();
            },
            progress: function (e, t) {
              var o = Math.min(100, (t.loaded / t.total) * 100);
              h(".quform-upload-progress-bar", a.$form).css("width", o + "%"),
                h(".quform-upload-filename", a.$form).text(t.files[0].name);
            },
          });
        });
    }),
    (g.prototype.createUploadButton = function (e, t) {
      var o,
        i = h('<div class="' + e + '">');
      return (
        i.append(h('<span class="' + e + '-text">').html(t.buttonText)),
        g.isNonEmptyString(t.buttonIcon) &&
          ((o = h('<span class="' + e + '-icon">').append(
            h('<i class="' + t.buttonIcon + '">')
          )),
          i.addClass(e + "-icon-" + t.buttonIconPosition),
          "right" === t.buttonIconPosition ? i.append(o) : i.prepend(o)),
        i
      );
    }),
    (g.prototype.setupDatepickers = function () {
      var m;
      h.isFunction(h.fn.kendoDatePicker) &&
        h(".quform-field-date", (m = this).$form).each(function () {
          var o = h(this).addClass("quform-field-date-enhanced"),
            e = o.closest(".quform-input-date"),
            t = e.find("> .quform-field-icon"),
            i = o.data("options"),
            r = h("<input>", {
              type: "hidden",
              name: o.attr("name"),
              value: o.val(),
            })
              .data("default", o.val())
              .addClass("quform-field-date-hidden")
              .insertAfter(o);
          o.attr("name", ""),
            i.placeholder
              ? o.attr("placeholder", i.placeholder)
              : o.removeAttr("placeholder");
          var n,
            a,
            s = {
              start: i.start || "month",
              depth: i.depth || "month",
              culture: i.locale || "en-US",
            };
          i.format
            ? (s.format = i.format)
            : (s.format = kendo.getCulture(
                i.locale
              ).calendars.standard.patterns.d),
            i.showFooter || (s.footer = !1),
            !i.min ||
              (null !== (n = kendo.parseDate(i.min, "yyyy-MM-dd")) &&
                (s.min = n)),
            !i.max ||
              (null !== (a = kendo.parseDate(i.max, "yyyy-MM-dd")) &&
                (s.max = a)),
            o.kendoDatePicker(s),
            o
              .removeClass("k-input")
              .closest(".k-datepicker")
              .removeAttr("class")
              .addClass("k-widget k-datepicker k-header");
          var u = o.data("kendoDatePicker"),
            c =
              "quform-datepicker quform-" +
              m.options.id +
              "-datepicker quform-" +
              i.identifier +
              "-datepicker";
          g.isNonEmptyString(m.options.theme) &&
            (c += " quform-theme-" + m.options.theme),
            u.dateView.popup.element.addClass(c),
            e.find(".k-select").hide(),
            i.autoOpen &&
              o
                .on("click focus", function () {
                  u.open();
                })
                .on("blur", function () {
                  u.close();
                }),
            t.on("click", function () {
              u.open();
            });
          var l = function () {
            var e,
              t = o.val();
            g.isNonEmptyString(t)
              ? null === (e = kendo.parseDate(t, s.format, s.culture))
                ? r.val("9999-99-99")
                : r.val(kendo.toString(e, "yyyy-MM-dd"))
              : r.val("");
          };
          u.bind("change", l),
            o.on("blur.quformDatePicker keyup.quformDatePicker", l);
          var f,
            p = o.val();
          !g.isNonEmptyString(p) ||
            (null !== (f = kendo.parseDate(p, "yyyy-MM-dd")) &&
              (u.value(f), l()));
        });
    }),
    (g.prototype.setupTimepickers = function () {
      var d;
      h.isFunction(h.fn.kendoTimePicker) &&
        h(".quform-field-time", (d = this).$form).each(function () {
          var o = h(this).addClass("quform-field-time-enhanced"),
            e = o.closest(".quform-input-time"),
            t = e.find("> .quform-field-icon"),
            i = o.data("options"),
            r = h("<input>", {
              type: "hidden",
              name: o.attr("name"),
              value: o.val(),
            })
              .data("default", o.val())
              .addClass("quform-field-time-hidden")
              .insertAfter(o);
          o.attr("name", ""),
            i.placeholder
              ? o.attr("placeholder", i.placeholder)
              : o.removeAttr("placeholder");
          var n,
            a,
            s,
            u = { culture: i.locale || "en-US" };
          i.interval &&
            ((n = parseInt(i.interval, 10)), isNaN(n) || (u.interval = n)),
            i.format
              ? (u.format = i.format)
              : (u.format = kendo.getCulture(
                  i.locale
                ).calendars.standard.patterns.t),
            !i.min ||
              (null !== (a = kendo.parseDate(i.min, "HH:mm")) && (u.min = a)),
            !i.max ||
              (null !== (s = kendo.parseDate(i.max, "HH:mm")) && (u.max = s)),
            o.kendoTimePicker(u),
            o
              .removeClass("k-input")
              .closest(".k-timepicker")
              .removeAttr("class")
              .addClass("k-widget k-timepicker k-header");
          var c = o.data("kendoTimePicker"),
            l =
              "quform-timepicker quform-" +
              d.options.id +
              "-timepicker quform-" +
              i.identifier +
              "-timepicker";
          g.isNonEmptyString(d.options.theme) &&
            (l += " quform-theme-" + d.options.theme),
            c.timeView.popup.element.addClass(l),
            e.find(".k-select").hide(),
            i.autoOpen &&
              o
                .on("click focus", function () {
                  c.open();
                })
                .on("blur", function () {
                  c.close();
                }),
            t.on("click", function () {
              c.open();
            });
          var f = function () {
            var e,
              t = o.val();
            g.isNonEmptyString(t)
              ? null === (e = kendo.parseDate(t, u.format, u.culture))
                ? r.val("99:99")
                : r.val(kendo.toString(e, "HH:mm"))
              : r.val("");
          };
          c.bind("change", f),
            o.on("blur.quformTimePicker keyup.quformTimePicker", f);
          var p,
            m = o.val();
          !g.isNonEmptyString(m) ||
            (null !== (p = kendo.parseDate(m, "HH:mm")) && (c.value(p), f()));
        });
    }),
    (g.prototype.setupTooltips = function () {
      var e;
      h.isFunction(h.fn.qtip) &&
        this.options.tooltipsEnabled &&
        ((e = {
          style: { classes: this.options.tooltipClasses },
          position: {
            my: this.options.tooltipMy,
            at: this.options.tooltipAt,
            viewport: !0,
            adjust: { method: "shift shift" },
          },
        }),
        h(".quform-tooltip-hover", this.$form).qtip(
          h.extend({}, e, {
            content: {
              text: function () {
                return h(this)
                  .closest(".quform-input")
                  .find("> .quform-tooltip-content")
                  .html();
              },
            },
          })
        ),
        h(".quform-tooltip-click", this.$form).qtip(
          h.extend({}, e, {
            show: { event: "focus" },
            hide: { event: "unfocus" },
            content: {
              text: function () {
                return h(this)
                  .closest(".quform-input")
                  .find("> .quform-tooltip-content")
                  .html();
              },
            },
          })
        ),
        h(".quform-tooltip-icon-hover", this.$form).qtip(
          h.extend({}, e, {
            content: {
              text: function () {
                return h(this).find(".quform-tooltip-icon-content").html();
              },
            },
          })
        ),
        h(".quform-tooltip-icon-click", this.$form).qtip(
          h.extend({}, e, {
            show: { event: "click" },
            hide: { event: "unfocus" },
            content: {
              text: function () {
                return h(this).find(".quform-tooltip-icon-content").html();
              },
            },
          })
        ),
        h(
          ".quform-labels-inside > .quform-spacer > .quform-inner > .quform-input > .quform-label",
          this.$form
        )
          .on("mouseenter", function () {
            h(this).siblings(".quform-tooltip-hover").qtip("show");
          })
          .on("mouseleave", function () {
            h(this).siblings(".quform-tooltip-hover").qtip("hide");
          }));
    }),
    (g.prototype.setupCaptchaImages = function () {
      var e = this;
      h(".quform-captcha-image img", this.$form)
        .on("mouseenter", function () {
          h(this).stop().fadeTo(400, "0.3");
        })
        .on("mouseleave", function () {
          h(this).stop().fadeTo(400, "1.0");
        })
        .on("click", function () {
          e.captchaRefreshQueue.push(h(this)), e.processCaptchaRefreshQueue();
        });
    }),
    (g.prototype.processCaptchaRefreshQueue = function (t) {
      var o,
        i = this;
      i.captchaRefreshQueue.length
        ? ((o = i.captchaRefreshQueue.shift()),
          h
            .ajax({
              type: "GET",
              url: quformL10n.ajaxUrl,
              dataType: "json",
              data: {
                action: "quform_regenerate_captcha",
                quform_form_id: i.options.id,
                quform_unique_id: i.options.uniqueId,
                quform_element_id: o.data("element-id"),
              },
            })
            .done(function (e) {
              "success" === (e = g.sanitizeResponse(e)).type &&
                o.attr("src", e.image).animate({ opacity: 1 }),
                i.captchaRefreshQueue.length
                  ? i.processCaptchaRefreshQueue(t)
                  : "function" == typeof t && t.call(i);
            }))
        : "function" == typeof t && t.call(i);
    }),
    (g.prototype.applyAllLogic = function (e) {
      (this.logicCache = {}),
        this.options.logic.elementIds.length &&
          (this.applyLogic(this.options.logic.elementIds, e),
          e &&
            this.applyDependentLogic(this.options.logic.dependentElementIds));
    }),
    (g.prototype.applyLogic = function (e, t) {
      for (var o = 0, i = e.length; o < i; o++) this.applyElementLogic(e[o], t);
    }),
    (g.prototype.applyElementLogic = function (e, t) {
      if (this.options.logic && this.options.logic.logic) {
        var o = this.options.logic.logic[e];
        if (o && o.rules && o.rules.length) {
          for (
            var i = 0, r = o.action, n = this.options.id + "_" + e, a = 0;
            a < o.rules.length;
            a++
          )
            this.isLogicRuleMatch(o.rules[a]) && i++;
          ("any" === o.match && 0 < i) ||
            ("all" === o.match && i === o.rules.length) ||
            (r = !r);
          var s = this,
            u = h(".quform-element-" + n, s.$form),
            c = r ? "show" : "hide";
          !t && this.options.logic.animate
            ? u.animate(
                {
                  opacity: c,
                  height: c,
                  marginTop: c,
                  marginBottom: c,
                  paddingTop: c,
                  paddingBottom: c,
                },
                {
                  duration: 400,
                  complete: function () {
                    s.updateFancybox();
                  },
                }
              )
            : (u[c](), t || s.updateFancybox());
        }
      }
    }),
    (g.prototype.applyDependentLogic = function (e) {
      if (this.options.logic && this.options.logic.dependents)
        for (var r = this, t = 0, o = e.length; t < o; t++) {
          var i,
            n = this.options.logic.dependents[e[t]],
            a = this.options.id + "_" + e[t],
            s = h(".quform-field-" + a, this.$form);
          s.length &&
            (s.is("select") ||
            s.is('input[type="checkbox"]') ||
            s.is('input[type="radio"]') ||
            s.is('input[type="hidden"]')
              ? (i = "change.quform")
              : s.is(
                  'textarea, input[type="text"], input[type="email"], input[type="password"]'
                ) &&
                ((i = "keyup.quform blur.quform"),
                (s.hasClass("quform-field-date-enhanced") ||
                  s.hasClass("quform-field-time-enhanced")) &&
                  (i = "change.quform")),
            i &&
              (function (e, t, o, i) {
                e.on(t, function () {
                  (r.logicCache[i] = []),
                    setTimeout(function () {
                      r.applyLogic(o);
                    }, 0);
                });
              })(s, i, n, a));
        }
    }),
    (g.prototype.isLogicRuleMatch = function (e) {
      var t = this.options.id + "_" + e.elementId;
      if (h.isArray(this.logicCache[t])) {
        if (this.logicCache[t].length)
          for (var o = 0, i = this.logicCache[t].length; o < i; o++)
            if (
              this.logicCache[t][o].operator === e.operator &&
              this.logicCache[t][o].value === e.value
            )
              return this.logicCache[t][o].result;
      } else this.logicCache[t] = [];
      var r,
        n,
        a = h(".quform-field-" + t, this.$form),
        s = !1;
      return (
        a.length &&
          (a.is(
            'select:not([multiple]), input[type="hidden"], textarea, input[type="text"], input[type="email"], input[type="password"]'
          )
            ? ((n = a.val()),
              a.hasClass("quform-field-date-enhanced")
                ? ((r = "date"),
                  (n = a
                    .closest(".quform-input")
                    .find(".quform-field-date-hidden")
                    .val()))
                : a.hasClass("quform-field-time-enhanced") &&
                  ((r = "time"),
                  (n = a
                    .closest(".quform-input")
                    .find(".quform-field-time-hidden")
                    .val())),
              (s = this.isLogicValueMatch(n, e, r)))
            : a.is('input[type="checkbox"]')
            ? ((n = []),
              a.filter(":checked").each(function () {
                n.push(h(this).val());
              }),
              (s = this.isLogicArrayValueMatch(n, e)))
            : a.is('input[type="radio"]')
            ? ((n = a.filter(":checked").val() || ""),
              (s = this.isLogicValueMatch(n, e)))
            : a.is("select[multiple]") &&
              ((n = a.val() || []), (s = this.isLogicArrayValueMatch(n, e)))),
        this.logicCache[t].push({
          operator: e.operator,
          value: e.value,
          result: s,
        }),
        s
      );
    }),
    (g.prototype.isLogicValueMatch = function (e, t, o) {
      switch (("string" != typeof e && (e = ""), t.operator)) {
        case "eq":
          return e === t.value;
        case "neq":
          return e !== t.value;
        case "empty":
          return "" === e;
        case "not_empty":
          return "" !== e;
        case "gt":
          return "date" === o
            ? 1 === g.compareDates(e, t.value)
            : "time" === o
            ? 1 === g.compareTimes(e, t.value)
            : g.isNumeric(e) &&
              g.isNumeric(t.value) &&
              parseFloat(e) > parseFloat(t.value);
        case "lt":
          return "date" === o
            ? -1 === g.compareDates(e, t.value)
            : "time" === o
            ? -1 === g.compareTimes(e, t.value)
            : g.isNumeric(e) &&
              g.isNumeric(t.value) &&
              parseFloat(e) < parseFloat(t.value);
        case "contains":
          return -1 !== e.indexOf(t.value);
        case "starts_with":
          return 0 === e.indexOf(t.value);
        case "ends_with":
          return -1 !== e.indexOf(t.value, t.value.length);
      }
      return !1;
    }),
    (g.prototype.isLogicArrayValueMatch = function (e, t) {
      var o = !1;
      if (e.length) {
        if ("not_empty" === t.operator) o = !0;
        else
          for (var i = 0; i < e.length; i++)
            if (this.isLogicValueMatch(e[i], t)) {
              o = !0;
              break;
            }
      } else ("neq" !== t.operator && "empty" !== t.operator) || (o = !0);
      return o;
    }),
    (g.prototype.uploadAdd = function (e, i, r) {
      var t,
        o,
        n = this,
        a = e.files[0];
      i.max && i.queued === i.max
        ? this.addElementError(i.identifier, i.tooMany.replace("%max%", i.max))[
            this.errorShowFunction
          ]()
        : !i.allowedExtensions || g.isValidFile(a, i.allowedExtensions)
        ? i.size && a.size > i.size
          ? this.addElementError(
              i.identifier,
              i.tooBigWithFilename.replace("%filename%", a.name)
            )[this.errorShowFunction]()
          : ((t = this.nextUploadId++),
            (e.formData = {
              quform_ajax_uploading: 1,
              quform_form_id: this.options.id,
              quform_form_uid: this.options.uniqueId,
              quform_element_id: i.id,
              quform_element_identifier: i.identifier,
              quform_upload_id: t,
            }),
            this.uploadQueue.push(e),
            i.queued++,
            (o = e.context =
              h('<div class="quform-upload-file">').data(
                "quform-upload-id",
                t
              )),
            h('<span class="quform-upload-file-name">')
              .text(a.name)
              .appendTo(o),
            h('<span class="quform-upload-file-remove">')
              .attr("title", quformL10n.removeFile)
              .on("click", function () {
                var e = h(this).closest(".quform-upload-file"),
                  t = e.data("quform-upload-id");
                r.trigger("quform:beforeUploadRemoved", [a, t, e]);
                for (var o = n.uploadQueue.length; o--; )
                  n.uploadQueue[o].formData.quform_upload_id === t &&
                    n.uploadQueue.splice(o, 1);
                e.data("quform-upload-uid") &&
                  n.removedUploadUids.push(e.data("quform-upload-uid")),
                  e.remove(),
                  0 === r.children().length && r.hide(),
                  i.queued--,
                  r.trigger("quform:afterUploadRemoved", [a, t, e]);
              })
              .appendTo(o),
            r.append(o).show(),
            r.trigger("quform:uploadAdded", [a, t, o]))
        : this.addElementError(
            i.identifier,
            i.notAllowedTypeWithFilename.replace("%filename%", a.name)
          )[this.errorShowFunction]();
    }),
    (g.prototype.processUploadQueue = function () {
      var t = this,
        o = t.uploadQueue.shift();
      o.submit()
        .done(function (e) {
          "success" === (e = g.sanitizeResponse(e)).type
            ? (o.context
                .addClass("quform-uploaded")
                .prepend(
                  h('<span class="quform-upload-tick"><i class="qicon-check">')
                )
                .data("quform-upload-uid", e.uid),
              t.uploadQueue.length
                ? t.processUploadQueue()
                : (h(".quform-upload-progress-wrap", t.$form).hide(),
                  (t.submitted = !1),
                  t.submit()))
            : t.uploadError(o, e.message);
        })
        .fail(function () {
          t.uploadError(o, quformL10n.ajaxError);
        });
    }),
    (g.prototype.uploadError = function (e, t) {
      h(".quform-upload-progress-wrap", this.$form).hide(),
        this.uploadQueue.unshift(e),
        this.allowResubmission(),
        this.addElementError(e.formData.quform_element_identifier, t)[
          this.errorShowFunction
        ](),
        this.scrollTo(
          h(
            ".quform-element-" + e.formData.quform_element_identifier,
            this.$form
          )
        );
    }),
    (g.prototype.submit = function (e) {
      var t,
        o = this;
      o.submitted ||
        ((o.submitStartTime = g.timeNow()),
        (o.submitted = !0),
        (e = "back" === e ? "back" : "submit"),
        o.$form.trigger("quform:submit", [o, e]),
        o.$loading.fadeIn().addClass("quform-loading-triggered"),
        "submit" === e && this.uploadQueue.length
          ? o.processUploadQueue()
          : ((t = {
              quform_ajax: 1,
              quform_submit: e,
              quform_removed_upload_uids: o.removedUploadUids.join(","),
            }),
            o.$form.ajaxSubmit({
              type: "POST",
              data: t,
              dataType: "json",
              iframe: !0,
              iframeSrc: "about:blank",
              url: "",
              success: function (e) {
                switch (
                  ((o.submitEndTime = g.timeNow()),
                  (e = g.sanitizeResponse(e)).type)
                ) {
                  case "success":
                    o.responseSuccess(e.confirmation);
                    break;
                  case "error":
                    o.responseError(e);
                    break;
                  case "page":
                    o.allowResubmission(), o.goToPage(e.page);
                    break;
                  case "invalid":
                    o.responseInvalid(e);
                }
              },
              error: function () {
                (o.submitEndTime = g.timeNow()),
                  o.responseInvalid({ message: quformL10n.ajaxError });
              },
            })));
    }),
    (g.prototype.responseSuccess = function (e) {
      var t = this;
      t.$form.trigger("quform:successStart", [t, e]),
        t.$loading.addClass("quform-loading-success");
      var o = function () {
        switch (e.type) {
          case "message":
            t.reset(e.resetForm), t.showSuccessMessage(e);
            break;
          case "message-redirect-page":
          case "message-redirect-url":
            t.allowResubmission(),
              t.showSuccessMessage(e),
              setTimeout(function () {
                window.location = e.redirectUrl;
              }, 1e3 * parseFloat(e.redirectDelay));
            break;
          case "redirect-page":
          case "redirect-url":
            t.allowResubmission(), (window.location = e.redirectUrl);
            break;
          case "reload":
            window.location.reload();
        }
      };
      e.hideForm
        ? t.$elements.quformHideSlide(function () {
            o();
          })
        : o();
    }),
    (g.prototype.showSuccessMessage = function (e) {
      var t = this,
        o = h('<div class="quform-success-message-animate">').hide(),
        i = h(
          '<div class="quform-success-message quform-success-message-' +
            t.options.id +
            '">'
        ).appendTo(o);
      g.isNonEmptyString(e.messageIcon) &&
        i
          .addClass("quform-success-message-has-icon")
          .append(
            '<div class="quform-success-message-icon"><i class="' +
              e.messageIcon +
              '"></i></div>'
          ),
        i.append(
          h('<div class="quform-success-message-content">').html(e.message)
        ),
        o["below" === e.messagePosition ? "insertAfter" : "insertBefore"](
          t.$elements
        ).quformShowSlide(),
        setTimeout(function () {
          t.scrollTo(o);
        }, t.getScrollDelay());
      var r = 1e3 * parseFloat(e.messageTimeout);
      0 < r &&
        (t.successTimeout = setTimeout(function () {
          o.quformHideSlide(function () {
            t.updateFancybox();
          });
        }, r));
    }),
    (g.prototype.responseError = function (e) {
      var i = this,
        r = null,
        t = !1;
      i.$form.trigger("quform:errorStart", [i, e]),
        i.allowResubmission(),
        "object" == typeof e.error &&
          null !== e.error &&
          e.error.enabled &&
          "string" == typeof e.error.content &&
          e.error.content.length &&
          (i.errorMessage(e.error.content, e.error.title), (t = !0)),
        h.each(e.errors, function (e, t) {
          var o = h(".quform-element-" + e, i.$form);
          o.length && (i.addElementError(e, t), (r = r || o));
        }),
        i.options.hasPages && e.page !== i.currentPageId && i.goToPage(e.page),
        h(".quform-error", i.$form)[this.errorShowFunction](),
        !t &&
          r &&
          setTimeout(function () {
            i.scrollTo(r);
          }, i.getScrollDelay()),
        i.updateFancybox(),
        i.$form.trigger("quform:errorEnd", [i, e]);
    }),
    (g.prototype.responseInvalid = function (e) {
      this.allowResubmission(),
        this.errorMessage(e.message, quformL10n.errorMessageTitle);
    }),
    (g.prototype.goToPage = function (e) {
      var t,
        o,
        i,
        r = h(".quform-page-" + e, this.$form);
      r.length &&
        1 < this.options.pages.length &&
        -1 < (t = h.inArray(e, this.options.pages)) &&
        (this.$form.trigger("quform:goToPageStart", [this, r, e, t]),
        (this.currentPageId = e),
        h('input[name="quform_current_page_id"]', this.$form).val(e),
        h(".quform-current-page", this.$form)
          .hide()
          .removeClass("quform-current-page"),
        r.show().addClass("quform-current-page"),
        (o = this.$form.closest(".quform")).removeClass(
          "quform-is-first-page quform-is-last-page"
        ),
        0 === t
          ? o.addClass("quform-is-first-page")
          : t === this.options.pages.length - 1 &&
            o.addClass("quform-is-last-page"),
        this.scrollTo(this.$form),
        (i = Math.round(((t + 1) / this.options.pages.length) * 100)),
        "numbers" === this.options.pageProgressType ||
        "percentage" === this.options.pageProgressType
          ? (h(".quform-page-progress-bar", this.$form).width(i + "%"),
            "numbers" === this.options.pageProgressType
              ? h(
                  ".quform-page-progress-text > .quform-page-progress-number",
                  this.$form
                ).text(t + 1)
              : h(
                  ".quform-page-progress-text > .quform-page-progress-percentage",
                  this.$form
                ).text(i))
          : "tabs" === this.options.pageProgressType &&
            (h(
              ".quform-page-progress-tab.quform-current-tab",
              this.$form
            ).removeClass("quform-current-tab"),
            h(".quform-page-progress-tab", this.$form)
              .filter(function () {
                return h(this).data("id") === e;
              })
              .addClass("quform-current-tab")),
        this.$form.trigger("quform:goToPageEnd", [this, r, e, t]));
    }),
    (g.prototype.allowResubmission = function () {
      var e = this;
      e.$loading.removeClass("quform-loading-triggered").fadeOut(function () {
        e.$loading.removeClass("quform-loading-success");
      }),
        h(
          ".quform-error-message, .quform-error, .quform-success-message-animate",
          e.$form
        ).remove(),
        h(".quform-has-error", e.$form).removeClass("quform-has-error"),
        "number" == typeof e.successTimeout &&
          (clearTimeout(e.successTimeout), (e.successTimeout = null)),
        window.grecaptcha &&
          h(".quform-recaptcha", e.$form).each(function () {
            if ("v3" !== h(this).data("config")._version)
              try {
                window.grecaptcha.reset(h(this).data("recaptcha-id"));
              } catch (e) {}
          }),
        window.hcaptcha &&
          h(".quform-hcaptcha", e.$form).each(function () {
            try {
              window.hcaptcha.reset(h(this).data("hcaptcha-id"));
            } catch (e) {}
          }),
        window.turnstile &&
          h(".quform-turnstile", e.$form).each(function () {
            try {
              window.turnstile.reset(h(this).data("turnstile-id"));
            } catch (e) {}
          }),
        h(".quform-upload-progress-bar", e.$form).width(0),
        h(".quform-upload-filename", e.$form).text(""),
        (e.submitted = !1);
    }),
    (g.prototype.reset = function (e) {
      var t = this;
      switch (
        (t.$form.trigger("quform:resetStart", [t, e]), t.allowResubmission(), e)
      ) {
        default:
        case "":
          t.$form.resetForm(),
            h("input.quform-field-date-enhanced", t.$form).each(function () {
              var e = h(this),
                t = e
                  .closest(".quform-input")
                  .find(".quform-field-date-hidden")
                  .data("default"),
                o = e.data("kendoDatePicker"),
                t = g.isNonEmptyString(t)
                  ? kendo.parseDate(t, "yyyy-MM-dd")
                  : null;
              o.value(t),
                o.trigger("change"),
                o.dateView.calendar &&
                  o.dateView.calendar.navigate(null === t ? new Date() : t);
            }),
            h("input.quform-field-time-enhanced", t.$form).each(function () {
              var e = h(this),
                t = e
                  .closest(".quform-input")
                  .find(".quform-field-time-hidden")
                  .data("default"),
                o = e.data("kendoTimePicker"),
                t = g.isNonEmptyString(t) ? kendo.parseDate(t, "HH:mm") : null;
              o.value(t), o.trigger("change");
            }),
            h(".quform-field-hidden", t.$form).each(function () {
              var e = h(this);
              e.val(e.data("default")).trigger("change");
            });
          break;
        case "clear":
          t.$form.clearForm(),
            h("select", t.$form).each(function () {
              h(this).prop("selectedIndex", 0);
            }),
            h("input.quform-field-date-enhanced", t.$form).each(function () {
              var e = h(this).data("kendoDatePicker");
              e.value(null),
                e.trigger("change"),
                e.dateView.calendar && e.dateView.calendar.navigate(new Date());
            }),
            h("input.quform-field-time-enhanced", t.$form).each(function () {
              var e = h(this).data("kendoTimePicker");
              e.value(null), e.trigger("change");
            }),
            h(".quform-field-hidden", t.$form).val("").trigger("change");
          break;
        case "keep":
      }
      h(".quform-captcha-image img", t.$form).each(function () {
        t.captchaRefreshQueue.push(h(this));
      }),
        t.processCaptchaRefreshQueue(),
        h('input[type="text"], input[type="email"], textarea', t.$form).trigger(
          "blur"
        ),
        t.applyAllLogic(),
        h(
          ".quform-field-select-enhanced, .quform-field-multiselect-enhanced",
          t.$form
        ).trigger("change"),
        (t.removedUploadUids = []),
        h(".quform-upload-files", t.$form).empty().hide();
      for (var o = 0, i = t.uploadElements.length; o < i; o++)
        t.uploadElements[o].queued = 0;
      h('input[type="file"]', t.$form).each(function () {
        var e = h(this);
        e.replaceWith(e.val("").clone(!0));
      }),
        h(".qtip").hide(),
        t.options.hasPages && t.goToPage(t.options.pages[0]),
        t.$form.trigger("quform:resetEnd", [t, e]);
    }),
    (g.prototype.errorMessage = function (e, t) {
      var o = this,
        i = h('<div class="quform-error-message">').hide(),
        r = h('<div class="quform-error-message-inner">');
      "string" == typeof t &&
        t.length &&
        r.append(h('<div class="quform-error-message-title">').html(t)),
        r
          .append(h('<div class="quform-error-message-content">').html(e))
          .appendTo(i),
        o.$elements.prepend(i),
        i.quformShowSlide(),
        setTimeout(function () {
          o.scrollTo(i);
        }, o.getScrollDelay());
    }),
    (g.prototype.addElementError = function (e, t) {
      var o,
        i = h('<div class="quform-error quform-cf">'),
        r = h('<div class="quform-error-inner">').appendTo(i);
      return (
        g.isNonEmptyString(this.options.errorsIcon) &&
          r.append(
            h('<span class="quform-error-icon">').append(
              '<i class="' + this.options.errorsIcon + '"></i>'
            )
          ),
        r.append(h('<span class="quform-error-text">').html(t)),
        this.$wrapper.hasClass("quform-errors-absolute") &&
          ((o = h('<span class="quform-error-close">').append(
            '<i class="qicon-close">'
          )).on("click", function () {
            h(this).closest(".quform-error").fadeOut();
          }),
          r.append(o)),
        h(".quform-element-" + e, this.$form).addClass("quform-has-error"),
        h(".quform-input-" + e, this.$form).after(i),
        i
      );
    }),
    (g.prototype.scrollTo = function (e) {
      var t;
      this.options.scrolling &&
        e &&
        e.length &&
        ((t = this.getScrollElement())
          ? t.scrollTo(e, this.options.scrollSpeed, {
              axis: "y",
              offset: this.options.scrollOffset,
            })
          : g.isScrolledIntoView(e, this.options.scrollOffset) ||
            h.scrollTo(e, this.options.scrollSpeed, {
              axis: "y",
              offset: this.options.scrollOffset,
            }));
    }),
    (g.prototype.getScrollDelay = function () {
      return 0 < this.options.scrollDelay
        ? g.clamp(
            this.options.scrollDelay -
              (this.submitEndTime - this.submitStartTime),
            0,
            3200
          )
        : 0;
    }),
    (g.prototype.getScrollElement = function () {
      var e = null;
      return (
        this.$form.closest(".fancybox-slide").length
          ? (e = this.$form.closest(".quform").hasClass("quform-max-height")
              ? this.$form.closest(".quform")
              : this.$form.closest(".fancybox-slide"))
          : this.$form.closest(".fancybox-inner").length
          ? (e = this.$form.closest(".fancybox-inner"))
          : this.$form.closest("#fancybox-content").length
          ? this.$form
              .closest(".quform")
              .hasClass("quform-custom-dimensions") &&
            (e = this.$form.closest("#fancybox-content > div"))
          : this.$form.closest(".mfp-wrap").length &&
            (this.$form.closest(".quform").hasClass("quform-max-height")
              ? (e = this.$form.closest(".quform"))
              : h.magnificPopup &&
                h.magnificPopup.instance &&
                h.magnificPopup.instance.fixedContentPos &&
                (e = this.$form.closest(".mfp-wrap"))),
        e
      );
    }),
    (g.prototype.updateFancybox = function () {
      var e, t;
      this.options.updateFancybox &&
        h.isFunction(h.fn.fancybox) &&
        h.fancybox &&
        ("2" === (e = g.getFancyboxVersion())
          ? (t = h(".fancybox-wrap")).length &&
            t.is(":visible") &&
            h.fancybox.update()
          : "1" === e &&
            (t = h("#fancybox-wrap")).length &&
            t.is(":visible") &&
            h.fancybox.resize());
    }),
    (g.getFancyboxVersion = function () {
      return h.isFunction(h.fn.fancybox) && h.fancybox
        ? g.isNonEmptyString(h.fancybox.version)
          ? h.fancybox.version.charAt(0)
          : "1"
        : null;
    }),
    (g.isScrolledIntoView = function (e, t) {
      var o = h(window).scrollTop(),
        i = o + h(window).height(),
        r = e.offset().top,
        n = r + e.height();
      return t && (r += t), o <= n && r <= i && n <= i && o <= r;
    }),
    (g.formatFileSize = function (e) {
      return (
        1073741824 <= e
          ? (e = Math.round((e / 1073741824) * 10) / 10 + " GB")
          : 1048576 <= e
          ? (e = Math.round((e / 1048576) * 10) / 10 + " MB")
          : 1024 <= e
          ? (e = Math.round((e / 1024) * 10) / 10 + " KB")
          : (e += " bytes"),
        e
      );
    }),
    ((g.preLoadImages = function (e, t) {
      for (var o = 0; o < e.length; o++) {
        var i = new Image();
        (i.src = t ? t + e[o] : e[o]), g.preLoadImages.cache.push(i);
      }
    }).cache = []),
    (g.sanitizeResponse = function (e) {
      return (
        (null !== e &&
          "object" == typeof e &&
          "string" == typeof e.type &&
          0 !== e.type.length) ||
          (e = {
            type: "invalid",
            message: "The response from the server was invalid or malformed",
          }),
        e
      );
    }),
    (g.sanitiseResponse = function (e) {
      return g.sanitizeResponse(e);
    }),
    (g.compareDates = function (e, t) {
      if (!g.isNonEmptyString(e) || !g.isNonEmptyString(t)) return !1;
      if (
        ((e = kendo.parseDate(e, "yyyy-MM-dd")),
        (t = kendo.parseDate(t, "yyyy-MM-dd")),
        null === e || null === t)
      )
        return !1;
      var o = e.getTime(),
        i = t.getTime();
      return o < i ? -1 : i < o ? 1 : 0;
    }),
    (g.compareTimes = function (e, t) {
      if (!g.isNonEmptyString(e) || !g.isNonEmptyString(t)) return !1;
      if (
        ((e = kendo.parseDate(e, "HH:mm")),
        (t = kendo.parseDate(t, "HH:mm")),
        null === e || null === t)
      )
        return !1;
      var o = e.getTime(),
        i = t.getTime();
      return o < i ? -1 : i < o ? 1 : 0;
    }),
    (g.isValidFile = function (e, t) {
      var o, i;
      if (!t.length) return !0;
      for (o = 0, i = t.length; o < i; o++)
        if (
          -1 !==
          e.name
            .toLowerCase()
            .indexOf(t[o].toLowerCase(), e.name.length - t[o].length)
        )
          return !0;
      return !1;
    }),
    (g.isNonEmptyString = function (e) {
      return "string" == typeof e && e.length;
    }),
    (g.clamp = function (e, t, o) {
      return Math.min(Math.max(e, t), o);
    }),
    (g.timeNow = function () {
      return new Date().getTime();
    }),
    (g.setupPopupLinks = function () {
      (h.isFunction(h.fn.fancybox) || h.isFunction(h.fn.magnificPopup)) &&
        h(".quform-popup-link").each(function () {
          var e,
            t,
            o,
            i,
            r,
            n = h(this);
          n.data("quform-processed") ||
            ((e = "#quform-" + n.data("unique-id")),
            (t = h(e)),
            (o = n.data("options") || {}),
            h.isFunction(h.fn.fancybox) && h.fancybox
              ? ("3" === (r = g.getFancyboxVersion())
                  ? ((i = {
                      type: "inline",
                      baseClass: "quform-fancybox-3-popup",
                      src: e,
                      touch: !1,
                      beforeClose: function () {
                        h(".qtip").hide();
                      },
                      afterShow: function (e, t) {
                        window.turnstile &&
                          t.$content
                            .find(".quform-turnstile")
                            .each(function () {
                              try {
                                window.turnstile.reset(
                                  h(this).data("turnstile-id")
                                );
                              } catch (e) {}
                            });
                      },
                    }),
                    o.width &&
                      (t.css({
                        width: g.isNumeric(o.width) ? o.width + "px" : o.width,
                      }),
                      delete o.width),
                    o.height &&
                      (t
                        .css({
                          height: g.isNumeric(o.height)
                            ? o.height + "px"
                            : o.height,
                        })
                        .addClass("quform-max-height"),
                      delete o.height))
                  : "2" === r
                  ? ((i = {
                      type: "inline",
                      wrapCSS: "quform-fancybox-2-popup",
                      href: e,
                      beforeClose: function () {
                        h(".qtip").hide();
                      },
                      afterShow: function () {
                        window.turnstile &&
                          this.content
                            .find(".quform-turnstile")
                            .each(function () {
                              try {
                                window.turnstile.reset(
                                  h(this).data("turnstile-id")
                                );
                              } catch (e) {}
                            });
                      },
                    }),
                    (o.width || o.height) &&
                      ("undefined" == typeof o.autoSize && (o.autoSize = !1),
                      o.width ||
                        "undefined" != typeof o.autoWidth ||
                        (o.autoWidth = !0),
                      o.height ||
                        "undefined" != typeof o.autoHeight ||
                        (o.autoHeight = !0)))
                  : "1" === r &&
                    ((i = {
                      inline: !0,
                      href: e,
                      onStart: function () {
                        h("#fancybox-outer").css("opacity", 0),
                          h("#fancybox-wrap").addClass(
                            "quform-fancybox-1-popup"
                          );
                      },
                      onComplete: function () {
                        window.grecaptcha &&
                          h("#fancybox-content .quform-recaptcha").each(
                            function () {
                              try {
                                window.grecaptcha.reset(
                                  h(this).data("recaptcha-id")
                                );
                              } catch (e) {}
                            }
                          ),
                          window.hcaptcha &&
                            (h("#fancybox-content .quform-hcaptcha").empty(),
                            window.QuformHcaptchaLoaded &&
                              window.QuformHcaptchaLoaded()),
                          window.turnstile &&
                            h("#fancybox-content .quform-turnstile").each(
                              function () {
                                try {
                                  window.turnstile.reset(
                                    h(this).data("turnstile-id")
                                  );
                                } catch (e) {}
                              }
                            ),
                          h("#fancybox-wrap, #fancybox-content").css({
                            width: "auto",
                          }),
                          h.fancybox.center(0),
                          setTimeout(function () {
                            h("#fancybox-outer").animate({ opacity: 1 }, 200),
                              h("#fancybox-overlay").css({
                                height: h(document).height(),
                              });
                          }, 1);
                      },
                      onClosed: function () {
                        h("#fancybox-wrap").removeClass(
                          "quform-fancybox-1-popup"
                        );
                      },
                    }),
                    (o.width || o.height) &&
                      "undefined" == typeof o.autoDimensions &&
                      (o.autoDimensions = !1),
                    (o.width || o.height) &&
                      t.addClass("quform-custom-dimensions")),
                r && n.fancybox(h.extend({}, i, o)))
              : h.isFunction(h.fn.magnificPopup) &&
                ((i = {
                  items: { src: t, type: "inline" },
                  mainClass: "quform-magnific-popup",
                  callbacks: {
                    open: function () {
                      window.turnstile &&
                        this.content
                          .find(".quform-turnstile")
                          .each(function () {
                            try {
                              window.turnstile.reset(
                                h(this).data("turnstile-id")
                              );
                            } catch (e) {}
                          });
                    },
                  },
                }),
                o.width &&
                  (t.css({
                    maxWidth: g.isNumeric(o.width) ? o.width + "px" : o.width,
                  }),
                  delete o.width),
                o.height &&
                  (t
                    .css({
                      maxHeight: g.isNumeric(o.height)
                        ? o.height + "px"
                        : o.height,
                    })
                    .addClass("quform-max-height"),
                  delete o.height),
                n.magnificPopup(h.extend({}, i, o)),
                (h.magnificPopup.instance._onFocusIn = function (e) {
                  if (h(e.target).hasClass("select2-search__field")) return !0;
                  h.magnificPopup.proto._onFocusIn.call(this, e);
                })),
            n.data("quform-processed", !0));
        });
    }),
    (g.supportPageCaching = function () {
      var e;
      quformL10n.supportPageCaching &&
        ((e = []),
        h(".quform-form").each(function () {
          e.push(h(this).find('input[name="quform_form_uid"]').val());
        }),
        e.length &&
          h
            .ajax({
              type: "GET",
              url: quformL10n.ajaxUrl,
              dataType: "json",
              data: { action: "quform_support_page_caching", forms: e },
            })
            .done(function (r) {
              "success" === (r = g.sanitizeResponse(r)).type &&
                (h(".quform-form").each(function () {
                  var e = h(this),
                    t = e.data("quform"),
                    o = e.attr("action"),
                    i = e.find('input[name="quform_form_uid"]').val();
                  r.forms &&
                    g.isNonEmptyString(i) &&
                    r.forms[i] &&
                    g.isNonEmptyString(r.forms[i]) &&
                    (e.find('input[name="quform_form_uid"]').val(r.forms[i]),
                    g.isNonEmptyString(o) &&
                      ((o = o.replace(
                        /#quform-(.)+$/,
                        "#quform-" + r.forms[i]
                      )),
                      e.attr("action", o)),
                    t && (t.options.uniqueId = r.forms[i])),
                    r.token &&
                      g.isNonEmptyString(r.token) &&
                      e.find('input[name="quform_csrf_token"]').val(r.token),
                    t &&
                      e.find(".quform-captcha-image img").length &&
                      g.captchaRefreshFormQueue.push(t);
                }),
                g.captchaRefreshFormQueue.length &&
                  g.processCaptchaRefreshFormQueue());
            }));
    }),
    (g.captchaRefreshFormQueue = []),
    (g.processCaptchaRefreshFormQueue = function () {
      var e;
      g.captchaRefreshFormQueue.length &&
        ((e = g.captchaRefreshFormQueue.shift()),
        h(".quform-captcha-image img", e.$form).each(function () {
          e.captchaRefreshQueue.push(h(this));
        }),
        e.processCaptchaRefreshQueue(function () {
          g.captchaRefreshFormQueue.length &&
            g.processCaptchaRefreshFormQueue();
        }));
    }),
    (g.isNumeric = function (e) {
      return (
        ("number" == typeof e || "string" == typeof e) &&
        !isNaN(e - parseFloat(e))
      );
    }),
    (e = g),
    (window.Quform = e),
    h.fn.extend({
      quform: function () {
        return this.each(function () {
          return new e(this, h(this).data("options") || {});
        });
      },
      quformHideSlide: function (e, t) {
        var o = {
            height: "hide",
            opacity: "hide",
            marginTop: "hide",
            marginBottom: "hide",
            paddingTop: "hide",
            paddingBottom: "hide",
          },
          i = { duration: 400 };
        return (
          e && (i.complete = e), t && (o = h.extend(o, t)), this.animate(o, i)
        );
      },
      quformShowSlide: function (e, t) {
        var o = {
            height: "show",
            opacity: "show",
            marginTop: "show",
            marginBottom: "show",
            paddingTop: "show",
            paddingBottom: "show",
          },
          i = { duration: 400 };
        return (
          e && (i.complete = e), t && (o = h.extend(o, t)), this.animate(o, i)
        );
      },
    }),
    h(function () {
      h(".quform-form").quform(), e.supportPageCaching(), e.setupPopupLinks();
    });
})(jQuery);
