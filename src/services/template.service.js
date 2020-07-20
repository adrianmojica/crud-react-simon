import http from "../http-common";

class TemplateDataService {
  getAll() {
    return http.get("/templates");
  }

  get(id) {
    return http.get(`/templates/${id}`);
  }

  create(data) {
    return http.post("/templates", data);
  }

  update(id, data) {
    return http.put(`/templates/${id}`, data);
  }

  delete(id) {
    return http.delete(`/templates/${id}`);
  }


  findByName(name) {
    return http.get(`/templates?name=${name}`);
  }
}

export default new TemplateDataService();