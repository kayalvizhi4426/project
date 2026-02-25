import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";

function LabRegistrationForm() {

  const initialFormData = {
    lab_name: "",
    lab_type: "",
    department: "",
    contact_person: "",
    email: "",
    mobile: "",
    country: "",
    state: "",
    city: "",
    area: "",
    pincode: "",
    systems: "",
    internet: "",
    facilities: [],
  }
  const [formData, setFormData] = useState(initialFormData);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const [error, setError] = useState("");
  const [showOthers, setShowOthers] = useState(false);
  const [otherFacilities, setOtherFacilities] = useState([""]);

  /* -------- Input Handlers -------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInternetChange = (e) => {
    setFormData((prev) => ({ ...prev, internet: e.target.value }));
  };

  const handleOtherChange = (index, value) => {
    const updated = [...otherFacilities];
    updated[index] = value;
    setOtherFacilities(updated);
  };

  const addOtherField = () => setOtherFacilities([...otherFacilities, ""]);

  const confirmOthers = () => {
    const cleaned = otherFacilities.filter((v) => v.trim() !== "");
    setFormData((prev) => ({ ...prev, facilities: cleaned }));
    setShowOthers(false);
  };

  /* -------- Submit Form -------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const payload = {
    //   ...formData,
    //   facilities: otherFacilities.filter((v) => v.trim() !== ""),
    // };

    // try {
    //   const res = await axios.post(
    //     "http://127.0.0.1:8000/profile",
    //     payload,
    //     { headers: { "Content-Type": "application/json" } }
    //   );

    //   alert(res.data.message);

    // Reset form

    // setFormData({
    //   lab_name: "",
    //   lab_type: "",
    //   department: "",
    //   contact_person: "",
    //   email: "",
    //   mobile: "",
    //   country: "",
    //   state: "",
    //   city: "",
    //   area: "",
    //   pincode: "",
    //   systems: "",
    //   internet: "",
    //   facilities: [],
    // });

    // setSelectedCountry("");
    // setSelectedState("");
    // setCities([]);
    // setOtherFacilities([""]);

    //   } catch (err) {
    //     console.error(err);
    //     alert("Backend error");
    //   }
    // };
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/profile", formData)
      // await axios.post("http://127.0.0.1:8000/profiles", payload)
      if (data.success) {
        alert("Application Submitted Successfully!")
        setFormData(initialFormData)
      }

    } catch (err) {
      console.error(err);
      alert("Backend ");
    }
  };

  /* -------- Load Existing Profile -------- */
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/profile")
      .then(res => {
        if (res.data) {
          const data = res.data;

          setFormData(data);
          setSelectedCountry(data.country);

          setTimeout(() => {
            setSelectedState(data.state);
          }, 300);

          setOtherFacilities(
            data.facilities?.length ? data.facilities : [""]
          );
        }
      })
      .catch(() => console.log("No existing profile"));
  }, []);

  /* -------- Country API -------- */
  useEffect(() => {
    setLoadingCountries(true);
    axios
      .get("https://countriesnow.space/api/v0.1/countries")
      .then((res) =>
        setCountries(res.data.data.map((c) => c.country))
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoadingCountries(false));
  }, []);

  /* -------- State API -------- */
  useEffect(() => {
    if (!selectedCountry) return setStates([]);
    setLoadingStates(true);
    axios
      .post(
        "https://countriesnow.space/api/v0.1/countries/states",
        { country: selectedCountry.trim() }
      )
      .then((res) =>
        setStates(res.data.data.states.map((s) => s.name))
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoadingStates(false));
  }, [selectedCountry]);

  /* -------- City API -------- */
  useEffect(() => {
    if (!selectedState) return setCities([]);
    setLoadingCities(true);
    axios
      .post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          country: selectedCountry.trim(),
          state: selectedState.trim(),
        }
      )
      .then((res) => {
        if (!res.data.error && Array.isArray(res.data.data)) {
          setCities(res.data.data.map((c) => c.trim()));
        } else {
          setCities([]);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoadingCities(false));
  }, [selectedState, selectedCountry]);


  const buttonStyles = `
     .btn-section-color { background-color: #1B5E20 !important; border-color: #1B5E20 !important; color: white !important; }
    .btn-section-color:hover { background-color: #0D3B13 !important; border-color: #0D3B13 !important; }
    .btn-outline-section-color { color: #1B5E20 !important; border-color: #1B5E20 !important; background-color: transparent !important; }
     .btn-outline-section-color:hover { background-color: #1B5E20 !important; color: white !important; }
    .btn-add-color { background-color: #1B5E20 !important; border-color: #1B5E20 !important; color: white !important; }
     .btn-add-color:hover { background-color: #0D3B13 !important; border-color: #0D3B13 !important; }
   `;

  return (
    <>
      <style>{buttonStyles}</style>
      <Container className="mt-5 mb-5">
        <Form className="p-4 bg-white shadow rounded" onSubmit={handleSubmit}>
          <h3 className="text-center mb-4" style={{ color: "#1B5E20", fontWeight: "bold" }}>Lab Registration Form</h3>
          {error && <p className="text-danger text-center">{error}</p>}

          {/* Lab Details */}
          <Section title="Lab Details">
            <Form.Group className="mb-3">
              <Form.Label>Lab Name</Form.Label>
              <Form.Control name="lab_name" value={formData.lab_name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lab Type</Form.Label>
              <Form.Select name="lab_type" value={formData.lab_type} onChange={handleChange} required>
                <option value="">Select</option>
                <option>Academic</option>
                <option>Research</option>
                <option>Testing</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department / Organization</Form.Label>
              <Form.Control name="department" value={formData.department} onChange={handleChange} required />
            </Form.Group>
          </Section>

          {/* Contact Details */}
          <Section title="Contact Details">
            <Form.Group className="mb-3">
              <Form.Label>Contact Person</Form.Label>
              <Form.Control name="contact_person" value={formData.contact_person} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="number" name="mobile" value={formData.mobile} onChange={handleChange} required />
            </Form.Group>
          </Section>
          {/* Address */}
          <Section title="Address">
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  {loadingCountries ? <Spinner size="sm" /> : (
                    <Form.Select
                      name="country"
                      value={formData.country}
                      onChange={(e) => {
                        handleChange(e);
                        setSelectedCountry(e.target.value);
                        setSelectedState("");
                        setFormData(prev => ({ ...prev, city: "" }));
                        setCities([]);
                      }}
                      required
                    >
                      <option value="">Select Country</option>
                      {countries.map((c, i) => (<option key={i} value={c}>{c}</option>))}
                    </Form.Select>
                  )}
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  {loadingStates ? <Spinner size="sm" /> : (
                    <Form.Select name="state"
                      value={formData.state}
                      onChange={(e) => {
                        handleChange(e);
                        setSelectedState(e.target.value);
                        setFormData(prev => ({ ...prev, city: "" }));
                      }}
                      required
                      disabled={!selectedCountry}
                    >
                      <option value="">Select State</option>
                      {states.map((s, i) => (<option key={i} value={s}>{s}</option>))}
                    </Form.Select>
                  )}
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  {loadingCities ? <Spinner size="sm" /> : (
                    <Form.Select name="city" value={formData.city} onChange={handleChange} required disabled={!selectedState}>
                      <option value="">Select City</option>
                      {cities.map((c, i) => (<option key={i} value={c}>{c}</option>))}
                    </Form.Select>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Area </Form.Label>
                  <Form.Control name="area" value={formData.area} onChange={handleChange} placeholder="Enter area" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control type="number" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Enter pincode" required />
                </Form.Group>
              </Col>
            </Row>
          </Section>

          {/* Facilities */}
          <Section title="Facilities">
            <Form.Group className="mb-3">
              <Form.Label>No. of Systems / Equipment</Form.Label>
              <Form.Control type="number" name="systems" value={formData.systems} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Internet Facility</Form.Label>
              <div>
                <Form.Check inline label="Yes" name="internet" type="radio" value="Yes" checked={formData.internet === "Yes"} onChange={handleInternetChange} />
                <Form.Check inline label="No" name="internet" type="radio" value="No" checked={formData.internet === "No"} onChange={handleInternetChange} />
              </div>
            </Form.Group>
            <Button variant="outline-success" className="btn-outline-section-color" onClick={() => setShowOthers(true)}>Others</Button>
            {showOthers && (
              <div className="mt-3">
                {otherFacilities.map((item, index) => (
                  <Form.Control key={index} className="mb-2" placeholder="Enter other facility" value={item} onChange={(e) => handleOtherChange(index, e.target.value)} />
                ))}
                <Button className="me-2 btn-add-color" onClick={addOtherField}>Add More</Button>
                <Button className="btn-section-color" onClick={confirmOthers}>Confirm</Button>
              </div>
            )}
          </Section>

          <div className="text-center">
            <Button type="submit" className="btn-section-color px-5">Submit</Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

const Section = ({ title, children }) => (
  <div className="border mb-4">
    <div style={headerStyle}>{title}</div>
    <div className="p-3">{children}</div>
  </div>
);

const headerStyle = {
  backgroundColor: "#1B5E20",
  color: "white",
  padding: "8px 12px",
  fontWeight: "bold",
};

export default LabRegistrationForm;

