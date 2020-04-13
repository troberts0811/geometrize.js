<template>
    <div id="main">
        <main>
            <div id="geometrize-wrapper">
                <canvas id="geometrize"></canvas>
                <div id="message" class="window" v-if="!IsDismissed">
                    <h1>Welcome to Geometrize</h1>
                    <p>This is a little plugin to make a triangular gradient using canvas. The colours and grid sizing is controlled by the settings below for you to customise.</p>
                    <p>Use the get config button to get any configuration you would like to use for yourself.</p>
                    <p>For more information, check out the <a href="" target="_blank">docs</a>.</p>
                    <button type="button" @click="dismissMessage">Dismiss</button>
                </div>
                <div id="configWindow" class="window" v-if="isConfigOpen">
                    <h2>Get Your Config</h2>
                    <p>Use the config below to pass into the geometrize constructor in order to get this look and effects.</p>
                    <textarea id="configCode" rows="8" :value="GeometrizeConfigString" readonly />
                    <button type="button" v-bind:class="{copied: isCopied}" @click="CopyContents">Copy</button>
                    <button type="button" @click="toggleConfig">Close</button>
                </div>
                <div id="colorWindow" :class="{hide:!ColourStatus.IsOpen}"> 
                </div>
            </div>
        </main>
        <aside v-bind:class="{close: !menuOpen}">
            <div class="side-content">
                <geometrize-settings v-bind:config="GeometrizeConfig" v-on:config-update="UpdateConfig"></geometrize-settings>
            </div>
        </aside>
    </div>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    import Picker from 'vanilla-picker';
    import helpers from 'geometrize/helpers';

    export default {
        name: "geometrize-demo",
        data(){
            return{
                isCopied: false
            }
        },
        computed: {
            GeometrizeConfig(){
                return this.$store.state.geometrizeConfig;
            },
            GeometrizeConfigString(){
                return JSON.stringify(this.$store.state.geometrizeConfig, undefined, 4);
            },
            Geometrize(){
                return this.$store.state.geometrize;
            },
            menuOpen(){
                return this.$store.state.menuOpen;
            },
            IsDismissed(){
                return this.$store.state.isDismissed;
            },
            isConfigOpen(){
                return this.$store.state.isConfigOpen;
            },
            ColourStatus(){
                return this.$store.state.colourStatus;
            }
        },
        methods:{
            UpdateConfig: function(payload){
                

                let dataStructure = {};
                let dataValue = Object.values(payload)[0];
                let keyNames = Object.keys(payload)[0].split(".");
                let arrayParts = [];
                let currentVal = null;
                
                if(keyNames.filter(key => /^[0-9]+$/.test(key)).length){
                    currentVal = {...this.GeometrizeConfig};
                    arrayParts = [...keyNames].slice(keyNames.indexOf(keyNames.filter(key => /^[0-9]+$/.test(key))[0]));
                    keyNames.splice(keyNames.indexOf(keyNames.filter(key => /^[0-9]+$/.test(key))[0]));
                    keyNames.forEach(key => {
                        currentVal = currentVal[key];
                    });
                    //ideally loop between all values but I know in current config can only be max 2 levels at this point
                    currentVal[arrayParts[0]][arrayParts[1]] = Object.values(payload)[0];
                    dataValue = currentVal;
                }

                for(let i = keyNames.length - 1; i >=0; i--){
                    dataStructure = {[keyNames[i]]: dataValue};
                    dataValue = dataStructure;
                }

                this.mutateGeometrizeConfig(dataStructure);
            },
            CopyContents: function(){
                let code = document.getElementById("configCode");
                code.select();
                code.setSelectionRange(0, 99999);
                document.execCommand("copy");
                this.isCopied = true;
                setTimeout(() => {
                    this.isCopied = false;
                }, 1000);
            },
            ...mapMutations([
                'setGeometrize',
                'setGeometrizeId',
                'mutateGeometrizeConfig'
            ]),
            ...mapActions([
                'toggleConfig',
                'dismissMessage',
                'setColourStatus',
                'setPicker'
            ])
        },
        created(){
            this.setGeometrizeId("geometrize");
        },
        mounted(){
            this.setGeometrize();
            let picker = new Picker({
                parent: document.getElementById('colorWindow'),
                alpha: false,
                popup: false,
                onDone: () => {
                    this.setColourStatus(null);
                },
                onChange: (color) => {
                    if(this.ColourStatus.Field !== null){
                        this.UpdateConfig({[this.ColourStatus.Field]: helpers.convertRGBStringToHex(color.rgbString)});
                    }
                }
            });
            this.setPicker(picker);
        }
    }
