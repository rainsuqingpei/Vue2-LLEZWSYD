<template>
  <!-- 提示弹窗 -->
  <div class="alert-Dialog">
    <el-dialog
      title="提示"
      :visible.sync="opMessageShow1"
      :close-on-click-modal="false"
      :show-close="false"
      :close-on-press-escape="false"
    >
      <div class="dialog-wrapper">
        <div class="content">
          <div class="txt">{{ opMessageTxt1 }}</div>
        </div>
        <div class="dialog-footer">
          <div class="ep-btn-group flex-col-row-align">
            <span @click="close">确定</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    opMessageShow1: {
      type: Boolean,
      default: false,
    },
    opMessageTxt1: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    search() {
      this.$emit("search", this.searchVal);
    },
    close() {
      this.$emit("opMessageClose1");
    },
  },
};
</script>

<style scoped>
</style>
