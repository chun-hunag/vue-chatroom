import { createStore} from 'vuex';

export default createStore({
    state: {
        socket: {
            connection: null,
            // Connection Status
            isConnected: false,
            // Message content
            message: "",
            // Reconnect error
            reconnectError: false,
            // Heartbeat message sending time
            heartBeatInterval: 50000,
            // Heartbeat timer
            heartBeatTimer: 0,
        }
    },
    getters: {
        connectionState(state) {
          return state.socket.connection.readyState
        }
    },
    mutations: {
        // Connection open
        SOCKET_ONOPEN(state, url) {
            state.socket.isConnected = true
            state.socket.connection = new WebSocket(url)
            // When the connection is successful, start sending heartbeat messages regularly to avoid being disconnected by the server
            // state.socket.heartBeatTimer = setInterval(() => {
            //   const message = "Heartbeat message";
            //   state.socket.isConnected &&
            //     main.config.globalProperties.$socket.sendObj({
            //       code: 200,
            //       msg: message
            //     });
            // }, state.socket.heartBeatInterval);
        },
        // Connection closed
        SOCKET_ONCLOSE(state, event) {
            state.socket.isConnected = false
            // Stop the heartbeat message when the connection is closed
            // clearInterval(state.socket.heartBeatTimer);
            // state.socket.heartBeatTimer = 0;
            console.log("The line is disconnected: " + new Date())
            console.log(event)
        },
        // An error occurred
        SOCKET_ONERROR(state, event) {
            console.error(state, event);
        },
        // Receive the message sent by the server
        SOCKET_ONMESSAGE(state, message) {
            console.log('on message')
            state.socket.connection.onmessage = message
        },
        // Send the message
        SOCKET_SEND_MESSAGE(state, message) {
            state.socket.connection.send(message)
        },
        // Auto reconnect
        SOCKET_RECONNECT(state, count) {
            console.info("Message system reconnecting...", state, count)
        },
        // Reconnect error
        SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true
        }
    },
    actions: {

    },
    modules: {}
  });