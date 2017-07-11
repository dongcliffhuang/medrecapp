<template>
  <div class="phone-viewport">
    
     
      <md-boards :md-auto="true" :md-infinite="true" :md-duration="5000" :md-swipeable="true">
  <md-board id="slide1">
    <p>Welcome to the Medrec Hybrid Mobile App. This app leverages the Medrec API's available through the Oracle API Platform Cloud Service.</p>
  </md-board>

  <md-board id="slide2">
    <p>The app is built using open source Web Progressive framework called vue.js.</p>
  </md-board>

  <md-board id="slide3">
    <p>Check out the Git repo on how to get a handle on this app</p>
  </md-board>
</md-boards>   
      
  
    <md-card class="card-example" >
  <md-card-area md-inset>
    <md-card-media>
      <span>
      <md-subheader class="md-accent">
        Get started by  <router-link class="md-transperent" tag="md-button" to="/time-entries"><md-icon>note_add</md-icon><a>Time Entries</a></router-link></md-subheader>
       </span>
    </md-card-media>

    <md-card-header>
      <h2 class="md-title">Coffee House</h2>
      <div class="md-subhead">
        <md-icon>location_on</md-icon>
        <span>1 KM</span>
      </div>
    </md-card-header>

    <md-card-content>
      Illy Coffee served with a complimentary Leonidas Belgian Chocolate with all beverages.
    </md-card-content>
  </md-card-area>

  <md-card-content>
    <h3 class="md-subheading">Today's availability</h3>
    <div class="card-reservation">
      <md-icon>access_time</md-icon>
      <md-button-toggle md-single class="md-button-group">
        <md-button>5:30PM</md-button>
        <md-button>7:30PM</md-button>
        <md-button>9:00PM</md-button>
      </md-button-toggle>
    </div>
  </md-card-content>

  <md-card-actions>
    <md-button class="md-accent md-raised">Reserve</md-button>
  </md-card-actions>
</md-card>
  </div>
</template>

<script>
	export default {

	};
</script>

<style>
.card-example {
  .md-subhead {
    .md-icon {
      $size: 16px;

      width: $size;
      min-width: $size;
      height: $size;
      min-height: $size;
      font-size: $size;
      line-height: $size;
    }

    span {
      vertical-align: middle;
    }
  }

  .card-reservation {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .md-icon {
      margin: 8px;
      color: rgba(#000, .54) !important;
    }

    .md-button {
      border-radius: 2px !important;
    }
  }
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
}
</style>