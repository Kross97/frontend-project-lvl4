import React from 'react';
import { Button, Form } from 'react-bootstrap';

const ButtonCLose = (props) => {
  const {
    onSubmit,
    onClick,
    text,
    variant,
  } = props;
  return (
    <Form className="col-2" onSubmit={onSubmit}>
      <Button className="col-12" variant={variant} type="submit" onClick={onClick}>
        <span>{text}</span>
      </Button>
    </Form>
  );
};

export default ButtonCLose;
