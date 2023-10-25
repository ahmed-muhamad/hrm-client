interface Props {
	children: string;
	handleAddButton: React.MouseEventHandler<HTMLButtonElement>;
}

const AddButton = ({ children, handleAddButton }: Props) => {
	return (
		<button
			className="bg-green-500 px-3 rounded-lg text-white"
			onClick={handleAddButton}>
			{children}
		</button>
	);
};

export { AddButton };
