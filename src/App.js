import React, { useState,useEffect }  from 'react';
import ExpenseForm from './Expenseform';
import './App.css';

function App(){
  const [expenses,setExpenses]=useState([]);
  const today=new Date().toISOString().split("T")[0];
  const [startDate,setStartDate]=useState(today);
  const [endDate,setendDate]=useState(today);
  const [filteredExpenses,setFilteredExpenses]=useState([]);
  //callback for handling new expense
  const handleAddExpense=(expense)=>{
    setExpenses((prev)=>[...prev,expense]);
  };

  useEffect(()=>{
    const filtered=expenses.filter((exp)=>{
      return exp.date>=startDate && exp.date <=endDate;
    });
    setFilteredExpenses(filtered);
  },[expenses,startDate,endDate]);

  const totalAmount=filteredExpenses.reduce(
    (sum,e)=>sum+parseFloat(e.amount),0
  );

  return(
    <div className="container">
      <header className="app-header">
        <h1>Expense Tracker</h1>
        <p>Track and manage your expense</p>
      </header>
      <div className="card">
          <ExpenseForm onAddExpense={handleAddExpense}/>
      </div>
      {/*Date filters*/}
      <div className="date-imputs">
        <div className="form-group">
            <label className="form-label">Start Date</label>
            <input 
              type="date" 
              value={startDate} 
              onChange={(e)=>setStartDate(e.target.value)} className="form-input"/>
        </div>
        <div className="form-group">
          <label className="form-label">End Date</label>
          <input type="date" value={endDate} onChange={(e)=>setendDate(e.target.value)} max={today} className="form-input"/>
        </div>
      </div>
      <div className="card">
        <h2 className="sub-header">Expense List:</h2>
        {filteredExpenses.length===0?(
          <div className="empty-state">
            No expenses found.
            </div>
        ):(
          <>
            <table className="expense-table">
              <thead>
                <tr >
                  <th>Expense Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((e,i)=>(
                  <tr key={i} >
                    <td>{e.expenseName}</td>
                    <td>${parseFloat(e.amount).toFixed(2)}</td>
                    <td >{e.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-display">
        Total:<span className="total-amount">${totalAmount.toFixed(2)}</span>
      </div>
      </>
      )}
     
    </div>
  </div>
  );
}
export default App;