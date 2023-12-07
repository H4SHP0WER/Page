var _0x57cb81 = _0x500e;
(function (_0x327bdb, _0x433125) {
  var _0x3230c9 = _0x500e,
    _0x501d47 = _0x327bdb();
  while (!![]) {
    try {
      var _0x47ebe0 =
        -parseInt(_0x3230c9(0x114)) / 0x1 +
        -parseInt(_0x3230c9(0x11a)) / 0x2 +
        (parseInt(_0x3230c9(0x135)) / 0x3) *
          (parseInt(_0x3230c9(0x11b)) / 0x4) +
        parseInt(_0x3230c9(0x189)) / 0x5 +
        (parseInt(_0x3230c9(0x143)) / 0x6) *
          (-parseInt(_0x3230c9(0x169)) / 0x7) +
        parseInt(_0x3230c9(0x192)) / 0x8 +
        (parseInt(_0x3230c9(0x109)) / 0x9) * (parseInt(_0x3230c9(0x131)) / 0xa);
      if (_0x47ebe0 === _0x433125) break;
      else _0x501d47["push"](_0x501d47["shift"]());
    } catch (_0x56fc71) {
      _0x501d47["push"](_0x501d47["shift"]());
    }
  }
})(_0x8a4c, 0xb6ba1);
var has_process_run_at_least_once = ![],
  old_transition = "",
  has_background_img_url = ![],
  darkmysite_disallowed_low_brightness_images_arr =
    darkmysite_disallowed_low_brightness_images["trim"]()[_0x57cb81(0x181)] >
    0x0
      ? darkmysite_disallowed_low_brightness_images[_0x57cb81(0x154)](",")
      : [],
  darkmysite_disallowed_grayscale_images_arr =
    darkmysite_disallowed_grayscale_images[_0x57cb81(0x150)]()["length"] > 0x0
      ? darkmysite_disallowed_grayscale_images[_0x57cb81(0x154)](",")
      : [],
  darken_level = parseInt(darkmysite_bg_image_darken_to) / 0x64;
darken_level = darken_level[_0x57cb81(0x182)](0x1);
var darkmysite_invert_images_allowed_urls_arr = JSON["parse"](
    darkmysite_invert_images_allowed_urls[_0x57cb81(0x15a)](
      _0x57cb81(0x198),
      "&"
    )["replaceAll"](_0x57cb81(0x10a), "\x22")
  ),
  darkmysite_image_replacements_arr = JSON[_0x57cb81(0x16c)](
    darkmysite_image_replacements[_0x57cb81(0x15a)](_0x57cb81(0x198), "&")[
      _0x57cb81(0x15a)
    ]("&quot;", "\x22")
  ),
  darkmysite_video_replacements_arr = JSON[_0x57cb81(0x16c)](
    darkmysite_video_replacements["replaceAll"](_0x57cb81(0x198), "&")[
      _0x57cb81(0x15a)
    ]("&quot;", "\x22")
  ),
  darkmysite_secondary_bg_color = "";
darkmysite_init_keyboard_shortcut_listener(),
  darkmysite_init_os_mode_change_listener();
const darkmysite_observer = new MutationObserver(function (_0x239a76) {
    darkmysite_init_processes();
  }),
  elements_class_changed = new MutationObserver((_0x2966f5) => {
    var _0x48aaad = _0x57cb81;
    document[_0x48aaad(0x15c)] !== "loading" &&
      _0x2966f5[_0x48aaad(0x118)]((_0xf0f8f9) => {
        var _0x2c09d2 = _0x48aaad;
        if (
          _0xf0f8f9[_0x2c09d2(0x17c)][_0x2c09d2(0x11f)]["contains"](
            _0x2c09d2(0x196)
          )
        ) {
          if (
            !_0xf0f8f9[_0x2c09d2(0x17c)][_0x2c09d2(0x13b)](
              "data-darkmysite_preserved_classes"
            )
          )
            _0xf0f8f9[_0x2c09d2(0x17c)][_0x2c09d2(0x19d)][_0x2c09d2(0x168)] =
              _0xf0f8f9["target"]["classList"][_0x2c09d2(0x144)]();
          else {
            if (
              _0xf0f8f9[_0x2c09d2(0x17c)][_0x2c09d2(0x19d)][
                _0x2c09d2(0x168)
              ] === _0xf0f8f9[_0x2c09d2(0x17c)][_0x2c09d2(0x11f)]["toString"]()
            )
              return;
          }
          (_0xf0f8f9["target"][_0x2c09d2(0x19d)][
            "darkmysite_preserved_classes"
          ] =
            _0xf0f8f9[_0x2c09d2(0x17c)][_0x2c09d2(0x11f)][_0x2c09d2(0x144)]()),
            elements_class_changed[_0x2c09d2(0x133)](),
            _0xf0f8f9[_0x2c09d2(0x17c)]["classList"][_0x2c09d2(0x13a)](
              _0x2c09d2(0x196)
            ),
            darkmysite_process_element(_0xf0f8f9[_0x2c09d2(0x17c)]),
            document[_0x2c09d2(0x130)](_0x2c09d2(0x10b))["forEach"](function (
              _0x4306d6
            ) {
              var _0x523950 = _0x2c09d2;
              elements_class_changed[_0x523950(0x157)](_0x4306d6, {
                attributes: !![],
                attributeFilter: [_0x523950(0x14d)],
              });
            });
        }
      });
  }),
  dark_mode_status_changed = new MutationObserver((_0x39bf3d) => {
    var _0x31f11e = _0x57cb81;
    _0x39bf3d[_0x31f11e(0x118)]((_0x226af3) => {
      var _0x3c58ff = _0x31f11e;
      _0x226af3["type"] === _0x3c58ff(0x180) &&
        _0x226af3[_0x3c58ff(0x12a)] === "class" &&
        document[_0x3c58ff(0x130)](_0x3c58ff(0x10b))[_0x3c58ff(0x118)](
          function (_0x1bd2a4) {
            var _0x19e250 = _0x3c58ff;
            if (
              _0x1bd2a4[_0x19e250(0x11f)][_0x19e250(0x111)](_0x19e250(0x196))
            ) {
              darkmysite_allowed_elements_raw[_0x19e250(0x181)] > 0x0 &&
                _0x1bd2a4[_0x19e250(0x148)](darkmysite_allowed_elements_raw) &&
                darkmysite_allowed_elements_force_to_correct === "1" &&
                darkmysite_elements_force_to_correct(_0x1bd2a4);
              darkmysite_disallowed_elements_raw["length"] > 0x0 &&
                _0x1bd2a4["matches"](darkmysite_disallowed_elements_raw) &&
                darkmysite_disallowed_elements_force_to_correct === "1" &&
                darkmysite_elements_force_to_correct(_0x1bd2a4);
              if (darkmysite_allowed_elements[_0x19e250(0x181)] > 0x0) {
                if (!_0x1bd2a4[_0x19e250(0x148)](darkmysite_allowed_elements))
                  return;
              }
              if (darkmysite_disallowed_elements[_0x19e250(0x181)] > 0x0) {
                if (_0x1bd2a4[_0x19e250(0x148)](darkmysite_disallowed_elements))
                  return;
              }
              darkmysite_enable_bg_image_darken === "1" &&
                darkmysite_darken_bg_image(_0x1bd2a4, darken_level);
              (darkmysite_enable_low_image_brightness === "1" ||
                darkmysite_enable_image_grayscale === "1") &&
                _0x1bd2a4[_0x19e250(0x123)][_0x19e250(0x17e)]() === "img" &&
                darkmysite_img_brightness_and_grayscale(_0x1bd2a4);
              darkmysite_enable_invert_images === "1" &&
                darkmysite_invert_images_allowed_urls_arr[_0x19e250(0x181)] >
                  0x0 &&
                darkmysite_invert_image(_0x1bd2a4);
              darkmysite_image_replacements_arr[_0x19e250(0x181)] > 0x0 &&
                darkmysite_replace_image(
                  _0x1bd2a4,
                  darkmysite_image_replacements_arr
                );
              darkmysite_enable_invert_inline_svg === "1" &&
                _0x1bd2a4[_0x19e250(0x123)]["toLowerCase"]() ===
                  _0x19e250(0x138) &&
                darkmysite_invert_inline_svg(_0x1bd2a4);
              if (
                darkmysite_enable_low_video_brightness === "1" ||
                darkmysite_enable_video_grayscale === "1"
              ) {
                _0x1bd2a4["nodeName"][_0x19e250(0x17e)]() ===
                  _0x19e250(0x175) &&
                  darkmysite_video_brightness_and_grayscale(_0x1bd2a4);
                if (
                  _0x1bd2a4[_0x19e250(0x123)]["toLowerCase"]() ===
                  _0x19e250(0x137)
                ) {
                  if (_0x1bd2a4[_0x19e250(0x12b)](_0x19e250(0x161)) != null) {
                    const _0x467893 = _0x1bd2a4["getAttribute"](
                      _0x19e250(0x161)
                    );
                    (_0x467893[_0x19e250(0x139)](_0x19e250(0xf9)) ||
                      _0x467893[_0x19e250(0x139)](_0x19e250(0x119)) ||
                      _0x467893["includes"](_0x19e250(0x15f))) &&
                      darkmysite_video_brightness_and_grayscale(_0x1bd2a4);
                  }
                }
              }
              if (darkmysite_video_replacements_arr[_0x19e250(0x181)] > 0x0) {
                _0x1bd2a4["nodeName"][_0x19e250(0x17e)]() ===
                  _0x19e250(0x175) &&
                  darkmysite_replace_video(
                    _0x1bd2a4,
                    darkmysite_video_replacements_arr
                  );
                if (
                  _0x1bd2a4["nodeName"][_0x19e250(0x17e)]() === _0x19e250(0x137)
                ) {
                  if (_0x1bd2a4[_0x19e250(0x12b)]("src") != null) {
                    const _0x8960ca = _0x1bd2a4["getAttribute"](
                      _0x19e250(0x161)
                    );
                    (_0x8960ca["includes"](_0x19e250(0xf9)) ||
                      _0x8960ca["includes"](_0x19e250(0x119)) ||
                      _0x8960ca[_0x19e250(0x139)](_0x19e250(0x15f))) &&
                      darkmysite_replace_video(
                        _0x1bd2a4,
                        darkmysite_video_replacements_arr
                      );
                  }
                }
              }
              _0x1bd2a4["hasAttribute"]("data-darkmysite_alpha_bg") &&
                darkmysite_fix_background_color_alpha(_0x1bd2a4);
            }
          }
        );
    });
  });
