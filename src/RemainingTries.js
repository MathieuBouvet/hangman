import React from "react";
import "./RemainingTries.css";

const RemainingTries = ({remainingTries}) => (
	<div className="remaning-tries-container">
		<div className="remaining-tries">{remainingTries}</div>
		<div>Tentatives restantes</div>
	</div>
)

export default RemainingTries;