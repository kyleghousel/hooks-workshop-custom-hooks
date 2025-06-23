import { useEffect, useState } from "react";

/*
  the two parameters for this function are:
  - key: the key on localStorage where we are saving this data
  - initialValue: the initial value of state
*/
export function useLocalStorage(key, initialValue=null) {

  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
        const value = localStorage.getItem(key)

        if (value) {
            return JSON.parse(value)
        } else {
            localStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue
        }
    } catch (error) {
        localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue
    }
  })

   const setLocalStorageStateValue = (valueOrFn) => {
    let newValue;
    if (typeof valueOrFn === 'function') {
        const fn = valueOrFn;
        newValue = fn(localStorageValue)
    }
    else {
        newValue = valueOrFn;
    }
    localStorage.setItem(key, JSON.stringify(newValue));
    setLocalStorageValue(newValue)
    }

  return [localStorageValue, setLocalStorageStateValue]
}

function Form() {

  const [name, setName] = useLocalStorage("test string", "");
  console.log(name);

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="name">Name:</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <h4>{name ? `Welcome, ${name}!` : "Enter your name"}</h4>
    </form>
  );
}

function FormWithObject() {
  // 🤓 save me for the bonus! when you're ready, update this useState to use your useLocalStorage hook instead
  const [formData, setFormData] = useLocalStorage("form", {
    title: "",
    content: "",
  });

  function handleChange(e) {
    setFormData(formData => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="name">Title:</label>
      <input name="title" value={formData.title} onChange={handleChange} />
      <label htmlFor="name">Content:</label>
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
      />
    </form>
  );
}

export default function App() {
  return (
    <div>
      <h2>useLocalStorage can save string</h2>
      <Form />
      <hr />
      <h2>useLocalStorage can save objects (Bonus)</h2>
      <FormWithObject />
    </div>
  );
}
