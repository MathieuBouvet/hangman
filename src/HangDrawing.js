import React from "react";
import "./HangDrawing.css";

const HangDrawing = ({name}) => (
	<div>
		<img alt="" className="hangman-drawing" src={name} />
	</div>
)

export default HangDrawing;