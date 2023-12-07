!(function (e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var o = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
  }
  (r.m = e),
    (r.c = t),
    (r.d = function (e, t, n) {
      r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (r.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (r.t = function (e, t) {
      if ((1 & t && (e = r(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (r.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          r.d(
            n,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return n;
    }),
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(t, "a", t), t;
    }),
    (r.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (r.p = ""),
    r((r.s = 0));
})([
  function (e, t) {
    class r extends elementorModules.frontend.handlers.Base {
      getDefaultSettings() {
        return {
          selectors: {
            wrapper: ".jeg-elementor-kit.jkit-gallery",
            grid: ".gallery-items",
            active_label: ".jkit-gallery-control.active",
            filter: ".jkit-gallery-control",
            filter_button: "#search-filter-trigger",
            filter_label: "#search-filter-trigger span",
            filter_list: ".search-filter-controls",
            filter_form: "#jkit-gallery-search-box-input",
            load_more: ".jkit-gallery-load-more",
          },
        };
      }
      getDefaultElements() {
        const e = this.getSettings("selectors");
        return {
          $wrapper: this.$element.find(e.wrapper),
          $grid: this.$element.find(e.grid),
          $active_label: this.$element.find(e.active_label),
          $filter: this.$element.find(e.filter),
          $filter_button: this.$element.find(e.filter_button),
          $filter_label: this.$element.find(e.filter_label),
          $filter_list: this.$element.find(e.filter_list),
          $filter_form: this.$element.find(e.filter_form),
          $load_more: this.$element.find(e.load_more),
        };
      }
      bindEvents() {
        const e = this,
          t =
            "masonry" == e.elements.$wrapper.data("grid")
              ? "masonry"
              : "fitRows",
          r =
            parseFloat(
              (e.elements.$wrapper.data("animation-duration") / 1e3).toFixed(2)
            ).toString() + "s";
        (e.grid = e.elements.$grid.isotope({
          itemSelector: ".gallery-item-wrap",
          layoutMode: t,
          transitionDuration: r,
        })),
          e.grid.imagesLoaded().progress(function () {
            e.grid.isotope("layout");
          }),
          e.onInitGallery(),
          e.onClickFilterButton(),
          e.onClickLoadMoreButton(),
          e.onFormChange();
      }
      onInitGallery() {
        const e = this;
        e.elements.$filter.each(function () {
          jQuery(this).on("click", function (t) {
            t.preventDefault();
            const r = e.getSettings("selectors"),
              n = jQuery(this).data("filter"),
              o = e.elements.$filter_label,
              l = e.elements.$filter_list,
              i = e.elements.$filter_button,
              s = e.elements.$filter_form;
            e.elements.$filter.removeClass("active"),
              jQuery(this).addClass("active"),
              (e.elements.$active_label = e.$element.find(r.active_label)),
              e.grid.isotope({
                filter: function () {
                  const e = "*" !== n ? n.substring(1) : "*",
                    t = jQuery(this).attr("class").split(/\s+/);
                  let r = !1;
                  if (i.length > 0) {
                    const n = s.val(),
                      o = jQuery(this).find(".item-title").text(),
                      l = jQuery(this).find(".item-content").text();
                    r =
                      "*" != e
                        ? (o.toLowerCase().includes(n.toLowerCase()) ||
                            l.toLowerCase().includes(n.toLowerCase())) &&
                          t.includes(e)
                        : o.toLowerCase().includes(n.toLowerCase()) ||
                          l.toLowerCase().includes(n.toLowerCase());
                  } else r = "*" == e || t.includes(e);
                  return r;
                },
              }),
              i.length > 0 &&
                (o.text(jQuery(this).text()), l.removeClass("open-controls"));
          });
        });
      }
      onClickFilterButton() {
        const e = this;
        e.elements.$filter_button.on("click", function (t) {
          t.preventDefault();
          const r = e.elements.$filter_list;
          r.hasClass("open-controls")
            ? r.removeClass("open-controls")
            : r.addClass("open-controls");
        });
      }
      onFormChange() {
        const e = this,
          t = e.elements.$filter_form;
        void 0 !== t &&
          t.on("change paste keyup", function () {
            const t = jQuery(this).val();
            e.grid.isotope({
              filter: function () {
                const r = jQuery(this).find(".item-title").text(),
                  n = jQuery(this).find(".item-content").text(),
                  o = jQuery(this).attr("class").split(/\s+/),
                  l =
                    "*" !== e.elements.$active_label.data("filter")
                      ? e.elements.$active_label.data("filter").substring(1)
                      : "*";
                let i = !1;
                return (
                  (i =
                    "*" == l
                      ? r.toLowerCase().includes(t.toLowerCase()) ||
                        n.toLowerCase().includes(t.toLowerCase())
                      : (r.toLowerCase().includes(t.toLowerCase()) ||
                          n.toLowerCase().includes(t.toLowerCase())) &&
                        o.includes(l)),
                  i
                );
              },
            });
          });
      }
      onClickLoadMoreButton() {
        const e = this,
          t = e.elements.$wrapper.data("items");
        e.elements.$load_more.on("click", function (r) {
          r.preventDefault();
          const n = parseInt(e.elements.$wrapper.attr("data-current-loaded")),
            o = parseInt(e.elements.$wrapper.attr("data-count-items")),
            l = parseInt(e.elements.$wrapper.attr("data-load-more")),
            i = e.elements.$wrapper.attr("data-no-more");
          if (o > n)
            if (o - l - n > 0) {
              const r = [...t].splice(n, l);
              e.grid.append(r).isotope("reloadItems").isotope(),
                e.grid.imagesLoaded().progress(function () {
                  e.grid.isotope("layout");
                }),
                e.elements.$wrapper.attr("data-current-loaded", n + l);
            } else {
              const r = [...t].splice(n, o - n);
              e.grid.append(r).isotope("reloadItems").isotope(),
                e.grid.imagesLoaded().progress(function () {
                  e.grid.isotope("layout");
                }),
                e.elements.$wrapper.attr("data-current-loaded", o),
                e.elements.$load_more.find(".load-more-text").text(i),
                setTimeout(function () {
                  e.elements.$load_more.fadeOut("slow");
                }, 600);
            }
        });
      }
    }
    jQuery(window).on("elementor/frontend/init", () => {
      elementorFrontend.hooks.addAction(
        "frontend/element_ready/jkit_gallery.default",
        (e) => {
          elementorFrontend.elementsHandler.addHandler(r, { $element: e });
        }
      );
    });
  },
]);
