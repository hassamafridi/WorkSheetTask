<template>
  <div>
    <button class="button add" @click="showAddInput = true" v-if="!showAddInput">Add Option</button>
    <div v-if="showAddInput" class="container">
      <input type="text" v-model="newOption" v-on:keyup.enter="addOption" placeholder="Enter option" />
      <!-- <button class="button" >Add</button> -->
    </div>
    <div v-for="(option, index) in options" :key="index">
      <span class="container">
        <input
          type="text"
          v-model="options[index].option"
          placeholder="Enter an option"
        />
        <input
          type="checkbox"
          v-model="options[index].correct"
          @change="handleCheckboxChange(index)"
        />
        <i
          class="far fa-trash-alt"
          style="color: red; cursor: pointer"
          @click="removeOption(index)"
          aria-hidden="true"
        ></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex"

export default {
  data() {
    return {
      showAddInput: false,
      newOption: "",
      options: [],
    }
  },
  methods: {
    ...mapMutations(["addOption", "removeOption"]),
    addOption() {
      if (this.newOption) {
        const option = { option: this.newOption, correct: false }
        this.options.push(option)
        this.$emit("new-option", this.options)
        this.newOption = ""
        this.showAddInput = false; // Hide the input after adding an option
      }
    },
    removeOption(index) {
      this.options.splice(index, 1)
    },
    handleCheckboxChange(checkedIndex) {
      // Uncheck all other checkboxes
      this.options.forEach((option, index) => {
        if (index !== checkedIndex) {
          option.correct = false;
        }
      });
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
}
input[type="text"] {
  width: 40%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}

.button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.add {
  background-color: white;
  color: black;
  border: 2px solid #4caf50;
}
</style>
