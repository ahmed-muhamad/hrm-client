import { Employee } from "../interfaces";
import editIcon from "/assets/svg/editIcon.svg";
import garbageCanIcon from "/assets/svg/garbageCan.svg";
import { addAndRemoveClassName } from "global/utils";
import { useEffect, useRef } from "react";

interface Props {
	employees: Array<Employee>;
	setIsModalBackdrop: React.Dispatch<React.SetStateAction<boolean>>;
	setEmployeeIndexToEdit: React.Dispatch<React.SetStateAction<number>>;
	setEmployeeIdToDelete: React.Dispatch<React.SetStateAction<number>>;
	setEmployeeRowToScrollTo: React.Dispatch<
		React.SetStateAction<HTMLTableRowElement | null>
	>;
	setIsModalEditForm: React.Dispatch<React.SetStateAction<boolean>>;
	setIsModalDeletionConfirmation: React.Dispatch<
		React.SetStateAction<boolean>
	>;
	isEmployeeInserted: boolean;
	setIsEmployeeInserted: React.Dispatch<React.SetStateAction<boolean>>;
	highestEmployeeId: number;
}

const EmployeesTableBody = ({
	employees,
	setIsModalBackdrop,
	setIsModalEditForm,
	setIsModalDeletionConfirmation,
	setEmployeeIndexToEdit,
	setEmployeeIdToDelete,
	setEmployeeRowToScrollTo,
	isEmployeeInserted,
	setIsEmployeeInserted,
	highestEmployeeId,
}: Props) => {
	const employeeRow = useRef(null);

	const handleEditButton = (
		employeeIndex: number,
	): React.MouseEventHandler<HTMLButtonElement> => {
		return (event: React.MouseEvent<HTMLButtonElement>): void => {
			setEmployeeIndexToEdit(employeeIndex);
			setIsModalBackdrop(true);
			setIsModalEditForm(true);
			setEmployeeRowToScrollTo(
				event.currentTarget.parentElement
					?.parentElement as HTMLTableRowElement,
			);
		};
	};

	const handleDeleteButton = (
		employeeId: number,
	): React.MouseEventHandler<HTMLButtonElement> => {
		return (): void => {
			setEmployeeIdToDelete(employeeId);
			setIsModalBackdrop(true);
			setIsModalDeletionConfirmation(true);
		};
	};

	const sortedEmployees = employees.sort(
		(employeeA: Employee, employeeB: Employee) =>
			employeeA.name > employeeB.name ? 1 : -1,
	);
	const employeesRows = sortedEmployees.map(
		(employee: Employee, index: number) => {
			return (
				<tr
					key={employee.employee_id}
					ref={
						employee.employee_id === highestEmployeeId
							? employeeRow
							: null
					}>
					<td className="pl-3 py-5">
						<img
							src={employee.image_name}
							alt=""
							className="inline-block w-8 h-8 rounded-full object-cover"
						/>
						<span className="ml-2">{employee.name}</span>
					</td>
					<td className="py-5">{employee.email}</td>
					<td className="py-5">{employee.phone_number}</td>
					<td className="pl-3 py-5">{employee.role}</td>
					<td className="py-5">{employee.employment_type}</td>
					<td className="py-5">{`$${employee.salary}`}</td>
					<td className="pl-3 py-5">
						{employee.remote ? "Yes" : "No"}
					</td>
					<td className="py-5">
						<button
							className="w-6 h-6 translate-y-1 ml-3 mr-3"
							onClick={handleEditButton(index)}>
							<span className="sr-only">edit employee info</span>
							<img src={editIcon} alt="" />
						</button>
					</td>
					<td className="py-5">
						<button
							className="w-6 h-6 translate-y-1 mr-3"
							onClick={handleDeleteButton(employee.employee_id)}>
							<span className="sr-only">delete employee</span>
							<img src={garbageCanIcon} alt="" />
						</button>
					</td>
				</tr>
			);
		},
	);

	useEffect(() => {
		if (isEmployeeInserted) {
			setEmployeeRowToScrollTo(employeeRow.current);
			setIsEmployeeInserted(false);
			// Animate new employee with green border
			addAndRemoveClassName(
				employeeRow.current,
				"relative after:content-[''] after:absolute after:top-0 after:left-0 after:block \
				after:w-full after:h-full after:rounded-2xl after:shadow-[inset_0_0_0_3px_rgba(34,197,94,1)] \
				after:animate-fade",
				2000,
			);
		}
	});
	return (
		<tbody className="divide-y-2 divide-[#272727] text-white">
			{employeesRows}
		</tbody>
	);
};

export { EmployeesTableBody };
