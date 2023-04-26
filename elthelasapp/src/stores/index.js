import { defineStore } from 'pinia';
import globals from './globals.js';
import user from './user.js';
import statics from './staticStore.js';
import staticsv2 from './staticStorev2.js';
import campaigns from './campaignStore.js';
import characters from './characterStore.js';
import charactersv2 from './characterStorev2.js';
import creatures from './creatureStore.js';
import strongholds from './strongholds.js';
import npcs from './npcStore.js';
import history from './historyStore.js';
import world from './worldStore.js';

const useGlobalsStore = defineStore('global', globals);
const useUserStore = defineStore('user', user);
const useStaticsStore = defineStore('static', statics);
const useStaticsStorev2 = defineStore('staticv2', staticsv2);
const useCampaignStore = defineStore('campaign', campaigns);
const useCharacterStore = defineStore('character', characters);
const useCharacterv2Store = defineStore('characterv2', charactersv2);
const useCreatureStore = defineStore('creature', creatures);
const useStrongholdStore = defineStore('stronghold', strongholds);
const useNPCStore = defineStore('npc', npcs);
const useHistoryStore = defineStore('history', history);
const useWorldStore = defineStore('world', world);
export {
  useGlobalsStore, useUserStore, useStaticsStore, useCampaignStore, useCharacterStore, useCharacterv2Store, useCreatureStore, useStrongholdStore, useNPCStore, useHistoryStore, useWorldStore, useStaticsStorev2
};