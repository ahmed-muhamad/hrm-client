import { useState } from "react";
import {
	CandidateModalBackdrop,
	CandidatesTableBody,
	RightSideCandidateDetails,
} from "./components";
import { CandidateContextProvider } from "./context";
import { Candidate } from "./interfaces";
import { candidatesDummyData } from "./dummyData";

const Candidates = () => {
	const [candidates, setCandidates] =
		useState<Array<Candidate>>(candidatesDummyData);
	const [isModalBackdrop, setIsModalBackdrop] = useState<boolean>(false);
	const resetModalsAndModalBackdrop = (): void => {
		setIsModalBackdrop(false);
	};

	return (
		<CandidateContextProvider setCandidates={setCandidates}>
			<div className="bg-primary pt-8 pb-10 px-6">
				<div className="flex">
					<h2
						className="ml-1 mr-5 font-bold text-left text-white text-3xl"
						aria-hidden="true">
						Candidates
					</h2>
				</div>
				<div className="relative bg-[#1E1E1E] pt-5 px-4 mt-5 rounded-2xl">
					{/* Elements can be seen(barely) on the top left and top right corner of the table
					when scrolling up within the table. To fix that we add the below div to hide those
					element */}
					{!!candidates.length && (
						<div className="absolute z-20 top-4 w-[calc(100%-2rem)] h-4 bg-[#1E1E1E]"></div>
					)}
					{/**/}
					{!candidates.length && (
						<p className="pb-5 font-semibold text-white text-xl text-center">
							There are no availabe candidates.
						</p>
					)}

					{!!candidates.length && (
						<div className="overflow-auto h-[calc(100vh-215px)] rounded-2xl">
							<table className="w-full font-medium">
								<caption className="sr-only ">
									Candidates
								</caption>
								<thead>
									<tr className="text-left text-[#898989] text-sm uppercase">
										<th className="sticky z-50 top-0 bg-[#262626] py-3 pl-5 rounded-bl-2xl -translate-y-0.5 font-medium">
											candidate name
										</th>
										<th className="sticky z-50 top-0 bg-[#262626] py-3 -translate-y-0.5 font-medium">
											email
										</th>
										<th className="sticky z-50 top-0 bg-[#262626] py-3 pr-4 -translate-y-0.5 font-medium">
											phone number
										</th>
										<th className="sticky z-50 top-0 bg-[#262626] py-3 -translate-y-0.5 font-medium">
											role
										</th>
										<th className="sticky z-50 top-0 bg-[#262626] py-3 -translate-y-0.5 font-medium">
											employment type
										</th>
										<th className="sticky z-50 top-0 bg-[#262626] py-3 pr-1 -translate-y-0.5 font-medium">
											experience
										</th>
										<th className="sticky z-50 top-0 bg-[#262626] py-3 pr-4 rounded-br-2xl rounded-tr-2xl -translate-y-0.5 font-medium">
											accepted
										</th>
									</tr>
								</thead>
								{
									<CandidatesTableBody
										candidates={candidates}
										setIsModalBackdrop={setIsModalBackdrop}
									/>
								}
							</table>
						</div>
					)}
				</div>
				{isModalBackdrop && (
					<CandidateModalBackdrop
						resetModalsAndModalBackdrop={
							resetModalsAndModalBackdrop
						}>
						<RightSideCandidateDetails
							resetModalsAndModalBackdrop={
								resetModalsAndModalBackdrop
							}
						/>
					</CandidateModalBackdrop>
				)}
			</div>
		</CandidateContextProvider>
	);
};

export { Candidates };
