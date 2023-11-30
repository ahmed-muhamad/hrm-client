import { useState } from "react";
import { FormDataFilledByUser } from "../interfaces";

interface Props {
	setFormDataFilledByUser: React.Dispatch<
		React.SetStateAction<FormDataFilledByUser>
	>;
}

const JobsFormControls = ({ setFormDataFilledByUser }: Props) => {
	const [selectedOption, setSelectedOption] = useState<string>("");
	const options = [
		{ label: "yes", value: "1" },
		{ label: "no", value: "0" },
	] as const;

	const handleNewData = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setFormDataFilledByUser((prevJobs: FormDataFilledByUser) => {
			const { name, value } = event.target;
			return { ...prevJobs, [name]: value.trim() };
		});
	};

	const handleSelectOption = (
		event: React.ChangeEvent<HTMLInputElement>,
		currentSelectedOption: string,
	): void => {
		const prevSelectedOpition = selectedOption;
		const isCurrentSelectedOptionSameAsPrev =
			currentSelectedOption === prevSelectedOpition;
		setSelectedOption(() =>
			isCurrentSelectedOptionSameAsPrev ? "" : currentSelectedOption,
		);
		setFormDataFilledByUser((prevJobs: FormDataFilledByUser) => {
			const { name, value } = event.target;
			return {
				...prevJobs,
				[name]: isCurrentSelectedOptionSameAsPrev ? "" : Number(value),
			};
		});
	};

	return (
		<>
			<div className="grid">
				<label htmlFor="job_title">Job title:</label>
				<input
					type="text"
					id="job_title"
					name="job_title"
					maxLength={60}
					className="bg-[#363636] px-3 rounded-md"
					onChange={handleNewData}
				/>
			</div>

			<div className="grid">
				<label htmlFor="experience">Experience:</label>
				<input
					type="text"
					id="experience"
					name="experience"
					maxLength={3}
					className="bg-[#363636] px-3 rounded-md"
					onChange={handleNewData}
				/>
			</div>

			<div className="grid">
				<label htmlFor="employment_type">Employment type:</label>
				<input
					type="text"
					id="employment_type"
					name="employment_type"
					maxLength={14}
					className="bg-[#363636] px-3 rounded-md"
					onChange={handleNewData}
				/>
			</div>

			<div className="grid">
				<label htmlFor="min_salary">Min salary:</label>
				<input
					type="text"
					id="min_salary"
					name="min_salary"
					maxLength={7}
					className="bg-[#363636] px-3 rounded-md"
					onChange={handleNewData}
				/>
			</div>

			<div className="grid">
				<label htmlFor="max_salary">Max salary:</label>
				<input
					type="text"
					id="max_salary"
					name="max_salary"
					maxLength={13}
					className="bg-[#363636] px-3 rounded-md"
					onChange={handleNewData}
				/>
			</div>

			<fieldset className="col-span-2">
				<legend>Remote:</legend>
				<div>
					{options.map((option, index) => (
						<label
							htmlFor={option.label}
							key={index}
							className={`grid gap-x-1 grid-cols-[1.25rem_auto] items-center mt-1.5 ${
								option.label === selectedOption
									? "font-medium text-green-400"
									: ""
							}`}>
							<input
								type="checkbox"
								id={option.label}
								name="remote"
								value={option.value}
								checked={option.label === selectedOption}
								onChange={(
									event: React.ChangeEvent<HTMLInputElement>,
								) => handleSelectOption(event, option.label)}
								className="appearance-none grid place-content-center bg-white w-4 h-4 border-2
									border-white rounded-full after:content-[''] after:w-3 after:h-3 after:rounded-full
									after:shadow-[inset_1rem_1rem_rgba(74,222,128,1)] after:scale-0 after:checked:scale-100
									after:duration-150 after:transition-transform after:ease-in-out"
							/>
							{option.label}
						</label>
					))}
				</div>
			</fieldset>
		</>
	);
};

export { JobsFormControls };
