<template>
  <div class="d-flex flex-column p-3" style="width: 220px; min-height: 100vh; background-color: #042C53;">

    <p class="text-uppercase mb-1" style="font-size: 10px; color: #4F7499; letter-spacing: 0.08em;">
      Categorias
    </p>

    <ul class="nav nav-pills flex-column mb-3">
      <li class="nav-item">
        <a class="nav-link text-white" style="cursor:pointer;" @click="filtrar('')">
          Todos
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white d-flex justify-content-between" style="cursor:pointer;" @click="filtrar('Laptops')">
          Laptops <span class="badge bg-primary">3</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white d-flex justify-content-between" style="cursor:pointer;" @click="filtrar('Smartphones')">
          Smartphones <span class="badge bg-primary">2</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white d-flex justify-content-between" style="cursor:pointer;" @click="filtrar('Audio')">
          Audio <span class="badge bg-primary">2</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white d-flex justify-content-between" style="cursor:pointer;" @click="filtrar('Monitores')">
          Monitores <span class="badge bg-primary">2</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white d-flex justify-content-between" style="cursor:pointer;" @click="filtrar('Perifericos')">
          Perifericos <span class="badge bg-primary">1</span>
        </a>
      </li>
    </ul>

    <hr style="border-color: #1a3a5c;">

    <p class="text-uppercase mb-1" style="font-size: 10px; color: #4F7499; letter-spacing: 0.08em;">
      Mi cuenta
    </p>

    <ul class="nav nav-pills flex-column">
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link text-white">Inicio</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard/productos" class="nav-link text-white">Productos</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/login" class="nav-link text-white">Cerrar sesion</router-link>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function filtrar(categoria) {
  localStorage.setItem('technova_filtro', categoria)
  window.dispatchEvent(new Event('filtro-actualizado'))
  router.push('/dashboard/productos')
}
</script>

<style scoped>
.router-link-active {
  background-color: rgba(55, 138, 221, 0.2) !important;
  border-left: 3px solid #378ADD;
  color: #85B7EB !important;
}
</style>