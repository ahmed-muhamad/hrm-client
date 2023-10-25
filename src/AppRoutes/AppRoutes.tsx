import { Routes, Route, Navigate } from "react-router-dom";
import { Candidates, Jobs, Employees } from "../pages";
import { MainLayout } from "global/Layouts";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to={"/employees"} replace />} />
			<Route element={<MainLayout />}>
				<Route path="/candidates" element={<Candidates />} />
				<Route path="/jobs" element={<Jobs />} />
				<Route path="/employees" element={<Employees />} />
			</Route>
		</Routes>
	);
};
