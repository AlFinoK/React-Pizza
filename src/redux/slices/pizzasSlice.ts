import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const { sortBy, category, order, search, currentPage } = params
    console.log(thunkAPI)
    const URL = 'https://64be88e35ee688b6250c9498.mockapi.io/pizzas'

    const { data } = await axios.get(
      `${URL}?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
    return data
  },
)

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: {
    items: [],
    status: 'loading',
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading'
        state.items = []
        console.log('loading')
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = 'success'
        state.items = action.payload
        console.log('success')
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error'
        state.items = []
        console.log('error')
      })
  },
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
