import React, { Component } from "react";
import classes from "./UserMainPage.module.css";
import Img1 from "../../assets/images/img1.jpg";
import Img2 from "../../assets/images/img2.jpg";
import Img3 from "../../assets/images/img3.jpg";
import Img4 from "../../assets/images/img4.jpg";
import Img5 from "../../assets/images/img5.jpg";
import Img6 from "../../assets/images/img6.jpg";
import Img7 from "../../assets/images/img7.jpg";
import Img8 from "../../assets/images/img8.jpg";
import Img9 from "../../assets/images/img9.jpg";
import Img10 from "../../assets/images/img10.jpg";
import Img11 from "../../assets/images/img11.jpg";
import Img12 from "../../assets/images/img12.jpg";
import Img13 from "../../assets/images/img13.jpg";
import Img14 from "../../assets/images/img14.jpg";
import Img15 from "../../assets/images/img15.jpg";
import Img16 from "../../assets/images/img16.jpg";
import Img17 from "../../assets/images/img17.jpg";
import Img18 from "../../assets/images/img18.jpg";
import Img19 from "../../assets/images/img19.jpg";
import Img20 from "../../assets/images/img20.jpg";
import Img21 from "../../assets/images/img21.jpg";
import Today from "../../components/Today/Today";
import LegendFooter from "../../components/LegendFooter/LegendFooter";

class UserMainPage extends Component {
  state = {
    chosenPoster: "",
    posterText: "",
  };

  changePosterRandom = () => {
    const posterArray = [
      Img1,
      Img2,
      Img3,
      Img4,
      Img5,
      Img6,
      Img7,
      Img8,
      Img9,
      Img10,
      Img11,
      Img12,
      Img13,
      Img14,
      Img15,
      Img16,
      Img17,
      Img18,
      Img19,
      Img20,
      Img21,
    ];
    const randomNum = Math.floor(Math.random() * posterArray.length);
    let chosenPoster = posterArray[randomNum];
    return this.updateChosenPoster(chosenPoster);
  };

  updateChosenPoster = (chosenPoster) => {
    this.setState({ chosenPoster: chosenPoster });
  };

  componentDidMount(props) {
    if (!this.state.chosenPoster) {
      this.changePosterRandom();
    } else if (this.state.chosenPoster === Img1) {
      this.setState({ posterText: "Sahara Desert" });
    } else if (this.state.chosenPoster === Img2) {
      this.setState({ posterText: "Valley of the Moon, Jordan" });
    } else if (this.state.chosenPoster === Img3) {
      this.setState({ posterText: "Milford Lake, Kansas, USA" });
    } else if (this.state.chosenPoster === Img4) {
      this.setState({ posterText: "Skeiðarárjökull, Iceland" });
    } else if (this.state.chosenPoster === Img5) {
      this.setState({ posterText: "Egypt" });
    } else if (this.state.chosenPoster === Img6) {
      this.setState({ posterText: "Cerro Guachiscota, Camarones, Chile" });
    } else if (this.state.chosenPoster === Img7) {
      this.setState({
        posterText: "Demini River, Barcelos - State of Amazonas, Brazil",
      });
    } else if (this.state.chosenPoster === Img8) {
      this.setState({ posterText: "Siberia, Russia" });
    } else if (this.state.chosenPoster === Img9) {
      this.setState({ posterText: "Gulf of Mexico, Florida, USA" });
    } else if (this.state.chosenPoster === Img10) {
      this.setState({
        posterText: "Mackenzie River, Northwest Territories, Canada",
      });
    } else if (this.state.chosenPoster === Img11) {
      this.setState({ posterText: "Queen Fabiola Mountains, Antarctica" });
    } else if (this.state.chosenPoster === Img12) {
      this.setState({ posterText: "Sudan" });
    } else if (this.state.chosenPoster === Img13) {
      this.setState({ posterText: "Foxe Basin, Nunavut, Canada" });
    } else if (this.state.chosenPoster === Img14) {
      this.setState({ posterText: "Edrengiyn Nuruu, Mongolia" });
    } else if (this.state.chosenPoster === Img15) {
      this.setState({ posterText: "Great Sandy Desert, Telfer WA, Australia" });
    } else if (this.state.chosenPoster === Img16) {
      this.setState({ posterText: "Mississippi, USA" });
    } else if (this.state.chosenPoster === Img17) {
      this.setState({ posterText: "Eyjafjörður, Iceland" });
    } else if (this.state.chosenPoster === Img18) {
      this.setState({
        posterText: "Sierra de Velasco, La Rioja Province, Argentina",
      });
    } else if (this.state.chosenPoster === Img19) {
      this.setState({ posterText: "Campeche, Mexico" });
    } else if (this.state.chosenPoster === Img20) {
      this.setState({ posterText: "Xinjiang, China" });
    } else if (this.state.chosenPoster === Img21) {
      this.setState({ posterText: "Himalaya Mountains" });
    } else {
      this.setState({ posterText: "Somewhere on Earth" });
    }
    console.log(this.state.posterText);
  }

  render() {
    return (
      <div className={classes.mainContainer}>
        <div className={classes.flexRowContainer}>
          <div className={classes.posterContainer}>
            <p className={classes.posterText}>{this.state.posterText}</p>
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
        <LegendFooter />
      </div>
    );
  }
}

export default UserMainPage;
