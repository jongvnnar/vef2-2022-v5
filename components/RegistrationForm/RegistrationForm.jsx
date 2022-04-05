import { useContext, useState, useEffect } from "react";
import {
  useDeleteRegistration,
  usePostRegistration,
} from "../../lib/registration-hooks";
import { AuthContext } from "../Auth/Auth";
import { Button } from "../Button/Button";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";

export function RegistrationForm({ registrations, setRegistrations, eventId }) {
  const [comment, setComment] = useState("");
  const [validationError, setValidationError] = useState("");
  const { authenticated, user } = useContext(AuthContext);

  const {
    loading: postLoading,
    success: postSuccess,
    error: postError,
    data,
    trigger: postRegistration,
  } = usePostRegistration(eventId);
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
    trigger: deleteRegistration,
  } = useDeleteRegistration(eventId);

  useEffect(() => {
    if (postSuccess && data) {
      setRegistrations([...registrations, { ...data, name: user.name }]);
    }
    // eslint-disable-next-line
  }, [postSuccess, data]);

  useEffect(() => {
    if (deleteSuccess) {
      setRegistrations(registrations.filter((val) => val.name !== user.name));
    }
    // eslint-disable-next-line
  }, [deleteSuccess]);

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
    return (
      <div>
        <p>Þú hefur skráð þig á þennan viðburð</p>
        <Button loading={deleteLoading} onClick={deleteRegistration}>
          Skrá af viðburði
        </Button>
        {deleteError && <p>{deleteError}</p>}
      </div>
    );
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
    setComment("");
    await postRegistration({ comment });
  };

  return (
    <Form buttonName="Skrá mig" onSubmit={onSubmit} loading={postLoading}>
      <Input
        label="Athugasemd:"
        name="comment"
        value={comment}
        setValue={setComment}
        isError={!!postError || !!validationError}
        error={validationError || postError}
        textarea
      />
    </Form>
  );
}
