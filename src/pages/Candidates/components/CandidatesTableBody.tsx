import { useCandidateContext } from "../context";
import { Candidate } from "../interfaces";

interface Props {
	candidates: Array<Candidate>;
	setIsModalBackdrop: React.Dispatch<React.SetStateAction<boolean>>;
}

const CandidatesTableBody = ({ candidates, setIsModalBackdrop }: Props) => {
	const { setCandidate } = useCandidateContext();

	const handleCandidate = (
		candidateIndex: number,
	): React.MouseEventHandler<HTMLTableRowElement> => {
		return (): void => {
			setIsModalBackdrop(true);
			setCandidate(candidates[candidateIndex]);
		};
	};

	const candidatesSortedByName = candidates.sort(
		(candidateA: Candidate, candidateB: Candidate) =>
			candidateA.name > candidateB.name ? 1 : -1,
	);

	const candiatesRows = candidatesSortedByName.map(
		(candidate: Candidate, index: number) => {
			return (
				<tr
					key={candidate.candidate_id}
					className="hover:cursor-pointer"
					onClick={handleCandidate(index)}
					tabIndex={0}>
					<td className="py-5">
						<img
							src={candidate.image_name}
							alt=""
							className="inline-block w-8 h-8 rounded-full object-cover"
						/>
						<span className="ml-2">{candidate.name}</span>
					</td>
					<td className="py-5">{candidate.email}</td>
					<td className="py-5">{candidate.phone_number}</td>
					<td className="py-5">{candidate.applied_role}</td>
					<td className="py-5">{candidate.employment_type}</td>
					<td className="py-5">{`${candidate.experience}`}</td>
					<td className="py-5">
						{candidate.isAccepted === null
							? "In progress"
							: candidate.isAccepted
							? "Yes"
							: "No"}
					</td>
				</tr>
			);
		},
	);

	return (
		<tbody className="divide-y-2 divide-[#272727] text-white">
			{candiatesRows}
		</tbody>
	);
};

export { CandidatesTableBody };
