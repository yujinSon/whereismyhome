<template>
  <div class="map_wrap">
    <div id="mapWrapper" style="width: 50%; height: 300px; float: left">
      <div id="map" style="width: 100%; height: 100%"></div>
      <!-- 지도를 표시할 div 입니다 -->
    </div>
    <div id="rvWrapper" style="width: 50%; height: 300px; float: left">
      <div id="roadview" style="width: 100%; height: 100%"></div>
      <!-- 로드뷰를 표시할 div 입니다 -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const houseStore = "houseStore";
export default {
  name: "KaKaoMap",
  computed: {
    ...mapState(houseStore, ["juso", "houses"]),
  },
  methods: {
    initMap() {
      var mapContainer = document.getElementById("map"),
        mapOption = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
      var map = new kakao.maps.Map(mapContainer, mapOption);
      this.SearchJuso(map);
    },

    SearchJuso(map) {
      var geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(this.juso, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          map.setCenter(coords);
          var roadviewContainer = document.getElementById("roadview");
          var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
          var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

          roadviewClient.getNearestPanoId(coords, 50, function (panoId) {
            roadview.setPanoId(panoId, coords); //panoId와 중심좌표를 통해 로드뷰 실행
          });
        }
      });
    },
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=2f3116618e03d125fd31ad05e6b762f1&libraries=services`;
      /* global kakao */
      script.addEventListener("load", () => {
        kakao.maps.load(this.initMap);
      });
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  },
  watch: {
    juso: function () {
      this.initMap();
    },
  },
};
</script>

<style>
#map {
  width: 100%;
  height: 250px;
}
#roadview {
  width: 100%;
  height: 300px;
}
</style>
