import React, { Component } from "react";
import classes from "./UserMainPage.module.css";
import CalendarButton from "../../assets/images/calendar.png";
import Img1 from "../../assets/images/img1.jpg";
import Img2 from "../../assets/images/img2.jpg";
import Img3 from "../../assets/images/img3.jpg";
import Img4 from "../../assets/images/img4.jpg";
import Img5 from "../../assets/images/img5.jpg";
import Img6 from "../../assets/images/img6.jpg";
import Img12 from "../../assets/images/img12.jpg";
import Today from "../../components/Today/Today";

class UserMainPage extends Component {
  state = {
    chosenPoster: "",
    posterText: "",
  };

  changePosterRandom = () => {
    const posterArray = [Img1, Img2, Img3, Img4, Img5, Img6, Img12];
    const randomNum = Math.floor(Math.random() * posterArray.length);
    let chosenPoster = posterArray[randomNum];
    return this.updateChosenPoster(chosenPoster);
  };

  updateChosenPoster = (chosenPoster) => {
    this.setState({ chosenPoster: chosenPoster });
  };

  componentDidMount() {
    if (!this.state.chosenPoster) {
      this.changePosterRandom();
    } else if (this.state.chosenPoster === "Img1") {
      this.setState({ posterText: "Yosemite Valley, United States" });
    } else if (this.state.chosenPoster === "Img2") {
      this.setState({ posterText: "Lake Braies, Italy" });
    } else if (this.state.chosenPoster === "Img3") {
      this.setState({ posterText: "San Quirico d'Orcia, Italy" });
    } else if (this.state.chosenPoster === "Img4") {
      this.setState({ posterText: "Wanaka, Otago, New Zealand" });
    } else if (this.state.chosenPoster === "Img5") {
      this.setState({ posterText: "Nature's Valley, South Africa" });
    } else if (this.state.chosenPoster === "Img6") {
      this.setState({ posterText: "Oljato-Monument Valley, United States" });
    } else {
      this.setState({ posterText: "Somewhere on Earth" });
    }
  }

  render() {
    return (
      <div className={classes.mainContainer}>
        <div className={classes.flexRowContainer}>
          <div className={classes.posterContainer}>
            <img
              src={this.state.chosenPoster}
              alt="poster"
              className={classes.poster}
            />
          </div>
          <div className={classes.wrapper}>
            <Today />
          </div>
        </div>
      </div>
    );
  }
}

export default UserMainPage;
