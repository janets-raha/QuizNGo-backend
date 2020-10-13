import Api from "./Api";
export default {
  getCategories() {
    return Api().get("/category/");
  },
  addCategory(payload) {
    return Api().post("/category/", payload.data);
  },
  getQuizzes() {
    return Api().get("/quizz");
  },
  getQuiz(quizId) {
    return Api().get("/quizz/" + quizId);
  },
  addQuiz(payload) {
    return Api().post("/quizz", payload.data);
  },
  updateQuiz(payload) {
    return Api().patch("/quizz/" + payload.quizId, payload.data);
  },
  deleteQuiz(quizId) {
    return Api().delete("/quizz/" + quizId);
  },

  getQuestions(quizId) {
    return Api().get("/question/" + quizId + "/admin");
  },

  addQuestions(payload) {
    return Api().post("/question", payload.data);
  },

  updateQuestions(payload) {
    return Api().patch("/question/" + payload.questionId, payload.data);
  },

  deleteQuestions(payload) {
    return Api().delete("/question/" + payload.quizId);
  },
};
