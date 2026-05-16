<template>
  <!-- Tarjeta individual de producto -->
  <div class="card h-100 shadow-sm">
 
    <!-- Imagen del producto (fondo de color) -->
    <div
      class="card-img-top d-flex align-items-center justify-content-center"
      style="height: 120px; background-color: #E6F1FB;"
    >
      <span class="fw-bold" style="font-size: 13px; color: #185FA5;">
        {{ producto.categoria }}
      </span>
    </div>
 
    <div class="card-body d-flex flex-column">
 
      <!-- Categoría badge -->
      <span class="badge bg-primary mb-2" style="width: fit-content; font-size: 11px;">
        {{ producto.categoria }}
      </span>
 
      <!-- Nombre del producto -->
      <h6 class="card-title fw-bold mb-1">{{ producto.nombre }}</h6>
 
      <!-- Precio -->
      <p class="fw-bold mb-2" style="font-size: 16px; color: #185FA5;">
        ${{ Number(producto.precio).toLocaleString('es-CO') }}
      </p>
 
      <!-- Stock badge -->
      <span
        class="badge mb-3"
        :class="{
          'bg-success': producto.stock > 5,
          'bg-warning text-dark': producto.stock > 0 && producto.stock <= 5,
          'bg-danger': producto.stock === 0
        }"
        style="width: fit-content; font-size: 11px;"
      >
        {{ producto.stock === 0 ? 'Agotado' : producto.stock + ' en stock' }}
      </span>
 
      <!-- Botón ver detalles — emite evento al componente padre -->
      <button
        @click="$emit('ver-detalles', producto)"
        class="btn btn-outline-primary btn-sm mt-auto w-100"
      >
        Ver detalles
      </button>
 
    </div>
  </div>
</template>
 
<script setup>
// Props: recibe el objeto producto desde el padre
defineProps({
  producto: {
    type: Object,
    required: true
  }
})
 
// Emite evento al padre cuando el usuario hace clic en "Ver detalles"
defineEmits(['ver-detalles'])
</script>