import type { SpaceData, CrewData } from "../dataTypes";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Message from "../components/Message";
import Title from "../components/Title";
import data from "../data.json";
import Image from "../components/Image";
import useSeo from "../seo/useSeo";
import { seoDescriptions } from "../seo/seoDescriptions";

const Crew = () => {
	const spaceData = data as SpaceData;

	const [isImageOpen, setIsImageOpen] = useState<boolean>(false);

	const [isActiveCrewMember, setIsActiveCrewMember] = useState<number>(0);

	const activeCrewMember: CrewData = spaceData.crew[isActiveCrewMember];

	useSeo({
		title: `Crew | Space Tourism V2`,
		description: seoDescriptions.crewPage,
	});

	useEffect(() => {
		const handleLightboxResize = () => {
			if (isImageOpen && window.innerWidth > 850) setIsImageOpen(false);
		};

		window.addEventListener("resize", handleLightboxResize);
		return () => window.removeEventListener("resize", handleLightboxResize);
	}, [isImageOpen]);

	return (
		<section className="crew-page">
			{/* Lightbox */}
			<div
				className={`overlay-lightbox ${isImageOpen ? "is-open border-bottom-active" : "is-close"}`}
				onClick={() => setIsImageOpen(false)}
				aria-modal="true"
				role="dialog"
				aria-label={`Lightbox - ${activeCrewMember.name} Image and Text for close to lightbox.`}
			>
				{spaceData.crew.map((crewMember, index) => {
					return (
						<Image
							key={index}
							srcImg={crewMember.images.png}
							altImg={crewMember.name}
							className={`overlay-lightbox-image ${index === isActiveCrewMember ? "active" : "no-active"}`}
						/>
					);
				})}

				<Message
					text={"Click anywhere close to the lightbox"}
					className="overlay-message-animation"
				/>
			</div>
			{/* End of Lightbox */}

			<div className="crew-page-container">
				<Title
					className="secondary-title"
					textSpan02="02"
					textSpan01="meet your crew"
					isSecondaryHeading={true}
					ariaHidden={true}
				/>

				<div className="crew-page-wrapper">
					{/* Content */}
					<div className="crew-content-box">
						<div>
							<Title
								isMainHeading={true}
								textSpan01={activeCrewMember.role}
								textSpan02={activeCrewMember.name}
								className="heading-primary"
								classNameSpan01="heading-primary-span-01"
								classNameSpan02="heading-primary-span-02"
							/>

							<Message
								text={activeCrewMember.bio}
								className="description-primary crew-description"
							/>
						</div>

						<div>
							{spaceData.crew.map((member, index) => {
								return (
									<Button
										key={index}
										variant="crew"
										arialLabel={`Select Crew Member ${member.name}`}
										ariaPressed={
											index === isActiveCrewMember
										}
										className={
											index === isActiveCrewMember
												? "active"
												: ""
										}
										onClick={() =>
											setIsActiveCrewMember(index)
										}
									/>
								);
							})}
						</div>
					</div>
					{/* End of Content */}

					{/* Members - Images */}
					<div className="crew-img-box">
						{spaceData.crew.map((crewMember, index) => {
							return (
								<Image
									key={index}
									srcImg={crewMember.images.png}
									altImg={crewMember.name}
									className={`overlay-lightbox-image ${index === isActiveCrewMember ? "active" : "no-active"}`}
									onClick={() => setIsImageOpen(true)}
									arialRole="button"
									ariaLabel={`Open lightbox for ${crewMember.name} Image`}
								/>
							);
						})}
					</div>
					{/* End of Members - Images */}
				</div>
			</div>
		</section>
	);
};

export default Crew;
