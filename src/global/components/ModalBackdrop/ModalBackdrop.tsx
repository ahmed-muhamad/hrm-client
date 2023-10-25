import { useRef } from "react";

interface Props {
	resetModalsAndModalBackdrop: () => void;
	children: JSX.Element;
}

const ModalBackdrop = ({ resetModalsAndModalBackdrop, children }: Props) => {
	const modalBackdrop = useRef<HTMLDivElement>(null);
	const handleModalBackdrop = (
		event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
	): void => {
		if (event.target === modalBackdrop.current)
			resetModalsAndModalBackdrop();
	};

	return (
		<div
			className="fixed z-50 top-0 left-0 bg-[#676767]/80 w-screen h-screen"
			ref={modalBackdrop}
			onClick={handleModalBackdrop}>
			{children}
		</div>
	);
};

export { ModalBackdrop };
