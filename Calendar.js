import React, { Component } from 'react';

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let day = 1000 * 60 * 60 * 24;

class MonthCalendar extends Component {

  constructor(props) {
    
    super(props);

    let date = this.props.date instanceof Date ? this.props.date : new Date();
    date.setHours(0, 0, 0, 0);

    this.state = {
      selDate: date
    }
    
  }

  nextMonth() {

    let selDate = this.state.selDate;
    let selMonth = selDate.getMonth();

    let newSelDate = new Date(selDate.getTime() + (day * (selDate.getDate() < 15 ? 30 : 20)));

    this.setState({
      selDate: newSelDate
    });
  }

  currMonth() {
    this.setState({
      selDate: new Date()
    });
  }

  prevMonth() {

    let selDate = this.state.selDate;
    let selMonth = selDate.getMonth();

    let newSelDate = new Date(selDate.getTime() - (day * (selDate.getDate() > 15 ? 30 : 20)));

    this.setState({
      selDate: newSelDate
    });
  }

  render() {

    let selDate = this.state.selDate;
    let month = months[selDate.getMonth()];
    let year = selDate.getFullYear();

    let currMonth = selDate.getMonth();

    let firstDate = new Date(selDate.getTime() - (day * (selDate.getDate() - 1)));
    let firstDay = firstDate.getDay();

    let currDate = new Date(firstDate.getTime() - (day * firstDay));
    let currDateMonth = currDate.getMonth();

    let monthDates = [];

    while (currDateMonth != currMonth) {
      monthDates.push((
        <td key={currDate}
          className="date prev-month">{currDate.getDate()}</td>
      ));

      currDate = new Date(currDate.getTime() + day);
      currDateMonth = currDate.getMonth();
    }

    while (currDateMonth == currMonth) {
      let isItToday = currDate.toDateString() == new Date().toDateString();
      let todayKlass = isItToday ? "today" : "";

      monthDates.push((
        <td key={currDate}
          className={`date curr-month ${todayKlass}`}>{currDate.getDate()}</td>
      ));

      currDate = new Date(currDate.getTime() + day);
      currDateMonth = currDate.getMonth();
    }

    while (currDate.getDay()) {
      monthDates.push((
        <td key={currDate}
          className="date next-month">{currDate.getDate()}</td>
      ));

      currDate = new Date(currDate.getTime() + day);
      currDateMonth = currDate.getMonth();
    }

    let datesContent = [];
    let dateIndex = 0;

    while (dateIndex < monthDates.length) {
      datesContent.push((
        <tr key={`week-${dateIndex / 7}`}
           className="week">{monthDates.slice(dateIndex, dateIndex + 7)}</tr>
      ));
      dateIndex += 7;
    }

    return (
      <div className="rc-month-calendar-cont">
        <table className={`rc-month-calendar ${this.props.containerKlass}`}>
          <thead>
            <tr className="header month">
              <th className="month-button prev" onClick={this.prevMonth.bind(this)}>&lt;</th>
              <th colSpan={5} className="month" onClick={this.currMonth.bind(this)}>
                {month} {year}
              </th>
              <th className="month-button prev" onClick={this.nextMonth.bind(this)}>&gt;</th>
            </tr>
            <tr className="header day-names">
              <th className="day">S</th>
              <th className="day">M</th>
              <th className="day">T</th>
              <th className="day">W</th>
              <th className="day">T</th>
              <th className="day">F</th>
              <th className="day">S</th>
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