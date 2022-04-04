import { useContext, useState } from "react";
import { AuthContext } from "../../App";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";

export function RegistrationForm({ registrations, setRegistrations }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  // Don't show form if user not logged in.
  if (!user) {
    return <></>;
  }

  // Hide registration form if already registered
  const isRegistered = () => {
    for (const entry of registrations) {
      if (entry.name === user) {
        return true;
      }
    }
    return false;
  };

  if (isRegistered()) {
    return <p>Þú hefur skráð þig á þennan viðburð</p>;
  }

  // VALIDATION
  const validateSubmission = (input) => {
    if (input.length > 400) {
      setError("Athugasemd má að hámarki vera 400 stafir");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  // Add to registrations on submit if comment valid.
  const onSubmit = () => {
    const commentValid = validateSubmission(comment);
    if (!commentValid) {
      return;
    }
    setRegistrations([...registrations, { name: user, comment }]);
  };

  return (
    <Form buttonName="Skrá mig" onSubmit={onSubmit}>
      <Input
        label="Athugasemd:"
        name="comment"
        value={comment}
        setValue={setComment}
        textarea
        isError={!!error}
        error={error}
      />
    </Form>
  );
}
