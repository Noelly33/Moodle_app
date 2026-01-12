export const menuItems = [
  {
    label: "Inicio",
    icon: "home-outline",
    route: "/",
    subMenu: [],
  },
  {
    label: "Cursos",
    icon: "book-outline",
    route: "/cursos",
    subMenu: [],
  },
  {
    label: "Actividades",
    icon: "list-outline",
    route: null,
    subMenu: [
      { label: "Tareas", route: "/actividades/tareas" },
      { label: "Foros", route: "/actividades/foros" },
    ],
  },
  {
    label: "Ajustes",
    icon: "settings-outline",
    route: "/ajustes",
    subMenu: [],
  },
];
