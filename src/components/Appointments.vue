<template>
<div class="page-layout">
  
    <md-card>
        <md-card-header>
          
            <md-whiteframe md-elevation="3">
                <md-subheader class="md-accent">Create Appointment</md-subheader>
            </md-whiteframe>
        </md-card-header>
        <md-card-content>       
    
           
            <md-input-container>
                <label>Appointment Name</label>
                <md-icon >description</md-icon>
                <md-textarea placeholder="appointment name" v-model="appointment.title" maxlength="70"></md-textarea>
            </md-input-container>  
            <md-input-container>
                <label>Appointment Date</label>
                <md-icon class="primary">date_range</md-icon>
                 <md-input type="date" placeholder="appointment date" v-model="appointment.date"> </md-input>
            </md-input-container> 
            <md-input-container>
                <label>Comments</label>
                <md-icon>comment</md-icon>                
                <md-textarea placeholder="appointment detail" v-model="appointment.detail"></md-textarea>
            </md-input-container>
            <md-button class="md-raised md-accent" v-on:click.native="addAppointment">Submit</md-button>
    </md-card-content> 
   </md-card> 
 
    <md-card>
         <md-card-header>
          
            <md-whiteframe md-elevation="3">
                <md-subheader class="md-accent">Appointments</md-subheader>
            </md-whiteframe>
      </md-card-header>
       <md-card-content>   
 
         
         <p v-if="!appointmentsResult.length"><strong>No Appointments yet</strong></p>

          
            <md-list v-for="appointment in appointmentsResult">
                <md-list-item>
                <md-icon>list</md-icon>
                <span>{{ appointment.title }}</span>
                <md-list-expand>
                    <md-list>
                    <md-list-item class="md-inset">{{ appointment.date }}</md-list-item>
                    <md-list-item class="md-inset">{{ appointment.detail }}
                    <md-divider class="md-inset"></md-divider>
                    </md-list-item> 
                    <md-button class="md-raised md-accent" v-on:click.native="deleteAppointment(appointment)">Remove Appointment</md-button>                                   
                    </md-list>
                </md-list-expand>
                </md-list-item>
            </md-list>           
          
      </md-card-content>
    </md-card>    
 </div>  
</template>
<script>
    import store from '../store'
    
    export default {
        data () {
         return {
            appointment: {
                title: "",
                detail: "",
                date: ""
            }
      }
        },
        methods: {
            addAppointment () {
                let appointments = this.appointment
                // We dispatch the appointment so it can be pushed
                // onto the appointments array
                if (Object.keys(appointments).length > 1) {
                    store.commit('appointmentUpdate', appointments);
                }
                this.appointment = {
                    title: "",
                    detail: "",
                    date: ""
                };
            },
            deleteAppointment (appointment) {
                if (window.confirm('Are you sure you want to delete this appointment?')) {
                    store.commit('deleteAppointment', appointment);
                }
            }
        },
        computed: {
            appointmentsResult(){      
            return store.state.appointments;
      }
    }
    }
</script>
<style>
.page-layout {
  margin: 16px 5%;
  display: flex;

  .column {
    flex: 1;

    + .column {
      margin-left: 8px;
    }
  }

  .md-card + .md-card {
    margin-top: 8px;
  }
}
</style>