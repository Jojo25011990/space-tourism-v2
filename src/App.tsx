import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Destination from "./pages/Destination";
import Crew from "./pages/Crew";
import Technology from "./pages/Technology";
import Error from "./pages/Error";
import Intro from "./pages/Intro";
import SharedLayout from "./components/SharedLayout";
import Explore from "./pages/Explore";

const App = () => {
	return (
		<>
			<HashRouter>
				<Routes>
					<Route path="/" element={<Intro />} />

					<Route element={<SharedLayout />}>
						<Route path="/home" element={<Home />} />
						<Route path="/destination" element={<Destination />} />
						<Route path="/crew" element={<Crew />} />
						<Route path="/technology" element={<Technology />} />
					</Route>

					<Route path="/explore" element={<Explore />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</HashRouter>
		</>
	);
};

export default App;
