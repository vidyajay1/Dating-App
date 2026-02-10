import { useState } from "react";

export default function Register({ humanId, onRegistered }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    lookingFor: "",
    location: "",
    relationshipStatus: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ humanId, ...form })
    });

    const data = await res.json();
    if (data.success) onRegistered(data.user);
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Complete Your Profile</h2>

      <input name="firstName" placeholder="First Name" required onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" required onChange={handleChange} />
      <input name="age" type="number" placeholder="Age" required onChange={handleChange} />

      <select name="gender" required onChange={handleChange}>
        <option value="">Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Non-binary</option>
        <option>Prefer not to say</option>
      </select>

      <select name="lookingFor" required onChange={handleChange}>
        <option value="">Looking For</option>
        <option>Men</option>
        <option>Women</option>
        <option>Everyone</option>
      </select>

      <select name="relationshipStatus" required onChange={handleChange}>
        <option value="">Relationship Goal</option>
        <option>Casual</option>
        <option>Serious</option>
        <option>Marriage</option>
        <option>Not Sure</option>
      </select>

      <select name="location" required onChange={handleChange}>
        <option value="">Location</option>
        <option>USA</option>
        <option>India</option>
        <option>Europe</option>
        <option>Asia</option>
        <option>Other</option>
      </select>

      <button type="submit">
        Register & Get 100 Credits 🚀
      </button>
    </form>
  );
}
