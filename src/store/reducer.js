import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchData = createAsyncThunk('app/fetchData', async (keyword) => {
  const response = await axios({
    url: 'http://3.141.23.218:5000/interview/keyword_search',
    method: 'post',
    data: {
      login_token: 'INTERVIEW_SIMPLY2021',
      search_phrase: keyword
    }
  })
  return response.data.data
})

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState({
  loading: true,
  data: [],
  searchValue: ''
})

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload.product_trends
      })
  }
})

export const { setSearchValue } = slice.actions

export default slice.reducer