<template>
<body>
  <div id = "mainbody">
    <div id="innercenter">  
      <h1 >아파트 실거래가가 궁금하다면?</h1>
    </div>
  </div>
</body>
</template>

<script>
export default {
  name: "AppMain",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Do+Hyeon&display=swap');

.underline-steelblue {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(72, 190, 233, 0.3) 30%);
}
body{
  background-image: url("../assets/apt4.png");
  background-size: cover;
  position: fixed;
}

#mainbody{
  width: 100vw;
  height: 100vh;
  position: relative;
}
h1{
  
  font-size: 90px;
  color: white;
  font-family: 'Black Han Sans', sans-serif;
  font-family: 'Do Hyeon', sans-serif;
  
  }
#innercenter{
  position: absolute;
  top: 50%;
  left: 30%;
  margin:-150px 0 0 -150px
}

</style>
