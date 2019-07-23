/* eslint-disable no-fallthrough */
import React, { Component } from 'react';
import classnames from 'classnames';
import { startOfDay, isSameDay, isAfter, isBefore, endOfDay, getQuarter } from 'date-fns';

class QuarterCell extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      hover: false,
      active: false
    };
    this.getClassNames = this.getClassNames.bind(this);
    this.handleMouseEvent = this.handleMouseEvent.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    this.renderSelectionPlaceholders = this.renderSelectionPlaceholders.bind(this);
    this.renderPreviewPlaceholder = this.renderPreviewPlaceholder.bind(this);
  }

  handleKeyEvent(event) {
    const { quarter } = this.props;
    switch (event.keyCode) {
      case 13: //space
      case 32: //enter
        if (event.type === 'keydown') {
          this.props.onMouseDown(quarter.start);
        } else {
          this.props.onMouseUp(quarter.start);
        }
        break;
    }
  }
  handleMouseEvent(event) {
    const { quarter, disabled, onPreviewChange } = this.props;

    const stateChanges = {};
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
  getClassNames() {
    const { styles } = this.props;

    return classnames(styles.quarter, {
      [styles.dayHovered]: this.state.hover,
      [styles.dayActive]: this.state.active
    });
  }
  renderPreviewPlaceholder() {
    const { preview, quarter, styles } = this.props;
    if (!preview) return null;
    const startDate = preview.startDate ? endOfDay(preview.startDate) : null;
    const endDate = preview.endDate ? startOfDay(preview.endDate) : null;

    const isInRange =
      (!startDate || isAfter(quarter.start, startDate)) && (!endDate || isBefore(quarter.start, endDate));
    const isStartEdge = !isInRange && isSameDay(quarter.start, startDate);
    const isEndEdge = !isInRange && isSameDay(quarter.start, endDate);
    return (
      <span
        className={classnames({
          [styles.dayStartPreview]: isStartEdge,
          [styles.dayInPreview]: isInRange,
          [styles.dayEndPreview]: isEndEdge
        })}
        style={{ color: preview.color }}
      />
    );
  }
  renderSelectionPlaceholders() {
    const { styles, ranges, quarter } = this.props;
    if (this.props.displayMode === 'date') {
      let isSelected = isSameDay(this.props.quarter.start, this.props.date);
      return isSelected ? <span className={styles.selected} style={{ color: this.props.color }} /> : null;
    }

    const inRanges = ranges.reduce((result, range) => {
      let startDate = range.startDate;
      let endDate = range.endDate;
      if (startDate && endDate && isBefore(endDate, startDate)) {
        [startDate, endDate] = [endDate, startDate];
      }
      startDate = startDate ? endOfDay(startDate) : null;
      endDate = endDate ? startOfDay(endDate) : null;
      const isInRange =
        (!startDate || isAfter(quarter.start, startDate)) && (!endDate || isBefore(quarter.start, endDate));
      const isStartEdge = !isInRange && isSameDay(quarter.start, startDate);
      const isEndEdge = !isInRange && isSameDay(quarter.start, endDate);

      if (isInRange || isStartEdge || isEndEdge) {
        return [
          ...result,
          {
            isStartEdge,
            isEndEdge: isEndEdge,
            isInRange,
            ...range
          }
        ];
      }
      return result;
    }, []);

    return inRanges.map((range, i) => (
      <span
        key={i}
        className={classnames({
          [styles.startEdge]: range.isStartEdge,
          [styles.endEdge]: range.isEndEdge,
          [styles.inRange]: range.isInRange
        })}
        style={{ color: range.color || this.props.color }}
      />
    ));
  }
  render() {
    const { styles } = this.props;

    return (
      <button
        type="button"
        onMouseEnter={this.handleMouseEvent}
        onMouseLeave={this.handleMouseEvent}
        onFocus={this.handleMouseEvent}
        onMouseDown={this.handleMouseEvent}
        onMouseUp={this.handleMouseEvent}
        onBlur={this.handleMouseEvent}
        onPauseCapture={this.handleMouseEvent}
        onKeyDown={this.handleKeyEvent}
        onKeyUp={this.handleKeyEvent}
        className={this.getClassNames(styles)}
        {...(this.props.disabled || this.props.isPassive ? { tabIndex: -1 } : {})}
        style={{ color: this.props.color }}>
        {this.renderSelectionPlaceholders()}
        {this.renderPreviewPlaceholder()}

        <span className={styles.dayNumber}>
          <span>Q{getQuarter(this.props.quarter.start)}</span>
        </span>
      </button>
    );
  }
}

export default QuarterCell;
