import { Box, useColorMode } from "@chakra-ui/react";
import Navbar from './components/Navbar'; // Adjust the path as necessary
import { Routes, Route } from "react-router-dom";
import CreatePage from './pages/CreatePage'; // Adjust the path as necessary
import HomePage from './pages/HomePage'; // Adjust the path as necessary

function App() {
	const { colorMode } = useColorMode();
	return (
		<Box
			minH={"100vh"}
			bg={colorMode === "light" ? "gray.100" : "gray.900"}
		>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/create" element={<CreatePage />} />
			</Routes>
		</Box>
	);
}

export default App;
      