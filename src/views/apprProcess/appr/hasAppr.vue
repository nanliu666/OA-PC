<template>
  <appr-common-list type="hasAppr" />
</template>

<script>
export default {
  name: 'ApprByMe',
  components: {
    ApprCommonList: () => import('./apprCommonList')
  }
}
</script>
