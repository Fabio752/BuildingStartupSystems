let database = {};

const generateSessionCode = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomChars =
    alphabet[Math.floor(Math.random() * alphabet.length)] +
    alphabet[Math.floor(Math.random() * alphabet.length)] +
    alphabet[Math.floor(Math.random() * alphabet.length)];

  const randomNums = Math.random().toString().slice(2, 5);
  const randomCode = randomChars + randomNums;
  return randomCode;
};
const checkSessionCodeExists = (sessionCode) => {
  var found = false;
  database?.classes?.forEach((c) => {
    c?.sessionCodes?.forEach((sc) => {
      if (sc?.id === sessionCode) {
        found = true;
      }
    });
  });
  return found;
};

export const checkClassExists = (classId) => {
  const classIdx = database.classes?.findIndex((c) => c?.id === classId);
  return classIdx >= 0;
};

export const checkClassOwnership = (classId, username) => {
  const classIdx = database.classes?.findIndex((c) => c?.id === classId);
  return username === database.classes[classIdx]?.owner;
};

export const getQuestions = (sessionCode) => {
  if (!checkSessionCodeExists(sessionCode)) {
    return null;
  } else {
    database.questions = database.questions == null ? [] : database.questions;
    return database.questions.filter((q) => q?.sessionCode === sessionCode);
  }
};

export const getClasses = (username) => {
  database.classes = database.classes == null ? [] : database.classes;
  return database.classes.filter((c) => c?.owner === username);
};

export const createQuestionForSession = (sessionCode, question) => {
  question.sessionCode = sessionCode;
  question.upvotes = 0;
  question.createdAt = new Date();
  question.dismissed = false;

  database.questions = database.questions == null ? [] : database.questions;

  if (!checkSessionCodeExists(sessionCode)) {
    return null;
  }

  question.id = database.questions.length;
  database.questions?.push(question);
  database.questions?.sort((a, b) => b.createdAt - a.createdAt);

  return question;
};

export const createSessionCodeForClass = (
  classId,
  rawDateTime = new Date()
) => {
  if (!checkClassExists(classId)) {
    return null;
  }

  const classIdx = database.classes.findIndex((c) => c?.id === classId);
  var randomCode = generateSessionCode();

  while (checkSessionCodeExists(randomCode)) {
    randomCode = generateSessionCode();
  }

  const sessionCodeObj = {
    id: randomCode,
    createdAt: Date.parse(rawDateTime),
  };

  database.classes[classIdx].sessionCodes =
    database.classes[classIdx].sessionCodes == null
      ? []
      : database.classes[classIdx].sessionCodes;

  database.classes[classIdx].sessionCodes.push(sessionCodeObj);
  database.classes[classIdx].sessionCodes.sort(
    (a, b) => b.createdAt - a.createdAt
  );
  return sessionCodeObj;
};

export const upvoteQuestionForSession = (sessionCode, questionId) => {
  if (!checkSessionCodeExists(sessionCode)) {
    return null;
  } else {
    const questionIdx = database.questions?.findIndex(
      (q) => q?.id.toString() === questionId.toString()
    );
    if (questionIdx === -1) {
      return null;
    } else {
      database.questions[questionIdx].upvotes += 1;
      return database.questions[questionIdx];
    }
  }
};

export const dismissQuestionForSession = (sessionCode, questionId) => {
  if (!checkSessionCodeExists(sessionCode)) {
    return null;
  } else {
    const questionIdx = database.questions?.findIndex(
      (q) => q?.id.toString() === questionId.toString()
    );
    if (questionIdx === -1) {
      return null;
    } else {
      database.questions[questionIdx].dismissed =
        !database.questions[questionIdx].dismissed;
      return database.questions[questionIdx];
    }
  }
};

export const createClass = (classData) => {
  database.classes = database.classes == null ? [] : database.classes;
  database.classes.push(classData);
  return classData;
};

export const clear = () => {
  database = {};
};
