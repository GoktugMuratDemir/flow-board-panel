"use client";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { RHFTextfield } from "./hook-form/RHFTextfield";
import { RHFSubmitButton } from "./hook-form/RHFSubmitButton";
import { loginRequest } from "@/api";
import { setTokenLocalStorage } from "@/utils/editLocalStorage";
import { useRouter } from "next/navigation";

export type LoginFormValues = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email format zorunlu")
    .required("Email adresi zorunlu"),
  password: yup.string().required("Parola zorunlu"),
});

const defaultValues: LoginFormValues = {
  email: "goktugdemirwebdev@gmail.com",
  password: "password",
};

export const AuthForm: React.FC = () => {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const returnData = await loginRequest(data);
      console.log("returnData", returnData);
      setTokenLocalStorage("accessToken", returnData.token);
      if (router) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center gap-10">
        <h2 className="font-bold text-4xl">Giriş Yap</h2>
        <FormProvider {...form}>
          <form
            className="w-full flex flex-col gap-9 max-w-96"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="flex flex-col gap-6">
              <RHFTextfield name="email" label="Email" />
              <RHFTextfield name="password" type="password" label="Parola" />
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <RHFSubmitButton label="Giriş Yap" />
            </div>

            {/* <RHFFormValues /> */}
          </form>
        </FormProvider>
      </div>
    </>
  );
};
