import { useState, useContext } from "react";
import { AuthContext } from "../Auth/Auth";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { message, loginUser, fetching } = useContext(AuthContext);
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
    loginUser(username, password);
  };

  return (
    <Form onSubmit={onSubmit} buttonName="Innskrá" loading={fetching}>
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
      {message && <p>{message}</p>}
    </Form>
  );
}
