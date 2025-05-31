import React from "react";
// import ContentHeader from "./ContentHeader";
// import "./content.css";
import Card from "./Card.tsx";

const Content = ({title, onLogin, user}) => {
  return (
    <div className="content shadow-lg bg-gray-100 -mt-10">
      {/* <ContentHeader /> */}
      <Card title={title} onLogin={onLogin} user={user}/>
    </div>
  );
};

export default Content;