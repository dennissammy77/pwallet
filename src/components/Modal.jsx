import React, { useEffect, useState } from 'react'
import TransactionForm from './TransactionForm';
import Modal from "react-bootstrap/Modal";

function ModalFormComponent ({isModalOpen,setIsModalOpen,setTransactions,transactionToEdit}){
    const [isEdit,setIsEdit]=useState(false)
    const hideModal = () => {
        setIsModalOpen(false);
    };
    useEffect(()=>{
        if(transactionToEdit){
            setIsEdit(true)
        }
    },[transactionToEdit])
    return (
      <Modal show={isModalOpen} onHide={hideModal} centered>
        <Modal.Header>
            <h5 className="modal-title">{isEdit ? 'Edit Transaction' : 'Add New Transaction'}</h5>
            <button type="button" className="btn-close" onClick={hideModal}></button>
        </Modal.Header>
        <Modal.Body>
            <TransactionForm
                initialValues={{
                    type: transactionToEdit.type || 'expense',
                    name: transactionToEdit.name || '',
                    amount: transactionToEdit.amount || 0,
                    transaction: transactionToEdit.transaction || 0,
                    wallet: transactionToEdit.wallet || '',
                    category: transactionToEdit.category || '',
                    date: transactionToEdit.date || '',
                    notes: transactionToEdit.notes || ''
                }}
                isEdit={transactionToEdit}
                setTransactions={setTransactions}
                hideModal={hideModal}
            />
        </Modal.Body>
      </Modal>
    );
};

export default ModalFormComponent