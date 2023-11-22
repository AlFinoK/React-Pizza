import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: { totalPrice: 0, items: [] },
  reducers: {
    addItem(state, action) {
      const foundItem = state.items.find((obj) => obj.id == action.payload.id)
      if (foundItem) {
        foundItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum
      }, 0)
    },

    minusItem(state, action) {
      const foundItem = state.items.find((obj) => obj.id == action.payload)

      if (foundItem) {
        foundItem.count--
      }
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id == action.payload)
      state.totalPrice = action.payload
    },
    clearItems(state, action) {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id == id)
export const selectCart = (state) => state.cart

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
