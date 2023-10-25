import { HIRING_PROCESS } from "../constants";
import { HIRING_PROCESS_STAGES_STATUS } from "../constants";
import { HiringProcessStage, HiringProcessStagesCurrentStatus } from "../types";

type HiringProcessStatus = (
	currentStage: HiringProcessStage,
	isAccepted: boolean | null
) => HiringProcessStagesCurrentStatus;
export const obtainStagesStatus: HiringProcessStatus = (
	currentStage,
	isAccepted
) => {
	type Stage = readonly [
		(typeof HIRING_PROCESS)[number][0],
		HiringProcessStage
	];
	const HIRING_PROCESS_IS_ONGOING = isAccepted === null;
	let applicantHasPassedCurrentStage = true;
	const HIRING_PROCESS_CURRENT_STATUS: HiringProcessStagesCurrentStatus =
		{} as HiringProcessStagesCurrentStatus;

	HIRING_PROCESS.forEach(([, stage]: Stage): void => {
		if (
			!isAccepted &&
			!HIRING_PROCESS_IS_ONGOING &&
			currentStage === stage
		) {
			applicantHasPassedCurrentStage = false;
			HIRING_PROCESS_CURRENT_STATUS[stage] =
				HIRING_PROCESS_STAGES_STATUS.FAILURE;
		} else if (HIRING_PROCESS_IS_ONGOING && currentStage === stage) {
			applicantHasPassedCurrentStage = false;
			HIRING_PROCESS_CURRENT_STATUS[stage] =
				HIRING_PROCESS_STAGES_STATUS.UNDER_REVIEW;
		} else if (isAccepted || applicantHasPassedCurrentStage) {
			HIRING_PROCESS_CURRENT_STATUS[stage] =
				HIRING_PROCESS_STAGES_STATUS.SUCCESS;
		} else {
			HIRING_PROCESS_CURRENT_STATUS[stage] =
				HIRING_PROCESS_STAGES_STATUS.HAS_NOT_REACHED_THIS_STAGE;
		}
	});

	return HIRING_PROCESS_CURRENT_STATUS;
};
