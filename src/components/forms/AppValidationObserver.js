import { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";

const AppValidationObserver = ({ children, onSubmit, methods }) => {
  

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} encType="multipart/form-data">
        {children({
          handleSubmit: methods.handleSubmit,
          register: methods.register,
          errors: methods.formState.errors,
        })}
      </form>
    </FormProvider>
  );
};

export default AppValidationObserver;