"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.scss";

interface DateInputProps {
  onDateChange: (date: { month: string; day: string }) => void;
}

const DateInput: React.FC<DateInputProps> = ({ onDateChange }) => {
  const [date, setDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    setDate(date);
    if (date) {
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      onDateChange({ month, day });
    }
  };

  return (
    <DatePicker
      selected={date}
      onChange={handleChange}
      dateFormat="dd/MM"
      className={styles["date-input"]}
      placeholderText="dd/MM &#128197;"
    />
  );
};

export default DateInput;
