import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodSchema } from 'zod';

export function useAuthForm<T extends FieldValues>(
  schema: ZodSchema<T>,
  onSuccess: (data: T) => Promise<void>
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      await onSuccess(data);
    } finally {
      setLoading(false);
    }
  });

  return { register, errors, loading, onSubmit };
}