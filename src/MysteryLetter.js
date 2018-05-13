import React from "react";
import "./MysteryLetter.css";

const MysteryLetter = ({letter, show}) => (
	<div className={`mystery-letter ${show}${(letter === "" || letter === " ") ? " space" : ""}`}>
		{show !== "hidden" ? letter : ""}
	</div>
)

export default MysteryLetter;