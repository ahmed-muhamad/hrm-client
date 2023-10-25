import { HIRING_PROCESS, HIRING_PROCESS_STAGES_STATUS } from "../constants";

export type HiringProcessStage = (typeof HIRING_PROCESS)[number][1];

export type HiringProcessStageStatus =
	(typeof HIRING_PROCESS_STAGES_STATUS)[keyof typeof HIRING_PROCESS_STAGES_STATUS];

export type HiringProcessStagesCurrentStatus = {
	[Key in HiringProcessStage]: HiringProcessStageStatus;
};
