import {Route, Routes} from "react-router-dom";
import CreatePage from "./pages/CreatePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import {Box} from "@chakra-ui/react";

function App() {
  return (
      <Box minH="100vh">
          <Navbar />
          <Routes>
              <Route path="/create" element={<CreatePage />} />
              <Route path="/" element={<HomePage />} />
          </Routes>
      </Box>
  );
}

export default App
