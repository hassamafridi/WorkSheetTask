<template>
  <div class="worksheet-list">
    <h1 class="worksheet-list-title">Worksheet List</h1>
    <div v-for="worksheet in worksheets" :key="worksheet._id" class="worksheet-item">
      <div class="worksheet-question">
        <strong>Question:</strong> {{ worksheet.question }}
      </div>
      <div class="worksheet-answers">
        <strong>Answers:</strong>
        <ul class="options-list">
          <li v-for="(option, index) in worksheet.options" :key="index">
            <div class="option">
              <span>{{ option.option }}</span>
              <span class="answer-label" :class="{ correct: option.correct }">
                {{ option.correct ? "Correct" : "" }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  props: ["newquestion"],
  data() {},
  watch: {
    newquestion(newVal) {
      if (newVal) {
        const newWorksheet = {
          _id: "your_unique_id",
          question: newVal.question,
          options: newVal.options,
        };
        this.worksheets.push(newWorksheet);
      }
    },
  },
  computed: {
    ...mapState(["worksheets"]),
  },
  created() {
    this.fetchWorksheetsAction()
  },
  methods: {
    ...mapActions(["fetchWorksheets"]),
    async fetchWorksheetsAction() {
      this.fetchWorksheets()
    },
  },
}
</script>

<style scoped>
.worksheet-list {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  padding: 20px;
  border-radius: 65px;
  background-color: black;
}

.worksheet-list-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: white;
}

.worksheet-item {
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  padding: 10px;
  background-color: transparent;
}

.worksheet-question {
  font-weight: bold;
  color: white;
}

.worksheet-answers {
  margin-top: 10px;
  color: white;
}

.options-list {
  list-style: none;
  padding: 0;
}

.option {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
  background-color: transparent;
}

.answer-label {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.correct {
  background-color: #4caf50;
  color: white;
}

.incorrect {
  background-color: #f44336;
  color: white;
}
</style>