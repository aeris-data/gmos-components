<template>
   <div id="app">
      <ul>
         <li>
            <router-link to="/metadata-download-path">metadata download</router-link>
         </li>
         <li>
            <router-link to="/metadata-layout-path">metadata layout</router-link>
         </li>
         <li>
            <router-link to="/metadata-md-template-gmos-time-series-metadata-path">metadata md template gmos time series metadata</router-link>
         </li>
        <li>
            <router-link to="/metadata-time-series-metadata-summary-path">metadata time series metadata summary</router-link>
         </li>
      </ul>
      <div>
         <router-view class="view"/>
      </div>
   </div>
</template>
