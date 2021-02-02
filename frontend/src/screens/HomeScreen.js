import React, { useEffect, useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { StoreContext } from '../context/store.js'

const HomeScreen = () => {
	const { PLstate, listProducts } = useContext(StoreContext)

	useEffect(() => {
		listProducts()
	}, [])

	return (
		<>
			<h1>Latest Products</h1>
			{PLstate.loading ? (
				<Loader />
			) : PLstate.error ? (
				<Message variant='danger'>{PLstate.error}</Message>
			) : (
				<Row>
					{PLstate.products.map((product, i) => (
						<Col key={i} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	)
}

export default HomeScreen
