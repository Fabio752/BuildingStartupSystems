/* eslint-disable max-len */
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';

import * as dbManager from './database.js';

const app = express();
// const origin = "http://localhost:3000";
const origin = 'https://bss-ms2.web.app';

app.use(
    cookieSession({
      secret: 'cookiesecret',
      maxAge: 3600000, // set the maximum age 1 hour
      signed: false,
      name: '__session',
    }),
);

app.use(cookieParser());

app.use(cors({credentials: true, origin: origin}));
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
);

app.get('/api/class-session/:sessionCode', (req, res) => {
  /**
   * CS-5356-TODO
   * Get a Class Session by Session Code
   *
   * Using `db`, find the class session using the session code, and return:
   * 200 OK - with an object containing the questions for that class session
   * 404 Not Found - when there is no class session with that code
   *
   * All users should have access
   */
  const sessionCode = req.params.sessionCode;
  const questions = dbManager.getQuestions(sessionCode);

  questions == null ?
    res.status(404).send('There is no class session with this code') :
    res.status(200).json({questions: questions});
});

app.post('/api/class-session/:sessionCode/question', (req, res) => {
  /**
   * CS-5356-TODO
   * Create a Question for a Class Session by Session Code
   *
   * Using `db`, find the class session using the session code, and
   * add a new question to the list.
   *
   * Return:
   * 201 Created - with the new question object
   * 404 Not Found - when there is no class session with that code
   *
   * All users should have access
   */
  const sessionCode = req.params.sessionCode;
  const questionText = req?.body?.question;
  const author = req?.body?.name;

  const questionObj = {
    name: author,
    question: questionText,
  };

  const question = dbManager.createQuestionForSession(sessionCode, questionObj);

  question == null ?
    res
        .status(404)
        .send({message: 'There is no class session with this code'}) :
    res.status(201).json(question);
});

app.put(
    '/api/class-session/:sessionCode/question/:questionId/upvote',
    (req, res) => {
    /**
     * CS-5356-TODO
     * Upvote a question in a session
     *
     * Using `db`, find the class session using the session code, and
     * then find the question using the question id. Increase the amount
     * of question.upvote by 1.
     *
     * Return:
     * 201 Created - with the updated question object
     // eslint-disable-next-line max-len, max-len
     * 404 Not Found - when there is no class session with that code, or no question
     *   with that id was found
     *
     * All users should have access
     */
      const sessionCode = req.params.sessionCode;
      const questionId = req.params.questionId;

      const question = dbManager.upvoteQuestionForSession(
          sessionCode,
          questionId,
      );

    question == null ?
      res.status(404).send({
        message:
            // eslint-disable-next-line max-len
            'There is no class session with this code or no question with that Id',
      }) :
      res.status(201).json(question);
    },
);

app.put(
    '/api/class-session/:sessionCode/question/:questionId/dismiss',
    (req, res) => {
      const sessionCode = req.params.sessionCode;
      const questionId = req.params.questionId;

      const question = dbManager.dismissQuestionForSession(
          sessionCode,
          questionId,
      );

    question == null ?
      res.status(404).send({
        message:
            'There is no class session with this code or no question with that Id',
      }) :
      res.status(201).json(question);
    },
);

app.post('/api/class/:classId/session-code', (req, res) => {
  /**
   * CS-5356-TODO
   * Create a new Class Session for a Class
   *
   * Using `db`, find the class using the class id, and
   * add  a new session to the class
   *
   * Return:
   * 201 Created - with the new class session object
   * 401 Unauthorized - if user is not allowed to access. Only the
   *   owner of the class should be able to create a new class session
   * 404 Not Found - when there is no class with that id
   */
  const username = req.session.username;
  const classId = req.params.classId;
  const sessionDateTime = req?.body?.sessionDateTime;

  if (
    username == null ||
    (dbManager.checkClassExists(classId) &&
      !dbManager.checkClassOwnership(classId, username))
  ) {
    res.status(401).send({message: 'You are not the owner of the class!'});
  } else {
    const sessionCodeObj = dbManager.createSessionCodeForClass(
        classId,
        sessionDateTime,
    );
    sessionCodeObj == null ?
      res.status(404).send('No class with that id') :
      res.status(201).json(sessionCodeObj);
  }
});

app.get('/api/classes', (req, res) => {
  /**
   * CS-5356-TODO
   * List all classes that belong to the current user
   *
   * Using `db`, find all the classes that belong to the
   * current user, and return it
   *
   * Return:
   * 200 OK - with an array of all the classes. Should return an empty array
   *   if user has no classes yet.
   * 401 Unauthorized - when there is no current user
   *
   * Users should only see their own classes, and not those belonging to
   * other users
   */
  const username = req.session.username;
  console.log('req.session: ', req.session);

  if (username == null || username == '') {
    res.status(401).send({message: 'Unauthorized - User must be signed in.'});
  } else {
    const classes = dbManager.getClasses(username);
    res.status(200).send({classes: classes});
  }
});

app.post('/api/classes', (req, res) => {
  /**
   * CS-5356-TODO
   * Create a new Class
   *
   * Using `db`, create a new class using the provided name and add
   * to the list of classes
   *
   * Return:
   * 201 Created - with the new class object
   * 400 Bad Request - when the request body is missing the name field
   * 401 Unauthorized - Only signed in users should be able to create a class
   *
   */
  const username = req.session.username;
  const classId = req?.body?.id;
  const className = req?.body?.name;
  const sessionDateTime = req?.body?.sessionDateTime;

  if (username == null || username == '') {
    res.status(401).send({message: 'Unauthorized - User must be signed in.'});
  } else if (className == null || className == '') {
    res
        .status(400)
        .send({message: 'Bad Request - Must specify Class Id and Class Name.'});
  } else if (dbManager.checkClassExists(classId)) {
    res.status(400).send({message: 'Bad Request - Class Id already in use.'});
  } else {
    const classObj = {
      id: classId,
      name: className,
      owner: username,
    };

    dbManager.createClass(classObj);
    dbManager.createSessionCodeForClass(classId, sessionDateTime);

    res.status(200).send(classObj);
  }
});

app.post('/api/login', (req, res) => {
  /**
   * CS-5356-TODO
   * Login the user using our mock login
   *
   * Only a username is provided for our mock login system.
   * Get the username from the request body and to a cookie
   * session to begin their logged in session.
   *
   * Return:
   * 200 OK - no body
   * 400 Unauthorized - when no username is provided
   *
   */
  const username = req?.body?.username;
  req.session.username = username;

  username == null || username == '' ?
    res.status(400).send({message: 'No username was provided'}) :
    res.status(200).send();
});

app.get('/api/logout', (req, res) => {
  /**
   * CS-5356-TODO
   * Logout
   *
   * Log the current user out by deleting their cookie session
   *
   * Return:
   * 200 OK - no body
   *
   */
  req.session.username = null;

  res.status(200).send();
});

app.get('/api/user', (req, res) => {
  /**
   * CS-5356-TODO
   * Get the current user
   *
   * Get the current user's info by reading their username from
   * their cookie session.
   *
   * Return:
   * 200 OK - when there is a current user based on the cookie session
   * 400 Bad Request - when the username field is missing from the body
   * 401 Unauthorized - when there is no current user
   *
   */
  const username = req.session.username;

  username == null ?
    res
        .status(401)
        .send({message: 'Unauthorized - User must be signed in.'}) :
    username == '' ?
    res.status(400).send({message: 'Bad Request - Must specify username.'}) :
    res.status(200).json({username: username});
});

export default app;
