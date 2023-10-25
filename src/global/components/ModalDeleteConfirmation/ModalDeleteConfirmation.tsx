interface Props {
	handleDelete: React.MouseEventHandler<HTMLButtonElement>;
	modalCancelButtonComponent: JSX.Element;
	item: string;
}
const ModalDeleteConfirmation = ({
	handleDelete,
	modalCancelButtonComponent,
	item,
}: Props) => {
	return (
		<div className="absolute inset-0 bg-[#1E1E1E] w-3/6 h-1/4 pt-10 px-2 m-auto rounded-3xl text-white">
			<p className="text-center text-2xl">
				Are you sure you want to delete this {item}?
			</p>
			<div className="flex justify-evenly mt-10">
				{modalCancelButtonComponent}
				<button
					className="bg-red-500 px-6 py-1 rounded-2xl"
					onClick={handleDelete}>
					Delete
				</button>
			</div>
		</div>
	);
};

export { ModalDeleteConfirmation };
