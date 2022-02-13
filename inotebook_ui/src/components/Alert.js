import { Alert } from "react-bootstrap";
import React from "react";

export default function CustomAlert(props) {
  const { message, variant } = props;
  return (
    <div>
      <Alert variant={variant}>{message}</Alert>
    </div>
  );
}
