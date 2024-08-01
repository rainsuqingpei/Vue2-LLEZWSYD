<template>
  <!-- 选择类型弹窗 -->
  <div class="alert-Dialog">
    <el-dialog
      title="提示"
      :visible.sync="opMessageShow2"
      :close-on-click-modal="false"
      :show-close="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-wrapper">
        <div class="content">
          <div class="blue_con_wrap">
            <div class="blue_con" @click="chooseType('card')">刷身份证</div>
            <div class="blue_con" @click="chooseType('code')">
              输入统一社会信用代码或身份证
            </div>
            <div class="blue_con" @click="chooseType('qrCode')">扫码个人码</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    opMessageShow2: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    close() {
      this.$emit("opMessageClose2");
    },
    chooseType(type) {
      this.$emit("chooseType", type);
    },
  },
};
</script>

<style scoped>
</style>
