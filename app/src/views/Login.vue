<template>
  <div class="container mt-3">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header text-center">Connexion</div>
          <div class="card-body">
            <div class="form-group row">
              <label for="email" class="col-md-4 col-form-label text-md-right">Adresse e-mail</label>
              <div class="col-md-6">
                <input
                  id="email"
                  type="email"
                  v-model="form.username"
                  class="form-control"
                  required
                  autofocus
                />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div class="form-group row">
              <label for="password" class="col-md-4 col-form-label text-md-right">Mot de passe</label>
              <div class="col-md-6">
                <input
                  id="password"
                  type="password"
                  v-model="form.password"
                  class="form-control"
                  required
                />
                <span class="invalid-feedback" role="alert"></span>
              </div>
            </div>
            <div class="form-group row mb-0">
              <div class="col-md-8 offset-md-4">
                <button type="submit" @click.prevent="login" class="btn btn-primary">Se connecter</button>
              </div>
            </div>

            <div
              v-if="errors ==1"
              class="alert alert-danger mt-4"
              role="alert"
            >L'email ou le mot de passe est incorrect</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";

export default {
  data: () => ({
    errors: "",
    form: {
      username: "",
      password: "",
      device_name: "browser"
    }
  }),
  methods: {
    login() {
      User.login(this.form)
        .then(response => {
          this.$root.$emit("login", true);
          localStorage.setItem("token", response.data.access_token);
          this.$router.push({ name: "Home" });
        })
        .catch(error => {
          console.log(error);
          if (error.response.status) {
            this.errors = 1;
          }
        });
    }
  }
};
</script>
