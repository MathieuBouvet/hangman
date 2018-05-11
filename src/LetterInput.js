import React from "react";
import "./LetterInput.css"

const LetterInput = ({letter, onClick}) => (
	<div className="letter-input" onClick={() => onClick(letter)}>
		{letter}
	</div>
)

export default LetterInput;