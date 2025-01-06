"use client";

import React from "react";
import CustomButton from "../components/Button";

export default function Home() {
  const handleClick = () => {
    alert("Click!!");
  };

  return (
    <div>
      <h1>Welcome</h1>
      <CustomButton
        onClick={handleClick}
        label="Success button"
        variant="success"
        style={{ margin: "10px" }}
      />
      <CustomButton
        onClick={() => console.log("Click!!")}
        label="Danger button"
        variant="danger"
      />
    </div>
  );
}
