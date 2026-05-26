import { useEffect, useState } from "react";

export const useAuth = () => {
  const [sharedData, setSharedData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3500/me", {
          credentials: "include",
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setSharedData(data);
        }
      } catch (error) {
        console.log(`Auth error: ${error}`);
      }
    }
    fetchData();
  }, []);
  return {
    data: sharedData,
  };
};
