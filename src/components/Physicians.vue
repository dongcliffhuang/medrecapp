<<template>
  <div class="physicianslist">
<md-table-card>
  <md-toolbar>
    <h1 class="md-title">Physicians</h1>
    <md-button class="md-icon-button">
      <md-icon>filter_list</md-icon>
    </md-button>

    <md-button class="md-icon-button">
      <md-icon>search</md-icon>
    </md-button>
  </md-toolbar>

  <md-table md-sort="Fullname" md-sort-type="desc">
    <md-table-header>
      <md-table-row>
        <md-table-head md-sort-by="Fullname">Email</md-table-head>
        <md-table-head md-sort-by="_id">Physician Id</md-table-head>        
        <md-table-head md-sort-by="MedicalSpeciality" >Speciality</md-table-head>        
      </md-table-row>
    </md-table-header>

    <md-table-body>
      <md-table-row v-for="(row, rowIndex) in physicians" :key="rowIndex" :md-item="row" md-auto-select md-selection>
        <md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" :md-numeric="false">
          {{ column }}
        </md-table-cell>
      </md-table-row>
    </md-table-body>
  </md-table>

  <md-table-pagination
    md-size="5"
    md-total="10"
    md-page="2"
    md-label="Rows"
    md-separator="of"
    :md-page-options="[5, 10, 25, 50]"
    @pagination="onPagination"></md-table-pagination>
</md-table-card>

        
  </div>
</template>
<<script>
import {HTTP} from '../http-common';
export default {
  name: 'physicianslist',
  data: () => ({
      physicians: [],
      errors: []
  }),
  created() {
      HTTP.get('physicians')
      .then(response => {
        this.physicians = response.data;
      })
      .catch(e => {
        this.errors.push(e)
      })      
  }
}
</script>

