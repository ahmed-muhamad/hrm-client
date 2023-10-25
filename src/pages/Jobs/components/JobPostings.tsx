import { Job } from "../interfaces";
import editIcon from "assets/svg/jobEditingIcon.svg";
import deleteIcon from "assets/svg/jobGarbageCan.svg";
import locationPinIcon from "assets/svg/locationPin.svg";
import mortarboard from "assets/svg/mortarboard.svg";

interface Props {
	jobsData: Array<Job>;
	setIsModalBackdrop: React.Dispatch<React.SetStateAction<boolean>>;
	setIsModalConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
	setJobIndexToEdit: React.Dispatch<React.SetStateAction<number>>;
	setIsModalEditForm: React.Dispatch<React.SetStateAction<boolean>>;
	setJobIdToDelete: React.Dispatch<React.SetStateAction<number>>;
}
const JobPostings = ({
	jobsData,
	setIsModalBackdrop,
	setIsModalConfirmDelete,
	setJobIndexToEdit,
	setJobIdToDelete,
	setIsModalEditForm,
}: Props) => {
	const afterBackgroundColors = [
		"after:bg-[#29C5EE]",
		"after:bg-[#CF1A2C]",
		"after:bg-[#EAB04D]",
		"after:bg-[#19C8A7]",
	] as const;

	const blurBackgroundColors = [
		"bg-[#29C5EE]/[.15]",
		"bg-[#CF1A2C]/[.15]",
		"bg-[#EAB04D]/[.15]",
		"bg-[#19C8A7]/[.15]",
	] as const;

	const handleEditButton = (
		jobIndex: number,
	): React.ReactEventHandler<HTMLButtonElement> => {
		return (): void => {
			setIsModalBackdrop(true);
			setIsModalEditForm(true);
			setJobIndexToEdit(jobIndex);
		};
	};

	const handleDeleteButton = (
		jobPostingId: number,
	): React.ReactEventHandler<HTMLButtonElement> => {
		return (): void => {
			setIsModalBackdrop(true);
			setIsModalConfirmDelete(true);
			setJobIdToDelete(jobPostingId);
		};
	};

	const jobPostings = jobsData.map((jobData: Job, index: number) => {
		const afterBackgroundColor: string =
			afterBackgroundColors[index % afterBackgroundColors.length];

		const blurBackgroundColor: string =
			blurBackgroundColors[index % blurBackgroundColors.length];

		const differenceInMilliseconds: number =
			+new Date() - +new Date(jobData.created_at);
		const differenceInDays: number = Math.round(
			differenceInMilliseconds / (1000 * 60 * 60 * 24),
		);
		return (
			<li
				className={`relative overflow-hidden bg-[#1E1E1E] w-full h-full pt-5 pb-6 px-8 rounded-2xl after:content-['']
				after:absolute after:top-0 after:left-0 ${afterBackgroundColor} after:w-1.5 after:h-full`}
				key={jobData.job_posting_id}>
				{/* Blurred Circle */}
				<div
					className={`w-40 h-40 ${blurBackgroundColor} rounded-full absolute -right-4 -top-4 blur-xl`}></div>
				<article>
					<header>
						<h2 className="max-w-[16rem] font-bold text-white text-lg">
							{jobData.job_title}
						</h2>
						<p className="mt-1 font-medium text-[#898989] text-xs">
							Posted {differenceInDays} days ago
						</p>
					</header>
					<div className="relative right-1 flex mt-5">
						<p className="flex justify-center items-center bg-[#282828] w-40 h-7 rounded-3xl font-medium text-[#898989] text-xs">
							<img
								src={locationPinIcon}
								alt=""
								className="mr-1.5"
							/>
							{jobData.employment_type} (
							{jobData.remote ? "Remote" : "Non-remote"})
						</p>
						<p className="flex justify-center items-center bg-[#282828] w-28 h-7 rounded-3xl ml-3 font-medium text-[#898989] text-xs">
							<img src={mortarboard} alt="" className="mr-1.5" />
							{jobData.experience}+ years exp.
						</p>
					</div>
					<footer className="flex flex-wrap items-end mt-6">
						<p className="font-bold text-white text-4xl">
							{jobData.applications}
							<span className="ml-1.5 font-normal text-[#898989] text-xs">
								applications
							</span>
						</p>
						<p className="mb-1 ml-auto mr-3 font-normal text-[#00B85E] text-xs">
							${jobData.min_salary}-$
							{jobData.max_salary}
						</p>
						<div className="absolute top-3 right-3">
							{/* Edit Button */}
							<button
								className="block bg-white w-7 h-7 rounded-full"
								onClick={handleEditButton(index)}>
								<p className="sr-only">edit the job</p>
								<img src={editIcon} alt="" className="p-1" />
							</button>
							{/* Delete Button */}
							<button
								className="bg-white w-7 h-7 rounded-full mt-2"
								onClick={handleDeleteButton(
									jobData.job_posting_id,
								)}>
								<p className="sr-only">delete the job</p>
								<img src={deleteIcon} alt="" className="p-1" />
							</button>
						</div>
					</footer>
				</article>
			</li>
		);
	});
	return <ul className="grid gap-5 grid-cols-3 mt-6">{jobPostings}</ul>;
};

export { JobPostings };
