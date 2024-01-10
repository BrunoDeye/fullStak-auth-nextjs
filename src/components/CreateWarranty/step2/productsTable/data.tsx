import React from "react";
const columns = [
  {name: "Nº", uid: "id"},
  {name: "TIPO", uid: "type"},
  {name: "MODELO", uid: "model"},
  {name: "Nº DE SÉRIE", uid: "serialNumber"},
  {name: "ALERTA", uid: "alert"},
  {name: "DESCRIÇÃO", uid: "description"},
  {name: "", uid: "actions"},
];

const users = [
  {
    id: 1,
    model: "SUN-3.6K-SG04LP1-EU",
    serialNumber: "2106097430",
    type: "Híbrido",
    description: "ta zoado",
    alert: "AC CONNECTOR",

  },
  {
    id: 2,
    model: "SUN500G3-US-220",
    serialNumber: "2106097430",
    type: "Micro",
    description: "Deu pau",
    alert: "AC CONNECTOR",
  },
];

export {columns, users};