</script>

<style lang="sass">
    *{
        box-sizing: border-box;
    }

    ::selection {
        color: none;
        background: none;
    }

    ::-moz-selection {
        color: none;
        background: none;
    }

    html, body{
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }

    html{
        overflow-y: hidden;
    }

    body{
        overflow-y: auto;
        font-size: 100%;
        font-family: courier, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: #f2f2f2;
    }

    #main, #geometrize-wrapper{
        height: 100%;
    }

    main{
        height: 100%;
    }

    aside{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        transform: translateX(0);
        transition: transform 0.5s ease-in-out;
        box-sizing: border-box;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        max-height: 100vh;

        &.close{
            transform: translateY(calc(100% - 3rem - 1px));

            & .open-button{
                &:before{
                    transform: translate(-50%, -50%) translateX(-3.3px) rotate(-55deg);
                }

                &:after{
                    transform: translate(-50%, -50%) translateX(3.3px) rotate(55deg);
                }
            }
        }

        .open-button{
            position: absolute;
            top: 0;
            left: 0;
            width: 3rem;
            height: 3rem;
            border-right: 1px solid #f2f2f2;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;

            &:before, &:after {
                content: '';
                width: 0.75em;
                height: 1px;
                background: #f2f2f2;
                position: absolute;
                top: 50%;
                left: 50%;
                transition: transform 0.5s ease-in-out;
            }

            &:before {
                transform: translate(-50%, -50%) translateX(-3.3px) rotate(55deg);
            }

            &:after {
                transform: translate(-50%, -50%) translateX(3.3px) rotate(-55deg);
            }
        }

        .side-content{
            background: rgba(60, 60, 60, 0.6);
            border: 1px solid #f2f2f2;
            width: 100%;
        }
    }

    #geometrize-wrapper{
        position: relative;
        canvas{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height:100%;
        }
    }

    #message, #configWindow{
        border:  1px solid #f2f2f2;
        position: absolute;
        top: 2.5em;
        left: 50%;
        transform: translateX(-50%);
        padding: 1.5em;
        width: 300px;
        background: rgba(60, 60, 60, 0.6);
        text-align: center;
        z-index: 1;
    }

    textarea{
        display: block;
        width: 100%;
        overflow: scroll;
        white-space: pre-wrap;
        background: #363636;
        border: 1px solid #b3b3b3;
        color: inherit;
        outline: none;
        margin: 1em 0;
    }

    p{
        font-size: 13px;
        a{
            color: inherit;
        }
    }

    button.copied:after{
        content: 'Copied!';
        position: absolute;
        top: calc(100% + 0.6em);
        left: -12.5%;
        width: 125%;
        text-align: center;
        border: 1px solid #f2f2f2;
        padding: 0.5em 0;
        line-height: 1.4em;
        height: 1.4em;
        color: #f2f2f2;
        background: rgba(60, 60, 60, 0.6);
        font-weight: 700;
        animation-name: fade-out;
        animation-duration: 0.3s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-timing-function: linear;
        animation-delay: 0.6s;
        opacity: 1;
        outline:none;
    }

    .hide{
        display: none;
    }

    #colorWindow {
        position: fixed;
        top: 2em;
        left: 50%;
        transform: translateX(-50%);
    }

    @media screen and (max-width: 800px){
        aside {
            right: 0;
            width: auto;
            left: unset;
        }
    }

    @media screen and (max-width: 600px){
        aside{
            width: 100%;
        }
    }

    @keyframes fade-out{
        0%{
            opacity: 1;
        }

        100%{
            opacity: 0;
        }
    }
</style>
