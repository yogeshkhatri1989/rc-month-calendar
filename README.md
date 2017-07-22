# rc-month-calendar

A simple react component to show and navigate calendar month view. 

## Installation
```
npm install rc-month-calendar --save
```

## Usage
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import MonthCalendar from 'rc-month-calendar';
import "rc-month-calendar/dist/calendar.css";

class App extends React.Component {
  render() {
      return <MonthCalendar />
    }
}
ReactDOM.render(<App/>, document.getElementById('container'));
```

## Screenshot
![Month View](https://raw.githubusercontent.com/yogeshkhatri1989/rc-month-calendar/master/screenshots/s1.png)