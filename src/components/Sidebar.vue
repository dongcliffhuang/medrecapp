<template>
  <div>
  <md-card>

<md-card-header>
          
            <md-whiteframe md-elevation="3">
                <md-subheader class="md-accent">Total Time</md-subheader>
                <md-subheader class="md-accent">{{ time }} hours</md-subheader>                                
            </md-whiteframe>
        </md-card-header>
  </md-card> 

   
  </div>
</template>

<script>
  export default {
    props: ['time']
  }
</script>