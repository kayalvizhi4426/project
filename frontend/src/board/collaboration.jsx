import { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CloseIcon from "@mui/icons-material/Close";

export default function MyClients() {
  const [clients, setClients] = useState([]);

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const initialFormData = {
    company: "",
    contact: "",
    email: "",
    industry: "",
    project: "",
    startDate: "",
    status: "Active",
  };

  const [form, setForm] = useState(initialFormData);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/clients");
      setClients(res.data);
    } catch (error) {
      console.log("Error fetching clients:", error);
    }
  };

  const openAdd = () => {
    setEditIndex(null);
    setForm({
      company: "",
      contact: "",
      email: "",
      industry: "",
      project: "",
      startDate: "",
      status: "Active",
    });
    setOpen(true);
  };

  const openEdit = (index) => {
    setEditIndex(index);
    setForm(clients[index]);
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editIndex === null) {
        const response = await axios.post("http://127.0.0.1:8000/client", form);
        if (response.data) {
          fetchClients();
        } 
      }else {
          const clientId = clients[editIndex].id;
          const response = await axios.patch(
            `http://127.0.0.1:8000/client/${clientId}`,
            form,
          );

          if (response.data.success) {
            fetchClients();
          }
        }
    } catch (error) {
      console.error(error.message);
      alert("Failed to Update Client");
    }
    setOpen(false);
  };

  const openDelete = (index) => {
    setDeleteIndex(index);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const clientId = clients[deleteIndex].id;
      const response = await axios.delete(
        `http://127.0.0.1:8000/client/remove/${clientId}`,
      );
      if (response.data.success) {
        fetchClients();
      }
      setDeleteOpen(false)
    } catch (error) {
      console.error(error.message);
      alert("Failed to delete client");
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <PeopleAltIcon color="success" />
          My Clients
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: "#1f4d3a" }}
          onClick={openAdd}
        >
          Add Client
        </Button>
      </Box>

      <Grid container spacing={3} mb={4}>
        {[
          {
            t: "Total Clients",
            v: clients.length,
            s: "All registered clients",
          },
          {
            t: "Active Clients",
            v: clients.filter((c) => c.status === "Active").length,
            s: "Ongoing projects",
          },
          {
            t: "Industries",
            v: new Set(clients.map((c) => c.industry)).size,
            s: "Different sectors",
          },
          {
            t: "Completed Projects",
            v: clients.filter((c) => c.status === "Completed").length,
            s: "Delivered successfully",
          },
        ].map((m, i) => (
          <Grid key={i} size={{ xs: 12, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography>{m.t}</Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  sx={{ color: "#1f4d3a", my: 1 }}
                >
                  {m.v}
                </Typography>
                <Typography color="text.secondary">{m.s}</Typography>
                <Box display="flex" gap={1} mt={2}>
                  <Chip label="+0 today" color="success" size="small" />
                  <Chip
                    label="↑ 0%"
                    color="success"
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>
            Client Details
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Company</b>
                </TableCell>
                <TableCell>
                  <b>Contact Person</b>
                </TableCell>
                <TableCell>
                  <b>Email</b>
                </TableCell>
                <TableCell>
                  <b>Industry</b>
                </TableCell>
                <TableCell>
                  <b>Project</b>
                </TableCell>
                <TableCell>
                  <b>Start Date</b>
                </TableCell>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {clients.map((c, index) => (
                <TableRow key={index}>
                  <TableCell>{c.company}</TableCell>
                  <TableCell>{c.contact}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.industry}</TableCell>
                  <TableCell>{c.project}</TableCell>
                  <TableCell>{c.startDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={c.status}
                      color={c.status === "Active" ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton color="success" onClick={() => openEdit(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => openDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          {editIndex === null ? "Add Client" : "Edit Client"}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="company"
                fullWidth
                label="Company Name"
                value={form.company}
                onChange={HandleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="contact"
                fullWidth
                label="Contact Person"
                value={form.contact}
                onChange={HandleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="email"
                fullWidth
                label="Email"
                value={form.email}
                onChange={HandleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="industry"
                fullWidth
                label="Industry"
                value={form.industry}
                onChange={HandleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="project"
                fullWidth
                label="Project"
                value={form.project}
                onChange={HandleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                name="startDate"
                type="date"
                fullWidth
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                onChange={HandleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                name="status"
                select
                fullWidth
                label="Status"
                value={form.status}
                onChange={HandleChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#1f4d3a" }}
            onClick={handleSave}
          >
            {editIndex === null ? "Add Client" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: "#1f4d3a", color: "#fff" }}>
          Confirm Delete
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Typography>Are you sure you want to delete this client?</Typography>
          <Typography fontWeight="bold" mt={2}>
            {clients[deleteIndex]?.company}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}