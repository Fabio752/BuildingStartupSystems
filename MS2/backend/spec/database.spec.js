import * as db from "../src/database.js";

describe("database", () => {
  afterEach(() => {
    db.clear();
  });

  it("createClass", () => {
    const classObj = {
      id: "CS 5356",
      name: "Building Startup Systems",
      owner: "user123",
    };
    db.createClass(classObj);

    expect(db.getClasses("user123").length).toEqual(1);
    expect(db.getClasses("user123")[0]).toEqual(
      jasmine.objectContaining(classObj)
    );
  });

  it("createSessionCodeForClass", () => {
    const newClass = db.createClass({
      id: "CS 5357",
      name: "Building Startup Systems",
    });
    const sessionCode = db.createSessionCodeForClass(newClass.id);
    const questions = db.getQuestions(sessionCode.id);

    expect(questions).toEqual([]);
  });

  it("createSessionCodeForClass returns null if class is not found", () => {
    const sessionCode = db.createSessionCodeForClass("fakeId");
    expect(sessionCode).toEqual(null);
  });

  it("createQuestionForSession", () => {
    const newClass = db.createClass({
      id: "CS 5358",
      name: "Building Startup Systems",
    });
    const sessionCode = db.createSessionCodeForClass(newClass.id);
    db.createQuestionForSession(sessionCode.id, {
      question: "is the sky blue?",
      name: "anon123",
    });
    const questions = db.getQuestions(sessionCode.id);

    expect(questions[0]).toEqual(
      jasmine.objectContaining({
        question: "is the sky blue?",
        name: "anon123",
      })
    );
  });

  it("createQuestionForSession returns null when session code doesnt exist", () => {
    const question = db.createQuestionForSession("fakeId", {
      question: "is the sky blue?",
      name: "anon123",
    });
    expect(question).toEqual(null);
  });

  it("upvoteQuestionForSession", () => {
    const newClass = db.createClass({
      id: "CS 5359",
      name: "Building Startup Systems",
    });
    const sessionCode = db.createSessionCodeForClass(newClass.id);
    const question = db.createQuestionForSession(sessionCode.id, {
      question: "is the sky blue?",
      name: "anon123",
    });

    db.upvoteQuestionForSession(sessionCode.id, question.id);

    const questions = db.getQuestions(sessionCode.id);

    expect(questions[0]).toEqual(
      jasmine.objectContaining({
        question: "is the sky blue?",
        name: "anon123",
        upvotes: 1,
      })
    );
  });
});
