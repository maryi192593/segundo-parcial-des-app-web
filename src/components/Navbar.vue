<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #185FA5;">
    <div class="container-fluid">
 
      <!-- Logo -->
      <router-link class="navbar-brand fw-bold" to="/dashboard">
        Tech<span style="color: #85B7EB;">Nova</span>
      </router-link>
 
      <!-- Botón hamburguesa móvil -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
 
      <div class="collapse navbar-collapse" id="navbarNav">
 
        <!-- Links -->
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/productos">Productos</router-link>
          </li>
        </ul>
 
        <!-- Carrito desplegable -->
        <div class="d-flex align-items-center gap-2 position-relative">
 
          <!-- Botón carrito -->
          <button
            @click="toggleCarrito"
            class="btn btn-sm btn-outline-light position-relative"
          >
            Carrito
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ totalItems }}
            </span>
          </button>
 
          <!-- Dropdown del carrito -->
          <div v-if="carritoAbierto" class="carrito-dropdown shadow">
 
            <div class="carrito-header">
              <span class="fw-bold" style="font-size:14px;">Mi carrito</span>
              <button @click="toggleCarrito" class="btn-close btn-close-white btn-sm"></button>
            </div>
 
            <!-- Sin productos -->
            <div v-if="carrito.length === 0" class="text-center text-muted py-3" style="font-size:13px;">
              Tu carrito está vacío
            </div>
 
            <!-- Lista de productos -->
            <div v-for="item in carrito" :key="item.id" class="carrito-item">
              <div class="carrito-info">
                <p class="mb-0 fw-bold" style="font-size:12px;">{{ item.nombre }}</p>
                <p class="mb-0 text-primary" style="font-size:12px;">
                  ${{ Number(item.precio).toLocaleString('es-CO') }} x {{ item.cantidad }}
                </p>
              </div>
              <button @click="eliminarItem(item.id)" class="btn btn-sm btn-outline-danger">
                X
              </button>
            </div>
 
            <!-- Total -->
            <div v-if="carrito.length > 0" class="carrito-total">
              <span class="text-muted" style="font-size:13px;">Total:</span>
              <span class="fw-bold" style="font-size:15px;">
                ${{ totalPrecio.toLocaleString('es-CO') }}
              </span>
            </div>
 
            <!-- Botón vaciar -->
            <div v-if="carrito.length > 0" class="p-2">
              <button @click="vaciarCarrito" class="btn btn-danger btn-sm w-100">
                Vaciar carrito
              </button>
            </div>
 
          </div>
 
          <!-- Mi cuenta -->
          <router-link to="/login" class="btn btn-sm btn-light fw-bold" style="color: #185FA5;">
            Mi cuenta
          </router-link>
 
        </div>
      </div>
    </div>
  </nav>
</template>
 
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
 
const carritoAbierto = ref(false)
const carrito        = ref([])
 
function cargarCarrito() {
  carrito.value = JSON.parse(localStorage.getItem('technova_carrito') || '[]')
}
 
function toggleCarrito() {
  carritoAbierto.value = !carritoAbierto.value
  cargarCarrito()
}
 
function eliminarItem(id) {
  carrito.value = carrito.value.filter(i => i.id !== id)
  localStorage.setItem('technova_carrito', JSON.stringify(carrito.value))
}
 
function vaciarCarrito() {
  carrito.value = []
  localStorage.setItem('technova_carrito', JSON.stringify([]))
}
 
const totalItems = computed(() =>
  carrito.value.reduce((t, i) => t + i.cantidad, 0)
)
 
const totalPrecio = computed(() =>
  carrito.value.reduce((t, i) => t + i.precio * i.cantidad, 0)
)
 
function sincronizar() { cargarCarrito() }
 
onMounted(() => {
  cargarCarrito()
  window.addEventListener('carrito-actualizado', sincronizar)
})
 
onUnmounted(() => {
  window.removeEventListener('carrito-actualizado', sincronizar)
})
</script>
 
<style scoped>
.carrito-dropdown {
  position: absolute;
  top: 45px;
  right: 0;
  width: 300px;
  background: white;
  border-radius: 8px;
  z-index: 9999;
  overflow: hidden;
}
.carrito-header {
  background: #185FA5;
  color: white;
  padding: 10px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.carrito-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  border-bottom: 1px solid #f0f0f0;
}
.carrito-info { flex: 1; margin-right: 10px; }
.carrito-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
}
</style>