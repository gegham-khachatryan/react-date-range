'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DayCell = require('./DayCell.js');

var _classnames6 = require('classnames');

var _classnames7 = _interopRequireDefault(_classnames6);

var _reactList = require('react-list');

var _reactList2 = _interopRequireDefault(_reactList);

var _Month = require('./Month.js');

var _Month2 = _interopRequireDefault(_Month);

var _differenceInCalendarMonths = require('date-fns/differenceInCalendarMonths');

var _differenceInCalendarMonths2 = _interopRequireDefault(_differenceInCalendarMonths);

var _eachDayOfInterval = require('date-fns/eachDayOfInterval');

var _eachDayOfInterval2 = _interopRequireDefault(_eachDayOfInterval);

var _differenceInDays = require('date-fns/differenceInDays');

var _differenceInDays2 = _interopRequireDefault(_differenceInDays);

var _startOfMonth = require('date-fns/startOfMonth');

var _startOfMonth2 = _interopRequireDefault(_startOfMonth);

var _isSameMonth = require('date-fns/isSameMonth');

var _isSameMonth2 = _interopRequireDefault(_isSameMonth);

var _startOfWeek = require('date-fns/startOfWeek');

var _startOfWeek2 = _interopRequireDefault(_startOfWeek);

var _endOfMonth = require('date-fns/endOfMonth');

var _endOfMonth2 = _interopRequireDefault(_endOfMonth);

var _addMonths = require('date-fns/addMonths');

var _addMonths2 = _interopRequireDefault(_addMonths);

var _endOfWeek = require('date-fns/endOfWeek');

var _endOfWeek2 = _interopRequireDefault(_endOfWeek);

var _isSameDay = require('date-fns/isSameDay');

var _isSameDay2 = _interopRequireDefault(_isSameDay);

var _setMonth2 = require('date-fns/setMonth');

var _setMonth3 = _interopRequireDefault(_setMonth2);

var _addYears = require('date-fns/addYears');

var _addYears2 = _interopRequireDefault(_addYears);

var _setYear2 = require('date-fns/setYear');

var _setYear3 = _interopRequireDefault(_setYear2);

var _addDays = require('date-fns/addDays');

var _addDays2 = _interopRequireDefault(_addDays);

var _format = require('date-fns/format');

var _format2 = _interopRequireDefault(_format);

var _max = require('date-fns/max');

var _max2 = _interopRequireDefault(_max);

var _min = require('date-fns/min');

var _min2 = _interopRequireDefault(_min);

var _utils = require('../utils');

var _styles = require('../styles');

var _styles2 = _interopRequireDefault(_styles);

var _Quarter = require('./Quarter.js');

var _Quarter2 = _interopRequireDefault(_Quarter);

var _enUS = require('date-fns/locale/en-US');

var _enUS2 = _interopRequireDefault(_enUS);

var _Months = require('./Months.js');

