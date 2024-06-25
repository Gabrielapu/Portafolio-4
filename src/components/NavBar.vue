<template>
  <div class="w-full flex justify-end items-center h-[7vh] p-3 relative shadow-sm"> 
    <Button
      width="fit"
      size="md"
      class="mr-2"
      color="default"
      label="cargar demanda"
      uppercase
      icon="uil:save"
      :loading="loading"
      @click.native="openUploadModal()"
    />
    <Button
      width="fit"
      size="md"
      class="mr-2"
      color="default"
      label="descargar excel"
      uppercase
      icon="uil:save"
      :loading="downloading"
      @click.native="downloadExcel"
    />
    <Button
      width="fit"
      iconSize="xl"
      color="default"
      :shadow="false"
      iconOnly
      uppercase
      icon="uil:exit"
      :loading="loading"
      @click.native="closeSession()"
    />
  </div>
  <UploadModal v-model="showUploadModal" />
</template>

<script setup>
const loading = ref(false)
const downloading = ref(false)
const router = useRouter()
const session = useSessionStore()
const landStore = useLandStore()
const showUploadModal = ref(false)
const corridorsStore = useCorridorStore()

watch(() => showUploadModal.value, async (value) => {
  if (!value) {
    landStore.lands = []
    corridorsStore.corridors = []
    await landStore.getLands()
    await corridorsStore.getCorridors()
  }
})

const openUploadModal = () => {
  showUploadModal.value = true
}

const downloadExcel = async () => {
  downloading.value = true
  await landStore.downloadExcel()
  downloading.value = false
}

const closeSession = () => {
  session.logout()
  router.push({ name: 'login' })
}
</script>