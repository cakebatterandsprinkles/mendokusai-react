import React from "react";
import Mendokusai from "../../assets/images/mendokusai.png";
import classes from "./LandingMain.module.css";

const LandingMain = () => {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainWrapper}>
        <img src={Mendokusai} className={classes.monsterAndBirdImg} alt="a monster and bird ready to fight"/>
        <div className={classes.contentWrapper}>
          <p className={classes.mainHeader}>Hello there!</p>
          <div className={classes.questions}>
            <p className={classes.heading}>What does this website do?</p>
            <div className={classes.flexContainerColumn}>
              <p className={classes.paragraph}>
                It creates basic todo lists. (Also, it is totally free.)
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
                think there is a todo list app that can do these anyway.)
              </p>
              <p className={classes.paragraph}>
                It does say if you can fly a kite on a specific day, but don’t
                trust it that much. It might be lying. (Like your cat.)
              </p>
            </div>
          </div>
          <div className={classes.questions}>
            <p className={classes.heading}>
              What is the meaning of Mendokusai?
            </p>
            <div className={classes.flexContainerRow}>
              <p>Mendokusai means troublesome or bothersome in Japanese.</p>
            </div>
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.footerText}>
            <p>Reach me from: </p>
            <a
              href="mailto:yagmurcetin@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              yagmurcetin@gmail.com
            </a>
          </div>
          <div className={classes.footerText}>
            <p>Source code: </p>
            <a
              href="https://github.com/cakebatterandsprinkles/mendokusai-react"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              https://github.com/cakebatterandsprinkles
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingMain;
