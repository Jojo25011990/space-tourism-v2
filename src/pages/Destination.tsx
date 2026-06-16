import type { SpaceData, DestinationData } from "../dataTypes";
import { useState, useEffect } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import data from "../data.json";
import Message from "../components/Message";
import Image from "../components/Image";
import useSeo from "../seo/useSeo";
import { seoDescriptions } from "../seo/seoDescriptions";

const Destination = () => {
	const spaceData = data as SpaceData;

	const [isImageOpen, setIsImageOpen] = useState<boolean>(false);

	const [isActiveDestinations, setIsActiveDestinations] = useState<number>(0);

	const activeDestinations: DestinationData =
		spaceData.destinations[isActiveDestinations];

	useSeo({
		title: `Destination | Space Tourism V2`,
		description: seoDescriptions.destinationPage,
	});

	// *** Preloading Background Images ***
	useEffect(() => {
		const destinationImageDesktop = new window.Image();
		destinationImageDesktop.src =
			"/assets/destination/background-destination-desktop.jpg";

		const destinationImageTablet = new window.Image();
		destinationImageTablet.src =
			"/assets/destination/background-destination-tablet.jpg";

		const destinationImageMobile = new window.Image();
		destinationImageMobile.src =
			"/assets/destination/background-destination-mobile.jpg";
	}, []);
	// *** End of Preloading Background Images ***

	useEffect(() => {
		const handleLightboxResize = () => {
			if (isImageOpen && window.innerWidth > 850) setIsImageOpen(false);
		};

		window.addEventListener("resize", handleLightboxResize);
		return () => window.removeEventListener("resize", handleLightboxResize);
	}, [isImageOpen]);

	return (
		<section className="destination-page">
			{/* Lightbox */}
			<div
				className={`overlay-lightbox ${isImageOpen ? "is-open" : "is-close"}`}
				onClick={() => setIsImageOpen(false)}
				aria-modal="true"
				role="dialog"
				aria-label={`Lightbox - ${activeDestinations.name} Image and Text for close to lightbox.`}
			>
				{spaceData.destinations.map((planet, index) => {
					return (
						<Image
							key={index}
							srcImg={planet.images.png}
							altImg={planet.name}
							className={`overlay-lightbox-image ${index === isActiveDestinations ? "active" : "no-active"}`}
						/>
					);
				})}

				<Message
					text={"Click anywhere close to the lightbox"}
					className={`overlay-message-animation`}
				/>
			</div>
			{/* End of Lightbox */}

			<div className="destination-page-container">
				<Title
					className="secondary-title"
					textSpan02="01"
					textSpan01="pick your destination"
					isSecondaryHeading={true}
					ariaHidden={true}
				/>

				<div className="destination-page-wrapper">
					{/* Planets */}
					<div className="destination-img-box">
						{spaceData.destinations.map((planet, index) => {
							return (
								<Image
									key={index}
									srcImg={planet.images.png}
									altImg={planet.name}
									className={`overlay-lightbox-image ${index === isActiveDestinations ? "active" : "no-active"}`}
									onClick={() => setIsImageOpen(true)}
									arialRole="button"
									ariaLabel={`Open lightbox for ${planet.name} Image`}
								/>
							);
						})}
					</div>
					{/* End of Planets */}

					{/* Content */}
					<div className="destination-content-box">
						<div className="destination-button-box">
							{spaceData.destinations.map((planet, index) => {
								return (
									<Button
										key={index}
										variant="planets"
										text={planet.name}
										arialLabel={`Select Planet ${planet.name}`}
										ariaPressed={
											index === isActiveDestinations
										}
										className={
											index === isActiveDestinations
												? "active"
												: ""
										}
										onClick={() =>
											setIsActiveDestinations(index)
										}
									/>
								);
							})}
						</div>

						<Title
							text={activeDestinations.name}
							className="destination-title"
						/>

						<Message
							text={activeDestinations.description}
							className="description-primary destination-description"
						/>

						<hr className="destination-line" />

						<aside className="destination-aside-box">
							<Title
								isSecondaryHeading={true}
								textSpan02="avg. distance"
								textSpan01={activeDestinations.distance}
								className="secondary-title destination-secondary-title"
							/>
							<Title
								isSecondaryHeading={true}
								textSpan02="est. travel time"
								textSpan01={activeDestinations.travel}
								className="secondary-title destination-secondary-title"
							/>
						</aside>
					</div>
					{/* End of Content */}
				</div>
			</div>
		</section>
	);
};

export default Destination;
