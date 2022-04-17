import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await axios.get(`/users/`);
    return response.data;
  }
);

const addUser = createAsyncThunk("users/addUser", async (user) => {
  const res = await axios.post(`/users/`, user);
  return res.data;
});

const updateUser = createAsyncThunk("users/updateUser", async (user) => {
  const res = await axios.put(`/users/${user.id}`, user);
  return res.data;
});

const deleteUser = createAsyncThunk("users/deleteUser", async (user) => {
  await axios.delete(`/users/${user.id}`);
  return user;
});

const findUserById = createAsyncThunk(
  "users/findUserById",
  async (id) => {
    const res = await axios.get(`/users/?id=${id}`);
    return res.data;
  }
);


export const initialState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  extraReducers: (builder) => {
    /*
     * addUser Cases
     */

    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = true;
      state.users.push(action.payload);
    });

    /*
     * updateUser Cases
     */

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = true;
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    });

    /*
     * deleteUser Cases
     */

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = true;
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    });

    /*
     * findUserById Cases
     */

    builder.addCase(findUserById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(findUserById.fulfilled, (state, action) => {
      state.selectedUser = action.payload.length ? action.payload[0] : null;
      state.loading = false;
    });

    /*
     * fetchUsers Cases
     */

    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false;
    });
  },
  reducers: {
    sortUsersByName: (state, action) => {
      if (action.payload === "asc") {
        state.users = state.users.sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === "desc") {
        state.users = state.users.sort((a, b) => b.name.localeCompare(a.name));
      }
    },
  },
});

export default userSlice.reducer;

export { findUserById, addUser, updateUser, deleteUser, fetchUsers };
