import { NavLink } from "react-router-dom";

type NavigationLink = { onClick?: () => void };

type NavigationLinks = {
	mainDescription: string;
	secondDescription: string;
	href: string;
	id: number;
};

const navLinks: NavigationLinks[] = [
	{ mainDescription: "Home", secondDescription: "00", href: "/home", id: 0 },
	{
		mainDescription: "Destination",
		secondDescription: "01",
		href: "/destination",
		id: 1,
	},
	{ mainDescription: "Crew", secondDescription: "02", href: "/crew", id: 2 },
	{
		mainDescription: "Technology",
		secondDescription: "03",
		href: "/technology",
		id: 3,
	},
	{
		mainDescription: "Explore",
		secondDescription: "04",
		href: "/explore",
		id: 4,
	},
];

const NavigationLink = ({ onClick }: NavigationLink) => {
	return (
		<>
			{navLinks.map((navLink) => {
				const { mainDescription, secondDescription, href, id } =
					navLink;

				return (
					<li key={id}>
						<NavLink
							to={href}
							className={"navigation-link nav-link"}
							onClick={onClick}
						>
							<span aria-hidden="true">{secondDescription}</span>{" "}
							{mainDescription}
						</NavLink>
					</li>
				);
			})}
		</>
	);
};

export default NavigationLink;
