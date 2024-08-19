import {
  Box,
  Button,
  Divider,
  Grid,
  InputLabel,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { editData, getData, postData } from "../Services/urls";

const EditData = ({ id, setOpen, getDataApi, buttonTitle }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    buttonTitle === "Update" && getDataById();
  }, [id, buttonTitle]);

  const getDataById = async () => {
    try {
      const response = await fetch(getData + id);
      const data = await response.json();
      if (data) {
        setInput(data);
      }
    } catch (error) {
      console.error("ERROR TO GET DATA BY ID", error);
    }
  };

  const handleAddData = async () => {
    try {
      const response = await fetch(postData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (response) {
        getDataById();
        getDataApi();
        setOpen(false);
      }
    } catch (error) {
      console.error("ERROR TO UPDATE DATA", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(editData + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (response) {
        getDataById();
        getDataApi();
        setOpen(false);
      }
    } catch (error) {
      console.error("ERROR TO UPDATE DATA", error);
    }
  };
  return (
    <>
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <InputLabel sx={{ mb: 1 }}>Name</InputLabel>
          <TextField
            name="name"
            fullWidth
            value={input.name}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <InputLabel sx={{ mb: 1 }}>Email</InputLabel>
          <TextField
            name="email"
            type="email"
            fullWidth
            value={input.email}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <InputLabel sx={{ mb: 1 }}>Phone</InputLabel>
          <TextField
            name="phone"
            fullWidth
            value={input.phone}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <InputLabel sx={{ mb: 1 }}>Age</InputLabel>
          <TextField
            name="age"
            fullWidth
            value={input.age}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
      </Grid>
      </Box>

      <hr />
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 3, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            buttonTitle === "Add" ? handleAddData() : handleUpdate();
          }}
        >
          {buttonTitle}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
      </Stack>
    </>
  );
};

export default EditData;
