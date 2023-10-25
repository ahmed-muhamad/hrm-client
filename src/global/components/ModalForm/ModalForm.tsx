interface Props {
	children: JSX.Element;
	handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
	modalCancelButtonComponent: JSX.Element;
	formRef?: React.MutableRefObject<HTMLFormElement>;
}

const ModalForm = ({
	children,
	handleSubmit,
	modalCancelButtonComponent,
	formRef,
}: Props) => {
	return (
		<form
			ref={formRef}
			className="absolute inset-0 bg-[#1E1E1E] w-2/3 h-[30rem] pt-10 px-10 m-auto rounded-3xl text-white">
			<div className="grid gap-y-5 gap-x-10 grid-cols-2 h-full">
				{children}
				<div className="flex items-start col-span-2 -translate-y-5">
					{modalCancelButtonComponent}
					<button
						type="submit"
						className="bg-green-500 px-6 py-1 rounded-2xl ml-5 focus:outline-none focus:outline-stone-400"
						onClick={handleSubmit}>
						Submit
					</button>
				</div>
			</div>
		</form>
	);
};

export { ModalForm };
