const titlesMap = {
  authorAddress: "Endereço de Cadastro",
  colectAddress: "Endereço de Coleta",
  returnAddress: "Endereço de Devolução",
};

export const mapTitles = (key: keyof typeof titlesMap) => titlesMap[key];
