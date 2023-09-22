<template>
  <div>
    <div class="user" v-if="currentUser">
      <div class="block">
        <p>User ID: {{ currentUser.id }}</p>
        <p>Name: {{ currentUser.name }}</p>
        <p>Email: {{ currentUser.email }}</p>
      </div>
      <div class="block">
        <p>UserName: {{ currentUser.userName }}</p>
        <p>Phone: {{ currentUser.name }}</p>
        <p>Website: {{ currentUser.email }}</p>
      </div>
    </div>
    <div class="filters">
      <filter-users
        :index="4"
        filter-type="userId"
        @filter="setFilter"
        :items="allTodos"
      />
      <InputField
        :filter="true"
        :validate-regex="/^[A-Za-z]+$/"
        v-model="textFilter"
        placeholder="search"
      />
      <filter-users
        @filter="setFilter"
        filter-type="completed"
        :items="allTodos"
      />
    </div>
    <create-todo @create="createTodo" />
    <ul class="list">
      <li v-for="todo in filteredTodos" class="list__item" :key="todo.id">
        <button @click="likeItem(todo)" class="like">
          {{ todo.favorite ? "UnLike" : "Like" }}
        </button>
        <p>User Id: {{ todo.userId }}</p>
        <p v-if="todo.id">Post Id: {{ todo.id }}</p>
        <p>Title: {{ todo.title }}</p>
        <p>Comleted: {{ todo.completed ? "YES" : "NO" }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CreateTodo from "./CreateTodo.vue";
import FilterUsers from "./FilterUsers.vue";
import InputField from "./InputField.vue";

const STATUS_FILTER = "completed",
  USER_ID_FILTER = "userId";

export default {
  components: { FilterUsers, InputField, CreateTodo },
  name: "ListPage",
  data() {
    return {
      statusFilter: [],
      userFilter: [],
      textFilter: "",
      filterEnable: false,
      todos: this.allTodos,
    };
  },
  computed: {
    ...mapGetters(["allTodos", "currentUser"]),
    filteredTodos() {
      let filteredList = this.allTodos;
      if (Object.keys(this.userFilter).length > 0) {
        filteredList = filteredList.filter(
          (todos) => todos.userId === this.userFilter.val
        );
      }
      if (Object.keys(this.statusFilter).length > 0) {
        if (this.statusFilter.val !== "Favorites") {
          const value = this.statusFilter.val === "Yes" ? true : false;
          filteredList = filteredList.filter(
            (todos) => todos.completed === value
          );
        } else {
          filteredList = filteredList.filter(
            (todos) => todos.favorite === true
          );
        }
      }
      if (this.textFilter) {
        filteredList = filteredList.filter((item) => {
          return item.title
            .toLowerCase()
            .includes(this.textFilter.toLowerCase());
        });
      }
      return filteredList;
    },
  },
  methods: {
    ...mapActions(["fetchTodos", "updateAllTodos"]),
    createTodo(item) {
      this.allTodos.unshift(item);
    },
    likeItem(todo) {
      todo.favorite = !todo.favorite;
      this.$store.commit("updateAllTodos", this.allTodos);
    },
    setFilter(filter) {
      if (filter.type === STATUS_FILTER) {
        this.statusFilter = filter.val ? filter : [];
      }
      if (filter.type === USER_ID_FILTER) {
        this.userFilter = filter.val ? filter : [];
      }
    },
  },
  created() {
    if (!this.currentUser) {
      this.$router.push("/");
    } else {
      this.fetchTodos();

      const localTodosJSON = localStorage.getItem("allTodos");
      const localTodos = localTodosJSON ? JSON.parse(localTodosJSON) : [];
      if (
        JSON.stringify(this.allTodos) !== JSON.stringify(localTodos) &&
        localTodos.length > 0
      ) {
        this.$store.commit("updateAllTodos", localTodos);
      }
    }
  },
};
</script>

<style scoped lang="scss">
.user {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  p {
    margin: 5px;
  }
}

.filters {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  margin: 0;

  &__item {
    background-color: #645d5d;
    border: 1px solid #000000;
    list-style: none;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0px 0px 10px -5px #ffffff;
    margin-bottom: 10px;
    position: relative;

    .like {
      padding: 5px;
      background-color: rgb(64, 64, 167);
      position: absolute;
      top: 10px;
      right: 10px;
      border: none;
      color: white;
      border-radius: 5px;
      transition: all 0.5s;

      &:hover {
        transition: all 0.5s;
        cursor: pointer;
        background-color: rgb(99, 99, 225);
      }
    }
  }
}

@media (max-width: 769px) {
  .filters {
    display: block;
    .filter,
    .filter-input {
      margin: auto;
      margin-bottom: 10px;
    }
  }

  .user {
    display: block;
  }
}
</style>
