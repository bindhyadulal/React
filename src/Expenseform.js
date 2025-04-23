import React from "react";
import { useForm,Controller } from "react-hook-form";
import './App.css';
function ExpenseForm({onAddExpense,categories}){
    //for not selecting future dates
    const today=new Date().toISOString().split("T")[0];    
    
    const onSubmit=(data)=>{
        onAddExpense(data);   //for passing new expense to parent
        reset();
    };

    const{
        control,
        handleSubmit,
        reset,
        formState:{errors},
    }=useForm({
        defaultValues:{
            expenseName:"",
            amount:"",
            date:"",
            category:"",
        },
    });
   
return(
    <form onSubmit={handleSubmit(onSubmit)} className="form-group">
        {/*ExpenseName*/}
        <div className="form-group">
            <label className="form-label">Expense Name:</label>
            <Controller
                name="expenseName"
                control={control}
                rules={{required:"Name is required"}}
                render={({field})=>(
                    <input type="text" {...field} className="form-input" placeholder="Enter expense name"/>
                )}
                />
                {errors.expenseName && <span className="error-message">{errors.expenseName.message}</span>}
        </div>
        {/*Amount*/}
        <div className="form-group">
            <label className="form-label">Amount</label>
            <Controller
                name="amount"
                control={control}
                rules={{required:"Amount is required", validate:(value)=>parseFloat(value)>0 || "Amount must be positive",}}
                render={({field})=>(
                    <input type="number" step="0.01" {...field} className="form-input" placeholder="0.00"/>
                )}
                />
                {errors.amount && (<span className="error-message">{errors.amount.message}</span>)}
        </div>
        {/*Date*/}
        <div className="form-group">
            <label className="label">Date:</label>
            <Controller
                name="date"
                control={control}
                rules={{required:"Date is required"}}
                render={({field})=>(
                    <input type="date" max={today} {...field} className="form-input"/>
                )}
                />
                {errors.date && (<span className="error-message">{errors.date.message}</span>)}
        </div>
        <div className="form-group">
            <label className="form-label">Category</label>
            <Controller
                name="category"
                control={control}
                rules={{required:"Category is required"}}
                render={({field})=>(
                    <select {...field} className="form-input">
                        <option value="">Select a category</option>
                        {categories.map((cat)=>(
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                )}
            />
            {errors.category && (<span className="error-message">{errors.category.message}</span>)}
        </div>
        {/* Submit Button*/}
        <button type="submit" className="submit-button">Add Expense</button>
    </form>
)
}

export default ExpenseForm;