<template>
    <div class="invoice__wrap">
        <div class="main__content">
            <div class="panel">    
                <div class="panel__content">
                  <div style="margin-top: 1rem; padding-bottom: 3rem;">
                    <div class="row hidden-xs">  
                        <div class="row__left">
                            <div class="row__item">
                                <div v-if="refNo" class="page-title__text">INVOICE #{{ refNo }}</div>
                                <div v-else class="bold">Create Invoice</div>
                            </div>
                        </div>
                        <!-- invoice button actions -->
                        <div class="row__right">
                            <div class="row__item positionRelative">
                                <button @click="previewInvoice()" class="btn btn--secondary btn--sm">Preview Invoice</button>
                            </div>
                            <div class="row__item positionRelative">
                                <button :disabled="requestIsDisabled" @click="saveInvoice()" class="btn btn--secondary btn--sm">Save Invoice</button>
                            </div>
                            <div class="row__item positionRelative">
                                <button :disabled="requestIsDisabled" @click="sendInvoice()" class="btn btn--primary btn--sm">Send Invoice</button>
                            </div>
                            <div class="row__item positionRelative" v-show="refNo">
                                <button :disabled="requestIsDisabled" @click="deleteInvoice()" class="btn btn--danger btn--sm">Delete Invoice</button>
                            </div>
                        </div>
                    </div>

                    <div class="row invoice__row block">
                      <div class="form__row customer-input-row">
                        <div class="form__row__left">
                            <div class="align-items-center justify-content-between mb-2" style="display: flex">
                                <span class="invoice__compile--memo--label">Client info</span>
                                <span data-toggle="modal" data-target="#addNewCustomer" class="link text--sm">+ New Client</span>
                            </div>
                            <search-client-input v-model="selectedCustomer" :disabled="invoice.status !== 'draft'" />
                        </div>
                        <div v-if="multipleEmailIsShown" @click="toggleOtherEmail = false" class="link mt--10">- Hide multiple emails</div>
                        <div v-else @click="toggleOtherEmail = true" class="link text--sm mt-2">+ Send to multiple emails</div>
                        <div v-if="multipleEmailIsShown" class="row invoice__row--shift-left">
                          <div class="form__row block">
                            <label for class="form__label positionRelative block">
                              <span class="medium">Other emails (Cc)</span>
                            </label>
                            <input-select-tabs 
                              v-model="otherCustomerEmails"
                              placeholder="Enter customer email..."
                              :dropdown-fields="otherCustomersSearched" 
                              @typing="searchCustomers" 
                              dropdown-width="400px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Currency -->
                    <div class="row invoice__row" style="margin-top: 1rem;">
                      <div class="form__row__left" style="width: 100%;">
                        <label for class="mb-2 invoice__compile--memo--label">Currency</label>
                        <div class="select visible--xs">
                          <select class="form-select" v-model="invoice.currency">
                              <option :key="currency" v-for="currency in currencies" :value="currency">{{ currency }}</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="row invoice__row block">
                        <div class="invoice__calculate--wrap">
                          <div class="form__row__left" style="max-width: unset">
                              <label for class="mb-2 invoice__compile--memo--label">Item(s)</label>
                          </div>
                          <div class="invoice__calculate--row form__row__right">
                            <div style="display: flex; width: 100%;">
                              <div class="invoice__quantity invoice__calculate--label">
                                  <label class="form__label text--medium">Quantity</label>
                              </div>
                              <div class="invoice__price">
                                  <label class="form__label text--medium">Price</label>
                              </div>
                              <div class="invoice__amount">
                                  <label class="form__label text--medium block">Amount</label>
                              </div>
                            </div>
                          </div>
                        </div>
                    
                        <div :key="i" v-for="(item, i) in invoice.meta.items"  class="invoice__calculate--wrap">
                            <div class="form__row__left" style="max-width: unset">
                                <input v-model="item.item_name" type="text" class="form-control">
                                <span class="form__errors" v-show="itemErrors[ i ]">
                                    <span class="form__errors__icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
                                            <path fill="#ED6347" stroke="none" fill-rule="evenodd" d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-8h2V6H9v4zm0 4h2v-2H9v2z" />
                                        </svg>
                                    </span>
                                    <span class="form__errors__text">Please fill the invoice item, quantity and unit price</span>
                                </span>
                            </div>
                            
                            <div class="form__row__right invoice__calculate--row">
                              <div class="invoice__calculate--row">
                                  <!-- Qty -->
                                  <div class="invoice__calculate--wrap invoice__quantity" style="width: fit-content !important; flex-basis: 35%;">
                                      <money v-model="item.item_quantity" @keydown.native="preventKeys" v-bind="config.number" class="form-control" style="width: 80%" spellcheck="false"></money>
                                  </div>
                                  <!-- Price -->
                                  <div class="invoice__price">
                                      <money v-model="item.item_unit" @keydown.native="preventKeys" v-bind="moneyConfig" class="form-control" style="width: 80%" spellcheck="false"></money>                                                                    
                                  </div>
                                  <div class="invoice__amount">
                                      <div class="p-t-10 m-b-30 textRight">{{ invoice.currency }} {{ itemAmount( i ) | format_amount }}</div>
                                  </div>
                              </div>
                            </div>
                            <!-- 
                            Don't show the close button for the first element. 
                            By default we want to keep at list one invoice item field in the item list.
                            -->
                            <div class="invoice__form__close-item" @click="removeInvoiceItem( i )" v-show="i > 0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="24" height="24" rx="12" fill="#B9B9B9"/>
                                    <path d="M11.0492 12.0001L6.92 7.87094C6.66346 7.61462 6.66346 7.19873 6.92 6.94241C7.17654 6.68586 7.59199 6.68586 7.84853 6.94241L11.9777 11.0716L16.1071 6.94241C16.3636 6.68586 16.7791 6.68586 17.0356 6.94241C17.2922 7.19873 17.2922 7.61462 17.0356 7.87094L12.9062 12.0001L17.0356 16.1293C17.2922 16.3856 17.2922 16.8015 17.0356 17.0578C16.9074 17.1859 16.7392 17.25 16.5714 17.25C16.4035 17.25 16.2354 17.1859 16.1071 17.0576L11.9777 12.9284L7.84853 17.0576C7.72026 17.1859 7.55215 17.25 7.38426 17.25C7.21637 17.25 7.04827 17.1859 6.92 17.0576C6.66346 16.8013 6.66346 16.3854 6.92 16.1291L11.0492 12.0001Z" fill="white"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Add Item + computation -->
                    <div class="row block">
                        <div class="flex align-items-center form__row">
                          <div class="form__row__left">
                              <span @click="addAnotherInvoiceItem" class="link">+ Add Item</span>
                          </div>
                          <div class="form__row__right invoice-compile">
                              <div class="invoice__compile--row">
                                  <div class="invoice__compile--label">Subtotal</div>
                                  <div class="invoice__compile--value">NGN 0.00</div>
                              </div>
                              <div>
                                <div class="invoice__compile--row">
                                  <div class="dropdown">
                                    <div class="invoice__compile--btn cursor-pointer" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Add Tax</div>
                                    <ul class="dropdown-menu invoice__tax--item" aria-labelledby="dropdownMenuButton1">
                                      <li style="margin-top: 14px">
                                        <div class="dropdown-item invoice__tax--item">
                                          <select class="form-select form-select-sm invoice__compile--select" aria-label="Default select example">
                                            <option selected>Tax Type</option>
                                            <option value="percentage">Percentage</option>
                                            <option value="flat">Flat</option>
                                          </select>
                                        </div>
                                        </li>
                                      <li>
                                        <div class="dropdown-item invoice__tax--item" style="margin-top: 10px">
                                          <input value="money" class="form-control" />
                                        </div>
                                      </li>
                                      <li>
                                        <div class="invoice__tax--item last dropdown-item">
                                          <button type="button" class="btn btn--secondary btn--sm text--xs">Cancel</button>
                                          <button type="button" class="btn btn--primary btn--sm text--xs">Add</button>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                  <div class="invoice__compile--value">NGN 0.00</div>
                                  <!-- <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: #4f566b;transform: ;msFilter:;">
                                      <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                                    </svg>
                                  </span> -->
                                </div>
                              </div>
                              <div class="invoice__compile--row invoice__row__total">
                                  <div class="invoice-computation__label bold">Total</div>
                                  <div class="invoice-computation__action"></div>
                                  <div class="invoice-computation__item bold">{{ invoice.currency }} {{ invoiceTotal || 0 | format_amount }}</div>
                              </div>
                          </div>
                        </div>
                      </div>

                    <!-- Memo -->
                    <div class="row">
                      <div class="invoice__compile--row invoice__compile--memo">
                        <div class="">
                          <label for="exampleFormControlTextarea1" class="mb-3 invoice__compile--memo--label">Memo</label>
                          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                      </div>
                    </div>

                     <!-- Due date -->
                    <div class="row">
                      <div class="invoice__compile--row invoice__compile--memo">
                        <div class="">
                          <p class="mb-3 invoice__compile--memo--label">Reminder</p>
                          <label for="exampleFormControlTextarea1" class="mb-2 text--xs" style="color: #687383;">(Due date)</label>
                          <v-date-picker v-model="date">
                            <template #default="{ inputValue, inputEvents }">
                                <input class="px-3 py-1 border rounded due_date form-control" :value="inputValue" v-on="inputEvents" />
                            </template>
                          </v-date-picker>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>

        <!-- Add New Customer Modal -->
        <div class="modal fade" id="invoice__add-new-customer-modal" tabindex="-1" role="dialog">
            <div role="document" class="modal__dialog modal__dialog--md">
            <div class="modal__content">
                <div class="modal__header">
                <div class="modal__title">Add New Customer</div>
                <button type="button" data-dismiss="modal" aria-label="Close" class="close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13">
                    <path fill="#C0C6D8" fill-rule="nonzero" d="M8.254 6.5l4.383-4.382A1.24 1.24 0 0 0 10.882.363L6.5 4.746 2.118.363A1.24 1.24 0 1 0 .363 2.118L4.746 6.5.363 10.882a1.24 1.24 0 0 0 1.755 1.755L6.5 8.254l4.382 4.383a1.24 1.24 0 1 0 1.755-1.755L8.254 6.5z"></path>
                    </svg>
                </button>
                </div>
                <div class="modal__body modal__body--pad">
                <form class="form">
                    <div class="form__pad">
                    
                    <div class="form__item">
                        <label class="form__label">Customer Name</label>
                        <input required type="text" v-model="newCustomer.name" @keydown="newCustomer.nameIsEmpty = false" class="form__input">
                        <span class="form__errors" v-show="newCustomer.nameIsEmpty">
                        <span class="form__errors__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
                            <path fill="#ED6347" stroke="none" fill-rule="evenodd" d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-8h2V6H9v4zm0 4h2v-2H9v2z" />
                            </svg>
                        </span>
                        <span class="form__errors__text">Please enter a customer name</span>
                        </span>
                    </div>

                    <div class="form__item">
                        <label class="form__label">Email Address</label>
                        <input required type="email" v-model="newCustomer.email" @keydown="newCustomer.emailIsEmpty = false"  class="form__input">
                        <span class="form__errors" v-show="newCustomer.emailIsEmpty">
                        <span class="form__errors__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
                            <path fill="#ED6347" stroke="none" fill-rule="evenodd" d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-8h2V6H9v4zm0 4h2v-2H9v2z" />
                            </svg>
                        </span>
                        <span class="form__errors__text">Please enter an email address</span>
                        </span>
                    </div>

                    <div class="form__item">
                        <label class="form__label">Phone Number</label>
                        <input required type="tel" v-model="newCustomer.phone" @keydown="newCustomer.phoneIsEmpty = false" class="form__input">
                        <span class="form__errors" v-show="newCustomer.phoneIsEmpty">
                        <span class="form__errors__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
                            <path fill="#ED6347" stroke="none" fill-rule="evenodd" d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-8h2V6H9v4zm0 4h2v-2H9v2z" />
                            </svg>
                        </span>
                        <span class="form__errors__text">Please enter a phone number</span>
                        </span>
                    </div>

                    <div class="form__item">
                        <label class="form__label">Delivery Address</label>
                        <input name="address" v-model="newCustomer.address" type="text" class="form__input">
                    </div>

                    <div class="form__row">
                        <div class="form__row__left">
                        <label class="form__label">City</label>
                        <input name="city" v-model="newCustomer.city" type="text" class="form__input">
                        </div>
                        <div class="form__row__right">
                        <label class="form__label">State</label>
                        <input name="state" type="text" v-model="newCustomer.state" class="form__input">
                        </div>
                    </div>

                    <div class="form__item">
                        <label class="form__label">Country</label>
                        <div class="select">
                        <select name id class="select__input" v-model="newCustomer.country">
                            <template v-for="item in countries">
                            <option :key="item.nicename" v-if="item.nicename == 'Nigeria'" value="NG">Nigeria</option>
                            <option :key="item.nicename" v-else-if="item.nicename == 'Ghana'" value="GH">Ghana</option>
                            <option :key="item.nicename" v-else-if="item.nicename == 'Kenya'" value="KE">Kenya</option>
                            <option :key="item.nicename" v-else-if="item.nicename == 'South Africa'" value="ZA">South Africa</option>
                            <option :key="item.nicename" :value="item.iso" v-else>{{item.nicename}}</option>
                            </template>
                            <option value="US">United States of America</option>
                        </select>
                        <div class="select__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10">
                            <path fill="#637381" fill-rule="evenodd" d="M6.03 3.03L3.025.025.02 3.03h6.01zM5.88 7.071L2.975 9.975.07 7.07H5.88z"></path>
                            </svg>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div class="form__footer form__footer--flex">
                    <div class="form__footer__left">
                        <div data-dismiss="modal" class="page-url no--margin__yb">
                        <div class="page-url__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="12" viewBox="0 0 8 14">
                            <path fill="none" fill-rule="evenodd" stroke-width="1.5" d="M7.5.5L1.5 7l6 6.5"></path>
                            </svg>
                        </div>
                        <div class="page-url__text">Go Back</div>
                        </div>
                    </div>
                    <div class="form__footer__right">
                        <button type="button" data-dismiss="modal" aria-label="Close" class="btn btn--default m-r-10">
                        Cancel
                        </button>
                        <button @click.prevent="createNewCustomer" class="btn btn--primary">
                        Save Customer
                        </button>
                    </div>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { userCountry, paymentLinkSupportedCountries } from "../../../functions/countries"
