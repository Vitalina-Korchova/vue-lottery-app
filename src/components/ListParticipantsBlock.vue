<script setup lang="ts"></script>

<template>
  <div
    id="containerParticipants"
    class="d-flex flex-column py-5 px-4 mb-5 bg-white border border-light-subtle"
  >
    <div id="NamesElements" class="d-flex flex-row justify-content-between fs-5">
      <div id="Names">
        <span class="fw-bold">#</span>
        <span class="fw-bold mx-5">Name</span>
      </div>
      <div id="DateEmailPhone" class="d-flex flex-row">
        <span class="fw-bold mx-5">Date of Birth</span>
        <span class="fw-bold mx-5">Email</span>
        <span class="fw-bold mx-5">Phone number</span>
      </div>
    </div>
    <hr />
    <div id="ParticipantsInner"></div>
  </div>
</template>

<style scoped>
#DateEmailPhone {
  margin-left: 270px;
}
</style>
