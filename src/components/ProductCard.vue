<template>
  <div class="card h-100 shadow-sm">
 
    <img
      :src="producto.imagen"
      :alt="producto.nombre"
      class="card-img-top"
      style="height: 160px; object-fit: contain; padding: 12px; background: #f8f9fa;"
      @error="onImageError"
    />
 
    <div class="card-body d-flex flex-column">
 
      <!-- Categoría -->
      <span class="badge bg-primary mb-2" style="width: fit-content; font-size: 11px;">
        {{ producto.categoria }}
      </span>
 
      <!-- Nombre -->
      <h6 class="card-title fw-bold mb-1">{{ producto.nombre }}</h6>
 
      <!-- Descripción -->
      <p class="text-muted mb-2" style="font-size: 12px;">
        {{ producto.descripcion }}
      </p>
 
      <!-- Precio -->
      <p class="fw-bold mb-2" style="font-size: 18px; color: #185FA5;">
        ${{ Number(producto.precio).toLocaleString('es-CO') }}
      </p>
 
      <!-- Stock -->
      <span
        class="badge mb-3"
        :class="{
          'bg-success': producto.stock > 5,
          'bg-warning text-dark': producto.stock > 0 && producto.stock <= 5,
          'bg-danger': producto.stock === 0
        }"
        style="width: fit-content; font-size: 11px;"
      >
        {{ producto.stock === 0 ? 'Agotado' : 'Disponible' }}
      </span>
 
      <!-- Botones -->
      <div class="d-flex gap-2 mt-auto">
        <button
          @click="$emit('agregar-carrito', producto)"
          class="btn btn-primary btn-sm flex-grow-1"
          :disabled="producto.stock === 0"
        >
          Agregar
        </button>
        <button
          @click="$emit('ver-detalles', producto)"
          class="btn btn-outline-primary btn-sm"
        >
          Ver
        </button>
      </div>
 
    </div>
  </div>
</template>
 
<script setup>
/* eslint-disable */
defineProps({
  producto: {
    type: Object,
    required: true
  }
})
 
defineEmits(['agregar-carrito', 'ver-detalles'])
</script>