import { createSlice } from "@reduxjs/toolkit";

export const sliceData = createSlice({
  name: "dataFlight",
  initialState: {
    value: [],
    saveValue: [],
    sortType: "",
    transfer: false,
    noTransfer: false,
    minPrice: "",
    maxPrice: "",
  },
  reducers: {
    setDataFlight: (state, action) => {
      state.value = action.payload;
      state.saveValue = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setTransferToggle: (state, action) => {
      state.transfer = action.payload;
    },
    setNoTransferToggle: (state, action) => {
      state.noTransfer = action.payload;
    },
    setPriceRangeMin: (state, action) => {
      state.minPrice = action.payload;
    },
    setPriceRangeMax: (state, action) => {
      state.maxPrice = action.payload;
    },

    filterPriceCount: (state) => {
      state.value = state.value.filter((ticket) => {
        const filterPrice = Number(ticket.flight.price.total.amount);

        return (
          (!state.minPrice || filterPrice >= Number(state.minPrice)) &&
          (!state.maxPrice || filterPrice <= Number(state.maxPrice))
        );
      });

      if (state.transfer) {
        state.value = state.value.filter((ticket) => {
          const sumTransfer = ticket.flight.legs.reduce((acc, arr) => {
            const sum = acc + arr.segments.length;
            return sum;
          }, 0);
          return sumTransfer > 3;
        });
      }

      if (state.noTransfer) {
        state.value = state.value.filter((ticket) => {
          const sumTransfer = ticket.flight.legs.reduce((acc, arr) => {
            const sum = acc + arr.segments.length;
            return sum;
          }, 0);
          return sumTransfer === 2;
        });
      }

      if (state.sortType === "desc") {
        state.value = state.value.sort((a, b) => {
          return (
            Number(b.flight.price.total.amount) -
            Number(a.flight.price.total.amount)
          );
        });
      } else if (state.sortType === "asc") {
        state.value = state.value.sort((a, b) => {
          return (
            Number(a.flight.price.total.amount) -
            Number(b.flight.price.total.amount)
          );
        });
      } else if (state.sortType === "time") {
        state.value = state.value.sort((a, b) => {
          const first = a.flight.legs.reduce((acc, time) => {
            const sum = acc + time.duration;
            return sum;
          }, 0);
          const second = b.flight.legs.reduce((acc, time) => {
            const sum = acc + time.duration;
            return sum;
          }, 0);

          return first - second;
        });
      }
    },
    sortTicket: (state, action) => {
      // +Сортировка при нажатых чекбоксах
      if (state.transfer) {
        state.value = state.value.filter((ticket) => {
          const sumTransfer = ticket.flight.legs.reduce((acc, arr) => {
            const sum = acc + arr.segments.length;
            return sum;
          }, 0);
          return sumTransfer > 3;
        });
      }

      if (state.noTransfer) {
        state.value = state.value.filter((ticket) => {
          const sumTransfer = ticket.flight.legs.reduce((acc, arr) => {
            const sum = acc + arr.segments.length;
            return sum;
          }, 0);
          return sumTransfer === 2;
        });
      }

      // +обычная сортировка
      if (action.payload === "desc") {
        state.sortType = "desc";
        state.value = state.value.sort((a, b) => {
          return (
            Number(b.flight.price.total.amount) -
            Number(a.flight.price.total.amount)
          );
        });
      } else if (action.payload === "asc") {
        state.sortType = "asc";
        state.value = state.value.sort((a, b) => {
          return (
            Number(a.flight.price.total.amount) -
            Number(b.flight.price.total.amount)
          );
        });
      } else if (action.payload === "time") {
        state.sortType = "time";
        state.value = state.value.sort((a, b) => {
          const first = a.flight.legs.reduce((acc, time) => {
            const sum = acc + time.duration;
            return sum;
          }, 0);
          const second = b.flight.legs.reduce((acc, time) => {
            const sum = acc + time.duration;
            return sum;
          }, 0);

          return first - second;
        });
      }
    },

    // +Чекбоксы
    filterTransfer: (state, action) => {
      if (action.payload) {
        state.value = state.value.filter((ticket) => {
          const sumTransfer = ticket.flight.legs.reduce((acc, arr) => {
            const sum = acc + arr.segments.length;
            return sum;
          }, 0);
          return sumTransfer > 3;
        });
      } else {
        state.value = state.saveValue;

        if (state.sortType === "desc") {
          state.value = state.value.sort((a, b) => {
            return (
              Number(b.flight.price.total.amount) -
              Number(a.flight.price.total.amount)
            );
          });
        } else if (state.sortType === "asc") {
          state.value = state.value.sort((a, b) => {
            return (
              Number(a.flight.price.total.amount) -
              Number(b.flight.price.total.amount)
            );
          });
        } else if (state.sortType === "time") {
          state.value = state.value.sort((a, b) => {
            const first = a.flight.legs.reduce((acc, time) => {
              const sum = acc + time.duration;
              return sum;
            }, 0);
            const second = b.flight.legs.reduce((acc, time) => {
              const sum = acc + time.duration;
              return sum;
            }, 0);
            return first - second;
          });
        }
      }
    },
    filterNoTransfer: (state, action) => {
      if (action.payload) {
        state.value = state.value.filter((ticket) => {
          const sumNoTransfer = ticket.flight.legs.reduce((acc, arr) => {
            const sum = acc + arr.segments.length;
            return sum;
          }, 0);
          return sumNoTransfer === 2;
        });
      } else {
        state.value = state.saveValue;

        if (state.sortType === "desc") {
          state.value = state.value.sort((a, b) => {
            return (
              Number(b.flight.price.total.amount) -
              Number(a.flight.price.total.amount)
            );
          });
        } else if (state.sortType === "asc") {
          state.value = state.value.sort((a, b) => {
            return (
              Number(a.flight.price.total.amount) -
              Number(b.flight.price.total.amount)
            );
          });
        } else if (state.sortType === "time") {
          state.value = state.value.sort((a, b) => {
            const first = a.flight.legs.reduce((acc, time) => {
              const sum = acc + time.duration;
              return sum;
            }, 0);
            const second = b.flight.legs.reduce((acc, time) => {
              const sum = acc + time.duration;
              return sum;
            }, 0);

            return first - second;
          });
        }
      }
    },

    setFilterAirlines: (state, action) => {
      if (action.payload) {
        state.value = state.value.filter((ticket) => {
          const airlineName = ticket.flight.carrier.caption;
          const airlinePrice = ticket.flight.price.total.amount;
          return (
            airlineName === action.payload.name &&
            Number(airlinePrice) >= Number(action.payload.price)
          );
        });
      } else {
        state.value = state.saveValue;

        if (state.transfer) {
          state.value = state.value.filter((ticket) => {
            const sumTransfer = ticket.flight.legs.reduce((acc, arr) => {
              const sum = acc + arr.segments.length;
              return sum;
            }, 0);
            return sumTransfer > 3;
          });
        }

        if (state.noTransfer) {
          state.value = state.value.filter((ticket) => {
            const sumTransfer = ticket.flight.legs.reduce((acc, arr) => {
              const sum = acc + arr.segments.length;
              return sum;
            }, 0);
            return sumTransfer === 2;
          });
        }

        if (state.sortType === "desc") {
          state.value = state.value.sort((a, b) => {
            return (
              Number(b.flight.price.total.amount) -
              Number(a.flight.price.total.amount)
            );
          });
        } else if (state.sortType === "asc") {
          state.value = state.value.sort((a, b) => {
            return (
              Number(a.flight.price.total.amount) -
              Number(b.flight.price.total.amount)
            );
          });
        } else if (state.sortType === "time") {
          state.value = state.value.sort((a, b) => {
            const first = a.flight.legs.reduce((acc, time) => {
              const sum = acc + time.duration;
              return sum;
            }, 0);
            const second = b.flight.legs.reduce((acc, time) => {
              const sum = acc + time.duration;
              return sum;
            }, 0);

            return first - second;
          });
        }
      }
    },
  },
});

export const {
  setDataFlight,
  sortTicket,
  filterNoTransfer,
  setSortType,
  filterTransfer,
  setTransferToggle,
  setNoTransferToggle,
  filterPriceCount,
  setPriceRangeMax,
  setPriceRangeMin,
  setFilterAirlines,
} = sliceData.actions;
export default sliceData.reducer;
