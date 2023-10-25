import { useState } from "react";
import { FormDataFilledByUser } from "../interfaces";

interface Props {
	setFormDataFilledByUser: React.Dispatch<
		React.SetStateAction<FormDataFilledByUser>
	>;
}

const EmployeesFormControls = ({ setFormDataFilledByUser }: Props) => {
	const [selectedOption, setSelectedOption] = useState<string>("");
	const options = [
		{ label: "yes", value: "1" },
		{ label: "no", value: "0" },
	] as const;

	const [imagePreview, setImagePreview] = useState<string>("");

	const handleEmployeeNewData = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setFormDataFilledByUser((prevEmployeeData: FormDataFilledByUser) => {
			const { name, value } = event.target;
			return { ...prevEmployeeData, [name]: value.trim() };
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
		setFormDataFilledByUser((prevEmployees: FormDataFilledByUser) => {
			const { name, value } = event.target;
			return {
				...prevEmployees,
				[name]: isCurrentSelectedOptionSameAsPrev ? "" : Number(value),
			};
		});
	};

	const validateImageSize = (file: File, sizeBytes: number) => {
		if (file.size < sizeBytes) return false;
		window.alert(
			`Please upload a file smaller than ${(
				sizeBytes /
				(1024 * 1024)
			).toFixed(1)} MB`,
		);
		return true;
	};

	const createImagePreview = (file: File) => {
		const imageURL = URL.createObjectURL(file);
		setImagePreview(imageURL);
		return imageURL;
	};

	const handleImage = (
		event: React.ChangeEvent<HTMLInputElement>,
	): boolean => {
		const target = event.target;
		if (!target.files || !target.files[0]) return false;
		const file = target.files[0];
		const imageSizeTooBig = validateImageSize(file, 1572864); // 1572864 bytes => 1.5 MB
		if (imageSizeTooBig) {
			event.target.value = "";
			return false;
		}
		const imageURL = createImagePreview(file);
		setFormDataFilledByUser((prevEmployeeData: FormDataFilledByUser) => {
			const { id } = event.target;
			return {
				...prevEmployeeData,
				[id]: imageURL,
			};
		});
		return true;
	};

	return (
		<>
			<div className="grid">
				<label htmlFor="name">Employee name:</label>
				<input
					type="text"
					id="name"
					name="name"
					className="bg-[#363636] px-3 rounded-md"
					onChange={handleEmployeeNewData}
				/>
			</div>

			<div className="grid">
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					className="bg-[#363636] px-3 rounded-md"
					onChange={handleEmployeeNewData}
				/>
			</div>

			<div className="grid">
				<label htmlFor="phoneNumber">Phone number:</label>
				<input
					type="tel"
					id="phoneNumber"
					name="phoneNumber"
					className="bg-[#363636] px-3 rounded-md"
					onChange={handleEmployeeNewData}
				/>
			</div>

			<div className="grid">
				<label htmlFor="role">Role:</label>
				<input
					type="text"
					id="role"
					name="role"
					className="bg-[#363636] px-3 rounded-md"
					onChange={handleEmployeeNewData}
				/>
			</div>

			<div className="grid">
				<label htmlFor="employmentType">Employment type:</label>
				<input
					type="text"
					id="employmentType"
					name="employmentType"
					className="bg-[#363636] px-3 rounded-md"
					onChange={handleEmployeeNewData}
				/>
			</div>

			<div className="grid">
				<label htmlFor="salary">Salary:</label>
				<input
					type="text"
					id="salary"
					name="salary"
					className="bg-[#363636] px-3 rounded-md"
					onChange={handleEmployeeNewData}
				/>
			</div>

			<fieldset>
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

			<div className="grid grid-cols-2">
				<div className="grid grid-rows-[2.75rem_1fr]">
					<label htmlFor="image_name">Choose an image:</label>
					<input
						type="file"
						id="image_name"
						name="image"
						accept="image/jpeg"
						title=" "
						className="text-transparent"
						onChange={handleImage}
					/>
				</div>
				<img src={imagePreview} alt="" className="h-24 rounded-md" />
			</div>
		</>
	);
};

export { EmployeesFormControls };
