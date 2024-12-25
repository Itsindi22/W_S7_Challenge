import React, { useState } from "react";

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}
// 👇 Here you will create your schema.

export default function Form() {
  const [values, setValues] = useState({
    fullName: "",
    size: "",
    toppings: [],
  });
// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
    { topping_id: "1", text: "Pepperoni" },
    { topping_id: "2", text: "Green Peppers" },
    { topping_id: "3", text: "Pineapple" },
    { topping_id: "4", text: "Mushrooms" },
    { topping_id: "5", text: "Ham" },
  ]
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("Form submitted with values:", values);
    setValues({
      fullName: "",
      size: "",
      toppings: [],
    });
  };

  const handleChange = (evt) => {
    const { type, checked, name, value: inputValue } = evt.target;

    if (type === "checkbox") {
      const toppingText = toppings.find((t) => t.topping_id === name)?.text;
      setValues((prevValues) => ({
        ...prevValues,
        toppings: checked
          ? [...prevValues.toppings, toppingText]
          : prevValues.toppings.filter((t) => t !== toppingText),
      }));
    } else {
      setValues((prevValues) => ({ ...prevValues, [name]: inputValue }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>
      <div className="input-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          placeholder="Type full name"
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={handleChange}
        />
      </div>
      <div className="input-group">
        <label>Size</label>
        <select name="size" value={values.size} onChange={handleChange}>
          <option value="">----Choose Size----</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
      </div>
      <div className="input-group">
        <p>Choose Toppings:</p>
        {toppings.map((topping) => (
          <label key={topping.topping_id}>
            <input
              type="checkbox"
              name={topping.topping_id}
              checked={values.toppings.includes(topping.text)}
              onChange={handleChange}
            />
            {topping.text}
          </label>
        ))}
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
}
