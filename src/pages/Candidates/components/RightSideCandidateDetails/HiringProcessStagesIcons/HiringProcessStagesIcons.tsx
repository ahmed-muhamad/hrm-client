import { NumberIcon } from "./NumberIcon.tsx";
import { XIcon } from "./XIcon.tsx";
import { CheckmarkIcon } from "./CheckmarkIcon.tsx";
import { HourglassIcon } from "./HourglassIcon.tsx";
import { obtainStagesStatus } from "pages/Candidates/utils/obtainStatusStages.ts";
import {
	HiringProcessStagesCurrentStatus,
	HiringProcessStageStatus,
} from "pages/Candidates/types/hiringProcessTypes.ts";
import { HIRING_PROCESS_STAGES_STATUS } from "pages/Candidates/constants";
import { useCandidateContext } from "pages/Candidates/context/CandidateContext.tsx";

type Icons = {
	[Key in HiringProcessStageStatus]: JSX.Element;
};

const HiringProcessStagesIcons = () => {
	const { candidate } = useCandidateContext();

	const STATUS_STAGES: HiringProcessStagesCurrentStatus = obtainStagesStatus(
		candidate.current_stage,
		candidate.isAccepted
	);

	const ICONS_STAGES: Array<JSX.Element> = Object.values(STATUS_STAGES).map(
		(status: HiringProcessStageStatus, index: number) => {
			const ICONS: Icons = {
				[HIRING_PROCESS_STAGES_STATUS.SUCCESS]: (
					<CheckmarkIcon key={index} />
				),
				[HIRING_PROCESS_STAGES_STATUS.UNDER_REVIEW]: (
					<HourglassIcon key={index} />
				),
				[HIRING_PROCESS_STAGES_STATUS.FAILURE]: <XIcon key={index} />,
				[HIRING_PROCESS_STAGES_STATUS.HAS_NOT_REACHED_THIS_STAGE]: (
					<NumberIcon key={index} digit={index + 1} />
				),
			};
			return ICONS[status];
		}
	);

	return (
		<div
			className="relative flex flex-col justify-center items-center w-10 space-y-6 font-semibold
						text-[#898989] text-lg"
			aria-hidden={true}>
			{ICONS_STAGES}
		</div>
	);
};

export { HiringProcessStagesIcons };
