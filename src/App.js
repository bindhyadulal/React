import React, { useState,useEffect }  from 'react';
import ExpenseForm from './Expenseform';
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
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={handleAddExpense}/>

      {/*Date filters*/}
      <label>Start Date</label>
      <input 
        type="date" 
        value={startDate} 
        onChange={(e)=>setStartDate(e.target.value)}/>

      <label>End Date</label>
      <input type="date" value={endDate} onChange={(e)=>setendDate(e.target.value)} max={today}/>
      <h2>Expense List:</h2>
      {filteredExpenses.length===0?(
        <p>No expenses to show.</p>
      ):(
        <table border="1" cellPadding="5" style={{marginTop:"1rem"}}>
          <thead>
            <tr>
              <th>Expense Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((e,i)=>(
              <tr key={i}>
                <td>{e.expenseName}</td>
                <td>${parseFloat(e.amount).toFixed(2)}</td>
                <td>{e.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
      {/*Total Displaying*/}
      Total:${totalAmount.toFixed(2)}
    </div>
  );
}
export default App;