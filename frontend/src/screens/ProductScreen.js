import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/store.js'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'

const ProductScreen = ({ match, history }) => {
	const { listProductDetails, PDstate } = useContext(StoreContext)
	const [qty, setQty] = useState(1)

	useEffect(() => {
		listProductDetails(match.params.id)
	}, [match.params.id])

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`)
	}

	return (
		<>
			<Link className='btn btn-dark my-3' to='/'>
				Go Back
			</Link>
			{PDstate.loading ? (
				<Loader />
			) : PDstate.error ? (
				<Message variant='danger'>{PDstate.error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image
							src={PDstate.product.image}
							alt={PDstate.product.name}
							fluid
						/>
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{PDstate.product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={PDstate.product.rating}
									text={`${PDstate.product.numReviews} reviews`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>
								Price: ${PDstate.product.price}
							</ListGroup.Item>
							<ListGroup.Item>
								Description: ${PDstate.product.description}
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${PDstate.product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											{PDstate.product.countInStock > 0
												? 'In Stock'
												: 'Out of stock'}
										</Col>
									</Row>
								</ListGroup.Item>

								{PDstate.product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control
													as='select'
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[
														...Array(
															PDstate.product.countInStock
														).keys(),
													].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									<Button
										onClick={addToCartHandler}
										disabled={PDstate.product.countInStock === 0}
										className='btn-block'
										type='button'
									>
										Add to Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	)
}

export default ProductScreen
