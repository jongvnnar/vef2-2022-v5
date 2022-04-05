import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AuthContext } from "../components/Auth/Auth";

// Veit að ég hefði getað notað react query en langaði að prófa að búa til eigin hooks.
export const useRegisterUser = (id) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  const trigger = async (body) => {
    setLoading(true);
    try {
      const url = new URL(`/users/register`, process.env.NEXT_PUBLIC_API_URL);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setSuccess(true);
        setErrors([]);
        setLoading(false);
      }
      if (!res.ok) {
        setErrors((await res.json()).errors);
        setSuccess(false);
        setLoading(false);
      }
    } catch (e) {
      setErrors(["Villa við að tengjast vefþjónustu"]);
      setSuccess(false);
      setLoading(false);
    }
  };
  return { trigger, success, loading, errors };
};
