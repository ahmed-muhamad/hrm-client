import { useState, createContext, useContext } from "react";
import { Candidate } from "../interfaces";

interface CandidateContextValues {
	candidate: Candidate;
	setCandidate: React.Dispatch<React.SetStateAction<Candidate>>;
	setCandidates: React.Dispatch<React.SetStateAction<Array<Candidate>>>;
}

interface Props {
	children: JSX.Element;
	setCandidates: React.Dispatch<React.SetStateAction<Array<Candidate>>>;
}

const CandidateContext = createContext<CandidateContextValues>(null as any);

export const useCandidateContext = () => {
	return useContext(CandidateContext);
};

export const CandidateContextProvider = ({
	children,
	setCandidates,
}: Props) => {
	const [candidate, setCandidate] = useState<Candidate>({} as any);

	const value = {
		candidate,
		setCandidate,
		setCandidates,
	};
	return (
		<CandidateContext.Provider value={value}>
			{children}
		</CandidateContext.Provider>
	);
};
