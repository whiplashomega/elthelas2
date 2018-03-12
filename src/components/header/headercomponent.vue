<template>
<div>
  <nav class="site-header sticky-top py-1">
    <div class="container d-flex flex-column flex-md-row justify-content-between">
        <div>
          <router-link to="/">Home</router-link>
        </div>
        <div class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
              In-Game Tools<span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li class="dropdown-item"><router-link to="/tools/charbuilder">Character Builder</router-link></li>
              <li class="dropdown-item"><router-link to="/runner">Encounter Runner</router-link></li>
              <li class="dropdown-item"><a ui-sref="app.book1">Epic of Elthelas Book 1</a></li>
              <li class="dropdown-item"><a href="#">Epic of Elthelas Book 2</a></li>
              <li class="dropdown-item"><a href="#">Epic of Elthelas Book 3</a></li>
              <li class="dropdown-item"><router-link to="/tools/book4/dm/curestan">Epic of Elthelas Book 4</router-link></li>
              <li class="dropdown-item"><router-link to="/tools/book4/playersguide">Epic of Elthelas Book 4 - Player's Guide</router-link></li>
            </ul>
        </div>
        <div class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
              Character Options <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li class="dropdown-item"><router-link to="/options/backgrounds">Backgrounds</router-link></li>
              <li class="dropdown-item"><router-link to="/options/class">Classes</router-link></li>
              <li class="dropdown-item"><router-link to="/options/domains">Domains</router-link></li>
              <li class="dropdown-item"><router-link to="/options/languages">Languages</router-link></li>
              <li class="dropdown-item"><router-link to="/options/races">Races</router-link></li>
            </ul>
        </div>
        <div>
          <router-link to="/geo">Geography</router-link>
        </div>
        <div>
          <router-link to="/history">History</router-link>
        </div>
        <div class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
              Reference <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li class="dropdown-item"><router-link to="/ref/quick">Quick Reference Manual</router-link></li>
              <li class="dropdown-item"><router-link to="/ref/bestiary">Bestiary</router-link></li>
              <li class="dropdown-item"><router-link to="/ref/calendar">Calendar</router-link></li>
              <li class="dropdown-item"><router-link to="/ref/cosmology">Cosmology</router-link></li>
              <li class="dropdown-item"><router-link to="/ref/astronomy">Astronomy</router-link></li>
              <li class="dropdown-item"><router-link to="/ref/magic">Magic</router-link></li>
              <li class="dropdown-item"><router-link to="/ref/gods">Gods</router-link></li>
              <li class="dropdown-item"><router-link to="/ref/divines">Divine Beings</router-link></li>
              <li class="dropdown-item"><router-link to="/ref/orgs">Organizations</router-link></li>
            </ul>
        </div>
        <div><a data-ng-click="account('lg')">My Account</a></div>
        <div><a data-ng-click="logout()">Logout</a></div>
          <!-- When Logged Out -->
        <div><a data-ng-click="register()">Register</a></div>
        <div><a data-ng-click="login('lg')">Login</a></div>
    </div><!-- /.container-fluid -->
  </nav>
  <header class="header jumbotron">
    <div class="container">
      <h1>
        <a href="/">
          <img src="/static/images/swordshieldlogo.png" alt="" class="logo" /><span data-ng-cloak>Elthelas Campaign Setting - {{title}}</span>
        </a>
      </h1>
    </div>
  </header>

</div>
</template>
<script src="./header.js">

</script>
<style src="./header.scss">
</style>
