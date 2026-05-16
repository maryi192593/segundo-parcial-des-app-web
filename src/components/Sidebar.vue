<template>
  <div
    class="d-flex flex-column p-3"
    style="width: 220px; min-height: 100vh; background-color: #042C53;"
  >
    <!-- Sección principal -->
    <p class="text-uppercase mb-1" style="font-size: 10px; color: #4F7499; letter-spacing: 0.08em;">
      Principal
    </p>
 
    <ul class="nav nav-pills flex-column mb-3">
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link text-white">
          Dashboard
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard/productos" class="nav-link text-white d-flex justify-content-between">
          Productos
          <span class="badge bg-primary">10</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard/clientes" class="nav-link text-white">
          Clientes
        </router-link>
      </li>
    </ul>
 
    <hr style="border-color: #1a3a5c;">
 
    <!-- Sección gestión -->
    <p class="text-uppercase mb-1" style="font-size: 10px; color: #4F7499; letter-spacing: 0.08em;">
      Gestion
    </p>
 
    <ul class="nav nav-pills flex-column">
      <li class="nav-item">
        <router-link to="/dashboard/reportes" class="nav-link text-white">
          Reportes
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard/pedidos" class="nav-link text-white">
          Pedidos
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard/configuracion" class="nav-link text-white">
          Configuracion
        </router-link>
      </li>
    </ul>
 
  </div>
</template>
 
<script setup>
</script>
 
<style scoped>
.router-link-active {
  background-color: rgba(55, 138, 221, 0.2) !important;
  border-left: 3px solid #378ADD;
  color: #85B7EB !important;
}
</style>     