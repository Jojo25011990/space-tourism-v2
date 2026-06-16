import Message from "./Message";

const Moon = () => {
	return (
		<div className="moon">
			<div></div>
			<Message
				text="css art"
				isErrorPage={true}
				className="moon-text moon-text-01"
			/>
			<div></div>
		</div>
	);
};

export default Moon;
