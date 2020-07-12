require("./runtime");
require("./vendors");
require("./taro");

(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["app"],{

/***/ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/app.tsx?taro&type=script&parse=ENTRY&":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./src/app.tsx?taro&type=script&parse=ENTRY& ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _taroWeapp = __webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js");

var _taroWeapp2 = _interopRequireDefault(_taroWeapp);

var _srSdkWxapp = __webpack_require__(/*! sr-sdk-wxapp */ "./node_modules/sr-sdk-wxapp/index.js");

var _srSdkWxapp2 = _interopRequireDefault(_srSdkWxapp);

__webpack_require__(/*! ./app.scss */ "./src/app.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
   * 有数埋点SDK 默认配置
   * 使用方法请参考文档 https://mp.zhls.qq.com/youshu-docs/develop/sdk/Taro.html
   * 如对有数SDK埋点接入有任何疑问，请联系微信：sr_data_service
   */
_srSdkWxapp2.default.init({
  /**
   * 有数 - ka‘接入测试用’ 分配的 app_id，对应的业务接口人负责
   */
  token: 'bi6cdbda95ae2640ec',
  /**
   * 微信小程序appID，以wx开头
   */
  appid: 'touristappid',
  /**
   * 如果使用了小程序插件，需要设置为 true
   */
  usePlugin: false,
  /**
   * 开启打印调试信息， 默认 false
   */
  debug: true,
  /**
   * 建议开启-开启自动代理 Page， 默认 false
   * sdk 负责上报页面的 browse 、leave、share 等事件
   * 可以使用 sr.page 代替 Page(sr.page(options))
   * 元素事件跟踪，需要配合 autoTrack: true
   */
  proxyPage: true,
  /**
   * 建议开启-开启组件自动代理， 默认 false
   * sdk 负责上报页面的 browse 、leave、share 等事件
   */
  proxyComponent: true,
  // 建议开启-是否开启页面分享链路自动跟踪
  openSdkShareDepth: true,
  // 建议开启-元素事件跟踪，自动上报元素事件，入tap、change、longpress、confirm
  autoTrack: true
});
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

var _App = function (_BaseComponent) {
  _inherits(_App, _BaseComponent);

  function _App() {
    _classCallCheck(this, _App);

    var _this = _possibleConstructorReturn(this, (_App.__proto__ || Object.getPrototypeOf(_App)).apply(this, arguments));

    _this.config = {
      pages: ['pages/index/index'],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
      }
    };

    _this.globalData = {
      sr: _srSdkWxapp2.default
    };
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    return _this;
  }

  _createClass(_App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentDidShow',
    value: function componentDidShow() {}
  }, {
    key: 'componentDidHide',
    value: function componentDidHide() {}
  }, {
    key: 'componentDidCatchError',
    value: function componentDidCatchError() {}
    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

  }, {
    key: '_createData',
    value: function _createData() {}
  }]);

  return _App;
}(_taroWeapp.Component);

exports.default = _App;

App(__webpack_require__(/*! @tarojs/taro-weapp */ "./node_modules/@tarojs/taro-weapp/index.js").default.createApp(_App));
_taroWeapp2.default.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});

/***/ }),

