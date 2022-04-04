import { useState } from "react";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // VALIDATION //
  const [nameError, setNameError] = useState("");
  const [passError, setPassError] = useState("");
  const validateUsername = (input) => {
    if (!input || input.length > 64) {
      setNameError("Notendanafns er krafist, hámark 64 stafir");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };
  const validatePassword = (password) => {
    if (!password || password.length > 256) {
      setPassError("Lykilorðs er krafist, hámark 256 stafir");
      return false;
    } else {
      setPassError("");
      return true;
    }
  };

  //Leyfi að 'skrá inn' en það gerir ekkert nema breyta notendanafni.
  const onSubmit = () => {
    const validUser = validateUsername(username);
    const validPassword = validatePassword(password);
    if (!validUser || !validPassword) return;
  };

  return (
    <Form onSubmit={onSubmit} buttonName="Innskrá">
      <Input
        label="Notendanafn"
        name="username"
        value={username}
        setValue={setUsername}
        isError={!!nameError}
        error={nameError}
      />
      <Input
        label="Lykilorð"
        name="password"
        value={password}
        setValue={setPassword}
        type="password"
        isError={!!passError}
        error={passError}
      />
    </Form>
  );
}
