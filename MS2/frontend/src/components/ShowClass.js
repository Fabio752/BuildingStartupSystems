import React, { useState, useEffect } from "react";
import GenerateNewCode from "./GenerateNewCode";

const ShowClass = (props) => {
  const [currentlySelectedCode, setCurrentlySelectedCode] = useState(
    props.classInfo.sessionCodes[0]
  );

  useEffect(() => {
    const sessionCodes = props.classInfo.sessionCodes;
    if (sessionCodes && sessionCodes.length > 0) {
      setCurrentlySelectedCode(sessionCodes[0]);
    }
  }, [props.classInfo]);

  const getSessionCodeById = (id) => {
    return props.classInfo.sessionCodes.find((code) => code.id === id);
  };

  return (
    <div
      style={{
        borderBottom: "1px solid darkgrey",
        paddingTop: "15px",
        paddingBottom: "15px",
      }}
    >
      <div className="content mb-2">
        <h2 className="has-text-centered">
          Class {props.classInfo.id + " - " + props.classInfo.name}
        </h2>
        {props.classInfo.sessionCodes.length > 0 && (
          <div>
            {currentlySelectedCode && (
              <div>
                <p className="is-inline-block has-text-weight-semibold">
                  Instructor: {props.classInfo.owner}
                </p>
                <p className="is-inline-block is-pulled-right has-text-weight-semibold">
                  On:{" "}
                  {new Date(currentlySelectedCode.createdAt).toLocaleString(
                    "en-US",
                    { timeZone: "America/New_York" }
                  )}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {props.classInfo.sessionCodes.length > 0 && currentlySelectedCode && (
        <div className="is-inline-block">
          <div className="has-text-weight-bold">Select Session</div>
          <div className="select">
            <select
              value={currentlySelectedCode.id}
              onChange={(e) => {
                setCurrentlySelectedCode(getSessionCodeById(e.target.value));
              }}
            >
              {props.classInfo.sessionCodes.map((sessionCode) => (
                <option key={sessionCode.id} value={sessionCode.id}>
                  {sessionCode.id}
                </option>
              ))}
            </select>
          </div>
          <a className="button" href={`/${currentlySelectedCode.id}`}>
            View questions
          </a>
        </div>
      )}
      <GenerateNewCode
        classId={props.classInfo.id}
        onCodeGenerated={props.onCodeGenerated}
      />
    </div>
  );
};
export default ShowClass;
