import React, { Component } from "react";
import LegendFooter from "../../components/LegendFooter/LegendFooter";
import classes from "./Calendar.module.css";

class Calendar extends Component {
  render() {
    return (
      <div className={classes.mainContainer}>
        <div className={classes.month}>
          <h2>↞January↠</h2>
        </div>
        <h2 className={classes.year}>2020</h2>
        <div className={classes.calendarContainer}>
          <div className={classes.weekday}>Monday</div>
          <div className={classes.weekday}>Tuesday</div>
          <div className={classes.weekday}>Wednesday</div>
          <div className={classes.weekday}>Thursday</div>
          <div className={classes.weekday}>Friday</div>
          <div className={classes.weekday} id="saturday">
            Saturday
          </div>
          <div className={classes.weekday} id="sunday">
            Sunday
          </div>
          <div className={classes.days}>1</div>
          <div className={classes.days}>2</div>
          <div className={classes.days}>3</div>
          <div className={classes.days}>4</div>
          <div className={classes.days}>5</div>
          <div className={classes.days}>6</div>
          <div className={classes.days}>7</div>
          <div className={classes.days}>8</div>
          <div className={classes.days}>9</div>
          <div className={classes.days}>10</div>
          <div className={classes.days}>11</div>
          <div className={classes.days}>12</div>
          <div className={classes.days}>13</div>
          <div className={classes.days}>14</div>
          <div className={classes.days}>15</div>
          <div className={classes.days}>16</div>
          <div className={classes.days}>17</div>
          <div className={classes.days}>18</div>
          <div className={classes.days}>19</div>
          <div className={classes.days}>20</div>
          <div className={classes.days}>21</div>
          <div className={classes.days}>22</div>
          <div className={classes.days}>23</div>
          <div className={classes.days}>24</div>
          <div className={classes.days}>25</div>
          <div className={classes.days}>26</div>
          <div className={classes.days}>27</div>
          <div className={classes.days}>28</div>
          <div className={classes.days}>29</div>
          <div className={classes.days}>30</div>
        </div>
        <LegendFooter />
      </div>
    );
  }
}

export default Calendar;
