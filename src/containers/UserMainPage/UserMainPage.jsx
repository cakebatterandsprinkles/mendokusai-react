import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import classes from "./UserMainPage.module.css";
import CalendarButton from "../../assets/images/calendar.png";
import Poster1 from "../../assets/images/poster11.png";
import Poster2 from "../../assets/images/poster22.png";
import Poster3 from "../../assets/images/poster33.png";
import Poster4 from "../../assets/images/poster44.png";
import Today from "../../components/Today/Today";

class UserMainPage extends Component {
  state = {
    chosenPoster: ""
  };

  changePosterRandom = () => {
    const posterArray = [Poster1, Poster2, Poster3, Poster4];
    const randomNum = Math.floor(Math.random() * 4);
    let chosenPoster = posterArray[randomNum];
    console.log("changePosterRandom() : " + chosenPoster);
    return this.updateChosenPoster(chosenPoster);
  };

  updateChosenPoster = chosenPoster => {
    this.setState({ chosenPoster: chosenPoster });
    console.log("updateChosenPoster() : " + this.state.chosenPoster);
  };

  render() {
    if (!this.state.chosenPoster) {
      this.changePosterRandom();
    }

    return (
      <Aux>
        <div className={classes.flexContainer}>
          <div className={classes.wrapper}>
            <Today />
          </div>
          <div className={classes.posterAndButtonContainer}>
            <div className={classes.posterContainer}>
              <img
                src={this.state.chosenPoster}
                alt="poster"
                className={classes.poster}
              />
            </div>
            <div className={classes.buttonContainer}>
              <img
                src={CalendarButton}
                alt="calendar button"
                className={classes.calendarButton}
              />
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default UserMainPage;
