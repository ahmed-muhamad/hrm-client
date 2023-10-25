import { FormDataFilledByUser } from "../interfaces";

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

export const validateInputFieldsTypes = (
	formDataFilledByUser: FormDataFilledByUser
): boolean => {
	const EXPERIENCE = formDataFilledByUser.experience;
	const MIN_SALARY = formDataFilledByUser.min_salary;
	const MAX_SALARY = formDataFilledByUser.max_salary;

	if (EXPERIENCE && isNaN(Number(EXPERIENCE))) {
		alert("Experience can only contain numbers");
		return false;
	} else if (MIN_SALARY && isNaN(Number(MIN_SALARY))) {
		alert("Min salary can only contain numbers");
		return false;
	} else if (MAX_SALARY && isNaN(Number(MAX_SALARY))) {
		alert("Max salary can only contain numbers");
		return false;
	}
	return true;
};

export const validateRequiredInputFields = (
	formDataFilledByUser: FormDataFilledByUser
): boolean => {
	const REQUIRED_INPUT_FIELD_COUNT: number = 6;
	const INPUT_FIELDS_COUNT_FILLED_BY_USER: number =
		countInputFieldsFilledByUser(formDataFilledByUser);

	if (REQUIRED_INPUT_FIELD_COUNT !== INPUT_FIELDS_COUNT_FILLED_BY_USER) {
		alert("Please fill all the input fields");
		return false;
	}
	if (!validateInputFieldsTypes(formDataFilledByUser)) return false;
	return true;
};
