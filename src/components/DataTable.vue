<script setup>
const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  selected: {
    type: Array,
    default: () => [],
  },
  itemKey: {
    type: String,
    required: true,
  },
  sortBy: {
    type: String,
    default: undefined,
  },
  sortDesc: {
    type: Boolean,
    default: undefined,
  },
});

const emit = defineEmits([
  "update:sortBy",
  "update:sortDesc",
  "update:selected",
]);

const select = (target) => {
  if (props.selected.includes(target)) {
    const newAry = props.selected.filter((i) => i !== target);
    emit("update:selected", newAry);
  } else {
    const newAry = [...props.selected, target];
    emit("update:selected", newAry);
  }
};
const sort = (sortBy) => {
  if (props.sortBy === sortBy) {
    emit("update:sortDesc", !props.sortDesc);
  } else {
    emit("update:sortBy", sortBy);
    emit("update:sortDesc", true);
  }
};
</script>

<template>
  <v-table :key="JSON.stringify(items)" :hover="true">
    <thead>
      <tr>
        <th
          @click="
            () => {
              sort(item.value);
            }
          "
          v-for="item of headers"
          :key="item.value"
          class="text-left cursor"
        >
          {{ item.text }}
          <v-icon :class="{ invisible: item.value !== sortBy }"
            >mdi-arrow-{{ sortDesc ? "down" : "up" }}</v-icon
          >
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        @click="() => select(item[itemKey])"
        v-for="item of items"
        :class="{ selected: selected.includes(item[itemKey]) }"
        :key="item[itemKey]"
      >
        <td v-for="context of item">{{ context }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped lang="scss">
:deep(table) {
  table-layout: fixed;
}
thead {
  tr {
    cursor: pointer;
  }
}
tbody {
  tr {
    cursor: pointer;

    &:nth-child(odd) {
      background: #fafafa;
    }

    &:nth-child(even) {
      background: #fff;
    }
    &.selected {
      background: #eff5ff;
    }
  }
}
.invisible {
  visibility: hidden;
}
</style>
