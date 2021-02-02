import React, { useState, useContext, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { StoreContext } from '../context/store.js'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({ history }) => {
	const { Cstate, saveShippingAddress } = useContext(StoreContext)
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [postalCode, setPostalCode] = useState('')
	const [country, setCountry] = useState('')

	useEffect(() => {
		const { shippingAddress } = Cstate
		if (!shippingAddress) return
		setAddress(shippingAddress.address)
		setCity(shippingAddress.city)
		setPostalCode(shippingAddress.postalCode)
		setCountry(shippingAddress.country)
	}, [Cstate])

	const submitHandler = (e) => {
		e.preventDefault()
		saveShippingAddress({ address, city, postalCode, country })
		history.push('/payment')
	}

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='address'>
					<Form.Label>Address</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='city'>
					<Form.Label>City</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter City'
						value={city}
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='PostalCode'>
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Postal Code'
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId='address'>
					<Form.Label>Country</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Country'
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type='submit' variant='primary' onClick={submitHandler}>
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default ShippingScreen
