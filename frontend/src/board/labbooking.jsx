import React from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const themeColor = "#0f766e";

function LabBooking() {
  const [openAddLab, setOpenAddLab] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const [labName, setLabName] = React.useState("");

  const getLabImage = () => {
    if (labName.toLowerCase().includes("computer"))
      return "https://static.vecteezy.com/system/resources/thumbnails/049/218/063/small/row-of-office-computers-displaying-blue-screen-photo.jpeg";
    if (labName.toLowerCase().includes("chemistry"))
      return "https://png.pngtree.com/background/20250106/original/pngtree-the-ingredients-in-a-chemistry-lab-picture-image_13238092.jpg";
    if (labName.toLowerCase().includes("physics"))
      return "https://i.pinimg.com/originals/04/1b/e5/041be592bc36e0b8de5cb16d83aefe6d.png";
    if (labName.toLowerCase().includes("mech"))
      return "https://thelifeofscience.com/wp-content/uploads/2018/02/3965199310_ac4fd66587_b.jpg";

    return "https://cdn-icons-png.flaticon.com/512/2942/2942837.png";
  };

  return (
    <Box>
      {/* PAGE TITLE */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Lab Booking
      </Typography>

      {/* ADD BUTTON – IMMEDIATELY VISIBLE */}
      <Button
        variant="contained"
        sx={{ backgroundColor: themeColor }}
        onClick={() => setOpenAddLab(true)}
      >
        Add
      </Button>

      {/* POPUP 1 */}
      <Modal open={openAddLab} onClose={() => setOpenAddLab(false)}>
        <Box sx={modalStyle}>
          <img
            src="https://www.shutterstock.com/image-photo/chemist-science-scientist-hand-glovedrop-260nw-2584714553.jpg"
            width="80"
            alt="lab"
          />

          <Typography variant="h6">Lab</Typography>

          <TextField
            fullWidth
            label="Lab Name"
            margin="normal"
            onChange={(e) => setLabName(e.target.value)}
          />

          <TextField
            fullWidth
            type="time"
            label="Time"
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <Button
            fullWidth
            sx={btnStyle}
            onClick={() => {
              setOpenAddLab(false);
              setOpenRegister(true);
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      {/* POPUP 2 */}
      <Modal open={openRegister} onClose={() => setOpenRegister(false)}>
        <Box sx={modalStyle}>
          <img src={getLabImage()} width="80" alt="lab" />

          <Typography variant="h6" sx={{ mt: 1 }}>
            {labName}
          </Typography>

          <TextField fullWidth label="Your Name" margin="normal" />
          <TextField fullWidth label="College Name" margin="normal" />
          <TextField fullWidth label="Department" margin="normal" />
          <TextField fullWidth label="Address" margin="normal" />
          <TextField fullWidth label="Contact Number" margin="normal" />
          <TextField fullWidth label="Whatsapp Number" margin="normal" />

          <Button
            fullWidth
            sx={btnStyle}
            onClick={() => {
              alert("Lab Registered Successfully");
              setOpenRegister(false);
            }}
          >
            Register
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
  textAlign: "center",
};

const btnStyle = {
  mt: 2,
  backgroundColor: themeColor,
  color: "white",
  "&:hover": { backgroundColor: "#115e59" },
};

export default LabBooking;