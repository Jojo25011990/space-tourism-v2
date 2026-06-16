import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import Astronaut from "../components/Astronaut";
import Moon from "../components/Moon";
import Flag from "../components/Flag";
import Message from "../components/Message";
import useSeo from "../seo/useSeo";
import { seoDescriptions } from "../seo/seoDescriptions";

const ErrorPage = () => {
	const containerRef = useRef<HTMLElement | null>(null);

	const errorMessage01 = "404";
	const errorMessage02 = "Page is not found";

	useSeo({
		title: `Error | Space Tourism V2`,
		description: seoDescriptions.errorPage,
	});

	useEffect(() => {
		const container = containerRef.current;

		const configStars = {
			width: "2px",
			height: "2px",
			backgroundColor: "white",
			borderRadius: "50%",
			position: "absolute",
			zIndex: "1",
			boxShadow: "0 0 2px #fff, 0 0 4px #fff, 0 0 6 #fff",
		};

		const fragmentStars = new DocumentFragment();
		const allStars: Animation[] = [];
		let stars = 1000;
		let i = 0;

		// *** Responsive Design | Initial State Only ***
		// *** Solution 01 - If Statement ***
		if (window.innerWidth < 400) {
			stars = 500;
		} else {
			stars = 1000;
		}
		// *** End of Solution 01 - If Statement ***

		// *** Solution 02 - Ternarny Operator ***
		// stars = window.innerWidth < 400 ? 500 : 1000;
		// *** End of Solution 02 - Ternarny Operator ***
		// *** End of Responsive Design | Initial State Only ***

		while (i < stars) {
			const star = document.createElement("div");
			star.classList.add("star");

			Object.assign(star.style, configStars);

			const starX = `${Math.floor(Math.random() * window.innerWidth)}`;
			const starY = `${Math.floor(Math.random() * window.innerHeight)}`;

			star.style.left = `${starX}px`;
			star.style.top = `${starY}px`;

			const blikKeyframes = new KeyframeEffect(
				star,
				[{ opacity: "1" }, { opacity: "0" }, { opacity: "1" }],

				{
					duration: Math.random() * 2000 + 1,
					easing: "linear",
					iterations: Infinity,
				},
			);

			const blikAnimationStar = new Animation(
				blikKeyframes,
				document.timeline,
			);
			blikAnimationStar.play();

			allStars.push(blikAnimationStar);

			fragmentStars.appendChild(star);

			i++;
		}

		if (container) {
			container.appendChild(fragmentStars);
		}

		return () => {
			allStars.forEach((star) => {
				star.cancel();
			});

			container
				?.querySelectorAll(".star")
				.forEach((removeStar) => removeStar.remove());
		};
	}, []);

	return (
		<main className="error-page" ref={containerRef}>
			<div
				className="message-box"
				aria-label="Error Message: 404 Page is not found"
			>
				<Message
					isErrorPage={true}
					className="message-box-text-01"
					text={errorMessage01.split("").map((letter, index) => (
						<span
							key={index}
							style={
								{
									animationDelay: `${1.75 + 0.25 * index}s`,
								} as React.CSSProperties
							}
						>
							{letter}
						</span>
					))}
				/>

				<Message
					isErrorPage={true}
					className="message-box-text-02"
					text={errorMessage02.split(" ").map((letter, index) => (
						<span
							key={index}
							style={
								{
									animationDelay: `${2.75 + 0.25 * index}s`,
								} as React.CSSProperties
							}
						>
							{letter}
						</span>
					))}
				/>

				<NavLink
					// *** to={"/"} if you want to go to the intro page 🤣 ***
					to={"/home"}
					className={"nav-link error-button error-button-disabled"}
					aria-label="Go to Homepage"
				>
					home
				</NavLink>
			</div>

			{/* CSS Arts */}
			<section className="css-art-box" aria-hidden="true">
				<Moon />
				<Flag />
				<Astronaut />
			</section>
			{/* End of CSS Arts */}
		</main>
	);
};

export default ErrorPage;
