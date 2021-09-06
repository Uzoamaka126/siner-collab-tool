<script>
import {
  onMounted,
  onBeforeUnmount,
  ref,
  watch,
  toRefs,
  h,
} from "vue";

export default {
  name: "Tabs",
  props: {
    defaultIndex: {
      default: 0,
      type: Number,
    },
    resetTabs: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: "horizontal",
        validator(value) {
            return ["horizontal", "vertical"].includes(value);
        },
    },
    position: {
      type: String,
      default: "left",
        validator(value) {
            return ["start", "end", "center"].includes(value);
        },
    },
    reverse: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: {
    tabChanged(index) {
      return index !== undefined || index !== null;
    },
  },
  setup(props, { emit, slots }) {
    const { defaultIndex, resetTabs, position, direction, reverse } = toRefs(props);

    const selectedIndex = ref(0);
    const tabs = ref([]);
    const _tabItems = ref([]);

    const onTabKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (parseInt(e.key) - 1 in tabs.value) {
          e.preventDefault();
          switchTab(e, parseInt(e.key) - 1, tabs.value[parseInt(e.key) - 1]);
        }
      }
    };

    const reset = () => {
      selectedIndex.value = 0;
    };

    const switchTab = (_, index, isDisabled) => {
      if (!isDisabled) {
        selectedIndex.value = index;
        emit("tabChanged", index);
      }
    };

    onMounted(() => {
      document.addEventListener("keydown", onTabKeyDown);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("keydown", onTabKeyDown);
    });

    watch(defaultIndex, (newValue) => {
      if (newValue !== selectedIndex.value) {
        selectedIndex.value = newValue;
      }
    });

    watch(resetTabs, (newValue, oldValue) => {
      if (newValue === true) reset();
    });

    return () => {
      _tabItems.value = (slots)
        .default()
        .filter((component) => component.type.name === "Tab");

      const tabList = [];
      _tabItems.value.forEach((tab, index) => {
        const _tabProps = tab.props;

        const content = _tabProps["title-slot"]
          ? (slots)
              .default()
              .filter(
                (item) =>
                  item.type === "template" &&
                  item.props.name === _tabProps["title-slot"]
              )[0].children
          : _tabProps.title;
        const isDisabled =
          _tabProps.disabled === true || _tabProps.disabled === "";
        tabs.value[index] = isDisabled;

        tabList.push(
          h(
            "li",
            {
              class: "tab-list__item",
              tabIndex: "0",
              role: "tabItem",
              "aria-selected": selectedIndex.value === index ? "true" : "false",
              "aria-disabled": isDisabled ? "true" : "false",
              onClick: (e) => {
                switchTab(e, index, isDisabled);
              },
            },
            content
          )
        );
      });

      const _tabsList = h(
        "ul",
        { class: `tab-list ${position.value}`, role: "tabList" },
        tabList
      );

      return h(
        "div",
        {
          class: `tabs ${direction.value} ${reverse.value ? "reverse" : ""}`,
          role: "tabs",
        },
        [
          _tabsList,
          h("div", { class: "tab" }, _tabItems.value[selectedIndex.value]),
        ]
      );
    };
  },
};

</script>

<style lang="scss">
.tabs {
  display: grid;
  grid-template-columns: 1fr;
  .tab-list {
    list-style: none;
    display: flex;
    padding-left: 0;
    border-bottom: 1px solid var(--border-color);
    &.center {
      justify-content: center;
    }
    &.end {
      justify-content: flex-end;
    }
    &__item {
      padding: 8px 10px;
      cursor: pointer;
      user-select: none;
      transition: border 0.3s ease-in-out;
      position: relative;
      bottom: -1px;
      text-transform: uppercase;
      font-size: 0.85rem;
      letter-spacing: 0.05rem;

      &:not(:first-child) {
        margin-left: 10px;
      }

      &[aria-selected="true"] {
        border-bottom: 2px solid var(--primary-color);
        font-weight: 700;
        color: var(--primary-color);
      }
      &[aria-disabled="true"] {
        cursor: not-allowed;
        color: var(--disabled-text-color);
      }
    }
  }
  &.horizontal {
    &.reverse {
      .tab-list {
        grid-row: 2;
        border: none;
        border-top: 1px solid var(--border-color);
      }
    }
  }

  &.vertical {
    grid-template-columns: auto 1fr;
    gap: 1rem;
    .tab-list {
      flex-direction: column;
      border-bottom: none;
      border-right: 1px solid var(--border-color);

      &__item {
        margin-left: 0;
        border-radius: 0;

        &[aria-selected="true"] {
          border: none;
          border-left: 2px solid var(--primary-color);
        }
      }
    }

    &.reverse {
      grid-template-columns: 1fr auto;
      .tab-list {
        grid-column: 2;
        border: none;
        border-left: 1px solid var(--border-color);
      }

      .tab {
        grid-row: 1;
        grid-column: 1;
      }
    }
  }
}
</style>
