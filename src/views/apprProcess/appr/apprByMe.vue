<template>
  <appr-common-list type="apprByMe" />
</template>

<script>
export default {
  name: 'ApprByMe',
  components: {
    ApprCommonList: () => import('./apprCommonList')
  }
}
</script>
