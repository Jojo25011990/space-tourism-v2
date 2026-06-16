import { useState, useEffect } from "react";
import Image from "./Image";
import Navigation from "./Navigation";
import SpaceLogo from "../assets/shared/logo.svg";
import MobileNavigation from "./MobileNavigation";
import Button from "./Button";

const Header = () => {
	const [isActive, setIsActive] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 850 && isActive) setIsActive(false);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [isActive]);

	const handleMobileButtons = () =>
		setIsActive((changeButton) => !changeButton);

	return (
		<header className="header">
			<Image
				srcImg={SpaceLogo}
				altImg="Space Tourism Logo - Black Star and White Circle Background"
				className="logo"
			/>

			{/* Navigation - Dekstop | Mobile */}
			<Navigation />
			<MobileNavigation isActive={isActive} setIsActive={setIsActive} />
			{/* End of Navigation - Dekstop | Mobile */}

			<div className="hamburger-menu">
				<Button
					variant="close"
					onClick={handleMobileButtons}
					className={`close-btn ${isActive ? "active" : "no-active"}`}
					arialLabel="Close navigation menu."
					ariaControls="navigation-mobile-menu"
					ariaExpanded={isActive}
				/>

				<Button
					variant="hamburger"
					onClick={handleMobileButtons}
					className={`hamburger-btn ${isActive ? "no-active" : "active"}`}
					arialLabel="Open navigation menu."
					ariaControls="navigation-mobile-menu"
					ariaExpanded={isActive}
				/>
			</div>
		</header>
	);
};

export default Header;
