<script setup>
import { ref, computed } from "vue";
import DataTable from "./components/DataTable.vue";
import { factories, employeeType, employees, tasks } from "./data";

// Q1
const cloneFactories = JSON.parse(JSON.stringify(factories));
const sortedFactory = cloneFactories.map((factory) => {
  factory.employees?.sort();
  return factory;
});

// Q2
const contactedEmployees = employees.map((employee) => {
  const {
    name: work_type,
    work_begin,
    work_end,
  } = employeeType.find((i) => i.id === employee.type);
  return {
    name: employee.name,
    work_type,
    work_begin,
    work_end,
  };
});

const checkIsInWorkingHours = (dayTime, beginTime, endTime) => {
  const date = new Date().toDateString();
  const query = +new Date(date + " " + dayTime);
  const begin = +new Date(date + " " + beginTime);
  const end =
    endTime === "00:00:00"
      ? +new Date(date + " " + endTime) + 1000 * 60 * 60 * 24
      : +new Date(date + " " + endTime);
  return begin <= query && query <= end;
};

const countWorkingEmployees = (dayTime) => {
  const regex = /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
  if (!regex.test(dayTime))
    throw new Error('The parameter dayTime requires in "hh:mm:ss" format');

  return contactedEmployees.reduce((prev, cur) => {
    const isInWorkingHours = checkIsInWorkingHours(
      dayTime,
      cur.work_begin,
      cur.work_end
    );
    prev += +isInWorkingHours;
    return prev;
  }, 0);
};

console.log("Working employees: ", countWorkingEmployees("15:00:00"));

// Q3
const employeesSortBy = ref("name");
const employeesSortDesc = ref(false);
const selectedEmployees = ref([]);

const currentPage = ref(1);
const pageSize = ref(5);
const pageSizeOption = [5, 10, 25];
const totalPages = computed(() => {
  return Math.ceil(contactedEmployees.length / pageSize.value);
});
const paginatedEmployees = computed(() => {
  return contactedEmployees.reduce((prev, cur, index) => {
    const page = Math.ceil((index + 1) / pageSize.value);
    if (prev[page]) {
      prev[page].push(cur);
    } else {
      prev[page] = [cur];
    }
    return prev;
  }, {});
});

const displayedEmployeesHeaders = [
  { text: "Name", value: "name" },
  { text: "Work Time", value: "work_type" },
  { text: "Start Time", value: "work_begin" },
  { text: "End Time", value: "work_end" },
];
const displayedEmployeesItems = computed(() => {
  const list = paginatedEmployees.value[currentPage.value];
  return list.sort((a, b) => {
    const key = employeesSortBy.value;
    const order = a[key] === b[key] ? 0 : a[key] > b[key] ? 1 : -1;
    const direction = employeesSortDesc.value ? 1 : -1;
    return order * direction;
  });
});

// Q4
const tasksSortBy = ref("title");
const tasksSortDesc = ref(false);
const selectedTasks = computed(() => {
  return displayedTasksItems.value
    .filter((task) => selectedEmployees.value.includes(task.assign))
    .map((i) => i.title);
});
const displayedTasksHeaders = [
  { text: "Title", value: "title" },
  { text: "Duration", value: "duration" },
  { text: "Assign", value: "assign" },
];
const displayedTasksItems = computed(() => {
  return tasks
    .map((i) => ({
      title: i.title,
      duration: i.duration,
      assign: i.assign,
    }))
    .sort((a, b) => {
      const key = tasksSortBy.value;
      const order = a[key] === b[key] ? 0 : a[key] > b[key] ? 1 : -1;
      const direction = tasksSortDesc.value ? 1 : -1;
      return order * direction;
    });
});
</script>

<template>
  <v-container>
    <v-card title="Employee" outlined>
      <DataTable
        itemKey="name"
        v-model:sortBy="employeesSortBy"
        v-model:sortDesc="employeesSortDesc"
        v-model:selected="selectedEmployees"
        :items="displayedEmployeesItems"
        :headers="displayedEmployeesHeaders"
      ></DataTable>
      <v-card-actions>
        <v-select
          v-model="pageSize"
          :hide-details="true"
          :items="pageSizeOption"
        ></v-select>
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="1"
        ></v-pagination>
      </v-card-actions>
    </v-card>
    <v-card title="Task" outlined class="mt-4">
      <DataTable
        itemKey="title"
        v-model:sortBy="tasksSortBy"
        v-model:sortDesc="tasksSortDesc"
        :selected="selectedTasks"
        :items="displayedTasksItems"
        :headers="displayedTasksHeaders"
      ></DataTable>
    </v-card>
  </v-container>
</template>

<style scoped lang="scss">
:deep(.v-input) {
  display: inline-flex;
  justify-content: flex-end;
}
</style>
