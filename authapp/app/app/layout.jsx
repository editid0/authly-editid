import NavBar from "./navbar";

export default function AppLayout({ children }) {
	return (
		<div>
			<NavBar />
			{children}
		</div>
	);
}
