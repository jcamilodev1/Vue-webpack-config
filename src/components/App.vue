<template>
  <!--   TEMPLATE HTML   -->
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  data() {
    return {
      title: "Bienvenidos a Vue con webpack",
    };
  },
};
</script>
<style>
h1 {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>
