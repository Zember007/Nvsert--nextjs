import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateActionDocuments = createAsyncThunk(
  "documents/updateDocuments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/documents");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateActionDiscounts = createAsyncThunk(
  "documents/updateDiscounts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/documents/sales");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateActionReceivedDocs = createAsyncThunk(
  "documents/updateReceivedDocs",
  async ({ sessionid, docs }, { rejectWithValue }) => {
    try {
      const response = await axios.patch("/api/order/calc", { sessionid, docs });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const documentsSlice = createSlice({
  name: "documents",
  initialState: {
    documents: [],
    discounts: [],
    orderStepFormServer: 0,
    calcPageBodyClass: false,
    receivedDocs: [],
    docsPrice: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setDocsPrice: (state, action) => {
      state.docsPrice = action.payload;
    },
    setReceivedDocs: (state, action) => {
      state.receivedDocs = action.payload;
    },
    removeDocument: (state, action) => {
      state.receivedDocs = state.receivedDocs.filter((doc) => doc.id !== action.payload);
    },
    setCalcPageBodyClass: (state, action) => {
      state.calcPageBodyClass = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateActionDocuments.fulfilled, (state, action) => {
        state.documents = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateActionDocuments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateActionDocuments.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(updateActionDiscounts.fulfilled, (state, action) => {
        state.discounts = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateActionReceivedDocs.fulfilled, (state, action) => {
        state.docsPrice = action.payload;
        state.status = "succeeded";
      });
  },
});

export const { setDocsPrice, setReceivedDocs, removeDocument, setCalcPageBodyClass } = documentsSlice.actions;
export default documentsSlice.reducer;