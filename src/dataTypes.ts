export interface DestinationData {
	name: string;
	images: {
		png: string;
		webp: string;
	};
	description: string;
	distance: string;
	travel: string;
}
export interface CrewData {
	name: "string";
	images: {
		png: string;
		webp: string;
	};
	role: string;
	bio: string;
}
export interface TechnologyData {
	number: string;
	name: "string";
	images: {
		portrait: string;
		landscape: string;
	};
	description: string;
}

export interface SpaceData {
	destinations: DestinationData[];
	crew: CrewData[];
	technology: TechnologyData[];
}
