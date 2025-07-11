// hooks/useApiMutation.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const transformKeysToLowercase = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(item => transformKeysToLowercase(item));
  }
  if (data !== null && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key.toLowerCase(),
        transformKeysToLowercase(value),
      ])
    );
  }
  return data;
};


export function useApiMutation<T = any, P = any>(url: string, method: "POST" | "GET" = "POST") {
  return useMutation<T, Error, P>({
   mutationFn: (params) =>
      axios({ url, method, data: params }).then(res => {
        return transformKeysToLowercase(res.data);
      })
  });
}
