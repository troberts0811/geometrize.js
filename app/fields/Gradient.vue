<template>
    <div class="multirange">
        <div class="multirange--bar" :style="{background: `linear-gradient(${GradientValue})`}" />
        <div class="multirange--wrapper">
            <div class="multirange--milestones">
                <div class="multirange--milestone" v-for="(milestone, inx) in milestones" :key="inx">
                    <div class="field-colour-wrapper">
                        <button :id="'milestone' + inx" type="button" class="field-colour" :style="{background: milestone.Hex, color: GetTextColor(inx)}" @click="TriggerColourPicker(milestone.Hex, inx)">{{milestone.Hex}}</button>
                    </div>
                    <input type="number" data-field="Position" :value="milestone.Position"  @change="updateMilestone($event,inx)" />
                    <button v-if="milestones.length > 2" class="multirange--milestone--delbtn" type="button" @click="removeMilestone($event, inx)">X</button>
                </div>
            </div>
            <div class="multirange--buttonwrapper">
                <button class="multirange--addmilestone" type="button" @click="addMilestone($event)">Add</button>
            </div>
        </div>
    </div>
</template>
<script>
    import ColourProfile from 'geometrize/models/ColourProfile';
    import helpers from 'geometrize/helpers';
    import { mapActions } from 'vuex';
    export default {
        name: 'geometrize-field-gradient',
        props: {
            model:{
                type: String,
                required: true
            },
            updateFunction: {
                type: Function,
                required: true
            },
            direction: {
                type: String,
                required: true
            },
            milestones: {
                type: Array,
                required: true
            }
        },
        computed:{
            GradientValue(){
                let string = "to right";
                this.milestones.forEach(milestone => {
                    string += `, ${milestone.Hex} ${milestone.Position}%`;
                });

                return string;
            },
            Positions(){
                return this.milestones.map(m => m.Position);
            },
            dragOptions() {
                return {
                    animation: 0,
                    group: "Position",
                    disabled: false,
                    direction: 'horizontal'
                };
            },
            ColourStatus(){
                return this.$store.state.colourStatus;
            }
        },
        methods:{
            ...mapActions([
                'setColourStatus'
            ]),
            TriggerColourPicker:function(val, inx){
                this.setColourStatus(this.model + "." + inx + ".Hex");
                this.ColourStatus.Picker.movePopup({color: val}, true);
            },
            updateMilestone: function(val, index){
                let copy = [...this.milestones];
                copy[index].Position = val.target.value;
                
                this.updateFunction(null, copy);
            },
            addMilestone: function(event){
                this.updateFunction(event, [...this.milestones, new ColourProfile()]);
            },
            removeMilestone:function(event, inx){
                let copy = [...this.milestones];
                copy.splice(inx, 1)
                this.updateFunction(event, copy);
            },
            GetTextColor: function(inx){
                let total = Object.values(helpers.convertHexToRGBObject(this.milestones[inx].Hex)).reduce((a,b) => {
                    return a + b
                }, 0);
                return total <= 382 ? "#FFF" : "#000";
            }
        }
    }
</script>
<style lang="sass">
    .multirange{
        & &--wrapper{
            display: flex;
            align-items: center;
        }

        & &--buttonwrapper{
            flex-grow: 1;
            display: flex;
            justify-content: center;
        }

        & &--bar{
            position: relative;
            padding: 0.75em 0;
            margin-bottom: 0.375em;
        }

        & &--toggle{
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        & &--milestone{
            margin-bottom: 0.375em;
            display: flex;
            & > *:not(:last-child) {
                margin-right: 0.375em;
            }
        }
    }
</style>