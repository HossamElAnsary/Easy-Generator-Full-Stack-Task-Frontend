import { FC } from "react";

interface FormFieldProps {
    id: string
    label: string
    error?: string
    children: React.ReactNode
  }
  
const FormField: FC<FormFieldProps> = ({ id, label, error, children }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">{children}</div>
    {error && (
      <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
        {error}
      </p>
    )}
  </div>
);

export default FormField;
  