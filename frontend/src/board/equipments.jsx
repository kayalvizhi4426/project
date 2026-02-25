import React, { useState } from "react";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";
const labData = [
  {
    lab: "Computer Lab",
    image:
      "https://t4.ftcdn.net/jpg/02/20/24/05/360_F_220240507_Z8WDjgJliVAL5i41G2WjQtAVkSC066lV.jpg",
    equipment: [
      "High-performance Computers",
      "Servers",
      "Licensed Software & IDEs",
      "Networking Devices",
      "UPS / Power Backup",
    ],
  },
  {
    lab: "physics Lab",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTn2vtHxe2jxUoGvJ1vet9LXPjoBDKrOqv0Q&s",
    equipment: [
      "Digital Oscilloscope",
      "Signal Generator",
      "Spectrum Analyzer",
      "Embedded System Kits",
      "Communication Trainer Kits"
    ],
  },
  {
    lab: "Electrical Lab",
    image:
      "https://sece.ac.in/wp-content/uploads/2024/07/EEE-Lab-1-1-1-scaled.jpg",
    equipment: [
      "Electrical Machines",
      "Power Electronics Kits",
      "Control System Trainer",
      "Multimeters",
      "Safety Equipment",
    ],
  },
  {
    lab: "Mechanical Lab",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC2HGydBB2B1zVkh8_lWUq9h2Azo4TLUXtcA&s",
    equipment: [
      "CNC Machine",
      "Universal Testing Machine",
      "Thermal Engineering Test Rigs",
      "Vibration Analysis Setup",
      "Measuring Instruments",
    ],
  },
  {
    lab: "Civil Lab",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUEMDu4-wHTOYJqUCr8S8I7HPsA2Jzpp2dwA&s",
    equipment: [
      "Compression Testing Machine",
      "Soil Testing Equipment",
      "Concrete Mix Design Tools",
      "Surveying Instruments",
    ],
  },
];
function Equipment() {
  const [selectedLab, setSelectedLab] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [image, setImage] = useState(null);
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentCount, setEquipmentCount] = useState("");

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Laboratory Equipment</h3>
        <Button
          onClick={() => setShowAddPopup(true)}
          style={{
            backgroundColor: "#198754",
            borderColor: "#198754",
            color: "#ffffff",
            fontWeight: "500",
            padding: "6px 16px",
          }}
        >
          
          Add
        </Button>
      </div>
      <Row>
        {labData.map((lab, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card
              className="h-100 shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedLab(lab)}
            >
              <Card.Img variant="top" src={lab.image} />
              <Card.Body className="text-center">
                <Card.Title>{lab.lab}</Card.Title>
                <small className="text-muted">
                  Click to view equipment
                </small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        show={selectedLab !== null}
        onHide={() => setSelectedLab(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedLab?.lab} – Equipment</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ul className="list-group">
            {selectedLab?.equipment.map((item, index) => (
              <li key={index} className="list-group-item">
                {item}
              </li>
            ))}
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedLab(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAddPopup}
        onHide={() => setShowAddPopup(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Equipment</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="mb-3">
            <label>Upload Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                setImage(URL.createObjectURL(e.target.files[0]))
              }
            />

            {image && (
              <img
                src={image}
                alt="preview"
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>

          <div className="mb-3">
            <label>Name of the Equipment</label>
            <textarea
              className="form-control"
              rows="2"
              value={equipmentName}
              onChange={(e) => setEquipmentName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>No. of Equipments</label>
            <textarea
              className="form-control"
              rows="1"
              value={equipmentCount}
              onChange={(e) => setEquipmentCount(e.target.value)}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            onClick={() => setShowAddPopup(false)}
            style={{
              backgroundColor: "#198754",
              borderColor: "#198754",
              color: "#ffffff",
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Equipment;