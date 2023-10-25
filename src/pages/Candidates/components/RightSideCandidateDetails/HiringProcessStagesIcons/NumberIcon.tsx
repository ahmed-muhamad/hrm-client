interface Props {
	digit: number;
}

const NumberIcon = ({ digit }: Props) => {
	return (
		<div
			className="relative z-10 flex justify-center items-center bg-[#262626] w-10 h-10 rounded-full
						font-semibold text-[#898989] text-lg">
			{digit}
		</div>
	);
};

export { NumberIcon };
