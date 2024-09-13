import React, { useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    date: "",
    type: "Expense", // Default type
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Add new expense or update existing one
  const handleSaveExpense = () => {
    if (isEditing) {
      setExpenses(
        expenses.map((expense) =>
          expense.id === editId ? { ...expense, ...newExpense } : expense
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
    }
    setNewExpense({ title: "", amount: "", date: "", type: "Expense" });
  };

  // Delete expense
  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Edit expense
  const handleEditExpense = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    setNewExpense({
      title: expenseToEdit.title,
      amount: expenseToEdit.amount,
      date: expenseToEdit.date,
      type: expenseToEdit.type,
    });
    setIsEditing(true);
    setEditId(id);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>

      {/* Add or Edit Expense Form */}
      <div className="bg-white p-4 rounded shadow-md mb-4">
        <input
          className="border p-2 mr-2 mb-2"
          type="text"
          placeholder="Title"
          value={newExpense.title}
          onChange={(e) =>
            setNewExpense({ ...newExpense, title: e.target.value })
          }
        />
        <input
          className="border p-2 mr-2 mb-2"
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) =>
            setNewExpense({ ...newExpense, amount: e.target.value })
          }
        />
        <input
          className="border p-2 mr-2 mb-2"
          type="date"
          placeholder="Date"
          value={newExpense.date}
          onChange={(e) =>
            setNewExpense({ ...newExpense, date: e.target.value })
          }
        />
        <select
          className="border p-2 mr-2 mb-2"
          value={newExpense.type}
          onChange={(e) =>
            setNewExpense({ ...newExpense, type: e.target.value })
          }
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleSaveExpense}
        >
          {isEditing ? "Update Expense" : "Add Expense"}
        </button>
      </div>

      {/* Expense List */}
      <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Expenses</h2>
        {expenses.length > 0 ? (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-b">
                  <td className="px-4 py-2">{expense.title}</td>
                  <td className="px-4 py-2">${expense.amount}</td>
                  <td className="px-4 py-2">{expense.date}</td>
                  <td
                    className={`px-4 py-2 ${
                      expense.type === "Income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {expense.type}
                  </td>
                  <td className="px-4 py-2 flex">
                    <button
                      className="bg-yellow-400 text-white px-2 py-1 mr-2 rounded"
                      onClick={() => handleEditExpense(expense.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteExpense(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No expenses yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
