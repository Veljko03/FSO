const Part = ({ parts }) => {
  const all = parts.map((part) => part.exercises);
  const sum = all.reduce((a, curr) => a + curr);
  return (
    <div>
      {parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}

      <p>
        <strong>total of {sum} excercise</strong>
      </p>
    </div>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      <Part parts={course.parts} />
    </div>
  );
};

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <Content course={course} />
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      {course.map((each) => (
        <Header key={each.id} course={each} />
      ))}
    </div>
  );
};

export default Course;
