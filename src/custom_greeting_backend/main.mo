import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Text "mo:base/Text";

actor DBank {
  var currentValue: Float = 300;
  
  type Passbook = {
    transactionType: Text;
    amount: Float;
    date: Time.Time;
    currentAmount: Float; 
  };

  var transactions: [Passbook] = [];

  public func topUp(amount: Float) {
    let date = Time.now;
    currentValue += amount;
    let passbook: Passbook = {
      transactionType = "Deposit";
      amount = amount;
      date = Time.now()/1000000;
      currentAmount = currentValue; 
    };
    transactions := Array.append<Passbook>(transactions, [passbook]);
    Debug.print(debug_show(currentValue));
  };

  public func withdraw(amount: Float) {
    if (currentValue - amount >= 0) {
      let date = Time.now;
      currentValue -= amount;
      let passbook: Passbook = {
        transactionType = "Withdrawal";
        amount = amount;
        date = Time.now()/1000000;
        currentAmount = currentValue; // Store the current total
      };
      transactions := Array.append<Passbook>(transactions, [passbook]);
      Debug.print(debug_show(currentValue));
    } else {
      Debug.print("Not enough money in the account");
    }
  };

  public query func getBalance(): async Float {
    return currentValue;
  };

  public query func getTransactionList(): async [Passbook] {
    return transactions;
  };
}
