<template>
  <footer class="py-3" style="background-color: #042C53;">
    <div class="container-fluid d-flex justify-content-between align-items-center">
 
      <!-- Derechos reservados -->
      <span style="font-size: 13px; color: #4F7499;">
        &copy; {{ anio }} Tech<span style="color: #85B7EB;">Nova</span> — Todos los derechos reservados.
      </span>
 
      <!-- Nota educativa -->
      <span class="badge" style="background-color: #185FA5; font-size: 11px;">
        Uso educativo
      </span>
 
    </div>
  </footer>
</template>
 
<script setup>
import { ref } from 'vue'
 
const anio = ref(new Date().getFullYear())
</script>