<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink :to="{ name: 'search' }">About</RouterLink>
        <RouterLink :to="{ name: 'forecast' }">Forecast</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  position: fixed;
  top: 0; /* Add this to fix the header to the top */
  left: 0; /* Add this to align it to the left edge */
  width: 100%; /* Ensure it spans the full width */
  z-index: 1000; /* Ensure it stays above other content */
  background-color: white; /* Optional: Give it a background color */
  display: flex; /* Center content horizontally and vertically */
  justify-content: center; /* Vertically center items */
  padding-right: calc(var(--section-gap) / 2); /* Optional: maintain padding */
}
.wrapper {
  display: flex; /* Ensure flexbox applies to inner content */
  justify-content: center; /* Center the content inside the wrapper */
  align-items: center; /* Vertically align the items */
  flex-wrap: wrap; /* Ensure items wrap correctly */
  width: 100%; /* Make sure it spans the full width */
}

nav {
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
