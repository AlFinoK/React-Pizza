import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
      name: 'популярности (убыв.)',
      sortProperty: 'rating',
    },
  },
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.sort = action.payload.sort
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
    },
  },
})

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions

export default filterSlice.reducer
