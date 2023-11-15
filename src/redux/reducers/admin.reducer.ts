import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { $api } from "../../http/axios";



export const fetchAuth = createAsyncThunk('admin/login', async (params : {password: string}) => {
  const {data} = await $api.post('admin/login', params)
  return data
})
export const fetchMe = createAsyncThunk('admin/me', async () => {
  const {data} = await $api.get('admin/me')
    return data
})

interface AdminStateI {
  status : 'loading' | 'ready',
  isAuth : boolean
}
const initialState : AdminStateI = {
  status : "loading",
  isAuth: false
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    logout : (state) => {
      state.status = 'loading'
      state.isAuth = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.status = 'ready'
      state.isAuth = true
    })
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.status = 'ready'
      state.isAuth = true
    })
  },


})
export default adminSlice.reducer