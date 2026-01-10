export const menuItems = [
  {
    label: "Actividades",
    icon: "book-outline",
    route: null,
    subMenu: [
      { label: "Tareas", route: "/actividades/tareas" },
      { label: "Foros", route: "/actividades/foros" },
    ],
  },
  {
    label: "Calendario",
    icon: "calendar-outline",
    route: "/calendario",
    subMenu: [],
  },
  {
    label: "Seguridad",
    icon: "settings-outline",
    route: null,
    subMenu: [
      { label: "Gestión de usuarios", route: "/seguridad/usuarios" },
      { label: "Gestión de roles", route: "/seguridad/roles" },
    ],
  },
];