/***/ "./node_modules/sr-sdk-wxapp/index.js":
/*!********************************************!*\
  !*** ./node_modules/sr-sdk-wxapp/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (t, i) {
  "object" == ( false ? undefined : _typeof(exports)) && "undefined" != typeof module ? module.exports = i() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (i),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(undefined, function () {
  "use strict";
  /*! *****************************************************************************
      Copyright (c) Microsoft Corporation. All rights reserved.
      Licensed under the Apache License, Version 2.0 (the "License"); you may not use
      this file except in compliance with the License. You may obtain a copy of the
      License at http://www.apache.org/licenses/LICENSE-2.0
  
      THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
      KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
      WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
      MERCHANTABLITY OR NON-INFRINGEMENT.
  
      See the Apache Version 2.0 License for specific language governing permissions
      and limitations under the License.
      ***************************************************************************** */

  var _t = function t(i, e) {
    return (_t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (t, i) {
      t.__proto__ = i;
    } || function (t, i) {
      for (var e in i) {
        i.hasOwnProperty(e) && (t[e] = i[e]);
      }
    })(i, e);
  };function i(i, e) {
    function s() {
      this.constructor = i;
    }_t(i, e), i.prototype = null === e ? Object.create(e) : (s.prototype = e.prototype, new s());
  }var _e = function e() {
    return (_e = Object.assign || function (t) {
      for (var i, e = 1, s = arguments.length; e < s; e++) {
        for (var r in i = arguments[e]) {
          Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r]);
        }
      }return t;
    }).apply(this, arguments);
  };function s(t, i, e, s) {
    var r,
        n = arguments.length,
        h = n < 3 ? i : null === s ? s = Object.getOwnPropertyDescriptor(i, e) : s;if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) h = Reflect.decorate(t, i, e, s);else for (var o = t.length - 1; o >= 0; o--) {
      (r = t[o]) && (h = (n < 3 ? r(h) : n > 3 ? r(i, e, h) : r(i, e)) || h);
    }return n > 3 && h && Object.defineProperty(i, e, h), h;
  }function r() {
    for (var t = 0, i = 0, e = arguments.length; i < e; i++) {
      t += arguments[i].length;
    }var s = Array(t),
        r = 0;for (i = 0; i < e; i++) {
      for (var n = arguments[i], h = 0, o = n.length; h < o; h++, r++) {
        s[r] = n[h];
      }
    }return s;
  }try {
    Object.entries || (Object.entries = function (t) {
      for (var i = Object.keys(t), e = i.length, s = new Array(e); e--;) {
        s[e] = [i[e], t[i[e]]];
      }return s;
    }), Array.prototype.includes || (Array.prototype.includes = function (t) {
      return !!~this.indexOf(t);
    });
  } catch (t) {
    console.error("polyfill exec failed", t);
  }var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      h = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,
      o = function o(t) {
    return function (t) {
      for (var i, e, s, r, h = "", o = 0, a = (t = String(t)).length % 3; o < t.length;) {
        if ((e = t.charCodeAt(o++)) > 255 || (s = t.charCodeAt(o++)) > 255 || (r = t.charCodeAt(o++)) > 255) throw new TypeError("Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.");h += n.charAt((i = e << 16 | s << 8 | r) >> 18 & 63) + n.charAt(i >> 12 & 63) + n.charAt(i >> 6 & 63) + n.charAt(63 & i);
      }return a ? h.slice(0, a - 3) + "===".substring(a) : h;
    }(encodeURIComponent(t).replace(/%([0-9A-F]{2})/g, function (t, i) {
      var e;return e = "0x" + i, String.fromCharCode(e);
    }));
  },
      a = function a(t) {
    return decodeURIComponent(function (t) {
      if (t = String(t).replace(/[\t\n\f\r ]+/g, ""), !h.test(t)) throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");t += "==".slice(2 - (3 & t.length));for (var i, e, s, r = "", o = 0; o < t.length;) {
        i = n.indexOf(t.charAt(o++)) << 18 | n.indexOf(t.charAt(o++)) << 12 | (e = n.indexOf(t.charAt(o++))) << 6 | (s = n.indexOf(t.charAt(o++))), r += 64 === e ? String.fromCharCode(i >> 16 & 255) : 64 === s ? String.fromCharCode(i >> 16 & 255, i >> 8 & 255) : String.fromCharCode(i >> 16 & 255, i >> 8 & 255, 255 & i);
      }return r;
    }(t).split("").map(function (t) {
      return "%" + ("00" + t.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
  },
      c = { encode: function encode(t) {
      return o(t).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }, decode: function decode(t) {
      var i = (t = t.replace(/\-/g, "+").replace(/_/g, "/")).length % 4;return i > 0 && (t += "====".substring(i)), a(t);
    } },
      u = Object.prototype.toString,
      d = c,
      p = function p(t) {
    return "[object Object]" === u.call(t);
  },
      f = function f(t) {
    return "[object Array]" === u.call(t);
  },
      l = function l(t, i) {
    var e;undefined === i && (i = 0);var s = [];return function () {
      for (var r = arguments, n = [], h = 0; h < arguments.length; h++) {
        n[h] = r[h];
      }return clearTimeout(e), e = setTimeout(function () {
        var i = t.apply(undefined, n);s.forEach(function (t) {
          return t(i);
        }), s = [];
      }, i), new Promise(function (t) {
        return s.push(t);
      });
    };
  },
      g = function g() {
    return Date.now() + "-" + "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
      var i = 16 * Math.random() | 0;return ("x" == t ? i : 3 & i | 8).toString(16);
    });
  },
      _ = function _() {
    for (var t = arguments, i = [], e = 0; e < arguments.length; e++) {
      i[e] = t[e];
    }return 0 === i.length ? {} : i.length < 2 ? i[0] : i.reduce(function (t, i) {
      if (!p(t) || !p(i)) return console.error("deepMerge arguments only access object"), t;var e = t || {};return Object.entries(i).forEach(function (i) {
        var s = i[0],
            n = i[1];if (undefined !== n) if (t[s]) {
          if (f(t[s])) {
            if (!f(n)) return undefined;var h = f(n) ? n : [n];e[s] = r(t[s], h);
          } else p(t[s]) ? e[s] = _(t[s], n) : e[s] = n;
        } else e[s] = n;
      }), e;
    });
  },
      v = function v(t) {
    return !!/^[a-zA-Z\$_][a-zA-Z\d_]*$/.test(t);
  },
      x = function (t) {
    function s(i) {
      var e = t.call(this, i.request) || this;return e.stack = [], e.initialize = function () {
        return Promise.resolve(true);
      }, e.add = function (t) {
        e.stack.push(t);
      }, e.getItems = function () {
        return e.stack;
      }, e.unshift = function (t) {
        var i;return (i = e.stack).unshift.apply(i, t);
      }, e.clean = function () {
        var t = e.stack;return e.stack = [], t;
      }, e.option = i, e.initialize(), e;
    }return i(s, t), s.prototype.flush = function (t) {
      var i = this;if (undefined === t && (t = {}), this.stack.length) {
        var s = this.stack.map(function (i) {
          return i.props = _e(_e({}, i.props), t), i;
        });this.stack = [], this.upload({ events: s }).then(function (t) {
          t.success || (i.stack = s);
        }).catch(function () {
          i.stack = s;
        });
      }
    }, s;
  }(function (t) {
    this.delay = 100, this.upload = l(t, this.delay);
  }),
      S = function S(t, i, e) {
    var s = e.value;return e.value = function () {
      var t;try {
        t = s.apply(this, arguments);
      } catch (t) {
        try {
          console.error("Calling " + i + " error with", arguments), console.error(t);var e = this.getServerUrl();this.request({ type: "sdk api exec error", props: { sr_sdk_version: this.version, system_info: this.getSystemInfo(), message: (t || {}).message || t, stack: (t || {}).stack } }, { url: e, method: "POST" });
        } catch (t) {}
      }return t;
    }, e;
  },
      m = function m(t, i, e) {
    var s = e.value;return e.value = function () {
      if (this.inited) return s.apply(this, arguments);console.error("\u8BF7\u5148\u5B8C\u6210\u521D\u59CB\u5316");
    }, e;
  },
      y = { SDK: "__SR_SDK_TRACKER__", TRACKS: "TRACKS", USER_INFO: "USER_INFO", LOGID_EVENTS: "LOGID_EVENTS" },
      k = { WAITING: "WAITING", REPORTING: "REPORTING", PAUSED: "PAUSED" },
      b = { MISS: "should exec cacheManagerInitialize first" },
      I = {};try {
    I = JSON.parse('{"mp":{"version":{"min":"1.3.6","max":"1.3.9"},"download":"https://sr-home-1257214331.cos.ap-guangzhou.myqcloud.com/sdk/sdk-weapp/index.js"},"xxx-for-git":{}}');
  } catch (t) {}var A = function () {
    function t() {
      var t = this;this.versions = I, this.env = "production", this.cachePrefix = y.SDK, this.inited = false, this.option = {}, this.context = {}, this.reportState = k.WAITING, this.triggerFlush = l(function () {
        t.checkAndUpload();
      }, 1e3), this.eventDataFmatter = function (i) {
        var s = +new Date(),
            r = t.getPageInfo();if (undefined !== t._onQueue) {
          var n = t._onQueue(i);p(i) ? i = n : console.warn("eventDataFmatter should return Object type");
        }return _e(_e(_e({}, r), i), { time: s });
      }, this.checkRequiredOptionItem = function () {
        return !!t.option.token || (t.option.skipTokenCheck ? (console.warn("token \u672A\u914D\u7F6E\uFF0C\u5DF2\u8DF3\u8FC7\u8BE5\u68C0\u67E5"), true) : (console.error("sdk.init - Option \u5FC5\u8981\u53C2\u6570\u914D\u7F6E\u7F3A\u5931\uFF0C\u8BF7\u68C0\u67E5"), false));
      }, this.checkVersionInfo = function () {
        t.setContext({ sr_sdk_version: t.version });var i = "https://sr-home-1257214331.cos.ap-guangzhou.myqcloud.com/sdk/sr-sdk-version-info.json?timesamp=" + Date.now();return t.request({}, { url: i, method: "GET" }).then(function (i) {
          var e = (i.data || {})[t.name],
              s = true;if (e) {
            var r = (((t.versions || {})[t.name] || {}).version || {}).max;return r && (e.version.min > r ? (console.error("\u5F53\u524DSDK\u7248\u672C\u8FC7\u4F4E, \u8BF7\u5347\u7EA7\uFF01"), s = false) : e.version.max > r && console.warn("\u5F53\u524DSDK\u6709\u66F4\u65B0, \u63A8\u8350\u5347\u7EA7\uFF01")), { success: s, data: e, msg: "" };
          }
        }).catch(function (t) {
          return undefined === t && (t = {}), { success: false, data: undefined, msg: t.errMsg };
        });
      }, this.queueInitialize = function () {
        var i = t.getServerUrl();return t.queue = new x({ request: function request(s) {
            var r = s.events.map(function (i) {
              return _e(_e({}, i), { from: "sr-sdk-wxapp", tracking_id: t.tracking_id, log_id: ++t.log_id });
            });return t.setCache(y.LOGID_EVENTS, { last_tracking_id: t.tracking_id, last_max_log_id: t.log_id }), t.request(r, { url: i, method: "POST" }).catch(function (t) {
              return console.error("APICaller error", t), t;
            });
          } }), true;
      }, this.trackLogEvents = function () {
        return (t.getCache(y.LOGID_EVENTS) || {}).last_max_log_id ? (t.track("logid_events", t.getCache(y.LOGID_EVENTS)), true) : (++t.log_id, false);
      }, this.tracking_id = g(), this.log_id = -1, this.checkStaticMethods();
    }return t.prototype.init = function (t) {
      if (this.inited) return this;if (this.version = ((this.versions[this.name] || {}).version || {}).max, this.option = _(this.defaultOptions, this.option, t), !this.checkRequiredOptionItem()) return this;this.cacheManagerInitialize();try {
        this.proxyInitialize();
      } catch (t) {
        this.errorHandle(t);
      }return this.queueInitialize(), this.contextInitialize(), this.inited = true, this.checkFallback(), this.option.autoStart && this.startReport(), this.checkVersionInfo(), this.trackLogEvents(), this;
    }, t.prototype.track = function (t, i) {
      var e = this.option.debug;JSON.stringify(i || {}).length > 5e3 && console.warn("\u76D1\u6D4B\u5230\u8D85\u8FC75000\u7684\u4E0A\u62A5\u65E5\u5FD7\uFF1A" + t);var s = this.eventDataFmatter(i);return e && console && "function" == typeof console.log && console.log("\u3010Track\u3011 " + t, s), this.queue.add({ type: t, props: s }), this.triggerFlush(), this;
    }, t.prototype.setContext = function (t) {
      return console.warn("setContext \u4E0D\u5728\u63A8\u8350\u4F7F\u7528\uFF0C\u8BF7\u7528\u66F4\u8F7B\u4FBF\u7684 setUser\u3001setChan\u7B49\u65B9\u6CD5\u4EE3\u66FF"), this.context = _e(_e(_e({}, this.context), t), { wx_user: _e(_e({}, this.context.wx_user), t.wx_user || {}), chan: _e(_e({}, this.context.chan), t.chan || {}) }), this;
    }, t.prototype.setUser = function (t) {
      return undefined === t && (t = {}), this.context = Object.assign({}, this.context, { wx_user: _e(_e({}, this.context.wx_user), t) }), this.setCache(y.USER_INFO, this.context.wx_user), this;
    }, t.prototype.setChan = function (t) {
      var i = t.chan_id,
          s = (this.context.chan || {}).chan_id;return this.context = Object.assign({}, this.context, { chan: _e(_e(_e({}, this.context.chan), t), { chan_id: i || s || "" }) }), this;
    }, t.prototype.setComponent = function (t) {
      var i = t.component_id,
          s = t.component_name;return this.context = Object.assign({}, this.context, { component: _e(_e({}, t), { component_id: i, component_name: s }) }), this;
    }, t.prototype.clearComponent = function () {
      return delete this.context.component, this;
    }, t.prototype.setActivityInfo = function (t) {
      var i = t.activity_id,
          s = t.activity_name,
          r = t.activity_type,
          n = t.activity_index;return this.context = Object.assign({}, this.context, { activity_info: _e(_e({}, t), { activity_id: i, activity_name: s, activity_type: r, activity_index: n }) }), this;
    }, t.prototype.clearActivityInfo = function () {
      return delete this.context.activity_info, this;
    }, t.prototype.startReport = function () {
      return this.reportState = k.REPORTING, this.triggerFlush(), this;
    }, t.prototype.resumeReport = function () {
      var t = this.getCache(y.TRACKS) || [];return this.queue.unshift(t), this.reportState === k.PAUSED && (this.reportState = k.REPORTING), this.triggerFlush(), this;
    }, t.prototype.pauseReport = function () {
      return this.reportState = k.PAUSED, this.setCache(y.TRACKS, this.queue.clean()), this;
    }, t.prototype.flush = function () {
      return this.queue.flush(this.context), this;
    }, t.prototype.onQueue = function (t) {
      return this._onQueue = t, this;
    }, t.prototype.getInfo = function () {
      var t = { option: this.option, tracking_id: this.tracking_id, context: this.context, is_dev: this.isDev() };return "SR_SDK_INFO=" + d.encode(JSON.stringify(t));
    }, t.prototype.checkStaticMethods = function () {
      if ("development" === this.env) try {
        var t = this.constructor;["create"].forEach(function (i) {
          !t[i] && console.error("static " + i + " should be implement");
        });
      } catch (t) {
        console.error("checkStaticMethods error", t);
      }
    }, t.prototype.checkFallback = function () {
      var t = this;setTimeout(function () {
        t.checkAndUpload(), t.checkFallback();
      }, 1e4);
    }, t.prototype.checkAndUpload = function () {
      this.reportState === k.REPORTING && this.flush();
    }, t.prototype.contextInitialize = function () {
      var t = this.getUser(),
          i = this.getSystemInfo(),
          s = i.brand,
          r = i.model,
          n = i.version,
          h = i.environment,
          o = i.screenWidth,
          a = i.screenHeight,
          c = i.system,
          u = i.platform;this.context = _(this.context, { wx_user: _e({ app_id: this.option.appid }, t), system_info: { brand: s, model: r, version: n, environment: h, screenWidth: o, screenHeight: a, system: c, platform: u }, chan: {} });
    }, t.prototype.getUser = function () {
      var t = this.context.wx_user || this.getCache(y.USER_INFO) || {};return t.local_id && 50 === t.local_id.length || (t = { local_id: g() }, this.setCache(y.USER_INFO, t)), t;
    }, t.prototype.cacheManagerInitialize = function () {
      var t = this.getCacheManager();this.cacheManager = t;
    }, t.prototype.getCache = function (t) {
      return this.cacheManager ? (this.cacheManager.get(y.SDK) || {})[t] : (console.error(b.MISS), {});
    }, t.prototype.setCache = function (t, i) {
      var s;this.cacheManager || console.error(b.MISS);var r = _e(_e({}, this.cacheManager.get(y.SDK) || {}), ((s = {})[t] = i, s));this.cacheManager.set(y.SDK, r);
    }, t.prototype.getServerUrl = function () {
      var t = "";return t = "function" == typeof this.option.serverUrl ? this.option.serverUrl.call(this) : this.option.serverUrl || "https://zhls.qq.com/api/report", t += "?token=" + this.option.token;
    }, s([S], t.prototype, "init", null), s([S, m], t.prototype, "track", null), s([S, m], t.prototype, "setContext", null), s([S, m], t.prototype, "setUser", null), s([S, m], t.prototype, "setChan", null), s([S, m], t.prototype, "setComponent", null), s([S, m], t.prototype, "clearComponent", null), s([S, m], t.prototype, "setActivityInfo", null), s([S, m], t.prototype, "clearActivityInfo", null), s([S, m], t.prototype, "startReport", null), s([S, m], t.prototype, "resumeReport", null), s([S, m], t.prototype, "pauseReport", null), s([S, m], t.prototype, "flush", null), s([S, m], t.prototype, "onQueue", null), s([S, m], t.prototype, "getInfo", null), t;
  }();function w(t, i, e, s) {
    undefined === s && (s = false);var n = t[i];t[i] = function () {
      for (var t = arguments, i = this, h = [], o = 0; o < arguments.length; o++) {
        h[o] = t[o];
      }var a = function a() {
        return n && n.apply(i, h);
      };return s && (a = function a() {
        return Promise.resolve().then(function () {
          return n.apply(i, h);
        });
      }), e.apply(this, r([a], h));
    };
  }var C = function () {
    function t() {}return t.AddUnsigned = function (t, i) {
      var e, s, r, n, h;return r = 2147483648 & t, n = 2147483648 & i, h = (1073741823 & t) + (1073741823 & i), (e = 1073741824 & t) & (s = 1073741824 & i) ? 2147483648 ^ h ^ r ^ n : e | s ? 1073741824 & h ? 3221225472 ^ h ^ r ^ n : 1073741824 ^ h ^ r ^ n : h ^ r ^ n;
    }, t.FF = function (t, i, e, s, r, n, h) {
      return t = this.AddUnsigned(t, this.AddUnsigned(this.AddUnsigned(this.F(i, e, s), r), h)), this.AddUnsigned(this.RotateLeft(t, n), i);
    }, t.GG = function (t, i, e, s, r, n, h) {
      return t = this.AddUnsigned(t, this.AddUnsigned(this.AddUnsigned(this.G(i, e, s), r), h)), this.AddUnsigned(this.RotateLeft(t, n), i);
    }, t.HH = function (t, i, e, s, r, n, h) {
      return t = this.AddUnsigned(t, this.AddUnsigned(this.AddUnsigned(this.H(i, e, s), r), h)), this.AddUnsigned(this.RotateLeft(t, n), i);
    }, t.II = function (t, i, e, s, r, n, h) {
      return t = this.AddUnsigned(t, this.AddUnsigned(this.AddUnsigned(this.I(i, e, s), r), h)), this.AddUnsigned(this.RotateLeft(t, n), i);
    }, t.ConvertToWordArray = function (t) {
      for (var i, e = t.length, s = e + 8, r = 16 * ((s - s % 64) / 64 + 1), n = Array(r - 1), h = 0, o = 0; o < e;) {
        h = o % 4 * 8, n[i = (o - o % 4) / 4] = n[i] | t.charCodeAt(o) << h, o++;
      }return h = o % 4 * 8, n[i = (o - o % 4) / 4] = n[i] | 128 << h, n[r - 2] = e << 3, n[r - 1] = e >>> 29, n;
    }, t.WordToHex = function (t) {
      var i,
          e = "",
          s = "";for (i = 0; i <= 3; i++) {
        e += (s = "0" + (t >>> 8 * i & 255).toString(16)).substr(s.length - 2, 2);
      }return e;
    }, t.Utf8Encode = function (t) {
      var i,
          e = "";t = t.replace(/\r\n/g, "\n");for (var s = 0; s < t.length; s++) {
        (i = t.charCodeAt(s)) < 128 ? e += String.fromCharCode(i) : i > 127 && i < 2048 ? (e += String.fromCharCode(i >> 6 | 192), e += String.fromCharCode(63 & i | 128)) : (e += String.fromCharCode(i >> 12 | 224), e += String.fromCharCode(i >> 6 & 63 | 128), e += String.fromCharCode(63 & i | 128));
      }return e;
    }, t.init = function (t) {
      for ("string" != typeof t && (t = JSON.stringify(t)), this._string = this.Utf8Encode(t), this.x = this.ConvertToWordArray(this._string), this.a = 1732584193, this.b = 4023233417, this.c = 2562383102, this.d = 271733878, this.k = 0; this.k < this.x.length; this.k += 16) {
        this.AA = this.a, this.BB = this.b, this.CC = this.c, this.DD = this.d, this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k], this.S11, 3614090360), this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 1], this.S12, 3905402710), this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 2], this.S13, 606105819), this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 3], this.S14, 3250441966), this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 4], this.S11, 4118548399), this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 5], this.S12, 1200080426), this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 6], this.S13, 2821735955), this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 7], this.S14, 4249261313), this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 8], this.S11, 1770035416), this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 9], this.S12, 2336552879), this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 10], this.S13, 4294925233), this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 11], this.S14, 2304563134), this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 12], this.S11, 1804603682), this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 13], this.S12, 4254626195), this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 14], this.S13, 2792965006), this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 15], this.S14, 1236535329), this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 1], this.S21, 4129170786), this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 6], this.S22, 3225465664), this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 11], this.S23, 643717713), this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k], this.S24, 3921069994), this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 5], this.S21, 3593408605), this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 10], this.S22, 38016083), this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 15], this.S23, 3634488961), this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 4], this.S24, 3889429448), this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 9], this.S21, 568446438), this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 14], this.S22, 3275163606), this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 3], this.S23, 4107603335), this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 8], this.S24, 1163531501), this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 13], this.S21, 2850285829), this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 2], this.S22, 4243563512), this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 7], this.S23, 1735328473), this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 12], this.S24, 2368359562), this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 5], this.S31, 4294588738), this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 8], this.S32, 2272392833), this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 11], this.S33, 1839030562), this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 14], this.S34, 4259657740), this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 1], this.S31, 2763975236), this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 4], this.S32, 1272893353), this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 7], this.S33, 4139469664), this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 10], this.S34, 3200236656), this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 13], this.S31, 681279174), this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k], this.S32, 3936430074), this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 3], this.S33, 3572445317), this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 6], this.S34, 76029189), this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 9], this.S31, 3654602809), this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 12], this.S32, 3873151461), this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 15], this.S33, 530742520), this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 2], this.S34, 3299628645), this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k], this.S41, 4096336452), this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 7], this.S42, 1126891415), this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 14], this.S43, 2878612391), this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 5], this.S44, 4237533241), this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 12], this.S41, 1700485571), this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 3], this.S42, 2399980690), this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 10], this.S43, 4293915773), this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 1], this.S44, 2240044497), this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 8], this.S41, 1873313359), this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 15], this.S42, 4264355552), this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 6], this.S43, 2734768916), this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 13], this.S44, 1309151649), this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 4], this.S41, 4149444226), this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 11], this.S42, 3174756917), this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 2], this.S43, 718787259), this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 9], this.S44, 3951481745), this.a = this.AddUnsigned(this.a, this.AA), this.b = this.AddUnsigned(this.b, this.BB), this.c = this.AddUnsigned(this.c, this.CC), this.d = this.AddUnsigned(this.d, this.DD);
      }return (this.WordToHex(this.a) + this.WordToHex(this.b) + this.WordToHex(this.c) + this.WordToHex(this.d)).toLowerCase();
    }, t.x = Array(), t.S11 = 7, t.S12 = 12, t.S13 = 17, t.S14 = 22, t.S21 = 5, t.S22 = 9, t.S23 = 14, t.S24 = 20, t.S31 = 4, t.S32 = 11, t.S33 = 16, t.S34 = 23, t.S41 = 6, t.S42 = 10, t.S43 = 15, t.S44 = 21, t.RotateLeft = function (t, i) {
      return t << i | t >>> 32 - i;
    }, t.F = function (t, i, e) {
      return t & i | ~t & e;
    }, t.G = function (t, i, e) {
      return t & e | i & ~e;
    }, t.H = function (t, i, e) {
      return t ^ i ^ e;
    }, t.I = function (t, i, e) {
      return i ^ (t | ~e);
    }, t;
  }(),
      T = "production";function O() {
    var t = getCurrentPages() || "";return t[t.length - 1] || "";
  }function U(t) {
    var i = "/";try {
      var e = O();if (!e) return e;var s,
          r = e.route,
          n = e.options;for (var h in s = e.options, i = r + "?", n) {
        if ("share" !== t || "txsrShareInfoSdk" !== h) if (v(h)) if (s[h]) i += h + "=" + n[h] + "&";
      }i = i.substring(0, i.length - 1);
    } catch (t) {
      console.error("getCurrentPageUrlWithArgs error", t);
    }return i;
  }function R(t) {
    try {
      var i = O();if (!i) return i;i.options;return i.options[t] || "";
    } catch (t) {
      console.error("getCurrentPageKey error", t);
    }return "/";
  }function F() {
    var t = O();try {
      var i = __wxConfig.global.window.navigationBarTitleText;return (t ? (__wxConfig.page[t.route + ".html"].window || {}).navigationBarTitleText : "") || i || "\u672A\u77E5";
    } catch (t) {}return "\u672A\u77E5";
  }function H() {
    return "devtools" === function () {
      try {
        return __wxConfig.platform;
      } catch (t) {
        console.error("getEnv failed: ", t);
      }return "";
    }();
  }function G(t, i, s) {
    try {
      var r = t[0],
          n = undefined === r ? {} : r;if (n) switch (n.type) {case "tap":case "change":case "longpress":case "confirm":
          var h = (n.currentTarget || {}).dataset,
              o = undefined === h ? {} : h,
              a = (this || {}).is;i("element", _e({ is_sdk_auto_track: true, is: undefined === a ? "" : a, type: n.type, id: "#" + s }, o));}
    } catch (t) {
      console.error("elementEventTrack error", t);
    }
  }function P() {
    var t,
        i = "production",
        e = (O() || {}).route || "";try {
      t = wx.getStorageSync(y.SDK + "_" + i);
    } catch (t) {
      console.error("CacheManager.get error", t);
    }var s = t.USER_INFO || {},
        r = s.local_id,
        n = s.txsr_from_share_info,
        h = undefined === n ? {} : n,
        o = h.mi,
        a = undefined === o ? "" : o,
        c = h.d,
        u = undefined === c ? 1 : c,
        d = C.init(r + e),
        p = "" !== a ? d === a ? u : u + 1 : u;return JSON.stringify({ mi: C.init(r + e), d: p });
  }var D = function D() {},
      E = {},
      M = {},
      N = function N() {
    return new Date().getTime();
  };var j = function j(t, i, e, s) {
    return function (r) {
      return function (t, i, e, s, r) {
        if (w(t, "onLoad", function (t, i) {
          t(), this.lauchTime = N();
        }), w(t, "onShow", function (t) {
          var s = this,
              r = function r() {
            s.showTime = N();var t = R.call(s, "room_id");t && e({ room_id: t }), i("browse_wxapp_page", { is_sdk_auto_track: true, refer_page: M.route, is_newly_open: !E[s.route] }), E[s.route] = true, M = s;
          };t().then(r).catch(r);
        }, true), w(t, "onHide", function (t) {
          t();var e = this.showTime ? N() - this.showTime : 0;i("leave_wxapp_page", { is_sdk_auto_track: true, stay_time: e = e > 144e5 ? 0 : e });
        }), w(t, "onUnload", function (t) {
          t();var e = this.lauchTime ? N() - this.lauchTime : 0;i("leave_wxapp_page", { is_sdk_auto_track: true, stay_time: e = e > 144e5 ? 0 : e });
        }), w(t, "onPullDownRefresh", function (t) {
          t(), i("page_pull_down_refresh", { is_sdk_auto_track: true });
        }), w(t, "onReachBottom", function (t) {
          t(), i("page_reach_bottom", { is_sdk_auto_track: true });
        }), "function" == typeof t.onShareAppMessage) {
          var n = t.onShareAppMessage || D,
              h = t.onShareTimeline || D;t.onShareAppMessage = function (t) {
            undefined === t && (t = {});var e = n.call(this, t) || {};try {
              var s = e.path || U.call(this, "share");-1 === s.indexOf("?") ? s += "?" : "&" !== s.slice(-1) && (s += "&");var h = undefined,
                  o = undefined;r && (h = P(), o = JSON.parse(h), s = s + "txsrShareInfoSdk=" + encodeURIComponent(h)), i("page_share_app_message", { is_sdk_auto_track: true, from_type: t.from || "\u672A\u77E5", share_to: "friends", share_path: s, share_title: e.title, share_image_url: e.imageUrl, txsr_share_info_sdk: o }), e.path = s;
            } catch (t) {
              console.error("onShareAppMessage error", t);
            }return e;
          }, t.onShareTimeline = function (t) {
            undefined === t && (t = {});var e = h.call(this, t) || {};try {
              var s = e.path || U.call(this, "share"),
                  n = e.query || "";-1 === s.indexOf("?") ? s += "?" : "&" !== s.slice(-1) && (s += "&");var o = undefined,
                  a = undefined;r && (o = P(), a = JSON.parse(o), s = s + "txsrShareInfoSdk=" + encodeURIComponent(o)), i("page_share_app_message", { is_sdk_auto_track: true, from_type: t.from || "\u672A\u77E5", share_to: "timeline", query: n, share_path: s, share_title: e.title, share_image_url: e.imageUrl, txsr_share_info_sdk: a }), e.path = s;
            } catch (t) {
              console.error("onShareAppMessage error", t);
            }return e;
          };
        }return s && Object.entries(t).filter(function (t) {
          var i = t[0];t[1];return !["onLoad", "onShow", "onReady", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onPageScroll", "onShareAppMessage", "onResize", "onTabItemTap"].includes(i);
        }).forEach(function (e) {
          var s = e[0];"function" == typeof e[1] && w(t, s, function (t) {
            for (var e = arguments, r = [], n = 1; n < arguments.length; n++) {
              r[n - 1] = e[n];
            }return G.call(this, r, i, s), t();
          });
        }), t;
      }(r, t, i, e, s);
    };
  },
      q = function q() {},
      z = {},
      L = {},
      K = function K() {
    return new Date().getTime();
  };var W = function W(t, i, e, s) {
    return function (r) {
      return function (t, i, e, s, r) {
        try {
          if (t.methods = t.methods || {}, w(t.methods, "onLoad", function (t, i) {
            t(), this.lauchTime = K();
          }), w(t.methods, "onShow", function (t) {
            var s = this,
                r = function r() {
              s.showTime = K();var t = R.call(s, "room_id");t && e({ room_id: t }), i("browse_wxapp_page", { is_sdk_auto_track: true, refer_page: L.route, is_newly_open: !z[s.route] }), z[s.route] = true, L = s;
            };t().then(r).catch(r);
          }, true), w(t.methods, "onUnload", function (t) {
            t();var e = this.lauchTime ? K() - this.lauchTime : 0;i("leave_wxapp_page", { is_sdk_auto_track: true, stay_time: e = e > 144e5 ? 0 : e });
          }), w(t.methods, "onPullDownRefresh", function (t) {
            t(), i("page_pull_down_refresh", { is_sdk_auto_track: true });
          }), w(t.methods, "onReachBottom", function (t) {
            t(), i("page_reach_bottom", { is_sdk_auto_track: true });
          }), w(t.methods, "onHide", function (t) {
            t();var e = this.showTime ? K() - this.showTime : 0;i("leave_wxapp_page", { is_sdk_auto_track: true, stay_time: e = e > 144e5 ? 0 : e });
          }), "function" == typeof t.methods.onShareAppMessage) {
            var n = t.methods.onShareAppMessage || q,
                h = t.methods.onShareTimeline || q;t.methods.onShareAppMessage = function (t) {
              undefined === t && (t = {});var e = n.call(this, t) || {};try {
                var s = e.path || U.call(this, "share");-1 === s.indexOf("?") ? s += "?" : "&" !== s.slice(-1) && (s += "&");var h = undefined,
                    o = undefined;r && (h = P(), o = JSON.parse(h), s = s + "txsrShareInfoSdk=" + encodeURIComponent(h)), i("page_share_app_message", { is_sdk_auto_track: true, from_type: t.from || "\u672A\u77E5", share_to: "friends", share_path: s, share_title: e.title, share_image_url: e.imageUrl, txsr_share_info_sdk: o }), e.path = s;
              } catch (t) {
                console.error("onShareAppMessage error", t);
              }return e;
            }, t.methods.onShareTimeline = function (t) {
              undefined === t && (t = {});var e = h.call(this, t) || {};try {
                var s = e.path || U.call(this, "share"),
                    n = e.query || "";-1 === s.indexOf("?") ? s += "?" : "&" !== s.slice(-1) && (s += "&");var o = undefined,
                    a = undefined;r && (o = P(), a = JSON.parse(o), s = s + "txsrShareInfoSdk=" + encodeURIComponent(o)), i("page_share_app_message", { is_sdk_auto_track: true, from_type: t.from || "\u672A\u77E5", share_to: "timeline", share_path: s, query: n, share_title: e.title, share_image_url: e.imageUrl, txsr_share_info_sdk: a }), e.path = s;
              } catch (t) {
                console.error("onShareAppMessage error", t);
              }return e;
            };
          }t.methods && s && Object.entries(t.methods).filter(function (t) {
            var i = t[0];t[1];return !["onLoad", "onShow", "onReady", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onPageScroll", "onShareAppMessage", "onResize", "onTabItemTap", "observer"].includes(i);
          }).forEach(function (e) {
            var s = e[0];"function" == typeof e[1] && w(t.methods, s, function (t) {
              for (var e = arguments, r = [], n = 1; n < arguments.length; n++) {
                r[n - 1] = e[n];
              }return G.call(this, r, i, s), t();
            });
          });
        } catch (t) {
          console.error("componentProxy error", t);
        }return t;
      }(r, t, i, e, s);
    };
  },
      B = {},
      J = function J(t) {
    return t;
  };return function (t) {
    function s() {
      var i = t.call(this) || this;return i.name = "mp", i.component = J, i.page = J, i.proxySetNavigation = function () {
        try {
          var t = wx.setNavigationBarTitle;Object.defineProperty(wx, "setNavigationBarTitle", { get: function get() {
              return function (i) {
                undefined === i && (i = {});try {
                  var e = O();__wxConfig.page = __wxConfig.page || {};var s = __wxConfig.page[e.route + ".html"];s && ((s.window || {}).navigationBarTitleText = i.title);
                } catch (t) {}t.call(this, i);
              };
            } });
        } catch (t) {
          console.warn("proxySetNavigation failed", t);
        }
      }, i.request = function (t, e) {
        var s = function s(t) {
          return undefined === t && (t = {}), 0 === t.code;
        };return "function" == typeof i.option.onUploaded && (s = i.option.onUploaded), new Promise(function (i, r) {
          wx.request({ url: e.url, method: e.method || "POST", data: t, success: function success(t) {
              undefined === t && (t = {});var e = t.data,
                  r = undefined === e ? {} : e,
                  n = s(r);i({ success: undefined === n || n, data: r.data || r, msg: r.errMsg });
            }, fail: function fail(t) {
              r({ success: false, data: undefined, msg: t.errMsg });
            } });
        });
      }, i.defaultOptions = { autoStart: true, debug: false, usePlugin: false, proxyPage: false, proxyComponent: false, autoTrack: false, trackApp: true, openSdkShareDepth: false }, i.proxySetNavigation(), i;
    }return i(s, t), s.prototype.getCacheManager = function () {
      var t = "" + this.env,
          i = function i(_i) {
        return _i + "_" + t;
      };return { get: function get(t) {
          var e;try {
            e = wx.getStorageSync(i(t));
          } catch (t) {
            return console.error("CacheManager.get error", t), e;
          }return e;
        }, set: function set(t, e) {
          try {
            wx.setStorageSync(i(t), e);
          } catch (t) {
            return console.error("CacheManager.set error", t), false;
          }return true;
        } };
    }, s.prototype.proxyInitialize = function () {
      var t = this,
          i = Page,
          e = Component,
          s = this.option.autoTrack,
          r = this.option.openSdkShareDepth;this.page = function (t) {
        return t;
      };var n = j(this.track.bind(this), this.setChan.bind(this), s, r);return this.component = W(this.track.bind(this), this.setChan.bind(this), s, r), !this.option.usePlugin && this.option.proxyPage ? Page = function Page(t) {
        i(n(t));
      } : this.page = n, !this.option.usePlugin && this.option.proxyComponent && (Component = function Component(i) {
        return e(t.component(i));
      }), this.trackApp(), true;
    }, s.prototype.trackApp = function () {
      var t = this,
          i = false;wx.onAppShow(function (s) {
        undefined === s && (s = {});var r = s,
            n = r.query,
            h = undefined === n ? {} : n,
            o = r.path,
            a = t.option.openSdkShareDepth,
            c = function (t) {
          undefined === t && (t = {});var i = {};if (t.scene) {
            try {
              var s = decodeURIComponent(t.scene);(s = s.replace("?", "").trim()).split("&").map(function (t) {
                if (t) {
                  var e = t.split("="),
                      s = e[0],
                      r = e[1];v(s) && (i[s] = undefined === r || r);
                }
              });
            } catch (t) {
              console.error(t);
            }t = _e(_e({}, t), i);
          }return t;
        }(h || {}),
            u = c.txsrShareInfoSdk || "{}";if (c && "{}" !== JSON.stringify(c)) {
          var d = "?";Object.entries(c).forEach(function (t, i) {
            var e = t[0],
                s = t[1];d += (0 === i ? "" : "&") + e + "=" + s;
          }), o += d;
        }if (t.setChan(_e(_e({}, c), { chan_wxapp_scene: s.scene, chan_refer_app_id: (s.referrerInfo || {}).appId })), c.chan_id && t.setChan({ chan_id: c.chan_id }), !i) {
          if (i = true, a && "{}" !== u) try {
            t.setUser({ txsr_from_share_info: JSON.parse(decodeURIComponent(u)) });
          } catch (t) {}t.option.trackApp && t.track("app_launch", { is_sdk_auto_track: true, page: o });
        }t.option.trackApp && t.track("app_show", { is_sdk_auto_track: true, page: o });
      }), wx.onAppHide(function () {
        t.option.trackApp && t.track("exit_wxapp", { is_sdk_auto_track: true });
      });
    }, s.prototype.errorHandle = function (t) {
      try {
        var i = this.getServerUrl();this.request({ type: "sdk api exec error", props: { sr_sdk_version: this.version, system_info: this.getSystemInfo(), message: t, stack: t } }, { url: i, method: "POST" });
      } catch (t) {
        console.log("errorHandle error", t);
      }
    }, s.prototype.getSystemInfo = function () {
      try {
        return wx.getSystemInfoSync();
      } catch (t) {
        return {};
      }
    }, s.prototype.getPageInfo = function () {
      var t = U(),
          i = O() || {},
          e = F,
          s = (i.data || {}).title || i.title;try {
        undefined === s && t && !B[t] && (B[t] = true, console.warn("\u9875\u9762[" + t + "]\u6CA1\u6709\u5B9E\u73B0 title \u5C5E\u6027\uFF0C\u4F1A\u5BFC\u81F4\u90E8\u5206\u673A\u578B\u4E0B\u6536\u96C6\u4E0D\u5230\u9875\u9762\u6807\u9898!")), "string" == typeof s && (e = function e() {
          return s;
        }), "function" == typeof s && (e = s);
      } catch (t) {
        console.error("curPage.data.title \u6267\u884C\u9519\u8BEF", t);
      }return { page: t, page_title: s || e() };
    }, s.prototype.isDev = function () {
      return H();
    }, s.create = function () {
      var t;try {
        t = new s();
      } catch (i) {
        t = s.prototype, console.error("new sr_sdk failed", i);
      }return t;
    }, s;
  }(A).create();
});

