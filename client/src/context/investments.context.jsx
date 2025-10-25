import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./auth.context";

export const InvestmentsContext = createContext();

export function InvestmentsProvider({ children }) {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const fetchInvestments = async () => {
    if (!token || !user?._id) {
      console.log("❌ No token or user ID available");
      setInvestments([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/investments/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setInvestments(response.data);
    } catch (err) {
      console.error("❌ Error fetching investments:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
      }
      setError(err.response?.data?.error || "Failed to fetch investments");
    } finally {
      setLoading(false);
    }
  };

  const addInvestment = async (investmentData) => {
    if (!token) return;

    try {
      const response = await axios.post("/api/investments", investmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setInvestments((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("❌ Error adding investment:", error);
    }
  };

  const deleteInvestments = async (investmentId) => {
    if (!token) return;

    try {
      await axios.delete(`/api/investments/${investmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove from state
      setInvestments((prev) => prev.filter((inv) => inv._id !== investmentId));
      console.log("🗑️ Investment deleted:", investmentId);
    } catch (error) {
      console.error("❌ Error deleting investment:", error);
    }
  };

  const updateInvestments = async (investmentId, updatedData) => {
    if (!token) return;

    try {
      const response = await axios.put(
        `/api/investments/${investmentId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update state
      setInvestments((prev) =>
        prev.map((inv) => (inv._id === investmentId ? response.data : inv))
      );

      console.log("♻️ Investment updated:", response.data);
    } catch (error) {
      console.error("❌ Error updating investment:", error);
    }
  };

  const getSingleInvestments = async (investmentId) => {
    if (!token) return;

    try {
      const response = await axios.get(`/api/investments/${investmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("🔍 Single Investment:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching single investment:", error);
      return null;
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchInvestments();
    } else {
      setInvestments([]);
    }
  }, [user?._id]);

  return (
    <InvestmentsContext.Provider
      value={{
        investments,
        loading,
        error,
        fetchInvestments,
        addInvestment,
        deleteInvestments,
        updateInvestments,
        getSingleInvestments,
        user,
      }}
    >
      {children}
    </InvestmentsContext.Provider>
  );
}
