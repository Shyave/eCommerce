import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const SHOP_URI = `http://localhost:5001/api/shop/products/`;

const initialState = {
    isLoading: false,
    productList: []
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllProducts', async ({filterParams, sortParams}) => {
    const query = new URLSearchParams({...filterParams, sortBy: sortParams})
    console.log("query - ", query);
    const response = await axios.get(`${SHOP_URI}list?${query}`);
    return response?.data;
});

const shoppingProductSlice = createSlice({
    name: 'shoppingProductsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFilteredProducts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload
            })
            .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
                state.isLoading = false; 
                state.productList = []
            })
    }
})

export default shoppingProductSlice.reducer;