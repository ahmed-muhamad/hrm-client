interface Job {
	job_posting_id: number;
	job_title: string;
	experience: number;
	employment_type: string;
	remote: number;
	min_salary: number;
	max_salary: number;
	created_at: string;
	updated_at?: string;
	applications: number;
}

interface FormDataFilledByUser {
	job_posting_id?: number;
	job_title?: string;
	experience?: number;
	employment_type?: string;
	remote?: number;
	min_salary?: number;
	max_salary?: number;
	created_at?: string;
	updated_at?: string;
}

export type { Job, FormDataFilledByUser };
