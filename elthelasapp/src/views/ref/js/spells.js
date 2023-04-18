import { marked } from '@/../node_modules/marked/lib/marked.esm.js';
import { useMeta } from 'vue-meta';
import modal from '@/components/global/modal.vue';
import { useStaticsStore, useUserStore } from '@/stores/index';
import { storeToRefs } from 'pinia';
export default {
  setup () {
    useMeta({ title: "Magic" });
    const statics = useStaticsStore();
    const userinfo = useUserStore();
    const { spellsv2: spells } = storeToRefs(statics);
    return {
      userinfo, spells, marked
    };
  },
  components: {
    modal
  },
  computed: {
    filteredSpells () {
      var textfilters = this.spelltable.filterValue.split(' ');
      let spells = this.spells.filter((a) => {
        let passes = true;
        textfilters.forEach((item) => {
          if (!(a.description.toLowerCase().includes(item.toLowerCase()) ||
                a.title.toLowerCase().includes(item.toLowerCase()) ||
                a.level.toLowerCase().includes(item.toLowerCase()) ||
                a.school.toLowerCase().includes(item.toLowerCase()) ||
                a.castingTime.toLowerCase().includes(item.toLowerCase()) ||
                a.tagsText.toLowerCase().includes(item.toLowerCase()) ||
                a.components.toLowerCase().includes(item.toLowerCase()))) {
            passes = false;
          }
        });
        return passes;
      });
      spells = spells.filter((a) => {
        return a.title.toLowerCase().includes(this.spelltable.titleFilter.toLowerCase()) || this.spelltable.titleFilter === "";
      });
      spells = spells.filter((a) => {
        return a.tags.indexOf(this.spelltable.classFilter) !== -1 || this.spelltable.classFilter === "all";
      });
      spells = spells.filter((a) => {
        return a.level === this.spelltable.levelFilter || this.spelltable.levelFilter === "all";
      });
      spells = spells.filter((a) => {
        return a.school.toLowerCase() === this.spelltable.schoolFilter || this.spelltable.schoolFilter === "all";
      });
      spells = spells.filter((a) => {
        return a.castingTime.toLowerCase().includes(this.spelltable.timeFilter) || this.spelltable.timeFilter === "all";
      });
      spells = spells.filter((a) => {
        let lengthtest = a.duration.toLowerCase().includes(this.spelltable.durationFilter) || this.spelltable.durationFilter === "all";
        let conctest = !a.duration.toLowerCase().includes("concentration") || !this.spelltable.concFilter;
        return lengthtest && conctest;
      });
      spells = spells.filter((a) => {
        let tags = this.spelltable.tagsFilter.split(" ");
        let passes = true;
        tags.forEach((b) => {
          if (!a.tagsText.includes(b)) {
            passes = false;
          }
        });
        return passes;
      }).sort((a, b) => {
        let sortBy = this.spelltable.sortBy;
        if ((a[sortBy] > b[sortBy] & !this.spelltable.sortDesc) || (a[sortBy] < b[sortBy] & this.spelltable.sortDesc)) {
          return 1;
        } else {
          return -1;
        }
      });
      return spells;
    },
  },
  data: function() {
    return {
      spellModalProps: { isActive: false, title: "" },
      spelltable: {
        fields: [
          { key: 'title', label: 'Title', sortable: true },
          { key: 'level', label: 'Level', sortable: true },
          { key: 'school', label: 'School', sortable: true },
          { key: 'castingTime', label: 'Casting Time', sortable: true },
          { key: 'duration', label: 'Duration', sortable: true },
          { key: 'tagsText', label: 'Tags', sortable: true }
        ],
        classFilter: "all",
        levelFilter: "all",
        titleFilter: "",
        schoolFilter: "all",
        timeFilter: "all",
        durationFilter: "all",
        concFilter: false,
        tagsFilter: "",
        filterValue: "",
        sortBy: "title",
        sortDesc: false,
        modalInfo: { title: '', description: '', content: { title: '', level: '', school: '', duration: '', description: '', castingTime: '', tags: [], tagsText: '' } }
      }
    };
  },
  methods: {
    info (item) {
      this.spelltable.modalInfo.title = item.title;
      this.spelltable.modalInfo.content = item;
      this.spelltable.modalInfo.description = marked.parse(this.spelltable.modalInfo.content.description);
      this.spellModalProps.isActive = true;
      this.spellModalProps.title = item.title;
    },
    resetSpellModal () {
      this.spelltable.modalInfo.title = "";
      this.spelltable.modalInfo.content = { title: '', level: '', school: '', duration: '', description: '', castingTime: '', tags: [], tagsText: '' };
    }
  }
};
