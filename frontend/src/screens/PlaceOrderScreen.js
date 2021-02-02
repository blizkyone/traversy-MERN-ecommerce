import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { StoreContext } from '../context/store.js'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

const PlaceOrderScreen = ({ history }) => {
	const { Cstate, Ostate, createOrder } = useContext(StoreContext)
	const { order, success, error } = Ostate

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`)
			Ostate.success = false
		}
		// eslint-disable-next-line
	}, [success, history])

	//Calculate prices
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}

	let itemsPrice = addDecimals(
		Cstate.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	)

	let shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100)

	let taxPrice = addDecimals(Number(0.16 * itemsPrice).toFixed(2))

	let totalPrice = (
		Number(itemsPrice) +
		Number(shippingPrice) +
		Number(taxPrice)
	).toFixed(2)

	const placeOrderHandler = () => {
		createOrder({
			orderItems: Cstate.cartItems,
			shippingAddress: Cstate.shippingAddress,
			paymentMethod: Cstate.paymentMethod,
			itemsPrice,
			shippingPrice,
			taxPrice,
			totalPrice,
		})
	}

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>
								{Cstate.shippingAddress.address},{' '}
								{Cstate.shippingAddress.city},{' '}
								{Cstate.shippingAddress.postalCode},{' '}
								{Cstate.shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{Cstate.paymentMethod}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							<strong>Method: </strong>
							{Cstate.cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{Cstate.cartItems.map((item, i) => (
										<ListGroup.Item key={i}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = $
													{item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && <Message variant='danger'>{error}</Message>}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block'
									disabled={Cstate.cartItems === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default PlaceOrderScreen
