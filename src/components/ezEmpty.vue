<template>
  <div class="ez-empty">
    <img src="../assets/images/empty.png" alt="" />
    <div class="txt">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    msg: {
      type: String,
      default: "功能建设中，敬请期待",
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style>
</style>
