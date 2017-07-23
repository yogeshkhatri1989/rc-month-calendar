import React, { Component } from 'react';
import ReactDom from 'react-dom';

import MonthCalendar from './Calendar';

class App extends Component {
  render() {
    return <MonthCalendar
      headerDayKlass={"cal-header-day"}
      headerWeekDayKlass={"cal-week-day"}
      weekContKlass={"cal-week-cont"}
      containerKlass={"cal-container"}
      headerMonthKlass={"cal-header-month"}
      monthDescKlass={"cal-month-desc"}
      prevButtonKlass={"cal-prev-button"}
      nextButtonKlass={"cal-next-button"}
      disabledDateKlass={"cal-disabled-date"}
      enabledDateKlass={"cal-enabled-date"}
      dateKlass={"cal-date"}
      prevButtonHtml={"<<"}
      nextButtonHtml={">>"}
      onDateClick={console.log}
      isDateEnabled={date => date.getDate() == new Date().getDate()}
      selectedDate={new Date(Date.now() - 4 * 1000 * 60 * 60 * 24)}
      onMonthChange={console.log} />
  }
}

function enabledDates() {
  return [new Date, new Date(Date.now() - 3 * 1000 * 60 * 60 * 24)]
}

import "./Calendar.less";
import "./style.less";


ReactDom.render(<App />, document.getElementById("app"));