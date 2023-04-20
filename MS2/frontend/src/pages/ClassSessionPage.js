import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListQuestions from "./../components/ListQuestions";
import CreateQuestion from "./../components/CreateQuestion";

import { baseApiInstance } from "../apis";
/**
 * CS-5356-TODO
 * Allow users to ask questions, and view
 * other questions in the class session.
 *
 * When this component first loads, grab the questions
 * for this session code by making a
 * GET /api/class-session/:session-code request
 *
 * If it is successful, save the questions from the request
 * into the state.
 *
 * If a user submits a question or a question on the list
 * is upvoted, reload the latest questions from the server
 */
const ClassSessionPage = (props) => {
  const [questions, setQuestions] = useState([]);
  const [questionCreatedCount, setQuestionsCreatedCount] = useState(0);
  const [questionUpvotedCount, setQuestionsUpvotedCount] = useState(0);
  const [questionDismissedCount, setQuestionsDismissedCount] = useState(0);

  const { sessionCode } = useParams();

  const onQuestionCreated = () => {
    setQuestionsCreatedCount(questionCreatedCount + 1);
  };

  const onQuestionUpvoted = () => {
    setQuestionsUpvotedCount(questionUpvotedCount + 1);
  };

  const onQuestionDismissed = () => {
    setQuestionsDismissedCount(questionDismissedCount + 1);
  };

  useEffect(() => {
    async function fetchQuestions() {
      const response = await baseApiInstance.get(
        "class-session/" + sessionCode
      );
      const existingQuestions = response.data.questions;
      setQuestions(existingQuestions);
    }
    fetchQuestions();
  }, [questionCreatedCount, questionUpvotedCount, questionDismissedCount]);

  return (
    <section>
      <div className="container">
        <CreateQuestion
          username={props.username}
          sessionCode={sessionCode}
          onQuestionCreated={onQuestionCreated}
        />
      </div>
      <div className="container">
        <ListQuestions
          sessionCode={sessionCode}
          questions={questions}
          isSignedIn={props.isSignedIn}
          username={props.username}
          onQuestionUpvoted={onQuestionUpvoted}
          onQuestionDismissed={onQuestionDismissed}
        />
      </div>
    </section>
  );
};

export default ClassSessionPage;
