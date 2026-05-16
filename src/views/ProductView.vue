<template>
  <div>
 
    <!-- Encabezado y botón agregar -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="fw-bold mb-0">Gestion de Productos</h5>
      <button @click="abrirModal()" class="btn btn-primary">
        + Agregar producto
      </button>
    </div>
 
    <!-- Tabla Bootstrap estilizada -->
    <div class="card shadow-sm mb-4">
      <div class="card-body p-0">
        <table class="table table-hover mb-0">
          <thead class="table-light">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="productos.length === 0">
              <td colspan="6" class="text-center text-muted py-4">
                No hay productos. Agrega uno con el boton de arriba.
              </td>
            </tr>
            <tr v-for="(producto, index) in productos" :key="producto.id">
              <td>{{ index + 1 }}</td>
              <td class="fw-bold">{{ producto.nombre }}</td>
              <td>{{ producto.categoria }}</td>
              <td>${{ Number(producto.precio).toLocaleString('es-CO') }}</td>
              <td>
                <span
                  class="badge"
                  :class="{
                    'bg-success': producto.stock > 5,
                    'bg-warning text-dark': producto.stock > 0 && producto.stock <= 5,
                    'bg-danger': producto.stock === 0
                  }"
                >
                  {{ producto.stock === 0 ? 'Agotado' : producto.stock + ' en stock' }}
                </span>
              </td>
              <td>
                <button @click="abrirModal(producto)" class="btn btn-sm btn-outline-primary me-1">
                  Editar
                </button>
                <button @click="verDetalles(producto)" class="btn btn-sm btn-outline-secondary me-1">
                  Ver
                </button>
                <button @click="eliminarProducto(producto.id)" class="btn btn-sm btn-outline-danger">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
 
    <!-- Vista en tarjetas con ProductCardComponent -->
    <h6 class="fw-bold mb-3">Vista en tarjetas</h6>
    <div class="row g-3 mb-4">
      <div
        v-for="producto in productos"
        :key="'card-' + producto.id"
        class="col-6 col-md-4 col-lg-3"
      >
        <ProductCardComponent
          :producto="producto"
          @ver-detalles="verDetalles"
        />
      </div>
    </div>
 
    <!-- Modal agregar / editar -->
    <div v-if="modalVisible" class="modal-fondo" @click.self="cerrarModal">
      <div class="card shadow p-4" style="width: 420px;">
 
        <h5 class="fw-bold mb-3">
          {{ modoEdicion ? 'Editar producto' : 'Agregar producto' }}
        </h5>
 
        <div v-if="errorModal" class="alert alert-danger">
          Completa todos los campos correctamente.
        </div>
 
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input v-model="form.nombre" type="text" class="form-control" placeholder="Ej: MacBook Air M3" />
        </div>
 
        <div class="mb-3">
          <label class="form-label">Categoria</label>
          <select v-model="form.categoria" class="form-select">
            <option value="">Selecciona una categoria</option>
            <option>Laptops</option>
            <option>Smartphones</option>
            <option>Audio</option>
            <option>Monitores</option>
            <option>Tablets</option>
            <option>Perifericos</option>
          </select>
        </div>
 
        <div class="mb-3">
          <label class="form-label">Precio</label>
          <input v-model="form.precio" type="number" class="form-control" placeholder="Ej: 6499000" />
        </div>
 
        <div class="mb-3">
          <label class="form-label">Stock</label>
          <input v-model="form.stock" type="number" class="form-control" placeholder="Ej: 10" />
        </div>
 
        <div class="mb-4">
          <label class="form-label">Descripcion</label>
          <textarea v-model="form.descripcion" class="form-control" rows="2" placeholder="Descripcion del producto"></textarea>
        </div>
 
        <div class="d-flex gap-2 justify-content-end">
          <button @click="cerrarModal" class="btn btn-outline-secondary">Cancelar</button>
          <button @click="guardarProducto" class="btn btn-primary">
            {{ modoEdicion ? 'Guardar cambios' : 'Agregar' }}
          </button>
        </div>
 
      </div>
    </div>
 
    <!-- Modal ver detalles -->
    <div v-if="productoDetalle" class="modal-fondo" @click.self="productoDetalle = null">
      <div class="card shadow p-4" style="width: 380px;">
        <h5 class="fw-bold mb-3">Detalles del producto</h5>
        <p><span class="text-muted">Nombre:</span> <strong>{{ productoDetalle.nombre }}</strong></p>
        <p><span class="text-muted">Categoria:</span> {{ productoDetalle.categoria }}</p>
        <p><span class="text-muted">Precio:</span> ${{ Number(productoDetalle.precio).toLocaleString('es-CO') }}</p>
        <p><span class="text-muted">Stock:</span> {{ productoDetalle.stock }}</p>
        <p><span class="text-muted">Descripcion:</span> {{ productoDetalle.descripcion }}</p>
        <button @click="productoDetalle = null" class="btn btn-primary w-100 mt-2">Cerrar</button>
      </div>
    </div>
 
  </div>
</template>
 
<script setup>
import { ref, onMounted } from 'vue'
import ProductCardComponent from '../components/ProductCardComponent.vue'
import productosData from '../data/products.json'
 
const productos       = ref([])
const modalVisible    = ref(false)
const modoEdicion     = ref(false)
const errorModal      = ref(false)
const productoDetalle = ref(null)
 
const formVacio = () => ({
  id: null, nombre: '', categoria: '', precio: '', stock: '', descripcion: ''
})
 
const form = ref(formVacio())
 
// LocalStorage
function cargarProductos() {
  const guardados = localStorage.getItem('technova_productos')
  if (guardados) {
    productos.value = JSON.parse(guardados)
  } else {
    productos.value = productosData
    guardarEnStorage()
  }
}
 
function guardarEnStorage() {
  localStorage.setItem('technova_productos', JSON.stringify(productos.value))
}
 
// CREATE y UPDATE
function guardarProducto() {
  errorModal.value = false
  if (!form.value.nombre || !form.value.categoria || !form.value.precio || form.value.stock === '') {
    errorModal.value = true
    return
  }
  if (modoEdicion.value) {
    const index = productos.value.findIndex(p => p.id === form.value.id)
    if (index !== -1) productos.value[index] = { ...form.value }
  } else {
    productos.value.push({ ...form.value, id: Date.now() })
  }
  guardarEnStorage()
  cerrarModal()
}
 
// DELETE
function eliminarProducto(id) {
  if (confirm('¿Seguro que quieres eliminar este producto?')) {
    productos.value = productos.value.filter(p => p.id !== id)
    guardarEnStorage()
  }
}
 
// READ detalles
function verDetalles(producto) {
  productoDetalle.value = producto
}
 
// Modal
function abrirModal(producto = null) {
  errorModal.value = false
  if (producto) {
    modoEdicion.value = true
    form.value = { ...producto }
  } else {
    modoEdicion.value = false
    form.value = formVacio()
  }
  modalVisible.value = true
}
 
function cerrarModal() {
  modalVisible.value = false
  form.value = formVacio()
}
 
onMounted(() => cargarProductos())
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