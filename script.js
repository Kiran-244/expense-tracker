document.getElementById('expense-form').addEventListener('submit', addExpense);

function addExpense(event) {
    event.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (description && amount) {
        const expense = { description, amount };
        saveExpense(expense);
        renderExpense(expense);
        updateTotal(amount);
        
        // Clear the form fields
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
    }
}

function renderExpense(expense) {
    const expenseList = document.getElementById('expense-list');
    const li = document.createElement('li');
    li.textContent = `${expense.description}: ₹${expense.amount.toFixed(2)}`; // Use ₹ for rupees
    expenseList.appendChild(li);
}

function updateTotal(amount) {
    const totalElement = document.getElementById('total');
    const currentTotal = parseFloat(totalElement.textContent.replace('₹', '').trim()); // Remove ₹ for parsing
    const newTotal = currentTotal + amount;
    totalElement.textContent = `₹${newTotal.toFixed(2)}`; // Display total in rupees
}

function saveExpense(expense) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_expense.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(expense));
}
