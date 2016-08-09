contract DrinkVoucher {
    uint public vouchers;
    uint public dealtVouchers;
    uint public defaultVouchers;
    address public organizer;
    mapping (string => participantInfo) participant;
    
    function DrinkVoucher() {
        organizer = msg.sender;
        vouchers = 100;
        dealtVouchers = 0;
        defaultVouchers = 3;
    }
    
    struct participantInfo {
        uint points;
    }
    
    function registerParticipant(string name, uint extraPoints) returns (address result) {
        if (dealtVouchers <= (vouchers - (defaultVouchers + extraPoints))) {
            dealtVouchers = defaultVouchers + extraPoints;
            participant[name].points = dealtVouchers;
        }
        else return;
    }
    
    function getVouchersForParticipant(string searchedParticipant) returns (uint vouchers) {
        uint points = participant[searchedParticipant].points;
        return points;
    }
    
    function buyDrink(string buyer, uint price) returns (uint remainingVouchers) {
        uint points = participant[buyer].points;
        if (price <= points) {
            uint remaining = points - price;
        }
        return remaining;
    }
    
    function changeTotalVouchers(uint newTotal) returns (uint newTotalVounchers){
        if (msg.sender != organizer) return;
        vouchers = newTotal;
        return vouchers;
    }
}