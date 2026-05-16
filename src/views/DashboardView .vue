<template>
  <div class="d-flex flex-column min-vh-100">
 
    <!-- Navbar superior reutilizable -->
    <NavbarComponent />
 
    <!-- Contenido: sidebar + vista hija -->
    <div class="d-flex flex-grow-1">
 
      <!-- Sidebar lateral reutilizable -->
      <SidebarComponent />
 
      <!-- Área principal donde se renderizan las vistas hijas -->
      <div class="flex-grow-1 p-4" style="background-color: #f0f4f8;">
 
        <!-- Tarjetas de resumen -->
        <div class="row g-3 mb-4">
          <div class="col-6 col-md-3">
            <div class="card shadow-sm text-center p-3">
              <p class="text-muted mb-1" style="font-size: 12px;">Productos</p>
              <h4 class="fw-bold text-primary mb-0">10</h4>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="card shadow-sm text-center p-3">
              <p class="text-muted mb-1" style="font-size: 12px;">Clientes</p>
              <h4 class="fw-bold text-success mb-0">248</h4>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="card shadow-sm text-center p-3">
              <p class="text-muted mb-1" style="font-size: 12px;">Ventas</p>
              <h4 class="fw-bold text-warning mb-0">$8.4M</h4>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="card shadow-sm text-center p-3">
              <p class="text-muted mb-1" style="font-size: 12px;">Stock bajo</p>
              <h4 class="fw-bold text-danger mb-0">3</h4>
            </div>
          </div>
        </div>
 
        <!-- Aquí se renderizan las vistas hijas (Productos, Clientes, etc.) -->
        <router-view />
 
      </div>
    </div>
 
    <!-- Footer reutilizable -->
    <FooterComponent />
 
  </div>
</template>
 
<script setup>
import NavbarComponent from '../components/NavbarComponent.vue'
import SidebarComponent from '../components/SidebarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
</script>