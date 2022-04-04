import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AuthContext } from "../components/Auth/Auth";

export const usePostRegistration = (id) => {
  const router = useRouter();
  const { token, logoutUser, authenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const trigger = async (body) => {
    if (!authenticated) {
      setError("Not authenticated");
      return;
    }
    setLoading(true);
    try {
      const url = new URL(
        `/events/${id}/register`,
        process.env.NEXT_PUBLIC_API_URL
      );
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.status === 401) {
        logoutUser();
        router.push("/");
        return;
      }
      if (res.ok) {
        setSuccess(true);
        setError("");
        setLoading(false);
        setData(await res.json());
      }
      if (!res.ok) {
        setError("Ekki tókst að skrá notanda");
        setSuccess(false);
        setLoading(false);
        setData(null);
      }
    } catch (e) {
      setError("Villa við að tengjast vefþjónustu");
      setSuccess(false);
      setLoading(false);
      setData(null);
    }
  };
  return { trigger, success, loading, error, data };
};

export const useDeleteRegistration = (id) => {
  const router = useRouter();
  const { token, logoutUser, authenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const trigger = async () => {
    if (!authenticated) {
      setError("Not authenticated");
      return;
    }
    setLoading(true);
    try {
      const url = new URL(
        `/events/${id}/register`,
        process.env.NEXT_PUBLIC_API_URL
      );
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      });
      if (res.status === 401) {
        logoutUser();
        router.push("/");
        return;
      }
      if (res.ok) {
        setSuccess(true);
        setError("");
        setLoading(false);
      }
      if (!res.ok) {
        setError("Ekki tókst að afskrá notanda");
        setSuccess(false);
        setLoading(false);
      }
    } catch (e) {
      setError(e.message || "Villa við að tengjast vefþjónustu");
      setSuccess(false);
      setLoading(false);
    }
  };

  return { trigger, success, loading, error };
};
