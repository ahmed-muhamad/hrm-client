import { HiringProcessStages } from "./HiringProcessStages";
import { HiringProcessStagesIcons } from "./HiringProcessStagesIcons";

const ApplicationDetails = () => {
	return (
		<div className="bg-[#1E1E1E] p-4 rounded-xl mt-7">
			<h2 className="font-semibold text-white text-xl">
				Application Details
			</h2>
			<div className="grid grid-cols-[2.5rem_1fr] mt-6">
				<HiringProcessStages />
				<div className="relative col-start-1 row-start-1 flex flex-col items-center">
					{/* The below div is for the dashed line behind the stages*/}
					<div
						className="overflow-hidden absolute w-full h-full after:content-[''] after:absolute after:-inset-[1px]
									after:border-l-[2px] after:border-dashed after:border-[#898989] translate-x-1/2"></div>
					<HiringProcessStagesIcons />
				</div>
			</div>
		</div>
	);
};

export { ApplicationDetails };
