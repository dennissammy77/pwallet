import moment from 'moment';
import { AddIcon, DeleteIcon, EditIcon, FilterIcon,CalendarIcon } from '../components/icons'
import React, { useState } from 'react';
import ModalFormComponent from '../components/Modal';

export default function Transactions() {
    const [searchQuery, setsearchQuery] = useState("");
    const [transactions,setTransactions]=useState([
        {
            id: 1,
            type: "income",
            name: "Monthly Salary",
            amount: 75000,
            wallet: "Bank",
            category: "Salary",
            subcategory: "Basic",
            date: "2025-04-01T09:00:00Z",
            notes: "April salary"
        },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className='py-2'>
            <div className="d-flex flex-row justify-content-between my-2">
                <h1 className="text-2xl font-bold text-blue-600 custom-color-dark fw-bold">Transactions</h1>
                <div className="d-flex flex-row gap-2 align-items-center">
                    <input type="search" placeholder='search transactions' className='form-control form-control-sm' onChange={(e)=>{setsearchQuery(e.target.value)}}/>
                    <button className="btn btn-sm btn-light fw-bold d-flex flex-row align-items-center gap-2"><CalendarIcon/>Date</button>
                    <button className="btn btn-sm custom-bg-secondary custom-color-primary fw-bold d-flex flex-row align-items-center gap-2"><FilterIcon/>Filter</button>
                    <button className='btn btn-sm custom-bg-primary custom-color-secondary fw-bold d-flex flex-row align-items-center gap-2' onClick={showModal}><AddIcon/>New</button>
                </div>
            </div>
            {transactions.length === 0 && (
                    <div className='d-flex flex-row justify-content-center align-items-center' style={{height: "100vh"}}>
                        <p>No transactions Found!</p>
                    </div>
                )
            }
            {(transactions && transactions.length > 0) && (
                <div className='table-responsive-sm my-4'>
                    <table className="table rounded shadow table-bordered bg-white table-hover" >
                        <thead className="">
                            <tr className=''>
                                <th className='w-20'>Title</th>
                                <th className='w-20'>Description</th>
                                <th className='w-20'>Amount</th>
                                <th className='w-20'>Date</th>
                                <th className='w-20'>Wallet</th>
                                <th className='w-20'>Type</th>
                                <th className='w-20'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {transactions.filter((transaction)=>transaction.name.toLowerCase().includes(searchQuery.toLowerCase())).map((transaction)=>{
                                return(
                                    <tr key={transaction.id}>
                                        <th style={{width:'200px'}}>{transaction.category}</th>
                                        <td style={{width:'200px'}}>{transaction.name}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{moment(transaction.date).format("MMM Do YY")}</td>
                                        <td>{transaction.wallet}</td>
                                        <td><span className={`badge custom-bg-${transaction.type === 'income' ? 'secondary' : 'primary' } p-1`}>{transaction.type}</span></td>
                                        <td style={{width:'200px'}}>
                                            <div className='d-flex flex-row gap-2'>
                                                <button className='btn btn-sm btn-outline-dark gap-2 align-items-center'><EditIcon/>Manage</button>
                                                <button className='btn btn-sm btn-danger gap-2 align-items-center'><DeleteIcon/>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot className='bg-white'>
                            <tr>
                                <td>
                                    <div className='d-flex flex-row gap-2 my-1 px-2'>
                                        <button className='btn btn-sm btn-light p-2'>prev</button>
                                        <div className='d-flex flex-row align-items-center gap-2'>
                                            <p>1</p>
                                            <p>of</p>
                                            <p>2</p>
                                        </div>
                                        <button className='btn btn-sm btn-light p-2'>next</button>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                )
            }
            <ModalFormComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setTransactions={setTransactions}/>
        </div>
    )
};