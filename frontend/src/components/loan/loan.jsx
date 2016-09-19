const React = require('react');
import 'design/components/user';

import LoanForm from './loanForm';

export default class Loan extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return(
      <div className="loan-data">
        <LoanForm />
      </div>
    )
  }
}
