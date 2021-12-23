<template>
    <div class="email--wrap">
        <!-- we need to have a list where we can store and then loop through the emails a user adds  -->
        <div class="email--item" v-for="(item, i) in enteredEmailList" :key="i">
            <span class="inlineBlock">{{ item }}</span>
            <span @click="removeSingleEmail(i)" class="cursor-pointer inline-block">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.25837 4.02991L1.08967 0.861205C0.892799 0.664505 0.892799 0.345351 1.08967 0.14865C1.28654 -0.0482175 1.60535 -0.0482175 1.80222 0.14865L4.97092 3.31735L8.13979 0.14865C8.33666 -0.0482175 8.65548 -0.0482175 8.85235 0.14865C9.04922 0.345351 9.04922 0.664505 8.85235 0.861205L5.68348 4.02991L8.85235 7.19861C9.04922 7.39531 9.04922 7.71446 8.85235 7.91116C8.75391 8.00943 8.62491 8.05865 8.49607 8.05865C8.36723 8.05865 8.23823 8.00943 8.13979 7.911L4.97092 4.74229L1.80222 7.911C1.70379 8.00943 1.57478 8.05865 1.44594 8.05865C1.31711 8.05865 1.1881 8.00943 1.08967 7.911C0.892799 7.7143 0.892799 7.39514 1.08967 7.19844L4.25837 4.02991Z" fill="#696969"/>
                </svg>
            </span>
        </div>
        <span class="email--input">
            <input 
                ref="editableText" 
                @blur="addCurrentEmailOnBlur" 
                v-if="!isEmailListLimitReached" 
                placeholder="Add another email" 
                contenteditable="true" 
                v-model="singleEmailValue"
                @keydown="handleEmailKeyDown" 
                :class="[ enteredEmailList.length === 0 ? 'editable-text--fat-padding' : 'editable-text--narrow-padding'  ]" 
                class="form-control editable-text" 
                maxlength="23" 
                @paste="handlePasteInput" 
                rows="1"
            />
        </span>
        <!-- </input> -->
    </div>
</template>

<script>

export default {
    name: 'InputMultipleEmails',
    components: {},
    created() {},
    data() {
        return { 
            enteredEmailList: [],
            existingEmailList: this.dropdownFields,
            singleEmailValue: "",
            emailListLimit: 3,
        }
    },

    computed: {
       isEmailListLimitReached() {
            return this.enteredEmailList.length >= this.emailListLimit;
        }
    },

    methods: {
        preventKeys (event) {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 190 || event.keyCode == 37 || event.keyCode == 39) {
            } else {
                return event.preventDefault();
            }
        },
        resetEmailInput() {
            this.singleEmailValue = '';
        },
        removeSingleEmail(idx) {
            // this.enteredEmailList = this.enteredEmailList.filter(item => item !== val);
            // let's do this removal by index instead
            this.enteredEmailList = this.enteredEmailList.filter((item, index) => index !== idx);
        },
        addCurrentEmailOnBlur() {
            const getCurrentlyTypedEmail = this.singleEmailValue.trim();
            if (getCurrentlyTypedEmail.length === 0) return;

            this.enteredEmailList.push(getCurrentlyTypedEmail);
            this.resetEmailInput();
        },
        validateTextLength(val) {
            const input = val || "";
            if (input.length >= 50) return false;
            else return true;
        },
        handleEmailKeyDown(e) {
            console.log(e);
            const getEmailTextTrimmed = e.target.innerText.trim();
            this.$emit( "typing", getEmailTextTrimmed);

            console.log(getEmailTextTrimmed);
            /* 
                We want to be able to add a newly typed email when a user hits any of the following keys: space, enter or  a comma key
                So, we are going to store a list of keys that holds the key code of each of the above keys
            */
            const allowedKeyCodes = [188, 32, 13, 9 ];
            const filteredAllowedKeyCodes = allowedKeyCodes.includes(e.keyCode);

            /* We also want users to erase an entered email by pressing the backspace key*/
            const isBackSpaceKey = e.keyCode === 8;
            if(isBackSpaceKey && getEmailTextTrimmed === "") {
                const getLastItem = this.enteredEmailList.length - 1;
                this.removeSingleEmail(getLastItem);
            }

            /* We also want to set a limit for the number of client emails to be entered */
            const emailLengthIsValid = this.validateTextLength(getEmailTextTrimmed);
            if(!emailLengthIsValid && !filteredAllowedKeyCodes && !isBackSpaceKey) return e.preventDefault();

            if(filteredAllowedKeyCodes && getEmailTextTrimmed.length === 0) {
                e.preventDefault();
                return;
            }

            else if(filteredAllowedKeyCodes) { 
                e.preventDefault();
                this.enteredEmailList.push(getEmailTextTrimmed);
                this.$emit("select", getEmailTextTrimmed);
                this.resetEmailInput();
                // this.hideDropdownFields();
            }
        },
        handlePasteInput(e) {
            const clipboardData = e.clipboardData || window.clipboardData;
            const value = clipboardData.getData('Text');

            const lengthIsValid = this.validateTextLength(value);
            if(!lengthIsValid) return e.preventDefault();
        }
    },
    watch: {
    }
}
</script>

<style lang="scss" scoped>
.email {
    &--item {
        display: flex;
        align-items: center;
        flex-grow: 1;
        background: #c7d2f5;
        border-radius: 50px;
        padding: 3px 5px;
        justify-content: center;
        font-size: 14px;
        margin-right: 5px;

        span {
            &:first-of-type {
                margin-right: 5px;
            }
        }
    }
    &--input {
        flex-grow: 7;
    }
    &--wrap {
        display: flex;
        align-items: center;
    }
}
</style>