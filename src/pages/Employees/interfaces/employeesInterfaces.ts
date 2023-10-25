interface Employee {
	employee_id: number;
	image_name: string;
	name: string;
	email: string;
	phone_number: string;
	role: string;
	employment_type: string;
	salary: number;
	remote: number;
}

interface FormDataFilledByUser {
	employee_id?: number;
	image_name?: string | File;
	name?: string;
	email?: string;
	phone_number?: string;
	role?: string;
	employment_type?: string;
	salary?: number;
	remote?: number;
}

export type { Employee, FormDataFilledByUser };
