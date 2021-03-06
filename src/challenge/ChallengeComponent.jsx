import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import AppUtility from '../utility/AppUtility';
import CircularProgressbar from 'react-circular-progressbar';

import './challenge.scss';
import '../assets/scss/circular-progressbar.scss';

import close from '../assets/images/svg/close-grey.svg';
import challenge from '../assets/images/svg/challenge-red.svg';

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.RESULT_VISIBLE_THRESHOLD = 0;
    this.state = {
      userProgress: null,
      overallPercentage: 0,
      totalPoint: 0,
      totalAnswered: 0
    };
  }

  initializeReactGA = () => {
    AppUtility.initializeReactGA('start-challenge');
  };

  componentDidMount() {
    this.initializeReactGA();

    let gamificationPointsConfigration = JSON.parse(
      localStorage.getItem('gamificationPointsConfigration')
    );

    if (gamificationPointsConfigration) {
      this.RESULT_VISIBLE_THRESHOLD =
        gamificationPointsConfigration.result_visible_threshold;
    }
    this.getUserProgress();
  }

  getUserProgress = () => {
    AppUtility.getUserProgress(
      responseData => {
        let { overall_percentage, total_point, total_answered } = responseData;
        this.setState({
          userProgress: responseData,
          overallPercentage: overall_percentage,
          totalPoint: total_point,
          totalAnswered: total_answered
        });
      },
      error => {}
    );
  };
  render() {
    return (
      <React.Fragment>
        <main className="overall-wrap practice-page" id="max-width-halfthird">
          <div className="header-section">
            <Link to="/" className="close-grey">
              <img src={close} alt="Close-icon" />
            </Link>
          </div>
          <section className="body-section">
            <div className="container-wrap">
              <div className="dumbells">
                <img src={challenge} alt="challenge-icon" />
              </div>
              <div className="practice-cotent">
                <div className="category-title">
                  <div className="category-bor skill-title">
                    <h2>Challenge</h2>
                  </div>

                  {this.state.totalAnswered >= this.RESULT_VISIBLE_THRESHOLD ? (
                    <div className="category-bor strength">
                      <div className="flex-flexstart">
                        <h4 className="strength-title">
                          Overall Knowledge Strength
                        </h4>
                        <div className="strength-circle donut-circle">
                          <CircularProgressbar
                            strokeWidth={12}
                            borderRadius={0}
                            percentage={this.state.overallPercentage}
                            text={
                              this.state.overallPercentage <= 0
                                ? `N/A`
                                : `${this.state.overallPercentage}%`
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="category-bor strength">
                      <div className="flex-flexstart">
                        <h4 className="strength-title">
                          Overall Knowledge Strength
                        </h4>
                        <div className="strength-circle donut-circle">
                          <CircularProgressbar
                            strokeWidth={12}
                            borderRadius={0}
                            percentage={0}
                            text={'N/A'}
                          />
                        </div>
                      </div>

                      <div className="practice-alert">
                        <div className="oval-wrap">
                          <span className="oval-inner">
                            <i className="exclamatory">!</i>
                          </span>
                        </div>
                        <p>
                          Your results will be visible after you answer minimum{' '}
                          {this.RESULT_VISIBLE_THRESHOLD} questions
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="category-bor total-points">
                    <h4>Points total</h4>
                    <span className="points-field">
                      {this.state.totalPoint}
                    </span>
                  </div>
                  <div className="category-bor rember-pract">
                    <h4>Remember</h4>
                    <p>
                      Compete with the machine or with your workmates! Answer
                      questions correctly as quickly as possible to collect more
                      points. Unfamiliar topics are automatically marked for
                      later review. Good luck!
                    </p>
                  </div>
                </div>
              </div>
              <div className="page-bot-btn">
                <Link
                  to="/question-challenge"
                  className="text-center redirect-btn"
                >
                  Start Challenge
                </Link>
              </div>
            </div>
          </section>
        </main>
      </React.Fragment>
    );
  }
}

export default Challenge;
