import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [avrege, setAvrege] = useState(0);
  const [positive, setPositive] = useState(0);

  const incrementGood = () => {
    const updateGood = good + 1;
    setGood(updateGood);
    const updatedAll = all + 1;
    const updateAvrage = (updateGood - bad) / updatedAll;

    setAll(updatedAll);
    setAvrege(updateAvrage);
    const updatePossitive = (updateGood / updatedAll) * 100;
    setPositive(updatePossitive);
  };
  const incrementNeutral = () => {
    setNeutral(neutral + 1);
    const updatedAll = all + 1;
    const updateAvrage = (good - bad) / updatedAll;
    setAll(updatedAll);

    setAvrege(updateAvrage);
    const updatePossitive = (good / updatedAll) * 100;
    setPositive(updatePossitive);
  };

  const incrementBad = () => {
    const updateBad = bad + 1;
    setBad(updateBad);
    const updatedAll = all + 1;
    const updateAvrage = (good - updateBad) / updatedAll;
    setAll(updatedAll);
    setAvrege(updateAvrage);
    const updatePossitive = (good / updatedAll) * 100;
    setPositive(updatePossitive);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>nautral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>avrege {avrege}</p>
      <p>positive {positive}%</p>
    </div>
  );
};

export default App;
