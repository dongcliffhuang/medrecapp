<<template>
  <div class="drugslist">
    <div class="list-group">
            <a href="#" class="list-group-item" v-for="drug in drugs">
            <h4 class="list-group-item-heading"><i class="glyphicon glyphicon-bullhorn"></i> Drug Name : {{ drug.name }}</h4>
            <h5><i class="list-group-item-text" ></i> Side effect : {{ drug.sideeffects }}</h5>
            <p class="list-group-item-text" >Manufactured by : {{ drug.company }}</p>            
            </a>
        </div>
        <ul v-if="errors && errors.length">
          <li v-for="error of errors">
            {{error.message}}
          </li>
        </ul>
  </div>    
</template>
<<script>
import {HTTP} from '../http-common';
export default {
  name: 'drugslist',
  data: () => ({
      drugs: [],
      errors: []
  }),
  created() {
      HTTP.get('drugs')
      .then(response => {
        this.drugs = response.data;
      })
      .catch(e => {
        this.errors.push(e)
      })      
  }
}
</script>

