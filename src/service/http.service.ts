import axios, { AxiosError, AxiosResponse } from "axios";
const CLIENT_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL || "";

type ApiConfig<T = any> = {
  uri: String;
  request: T;
  token: String;
  params?: Object;
};

export type ResponseError = {
  status: number;
  data: any;
  exception: { detail: string };
  message: string;
};

const httpService = {
  GET: async <T, O>(apiConfig: ApiConfig<T>) => {
    const { uri, token, params } = apiConfig;
    let url = CLIENT_BASE_URL + uri;
    let headers = {};
    if (token === "" || token === null) {
      headers = {
        "Content-Type": "application/json",
      };
    } else {
      headers = {
        "Content-Type": "application/json",
        "X-Authorization": `Bearer ${token}`,
        Authorization: `Bearer ${token}`,
      };
    }
    try {
      const res = await axios.get<O>(url, {
        headers,
        params,
      });
      return res.data;
    } catch (error) {
      const err = error as AxiosError<ResponseError>;
      if (err.response) {
        const responseError: ResponseError = err.response.data;
        throw responseError;
      }
      const responseError: ResponseError = {
        status: 400,
        data: {},
        exception: {
          detail: "something went wrong",
        },
        message: "",
      };
      throw responseError;
    }
  },

  POST: async <T, O>(apiConfig: ApiConfig<T>) => {
    const { uri, request, token } = apiConfig;
    let url = CLIENT_BASE_URL + uri;
    let headers = {};
    if (token === "" || token === null) {
      headers = {
        "Content-Type": "application/json",
      };
    } else {
      headers = {
        "Content-Type": "application/json",
        "X-Authorization": `Bearer ${token}`,
        Authorization: `Bearer ${token}`,
      };
    }
    // const body = JSON.stringify(request);
    const body =
      request instanceof FormData ? request : JSON.stringify(request);
    try {
      const res = await axios.post<O>(url, body, { headers });
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        const responseError: ResponseError = err.response.data;
        throw responseError;
      }
      const responseError: ResponseError = {
        status: 400,
        data: {},
        exception: {
          detail: "something went wrong",
        },
        message: "",
      };
      throw responseError;
    }
  },

  PUT: async <T, O>(apiConfig: ApiConfig<T>) => {
    const { uri, request, token } = apiConfig;
    let url = CLIENT_BASE_URL + uri;
    let headers = {};
    if (token === "" || token === null) {
      headers = {
        "Content-Type": "application/json",
      };
    } else {
      headers = {
        "Content-Type": "application/json",
        "X-Authorization": `Bearer ${token}`,
        Authorization: `Bearer ${token}`,
      };
    }
    const body = JSON.stringify(request);
    try {
      const res = await axios.put<O>(url, body, { headers });
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        const responseError: ResponseError = err.response.data;
        throw responseError;
      }
      const responseError: ResponseError = {
        status: 400,
        data: {},
        exception: {
          detail: "something went wrong",
        },
        message: "",
      };
      throw responseError;
    }
  },

  DELETE: async <T, O>(apiConfig: ApiConfig<T>) => {
    const { uri, token } = apiConfig;
    let url = CLIENT_BASE_URL + uri;
    let headers = {};
    if (token === "" || token === null) {
      headers = {
        "Content-Type": "application/json",
      };
    } else {
      headers = {
        "Content-Type": "application/json",
        "X-Authorization": `Bearer ${token}`,
        Authorization: `Bearer ${token}`,
      };
    }
    try {
      const res = await axios.delete<O>(url, { headers });
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        const responseError: ResponseError = err.response.data;
        throw responseError;
      }
      const responseError: ResponseError = {
        status: 400,
        data: {},
        exception: {
          detail: "something went wrong",
        },
        message: "",
      };
      throw responseError;
    }
  },
};

export default httpService;
