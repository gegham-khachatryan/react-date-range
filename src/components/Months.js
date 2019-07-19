/* eslint-disable no-fallthrough */
import React, { PureComponent } from 'react';
import { eachMonthOfYear, getMonthDates } from '../utils';
import MonthCell from './MonthCell.js';

class Months extends PureComponent {
  render() {
    const { displayMode, focusedRange, drag, styles } = this.props;
    let ranges = this.props.ranges.map((i) => ({
      ...i,
      endDate: i.endDate ? getMonthDates(i.endDate).start : i.endDate
    }));
    if (displayMode === 'dateRange' && drag.status) {
      let { startDate, endDate } = drag.range;
      ranges = ranges.map((range, i) => {
        if (i !== focusedRange[0]) return range;
        return {
          ...range,
          startDate,
          endDate
        };
      });
    }

    return (
      <div className={styles.month} style={this.props.style}>
        <div className={styles.yearPreivew}>{this.props.year.getFullYear()}</div>
        <div className={styles.days} onMouseLeave={this.props.onMouseLeave}>
          {Object.values(eachMonthOfYear(this.props.year)).map((quarter, index) => {
            return (
              <MonthCell
                {...this.props}
                ranges={ranges}
                quarter={quarter}
                key={index}
                styles={styles}
                onMouseDown={this.props.onDragSelectionStart}
                onMouseUp={this.props.onDragSelectionEnd}
                onMouseEnter={this.props.onDragSelectionMove}
                dragRange={drag.range}
                drag={drag.status}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Months;
