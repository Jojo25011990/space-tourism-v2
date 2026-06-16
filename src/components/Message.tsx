import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

type MessageProps = {
	text?: React.ReactNode;
	className?: string;
	isErrorPage?: boolean;
};

const Message = ({
	text,
	className = "",
	isErrorPage = false,
}: MessageProps) => {
	const messageRef = useRef<HTMLParagraphElement>(null);

	const homeMessage =
		"Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!";

	useEffect(() => {
		if (messageRef.current?.classList.contains("home-message-animation")) {
			const splitText = SplitText.create(".home-message-animation", {
				type: "words",
			});

			gsap.set(splitText.words, { y: 50, autoAlpha: 0 });

			gsap.to(splitText.words, {
				y: 0,
				autoAlpha: 1,
				delay: 1.5,
				ease: "power4.out",

				stagger: {
					amount: 0.5,
				},
			});
		}

		// *** Lightbox Message ***
		if (
			messageRef.current?.classList.contains("overlay-message-animation")
		) {
			const splitText = SplitText.create(".overlay-message-animation", {
				type: "words, chars",
			});

			gsap.from(splitText.chars, {
				y: 70,
				autoAlpha: 0,
				delay: 1,

				stagger: {
					amount: 1,
					from: "random",
				},
			});
		}
		// *** End of Lightbox Message ***
	});

	return isErrorPage ? (
		<p className={className}>{text}</p>
	) : (
		<p ref={messageRef} className={className}>
			{text ? text : homeMessage}
		</p>
	);
};

export default Message;
