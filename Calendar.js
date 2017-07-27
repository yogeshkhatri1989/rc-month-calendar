import React, { Component } from 'react';

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let day = 1000 * 60 * 60 * 24;

const compDate = (date1, date2) => date1.toDateString() == date2.toDateString();

class MonthCalendar extends Component {

  constructor(props) {
    
    super(props);

    let selectedDate = this.props.selectedDate instanceof Date ? new Date(this.props.selectedDate) : new Date();
    selectedDate.setHours(0, 0, 0, 0);

    let currentDate = this.props.currentDate instanceof Date ? new Date(this.props.currentDate) : selectedDate;
    currentDate.setHours(0, 0, 0, 0);

    this.state = {
      currentDate: currentDate,
      selectedDate: selectedDate,
      currView: "date"
    }
    
  }

  nextMonth() {

    let currentDate = this.state.currentDate;
    
    let newCurrentDate = new Date(currentDate.getTime() + (day * (currentDate.getDate() < 15 ? 30 : 20)));

    this.setState({
      currentDate: newCurrentDate
    });

    let onMonthChange = this.props.onMonthChange;
    onMonthChange && onMonthChange(newCurrentDate, currentDate);
  }

  currMonth() {

    let currentDate = this.state.currentDate;
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    if (currentDate.getTime() != today.getTime()) {
      this.setState({
        currentDate: today
      });

      let onMonthChange = this.props.onMonthChange;
      onMonthChange && onMonthChange(today, currentDate);
    }
  }

  prevMonth() {

    let currentDate = this.state.currentDate;
    
    let newCurrentDate = new Date(currentDate.getTime() - (day * (currentDate.getDate() > 15 ? 30 : 20)));

    this.setState({
      currentDate: newCurrentDate
    });

    let onMonthChange = this.props.onMonthChange;
    onMonthChange && onMonthChange(newCurrentDate, currentDate);
  }

  onDateClick(date, event) {

    if (this.props.isDateEnabled && !this.props.isDateEnabled(date)) {
      return;
    }

    let selectedDate = document.querySelector(".date.selected");
    selectedDate && selectedDate.classList.remove("selected");

    event.target.classList.add("selected");

    let oldSelectedDate = this.state.selectedDate;

    this.setState({
      selectedDate: date
    });
    
    let onDateClick = this.props.onDateClick;
    onDateClick && onDateClick(date, oldSelectedDate);
  }

  componentWillReceiveProps(nextProps) {

    let state = {
      selectedDate: nextProps.selectedDate,
      renderTouch: !this.state.renderTouch
    }

    if (nextProps.currentDate) {
      state.currentDate = nextProps.currentDate;
    }

    this.setState(state)
  }

