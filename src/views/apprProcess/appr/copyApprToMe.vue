<template>
  <appr-common-list type="copyApprToMe" />
</template>

<script>
export default {
  name: 'ApprByMe',
  components: {
    ApprCommonList: () => import('./apprCommonList')
  }
}
</script>
