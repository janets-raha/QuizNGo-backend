import Api from "./Api";
export default {
  getComments(quizzId) {
    return Api().get('/comments/quizz/' + quizzId)
  },
  postComment(payload) {
    return Api().post('/comments', payload.data)
  },
  deleteComment(quizzId) {
    return Api().delete('/comments/' + quizzId)
  }

};