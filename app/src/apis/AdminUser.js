import Api from "./Api";
export default {

  getUsers() {
    return Api().get("/users/admin");
  },
  setUser(payload) {
    return Api().patch("/users/admin/" + payload.id, { role: payload.role });
  },
  deleteUser(userId) {
    return Api().delete("/users/admin/" + userId);
  }

};