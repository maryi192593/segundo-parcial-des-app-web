<template>
  <!-- Fondo gris claro, centrado vertical y horizontal -->
  <div class="theme-toggle " >
  <button @click="toggleTheme" class="theme-btn">
    
    <span class="icon">
      {{ darkMode ? '☀️' : '🌙' }}
    </span>

    <span class="text">
      {{ darkMode ? 'Modo Claro' : 'Modo Oscuro' }}
    </span>

  </button>
  </div>
    <div class="d-flex justify-content-center align-items-center vh-100">
       <!-- Card blanca del formulario -->
    <div class="card shadow-lg p-4 login-container" >
    
      <!-- Logo TechNova -->
      <div class="text-center mb-4">
        <h3 class="fw-bold">
          Tech<span class="text-primary">Nova</span>
        </h3>
        <p class="text-muted mb-0">Inicia sesión en tu cuenta</p>
      </div>
 
      <!-- Alerta roja: aparece solo si hay error de credenciales -->
      <div v-if="error" class="alert alert-danger" role="alert">
        Credenciales incorrectas. Verifica tus datos.
      </div>
 
      <!-- Alerta verde: aparece solo si el login fue exitoso -->
      <div v-if="success" class="alert alert-success" role="alert">
        ¡Acceso correcto! Redirigiendo al dashboard...
      </div>
 
      <!-- Campo correo electrónico -->
      <div class="mb-3">
        <label class="form-label">Correo electrónico</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          placeholder="usuario@technova.com"
        />
      </div>
 
      <!-- Campo contraseña -->
      <div class="mb-4">
        <label class="form-label">Contraseña</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="••••••••"
        />
      </div>
 
      <!-- Botón de inicio de sesión -->
      <button @click="login" class="btn btn-primary w-100">
        Iniciar sesión
      </button>
 
      <!-- Nota educativa obligatoria (el profe lo pide en el README) -->
      <p class="text-muted text-center mt-3" style="font-size: 11px;">
        ⚠️ Esta autenticación es solo educativa y no representa un sistema de seguridad real.
      </p>
 
    </div>
    </div>
</template>
 
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import usuarios from '../data/users.json'
 
// Variables reactivas
const email    = ref('')
const password = ref('')
const error    = ref(false)
const success  = ref(false)
const router   = useRouter()
const darkMode = ref(false)

function toggleTheme() {
  darkMode.value = !darkMode.value
  document.body.classList.toggle('bg-dark', darkMode.value)
  document.body.classList.toggle('bg-light', !darkMode.value)
}
 
// Función que valida contra usuarios.json
function login() {
  error.value   = false
  success.value = false
 
  const user = usuarios.find(
    u => u.email === email.value && u.password === password.value
  )
 
  if (user) {
    success.value = true
    setTimeout(() => router.push('/dashboard'), 1500)
  } else {
    error.value = true
  }
}
</script>