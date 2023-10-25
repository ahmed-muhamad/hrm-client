import { TopBar, Sidebar } from "global/components";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
	return (
		<div className="grid grid-cols-[20%_auto] grid-rows-[4rem_auto] h-screen">
			<Sidebar />
			<TopBar />
			<Outlet />
		</div>
	);
};
