import React, { Component } from 'react';
import ReactDom from 'react-dom';

import MonthCalendar from './Calendar';

class App extends Component {
  render() {
    return <MonthCalendar
      containerClass={"cal-container"}
      prevButtonClass={"cal-prev-button"}
      nextButtonClass={"cal-next-button"}
      disabledDateClass={"cal-disabled-date"}
      enabledDateClass={"cal-enabled-date"}
      dateClass={"cal-date"}
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