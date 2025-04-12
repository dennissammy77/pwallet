import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const TransactionForm = ({ initialValues, setTransactions,hideModal,transactionToEdit }) => {
  const validationSchema = Yup.object({
    type:        Yup.string().required('Required'),
    name:        Yup.string().required('Required'),
    amount:      Yup.number().required('Required').positive('Must be positive').min(0),
    transaction: Yup.number().positive('Must be positive').min(0),
    wallet:      Yup.string().required('Required'),
    category:    Yup.string().required('Required'),
    date:        Yup.date().required('Required'),
    notes:       Yup.string()
  });
  const isEdit = Boolean(transactionToEdit?.id);

  const handleSubmit = (values, { resetForm }) => {
    const updatedTransaction = {
      ...values,
      id: Date.now(),
    };

    if (isEdit) {
      setTransactions(prev =>
        prev.map(transaction => (transaction.id === transactionToEdit?.id ? updatedTransaction : transaction))
      );
    } else {
      setTransactions(prev => [updatedTransaction, ...prev]);
      resetForm();
    }

    hideModal?.();
  };

  return (
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
    >
        <Form>
            <div className="mb-1">
                <label className="form-label">Type</label>
                <Field as="select" name="type" className="form-select">
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </Field>
                <ErrorMessage name="type" component="div" className="text-danger" />
            </div>

            <div className="mb-1">
                <label className="form-label">Title</label>
                <Field name="name" className="form-control" placeholder="Shopped at Five Guys"/>
                <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="mb-1">
                <label className="form-label">Amount</label>
                <Field name="amount" type="number" className="form-control" min={0}/>
                <ErrorMessage name="amount" component="div" className="text-danger" />
            </div>

            <div className="mb-1">
                <label className="form-label">Transaction cost</label>
                <Field name="transaction" type="number" className="form-control" min={0}/>
                <ErrorMessage name="transaction" component="div" className="text-danger" />
            </div>

            <div className="mb-1">
                <label className="form-label">Category</label>
                <Field as="select" name="category" className="form-select">
                    <option value="">Select Category</option>
                    <option value="Shopping">Shopping</option>
                </Field>
                <ErrorMessage name="category" component="div" className="text-danger" />
            </div>

            <div className="mb-1">
                <label className="form-label">Wallet</label>
                <Field as="select" name="wallet" className="form-select">
                    <option value="">Select Wallet</option>
                    <option value="M-Pesa">M-Pesa</option>
                    <option value="Bank">Bank</option>
                    <option value="Cash">Cash</option>
                </Field>
                <ErrorMessage name="wallet" component="div" className="text-danger" />
            </div>

            <div className="mb-1">
                <label className="form-label">Date</label>
                <Field name="date" type="datetime-local" className="form-control" />
                <ErrorMessage name="date" component="div" className="text-danger" />
            </div>

            <div className="mb-1">
                <label className="form-label">Notes</label>
                <Field as="textarea" name="notes" className="form-control" placeholder="Something brief"/>
                <ErrorMessage name="notes" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-sm custom-bg-primary mt-2 custom-color-base">
                save changes
            </button>
        </Form>
    </Formik>
  )
}

export default TransactionForm;