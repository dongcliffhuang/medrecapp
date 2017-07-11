<template>
<div class="pagelayout">
  <md-card>
    <md-card-content> 
    <md-input-container>
   <label>Date</label>
      <md-icon class="primary">date_range</md-icon>
      <md-input type="date" placeholder="Date" v-model="timeEntry.date"></md-input>
 </md-input-container> 
 <md-input-container>
   <label>Hours</label>
      <md-icon >time</md-icon>
      <md-input type="number" placeholder="Hours" v-model="timeEntry.totalTime"></md-input>

 </md-input-container> 
 <md-input-container>
   <label>Comment</label>
                <md-icon >description</md-icon>
                <md-textarea placeholder="comment" v-model="timeEntry.comment" maxlength="70"></md-textarea>

 </md-input-container> 
 <md-button class="md-raised md-accent" v-on:click.native="save()">Save</md-button>
<router-link class="md-transperent" tag="md-button" to="/time-entries"><md-icon>cancel</md-icon><a>Cancel</a></router-link>

  </md-card-content> 
  </md-card> 
 
  </div>

</template>

<script>
  import store from '../store'

  export default {
    data () {
      return {
        timeEntry: {
          user: {
            firstName: 'Vijay Kumar',
            lastName: 'Yenne',
            email: 'vijaykumar.yenne@oracle.com',
            image: 'https://1.gravatar.com/avatar/80e6896f952542d0fdb2d66edeb88e31?s=250&d=retro&r=g'
          }
        }
      }
    },
    methods: {
      save () {
        let timeEntry = this.timeEntry

        if (Object.keys(timeEntry).length > 1) {
          store.commit('timeUpdate', timeEntry);
        }

        this.timeEntry = {
          user: {
            firstName: 'Vijay Kumar',
            lastName: 'Yenne',
            email: 'vijaykumar.yenne@oracle.com',
            image: 'https://s.gravatar.com/avatar/80e6896f952542d0fdb2d66edeb88e31?s=80'
          }
        };
      }
    }
  }
</script>