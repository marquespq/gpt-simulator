"use client";
import React from "react";
import { Form } from "react-bootstrap";
import styles from "./styles.module.scss";

interface CustomInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  isInvalid?: boolean;
  feedback?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  label,
  isInvalid,
  feedback,
  ...rest
}) => {
  return (
    <Form.Group controlId={placeholder}>
      {label && <Form.Label className={styles.label}>{label}</Form.Label>}
      <Form.Control
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
        {...rest}
      />
      <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default CustomInput;
