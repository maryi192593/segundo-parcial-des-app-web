<template>
  <div class="d-flex flex-column min-vh-100">

    <Navbar />

    <div class="d-flex flex-grow-1">

      <Sidebar />

      <div class="flex-grow-1 p-4" style="background-color: #f0f4f8;">

        <!-- Página de inicio: solo cuando la ruta es /dashboard exacto -->
        <div v-if="$route.path === '/dashboard'">

          <!-- Bienvenida -->
          <div class="mb-4">
            <h4 class="fw-bold mb-1">Bienvenido a TechNova 👋</h4>
            <p class="text-muted">Encuentra los mejores productos tecnologicos al mejor precio.</p>
          </div>

          <!-- Banner oferta -->
          <div class="card mb-4 border-0" style="background-color: #E6F1FB;">
            <div class="card-body d-flex justify-content-between align-items-center p-4">
              <div>
                <h5 class="fw-bold mb-1" style="color: #042C53;">Ofertas de la semana</h5>
                <p class="text-muted mb-3" style="font-size: 14px;">
                  Hasta 30% de descuento en laptops y smartphones seleccionados.
                </p>
                <router-link to="/dashboard/productos" class="btn btn-primary">
                  Ver todos los productos
                </router-link>
              </div>
              <div class="d-flex align-items-center justify-content-center rounded"
                style="width: 90px; height: 90px; background-color: #B5D4F4;">
                <span class="fw-bold text-primary" style="font-size: 26px;">30%</span>
              </div>
            </div>
          </div>

          <!-- Categorías -->
          <h6 class="fw-bold mb-3">Explorar por categoria</h6>
          <div class="row g-3">
            <div class="col-6 col-md-2" v-for="cat in categorias" :key="cat.nombre">
              <div class="card text-center shadow-sm p-3" style="cursor: pointer;" @click="irACategoria(cat.nombre)">
                <p class="fw-bold mb-0" style="font-size: 13px; color: #185FA5;">{{ cat.nombre }}</p>
                <p class="text-muted mb-0" style="font-size: 11px;">{{ cat.cantidad }} items</p>
              </div>
            </div>
          </div>

        </div>

        <!-- Vistas hijas (ProductView) -->
        <router-view />

      </div>
    </div>

    <Footer />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()

const categorias = ref([
  { nombre: '💻 Laptops',     cantidad: 3 },
  { nombre: '📱 Smartphones', cantidad: 2 },
  { nombre: '🎧 Audio',       cantidad: 2 },
  { nombre: '🖥️ Monitores',   cantidad: 2 },
  { nombre: '📱 Tablets',     cantidad: 1 },
  { nombre: '⌨️ Perifericos', cantidad: 1 }
])

function irACategoria(categoria) {
  localStorage.setItem('technova_filtro', categoria) 
  localStorage.setItem('technova_desde_filtro', 'true')
  window.dispatchEvent(new Event('filtro-actualizado'))
  router.push('/dashboard/productos')
}
</script>