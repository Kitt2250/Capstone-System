import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase.config";
import Login from "./component/Login";
import ForgotPassword from "./component/ForgotPassword";
import FamilyNavigation from "./component/family/FamilyNavigation";
import AdminNavigation from "./component/admin/AdminNavigation";
import StaffNavigation from "./component/staff/StaffNavigation";

function roleHome(role) {
  if (role === "admin") return "/admin/dashboard";
  if (role === "family") return "/family/burial";
  if (role === "staff") return "/staff/dashboard";
  return "/login";
}

function FallbackRoute({ to }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.history.length > 2) navigate(-1);
    else navigate(to, { replace: true });
  }, [navigate, to]);
  return null;
}

function App() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({ loading: true, user: null, role: null });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthState({ loading: false, user: null, role: null });
        return;
      }
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (!snap.exists()) {
          // User exists in Auth but was deleted from Firestore
          await signOut(auth);
          setAuthState({ loading: false, user: null, role: null });
          return;
        }
        const role = (snap.data().role || "").toLowerCase();
        setAuthState({ loading: false, user, role });
      } catch (err) {
        console.error("Failed to load role:", err);
        await signOut(auth);
        setAuthState({ loading: false, user: null, role: null });
      }
    });
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (authState.loading) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "100vh", fontSize: 14, color: "#6b7280"
      }}>
        Loading...
      </div>
    );
  }

  const { user, role } = authState;

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user
            ? <Navigate to={roleHome(role)} replace />
            : <Login onForgotPassword={() => navigate("/forgot-password")} onLogin={() => {}} />
        }
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword onBack={() => navigate("/login")} />}
      />

      <Route
        path="/admin/*"
        element={
          user && role === "admin"
            ? <AdminNavigation onSignOut={handleSignOut} />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/family/*"
        element={
          user && role === "family"
            ? <FamilyNavigation onSignOut={handleSignOut} />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/staff/*"
        element={
          user && role === "staff"
            ? <StaffNavigation onSignOut={handleSignOut} />
            : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/"
        element={<Navigate to={user ? roleHome(role) : "/login"} replace />}
      />

      <Route path="*" element={<FallbackRoute to="/login" />} />
    </Routes>
  );
}

export default App;