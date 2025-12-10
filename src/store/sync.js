import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    { id: 1, title: "lkjkh", status: false },
    { id: 2, title: "Hello World", status: true },
  ],
  inpTitle: "",
  editId: null,
  search: "",
  filterStatus: "all",  
};

export const sync = createSlice({
  name: "todos",
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.data = state.data.filter((elem) => elem.id !== action.payload);
    },

    setInpTitle: (state, action) => {
      state.inpTitle = action.payload;
    },

    addUser: (state) => {
      const newUser = {
        id: Date.now(),
        title: state.inpTitle,
        status: false,
      };
      state.data.push(newUser);
      state.inpTitle = "";
    },

    startEdit: (state, action) => {
      state.editId = action.payload.id;
      state.inpTitle = action.payload.title;
    },

    saveEdit: (state) => {
      const todo = state.data.find((e) => e.id == state.editId);
      if (todo) {
        todo.title = state.inpTitle;
      }
      state.editId = null;
      state.inpTitle = "";
    },

    toggleStatus: (state, action) => {
      const todo = state.data.find((e) => e.id === action.payload);
      if (todo) todo.status = !todo.status;
    },

    setSearch: (state, action) => {
      state.search = action.payload;
    },

    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;  
    },
  },
});

export const {
  deleteUser,
  setInpTitle,
  addUser,
  startEdit,
  saveEdit,
  toggleStatus,
  setSearch,
  setFilterStatus,
} = sync.actions;

export default sync.reducer;
