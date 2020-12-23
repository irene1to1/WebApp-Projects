import React from 'react';
import Picker from './Picker.js';

/**
 * Simple component with no state.
 *
 * See the basic-react from lecture 11 for an example of adding and
 * reacting to changes in state.
 */
class App extends React.Component {
  /**
   * Create a date picker
   * @param {string} props
   */
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      valueDate: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * @param {object} event update
   */
  handleChange(event) {
    // console.log(event.target.value);
    this.setState({value: event.target.value});
  }
  /**
   * @param {object} event update
   */
  handleSubmit(event) {
    const {value} = this.state;
    this.setState({valueDate: value});
    event.preventDefault();
  }

  /**
   * @return {object} a <div> containing an <h2>
   */
  render() {
    const {valueDate} = this.state;
    return (
      <div>
        <h2 id='welcome'>CSE183 Assignment 5 - React I</h2>
        <Picker value = {valueDate}/>
        <form onSubmit={this.handleSubmit}>
          <input type='date' id='date' onChange={this.handleChange} />
          <input type="submit" id='set' value="Set"/>
        </form>
      </div>
    );
  }
}

export default App;
