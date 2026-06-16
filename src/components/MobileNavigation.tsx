import type { Dispatch, SetStateAction } from "react";
import NavigationLink from "./NavigationLink";

type MobileNavigationProps = {
	isActive: boolean;
	setIsActive: Dispatch<SetStateAction<boolean>>;
};

const MobileNavigation = ({ isActive, setIsActive }: MobileNavigationProps) => {
	const handleClickNavLink = () => setIsActive(() => false);

	return (
		<section
			className={`navigation-mobile ${isActive ? "active" : "no-active"}`}
		>
			{/* #navigation-mobile-menu === aria controls */}
			<nav className="navigation-mobile-menu" id="navigation-mobile-menu">
				<ul>
					<NavigationLink onClick={handleClickNavLink} />
				</ul>
			</nav>
		</section>
	);
};

export default MobileNavigation;
