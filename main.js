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
      dateKlass={"cal-date"}
      prevButtonHtml={"cal-next"}
      nextButtonHtml={"cal-prev"}
      onDateClick={console.log}
      onMonthChange={console.log} />
  }
}

import "./Calendar.less";
import "./style.less";


ReactDom.render(<App />, document.getElementById("app"));