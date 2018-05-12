import React from "react";
import "./HangDrawing.css";

const HangDrawing = ({name, show}) => (
	<div className={`drawing${!show ? " hidden" : ""}`} id={`${name}-id`}></div>
)

export default HangDrawing;