export const factories = [
  { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
  { name: "BR2", employees: ["Jessie", "Karen", "John"] },
  { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
  { name: "BR4", employees: [] },
];

export const employeeType = [
  { id: 1, name: "FullTime", work_begin: "09:00:00", work_end: "17:00:00" },
  { id: 2, name: "MidTime", work_begin: "12:00:00", work_end: "21:00:00" },
  { id: 3, name: "HalfTime", work_begin: "20:00:00", work_end: "00:00:00" },
];

export const employees = [
  { id: 1, name: "Alice", type: 2 },
  { id: 2, name: "Bob", type: 3 },
  { id: 3, name: "John", type: 2 },
  { id: 4, name: "Karen", type: 1 },
  { id: 5, name: "Miles", type: 3 },
  { id: 6, name: "Henry", type: 1 },
];

export const tasks = [
  { id: 1, title: "task01", duration: 60, assign: "Alice" }, // min
  { id: 2, title: "task02", duration: 120, assign: "Bob" },
  { id: 3, title: "task03", duration: 180, assign: "John" },
  { id: 4, title: "task04", duration: 360, assign: "Karen" },
  { id: 5, title: "task05", duration: 30, assign: "Miles" },
  { id: 6, title: "task06", duration: 220, assign: "Henry" },
  { id: 7, title: "task07", duration: 640, assign: "Alice" },
  { id: 8, title: "task08", duration: 250, assign: "Bob" },
  { id: 9, title: "task09", duration: 119, assign: "John" },
  { id: 10, title: "task10", duration: 560, assign: "Karen" },
  { id: 11, title: "task11", duration: 340, assign: "Miles" },
  { id: 12, title: "task12", duration: 45, assign: "Henry" },
  { id: 13, title: "task13", duration: 86, assign: "Henry" },
  { id: 14, title: "task14", duration: 480, assign: "Miles" },
  { id: 15, title: "task15", duration: 900, assign: "Miles" },
];
