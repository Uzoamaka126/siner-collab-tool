<template>
  <div class="input-search-select" v-click-outside="hideDropdown">
    <div class="input-wrap">
        <input 
            :disabled="disabled" 
            v-model="computedEmail" 
            @click="showDropdown" 
            @keyup="waitTillTypingIsDone" 
            type="email" 
            placeholder="Enter Email Address" 
            class="form-control form-control-sm"
        >  
        <span v-if="loading">
        </span>  
    </div>
    <div class="input__dropdown" v-show="dropDownIsShown">
      <div class="input__dropdown__items">
        <div :class="clients.length ? 'input__dropdown__item no_client' : 'input__dropdown__item client'">
            <span class="add__client--email">
                <span class="flex ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: #fff;transform: ;msFilter:;">
                        <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                    </svg>
                </span>
                <span>{{ email }}</span>
            </span>
        </div>
        <div v-if="clients.length > 0">
            <div @click="selectClient(client)" :key="client.id" v-for="client in clients" class="input__dropdown__item">
                <span style="color: #1a1f36">{{ client.full_name }} </span> - <span style="color: #697386">{{ client.email }}</span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { transformQueryToString } from '../../../utils/apiFunctions';

/**
 * This component adds a new client or shows a list of existing clients
 */
export default {
    name: 'SearchClientInput',
    props: {
        disabled: { type: Boolean, default: false },
        selection: { type: Object, default: undefined },
    },

    model: {
        prop: "selection",
        event: "change"
    },

    data() {
        return {
        clients: [],
        updatedSelection: this.selection,
        dropDownIsShown: false,
        loading: true,
        typingInput: null,
        }
    },

    computed: {
        computedEmail: {
        get: function() {
            if( this.updatedSelection === undefined ) return "";
            else return this.updatedSelection.email;
        },

        set: function(emailInput) {
            // remove whitespaces.
            emailInput = emailInput.trim();

            // If no email was entered, set the customer to undefined.
            if( emailInput.length === 0 ) {
            this.updatedSelection.email = "";
            this.updatedSelection.client = undefined;
            this.$emit( "change", this.updatedSelection );
            return;
            }

            // Update the reactive customer based on the email.
            const getClient = this.clients.find( client => client.email === emailInput );
            
            // If the email is not found while searching, let the user add that email as a new email
            if( getClient === undefined ) {
            this.updatedSelection.email = emailInput;
            this.updatedSelection.customer = undefined;
            this.$emit( "change", this.updatedSelection );
            }

            else {
            this.updatedSelection.email = getClient.email;
            this.updatedSelection.customer = getClient;
            this.$emit( "change", this.updatedSelection );
            }
        },
        },
    },

    watch: {
        selection(newVal) {
        this.updatedSelection = newVal;
        },
    },

    methods: {
        selectClient(client) {
        this.updatedSelection.client = client;
        this.updatedSelection.email = client.email;
        this.$emit( "change", this.updatedSelection )
        this.hideDropdown();
        },
        /**
         * This is so you're not sending multiple requests to the server.
         */
        waitTillTypingIsDone() {
            clearTimeout( this.typingInput );
            /**
             * Only make a search request after 800 milliseconds.
             */
            this.typingInput = setTimeout( this.searchClients, 500 )
        },

        searchClients() {
            const query = this.email.trim();
            if( query.length < 1 ) return;
            const url = transformQueryToString("/clients", { email: query });
            this.loading = true;
            // this.$http.get( url ).then(({ ok, data }) => {
            //     this.clients = data.data.clients;
            //     this.loading = false;
            // });
        },

        fetchClients() {
            // this.$http.get("/clients").then(({ ok, data }) => {
            //     if( ok !== true ) return console.error( "Unable to fetch clients" );
            //     this.clients = data.data.clients;
            //     this.loading = false;
            // });
        },

        hideDropdown() {
            this.dropDownIsShown = false;
        },

        showDropdown() {
            this.dropDownIsShown = true;
        }
    },

    created() {
        this.fetchClients();
    },
}
</script>

<style lang="scss" scoped>
    .input-search-select {
        position: relative;
    }

  .input__dropdown {
    width: 100%;
    margin-top: 5px;
    background-color: #ffffff;
    position: absolute;
    z-index: 1;
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
    border: solid 1px #c4cdd5;
  }

  .input__dropdown__items {
    padding: 10px 0;
  }

  .input__dropdown__item {
    padding: 5px 10px;
    cursor: pointer;
  }
  .add__client--email {
       padding: 5px;
        
        &.no_client {
            background-color: #596dde;
            color: #f2f2f2;
        }
        &.client {
            background-color: transparent;
            color: #1a1f36;
        }
  }
</style>
