<template>
  <!-- 个性推荐 -->
  <div>
    <hotSearch></hotSearch>
    <RecPlaylist></RecPlaylist>
    <RecMvList></RecMvList>
    <NewMvList></NewMvList>
  </div>

</template>

<script>
import hotSearch from './hotSearch.vue'
import RecPlaylist from './RecPlaylist.vue'
import NewMvList from './NewMvList.vue'
import RecMvList from './RecMvList.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'recommend',
  components: {
    hotSearch,
    RecPlaylist,
    NewMvList,
    RecMvList,
  },
  mounted() {
    this.changehomeTAG(0)
  },
  methods: {
    ...mapMutations('homePage', ['changehomeTAG']),
  },
}
</script>

<style lang="less">
</style>