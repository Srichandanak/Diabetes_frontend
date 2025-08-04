import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    pregnancies: "",
    glucose: "",
    bloodpressure: "",
    skinthickness: "",
    insulin: "",
    bmi: "",
    dpf: "",
    age: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://diabetes-prediction-ruts.onrender.com/predict", {
        pregnancies: parseFloat(form.pregnancies),
        glucose: parseFloat(form.glucose),
        bloodpressure: parseFloat(form.bloodpressure),
        skinthickness: parseFloat(form.skinthickness),
        insulin: parseFloat(form.insulin),
        bmi: parseFloat(form.bmi),
        dpf: parseFloat(form.dpf),
        age: parseFloat(form.age),
      });

      setResult(response.data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Check API and CORS settings.");
    }
  };

  return (
    <div className="container">
      <h2>Diabetes Prediction</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(form).map(([key, value]) => (
          <div className="input-group" key={key}>
            <label>{key}</label>
            <input
              type="number"
              name={key}
              value={value}
              onChange={handleChange}
              required
              step="any"
            />
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>

      {result && (
        <div className="result">
          <h3>Prediction: {result.prediction}</h3>
          <p>Probability: {result.probability}</p>
        </div>
      )}
    </div>
  );
}

export default App;
