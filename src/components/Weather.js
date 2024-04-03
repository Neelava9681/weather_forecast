import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import axios from "axios";

import drizzle from "../image/drizzle.png";
import clearsky from "../image/clearsky.png";
import cloud from "../image/clouds.png";
import rain from "../image/rain.png";
import snow from "../image/snow.png";
import backimg from "../image/backimg.jpg"
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.white, 0.10),
  // },
  marginLeft: 0,
  width: "70%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "70%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Weather = () => {
  const [search, setsearch] = useState("kolkata");
  const [alldata, setalldata] = useState("");
  const [city, setcity] = useState("");
  const [icon, seticon] = useState(drizzle);

  const weatherdetails = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8810c2fe4ed906fabe2abb4d9a63ee0a`
      );
      setcity(response.data.main);
      setalldata(response.data);
      console.log(response.data);
  
      // Directly use response.data.weather[0].icon
      if (
        response.data.weather[0].icon === "01d" ||
        response.data.weather[0].icon === "01n"
      ) {
        seticon(clearsky);
  
  
      } else if (
        response.data.weather[0].icon === "02d" ||
        response.data.weather[0].icon === "02n"
      ) {
        seticon(cloud);

  
      } else if (
        response.data.weather[0].icon === "03d" ||
        response.data.weather[0].icon === "03n"
      ) {
        seticon(drizzle);
  
  
      } else if (
        response.data.weather[0].icon === "04d" ||
        response.data.weather[0].icon === "04n"
      ) {
        seticon(drizzle);

      } else if (
        response.data.weather[0].icon === "09d" ||
        response.data.weather[0].icon === "09n"
      ) {
        seticon(rain);
  
  
      } else if (
        response.data.weather[0].icon === "10d" ||
        response.data.weather[0].icon === "10n"
      ) {
        seticon(rain);

  
      } else if (
        response.data.weather[0].icon === "13d" ||
        response.data.weather[0].icon === "13n"
      ) {
        seticon(snow);

  
      } else {
        seticon(clearsky);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    weatherdetails();
    document.body.style.backgroundImage = `url(${backimg})`;
    document.body.style.backgroundSize = "cover";
  
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div>
      <Grid container spacing={2} sx={{ marginTop: "50px" }}>
        <Grid item xs={2} md={2} />

        <Grid item xs={8} md={8}>
          <Item
            sx={{
              background:
                "rgb(228,17,255) radial-gradient(circle, rgba(241,130,255,1) 0%, rgba(6,27,210,1) 100%)", borderRadius:"20px"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "70px",
           
              }}
            >
              <Search sx={{ backgroundColor: "white", marginTop:"20px", borderRadius:"20px" }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={search}
                  onChange={(e) => {
                    setsearch(e.target.value);
                  }}
                />
              </Search>
            </div>

            {!alldata ? (
              <h1>no data</h1>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={icon}
                    alt="..."
                    style={{ height: "70px", width: "70px", color: "yellow" }}
                  />
                </div>

                <div
                  style={{
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography variant="h3" gutterBottom sx={{ color: "black", fontSize:"40px", fontWeight:"800" }}>
                    {alldata.name}
                  </Typography>
                  <Typography variant="h5" gutterBottom sx={{ color: "black" }}>
                  Temperature: {Math.round(city.temp - 273.15)}&deg;C
                  </Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "30vh",
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#4c5057", margin: "0" }}
                  >
                    Max: {Math.round(city.temp_max - 273.15)}&deg;C
                  </Typography>

                  <hr style={{ margin: "5px" }} />
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#4c5057", margin: "0" }}
                  >
                    Min: {Math.round(city.temp_min - 273.15)}&deg;C
                  </Typography>
                </div>
              </div>
            )}
          </Item>
        </Grid>

        <Grid item xs={2} md={2} />
      </Grid>
    </div>
  );
};

export default Weather;