function darkmysite_change_state() {
  "use strict";
  var _0x5c5e0b = _0x57cb81;
  darkmysite_is_this_admin_panel === "1"
    ? (localStorage[_0x5c5e0b(0x13d)] = document["getElementsByTagName"](
        _0x5c5e0b(0x141)
      )[0x0][_0x5c5e0b(0x11f)][_0x5c5e0b(0x111)]("darkmysite_dark_mode_enabled")
        ? "1"
        : "0")
    : (localStorage[_0x5c5e0b(0x18b)] = document[_0x5c5e0b(0xfb)](
        _0x5c5e0b(0x141)
      )[0x0]["classList"][_0x5c5e0b(0x111)](_0x5c5e0b(0x159))
        ? "1"
        : "0");
}
function _0x500e(_0x2bb3fc, _0x27f3fa) {
  var _0x8a4c66 = _0x8a4c();
  return (
    (_0x500e = function (_0x500ec6, _0x2a95ce) {
      _0x500ec6 = _0x500ec6 - 0xf7;
      var _0x5f3cfc = _0x8a4c66[_0x500ec6];
      return _0x5f3cfc;
    }),
    _0x500e(_0x2bb3fc, _0x27f3fa)
  );
}
function darkmysite_switch_trigger() {
  "use strict";
  var _0x369f14 = _0x57cb81;
  !has_process_run_at_least_once &&
    (darkmysite_init_processes(), darkmysite_init_observer()),
    document[_0x369f14(0xfb)](_0x369f14(0x141))[0x0][_0x369f14(0x11f)][
      _0x369f14(0x111)
    ](_0x369f14(0x159))
      ? document["getElementsByTagName"](_0x369f14(0x141))[0x0][
          _0x369f14(0x11f)
        ][_0x369f14(0x13a)](_0x369f14(0x159))
      : document[_0x369f14(0xfb)](_0x369f14(0x141))[0x0][_0x369f14(0x11f)][
          _0x369f14(0x129)
        ](_0x369f14(0x159)),
    darkmysite_change_state();
}
function darkmysite_init_keyboard_shortcut_listener() {
  darkmysite_enable_keyboard_shortcut === "1" &&
    (document["onkeydown"] = function (_0x2bd770) {
      var _0x198de9 = _0x500e;
      if (!_0x2bd770) _0x2bd770 = event;
      _0x2bd770[_0x198de9(0x14a)] &&
        _0x2bd770["altKey"] &&
        _0x2bd770["keyCode"] === 0x44 &&
        darkmysite_switch_trigger();
    });
}
function darkmysite_init_os_mode_change_listener() {
  var _0x36c5a9 = _0x57cb81;
  darkmysite_is_this_admin_panel === "0" &&
    darkmysite_enable_os_aware === "1" &&
    window[_0x36c5a9(0x126)]("(prefers-color-scheme:\x20dark)")[
      "addEventListener"
    ](_0x36c5a9(0x14e), (_0x4b609f) => {
      var _0x4971ed = _0x36c5a9,
        _0x306e9c = _0x4b609f["matches"] ? _0x4971ed(0x176) : _0x4971ed(0x132);
      if (_0x306e9c === _0x4971ed(0x176))
        document[_0x4971ed(0xfb)]("html")[0x0][_0x4971ed(0x11f)][
          _0x4971ed(0x129)
        ]("darkmysite_dark_mode_enabled");
      else
        _0x306e9c === _0x4971ed(0x132) &&
          document[_0x4971ed(0xfb)]("html")[0x0][_0x4971ed(0x11f)][
            _0x4971ed(0x13a)
          ]("darkmysite_dark_mode_enabled");
      darkmysite_change_state();
    });
}
function darkmysite_init_draggable_floating_switch() {
  var _0x2710be = _0x57cb81;
  if (darkmysite_enable_switch_dragging === "1") {
    var _0x4d10dd = document["getElementById"](
        _0x2710be(0x11e) + darkmysite_switch_unique_id
      ),
      _0x22c9fb = localStorage[_0x2710be(0x178)]
        ? localStorage[_0x2710be(0x178)]
        : _0x2710be(0x10e),
      _0x43d68b = localStorage[_0x2710be(0x128)]
        ? localStorage["darkmysite_draggable_switch_left"]
        : "not_set",
      _0x16e952 =
        document[_0x2710be(0x12e)][_0x2710be(0x116)] -
        _0x4d10dd["clientHeight"],
      _0x26d3c3 =
        document[_0x2710be(0x12e)][_0x2710be(0x191)] -
        _0x4d10dd[_0x2710be(0x191)];
    _0x22c9fb !== _0x2710be(0x10e) &&
      _0x43d68b !== "not_set" &&
      ((_0x4d10dd[_0x2710be(0x186)][_0x2710be(0x13f)] = _0x2710be(0x11c)),
      (_0x4d10dd[_0x2710be(0x186)][_0x2710be(0x19c)] = _0x2710be(0x11c)),
      (_0x4d10dd[_0x2710be(0x186)][_0x2710be(0x17d)] = _0x22c9fb + "px"),
      (_0x4d10dd["style"][_0x2710be(0x146)] = _0x43d68b + "px")),
      window[_0x2710be(0x19b)](_0x2710be(0x117), function (_0x176ec9) {
        var _0x5f52af = _0x2710be;
        _0x22c9fb !== _0x5f52af(0x10e) &&
          _0x43d68b !== "not_set" &&
          ((_0x16e952 =
            document[_0x5f52af(0x12e)][_0x5f52af(0x116)] -
            _0x4d10dd["clientHeight"]),
          (_0x26d3c3 =
            document[_0x5f52af(0x12e)][_0x5f52af(0x191)] -
            _0x4d10dd["clientWidth"]),
          _0x4d10dd[_0x5f52af(0x162)] > _0x26d3c3 &&
            (_0x4d10dd[_0x5f52af(0x186)][_0x5f52af(0x146)] = _0x26d3c3 + "px"),
          _0x4d10dd[_0x5f52af(0x18a)] > _0x16e952 &&
            (_0x4d10dd[_0x5f52af(0x186)]["top"] = _0x16e952 + "px"));
      }),
      (_0x4d10dd[_0x2710be(0xf7)] = function (_0x18840f) {
        var _0x25e46b = _0x2710be;
        (_0x18840f = _0x18840f || window[_0x25e46b(0x100)]),
          _0x18840f["preventDefault"]();
        var _0x3d0bc3 = 0x0,
          _0x33ef45 = 0x0,
          _0x2e605a = 0x0,
          _0x1ad080 = 0x0,
          _0x345504 = 0x0,
          _0x49b080 = 0x0;
        (_0x2e605a = _0x18840f[_0x25e46b(0x10d)]),
          (_0x1ad080 = _0x18840f[_0x25e46b(0x13c)]),
          (document[_0x25e46b(0x16f)] = function () {
            var _0x8d0399 = _0x25e46b;
            (document["onmouseup"] = null),
              (document["onmousemove"] = null),
              (localStorage["darkmysite_draggable_switch_top"] =
                _0x4d10dd[_0x8d0399(0x18a)]),
              (localStorage[_0x8d0399(0x128)] = _0x4d10dd[_0x8d0399(0x162)]);
          }),
          (document[_0x25e46b(0xf8)] = function (_0x26b836) {
            var _0x569d28 = _0x25e46b;
            (_0x26b836 = _0x26b836 || window[_0x569d28(0x100)]),
              _0x26b836[_0x569d28(0x193)](),
              (_0x3d0bc3 = _0x2e605a - _0x26b836["clientX"]),
              (_0x33ef45 = _0x1ad080 - _0x26b836[_0x569d28(0x13c)]),
              (_0x2e605a = _0x26b836[_0x569d28(0x10d)]),
              (_0x1ad080 = _0x26b836[_0x569d28(0x13c)]),
              (_0x345504 = _0x4d10dd["offsetTop"] - _0x33ef45),
              (_0x49b080 = _0x4d10dd[_0x569d28(0x162)] - _0x3d0bc3),
              _0x345504 <= _0x16e952 &&
                _0x49b080 <= _0x26d3c3 &&
                _0x345504 >= 0x0 &&
                _0x49b080 >= 0x0 &&
                ((_0x4d10dd[_0x569d28(0x186)][_0x569d28(0x13f)] =
                  _0x569d28(0x11c)),
                (_0x4d10dd[_0x569d28(0x186)][_0x569d28(0x19c)] =
                  _0x569d28(0x11c)),
                (_0x4d10dd[_0x569d28(0x186)][_0x569d28(0x17d)] =
                  _0x345504 + "px"),
                (_0x4d10dd["style"]["left"] = _0x49b080 + "px"));
          });
      });
  }
}
function darkmysite_init_alternative_dark_mode_switch() {
  var _0x3041fe = _0x57cb81;
  if (darkmysite_alternative_dark_mode_switch[_0x3041fe(0x181)] > 0x0) {
    const _0x31dccc = document["querySelectorAll"](
      darkmysite_alternative_dark_mode_switch
    );
    for (
      let _0xca1630 = 0x0;
      _0xca1630 < _0x31dccc[_0x3041fe(0x181)];
      _0xca1630++
    ) {
      const _0x36ca4e = _0x31dccc[_0xca1630];
      _0x36ca4e[_0x3041fe(0x19b)](_0x3041fe(0x122), () => {
        darkmysite_switch_trigger();
      });
    }
  }
}
function get_bg_color_to_preserve(_0xb81310, _0x2eb15b) {
  var _0x52ee34 = _0x57cb81,
    _0x526af1 = window[_0x52ee34(0x13e)](_0xb81310, null)["backgroundColor"];
  !_0x2eb15b && (_0x526af1 = _0xb81310[_0x52ee34(0x19d)][_0x52ee34(0x18c)]);
  if (
    (_0x526af1 === _0x52ee34(0x165) ||
      _0x526af1 === _0x52ee34(0x149) ||
      _0x526af1 === _0x52ee34(0x101)) &&
    _0xb81310["parentNode"][_0x52ee34(0x147)] === 0x1
  )
    _0x526af1 = get_bg_color_to_preserve(_0xb81310[_0x52ee34(0xfd)], ![]);
  else
    _0xb81310["parentNode"][_0x52ee34(0x147)] === 0x1 &&
      _0xb81310[_0x52ee34(0xfd)][_0x52ee34(0x13b)](_0x52ee34(0x158)) &&
      window[_0x52ee34(0x13e)](_0xb81310["parentNode"], null)[
        _0x52ee34(0x185)
      ] === _0x526af1 &&
      (_0x526af1 = get_bg_color_to_preserve(_0xb81310[_0x52ee34(0xfd)], ![]));
  return _0x526af1;
}
function get_txt_color_to_preserve(_0x36067e, _0x2f19b3) {
  var _0xf326e7 = _0x57cb81,
    _0x5a568f = window[_0xf326e7(0x13e)](_0x36067e, null)["color"];
  !_0x2f19b3 && (_0x5a568f = _0x36067e["dataset"][_0xf326e7(0x134)]);
  if (
    (_0x5a568f === _0xf326e7(0x165) ||
      _0x5a568f === _0xf326e7(0x149) ||
      _0x5a568f === "rgba(255,255,255,0)") &&
    _0x36067e["parentNode"][_0xf326e7(0x147)] === 0x1
  )
    _0x5a568f = get_txt_color_to_preserve(_0x36067e["parentNode"], ![]);
  else
    _0x36067e[_0xf326e7(0xfd)][_0xf326e7(0x147)] === 0x1 &&
      _0x36067e[_0xf326e7(0xfd)]["hasAttribute"](
        "data-darkmysite_preserved_color"
      ) &&
      window[_0xf326e7(0x13e)](_0x36067e[_0xf326e7(0xfd)], null)["color"] ===
        _0x5a568f &&
      (_0x5a568f = get_txt_color_to_preserve(_0x36067e["parentNode"], ![]));
  return _0x5a568f;
}
function darkmysite_darken_bg_image(_0x15ebb8, _0x26415e) {
  var _0x897817 = _0x57cb81;
  document[_0x897817(0xfb)](_0x897817(0x141))[0x0]["classList"][
    _0x897817(0x111)
  ](_0x897817(0x159))
    ? window["getComputedStyle"](_0x15ebb8, null)[_0x897817(0x17f)] !==
        _0x897817(0x107) &&
      window["getComputedStyle"](_0x15ebb8, null)["backgroundImage"][
        "includes"
      ](_0x897817(0x156)) &&
      !window[_0x897817(0x13e)](_0x15ebb8, null)[_0x897817(0x17f)][
        _0x897817(0x139)
      ]("rgba(0,\x200,\x200,\x20" + _0x26415e + ")") &&
      _0x15ebb8["style"][_0x897817(0xfe)](
        _0x897817(0x120),
        _0x897817(0xfa) +
          _0x26415e +
          _0x897817(0x190) +
          _0x26415e +
          _0x897817(0x174) +
          window[_0x897817(0x13e)](_0x15ebb8, null)[_0x897817(0x17f)]
      )
    : window[_0x897817(0x13e)](_0x15ebb8, null)[_0x897817(0x17f)] !==
        _0x897817(0x107) &&
      window[_0x897817(0x13e)](_0x15ebb8, null)[_0x897817(0x17f)][
        _0x897817(0x139)
      ]("rgba(0,\x200,\x200,\x20" + _0x26415e + ")") &&
      _0x15ebb8[_0x897817(0x186)][_0x897817(0xfe)](
        _0x897817(0x120),
        window[_0x897817(0x13e)](_0x15ebb8, null)[_0x897817(0x17f)]["replace"](
          _0x897817(0xfa) +
            _0x26415e +
            "),\x20rgba(0,\x200,\x200,\x20" +
            _0x26415e +
            _0x897817(0x174),
          ""
        )
      );
}
function darkmysite_img_is_disallowed_for_brightness_and_grayscale(
  _0x23efce,
  _0x4cac1e
) {
  var _0x8cf340 = _0x57cb81;
  if (_0x4cac1e === _0x8cf340(0x115)) {
    if (darkmysite_disallowed_low_brightness_images_arr[_0x8cf340(0x181)] > 0x0)
      for (
        let _0x216d7e = 0x0;
        _0x216d7e <
        darkmysite_disallowed_low_brightness_images_arr[_0x8cf340(0x181)];
        _0x216d7e++
      ) {
        if (
          darkmysite_disallowed_low_brightness_images_arr[_0x216d7e][
            _0x8cf340(0x150)
          ]()["length"] > 0x0
        ) {
          var _0x541095 =
              darkmysite_disallowed_low_brightness_images_arr[_0x216d7e],
            _0x5d6a25 = new URL(_0x541095)[_0x8cf340(0x188)];
          if (_0x23efce[_0x8cf340(0x12b)]("src") != null) {
            if (_0x23efce[_0x8cf340(0x12b)]("src")["includes"](_0x5d6a25))
              return !![];
          }
          if (_0x23efce["getAttribute"](_0x8cf340(0x197)) != null) {
            if (
              _0x23efce["getAttribute"](_0x8cf340(0x197))["includes"](_0x5d6a25)
            )
              return !![];
          }
        }
      }
  } else {
    if (_0x4cac1e === _0x8cf340(0x102)) {
      if (darkmysite_disallowed_grayscale_images_arr[_0x8cf340(0x181)] > 0x0)
        for (
          let _0x5519bd = 0x0;
          _0x5519bd <
          darkmysite_disallowed_grayscale_images_arr[_0x8cf340(0x181)];
          _0x5519bd++
        ) {
          if (
            darkmysite_disallowed_grayscale_images_arr[_0x5519bd][
              _0x8cf340(0x150)
            ]()[_0x8cf340(0x181)] > 0x0
          ) {
            var _0x541095 =
                darkmysite_disallowed_grayscale_images_arr[_0x5519bd],
              _0x5d6a25 = new URL(_0x541095)[_0x8cf340(0x188)];
            if (_0x23efce["getAttribute"]("src") != null) {
              if (
                _0x23efce[_0x8cf340(0x12b)](_0x8cf340(0x161))[_0x8cf340(0x139)](
                  _0x5d6a25
                )
              )
                return !![];
            }
            if (_0x23efce[_0x8cf340(0x12b)](_0x8cf340(0x197)) != null) {
              if (
                _0x23efce["getAttribute"](_0x8cf340(0x197))[_0x8cf340(0x139)](
                  _0x5d6a25
                )
              )
                return !![];
            }
          }
        }
    }
  }
  return ![];
}
function darkmysite_img_brightness_and_grayscale(_0xb89f79) {
  var _0x5d2ec9 = _0x57cb81,
    _0xe01e08 = darkmysite_img_is_disallowed_for_brightness_and_grayscale(
      _0xb89f79,
      _0x5d2ec9(0x115)
    ),
    _0x250433 = darkmysite_img_is_disallowed_for_brightness_and_grayscale(
      _0xb89f79,
      _0x5d2ec9(0x102)
    );
  if (
    document[_0x5d2ec9(0xfb)](_0x5d2ec9(0x141))[0x0][_0x5d2ec9(0x11f)][
      _0x5d2ec9(0x111)
    ]("darkmysite_dark_mode_enabled")
  ) {
    if (
      !_0xb89f79[_0x5d2ec9(0x11f)][_0x5d2ec9(0x111)](
        "darkmysite_changed_brightness_and_grayscale"
      )
    ) {
      (_0xb89f79[_0x5d2ec9(0x19d)][_0x5d2ec9(0x18f)] =
        _0xb89f79[_0x5d2ec9(0x186)][_0x5d2ec9(0x14f)]),
        _0xb89f79[_0x5d2ec9(0x11f)][_0x5d2ec9(0x129)](_0x5d2ec9(0x167));
      if (
        darkmysite_enable_low_image_brightness === "1" &&
        darkmysite_enable_image_grayscale === "1" &&
        _0xe01e08 === ![] &&
        _0x250433 === ![]
      )
        _0xb89f79[_0x5d2ec9(0x186)]["filter"] =
          _0x5d2ec9(0x17b) +
          darkmysite_image_brightness_to +
          "%)" +
          "\x20" +
          _0x5d2ec9(0x19a) +
          darkmysite_image_grayscale_to +
          "%)";
      else {
        if (darkmysite_enable_low_image_brightness === "1" && _0xe01e08 === ![])
          _0xb89f79[_0x5d2ec9(0x186)]["filter"] =
            "brightness(" + darkmysite_image_brightness_to + "%)";
        else
          darkmysite_enable_image_grayscale === "1" &&
            _0x250433 === ![] &&
            (_0xb89f79[_0x5d2ec9(0x186)][_0x5d2ec9(0x14f)] =
              _0x5d2ec9(0x19a) + darkmysite_image_grayscale_to + "%)");
      }
    }
  } else
    _0xb89f79[_0x5d2ec9(0x11f)][_0x5d2ec9(0x111)](
      "darkmysite_changed_brightness_and_grayscale"
    ) &&
      ((_0xb89f79[_0x5d2ec9(0x186)][_0x5d2ec9(0x14f)] =
        _0xb89f79[_0x5d2ec9(0x19d)]["darkmysite_preserved_filter"]),
      _0xb89f79[_0x5d2ec9(0x11f)][_0x5d2ec9(0x13a)](_0x5d2ec9(0x167)),
      delete _0xb89f79[_0x5d2ec9(0x19d)][_0x5d2ec9(0x18f)]);
}
function darkmysite_invert_image(_0x5ce34a) {
  var _0x3fa510 = _0x57cb81;
  if (
    document[_0x3fa510(0xfb)](_0x3fa510(0x141))[0x0][_0x3fa510(0x11f)][
      _0x3fa510(0x111)
    ](_0x3fa510(0x159))
  ) {
    if (
      _0x5ce34a[_0x3fa510(0x12b)]("src") != null ||
      _0x5ce34a[_0x3fa510(0x12b)](_0x3fa510(0x197)) != null ||
      window[_0x3fa510(0x13e)](_0x5ce34a, null)[_0x3fa510(0x17f)] != null
    )
      for (
        let _0x5d2efd = 0x0;
        _0x5d2efd < darkmysite_invert_images_allowed_urls_arr[_0x3fa510(0x181)];
        _0x5d2efd++
      ) {
        var _0x2349b0 = new URL(
          darkmysite_invert_images_allowed_urls_arr[_0x5d2efd]
        )[_0x3fa510(0x188)];
        _0x5ce34a["getAttribute"](_0x3fa510(0x161)) != null &&
          _0x5ce34a["getAttribute"](_0x3fa510(0x161))[_0x3fa510(0x139)](
            _0x2349b0
          ) &&
          ((_0x5ce34a[_0x3fa510(0x186)][_0x3fa510(0x14f)] = _0x3fa510(0x104)),
          _0x5ce34a[_0x3fa510(0x11f)][_0x3fa510(0x129)](_0x3fa510(0x16d))),
          _0x5ce34a[_0x3fa510(0x12b)](_0x3fa510(0x197)) != null &&
            _0x5ce34a["getAttribute"]("srcset")["includes"](_0x2349b0) &&
            ((_0x5ce34a["style"]["filter"] = _0x3fa510(0x104)),
            _0x5ce34a[_0x3fa510(0x11f)][_0x3fa510(0x129)](_0x3fa510(0x16d))),
          window[_0x3fa510(0x13e)](_0x5ce34a, null)[_0x3fa510(0x17f)] != null &&
            window[_0x3fa510(0x13e)](_0x5ce34a, null)[_0x3fa510(0x17f)][
              "includes"
            ](_0x2349b0) &&
            ((_0x5ce34a[_0x3fa510(0x186)][_0x3fa510(0x14f)] = _0x3fa510(0x104)),
            _0x5ce34a[_0x3fa510(0x11f)][_0x3fa510(0x129)](
              "darkmysite_inverted_image"
            ));
      }
  } else
    _0x5ce34a["classList"][_0x3fa510(0x111)](_0x3fa510(0x16d)) &&
      ((_0x5ce34a["style"][_0x3fa510(0x14f)] = _0x5ce34a[_0x3fa510(0x186)][
        _0x3fa510(0x14f)
      ][_0x3fa510(0x187)](_0x3fa510(0x104), "")),
      _0x5ce34a[_0x3fa510(0x11f)][_0x3fa510(0x13a)](
        "darkmysite_inverted_image"
      ));
}
function darkmysite_replace_image(_0x2131dc, _0x2c6f5c) {
  var _0x4ba94f = _0x57cb81;
  if (
    document[_0x4ba94f(0xfb)](_0x4ba94f(0x141))[0x0]["classList"][
      _0x4ba94f(0x111)
    ](_0x4ba94f(0x159))
  )
    for (
      let _0x441e9a = 0x0;
      _0x441e9a < _0x2c6f5c[_0x4ba94f(0x181)];
      _0x441e9a++
    ) {
      var _0x210cb6 = _0x2c6f5c[_0x441e9a][_0x4ba94f(0x155)],
        _0xc4390b = new URL(_0x210cb6)["pathname"],
        _0x5731ad = _0x2c6f5c[_0x441e9a][_0x4ba94f(0x166)],
        _0x14e527 = new URL(_0x5731ad)["pathname"];
      _0x2131dc[_0x4ba94f(0x12b)](_0x4ba94f(0x161)) != null &&
        _0x2131dc["getAttribute"](_0x4ba94f(0x161))["includes"](_0xc4390b) &&
        ((_0x2131dc[_0x4ba94f(0x161)] = _0x5731ad),
        _0x2131dc[_0x4ba94f(0x11f)][_0x4ba94f(0x129)](_0x4ba94f(0x18e))),
        _0x2131dc[_0x4ba94f(0x12b)](_0x4ba94f(0x197)) != null &&
          _0x2131dc[_0x4ba94f(0x12b)](_0x4ba94f(0x197))["includes"](
            _0xc4390b
          ) &&
          ((_0x2131dc[_0x4ba94f(0x197)] = _0x5731ad),
          _0x2131dc[_0x4ba94f(0x11f)]["add"](_0x4ba94f(0x18e))),
        window["getComputedStyle"](_0x2131dc, null)[_0x4ba94f(0x17f)] != null &&
          window[_0x4ba94f(0x13e)](_0x2131dc, null)[_0x4ba94f(0x17f)][
            _0x4ba94f(0x139)
          ](_0xc4390b) &&
          ((_0x2131dc[_0x4ba94f(0x186)][_0x4ba94f(0x17f)] =
            "url(\x27" + _0x5731ad + "\x27)"),
          _0x2131dc[_0x4ba94f(0x11f)][_0x4ba94f(0x129)](
            "darkmysite_replaced_image"
          ));
    }
  else {
    if (_0x2131dc[_0x4ba94f(0x11f)]["contains"]("darkmysite_replaced_image"))
      for (let _0x460701 = 0x0; _0x460701 < _0x2c6f5c["length"]; _0x460701++) {
        var _0x210cb6 = _0x2c6f5c[_0x460701][_0x4ba94f(0x155)],
          _0xc4390b = new URL(_0x210cb6)[_0x4ba94f(0x188)],
          _0x5731ad = _0x2c6f5c[_0x460701][_0x4ba94f(0x166)],
          _0x14e527 = new URL(_0x5731ad)["pathname"];
        _0x2131dc[_0x4ba94f(0x12b)](_0x4ba94f(0x161)) != null &&
          _0x2131dc["getAttribute"](_0x4ba94f(0x161))[_0x4ba94f(0x139)](
            _0x14e527
          ) &&
          ((_0x2131dc[_0x4ba94f(0x161)] = _0x210cb6),
          _0x2131dc["classList"][_0x4ba94f(0x13a)](
            "darkmysite_replaced_image"
          )),
          _0x2131dc[_0x4ba94f(0x12b)](_0x4ba94f(0x197)) != null &&
            _0x2131dc[_0x4ba94f(0x12b)](_0x4ba94f(0x197))[_0x4ba94f(0x139)](
              _0x14e527
            ) &&
            ((_0x2131dc[_0x4ba94f(0x197)] = _0x210cb6),
            _0x2131dc["classList"][_0x4ba94f(0x13a)](_0x4ba94f(0x18e))),
          window["getComputedStyle"](_0x2131dc, null)[_0x4ba94f(0x17f)] !=
            null &&
            window[_0x4ba94f(0x13e)](_0x2131dc, null)["backgroundImage"][
              _0x4ba94f(0x139)
            ](_0x14e527) &&
            ((_0x2131dc[_0x4ba94f(0x186)][_0x4ba94f(0x17f)] =
              "url(\x27" + _0x210cb6 + "\x27)"),
            _0x2131dc[_0x4ba94f(0x11f)]["remove"](_0x4ba94f(0x18e)));
      }
  }
}
function _0x8a4c() {
  var _0x10c7f8 = [
    "svg",
    "includes",
    "remove",
    "hasAttribute",
    "clientY",
    "darkmysite_admin_panel_last_state",
    "getComputedStyle",
    "bottom",
    "all\x200s\x20ease\x200s",
    "html",
    "transition",
    "23640vTUcTb",
    "toString",
    "load",
    "left",
    "nodeType",
    "matches",
    "rgba(0,\x200,\x200,\x200)",
    "ctrlKey",
    "select",
    ".darkmysite_style_txt_border,\x20.darkmysite_style_txt,\x20.darkmysite_style_border",
    "class",
    "change",
    "filter",
    "trim",
    "dark_video",
    "source",
    "darkmysite_style_form_element",
    "split",
    "normal_image",
    "url",
    "observe",
    "data-darkmysite_preserved_bg",
    "darkmysite_dark_mode_enabled",
    "replaceAll",
    "darkmysite_replaced_video",
    "readyState",
    "background-color",
    "darkmysite_secondary_bg_finder",
    "dailymotion",
    "borderColor",
    "src",
    "offsetLeft",
    "getHours",
    "setMinutes",
    "transparent",
    "dark_image",
    "darkmysite_changed_brightness_and_grayscale",
    "darkmysite_preserved_classes",
    "658oCobvS",
    "darkmysite_style_bg_txt",
    "rgba(",
    "parse",
    "darkmysite_inverted_image",
    "darkmysite_inverted_inline_svg",
    "onmouseup",
    "darkmysite_style_txt",
    "input",
    "textarea",
    "darkmysite_style_border",
    ")),\x20",
    "video",
    "dark",
    "rgb(255,\x20255,\x20255)",
    "darkmysite_draggable_switch_top",
    "darkmysite_changed_video_brightness_and_grayscale",
    "darkmysite_style_secondary_bg",
    "brightness(",
    "target",
    "top",
    "toLowerCase",
    "backgroundImage",
    "attributes",
    "length",
    "toFixed",
    "height",
    "now",
    "backgroundColor",
    "style",
    "replace",
    "pathname",
    "1314390qZhkyc",
    "offsetTop",
    "darkmysite_last_state",
    "darkmysite_preserved_bg",
    "darkmysite_style_button",
    "darkmysite_replaced_image",
    "darkmysite_preserved_filter",
    "),\x20rgba(0,\x200,\x200,\x20",
    "clientWidth",
    "3707528nDYJbl",
    "preventDefault",
    "color",
    "darkmysite_style_txt_border",
    "darkmysite_processed",
    "srcset",
    "&amp;",
    "data-darkmysite_alpha_bg",
    "grayscale(",
    "addEventListener",
    "right",
    "dataset",
    "rgb",
    "onmousedown",
    "onmousemove",
    "youtube",
    "linear-gradient(rgba(0,\x200,\x200,\x20",
    "getElementsByTagName",
    "darkmysite_style_bg_border",
    "parentNode",
    "setProperty",
    "darkmysite_style_all",
    "event",
    "rgba(255,255,255,0)",
    "grayscale",
    "darkmysite_style_link",
    "invert(1)",
    "darkmysite_alpha_bg",
    "*\x20:not(head,\x20title,\x20link,\x20meta,\x20script,\x20style,\x20defs,\x20filter,\x20.darkmysite_processed)",
    "none",
    "(prefers-color-scheme:\x20dark)",
    "531eGdBjF",
    "&quot;",
    "*\x20:not(head,\x20title,\x20link,\x20meta,\x20script,\x20style,\x20defs,\x20filter)",
    "important",
    "clientX",
    "not_set",
    "rgba(255,\x20255,\x20255,\x200)",
    "DOMContentLoaded",
    "contains",
    "data-darkmysite_preserved_color",
    "getTime",
    "1396468FnSIfl",
    "brightness",
    "clientHeight",
    "resize",
    "forEach",
    "vimeo",
    "214426wjMlSY",
    "584VGEaTf",
    "unset",
    "data-darkmysite_secondary_bg_finder",
    "darkmysite_switch_",
    "classList",
    "background-image",
    "?_=",
    "click",
    "nodeName",
    "darkmysite_style_bg",
    "rgba",
    "matchMedia",
    "setHours",
    "darkmysite_draggable_switch_left",
    "add",
    "attributeName",
    "getAttribute",
    "getBoundingClientRect",
    "width",
    "documentElement",
    "button",
    "querySelectorAll",
    "142770eUqfyT",
    "light",
    "disconnect",
    "darkmysite_preserved_color",
    "21654UdzWDo",
    "loading",
    "iframe",
  ];
  _0x8a4c = function () {
    return _0x10c7f8;
  };
  return _0x8a4c();
}
function darkmysite_invert_inline_svg(_0x56d775) {
  var _0x2b0d0b = _0x57cb81;
  document[_0x2b0d0b(0xfb)](_0x2b0d0b(0x141))[0x0][_0x2b0d0b(0x11f)][
    _0x2b0d0b(0x111)
  ](_0x2b0d0b(0x159))
    ? ((_0x56d775["style"][_0x2b0d0b(0x14f)] = _0x2b0d0b(0x104)),
      _0x56d775[_0x2b0d0b(0x11f)][_0x2b0d0b(0x129)](_0x2b0d0b(0x16e)))
    : _0x56d775["classList"][_0x2b0d0b(0x111)](_0x2b0d0b(0x16e)) &&
      ((_0x56d775[_0x2b0d0b(0x186)][_0x2b0d0b(0x14f)] = _0x56d775[
        _0x2b0d0b(0x186)
      ]["filter"][_0x2b0d0b(0x187)](_0x2b0d0b(0x104), "")),
      _0x56d775[_0x2b0d0b(0x11f)][_0x2b0d0b(0x13a)](_0x2b0d0b(0x16e)));
}
function darkmysite_video_brightness_and_grayscale(_0x596d9b) {
  var _0x323d52 = _0x57cb81;
  if (
    document[_0x323d52(0xfb)](_0x323d52(0x141))[0x0][_0x323d52(0x11f)][
      _0x323d52(0x111)
    ]("darkmysite_dark_mode_enabled")
  ) {
    if (!_0x596d9b[_0x323d52(0x11f)][_0x323d52(0x111)](_0x323d52(0x179))) {
      (_0x596d9b[_0x323d52(0x19d)]["darkmysite_preserved_filter"] =
        _0x596d9b["style"][_0x323d52(0x14f)]),
        _0x596d9b[_0x323d52(0x11f)][_0x323d52(0x129)](
          "darkmysite_changed_video_brightness_and_grayscale"
        );
      if (
        darkmysite_enable_low_video_brightness === "1" &&
        darkmysite_enable_video_grayscale === "1"
      )
        _0x596d9b[_0x323d52(0x186)]["filter"] =
          _0x323d52(0x17b) +
          darkmysite_video_brightness_to +
          "%)" +
          "\x20" +
          _0x323d52(0x19a) +
          darkmysite_video_grayscale_to +
          "%)";
      else {
        if (darkmysite_enable_low_video_brightness === "1")
          _0x596d9b[_0x323d52(0x186)][_0x323d52(0x14f)] =
            _0x323d52(0x17b) + darkmysite_video_brightness_to + "%)";
        else
          darkmysite_enable_video_grayscale === "1" &&
            (_0x596d9b[_0x323d52(0x186)][_0x323d52(0x14f)] =
              "grayscale(" + darkmysite_video_grayscale_to + "%)");
      }
    }
  } else
    _0x596d9b[_0x323d52(0x11f)]["contains"](_0x323d52(0x179)) &&
      ((_0x596d9b[_0x323d52(0x186)][_0x323d52(0x14f)] =
        _0x596d9b[_0x323d52(0x19d)][_0x323d52(0x18f)]),
      _0x596d9b[_0x323d52(0x11f)][_0x323d52(0x13a)](_0x323d52(0x179)),
      delete _0x596d9b[_0x323d52(0x19d)][_0x323d52(0x18f)]);
}
function darkmysite_replace_video(_0x44b4f9, _0x2a4dc3) {
  var _0x2c0fda = _0x57cb81;
  if (
    document["getElementsByTagName"]("html")[0x0][_0x2c0fda(0x11f)][
      _0x2c0fda(0x111)
    ]("darkmysite_dark_mode_enabled")
  )
    for (
      let _0x7fc84e = 0x0;
      _0x7fc84e < _0x2a4dc3[_0x2c0fda(0x181)];
      _0x7fc84e++
    ) {
      var _0x484be4 = _0x2a4dc3[_0x7fc84e]["normal_video"],
        _0x39dcb2 = new URL(_0x484be4)[_0x2c0fda(0x188)],
        _0x28ca5d = _0x2a4dc3[_0x7fc84e][_0x2c0fda(0x151)],
        _0x7d55dc = new URL(_0x28ca5d)[_0x2c0fda(0x188)];
      _0x44b4f9[_0x2c0fda(0x12b)](_0x2c0fda(0x161)) != null &&
        _0x44b4f9[_0x2c0fda(0x12b)](_0x2c0fda(0x161))[_0x2c0fda(0x139)](
          _0x39dcb2
        ) &&
        ((_0x44b4f9[_0x2c0fda(0x161)] = _0x28ca5d),
        _0x44b4f9[_0x2c0fda(0x11f)][_0x2c0fda(0x129)](_0x2c0fda(0x15b)));
      if (_0x44b4f9[_0x2c0fda(0x130)]("source") != null) {
        let _0x2eb7db = _0x44b4f9["querySelectorAll"]("source");
        for (
          let _0x13a1d0 = 0x0;
          _0x13a1d0 < _0x2eb7db["length"];
          _0x13a1d0++
        ) {
          _0x2eb7db[_0x13a1d0]["getAttribute"](_0x2c0fda(0x161)) != null &&
            _0x2eb7db[_0x13a1d0][_0x2c0fda(0x12b)](_0x2c0fda(0x161))[
              _0x2c0fda(0x139)
            ](_0x39dcb2) &&
            ((_0x2eb7db[_0x13a1d0][_0x2c0fda(0x161)] =
              _0x28ca5d + _0x2c0fda(0x121) + Date[_0x2c0fda(0x184)]()),
            _0x44b4f9["classList"][_0x2c0fda(0x129)](_0x2c0fda(0x15b)),
            _0x44b4f9[_0x2c0fda(0x145)]());
        }
      }
    }
  else {
    if (_0x44b4f9[_0x2c0fda(0x11f)]["contains"](_0x2c0fda(0x15b)))
      for (
        let _0x37c5f0 = 0x0;
        _0x37c5f0 < _0x2a4dc3[_0x2c0fda(0x181)];
        _0x37c5f0++
      ) {
        var _0x484be4 = _0x2a4dc3[_0x37c5f0]["normal_video"],
          _0x39dcb2 = new URL(_0x484be4)[_0x2c0fda(0x188)],
          _0x28ca5d = _0x2a4dc3[_0x37c5f0][_0x2c0fda(0x151)],
          _0x7d55dc = new URL(_0x28ca5d)[_0x2c0fda(0x188)];
        _0x44b4f9["getAttribute"]("src") != null &&
          _0x44b4f9[_0x2c0fda(0x12b)](_0x2c0fda(0x161))[_0x2c0fda(0x139)](
            _0x7d55dc
          ) &&
          ((_0x44b4f9[_0x2c0fda(0x161)] = _0x484be4),
          _0x44b4f9[_0x2c0fda(0x11f)]["remove"]("darkmysite_replaced_video"));
        if (_0x44b4f9["querySelectorAll"](_0x2c0fda(0x152)) != null) {
          let _0x33c982 = _0x44b4f9[_0x2c0fda(0x130)](_0x2c0fda(0x152));
          for (
            let _0x531300 = 0x0;
            _0x531300 < _0x33c982["length"];
            _0x531300++
          ) {
            _0x33c982[_0x531300][_0x2c0fda(0x12b)](_0x2c0fda(0x161)) != null &&
              _0x33c982[_0x531300][_0x2c0fda(0x12b)]("src")[_0x2c0fda(0x139)](
                _0x7d55dc
              ) &&
              ((_0x33c982[_0x531300]["src"] =
                _0x484be4 + "?_=" + Date["now"]()),
              _0x44b4f9[_0x2c0fda(0x11f)][_0x2c0fda(0x13a)](
                "darkmysite_replaced_video"
              ),
              _0x44b4f9[_0x2c0fda(0x145)]());
          }
        }
      }
  }
}
function darkmysite_fix_background_color_alpha(_0xd479c4) {
  var _0x10c6fa = _0x57cb81;
  if (
    document[_0x10c6fa(0xfb)]("html")[0x0][_0x10c6fa(0x11f)]["contains"](
      "darkmysite_dark_mode_enabled"
    )
  ) {
    if (_0xd479c4[_0x10c6fa(0x13b)](_0x10c6fa(0x199))) {
      var _0x4ffdf0 = _0xd479c4[_0x10c6fa(0x19d)][_0x10c6fa(0x105)]
          [_0x10c6fa(0x187)](_0x10c6fa(0x16b), "")
          [_0x10c6fa(0x187)](")", "")
          [_0x10c6fa(0x154)](",")[0x3]
          ["trim"](),
        _0x236611 = window["getComputedStyle"](_0xd479c4, null)[
          _0x10c6fa(0x185)
        ];
      !_0x236611[_0x10c6fa(0x139)]("rgba") &&
        _0xd479c4[_0x10c6fa(0x186)]["setProperty"](
          _0x10c6fa(0x15d),
          _0x236611[_0x10c6fa(0x187)](")", ",\x20" + _0x4ffdf0 + ")")[
            _0x10c6fa(0x187)
          ](_0x10c6fa(0x19e), "rgba"),
          _0x10c6fa(0x10c)
        );
    }
  } else
    _0xd479c4[_0x10c6fa(0x13b)](_0x10c6fa(0x199)) &&
      (_0xd479c4[_0x10c6fa(0x186)][_0x10c6fa(0x185)] = "");
}
function darkmysite_elements_force_to_correct(_0x65b779) {
  var _0x200762 = _0x57cb81;
  document["getElementsByTagName"](_0x200762(0x141))[0x0][_0x200762(0x11f)][
    "contains"
  ](_0x200762(0x159)) &&
    _0x65b779[_0x200762(0x13b)](_0x200762(0x158)) &&
    _0x65b779[_0x200762(0x13b)](_0x200762(0x112)) &&
    (_0x65b779[_0x200762(0x186)][_0x200762(0xfe)](
      _0x200762(0x15d),
      _0x65b779[_0x200762(0x19d)][_0x200762(0x18c)]
    ),
    _0x65b779[_0x200762(0x186)][_0x200762(0xfe)](
      "color",
      _0x65b779[_0x200762(0x19d)][_0x200762(0x134)]
    ));
}
function darkmysite_implement_secondary_bg() {
  var _0x583cb1 = _0x57cb81,
    _0x1d691e = null,
    _0x27abbd = 0x0,
    _0x340f13 = document[_0x583cb1(0x130)](_0x583cb1(0x10b));
  for (
    var _0x5e18bd = 0x0;
    _0x5e18bd < _0x340f13[_0x583cb1(0x181)];
    _0x5e18bd++
  ) {
    var _0xb51d38 = _0x340f13[_0x5e18bd];
    if (_0xb51d38["hasAttribute"]("data-darkmysite_secondary_bg_finder")) {
      var _0x57b80e = _0xb51d38[_0x583cb1(0x19d)][_0x583cb1(0x15e)];
      if (_0x57b80e !== "transparent" && _0x57b80e !== _0x583cb1(0x149)) {
        var _0x5f0fc4 = _0xb51d38[_0x583cb1(0x12c)](),
          _0x2957e8 = _0x5f0fc4[_0x583cb1(0x12d)] * _0x5f0fc4[_0x583cb1(0x183)];
        _0x2957e8 > _0x27abbd &&
          ((_0x27abbd = _0x2957e8), (_0x1d691e = _0x57b80e));
      }
    }
  }
  for (
    var _0x5e18bd = 0x0;
    _0x5e18bd < _0x340f13[_0x583cb1(0x181)];
    _0x5e18bd++
  ) {
    var _0xb51d38 = _0x340f13[_0x5e18bd];
    if (_0xb51d38["hasAttribute"](_0x583cb1(0x11d))) {
      if (
        _0xb51d38["classList"]["contains"](_0x583cb1(0xff)) ||
        _0xb51d38["classList"]["contains"]("darkmysite_style_bg_txt") ||
        _0xb51d38["classList"]["contains"]("darkmysite_style_bg_border") ||
        _0xb51d38["classList"][_0x583cb1(0x111)](_0x583cb1(0x124))
      ) {
        var _0xee553b = _0x1d691e !== _0xb51d38["dataset"][_0x583cb1(0x15e)];
        _0xee553b &&
          _0xb51d38[_0x583cb1(0x11f)][_0x583cb1(0x129)](
            "darkmysite_style_secondary_bg"
          );
      }
      delete _0xb51d38["dataset"]["darkmysite_secondary_bg_finder"];
    }
  }
  darkmysite_secondary_bg_color = _0x1d691e;
}
function darkmysite_recheck_on_css_loaded_later() {
  var _0x2ee4f7 = _0x57cb81;
  document[_0x2ee4f7(0x130)](_0x2ee4f7(0x14c))["forEach"](function (_0x4cd1a8) {
    var _0x52e11d = _0x2ee4f7,
      _0x426658 = window[_0x52e11d(0x13e)](_0x4cd1a8, null),
      _0x254059 = _0x426658[_0x52e11d(0x185)];
    _0x254059 !== "rgba(0,\x200,\x200,\x200)" &&
      _0x254059 !== "rgba(255,\x20255,\x20255,\x200)" &&
      darkmysite_process_element(_0x4cd1a8);
  });
}
function darkmysite_check_preloading() {
  var _0x283350 = _0x57cb81,
    _0x458ab6 = ![],
    _0x20cf28 = localStorage[_0x283350(0x18b)]
      ? localStorage[_0x283350(0x18b)]
      : "not_set",
    _0x8409f6 = localStorage[_0x283350(0x13d)]
      ? localStorage["darkmysite_admin_panel_last_state"]
      : _0x283350(0x10e);
  if (darkmysite_is_this_admin_panel === "1")
    _0x8409f6 === "1" && (_0x458ab6 = !![]);
  else {
    if (_0x20cf28 === "1" || _0x20cf28 === "0")
      _0x20cf28 === "1" && (_0x458ab6 = !![]);
    else {
      darkmysite_enable_default_dark_mode === "1" && (_0x458ab6 = !![]);
      if (darkmysite_enable_time_based_dark === "1") {
        var _0x44fd69 = new Date(),
          _0x1f8034 = new Date(),
          _0x4d6119 = new Date();
        _0x1f8034["setHours"](
          parseInt(darkmysite_time_based_dark_start[_0x283350(0x154)](":")[0x0])
        ),
          _0x1f8034[_0x283350(0x164)](
            parseInt(
              darkmysite_time_based_dark_start[_0x283350(0x154)](":")[0x1]
            )
          ),
          _0x4d6119[_0x283350(0x127)](
            parseInt(
              darkmysite_time_based_dark_stop[_0x283350(0x154)](":")[0x0]
            )
          ),
          _0x4d6119["setMinutes"](
            parseInt(
              darkmysite_time_based_dark_stop[_0x283350(0x154)](":")[0x1]
            )
          ),
          parseInt(
            darkmysite_time_based_dark_stop[_0x283350(0x154)](":")[0x0]
          ) >=
          parseInt(darkmysite_time_based_dark_start[_0x283350(0x154)](":")[0x0])
            ? _0x44fd69[_0x283350(0x113)]() > _0x1f8034["getTime"]() &&
              _0x44fd69["getTime"]() < _0x4d6119["getTime"]() &&
              (_0x458ab6 = !![])
            : _0x44fd69[_0x283350(0x163)]() > 0xc
            ? _0x44fd69[_0x283350(0x113)]() > _0x1f8034[_0x283350(0x113)]() &&
              _0x44fd69["getTime"]() > _0x4d6119["getTime"]() &&
              (_0x458ab6 = !![])
            : _0x44fd69[_0x283350(0x113)]() < _0x1f8034[_0x283350(0x113)]() &&
              _0x44fd69[_0x283350(0x113)]() < _0x4d6119["getTime"]() &&
              (_0x458ab6 = !![]);
      }
    }
  }
  return (
    darkmysite_is_this_admin_panel === "0" &&
      darkmysite_enable_os_aware === "1" &&
      window[_0x283350(0x126)] &&
      window[_0x283350(0x126)](_0x283350(0x108))[_0x283350(0x148)] &&
      _0x20cf28 !== "1" &&
      _0x20cf28 !== "0" &&
      (_0x458ab6 = !![]),
    _0x458ab6
  );
}
function darkmysite_process_element(_0x59791f) {
  var _0x20e542 = _0x57cb81,
    _0x43a5cc = window[_0x20e542(0x13e)](_0x59791f, null);
  old_transition = "";
  _0x43a5cc[_0x20e542(0x142)] !== _0x20e542(0x140) &&
    ((old_transition = _0x43a5cc[_0x20e542(0x142)]),
    _0x59791f[_0x20e542(0x186)][_0x20e542(0xfe)](
      _0x20e542(0x142),
      _0x20e542(0x107)
    ));
  (_0x59791f[_0x20e542(0x11f)]["contains"]("darkmysite_style_all") ||
    _0x59791f[_0x20e542(0x11f)]["contains"](_0x20e542(0x16a)) ||
    _0x59791f[_0x20e542(0x11f)]["contains"](_0x20e542(0xfc)) ||
    _0x59791f[_0x20e542(0x11f)][_0x20e542(0x111)](_0x20e542(0x195)) ||
    _0x59791f[_0x20e542(0x11f)][_0x20e542(0x111)](_0x20e542(0x124)) ||
    _0x59791f[_0x20e542(0x11f)][_0x20e542(0x111)](_0x20e542(0x170)) ||
    _0x59791f[_0x20e542(0x11f)]["contains"](_0x20e542(0x173)) ||
    _0x59791f[_0x20e542(0x11f)][_0x20e542(0x111)](
      "darkmysite_style_secondary_bg"
    )) &&
    (_0x59791f["classList"][_0x20e542(0x13a)](_0x20e542(0xff)),
    _0x59791f[_0x20e542(0x11f)]["remove"](_0x20e542(0x16a)),
    _0x59791f[_0x20e542(0x11f)]["remove"](_0x20e542(0xfc)),
    _0x59791f[_0x20e542(0x11f)][_0x20e542(0x13a)](_0x20e542(0x195)),
    _0x59791f[_0x20e542(0x11f)][_0x20e542(0x13a)](_0x20e542(0x124)),
    _0x59791f[_0x20e542(0x11f)][_0x20e542(0x13a)](_0x20e542(0x170)),
    _0x59791f[_0x20e542(0x11f)][_0x20e542(0x13a)](_0x20e542(0x173)),
    _0x59791f[_0x20e542(0x11f)][_0x20e542(0x13a)](_0x20e542(0x17a)));
  var _0x48569e = _0x59791f[_0x20e542(0x123)]["toLowerCase"](),
    _0x53372a = _0x43a5cc[_0x20e542(0x185)],
    _0x27c7ba = _0x43a5cc[_0x20e542(0x194)],
    _0x45ba99 = _0x43a5cc[_0x20e542(0x160)],
    _0x32dc2d = _0x43a5cc[_0x20e542(0x17f)];
  _0x48569e === "body" &&
    (_0x53372a === "rgba(0,\x200,\x200,\x200)" ||
      _0x53372a === _0x20e542(0x10f)) &&
    (_0x59791f["style"][_0x20e542(0xfe)](_0x20e542(0x15d), _0x20e542(0x177)),
    (_0x53372a = window[_0x20e542(0x13e)](_0x59791f, null)["backgroundColor"]));
  if (
    darkmysite_disallowed_elements_force_to_correct === "1" ||
    darkmysite_allowed_elements_force_to_correct === "1"
  ) {
    if (typeof _0x59791f[_0x20e542(0x186)] !== "undefined") {
      var _0x466ec2 = get_bg_color_to_preserve(_0x59791f, !![]);
      (_0x466ec2 === _0x20e542(0x149) || _0x466ec2 === _0x20e542(0x10f)) &&
        (_0x466ec2 = _0x20e542(0x177)),
        (_0x59791f[_0x20e542(0x19d)][_0x20e542(0x18c)] = _0x466ec2),
        (_0x59791f["dataset"][_0x20e542(0x134)] = get_txt_color_to_preserve(
          _0x59791f,
          !![]
        )),
        darkmysite_allowed_elements_raw[_0x20e542(0x181)] > 0x0 &&
          _0x59791f[_0x20e542(0x148)](darkmysite_allowed_elements_raw) &&
          darkmysite_allowed_elements_force_to_correct === "1" &&
          darkmysite_elements_force_to_correct(_0x59791f),
        darkmysite_disallowed_elements_raw[_0x20e542(0x181)] > 0x0 &&
          _0x59791f[_0x20e542(0x148)](darkmysite_disallowed_elements_raw) &&
          darkmysite_disallowed_elements_force_to_correct === "1" &&
          darkmysite_elements_force_to_correct(_0x59791f);
    }
  }
  if (darkmysite_allowed_elements[_0x20e542(0x181)] > 0x0) {
    if (!_0x59791f[_0x20e542(0x148)](darkmysite_allowed_elements)) {
      old_transition !== "" &&
        _0x59791f[_0x20e542(0x186)][_0x20e542(0xfe)](
          _0x20e542(0x142),
          old_transition
        );
      _0x59791f[_0x20e542(0x11f)][_0x20e542(0x129)](_0x20e542(0x196));
      return;
    }
  }
  if (darkmysite_disallowed_elements[_0x20e542(0x181)] > 0x0) {
    if (_0x59791f[_0x20e542(0x148)](darkmysite_disallowed_elements)) {
      old_transition !== "" &&
        _0x59791f[_0x20e542(0x186)][_0x20e542(0xfe)](
          _0x20e542(0x142),
          old_transition
        );
      _0x59791f[_0x20e542(0x11f)][_0x20e542(0x129)](_0x20e542(0x196));
      return;
    }
  }
  has_background_img_url = ![];
  _0x32dc2d !== _0x20e542(0x107) &&
    _0x32dc2d[_0x20e542(0x139)](_0x20e542(0x156)) &&
    ((has_background_img_url = !![]),
    darkmysite_enable_bg_image_darken === "1" &&
      darkmysite_darken_bg_image(_0x59791f, darken_level));
  if (
    _0x53372a !== _0x20e542(0x149) &&
    _0x53372a !== _0x20e542(0x10f) &&
    has_background_img_url === ![]
  ) {
    !_0x59791f["hasAttribute"](_0x20e542(0x11d)) &&
      (_0x59791f[_0x20e542(0x19d)]["darkmysite_secondary_bg_finder"] =
        _0x53372a);
    if (darkmysite_secondary_bg_color !== "") {
      var _0x432c18 =
        darkmysite_secondary_bg_color !==
        _0x59791f["dataset"][_0x20e542(0x15e)];
      _0x432c18 &&
        _0x59791f["classList"][_0x20e542(0x129)](
          "darkmysite_style_secondary_bg"
        ),
        delete _0x59791f[_0x20e542(0x19d)][_0x20e542(0x15e)];
    }
  }
  if (
    _0x53372a !== _0x20e542(0x149) &&
    _0x27c7ba !== "rgba(0,\x200,\x200,\x200)" &&
    _0x45ba99 !== _0x20e542(0x149) &&
    _0x53372a !== _0x20e542(0x10f) &&
    _0x27c7ba !== _0x20e542(0x10f) &&
    _0x45ba99 !== _0x20e542(0x10f) &&
    has_background_img_url === ![]
  )
    _0x59791f[_0x20e542(0x11f)]["add"](_0x20e542(0xff));
  else {
    if (
      _0x53372a !== "rgba(0,\x200,\x200,\x200)" &&
      _0x27c7ba !== _0x20e542(0x149) &&
      _0x53372a !== _0x20e542(0x10f) &&
      _0x27c7ba !== "rgba(255,\x20255,\x20255,\x200)" &&
      has_background_img_url === ![]
    )
      _0x59791f[_0x20e542(0x11f)][_0x20e542(0x129)](_0x20e542(0x16a));
    else {
      if (
        _0x53372a !== "rgba(0,\x200,\x200,\x200)" &&
        _0x45ba99 !== _0x20e542(0x149) &&
        _0x53372a !== _0x20e542(0x10f) &&
        _0x45ba99 !== _0x20e542(0x10f) &&
        has_background_img_url === ![]
      )
        _0x59791f[_0x20e542(0x11f)]["add"](_0x20e542(0xfc));
      else {
        if (
          _0x27c7ba !== _0x20e542(0x149) &&
          _0x45ba99 !== _0x20e542(0x149) &&
          _0x27c7ba !== "rgba(255,\x20255,\x20255,\x200)" &&
          _0x45ba99 !== "rgba(255,\x20255,\x20255,\x200)"
        )
          _0x59791f[_0x20e542(0x11f)][_0x20e542(0x129)](_0x20e542(0x195));
        else {
          if (
            _0x53372a !== _0x20e542(0x149) &&
            _0x53372a !== _0x20e542(0x10f) &&
            has_background_img_url === ![]
          )
            _0x59791f[_0x20e542(0x11f)][_0x20e542(0x129)](_0x20e542(0x124));
          else {
            if (
              _0x27c7ba !== _0x20e542(0x149) &&
              _0x27c7ba !== _0x20e542(0x10f)
            )
              _0x59791f[_0x20e542(0x11f)][_0x20e542(0x129)](_0x20e542(0x170));
            else
              _0x45ba99 !== _0x20e542(0x149) &&
                _0x45ba99 !== "rgba(255,\x20255,\x20255,\x200)" &&
                _0x59791f[_0x20e542(0x11f)][_0x20e542(0x129)](_0x20e542(0x173));
          }
        }
      }
    }
  }
  _0x32dc2d !== _0x20e542(0x107) &&
    !has_background_img_url &&
    !_0x59791f["classList"][_0x20e542(0x111)](_0x20e542(0xff)) &&
    !_0x59791f["classList"][_0x20e542(0x111)](_0x20e542(0x16a)) &&
    !_0x59791f[_0x20e542(0x11f)][_0x20e542(0x111)](_0x20e542(0xfc)) &&
    !_0x59791f["classList"]["contains"](_0x20e542(0x124)) &&
    _0x59791f[_0x20e542(0x11f)][_0x20e542(0x129)](_0x20e542(0x124));
  _0x48569e === "a" && _0x59791f[_0x20e542(0x11f)]["add"](_0x20e542(0x103));
  (_0x48569e === _0x20e542(0x171) ||
    _0x48569e === _0x20e542(0x14b) ||
    _0x48569e === _0x20e542(0x172)) &&
    _0x59791f[_0x20e542(0x11f)][_0x20e542(0x129)](_0x20e542(0x153));
  _0x48569e === _0x20e542(0x12f) &&
    _0x59791f[_0x20e542(0x11f)][_0x20e542(0x129)](_0x20e542(0x18d));
  (darkmysite_enable_low_image_brightness === "1" ||
    darkmysite_enable_image_grayscale === "1") &&
    _0x48569e === "img" &&
    darkmysite_img_brightness_and_grayscale(_0x59791f);
  darkmysite_enable_invert_images === "1" &&
    darkmysite_invert_images_allowed_urls_arr[_0x20e542(0x181)] > 0x0 &&
    darkmysite_invert_image(_0x59791f);
  darkmysite_image_replacements_arr[_0x20e542(0x181)] > 0x0 &&
    darkmysite_replace_image(_0x59791f, darkmysite_image_replacements_arr);
  darkmysite_enable_invert_inline_svg === "1" &&
    _0x48569e === "svg" &&
    darkmysite_invert_inline_svg(_0x59791f);
  if (
    darkmysite_enable_low_video_brightness === "1" ||
    darkmysite_enable_video_grayscale === "1"
  ) {
    _0x48569e === _0x20e542(0x175) &&
      darkmysite_video_brightness_and_grayscale(_0x59791f);
    if (_0x48569e === "iframe") {
      if (_0x59791f[_0x20e542(0x12b)](_0x20e542(0x161)) != null) {
        const _0x113254 = _0x59791f[_0x20e542(0x12b)](_0x20e542(0x161));
        (_0x113254[_0x20e542(0x139)]("youtube") ||
          _0x113254["includes"](_0x20e542(0x119)) ||
          _0x113254[_0x20e542(0x139)](_0x20e542(0x15f))) &&
          darkmysite_video_brightness_and_grayscale(_0x59791f);
      }
    }
  }
  if (darkmysite_video_replacements_arr[_0x20e542(0x181)] > 0x0) {
    _0x48569e === "video" &&
      darkmysite_replace_video(_0x59791f, darkmysite_video_replacements_arr);
    if (_0x48569e === _0x20e542(0x137)) {
      if (_0x59791f[_0x20e542(0x12b)](_0x20e542(0x161)) != null) {
        const _0xf55032 = _0x59791f[_0x20e542(0x12b)](_0x20e542(0x161));
        (_0xf55032["includes"]("youtube") ||
          _0xf55032["includes"](_0x20e542(0x119)) ||
          _0xf55032[_0x20e542(0x139)](_0x20e542(0x15f))) &&
          darkmysite_replace_video(
            _0x59791f,
            darkmysite_video_replacements_arr
          );
      }
    }
  }
  _0x53372a[_0x20e542(0x139)](_0x20e542(0x125)) &&
    ((_0x59791f[_0x20e542(0x19d)][_0x20e542(0x105)] = _0x53372a),
    darkmysite_fix_background_color_alpha(_0x59791f)),
    old_transition !== "" &&
      setTimeout(function () {
        var _0x104e0c = _0x20e542;
        _0x59791f["style"][_0x104e0c(0xfe)]("transition", old_transition);
      }, 0x0),
    setTimeout(function () {
      var _0x524aeb = _0x20e542;
      elements_class_changed["observe"](_0x59791f, {
        attributes: !![],
        attributeFilter: [_0x524aeb(0x14d)],
      });
    }, 0x0),
    _0x59791f["classList"][_0x20e542(0x129)](_0x20e542(0x196));
}
function darkmysite_init_processes() {
  var _0x4e21db = _0x57cb81;
  (has_process_run_at_least_once = !![]),
    document["querySelectorAll"](_0x4e21db(0x106))[_0x4e21db(0x118)](function (
      _0x5c3afd
    ) {
      darkmysite_process_element(_0x5c3afd);
    });
}
function darkmysite_init_observer() {
  var _0x2d8310 = _0x57cb81;
  darkmysite_observer[_0x2d8310(0x157)](document, {
    attributes: ![],
    childList: !![],
    characterData: ![],
    subtree: !![],
  }),
    dark_mode_status_changed["observe"](
      document[_0x2d8310(0xfb)](_0x2d8310(0x141))[0x0],
      { attributes: !![] }
    ),
    document["readyState"] !== _0x2d8310(0x136)
      ? (!has_process_run_at_least_once && darkmysite_init_processes(),
        darkmysite_implement_secondary_bg(),
        darkmysite_recheck_on_css_loaded_later())
      : document["addEventListener"](_0x2d8310(0x110), function () {
          !has_process_run_at_least_once && darkmysite_init_processes(),
            darkmysite_implement_secondary_bg(),
            darkmysite_recheck_on_css_loaded_later();
        });
}
darkmysite_check_preloading() &&
  (document["getElementsByTagName"](_0x57cb81(0x141))[0x0][_0x57cb81(0x11f)][
    _0x57cb81(0x129)
  ](_0x57cb81(0x159)),
  darkmysite_init_observer());