var _Months2 = _interopRequireDefault(_Months);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_PureComponent) {
  _inherits(Calendar, _PureComponent);

  function Calendar(props, context) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props, context));

    _this.changeShownDate = _this.changeShownDate.bind(_this);
    _this.focusToDate = _this.focusToDate.bind(_this);
    _this.updateShownDate = _this.updateShownDate.bind(_this);
    _this.handleRangeFocusChange = _this.handleRangeFocusChange.bind(_this);
    _this.renderDateDisplay = _this.renderDateDisplay.bind(_this);
    _this.renderDateMode = _this.renderDateMode.bind(_this);
    _this.onDragSelectionStart = _this.onDragSelectionStart.bind(_this);
    _this.onDragSelectionEnd = _this.onDragSelectionEnd.bind(_this);
    _this.onDragSelectionMove = _this.onDragSelectionMove.bind(_this);
    _this.renderMonthAndYear = _this.renderMonthAndYear.bind(_this);
    _this.updatePreview = _this.updatePreview.bind(_this);
    _this.estimateMonthSize = _this.estimateMonthSize.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    _this.dateOptions = { locale: props.locale };
    _this.styles = (0, _utils.generateStyles)([_styles2.default, props.classNames]);
    _this.listSizeCache = {};
    _this.state = {
      focusedDate: (0, _utils.calcFocusDate)(null, props),
      dateMode: '',
      drag: {
        status: false,
        range: { startDate: null, endDate: null },
        disablePreview: false
      },
      scrollArea: _this.calcScrollArea(props)
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: 'calcScrollArea',
    value: function calcScrollArea(props) {
      var direction = props.direction,
          months = props.months,
          scroll = props.scroll;

      if (!scroll.enabled) return { enabled: false };

      var longMonthHeight = scroll.longMonthHeight || scroll.monthHeight;
      if (direction === 'vertical') {
        return {
          enabled: true,
          monthHeight: scroll.monthHeight || 220,
          longMonthHeight: longMonthHeight || 260,
          calendarWidth: 'auto',
          calendarHeight: (scroll.calendarHeight || longMonthHeight || 240) * months
        };
      }
      return {
        enabled: true,
        monthWidth: scroll.monthWidth || 332,
        calendarWidth: (scroll.calendarWidth || scroll.monthWidth || 332) * months,
        monthHeight: longMonthHeight || 300,
        calendarHeight: longMonthHeight || 300
      };
    }
  }, {
    key: 'focusToDate',
    value: function focusToDate(date) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
      var preventUnnecessary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!props.scroll.enabled) {
        this.setState({ focusedDate: date });
        return;
      }
      var targetMonthIndex = (0, _differenceInCalendarMonths2.default)(date, props.minDate, this.dateOptions);
      var visibleMonths = this.list.getVisibleRange();
      if (preventUnnecessary && visibleMonths.includes(targetMonthIndex)) return;
      this.list.scrollTo(targetMonthIndex);
      this.setState({ focusedDate: date });
    }
  }, {
    key: 'updateShownDate',
    value: function updateShownDate() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var newProps = props.scroll.enabled ? _extends({}, props, {
        months: this.list.getVisibleRange().length
      }) : props;
      var newFocus = (0, _utils.calcFocusDate)(this.state.focusedDate, newProps);
      this.focusToDate(newFocus, newProps);
    }
  }, {
    key: 'updatePreview',
    value: function updatePreview(val) {
      if (!val) {
        this.setState({ preview: null });
        return;
      }
      var preview = {
        startDate: val,
        endDate: val,
        color: this.props.color
      };
      this.setState({ preview: preview });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.scroll.enabled) {
        // prevent react-list's initial render focus problem
        setTimeout(function () {
          return _this2.focusToDate(_this2.state.focusedDate);
        }, 1);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var propMapper = {
        dateRange: 'ranges',
        date: 'date'
      };
      var targetProp = propMapper[nextProps.displayMode];
      if (this.props.locale !== nextProps.locale) {
        this.dateOptions = { locale: nextProps.locale };
      }
      if (JSON.stringify(this.props.scroll) !== JSON.stringify(nextProps.scroll)) {
        this.setState({ scrollArea: this.calcScrollArea(nextProps) });
      }
      if (nextProps[targetProp] !== this.props[targetProp]) {
        this.updateShownDate(nextProps);
      }
    }
  }, {
    key: 'changeShownDate',
    value: function changeShownDate(value) {
      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set';
      var focusedDate = this.state.focusedDate;
      var _props = this.props,
          onShownDateChange = _props.onShownDateChange,
          minDate = _props.minDate,
          maxDate = _props.maxDate;

      var modeMapper = {
        yearOffset: function yearOffset() {
          return (0, _addYears2.default)(focusedDate, value);
        },
        monthOffset: function monthOffset() {
          return (0, _addMonths2.default)(focusedDate, value);
        },
        setMonth: function setMonth() {
          return (0, _setMonth3.default)(focusedDate, value);
        },
        setYear: function setYear() {
          return (0, _setYear3.default)(focusedDate, value);
        },
        set: function set() {
          return value;
        }
      };
      var newDate = (0, _min2.default)([(0, _max2.default)([modeMapper[mode](), minDate]), maxDate]);
      this.focusToDate(newDate, this.props, false);
      onShownDateChange && onShownDateChange(newDate);
    }
  }, {
    key: 'handleRangeFocusChange',
    value: function handleRangeFocusChange(rangesIndex, rangeItemIndex) {
      this.props.onRangeFocusChange && this.props.onRangeFocusChange([rangesIndex, rangeItemIndex]);
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      var _props2 = this.props,
          onShownDateChange = _props2.onShownDateChange,
          minDate = _props2.minDate;

      var visibleMonths = this.list.getVisibleRange();
      // prevent scroll jump with wrong visible value
      if (visibleMonths[0] === undefined) return;
      var visibleMonth = (0, _addMonths2.default)(minDate, visibleMonths[0] || 0);
      var isFocusedToDifferent = !(0, _isSameMonth2.default)(visibleMonth, this.state.focusedDate);
      if (isFocusedToDifferent) {
        this.setState({ focusedDate: visibleMonth });
        onShownDateChange && onShownDateChange(visibleMonth);
      }
    }
  }, {
    key: 'renderMonthAndYear',
    value: function renderMonthAndYear(focusedDate, changeShownDate, props) {
      var dateMode = this.state.dateMode;

      var isDayView = dateMode === '';
      var showMonthArrow = props.showMonthArrow,
          locale = props.locale,
          minDate = props.minDate,
          maxDate = props.maxDate,
          showMonthAndYearPickers = props.showMonthAndYearPickers;

      var upperYearLimit = (maxDate || Calendar.defaultProps.maxDate).getFullYear();
      var lowerYearLimit = (minDate || Calendar.defaultProps.minDate).getFullYear();
      var styles = this.styles;
      return _react2.default.createElement(
        'div',
        { onMouseUp: function onMouseUp(e) {
            return e.stopPropagation();
          }, className: styles.monthAndYearWrapper },
        showMonthArrow ? _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: (0, _classnames7.default)(styles.nextPrevButton, styles.prevButton),
            onClick: function onClick() {
              return changeShownDate(-1, isDayView ? 'monthOffset' : 'yearOffset');
            } },
          _react2.default.createElement('i', null)
        ) : null,
        isDayView ? showMonthAndYearPickers ? _react2.default.createElement(
          'span',
          { className: styles.monthAndYearPickers },
          _react2.default.createElement(
            'span',
            { className: styles.monthPicker },
            _react2.default.createElement(
              'select',
              { value: focusedDate.getMonth(), onChange: function onChange(e) {
                  return changeShownDate(e.target.value, 'setMonth');
                } },
              locale.localize.months().map(function (month, i) {
                return _react2.default.createElement(
                  'option',
                  { key: i, value: i },
                  month
                );
              })
            )
          ),
          _react2.default.createElement('span', { className: styles.monthAndYearDivider }),
          _react2.default.createElement(
            'span',
            { className: styles.yearPicker },
            _react2.default.createElement(
              'select',
              { value: focusedDate.getFullYear(), onChange: function onChange(e) {
                  return changeShownDate(e.target.value, 'setYear');
                } },
              new Array(upperYearLimit - lowerYearLimit + 1).fill(upperYearLimit).map(function (val, i) {
                var year = val - i;
                return _react2.default.createElement(
                  'option',
                  { key: year, value: year },
                  year
                );
              })
            )
          )
        ) : _react2.default.createElement(
          'span',
          { className: styles.monthAndYearPickers },
          locale.localize.months()[focusedDate.getMonth()],
          ' ',
          focusedDate.getFullYear()
        ) : '',
        showMonthArrow ? _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: (0, _classnames7.default)(styles.nextPrevButton, styles.nextButton),
            onClick: function onClick() {
              return changeShownDate(+1, isDayView ? 'monthOffset' : 'yearOffset');
            } },
          _react2.default.createElement('i', null)
        ) : null
      );
    }
  }, {
    key: 'renderWeekdays',
    value: function renderWeekdays() {
      var _this3 = this;

      var now = new Date();
      return _react2.default.createElement(
        'div',
        { className: this.styles.weekDays },
        (0, _eachDayOfInterval2.default)({
          start: (0, _startOfWeek2.default)(now, this.dateOptions),
          end: (0, _endOfWeek2.default)(now, this.dateOptions)
        }).map(function (day, i) {
          return _react2.default.createElement(
            'span',
            { className: _this3.styles.weekDay, key: i },
            (0, _format2.default)(day, 'ddd', _this3.dateOptions)
          );
        })
      );
    }
  }, {
    key: 'renderDateMode',
    value: function renderDateMode() {
      var _this4 = this;

      var _props3 = this.props,
          focusedRange = _props3.focusedRange,
          color = _props3.color,
          rangeColors = _props3.rangeColors;
      var dateMode = this.state.dateMode;

      var defaultColor = rangeColors[focusedRange[0]] || color;
      var styles = this.styles;
      return _react2.default.createElement(
        'div',
        { className: styles.dateModeWrapper },
        _react2.default.createElement(
          'button',
          {
            onClick: function onClick() {
              return _this4.setState({ dateMode: '' });
            },
            style: { color: defaultColor },
            className: (0, _classnames7.default)(styles.dateModeItem, _defineProperty({}, styles.dateModeItemActive, dateMode === '')) },
          _react2.default.createElement(
            'span',
            null,
            'Days'
          )
        ),
        _react2.default.createElement(
          'button',
          {
            style: { color: defaultColor },
            onClick: function onClick() {
              return _this4.setState({ dateMode: 'month' });
            },
            className: (0, _classnames7.default)(styles.dateModeItem, _defineProperty({}, styles.dateModeItemActive, dateMode === 'month')) },
          _react2.default.createElement(
            'span',
            null,
            'Months'
          )
        ),
        _react2.default.createElement(
          'button',
          {
            style: { color: defaultColor },
            onClick: function onClick() {
              return _this4.setState({ dateMode: 'quarter' });
            },
            className: (0, _classnames7.default)(styles.dateModeItem, _defineProperty({}, styles.dateModeItemActive, dateMode === 'quarter')) },
          _react2.default.createElement(
            'span',
            null,
            'Quarters'
          )
        )
      );
    }
  }, {
    key: 'renderDateDisplay',
    value: function renderDateDisplay() {
      var _this5 = this;

      var _props4 = this.props,
          focusedRange = _props4.focusedRange,
          color = _props4.color,
          ranges = _props4.ranges,
          rangeColors = _props4.rangeColors;

      var defaultColor = rangeColors[focusedRange[0]] || color;
      var styles = this.styles;
      return _react2.default.createElement(
        'div',
        { className: styles.dateDisplayWrapper },
        ranges.map(function (range, i) {
          if (range.showDateDisplay === false || range.disabled && !range.showDateDisplay) return null;
          return _react2.default.createElement(
            'div',
            { className: styles.dateDisplay, key: i, style: { color: range.color || defaultColor } },
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames7.default)(styles.dateDisplayItem, _defineProperty({}, styles.dateDisplayItemActive, focusedRange[0] === i && focusedRange[1] === 0)),
                onFocus: function onFocus() {
                  return _this5.handleRangeFocusChange(i, 0);
                } },
              _react2.default.createElement('input', { disabled: range.disabled, readOnly: true, value: _this5.formatDateDisplay(range.startDate, 'Early') })
            ),
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames7.default)(styles.dateDisplayItem, _defineProperty({}, styles.dateDisplayItemActive, focusedRange[0] === i && focusedRange[1] === 1)),
                onFocus: function onFocus() {
                  return _this5.handleRangeFocusChange(i, 1);
                } },
              _react2.default.createElement('input', { disabled: range.disabled, readOnly: true, value: _this5.formatDateDisplay(range.endDate, 'Continuous') })
            )
          );
        })
      );
    }
  }, {
    key: 'onDragSelectionStart',
    value: function onDragSelectionStart(date) {
      var _props5 = this.props,
          onChange = _props5.onChange,
          dragSelectionEnabled = _props5.dragSelectionEnabled;


      if (dragSelectionEnabled) {
        this.setState({
          drag: {
            status: true,
            range: { startDate: date, endDate: date },
            disablePreview: true
          }
        });
      } else {
        onChange && onChange(date);
      }
    }
  }, {
    key: 'onDragSelectionEnd',
    value: function onDragSelectionEnd(date) {
      var _props6 = this.props,
          updateRange = _props6.updateRange,
          displayMode = _props6.displayMode,
          onChange = _props6.onChange,
          dragSelectionEnabled = _props6.dragSelectionEnabled;
      var dateMode = this.state.dateMode;

      if (!dragSelectionEnabled) return;

      if (displayMode === 'date' || !this.state.drag.status) {
        onChange && onChange(date);
        return;
      }

      var newRange = {
        startDate: this.state.drag.range.startDate,
        endDate: dateMode === 'quarter' ? (0, _utils.getQuarter)(date).end : dateMode === 'month' ? (0, _utils.getMonthDates)(date).end : date
      };

      if (displayMode !== 'dateRange' || (0, _isSameDay2.default)(newRange.startDate, newRange.endDate)) {
        this.setState({ drag: { status: false, range: {} } }, function () {
          return onChange && onChange(date);
        });
      } else {
        this.setState({ drag: { status: false, range: {} } }, function () {
          updateRange && updateRange(newRange);
        });
      }
    }
  }, {
    key: 'onDragSelectionMove',
    value: function onDragSelectionMove(date) {
      var drag = this.state.drag;

      if (!drag.status || !this.props.dragSelectionEnabled) return;
      this.setState({
        drag: {
          status: drag.status,
          range: { startDate: drag.range.startDate, endDate: date },
          disablePreview: true
        }
      });
    }
  }, {
    key: 'estimateMonthSize',
    value: function estimateMonthSize(index, cache) {
      var _props7 = this.props,
          direction = _props7.direction,
          minDate = _props7.minDate;
      var scrollArea = this.state.scrollArea;

      if (cache) {
        this.listSizeCache = cache;
        if (cache[index]) return cache[index];
      }
      if (direction === 'horizontal') return scrollArea.monthWidth;
      var monthStep = (0, _addMonths2.default)(minDate, index);

      var _getMonthDisplayRange = (0, _utils.getMonthDisplayRange)(monthStep, this.dateOptions),
          start = _getMonthDisplayRange.start,
          end = _getMonthDisplayRange.end;

      var isLongMonth = (0, _differenceInDays2.default)(end, start, this.dateOptions) + 1 > 7 * 5;
      return isLongMonth ? scrollArea.longMonthHeight : scrollArea.monthHeight;
    }
  }, {
    key: 'formatDateDisplay',
    value: function formatDateDisplay(date, defaultText) {
      if (!date) return defaultText;
      return (0, _format2.default)(date, this.props.dateDisplayFormat, this.dateOptions);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props8 = this.props,
          showDateDisplay = _props8.showDateDisplay,
          showDateMode = _props8.showDateMode,
          onPreviewChange = _props8.onPreviewChange,
          scroll = _props8.scroll,
          direction = _props8.direction,
          disabledDates = _props8.disabledDates,
          maxDate = _props8.maxDate,
          minDate = _props8.minDate,
          rangeColors = _props8.rangeColors,
          color = _props8.color;
      var _state = this.state,
          scrollArea = _state.scrollArea,
          focusedDate = _state.focusedDate,
          dateMode = _state.dateMode;

      var isVertical = direction === 'vertical';
      var navigatorRenderer = this.props.navigatorRenderer || this.renderMonthAndYear;
      var ranges = this.props.ranges.map(function (range, i) {
        return _extends({}, range, {
          color: range.color || rangeColors[i] || color
        });
      });
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames7.default)(this.styles.calendarWrapper, this.props.className),
          onMouseUp: function onMouseUp() {
            return _this6.setState({ drag: { status: false, range: {} } });
          },
          onMouseLeave: function onMouseLeave() {
            _this6.setState({ drag: { status: false, range: {} } });
          } },
        showDateDisplay && this.renderDateDisplay(),
        showDateMode && this.renderDateMode(),
        navigatorRenderer(focusedDate, this.changeShownDate, this.props),
        scroll.enabled ? _react2.default.createElement(
          'div',
          null,
          isVertical && this.renderWeekdays(this.dateOptions),
          _react2.default.createElement(
            'div',
            {
              className: (0, _classnames7.default)(this.styles.infiniteMonths, isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal),
              onMouseLeave: function onMouseLeave() {
                return onPreviewChange && onPreviewChange();
              },
              style: {
                width: scrollArea.calendarWidth + 11,
                height: scrollArea.calendarHeight + 11
              },
              onScroll: this.handleScroll },
            _react2.default.createElement(_reactList2.default, {
              length: (0, _differenceInCalendarMonths2.default)((0, _endOfMonth2.default)(maxDate), (0, _addDays2.default)((0, _startOfMonth2.default)(minDate), -1), this.dateOptions),
              treshold: 500,
              type: 'variable',
              ref: function ref(target) {
                return _this6.list = target;
              },
              itemSizeEstimator: this.estimateMonthSize,
              axis: isVertical ? 'y' : 'x',
              itemRenderer: function itemRenderer(index, key) {
                var monthStep = (0, _addMonths2.default)(minDate, index);
                return _react2.default.createElement(_Month2.default, _extends({}, _this6.props, {
                  onPreviewChange: _this6.props.onPreviewChange || _this6.updatePreview,
                  preview: _this6.props.preview || _this6.state.preview,
                  ranges: ranges,
                  key: key,
                  drag: _this6.state.drag,
                  dateOptions: _this6.dateOptions,
                  disabledDates: disabledDates,
                  month: monthStep,
                  onDragSelectionStart: _this6.onDragSelectionStart,
                  onDragSelectionEnd: _this6.onDragSelectionEnd,
                  onDragSelectionMove: _this6.onDragSelectionMove,
                  onMouseLeave: function onMouseLeave() {
                    return onPreviewChange && onPreviewChange();
                  },
                  styles: _this6.styles,
                  style: isVertical ? { height: _this6.estimateMonthSize(index) } : { height: scrollArea.monthHeight, width: _this6.estimateMonthSize(index) },
                  showMonthName: true,
                  showWeekDays: !isVertical
                }));
              }
            })
          )
        ) : _react2.default.createElement(
          'div',
          {
            className: (0, _classnames7.default)(this.styles.months, isVertical ? this.styles.monthsVertical : this.styles.monthsHorizontal) },
          new Array(this.props.months).fill(null).map(function (_, i) {
            var yearStep = (0, _addYears2.default)(_this6.state.focusedDate, i);
            var monthStep = (0, _addMonths2.default)(_this6.state.focusedDate, i);

            if (dateMode === 'quarter') {
              return _react2.default.createElement(_Quarter2.default, _extends({}, _this6.props, {
                key: i,
                ranges: ranges,
                year: yearStep,
                drag: _this6.state.drag,
                dateOptions: _this6.dateOptions,
                disabledDates: disabledDates,
                onDragSelectionStart: _this6.onDragSelectionStart,
                onDragSelectionEnd: _this6.onDragSelectionEnd,
                onDragSelectionMove: _this6.onDragSelectionMove,
                onMouseLeave: function onMouseLeave() {
                  return onPreviewChange && onPreviewChange();
                },
                styles: _this6.styles
              }));
            } else if (dateMode === 'month') {
              return _react2.default.createElement(_Months2.default, _extends({}, _this6.props, {
                key: i,
                ranges: ranges,
                year: yearStep,
                drag: _this6.state.drag,
                dateOptions: _this6.dateOptions,
                disabledDates: disabledDates,
                onDragSelectionStart: _this6.onDragSelectionStart,
                onDragSelectionEnd: _this6.onDragSelectionEnd,
                onDragSelectionMove: _this6.onDragSelectionMove,
                onMouseLeave: function onMouseLeave() {
                  return onPreviewChange && onPreviewChange();
                },
                styles: _this6.styles
              }));
            }
            return _react2.default.createElement(_Month2.default, _extends({}, _this6.props, {
              onPreviewChange: _this6.props.onPreviewChange || _this6.updatePreview,
              preview: _this6.props.preview || _this6.state.preview,
              ranges: ranges,
              key: i,
              drag: _this6.state.drag,
              dateOptions: _this6.dateOptions,
              disabledDates: disabledDates,
              month: monthStep,
              onDragSelectionStart: _this6.onDragSelectionStart,
              onDragSelectionEnd: _this6.onDragSelectionEnd,
              onDragSelectionMove: _this6.onDragSelectionMove,
              onMouseLeave: function onMouseLeave() {
                return onPreviewChange && onPreviewChange();
              },
              styles: _this6.styles,
              showWeekDays: !isVertical || i === 0,
              showMonthName: !isVertical || i > 0
            }));
          })
        )
      );
    }
  }]);

  return Calendar;
}(_react.PureComponent);

