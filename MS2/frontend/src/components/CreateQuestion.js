import React, { useState } from "react";
import { baseApiInstance } from "../apis";

/**
 * CS-5356-TODO
 * Create a question for a class session
 *
 * A user can provide the content of their question,
 * and their name. When they submit the form, make a
 * POST /api/class-session/:session-code/question
 * with the value of their inputs in the body of
 * the request.
 *
 * If it is successful, call `props.onQuestionCreated()`
 * to tell the parent component to refresh the view
 */
const CreateQuestion = (props) => {
  const [responseMessage, setResponseMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      sessionCode: props.sessionCode,
      question: e.target.question.value,
      name:
        isAnonymous || props.username == null ? "Anonymous" : props.username,
    };
    baseApiInstance
      .post("class-session/" + props.sessionCode + "/question", data)
      .then((response) => {
        if (response.status === 201) {
          setResponseMessage("New Question Posted Successfully!");
          props.onQuestionCreated();
        }
      })
      .catch((err) => {
        setResponseMessage(err.response.data.message);
      });
    setTimeout(() => setResponseMessage(""), 2000);
  };

  return (
    <div className="container mt-6">
      <div className="has-text-centered ">
        <h1 className="title">Ask a Question</h1>
      </div>
      <div className="box has-background-light my-5">
        <form
          className="is-flex is-flex-direction-column is-align-items-center"
          onSubmit={handleSubmit}
        >
          <div className="field" style={{ width: "50%" }}>
            <label className="label is-inline-block" htmlFor="question">
              Type your question
            </label>
            <div className="field is-inline-block is-pulled-right">
              <label className="switch pt-1">
                <input
                  type="checkbox"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  value={isAnonymous}
                />
                <span className="slider round"></span>
              </label>
              <span className="px-3 " style={{ height: "34px" }}>
                Anonymous
              </span>
            </div>
            <div className="control">
              <textarea
                className="longInput p-3"
                rows="8"
                name="question"
                required
                style={{ width: "100%", fontSize: "1.2em" }}
              ></textarea>
            </div>
          </div>
          <div className="field-group" style={{ width: "50%" }}>
            <div className="field">
              <div className="control" style={{ display: "flex" }}>
                <input
                  className="button is-dark"
                  type="submit"
                  value="Post Question"
                />
                {responseMessage === "" ? null : (
                  <input
                    className={
                      "button is-light ml-1 is-pulled-right " +
                      (responseMessage[0] === "N" ? "is-success" : "is-danger")
                    }
                    style={{ width: "100%" }}
                    value={responseMessage}
                  />
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
