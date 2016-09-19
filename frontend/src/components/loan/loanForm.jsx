const React = require('react');

import { Link } from 'react-router';

export default class LoanForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      maturity: 0,
      interest: 0
    }
  }

  handleChange(name, e) {
      var change = {};
      change[name] = e.target.value;
      this.setState(change);
    }

  submitLoan() {
    var loanData = {
      amount: this.state.amount,
      maturity: this.state.maturity,
      interest: this.state.interest
    };
    console.log("Submitting loan data: " + loanData.amount + ", maturity: " + loanData.maturity + ", interest: " + loanData.interest);
    setTimeout(function() {
      fetch("http://40.68.251.181:1338", {
          	method: 'POST',
          	mode: 'no-cors',
          	redirect: 'follow',
          	headers: new Headers({
          		'Content-Type': 'application/json'
          	}),
            body: JSON.stringify(loanData)
      });
    }, 2000);
  }

  render() {
    return (
      <div className="loanform">
        <label>Amount</label>
        <input type="number" value={this.state.amount ? this.state.amount : ""} onChange={this.handleChange.bind(this, 'amount')} />
        <label>Maturity</label>
        <input type="number" value={this.state.maturity ? this.state.maturity : ""} onChange={this.handleChange.bind(this, 'maturity')}/>
        <label>Interest</label>
        <input type="number" value={this.state.interest ? this.state.interest : ""} onChange={this.handleChange.bind(this, 'interest')}/>
        <div className="next-button">
          <Link to={'score'} onClick={this.submitLoan.bind(this)} className="button next">Next</Link>
        </div>
      </div>
    );
  }
}
