import http from "../http-common";

class CustomerDataService {
  getAll() {
    return http.get("/customers");
  }

  get(id) {
    return http.get(`/customers/${id}`);
  }


  findByName(email) {
    return http.get(`/customers?email=${email}`);
  }
}

export default new CustomerDataService();