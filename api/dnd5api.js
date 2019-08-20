const ENV = require('./../.env.json')
import axios from "axios"

export default {

  async getMonsters() {
    return await axios.get(`${ENV.server}/monsters`);
  },

  async getMonsterInfo(id) {
      return await axios.get(`${ENV.server}/monsters/${id}`);
  },

  async getRopisToken(domain) {
    return axios.get(`${ENV.server}/ropis/auth/get-token`, { params: { domain } }).then(response => response.data);
  },

}
