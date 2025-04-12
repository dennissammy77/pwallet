import React from 'react'
import TransactionForm from './TransactionForm';
import Modal from "react-bootstrap/Modal";

function ModalFormComponent ({isModalOpen,setIsModalOpen,setTransactions,isEdit=false}){
    console.log(isModalOpen)
    const hideModal = () => {
        setIsModalOpen(false);
    };
    return (
      <Modal show={isModalOpen} onHide={hideModal} centered>
        <Modal.Header>
            <h5 className="modal-title">{isEdit ? 'Edit Transaction' : 'Add New Transaction'}</h5>
            <button type="button" className="btn-close" onClick={hideModal}></button>
        </Modal.Header>
        <Modal.Body>
            <TransactionForm
                initialValues={{
                    type: 'expense',
                    name: '',
                    amount: 0,
                    transaction: 0,
                    wallet: '',
                    category: '',
                    date: '',
                    notes: ''
                }}
                isEdit={isEdit}
                setTransactions={setTransactions}
                hideModal={hideModal}
            />
        </Modal.Body>
      </Modal>
    );
};

export default ModalFormComponent