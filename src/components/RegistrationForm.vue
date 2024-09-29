<script setup lang="ts"></script>

<template>
  <div id="containerRegisterForm" class="py-3 px-3 bg-white border border-light-subtle">
    <form class="d-flex flex-column gap-2">
      <span class="fw-bold">REGISTER FORM</span>
      <span class="text-black-50 bg-white fs-6 pb-3">Please fill in all the fields.</span>
      <label for="" class="fw-bold">Name</label>
      <input type="text" name="" id="name" placeholder="Enter user name" class="form-control" />
      <label for="" class="fw-bold">Date of Birth</label>
      <input type="date" name="" id="dateBirth" class="form-control" />
      <label for="" class="fw-bold">Email</label>
      <input id="email" type="email" class="form-control" placeholder="Enter email" />
      <label for="" class="fw-bold">Phone Number</label>
      <input
        id="phoneNumber"
        type="phone-number"
        class="form-control"
        placeholder="Enter phone number"
      />
      <button id="btnSave" type="button" class="mt-4 btn btn-primary align-self-end">Save</button>
    </form>
  </div>
</template>

<style scoped>
#btnSave {
  width: 80px;
}
</style>
