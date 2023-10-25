import { AppRoutes } from "AppRoutes";
import { UserContextProvider } from "global/context";

const App = () => {
	return (
		<UserContextProvider>
			<AppRoutes />
		</UserContextProvider>
	);
};

export { App };