Calendar.defaultProps = {
  showMonthArrow: true,
  showMonthAndYearPickers: true,
  disabledDates: [],
  classNames: {},
  locale: _enUS2.default,
  ranges: [],
  focusedRange: [0, 0],
  dateDisplayFormat: 'MMM D, YYYY',
  monthDisplayFormat: 'MMM YYYY',
  showDateDisplay: true,
  showPreview: true,
  displayMode: 'date',
  months: 1,
  color: '#3d91ff',
  scroll: {
    enabled: false
  },
  direction: 'vertical',
  maxDate: (0, _addYears2.default)(new Date(), 20),
  minDate: (0, _addYears2.default)(new Date(), -100),
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  dragSelectionEnabled: true
};

Calendar.propTypes = {
  showMonthArrow: _propTypes2.default.bool,
  showMonthAndYearPickers: _propTypes2.default.bool,
  disabledDates: _propTypes2.default.array,
  minDate: _propTypes2.default.object,
  maxDate: _propTypes2.default.object,
  date: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  onPreviewChange: _propTypes2.default.func,
  onRangeFocusChange: _propTypes2.default.func,
  classNames: _propTypes2.default.object,
  locale: _propTypes2.default.object,
  shownDate: _propTypes2.default.object,
  onShownDateChange: _propTypes2.default.func,
  ranges: _propTypes2.default.arrayOf(_DayCell.rangeShape),
  preview: _propTypes2.default.shape({
    startDate: _propTypes2.default.object,
    endDate: _propTypes2.default.object,
    color: _propTypes2.default.string
  }),
  dateDisplayFormat: _propTypes2.default.string,
  monthDisplayFormat: _propTypes2.default.string,
  focusedRange: _propTypes2.default.arrayOf(_propTypes2.default.number),
  initialFocusedRange: _propTypes2.default.arrayOf(_propTypes2.default.number),
  months: _propTypes2.default.number,
  className: _propTypes2.default.string,
  showDateDisplay: _propTypes2.default.bool,
  showPreview: _propTypes2.default.bool,
  displayMode: _propTypes2.default.oneOf(['dateRange', 'date']),
  color: _propTypes2.default.string,
  updateRange: _propTypes2.default.func,
  scroll: _propTypes2.default.shape({
    enabled: _propTypes2.default.bool,
    monthHeight: _propTypes2.default.number,
    longMonthHeight: _propTypes2.default.number,
    monthWidth: _propTypes2.default.number,
    calendarWidth: _propTypes2.default.number,
    calendarHeight: _propTypes2.default.number
  }),
  direction: _propTypes2.default.oneOf(['vertical', 'horizontal']),
  navigatorRenderer: _propTypes2.default.func,
  rangeColors: _propTypes2.default.arrayOf(_propTypes2.default.string),
  dragSelectionEnabled: _propTypes2.default.bool
};

exports.default = Calendar;