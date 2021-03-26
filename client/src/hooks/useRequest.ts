import React, { useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

type useRequestProps = {
  url: string,
  method: HttpMethod,
  body?: any

}

export default function useRequest({ url, method, body }: useRequestProps) {
  const [errors, setErrors] = useState(null)

  const doRequest = <T>(): Promise<AxiosResponse<T>> => {
    setErrors(null);
    return axios[method](url, body).then(({ data }) => {
      return data;
    }).catch((err: AxiosError) => {
      setErrors(err.response.data.errors)
      throw err;
    })
  }

  return { doRequest, errors }
}