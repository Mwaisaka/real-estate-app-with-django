import React from "react";
// import ContentHeader from "./ContentHeader";
// import "./content.css";
import Card from "./Card.tsx";
import Quotes from ".././Quotes/Quotes.tsx";
import Jokes from "../Jokes/Jokes.tsx";

const Content = ({title, onLogin, user}) => {
  return (
    <div className="content shadow-lg bg-gray-100 -mt-10">
      {/* <ContentHeader /> */}
       {/* <Quotes /> */}
      <Card title={title} onLogin={onLogin} user={user}/>
      <Jokes/>
    </div>
  );
};

export default Content;