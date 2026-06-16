import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import HambugerIcon from "../assets/shared/icon-hamburger.svg";
import CloseIcon from "../assets/shared/icon-close.svg";

type ButtonProps = {
	text?: string;
	className?: string;
	variant?: "planets" | "crew" | "tech" | "close" | "hamburger" | "default";
	arialLabel?: string;
	ariaControls?: string;
	ariaExpanded?: boolean;
	ariaPressed?: boolean;
	onClick?: () => void;
};

const Button = ({
	text = "explore",
	className = "",
	variant = "default",
	arialLabel,
	ariaControls,
	ariaExpanded,
	ariaPressed,
	onClick,
}: ButtonProps) => {
	const homeBtnRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		gsap.fromTo(
			homeBtnRef.current,
			{
				autoAlpha: 0,
				scale: 0,
			},
			{
				autoAlpha: 1,
				scale: 1,
				duration: 0.5,
				delay: 2,
			},
		);
	}, []);

	switch (variant) {
		case "crew":
			return (
				<button
					type="button"
					className={`crew-btn ${className}`}
					aria-label={arialLabel}
					aria-pressed={ariaPressed}
					onClick={onClick}
				></button>
			);

		case "planets":
			return (
				<button
					type="button"
					className={`planets-btn ${className}`}
					aria-label={arialLabel}
					aria-pressed={ariaPressed}
					onClick={onClick}
				>
					{text}
				</button>
			);
		case "tech":
			return (
				<button
					type="button"
					className={`tech-btn ${className}`}
					onClick={onClick}
				>
					{text}
				</button>
			);

		case "close":
			return (
				<button
					className={className}
					onClick={onClick}
					aria-label={arialLabel}
					aria-controls={ariaControls}
					aria-expanded={ariaExpanded}
				>
					<img src={CloseIcon} alt="Close Icon SVG, X shape." />
				</button>
			);

		case "hamburger":
			return (
				<button
					className={className}
					onClick={onClick}
					aria-label={arialLabel}
					aria-controls={ariaControls}
					aria-expanded={ariaExpanded}
				>
					<img
						src={HambugerIcon}
						alt="Hamburger Icon SVG, three lines vertically"
					/>
				</button>
			);
		default:
			return (
				<a
					ref={homeBtnRef}
					href="#destination"
					className={`home-btn ${className}`}
					title="Go to Destination Page."
					aria-label={arialLabel}
				>
					{text}
				</a>
			);
	}
};

export default Button;
