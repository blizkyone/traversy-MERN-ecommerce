import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/store.js'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'

const CartScreen = ({ match, location, history }) => {
	const { Cstate, addToCart, removeFromCart } = useContext(StoreContext)

	const productId = match.params.id

	const qty = location.search ? Number(location.search.split('=')[1]) : 1

	useEffect(() => {
		if (productId) {
			addToCart(productId, qty)
		}
	}, [productId, qty])

	const removeFromCartHandler = (id) => {
		removeFromCart(id)
	}

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping')
	}

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{Cstate.cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to='/'>Go back</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{Cstate.cartItems.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image
											src={item.image}
											alt={item.name}
											fluid
											rounded
										/>
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>
											{item.name}
										</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.qty}
											onChange={(e) =>
												addToCart(
													item.product,
													Number(e.target.value)
												)
											}
										>
											{[...Array(item.countInStock).keys()].map(
												(x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												)
											)}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={(_) =>
												removeFromCartHandler(item.product)
											}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								Subtotal (
								{Cstate.cartItems.reduce(
									(acc, item) => acc + item.qty,
									0
								)}
								) items
							</h2>
							$
							{Cstate.cartItems
								.reduce((acc, item) => acc + item.qty * item.price, 0)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								typw='button'
								className='btn btn-block'
								disabled={Cstate.cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed To Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}

export default CartScreen
