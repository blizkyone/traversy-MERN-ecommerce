import {
	CART_REMOVE_ITEM,
	CART_ADD_ITEM,
	CART_INIT,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SHIPPING_ADDRESS_INIT,
	CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants.js'

// { cartItems: [], shippingAddress: {} }

export const cartReducer = (state, action) => {
	switch (action.type) {
		case CART_INIT:
			return {
				...state,
				cartItems: action.payload,
			}
		case CART_ADD_ITEM:
			const item = action.payload
			const existItem = state.cartItems.find(
				(x) => x.product === item.product
			)

			if (existItem) {
				const cartItems = state.cartItems.map((x) =>
					x.product === existItem.product ? item : x
				)
				localStorage.setItem('cartItems', JSON.stringify(cartItems))
				return {
					...state,
					cartItems,
				}
			} else {
				const cartItems = [...state.cartItems, item]
				localStorage.setItem('cartItems', JSON.stringify(cartItems))
				return {
					...state,
					cartItems,
				}
			}
		case CART_REMOVE_ITEM:
			const cartItems = state.cartItems.filter(
				(item) => item.product !== action.payload
			)
			localStorage.setItem('cartItems', JSON.stringify(cartItems))
			return {
				...state,
				cartItems,
			}
		case CART_SAVE_SHIPPING_ADDRESS:
			localStorage.setItem('shippingAddress', JSON.stringify(action.payload))
			return {
				...state,
				shippingAddress: action.payload,
			}
		case CART_SHIPPING_ADDRESS_INIT:
			return {
				...state,
				shippingAddress: action.payload,
			}
		case CART_SAVE_PAYMENT_METHOD:
			localStorage.setItem('paymentMethod', JSON.stringify(action.payload))
			return {
				...state,
				paymentMethod: action.payload,
			}
		default:
			return state
	}
}
