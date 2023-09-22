<template>
  <div class="create-wrapper">
    <h2>Create Todos</h2>
    <p v-if="error" class="error">Error</p>
    <div class="create-form">
      <div class="input-field">
        <InputField
          placeholder="Title"
          :validate-regex="/^[A-Za-z]+$/"
          v-model="title"
        />
      </div>
      <div class="input-field">
        <InputField
          placeholder="User ID"
          :validate-regex="/^[^a-zA-Z]*$/"
          v-model="userId"
        />
      </div>
      <button class="create-button" @click="createTodos">
        {{ submitText }}
      </button>
    </div>
    <p v-if="succes" class="succes">Succes</p>
  </div>
</template>

<script>
import InputField from "./InputField.vue";

export default {
  components: { InputField },
  props: {
    submitText: {
      type: String,
      default: "Create",
    },
  },
  data() {
    return {
      title: "",
      userId: "",
      error: false,
      succes: false,
    };
  },
  methods: {
    createTodos() {
      if (this.title && this.userId) {
        this.error = false;
        this.$emit("create", {
          title: this.title,
          userId: this.userId,
          completed: true,
          favorite: false,
        });
        this.succes = true;
        setTimeout(() => {
          this.succes = false;
        }, 5000);
      } else {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.create-wrapper {
  position: relative;
  h2 {
    text-align: center;
  }
}
.error,
.succes {
  text-align: center;
  font-size: 25px;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateY(-50%);
}
.error {
  color: rgb(116, 16, 16);
}
.succes {
  color: #519945;
}
.create-form {
  padding: 20px;
  display: flex;
  justify-content: space-around;

  .input-field {
    width: 30%;

    .form-input {
      margin-bottom: 0px;
    }
  }

  .create-button {
    color: #ffffff;
    background-color: #519945;
    width: 100%;
    height: 41px;
    border: none;
    border-radius: 5px;
    transition: all 0.4s;
    width: 20%;
    margin: 0 10px;

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
