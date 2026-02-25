import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  MenuItem,
} from "@mui/material";

/* ✅ DARK GREEN */
const themeColor = "#14532d";

function Equipment() {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      {/* PAGE TITLE */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Equipment Management
      </Typography>

      {/* ✅ ADD BUTTON - DARK GREEN */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: themeColor,
          color: "white",
          "&:hover": { backgroundColor: "#166534" },
        }}
        onClick={() => setOpen(true)}
      >
        Add Equipment
      </Button>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add Equipment
          </Typography>

          <TextField fullWidth label="Equipment Name" margin="normal" />

          <TextField fullWidth select label="Equipment Type" margin="normal">
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Mechanical">Mechanical</MenuItem>
            <MenuItem value="Chemical">Chemical</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Quantity"
            type="number"
            margin="normal"
          />

          <TextField fullWidth label="Lab Name" margin="normal" />

          <TextField fullWidth select label="Condition" margin="normal">
            <MenuItem value="Working">Working</MenuItem>
            <MenuItem value="Maintenance">Under Maintenance</MenuItem>
          </TextField>

          {/* ✅ SUBMIT BUTTON - DARK GREEN */}
          <Button
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: themeColor,
              color: "white",
              "&:hover": { backgroundColor: "#166534" },
            }}
            onClick={() => {
              alert("Equipment Added Successfully");
              setOpen(false);
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default Equipment;
