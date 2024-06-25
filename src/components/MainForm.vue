<template>
  <div class="w-[400px] py-2 px-3">
    <div class="flex items-center justify-between mb-3">
      <h1 class="text-lg font-medium"> Información de zona seleccionada</h1>
      <Button
        v-if="polygon"
        width="fit"
        iconSize="md"
        color="default"
        :shadow="false"
        iconOnly
        uppercase
        icon="uil:times"
        :loading="loading"
        @click.native="emit('clearForm')"
      />
    </div>
    <p v-if="!polygon">
      No hay una zona seleccionada, 
      selecciona una haciendo click en un polígono.
      <Divider />
    </p>
    <BaseForm v-else id="modal-form" @submit="submitForm">
      <template #form-inputs>
        <div>
          <span class="text-slate-600 mr-3">
            Scoring:
            <Badge size="sm" class="font-medium" :text="land.scoring"/>
          </span>
          <span class="text-slate-600">
            Demanda por terreno:
            <Badge size="sm" class="font-medium" :text="land.demand_score"/>
          </span>
        </div>
        <div class="mt-2">
          <span class="text-slate-600 mr-3">
            Rentabilidad:
            <Badge size="sm" class="font-medium" :text="land.rentability_score"/>
          </span>
        </div>
        <Divider class="my-3" />
        <div class="mb-2 w-full flex">
          <div class="w-1/2 mr-2">
            <InputValidateField
              v-model="land.name"
              class="w-full" 
              label-text="Nombre" 
              placeholder-text="Nombre"
              name="nombre de terreno"
              :rules="['required']"
            />
          </div>
          <div class="w-1/2">
            <DatePicker 
              v-model="land.arrival_date" 
              class="w-full" 
              label-text="Fecha llegada" 
              placeholder-text="Fecha de llegada"
              name="fecha"
              :teleport="true"
            /> 
          </div>
        </div>
        <div class="mb-2 w-full flex">
          <InputValidateField 
            v-model="land.area" 
            class="mr-2 w-1/3" 
            label-text="* M2 terreno" 
            placeholder-text="0"
            name="m2 terreno"
            :rules="['numeric']"
          />
          <!-- sin deciamles -->
          <InputValidateField 
            v-model="land.price_per_m2" 
            class="w-1/3" 
            label-text="* Precio UF/m2" 
            placeholder-text="$0"
            name="precio uf/m2"
            :rules="['numeric_float']"
          />
        </div>
        <Divider class="my-3" />
        <CustomSelect 
          v-model="land.land_type" 
          class="mb-2" 
          label-text="* Tipo" 
          placeholder-text="Seleccione un tipo"
          :options="['Terreno', 'Activo con renta', 'Mixto']"
          name="tipo"
        />         
        <div class="mb-2 w-full flex">
          <InputValidateField 
            v-model="land.location" 
            class="w-1/2 mr-2" 
            label-text="* Distancia carretera (km)" 
            placeholder-text="0.0"
            name="ubicacion"
            :rules="['numeric_float']"
          />
          <InputValidateField 
            v-model="land.residential_area_distance" 
            class="w-1/2" 
            label-text="* Dist. residencial (m)" 
            placeholder-text="0.0"
            name="distancia residencial"
            :rules="['numeric']"
          />
        </div>
        <div class="mb-2 w-full flex">
          <CustomSelect 
            v-model="land.exposure" 
            class="w-1/2 mr-2" 
            label-text="* Exposición" 
            placeholder-text="Seleccione..."
            :options="['Primera línea', 'No es primera línea']"
            :searchable="false"
            name="exposicion"
          />
          <CustomSelect 
            v-model="land.pole" 
            class="w-1/2 mr-1" 
            label-text="* Polo" 
            placeholder-text="Seleccione..."
            :options="polesStore.polesListSimple"
            :searchable="false"
            name="polo"
          />
        </div>
        <CustomSelect 
          v-model="land.corridor" 
          class="w-full" 
          label-text="* Corredores" 
          placeholder-text="Seleccione..."
          :options="corridorsStore.corridorsSimpleList"
          :searchable="false"
          labelForSelect="zone"
          name="corredores"
        />
        <Divider class="my-3" />
        <InputValidateField 
          v-model="land.permitted_uses" 
          class="mb-2" 
          label-text="Usos permitidos" 
          placeholder-text="Usos permitidos"
          name="usos permitidos"
        />
        <div class="mb-2 w-full flex">
          <InputValidateField 
            v-model="land.occupancy_coefficient" 
            class="mr-2 w-1/2" 
            label-text="* Coef. ocupación (%)" 
            placeholder-text="0"
            name="coeficiente de ocupacion"
            :rules="['numeric']"
          />
          <InputValidateField 
            v-model="land.building_height" 
            class="w-1/2" 
            label-text="Altura edificación (m)"
            placeholder-text="0" 
            name="altura de edificacion"
            :rules="['numeric_float']"
          />
        </div>
        <InputValidateField 
          v-model="land.constructability" 
          class="mb-2" 
          label-text="Coeficiente constructibilidad"
          placeholder-text="0"
          name="constructibilidad"
          :rules="['numeric_float']"
        />
        <Divider class="my-3" />
        <InputValidateField 
          v-model="land.contact" 
          class="w-full mb-2" 
          label-text="Contacto"
          placeholder-text="" 
          name="contacto"
        />
        <TextAreaField 
          labelText="Comentario"
          v-model="land.comment"
        />
        <InputValidateField 
          v-model="land.link" 
          class="mb-2" 
          label-text="Carpeta de terreno"
          placeholder-text="Link a carpeta de google drive"
          name="carpeta de terreno" 
        />
      </template>
      <template #form-actions="{ validate }">
        <Divider class="my-3"/>
        <div class="w-full flex">
          <Button
            form="modal-form"
            size="md"
            class="mr-1"
            width="full"
            color="primary"
            :label="loading ? 'Guardando...' : 'Guardar'"
            uppercase
            icon="uil:save"
            :loading="loading"
            :disabled="loading"
            @click.native="validate"
          />
          <Button
            size="md"
            width="full"
            color="danger"
            :label="archiving ? 'Archivando...' : 'Archivar'"
            uppercase
            icon="uil:archive-alt"
            :loading="archiving"
            :disabled="archiving"
            @click.native="deletePolygon()"
          />
        </div>
      </template>
    </BaseForm>
    
  </div>
