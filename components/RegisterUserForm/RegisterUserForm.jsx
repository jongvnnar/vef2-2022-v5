import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { useState } from "react";
import Link from "next/link";
import { useRegisterUser } from "../../lib/registeruser-hooks";
export function RegisterUserForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { trigger, success, loading, errors } = useRegisterUser();
  if (success) {
    return (
      <section>
        <p>Nýskráning tókst!</p>
        <Link href="/login">
          <a>Skráðu þig inn.</a>
        </Link>
      </section>
    );
  }
  const reduceErrorsForParam = (param) => {
    return errors.reduce((err, val) => {
      if (val.param === param) {
        return `${err} ${val.msg}.`;
      }
      return err;
    }, "");
  };
  return (
    <Form
      buttonName="Skrá mig"
      onSubmit={() => trigger({ name, username, password })}
      loading={loading}
    >
      <Input
        label="Nafn:"
        name="name"
        value={name}
        setValue={setName}
        isError={!!reduceErrorsForParam("name")}
        error={reduceErrorsForParam("name")}
      />
      <Input
        label="Notendanafn:"
        name="username"
        value={username}
        setValue={setUsername}
        isError={!!reduceErrorsForParam("username")}
        error={reduceErrorsForParam("username")}
      />
      <Input
        label="Lykilorð:"
        name="password"
        value={password}
        setValue={setPassword}
        isError={!!reduceErrorsForParam("password")}
        error={reduceErrorsForParam("password")}
        type="password"
      />
    </Form>
  );
}
