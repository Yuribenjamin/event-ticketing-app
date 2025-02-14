export type QueryHandlerProps<T> = {
  loading: boolean;
  error?: { message: string } | null;
  data: T | undefined;
  children: React.ReactNode;
};