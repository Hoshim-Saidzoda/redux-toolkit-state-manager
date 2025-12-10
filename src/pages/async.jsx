import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodos,
  addTodo,
  editTodo,
  deleteTodo,
  toggleComplete,
  setSearch,
  setFilterStatus,
} from "../store/async";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

const ReduxAsync = () => {
  const { data, search, filterStatus } = useSelector((s) => s.async);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ name: "", desc: "", image: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openAddModal = () => {
    setForm({ name: "", desc: "", image: "" });
    setEditingId(null);
    setModalVisible(true);
  };

  const openEditModal = (todo) => {
    setForm({
      name: todo.name,
      desc: todo.description,
      image: todo.image || "",
    });
    setEditingId(todo.id);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!form.name) return;

    if (editingId) {
      const todo = data.find((t) => t.id === editingId);
      dispatch(
        editTodo({
          ...todo,
          name: form.name,
          description: form.desc,
          image: form.image,
        })
      );
    } else {
      dispatch(
        addTodo({
          name: form.name,
          description: form.desc,
          image: form.image,
        })
      );
    }

    setModalVisible(false);
    setForm({ name: "", desc: "", image: "" });
    setEditingId(null);
  };

  const filtered = data.filter((todo) => {
    const matchesSearch =
      !search ||
      todo.name.toLowerCase().includes(search.toLowerCase()) ||
      todo.description.toLowerCase().includes(search.toLowerCase());

    let matchesStatus = true;
    if (filterStatus === "Active") matchesStatus = todo.isCompleted;
    else if (filterStatus === "InActive") matchesStatus = !todo.isCompleted;

    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Todos
      </Typography>

       <Stack direction="row" spacing={2} mb={3}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />

        <FormControl variant="outlined" size="small">
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={(e) => dispatch(setFilterStatus(e.target.value))}
            label="Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="InActive">InActive</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={openAddModal}>
          Add Todo
        </Button>
      </Stack>

       <Dialog open={modalVisible} onClose={() => setModalVisible(false)}>
        <DialogTitle>{editingId ? "Edit Todo" : "Add Todo"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, width: 400 }}>
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="desc"
              value={form.desc}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Image URL"
              name="image"
              value={form.image}
              onChange={handleChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalVisible(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editingId ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

       <Stack direction="row" spacing={2} flexWrap="wrap">
        {filtered.map((todo) => (
          <Card key={todo.id} sx={{ width: 250, mb: 2 }}>
            {todo.image && (
              <CardMedia
                component="img"
                height="140"
                image={todo.image}
                alt={todo.name}
              />
            )}
            <CardContent>
              <Typography variant="h6" textAlign="center">
                {todo.name}
              </Typography>
              <Typography variant="body2" textAlign="center" mb={1}>
                {todo.description}
              </Typography>

              <Stack direction="row" justifyContent="center" alignItems="center" mb={1}>
                <Checkbox
                  checked={todo.isCompleted}
                  onChange={() => dispatch(toggleComplete(todo))}
                />
                <Typography
                  variant="body2"
                  color={todo.isCompleted ? "green" : "red"}
                >
                  {todo.isCompleted ? "Active" : "Inactive"}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} justifyContent="center">
                <Button size="small" variant="outlined" onClick={() => openEditModal(todo)}>
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => dispatch(deleteTodo(todo.id))}
                >
                  Delete
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default ReduxAsync;
