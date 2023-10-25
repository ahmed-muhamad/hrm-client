import { useCandidateContext } from "pages/Candidates/context";
import {
	HiringProcessStage as HiringProcessStagesType,
	HiringProcessStagesCurrentStatus,
	HiringProcessStageStatus,
} from "pages/Candidates/types";
import { obtainStagesStatus } from "pages/Candidates/utils";
import { ProceedIcon } from "./ProceedIcon";
import { RejectionIcon } from "./RejectionIcon";

const HiringProcessStages = () => {
	type StageAndStatus = [HiringProcessStagesType, HiringProcessStageStatus];
	const { candidate, setCandidates } = useCandidateContext();

	const STAGES_STATUS: HiringProcessStagesCurrentStatus = obtainStagesStatus(
		candidate.current_stage,
		candidate.isAccepted
	);

	const handleApplicantProceedings = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		const LI_ELEMENT: HTMLLIElement = event.currentTarget.parentElement
			?.parentElement?.nextElementSibling as HTMLLIElement;
		candidate.current_stage = LI_ELEMENT.firstElementChild
			?.textContent as HiringProcessStagesType;

		candidate.isAccepted =
			candidate.current_stage === "Hired" ? true : null;

		setCandidates((prevCandidates) => {
			return [...prevCandidates];
		});
	};

	const handleApplicantRejection = () => {
		candidate.isAccepted = false;
		setCandidates((prevCandidates) => {
			return [...prevCandidates];
		});
	};

	const STAGES = (Object.entries(STAGES_STATUS) as Array<StageAndStatus>).map(
		([stage, status]: StageAndStatus, index: number) => {
			return (
				<li
					key={index}
					className="flex items-center h-10 ml-3 font-semibold text-base">
					<span>{stage}</span>
					<span className="sr-only"> {status}</span>
					{status === "Under review" && (
						<div className="flex ml-auto">
							<button
								className="flex justify-center items-center bg-white w-5 h-5 p-4 rounded-full"
								title="proceed to the next stage"
								onClick={handleApplicantProceedings}>
								<ProceedIcon />
								<span className="sr-only">
									proceed applicant to next stage
								</span>
							</button>
							<button
								className="relative flex justify-center items-center bg-white w-5 h-5 p-4 rounded-full ml-4"
								title="reject candidate"
								onClick={handleApplicantRejection}>
								<RejectionIcon />
								<span className="sr-only">
									reject candidate
								</span>
							</button>
						</div>
					)}
				</li>
			);
		}
	);

	return <ol className="col-start-2 space-y-6 text-white">{STAGES}</ol>;
};

export { HiringProcessStages };
