import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

type TitleProps = {
	textSpan01?: string;
	textSpan02?: string;
	classNameSpan01?: string;
	classNameSpan02?: string;
	className?: string;
	text?: string;
	isMainHeading?: boolean;
	isSecondaryHeading?: boolean;
	ariaHidden?: boolean;
};

const Title = ({
	textSpan01 = "So, you want to  travel to",
	textSpan02 = "Space",
	classNameSpan01 = "",
	classNameSpan02 = "",
	text = "",
	className = "",
	isMainHeading = false,
	isSecondaryHeading = false,
	ariaHidden,
}: TitleProps) => {
	const titleRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		const splitText = SplitText.create(".home-title-animation", {
			type: "words",
		});

		gsap.set(splitText.words, { y: -50, autoAlpha: 0 });

		gsap.to(splitText.words, {
			y: 0,
			autoAlpha: 1,
			delay: 0.5,
			stagger: 0.1,
		});
	}, []);

	if (isMainHeading) {
		return (
			<h1 className={className} ref={titleRef}>
				<span className={classNameSpan01}>{textSpan01}</span>
				<span className={classNameSpan02}>{textSpan02}</span>
			</h1>
		);
	} else if (isSecondaryHeading) {
		return (
			<h2 className={className}>
				<span className={classNameSpan02} aria-hidden={ariaHidden}>
					{textSpan02}
				</span>

				<span className={classNameSpan01}>{textSpan01}</span>
			</h2>
		);
	} else {
		return (
			<h1 className={className} ref={titleRef}>
				{text}
			</h1>
		);
	}
};

export default Title;
