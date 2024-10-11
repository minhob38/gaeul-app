import React from "react";
import { Helmet } from "react-helmet";

/*
tailwindcss
https://tailwindcss.com/docs/installation
*/
const Flight: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Train 🚂</title>
        <meta name="description" content="train page ..." />
      </Helmet>
      <div className="text-base font-mono">Train 🚂</div>
    </>
  );
};

export default Flight;
