import React from 'react';
import clsx from 'clsx';

function Input({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  meta,
  className,
  ...props
}) {
  return (
    <div>
      <label htmlFor={props.id} className="sr-only">
        {props.placeholder}
      </label>
      <input
        className={clsx(
          'relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm',
          {
            [className]: !!className,
          },
        )}
        type="text"
        {...props}
        {...field}
      />
      {errors[field.name] && touched[field.name] && (
        <p className="text-sm text-red-500 my-1 font-semibold">
          {errors[field.name]}
        </p>
      )}
    </div>
  );
}

export default Input;
