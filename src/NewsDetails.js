import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

const NewsDetails = () => {
  const [newsDetails, setNewsDetails] = useState(null);
  const params = useParams();
  // fetch the data as soon as component mounts
  useEffect(() => {
    fetch(`https://hn.algolia.com/api/v1/items/${params.newsId}`)
      .then((response) => response.json())
      .then((data) => setNewsDetails(data));
  }, []);

  return (
    <div className="news">
      <div className="news__heading">
        <h1>{newsDetails?.title}.</h1>
        <p>{newsDetails?.points} points</p>
      </div>
      <div className="news__comments">
        <h3>{newsDetails?.children.length} comments</h3>
        {newsDetails?.children.map((item) => (
          <div className="news__commentsStyle">
            <Avatar
              sx={{
                bgcolor: `#${Math.floor(Math.random() * 16777215).toString(
                  16
                )}`,
              }}
            >
              <PersonIcon />
            </Avatar>
            <p dangerouslySetInnerHTML={{ __html: item?.text }}></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsDetails;
