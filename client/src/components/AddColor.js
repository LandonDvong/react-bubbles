import React, { useState } from "react";
import { axiosWithAuth } from "../data/axiosAuth";

const AddColor = ({ updateColors }) => {
  const [newColor, setNewColor] = useState({ color: "", hex: "", err: null });

  const handleChange = e => {
    setNewColor({ ...newColor, [e.target.name]: e.target.value, err: null });
  };

  const handleSubmit = e => {
    e.preventDefault();
    newColor.color === "" || newColor.hex === ""
      ? setNewColor({
          ...newColor,
          err: "Please complete all new color fields..."
        })
      : !newColor.hex.match("#") || newColor.hex.indexOf("#") !== 0
      ? setNewColor({
          ...newColor,
          err: "Color hex must begin with an octothorp (#)..."
        })
      : axiosWithAuth()
          .post("http://localhost:5000/api/colors/", {
            color: newColor.color,
            code: { hex: newColor.hex },
            id: new Date().getTime()
          })
          .then(res => {
            axiosWithAuth()
              .get("http://localhost:5000/api/colors")
              .then(res => {
                updateColors(res.data);
                setNewColor({ color: "", hex: "", err: null });
              })
              .catch(err => console.log(err));
          })
          .catch(err =>
            console.log(
              setNewColor({
                ...newColor,
                err:
                  "There was an error adding this color. Please try another valid color code."
              })
            )
          );
  };

  return (
    <form className="addColor">
      <legend>add color</legend>
      <label>
        color name:
        <input name="color" value={newColor.color} onChange={handleChange} />
      </label>
      <label>
        hex code:
        <input name="hex" value={newColor.hex} onChange={handleChange} />
      </label>
      <div className="button-row">
        <button type="submit" onClick={handleSubmit}>
          save
        </button>
      </div>
      {newColor.err && <div className="error-container">{newColor.err}</div>}
    </form>
  );
};

export default AddColor;