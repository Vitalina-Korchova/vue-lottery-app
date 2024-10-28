<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div id="navigation">
    <ul class="d-flex justify-content-between align-items-center">
      <li>
        <RouterLink id="nav-link" class="text-dark-emphasis px-3 fw-bolder" to="/">Home</RouterLink>
      </li>
      <li>
        <RouterLink id="nav-link" class="text-dark-emphasis px-3 fw-bolder" to="/about"
          >About</RouterLink
        >
      </li>
      <li>
        <RouterLink id="nav-link" class="text-dark-emphasis px-3 fw-bolder" to="/lottery"
          >Lottery</RouterLink
        >
      </li>
      <li>
        <RouterLink id="nav-link" class="text-dark-emphasis px-3 fw-bolder" to="/login"
          >Login</RouterLink
        >
      </li>
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
#nav-link {
  text-decoration: none;
}
#nav-link:hover {
  text-shadow: 2px 0px 4px rgba(159, 159, 159, 0.7);
}
</style>
