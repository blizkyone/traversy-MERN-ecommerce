import React, { useState, useEffect, useContext } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { StoreContext } from '../context/store.js'
import Message from '../components/Message'
import Loader from '../components/Loader'

const UserListScreen = ({ history }) => {
	const { ULstate, Ustate, userListRequest, deleteUser, UDstate } = useContext(
		StoreContext
	)
	const { users, loading, error } = ULstate
	const { userInfo } = Ustate
	const { success: deleteSuccess } = UDstate

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			userListRequest()
		} else {
			history.push('/login')
		}
	}, [history, deleteSuccess])

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure')) {
			deleteUser(id)
		}
	}

	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users?.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td>
									{user.isAdmin ? (
										<i
											className='fas fa-check'
											style={{ color: 'green' }}
										></i>
									) : (
										<i
											className='fas fa-times'
											style={{ color: 'red' }}
										></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/user/${user._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={(_) => deleteHandler(user._id)}
									>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	)
}

export default UserListScreen
