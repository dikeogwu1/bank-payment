import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../alltrans.css'

const AllTrans = () => {
  const [all, setAll] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [transactionId, setTransactionId] = useState({
    auth_model: '',
    payment_type: '',
    status: '',
    tx_ref: '',
    currency: '',
    amount: '',
    meta: { bankname: '' },
    meta: { originatoraccountnumber: '' },
    meta: { originatorname: '' },
    created_at: '',
  })

  // fech all transaction from flutterWave api
  const fetchData = () => {
    setLoading(true)
    const options = {
      method: 'GET',
      url: 'http://localhost:3000/v3/transactions',
      params: { from: '2022-02-11', page: '1', currency: 'NGN' },
      headers: {
        Accept: 'application/json',
        Authorization: process.env.REACT_APP_FLUTTERWAVE_KEY,
      },
    }
    axios
      .request(options)
      .then(function (response) {
        setAll(response.data.data)
        setLoading(false)
      })
      .catch(function (error) {
        setLoading(false)
        console.error(error)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])

  // Handle details button click
  const handleClick = (e) => {
    setShowModal(true)
    const transId = parseInt(e.currentTarget.dataset.id)
    const singleTrans = all.find((item) => item.id === transId)
    setTransactionId(singleTrans)
  }

  if (loading) {
    return (
      <div>
        <h3 className='topic'>Fetching your transactions</h3>
        <div className='trans-container'>
          <h2>Loading...</h2>
          <Link to='/'>
            <button className='transactions'>Back home</button>
          </Link>
        </div>
      </div>
    )
  }

  if (all.length < 1) {
    return (
      <div>
        <h3 className='topic'>you have no transaction</h3>
        <div className='trans-container'>
          <Link to='/'>
            <button className='transactions'>Back home</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div id='transactions-box'>
      <h3 className='topic'>all your transactions</h3>
      <div className='trans-container'>
        {all.map((item) => {
          const { id, currency, amount, payment_type, status } = item
          return (
            <article key={id} className='trans-wrapper'>
              <div className='trans'>
                <div>
                  <h4 className='currency'>{currency}</h4>
                  <h4>{amount}</h4>
                </div>
                <p>{payment_type}</p>
                <p>{status}</p>
                <button className='details' data-id={id} onClick={handleClick}>
                  Details
                </button>
              </div>
              <div className='underline'></div>
            </article>
          )
        })}
        <Link to='/'>
          <button className='transactions'>Back home</button>
        </Link>
      </div>

      {/* modal */}
      <div
        className={`${
          showModal ? 'modal-container show-modal' : 'modal-container'
        }`}
      >
        <div className='modal'>
          <button className='close-btn' onClick={() => setShowModal(false)}>
            <FaTimes />
          </button>
          <h4>auth_model: {transactionId.auth_model}</h4>
          <h4>payment_type: {transactionId.payment_type}</h4>
          <h4>status: {transactionId.status}</h4>
          <h4>tx_ref: {transactionId.tx_ref}</h4>
          <h4>
            Amount: {transactionId.currency} <span>{transactionId.amount}</span>
          </h4>
          <h4>Bank: {transactionId.meta.bankname}</h4>
          <h4>Account Number: {transactionId.meta.originatoraccountnumber}</h4>
          <h4>Account Name: {transactionId.meta.originatorname}</h4>
          <h4>Date: {transactionId.created_at}</h4>
        </div>
      </div>
    </div>
  )
}

export default AllTrans
