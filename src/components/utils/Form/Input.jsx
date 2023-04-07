import React from "react";
import Layout from "../Layout";
import Typography from "../Typography";

const Input = (props) => {
  return (
    <Layout.Col className="gap-2">
      <Typography.Caption>{props.label}</Typography.Caption>
      <input {...props} />
    </Layout.Col>
  );
};

export default Input;
