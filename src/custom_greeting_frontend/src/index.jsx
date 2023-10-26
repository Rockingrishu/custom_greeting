import { custom_greeting_backend } from "../../declarations/custom_greeting_backend";

window.addEventListener("load", async () => {
  
  const amount= await custom_greeting_backend.getBalance();
  document.getElementById("totalamount").innerText = amount;
});


document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const inputAmount = parseInt(document.getElementById("depositAmount").value) || 0;
  const withdrawAmount = parseInt(document.getElementById("withdrawAmount").value) || 0;

  // Check if input values are valid numbers
  if (isNaN(inputAmount) || isNaN(withdrawAmount)) {
    alert("Please enter valid numbers for deposit and withdrawal amounts.");
    return;
  }

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  await custom_greeting_backend.topUp(inputAmount);
  await custom_greeting_backend.withdraw(withdrawAmount);
  button.removeAttribute("disabled");

  const amount= await custom_greeting_backend.getBalance();

  document.getElementById("totalamount").innerText = amount;

  document.getElementById("depositAmount").value = "";
  document.getElementById("withdrawAmount").value = "";

  return false;
});

document.getElementById("passbookButton").addEventListener("click", async () => {
  const transactionList = await custom_greeting_backend.getTransactionList();
  const transactionListSection = document.getElementById("transactionList");

  // Clear the transaction list section
  transactionListSection.innerHTML = "";

  if (transactionList.length === 0) {
    transactionListSection.innerText = "No transactions available.";
  } else {
    // Create a list to display transactions
     const transactionListUl = document.createElement("ul");

    transactionList.forEach((transaction) => {
      const transactionItem = document.createElement("li");
      const transactionDate = new Date(transaction.timestamp);
      const transactionType = transaction.amount > 0 ? "Deposit" : "Withdrawal";

      transactionItem.innerText = `${transactionType} - ₹${transaction.amount} on ${transactionDate.toLocaleDateString()}`;
      transactionListUl.appendChild(transactionItem);
    });


    transactionListSection.appendChild(transactionListUl);
  }
});
