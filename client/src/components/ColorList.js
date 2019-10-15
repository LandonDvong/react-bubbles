import React, { useState } from 'react';
import { axiosWithAuth } from "../data/axiosAuth";
import AddColor from './AddColor';


const initialColor = {
    color: "",
    code: {hex: "" }
};


const ColorList = ({ colors, updateColors }) => {
    console.log(colors);
    const [edit, setEdit] = useState(false);
    const [colorToEdit, setColorToEdit] = useState(initialColor);

    const editColor = color => {
        setEdit(true);
        setColorToEdit(color);
    };

    const saveEdit = e => {
        e.preventDefault();
    };

    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, {
      color: colorToEdit.color,
      code: { hex: colorToEdit.code.hex },
      id: colorToEdit.id
    })
    .then(res => {
      axiosWithAuth()
        .get("http://localhost:5000/api/colors/")
        .then(res => {
          updateColors(res.data);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));


    const deleteColor = color => {
        axiosWithAuth()
        .delete(`http://localhost:5000/api/colors/${colorToEdit.id}`)
        .then(res =>
          axiosWithAuth()
            .get("http://localhost:5000/api/colors/")
            .then(res => {
              updateColors(res.data);
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err));
    };

    return (
        <div className="color-container-wrapper">
            <h1>colors</h1>
            <ul>
                {colors.map(color => (
                    <li key={color.color} onClick= {() => editColor(color)}>
                    <span>
                        <span className="delete" onClick={() => deleteColor(color)}>
                        x
                        </span>{" "}
                        {color.color}
                    </span>
                        <div 
                        className="color-container"
                        style={{ backgroundColor: color.code.hex }}
                        />
                    </li>
                ))}
            </ul>
            {edit && (
                <form onSubmit={saveEdit}>
                <legend>edit color</legend>
                <label>
                    color name:
                    <input
                        onChange = {e => 
                            setColorToEdit({
                                ...colorToEdit,
                                code: { hex: e.target.value }
                            })
                        }
                        value = {colorToEdit.code.hex}
                    />
                </label>
                <div className = "buttons">
                        <button type="submit">Save</button>
                        <button onClick={() => setEdit(false)}>Cancel</button>
                </div>
                </form>
            )}
             <AddColor updateColors={updateColors} />
                <div className="spacer"></div>
        </div>
    );
};

export default ColorList;