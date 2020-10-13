<template>
  <div class="Comments">
    <h6>Comments</h6>

    <b-card v-for="comment in comments" :key="comment.id" class="my-2">
      <div class="d-flex justify-content-between">
        <div>
          <b-card-text>
            {{ comment.comment }}
          </b-card-text>
          <small>
            Par {{ comment.user_id.name }}, le
            {{ new Date(comment.created_at).toUTCString().substring(5, 25) }}
          </small>
        </div>
        <div
          class="d-flex flex-column justify-content-around"
          v-if="
            ($store.state.user &&
              $store.state.user.email == comment.user_id.email) ||
            isAdmin
          "
        >
          <b-icon
            icon="trash"
            variant="danger"
            class="pointer"
            @click="deleteComment(comment.id)"
          ></b-icon>
          <b-icon
            icon="pencil"
            variant="info"
            class="pointer"
            v-b-modal.modalUpdateComment
            @click="setComment(comment)"
          ></b-icon>
        </div>
      </div>
    </b-card>

    <b-modal id="modalUpdateComment" title="Modifier le commentaire">
      <b-form-group
        id="input-comment"
        label="Commentaire :"
        label-for="comment"
      >
        <b-form-input
          id="comment"
          v-model="updatedComment"
          required
        ></b-form-input>
      </b-form-group>
      <template v-slot:modal-footer>
        <b-container fluid class="d-flex justify-content-around">
          <b-button
            variant="danger"
            @click="$bvModal.hide('modalUpdateComment')"
            >Annuler</b-button
          >

          <b-button
            @click="updateComment(), $bvModal.hide('modalUpdateComment')"
            variant="success"
            >Valider</b-button
          >
        </b-container>
      </template>
    </b-modal>

    <div v-if="isloggedIn" class="">
      <b-form-textarea
        id="textarea-small"
        size="sm"
        v-model="newComment"
        placeholder="Ajouter un commentaire"
      ></b-form-textarea>
      <b-button @click="sendComment" class="m-2" variant="dark" size="sm"
        >Envoyer</b-button
      >
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
      isAdmin: this.$store.getters.isAdmin,
      newComment: "",
      updatedComment: "",
      currentComment: {},
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
        //console.log(response.data);
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

    setComment(data) {
      this.currentComment = data;
      this.updatedComment = data.comment;
    },

    updateComment() {
      //console.log(this.currentComment.id, this.updatedComment);
      const payload = {};
      payload.quizzId = this.currentComment.id;
      payload.data = { comment: this.updatedComment };
      Comments.updateComment(payload).then((response) => {
        console.log(response.data);
        this.updatedComment = "";
        this.getComments();
      });
    },

    deleteComment(id) {
      //console.log(id);
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