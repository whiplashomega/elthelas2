function newCampaign () {
  return {
    title: "New Campaign",
    buildmode: true,
    chapters: [
      newChapter()
    ],
    playercharacters: [],
    url: "",
    npcs: []
  };
}

function newChapter () {
  return {
    id: Math.random(),
    title: "New Chapter",
    encounters: [],
    buildmode: true,
    sections: []
  };
}

export { newCampaign, newChapter };
