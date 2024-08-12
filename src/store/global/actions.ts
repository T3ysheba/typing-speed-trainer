import { createAsyncThunk } from '@reduxjs/toolkit'

import axiosInstance from 'libraries/axios'

export const textGen = createAsyncThunk('text-gen', async () => {
  try {
    const { data } = await axiosInstance.get('/data.json')

    return data.data
  } catch (error: any) {
    return error
  }
})
