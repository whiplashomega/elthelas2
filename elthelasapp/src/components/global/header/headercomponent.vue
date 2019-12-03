<template>
  <div class="print-hide">
    <b-navbar toggleable="xl" class="site-header sticky-top py-1" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <div class="container d-flex flex-column flex-xl-row justify-content-between">
          <div>
            <router-link to="/">Home</router-link>
          </div>
          <div class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown"
               role="button" aria-expanded="false">
              In-Game Tools<span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li class="dropdown-item"><router-link to="/tools/charbuilder">Character Builder</router-link></li>
              <li class="dropdown-item" v-if="loggedin"><router-link to="/runner">Encounter Runner</router-link></li>
              <li class="dropdown-item"><router-link to="/tools/treasuregenerator">Treasure Generator</router-link></li>
              <li class="dropdown-item"><router-link to="/tools/strongholdbuilder">Stronghold Builder</router-link></li>
              <li class="dropdown-item" v-if="loggedin"><router-link to="/tools/campaigns">Campaign Builder</router-link></li>
              <li class="dropdown-item" v-if="loggedin"
                  v-for="campaign in userCampaigns" :key="campaign._id">
                <router-link :to="'/tools/campaigns/' + campaign.url">{{ campaign.title }}</router-link>
              </li>
              <li class="dropdown-item" v-if="loggedin && isadmin"><router-link to="/tools/creaturebuilder">Creature Builder</router-link></li>
              <li class="dropdown-item" v-if="loggedin"><router-link to="/encounter/builder">Encounter Builder</router-link></li>
              <li class="dropdown-item" v-if="loggedin"><router-link to="/encounter/random">Random Encounter Table</router-link></li>
              <li class="dropdown-item" v-if="loggedin"><router-link to="/encounter/details">Encounter List</router-link></li>
              <li class="dropdown-item"><router-link to="/tools/book4/playersguide">Epic of Elthelas Book 4 - Player's Guide</router-link></li>
            </ul>
          </div>
          <div class="dropdown">
            <a href="#" class="dropdown-toggle"
               data-toggle="dropdown" role="button"
               aria-expanded="false">
              Character Options <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li class="dropdown-item"><router-link to="/options/backgrounds">Backgrounds</router-link></li>
              <li class="dropdown-item"><router-link to="/options/class">Classes</router-link></li>
              <li class="dropdown-item"><router-link to="/options/domains">Domains</router-link></li>
              <li class="dropdown-item"><router-link to="/options/feats">Feats</router-link></li>
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
            <a href="#" class="dropdown-toggle"
               data-toggle="dropdown" role="button"
               aria-expanded="false">
              Reference <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li class="dropdown-item"><router-link to="/ref/quick">Quick Reference Manual</router-link></li>
              <li class="dropdown-item"><router-link to="/ref/magicitems">Magic Item Catalog</router-link></li>
              <li class="dropdown-item" v-if="loggedin"><router-link to="/ref/bestiary">Bestiary</router-link></li>
              <li class="dropdown-item"><router-link to="/ref/calendar">Calendar</router-link></li>
              <li class="dropdown-item"><router-link to="/ref/cosmology">Cosmology</router-link></li>
              <li class="dropdown-item"><router-link to="/ref/astronomy">Astronomy</router-link></li>
              <li class="dropdown-item"><router-link to="/ref/magic">Magic</router-link></li>
              <li class="dropdown-item"><router-link to="/ref/gods">Gods</router-link></li>
              <li class="dropdown-item"><router-link to="/ref/divines">Divine Beings</router-link></li>
              <li class="dropdown-item"><router-link to="/ref/orgs">Organizations</router-link></li>
              <li class="dropdown-item"><router-link to="/altasoror">Altasoror</router-link></li>
            </ul>
          </div>
          <div class="dropdown">
            <a href="#" class="dropdown-toggle"
               data-toggle="dropdown" role="button"
               aria-expanded="false">
              User <span class="caret"></span>
            </a>
            <ul class="dropdown-menu" role="menu">
              <li class="dropdown-item" v-if="loggedin"><a data-ng-click="account('lg')">My Account</a></li>
              <li class="dropdown-item" v-if="loggedin"><a @click="logout()">Logout</a></li>
              <!-- When Logged Out -->
              <li class="dropdown-item" v-if="!loggedin"><a @click="showRegister = true">Register</a></li>
              <li class="dropdown-item" v-if="!loggedin"><a @click="showLogin = true">Login</a></li>
              <li class="dropdown-item"><a @click="googleSignIn()">Google Sign In</a></li>
              <li class="dropdown-item"><router-link to="/privacy-policy">Privacy Policy</router-link></li>
            </ul>
          </div>
          <div class="search-container"><gcse:search></gcse:search></div>
        </div><!-- /.container-fluid -->
      </b-collapse>
    </b-navbar>
    <header class="header jumbotron" v-if="!hidetitle">
      <div class="container">
        <h1>
          <a href="/">
            <img src="https://elthelas-images.herokuapp.com/swordshieldlogo.png" alt="" class="logo" />Elthelas Campaign Setting - {{ title }}
          </a>
        </h1>
        <button class="btn btn-default linebutton" @click="hidetitle = !hidetitle" v-if="!hidetitle">Hide</button>
      </div>
    </header>
    <div class="row" v-if="hidetitle"><div class="col-10"><h4 style="margin-left:15px;">Elthelas Campaign Setting - {{ title }}</h4></div><button class="btn btn-default topbutton" @click="hidetitle = !hidetitle">Show</button></div>
    <b-modal id="loginmodal" size="lg"
             title="Login" v-model="showLogin">
      <form name="login" v-if="logonformactive">
        <div class="form-inline">
          <label class="col-3">Username:</label> <input type="text" v-model="logincreds.username" class="form-control col-9" />
        </div>
        <div class="form-inline">
          <label class="col-3">Password:</label> <input type="password" v-model="logincreds.password" class="form-control col-9" />
        </div>
        <div slot="modal-footer">
          <div class="btn-group"><button type="button" class="btn btn-default" @click="handleLogin(); logonformactive = false;">Login</button><button type="button" class="btn btn-danger" @click="showLogin=false">Cancel</button></div>
        </div>
      </form>
      <div v-else>
        Logging you in...
      </div>
      <template slot="modal-footer" slot-scope="{ ok, cancel, hide }">
      </template>
    </b-modal>
    <b-modal id="registermodal" size="lg"
             title="Register" v-model="showRegister">
      <div v-if="logonformactive">
        <div class="form-inline">
          <label class="col-3">Username:</label> <input type="text" v-model="registeruser.username" class="form-control col-9" />
        </div>
        <div class="form-inline">
          <label class="col-3">First Name:</label> <input type="text" v-model="registeruser.firstname" class="form-control col-9" />
        </div>
        <div class="form-inline">
          <label class="col-3">Last Name:</label> <input type="text" v-model="registeruser.lastname" class="form-control col-9" />
        </div>
        <div class="form-inline">
          <label class="col-3">Password:</label> <input type="password" v-model="registeruser.password" class="form-control col-9" />
        </div>
        <div class="form-inline">
          <label class="col-3">Confirm Password:</label> <input type="password" v-model="registeruser.passwordConfirm" class="form-control col-9" />
        </div>
        <div slot="modal-footer">
          <div class="btn-group"><button type="button" class="btn btn-default" @click="handleRegister(); logonformactive = false;">Login</button><button type="button" class="btn btn-danger" @click="showRegister=false">Cancel</button></div>
        </div>
      </div>
      <div v-else>
        Registering, please wait...
      </div>
      <template slot="modal-footer" slot-scope="{ ok, cancel, hide }">
      </template>
    </b-modal>
  </div>
</template>
<script src="./header.js">

</script>
<style src="./header.scss" lang="scss">
</style>