</template>

<script setup>
const props = defineProps({
  polygon: Object,
});
const emit = defineEmits(['update:polygon', 'deletePolygon', 'clearForm']);
const corridorsStore = useCorridorStore()
const polesStore = usePolesStore()
const loading = ref(false);
const archiving = ref(false);
const land = ref(null);
const dayjs = inject('dayjs');
const toast = inject('toast');
const landStore = useLandStore()

watch(() => props.polygon, (polygon) => {
  if(polygon) {
    land.value = polygon;
    if(polygon.arrival_date) {
      land.value.arrival_date = dayjs(polygon.arrival_date);
    }
  }
})

const deletePolygon = async () => {
  archiving.value = true;
  if(!!land.value.marker) {
    const status = await landStore.archiveLand(land.value.id)
    if(status !== 204) {
      archiving.value = false;
      return
    }
  }
  archiving.value = false;
  emit('deletePolygon')
  toast.success('Polígono archivado correctamente')
}

const submitForm = async (values) => {
  const body = {
    name: land.value.name,
    arrival_date: dayjs(land.value.arrival_date).format('YYYY-MM-DD'),
    link: land.value.link,
    area: land.value.area,
    price_per_m2: land.value.price_per_m2,
    land_type: land.value.land_type || 1,
    pole: land.value.pole || 1,
    location: land.value.location || 1.0,
    exposure: land.value.exposure,
    permitted_uses: land.value.permitted_uses,
    occupancy_coefficient: land.value.occupancy_coefficient,
    building_height: land.value.building_height,
    constructability: land.value.constructability,
    residential_area_distance: land.value.residential_area_distance,
    coordinates_create: land.value.coordinates,
    corridor: land.value.corridor,
    comment: land.value.comment,
    contact: land.value.contact,
  }
  loading.value = true;
  if(land.value.id.toString().includes('Temporal')) {
    const { data, status } = await landStore.createLand(body)
    if(status !== 201) {
      loading.value = false;
      return;
    }
    props.polygon.scoring = data.scoring
    props.polygon.demand_score = data.demand_score
    props.polygon.rentability_score = data.rentability_score
    emit('update:polygon')
    toast.success('Polígono creado correctamente')
  } else {
    const { data, status } = await landStore.updateLand(land.value.id, body)
    if(status !== 200) {
      loading.value = false;
      return;
    }
    props.polygon.scoring = data.scoring
    props.polygon.demand_score = data.demand_score
    props.polygon.rentability_score = data.rentability_score
    emit('update:polygon')
    toast.success('Polígono actualizado correctamente')
  }
  loading.value = false;
};
</script>