<template>
  <div class="form-input" :class="{ 'filter-input': filter }">
    <p class="error-text" v-if="!isValid">{{ "*" + errorMsg }}</p>
    <input
      @input="validate"
      v-model="textStr"
      pattern="[A-Za-z]+"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    validateRegex: {
      type: RegExp,
    },
    placeholder: {
      type: String,
    },
    filter: {
      type: Boolean,
      default: false,
    },
    errorMsg: {
      type: String,
      default: "Error",
    },
  },
  data() {
    return {
      textStr: null,
      isValid: true,
    };
  },
  methods: {
    validate() {
      const str = this.textStr;
      const regex = this.validateRegex;
      const isValid = regex.test(str);
      if (isValid || str.length === 0) {
        this.isValid = true;
        this.$emit("input", str);
      } else {
        this.isValid = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.form-input {
  width: 100%;
  margin-bottom: 10px;
  position: relative;

  &.filter-input {
    width: 200px;
    transition: all 0.5s;
    &:hover {
      width: 240px;
      transition: all 0.5s;
    }

    input {
      border-radius: 25px;
    }
  }

  .error-text {
    color: rgb(116, 16, 16);
    font-size: 14px;
    margin: 0;
    position: absolute;
    top: -20px;
  }

  input {
    width: calc(100% - 20px);
    height: 21px;
    border-radius: 5px;
    padding: 10px;
    border: none;

    &:focus-visible {
      outline: none;
    }

    &::placeholder {
      color: #000000;
    }
  }
}
</style>