// import DatePicker from "vue2-datepicker";
// import toast from "@/functions/toast";
import SearchClientInput from "./helperComponents/SearchCustomerInput.vue";
// import { createQueryString } from '../../../functions/request';
// import { debounce, arrayToObject } from "../../../functions/utils";
// import InputNumber from "@/ui/input-number.vue";
// import InputMoney from "@/ui/input-money.vue";


export default {
  components: {
    // DatePicker,
    SearchClientInput,
    // InputSelectTabs,
    // InputNumber,
    // InputMoney,
  },

  created() {
  },
  
  data() {
    return {
      type: {
        newInvoice: false,
        existingInvoice: false,
      },
      
      refNo: undefined,
      invoice: {
        amount: 0,
        currency: 'NGN',
        customer: {},
        customer_email: "",
        date_created: "",
        date_paid: "",
        description: "",
        due_date: moment(),
        id: 0,
        meta: {
          cc_emails: "",
          tax: [{ tax_description: null, tax_name: "vat", tax_type: "flat", tax_value: 0 }],
          invoice_interval: [{ interval_description: null, interval_name: "invoice_interval", interval_type: "One Time", interval_value: "One Time" }],
          invoice_notes: [{ notes_description: null, notes_name: "invoice_notes", notes_type: "invoice_notes_1", notes_value: "" }],
          send_via_whatsapp: 0,
          reminders: [],
          items: [{ item_description: null, item_name: "", item_price: 0, item_quantity: 1, item_unit: 0 }],
        },
        status: "draft",
        title: "INVOICE_FROM_DASHBOARD"
      },
      customer: {
        isEmpty: false,
      },
      itemErrors: [],
      newCustomer: {
        name: "",
        nameIsEmpty: false,
        email: "",
        emailIsEmpty: false,
        phone: "",
        phoneIsEmpty: false,
        address: "",
        city: "",
        state: "",
        country: "",
        createCustomerButtonHasClicked: false,
      },
      countries: [],
      otherCustomersSearched: [],
      currencies: ['NGN', 'USD', 'EUR', 'GHS', 'GBP'],
      config: {
        dueDate: {
          date: undefined,
          isEmpty: false,
          lang: {
            days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
            placeholder: {
              date: 'Select Date',
              dateRange: 'Select Date Range'
            }
          },
        },
        number: {
          decimal: '.',
          thousands: ',',          // The currency name or symbol followed by a space.
          prefix: "",
          suffix: '',
          precision: 0,
          masked: false
        },
        percentage: {
          decimal: '.',
          thousands: ',',          // The currency name or symbol followed by a space.
          prefix: "%",
          suffix: '',
          precision: 2,
          masked: false
        },
      },
      toggleOtherEmail: "initial-state",
      requestIsDisabled: false,
      invoiceTaxType: {
        /**
         * @type{"percentage" | "flat"}
         */
        type: "percentage",
        value: 0
      },
      remindersNames: [],
      reminderIsSet: false,
      isShowAddTax: false   
    }
  },

  beforeRouteEnter( to, from, next ) {
    next( vm => {
      if( to.name === "edit-invoice") { 
        vm.refNo = vm.$route.params.id;
        vm.fetchInvoice();
        vm.type.existingInvoice = true;
      }
      else vm.type.newInvoice = true;

      next();
    })
  },

  computed: {
    multipleEmailIsShown() {
      /**
       * On initial state If there are other customers shown, show those other customers.
       * and if there are no customers don't show the other customers
       * 
       * After the initial state the toggle buttons will either set `toggleOtherEmails` to
       * true or false, In that case we just use that to determine the display.
       */
      if( this.toggleOtherEmail === "initial-state" && this.otherCustomerEmails.length > 0 ) {
        return true;
      }
      else if( this.toggleOtherEmail === "initial-state" && this.otherCustomerEmails.length <= 0 ) {
        return false;
      }
      else return this.toggleOtherEmail;

    },
    
    moneyConfig() {
      return {
          decimal: '.',
          thousands: ',',
          prefix: this.invoice.currency + " ",
          suffix: '',
          precision: 2,
          masked: false,
      }
    },

    selectedCustomer: {
      get: function() {
        return {
          email: this.invoice.email,
          customer: this.invoice.customer,
        }
      },

      set: function( newVal ) {
        this.invoice.email = newVal.email;
        this.invoice.customer = newVal.customer;
      }
    },

    enableSaveCustomerButton: {
      get: function() {
        return (
          this.newCustomer.name.length > 0      && 
          this.newCustomer.email.length > 0     && 
          this.newCustomer.phone.length > 0     && 
          this.newCustomer.address.length > 0   && 
          this.newCustomer.city.length > 0      && 
          this.newCustomer.state.length > 0
        )
      },

      set: function( newValue ) {
        if( newValue === true ) return;

        this.newCustomer.email = "";
        this.newCustomer.phone = "";
      }  
    },

    otherCustomerEmails: {
      get() {
        const ccEmails = this.invoice.meta && this.invoice.meta.cc_emails;
        if( ccEmails === undefined || ccEmails.length <= 0 ) return [];
        else return ccEmails.split( "," );
      },
      
      set( arr = [] ) {
        this.invoice.meta.cc_emails = arr.join( "," )
      }
    },

    sendViaWhatsapp: {
      get: function() {
        return this.invoice.meta.send_via_whatsapp === 1 ? true : false;
      },
      set: function( val ) {
        this.invoice.meta.send_via_whatsapp = val ? 1 : 0
      }
    },

    invoiceInterval: {
      get: function() {
        return this.invoice.meta.invoice_interval[ 0 ].interval_type;
      },

      set: function( val ) {
        this.invoice.meta.invoice_interval[ 0 ].interval_type = val;
        this.invoice.meta.invoice_interval[ 0 ].interval_value = val;
      }      
    },

    invoiceNotes: {
      get: function() {
        return this.invoice.meta.invoice_notes[ 0 ].notes_value;
      },

      set: function( val ) {
        this.invoice.meta.invoice_notes[ 0 ].notes_value = val;
      }
    },

    invoiceSubTotal() {
      const items = this.invoice.meta.items;
      return this.sumElements( items, "item_price" )
    },

    invoiceTax: {
      get: function() {
        return parseFloat( this.invoice.meta.tax[ 0 ].tax_value );
      },

      set: function( val ) {
        if( this.invoiceTaxType.type === "percentage" ) {
          this.invoice.meta.tax[ 0 ].tax_type = "percentage";
        }
        this.invoice.meta.tax[ 0 ].tax_value = parseFloat( val );
      }
    },

    invoiceTotal() {
      return (
        ( parseFloat(this.invoiceSubTotal) + 
          parseFloat(this.invoiceShippingFee) + 
          parseFloat(this.invoiceTax) 
        ) - parseFloat(this.invoiceDiscount)
      )
    },

    disable14DaysBefore() {
      if(moment(this.invoice.due_date).subtract(13, 'days').isSameOrAfter(moment())) return false;
      else return true;
    },

    disable7DaysBefore() {
      if(moment(this.invoice.due_date).subtract(6, 'days').isSameOrAfter(moment())) return false;
      else return true;
    },

    disable3DaysBefore() {
      if(moment(this.invoice.due_date).subtract(2, 'days').isSameOrAfter(moment())) return false;
      else return true;
    }

  },

  methods: {
    itemAmount( i ) {
      const item = this.invoice.meta.items[ i ]
      const quantity = item.item_quantity;
      const unit = item.item_unit;
      const price = parseFloat( quantity ) * parseFloat( unit );
      this.invoice.meta.items[ i ].item_price = price;
      return price;
    },
    addAnotherInvoiceItem() {
      const length = this.invoice.meta.items.length;
      this.$set( this.invoice.meta.items, length, {
        item_description: null,
        item_name: "",
        item_price: 0,
        item_quantity: 1,
        item_unit: 0,
      })
    },
    /**
     * This will remove an invoice item from the list of items based on the index.
     * if none is defined, it removes the last item.
     */
    removeInvoiceItem( index = this.invoice.meta.items.length - 1 ) {
      this.$delete( this.invoice.meta.items, index );
    },
    fetchCountries () {
      this.$http.get('i/v1/extras/countries?view_group=2').then( res => {
        this.countries = res.body.data
      })
      .catch(err => {
        console.error(err)
      })
    },
    validateNewCustomerField() {
      let isValid = true;
      
      if( this.newCustomer.name.length < 1 ) {
        this.newCustomer.nameIsEmpty = true;
        isValid = false;
      }

      if( this.newCustomer.email.length < 1 ) {
        this.newCustomer.emailIsEmpty = true;
        isValid = false;
      }

      if( this.newCustomer.phone.length < 1 ) {
        this.newCustomer.phoneIsEmpty = true;
        isValid = false;
      }

      return isValid;

    },
    createNewCustomer() {
      const isValidated = this.validateNewCustomerField();
      if( isValidated === false ) return;

      const customerData = {
        fullname: this.newCustomer.name,
        email: this.newCustomer.email,
        phonenumber: this.newCustomer.phone,
        meta:[
          { metaname: "delivery_address", metavalue: this.newCustomer.address },
          { metaname: "city", metavalue: this.newCustomer.city },
          { metaname: "state", metavalue: this.newCustomer.state },
          { metaname: "country", metavalue: this.newCustomer.country },
        ]
      }

      this.enableSaveCustomerButton = false;

      this.$http.post( "v2/customers/create", customerData ).then(({ ok, data }) => {
        if( ok !== true ) return console.error( "Couldn't create new customer" );

        const customer = data.data;

        this.invoice.customer_email = customer.customer_email;
        this.invoice.customer = customer;
        
        toast.green( "Successfully added new customer" )
        
        // close modal
        $('#invoice__add-new-customer-modal').modal('hide');

      })
      .catch( error => {

        toast.red( error.data.message );

        console.log( error.data.message );

      })

    },

    validateItems() {
      let isValid = true;
      const $this = this;

      if( this.invoice.customer_email === undefined || this.invoice.customer_email.trim() === "" ) {
        this.customer.isEmpty = true;
        isValid = false;
      } else {
        this.customer.isEmpty = false;
      }

      if( this.invoice.due_date === undefined || this.invoice.due_date === null ) {
        this.config.dueDate.isEmpty = true;
        isValid = false;
      } else {
        this.config.dueDate.isEmpty = false;
      }

      const items = this.invoice.meta.items;

      items.map(( item, i ) => {
        const invalid = ( 
          item.item_name === "" || 
          item.item_name === undefined ||
          parseInt( item.item_price ) < 1 ||
          parseInt( item.item_quantity ) < 1 ||
          parseInt( item.item_unit ) < 1
        )

        if( invalid ) {
          $this.$set( $this.itemErrors, i, true );
          isValid = false;
        }
        else {
          $this.$set( $this.itemErrors, i, false );
        }
      });

      if( this.invoiceTotal <= 0 ) return false;

      return isValid;

    },

    createInvoicePayload() {
      return {
        amount: this.invoiceTotal,
        currency: this.invoice.currency,
        title: "Invoice from " + window.localStorage.companyName,
        description: this.invoice.meta.invoice_notes[ 0 ].notes_value,
        due_date: moment( this.invoice.due_date ).format( "YYYY-MM-DD" ),
        customer_email: this.invoice.customer_email,
        customer: {
          id: this.invoice.customer ? this.invoice.customer.id : undefined,
          fullname: this.invoice.customer ? this.invoice.customer.customer_fullname : undefined,
          phonenumber: this.invoice.customer ? this.invoice.customer.phonenumber : undefined,
          email: this.invoice.customer ? this.invoice.customer.customer_email : this.invoice.customer_email,
          meta: this.invoice.customer ? this.invoice.customer.meta : undefined,
        }, 
        meta: this.invoice.meta
      };
    },

    saveExistingInvoice( payload ) {
      return this.$http.post(`v2/invoices/${ this.invoice.id }/edit`, payload )
    },

    saveNewInvoice( payload ) {
      return this.$http.post(`v2/invoices`, payload ).then( resp => {
        // Track invoice creation on mixpanel
        mixpanel.track("Invoice Created", {
          "$email": window.localStorage.userEmail
        });
        return resp;
      });
    },

    sendCreatedInvoice( invoice ) {
      return this.$http.post( `v2/invoices/${ invoice.id  }/send` ).then(({ ok, data }) => {
        if( ok === false || data.status !== "success" ) {
          return console.error("Couldn't Save Invoices for customer.");
        }
        toast.green( "Invoice has been sent successfully" );
        mixpanel.track( "Invoice Sent", {
          "$email": window.localStorage.userEmail
        })
        this.$router.push({ name: "invoices-list" });
      })
      .catch( error => {
        toast.red( error.data.message );
        console.log( error.data.message );
      });
    },

    saveInvoice() {
      const payload = this.createInvoicePayload();

      const isValid = this.validateItems();
      if( isValid === false ) return undefined;

      this.requestIsDisabled = true;

      if( this.type.newInvoice ) {
        
        return this.saveNewInvoice( payload ).then(({ ok, data }) => {

          if( ok === false || data.status === "error" ) return console.log( "Couldn't create invoice" );

          toast.green( "Invoice has been saved successfully" );

          this.requestIsDisabled = false;

          this.$router.push({ name: "invoices-list" });

        })
        .catch( error => {

          toast.red( error.data.message );

          this.requestIsDisabled = false;

          console.log( error.data.message );

        });

      }
      else {
       
        return this.saveExistingInvoice( payload ).then(({ ok, data }) => {
        
          if( ok === false || data.status === "error" ) return console.log( "Couldn't create invoice" );

          // Show success toast.
          toast.green( "Invoice has been modified successfully" );

          this.$router.push({ name: "invoices-list" })

        })
        .catch( error => {
          
          // Show error toast.
          toast.red( error.data.message )

          console.log( "<<<", payload );

          console.log( error.data.message );

        });

      };
      
    },

    sendInvoice() {
      const payload = this.createInvoicePayload();
      const isValid = this.validateItems();
      if( isValid === false ) return undefined;

      this.requestIsDisabled = true;

      if( this.type.newInvoice ) {
        this.saveNewInvoice( payload )
        .then(({ ok, data }) => this.sendCreatedInvoice( data.data ) ).then( () => {
          this.requestIsDisabled = false;
        })
        .catch(error => {
          toast.red( error.data.message );
          this.requestIsDisabled = false;
        });
      } else {
        return this.saveExistingInvoice( payload )
        .then(({ ok, data }) => this.sendCreatedInvoice( data.data )).then(() => {
          this.requestIsDisabled = false;
        })
        .catch(error => {
          toast.red( error.data.message );
          this.requestIsDisabled = false;
        });
      }
    },

    deleteInvoice() {
      this.requestIsDisabled = true;
      this.$http.post( `v2/invoices/${ this.invoice.id }/delete` )
      .then(({ ok, data }) => {
        if( ok === false || data.status !== "success" ) return console.error("Couldn't Delete Invoices for customer.");
        this.requestIsDisabled = false;
        toast.green( "Invoice has been removed successfully." );
        this.$router.push({ name: "invoices-list" });
      })
      
      .catch( error => {
        this.requestIsDisabled = false;
        toast.red( error.data.message );
        console.log( error.data.message );
      });
    },

    fetchInvoice() {
      const queryString = `v2/invoices/${ this.refNo }/?include_customer=1`;
      this.$http.get(queryString).then(({ ok, data }) => {
        if (ok !== true) return;
        this.invoice = data.data;
        if( this.invoice.status === 'paid' ) return this.$router.push({ name: "not-found" });
        this.loading = false;
      })
      .catch( error => {
        console.log( error.data.message );
        this.$router.push({ name: "not-found" })
      })
    },

    searchCustomers( query ) {
      debounce(() => {
        query = query.trim();
        if( query.length < 1 ) return;
        const url = createQueryString( "v2/customers/query", { q: query });
        this.$http.get( url ).then(({ ok, data }) => {
          const customers = data.data.customers;
          this.otherCustomersSearched = arrayToObject( customers, "customer_email", "customer_fullname" );
        });
      })
    },

    /**
     * Returns the sum of all the elements 
     * fields in an array of elements
     */
    sumElements( elems, field ) {
      if( elems.length === 0 ) return 0;
      let sum = parseFloat( elems[ 0 ][ field ] );
      if( elems.length === 1 ) return sum;
      else {
        for( let i = 1; i < elems.length; i++ ) {
          sum += parseFloat( elems[ i ][ field ] )
        }
        return sum;
      }
    },

    preventKeys (event) {
      if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 190 || event.keyCode == 37 || event.keyCode == 39) {
      } else {
        return event.preventDefault();
      }
    },

    setReminders() {
      this.invoice.meta.reminders = [];
      for(let i = 0; i < this.remindersNames.length; i++) {
        this.invoice.meta.reminders.push({
          reminder_name: this.remindersNames[i],
          reminder_date: moment().format('YYYY-MM-DD HH:mm:ss'),
          reminder_note: this.getReminderNote( this.remindersNames[i] ),
        })
      }
      
      if (this.remindersNames.length > 0) this.reminderIsSet = true;
      else this.reminderIsSet = false;    
    },

    getReminderNote( reminderName ) {
      switch( true ) {
        case reminderName === "onduedate": return "Remind on Due Date";
        case reminderName.endsWith( "before"): return "Remind Before Due Date";
        case reminderName.endsWith( "after" ): return "Remind After Due Date";
        default: return "N/A"
      }
    },
    showAddTaxView() {
      this.isShowAddTax = !this.isShowAddTax
    }
  },

  watch: {

    invoiceSubTotal( newVal ) {

      if( newVal <= 0 ) return;

      const taxIsPercentage = this.invoice.meta.tax[ 0 ].tax_type === "percentage";
      const tax = parseFloat( this.invoice.meta.tax[ 0 ].tax_value );

      if( taxIsPercentage && tax > 0 ) {
        this.invoiceTaxType.value = ( tax / this.invoiceSubTotal ) * 100;
      }

      this.invoiceTax = parseFloat( ( this.invoiceTaxType.value / 100 ) * this.invoiceSubTotal ).toFixed(2);
    },

    ["invoiceTaxType.value"]( newVal ) {
      if( this.invoiceSubTotal <= 0 ) return;
      this.invoiceTax = parseFloat( ( newVal / 100 ) * this.invoiceSubTotal ).toFixed(2);
    },

    ["shippingClient.name"]( newVal ) {
      const newFee = this.shippingFees.filter( client => client.name === newVal )[ 0 ] || { name: "", fee: 0 };
      this.invoiceShippingFee = { 
        fee_description: newFee.name, 
        fee_value: parseFloat( newFee.fee ), 
        fee_name: "vat", 
        fee_type: "flat", 
      }
    },
  }

}
</script>

<style lang="scss" scoped>
.row>* {
  width: auto;
}
.row.hidden-xs {
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 2rem;
}
.form__row__left {
  max-width: 500px;
}
.row.invoice__row  {
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 1rem;
  padding-bottom: 1.5rem;
}
</style>