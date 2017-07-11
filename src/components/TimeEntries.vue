<template>
  <div>
<md-card>

<md-whiteframe md-elevation="3">
                <router-link v-if="$route.path !== '/time-entries/log-time'" class="md-transperent" tag="md-button" to="/time-entries/log-time"><md-icon>note_add</md-icon><a>Log time</a></router-link>
            </md-whiteframe>
</md-card-header>
<md-card-content>      
 <p v-if="!timeEntriesResult.length"><strong>No time entries yet</strong></p>
  <md-list v-for="timeEntry in timeEntriesResult">
    <md-list-item>
      <span><img :src="timeEntry.user.image" class="avatar img-circle img-responsive" /></span>
      <p>
                <strong>
                  {{ timeEntry.user.firstName }} 
                  {{ timeEntry.user.lastName }}
                </strong>
              </p>
       <h3>{{ timeEntry.totalTime }} </h3> 
       <p>   {{ timeEntry.date }} </p>  
       <p>{{ timeEntry.comment }}</p>    
       <md-button class="md-icon-button md-raised" @click.native="deleteTimeEntry(timeEntry)">
         <md-icon>add</md-icon>
       </md-button>
    </md-list-item>
  </md-list>
 
       
</md-card-content>
</md-card>  



    
 
     

    <router-view></router-view>

    
  </div>
</template>

<script>
  import store from '../store';

  export default {
    methods: {
      deleteTimeEntry (timeEntry) {
        if (window.confirm('Are you sure you want to delete this time entry?')) {
          store.commit('deleteTime', timeEntry);
        }
      }
    },
    computed: {
      timeEntriesResult(){      
        return store.state.timeEntries;
      }
    }
  }
</script>

<style>
  .avatar {
    height: 75px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .user-details {
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
    margin: -10px 0;
  }
  .time-block {
    padding: 10px;
  }
  .comment-section {
    padding: 20px;
  }
</style>