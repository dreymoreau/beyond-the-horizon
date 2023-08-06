"use client";

import Input from "@/components/input/Input";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

//setting types for props
interface InitialStateProps {
  name: string;
  email: string;
  password: string;
}
const initialState: InitialStateProps = {
  name: "",
  email: "",
  password: "",
};

export default function Page() {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  function handleChange(e: any) {
    // spreading out state, target to name in input field and then the value entered
    setState({ ...state, [e.target.name]: e.target.value });
  }

  //event:FormEvent helps handle the forms
  const onSubmit = (event: FormEvent) => {
    // not refreshing the page when submitting the form, also when submitting the form, sending request to backend in register folder in the api folder
    event.preventDefault();
    // sending state for crud, telling browser info on request
    axios
      .post("/api/register", state)
      .then(() => {
        router.refresh();
      })
      .then(() => {
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      })
      .catch((err: any) => {});
  };
  return (
    <form className="text-center" onSubmit={onSubmit}>
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <Input
          placeholder="Name"
          name="name"
          id="name"
          type="text"
          onChange={handleChange}
          value={state.name}
        />
        <Input
          placeholder="Email"
          name="email"
          id="email"
          type="email"
          onChange={handleChange}
          value={state.email}
        />
        <Input
          placeholder="Password"
          name="password"
          id="password"
          type="password"
          onChange={handleChange}
          value={state.password}
        />
        <button type="submit">Submit</button>
      </div>

      <div>
        <div>
          Do you have an account? <Link href="/login">Sign in</Link>
        </div>
      </div>
    </form>
  );
}
