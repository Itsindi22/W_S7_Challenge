import axios from "axios";
import React, { useEffect, useState } from "react";
import * as yup from "yup"
// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}
// 👇 Here you will create your schema.



export const formSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong)
    .required(),
  size: yup
    .string()
  .oneOf(['S','M','L'], validationErrors.sizeIncorrect),
   
})
const initialValues = {  fullName: '',size: '', toppings: []}
const initialErrors = {  fullName: '',size: ''}

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: "1", text: "Pepperoni" },
  { topping_id: "2", text: "Green Peppers" },
  { topping_id: "3", text: "Pineapple" },
  { topping_id: "4", text: "Mushrooms" },
  { topping_id: "5", text: "Ham" },
]
export default function Form() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState(initialErrors)

   const [success, setSuccess]= useState('')
   const [failure, setFailure]= useState('')
  const [enabled, setEnabled] = useState (false)

  useEffect(() => {
    formSchema.isValid(values).then(isValid => {
      setEnabled(isValid)
    })
  },[values])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const {  fullName, size, toppings } = values
   axios.post('http://localhost:9009/api/order', values)
   
   .then(res => {
  setSuccess(res.data.message)
  setFailure('')

  })
   .catch(res => {
   
   setFailure(res.response.data.message)
   })
  

    setValues({
      fullName: "",
      size: "",
      toppings: [],
    });
  };

  const handleChange = (evt) => {
    let { type, checked, name, value } = evt.target;
    
  if (type === "checkbox") {
    const toppingId = name; // Use the checkbox name as the topping ID
    const updatedToppings = checked
      ? [...values.toppings, toppingId] // Add the topping if checked
      : values.toppings.filter((id) => id !== toppingId); // Remove if unchecked

    setValues({ ...values, toppings: updatedToppings });
  } else {
    setValues({ ...values, [name]: value });
  }
    
    // The ".reach()/.validate()" combination allows you to check a single value
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => { setErrors({ ...errors, [name]: '' })})
      .catch((err) => { setErrors({ ...errors, [name]: err.errors[0] })});
      }
    return (
    <form onSubmit={handleSubmit}>
      <h2>Order Your Pizza</h2>
      {success && <div className='success'>{success}</div>}
      {failure && <div className='failure'>{failure}</div>}
      
      <div className="input-group">
        <div>
        <label htmlFor="fullName">Full Name</label>
        {true && <div className='error'></div>}

        <input
          placeholder="Type full name"
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={handleChange}
        />
      {errors.fullName && <span>{errors.fullName}</span>}

        </div>
      </div>

      <div className="input-group">
      {errors && <div className='error'>{errors}</div>}

        <label>Size</label>
        <select name="size" value={values.size} onChange={handleChange}>
          <option value="">----Choose Size----</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
          </select>
         
          {errors.size && <span>{errors.size}</span>}

      </div>

      <div className="input-group">
        <p>Choose Toppings:</p>
        {toppings.map((topping) => (
          <label key={topping.topping_id}>
            <input
              type="checkbox"
              name={topping.topping_id}
              checked={values.toppings.includes(topping.topping_id)}
              onChange={handleChange}
            />
            {topping.text}
          </label>
        ))}
      </div>
      
      <input type="submit" value="Submit" disabled={!enabled}/>
    </form>
  );
}