  render() {

    let selectedDate = this.state.selectedDate;

    let currView = this.state.currView;

    let currentDate = this.state.currentDate;
    let month = months[currentDate.getMonth()];
    let year = currentDate.getFullYear();

    let currMonth = currentDate.getMonth();

    let firstDate = new Date(currentDate.getTime() - (day * (currentDate.getDate() - 1)));
    let firstDay = firstDate.getDay();

    let travDate = new Date(firstDate.getTime() - (day * firstDay));
    let travDateMonth = travDate.getMonth();

    let monthDates = [];
    
    let dateClass = this.props.dateClass || this.props.dateEnableKlass || "";

    let containerClass = this.props.containerClass || this.props.containerKlass || "";
    
    let prevButtonClass = this.props.prevButtonClass || this.props.prevButtonKlass || "";
    let nextButtonClass = this.props.nextButtonClass || this.props.nextButtonKlass || "";

    let prevButtonHtml = this.props.prevButtonHtml == undefined ? "&lt;" : this.props.prevButtonHtml;
    let nextButtonHtml = this.props.nextButtonHtml == undefined ? "&gt;" : this.props.nextButtonHtml;

    while (travDateMonth != currMonth) {

      let isItSelected = travDate.toDateString() == selectedDate.toDateString();
      let disabledDateClass = this.props.disabledDateClass || "";

      monthDates.push((
        <td key={travDate}
          className={`date prev-month disabled-date ${dateClass} ${disabledDateClass}`}>
          {travDate.getDate()}
        </td>
      ));

      travDate = new Date(travDate.getTime() + day);
      travDateMonth = travDate.getMonth();
    }

    while (travDateMonth == currMonth) {

      let isItToday = travDate.toDateString() == new Date().toDateString();
      let todayKlass = isItToday ? "today" : "";

      let isItSelected = travDate.toDateString() == selectedDate.toDateString();
      let selectedKlass = isItSelected ? "selected" : "";
      let enabledDateClass = this.props.enabledDateClass || "";
      let disabledDateClass = this.props.disabledDateClass || "";

      let dateEnableKlass = `enabled-date ${enabledDateClass}`;
      if (this.props.isDateEnabled && !this.props.isDateEnabled(travDate)) {
        dateEnableKlass = `disabled-date ${disabledDateClass}`;
      }

      monthDates.push((
        <td key={travDate}
          className={`date curr-month ${todayKlass} ${dateClass} ${selectedKlass} ${dateEnableKlass}`}
          onClick={this.onDateClick.bind(this, travDate)}>
          {travDate.getDate()}
        </td>
      ));

      travDate = new Date(travDate.getTime() + day);
      travDateMonth = travDate.getMonth();
    }

    while (travDate.getDay()) {
      let isItSelected = travDate.toDateString() == selectedDate.toDateString();
      let disabledDateClass = this.props.disabledDateClass || "";

      monthDates.push((
        <td key={travDate}
          className={`date next-month disabled-date ${dateClass} ${disabledDateClass}`}>
          {travDate.getDate()}
        </td>
      ));

      travDate = new Date(travDate.getTime() + day);
      travDateMonth = travDate.getMonth();
    }

    let datesContent = [];
    let dateIndex = 0;

    while (dateIndex < monthDates.length) {
      datesContent.push((
        <tr key={`week-${dateIndex / 7}`}
          className={`week week-${(dateIndex / 7) + 1}`}>
          {monthDates.slice(dateIndex, dateIndex + 7)}
        </tr>
      ));
      dateIndex += 7;
    }

    let monthsContent = [];
    for (var i = 0; i < 3; i++) {
      let monthRowContent = [];
      for (var j = 0; j < 4; j++) {

        monthRowContent.push((
          <td key={months[(i * 3) + j]} colSpan={"2"}
            className={"month"}>{months[(i * 3) + j]}</td>
        ))
      }

      monthsContent.push((
        <tr key={`month-row-${i}`}
          className={`month-row-${i}`}>
          {monthRowContent}
        </tr>
      ))
    }

    let yearsContent = [];

    return (
      <div className="rc-month-calendar-cont">
        <table className={`rc-month-calendar ${containerClass}`}>
          <thead>
            <tr className={`header month`}>
              <th className={`month-button prev ${prevButtonClass}`}
                onClick={this.prevMonth.bind(this)}
                dangerouslySetInnerHTML={{__html: prevButtonHtml}}></th>
              <th colSpan={5}
                className={`month-desc`}
                onClick={this.currMonth.bind(this)}>
                {month} {year}
              </th>
              <th className={`month-button next ${nextButtonClass}`}
                onClick={this.nextMonth.bind(this)}
                dangerouslySetInnerHTML={{__html: nextButtonHtml}}></th>
            </tr>
            {
              currView == "date" &&  (<tr className={`header day-names`}>
                                  <th className="day sun">S</th>
                                  <th className="day mon">M</th>
                                  <th className="day tue">T</th>
                                  <th className="day wed">W</th>
                                  <th className="day thu">T</th>
                                  <th className="day fri">F</th>
                                  <th className="day sat">S</th>
                                </tr>)
            }
          </thead>
          <tbody>
            {
              currView == "date" && datesContent
            }
            {
              currView == "month" && monthsContent
            }
            {
              currView == "year" && yearsContent
            }
          </tbody>
        </table>
      </div>
    );
  }
}

MonthCalendar.propTypes = {
  containerKlass: React.PropTypes.string,
  prevButtonKlass: React.PropTypes.string,
  nextButtonKlass: React.PropTypes.string,
  dateKlass: React.PropTypes.string,
  containerClass: React.PropTypes.string,
  prevButtonClass: React.PropTypes.string,
  nextButtonClass: React.PropTypes.string,
  disabledDateClass: React.PropTypes.string,
  enabledDateClass: React.PropTypes.string,
  dateClass: React.PropTypes.string,
  prevButtonHtml: React.PropTypes.string,
  nextButtonHtml: React.PropTypes.string,
  onDateClick: React.PropTypes.func,
  onMonthChange: React.PropTypes.func,
  selectedDate: React.PropTypes.object,
  isDateEnabled: React.PropTypes.func
}

import "./Calendar.less";

export default MonthCalendar;