const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Load data from localStorage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  updateLocalStorage();
  render();

  text.value = "";
  amount.value = "";
}

// Delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  render();
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Render UI
function render() {
  list.innerHTML = "";

  let amounts = transactions.map(t => t.amount);

  let total = amounts.reduce((acc, item) => acc + item, 0);
  let inc = amounts.filter(a => a > 0).reduce((acc, a) => acc + a, 0);
  let exp = amounts.filter(a => a < 0).reduce((acc, a) => acc + a, 0);

  balance.innerText = total;
  income.innerText = inc;
  expense.innerText = Math.abs(exp);

  transactions.forEach(t => {
    const li = document.createElement("li");
    li.classList.add(t.amount > 0 ? "plus" : "minus");

    li.innerHTML = `
      ${t.text} ₹${t.amount}
      <button onclick="deleteTransaction(${t.id})">❌</button>
    `;

    list.appendChild(li);
  });
}

// Event
form.addEventListener("submit", addTransaction);

// Initial load
render();