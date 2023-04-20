import React from "react";
import { baseApiInstance } from "../apis";
/**
 * CS-5356-TODO
 * Show a question and upvote/dismiss it
 *
 * When a user clicks on the Upvote button,
 * make a PUT /api/class-session/:session-code/question/:question-id
 * to upvote the question.
 *
 * Only signed-in users should be able to dismiss the question
 *
 * If it completes successfully, call `props.onQuestionUpvoted()`
 * to tell the parent component to refresh the view
 */
const ShowQuestion = (props) => {
  const handleUpvote = (questionId) => {
    baseApiInstance
      .put(
        "class-session/" +
          props.sessionCode +
          "/question/" +
          questionId +
          "/upvote"
      )
      .then((response) => {
        if (response.status === 201) {
          props.onQuestionUpvoted();
        }
      });
  };

  const handleDismiss = (questionId) => {
    baseApiInstance
      .put(
        "class-session/" +
          props.sessionCode +
          "/question/" +
          questionId +
          "/dismiss"
      )
      .then((response) => {
        if (response.status === 201) {
          props.onQuestionDismissed();
        }
      });
  };

  return (
    <div
      style={{
        borderTop: "1px solid darkgrey",
        paddingTop: "15px",
        paddingBottom: "15px",
        display: "flex",
      }}
    >
      <div className="has-text-justified" style={{ marginLeft: "15px" }}>
        <span className="has-text-weight-bold">by {props.question.name} </span>
        <br />
        {props.question.question}
      </div>

      {props.isSignedIn && (
        <div style={{ marginLeft: "auto" }}>
          <button
            className="button mx-3"
            onClick={() => handleUpvote(props.question.id)}
          >
            <i className="material-icons">recommend</i>
            <span className="p-1 has-text-weight-bold">
              {props.question.upvotes}
            </span>
          </button>
          <button
            className={
              "button " +
              (props.question.dismissed ? "is-success" : "is-danger")
            }
            onClick={() => handleDismiss(props.question.id)}
          >
            {" "}
            {props.question.dismissed ? <>Restore</> : <>Dismiss</>}{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowQuestion;
