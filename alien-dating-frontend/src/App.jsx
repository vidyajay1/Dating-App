import { useState, useEffect } from "react";
// COMMENT THIS WHEN USING MANUAL MODE
import { useAuth } from "@alien_org/sso-sdk-react";

import Register from "./screens/Register";
import Main from "./screens/Main";

const AUTH_MODE = "AUTO"; 
// change to "ALIEN" when ready

export default function App() {
  const auth = AUTH_MODE === "ALIEN" ? useAuth() : null;

  const [humanId, setHumanId] = useState("");
  const [profile, setProfile] = useState(null);
  const [step, setStep] = useState("login"); 
  // login | register | ready

  /* -------------------------
     COMMON BACKEND CHECK
  --------------------------*/
  const checkUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/user/${id}`);
      const data = await res.json();

      if (data.exists) {
        setProfile(data.user);
        setStep("ready");
      } else {
        setStep("register");
      }
    } catch (err) {
      console.error("Backend error", err);
    }
  };

  /* -------------------------
     ALIEN MODE EFFECT
  --------------------------*/
  useEffect(() => {
    if (AUTH_MODE !== "ALIEN") return;

    if (!auth || !auth.isAuthenticated) {
      setStep("login");
      return;
    }

    const id = auth.tokenInfo?.sub;
    if (!id) return;

    setHumanId(id);
    checkUser(id);
  }, [auth]);

  /* -------------------------
     UI
  --------------------------*/
  if (step === "login") {
    return (
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <h1>Alien Dating App 💘</h1>

        {/* ALIEN MODE */}
        {AUTH_MODE === "ALIEN" && (
          <button onClick={auth.openModal}>
            Connect & Verify with Alien
          </button>
        )}

        {/* MANUAL MODE */}
        {AUTH_MODE === "MANUAL" && (
          <>
            <input
              placeholder="Enter Human ID"
              value={humanId}
              onChange={(e) => setHumanId(e.target.value)}
            />
            <br />
            <button onClick={() => checkUser(humanId)}>
              Continue
            </button>
          </>
        )}
      </div>
    );
  }

  if (step === "register") {
    return (
      <Register
        humanId={humanId}
        onRegistered={(user) => {
          setProfile(user);
          setStep("ready");
        }}
      />
    );
  }

  if (step === "ready") {
    return <Main profile={profile} />;
  }

  return null;
}
