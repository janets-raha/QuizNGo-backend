<template>
  <b-container class="pt-2 container mb-4">
    <div class="text-center mt-2">
      <h3>Prévisualisation du Quiz</h3>
    </div>
    <b-row no-gutters class=" justify-content-between mb-2" >
      <b-col md="4" class="pt-3 h5">
        <strong>
          {{ quiz.name }}
        </strong>
      </b-col>
      <b-col md="4" class="pt-3 h5 text-center">         
          Techno : {{ quiz.category.name }}         
      </b-col>        
      <b-col md="4" class="d-flex justify-content-end">          
        <b-icon v-if="quiz.difficulty === 'Facile'" icon="reception1" variant="success" class="mr-3 mb-3 h1"></b-icon>        
        <b-icon v-if="quiz.difficulty === 'Moyen'" icon="reception2" variant="warning" class="mr-3  mb-3 h1"></b-icon>        
        <b-icon v-if="quiz.difficulty === 'Difficile'" icon="reception3" variant="danger" class="mr-3 mt-1 mb-3 h1"></b-icon>           
        <div class="pt-3 h5 mb-0 mr-3">
          <b-icon icon="stopwatch" variant="primary" ></b-icon>{{ quiz.bonus_time}} min
        </div>
        <div class="pt-3 h5  mb-0">
            <b-icon icon="award" variant="primary"></b-icon>+ {{ quiz.bonus_xp}} pts
          </div>
      </b-col>
    </b-row>

    <div v-for="(question, q_index) in questions" :key="q_index" >
      <b-card no-body class="mb-1">
        <b-card-header class="p-0 bg-light">
          <div class="d-flex justify-content-between pt-2 pb-2 px-2">
            <h5 class="mb-0">Question {{ q_index + 1 }}</h5>
            <h5 class="text-nowrap mb-0">{{questions[q_index].xps}} points</h5>         
          </div>
        </b-card-header>
        <b-card-body class="h-100 overflow-auto">
          <strong>
            <div  class="my-2">{{ questions[q_index].question }} </div>
          </strong>
          <div v-for="(answer, a_index) in questions[q_index].answers"
            :key="a_index">
            <div class="d-flex justify-content-start ml-1 p-1">              
              <b-form-checkbox v-model="questions[q_index].answers[a_index].selectAnswer">
                {{questions[q_index].answers[a_index].answer}}
              </b-form-checkbox>              
            </div>
          </div>
        </b-card-body>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import AdminQuiz from "../apis/AdminQuiz";
export default {
  props: ["quiz", "questions"],
  data: () => {
    return {
      
    };
  },
  async mounted() {
    
  },
  methods: {
    
  },
};
</script>
