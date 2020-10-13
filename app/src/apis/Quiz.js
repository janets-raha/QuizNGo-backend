import Api from "./Api";
export default {
  getQuizzes() {
    return Api().get("/quizz");
  },
  getQuiz(quizId) {
    return Api().get("/quizz/" + quizId);
  },

  getQuestions(quizId) {
    return Api().get("/question/" + quizId);
  },

  getResults(payload) {
    return Api().post("/question/" + payload.quizId + "/result", {
      answers: payload.answers,
      timeout: payload.timeout,
      user_id: payload.userId,
    });
  },
};
