
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Collaboration from "./board/collaboration";
// import Equipments from "./board/equipments";
// import Funding from "./board/funding";
// import LabBooking from "./board/labbooking";
// import LabDashboard from "./board/labdashboard";
// import Profile from "./board/profile";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LabDashboard />} />
//         <Route path="/collaboration" element={<Collaboration />} />
//         <Route path="/equipments" element={<Equipments />} />
//         <Route path="/funding" element={<Funding />} />
//         <Route path="/labbooking" element={<LabBooking />} />
//         <Route path="/profile" element={<Profile />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { Routes, Route } from "react-router-dom";

// import LabDashboard from "./board/labdashboard";
// import LabBooking from "./board/labbooking";
// import Profile from "./board/profile";
// import Collaboration from "./board/collaboration";
// import MyClients from "./pages/ClientForm";

// function App() {
//   return (
//     <Routes>
//       <Route path="/labdashboard" element={<LabDashboard />} />
//       <Route path="/labbooking" element={<LabBooking />} />
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/collaboration" element={<Collaboration />} />
//       <Route path="/client/form" element={<MyClients />} />
//     </Routes>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
// import LabDashboard from "./board/labdashboard";
// import Dashboard from "./board/labdashboard";
// import LabRegistrationForm from "./board/profile";
// import Booking from "./board/booking";
// import Equipment from "./board/equipment";
// import Collaboration from "./board/collaboration";


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LabDashboard />}>

//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="equipment" element={<Equipment />} />
//           <Route path="collaboration" element={<Collaboration />} />
        
//           <Route path="booking" element={<Booking />} />
//             <Route path="profile" element={<LabRegistrationForm />} />

//         </Route>
//       </Routes>
//     </BrowserRouter>
//   ); 
// }

// export default App;



// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LabRegistrationForm from "./board/profile";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LabRegistrationForm />} />
//       </Routes>
//     </BrowserRouter>
//   );





// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LabRegistrationForm from "./board/profile"; 
// // 👆 make sure this file name is correct

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LabRegistrationForm />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// import LabDashboard from "./board/labdashboard";
// import LabRegistrationForm from "./board/profile";
// import Booking from "./board/booking";
// import Equipment from "./board/equipment";
// import Collaboration from "./board/collaboration";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Parent Layout */}
//         <Route path="/" element={<LabDashboard />}>

//           {/* Child Routes */}
//           <Route path="dashboard" element={<LabDashboard />} />
//           <Route path="equipment" element={<Equipment />} />
//           <Route path="collaboration" element={<Collaboration />} />
//           <Route path="booking" element={<Booking />} />
//           <Route path="profile" element={<LabRegistrationForm />} />

//         </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import LabDashboard from "./board/labdashboard";
import LabRegistrationForm from "./board/profile";
import Booking from "./board/booking";
import Equipment from "./board/equipments";   // ✅ FIXED HERE
import Collaboration from "./board/collaboration";
import Dashboard from "./board/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Parent Layout */}
        <Route path="/" element={<LabDashboard />}>

          {/* Child Routes */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="equipment" element={<Equipment />} />
          <Route path="collaboration" element={<Collaboration />} />
          <Route path="booking" element={<Booking />} />
          <Route path="profile" element={<LabRegistrationForm />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

