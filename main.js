import React, { Component } from 'react';
import ReactDom from 'react-dom';

import MonthCalendar from './Calendar';

class App extends Component {
  render() {
    return <MonthCalendar />
  }
}

import "./style.less";

ReactDom.render(<App />, document.getElementById("app"));