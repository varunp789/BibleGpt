import React from "react";
import { Result } from "antd";
import './notfound.css';

const Not = () => (
  <div className="not-found">
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist.
    Visit Chat "
    />
  </div>
);

export default Not;
