import React, { Component } from 'react';

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let day = 1000 * 60 * 60 * 24;

class MonthCalendar extends Component {

  constructor(props) {
    
    super(props);

    let date = this.props.date instanceof Date ? this.props.date : new Date();
    date.setHours(0, 0, 0, 0);

    this.state = {
      currentDate: date,
      selectedDate: date
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

    let selectedDate = document.querySelector(".date.selected");
    selectedDate && selectedDate.classList.remove("selected");

    event.target.classList.add("selected");

    let oldSelectedDate = this.state.selectedDate;

    this.setState({
      selectedDate: date
    })
    
    let onDateClick = this.props.onDateClick;
    onDateClick && onDateClick(date, oldSelectedDate);
  }

  render() {

    let selectedDate = this.state.selectedDate;

    let currentDate = this.state.currentDate;
    let month = months[currentDate.getMonth()];
    let year = currentDate.getFullYear();

    let currMonth = currentDate.getMonth();

    let firstDate = new Date(currentDate.getTime() - (day * (currentDate.getDate() - 1)));
    let firstDay = firstDate.getDay();

    let travDate = new Date(firstDate.getTime() - (day * firstDay));
    let travDateMonth = travDate.getMonth();

    let monthDates = [];
    let selectedKlass = "selected";

    let dateKlass = this.props.dateKlass || "";

    let containerKlass = this.props.containerKlass || "";
    let headerMonthKlass = this.props.headerMonthKlass || "";
    let headerDayKlass = this.props.headerDayKlass || "";
    let headerWeekDayKlass = `day ${this.props.headerWeekDayKlass || ""}`;
    let weekContKlass = this.props.weekContKlass || "";
    let monthDescKlass = this.props.monthDescKlass || "";

    let prevButtonKlass = this.props.prevButtonKlass || "";
    let nextButtonKlass = this.props.nextButtonKlass || "";

    let prevButtonHtml = this.props.prevButtonHtml == undefined ? "&lt;" : this.props.prevButtonHtml;
    let nextButtonHtml = this.props.nextButtonHtml == undefined ? "&gt;" : this.props.nextButtonHtml;

    while (travDateMonth != currMonth) {

      let isItSelected = travDate.toDateString() == selectedDate.toDateString();

      monthDates.push((
        <td key={travDate}
          className={`date prev-month ${dateKlass} ${isItSelected ? selectedKlass : ""}`}
          onClick={this.onDateClick.bind(this, travDate)}>{travDate.getDate()}</td>
      ));

      travDate = new Date(travDate.getTime() + day);
      travDateMonth = travDate.getMonth();
    }

    while (travDateMonth == currMonth) {
      let isItSelected = travDate.toDateString() == selectedDate.toDateString();

      let isItToday = travDate.toDateString() == new Date().toDateString();
      let todayKlass = isItToday ? "today" : "";

      monthDates.push((
        <td key={travDate}
          className={`date curr-month ${todayKlass} ${dateKlass} ${isItSelected ? selectedKlass : ""}`}
          onClick={this.onDateClick.bind(this, travDate)}>{travDate.getDate()}</td>
      ));

      travDate = new Date(travDate.getTime() + day);
      travDateMonth = travDate.getMonth();
    }

    while (travDate.getDay()) {
      let isItSelected = travDate.toDateString() == selectedDate.toDateString();

      monthDates.push((
        <td key={travDate}
          className={`date next-month ${dateKlass} ${isItSelected ? selectedKlass : ""}`}
          onClick={this.onDateClick.bind(this, travDate)}>{travDate.getDate()}</td>
      ));

      travDate = new Date(travDate.getTime() + day);
      travDateMonth = travDate.getMonth();
    }

    let datesContent = [];
    let dateIndex = 0;

    while (dateIndex < monthDates.length) {
      datesContent.push((
        <tr key={`week-${dateIndex / 7}`}
           className={`week ${weekContKlass}`}>{monthDates.slice(dateIndex, dateIndex + 7)}</tr>
      ));
      dateIndex += 7;
    }

    return (
      <div className="rc-month-calendar-cont">
        <table className={`rc-month-calendar ${containerKlass}`}>
          <thead>
            <tr className={`header month ${headerMonthKlass}`}>
              <th className={`month-button prev ${prevButtonKlass}`}
                onClick={this.prevMonth.bind(this)}
                dangerouslySetInnerHTML={{__html: prevButtonHtml}}></th>
              <th colSpan={5}
                className={`month-desc  ${monthDescKlass}`}
                onClick={this.currMonth.bind(this)}>
                {month} {year}
              </th>
              <th className={`month-button next ${nextButtonKlass}`}
                onClick={this.nextMonth.bind(this)}
                dangerouslySetInnerHTML={{__html: nextButtonHtml}}></th>
            </tr>
            <tr className={`header day-names ${headerDayKlass}`}>
              <th className={headerWeekDayKlass}>S</th>
              <th className={headerWeekDayKlass}>M</th>
              <th className={headerWeekDayKlass}>T</th>
              <th className={headerWeekDayKlass}>W</th>
              <th className={headerWeekDayKlass}>T</th>
              <th className={headerWeekDayKlass}>F</th>
              <th className={headerWeekDayKlass}>S</th>
            </tr>
          </thead>
          <tbody>
            {
              datesContent
            }
          </tbody>
        </table>
      </div>
    );
  }
}

import "./Calendar.less";

export default MonthCalendar;