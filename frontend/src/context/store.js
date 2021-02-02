import React, { useReducer, useEffect } from 'react'
import axios from 'axios'
import {
	productListReducer,
	productDetailsReducer,
} from '../reducers/productReducers.js'
import { cartReducer } from '../reducers/cartReducers.js'
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
} from '../reducers/userReducers.js'
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	myOrderListReducer,
} from '../reducers/orderReducers.js'
import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_REQUEST,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_REQUEST,
} from '../constants/productConstants.js'
import {
	CART_REMOVE_ITEM,
	CART_ADD_ITEM,
	CART_INIT,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SHIPPING_ADDRESS_INIT,
	CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants.js'
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_INIT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_RESET,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_RESET,
} from '../constants/userConstants.js'

import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_REQUEST,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_REQUEST,
	ORDER_PAY_FAIL,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_REQUEST,
	ORDER_PAY_RESET,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_MY_SUCCESS,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_RESET,
} from '../constants/orderConstants.js'

const StoreContext = React.createContext()

const StoreProvider = (props) => {
	const [PLstate, PLdispatch] = useReducer(productListReducer, {
		products: [],
	})
	const [PDstate, PDdispatch] = useReducer(productDetailsReducer, {
		product: { reviews: [] },
	})
	const [Cstate, Cdispatch] = useReducer(cartReducer, {
		cartItems: [],
		shippingAddress: {},
	})
	const [Ustate, Udispatch] = useReducer(userLoginReducer, {})
	const [URstate, URdispatch] = useReducer(userRegisterReducer, {})
	const [UDstate, UDdispatch] = useReducer(userDetailsReducer, { user: {} })
	const [ULstate, ULdispatch] = useReducer(userListReducer, { users: [] })
	const [UpdatePstate, UpdatePdispatch] = useReducer(
		userUpdateProfileReducer,
		{}
	)
	const [DUstate, DUdispatch] = useReducer(userDeleteReducer, {})
	const [Ostate, Odispatch] = useReducer(orderCreateReducer, {})
	const [ODstate, ODdispatch] = useReducer(orderDetailsReducer, {
		orderItems: [],
		shippingAddress: {},
	})
	const [OPstate, OPdispatch] = useReducer(orderPayReducer, {})
	const [MOLstate, MOLdispatch] = useReducer(myOrderListReducer, {})

	useEffect(() => {
		const cartItemsFromStorage = localStorage.getItem('cartItems')
			? JSON.parse(localStorage.getItem('cartItems'))
			: []
		// console.log(cartItemsFromStorage)
		Cdispatch({
			type: CART_INIT,
			payload: cartItemsFromStorage,
		})

		const userInfoFromStorage = localStorage.getItem('userInfo')
			? JSON.parse(localStorage.getItem('userInfo'))
			: {}
		Udispatch({
			type: USER_INIT,
			payload: userInfoFromStorage,
		})

		const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
			? JSON.parse(localStorage.getItem('shippingAddress'))
			: {}
		Cdispatch({
			type: CART_SHIPPING_ADDRESS_INIT,
			payload: shippingAddressFromStorage,
		})
	}, [])

	const listProducts = async () => {
		try {
			PLdispatch({ type: PRODUCT_LIST_REQUEST })

			const { data } = await axios.get('/api/products/')

			PLdispatch({
				type: PRODUCT_LIST_SUCCESS,
				payload: data,
			})
		} catch (error) {
			PLdispatch({
				type: PRODUCT_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

	const listProductDetails = async (id) => {
		try {
			PDdispatch({ type: PRODUCT_DETAILS_REQUEST })

			const { data } = await axios.get(`/api/products/${id}`)

			PDdispatch({
				type: PRODUCT_DETAILS_SUCCESS,
				payload: data,
			})
		} catch (error) {
			PDdispatch({
				type: PRODUCT_DETAILS_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

	const addToCart = async (id, qty) => {
		const { data } = await axios.get(`/api/products/${id}`)

		Cdispatch({
			type: CART_ADD_ITEM,
			payload: {
				product: data._id,
				name: data.name,
				image: data.image,
				price: data.price,
				countInStock: data.countInStock,
				qty,
			},
		})

		// localStorage.setItem('cartItems', JSON.stringify(Cstate.cartItems))
	}

	const removeFromCart = (id) => {
		Cdispatch({
			type: CART_REMOVE_ITEM,
			payload: id,
		})
	}

	const login = async (email, password) => {
		try {
			Udispatch({
				type: USER_LOGIN_REQUEST,
			})

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			const { data } = await axios.post(
				'/api/users/login',
				{ email, password },
				config
			)

			Udispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data,
			})
		} catch (error) {
			Udispatch({
				type: USER_LOGIN_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

	const logout = () => {
		Udispatch({
			type: USER_LOGOUT,
		})
		ULdispatch({
			type: USER_LIST_RESET,
		})
		UDdispatch({
			type: USER_DETAILS_RESET,
		})
		MOLdispatch({
			type: ORDER_LIST_MY_RESET,
		})
	}

	const register = async (name, email, password) => {
		try {
			URdispatch({
				type: USER_REGISTER_REQUEST,
			})

			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			}

			const { data } = await axios.post(
				'/api/users',
				{ name, email, password },
				config
			)

			URdispatch({
				type: USER_REGISTER_SUCCESS,
				payload: data,
			})
			Udispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data,
			})
		} catch (error) {
			URdispatch({
				type: USER_REGISTER_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

	const getUserDetails = async (id) => {
		try {
			UDdispatch({
				type: USER_DETAILS_REQUEST,
			})

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${Ustate.userInfo.token}`,
				},
			}

			const { data } = await axios.get(`/api/users/${id}`, config)

			UDdispatch({
				type: USER_DETAILS_SUCCESS,
				payload: data,
			})
		} catch (error) {
			UDdispatch({
				type: USER_DETAILS_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

	const updateUserProfile = async (user) => {
		try {
			UpdatePdispatch({
				type: USER_UPDATE_PROFILE_REQUEST,
			})

			let { token } = JSON.parse(localStorage.getItem('userInfo'))
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}

			const { data } = await axios.put(`/api/users/profile`, user, config)

			UpdatePdispatch({
				type: USER_UPDATE_PROFILE_SUCCESS,
				payload: data,
			})
			Udispatch({
				type: USER_LOGIN_SUCCESS,
				payload: data,
			})
		} catch (error) {
			UpdatePdispatch({
				type: USER_UPDATE_PROFILE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

	const userListRequest = async () => {
		try {
			ULdispatch({
				type: USER_LIST_REQUEST,
			})

			let { token } = JSON.parse(localStorage.getItem('userInfo'))
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}

			const { data } = await axios.get(`/api/users`, config)

			ULdispatch({
				type: USER_LIST_SUCCESS,
				payload: data,
			})
		} catch (error) {
			ULdispatch({
				type: USER_LIST_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

	const resetUserProfile = () => {
		UpdatePdispatch({
			type: USER_UPDATE_PROFILE_RESET,
		})
	}

	const saveShippingAddress = (data) => {
		Cdispatch({
			type: CART_SAVE_SHIPPING_ADDRESS,
			payload: data,
		})
	}

	const savePaymentMethod = (data) => {
		Cdispatch({
			type: CART_SAVE_PAYMENT_METHOD,
			payload: data,
		})
	}

	const createOrder = async (order) => {
		try {
			Odispatch({
				type: ORDER_CREATE_REQUEST,
			})

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${Ustate.userInfo.token}`,
				},
			}

			const { data } = await axios.post(`/api/orders/`, order, config)

			Odispatch({
				type: ORDER_CREATE_SUCCESS,
				payload: data,
			})
		} catch (error) {
			Odispatch({
				type: ORDER_CREATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

	const getOrderDetails = async (id) => {
		try {
			ODdispatch({
				type: ORDER_DETAILS_REQUEST,
			})
			let { token } = JSON.parse(localStorage.getItem('userInfo'))
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}

			const { data } = await axios.get(`/api/orders/${id}`, config)

			ODdispatch({
				type: ORDER_DETAILS_SUCCESS,
				payload: data,
			})
		} catch (error) {
			ODdispatch({
				type: ORDER_DETAILS_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

	const payOrder = async (orderId, paymentResult) => {
		try {
			ODdispatch({
				type: ORDER_PAY_REQUEST,
			})
			let { token } = JSON.parse(localStorage.getItem('userInfo'))
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}

			const { data } = await axios.put(
				`/api/orders/${orderId}/pay`,
				paymentResult,
				config
			)

			ODdispatch({
				type: ORDER_PAY_SUCCESS,
				payload: data,
			})
		} catch (error) {
			ODdispatch({
				type: ORDER_PAY_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

	const resetPayOrder = () => {
		OPdispatch({
			type: ORDER_PAY_RESET,
		})
	}

	const getMyOrderList = async () => {
		try {
			MOLdispatch({
				type: ORDER_LIST_MY_REQUEST,
			})
			let { token } = JSON.parse(localStorage.getItem('userInfo'))
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}

			const { data } = await axios.get(`/api/orders/myorders`, config)

			MOLdispatch({
				type: ORDER_LIST_MY_SUCCESS,
				payload: data,
			})
		} catch (error) {
			MOLdispatch({
				type: ORDER_LIST_MY_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

	const deleteUser = async (id) => {
		try {
			DUdispatch({
				type: USER_DELETE_REQUEST,
			})
			let { token } = JSON.parse(localStorage.getItem('userInfo'))
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}

			await axios.delete(`/api/users/${id}`, config)

			DUdispatch({
				type: USER_DELETE_SUCCESS,
			})
		} catch (error) {
			DUdispatch({
				type: USER_DELETE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			})
		}
	}

	const valueObject = {
		Cstate,
		PLstate,
		PDstate,
		Ustate,
		URstate,
		UDstate,
		ULstate,
		UpdatePstate,
		Ostate,
		ODstate,
		OPstate,
		MOLstate,
		DUstate,
		listProducts,
		listProductDetails,
		addToCart,
		removeFromCart,
		login,
		logout,
		register,
		getUserDetails,
		updateUserProfile,
		resetUserProfile,
		saveShippingAddress,
		savePaymentMethod,
		createOrder,
		getOrderDetails,
		payOrder,
		resetPayOrder,
		getMyOrderList,
		userListRequest,
		deleteUser,
	}

	return (
		<StoreContext.Provider value={valueObject}>
			{props.children}
		</StoreContext.Provider>
	)
}

export { StoreContext, StoreProvider }
