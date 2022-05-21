<template>
    <div id="log"></div>
    <form id="form">
        <input type="text" id="msg" size="64" autofocus/>
        <button type="button" @click="send">Send</button>
    </form>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        // const conn = ref(null)
        const store = useStore()
        // const connection = store.state.connection
        const log = ref(null) 
        const msg = ref('')
        const params = window.location.href.split("/");
        const roomId = params[params.length - 1]
        console.log(store)
        console.log("roomId: " + roomId)

        onMounted(() => {
            if (window["WebSocket"]) {
                let url = "ws://" + document.location.host + "/ws/" + roomId
                console.log(url)
                store.commit('SOCKET_ONOPEN', url)
                store.commit(
                    'SOCKET_ONMESSAGE',
                    (evt) => {
                        let messages = evt.data.split('\n')
                        for (let i = 0; i < messages.length; i++) {
                            let item = document.createElement("div")
                            item.innerText = messages[i]
                            appendLog(item)
                        }
                    }
                )

            } else {
                let item = document.createElement("div")
                item.innerHTML = "<b>Your browser does not support WebSockets.</b>"
                appendLog(item)
            }

            log.value = document.getElementById("log")
            msg.value = document.getElementById("msg")
            console.log('mounted')
        })

        const appendLog = (item) => {
            let doScroll = log.value.scrollTop > log.value.scrollHeight - log.value.clientHeight - 1
            log.value.appendChild(item)
            if (doScroll) {
                log.value.scrollTop = log.value.scrollHeight - log.value.clientHeight
            }
        }

        const send = () => {
            store.commit('SOCKET_SEND_MESSAGE', msg.value.value), 
            msg.value.value = ""
            return false;
        }

        return {
            store, log, msg, roomId,
            appendLog, send
        };
    },
    methods: {
    },
    watch: {
    }
}
</script>

<style>
    html {
        overflow: hidden;
    }

    body {
        overflow: hidden;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        background: gray;
    }

    #log {
        background: white;
        margin: 0;
        padding: 0.5em 0.5em 0.5em 0.5em;
        position: absolute;
        top: 0.5em;
        left: 0.5em;
        right: 0.5em;
        bottom: 3em;
        overflow: auto;
    }

    #form {
        padding: 0 0.5em 0 0.5em;
        margin: 0;
        position: absolute;
        bottom: 1em;
        left: 0px;
        width: 100%;
        overflow: hidden;
    }
</style>