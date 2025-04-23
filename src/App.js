import React, { useState,useEffect }  from 'react';
import ExpenseForm from './Expenseform';
import './App.css';

const categories=['Food','Transportation','Housing','Entertainment','Other'];

function App(){
  const [expenses,setExpenses]=useState([]);
  const today=new Date().toISOString().split("T")[0];
  const [startDate,setStartDate]=useState(today);
  const [endDate,setendDate]=useState(today);
  const [filteredExpenses,setFilteredExpenses]=useState([]);
  const [selectedCategory, setSelectedCategory]=useState('All');
  //callback for handling new expense
  const handleAddExpense=(expense)=>{
    setExpenses((prev)=>[...prev,expense]);
  };

  useEffect(()=>{
    const filtered=expenses.filter((exp)=>{
      const dateInRange=exp.date>=startDate && exp.date <=endDate;
      const categoryMatch=selectedCategory==='All'|| exp.category===selectedCategory;
      return dateInRange && categoryMatch;
    });
    setFilteredExpenses(filtered);
  },[expenses,startDate,endDate,selectedCategory]);

  const totalAmount=filteredExpenses.reduce(
    (sum,e)=>sum+parseFloat(e.amount),0
  );
  const categoryStats=categories.map(cat=>{
    const catTotal=filteredExpenses
    .filter(e=>e.category===cat)
    .reduce((sum,e)=>sum+parseFloat(e.amount),0);
  const percentage=totalAmount>0? ((catTotal/totalAmount)*100).toFixed(2):0;
  return {category:cat, total:catTotal,percentage};
  });
  return(
    <div className="container">
      <header className="app-header">
        <h1>Expense Tracker</h1>
        <p>Track and manage your expense</p>
      </header>
      <div className="card">
          <ExpenseForm onAddExpense={handleAddExpense} categories={categories}/>
      </div>
      {/*Date filters*/}
      <div className="filter-section">
        <div className="date-inputs">
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
          <div className="form-group">
            <label className="form-label">Category</label>
            <select 
              value={selectedCategory}
              onChange={(e)=>setSelectedCategory(e.target.value)}
              className="form-input">
              <option value="All">All Categories</option>
              {categories.map((cat)=>(
                <option key={cat} value={cat}>{cat}</option>
              ))}
              </select>
          </div>
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
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((e,i)=>(
                  <tr key={i} >
                    <td>{e.expenseName}</td>
                    <td>${parseFloat(e.amount).toFixed(2)}</td>
                    <td >{e.date}</td>
                    <td>{e.category}</td>
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
    {/*Category SUmmary*/}
    {filteredExpenses.length>0 &&(
      <div className="card">
        <h2 className="sub-header">Category summary</h2>
        <ul className="category-summary-list">
          {categoryStats.map(stat=>(
            stat.total>0 &&(
              <li key={stat.category} className="category-summary-item">
                <strong>{stat.category}</strong>:${stat.total.toFixed(2)}({stat.percentage}% of total)
              </li>
            )
          ))}
        </ul>
    </div>
    )}
  </div>
  );
}
export default App;