import React, { useEffect, useState } from "react";
import ListClasses from "../components/ListClasses";
import CreateClass from "../components/CreateClass";

import { baseApiInstance } from "../apis";
/**
 * CS-5356-TODO
 * Show classes on the Instructor Home Page
 *
 * When this component loads for the first time,
 * load the users classes with a GET /api/classes.
 * Save it to the component state.
 *
 * Users can create new class codes, and classes from this page.
 * When a class code is generated or a new class is created,
 * reload and display the updated list of the user's classes.
 */
const InstructorHomePage = (props) => {
  const [classes, setClasses] = useState([]);
  const [codeGeneratedCount, setCodeGeneratedCount] = useState(0);
  const [classCreatedCount, setClassCreatedCount] = useState(0);

  const onCodeGenerated = () => {
    setCodeGeneratedCount(codeGeneratedCount + 1);
  };

  const onClassCreated = () => {
    setClassCreatedCount(classCreatedCount + 1);
  };

  useEffect(() => {
    async function fetchClasses() {
      const response = await baseApiInstance.get("classes");
      const existingClasses = response.data.classes;
      setClasses(existingClasses);
    }

    fetchClasses();
  }, [codeGeneratedCount, classCreatedCount]);

  return (
    <>
      <section>
        <div className="container py-5 my-6">
          <CreateClass onClassCreated={onClassCreated} />
        </div>
      </section>
      <section>
        <div className="container my-6 ">
          <ListClasses classes={classes} onCodeGenerated={onCodeGenerated} />
        </div>
      </section>
    </>
  );
};

export default InstructorHomePage;
