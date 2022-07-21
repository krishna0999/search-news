import React from "react";
import { useParams } from "react-router-dom";

const NewsDetails = () => {
  const params = useParams();
  console.log(params.newsId);
  return <div>NewsDetails</div>;
};

export default NewsDetails;
