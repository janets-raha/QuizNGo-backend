<template>
  <div>
    <div class="container px-0 py-4">
      <nav class="nav nav-pills flex-column flex-sm-row nav-justified">
        <router-link :to="{ path: '/dashboard' }" 
        class="flex-sm-fill text-center nav-link"
        >My Dashboard</router-link>
        <router-link
          :to="{ name: 'Profile' }"
          class="flex-sm-fill text-center nav-link"
        >Profile</router-link>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>
