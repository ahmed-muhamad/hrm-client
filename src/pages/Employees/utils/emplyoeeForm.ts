import { FormDataFilledByUser } from "../interfaces";

function isValidEmail(email: string) {
	return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
		email
	);
}

export const validateInputFieldsTypes = (
	formDataFilledByUser: FormDataFilledByUser
): boolean => {
	const employeeEmail = formDataFilledByUser.email;
	const salary = formDataFilledByUser.salary;

	if (employeeEmail && !isValidEmail(employeeEmail)) {
		alert("Please enter a valid email address");
		return false;
	} else if (salary && isNaN(Number(salary))) {
		alert("Salary can only contain numbers");
		return false;
	}
	return true;
};

export const countInputFieldsFilledByUser = (
	formDataFilledByUser: FormDataFilledByUser
) => {
	let inputFieldsCountFilledByUser: number = 0;

	let key: keyof FormDataFilledByUser;
	for (key in formDataFilledByUser) {
		if (formDataFilledByUser[key] !== "") ++inputFieldsCountFilledByUser;
	}
	return inputFieldsCountFilledByUser;
};

export const validateRequiredInputFields = (
	formDataFilledByUser: FormDataFilledByUser
): boolean => {
	const REQUIRED_INPUT_FIELD_COUNT: number = 8;
	const INPUT_FIELDS_COUNT_FILLED_BY_USER: number =
		countInputFieldsFilledByUser(formDataFilledByUser);

	if (REQUIRED_INPUT_FIELD_COUNT !== INPUT_FIELDS_COUNT_FILLED_BY_USER) {
		alert("Please fill all the input fields");
		return false;
	}
	if (!validateInputFieldsTypes(formDataFilledByUser)) return false;
	return true;
};
