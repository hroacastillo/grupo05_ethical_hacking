<template>
<v-app id="app">
<v-container>
<h1>
  <strong><h3>Trabajo Final: Grupo 05 - Ethical Hacking</h3></strong>
</h1>

<v-row>
  <v-col cols="12">
    <v-card class="mb-4">
      <v-card-title class="red darken-2 white--text">
        <v-icon left color="white">mdi-bug</v-icon>
        PoC XSS CVE-2025-1461 - Vuetify v-calendar
      </v-card-title>
      <v-card-text>
        <v-alert type="warning" prominent>
          <strong>Vulnerabilidad:</strong> XSS en la propiedad event-more-text del componente v-calendar de Vuetify 2.7.2 y anteriores.
        </v-alert>
        <p><strong>Descripción:</strong> Esta vulnerabilidad permite la inyección de código HTML/JavaScript malicioso a través de la propiedad <code>event-more-text</code>.</p>
      </v-card-text>
    </v-card>
  </v-col>
</v-row>

<section class="repro-content-section">
  <h2>Prueba de Concepto <v-chip>VCalendar</v-chip></h2>
  <Reproduction class="mt-4"/>
</section>

<v-row>
  <v-col cols="12">
    <v-card>
      <v-card-title>
        <v-icon left color="info">mdi-information</v-icon>
        Información Técnica
      </v-card-title>
      <v-card-text>
        <v-simple-table>
          <thead>
            <tr>
              <th>Parámetro</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>CVE ID</strong></td>
              <td>CVE-2025-1461</td>
            </tr>
            <tr>
              <td><strong>Componente Vulnerable</strong></td>
              <td>v-calendar (Vuetify)</td>
            </tr>
            <tr>
              <td><strong>Versión Vulnerable</strong></td>
              <td>2.7.2 y anteriores</td>
            </tr>
            <tr>
              <td><strong>Propiedad Vulnerable</strong></td>
              <td>event-more-text</td>
            </tr>
            <tr>
              <td><strong>Tipo de Ataque</strong></td>
              <td>Cross-Site Scripting (XSS)</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-col>
</v-row>
</v-container>
</v-app>
</template>

<script>
import Reproduction from './components/Reproduction.vue'

export default {
name: 'App',
components: {
  Reproduction,
},
}
</script>



<style>
/* Styles */
h1 {
  text-align: center;
  margin-bottom: 2rem;
}

h1 > small {
  display: block;
  font-weight: normal;
  font-size: 0.8em;
  margin-bottom: 0;
}

aside {
  border-left: 4px solid #2196f3;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  background-color: rgba(33, 150, 243, 0.05);
}

code {
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
}

section {
  padding: 1rem;
  margin-bottom: 2rem;
}

.vulnerability-info-table {
  border-spacing: 0.5rem;
  margin-right: 1rem;
  width: 100%;
}

.vulnerability-info-table th {
  text-align: left;
  vertical-align: top;
  white-space: nowrap;
  width: 20%;
}

.repro-instructions-section li {
  margin-bottom: 0.5rem;
}
</style>