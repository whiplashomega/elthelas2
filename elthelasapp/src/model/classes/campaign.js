function newCampaign () {
  return {
    title: "New Campaign",
    chapters: [
      newChapter()
    ],
    playercharacters: [],
    url: ""
  };
}

function newChapter () {
  return {
    id: Math.random(),
    title: "New Chapter",
    encounters: []
  };
}

export { newCampaign, newChapter };
