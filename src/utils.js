import classnames from 'classnames';
import { addMonths, areIntervalsOverlapping, startOfMonth, endOfMonth, startOfWeek, endOfWeek, format } from 'date-fns';

export function calcFocusDate(currentFocusedDate, props) {
  const { shownDate, date, months, ranges, focusedRange, displayMode } = props;
  // find primary date according the props
  let targetInterval;
  if (displayMode === 'dateRange') {
    const range = ranges[focusedRange[0]] || {};
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
  targetInterval.start = startOfMonth(targetInterval.start || new Date());
  targetInterval.end = endOfMonth(targetInterval.end || targetInterval.start);
  const targetDate = targetInterval.start || targetInterval.end || shownDate || new Date();

  // initial focus
  if (!currentFocusedDate) return shownDate || targetDate;

  // // just return targetDate for native scrolled calendars
  // if (props.scroll.enabled) return targetDate;
  const currentFocusInterval = {
    start: startOfMonth(currentFocusedDate),
    end: endOfMonth(addMonths(currentFocusedDate, months - 1))
  };
  if (areIntervalsOverlapping(targetInterval, currentFocusInterval)) {
    // don't change focused if new selection in view area
    return currentFocusedDate;
  }
  return targetDate;
}

export function findNextRangeIndex(ranges, currentRangeIndex = -1) {
  const nextIndex = ranges.findIndex(
    (range, i) => i > currentRangeIndex && range.autoFocus !== false && !range.disabled
  );
  if (nextIndex !== -1) return nextIndex;
  return ranges.findIndex((range) => range.autoFocus !== false && !range.disabled);
}

export function getMonthDisplayRange(date, dateOptions) {
  const startDateOfMonth = startOfMonth(date, dateOptions);
  const endDateOfMonth = endOfMonth(date, dateOptions);
  const startDateOfCalendar = startOfWeek(startDateOfMonth, dateOptions);
  const endDateOfCalendar = endOfWeek(endDateOfMonth, dateOptions);
  return {
    start: startDateOfCalendar,
    end: endDateOfCalendar,
    startDateOfMonth,
    endDateOfMonth
  };
}

export function generateStyles(sources) {
  if (!sources.length) return {};
  const generatedStyles = sources
    .filter((source) => Boolean(source))
    .reduce((styles, styleSource) => {
      Object.keys(styleSource).forEach((key) => {
        styles[key] = classnames(styles[key], styleSource[key]);
      });
      return styles;
    }, {});
  return generatedStyles;
}

function eachQuarterOfYear(date) {
  const year = date.getFullYear();
  return {
    1: { start: new Date(year, 0, 1), end: new Date(year, 3, 0) },
    2: { start: new Date(year, 3, 1), end: new Date(year, 6, 0) },
    3: { start: new Date(year, 6, 1), end: new Date(year, 9, 0) },
    4: { start: new Date(year, 9, 1), end: new Date(year, 12, 0) }
  };
}

function eachMonthOfYear(date) {
  const year = date.getFullYear();
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

export { eachQuarterOfYear, eachMonthOfYear };
