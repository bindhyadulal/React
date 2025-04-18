import React, { useState }  from 'react';
import ExpenseForm from './Expenseform';
function App(){
  const [expenses,setExpenses]=useState([]);


  //callback for handling new expense
  const handleAddExpense=(newExpense)=>{
    setExpenses((prevExpenses)=>[...prevExpenses,newExpense]);
  }
  return(
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={handleAddExpense}/>
      <h2>Expense List:</h2>
      {expenses.length==0?(
        <p>No expenses added till now.</p>
      ):(
        <ul>{expenses.map((expense,index)=>(
          <li key={index}>{expense.expenseName}-${expense.amount}<br/>
            {expense.date}</li>
      ))}
      </ul>
      )}
    </div>
  );
}
export default App;