<template>
  <footer class="py-4" style="background-color: #042C53;">
    <div class="container-fluid">
 
      <div class="row text-white mb-3">
 
        <!-- Columna 1: Logo y descripción -->
        <div class="col-md-4 mb-3">
          <h6 class="fw-bold">Tech<span style="color: #85B7EB;">Nova</span></h6>
          <p class="text-white-50" style="font-size: 12px;">
            Tu tienda de tecnologia de confianza. Laptops, smartphones, audio y mas.
          </p>
        </div>
 
        <!-- Columna 2: Links -->
        <div class="col-md-4 mb-3">
          <h6 class="fw-bold mb-2" style="font-size: 13px;">Enlaces</h6>
          <ul class="list-unstyled" style="font-size: 12px;">
            <li><router-link to="/dashboard/inicio" class="text-white-50 text-decoration-none">Inicio</router-link></li>
            <li><router-link to="/dashboard/productos" class="text-white-50 text-decoration-none">Productos</router-link></li>
            
          </ul>
        </div>
 
        <!-- Columna 3: Contacto -->
        <div class="col-md-4 mb-3">
          <h6 class="fw-bold mb-2" style="font-size: 13px;">Contacto</h6>
          <ul class="list-unstyled text-white-50" style="font-size: 12px;">
            <li>contacto@technova.com</li>
            <li>+57 300 123 4567</li>
            <li>ocaña, Colombia</li>
          </ul>
        </div>
 
      </div>
 
      <hr style="border-color: #1a3a5c;">
 
      <!-- Derechos reservados -->
      <div class="d-flex justify-content-between align-items-center">
        <span style="font-size: 12px; color: #4F7499;">
          &copy; {{ anio }} TechNova — Todos los derechos reservados.
        </span>
        <span class="badge" style="background-color: #185FA5; font-size: 11px;">
          Uso educativo
        </span>
      </div>
 
    </div>
  </footer>
</template>
 
<script setup>
import { ref } from 'vue'
const anio = ref(new Date().getFullYear())
</script>