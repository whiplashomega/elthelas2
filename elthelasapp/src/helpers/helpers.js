export default {
  loading: function (comp) {
    comp.$root.$emit('bv::show::modal', 'loading');
    comp.$http.get('/characters?token=' + comp.token.token).then(function(res) {
      comp.characters = res.body;
      comp.$root.$emit('bv::hide::modal', 'loading');
      comp.$root.$emit('bv::show::modal', 'servermodal');
      return true;
    }).catch(function() {
      alert("error when loading, please try logging off and in again");
      comp.$root.$emit('bv::hide::modal', 'loading');
      return false;
    });
  }
};
