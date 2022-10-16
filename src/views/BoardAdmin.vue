<template>
  <!-- <div class="container">
    <header class="jumbotron">
      <h3><iframe src="https://calendar.google.com/calendar/embed?src=...." style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe></h3>
    </header>
  </div> -->
<el-calendar v-model="value">
</el-calendar>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'AdminVue',
  data() {
    return {
      content: '',
      value: new Date()
    };
  },
  mounted() {
    UserService.getAdminBoard().then(
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
