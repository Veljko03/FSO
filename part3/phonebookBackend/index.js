const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("tiny"));

app.use(express.json());

morgan.token("object", (request) => {
  return JSON.stringify(request.body);
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :object"
  )
);

let allPersons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(allPersons);
});

app.get("/api/info", (request, response) => {
  const num = allPersons.length;
  const date = new Date();
  console.log(date);
  response.send(`<p>Phonebook has info for ${num} persons </p>
  <p>${date.toString()} ${date.getTime().toString()} ${date
    .getTimezoneOffset()
    .toString()} </p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const person = allPersons.find((per) => per.id == id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const person = allPersons.find((per) => per.id == id);

  response.status(204).end();
});

const generateId = () => {
  const maxId =
    allPersons.length > 0 ? Math.max(...allPersons.map((p) => p.id)) : 0;

  return String(maxId + 1);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  const sameName = allPersons.find((p) => p.name == body.name) ? true : false;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  } else if (sameName) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  allPersons.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
