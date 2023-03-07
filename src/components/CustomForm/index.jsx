import { Field, Form, Formik } from 'formik';
import React from 'react';

function CustomForm({
  fields, btnProps, children, ...props
}) {
  return (
    <Formik {...props}>
      {({
        isValid, dirty, isSubmitting, errors,
      }) => (
        <Form className="mt-8 space-y-6">
          {errors.serverError && <p className="text-center text-red-500 text-lg font-medium">{errors.serverError}</p>}
          <input
            type="hidden"
            name="remember"
            defaultValue="true"
          />
          <div className="-space-y-px rounded-md shadow-sm">
            {fields.map((x) => (
              <Field key={x.name} {...x} />
            ))}
          </div>
          {children}

          <div>
            <button
              disabled={!(isValid && dirty) || isSubmitting}
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-slate-500 disabled:cursor-wait"
              {...btnProps}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CustomForm;
