import React from "react";
import classes from "./LandingMain.module.css";
import Checkbox from "../../assets/images/donecheckbox.png";
import mendokusai from "../../assets/images/girl3.png";

const LandingMain = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainWrapper}>
        <img
          src={mendokusai}
          alt="bored girl illustration"
          className={classes.girlImg}
        />
        <div className={classes.contentWrapper}>
          <p className={classes.mainHeader}>Hello! Here is some information:</p>
          <div className={classes.questions}>
            <p className={classes.heading}>What does this website do?</p>
            <div className={classes.flexContainerColumn}>
              <p className={classes.paragraph}>
                It creates basic todo lists. Yes, it is totally free.
              </p>
            </div>
          </div>
          <div className={classes.questions}>
            <p className={classes.heading}>
              What happens if I create an account?
            </p>
            <div className={classes.flexContainerColumn}>
              <p className={classes.paragraph}>
                You can create some bothersome lists of the things you need to
                do everyday.
              </p>
              <p className={classes.paragraph}>
                If you can’t finish stuff, it won’t accumulate to the next day.
              </p>
              <p className={classes.paragraph}>
                I wish I could say it can cure existential crisis, work-life
                imbalance and your messed up relationships. It can’t. (I don't
                think there is a todo list app that ca do these anyway.)
              </p>
              <p className={classes.paragraph}>
                It does say if you can fly a kite on a specific day, but don’t
                trust it that much. It might be lying. (Like your cat.)
              </p>
            </div>
          </div>
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
            <p className={classes.heading}>
              What is the meaning of Mendokusai?
            </p>
            <div className={classes.flexContainerRow}>
              <img src={Checkbox} alt="checkbox" className={classes.checkbox} />
              <p>Mendokusai means troublesome or bothersome in Japanese.</p>
            </div>
          </div>
        </div>
        <div className={classes.footer}>
          <p className={classes.footerText}>
            Reach me from:{" "}
            <a
              href="mailto:yagmurcetin@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              yagmurcetin@gmail.com
            </a>{" "}
          </p>
          <p className={classes.footerText}>
            Source code:{" "}
            <a
              href="https://github.com/cakebatterandsprinkles/mendokusai-react"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              https://github.com/cakebatterandsprinkles/mendokusai-react
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingMain;