/***/ }),

/***/ "./src/app.scss":
/*!**********************!*\
  !*** ./src/app.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/app.tsx":
/*!*********************!*\
  !*** ./src/app.tsx ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_tsx_taro_type_script_parse_ENTRY___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.tsx?taro&type=script&parse=ENTRY& */ "./src/app.tsx?taro&type=script&parse=ENTRY&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _app_tsx_taro_type_script_parse_ENTRY___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _app_tsx_taro_type_script_parse_ENTRY___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));



/***/ }),

/***/ "./src/app.tsx?taro&type=script&parse=ENTRY&":
/*!***************************************************!*\
  !*** ./src/app.tsx?taro&type=script&parse=ENTRY& ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_app_tsx_taro_type_script_parse_ENTRY___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js??ref--4-0!./app.tsx?taro&type=script&parse=ENTRY& */ "./node_modules/@tarojs/mini-runner/dist/loaders/wxTransformerLoader.js?!./src/app.tsx?taro&type=script&parse=ENTRY&");
/* harmony import */ var _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_app_tsx_taro_type_script_parse_ENTRY___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_app_tsx_taro_type_script_parse_ENTRY___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_app_tsx_taro_type_script_parse_ENTRY___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_app_tsx_taro_type_script_parse_ENTRY___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_tarojs_mini_runner_dist_loaders_wxTransformerLoader_js_ref_4_0_app_tsx_taro_type_script_parse_ENTRY___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

},[["./src/app.tsx","runtime","taro","vendors"]]]);;