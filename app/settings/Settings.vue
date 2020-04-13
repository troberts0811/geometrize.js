<template>
    <div id="settings">
        <div class="settings-header" @click="toggleMenu">
            <div class="open-button" />
            <h2>Geometrize Settings</h2>
        </div>
        <div class="settings-body">
            <div v-for="(cItem, cKey, cIdx) in config" :key="cIdx">
                <h3>{{cKey}}</h3>
                <div class="fields">
                    <div v-for="(fVal, fName, fieldInx) in cItem" :key="fieldInx">
                        <geometrize-field :modelName="cKey" :property="fName" :value="fVal" @change="Update" v-on:config-update="Update"></geometrize-field>
                    </div>
                </div>
                <div v-if="cIdx === Object.keys(config).length - 1">
                    <button type="button" class="config-button" @click="toggleConfig">Get Config</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    export default {
        name: "geometrize-settings",
        props: {
            config: Object
        },
        methods:{
            Update: function(val){
                this.$emit('config-update', val);
            },
            ...mapActions([
                'toggleMenu',
                'toggleConfig'
            ])
        }
    }
</script>
<style lang="sass">
    #settings{
        display: flex;
        flex-direction: column;
    }

    .settings-header{
        position: relative;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #f2f2f2;
        cursor: pointer;
    }

    .settings-body{
        display: flex;
        max-height: calc(100vh - 3rem);
        overflow-y: visible;
        & > *{
            flex: 1 0;
            padding: 0 1.15em;
            margin: 1.15em 0;
            &:not(:first-child){
                border-left: 1px solid #f2f2f2;
            }
        }
    }
    
    @media screen and (max-width: 800px){
        .settings-body{
            flex-direction: column;
            overflow-y: auto;
        }

        .settings-header h2{
            padding: 0 1.5rem 0 4.5rem;
        }

        .settings-body > *{
            max-width: 380px;

            &:not(:first-child){
                border-left: none;
            }
        }
    }
</style>
