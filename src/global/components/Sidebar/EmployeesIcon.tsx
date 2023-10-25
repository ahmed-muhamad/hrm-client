import { IconProps } from "./interfaces";

const EmployeesIcon = ({ pathFill }: IconProps) => {
	return (
		<svg
			className="inline-block"
			width="21"
			height="21"
			viewBox="0 0 21 21"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M10.5249 10.3847C12.7582 10.3847 14.5687 8.57422 14.5687 6.34092C14.5687 4.10763 12.7582 2.29718 10.5249 2.29718C8.29162 2.29718 6.48117 4.10763 6.48117 6.34092C6.48117 8.57422 8.29162 10.3847 10.5249 10.3847Z"
				fill={pathFill}
			/>
			<path
				d="M10.5249 12.4066C6.47306 12.4066 3.17337 15.124 3.17337 18.4722C3.17337 18.6986 3.3513 18.8765 3.57774 18.8765H17.472C17.6985 18.8765 17.8764 18.6986 17.8764 18.4722C17.8764 15.124 14.5767 12.4066 10.5249 12.4066Z"
				fill={pathFill}
			/>
		</svg>
	);
};

export { EmployeesIcon };
