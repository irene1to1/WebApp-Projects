import React from 'react';
import PropTypes from 'prop-types';
import './Picker.css';
let newValue = new Date();
/**
 * Simple component with no state.
 *
 * See the basic-react from lecture 11 for an example of adding and
 * reacting to changes in state.
 */
class Picker extends React.Component {
  /**
   * Create a date picker
   * @param {string} props
   */
  constructor(props) {
    super(props);
    const date = new Date();
    const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const w = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.state = {
      thisMonth: date.getMonth(),
      thisYear: date.getFullYear(),
      week: w,
      months: m,
      current: date,
    };
    this.setDate = this.setDate.bind(this);
  }
  /**
   * @param {object} prevProps update
   */
  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      const temp = new Date(this.props.value);
      this.setDate(temp);
    }
  }
  /**
   * @param {object} newDate update
   */
  setDate(newDate) {
    this.setState({current: newDate});
    newDate.setDate(newDate.getDate()+1);
    newValue = newDate;
    this.update(newDate);
  }
  /**
   * @param {object} current update
   */
  update(current) {
    this.setState({
      thisMonth: current.getMonth(),
      thisYear: current.getFullYear(),
    });
  }
  /**
   * @return {object} a <div> containing an <h2>
   */
  render() {
    // console.log(this);
    const prev = '<';
    const next = '>';
    const {thisMonth, thisYear, months, week, current} = this.state;
    const days = [];
    for (const [index, value] of week.entries()) {
      days.push(<div key={index}>{value}</div>);
    }
    const first = new Date(
        thisYear, thisMonth, 1,
    ).getDay();
    const last = new Date(
        thisYear, thisMonth+1, 0,
    ).getDate();
    const dates = [];
    let temp = first;
    for (let i = 0; i<first; i++) {
      dates.push(<div id={'d'+i}></div>);
    }
    for (let j = 1; j <= last; j++) {
      if (j=== newValue.getDate() && thisMonth === newValue.getMonth()) {
        dates.push(<div className="today" id='today'>{j}</div>);
      } else {
        dates.push(<div id={'d'+temp}>{j}</div>);
      }
      temp++;
    }
    for (let k = temp; k < 42; k++) {
      dates.push(<div id={'d'+k}></div>);
    }
    return (
      <div id='cal' className='calendar'>
        <div className='month'>
          <h1 id='prev' onClick={()=> {
            current.setMonth(current.getMonth()-1);
            this.update(current);
          }
          }
          >{prev}</h1>
          <div id='display'>
            <h1>{months[thisMonth]+' '+thisYear}</h1>
          </div>
          <h1 id='next' onClick={()=> {
            current.setMonth(current.getMonth()+1);
            this.update(current);
          }
          }
          >{next}</h1>
        </div>
        <div className='weekdays'>
          {days}
        </div>
        <div className='date'>
          {dates}
        </div>
      </div>
    );
  }
}

Picker.propTypes = {
  value: PropTypes.string,
};

export default Picker;
