<template>
  <div class="modify-password">
    <div class="modify-header">
      <div class="modify-header-arrow" @click="ModifyStatus">
        <span class="iconfont icon-arrow-left"></span>
      </div>
      <div class="modify-header-text">修改密码</div>
    </div>
    <div class="modify-body">
      <div class="modify-body-item">
        <div class="modify-body-left">
          <label for="initPassword">原密码: </label
          ><input type="text" id="initPassword" ref="initPassword" />
        </div>
        <div class="modify-body-right">
          <span class="iconfont icon-arrowright"></span>
        </div>
      </div>

      <div class="modify-body-item">
        <div class="modify-body-left">
          <label for="modifyPassword">修改密码: </label
          ><input type="text" id="modifyPassword" ref="modifyPassword" />
        </div>
        <div class="modify-body-right">
          <span class="iconfont icon-arrowright"></span>
        </div>
      </div>

      <div class="modify-body-item">
        <div class="modify-body-left">
          <label for="confirmPassword">确认密码: </label
          ><input type="text" id="confirmPassword" ref="confirmPassword" />
        </div>
        <div class="modify-body-right">
          <span class="iconfont icon-arrowright"></span>
        </div>
      </div>
    </div>

    <div class="modify-footer">
      <div class="submit-buttom" @click="submitEvent">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    phoneNumber: String,
  },
  methods: {
    ModifyStatus() {
      this.$emit("ModifyStatus");
    },

    submitEvent() {
      let init = this.$refs.initPassword.value;
      let modify = this.$refs.modifyPassword.value;
      let confirm = this.$refs.confirmPassword.value;
      let currentStorage = JSON.parse(localStorage[this.phoneNumber]);
      if (init != currentStorage.passwords) {
        this.$toast.error("原密码不正确,请重新输入");
      } else {
        if (confirm == modify) {
          let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
          let result = reg.test(modify);
          if(result){
              currentStorage.passwords = confirm;
              localStorage[this.phoneNumber] = JSON.stringify({
                ...currentStorage,
              });
              this.ModifyStatus();
          }else{
            this.$toast.error("必须包含字母和数字且长度为6-16位之间,请重新输入");
          }
        } else {
          this.$toast.error("修改密码和确认密码不一致,请重新输入");
        }
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.modify-password {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: rgb(242, 242, 242);
  z-index: 3;

  .modify-header {
    display: flex;
    align-items: center;
    height: 50px;
    background: #fff;

    .modify-header-arrow {
      width: 30px;
      height: 50px;
      line-height: 50px;
      text-align: center;

      .icon-arrow-left {
        font-size: 23px;
        color: #666;
      }
    }

    .modify-header-text {
      flex: 1;
      padding-right: 15px;
      text-align: center;
      color: orange;
    }
  }

  .modify-body {
    margin-top: 10px;
    background: #fff;

    .modify-body-item {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 40px;
      padding: 0px 15px;
      border-bottom: 1px solid rgb(184, 184, 184);

      &:last-of-type {
        border-bottom: none;
      }

      .modify-body-left {
        flex: 1;
        display: flex;
        align-items: center;

        label {
          font-size: 14px;
          color: #777;
        }

        #initPassword,
        #modifyPassword,
        #confirmPassword {
          flex: 1;
          display: inline-block;
          height: 40px;
          padding: 0px;
          padding-left: 10px;
          background: none;
          outline: none;
          border: none;
          caret-color: orange;
        }
      }

      .modify-body-right {
        width: 15px;
        height: 40px;
        line-height: 40px;

        .icon-arrowright {
          font-size: 20px;
          color: #777;
        }
      }
    }
  }

  .modify-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 30px;

    .submit-buttom {
      background: orange;
      color: #fff;
      font-size: 13px;
      padding: 15px 100px;
      border-radius: 5px;
    }
  }
}
</style>