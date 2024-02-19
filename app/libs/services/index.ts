import axios from 'axios';
import {apiBase} from '../../settings';

function config(token: string) {
  return {headers: {Authorization: `Bearer ${token}`}};
}

const storeBase = `${apiBase}/tienda`;

/**
 * Store
 */

export async function getStorePopularPlants() {
  return (await axios.get(`${storeBase}/popular-plants`)).data;
}

export async function getCategories() {
  return (await axios.get(`${storeBase}/categories`)).data;
}

export async function getPlantsByCategory(category: number, token: string) {
  return (
    await axios.get(`${storeBase}/plants-category/${category}`, config(token))
  ).data;
}

/**
 * Auth
 */

const authBase = `${apiBase}/auth`;

export async function signin(params: any) {
  return (await axios.post(`${authBase}/login`, params)).data;
}

export async function register(params: any) {
  return (await axios.post(`${authBase}/register`, params)).data;
}

/**
 * GreenHouse
 */

const greenHouseBase = `${apiBase}/invernaderos`;

export async function getPlantsByUser(params: any, token: string) {
  return (await axios.post(`${greenHouseBase}/usuario`, params, config(token)))
    .data;
}

export async function getAssignedPlants(params:any) {
  return (await axios.post(`${greenHouseBase}/agricultor`, params)).data
}

/**
 * Plants
 */

const plantsBase = `${apiBase}/plantas`;

export async function getPlantPrice(params: any, token: string) {
  return (await axios.post(`${plantsBase}/precios`, params, config(token)))
    .data;
}

/**
 * Pagos
 */

const pagosBase = `${apiBase}/pagos`;

export async function buy(params: any, token: string) {
  return (await axios.post(`${pagosBase}/factura`, params, config(token))).data;
}

export async function buyPlan(params: any, token: string) {
  return (await axios.post(`${pagosBase}/plan`, params, config(token))).data;
}

export async function getHistory(userid: number, token: string) {
  return (await axios.get(`${pagosBase}/historial/${userid}`, config(token)))
    .data;
}

/**
 * Hitos
 */

const milestoneBase = `${apiBase}/hitos`

export async function getMilestones(params: any, token: string) {
    return (await axios.post(`${milestoneBase}/listar`,params, config(token))).data
}

export async function addMilestone(params:any) {
  return (await axios.post(`${milestoneBase}/create`, params)).data;
}