import React, { useState } from "react";
import { baseApiInstance } from "../apis";

/**
 * CS-5356-TODO
 * Logged in users can click a button to generate a new
 * session code.
 *
 * When a user clicks the button, send a request to
 * POST /api/class/:classId/session-code. If it returns
 * successfully, call the `props.onCodeGenerated` callback
 * to tell the parent component to refresh the view
 */
const GenerateNewCode = (props) => {
  const [responseMessage, setResponseMessage] = useState("");

  async function fetchClasses(event) {
    event.preventDefault();

    const data = {
      sessionDateTime: event.target.datetime.value,
      classId: props.classId,
    };
    const response = await baseApiInstance.post(
      "class/" + props.classId + "/session-code",
      data
    );
    if (response.status === 201) {
      setResponseMessage("New Session Code Generated Successfully!");
      props.onCodeGenerated();
    } else {
      setResponseMessage(response.response.data.message);
    }
    setTimeout(() => setResponseMessage(""), 2000);
  }

  return (
    <div
      className="mt-5 pt-2 mb-2"
      style={{ borderTop: "1px solid lightgray" }}
    >
      <form onSubmit={fetchClasses}>
        <div className="field">
          <label className="label" htmlFor="datetime">
            New Session Date & Time
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
          <div className="control mt-2" style={{ display: "flex" }}>
            <input
              className="button is-dark"
              type="submit"
              value="Generate New Code"
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
  );
};

export default GenerateNewCode;
