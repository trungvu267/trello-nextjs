"use client";
import { useCreateTodoModal, useSetDefaultStatusValue } from "@/store/useModal";
import { dummyStatusList } from "@/utils/dummyData";
import { Button, Input, Form, Radio } from "react-daisyui";
import {
  useForm,
  FormProvider,
  useFormContext,
  FieldError,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTodoSchema } from "@/utils/schema";
import { useClickAway } from "@uidotdev/usehooks";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useTodoList } from "@/store/useTodoList";

const CreateTodoModal = () => {
  const [visible, setVisible] = useCreateTodoModal((state) => [
    state.createTodoVisible,
    state.setCreateTodoVisible,
  ]);
  const defaultStatusValue = useSetDefaultStatusValue(
    (state) => state.defaultValue
  );
  const [fetchTodoList, createTodoInDb] = useTodoList((state) => [
    state.fetchTodoList,
    state.createTodoInDb,
  ]);
  const methods = useForm({
    resolver: yupResolver(createTodoSchema),
  });
  useEffect(() => {
    methods.setValue("status", defaultStatusValue);
  }, [defaultStatusValue]);
  useEffect(() => {
    fetchTodoList();
  }, [createTodoInDb]);
  const ref = useClickAway(() => {
    setVisible();
  });
  const onSubmit = methods.handleSubmit((data) => {
    createTodoInDb(data);
    setVisible();
  });
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md max-h-full " ref={ref}>
              <div className=" relative  rounded-lg shadow bg-gray-700 ">
                <button
                  onClick={() => {
                    setVisible();
                  }}
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center pt-12">
                  <FormProvider {...methods}>
                    <form
                      onSubmit={onSubmit}
                      className="flex flex-col space-y-4"
                    >
                      <Input type="text" {...methods.register("title")} />
                      <ErrorMessage
                        message={methods?.formState?.errors?.title?.message}
                      />
                      <StatusList statusList={dummyStatusList} />
                      <Button className="bg-primary border-none">
                        Add todo 🚀
                      </Button>
                    </form>
                  </FormProvider>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateTodoModal;

const StatusList = ({ statusList }: { statusList: Status[] }) => {
  const { register, formState } = useFormContext();
  return (
    <>
      <div className="flex flex-row">
        {statusList.map((statusItem) => (
          <Form.Label title={statusItem.label} className="space-x-2">
            <Radio
              {...register("status")}
              value={statusItem.value}
              name="status"
              className={`checked:bg-primary`}
            />
          </Form.Label>
        ))}
      </div>
      <ErrorMessage message={formState?.errors?.status?.message} />
    </>
  );
};
interface ErrorMessageProps {
  message: FieldError["message"];
}
const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <div className="text-red-500 h-2 text-left">{message}</div>;
};
