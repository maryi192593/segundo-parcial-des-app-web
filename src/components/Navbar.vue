<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #185FA5;">
    <div class="container-fluid">
 
      <!-- Logo TechNova -->
      <router-link class="navbar-brand fw-bold" to="/dashboard">
        Tech<span style="color: #85B7EB;">Nova</span>
      </router-link>
 
      <!-- Botón hamburguesa para móvil -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
 
      <!-- Links de navegación -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/productos">Productos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/clientes">Clientes</router-link>
          </li>
        </ul>
 
        <!-- Usuario y cerrar sesión -->
        <div class="d-flex align-items-center gap-3">
          <span class="text-white-50" style="font-size: 13px;">Administrador</span>
          <router-link to="/login" class="btn btn-sm btn-outline-light">Salir</router-link>
        </div>
      </div>
 
    </div>
  </nav>
</template>
 
<script setup>
</script>