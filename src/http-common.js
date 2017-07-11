import axios from 'axios';
export const HTTP = axios.create({
  baseURL: `http://apip.oracleau.cloud/api/medrec/`,
  headers: {
    'accept': 'application/json',    
    'X-App-Key': ''
  }
})