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

## Documentation

#### onDateClick : `React.PropTypes.func`
Callback called when clicked on any date (receives `date` and `oldDate` as arguments - both type `Date`)

Adds `selected` class on the clicked date.
#### onMonthChange: `React.PropTypes.func`
Callback called when month changed (receives `newMonth` and `oldMonth` as arguments - both type `Date`)
#### containerKlass: `React.PropTypes.string`
class name to add on the monthe calendar top level element.
#### prevButtonKlass: `React.PropTypes.string`
class name to add on the previous month button element
#### nextButtonKlass: `React.PropTypes.string`
class name to add on the next month button element
#### prevButtonHtml: `React.PropTypes.string`
HTML to replace for previous button element (default `<`)
#### nextButtonHtml: `React.PropTypes.string`
HTML to replace for next button element (default `>`)

 

## Screenshot
![Month View](https://raw.githubusercontent.com/yogeshkhatri1989/rc-month-calendar/master/screenshots/s1.png)