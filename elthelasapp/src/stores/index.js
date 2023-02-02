import { defineStore } from 'pinia';
import globals from './globals.js';
import user from './user.js';
import statics from './statics.js';
import campaigns from './campaigns.js';
import characters from './characters.js';
import charactersv2 from './charactersv2.js';
import creatures from './creatures.js';
import creaturesv2 from './creaturesv2.js';
import encounters from './encounters.js';
import strongholds from './strongholds.js';

const useGlobalsStore = defineStore('global', globals);
const useUserStore = defineStore('user', user);
const useStaticsStore = defineStore('static', statics);
const useCampaignStore = defineStore('campaign', campaigns);
const useCharacterStore = defineStore('character', characters);
const useCharacterv2Store = defineStore('characterv2', charactersv2);
const useCreatureStore = defineStore('creature', creatures);
const useCreaturev2Store = defineStore('creaturev2', creaturesv2);
const useEncounterStore = defineStore('encounter', encounters);
const useStrongholdStore = defineStore('stronghold', strongholds);

export {
  useGlobalsStore, useUserStore, useStaticsStore, useCampaignStore, useCharacterStore, useCharacterv2Store, useCreatureStore, useCreaturev2Store, useEncounterStore, useStrongholdStore
};