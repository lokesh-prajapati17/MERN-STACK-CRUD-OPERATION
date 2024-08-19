import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
  TableBody,
  Stack,
  Button,
  IconButton,
  Dialog,
} from "@mui/material";
import { deleteData, getData } from "../Services/urls";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import EditData from "./EditData";

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [buttonTitle, setButtonTitle] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentData(null);
  };
  const getDataApi = async () => {
    try {
      const response = await fetch(getData);
      const data = await response.json();
      if (data) {
        setTableData(data);
      }
    } catch (error) {
      console.error("ERROR TO GET DATA", error);
    }
  };

  useEffect(() => {
    getDataApi();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(deleteData + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        getDataApi();
      }
    } catch (error) {
      console.error("ERROR TO DELETE DATA", error);
    }
  };

  return (
    <Box sx={{ margin: 15 }}>
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        fullWidth
        closeAfterTransition
        sx={{
          padding: 3,
        }}
      >
        <Box sx={{ margin: 5 }}>
          <Typography sx={{ marginBottom: 1 }} fontWeight={"bold"}>
            {buttonTitle} Data
          </Typography>
          <EditData
            setOpen={setOpen}
            id={currentData?._id}
            getDataApi={getDataApi}
            buttonTitle={buttonTitle}
          />
        </Box>
      </Dialog>
      <Button
        variant="contained"
        sx={{ margin: 2, float: "right" }}
        startIcon={<AddIcon />}
        onClick={() => {
          handleOpen();
          setButtonTitle("Add");
        }}
      >
        Add
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight={"bold"}>SR. No.</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"}>Name</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"}>E-mail</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"}>Phone</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"}>Age</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={"bold"}>Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((value, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Typography>{index + 1}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{value?.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{value?.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{value?.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{value?.age}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          handleOpen();
                          setCurrentData(value);
                          setButtonTitle("Update");
                        }}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(value?._id)}
                        color="error"
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
