<template>
<div class="phone-viewport">
 
        
       
                <md-subheader class="Title"> Drugs  
                    <md-icon>search</md-icon>                     
                    <md-button class="md-icon-button md-raised md-accent" @click="toggleLeftSidenav">                        
                        <md-tooltip md-direction="left">Add Drug</md-tooltip>
                        <md-icon>add</md-icon>                                             
                    </md-button>
                </md-subheader>
               
        
        

        <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
                <md-toolbar>
                <div class="md-toolbar-container">
                    <h3 class="md-title">New Drug Details</h3>
                </div>
                </md-toolbar>
                 <md-input-container>
                <label>Drug Name</label>
                <md-icon >comment</md-icon>
                <md-textarea placeholder="Drug label" v-model="drugInfoData.name"  maxlength="70"></md-textarea>
            </md-input-container>  
            <md-input-container>
                <label>Side Effects</label>
                <md-icon class="primary">description</md-icon>
                 <md-textarea placeholder="Drug side effects" v-model="drugInfoData.sideeffects"> </md-textarea>
            </md-input-container> 
            <md-input-container>
                <label>Manufactured By</label>
                <md-icon>description</md-icon>                
                <md-textarea placeholder="Company Name" v-model="drugInfoData.company"></md-textarea>
            </md-input-container>
            <md-button class="md-raised md-accent" v-on:click.native="addDrug()">Save</md-button>                
        </md-sidenav>
        <md-list v-for="drugData in drugs">
                <md-list-item>
                <md-icon>view_list</md-icon>
                <span>Drug Name : {{ drugData.name }}</span>
                <md-list-expand>
                  <md-list>
                    <md-list-item class="md-inset">
                      <md-icon>sentiment_dissatisfied</md-icon>
                     <span> Side effect : {{ drugData.sideeffects }}</span></md-list-item>
                    <md-list-item class="md-inset">
                      <md-icon>local_pharmacy</md-icon>
                     <span> Manufactured by : {{ drugData.company }}</span>
                    <md-divider class="md-inset"></md-divider>
                    </md-list-item> 
                    <div align="right" class="row">    
                      <md-button class="md-raised md-accent" @click="toggleLeftSidenav1(drugData)">Edit </md-button>
                      <md-button class="md-raised md-accent" v-on:click.native="deleteDrug(drugData)">Delete</md-button>                                   
                    </div>  
                  </md-list>
                </md-list-expand>
                </md-list-item>
            </md-list>          
     
    <md-sidenav class="md-left" ref="leftSidenav1" @open="open('Left1')" @close="close('Left1')">
        <md-toolbar>
            <div class="md-toolbar-container">
                <h3 class="md-title">Edit Drug</h3>
            </div>
        </md-toolbar>
        <md-input-container>
                <label>Drug Name</label>
                <md-icon >comment</md-icon>
                <md-textarea placeholder="Drug label" v-model="drugEditRow.name"  maxlength="70"></md-textarea>
        </md-input-container>  
        <md-input-container>
                <label>Side Effects</label>
                <md-icon class="primary">description</md-icon>
                 <md-textarea placeholder="Drug side effects" v-model="drugEditRow.sideeffects"> </md-textarea>
        </md-input-container> 
            <md-input-container>
                <label>Manufactured By</label>
                <md-icon>description</md-icon>                
                <md-textarea placeholder="Company Name" v-model="drugEditRow.company"></md-textarea>
            </md-input-container>
            <md-button class="md-raised md-accent" v-on:click.native="saveEditDrug(drugEditRow)">Save</md-button>   
            
    </md-sidenav>            
  </div>
</template>    
<script>
    import store from '../store';
    import {HTTP} from '../http-common';
    import { mapState } from 'vuex';

 export default {
    name: "drugInventory" ,
    computed: mapState([
        'drugs'
    ]), 
    data () {
         return {
            drugInfoData: {
                name: "",
                company: "",
                sideeffects: ""
            },
            drugEditRow: {
                id: "",
                name: "",
                company: "",
                sideeffects: ""
            }
      }
        },
        methods: {
            addDrug(){
                
                 let addNewDrug = this.drugInfoData
                HTTP.post('drugs',{
                    "company": addNewDrug.company,
                    "name": addNewDrug.name,
                    "sideeffects": addNewDrug.sideeffects
                }).then(response => {})
                .catch(e => {
                    this.errors.push(e)
                })
                 if (Object.keys(addNewDrug).length > 1) {
                    store.commit('drugInventoryUpdate', addNewDrug);
                }
                this.drugInfoData = {
                    name: "",
                    company: "",
                    sideeffects: ""
                }; 
                this.$refs.leftSidenav.close();                
            },
            deleteDrug(drugData){
                HTTP.delete('drugs/'+drugData.id).then(response => {})
                .catch(e => {
                    this.errors.push(e)
                })
                store.commit('drugInventoryDelete', drugData);
            },
            editDrug(drugData){
                this.drugEditRow = drugData;                                 
            },
            saveEditDrug(drugEditRow){
                HTTP.put('drugs/'+drugEditRow.id,{
                    "company": drugEditRow.company,
                    "name": drugEditRow.name,
                    "sideeffects": drugEditRow.sideeffects
                }).then(response => {})
                .catch(e => {
                    this.errors.push(e)
                }) 
                this.drugEditRow = {
                    name: "",
                    company: "",
                    sideeffects: ""
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
            toggleLeftSidenav1(drugData) {
                this.$refs.leftSidenav1.toggle();
                this.drugEditRow = drugData;                
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
            this.$store.dispatch('LOAD_DRUG_LIST')
        }        
 }  
 </script>         