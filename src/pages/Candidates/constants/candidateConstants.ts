export const HIRING_PROCESS = [
	["SCREENING", "Screening"],
	["DESIGN_CHALLENGE", "Design Challenge"],
	["INTERVIEW", "Interview"],
	["HR_ROUND", "HR Round"],
	["HIRED", "Hired"],
] as const;

export const HIRING_PROCESS_STAGES_STATUS = {
	SUCCESS: "Success",
	UNDER_REVIEW: "Under review",
	FAILURE: "Failure",
	HAS_NOT_REACHED_THIS_STAGE: "",
} as const;
