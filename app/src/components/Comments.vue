<template>
  <div class="Comments">
    <h6>Comments</h6>

    <b-card v-for="comment in comments" :key="comment.id">
      <b-card-text>
        {{ comment.comment }}
      </b-card-text>
      <small>
        Par {{ comment.user_id.name }}, le
        {{ new Date(comment.created_at).toUTCString().substring(5, 25) }}</small
      >
      <b-icon
        v-if="
          $store.state.user && $store.state.user.email == comment.user_id.email
        "
        icon="trash"
        variant="danger"
        class="pointer"
        @click="deleteComment(comment.id)"
      ></b-icon>
    </b-card>

    <div v-if="isloggedIn">
      <b-form-textarea
        id="textarea-small"
        size="sm"
        v-model="newComment"
        placeholder="Ajouter un commentaire"
      ></b-form-textarea>
      <b-button @click="sendComment">Envoyer</b-button>
    </div>
    <div v-else>Connectez-vous pour ajouter des commentaires</div>
  </div>
</template>

<script>
import Comments from "../apis/Comments";

export default {
  data() {
    return {
      comments: [],
      isloggedIn: this.$store.getters.loggedIn,
      newComment: "",
    };
  },
  props: {
    quizId: String,
  },

  mounted() {
    this.getComments();
  },
  updated() {},

  methods: {
    getComments() {
      Comments.getComments(this.$route.params.quiz_id).then((response) => {
        console.log(response.data);
        this.comments = response.data;
      });
    },

    sendComment() {
      Comments.postComment({
        data: {
          user_id: this.$store.state.user.id,
          quizz_id: this.$route.params.quiz_id,
          comment: this.newComment,
        },
      }).then((response) => {
        //console.log(response.data);
        this.newComment = "";
        this.getComments();
      });
    },

    deleteComment(id) {
      console.log(id);
      Comments.deleteComment(id).then((response) => {
        console.log(response.data);
        this.getComments();
      });
    },
  },
};
</script>

<style>
</style>