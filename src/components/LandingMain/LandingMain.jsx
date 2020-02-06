import React from "react";
import classes from "./LandingMain.module.css";
import Checkbox from "../../assets/images/donecheckbox.png";
import Aux from "../../hoc/Aux";
import LandingCalendarScreenshot from "../../assets/images/landingcalendar.png";
import LandingMainPageScreenshot from "../../assets/images/landingmainpage.png";
import HeartIcon from "../../assets/images/heart.png";

const LandingMain = () => {
  return (
    <Aux>
      <div className={classes.questions}>
        <p className={classes.heading}>This website exists because:</p>
        <div className={classes.flexContainerRow}>
          <img src={Checkbox} alt="checkbox" className={classes.checkbox} />
          <p>My best friend needed something like this</p>
        </div>
        <div className={classes.flexContainerRow}>
          <img src={Checkbox} alt="checkbox" className={classes.checkbox} />
          <p>I was bored enough to do it</p>
        </div>
      </div>
      <div className={classes.questions}>
        <p className={classes.heading}>What is the meaning of Mendokusai?</p>
        <div className={classes.flexContainerRow}>
          <img src={Checkbox} alt="checkbox" className={classes.checkbox} />
          <p>Mendokusai means troublesome or bothersome in Japanese.</p>
        </div>
      </div>
      <div className={classes.questions}>
        <p className={classes.heading}>What happens if I create an account?</p>
        <div className={classes.flexContainerColumn}>
          <p className={classes.paragraph}>
            You will be able to create some bothersome lists of the
            boring/exciting things you need to do everyday.
          </p>
          <p className={classes.paragraph}>
            If you can’t finish stuff, it won’t accumulate to the next day, so
            you better finish those things.
          </p>
          <p className={classes.paragraph}>
            I wish I could say it can cure existential crisis, work-life
            imbalance and your messed up relationships. It can’t.
          </p>
          <p className={classes.paragraph}>
            It does say if you can fly a kite on a specific day, but don’t trust
            it that much. It might be lying. (Like your cat.)
          </p>
        </div>
        <div className={classes.flexContainerRow}>
          <div className={classes.border}>
            <img
              src={LandingMainPageScreenshot}
              alt="screenshot of the main page"
              className={classes.screenshot}
            />
          </div>
          <div className={classes.border}>
            <img
              src={LandingCalendarScreenshot}
              alt="screenshot of the calendar"
              className={classes.screenshot}
            />
          </div>
        </div>
      </div>
      <div className={classes.footer}>
        <img src={HeartIcon} alt="heart icon" className={classes.heartIcon} />
        <p>
          I’m still not sure if it works, so if it doesn’t send me an e-mail, I
          will try to check it out:
          <a href="mailto:yagmurcetin@gmail.com" className={classes.email}>
            yagmurcetin@gmail.com
          </a>
        </p>
      </div>
    </Aux>
  );
};

export default LandingMain;
