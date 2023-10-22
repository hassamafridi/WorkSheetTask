<template>
  <div class="worksheet-form">
    <h3 style="color: white;">Worksheet Question</h3>
    <textarea v-model="question" placeholder="Enter your question"></textarea>
    <Form @new-option="handleNewOption" :option="options"></Form>
    <div class="button-container">
      <button @click="saveWorksheetAction" class="button primary">Save Worksheet</button>
    </div>
    <div class="error-message-container" v-if="error" @transitionend="clearError">
      <div class="error-message">{{ error }}</div>
    </div>
    <div class="error-message-container" v-if="successMessage" @transitionend="clearError">
    <div  class="notification success">{{ successMessage }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import Form from "../components/FormComponent.vue"

export default {
  name: "worksheet-form",
  components: {
    Form,
  },
  data() {
    return {
      question: "",
      options: [],
      error: null,
      successMessage: null,
    }
  },
  computed: {
    ...mapState(["successMessage", "errorMessage"]),
    atLeastOneCorrect() {
      return this.options.some((option) => option.correct)
    },
  },
  methods: {
    ...mapActions(["saveWorksheet"]),

    async saveWorksheetAction() {
  if (this.question && this.options.length >= 2 && this.atLeastOneCorrect) {
    const questionData = {
      question: this.question,
      options: this.options,
    };
    this.$emit("new-question", questionData);
    await this.saveWorksheet(questionData);
    this.question = '';
    this.options = [];
    this.successMessage = "Successfully added question";
    this.clearSuccessMessageAfterDelay(); 
    this.clearErrorAfterDelay();
  } else if (!this.question) {
    this.error = "Please enter your question.";
    this.clearErrorAfterDelay();
  } else if (this.options.length < 2) {
    this.error = "Please add at least two options.";
    this.clearErrorAfterDelay();
  } else if (!this.atLeastOneCorrect) {
    this.error = "Please mark at least one option as correct.";
    this.clearErrorAfterDelay();
  }
},
    handleNewOption(newOptions) {
      this.options = newOptions;
    },
    clearErrorAfterDelay() {
      setTimeout(() => {
        this.error = null;
      }, 2000); // Adjust the time delay as needed
    },
    clearError() {
      this.error = null;
    },
    clearSuccessMessage() {
    this.successMessage = null;
  },
  clearSuccessMessageAfterDelay() {
  setTimeout(() => {
    this.successMessage = null;
  }, 2000); // Adjust the time delay as needed
},
  },
}
</script>

<style scoped>
.worksheet-form {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 40%;
    padding: 20px;
    border-radius: 68px;
    background-color: black;
    height: fit-content;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
  margin-bottom: 10px;
}

.button-container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.notification {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}

.success {
  background-color: green;
  color: white;
  text-align: center;
  border: 2px solid;
padding: 10px;
}
.error-message-container {
  transition: all 0.5s ease;
  display: flex;
  justify-content: center;
}

.error-message {
  border: 2px solid;
  color: #f44336;
  margin-top: 10px;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
}
.error {
  background-color: red;
  color: white;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.button.primary {
  background-color: #4caf50;
  color: white;
  margin-left: 10px;
}

.error-message {
  border: 2px solid;
    color: #f44336;
    margin-top: 10px;
    padding: 10px;
    text-align: center;
}
</style>