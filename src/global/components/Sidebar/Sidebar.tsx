import { NavLink } from "react-router-dom";
import mainLogo from "assets/images/star.png";
import { CandidatesIcon } from "./CandidatesIcon.tsx";
import { JobsIcon } from "./JobsIcon.tsx";
import { EmployeesIcon } from "./EmployeesIcon.tsx";
import { IconProps } from "./interfaces";

const Sidebar = () => {
	const colorizeActiveLink = ({ isActive }: { isActive: boolean }): string =>
		`flex items-center w-[15.625rem] h-12 rounded-r-full ${
			isActive
				? "bg-gradient-145 from-[#6E38E0] to-[#FF5F36] to-80% relative right-8 pl-8 font-semibold"
				: ""
		}`;
	const handleNavLinkChildren = (
		Icon: React.FC<IconProps>,
		navLinkName: string
	) => {
		return ({ isActive }: { isActive: boolean }) => {
			return (
				<>
					<Icon pathFill={isActive ? "white" : "#898989"}></Icon>
					<span
						className={`ml-2 ${
							isActive ? "text-white" : "text-[#898989] w-64"
						}`}>
						{navLinkName}
					</span>
				</>
			);
		};
	};

	return (
		<header className="row-span-2 bg-[#151515] border-r-2 border-r-zinc-800">
			<div className="flex items-center h-16 border-b-2 border-b-zinc-800">
				<img src={mainLogo} alt="" className="w-8 h-8 ml-8" />
				<p className="font-bold text-2xl text-white ml-2">HRM</p>
			</div>
			<div className="ml-8 pt-10 text-[#898989]">
				<h2 className="font-medium text-sm uppercase">recruitment</h2>
				<nav>
					<ul className="text-base mt-2 space-y-2">
						<li>
							<NavLink
								className={colorizeActiveLink}
								to={"/candidates"}>
								{handleNavLinkChildren(
									CandidatesIcon,
									"Candidates"
								)}
							</NavLink>
						</li>
						<li>
							<NavLink
								className={colorizeActiveLink}
								to={"/jobs"}>
								{handleNavLinkChildren(JobsIcon, "Jobs")}
							</NavLink>
						</li>
					</ul>
					<h2 className="mt-10 font-medium text-sm uppercase">
						organization
					</h2>
					<ul className="text-base mt-2">
						<li>
							<NavLink
								className={colorizeActiveLink}
								to={"/employees"}>
								{handleNavLinkChildren(
									EmployeesIcon,
									"Employees"
								)}
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export { Sidebar };
