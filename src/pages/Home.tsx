import { useEffect } from "react";
import { seoDescriptions } from "../seo/seoDescriptions";
import useSeo from "../seo/useSeo";
import Button from "../components/Button";
import Message from "../components/Message";
import Title from "../components/Title";

const Home = () => {
	useSeo({
		title: `Home | Space Tourism V2`,
		description: seoDescriptions.homePage,
	});

	// *** Preloading Background Images ***
	useEffect(() => {
		const homeImageDesktop = new Image();
		homeImageDesktop.src = "/assets/home/background-home-desktop.jpg";

		const homeImageTablet = new Image();
		homeImageTablet.src = "/assets/home/background-home-tablet.jpg";

		const homeImageMobile = new Image();
		homeImageMobile.src = "/assets/home/background-home-mobile.jpg";
	}, []);
	// *** End of Preloading Background Images ***

	return (
		<section className="home-page">
			<div className="home-page-container">
				<div>
					<Title
						isMainHeading={true}
						className="home-title home-title-animation"
						classNameSpan01="home-title-span-01"
						classNameSpan02="home-title-span-02"
					/>
					<Message className="home-message-animation home-description description-primary" />
				</div>
				<div>
					<Button arialLabel="Go to Destination Page." />
				</div>
			</div>
		</section>
	);
};

export default Home;
