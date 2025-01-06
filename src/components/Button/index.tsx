"use client";
import React from "react";
import { Button } from "react-bootstrap";
import styles from "./styles.module.scss";

interface CustomButtonProps {
  onClick: () => void;
  label: string;
  variant?: string;
  style?: React.CSSProperties;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  label,
  variant = "primary",
  style,
  ...rest
}) => {
  return (
    <Button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      style={style}
      {...rest}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
