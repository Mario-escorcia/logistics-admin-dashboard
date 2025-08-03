import axios from "axios";
import { environment } from "../environment/environment";

export const getLineLayerAirportsData = ()=>{
    return axios.get(environment.lineLayerAirport)
}

export const getLineLayerRoutesData = ()=>{
    return axios.get(environment.lineLayerRoutes)
}