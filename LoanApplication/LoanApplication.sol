/* 
    A loan application solidity contract.
    The following creates a loan process, and processes multiple steps in a loan application.
*/

contract LoanApplication      // The contract definition. A constructor of the same name will be automatically called on contract creation. {
{
    address lenderAddress;    
    
    // Lender personalia
    string ssn;
    string firstName;
    string lastName;
    
    // Loan
    uint loanAmount;
    uint loanMaturity; // nedbetalingstid
    uint interest;
    
    // Credit score
    uint score; // Red < 50, Yellow (Manual process) < 75, Green >= 75
    
    // Status
    bool hasJob;
    bool hasGreenScore;
    bool isManualProcessNeeded; // If false, let the smart contract handle everything
    
    
    function LoanApplication() public   // The constructor. It accepts a string input and saves it to the contract's "greeting" variable.
    {
        lenderAddress = msg.sender;
        score = 0; // no score yet
        hasJob = false;
        hasGreenScore = false;
        isManualProcessNeeded = false;
    }


    function setPersonalia(string _ssn, string _firstName, string _lastName)       
    {
        ssn = _ssn;
        firstName = _firstName;
        lastName = _lastName;
    }
    
    
    function setLoan(uint _loanAmount, uint _loanMaturity, uint _interest) 
    {
        loanAmount = _loanAmount;
        loanMaturity = _loanMaturity;
        interest = _interest;
    }
    
     /**********
     Standard kill() function to recover funds 
     **********/
    
    function kill()
    { 
        if (msg.sender == lenderAddress)
            suicide(lenderAddress);  // kills this contract and sends remaining funds back to creator
    }

}