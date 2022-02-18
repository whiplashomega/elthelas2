import { defineStore } from 'pinia';
import globals from './globals.js';
import user from './user.js';
import statics from './statics.js';
import campaigns from './campaigns.js';
import characters from './characters.js';
import creatures from './creatures.js';
import encounters from './encounters.js';

const useGlobalsStore = defineStore('global', globals);
const useUserStore = defineStore('user', user);
const useStaticsStore = defineStore('static', statics);
const useCampaignStore = defineStore('campaign', campaigns);
const useCharacterStore = defineStore('character', characters);
const useCreatureStore = defineStore('creature', creatures);
const useEncounterStore = defineStore('encounter', encounters);

export {
  useGlobalsStore, useUserStore, useStaticsStore, useCampaignStore, useCharacterStore, useCreatureStore, useEncounterStore
}