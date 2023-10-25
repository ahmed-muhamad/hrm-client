import { useState, useRef } from "react";
import {
	EmployeesFormControls,
	EmployeesTableBody,
	AddEmployeeButton,
} from "./components";
import { Employee, FormDataFilledByUser } from "./interfaces";
import { ModalBackdrop } from "global/components";
import { useScrollToTheRow } from "global/hooks";
import { addAndRemoveClassName, extractHighestId } from "global/utils";
import {
	ModalCancelButton,
	ModalDeleteConfirmation,
	ModalForm,
} from "global/components";
import { ModalCancelButtonVariants } from "global/enums";
import {
	countInputFieldsFilledByUser,
	validateInputFieldsTypes,
	validateRequiredInputFields,
} from "./utils";
import { employeesDummyData } from "./dummyData";

const Employees = () => {
	const [employees, setEmployees] =
		useState<Array<Employee>>(employeesDummyData);

	const [highestEmployeeId, setHighesEmployeetId] = useState<number>(
		extractHighestId(employees, "employee_id"),
	);

	const [employeeIndexToEdit, setEmployeeIndexToEdit] = useState<number>(-1);
	const [employeeIdToDelete, setEmployeeIdToDelete] = useState<number>(-1);

	const [employeeRowToScrollTo, setEmployeeRowToScrollTo] =
		useState<HTMLTableRowElement | null>(null);

	const [formDataFilledByUser, setFormDataFilledByUser] =
		useState<FormDataFilledByUser>({});

	const [isEmployeeEdited, setIsEmployeeEdited] = useState<Array<boolean>>([
		false,
	]);
	const [isEmployeeInserted, setIsEmployeeInserted] =
		useState<boolean>(false);

	const [isModalBackdrop, setIsModalBackdrop] = useState<boolean>(false);
	const [isModalEditForm, setIsModalEditForm] = useState<boolean>(false);
	const [isModalAddForm, setIsModalAddForm] = useState<boolean>(false);
	const [isModalDeletionConfirmation, setIsModalDeletionConfirmation] =
		useState<boolean>(false);

	const wrapperAroundTable = useRef<HTMLTableElement>(null);

	useScrollToTheRow(employeeRowToScrollTo, wrapperAroundTable.current, [
		isEmployeeEdited,
		isEmployeeInserted,
	]);

	const resetModalsAndModalBackdrop = (): void => {
		setIsModalBackdrop(false);
		setIsModalAddForm(false);
		setIsModalEditForm(false);
		setIsModalDeletionConfirmation(false);
	};

	const handleAddEmpoyee = (
		event: React.MouseEvent<HTMLButtonElement>,
	): void => {
		event.preventDefault();
		if (!validateRequiredInputFields(formDataFilledByUser)) return;
		setEmployees((prevEmployees: Array<Employee>) => {
			const newEmployee: Employee = formDataFilledByUser as Employee;
			newEmployee.employee_id = highestEmployeeId + 1;
			setHighesEmployeetId(highestEmployeeId + 1);
			return [...prevEmployees, newEmployee];
		});
		setIsEmployeeInserted(true);
		// Reset states
		resetModalsAndModalBackdrop();
		setFormDataFilledByUser({});
	};

	const handleEditEmployee = (
		event: React.MouseEvent<HTMLButtonElement>,
	): void => {
		event.preventDefault();
		if (!validateInputFieldsTypes(formDataFilledByUser)) return;

		const INPUT_FIELDS_COUNT_FILLED_BY_USER: number =
			countInputFieldsFilledByUser(formDataFilledByUser);
		if (INPUT_FIELDS_COUNT_FILLED_BY_USER === 0) {
			alert("Please fill in at least one input field to submit");
			return;
		}
		setEmployees((prevEmployees: Array<Employee>) => {
			const employeeToEdit: Employee = prevEmployees[employeeIndexToEdit];
			let key: keyof FormDataFilledByUser;
			let value: FormDataFilledByUser[typeof key];
			// Edit employee data
			for ([key, value] of Object.entries(formDataFilledByUser) as Array<
				[typeof key, typeof value]
			>) {
				if (value)
					(employeeToEdit[key] as Employee[keyof Employee]) =
						value as string | number;
				else if (key === "remote" && typeof value === "number") {
					(employeeToEdit[key] as Employee[keyof Employee]) =
						value as string | number;
				}
			}
			return [...prevEmployees];
		});
		// To trigger useScrollToTheRow custom hook
		setIsEmployeeEdited([true]);
		// Animate edited employee with green border
		addAndRemoveClassName(
			employeeRowToScrollTo,
			"relative after:content-[''] after:absolute after:top-0 after:left-0 after:block \
			after:w-full after:h-full after:rounded-2xl after:shadow-[inset_0_0_0_3px_rgba(34,197,94,1)] \
			after:animate-fade",
			2000,
		);
		// Reset States
		resetModalsAndModalBackdrop();
		setFormDataFilledByUser({});
	};

	const handleDeleteEmployee = (
		event: React.MouseEvent<HTMLButtonElement>,
	): void => {
		event.preventDefault();
		setEmployees((prevEmployees: Array<Employee>) => {
			return prevEmployees.filter(
				(employee: Employee) =>
					employee.employee_id !== employeeIdToDelete,
			);
		});
		resetModalsAndModalBackdrop();
	};

	const modals: Readonly<Array<readonly [boolean, JSX.Element]>> = [
		[
			isModalAddForm || isModalEditForm,
			<ModalForm
				handleSubmit={
					isModalAddForm ? handleAddEmpoyee : handleEditEmployee
				}
				modalCancelButtonComponent={
					<ModalCancelButton
						resetModalsAndModalBackdrop={
							resetModalsAndModalBackdrop
						}
						variant={ModalCancelButtonVariants.RED}
						extraClassNames={"ml-auto"}
					/>
				}>
				<EmployeesFormControls
					setFormDataFilledByUser={setFormDataFilledByUser}
				/>
			</ModalForm>,
		],
		[
			isModalDeletionConfirmation,
			<ModalDeleteConfirmation
				handleDelete={handleDeleteEmployee}
				item="employee"
				modalCancelButtonComponent={
					<ModalCancelButton
						resetModalsAndModalBackdrop={
							resetModalsAndModalBackdrop
						}
						variant={ModalCancelButtonVariants.GRAY}
					/>
				}></ModalDeleteConfirmation>,
		],
	];

	const selectModalTodisplay = (): JSX.Element => {
		let isDisplayModal: boolean;
		let modalComponent: JSX.Element;
		for ([isDisplayModal, modalComponent] of modals) {
			if (isDisplayModal) return modalComponent;
		}
		return <></>;
	};

	return (
		<div className="bg-primary pt-8 pb-10 px-6">
			<div className="flex">
				<h2
					className="ml-1 mr-5 font-bold text-left text-white text-3xl"
					aria-hidden="true">
					Employees
				</h2>
				<AddEmployeeButton
					setIsModalBackdrop={setIsModalBackdrop}
					setIsModalAddForm={setIsModalAddForm}
				/>
			</div>
			<div className={"relative bg-[#1E1E1E] pt-5 px-4 mt-5 rounded-2xl"}>
				{/* Elements can be seen(barely) on the top left and top right corner of the table
					when scrolling up within the table. To fix that we add the below div to hide those
					element */}
				{!!employees.length && (
					<div className="absolute z-20 top-4 w-[calc(100%-2rem)] h-4 bg-[#1E1E1E]"></div>
				)}
				{/**/}

				{!employees.length && (
					<p className="pb-5 font-semibold text-white text-xl text-center">
						There are no availabe emplyoees. If you wish, you can
						add them by clicking on the "Add employee" button
					</p>
				)}

				{!!employees.length && (
					<div
						className="overflow-auto h-[calc(100vh-215px)] rounded-2xl"
						ref={wrapperAroundTable}>
						<table className="w-full font-medium">
							<caption className="sr-only ">Employees</caption>
							<thead>
								<tr className="text-left text-[#898989] text-sm uppercase">
									<th className="sticky z-50 top-0 bg-[#262626] py-3 pl-5 rounded-bl-2xl -translate-y-0.5 font-medium">
										employee name
									</th>
									<th className="sticky z-50 top-0 bg-[#262626] py-3 -translate-y-0.5 font-medium">
										email
									</th>
									<th className="sticky z-50 top-0 bg-[#262626] py-3 -translate-y-0.5 font-medium">
										phone number
									</th>
									<th className="sticky z-50 top-0 bg-[#262626] py-3 -translate-y-0.5 font-medium">
										role
									</th>
									<th className="sticky z-50 top-0 bg-[#262626] py-3 -translate-y-0.5 font-medium">
										employment type
									</th>
									<th className="sticky z-50 top-0 bg-[#262626] py-3 -translate-y-0.5 font-medium">
										salary
									</th>
									<th className="sticky z-50 top-0 bg-[#262626] py-3 pl-2 -translate-y-0.5 font-medium">
										remote
									</th>
									{/* Edit button */}
									<th className="sticky z-50 top-0 bg-[#262626] py-3 ml-3 -translate-y-0.5"></th>
									{/* Delete button */}
									<th className="sticky z-50 top-0 bg-[#262626] py-3 rounded-br-2xl rounded-tr-2xl mr-1 -translate-y-0.5"></th>
								</tr>
							</thead>
							{
								<EmployeesTableBody
									employees={employees}
									setIsModalBackdrop={setIsModalBackdrop}
									setIsModalEditForm={setIsModalEditForm}
									setIsModalDeletionConfirmation={
										setIsModalDeletionConfirmation
									}
									setEmployeeIndexToEdit={
										setEmployeeIndexToEdit
									}
									setEmployeeIdToDelete={
										setEmployeeIdToDelete
									}
									setEmployeeRowToScrollTo={
										setEmployeeRowToScrollTo
									}
									isEmployeeInserted={isEmployeeInserted}
									setIsEmployeeInserted={
										setIsEmployeeInserted
									}
									highestEmployeeId={highestEmployeeId}
								/>
							}
						</table>
					</div>
				)}
			</div>
			{isModalBackdrop && (
				<ModalBackdrop
					resetModalsAndModalBackdrop={resetModalsAndModalBackdrop}>
					{selectModalTodisplay()}
				</ModalBackdrop>
			)}
		</div>
	);
};

export { Employees };
