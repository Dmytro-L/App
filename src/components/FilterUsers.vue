<template>
  <div class="filter">
    <div
      class="filter__trigger"
      :style="{
        zIndex: this.index,
      }"
      ref="filterTrigger"
      @click="toggleFilter"
    >
      <p>{{ selected ? selected : defaultValue }}</p>
    </div>
    <div
      :style="{
        zIndex: this.index - 1,
      }"
      class="filter__body"
      ref="filterBody"
      v-if="activeFilter"
    >
      <ul>
        <li @click="setFilter(null)">
          <p class="item">
            {{ selectAll }}
          </p>
        </li>
        <li
          v-for="item in filteredItems"
          :key="item.id"
          @click="setFilter(item.userId || item.status)"
        >
          <p class="item">
            {{ item.userId ? item.userId : item.status }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FilterUsers",
  props: {
    filterType: {
      type: String,
      required: true,
    },
    items: Array,
    defaultValue: {
      type: String,
      default: "Chose",
    },
    selectAll: {
      type: String,
      default: "All",
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      selected: null,
      listItems: null,
      activeFilter: false,
    };
  },
  mounted() {
    document.addEventListener("click", this.handleDocumentClick);
  },
  destroyed() {
    document.removeEventListener("click", this.handleDocumentClick);
  },
  computed: {
    filteredItems() {
      const type = this.filterType;
      let unique = new Set();
      let filteredArray = [];
      if (type == "userId") {
        filteredArray = this.items.filter(function (obj) {
          if (!unique.has(obj.userId)) {
            unique.add(obj.userId);
            return true;
          }
          return false;
        });
      } else {
        filteredArray = [
          {
            status: "Yes",
          },
          {
            status: "NO",
          },
          {
            status: "Favorites",
          },
        ];
      }
      return filteredArray;
    },
  },
  methods: {
    ...mapActions(["setCurrentUser"]),
    setFilter(id) {
      this.selected = id;
      this.$emit("filter", { val: id, type: this.filterType });
    },
    toggleFilter() {
      this.activeFilter = !this.activeFilter;
    },
    handleDocumentClick(event) {
      if (
        this.$refs.filterTrigger &&
        !this.$refs.filterTrigger.contains(event.target) &&
        this.$refs.filterBody &&
        !this.$refs.filterBody.contains(event.target)
      ) {
        this.activeFilter = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.filter {
  width: 150px;
  position: relative;

  &__trigger {
    height: 40px;
    width: inherit;
    border: 1px solid #000000;
    border-radius: 25px;
    display: flex;
    background-color: #818181;
    transition: all 0.5s;
    position: relative;
    z-index: 2;

    p {
      margin: auto;
    }

    &:hover {
      background-color: #cbcaca;
      transition: all 0.5s;
      cursor: pointer;
    }
  }

  &__body {
    position: absolute;
    top: 20px;
    z-index: 1;
    width: 152px;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      padding-top: 20px;
      border: 1px solid #000000;
      border-radius: 0 0 25px 25px;
      background-color: #818181;
    }
    li {
      display: flex;
      &:hover {
        background-color: #cbcaca;
        transition: all 0.5s;
        cursor: pointer;
      }

      &:nth-last-child(1) {
        border-radius: 0 0 25px 25px;
      }

      &:active {
        background-color: #946b6b;
        transition: all 0.5s;
      }
    }

    li p {
      margin: auto;
      padding: 5px 5px;
    }
  }
}
</style>
