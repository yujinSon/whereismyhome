<template>
  <b-container class="bv-example-row mt-3"> </b-container>
</template>

<script>
import { deleteArticle } from "@/api/board";

export default {
  name: "BoardDelete",
  created() {
    let param = this.$route.params.articleno;
    deleteArticle(
      param,
      ({ data }) => {
        let msg = "삭제 처리시 문제가 발생했습니다.";
        if (data === "success") {
          msg = "삭제가 완료되었습니다.";
        }
        alert(msg);
        // 현재 route를 /list로 변경.
        this.$router.push({ name: "boardlist" });
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style></style>
