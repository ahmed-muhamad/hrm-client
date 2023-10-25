import { HIRING_PROCESS } from "../constants";

interface Candidate {
	candidate_id: number;
	image_name: string;
	name: string;
	email: string;
	phone_number: string;
	applied_role: string;
	experience: number;
	employment_type: string;
	current_stage: (typeof HIRING_PROCESS)[number][1];
	current_role: string;
	isAccepted: boolean | null;
}

export type { Candidate };
