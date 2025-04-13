import moment from 'moment';
import { AddIcon, DeleteIcon, EditIcon, FilterIcon,CalendarIcon } from '../components/icons'
import React, { useState } from 'react';
import ModalFormComponent from '../components/Modal';

export default function Transactions() {
    const [searchQuery, setsearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");
    const [transactionToEdit, setTransactionToEdit] = useState('');
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
    const handleDeleteTransaction=(transactionId)=>{
        setTransactions(prev =>
            prev.filter(transaction => transaction.id !== transactionId)
        );
    };
    const handleSortByName = (order) => {
        const sorted = [...transactions].sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (order === 'asc'){
                return nameA.localeCompare(nameB);
            }else {
                return nameB.localeCompare(nameA);
            }
        });
      
        setTransactions(sorted);
    };
    const handleEditTransaction = (transaction)=>{
        console.log(transaction)
        setTransactionToEdit(transaction);
        showModal()
    }

    return (
        <div className='py-2'>
            <div className="d-none flex-row justify-content-between my-2">
                <h1 className="text-2xl font-bold text-blue-600 custom-color-dark fw-bold">Transactions</h1>
                <div className="d-flex flex-row gap-2 align-items-center">
                    <input type="search" placeholder='search transactions' className='form-control form-control-sm' onChange={(e)=>{setsearchQuery(e.target.value)}}/>
                    <div className="dropdown">
                        <button
                            className="btn btn-sm btn-light fw-bold d-flex flex-row align-items-center gap-2 dropdown-toggle"
                            type="button"
                            id="dateDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <CalendarIcon /> Date
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dateDropdown">
                            <li><button className="dropdown-item" onClick={() => setDateFilter("all")}>All</button></li>
                            <li><button className="dropdown-item" onClick={() => setDateFilter("today")}>Today</button></li>
                            <li><button className="dropdown-item" onClick={() => setDateFilter("yesterday")}>Yesterday</button></li>
                            <li><button className="dropdown-item" onClick={() => setDateFilter("week")}>This Week</button></li>
                        </ul>
                    </div>
                    <div className="dropdown dropstart">
                        <button type="button" className="btn btn-sm custom-bg-secondary custom-color-primary fw-bold d-flex flex-row align-items-center gap-2" id="filterOptionsMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><FilterIcon/>Filter</button>
                        <ul aria-labelledby="filterOptionsMenuButton" className="dropdown-menu p-2 custom-bg-base shadow rounded">
                            <li><h6 className="dropdown-header fw-bold custom-color-primary text-lg">Sort by</h6></li>
                            <li><button className="dropdown-item" onClick={() => handleSortByName('desc')}>Z-A </button></li>
                            <li><button className="dropdown-item" onClick={() => handleSortByName('asc')}>A-Z </button></li>
                            <li><h6 className="dropdown-header fw-bold custom-color-primary text-lg">Filter by Type</h6></li>
                            <li><button className="dropdown-item" onClick={() => setTypeFilter('all')}>All</button></li>
                            <li><button className="dropdown-item" onClick={() => setTypeFilter('income')}>Income</button></li>
                            <li><button className="dropdown-item" onClick={() => setTypeFilter('expense')}>Expense</button></li>
                        </ul>
                    </div>
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
                <div className="w-100">
                    <div className='table-responsive-sm my-4 d-none d-sm-block'>
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
                                {transactions
                                    .filter(transaction =>
                                        transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                                        (typeFilter === "all" || transaction.type === typeFilter) &&
                                        (dateFilter === "all" ||
                                            (dateFilter === "today" && moment(transaction.date).isSame(moment(), 'day')) ||
                                            (dateFilter === "yesterday" && moment(transaction.date).isSame(moment().subtract(1, 'days'), 'day')) ||
                                            (dateFilter === "week" && moment(transaction.date).isSame(moment(), 'week'))
                                        )
                                    )
                                    .map((transaction)=>{
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
                                                    <button className='btn btn-sm btn-outline-dark gap-2 align-items-center' onClick={()=>handleEditTransaction(transaction)}><EditIcon/>Manage</button>
                                                    <button className='btn btn-sm btn-danger gap-2 align-items-center' onClick={()=>handleDeleteTransaction(transaction.id)}><DeleteIcon/>Delete</button>
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
                        {/* Cards for smaller screens */}
                    </div>
                    <div className="d-block d-sm-none">
                        {transactions
                            .filter(transaction =>
                                transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                                (typeFilter === "all" || transaction.type === typeFilter) &&
                                (dateFilter === "all" ||
                                    (dateFilter === "today" && moment(transaction.date).isSame(moment(), 'day')) ||
                                    (dateFilter === "yesterday" && moment(transaction.date).isSame(moment().subtract(1, 'days'), 'day')) ||
                                    (dateFilter === "week" && moment(transaction.date).isSame(moment(), 'week'))
                                )
                            )
                            .map((transaction) => (
                                <div className="card mb-3" key={transaction.id}>
                                    <div className="card-body">
                                        <h5 className="card-title">{transaction.category}</h5>
                                        <p className="card-text">{transaction.name}</p>
                                        <p className="card-text"><strong>Amount:</strong> {transaction.amount}</p>
                                        <p className="card-text"><strong>Date:</strong> {moment(transaction.date).format("MMM Do YY")}</p>
                                        <p className="card-text"><strong>Wallet:</strong> {transaction.wallet}</p>
                                        <span className={`badge custom-bg-${transaction.type === 'income' ? 'secondary' : 'primary'} p-1`}>
                                            {transaction.type}
                                        </span>
                                        <div className="d-flex flex-row gap-2 mt-2">
                                            <button className='btn btn-sm btn-outline-dark gap-2 align-items-center' onClick={() => handleEditTransaction(transaction)}>
                                                <EditIcon />Manage
                                            </button>
                                            <button className='btn btn-sm btn-danger gap-2 align-items-center' onClick={() => handleDeleteTransaction(transaction.id)}>
                                                <DeleteIcon />Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                )
            }
            <ModalFormComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setTransactions={setTransactions} transactionToEdit={transactionToEdit}/>
        </div>
    )
};