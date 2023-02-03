<template>
  <div class="print-hide">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Elthelas</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Characters
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><router-link to="/options/create" class="dropdown-item">Character Creation</router-link></li>
                <li><router-link to="/tools/charbuilder" class="dropdown-item">Character Builder</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><router-link to="/options/alignment" class="dropdown-item">Alignment</router-link></li>
                <li><router-link to="/options/ancestry" class="dropdown-item">Ancestry</router-link></li>
                <li><router-link to="/options/backgrounds" class="dropdown-item">Backgrounds</router-link></li>
                <li><router-link to="/options/class" class="dropdown-item">Classes</router-link></li>
                <li><router-link to="/options/domains" class="dropdown-item">Domains</router-link></li>
                <li><router-link to="/options/feats" class="dropdown-item">Feats</router-link></li>
                <li><router-link to="/options/languages" class="dropdown-item">Languages</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Campaigns
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li v-if="user.isLoggedIn"><router-link to="/campaign" class="dropdown-item">Campaign Builder</router-link></li>
                <div v-if="user.isLoggedIn">
                  <li v-for="campaign in userCampaigns" :key="campaign._id">
                    <router-link :to="'/campaign/' + campaign.url" class="dropdown-item">{{ campaign.title }}</router-link>
                  </li>
                </div>
                <li><hr class="dropdown-divider"></li>
                <li v-if="user.isLoggedIn && user.isAdmin"><router-link to="/tools/creaturebuilder" class="dropdown-item">Creature Builder</router-link></li>
                <li v-if="user.isLoggedIn"><router-link to="/tools/runner" class="dropdown-item">Encounter Runner</router-link></li>
                <li><router-link to="/tools/treasuregenerator" class="dropdown-item">Treasure Generator</router-link></li>
                <li><router-link to="/tools/strongholdbuilder" class="dropdown-item">Stronghold Builder</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                World
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><router-link to="/world/geography" class="dropdown-item">Geography</router-link></li>
                <li><router-link to="/world/cosmology" class="dropdown-item">Cosmology</router-link></li>
                <li><router-link to="/world/astronomy" class="dropdown-item">Astronomy</router-link></li>
                <li><router-link to="/world/calendar" class="dropdown-item">Calendar</router-link></li>
                <li><router-link to="/world/orgs" class="dropdown-item">Organizations</router-link></li>
                <li><router-link to="/world/historylist" class="dropdown-item">History</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Reference
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><router-link to="/ref/srd" class="dropdown-item">System Reference Document</router-link></li>
              <li><router-link to="/ref/adventuring" class="dropdown-item">Adventuring</router-link></li>
              <li><router-link to="/ref/combat" class="dropdown-item">Combat</router-link></li>
              <li><router-link to="/ref/equipment" class="dropdown-item">Equipment</router-link></li>
              <li v-if="user.isLoggedIn"><router-link to="/ref/bestiary" class="dropdown-item">Bestiary</router-link></li>
              <li><router-link to="/ref/magic" class="dropdown-item">Magic</router-link></li>
              <li><router-link to="/ref/gods" class="dropdown-item">Gods</router-link></li>
              <li><router-link to="/ref/divines" class="dropdown-item">Divine Beings</router-link></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                5e
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><router-link to="/5e/charbuilder" class="dropdown-item">Character Builder</router-link></li>
                <li v-if="user.isLoggedIn"><router-link to="/5e/runner" class="dropdown-item">Encounter Runner</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><router-link to="/5e/quick" class="dropdown-item">Quick Reference Manual</router-link></li>
                <li><router-link to="/5e/magicitems" class="dropdown-item">Magic Item Catalog</router-link></li>
                <li><router-link to="/5e/class" class="dropdown-item">Classes</router-link></li>
                <li><router-link to="/5e/feats" class="dropdown-item">Feats</router-link></li>    
                <li><router-link to="/5e/class" class="dropdown-item">Races</router-link></li>  
                <li><router-link to="/5e/homebrew" class="dropdown-item">Homebrew</router-link></li>         
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                User
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a @click="switchTheme('system')" class="dropdown-item">System Theme<span v-if="darkmode === 'system'"> &check;</span></a></li>
              <li><a @click="switchTheme('light')" class="dropdown-item">Light Theme<span v-if="darkmode === 'light'"> &check;</span></a></li>
              <li><a @click="switchTheme('dark')" class="dropdown-item">Dark Theme<span v-if="darkmode === 'dark'"> &check;</span></a></li>
              <li><hr class="dropdown-divider"></li>
              <li v-if="user.isLoggedIn"><a @click="logout()" class="dropdown-item">Logout</a></li>
              <li v-if="user.isLoggedIn"><a @click="cp.isActive = true" class="dropdown-item">Change Password</a></li>
              <!-- When Logged Out -->
              <li v-if="!user.isLoggedIn"><a @click="showRegister.isActive = true" class="dropdown-item">Register</a></li>
              <li v-if="!user.isLoggedIn"><a @click="showLogin.isActive = true" class="dropdown-item">Login</a></li>
              <li><router-link to="/privacy-policy" class="dropdown-item">Privacy Policy</router-link></li>
              </ul>
            </li>
            <li class="nav-item">
              <button class="btn btn-primary linebutton" @click="hidetitle = !hidetitle" v-if="!hidetitle">Hide Title</button>
              <button class="btn btn-primary" @click="hidetitle = !hidetitle" v-if="hidetitle">Show Title</button>
            </li>
          </ul>
          <!--<form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>-->
        </div>
      </div>
    </nav>
    <div style="padding-top:60px;"><!-- spacer --></div>
    <header class="header jumbotron container-fluid" v-if="!hidetitle">
        <h1>
          <img src="https://elthelas-images.herokuapp.com/swordshieldlogo.png" alt="" class="logo" />Elthelas Campaign Setting {{ globals.titleForHeader }}
        </h1>
        
    </header>
    <modal id="loginmodal" :modalProps="showLogin">
      <template #default>
        <form name="login" v-if="showLogin.loginformactive">
          <div class="form-inline">
            <label class="col-3">Username:</label> <input type="text" v-model="logincreds.username" class="form-control col-9" />
          </div>
          <div class="form-inline">
            <label class="col-3">Password:</label> <input type="password" v-model="logincreds.password" class="form-control col-9" />
          </div>
        </form>
        <div v-else>
          Logging you in...
        </div>
      </template>
      <template #footer>
        <div class="btn-group"><button type="button" class="btn btn-primary" @click="handleLogin(); showLogin.loginformactive = false;" :disabled="!showLogin.loginformactive">Login</button><button type="button" class="btn btn-danger" @click="showLogin.isActive=false">Cancel</button></div>
      </template>
    </modal>
    <modal id="registermodal" :modalProps="showRegister">
      <template #default>
        <div v-if="showRegister.loginformactive">
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
        </div>
        <div v-else>
          Registering, please wait...
        </div>
      </template>
      <template #footer>
        <div class="btn-group"><button type="button" class="btn btn-default" @click="handleRegister(); showRegister.loginformactive = false;" :disabled="!showRegister.loginformactive">Register</button><button type="button" class="btn btn-danger" @click="showRegister.isActive=false">Cancel</button></div>
      </template>
    </modal>
    <modal id="changepassword" :modalProps="cp">
      <template #default>
        <div v-if="cp.loginformactive">
          <div class="form-inline">
            <label class="col-3">Password:</label> <input type="password" v-model="cp.password" class="form-control col-9" />
          </div>
          <div class="form-inline">
            <label class="col-3">New Password:</label> <input type="password" v-model="cp.newpassword" class="form-control col-9" />
          </div>
          <div class="form-inline">
            <label class="col-3">Confirm New Password:</label> <input type="password" v-model="cp.passwordConfirm" class="form-control col-9" />
          </div>
        </div>
        <div v-else>
          Changing Password, please wait...
        </div>
      </template>
      <template #footer>
        <div class="btn-group"><button type="button" class="btn btn-default" @click="handleChangePassword(); cp.loginformactive = false;" :disabled="!cp.loginformactive">Change Password</button><button type="button" class="btn btn-danger" @click="cp.isActive=false">Cancel</button></div>
      </template>
    </modal>
    <!--<b-modal id="changepasswordmodal" size="lg"
             title="Update Password" v-model="showChangePassword"
             hide-footer :modal-class="user.loggedin.themesetting">
      <div v-if="logonformactive">
        <div class="form-inline">
          <label class="col-3">Current Password:</label> <input type="password" v-model="user.password" class="form-control col-9" />
        </div>
        <div class="form-inline">
          <label class="col-3">New Password:</label> <input type="password" v-model="user.newpassword" class="form-control col-9" />
        </div>
        <div class="form-inline">
          <label class="col-3">Confirm New Password:</label> <input type="password" v-model="user.passwordConfirm" class="form-control col-9" />
        </div>
        <div slot="modal-footer">
          <div class="btn-group"><button type="button" class="btn btn-default" @click="handleChangePassword(); logonformactive = false;">Change Password</button><button type="button" class="btn btn-danger" @click="showRegister=false">Cancel</button></div>
        </div>
      </div>
      <div v-else>
        Registering, please wait...
      </div>
      <template slot="modal-footer" slot-scope="{ ok, cancel, hide }">
      </template>
    </b-modal> -->
  </div>
</template>
<script src="./header/header.js">

</script>
<style src="./header/header.scss" lang="scss">
</style>
