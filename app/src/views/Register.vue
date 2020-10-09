<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="text-center">
          <h4 class>Enregistrer un compte</h4>
          <div class="py-4">
            <div class="form-group row">
              <label for="name" class="col-md-4 col-form-label text-md-right">Nom</label>
              <div class="col-md-6">
                <input
                  v-model="form.name"
                  id="name"
                  type="text"
                  class="form-control"
                  required
                  autofocus
                  placeholder="Entrez un nom..."
                />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div class="form-group row">
              <label for="email" class="col-md-4 col-form-label text-md-right">Adresse E-mail</label>
              <div class="col-md-6">
                <input
                  v-model="form.email"
                  id="email"
                  type="email"
                  class="form-control"
                  required
                  placeholder="utilisateur@exemple.fr"
                />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div class="form-group row">
              <label for="pass1" class="col-md-4 col-form-label text-md-right">Mot de passe</label>
              <div class="col-md-6">
                <input
                  v-model="form.password"
                  id="pass1"
                  type="password"
                  class="form-control"
                  required
                />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div class="form-group row">
              <label
                for="pass2"
                class="col-md-4 col-form-label text-md-right"
              >Confirmer le mot de passe</label>
              <div class="col-md-6">
                <input
                  v-model="form.password2"
                  id="pass2"
                  type="password"
                  class="form-control"
                  required
                />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <button
              type="submit"
              @click.prevent="register"
              class="btn btn-primary my-4"
            >Créer un compte</button>
          </div>
          <div
            v-if="errors ==1"
            class="alert alert-danger mt-2"
            role="alert"
          >Tous les champs doivent être remplis</div>
        </div>
        <div
          v-if="errors ==2"
          class="alert alert-danger mt-2"
          role="alert"
        >Cet email existe déjà, veuillez en entrer un nouveau</div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";

export default {
  data: () => ({
    errors: "",
    error_message: "",
    form: {
      name: "",
      email: "",
      password: "",
      password2: ""
    }
  }),
  methods: {
    register() {
      if (
        this.form.name &&
        this.form.email &&
        this.form.password &&
        this.form.password2
      ) {
        if (this.form.password == this.form.password2) {
          // const bcrypt = require("bcrypt"); //
          // const hashedPwd = bcrypt.hash(password, 10); //
          // this.form.password = hashedPwd; //
          User.register(this.form)
            .then(() => {
              this.$router.push({ name: "Login" });
            })
            .catch(error => {
              this.errors = 2;

              this.error_message = error.response;
            });
        }
      } else {
        this.errors = 1;
      }
    }
  }
};
</script>