import React, { useState } from "react";
import ShowQuestion from "./ShowQuestion";

const ListQuestions = (props) => {
  const [showDismissed, setShowDismissed] = useState(false);

  return (
    <section className="mt-5">
      <div className="container">
        <div className="has-text-centered columns">
          <div className="column">
            <h1 className="title">Current Questions</h1>
          </div>
        </div>
        <div
          className="box"
          style={{ paddingLeft: "25%", paddingRight: "25%" }}
        >
          {props.questions.length === 0 && <div>No questions yet</div>}
          {props.questions.length > 0 &&
            props.questions
              .sort((a, b) => b.upvotes - a.upvotes)
              .map((question, index) =>
                question.dismissed && !showDismissed ? null : (
                  <ShowQuestion
                    key={index}
                    question={question}
                    sessionCode={props.sessionCode}
                    isSignedIn={props.isSignedIn}
                    username={props.username}
                    onQuestionUpvoted={props.onQuestionUpvoted}
                    onQuestionDismissed={props.onQuestionDismissed}
                  />
                )
              )}
        </div>
        <div className="is-pulled-right">
          <label className="switch pt-1">
            <input
              type="checkbox"
              onClick={() => setShowDismissed(!showDismissed)}
              value={showDismissed}
            />
            <span className="slider round"></span>
          </label>
          <span className="px-3 " style={{ height: "34px" }}>
            Show Dismissed
          </span>
        </div>
      </div>
    </section>
  );
};

export default ListQuestions;
