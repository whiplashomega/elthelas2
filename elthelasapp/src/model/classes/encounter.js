export default function () {
  return {
    id: Date.now(),
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
