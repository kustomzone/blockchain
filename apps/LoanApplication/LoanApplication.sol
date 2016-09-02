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
    bool hasGreenScore;
    bool isManualProcessNeeded; // If false, let the smart contract handle everything
    
    // Flags
    uint green = 75;
    uint yellow = 50;
    
    event GetCreditScore(string ssn);
    event ScoreFinished(uint score);
    
    function LoanApplication() public   // The constructor. 
    {
        lenderAddress = msg.sender;
        score = 0; // no score yet
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
        GetCreditScore(ssn);
    }
    

    function setScore(uint _score)
    {
        score = _score;
        
        if(score >= green)
        {
            hasGreenScore = true;
            isManualProcessNeeded = false;
        } else if (score >= yellow)
        {
            hasGreenScore = false;
            isManualProcessNeeded = true;
        } else
        {
            hasGreenScore = false;
            isManualProcessNeeded = false;
        }
        ScoreFinished(score);
    }
    
    function getScore() constant returns (uint score)
    {
        return score;
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