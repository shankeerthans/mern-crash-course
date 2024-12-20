import {Route, Routes} from "react-router-dom";
import CreatePage from "./pages/CreatePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import {Box} from "@chakra-ui/react";
import {useColorModeValue} from "./components/ui/color-mode.jsx";

function App() {
  return (
      <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
          <Navbar />
          <Routes>
              <Route path="/create" element={<CreatePage />} />
              <Route path="/" element={<HomePage />} />
          </Routes>
      </Box>
  );
}

export default App
