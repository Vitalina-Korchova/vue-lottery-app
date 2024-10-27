<script setup lang="ts"></script>

<template>
  <div id="navigation">
    <ul class="d-flex justify-content-between align-items-center">
      <li><a class="text-dark-emphasis px-3 fw-bolder" href="">Home</a></li>
      <li><a class="text-dark-emphasis px-3 fw-bolder" href="">About</a></li>
      <li><a class="text-dark-emphasis px-3 fw-bolder" href="">Lottery</a></li>
      <li><a class="text-dark-emphasis px-3 fw-bolder" href="">Login</a></li>
    </ul>
  </div>
</template>

<style scoped>
#navigation {
  font-size: 20px;
}
ul {
  list-style-type: none;
  margin: auto;
}
a {
  text-decoration: none;
}
a:hover {
  text-shadow: 2px 0px 4px rgba(159, 159, 159, 0.7);
}
</style>
