<template>
  <div class="author-info">
    <img :src="imagen" class="rounded-circle card-img-top" alt="{{ nombre }}" draggable="false"/>
    <div class="card-body">
      <h2 class="author-name">{{ nombre ?? 'Anonimo' }}</h2>
      <p class="author-job-title">{{ rol ?? 'Anonimo' }}</p>
      <a v-if="git" :href="git" target="_blank" class="btn btn-primary">
        <i class="fab fa-github"></i> Ver perfil en GitHub
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imagen: String,
    nombre: String,
    rol: String,
    git: String,
  },
};
</script>

<style scoped>

.author-info {
  display: flex;
  align-items: center;
  margin-top: 40px;
  line-height: 1;
}

.card-body{
  margin-left: 12px;
  line-height: 1;
  margin: 0px;
  padding: 0;
  padding-left: 15px;
}

.btn {
  background-color: #5cb85c;
  padding: 5px;
  border-radius: 5px;
  margin: 0px;
}

.btn:hover {
  background-color: #3a943a;
  padding: 5px;
  border-radius: 5px;
  color: white;
}

.btn-primary {
  text-decoration: none;
  font-size: 12px;
  color: white;
}

.author-name {
  font-weight: bold;
  font-size: 16px;
  margin: 0px;
  padding: 0px;
  color: #060419;
  margin-bottom: -10px;
}

.author-job-title {
  font-weight: 300;
  font-size: 14px;
  margin: 0px;
  padding: 0px;
}

.rounded-circle {
  border-radius: 50%;
}

.card-img-top {
  max-width: 80px;
  margin: 0px;
  padding: 0px;
}
</style>
