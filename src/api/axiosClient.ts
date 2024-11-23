import { baseUrl } from "@/constants";
import axios, { Axios } from "axios";

export const axios_client = axios.create({
    baseURL: baseUrl,
})