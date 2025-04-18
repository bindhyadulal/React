import React from "react";
import { useForm,Controller } from "react-hook-form";

export default function ExpenseForm({onAddExpense}){
    const{control,handleSubmit,formState:{errors},reset,}=useForm();


    const onSubmit=(data)=>{
        onAddExpense(data);   //for passing new expense to parent
        reset();
    };

    //for not selecting future dates
    const today=new Date().toISOString().split("T")[0];
return(
    <form onSubmit={handleSubmit(onSubmit)}>
        {/*ExpenseName*/}
        <div>
            <label>Expense Name:</label>
            <Controller
                name="expenseName"
                control={control}
                rules={{required:"Name is required"}}
                render={({field})=>(
                    <input type="text" {...field}/>
                )}
                />
                {errors.expenseName && <p>{errors.expenseName.message}</p>}
        </div>
        {/*Amount*/}
        <div>
            <label>Amount</label>
            <Controller
                name="amount"
                control={control}
                rules={{required:"Amount is required", validate:(value)=>parseFloat(value)>0 || "Amount must be positive",}}
                render={({field})=>(
                    <input type="number" step="0.01" {...field}/>
                )}
                />
                {errors.amount && (<p>{errors.amount.message}</p>)}
        </div>
        {/*Date*/}
        <div>
            <label>Date:</label>
            <Controller
                name="date"
                control={control}
                rules={{required:"Date is required"}}
                render={({field})=>(
                    <input type="date" max={today} {...field}/>
                )}
                />
                {errors.date && (<p>{errors.date.message}</p>)}
        </div>
        {/* Submit Button*/}
        <button type="submit">Add Expense</button>
    </form>
)
}