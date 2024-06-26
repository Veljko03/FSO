const Header = (header) => {
  return (
    <div>
      <h1>{header.course}</h1>
    </div>
  );
};

const Part = (part) => {
  return (
    <div>
      <p>
        {part.p} {part.c}
      </p>
    </div>
  );
};

const Content = (content) => {
  return (
    <div>
      <Part p={content.part1} c={content.exercises1} />
      <Part p={content.part2} c={content.exercises2} />
      <Part p={content.part3} c={content.exercises3} />
    </div>
  );
};

const Total = (total) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {total.exercises1 + total.exercises2 + total.exercises3}
      </p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1.name}
        part2={part2.name}
        part3={part3.name}
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
      <Total
        exercises1={part1.exercises}
        exercises2={part2.exercises}
        exercises3={part3.exercises}
      />
    </div>
  );
};

export default App;
