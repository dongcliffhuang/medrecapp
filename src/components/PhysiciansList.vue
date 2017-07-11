<template>
<div class="phone-viewport">
 
        
       
                <md-subheader class="Title"> Physicians  
                    <md-icon>search</md-icon>                     
                    <md-button class="md-icon-button md-raised md-accent" @click="toggleLeftSidenav">                        
                        <md-tooltip md-direction="left">Add Physician</md-tooltip>
                        <md-icon>person_add</md-icon>                                             
                    </md-button>
                </md-subheader>
               
        
        

        <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
                <md-toolbar>
                <div class="md-toolbar-container">
                    <h3 class="md-title">New Physician Details</h3>
                </div>
                </md-toolbar>
                 <md-input-container>
                <label>Physician Name</label>
                <md-icon >person</md-icon>
                <md-textarea placeholder="Physician Name" v-model="physicianInfo.FullName"  maxlength="70"></md-textarea>
            </md-input-container>  
            <md-input-container>
                <md-icon class="primary">domain</md-icon>
                 <md-textarea placeholder="Speciality" v-model="physicianInfo.MedicalSpeciality"> </md-textarea>
            </md-input-container>              
            <md-button class="md-raised md-accent" v-on:click.native="addPhysician()">Save</md-button>                
        </md-sidenav>
        <md-list v-for="physicianData in physicians">
                <md-list-item>
                <md-icon>person</md-icon>
                <span>Physician Name : {{ physicianData.FullName }}</span>
                <md-list-expand>
                  <md-list>
                    <md-list-item class="md-inset">
                      <md-icon>domain</md-icon>
                     <span> Speciality : {{ physicianData.MedicalSpeciality }} </span></md-list-item>                     
                    <div align="right" class="row">    
                      <md-button class="md-raised md-accent" @click="toggleLeftSidenav1(physicianData)">Edit </md-button>
                      <md-button class="md-raised md-accent" v-on:click.native="deletePhysician(physicianData)">Delete</md-button>                                   
                    </div>  
                    <md-stepper md-vertical>
                        <md-step md-label="My Prescriptions">
                            <p>Place holder to get all the Prescriptions.</p>
                        </md-step>
                        <md-step md-label="My Schedule" md-message="Sydney">
                            <p>Place holder to display my appointments</p>
                        </md-step>
                    </md-stepper>
                  </md-list>
                </md-list-expand>
                </md-list-item>
            </md-list>          
     
    <md-sidenav class="md-left" ref="leftSidenav1" @open="open('Left1')" @close="close('Left1')">
        <md-toolbar>
            <div class="md-toolbar-container">
                <h3 class="md-title">Edit Physician</h3>
            </div>
        </md-toolbar>
        <md-input-container>
                <label>Physician Name</label>
                <md-icon >person</md-icon>
                <md-textarea placeholder="Physician Name" v-model="physicianEditRow.FullName"  maxlength="70"></md-textarea>
        </md-input-container>  
        <md-input-container>
                <label>Speciality</label>
                <md-icon class="primary">domain</md-icon>
                 <md-textarea placeholder="Medical Speciality" v-model="physicianEditRow.MedicalSpeciality"> </md-textarea>
        </md-input-container>             
            <md-button class="md-raised md-accent" v-on:click.native="saveEditDrug(physicianEditRow)">Save</md-button>   
            
    </md-sidenav>            
  </div>
</template>    
<script>
    import store from '../store';
    import {HTTP} from '../http-common';
    import { mapState } from 'vuex';

 export default {
    name: "physicianInventory" ,
    computed: mapState([
        'physicians'
    ]), 
    data () {
         return {
            physicianInfo: {
                FullName: "",
                MedicalSpeciality: ""               
            },
            physicianEditRow: {
                _id: "",
                FullName: "",
                MedicalSpeciality: ""                
            }
      }
        },
        methods: {
            addPhysician(){
                
                 let addNewPhysician = this.physicianInfo
                HTTP.post('physicians',{
                    "Physicians": [    {                    
                    "FullName": addNewPhysician.FullName,
                    "MedicalSpeciality": addNewPhysician.MedicalSpeciality
                    }]
                }).then(response => {})
                .catch(e => {
                    this.errors.push(e)
                })
                 if (Object.keys(addNewPhysician).length > 1) {
                    store.commit('physicianInventoryUpdate', addNewPhysician);
                }
                this.physicianInfo = {
                    FullName: "",
                    MedicalSpeciality: ""                    
                }; 
                this.$refs.leftSidenav.close();                
            },
            deletePhysician(physicianData){
                HTTP.delete('physicians/'+physicianData._id).then(response => {})
                .catch(e => {
                    this.errors.push(e)
                })
                store.commit('physicianInventoryDelete', physicianData);
            },
            editDrug(physicianData){
                this.physicianEditRow = physicianData;                                 
            },
            saveEditDrug(physicianEditRow){
                HTTP.put('Physicians/'+physicianEditRow._id,{                   
                    "FullName": physicianEditRow.FullName,
                    "MedicalSpeciality": physicianEditRow.MedicalSpeciality
                }).then(response => {})
                .catch(e => {
                    this.errors.push(e)
                }) 
                this.physicianEditRow = {
                    FullName: "",
                    MedicalSpeciality: ""
                };  
                this.$refs.leftSidenav1.close();              
            },
            toggleRightSidenav() {
                this.$refs.rightSidenav.toggle();
            },
            closeRightSidenav() {
                this.$refs.rightSidenav.close();                
            },
            toggleLeftSidenav() {
                this.$refs.leftSidenav.toggle();                
            },
            closeLeftSidenav() {
                this.$refs.leftSidenav.close();                
            },
            toggleLeftSidenav1(physicianData) {
                this.$refs.leftSidenav1.toggle();
                this.physicianEditRow = physicianData;                
            },
            closeLeftSidenav1() {
                this.$refs.leftSidenav1.close();                
            },
            open(ref) {
                console.log('Opened: ' + ref);
            },
            close(ref) {
                console.log('Closed: ' + ref);
            }

            
        },        
        mounted: function () {
            this.$store.dispatch('LOAD_PHYSICIAN_LIST')
        }        
 }  
 </script>         