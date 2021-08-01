import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { Token } from 'react-stripe-checkout'

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

type useRequestProps<T> = {
  url: string,
  method: HttpMethod,
  body?: T
  onSuccess?: () => void
}

export default function useRequest<T>({ url, method, body }: useRequestProps<T>) {
  const [errors, setErrors] = useState(null)

  const doRequest = <T>(params = {}): Promise<T> => {
    setErrors(null);
    return axios[method](url, { ...body, ...params }).then(({ data }) => {
      return data;
    }).catch((err: AxiosError) => {
      setErrors(err.response.data.errors)
      throw err;
    })
  }

  return { doRequest, errors }
}