import { Field, Formik, Form, ErrorMessage } from "formik";
import { IoIosClose } from "react-icons/io";

const LogInModal = ({
  schema,
  buttonName,
  input1,
  label1,
  label2,
  name1,
  name2,
  icon1,
  icon2,
  input2,
  closeModal,
  initialValue,
  submithandler,
}) => {
  const handleSubmitll = (values) => {
    submithandler(values);
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={schema}
      onSubmit={handleSubmitll}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <Form>
     
          <div
            // onClick={showModalHandler}
            className="fixed inset-0 flex items-center bg-black/90 justify-center  z-50"
          >
            <div className="bg-white dark:bg-slate-900 p-4 rounded-lg sm:w-full md:w-[60%] lg:w-[50%]">
              <div className="relative items-center bg-slate-50 dark:bg-slate-950 justify-center flex-row border-[0.5px] rounded-xl border-neutral-400 pb-8 p-2 w-full">
                <div
                  onClick={closeModal}
                  className="flex  rounded-full p-1 absolute right-1 justify-end items-center  cursor-pointer"
                >
                  <IoIosClose className="text-3xl" />
                </div>
                <div className=" grid lg:grid-cols-2 sm:grid-cols-1  sm:gap-5 pt-5">
                  <div>
                    <div className="flex items-center justify-center gap-3 ">
                      {icon1}
                      <p className=" py-2 text-sm font-semibold">{label1}</p>
                    </div>

                    <Field
                      type={input1}
                      name={name1}
                      className="w-full py-2  border-gray-300 px-3 pr-5 bg-transparent rounded-lg border-[1px] ring-gray-800"
                    />
                    <ErrorMessage name={name1} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 justify-center">
                      {icon2}
                      <p className=" py-2 text-sm font-semibold">{label2}</p>
                    </div>
                    <Field
                      type={input2}
                      name={name2}
                      className="w-full py-2  border-gray-300 px-3 pr-5 bg-transparent rounded-lg border-[1px] ring-gray-800"
                    />
                    <ErrorMessage name={name2} />
                  </div>
                </div>
                <div className="flex items-center justify-center pt-5">
                  <button
                    className="bg-primaryblue/80 hover:bg-primaryblue/70 py-2 px-3 rounded-xl w-[60%] text-white"
                    type="submit"
                  >
                    {buttonName}{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LogInModal;
