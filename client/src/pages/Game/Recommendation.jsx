import React, { useEffect, useState } from "react";
import blog from "../../assets/Game/blogs.png";
import podcast from "../../assets/Game/podcasts.png";

import card1 from "../../assets/Game/Card1.png";
import card2 from "../../assets/Game/Card2.png";
import card3 from "../../assets/Game/Card3.png";
import { Chart } from "react-google-charts";

export default function Recommendation() {

  const [data, setData] = useState(null)

  useEffect(() => {

    const requestOptions = {
      method: "GET",
    };

    fetch("https://ummeed-backend.onrender.com/emotionData", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data)
      })
      .catch((error) => console.log("Error Occurred"));

  }, [])



  const options = {
    title: "Emotion Analysis",
  };

  return (
    <>
      <section
        style={{
          width: "26vw",
          height: "98vh",
          position: "absolute",
          left: "50%",
          translate: "-50% 0%",
        }}
      >
        <div
          className="game-container no-scroll"
          style={{
            justifyContent: "flex-start",
            overflow: "scroll",
          }}
        >
          <div style={{ padding: "0% 5%" }}>
            <h1>Our Recommendations </h1>

            <p
              style={{
                fontSize: "18px",
                fontWeight: "600",
                textAlign: "justify",
                color: "rgb(106 104 104)",
              }}
            >
              {" "}
              Hey, you did an amazing job on the assessment! Here are some ideas
              that can make things even more fun and interesting for you.{" "}
            </p>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                color: "rgb(148 217 203)",
                textAlign: "left",
                width: "90%",
              }}
            >
              Results
            </h1>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "90%",
              }}
            >

              <p style={{ width : '100%' , textAlign : 'left', fontSize : '16px' , fontWeight : '600' , color : 'rgb(151 141 141)' }} >Assessment 1 Score</p>

              <div
                className="1"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <p className="que"> I must to well or very well </p>
                <p
                  className="result"
                  style={{
                    color:
                      `${localStorage.getItem("Q1")}` === "true"
                        ? "red"
                        : "green",
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  {localStorage.getItem("Q1") === "true"
                    ? "Agree"
                    : "Disagree"}{" "}
                </p>
              </div>

              <p style={{ width : '100%' , textAlign : 'left', fontSize : '16px' , fontWeight : '600' , color : 'rgb(151 141 141)' }} >Emotion Ananlysis</p>

              <div style={{ width: '90%', height: '150px', overflow: 'hidden' }} >

                <div style={{ translate: '10% -38%' }} >

                  <Chart
                    chartType="PieChart"
                    data={data}
                    options={options}
                    width={"100%"}
                    height={"600px"}
                  />

                </div>



              </div>

            </div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1 style={{ color: "#C294D9", textAlign: "left", width: "90%" }}>
              Blogs for Mental well Being
            </h1>
            <img src={blog} style={{ width: "90%" }} />
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1 style={{ color: "#7197CE", textAlign: "left", width: "90%" }}>
              Podcast for Mental well Being
            </h1>
            <img src={podcast} style={{ width: "90%" }} />
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1 style={{ color: "#AACE99", textAlign: "left", width: "90%" }}>
              Recommended Counsellors
            </h1>

            <div
              className="no-scroll"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                maxWidth: "90%",
                overflowX: "scroll",
                marginBottom: "24px",
              }}
            >
              <img
                style={{ cursor: "pointer", marginRight: "12px" }}
                src={card1}
                alt="card1"
              />
              <img
                style={{ cursor: "pointer", marginRight: "12px" }}
                src={card2}
                alt="card2"
              />
              <img
                style={{ cursor: "pointer", marginRight: "12px" }}
                src={card3}
                alt="card3"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
