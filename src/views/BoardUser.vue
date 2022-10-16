<template>
  <!-- <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
  </div> -->
  <el-calendar v-model="value">
</el-calendar>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'UserVue',
  data() {
    return {
      content: '',
       value: new Date()
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>