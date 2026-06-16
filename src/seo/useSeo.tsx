import { useEffect } from "react";

type UseSeoProps = {
	title: string;
	description: string;
};

const useSeo = ({ title, description }: UseSeoProps) => {
	useEffect(() => {
		document.title = title;

		if (description) {
			let metaTag = document.querySelector(
				'meta[name="description"]',
			) as HTMLMetaElement | null;

			if (!metaTag) {
				metaTag = document.createElement("meta");
				metaTag.setAttribute("name", "description");
				document.head.appendChild(metaTag);
			}

			metaTag.setAttribute("content", description);
		}
	}, [title, description]);
};

export default useSeo;
