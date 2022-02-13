import React, { useState, useRef } from 'react'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'

export default function FundTrans() {
  const [amount, setAmount] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [acNumberAlert, setAcNumberAlert] = useState(false)
  const [amountALert, setAmountALert] = useState(false)
  const acNumContainer = useRef(null)
  const amountContainer = useRef(null)

  const config = {
    public_key: 'FLWPUBK_TEST-143f6993ec7cfd5e5bae8cf951cbbe60-X',
    tx_ref: Date.now(),
    amount: amount,
    currency: 'NGN',
    accountnumber: '3127216425',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phonenumber: '07064586146',
      name: 'joel ugwumadu',
    },
    customizations: {
      title: 'Pay the easy way',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  }

  const handleFlutterPayment = useFlutterwave(config)

  // handle form submition
  const handleSubmit = (e) => {
    e.preventDefault()
    const sureLength = accountNumber.length
    if (sureLength < 10 || sureLength > 10) {
      setAcNumberAlert(true)
      setAmountALert(false)
      acNumContainer.current.textContent = 'Account number most be 10 digit'
    } else if (amount <= 100) {
      setAcNumberAlert(false)
      setAmountALert(true)
      amountContainer.current.textContent = 'amount most be more than 100'
    } else if (amount >= 10000) {
      setAcNumberAlert(false)
      setAmountALert(true)
      amountContainer.current.textContent = 'amount most be less than 10,000'
    } else {
      handleFlutterPayment({
        callback: (response) => {
          console.log(response)
          closePaymentModal() // this will close the modal programmatically
        },
        onClose: () => {},
      })
    }
  }

  const onAcNumChange = (e) => {
    setAccountNumber(e.target.value)
    if (accountNumber.length === 11) {
      setAcNumberAlert(false)
    } else {
      setAcNumberAlert(false)
    }
  }

  const onAmountChange = (e) => {
    setAmount(e.target.value)
    if (amount > 100 || amount < 10000) {
      setAmountALert(false)
    }
  }

  return (
    <div className='container'>
      {/* fund transfer */}
      <div className='transfer-container'>
        <h3>Fund transfer</h3>

        <div className='form-wrapper'>
          <form>
            <div>
              <label htmlFor='banks'>Select beneficiary bank</label>
              <select name='' id='banks'>
                {/* banks */}
                <option value='Access Bank'>Access bank</option>
                <option value='Eco Bank'>Eco bank</option>
                <option value='Fidelity Bank'>Fidelity bank</option>
                <option value='First Bank'>First bank plc</option>
                <option value='FCMB Bank'>
                  First city monument bank (FCMB)
                </option>
                <option value='GT Bank'>GT bank</option>
                <option value='Heritage Bank'>Heritage bank</option>
                <option value='Keystone Bank'>Keystone bank</option>
                <option value='Stanbic'>Stanbic IBTC Bank</option>
                <option value='Sterling'>Sterling Bank</option>
                <option value='Union'>Union Bank</option>
                <option value='UBA'>United Bank For Africa (UBA)</option>
                <option value='Unity'>Unity Bank</option>
                <option value='VFD'>VFD Microfinance Bank</option>
                <option value='Wema Bank'>Wema Bank</option>
                <option value='Zenith Bank'>Zenith Bank</option>
              </select>
            </div>
            <div>
              <label htmlFor='accountNumber'>beneficiary Account</label>
              <aside>
                <input
                  type='number'
                  value={accountNumber}
                  autoComplete='off'
                  id='accountNumber'
                  onChange={onAcNumChange}
                />
                <p
                  ref={acNumContainer}
                  className={`${
                    acNumberAlert ? 'alert1 show-alert1' : 'alert1'
                  }`}
                >
                  account number must be10 digit
                </p>
              </aside>
            </div>
            <div>
              <label htmlFor='amount'>Amount</label>
              <aside>
                <input
                  type='number'
                  value={amount}
                  autoComplete='off'
                  id='amount'
                  onChange={onAmountChange}
                />
                <p
                  ref={amountContainer}
                  className={`${amountALert ? 'alert2 show-alert2' : 'alert2'}`}
                ></p>
              </aside>
            </div>
            <div className='submit-wrapper'>
              <button className='submit' type='submit' onClick={handleSubmit}>
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
