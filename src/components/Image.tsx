type ImageProps = {
	srcImg: string;
	altImg: string;
	className?: string;
	onClick?: () => void;
	ariaLabel?: string;
	arialRole?: string;
};

const Image = ({
	srcImg,
	altImg,
	className = "",
	onClick,
	ariaLabel,
	arialRole,
}: ImageProps) => {
	return (
		<img
			src={srcImg}
			alt={altImg}
			className={className}
			onClick={onClick}
			aria-label={ariaLabel}
			role={arialRole}
		/>
	);
};

export default Image;
