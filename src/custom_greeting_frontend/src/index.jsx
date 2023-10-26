import { custom_greeting_backend } from "../../declarations/custom_greeting_backend";

window.addEventListener("load", async () => {
  const amount = await custom_greeting_backend.getBalance();
  document.getElementById("totalamount").innerText = amount;
});

document.getElementById("depositButton").addEventListener("click", async () => {
  const depositAmount = parseInt(document.getElementById("depositAmount").value) || 0;

  if (isNaN(depositAmount)) {
    alert("Please enter a valid number for the deposit amount.");
    return;
  }

  await custom_greeting_backend.topUp(depositAmount);

  const amount = await custom_greeting_backend.getBalance();
  document.getElementById("totalamount").innerText = amount;

  document.getElementById("depositAmount").value = "";
});

document.getElementById("withdrawButton").addEventListener("click", async () => {
  const withdrawAmount = parseInt(document.getElementById("withdrawAmount").value) || 0;

  if (isNaN(withdrawAmount)) {
    alert("Please enter a valid number for the withdrawal amount.");
    return;
  }

  await custom_greeting_backend.withdraw(withdrawAmount);

  const amount = await custom_greeting_backend.getBalance();
  document.getElementById("totalamount").innerText = amount;

  document.getElementById("withdrawAmount").value = "";
});

document.getElementById("passbookButton").addEventListener("click", async () => {
  const transactionList = await custom_greeting_backend.getTransactionList();
  
  const transactionTable = document.getElementById("transactionTable");
  transactionTable.innerHTML = "";

  if (transactionList.length === 0) {
    transactionTable.innerHTML = "<tr><td colspan='4'>No transactions available.</td></tr>";
  } else {
    transactionList.forEach((transaction) => {
      const transactionRow = document.createElement("tr");

      const transactionTypeCell = document.createElement("td");
      transactionTypeCell.innerText = transaction.transactionType;

      const amountCell = document.createElement("td");
      amountCell.innerText = `₹${transaction.amount}`;

      const dateCell = document.createElement("td");
      const transactionDate = new Date(Number(transaction.date)); // Convert from BigInt to Date
      if (!isNaN(transactionDate)) {
        dateCell.innerText = transactionDate.toLocaleString();
      } else {
        dateCell.innerText = "Invalid Date";
      }

      const currentAccountCell = document.createElement("td");
      currentAccountCell.innerText = `₹${transaction.currentAmount}`;

      transactionRow.appendChild(transactionTypeCell);
      transactionRow.appendChild(amountCell);
      transactionRow.appendChild(dateCell);
      transactionRow.appendChild(currentAccountCell);

      transactionTable.appendChild(transactionRow);
    });
  }
});



document.getElementById("clearButton").addEventListener("click", () => {
  const transactionTable = document.getElementById("transactionTable");
  transactionTable.innerHTML = "";
});
