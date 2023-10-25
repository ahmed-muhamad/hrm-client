import { useState } from "react";
import { FormDataFilledByUser, Job } from "./interfaces";
import { JobsFormControls, JobPostings, AddJobButton } from "./components";
import {
	ModalBackdrop,
	ModalCancelButton,
	ModalDeleteConfirmation,
	ModalForm,
} from "global/components";
import { ModalCancelButtonVariants } from "global/enums";
import { extractHighestId } from "global/utils";
import {
	validateRequiredInputFields,
	validateInputFieldsTypes,
	countInputFieldsFilledByUser,
} from "./utils";
import { jobsDummyData } from "./dummyData";

const Jobs = () => {
	const [jobs, setJobs] = useState<Array<Job>>(jobsDummyData);

	const [jobIndexToEdit, setJobIndexToEdit] = useState<number>(-1);
	const [jobIdToDelete, setJobIdToDelete] = useState<number>(-1);

	const [isModalBackdrop, setIsModalBackdrop] = useState<boolean>(false);
	const [isModalConfirmDelete, setIsModalConfirmDelete] =
		useState<boolean>(false);
	const [isModalEditForm, setIsModalEditForm] = useState<boolean>(false);
	const [isModalAddForm, setIsModalAddForm] = useState<boolean>(false);

	const [highestJobId, setHighestJobId] = useState<number>(
		extractHighestId(jobs, "job_posting_id"),
	);
	const [formDataFilledByUser, setFormDataFilledByUser] =
		useState<FormDataFilledByUser>({});

	const resetModalsAndModalBackdrop = () => {
		setIsModalBackdrop(false);
		setIsModalEditForm(false);
		setIsModalConfirmDelete(false);
		setIsModalAddForm(false);
	};

	const handleAddJob = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!validateRequiredInputFields(formDataFilledByUser)) return;
		setJobs((prevJobs: Array<Job>) => {
			const newJob: Job = formDataFilledByUser as Job;
			newJob.job_posting_id = highestJobId + 1;
			setHighestJobId(highestJobId + 1);
			return [...prevJobs, newJob];
		});
		resetModalsAndModalBackdrop();
		setFormDataFilledByUser({});
	};

	const handleEditJob = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!validateInputFieldsTypes(formDataFilledByUser)) return;

		const INPUT_FIELDS_COUNT_FILLED_BY_USER: number =
			countInputFieldsFilledByUser(formDataFilledByUser);
		if (INPUT_FIELDS_COUNT_FILLED_BY_USER === 0) {
			alert("Please fill in at least one input field to submit");
			return;
		}
		setJobs((prevJobs: Array<Job>) => {
			const jobToEdit: Job = prevJobs[jobIndexToEdit];
			let key: keyof FormDataFilledByUser;
			let value: FormDataFilledByUser[typeof key];
			// Edit job data
			for ([key, value] of Object.entries(formDataFilledByUser) as Array<
				[typeof key, typeof value]
			>) {
				if (value) (jobToEdit[key] as Job[keyof Job]) = value;
			}
			jobToEdit.updated_at = new Date()
				.toISOString()
				.slice(0, 19)
				.replace("T", " ");
			return [...prevJobs];
		});
		resetModalsAndModalBackdrop();
		setFormDataFilledByUser({});
	};

	const handleDeleteJob = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setJobs((prevJobs: Array<Job>) => {
			return prevJobs.filter(
				(job: Job) => job.job_posting_id !== jobIdToDelete,
			);
		});
		resetModalsAndModalBackdrop();
	};

	const modals: Readonly<Array<readonly [boolean, JSX.Element]>> = [
		[
			isModalConfirmDelete,
			<ModalDeleteConfirmation
				handleDelete={handleDeleteJob}
				item="job"
				modalCancelButtonComponent={
					<ModalCancelButton
						resetModalsAndModalBackdrop={
							resetModalsAndModalBackdrop
						}
						variant={ModalCancelButtonVariants.GRAY}
					/>
				}></ModalDeleteConfirmation>,
		],
		[
			isModalEditForm || isModalAddForm,
			<ModalForm
				handleSubmit={isModalAddForm ? handleAddJob : handleEditJob}
				modalCancelButtonComponent={
					<ModalCancelButton
						resetModalsAndModalBackdrop={
							resetModalsAndModalBackdrop
						}
						variant={ModalCancelButtonVariants.RED}
						extraClassNames={"ml-auto"}
					/>
				}>
				<JobsFormControls
					setFormDataFilledByUser={setFormDataFilledByUser}
				/>
			</ModalForm>,
		],
	];

	const selectModalTodisplay = (): JSX.Element => {
		let isDisplayModal: boolean;
		let modalComponent: JSX.Element;
		for ([isDisplayModal, modalComponent] of modals) {
			if (isDisplayModal) return modalComponent;
		}
		return <></>;
	};

	//console.log(dataPost);
	return (
		<div className="bg-primary pt-8 pb-10 px-6">
			<div className={"flex"}>
				<h2
					className="ml-1 mr-5 font-bold text-left text-white text-3xl"
					aria-hidden="true">
					Current Openings
				</h2>
				<AddJobButton
					setIsModalBackdrop={setIsModalBackdrop}
					setIsModalAddForm={setIsModalAddForm}
				/>
			</div>
			{!jobs.length && (
				<p className="pb-5 mt-12 font-semibold text-white text-xl text-center">
					There are no availabe job openings. If you wish, you can add
					them by clicking on the "Add Job Posting" button
				</p>
			)}

			{!!jobs.length && (
				<JobPostings
					jobsData={jobs}
					setIsModalBackdrop={setIsModalBackdrop}
					setIsModalConfirmDelete={setIsModalConfirmDelete}
					setJobIndexToEdit={setJobIndexToEdit}
					setJobIdToDelete={setJobIdToDelete}
					setIsModalEditForm={setIsModalEditForm}
				/>
			)}
			{isModalBackdrop && (
				<ModalBackdrop
					resetModalsAndModalBackdrop={resetModalsAndModalBackdrop}>
					{selectModalTodisplay()}
				</ModalBackdrop>
			)}
		</div>
	);
};

export { Jobs };
