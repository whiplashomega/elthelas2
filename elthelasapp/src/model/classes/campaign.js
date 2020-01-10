function newCampaign () {
  return {
    title: "New Campaign",
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
    sections: []
  };
}

export { newCampaign, newChapter };
