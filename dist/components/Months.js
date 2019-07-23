'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

var _MonthCell = require('./MonthCell.js');

var _MonthCell2 = _interopRequireDefault(_MonthCell);

var _startOfMonth = require('date-fns/startOfMonth');

var _startOfMonth2 = _interopRequireDefault(_startOfMonth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-fallthrough */


var Months = function (_PureComponent) {
  _inherits(Months, _PureComponent);

  function Months() {
    _classCallCheck(this, Months);

    return _possibleConstructorReturn(this, (Months.__proto__ || Object.getPrototypeOf(Months)).apply(this, arguments));
  }

  _createClass(Months, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          displayMode = _props.displayMode,
          focusedRange = _props.focusedRange,
          drag = _props.drag,
          styles = _props.styles;

      var ranges = this.props.ranges.map(function (i) {
        return _extends({}, i, {
          endDate: i.endDate ? (0, _startOfMonth2.default)(i.endDate) : i.endDate
        });
      });
      if (displayMode === 'dateRange' && drag.status) {
        var _drag$range = drag.range,
            startDate = _drag$range.startDate,
            endDate = _drag$range.endDate;

        ranges = ranges.map(function (range, i) {
          if (i !== focusedRange[0]) return range;
          return _extends({}, range, {
            startDate: startDate,
            endDate: endDate
          });
        });
      }

      return _react2.default.createElement(
        'div',
        { className: styles.month, style: this.props.style },
        _react2.default.createElement(
          'div',
          { className: styles.yearPreivew },
          this.props.year.getFullYear()
        ),
        _react2.default.createElement(
          'div',
          { className: styles.days, onMouseLeave: this.props.onMouseLeave },
          Object.values((0, _utils.eachMonthOfYear)(this.props.year)).map(function (quarter, index) {
            return _react2.default.createElement(_MonthCell2.default, _extends({}, _this2.props, {
              ranges: ranges,
              quarter: quarter,
              key: index,
              styles: styles,
              onMouseDown: _this2.props.onDragSelectionStart,
              onMouseUp: _this2.props.onDragSelectionEnd,
              onMouseEnter: _this2.props.onDragSelectionMove,
              dragRange: drag.range,
              drag: drag.status
            }));
          })
        )
      );
    }
  }]);

  return Months;
}(_react.PureComponent);

exports.default = Months;