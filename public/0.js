(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/AssetCard.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./src/frontend/js/components/AssetCard.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _frontend_js_components_Difference_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/frontend/js/components/Difference.vue */ "./src/frontend/js/components/Difference.vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_1__["default"].extend({
  components: {
    Difference: _frontend_js_components_Difference_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    asset: {
      type: Object,
      required: true
    },
    profitDisplay: {
      type: String,
      "default": 'fiat'
    }
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/AssetsTable.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./src/frontend/js/components/AssetsTable.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _frontend_js_components_Difference_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/frontend/js/components/Difference.vue */ "./src/frontend/js/components/Difference.vue");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'AssetsTable',
  components: {
    Difference: _frontend_js_components_Difference_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      sortBy: 'usdProfit',
      sortDirection: 'DESC',
      columns: [['amount', 'Units'], ['averageUsdPaid', 'Avg. Paid'], ['usdPrice', 'Current Price'], ['totalUsdPaid', 'Invested'], ['usdProfit', 'P/L ($)'], ['percentageProfit', 'P/L (%)'], ['usdValue', 'Current Value']]
    };
  },
  props: {
    assets: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedAssets: function sortedAssets() {
      var assets = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"])(this.assets);
      this.sortAssets(assets, this.sortBy, this.sortDirection);
      return assets;
    }
  },
  methods: {
    setSortBy: function setSortBy(sortBy) {
      if (this.sortBy === sortBy) {
        this.sortDirection = this.sortDirection === 'DESC' ? 'ASC' : 'DESC';
      } else {
        this.sortBy = sortBy;
        this.sortDirection = 'DESC';
      }
    },
    sortAssets: function sortAssets(assets, sortBy, sortDirection) {
      assets.sort(function (a, b) {
        var aVal = parseFloat(a[sortBy]) || 0;
        var bVal = parseFloat(b[sortBy]) || 0;

        if (aVal === bVal) {
          return 0;
        }

        if (sortDirection === 'ASC') {
          return aVal > bVal ? 1 : -1;
        }

        return aVal > bVal ? -1 : 1;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/Difference.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./src/frontend/js/components/Difference.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = (vue__WEBPACK_IMPORTED_MODULE_0__["default"].extend({
  name: 'Difference',
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    asCurrency: {
      type: String,
      "default": null
    },
    asPercentage: {
      type: Boolean,
      "default": false
    }
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/views/HomeView.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./src/frontend/js/views/HomeView.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _frontend_js_components_AssetCard_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/frontend/js/components/AssetCard.vue */ "./src/frontend/js/components/AssetCard.vue");
/* harmony import */ var _frontend_js_components_AssetsTable_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/frontend/js/components/AssetsTable.vue */ "./src/frontend/js/components/AssetsTable.vue");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bignumber.js */ "./node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    AssetsTable: _frontend_js_components_AssetsTable_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    AssetCard: _frontend_js_components_AssetCard_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      /**
       * @type {Object<string, OwnedAsset>}
       */
      ownedAssets: {},

      /**
       * @type {Snapshot}
       */
      latestSnapshot: null,

      /**
       * @type {SnapshotAsset[]}
       */
      latestSnapshotAssets: null,

      /**
       * @type {Snapshot[]}
       */
      availableSnapshots: [],

      /**
       * @type {Snapshot|null}
       */
      compareToSnapshot: null,

      /**
       * @type {SnapshotAsset[]|null}
       */
      compareToSnapshotAssets: null,

      /**
       * @type {boolean}
       */
      snapshotInProgress: false
    };
  },
  created: function created() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/api/assets').then(function (_ref) {
                var data = _ref.data;
                _this.ownedAssets = data;
              });
              axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/api/snapshots/latest').then(function (_ref2) {
                var data = _ref2.data;
                _this.latestSnapshot = data.snapshot;
                var assets = data.assets;
                assets.forEach(function (a) {
                  a.gbpProfitFloat = parseFloat(a.gbpProfit || 0);
                });
                assets.sort(function (a, b) {
                  if (a.gbpProfitFloat < b.gbpProfitFloat) {
                    return 1;
                  }

                  if (a.gbpProfitFloat > b.gbpProfitFloat) {
                    return -1;
                  }

                  return 0;
                });
                _this.latestSnapshotAssets = assets;
              });
              axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/api/snapshots').then(function (_ref3) {
                var data = _ref3.data;
                _this.availableSnapshots = data;
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  computed: {
    comparedAssets: function comparedAssets() {
      var _this2 = this;

      console.log('comparedAssets');
      /** @type {SnapshotAsset[]} */

      var currentAssets = Object(lodash__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"])(this.latestSnapshotAssets);

      var findOldAsset = function findOldAsset(asset) {
        return _this2.compareToSnapshotAssets.find(function (a) {
          return a.asset === asset;
        });
      };

      currentAssets = currentAssets.filter(function (asset) {
        // Filter out assets we have now that we didn't then.
        return !!findOldAsset(asset.asset);
      }).map(function (asset) {
        var oldAsset = findOldAsset(asset.asset); // Recalculate values based on the old asset.

        var gbpProfit = new bignumber_js__WEBPACK_IMPORTED_MODULE_3___default.a(asset.gbpValue).minus(oldAsset.gbpValue);
        asset.gbpProfit = gbpProfit.decimalPlaces(2).toNumber(); // Calculate percentage profit.

        asset.percentageProfit = gbpProfit.dividedBy(oldAsset.gbpValue).multipliedBy(100).decimalPlaces(2).toNumber();
        asset.amountChange = new bignumber_js__WEBPACK_IMPORTED_MODULE_3___default.a(asset.amount).minus(oldAsset.amount).decimalPlaces(4, bignumber_js__WEBPACK_IMPORTED_MODULE_3___default.a.ROUND_HALF_UP).toNumber();
        return asset;
      });

      if (this.profitDisplay === 'percent') {
        this.sortByPercentageProfit(currentAssets);
      } else if (this.profitDisplay === 'fiat') {
        this.sortByGbpProfit(currentAssets);
      }

      return currentAssets;
    },
    latestSnapshotAssetsWithProfit: function latestSnapshotAssetsWithProfit() {
      var _this3 = this;

      /** @type {SnapshotAsset[]} */
      var currentAssets = Object(lodash__WEBPACK_IMPORTED_MODULE_4__["cloneDeep"])(this.latestSnapshotAssets);
      currentAssets.forEach(function (a) {
        // Clear profit returned by API as this is going to be removed.
        a.gbpProfit = null;
        a.usdProfit = null;
        /**
         * @type {OwnedAsset}
         */

        var oa = _this3.ownedAssets[a.asset];

        if (!oa) {
          return;
        }

        var gbpProfit = new bignumber_js__WEBPACK_IMPORTED_MODULE_3___default.a(a.gbpValue).minus(oa.totalGbpPaid);
        a.gbpProfit = gbpProfit.decimalPlaces(2).toNumber();
        var usdProfit = new bignumber_js__WEBPACK_IMPORTED_MODULE_3___default.a(a.usdValue).minus(oa.totalUsdPaid);
        a.usdProfit = usdProfit.decimalPlaces(2).toNumber(); // Calculate percentage profit.

        a.percentageProfit = usdProfit.dividedBy(oa.totalUsdPaid).multipliedBy(100).decimalPlaces(2).toNumber();
      });
      return currentAssets;
    }
  },
  methods: {
    sortByPercentageProfit: function sortByPercentageProfit(assets) {
      assets.sort(function (a, b) {
        var aProfit = a.percentageProfit || 0;
        var bProfit = b.percentageProfit || 0;

        if (aProfit === bProfit) {
          return 0;
        }

        return aProfit > bProfit ? -1 : 1;
      });
    },
    sortByGbpProfit: function sortByGbpProfit(assets) {
      assets.sort(function (a, b) {
        var aProfit = a.gbpProfit || 0;
        var bProfit = b.gbpProfit || 0;

        if (aProfit === bProfit) {
          return 0;
        }

        return aProfit > bProfit ? -1 : 1;
      });
    },
    setCompareToSnapshot: function setCompareToSnapshot(snapshot) {
      var _this4 = this;

      if (!snapshot) {
        this.compareToSnapshot = null;
        this.compareToSnapshotAssets = null;
        return;
      }

      this.compareToSnapshot = snapshot;
      axios__WEBPACK_IMPORTED_MODULE_2___default.a.get("/api/snapshots/".concat(snapshot.id)).then(function (_ref4) {
        var data = _ref4.data;
        _this4.compareToSnapshot = data.snapshot;
        _this4.compareToSnapshotAssets = data.assets;
      });
    },
    createSnapshot: function createSnapshot() {
      var _this5 = this;

      if (this.snapshotInProgress) {
        return;
      }

      this.snapshotInProgress = true;
      axios__WEBPACK_IMPORTED_MODULE_2___default.a.post('/api/snapshots').then(function (_ref5) {
        var data = _ref5.data;
        window.location.reload();
      })["finally"](function () {
        _this5.snapshotInProgress = false;
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/AssetCard.vue?vue&type=style&index=0&lang=less&":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/frontend/js/components/AssetCard.vue?vue&type=style&index=0&lang=less& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".asset-card {\n  background: #ffffff;\n  border-radius: 10px;\n  box-shadow: rgba(0, 0, 0, 0.075) 0 2px 4px 0;\n  padding: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.asset-card__logo {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  margin-right: 10px;\n}\n.asset-card__name {\n  flex-grow: 1;\n}\n.asset-card__name small {\n  margin-top: 3px;\n}\n.asset-card__value {\n  flex-grow: 0;\n  flex-shrink: 0;\n  font-size: 15px;\n  text-align: right;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/AssetsTable.vue?vue&type=style&index=0&lang=less&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/frontend/js/components/AssetsTable.vue?vue&type=style&index=0&lang=less& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".assets-table {\n  background: #ffffff;\n  border-radius: 10px;\n  box-shadow: rgba(0, 0, 0, 0.075) 0 2px 4px 0;\n  padding: 10px;\n}\n.assets-table .table th,\n.assets-table .table td {\n  text-align: right !important;\n  vertical-align: middle !important;\n}\n.assets-table .table th:first-child,\n.assets-table .table td:first-child {\n  text-align: left !important;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/views/HomeView.vue?vue&type=style&index=0&lang=less&":
/*!**********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/frontend/js/views/HomeView.vue?vue&type=style&index=0&lang=less& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media screen and (max-width: 767px) {\n}@media (min-width: 768px) {\n}@media (min-width: 768px) {\n}@media (max-width: 767px) {\n}@media (min-width: 768px) {\n}@media (min-width: 768px) {\n}@media (max-width: 767px) {\n}@media (max-width: 767px) {\n}.asset-grid .asset-card {\n  margin-bottom: 20px;\n}\n#home .header {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 20px;\n}\n#home .header h4 {\n  flex-grow: 1;\n  margin: 0;\n  text-align: left;\n}\n#home .right {\n  padding: 20px;\n}\n#home .right .nav {\n  margin-top: 20px;\n}\n@media (min-width: 1200px) {\n.asset-grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    grid-gap: 20px;\n}\n.asset-grid .asset-card {\n    margin: 0;\n}\n#home {\n    display: flex;\n    align-items: stretch;\n    min-height: 100vh;\n}\n#home .left {\n    flex-grow: 1;\n    flex-shrink: 1;\n}\n#home .right {\n    flex-grow: 0;\n    flex-shrink: 0;\n}\n.right {\n    min-width: 250px;\n    background: #fff;\n    padding: 20px;\n    overflow-y: auto;\n    border-left: 1px solid #f1f3f5;\n}\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/AssetCard.vue?vue&type=template&id=a2bbd7ae&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/frontend/js/components/AssetCard.vue?vue&type=template&id=a2bbd7ae& ***!
  \***************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "asset-card" }, [
    _vm.asset.logoUrl
      ? _c("img", {
          staticClass: "asset-card__logo",
          attrs: { src: _vm.asset.logoUrl, alt: _vm.asset.name }
        })
      : _vm._e(),
    _vm._v(" "),
    _c("div", { staticClass: "asset-card__name" }, [
      _vm._v("\n        " + _vm._s(_vm.asset.name) + "\n        "),
      _c(
        "small",
        [
          _vm._v(
            "\n            " +
              _vm._s(_vm._f("round")(_vm.asset.amount, 4)) +
              "\n            " +
              _vm._s(_vm.asset.asset) +
              " @ " +
              _vm._s(_vm._f("currency")(_vm.asset.usdPrice, "USD")) +
              "\n            "
          ),
          _vm.asset.amountChange
            ? _c("Difference", { attrs: { value: _vm.asset.amountChange } })
            : _vm._e()
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "asset-card__value" },
      [
        _vm.profitDisplay === "fiat"
          ? [
              _vm.asset.gbpProfit !== null
                ? _c("Difference", {
                    attrs: { value: _vm.asset.gbpProfit, "as-currency": true }
                  })
                : _vm._e(),
              _vm._v(" "),
              _c("small", [
                _vm._v(_vm._s(_vm._f("currency")(_vm.asset.gbpValue)))
              ])
            ]
          : _vm._e(),
        _vm._v(" "),
        _vm.profitDisplay === "percent"
          ? [
              _vm.asset.percentageProfit !== undefined
                ? _c("Difference", {
                    attrs: {
                      value: _vm.asset.percentageProfit,
                      "as-percentage": true
                    }
                  })
                : _vm._e()
            ]
          : _vm._e()
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/AssetsTable.vue?vue&type=template&id=24948358&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/frontend/js/components/AssetsTable.vue?vue&type=template&id=24948358& ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "assets-table" }, [
    _c("table", { staticClass: "table" }, [
      _c("thead", [
        _c(
          "tr",
          [
            _c("th", [_vm._v("Coin")]),
            _vm._v(" "),
            _vm._l(_vm.columns, function(col) {
              return _c(
                "th",
                {
                  key: col[1],
                  staticClass: "cursor--pointer",
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.setSortBy(col[0])
                    }
                  }
                },
                [
                  _vm._v(
                    "\n                    " +
                      _vm._s(col[1]) +
                      "\n                    "
                  ),
                  _vm.sortBy === col[0] && _vm.sortDirection === "DESC"
                    ? _c("i", { staticClass: "fa fa-chevron-down" })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.sortBy === col[0] && _vm.sortDirection === "ASC"
                    ? _c("i", { staticClass: "fa fa-chevron-up" })
                    : _vm._e()
                ]
              )
            })
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c(
        "tbody",
        _vm._l(_vm.sortedAssets, function(asset) {
          return _c("tr", { key: asset.asset }, [
            _c("td", [
              _c(
                "div",
                { staticClass: "flex flex--align-center flex--justify-start" },
                [
                  asset.logoUrl
                    ? _c("img", {
                        staticClass: "asset-card__logo",
                        attrs: { src: asset.logoUrl, alt: asset.name }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _c("span", [
                    _c("strong", [_vm._v(_vm._s(asset.asset))]),
                    _vm._v(" "),
                    _c("small", [_vm._v(_vm._s(asset.name))])
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("td", [_vm._v(_vm._s(_vm._f("round")(asset.amount, 4)))]),
            _vm._v(" "),
            _c("td", [
              asset.averageUsdPaid
                ? _c("span", [
                    _vm._v(
                      "\n                        " +
                        _vm._s(
                          _vm._f("currency")(asset.averageUsdPaid, "USD")
                        ) +
                        "\n                    "
                    )
                  ])
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("td", [
              _vm._v(_vm._s(_vm._f("currency")(asset.usdPrice, "USD")))
            ]),
            _vm._v(" "),
            _c("td", [
              asset.totalUsdPaid
                ? _c("span", [
                    _vm._v(
                      "\n                        " +
                        _vm._s(_vm._f("currency")(asset.totalUsdPaid, "USD")) +
                        "\n                    "
                    )
                  ])
                : _vm._e()
            ]),
            _vm._v(" "),
            _c(
              "td",
              [
                asset.usdProfit !== null
                  ? _c("Difference", {
                      attrs: { value: asset.usdProfit, "as-currency": "USD" }
                    })
                  : _vm._e()
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "td",
              [
                asset.percentageProfit !== undefined
                  ? _c("Difference", {
                      attrs: {
                        value: asset.percentageProfit,
                        "as-percentage": true
                      }
                    })
                  : _vm._e()
              ],
              1
            ),
            _vm._v(" "),
            _c("td", [
              _vm._v(_vm._s(_vm._f("currency")(asset.usdValue, "USD")))
            ])
          ])
        }),
        0
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/Difference.vue?vue&type=template&id=605ae004&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/frontend/js/components/Difference.vue?vue&type=template&id=605ae004& ***!
  \****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "span",
    { class: { "text-danger": _vm.value < 0, "text-success": _vm.value > 0 } },
    [
      _vm._v(
        "\n    " +
          _vm._s(_vm._f("profit")(_vm.value, _vm.asCurrency)) +
          _vm._s(_vm.asPercentage ? "%" : "") +
          "\n"
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/views/HomeView.vue?vue&type=template&id=77a87db2&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/frontend/js/views/HomeView.vue?vue&type=template&id=77a87db2& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "home" } }, [
    _c("div", { staticClass: "left" }, [
      _c(
        "div",
        { staticClass: "assets container" },
        [
          _c("header", { staticClass: "header" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-default mr-1",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.createSnapshot($event)
                  }
                }
              },
              [
                _vm.snapshotInProgress
                  ? _c("i", { staticClass: "fas fa-spinner fa-spin" })
                  : _c("i", { staticClass: "fas fa-sync" })
              ]
            ),
            _vm._v(" "),
            _vm.compareToSnapshot
              ? _c("h4", [
                  _vm._v(
                    "\n                    " +
                      _vm._s(
                        _vm._f("relativeTime")(_vm.latestSnapshot.createdAt)
                      ) +
                      "\n                    compared to\n                    " +
                      _vm._s(
                        _vm._f("relativeTime")(_vm.compareToSnapshot.createdAt)
                      ) +
                      "\n                "
                  )
                ])
              : _vm.latestSnapshot
              ? _c("h4", [
                  _vm._v(
                    "\n                    " +
                      _vm._s(
                        _vm._f("relativeTime")(_vm.latestSnapshot.createdAt)
                      ) +
                      "\n                "
                  )
                ])
              : _vm._e()
          ]),
          _vm._v(" "),
          _vm.latestSnapshotAssets
            ? _c("AssetsTable", {
                attrs: { assets: _vm.latestSnapshotAssetsWithProfit }
              })
            : _vm._e()
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "right" }, [
      _c("h4", [_vm._v("Compare To")]),
      _vm._v(" "),
      _c(
        "ul",
        { staticClass: "comparison-snapshots nav nav-pills nav-stacked" },
        [
          _c("li", { class: { active: !_vm.compareToSnapshot } }, [
            _c(
              "a",
              {
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.setCompareToSnapshot(null)
                  }
                }
              },
              [_vm._v("None")]
            )
          ]),
          _vm._v(" "),
          _vm._l(_vm.availableSnapshots, function(snapshot) {
            return !_vm.latestSnapshot || snapshot.id !== _vm.latestSnapshot.id
              ? _c(
                  "li",
                  {
                    key: snapshot.id,
                    class: {
                      active:
                        _vm.compareToSnapshot &&
                        snapshot.id === _vm.compareToSnapshot.id
                    }
                  },
                  [
                    _c(
                      "a",
                      {
                        attrs: { href: "#" },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            return _vm.setCompareToSnapshot(snapshot)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm._f("relativeTime")(snapshot.createdAt)) +
                            "\n                    "
                        ),
                        _c("small", [
                          _vm._v(
                            _vm._s(_vm._f("friendlyTime")(snapshot.createdAt))
                          )
                        ])
                      ]
                    )
                  ]
                )
              : _vm._e()
          })
        ],
        2
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/AssetCard.vue?vue&type=style&index=0&lang=less&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/frontend/js/components/AssetCard.vue?vue&type=style&index=0&lang=less& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib??vue-loader-options!./AssetCard.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/AssetCard.vue?vue&type=style&index=0&lang=less&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("034a3fa2", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/AssetsTable.vue?vue&type=style&index=0&lang=less&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/frontend/js/components/AssetsTable.vue?vue&type=style&index=0&lang=less& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib??vue-loader-options!./AssetsTable.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/AssetsTable.vue?vue&type=style&index=0&lang=less&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("7b0a67fc", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/views/HomeView.vue?vue&type=style&index=0&lang=less&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib??vue-loader-options!./src/frontend/js/views/HomeView.vue?vue&type=style&index=0&lang=less& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib??vue-loader-options!./HomeView.vue?vue&type=style&index=0&lang=less& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/views/HomeView.vue?vue&type=style&index=0&lang=less&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("48fb7702", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/frontend/js/components/AssetCard.vue":
/*!**************************************************!*\
  !*** ./src/frontend/js/components/AssetCard.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AssetCard_vue_vue_type_template_id_a2bbd7ae___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AssetCard.vue?vue&type=template&id=a2bbd7ae& */ "./src/frontend/js/components/AssetCard.vue?vue&type=template&id=a2bbd7ae&");
/* harmony import */ var _AssetCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AssetCard.vue?vue&type=script&lang=js& */ "./src/frontend/js/components/AssetCard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _AssetCard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AssetCard.vue?vue&type=style&index=0&lang=less& */ "./src/frontend/js/components/AssetCard.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AssetCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AssetCard_vue_vue_type_template_id_a2bbd7ae___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AssetCard_vue_vue_type_template_id_a2bbd7ae___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/frontend/js/components/AssetCard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/frontend/js/components/AssetCard.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./src/frontend/js/components/AssetCard.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--1!../../../../node_modules/vue-loader/lib??vue-loader-options!./AssetCard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/AssetCard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/frontend/js/components/AssetCard.vue?vue&type=style&index=0&lang=less&":
/*!************************************************************************************!*\
  !*** ./src/frontend/js/components/AssetCard.vue?vue&type=style&index=0&lang=less& ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetCard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib??vue-loader-options!./AssetCard.vue?vue&type=style&index=0&lang=less& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/AssetCard.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetCard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetCard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetCard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetCard_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/frontend/js/components/AssetCard.vue?vue&type=template&id=a2bbd7ae&":
/*!*********************************************************************************!*\
  !*** ./src/frontend/js/components/AssetCard.vue?vue&type=template&id=a2bbd7ae& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetCard_vue_vue_type_template_id_a2bbd7ae___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./AssetCard.vue?vue&type=template&id=a2bbd7ae& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/AssetCard.vue?vue&type=template&id=a2bbd7ae&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetCard_vue_vue_type_template_id_a2bbd7ae___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetCard_vue_vue_type_template_id_a2bbd7ae___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/frontend/js/components/AssetsTable.vue":
/*!****************************************************!*\
  !*** ./src/frontend/js/components/AssetsTable.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AssetsTable_vue_vue_type_template_id_24948358___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AssetsTable.vue?vue&type=template&id=24948358& */ "./src/frontend/js/components/AssetsTable.vue?vue&type=template&id=24948358&");
/* harmony import */ var _AssetsTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AssetsTable.vue?vue&type=script&lang=js& */ "./src/frontend/js/components/AssetsTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _AssetsTable_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AssetsTable.vue?vue&type=style&index=0&lang=less& */ "./src/frontend/js/components/AssetsTable.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AssetsTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AssetsTable_vue_vue_type_template_id_24948358___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AssetsTable_vue_vue_type_template_id_24948358___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/frontend/js/components/AssetsTable.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/frontend/js/components/AssetsTable.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./src/frontend/js/components/AssetsTable.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetsTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--1!../../../../node_modules/vue-loader/lib??vue-loader-options!./AssetsTable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/AssetsTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetsTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/frontend/js/components/AssetsTable.vue?vue&type=style&index=0&lang=less&":
/*!**************************************************************************************!*\
  !*** ./src/frontend/js/components/AssetsTable.vue?vue&type=style&index=0&lang=less& ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetsTable_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib??vue-loader-options!./AssetsTable.vue?vue&type=style&index=0&lang=less& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/AssetsTable.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetsTable_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetsTable_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetsTable_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetsTable_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/frontend/js/components/AssetsTable.vue?vue&type=template&id=24948358&":
/*!***********************************************************************************!*\
  !*** ./src/frontend/js/components/AssetsTable.vue?vue&type=template&id=24948358& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetsTable_vue_vue_type_template_id_24948358___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./AssetsTable.vue?vue&type=template&id=24948358& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/AssetsTable.vue?vue&type=template&id=24948358&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetsTable_vue_vue_type_template_id_24948358___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssetsTable_vue_vue_type_template_id_24948358___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/frontend/js/components/Difference.vue":
/*!***************************************************!*\
  !*** ./src/frontend/js/components/Difference.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Difference_vue_vue_type_template_id_605ae004___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Difference.vue?vue&type=template&id=605ae004& */ "./src/frontend/js/components/Difference.vue?vue&type=template&id=605ae004&");
/* harmony import */ var _Difference_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Difference.vue?vue&type=script&lang=js& */ "./src/frontend/js/components/Difference.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Difference_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Difference_vue_vue_type_template_id_605ae004___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Difference_vue_vue_type_template_id_605ae004___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/frontend/js/components/Difference.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/frontend/js/components/Difference.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./src/frontend/js/components/Difference.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_Difference_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--1!../../../../node_modules/vue-loader/lib??vue-loader-options!./Difference.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/Difference.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_Difference_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/frontend/js/components/Difference.vue?vue&type=template&id=605ae004&":
/*!**********************************************************************************!*\
  !*** ./src/frontend/js/components/Difference.vue?vue&type=template&id=605ae004& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Difference_vue_vue_type_template_id_605ae004___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Difference.vue?vue&type=template&id=605ae004& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/components/Difference.vue?vue&type=template&id=605ae004&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Difference_vue_vue_type_template_id_605ae004___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Difference_vue_vue_type_template_id_605ae004___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/frontend/js/views/HomeView.vue":
/*!********************************************!*\
  !*** ./src/frontend/js/views/HomeView.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HomeView_vue_vue_type_template_id_77a87db2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HomeView.vue?vue&type=template&id=77a87db2& */ "./src/frontend/js/views/HomeView.vue?vue&type=template&id=77a87db2&");
/* harmony import */ var _HomeView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HomeView.vue?vue&type=script&lang=js& */ "./src/frontend/js/views/HomeView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _HomeView_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HomeView.vue?vue&type=style&index=0&lang=less& */ "./src/frontend/js/views/HomeView.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _HomeView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _HomeView_vue_vue_type_template_id_77a87db2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _HomeView_vue_vue_type_template_id_77a87db2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/frontend/js/views/HomeView.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/frontend/js/views/HomeView.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./src/frontend/js/views/HomeView.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_HomeView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--1!../../../../node_modules/vue-loader/lib??vue-loader-options!./HomeView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/views/HomeView.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_HomeView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/frontend/js/views/HomeView.vue?vue&type=style&index=0&lang=less&":
/*!******************************************************************************!*\
  !*** ./src/frontend/js/views/HomeView.vue?vue&type=style&index=0&lang=less& ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HomeView_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-style-loader!../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/less-loader/dist/cjs.js!../../../../node_modules/vue-loader/lib??vue-loader-options!./HomeView.vue?vue&type=style&index=0&lang=less& */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/views/HomeView.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HomeView_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HomeView_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HomeView_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_HomeView_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./src/frontend/js/views/HomeView.vue?vue&type=template&id=77a87db2&":
/*!***************************************************************************!*\
  !*** ./src/frontend/js/views/HomeView.vue?vue&type=template&id=77a87db2& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HomeView_vue_vue_type_template_id_77a87db2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./HomeView.vue?vue&type=template&id=77a87db2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/frontend/js/views/HomeView.vue?vue&type=template&id=77a87db2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HomeView_vue_vue_type_template_id_77a87db2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_HomeView_vue_vue_type_template_id_77a87db2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=0.js.map