import React from "react";
import "./MysteryLetter.css";

const MysteryLetter = ({letter, show}) => (
	<div className={`mystery-letter${(letter === "" || letter === " ") ? " space" : ""}`}>
		{show ? letter : ""}
	</div>
)

export default MysteryLetter;