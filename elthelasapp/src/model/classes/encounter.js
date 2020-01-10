export default function () {
  return {
    id: Math.random(),
    name: "",
    text: "",
    treasure: "",
    link: "",
    image: "",
    prereq: "",
    environment: "",
    tier: "",
    random: true,
    complete: false,
    subencounter: [],
    sessionnotes: ""
  };
}
