import { useRef } from "react";

interface Props {
	resetModalsAndModalBackdrop: () => void;
	children: JSX.Element;
}

const CandidateModalBackdrop = ({
	resetModalsAndModalBackdrop,
	children,
}: Props) => {
	const modalBackdrop = useRef<HTMLDivElement>(null);
	const handleModalBackdrop = (
		event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
	): void => {
		if (event.target === modalBackdrop.current)
			resetModalsAndModalBackdrop();
	};

	return (
		<div
			className="fixed z-50 top-0 left-0 bg-white/[.12] w-screen h-screen backdrop-blur-sm"
			ref={modalBackdrop}
			onClick={handleModalBackdrop}>
			{children}
		</div>
	);
};

export { CandidateModalBackdrop };
