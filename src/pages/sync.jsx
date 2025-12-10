import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addUser,
  deleteUser,
  setInpTitle,
  startEdit,
  saveEdit,
  toggleStatus,
  setSearch,
  setFilterStatus,
} from "../store/sync";

const Syncpage = () => {
  const { data, inpTitle, editId, search, filterStatus } = useSelector((store) => store.sync);
  const dispatch = useDispatch();

   const filtered = data.filter((todo) => {
    const matchesSearch = !search || todo.title.toLowerCase().includes(search.toLowerCase());

    let matchesStatus = true;
    if (filterStatus === "Active") matchesStatus = todo.status;
    else if (filterStatus === "InActive") matchesStatus = !todo.status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: 20 }}>
       <input
        type="text"
        placeholder="Search..."
        value={search || ""}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

       <select value={filterStatus} onChange={(e) => dispatch(setFilterStatus(e.target.value))}>
        <option value="all">All</option>
        <option value="Active">Active</option>
        <option value="InActive">InActive</option>
      </select>

       <div>
        <input
          type="text"
          value={inpTitle}
          onChange={(e) => dispatch(setInpTitle(e.target.value))}
        />
        <button onClick={() => (editId ? dispatch(saveEdit()) : dispatch(addUser()))}>
          {editId ? "Save" : "Add"}
        </button>
      </div>

       {filtered.map((elem) => (
        <div key={elem.id} style={{ border: "1px solid gray", margin: 8, padding: 8 }}>
          <h3>
            {elem.title} - <span style={{ color: elem.status ? "green" : "red" }}>
              {elem.status ? "Active" : "Inactive"}
            </span>
          </h3>
          <button onClick={() => dispatch(deleteUser(elem.id))}>Delete</button>
          <button onClick={() => dispatch(startEdit(elem))}>Edit</button>
          <button onClick={() => dispatch(toggleStatus(elem.id))}>Toggle Status</button>
        </div>
      ))}
    </div>
  );
};

export default Syncpage;
