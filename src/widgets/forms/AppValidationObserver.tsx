import { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";

interface AppValidationObserverProps {
  children: ReactNode | ((props: any) => ReactNode);
  onSubmit: any;
  methods: any;
}

const AppValidationObserver = ({ children, onSubmit, methods }: AppValidationObserverProps) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} encType="multipart/form-data">
        {typeof children === 'function' ? children({
          handleSubmit: methods.handleSubmit,
          register: methods.register,
          errors: methods.formState.errors,
        }) : children}
      </form>
    </FormProvider>
  );
};

export default AppValidationObserver;