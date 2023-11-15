import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { $api } from "../../http/axios";


export const fetchUserById = createAsyncThunk(
    'menu/fetchMenu',
    async () => {
        const response = await $api.get('/menu')
        return response.data
    }
)
export interface MenuItemI {
    name: string;
    image: string;
    description: string;
    price: number;
    category : string;
    _id: string;
}
interface MenuStateI {
    status : 'loading' | 'ready',
    items : MenuItemI[]
}
const initialState : MenuStateI = {
    status : "loading",
    items: []
}

const menuSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchUserById.fulfilled, (state, action) => {
            // Add user to the state array
            state.items = action.payload
        })
    },
})
export default menuSlice.reducer