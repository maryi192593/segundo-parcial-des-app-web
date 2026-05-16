<template>
  <div>
 
    <!-- Encabezado con filtro activo -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h5 class="fw-bold mb-0">
          {{ filtroActivo ? filtroActivo : 'Todos los productos' }}
        </h5>
        <p class="text-muted mb-0" style="font-size: 13px;">
          {{ productosFiltrados.length }} productos encontrados
        </p>
      </div>
      <button v-if="filtroActivo" @click="limpiarFiltro" class="btn btn-sm btn-outline-secondary">
        Ver todos
      </button>
    </div>
 
    <!-- Alerta carrito -->
    <div v-if="alertaCarrito" class="alert alert-success alert-dismissible" role="alert">
      Producto agregado al carrito correctamente.
      <button type="button" class="btn-close" @click="alertaCarrito = false"></button>
    </div>
 
    <!-- Tarjetas de productos -->
    <div class="row g-3 mb-4">
      <div
        v-for="producto in productosFiltrados"
        :key="producto.id"
        class="col-6 col-md-4 col-lg-3"
      >
        <ProductCard
          :producto="producto"
          @agregar-carrito="agregarAlCarrito"
          @ver-detalles="verDetalles"
        />
      </div>
    </div>
 
    <!-- Sin resultados -->
    <div v-if="productosFiltrados.length === 0" class="text-center text-muted py-5">
      <p>No hay productos en esta categoria.</p>
      <button @click="limpiarFiltro" class="btn btn-primary btn-sm">Ver todos</button>
    </div>
 
    <!-- Modal ver detalles -->
    <div v-if="productoDetalle" class="modal-fondo" @click.self="productoDetalle = null">
      <div class="card shadow p-4" style="width: 380px;">
        <img
  :src="productoDetalle.imagen"
  :alt="productoDetalle.nombre"
  style="width: 100%; height: 180px; object-fit: contain; background: #f8f9fa; border-radius: 8px; margin-bottom: 16px;"
  @error="(e) => e.target.src = '/images/placeholder.png'"
/>
 
        <h5 class="fw-bold mb-3">{{ productoDetalle.nombre }}</h5>
        <span class="badge bg-primary mb-2" style="width: fit-content;">{{ productoDetalle.categoria }}</span>
        <p class="text-muted" style="font-size: 13px;">{{ productoDetalle.descripcion }}</p>
        <p class="fw-bold" style="font-size: 22px; color: #185FA5;">
          ${{ Number(productoDetalle.precio).toLocaleString('es-CO') }}
        </p>
        <span
          class="badge mb-3"
          :class="{
            'bg-success': productoDetalle.stock > 5,
            'bg-warning text-dark': productoDetalle.stock > 0 && productoDetalle.stock <= 5,
            'bg-danger': productoDetalle.stock === 0
          }"
          style="width: fit-content;"
        >
          {{ productoDetalle.stock === 0 ? 'Agotado' : 'Disponible' }}
        </span>
 
        <div class="d-flex gap-2 mt-2">
          <button
            @click="agregarAlCarrito(productoDetalle); productoDetalle = null"
            class="btn btn-primary flex-grow-1"
            :disabled="productoDetalle.stock === 0"
          >
            Agregar al carrito
          </button>
          <button @click="productoDetalle = null" class="btn btn-outline-secondary">
            Cerrar
          </button>
        </div>
 
      </div>
    </div>
 
  </div>
</template>
 
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import productosData from '../data/Product.json'
 
const productos       = ref([])
const productoDetalle = ref(null)
const alertaCarrito   = ref(false)
const filtroActivo    = ref('')
 
// Carga productos
function cargarProductos() {
  const guardados = localStorage.getItem('technova_productos')
  if (guardados) {
    productos.value = JSON.parse(guardados)
  } else {
    productos.value = productosData
    localStorage.setItem('technova_productos', JSON.stringify(productosData))
  }
}
 
// Lee el filtro guardado por el Sidebar o Dashboard
function cargarFiltro() {
  filtroActivo.value = localStorage.getItem('technova_filtro') || ''
}
 
function limpiarFiltro() {
  filtroActivo.value = ''
  localStorage.removeItem('technova_filtro')
}
 
// Filtra los productos según la categoría activa
const productosFiltrados = computed(() => {
  if (!filtroActivo.value) return productos.value
  return productos.value.filter(p => p.categoria === filtroActivo.value)
})
 
// Agrega al carrito en localStorage y dispara evento para actualizar Navbar
function agregarAlCarrito(producto) {
  const carrito = JSON.parse(localStorage.getItem('technova_carrito') || '[]')
  const existe  = carrito.find(p => p.id === producto.id)
  if (existe) {
    existe.cantidad++
  } else {
    carrito.push({ ...producto, cantidad: 1 })
  }
  localStorage.setItem('technova_carrito', JSON.stringify(carrito))
  window.dispatchEvent(new Event('carrito-actualizado'))
  alertaCarrito.value = true
  setTimeout(() => { alertaCarrito.value = false }, 3000)
}
 
function verDetalles(producto) {
  productoDetalle.value = producto
}
 
onMounted(() => {
  cargarProductos()

  // Si no viene de una categoría del dashboard, limpia el filtro anterior
  const vieneDeFiltro = localStorage.getItem('technova_desde_filtro')
  if (!vieneDeFiltro) {
    localStorage.removeItem('technova_filtro')
  }
  localStorage.removeItem('technova_desde_filtro')

  cargarFiltro()
  window.addEventListener('filtro-actualizado', cargarFiltro)
})
 
onUnmounted(() => {
  window.removeEventListener('filtro-actualizado', cargarFiltro)
})
</script>
 
<style scoped>
.modal-fondo {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>