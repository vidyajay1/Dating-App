import { useEffect, useState } from "react";

export default function Main({ profile }) {
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/api/users")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.users.filter((u) =>
          isMatch(profile, u)
        );
        setUsers(filtered);
      });
  }, [profile]);

  if (!users.length) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h1>
          Welcome {profile.firstName} {profile.lastName} 💘
        </h1>
        <h3>Credits: 💰 {profile.credits}</h3>
        <p>No matches available 😢</p>
      </div>
    );
  }

  const current = users[index];

  const next = () => setIndex((prev) => prev + 1);

  if (!current) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h1>
          Welcome {profile.firstName} {profile.lastName} 💘
        </h1>
        <h3>Credits: 💰 {profile.credits}</h3>
        <p>You’ve seen everyone 🎉</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>
        Welcome {profile.firstName} {profile.lastName} 💘
      </h1>

      {/* CREDITS */}
      <h3 style={{ marginBottom: 20 }}>
        Credits: 💰 {profile.credits}
      </h3>

      <div
        style={{
          border: "1px solid #ccc",
          padding: 20,
          width: 300,
          margin: "0 auto",
          borderRadius: 10
        }}
      >
        <h3>
          {current.firstName}, {current.age}
        </h3>
        <p>{current.gender}</p>
        <p>{current.location}</p>

        <div style={{ marginTop: 20 }}>
          <button
            style={{ marginRight: 20 }}
            onClick={() => {
              console.log("❌ Skipped", current.userId);
              next();
            }}
          >
            ❌
          </button>

          <button
            onClick={() => {
              console.log("✅ Liked", current.userId);
              next();
            }}
          >
            ✔
          </button>
        </div>
      </div>
    </div>
  );
}

/* -----------------------
   MATCHING LOGIC
------------------------*/
function isMatch(me, other) {
  if (me.userId === other.userId) return false;

  if (me.lookingFor === "Everyone") return true;
  if (me.lookingFor === "Men" && other.gender === "Male") return true;
  if (me.lookingFor === "Women" && other.gender === "Female") return true;

  return false;
}
