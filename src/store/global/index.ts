import { createSlice } from '@reduxjs/toolkit'

import { textGen } from './actions'
import type { TGlobalState } from './types'

export const initialState: TGlobalState = {
  data: null,
  error: null,
  loading: false,
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(textGen.pending, state => {
      state.loading = true
      state.error = null
    })

    builder.addCase(textGen.fulfilled, (state, { payload }) => {
      state.loading = false
      state.error = null
      state.data = payload
    })

    builder.addCase(textGen.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as null
    })
  },
})

export const { name, actions } = globalSlice

const authReducer = globalSlice.reducer

export default authReducer
