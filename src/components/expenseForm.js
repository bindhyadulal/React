import {useForm} from 'react-hook-form';
import { useState } from 'react';
const ExpenseForm=()=>{
    const {register, handleSubmit, formState: {errors}, reset}=useForm();
    const [expenses, setExpenses]=useState([]);
    const today=new Date().toISOString().split('T')[0];
    const onSubmit=(data)=>{
        const newExpense={
            id:Date.now(),
            ...data,
            amount: parseFloat(data.amount),
            date: new Date(data.date).toLocaleDateString()
        };
        setExpenses([...expenses,newExpense]);
        reset();
    };
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/*Name */}
                <div>
                    <label>Expense Name</label>
                    <input type="text"{...register('name',{required:'Expense name is required'})}/>
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                {/*Amount*/}
                <div>
                    <label>Amount No.</label>
                    <input type="number" step="0.01" {...register('amount',{required:'Amount is required',
                        min:{
                            value:0.01,
                            message:'Amopunt must be positive'
                        }
                    })}/>
                    {errors.amount && <p>{errors.amount.message}</p>}
                </div>

                {/* Date Field*/}
                <div>
                    <label>Date</label>
                    <input type="date" max={today}
                        {...register('date',{required:'Date is required'})}/>
                    {errors.data && <p>{errors.date.message}</p>}
                </div>
                <button type="submit">Add Expense</button>
            </form>
            
        </div>
    );
}
export default ExpenseForm;
