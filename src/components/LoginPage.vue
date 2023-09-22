<template>
  <div class="wrapper">
    <div class="form">
      <div class="form__title">Description</div>
      <div class="form__body">
        <p class="form__label">description</p>
        <div class="form__group">
          <InputField
            :validate-regex="/^[A-Za-z]+$/"
            v-model="userName"
            placeholder="Username"
          />
          <InputField
            :validate-regex="/^[^a-zA-Z]*$/"
            v-model="phoneNumber"
            placeholder="Phone Number"
          />
        </div>
        <button @click="validateUser" class="form__button">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import InputField from "./InputField.vue";
import { mapActions } from "vuex";

export default {
  name: "LoginPage",
  components: { InputField },
  props: {
    msg: String,
  },
  data() {
    return {
      userName: "",
      phoneNumber: "",
    };
  },
  methods: {
    ...mapActions(["setCurrentUser"]),
    async validateUser() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await response.json();
      const user = users.find(
        (user) =>
          user.username === this.userName && user.phone === this.phoneNumber
      );
      this.setCurrentUser(user);

      if (user) {
        this.$router.push("/list");
      } else {
        alert("Login error");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  min-height: calc(100vh - 330px);
}
.form {
  width: 447px;
  height: 299px;
  font-size: 17px;
  margin: auto;

  &__title {
    padding: 15px 0;
    text-align: center;
    color: #5f5f5f;
    background-color: #a5a5a5;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &__body {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: block;
    background-color: #c3c3c3;
    padding: 10px 15px 20px;
  }

  &__label {
    margin: 0;
    font-size: 15px;
    color: #5f5f5f;
    margin-bottom: 10px;
  }

  &__button {
    color: #ffffff;
    background-color: #519945;
    width: 100%;
    height: 41px;
    border: none;
    border-radius: 5px;
    transition: all 0.4s;

    &:hover {
      cursor: pointer;
      background-color: #194e0f;
    }

    &:active {
      background-color: #5f5f5f;
      transition: all 0.4s;
    }
  }
}
</style>
