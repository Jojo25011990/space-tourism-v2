import type { SpaceData, TechnologyData } from "../dataTypes";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Image from "../components/Image";
import Message from "../components/Message";
import Title from "../components/Title";
import data from "../data.json";
import useSeo from "../seo/useSeo";
import { seoDescriptions } from "../seo/seoDescriptions";

const Technology = () => {
	const spaceData = data as SpaceData;

	useSeo({
		title: `Technology | Space Tourism V2`,
		description: seoDescriptions.technologyPage,
	});

	//  *** Version 01 ***
	// const [isLargeDesktop, setIsLargeDesktop] = useState<boolean>(
	// 	() => window.innerWidth > 1100,
	// );
	//  *** End of Version 01 ***

	// *** Version 02 ***
	const [isLargeDesktop, setIsLargeDesktop] = useState<boolean>(
		window.innerWidth > 1100,
	);
	// *** End of Version 02 ***

	useEffect(() => {
		const handleResize = () => setIsLargeDesktop(window.innerWidth > 1100);

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const [isImageOpen, setIsImageOpen] = useState<boolean>(false);

	const [isActiveTechnology, setIsActiveTechnology] = useState<number>(0);

	const activeTechnology: TechnologyData =
		spaceData.technology[isActiveTechnology];

	useEffect(() => {
		const handleLightboxResize = () => {
			if (isImageOpen && window.innerWidth > 850) setIsImageOpen(false);
		};

		window.addEventListener("resize", handleLightboxResize);
		return () => window.removeEventListener("resize", handleLightboxResize);
	}, [isImageOpen]);

	return (
		<section className="technology-page">
			{/* Lightbox */}
			<div
				className={`overlay-lightbox ${isImageOpen ? "is-open" : "is-close"}`}
				onClick={() => setIsImageOpen(false)}
				role="dialog"
				aria-label={`Lightbox - ${activeTechnology.name} Image and Text for close to lightbox.`}
			>
				{spaceData.technology.map((technology, index) => {
					return (
						<Image
							key={index}
							srcImg={technology.images.portrait}
							altImg={technology.name}
							className={`overlay-lightbox-image ${index === isActiveTechnology ? "active" : "no-active"}`}
						/>
					);
				})}

				<Message
					text={"Click anywhere close to the lightbox"}
					className={`overlay-message-animation`}
				/>
			</div>
			{/* End of Lightbox */}

			<div className="technology-page-container">
				<Title
					className="secondary-title"
					textSpan02="03"
					textSpan01="space launch 101"
					isSecondaryHeading={true}
					ariaHidden={true}
				/>

				<div className="technology-page-wrapper">
					{/* content box */}
					<div className="technology-content-box">
						{/* button box */}
						<div className="technology-button-box ">
							{spaceData.technology.map(
								(technologyNumber, index) => {
									return (
										<Button
											key={index}
											text={technologyNumber.number}
											variant="tech"
											arialLabel={`Select Technology ${technologyNumber.name}`}
											ariaPressed={
												index === isActiveTechnology
											}
											className={
												index === isActiveTechnology
													? "active"
													: ""
											}
											onClick={() =>
												setIsActiveTechnology(index)
											}
										/>
									);
								},
							)}
						</div>
						{/* description box */}
						<div>
							<Title
								isMainHeading={true}
								textSpan01="the terminology..."
								textSpan02={activeTechnology.name}
								className="heading-primary"
								classNameSpan01="heading-primary-span-01"
								classNameSpan02="heading-primary-span-02"
							/>
							<Message
								text={activeTechnology.description}
								className="description-primary technology-description mt-5 technology-message"
							/>
						</div>
					</div>
					{/* Image box */}
					<div className="technology-img-box">
						{spaceData.technology.map((technology, index) => {
							return (
								<Image
									key={index}
									srcImg={
										isLargeDesktop
											? technology.images.portrait
											: technology.images.landscape
									}
									altImg={technology.name}
									className={`overlay-lightbox-image ${index === isActiveTechnology ? "active" : "no-active"}`}
									onClick={() => setIsImageOpen(true)}
									arialRole="button"
									ariaLabel={`Open lightbox for ${technology.name} Image`}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Technology;
