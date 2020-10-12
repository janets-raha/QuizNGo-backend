<template>
  <b-container class="py-3">
    <div
      v-for="(user, idx) in users"
      class="accordion"
      role="tablist"
      :key="idx"
    >
      <b-card no-body class="mb-1">
        <!-- Header collapsable -->
        <b-card-header header-tag="header" role="tab" class="p-0">
          <b-container
            fluid
            v-b-toggle="'accordion-' + idx"
            variant="info"
            class="p-2 btn-primary d-flex justify-content-between"
          >
            <b-col md="4">
              <strong>
                {{ user.name }}
              </strong>
            </b-col>
            <b-col md="4">
              <strong>
                {{ user.email }}
              </strong>
            </b-col>
            <b-col md="4">
              <strong>
                {{ user.role }}
              </strong>
            </b-col>
          </b-container>
        </b-card-header>

        <!-- Card -->
        <b-collapse
          :id="'accordion-' + idx"
          visible
          accordion="quiz-accordion"
          role="tabpanel"
        >
          <b-card-body>
            <!-- <b-form @submit="onSubmit" @reset="onReset" v-if="show"> -->
            <!-- <b-form> -->
            <b-form-group id="input-name" label="Nom :" label-for="userName">
              <b-form-input
                id="userName"
                v-model="user.name"
                required
                placeholder="XXX"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-email"
              label="Email :"
              label-for="userEmail"
            >
              <b-form-input
                id="userEmail"
                v-model="user.email"
                type="email"
                required
                placeholder="YYY"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-xp" label="Xp :" label-for="userXp">
              <b-form-input
                id="userXp"
                v-model="user.score"
                required
                placeholder="ZZZ"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-role" label="Role :" label-for="userRole">
              <b-form-select
                id="userRole"
                v-model="user.role"
                :options="roles"
                required
              ></b-form-select>
            </b-form-group>
            <b-container fluid class="p-2 d-flex justify-content-between">
              <b-button
                v-b-modal.modalDeleteUser
                variant="danger"
                @click="setCurrentUser(user)"
                >Supprimer</b-button
              >
              <!-- <b-button @click="deleteUser(user.id)" variant="danger"
                >Supprimer</b-button
              > -->
              <!-- <b-button @click="showMsgBoxOne" variant="danger"
                >Supprimer</b-button
              > -->
              <b-button @click="onSubmit(idx)" variant="success"
                >Modifier</b-button
              >
            </b-container>
            <!-- </b-form> -->
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <!-- DELETE USER MODAL -->
    <b-modal id="modalDeleteUser" centered hide-header hide-footer>
      <div class="d-block text-center">
        <p class="my-4">Supprimer {{ currentUser.name }} ?</p>
      </div>
      <b-container fluid class="p-2 d-flex justify-content-between">
        <b-button variant="success" @click="$bvModal.hide('modalDeleteUser')"
          >Annuler</b-button
        >
        <b-button
          variant="danger"
          @click="deleteUser(currentUser.id), $bvModal.hide('modalDeleteUser')"
          >Confirmer</b-button
        >
      </b-container>
    </b-modal>
  </b-container>
</template>

<script>
import AdminUser from '../apis/AdminUser.js';

export default {
  data() {
    return {
      users: [],
      currentUser: '',
      // form: {
      //   id: null,
      //   name: null,
      //   email: null,
      //   role: null,
      // },
      roles: ['user', 'admin'],
    };
  },
  mounted() {
    // ADMIN DISABLED IN users.controller -> MUST BE RE-ENABLED
    AdminUser.getUsers().then((response) => {
      this.users = response.data;
    });
  },

  methods: {
    async onSubmit(idx) {
      try {
        // {
        const updUser = await AdminUser.updateUser(this.users[idx]);
        // }
      } catch (err) {
        console.error('Error from onSubmit :', error);
      }
    },

    setCurrentUser(user) {
      this.currentUser = user;
    },

    async deleteUser(userId) {
      try {
        const delUser = await AdminUser.deleteUser(userId);
        let deletedUserIndex = await this.users.findIndex(
          (deleted) => deleted.id == userId
        );
        await this.users.splice(deletedUserIndex, 1);
      } catch (error) {
        console.error('Error from deleteUser :', error);
        // }
      }
    },
  },
};
</script>

<style></style>
