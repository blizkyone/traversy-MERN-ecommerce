import React, { useState, useContext, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { StoreContext } from '../context/store.js'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({ history }) => {
	const { Cstate, savePaymentMethod } = useContext(StoreContext)
	const [paymentMethod, setPaymentMethod] = useState('PayPal')

	useEffect(() => {
		// const { shippingAddress } = Cstate
		// if (!shippingAddress) return history.push('/shipping')
	}, [Cstate])

	const submitHandler = (e) => {
		e.preventDefault()
		savePaymentMethod(paymentMethod)
		history.push('/placeorder')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
					<Col>
						<Form.Check
							type='radio'
							label='PayPal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>
				<Button type='submit' variant='primary' onClick={submitHandler}>
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default PaymentScreen
