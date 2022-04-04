import { useContext, useState, useEffect } from "react";
import { usePostRegistration } from "../../lib/registration-hooks";
import { AuthContext } from "../Auth/Auth";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";

export function RegistrationForm({ registrations, setRegistrations, eventId }) {
  const [comment, setComment] = useState("");
  const [validationError, setValidationError] = useState("");
  const { authenticated, user } = useContext(AuthContext);
  const {
    loading,
    success,
    error,
    data,
    trigger: postRegistration,
  } = usePostRegistration(eventId);
  useEffect(() => {
    console.log(success);
    console.log(data);
    if (success && data) {
      setRegistrations([...registrations, { ...data, name: user.name }]);
    }
  }, [success, data]);
  usePostRegistration(eventId);
  // Don't show form if user not logged in.
  if (!authenticated) {
    return <></>;
  }

  // Hide registration form if already registered
  const isRegistered = () => {
    for (const entry of registrations) {
      if (entry.name === user?.name) {
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
      setValidationError("Athugasemd má að hámarki vera 400 stafir");
      return false;
    } else {
      setValidationError("");
      return true;
    }
  };

  // Add to registrations on submit if comment valid.
  const onSubmit = async () => {
    const commentValid = validateSubmission(comment);
    if (!commentValid) {
      return;
    }
    await postRegistration({ comment });
  };

  return (
    <Form buttonName="Skrá mig" onSubmit={onSubmit} loading={loading}>
      <Input
        label="Athugasemd:"
        name="comment"
        value={comment}
        setValue={setComment}
        isError={!!error || !!validationError}
        error={validationError || error}
        textarea
      />
    </Form>
  );
}
