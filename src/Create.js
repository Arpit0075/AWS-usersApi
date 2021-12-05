import React, { useState } from "react";
import axios from "axios";

function Create() {
  const [state, setState] = useState({ id: "", name: "", message: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    //console.log(state);
    const url =
      "https://dw0n60u6j4.execute-api.us-east-1.amazonaws.com/prod/users";

    try {
      const res = await axios.post(url, state);
      //console.log(res.data.message);

      setMessage(res.data.message);
      setState({ ...state, id: "", name: "", message: "" });
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      //console.log(err);
      setMessage(err);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="create">
      <h3> Please enter User Details </h3>
      <input
        type="text"
        placeholder="enter id"
        name="id"
        onChange={handleChange}
        value={state.id}
      />
      <input
        type="text"
        placeholder="enter name"
        onChange={handleChange}
        value={state.name}
        name="name"
      />
      <input
        type="text"
        placeholder="enter message"
        name="message"
        onChange={handleChange}
        value={state.message}
      />
      <button onClick={handleSubmit}>Submit</button>
      {message}
    </div>
  );
}

export default Create;
