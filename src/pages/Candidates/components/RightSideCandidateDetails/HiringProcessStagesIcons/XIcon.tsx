const XIcon = () => {
	return (
		<div className="relative bg-rose-600 w-10 h-10 rounded-full focus:outline-none">
			<span className="absolute inset-0 bg-black w-[3px] h-5 m-auto rounded-full rotate-45"></span>
			<span className="absolute inset-0 bg-black w-[3px] h-5 m-auto rounded-full -rotate-45"></span>
		</div>
	);
};

export { XIcon };
