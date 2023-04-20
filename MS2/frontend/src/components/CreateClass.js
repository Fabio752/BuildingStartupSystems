import React, { useState } from "react";
import { baseApiInstance } from "../apis";

/**
 * CS-5356-TODO
 * Create a new class
 *
 * A user should provide a `name` property
 * to use as the class name. When they submit
 * the form, send a POST /api/classes with
 * the `name` property in the request body.
 *
 * If it completes successfully, call `props.onClassCreated()`
 * to notify the parent component to refresh the view
 */
const CreateClass = (props) => {
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      id: event.target.id.value,
      name: event.target.name.value,
      sessionDateTime: event.target.datetime.value,
    };
    baseApiInstance
      .post("classes", data)
      .then((response) => {
        if (response.status === 200) {
          props.onClassCreated();
          setResponseMessage("New Class Created Successfully!");
        }
      })
      .catch((err) => {
        setResponseMessage(err.response.data.message);
      });

    setTimeout(() => setResponseMessage(""), 2000);
  };

  return (
    <>
      <div className="has-text-centered mb-5">
        <h1 className="title">Create a Class</h1>
      </div>
      <div className="box has-background-light">
        <div
          style={{
            marginLeft: "25%",
            marginRight: "25%",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label" htmlFor="id">
                Class Id
              </label>
              <div className="control">
                <input
                  className="input mb-3"
                  type="text"
                  name="id"
                  placeholder="Class Id (eg. CS 5356)"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="name">
                Class Name
              </label>
              <div className="control">
                <input
                  className="input mb-3"
                  type="text"
                  name="name"
                  placeholder="Class Name (eg. Building Startup Systems)"
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="datetime">
                First Session Date & Time
              </label>
              <div className="control">
                <input
                  className="input mb-3"
                  type="datetime-local"
                  name="datetime"
                  required
                  timeplaceholder="First Session Date & Time (eg. 01/01/2023 @ 4:20pm)"
                />
              </div>
            </div>
            <div className="field">
              <div className="control" style={{ display: "flex" }}>
                <input
                  className="button is-dark"
                  type="submit"
                  value="Create Class"
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
          </form>
        </div>
      </div>
    </>
  );
};
export default CreateClass;
