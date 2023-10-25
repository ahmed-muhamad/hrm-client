import { AddButton } from "global/components";

interface Props {
	setIsModalBackdrop: React.Dispatch<React.SetStateAction<boolean>>;
	setIsModalAddForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEmployeeButton = ({
	setIsModalBackdrop,
	setIsModalAddForm,
}: Props) => {
	const handleAddButton = (): void => {
		setIsModalBackdrop(true);
		setIsModalAddForm(true);
	};
	return (
		<AddButton handleAddButton={handleAddButton}>
			{"+ Add Employee"}
		</AddButton>
	);
};

export { AddEmployeeButton };
