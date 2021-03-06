<template>
  <div>
    <v-layout wrap justify-start>
      <v-flex xs12 sm12 md4>
        <v-label>Session</v-label>
        <v-select
          v-model="settings.distance"
          v-validate="'required'"
          :error-messages="errors.collect('race distance')"
          name="race distance"
          :items="distances"
          label="Race Distance"
        ></v-select>
        <v-select
          v-model="settings.qFormat"
          v-validate="'required'"
          :error-messages="errors.collect('q format')"
          name="q format"
          :items="qFormats"
          label="Qualification Format"
        ></v-select>
        <v-text-field
          v-model="settings.aiDifficulty"
          v-validate="'required|numeric'"
          name="ai difficulty"
          type="number"
          :error-messages="errors.collect('ai difficulty')"
          label="AI Difficulty"
          suffix="%"
        ></v-text-field>
        <v-select
          v-model="settings.weather"
          v-validate="'required'"
          :error-messages="errors.collect('weather')"
          name="weather"
          :items="weatherItems"
          label="Weather"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm12 md8>
        <v-flex>
          <v-container pt-0>
            <v-label>Assists</v-label>
            <v-layout wrap justify-start>
              <v-flex>
                <v-switch
                  color="red"
                  :label="`Traction Control - ${statusLabel(settings.assists.tractionControl)}`"
                  v-model="settings.assists.tractionControl"
                ></v-switch>
                <v-switch
                  color="red"
                  :label="`ABS - ${statusLabel(settings.assists.antiLockBrakes)}`"
                  v-model="settings.assists.antiLockBrakes"
                ></v-switch>
                <v-switch
                  color="red"
                  :label="`Gearbox - ${gearboxLabel}`"
                  v-model="settings.assists.gearboxManual"
                ></v-switch>
                <v-switch
                  color="red"
                  :label="`ERS Mode - ${ERSmodeLabel}`"
                  v-model="settings.assists.ERSModeAuto"
                ></v-switch>
              </v-flex>
              <v-flex>
                <v-switch
                  color="red"
                  :label="`Racing Line - ${statusLabel(settings.assists.racingLine)}`"
                  v-model="settings.assists.racingLine"
                ></v-switch>
                <v-switch
                  color="red"
                  :label="`Pitlane Assist - ${statusLabel(settings.assists.pitAssist)}`"
                  v-model="settings.assists.pitAssist"
                ></v-switch>
                <v-switch
                  color="red"
                  :label="`Pit Release Assist - ${statusLabel(settings.assists.pitReleaseAssist)}`"
                  v-model="settings.assists.pitReleaseAssist"
                ></v-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-btn :disabled="!isValid" color="primary" @click="nextStep">Continue</v-btn>
    <v-btn flat @click="$emit('backStep')">Back</v-btn>
  </div>
</template>

<script>
export default {
  name: 'F1GameSettings',
  data() {
    return {
      isValid: false,
      distances: ['3 laps', '5 laps', '25%', '50%', '100%'],
      qFormats: ['1 lap', 'Short - 15min', 'Full', 'No Qualification'],
      weatherItems: ['Dinamic', 'Custom'],
      settings: {
        qFormat: '',
        aiDifficulty: 50,
        weather: 'Dinamic',
        distance: '50%',
        assists: {
          tractionControl: false,
          antiLockBrakes: false,
          gearboxManual: false,
          racingLine: false,
          pitReleaseAssist: false,
          pitAssist: false,
          ERSModeAuto: false
        }
      }
    }
  },
  created() {
    this.settings.qFormat = this.qFormats[0]
  },
  watch: {
    settings: {
      handler: function(newValue) {
        this.validate()
      },
      deep: true
    }
  },
  computed: {
    gearboxLabel() {
      return this.settings.assists.gearboxManual ? 'Automatic' : 'Manual'
    },
    ERSmodeLabel() {
      return this.settings.assists.ERSModeAuto ? 'Automatic' : 'Manual'
    }
  },
  methods: {
    statusLabel(state) {
      return state ? 'On' : 'Off'
    },
    nextStep() {
      this.$validator.validate().then(result => {
        if (result) {
          this.$emit('nextStep', this.settings, 'settings')
        }
      })
    },
    validate(scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.isValid = true
        } else {
          this.isValid = false
        }
      })
    }
  }
}
</script>