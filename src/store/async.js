import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";

const API = "http://localhost:3001/todos";

 
export const fetchTodos = createAsyncThunk("async/fetchTodos", async () => {
  const res = await fetch(API);
  return await res.json();
});

export const addTodo = createAsyncThunk(
  "async/addTodo",
  async ({ name, desc, image }) => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description: desc, image, isCompleted: false }),
    });
    const res = await fetch(API);
    return await res.json();
  }
);

export const editTodo = createAsyncThunk(
  "async/editTodo",
  async (todo) => {
    await fetch(`${API}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    const res = await fetch(API);
    return await res.json();
  }
);

export const deleteTodo = createAsyncThunk(
  "async/deleteTodo",
  async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    const res = await fetch(API);
    return await res.json();
  }
);

export const toggleComplete = createAsyncThunk(
  "async/toggleComplete",
  async (todo) => {
    await fetch(`${API}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, isCompleted: !todo.isCompleted }),
    });
    const res = await fetch(API);
    return await res.json();
  }
);

 
const initialState = {
  data: [],
  name: "",
  desc: "",
  image: "",
  search: "",
  filterStatus: "all",
  loading: false,
  error: null,
};

const asyncSlice = createSlice({
  name: "async",
  initialState,
  reducers: {
    setName: (state, action) => { state.name = action.payload },
    setDesc: (state, action) => { state.desc = action.payload },
    setImage: (state, action) => { state.image = action.payload },
    setSearch: (state, action) => { state.search = action.payload },
    setFilterStatus: (state, action) => { state.filterStatus = action.payload },
  },
  extraReducers: (builder) => {
    builder
       .addMatcher(
        isAnyOf(fetchTodos.pending, addTodo.pending, editTodo.pending, deleteTodo.pending, toggleComplete.pending),
        (state) => { state.loading = true; state.error = null }
      )
       .addMatcher(
        isAnyOf(fetchTodos.fulfilled, addTodo.fulfilled, editTodo.fulfilled, deleteTodo.fulfilled, toggleComplete.fulfilled),
        (state, action) => { state.loading = false; state.data = action.payload }
      )
       .addMatcher(
        isAnyOf(fetchTodos.rejected, addTodo.rejected, editTodo.rejected, deleteTodo.rejected, toggleComplete.rejected),
        (state, action) => { state.loading = false; state.error = action.error.message }
      );
  },
});

export const { setName, setDesc, setImage, setSearch, setFilterStatus } = asyncSlice.actions;
export default asyncSlice.reducer;
