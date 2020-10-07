import Api from "./Api";
export default {
  getCategories() {
    return Api().get("/category/");
  },
  getQuizzes() {
    return Api().get("/quiz");
  },
  addQuiz(payload) {
    return Api().post("/quizz", payload.data);
  },
  updateQuiz(payload) {
    return Api().patch("/quiz/" + payload.quizId, payload.data);
  },
  deleteQuiz(quizId) {
    return Api().delete("/quiz/" + quizId);
  },

  getQuestions(quizId) {
    return Api().get("/question/" + quizId);
  },

  addQuestions(payload) {
    return Api().post("/question", payload.data);
  },

  updateQuestions(payload) {
    return Api().put("/question", payload.data);
  },

  updateQuestion(payload) {
    return Api().patch("/question/" + payload.questionId, payload.data);
  },

  deleteQuestions(questionId) {
    return Api().delete("/question/" + questionId);
  },
};
