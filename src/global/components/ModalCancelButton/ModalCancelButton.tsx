import { ModalCancelButtonVariants } from "global/enums";

interface Props {
	resetModalsAndModalBackdrop: () => void;
	variant?: ModalCancelButtonVariants;
	extraClassNames?: string;
}

const ModalCancelButton = ({
	resetModalsAndModalBackdrop,
	variant = ModalCancelButtonVariants.RED,
	extraClassNames,
}: Props) => {
	const MODAL_CANCEL_BUTTON_STYLES = {
		[ModalCancelButtonVariants.RED]: "bg-red-500",
		[ModalCancelButtonVariants.GRAY]: "bg-gray-700",
	};
	return (
		<button
			type="button"
			className={`px-6 py-1 rounded-2xl ${MODAL_CANCEL_BUTTON_STYLES[variant]} ${extraClassNames}`}
			onClick={resetModalsAndModalBackdrop}>
			Cancel
		</button>
	);
};

export { ModalCancelButton };
