import checkmark from "assets/svg/applicationDetailsCheckmark.svg";

const CheckmarkIcon = () => {
	return (
		<div className="flex justify-center items-center bg-[#00B85E] w-10 h-10 rounded-full">
			<img src={checkmark} alt="" />
		</div>
	);
};

export { CheckmarkIcon };
