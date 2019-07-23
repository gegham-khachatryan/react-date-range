'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eachMonthOfYear = exports.eachQuarterOfYear = undefined;
exports.calcFocusDate = calcFocusDate;
exports.findNextRangeIndex = findNextRangeIndex;
exports.getMonthDisplayRange = getMonthDisplayRange;
exports.generateStyles = generateStyles;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _format = require('date-fns/format');

var _format2 = _interopRequireDefault(_format);

var _endOfWeek = require('date-fns/endOfWeek');

var _endOfWeek2 = _interopRequireDefault(_endOfWeek);

var _startOfWeek = require('date-fns/startOfWeek');

var _startOfWeek2 = _interopRequireDefault(_startOfWeek);

var _endOfMonth = require('date-fns/endOfMonth');

var _endOfMonth2 = _interopRequireDefault(_endOfMonth);

var _startOfMonth = require('date-fns/startOfMonth');

var _startOfMonth2 = _interopRequireDefault(_startOfMonth);

var _areIntervalsOverlapping = require('date-fns/areIntervalsOverlapping');

var _areIntervalsOverlapping2 = _interopRequireDefault(_areIntervalsOverlapping);

var _addMonths = require('date-fns/addMonths');

var _addMonths2 = _interopRequireDefault(_addMonths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calcFocusDate(currentFocusedDate, props) {
  var shownDate = props.shownDate,
      date = props.date,
      months = props.months,
      ranges = props.ranges,
      focusedRange = props.focusedRange,
      displayMode = props.displayMode;
  // find primary date according the props

  var targetInterval = void 0;
  if (displayMode === 'dateRange') {
    var range = ranges[focusedRange[0]] || {};
    targetInterval = {
      start: range.startDate,
      end: range.endDate
    };
  } else {
    targetInterval = {
      start: date,
      end: date
    };
  }
  targetInterval.start = (0, _startOfMonth2.default)(targetInterval.start || new Date());
  targetInterval.end = (0, _endOfMonth2.default)(targetInterval.end || targetInterval.start);
  var targetDate = targetInterval.start || targetInterval.end || shownDate || new Date();

  // initial focus
  if (!currentFocusedDate) return shownDate || targetDate;

  // // just return targetDate for native scrolled calendars
  // if (props.scroll.enabled) return targetDate;
  var currentFocusInterval = {
    start: (0, _startOfMonth2.default)(currentFocusedDate),
    end: (0, _endOfMonth2.default)((0, _addMonths2.default)(currentFocusedDate, months - 1))
  };
  if ((0, _areIntervalsOverlapping2.default)(targetInterval, currentFocusInterval)) {
    // don't change focused if new selection in view area
    return currentFocusedDate;
  }
  return targetDate;
}

function findNextRangeIndex(ranges) {
  var currentRangeIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

  var nextIndex = ranges.findIndex(function (range, i) {
    return i > currentRangeIndex && range.autoFocus !== false && !range.disabled;
  });
  if (nextIndex !== -1) return nextIndex;
  return ranges.findIndex(function (range) {
    return range.autoFocus !== false && !range.disabled;
  });
}

function getMonthDisplayRange(date, dateOptions) {
  var startDateOfMonth = (0, _startOfMonth2.default)(date, dateOptions);
  var endDateOfMonth = (0, _endOfMonth2.default)(date, dateOptions);
  var startDateOfCalendar = (0, _startOfWeek2.default)(startDateOfMonth, dateOptions);
  var endDateOfCalendar = (0, _endOfWeek2.default)(endDateOfMonth, dateOptions);
  return {
    start: startDateOfCalendar,
    end: endDateOfCalendar,
    startDateOfMonth: startDateOfMonth,
    endDateOfMonth: endDateOfMonth
  };
}

function generateStyles(sources) {
  if (!sources.length) return {};
  var generatedStyles = sources.filter(function (source) {
    return Boolean(source);
  }).reduce(function (styles, styleSource) {
    Object.keys(styleSource).forEach(function (key) {
      styles[key] = (0, _classnames2.default)(styles[key], styleSource[key]);
    });
    return styles;
  }, {});
  return generatedStyles;
}

function eachQuarterOfYear(date) {
  var year = date.getFullYear();
  return {
    1: { start: new Date(year, 0, 1), end: new Date(year, 3, 0) },
    2: { start: new Date(year, 3, 1), end: new Date(year, 6, 0) },
    3: { start: new Date(year, 6, 1), end: new Date(year, 9, 0) },
    4: { start: new Date(year, 9, 1), end: new Date(year, 12, 0) }
  };
}

function eachMonthOfYear(date) {
  var year = date.getFullYear();
  return {
    1: { start: new Date(year, 0, 1), end: new Date(year, 1, 0) },
    2: { start: new Date(year, 1, 1), end: new Date(year, 2, 0) },
    3: { start: new Date(year, 2, 1), end: new Date(year, 3, 0) },
    4: { start: new Date(year, 3, 1), end: new Date(year, 4, 0) },
    5: { start: new Date(year, 4, 1), end: new Date(year, 5, 0) },
    6: { start: new Date(year, 5, 1), end: new Date(year, 6, 0) },
    7: { start: new Date(year, 6, 1), end: new Date(year, 7, 0) },
    8: { start: new Date(year, 7, 1), end: new Date(year, 8, 0) },
    9: { start: new Date(year, 8, 1), end: new Date(year, 9, 0) },
    10: { start: new Date(year, 9, 1), end: new Date(year, 10, 0) },
    11: { start: new Date(year, 10, 1), end: new Date(year, 11, 0) },
    12: { start: new Date(year, 11, 1), end: new Date(year, 12, 0) }
  };
}

exports.eachQuarterOfYear = eachQuarterOfYear;
exports.eachMonthOfYear = eachMonthOfYear;