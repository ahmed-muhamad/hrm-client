import emailIcon from "assets/svg/email.svg";
import oldHeadset from "assets/svg/oldHeadset.svg";
import { ApplicationDetails } from "./ApplicationDetails.tsx";
import { useCandidateContext } from "pages/Candidates/context/CandidateContext.tsx";

interface Props {
	resetModalsAndModalBackdrop: () => void;
}
const RightSideCandidateDetails = ({
	resetModalsAndModalBackdrop,
}: Props) => {
	const { candidate } = useCandidateContext();
	return (
		<div className="overflow-auto absolute right-0 bg-primary w-[28.75rem] h-screen p-6">
			<header className="flex justify-between">
				<h2 className="font-bold text-white text-3xl">
					Candidates Details
				</h2>
				<button
					className="relative bg-[#1E1E1E] w-10 h-10 rounded-full before:content-[''] before:absolute
								before:inset-0 before:bg-[#898989] before:w-[3px] before:h-4 before:m-auto
								before:rounded-full before:rotate-45 after:content-[''] after:absolute
								after:inset-0 after:bg-[#898989] after:w-[3px] after:h-4 after:m-auto
								after:rounded-full after:-rotate-45 focus:outline-none"
					onClick={resetModalsAndModalBackdrop}>
					<span className="sr-only">close candidates details</span>
				</button>
			</header>
			<div className="bg-[#1E1E1E] p-4 rounded-xl mt-7">
				<div>
					<img
						src={candidate.image_name}
						alt=""
						className="w-20 h-20 rounded-full mx-auto object-cover"
					/>
				</div>
				<span className="sr-only">candidate name</span>
				<p className="mt-6 font-semibold text-white text-center text-xl">
					{candidate.name}
				</p>
				<span className="sr-only">candidate current role</span>
				<p className="mt-2 font-normal text-[#898989] text-center text-sm">
					{candidate.current_role}
				</p>
				<address className="grid grid-flow-col gap-8 mt-8 not-italic">
					<div className="flex items-center">
						<img
							src={emailIcon}
							alt=""
							className="bg-[#262626] w-10 h-10 p-3 rounded-full mr-2"
						/>
						<div className="">
							<span className="font-medium text-[#898989] text-xs uppercase">
								email
							</span>
							<p className="w-36 font-medium text-white text-sm break-words">
								{candidate.email}
							</p>
						</div>
					</div>
					<div className="flex items-center">
						<img
							src={oldHeadset}
							alt=""
							className="bg-[#262626] w-10 h-10 p-3 rounded-full mr-2"
						/>
						<div>
							<span className="font-medium text-[#898989] text-xs uppercase">
								phone number
							</span>
							<p className="font-medium text-white text-sm break-words">
								{candidate.phone_number}
							</p>
						</div>
					</div>
				</address>
			</div>
			<ApplicationDetails />
		</div>
	);
};

export { RightSideCandidateDetails };
