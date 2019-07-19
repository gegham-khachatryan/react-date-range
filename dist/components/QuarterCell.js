'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _endOfDay = require('date-fns/endOfDay');

var _endOfDay2 = _interopRequireDefault(_endOfDay);

var _isBefore = require('date-fns/isBefore');

var _isBefore2 = _interopRequireDefault(_isBefore);

var _isAfter = require('date-fns/isAfter');

var _isAfter2 = _interopRequireDefault(_isAfter);

var _isSameDay = require('date-fns/isSameDay');

var _isSameDay2 = _interopRequireDefault(_isSameDay);

var _format = require('date-fns/format');

var _format2 = _interopRequireDefault(_format);

var _startOfDay = require('date-fns/startOfDay');

var _startOfDay2 = _interopRequireDefault(_startOfDay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-fallthrough */


var QuarterCell = function (_Component) {
  _inherits(QuarterCell, _Component);

  function QuarterCell(props, context) {
    _classCallCheck(this, QuarterCell);

    var _this = _possibleConstructorReturn(this, (QuarterCell.__proto__ || Object.getPrototypeOf(QuarterCell)).call(this, props, context));

    _this.state = {
      hover: false,
      active: false
    };
    _this.getClassNames = _this.getClassNames.bind(_this);
    _this.handleMouseEvent = _this.handleMouseEvent.bind(_this);
    _this.handleKeyEvent = _this.handleKeyEvent.bind(_this);
    _this.renderSelectionPlaceholders = _this.renderSelectionPlaceholders.bind(_this);
    _this.renderPreviewPlaceholder = _this.renderPreviewPlaceholder.bind(_this);
    return _this;
  }

  _createClass(QuarterCell, [{
    key: 'handleKeyEvent',
    value: function handleKeyEvent(event) {
      var quarter = this.props.quarter;

      switch (event.keyCode) {
        case 13: //space
        case 32:
          //enter
          if (event.type === 'keydown') {
            this.props.onMouseDown(quarter.start);
          } else {
            this.props.onMouseUp(quarter.start);
          }
          break;
      }
    }
  }, {
    key: 'handleMouseEvent',
    value: function handleMouseEvent(event) {
      var _props = this.props,
          quarter = _props.quarter,
          disabled = _props.disabled,
          onPreviewChange = _props.onPreviewChange;


      var stateChanges = {};
      if (disabled) {
        onPreviewChange();
        return;
      }

      switch (event.type) {
        case 'mouseenter':
          this.props.onMouseEnter(quarter.start);
          onPreviewChange(quarter.start);
          stateChanges.hover = true;
          break;
        case 'blur':
        case 'mouseleave':
          stateChanges.hover = false;
          break;
        case 'mousedown':
          stateChanges.active = true;
          this.props.onMouseDown(quarter.start);
          break;
        case 'mouseup':
          event.stopPropagation();
          stateChanges.active = false;
          this.props.onMouseUp(quarter.start);
          break;
        case 'focus':
          onPreviewChange(quarter.start);
          break;
      }
      if (Object.keys(stateChanges).length) {
        this.setState(stateChanges);
      }
    }
  }, {
    key: 'getClassNames',
    value: function getClassNames() {
      var _classnames;

      var styles = this.props.styles;


      return (0, _classnames5.default)(styles.quarter, (_classnames = {}, _defineProperty(_classnames, styles.dayHovered, this.state.hover), _defineProperty(_classnames, styles.dayActive, this.state.active), _classnames));
    }
  }, {
    key: 'renderPreviewPlaceholder',
    value: function renderPreviewPlaceholder() {
      var _classnames2;

      var _props2 = this.props,
          preview = _props2.preview,
          quarter = _props2.quarter,
          styles = _props2.styles;

      if (!preview) return null;
      var startDate = preview.startDate ? (0, _endOfDay2.default)(preview.startDate) : null;
      var endDate = preview.endDate ? (0, _startOfDay2.default)(preview.endDate) : null;

      var isInRange = (!startDate || (0, _isAfter2.default)(quarter.start, startDate)) && (!endDate || (0, _isBefore2.default)(quarter.start, endDate));
      var isStartEdge = !isInRange && (0, _isSameDay2.default)(quarter.start, startDate);
      var isEndEdge = !isInRange && (0, _isSameDay2.default)(quarter.start, endDate);
      return _react2.default.createElement('span', {
        className: (0, _classnames5.default)((_classnames2 = {}, _defineProperty(_classnames2, styles.dayStartPreview, isStartEdge), _defineProperty(_classnames2, styles.dayInPreview, isInRange), _defineProperty(_classnames2, styles.dayEndPreview, isEndEdge), _classnames2)),
        style: { color: preview.color }
      });
    }
  }, {
    key: 'renderSelectionPlaceholders',
    value: function renderSelectionPlaceholders() {
      var _this2 = this;

      var _props3 = this.props,
          styles = _props3.styles,
          ranges = _props3.ranges,
          quarter = _props3.quarter;

      if (this.props.displayMode === 'date') {
        var isSelected = (0, _isSameDay2.default)(this.props.quarter.start, this.props.date);
        return isSelected ? _react2.default.createElement('span', { className: styles.selected, style: { color: this.props.color } }) : null;
      }

      var inRanges = ranges.reduce(function (result, range) {
        var startDate = range.startDate;
        var endDate = range.endDate;
        if (startDate && endDate && (0, _isBefore2.default)(endDate, startDate)) {
          var _ref = [endDate, startDate];
          startDate = _ref[0];
          endDate = _ref[1];
        }
        startDate = startDate ? (0, _endOfDay2.default)(startDate) : null;
        endDate = endDate ? (0, _startOfDay2.default)(endDate) : null;
        var isInRange = (!startDate || (0, _isAfter2.default)(quarter.start, startDate)) && (!endDate || (0, _isBefore2.default)(quarter.start, endDate));
        var isStartEdge = !isInRange && (0, _isSameDay2.default)(quarter.start, startDate);
        var isEndEdge = !isInRange && (0, _isSameDay2.default)(quarter.start, endDate);

        if (isInRange || isStartEdge || isEndEdge) {
          return [].concat(_toConsumableArray(result), [_extends({
            isStartEdge: isStartEdge,
            isEndEdge: isEndEdge,
            isInRange: isInRange
          }, range)]);
        }
        return result;
      }, []);

      return inRanges.map(function (range, i) {
        var _classnames3;

        return _react2.default.createElement('span', {
          key: i,
          className: (0, _classnames5.default)((_classnames3 = {}, _defineProperty(_classnames3, styles.startEdge, range.isStartEdge), _defineProperty(_classnames3, styles.endEdge, range.isEndEdge), _defineProperty(_classnames3, styles.inRange, range.isInRange), _classnames3)),
          style: { color: range.color || _this2.props.color }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.props.styles;


      return _react2.default.createElement(
        'button',
        _extends({
          type: 'button',
          onMouseEnter: this.handleMouseEvent,
          onMouseLeave: this.handleMouseEvent,
          onFocus: this.handleMouseEvent,
          onMouseDown: this.handleMouseEvent,
          onMouseUp: this.handleMouseEvent,
          onBlur: this.handleMouseEvent,
          onPauseCapture: this.handleMouseEvent,
          onKeyDown: this.handleKeyEvent,
          onKeyUp: this.handleKeyEvent,
          className: this.getClassNames(styles)
        }, this.props.disabled || this.props.isPassive ? { tabIndex: -1 } : {}, {
          style: { color: this.props.color } }),
        this.renderSelectionPlaceholders(),
        this.renderPreviewPlaceholder(),
        _react2.default.createElement(
          'span',
          { className: styles.dayNumber },
          _react2.default.createElement(
            'span',
            null,
            'Q',
            (0, _format2.default)(this.props.quarter.start, 'Q')
          )
        )
      );
    }
  }]);

  return QuarterCell;
}(_react.Component);

exports.default = QuarterCell;